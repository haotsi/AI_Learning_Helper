#!/usr/bin/env node
/* ============================================================
   scripts/check.mjs · 零依赖冒烟测试
   用本机 Chrome/Edge（无头）经 CDP 真实渲染并驱动页面：
     - 起本地静态服务器（模拟 GitHub Pages 子路径外的同源行为）
     - 逐路由断言渲染结果，模拟点击 / 输入 / 答题 / 收藏 / 筛选
     - 捕获 console error、未捕获异常、404 / 加载失败
     - 校验 localStorage 进度持久化（刷新后不丢）
     - 最后以 file:// 直开做一轮轻量渲染冒烟
   用法：node scripts/check.mjs   （全部通过退出码 0）
   ============================================================ */
import { spawn } from "node:child_process";
import http from "node:http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ---------------- 断言收集 ---------------- */
let passed = 0;
const failures = [];
function ok(cond, name, detail) {
  if (cond) { passed++; console.log("  ✓ " + name); }
  else { failures.push(name + (detail ? " —— " + String(detail).slice(0, 200) : "")); console.log("  ✗ " + name + (detail ? "  " + String(detail).slice(0, 200) : "")); }
}

/* ---------------- 浏览器查找 ---------------- */
function findBrowser() {
  const cands = [];
  if (process.env.CHROME_PATH) cands.push(process.env.CHROME_PATH);
  if (process.platform === "win32") {
    cands.push(
      "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
      "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    );
  } else if (process.platform === "darwin") {
    cands.push("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge");
  } else {
    cands.push("/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/microsoft-edge");
  }
  const p = cands.find((c) => { try { return fs.existsSync(c); } catch { return false; } });
  if (!p) throw new Error("未找到 Chrome/Edge，可设置 CHROME_PATH 环境变量");
  return p;
}

/* ---------------- 静态服务器 ---------------- */
const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json",
  ".png": "image/png", ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml", ".ico": "image/x-icon", ".md": "text/markdown; charset=utf-8"
};
function startServer() {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      const urlPath = decodeURIComponent(req.url.split("?")[0].split("#")[0]);
      let fp = path.join(ROOT, urlPath === "/" ? "index.html" : urlPath);
      if (!fp.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
      fs.readFile(fp, (err, buf) => {
        if (err) { res.writeHead(404); res.end("not found"); return; }
        res.writeHead(200, { "Content-Type": MIME[path.extname(fp)] || "application/octet-stream" });
        res.end(buf);
      });
    });
    srv.listen(0, "127.0.0.1", () => resolve(srv));
  });
}

/* ---------------- 极简 CDP 客户端 ---------------- */
class CDP {
  constructor(ws) {
    this.ws = ws; this.id = 0; this.pending = new Map(); this.handlers = [];
    ws.onmessage = (ev) => {
      const msg = JSON.parse(String(ev.data));
      if (msg.id && this.pending.has(msg.id)) {
        const p = this.pending.get(msg.id); this.pending.delete(msg.id);
        msg.error ? p.reject(new Error(JSON.stringify(msg.error))) : p.resolve(msg.result);
      } else if (msg.method) {
        this.handlers.forEach((h) => { try { h(msg.method, msg.params); } catch { /* noop */ } });
      }
    };
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  on(h) { this.handlers.push(h); }
}

async function evalJS(cdp, expr) {
  const r = await cdp.send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error("evaluate failed: " + JSON.stringify(r.exceptionDetails.exception?.description || r.exceptionDetails.text).slice(0, 300));
  return r.result.value;
}
async function gotoHash(cdp, hash) {
  await evalJS(cdp, `location.hash = ${JSON.stringify(hash)}; true`);
  await sleep(500);
}
async function reload(cdp) {
  await cdp.send("Page.reload", { ignoreCache: true });
  await sleep(1300);
}

/* ---------------- 主流程 ---------------- */
async function main() {
  const browserPath = findBrowser();
  console.log("browser:", browserPath);
  const srv = await startServer();
  const base = "http://127.0.0.1:" + srv.address().port;
  const userData = fs.mkdtempSync(path.join(os.tmpdir(), "lhelper-"));

  const proc = spawn(browserPath, [
    "--headless=new", "--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage",
    "--remote-debugging-port=0", "--user-data-dir=" + userData, "about:blank"
  ], { stdio: "ignore" });
  proc.on("error", (e) => { console.error("spawn failed", e); process.exit(2); });

  /* 等待 DevToolsActivePort */
  const portFile = path.join(userData, "DevToolsActivePort");
  let port = 0;
  for (let i = 0; i < 100; i++) {
    await sleep(200);
    if (fs.existsSync(portFile)) {
      try { port = parseInt(fs.readFileSync(portFile, "utf8").split("\n")[0], 10); if (port) break; } catch { }
    }
  }
  if (!port) { console.error("无法拿到调试端口"); proc.kill(); process.exit(2); }

  /* 找 page target 并连接 */
  let wsUrl = null;
  for (let i = 0; i < 25; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const t = list.find((x) => x.type === "page");
      if (t) { wsUrl = t.webSocketDebuggerUrl; break; }
    } catch { }
    await sleep(200);
  }
  if (!wsUrl) { console.error("无 page target"); proc.kill(); process.exit(2); }
  const ws = new WebSocket(wsUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  const cdp = new CDP(ws);

  const consoleErrors = [];
  const pageExceptions = [];
  const badLoads = [];
  cdp.on((method, params) => {
    if (method === "Runtime.exceptionThrown") {
      const d = params.exceptionDetails;
      const txt = (d.exception && (d.exception.description || d.exception.value)) || d.text || "unknown";
      if (!/Navigation|ERR_/i.test(String(txt))) pageExceptions.push(String(txt).split("\n")[0]);
    } else if (method === "Runtime.consoleAPICalled" && (params.type === "error")) {
      const t = (params.args || []).map((a) => a.value ?? a.description ?? "").join(" ");
      if (!/favicon/i.test(t)) consoleErrors.push(t.slice(0, 200));
    } else if (method === "Log.entryAdded" && params.entry.level === "error") {
      const e = params.entry;
      if (!/favicon/i.test(e.text || "") && !/DevTools/i.test(e.text || "")) badLoads.push((e.source || "") + " " + (e.url || "") + " " + e.text);
    } else if (method === "Network.responseReceived" && params.response.status >= 400) {
      badLoads.push("HTTP " + params.response.status + " " + params.response.url);
    } else if (method === "Network.loadingFailed") {
      if (params.errorText && !/ERR_ABORTED|identity/i.test(params.errorText)) badLoads.push("FAIL " + params.errorText);
    }
  });

  await cdp.send("Runtime.enable");
  await cdp.send("Log.enable");
  await cdp.send("Network.enable");
  await cdp.send("Page.enable");
  try { await cdp.send("Network.setCacheDisabled", { cacheDisabled: true }); } catch { }

  console.log("\n== ① 首页 ==");
  await cdp.send("Page.navigate", { url: base + "/index.html#/home" });
  await sleep(1600);

  let r = await evalJS(cdp, `({
    title: /学习助手/.test(document.title),
    brand: !!document.querySelector('.brand .logo svg'),
    stats: [document.querySelector('#statSubjects').textContent, document.querySelector('#statCourses').textContent, document.querySelector('#statQuiz').textContent],
    subjects: document.querySelectorAll('#subjectGrid .subject-card').length,
    tools: document.querySelectorAll('#toolGrid .tool-card').length,
    featured: document.querySelectorAll('#featuredCourses .course-card').length,
    progress: document.querySelector('#homeProgress').textContent,
    ext: /njuis-students/.test(document.querySelector('#extBlock').innerHTML),
    navExt: /智科全家桶/.test(document.querySelector('#navLinks').textContent),
    heroBtns: document.querySelectorAll('.hero-actions .btn').length,
    heroBtnsText: document.querySelector('.hero-actions').textContent,
    heroH1: document.querySelector('.hero h1').textContent,
    subjectHead: ((document.querySelector('#subjectHead .section-title') || {}).textContent || '').trim(),
    logicCard: (function () {
      var c = document.querySelector('#subjectGrid .subject-card.card-logic');
      return !!c && /数理逻辑/.test(c.textContent) && /进入板块/.test(c.textContent) && !!c.querySelector('.icon svg');
    })(),
    footerLogic: /数理逻辑/.test(document.querySelector('#siteFooter').textContent),
    navLogic: !!document.querySelector('.nav-links a[data-route="logic"]'),
    logicCardColor: (function () {
      var c = document.querySelector('#subjectGrid .subject-card.card-logic');
      if (!c) return null;
      return {
        icon: getComputedStyle(c.querySelector('.icon-xl')).backgroundColor,
        bar: getComputedStyle(c, '::before').backgroundColor
      };
    })()
  })`);
  ok(r.title, "标题含「学习助手」");
  ok(r.brand, "品牌图标 SVG 注入");
  ok(r.stats[0] === "4" && r.stats[1] === "12" && r.stats[2] === "96", "首屏三统计 4/12/96", JSON.stringify(r.stats));
  ok(r.subjects === 4, "学科板块 4 张主题卡");
  ok(r.subjectHead === "四大学科板块", "首页学科区标题为「四大学科板块」");
  ok(r.logicCard, "首页含数理逻辑板块卡（简介 + 进入板块）");
  ok(r.footerLogic, "页脚学科串含数理逻辑（数据驱动）");
  ok(r.navLogic, "导航含数理逻辑入口");
  /* 主题色必须真的落到 UI 上（防「加了 class 忘了配色」）：logic = #2563eb / light #eff6ff */
  ok(!!r.logicCardColor && r.logicCardColor.icon === "rgb(239, 246, 255)" && r.logicCardColor.bar === "rgb(37, 99, 235)",
    "数理逻辑卡主题色生效（图标底 + 左侧色条）", JSON.stringify(r.logicCardColor));
  ok(r.tools === 6, "学习工具 6 张线框卡");
  ok(r.featured === 3, "新手推荐 3 门课");
  ok(/还没有学习记录/.test(r.progress), "无进度时显示引导文案");
  ok(r.ext, "延伸阅读外站卡渲染");
  ok(r.navExt, "导航外站入口注入");
  ok(r.heroBtns === 2 && /开始我的学习/.test(r.heroBtnsText) && /按路径学会四门核心能力/.test(r.heroH1), "Hero：单标题+两按钮（四门核心能力）");

  console.log("\n== ② 学习路径 ==");
  await gotoHash(cdp, "#/courses");
  r = await evalJS(cdp, `({
    stages: document.querySelectorAll('#stageList .stage').length,
    metas: document.querySelectorAll('#stageList .stage-meta .badge').length,
    rec: document.querySelectorAll('.stage-recommend').length,
    flow: document.querySelectorAll('#mainlineStrip .flow-node').length,
    cards: document.querySelectorAll('#stageList .course-card').length,
    starts: document.querySelectorAll('#stageList .js-start').length,
    details: document.querySelectorAll('#stageList .js-detail').length,
    quizzes: document.querySelectorAll('#stageList .js-quiz').length,
    prereq: document.querySelectorAll('#stageList .cc-info').length
  })`);
  ok(r.stages === 4 && r.cards === 12, "4 阶段 12 课程卡");
  ok(r.metas >= 12, "阶段元信息徽章（时长/完成数/顺序）");
  ok(r.rec >= 3, "阶段「当前推荐」条");
  ok(r.flow === 4, "主线推荐链 4 节点");
  ok(r.starts === 12 && r.details === 12 && r.quizzes === 12, "每课三按钮（开始/详情/练习）");
  ok(r.prereq === 12, "前置知识与成果行");

  /* 弹窗 + 小节打勾 + 标记完成 */
  await evalJS(cdp, `document.querySelector('#stageList .course-card').dispatchEvent(new MouseEvent('click',{bubbles:true}))`);
  await sleep(250);
  r = await evalJS(cdp, `({
    open: !document.querySelector('#courseModal').hidden,
    lessons: document.querySelectorAll('#courseModalBody .lesson-list input').length,
    toggler: !!document.querySelector('#courseModalBody .js-toggle-done'),
    outcome: /学完你能/.test(document.querySelector('#courseModalBody').textContent)
  })`);
  ok(r.open && r.lessons === 3 && r.toggler && r.outcome, "课程弹窗：小节勾选/成果/完成按钮");
  await evalJS(cdp, `document.querySelector('#courseModalBody .lesson-list input').click()`);
  await sleep(150);
  r = await evalJS(cdp, `({
    lesson: JSON.parse(localStorage.getItem('ai-learning-progress-v1')).completedLessons,
    toast: !!document.querySelector('.toast')
  })`);
  ok(r.lesson.includes("c101:0"), "小节完成写入 localStorage", JSON.stringify(r.lesson));
  ok(r.toast, "Toast 反馈");
  await evalJS(cdp, `document.querySelector('#courseModalBody .js-toggle-done').click()`);
  await sleep(250);
  r = await evalJS(cdp, `({
    done: JSON.parse(localStorage.getItem('ai-learning-progress-v1')).completedCourses,
    flag: document.querySelectorAll('#stageList .course-card.done').length,
    modalLessonChecked: document.querySelectorAll('#courseModalBody .lesson-list li.checked').length
  })`);
  ok(r.done.includes("c101"), "整课标记 → completedCourses");
  ok(r.flag === 1, "课程卡显示已完成态");
  ok(r.modalLessonChecked >= 2, "整课完成联动小节勾选");
  await evalJS(cdp, `App.modal.hide(); true`);

  /* 弹窗直达路由 */
  await gotoHash(cdp, "#/courses/c102");
  r = await evalJS(cdp, `({open: !document.querySelector('#courseModal').hidden, t: document.querySelector('#courseModalBody h1').textContent})`);
  ok(r.open && /Python 基础速成/.test(r.t), "#/courses/<id> 弹窗直达");
  await evalJS(cdp, `App.modal.hide(); location.hash='#/home'; true`); await sleep(300);
  r = await evalJS(cdp, `({prog: document.querySelector('#homeProgress').textContent, hidden: document.querySelector('#courseModal').hidden})`);
  ok(/已完成 1 \/ 12/.test(r.prog), "首页进度卡显示完成数");
  ok(r.hidden, "离开课程页自动收起弹窗");

  console.log("\n== ③ 知识库 ==");
  await gotoHash(cdp, "#/knowledge");
  r = await evalJS(cdp, `({
    groups: document.querySelectorAll('#kbToolbar .chip').length,
    items: document.querySelectorAll('#kbList .kb-item').length,
    art: document.querySelector('#kbArticle h1') ? document.querySelector('#kbArticle h1').textContent : '',
    foot: document.querySelectorAll('#kbArticle .art-foot .af-link').length,
    related: /配套练习/.test(document.querySelector('#kbArticle').textContent)
  })`);
  ok(r.items === 76, "统一收录 76 篇（17+24+16+19）", String(r.items));
  ok(r.groups >= 10, "学科/难度/标签筛选条");
  ok(/什么是人工智能/.test(r.art), "默认打开第一篇");
  ok(r.foot >= 1 && r.related, "底部导航与配套练习");
  /* 学科筛选 */
  await evalJS(cdp, `document.querySelector('#kbToolbar .chip[data-f="subject"][data-v="ds"]').click()`);
  await sleep(200);
  r = await evalJS(cdp, `document.querySelectorAll('#kbList .kb-item').length`);
  ok(r === 24, "学科筛选=数据结构 → 24 章", String(r));
  /* 数理逻辑也收录进知识库并可筛选 */
  await evalJS(cdp, `document.querySelector('#kbToolbar .chip[data-f="subject"][data-v="logic"]').click()`);
  await sleep(200);
  r = await evalJS(cdp, `({
    n: document.querySelectorAll('#kbList .kb-item').length,
    titles: Array.from(document.querySelectorAll('#kbList .kb-item .t')).map(function (x) { return x.textContent; })
  })`);
  ok(r.n === 19, "学科筛选=数理逻辑 → 19 章", String(r.n));
  ok(r.titles.some((t) => /真值表/.test(t)) && r.titles.some((t) => /数学归纳法/.test(t)), "知识库列表含数理逻辑章节", JSON.stringify(r.titles.slice(0, 3)));
  /* 还原上一行的 ds 筛选，后面的「叠加难度筛选」断言依赖它 */
  await evalJS(cdp, `document.querySelector('#kbToolbar .chip[data-f="subject"][data-v="ds"]').click(); true`);
  await sleep(150);
  /* 难度筛选叠加 */
  await evalJS(cdp, `document.querySelector('#kbToolbar .chip[data-f="level"][data-v="进阶"]').click()`);
  await sleep(200);
  r = await evalJS(cdp, `document.querySelectorAll('#kbList .kb-item').length`);
  ok(r > 0 && r < 24, "叠加难度筛选（进阶 ds 章节）", String(r));
  /* 搜索分组 */
  await evalJS(cdp, `var el=document.querySelector('#kbSearch'); el.value='贝叶斯'; el.dispatchEvent(new Event('input',{bubbles:true})); true`);
  await sleep(400);
  r = await evalJS(cdp, `({
    groups: Array.from(document.querySelectorAll('#kbList .kb-group-title')).map(x=>x.textContent),
    any: document.querySelectorAll('#kbList .kb-item').length
  })`);
  ok(r.any > 0 && r.groups.some((g) => /知识笔记|练习题/.test(g)), "搜索分组：知识笔记/练习题", JSON.stringify(r.groups));
  /* 空结果（选一个所有字符都不存在于任何文档的查询） */
  await evalJS(cdp, `var el=document.querySelector('#kbSearch'); el.value='潶鵸鱻龘'; el.dispatchEvent(new Event('input',{bubbles:true})); true`);
  await sleep(400);
  r = await evalJS(cdp, `/没有找到/.test(document.querySelector('#kbList').textContent)`);
  ok(r, "空搜索结果有友好提示");
  await evalJS(cdp, `document.querySelector('#kbList .js-kb-reset').click(); true`); await sleep(200);
  /* 文章直达 + 上一条下一条 */
  await gotoHash(cdp, "#/knowledge/a5");
  r = await evalJS(cdp, `({t: document.querySelector('#kbArticle h1').textContent, prev: document.querySelectorAll('#kbArticle .art-foot .af-link').length})`);
  ok(/提示词/.test(r.t) && r.prev >= 2, "#/knowledge/a5 直达 + 上一条/下一条");

  console.log("\n== ④ 数据结构 / 概率统计 ==");
  await gotoHash(cdp, "#/ds/ds14");
  r = await evalJS(cdp, `({
    t: document.querySelector('#dsArticle h1').textContent,
    lc: document.querySelectorAll('#dsArticle .ex-lc').length,
    copy: document.querySelectorAll('#dsArticle .code-copy').length,
    tok: document.querySelectorAll('#dsArticle pre code .tok-kw2').length,
    foot: /配套练习/.test(document.querySelector('#dsArticle').textContent)
  })`);
  ok(/哈希表/.test(r.t), "#/ds/ds14 直达章节");
  ok(r.lc >= 1, "力扣原题链接渲染");
  ok(r.copy >= 3 && r.tok >= 10, "代码高亮 + 一键复制", JSON.stringify(r));
  ok(r.foot, "章末配套练习入口");
  await gotoHash(cdp, "#/prob/p04");
  r = await evalJS(cdp, `({t: document.querySelector('#probArticle h1').textContent, items: document.querySelectorAll('#probList .kb-item').length})`);
  ok(/贝叶斯/.test(r.t) && r.items === 16, "#/prob/p04 直达 + 16 章列表");
  /* KaTeX 公式渲染：行内 + 独立公式、结构件齐全、无 \( 残留、无错误标红 */
  r = await evalJS(cdp, `({
    katex: document.querySelectorAll('#probArticle .katex').length,
    disp: document.querySelectorAll('#probArticle .katex-display').length,
    frac: document.querySelectorAll('#probArticle .mfrac').length,
    supsub: document.querySelectorAll('#probArticle .msupsub').length,
    rawDelim: (function () { var bs = String.fromCharCode(92); var t = document.querySelector('#probArticle').innerText; return t.split(bs + '(').length - 1 + t.split(bs + '[').length - 1; })(),
    errColor: (function () { var bad = 0; document.querySelectorAll('#probArticle .katex span[style]').forEach(function (s) { if (/rgb\\(185, 28, 28\\)|#b91c1c/.test(s.getAttribute('style'))) bad++; }); return bad; })()
  })`);
  ok(r.katex >= 25 && r.disp >= 2, "概率页公式 KaTeX 渲染（行内+独立）", "katex=" + r.katex + " display=" + r.disp);
  ok(r.frac >= 2 && r.supsub >= 5, "分数 / 上下标结构件渲染", JSON.stringify({ frac: r.frac, ss: r.supsub }));
  ok(r.rawDelim === 0, "无未渲染的 \\( \\[ 残留", "left=" + r.rawDelim);
  ok(r.errColor === 0, "无 KaTeX 解析错误标红", "err=" + r.errColor);

  /* 公式渲染健壮性：表格内渲染 / 代码隔离 / 幂等 / MathML / 降级 */
  await gotoHash(cdp, "#/prob/p06");
  r = await evalJS(cdp, `(function () {
    var art = document.getElementById('probArticle');
    var before = art.querySelectorAll('.katex').length;
    App.math.typeset(art); App.math.typeset(art);
    return {
      before: before,
      after: art.querySelectorAll('.katex').length,
      tables: art.querySelectorAll('table').length,
      tableKatex: art.querySelectorAll('table .katex').length,
      preKatex: art.querySelectorAll('pre .katex, code .katex').length,
      mathml: art.querySelectorAll('.katex math').length
    };
  })()`);
  ok(r.tables > 0, "概率章节含公式速查表", "tables=" + r.tables);
  ok(r.tableKatex >= 10 && r.preKatex === 0, "表格内公式渲染 + 代码块完全隔离", JSON.stringify({ inTable: r.tableKatex, inPre: r.preKatex }));
  ok(r.before > 0 && r.after === r.before, "重复 typeset 幂等（不重复渲染）", JSON.stringify({ before: r.before, after: r.after }));
  ok(r.mathml > 0, "公式含 MathML（屏幕阅读器无障碍输出）", "mathml=" + r.mathml);
  /* KaTeX 整体不可用时的降级：剥成纯文本，不留 \\( \\) 生记号 */
  r = await evalJS(cdp, `(function () {
    var d = document.createElement('div');
    d.innerHTML = 'test \\\\(x^{2}\\\\) and \\\\[y_1\\\\]';
    document.body.appendChild(d);
    var save = window.renderMathInElement; window.renderMathInElement = null;
    App.math.typeset(d);
    window.renderMathInElement = save;
    var txt = d.textContent;
    document.body.removeChild(d);
    var bs = String.fromCharCode(92);
    return { txt: txt, slash: txt.split(bs).length - 1 };
  })()`);
  ok(r.slash === 0 && /x/.test(r.txt) && /y/.test(r.txt), "KaTeX 缺失时降级为纯文本（不留分隔符）", JSON.stringify(r));

  console.log("\n== ④b 数理逻辑 ==");
  await gotoHash(cdp, "#/logic/l03");
  r = await evalJS(cdp, `({
    t: document.querySelector('#logicArticle h1') ? document.querySelector('#logicArticle h1').textContent : '',
    items: document.querySelectorAll('#logicList .kb-item').length,
    subj: document.querySelectorAll('#logicArticle .badge.subj-logic').length,
    stages: Array.from(document.querySelectorAll('#logicList .kb-item .cat')).map(function (x) { return x.textContent.replace(/第.*$/, "").trim(); }),
    foot: document.querySelectorAll('#logicArticle .art-foot .af-link').length,
    quiz: /配套练习/.test(document.querySelector('#logicArticle').textContent),
    active: document.querySelectorAll('#logicList .kb-item.active').length,
    roadmap: document.querySelectorAll('#logicRoadmap .flow-node').length,
    katex: document.querySelectorAll('#logicArticle .katex').length,
    disp: document.querySelectorAll('#logicArticle .katex-display').length,
    tables: document.querySelectorAll('#logicArticle table').length,
    rawDelim: (function () { var bs = String.fromCharCode(92); var t = document.querySelector('#logicArticle').innerText; return t.split(bs + '(').length - 1 + t.split(bs + '[').length - 1; })(),
    errColor: (function () { var bad = 0; document.querySelectorAll('#logicArticle .katex span[style]').forEach(function (s) { if (/rgb\\(185, 28, 28\\)|#b91c1c/.test(s.getAttribute('style'))) bad++; }); return bad; })(),
    stray: /\\\\(?:eg |ot |eq )/.test(document.querySelector('#logicArticle').innerText)
  })`);
  ok(/逻辑联结词/.test(r.t), "#/logic/l03 直达章节", r.t);
  ok(r.items === 19, "数理逻辑 19 章目录", String(r.items));
  ok(r.subj === 1 && r.active === 1, "章节学科徽章 + 当前项高亮", JSON.stringify({ s: r.subj, a: r.active }));
  ok(r.foot >= 2 && r.quiz, "章末上一条/下一条与配套练习入口", JSON.stringify({ f: r.foot, q: r.quiz }));
  ok(r.roadmap === 5, "五阶段学习路线渲染", String(r.roadmap));
  ok(new Set(r.stages).size === 5, "目录按五阶段分组", JSON.stringify([...new Set(r.stages)]));
  ok(r.katex >= 20 && r.disp >= 1 && r.tables >= 2, "逻辑章节 KaTeX + 真值表渲染", JSON.stringify({ k: r.katex, d: r.disp, t: r.tables }));
  ok(r.rawDelim === 0 && r.errColor === 0, "逻辑页公式无 \\( 残留、无解析错误标红", JSON.stringify({ raw: r.rawDelim, err: r.errColor }));
  ok(r.stray === false, "逻辑正文无「反斜杠被吞」的破损命令", String(r.stray));
  /* 学科专属样式钩子逐项生效（.kb-item.active / .badge.subj-logic / .page-head.accent-logic） */
  var th = await evalJS(cdp, `({
    activeBorder: getComputedStyle(document.querySelector('#logicList .kb-item.active')).borderTopColor,
    activeBg: getComputedStyle(document.querySelector('#logicList .kb-item.active')).backgroundColor,
    badge: getComputedStyle(document.querySelector('#logicArticle .badge.subj-logic')).color,
    headIcon: getComputedStyle(document.querySelector('#view-logic .page-head h1 .icon')).color,
    h2: getComputedStyle(document.querySelector('#logicArticle h2')).borderLeftColor,
    /* 与 info 兜底图标逐字比较（两边都经同一 DOM 序列化，避免自闭合标签差异） */
    iconSvg: (function () {
      if (!App.icons.has('brain')) return false;
      var el = document.querySelector('#view-logic .page-head h1 .icon');
      var probe = document.createElement('span');
      probe.innerHTML = App.icons.svg('info', 20);
      return !!el && el.querySelector('svg') && el.innerHTML !== probe.innerHTML;
    })()
  })`);
  ok(th.activeBorder === "rgb(37, 99, 235)" && th.activeBg === "rgb(239, 246, 255)",
    "逻辑目录当前项用学科主题色高亮", JSON.stringify({ b: th.activeBorder, bg: th.activeBg }));
  ok(th.badge === "rgb(29, 78, 216)" && th.headIcon === "rgb(29, 78, 216)" && th.h2 === "rgb(37, 99, 235)",
    "逻辑徽章 / 标题条 / 正文 h2 左边线均为主题色", JSON.stringify({ bd: th.badge, hi: th.headIcon, h2: th.h2 }));
  ok(th.iconSvg, "brain 图标已注入（非 info 兜底）");
  /* 上一条 / 下一条：l03 → l04 */
  await evalJS(cdp, `var a=document.querySelector('#logicArticle .art-foot .af-link.next'); a ? (location.hash=a.getAttribute('href')) : 0; true`);
  await sleep(500);
  r = await evalJS(cdp, `({t: document.querySelector('#logicArticle h1').textContent, hash: location.hash})`);
  ok(/真值表/.test(r.t) && /l04/.test(r.hash), "逻辑章节「下一条」跳转", JSON.stringify(r));

  console.log("\n== ⑤ 练习测验 ==");
  await gotoHash(cdp, "#/quiz");
  r = await evalJS(cdp, `({
    one: document.querySelectorAll('#quizApp .q-card').length,
    count: document.querySelector('.quiz-count').textContent,
    q1: /机器学习/.test(document.querySelector('#quizApp .q-title').textContent),
    opts: document.querySelectorAll('#quizApp .opt').length
  })`);
  ok(r.one === 1 && r.opts === 4, "默认一次一题（4 选项）");
  ok(/第\s*1\s*\/\s*96/.test(r.count.replace(/\s+/g, " ")), "顶部进度「第 1 / 96 题」", r.count);
  /* 答错：错项注释 + 进错题本 */
  await evalJS(cdp, `document.querySelector('#quizApp .opt[data-o="0"]').click()`);
  await sleep(250);
  r = await evalJS(cdp, `({
    explain: !!document.querySelector('#quizApp .explain.show'),
    right: document.querySelectorAll('#quizApp .opt.correct').length,
    wrong: document.querySelectorAll('#quizApp .opt.wrong').length,
    notes: document.querySelectorAll('#quizApp .opt-note').length,
    noteText: document.querySelector('#quizApp .opt-note') ? document.querySelector('#quizApp .opt-note').textContent.length : 0,
    wrongs: JSON.parse(localStorage.getItem('ai-learning-progress-v1')).wrongQuestions.length,
    prog: JSON.parse(localStorage.getItem('ai-learning-progress-v1')).quizProgress,
    kn: !!document.querySelector('.js-qz-next') || !!document.querySelector('[href^="#/knowledge"]')
  })`);
  ok(r.explain && r.right === 1 && r.wrong === 1, "即时批改：标对错 + 解析");
  ok(r.notes === 3 && r.noteText > 30, "三个错误选项各有「为什么不选」", String(r.notes));
  ok(r.wrongs === 1, "答错自动进错题本");
  ok(r.prog["1"] === 0, "答题进度持久化", JSON.stringify(r.prog));
  ok(r.kn, "下一题 / 相关知识点入口");
  /* 每页 5 题 */
  await evalJS(cdp, `document.querySelector('#quizApp .chip[data-s="pageSize"][data-v="5"]').click()`);
  await sleep(200);
  r = await evalJS(cdp, `document.querySelectorAll('#quizApp .q-card').length`);
  ok(r === 5, "切换每页 5 题");
  await evalJS(cdp, `document.querySelector('#quizApp .chip[data-s="pageSize"][data-v="1"]').click()`);
  await sleep(150);
  /* 学科筛选 */
  await evalJS(cdp, `document.querySelector('#quizApp .chip[data-s="subject"][data-v="ds"]').click()`);
  await sleep(200);
  r = await evalJS(cdp, `({count: document.querySelector('.quiz-count').textContent, badge: document.querySelectorAll('#quizApp .badge.subj-ds').length})`);
  ok(/18/.test(r.count), "数据结构学科 18 题", r.count);
  ok(r.badge >= 1, "题目卡学科徽章");
  await evalJS(cdp, `document.querySelector('#quizApp .chip[data-s="subject"][data-v="all"]').click()`);
  await sleep(150);
  /* 数理逻辑学科筛选 + 答一道逻辑题（即时批改 / 逐项注释 / 相关知识点直达） */
  await evalJS(cdp, `document.querySelector('#quizApp .chip[data-s="subject"][data-v="logic"]').click()`);
  await sleep(200);
  r = await evalJS(cdp, `({
    count: document.querySelector('.quiz-count').textContent,
    badge: document.querySelectorAll('#quizApp .badge.subj-logic').length,
    cat: (document.querySelector('#quizApp .q-badges .badge.gray') || {}).textContent,
    q: document.querySelector('#quizApp .q-title').textContent
  })`);
  ok(/27/.test(r.count), "数理逻辑学科 27 题", r.count);
  ok(r.badge === 1, "逻辑题学科徽章 subj-logic");
  /* 按正确答案作答：仍应渲染 3 条「为什么不选」（验证逻辑题注释的题号偏移合并生效） */
  var lq = await evalJS(cdp, `(function () {
    var id = +document.querySelector('#quizApp .q-card').dataset.qid;
    var q = APP_DATA.quiz[id - 1];
    document.querySelector('#quizApp .opt[data-o="' + q.answer + '"]').click();
    return id;
  })()`);
  await sleep(250);
  r = await evalJS(cdp, `({
    notes: document.querySelectorAll('#quizApp .opt-note').length,
    noteMin: Math.min.apply(null, Array.from(document.querySelectorAll('#quizApp .opt-note')).map(function (x) { return x.textContent.length; })),
    explainOk: /回答正确/.test((document.querySelector('#quizApp .explain.show') || {}).textContent || ''),
    wrongMark: document.querySelectorAll('#quizApp .opt.wrong').length,
    correctMark: document.querySelectorAll('#quizApp .opt.correct').length,
    hasLogicLink: !!document.querySelector('#quizApp a[href^="#/logic/"]')
  })`);
  ok(r.explainOk && r.correctMark === 1 && r.wrongMark === 0, "逻辑题判分正确（第 " + lq + " 题）", JSON.stringify(r));
  ok(r.notes === 3 && r.noteMin > 8, "逻辑题错误选项均有「为什么不选」注释", JSON.stringify({ n: r.notes, min: r.noteMin }));
  ok(r.hasLogicLink, "逻辑题解析可直达对应章节");
  await evalJS(cdp, `document.querySelector('#quizApp .chip[data-s="subject"][data-v="all"]').click()`);
  await sleep(150);
  /* 直达题号 */
  await gotoHash(cdp, "#/quiz/all/q44");
  r = await evalJS(cdp, `document.querySelector('.quiz-count').textContent`);
  ok(/第 44 \/ 96/.test(r), "#/quiz/all/q44 直达第 44 题", r);
  /* 全部答对 → 能力分析 */
  await evalJS(cdp, `for (var i = 1; i <= APP_DATA.quiz.length; i++) App.state.recordQuiz(i, APP_DATA.quiz[i-1].answer); App.pages.quiz.render(); true`);
  await sleep(400);
  r = await evalJS(cdp, `({
    show: !!document.querySelector('#quizApp .quiz-result.show'),
    score: document.querySelector('#quizApp .score') ? document.querySelector('#quizApp .score').textContent : '',
    subs: document.querySelectorAll('#quizApp .bd-row').length,
    weak: /全部答对/.test(document.querySelector('#quizApp').textContent),
    retry: !!document.querySelector('.js-qz-retry-wrong')
  })`);
  ok(r.show && /100/.test(r.score), "完成全部题 → 结果页总分 100");
  ok(r.subs === 4, "四学科能力分析行", String(r.subs));
  ok(r.weak, "无薄弱点提示");
  /* 错题本 */
  await gotoHash(cdp, "#/quiz/wrong");
  r = await evalJS(cdp, `({
    book: document.querySelectorAll('#quizApp .wb-item').length,
    tab: /错题本/.test(document.querySelector('#quizApp').textContent)
  })`);
  ok(r.book === 1 && r.tab, "错题本页（1 道答错 + 收藏）", String(r.book));
  /* 全部答完时恒显结果页：先「重新开始本组」清作答（错题本保留），才能回到题目卡 */
  await gotoHash(cdp, "#/quiz");
  await evalJS(cdp, `document.querySelector('#quizApp .js-qz-restart').click()`);
  await sleep(200);
  r = await evalJS(cdp, `({prog: Object.keys(JSON.parse(localStorage.getItem('ai-learning-progress-v1')).quizProgress).length, wrongs: JSON.parse(localStorage.getItem('ai-learning-progress-v1')).wrongQuestions.length})`);
  ok(r.prog === 0 && r.wrongs === 1, "重新开始：清本组进度、保留错题本", JSON.stringify(r));
  /* 收藏 ☆（直达一道未答且不在错题本的题） */
  await gotoHash(cdp, "#/quiz/all/q2");
  await evalJS(cdp, `document.querySelector('#quizApp .js-star').click()`);
  await sleep(200);
  r = await evalJS(cdp, `JSON.parse(localStorage.getItem('ai-learning-progress-v1')).wrongQuestions.length`);
  ok(r === 2, "☆ 收藏加入错题本", String(r));

  console.log("\n== ⑥ AI 助手 ==");
  await gotoHash(cdp, "#/chat");
  r = await evalJS(cdp, `({
    notice: /暂不支持开放域对话/.test(document.querySelector('.chat-notice').textContent),
    groups: Array.from(document.querySelectorAll('#chatQuick .qlabel')).map(x=>x.textContent),
    msgs: document.querySelectorAll('#chatBody .msg').length
  })`);
  ok(r.notice, "产品边界提示常驻");
  const need = ["学习规划", "概念解释", "题目讲解", "课程推荐"];
  ok(need.every((g) => r.groups.some((x) => x.includes(g))), "快捷问题四类分组", JSON.stringify(r.groups));
  await evalJS(cdp, `document.querySelector('#chatQuick .chip').click()`);
  await sleep(2300);
  r = await evalJS(cdp, `({
    msgs: document.querySelectorAll('#chatBody .msg').length,
    hasRouteLink: !!document.querySelector('#chatBody .msg.ai .bubble a'),
    actions: document.querySelectorAll('#chatBody .msg.ai .msg-actions .btn').length
  })`);
  ok(r.msgs >= 3, "快捷问题可发送并收到回复", String(r.msgs));
  ok(r.actions >= 2, "回复附带继续学习/查看练习题按钮", String(r.actions));
  /* 未找到兜底 */
  r = await evalJS(cdp, `App.pages.chat ? window.AI_CHAT.mockReply('今天天气怎么样啊') : ''`);
  ok(/我暂时没有找到相关内容|站内帮你找到了/.test(r), "开放域问题 → 兜底文案", String(r).slice(0, 60));
  /* 聊天持久化 */
  r = await evalJS(cdp, `JSON.parse(localStorage.getItem('ai-learning-chat-v1')||'[]').length`);
  ok(r >= 3, "聊天记录 localStorage 持久化", String(r));

  console.log("\n== ⑦ 搜索与快捷键 ==");
  await evalJS(cdp, `document.activeElement.blur(); document.dispatchEvent(new KeyboardEvent('keydown',{key:'/',bubbles:true}))`);
  await sleep(250);
  r = await evalJS(cdp, `({open: !document.querySelector('#searchModal').hidden, focused: document.activeElement.id})`);
  ok(r.open, "按 / 呼出全站搜索");
  await evalJS(cdp, `var el=document.querySelector('#searchInput'); el.value='蒲丰'; el.dispatchEvent(new Event('input',{bubbles:true})); true`);
  var sr = null;
  for (var si = 0; si < 20; si++) {
    sr = await evalJS(cdp, `({n: document.querySelectorAll('#searchResults .search-item').length,
      v: Array.from(document.querySelector('#searchInput').value).map(function(c){return c.codePointAt(0);}).join(','),
      h: document.querySelector('#searchResults').innerHTML.slice(0, 120)})`);
    if (sr.n > 0) break;
    await sleep(150);
  }
  ok(sr.n > 0, "中文稀有词「蒲丰」命中", JSON.stringify(sr));
  /* 数理逻辑关键词必须可搜到，且结果路由指向对应章节（复用同一索引，无第二套搜索） */
  r = await evalJS(cdp, `(function () {
    App.search.build();
    var terms = ['数理逻辑', '命题', '真值表', '逻辑联结词', '蕴含', '德摩根律', 'CNF', 'DNF', '谓词', '全称量词', '存在量词', '数学归纳法'];
    var miss = [], deep = [];
    terms.forEach(function (t) {
      var hits = App.search.search(t, 5);
      var at = -1;
      hits.forEach(function (h, i) { if (at === -1 && /^#\\/logic\\//.test(h.route)) at = i; });
      if (at === -1) miss.push(t);
      else if (at > 2) deep.push(t + '→第' + (at + 1) + '位');
    });
    return { miss: miss, deep: deep };
  })()`);
  ok(r.miss.length === 0, "12 个数理逻辑关键词均可搜到并跳转章节", JSON.stringify(r.miss));
  /* 「蕴含」「德摩根律」等词若恰好是题干标题，题目会合理地排在章节之前：只要求前 3 内出现章节 */
  ok(r.deep.length === 0, "逻辑章节在搜索结果前 3 位内", JSON.stringify(r.deep));
  /* 点击搜索结果 → 直达逻辑章节（取首条章节结果，不用题目路由，避免污染测验内部状态） */
  var sroute = await evalJS(cdp, `(function () {
    var h = App.search.search('德摩根律', 8).filter(function (x) { return /^#\\/logic\\//.test(x.route); })[0];
    return h ? h.route : '';
  })()`);
  await evalJS(cdp, `location.hash = ${JSON.stringify(sroute)}; true`);
  await sleep(600);
  r = await evalJS(cdp, `({hash: location.hash, t: document.querySelector('#logicArticle h1') ? document.querySelector('#logicArticle h1').textContent : ''})`);
  ok(/^#\/logic\/l0[56]$/.test(r.hash) && /逻辑等价|逆否/.test(r.t), "搜索结果直达逻辑章节", JSON.stringify(r));
  /* 复位到首页：不让上面的跳转把 quiz.js 的 S.pos 留在题目上，影响 ⑧ 的答题断言 */
  await gotoHash(cdp, "#/home");
  await evalJS(cdp, `App.modal.hide(); true`);

  console.log("\n== ⑧ 刷新持久化 & 前进后退 ==");
  /* 重新开始后进度为空：先回练习视图再答一题制造可持久化状态，刷新验证 */
  await gotoHash(cdp, "#/quiz");
  await evalJS(cdp, `document.querySelector('#quizApp .opt[data-o="0"]').click()`);
  await sleep(250);
  await reload(cdp);
  r = await evalJS(cdp, `({
    prog: JSON.parse(localStorage.getItem('ai-learning-progress-v1')).quizProgress,
    wrongs: JSON.parse(localStorage.getItem('ai-learning-progress-v1')).wrongQuestions.length,
    starOn: document.querySelectorAll('#quizApp .js-star.on').length,
    last: JSON.parse(localStorage.getItem('ai-learning-progress-v1')).lastVisitedRoute
  })`);
  ok(Object.keys(r.prog).length === 1, "刷新后答题进度保留", JSON.stringify(r.prog));
  ok(r.wrongs === 2 && r.starOn >= 1, "刷新后错题本与收藏态保留", JSON.stringify({ wrongs: r.wrongs, starOn: r.starOn, prog: Object.keys(r.prog) }));
  ok(/quiz/.test(r.last), "lastVisitedRoute 记忆", r.last);
  /* 显式构造两跳历史：#/chat → #/ds/ds03，再后退/前进 */
  await gotoHash(cdp, "#/chat");
  await gotoHash(cdp, "#/ds/ds03");
  await evalJS(cdp, `history.back(); true`); await sleep(600);
  r = await evalJS(cdp, `({hash: location.hash, chatActive: document.querySelector('#view-chat').classList.contains('active'), ds: !!document.querySelector('#chatBody')})`);
  ok(/chat/.test(r.hash) && r.chatActive, "浏览器后退回到 #/chat", r.hash);
  await evalJS(cdp, `history.forward(); true`); await sleep(600);
  r = await evalJS(cdp, `({hash: location.hash, ds: document.querySelector('#dsArticle h1') ? document.querySelector('#dsArticle h1').textContent : ''})`);
  ok(/ds03|算法基础/.test(r.hash + r.ds), "浏览器前进回到 #/ds/ds03", r.hash + " " + r.ds);

  console.log("\n== ⑨ 无头验证钩子 ==");
  await cdp.send("Page.navigate", { url: base + "/index.html?autosearch=%E8%B4%9D%E5%8F%B6%E6%96%AF#/home" });
  await sleep(1400);
  r = await evalJS(cdp, `document.title`);
  ok(/^SR:\d+:/.test(r) && !/:0:/.test(r), "?autosearch 钩子", r);
  await cdp.send("Page.navigate", { url: base + "/index.html?autochat=%E4%BB%80%E4%B9%88%E6%98%AF%E8%BF%87%E6%8B%9F%E5%90%88#/chat" });
  await sleep(1400);
  r = await evalJS(cdp, `document.title`);
  ok(/^AI:/.test(r), "?autochat 钩子", r);

  console.log("\n== ⑩ 控制台与网络 ==");
  ok(pageExceptions.length === 0, "无未捕获 JS 异常", pageExceptions.join(" | "));
  ok(consoleErrors.length === 0, "无 console.error", consoleErrors.join(" | "));
  ok(badLoads.length === 0, "无资源 404/加载失败", badLoads.join(" | "));

  console.log("\n== ⑪ file:// 直开冒烟 ==");
  const fileUrl = "file:///" + path.join(ROOT, "index.html").replace(/\\/g, "/") + "#/home";
  const fileExceptions = [];
  cdp.on((method, params) => {
    if (method === "Runtime.exceptionThrown") fileExceptions.push(String(params.exceptionDetails.exception?.description || "").split("\n")[0]);
  });
  await cdp.send("Page.navigate", { url: fileUrl });
  await sleep(1800);
  r = await evalJS(cdp, `({
    home: document.querySelector('#view-home').classList.contains('active'),
    subjects: document.querySelectorAll('#subjectGrid .subject-card').length,
    stats: document.querySelector('#statCourses').textContent
  })`);
  ok(r.home && r.subjects === 4 && r.stats === "12", "file:// 双击可完整渲染（四板块）", JSON.stringify(r));
  ok(fileExceptions.length === 0, "file:// 无 JS 异常", fileExceptions.join(" | "));

  console.log("\n== ⑫ 移动端布局（375px 无横向溢出）==");
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 375, height: 720, deviceScaleFactor: 2, mobile: false });
  const mProbe = `(function () {
    var de = document.documentElement;
    return { over: Math.max(de.scrollWidth, document.body.scrollWidth) - window.innerWidth, iw: window.innerWidth };
  })()`;
  let worst = { over: -999, route: "" };
  for (const h of ["#/prob/p06", "#/prob/p09", "#/ds/ds14", "#/logic/l03", "#/logic/l05", "#/logic/l16", "#/home", "#/quiz"]) {
    await cdp.send("Page.navigate", { url: base + "/index.html" + h });
    await sleep(1200);
    const m = await evalJS(cdp, mProbe);
    if (m.over > worst.over) worst = { over: m.over, route: h, innerW: m.iw };
  }
  ok(worst.over <= 1, "含宽表格 / 长公式的教程页与首页、测验 375px 无横向溢出", JSON.stringify(worst));
  await cdp.send("Page.navigate", { url: base + "/index.html#/knowledge" });
  await sleep(1200);
  const m2 = await evalJS(cdp, mProbe);
  ok(m2.over <= 1, "知识库 375px 无横向溢出", JSON.stringify(m2));
  /* 窄屏自适应换行：表格与单元格不得内部溢出，且不应再存在横向滚动容器
     l03 的六列真值表（P/Q/∧/∨/→/↔）与 l05 的等价律大表是全站最宽的表格 */
  for (const tp of ["#/prob/p06", "#/logic/l03", "#/logic/l05"]) {
    await cdp.send("Page.navigate", { url: base + "/index.html" + tp });
    await sleep(1300);
    const fit = await evalJS(cdp, `(function () {
      var view = document.querySelector('.view.active') || document.body;
      var art = view.querySelector('.kb-article');
      var tables = Array.prototype.slice.call(art.querySelectorAll('table'));
      var worstTable = 0, worstCell = 0, cellTxt = '';
      tables.forEach(function (t) { worstTable = Math.max(worstTable, t.scrollWidth - t.clientWidth); });
      art.querySelectorAll('th, td').forEach(function (c) {
        var o = c.scrollWidth - c.clientWidth;
        if (o > worstCell) { worstCell = o; cellTxt = (c.textContent || '').trim().slice(0, 30); }
      });
      /* 卡片式独立公式与正文文字同样不得溢出正文盒 */
      var artBox = art.clientWidth - 8;
      var overflowKids = 0;
      art.querySelectorAll('table, .katex-display, p, ul, pre').forEach(function (n) {
        if (n.getBoundingClientRect().right > art.getBoundingClientRect().right + 1) overflowKids++;
      });
      return { tables: tables.length, worstTable: worstTable, worstCell: worstCell, cellTxt: cellTxt, wrap: art.querySelectorAll('.table-wrap').length, overflowKids: overflowKids, artBox: artBox };
    })()`);
    ok(fit.tables > 0 && fit.worstTable <= 1 && fit.worstCell <= 1 && fit.overflowKids === 0,
      tp + " 窄屏表格自适应换行（表格/单元格/正文子元素均无溢出）", JSON.stringify(fit));
    ok(fit.wrap === 0, tp + " 无表格横向滚动容器（已改为自适应换行）", "table-wrap=" + fit.wrap);
  }
  await cdp.send("Emulation.clearDeviceMetricsOverride");

  console.log("\n== ⑬ 导航与四卡布局（多视口）==");
  /* 第 4 个导航项加入后，桌面 / 平板（>720px 不折叠汉堡菜单）必须：
     ① 页面不产生横向滚动 ② 导航项互不重叠
     ③ 导航要么整体放得下，要么自身可拖动（overflow-x:auto）且搜索/汉堡始终可见 */
  const navProbe = `(function () {
    var links = document.querySelector('#navLinks');
    var items = Array.prototype.slice.call(links.querySelectorAll('a'));
    var last = items[items.length - 1].getBoundingClientRect();
    var nav = document.querySelector('.nav').getBoundingClientRect();
    var de = document.documentElement;
    var overlap = 0;
    items.forEach(function (a, i) {
      if (!i) return;
      var p = items[i - 1].getBoundingClientRect(), c = a.getBoundingClientRect();
      if (c.width && p.width && c.left < p.right - 0.5) overlap++;
    });
    var fits = links.scrollWidth - links.clientWidth <= 1 && nav.right - last.right >= -0.5;
    var scrollable = /auto|scroll/.test(getComputedStyle(links).overflowX);
    var sr = document.querySelector('.nav-right').getBoundingClientRect();
    return {
      over: Math.max(de.scrollWidth, document.body.scrollWidth) - window.innerWidth,
      overlap: overlap,
      fits: fits,
      scrollable: scrollable,
      searchVisible: sr.width > 40 && sr.right <= window.innerWidth + 0.5,
      mode: fits ? 'fit' : (scrollable ? 'drag' : 'clip')
    };
  })()`;
  for (const w of [1440, 1280, 1200, 1100, 1000, 900, 800, 760]) {
    await cdp.send("Emulation.setDeviceMetricsOverride", { width: w, height: 900, deviceScaleFactor: 1, mobile: false });
    await cdp.send("Page.navigate", { url: base + "/index.html#/home" });
    await sleep(900);
    const nv = await evalJS(cdp, navProbe);
    ok(nv.over <= 1 && nv.overlap === 0 && (nv.fits || nv.scrollable) && nv.searchVisible,
      w + "px 导航不溢出/不重叠（" + nv.mode + "）", JSON.stringify(nv));
  }
  /* 首页四张学科卡：宽屏 4 列、平板 2 列、手机 1 列，且卡片不被压垮 */
  const gridProbe = `(function () {
    var g = document.querySelector('#subjectGrid');
    var cols = getComputedStyle(g).gridTemplateColumns.split(' ').filter(Boolean).length;
    var widths = Array.prototype.slice.call(g.children).map(function (c) { return Math.round(c.getBoundingClientRect().width); });
    return { cols: cols, min: Math.min.apply(null, widths), max: Math.max.apply(null, widths) };
  })()`;
  const gridExpect = { 1440: 4, 1280: 4, 1200: 2, 1000: 2, 375: 1 };
  for (const w of [1440, 1280, 1200, 1000, 375]) {
    await cdp.send("Emulation.setDeviceMetricsOverride", { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 720 });
    await cdp.send("Page.navigate", { url: base + "/index.html#/home" });
    await sleep(900);
    const g = await evalJS(cdp, gridProbe);
    ok(g.cols === gridExpect[w] && g.min >= 230, w + "px 学科卡 " + g.cols + " 列（期望 " + gridExpect[w] + "）", JSON.stringify(g));
  }
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 375, height: 720, deviceScaleFactor: 2, mobile: true });
  await cdp.send("Page.navigate", { url: base + "/index.html#/logic/l03" });
  await sleep(1200);
  r = await evalJS(cdp, `(function () {
    var de = document.documentElement;
    var links = document.querySelector('#navLinks');
    return {
      over: Math.max(de.scrollWidth, document.body.scrollWidth) - window.innerWidth,
      menuCollapsed: getComputedStyle(links).display === 'none',
      toggle: getComputedStyle(document.querySelector('#navToggle')).display !== 'none',
      katex: document.querySelectorAll('#logicArticle .katex').length,
      raw: (function () { var bs = String.fromCharCode(92); var t = document.querySelector('#logicArticle').innerText; return t.split(bs + '(').length - 1; })()
    };
  })()`);
  ok(r.over <= 1 && r.menuCollapsed && r.toggle, "375px 逻辑页无横向溢出且菜单已折叠", JSON.stringify(r));
  ok(r.katex > 0 && r.raw === 0, "375px 逻辑页公式仍正常渲染", JSON.stringify(r));
  await cdp.send("Emulation.clearDeviceMetricsOverride");

  /* 复位浏览器端 localStorage，避免测试数据残留影响人工体验（无头实例独立 profile，仅保险） */
  try { await evalJS(cdp, `localStorage.clear(); true`); } catch { }
  ws.close();
  proc.kill();
  srv.close();
  try { fs.rmSync(userData, { recursive: true, force: true }); } catch { }

  console.log("\n========================================");
  console.log("通过 " + passed + " 项" + (failures.length ? "，失败 " + failures.length + " 项：" : "，全部通过 ✅"));
  failures.forEach((f) => console.log("  ✗ " + f));
  process.exit(failures.length ? 1 : 0);
}

/* 总超时保险 */
const watchdog = setTimeout(() => { console.error("TIMEOUT"); process.exit(2); }, 240000);
main().then(() => clearTimeout(watchdog)).catch((e) => { console.error("HARNESS ERROR:", e); process.exit(2); });

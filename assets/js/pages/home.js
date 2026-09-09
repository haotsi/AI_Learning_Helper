/* ============================================================
   页面 · 首页
   层级：Hero（静态）→ 我的学习进度 → 三大学科板块 → 学习工具
        → 新手推荐 → 延伸阅读
   首屏只保留：主标题 / 说明 / 主按钮 / 次按钮 / 3 个统计。
   ============================================================ */
(function () {
  "use strict";

  var dom = window.App.dom;
  var icons = window.App.icons;
  var esc = dom.esc;
  var $ = dom.$;

  function D() { return window.APP_DATA; }
  function quizCountOf(subject) {
    return (D().quiz || []).filter(function (q) {
      return window.App.search.subjectOfCat(q.cat) === subject;
    }).length;
  }
  function allCourses() {
    return (D().stages || []).reduce(function (acc, s) { return acc.concat(s.courses || []); }, []);
  }

  /* ---------------- 我的学习进度 ---------------- */
  function renderProgress() {
    var host = $("#homeProgress");
    if (!host) return;
    var st = window.App.state;
    if (!st.hasActivity()) {
      host.innerHTML =
        '<div class="progress-card">' +
        '<div class="pc-icon">' + icons.get("compass", 20) + "</div>" +
        '<div class="pc-main"><div class="pc-title">还没有学习记录，从第一门课程开始吧</div>' +
        '<div class="pc-sub">学习进度、错题本与答题记录会保存在这台设备的浏览器里，刷新与关闭都不丢失。</div></div>' +
        '<div class="pc-actions"><a class="btn btn-primary btn-sm" href="#/courses">' + icons.get("play", 14) + " 开始第一门课程</a>" +
        '<a class="btn btn-ghost btn-sm" href="#/knowledge">先逛逛知识库</a></div></div>';
      return;
    }
    var s = st.stats();
    var total = allCourses().length || 12;
    var pct = Math.min(100, Math.round((s.coursesDone / total) * 100));
    var last = st.raw().lastVisitedRoute;
    host.innerHTML =
      '<div class="progress-card">' +
      '<div class="pc-icon">' + icons.get("route", 20) + "</div>" +
      '<div class="pc-main"><div class="pc-title">我的学习进度</div>' +
      '<div class="pc-sub">已完成 ' + s.coursesDone + " / " + total + " 门课程 · " + s.lessonsDone +
      " 个小节 · 错题本 " + s.wrong + " 题</div>" +
      '<div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct +
      '"><div class="fill" style="width:' + pct + '%"></div></div></div>' +
      '<div class="pc-actions">' +
      (last ? '<a class="btn btn-primary btn-sm" href="' + esc(last) + '">' + icons.get("play", 14) + " 继续上次学习</a>" :
        '<a class="btn btn-primary btn-sm" href="#/courses">' + icons.get("play", 14) + " 继续学习</a>") +
      '<a class="btn btn-ghost btn-sm" href="#/quiz">' + icons.get("pencil", 14) + " 今日一练</a>" +
      (s.wrong ? '<a class="btn btn-ghost btn-sm" href="#/quiz/wrong">' + icons.get("bookmark", 14) + " 错题本 " + s.wrong + "</a>" : "") +
      "</div></div>";
  }

  /* ---------------- 区块标题（组件：section-header.js） ---------------- */
  function renderHeads() {
    var sh = window.App.sectionHeader;
    var h1 = $("#subjectHead");
    if (h1) h1.innerHTML = sh.html("grid", "三大学科板块", "「学什么」：三大基础学科并列推进，各自成体系、彼此相连；按兴趣自由进入，不必从 AI 开始。");
    var h2 = $("#toolHead");
    if (h2) h2.innerHTML = sh.html("compass", "学习工具", "「怎么学」：路径 → 知识库 → 测验 → 错题本 → 助手 → 搜索，六个动作串起学习闭环。");
  }

  /* ---------------- 三大学科板块（主题色卡：学什么） ---------------- */
  function renderSubjects() {
    var host = $("#subjectGrid");
    if (!host) return;
    var d = D();
    var cards = [
      {
        cls: "card-ai", icon: "cpu", name: "AI 人工智能",
        desc: "从入门概念到大模型应用：四阶段学习路径 + 知识笔记与代码实战。",
        counts: [(d.stages || []).reduce(function (n, s) { return n + (s.courses || []).length; }, 0) + " 门课程",
          (d.articles || []).length + " 篇笔记", quizCountOf("ai") + " 道练习"],
        route: "#/courses", go: "进入学习路径"
      },
      {
        cls: "card-ds", icon: "layers", name: "数据结构与算法",
        desc: "C/C++ 分章教程：手写实现 + STL 对照 + 复杂度分析，章末配典型例题。",
        counts: [(d.ds || []).length + " 个章节", quizCountOf("ds") + " 道练习", "25 道典型例题"],
        route: "#/ds", go: "进入章节教程"
      },
      {
        cls: "card-prob", icon: "dice", name: "概率论与数理统计",
        desc: "贝叶斯、常见分布、CLT、MLE 与蒙特卡洛：直觉 + 公式速查 + Python 模拟。",
        counts: [(d.prob || []).length + " 个章节", quizCountOf("prob") + " 道练习"],
        route: "#/prob", go: "进入系列教程"
      }
    ];
    host.innerHTML = cards.map(function (c) {
      return '<a class="subject-card ' + c.cls + '" href="' + c.route + '">' +
        '<div class="icon-xl">' + icons.get(c.icon, 24) + "</div>" +
        "<h3>" + esc(c.name) + "</h3><p>" + esc(c.desc) + "</p>" +
        '<div class="counts">' + c.counts.map(function (t) { return "<b>" + esc(t) + "</b>"; }).join("<span>·</span>") + "</div>" +
        '<div class="go">' + esc(c.go) + " " + icons.get("arrowRight", 14) + "</div></a>";
    }).join("");
  }

  /* ---------------- 学习工具（线框卡：怎么学） ---------------- */
  function renderTools() {
    var host = $("#toolGrid");
    if (!host) return;
    var t = [
      { icon: "map", t: "学习路径", d: "四个阶段循序渐进，标注时长、前置知识与完成进度。", u: "#/courses", go: "查看路径" },
      { icon: "library", t: "知识库", d: "跨学科统一检索：按学科 / 难度 / 标签筛选笔记与章节。", u: "#/knowledge", go: "翻阅内容" },
      { icon: "pencil", t: "练习测验", d: "一题一答、即答即批，解析讲透每个选项。", u: "#/quiz", go: "开始自测" },
      { icon: "bookmark", t: "错题本", d: "答错自动收录，支持重做、移出的针对性复盘。", u: "#/quiz/wrong", go: "复盘错题" },
      { icon: "chat", t: "AI 助手", d: "站内知识问答：学习规划、概念解释、题目讲解、课程推荐。", u: "#/chat", go: "发起提问" },
      { icon: "search", t: "全站搜索", d: "检索课程、笔记、章节与题目正文，键盘秒达。", u: "js:search", go: "立即搜索" }
    ];
    host.innerHTML = t.map(function (c) {
      var isJs = c.u === "js:search";
      return (isJs ? '<a class="tool-card js-open-search" href="#/home" role="button">' : '<a class="tool-card" href="' + c.u + '">') +
        '<div class="tool-top">' + icons.get(c.icon, 20) + "<h3>" + esc(c.t) + "</h3></div>" +
        "<p>" + esc(c.d) + '</p><div class="go">' + esc(c.go) + " " + icons.get("arrowRight", 13) + "</div></a>";
    }).join("");
  }

  /* ---------------- 新手推荐（前 3 门课程） ---------------- */
  function renderFeatured() {
    var host = $("#featuredCourses");
    if (!host) return;
    host.innerHTML = allCourses().slice(0, 3).map(function (c) {
      return window.App.courseCard.render(c, { compact: true });
    }).join("");
  }

  /* ---------------- 延伸阅读（外站数据驱动） ---------------- */
  function renderExt() {
    var host = $("#extBlock");
    if (!host) return;
    var w = (D().externalLinks || {}).wiki;
    if (!w) { host.innerHTML = ""; return; }
    host.innerHTML =
      '<div class="ext-card"><div>' +
      "<h3>" + icons.get("cap", 18) + " " + esc(w.name) + "</h3>" +
      "<p>" + esc(w.desc) + "</p></div>" +
      '<div class="ext-links"><a class="btn btn-primary btn-sm" href="' + w.url +
      '" target="_blank" rel="noopener noreferrer">打开主站 ' + icons.get("external", 13) + "</a>" +
      (w.columns || []).map(function (c) {
        return '<a class="btn btn-outline btn-sm" href="' + c.u + '" target="_blank" rel="noopener noreferrer">' +
          esc(c.t) + " " + icons.get("external", 12) + "</a>";
      }).join("") + "</div></div>";
  }

  function init() {
    var d = D();
    var set = function (id, v) { var el = $(id); if (el) el.textContent = v; };
    set("#statSubjects", Object.keys(window.APP_META.subjects || {}).length);
    set("#statCourses", allCourses().length);
    set("#statQuiz", (d.quiz || []).length);
    renderProgress();
    renderHeads();
    renderSubjects();
    renderTools();
    renderFeatured();
    renderExt();
    window.App.state.subscribe(renderProgress);
  }

  window.App = window.App || {};
  window.App.pages = window.App.pages || {};
  window.App.pages.home = {
    init: init, allCourses: allCourses,
    enter: function () { renderProgress(); renderFeatured(); renderTools(); }
  };
})();

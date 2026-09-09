/* ============================================================
   工具层 · 全站搜索
   索引：课程 / 知识笔记（AI·数据结构·概率统计）/ 练习题
   加权评分 + 中文按字模糊匹配（停用字过滤、字频降权）+ 片段高亮。
   由原单文件内联引擎迁移，索引新增「练习题」类型。
   ============================================================ */
(function () {
  "use strict";

  var dom = function () { return window.App.dom; };
  var IDX = null;      // 索引缓存
  var CHARDF = null;   // 字符文档频率
  var STOP = "的了呢吧嘛啊是在和有这那不之以及为如何会可与就都很最把被让从其此各每等还又再才只更想用去到什怎么办样啥问些哪请帮详细介绍";

  function subjectOfCat(cat) {
    var M = window.APP_META || {};
    return (M.quizCatSubject || {})[cat] || "ai";
  }

  function build() {
    if (IDX) return IDX;
    var D = window.APP_DATA || {};
    var esc = dom().esc;
    var strip = dom().stripTags;
    var idx = [];
    function add(type, title, sub, route, text) {
      var raw = strip(text).replace(/\s+/g, " ");
      idx.push({ type: type, title: title, sub: sub || "", route: route, raw: raw, text: (title + " " + (sub || "") + " " + raw).toLowerCase() });
    }
    add("页面", "首页 · 站点总览", "三大板块与学习工具", "#/home", "首页 总览 学习助手 学习进度");
    (D.stages || []).forEach(function (s) {
      (s.courses || []).forEach(function (c) {
        add("课程", c.title, s.title, "#/courses/" + c.id,
          (c.desc || "") + " " + (c.points || []).join(" ") + " " + (c.lessons || []).join(" "));
      });
    });
    (D.articles || []).forEach(function (a) {
      add("知识笔记", a.title, "AI 笔记 · " + (a.category || ""), "#/knowledge/" + a.id, a.content);
    });
    (D.ds || []).forEach(function (c) {
      add("知识笔记", c.title, "数据结构 · " + (c.cat || ""), "#/ds/" + c.id, (c.points || []).join(" ") + " " + c.content);
    });
    (D.prob || []).forEach(function (c) {
      add("知识笔记", c.title, "概率统计 · " + (c.cat || ""), "#/prob/" + c.id, (c.points || []).join(" ") + " " + c.content);
    });
    (D.quiz || []).forEach(function (q, qi) {
      add("练习题", q.q, (q.level || "") + " · " + (q.cat || ""), "#/quiz/all/q" + (qi + 1),
        (q.options || []).join(" ") + " " + (q.explain || ""));
    });
    IDX = idx;

    /* 字符文档频率：高频字（的、实、现之类）降权，稀有字（堆、蒲丰）保持高权重 */
    var df = {};
    idx.forEach(function (it) {
      var seen = {};
      for (var i = 0; i < it.text.length; i++) {
        var ch = it.text.charAt(i);
        if (seen[ch]) continue;
        seen[ch] = 1;
        df[ch] = (df[ch] || 0) + 1;
      }
    });
    CHARDF = df;
    return idx;
  }

  function search(query, limit) {
    var q = String(query || "").toLowerCase().trim();
    if (!q) return [];
    var rawTokens = q.split(/\s+/).filter(Boolean);
    var hits = [];
    build().forEach(function (it) {
      var score = 0, matchedAll = true;
      rawTokens.forEach(function (tk) {
        var inTitle = it.title.toLowerCase().indexOf(tk) !== -1;
        var inText = it.text.indexOf(tk) !== -1;
        if (inTitle || inText) { score += inTitle ? 12 : 3; return; }
        matchedAll = false;
        /* 中文无空格分词：整词未命中时按「字」部分匹配（滤停用字；首字=主题词加权；按字频降权；正文分设上限，精确子串优先） */
        if (/[\u4e00-\u9fff]/.test(tk)) {
          var seen = {}, cjkTitle = 0, cjkText = 0, kept = 0;
          var tl = it.title.toLowerCase();
          var commonCut = Math.max(8, IDX.length * 0.3);
          for (var ci = 0; ci < tk.length; ci++) {
            var ch = tk.charAt(ci);
            if (seen[ch] || STOP.indexOf(ch) !== -1) continue;
            seen[ch] = 1;
            var isPrefix = kept === 0;   // 查询的首个实义字通常是主题词
            kept++;
            var w = (CHARDF[ch] || 0) > commonCut ? 0.2 : 1;
            if (tl.indexOf(ch) !== -1) cjkTitle += isPrefix ? 6 : 3 * w;
            else if (it.text.indexOf(ch) !== -1) cjkText += isPrefix ? 2 : 1 * w;
          }
          if (kept > 0) score += cjkTitle + Math.min(cjkText, 2.5);
        }
      });
      var qualified = matchedAll || score >= 3;
      if (matchedAll) score += 100;   // 全部词精确命中：支配任何「部分字匹配」的结果
      if (qualified) hits.push({ item: it, score: score });
    });
    hits.sort(function (a, b) { return b.score - a.score; });
    return hits.slice(0, limit || 12).map(function (h) { return h.item; });
  }

  /* 按「课程 / 知识笔记 / 练习题」三组返回（知识库页内搜索用） */
  function searchGrouped(query, perGroup) {
    var hits = search(query, 200);
    var groups = { "课程": [], "知识笔记": [], "练习题": [], "页面": [] };
    hits.forEach(function (h) { if (groups[h.type]) groups[h.type].push(h); });
    var order = ["课程", "知识笔记", "练习题"];
    var out = [];
    order.forEach(function (g) {
      if (groups[g].length) out.push({ type: g, items: groups[g].slice(0, perGroup || 6) });
    });
    if (!out.length && groups["页面"].length) out.push({ type: "页面", items: groups["页面"].slice(0, perGroup || 6) });
    return out;
  }

  function snippet(item, query) {
    var tokens = String(query || "").toLowerCase().split(/\s+/).filter(Boolean);
    var pos = -1;
    for (var i = 0; i < tokens.length; i++) {
      pos = item.text.indexOf(tokens[i]);
      if (pos !== -1) break;
    }
    var raw = item.raw || "";
    if (pos === -1 || !raw) return dom().esc(item.sub || "");
    var start = Math.max(0, pos - 30);
    var frag = raw.substring(start, Math.min(raw.length, pos + 90)).replace(/[<>]/g, " ");
    tokens.forEach(function (tk) {
      try {
        var re = new RegExp(tk.replace(/[.*+?^$()|[\]{}]/g, "\\$&"), "gi");
        frag = frag.replace(re, function (m) { return "<mark>" + m + "</mark>"; });
      } catch (e) { /* 忽略非法正则 */ }
    });
    return (start > 0 ? "…" : "") + frag + (start + 120 < raw.length ? "…" : "");
  }

  window.App = window.App || {};
  window.App.search = { build: build, search: search, grouped: searchGrouped, snippet: snippet, subjectOfCat: subjectOfCat, STOP: STOP };
})();

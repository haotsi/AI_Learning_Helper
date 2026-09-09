/* ============================================================
   页面 · 数据结构与算法（C/C++ 分章教程）
   原 #/ds 与 #/ds/<章节id> 路由保持不变；
   新增：章末上一条/下一条导航、配套练习直达（按题目「相关知识点」反向定位）。
   典型例题与力扣映射逻辑自原单文件迁移，未改内容。
   ============================================================ */
(function () {
  "use strict";

  var dom = window.App.dom;
  var icons = window.App.icons;
  var esc = dom.esc;
  var $ = dom.$;

  function D() { return window.APP_DATA; }

  /* 力扣原题链接映射：key = "章节id:例题序号"，value = [题号, slug]；纸面题无映射则不渲染 */
  var EX_LC = {
    "ds05:0": [27, "remove-element"],
    "ds05:1": [189, "rotate-array"],
    "ds06:0": [21, "merge-two-sorted-lists"],
    "ds06:1": [141, "linked-list-cycle"],
    "ds07:0": [146, "lru-cache"],
    "ds08:0": [155, "min-stack"],
    "ds08:1": [739, "daily-temperatures"],
    "ds10:0": [232, "implement-queue-using-stacks"],
    "ds11:0": [104, "maximum-depth-of-binary-tree"],
    "ds11:1": [226, "invert-binary-tree"],
    "ds12:0": [98, "validate-binary-search-tree"],
    "ds12:1": [235, "lowest-common-ancestor-of-a-binary-search-tree"],
    "ds13:0": [215, "kth-largest-element-in-an-array"],
    "ds14:0": [242, "valid-anagram"],
    "ds14:1": [560, "subarray-sum-equals-k"],
    "ds15:0": [200, "number-of-islands"],
    "ds15:1": [207, "course-schedule"],
    "ds16:0": [69, "sqrtx"],
    "ds17:0": [88, "merge-sorted-array"],
    "ds17:1": [169, "majority-element"],
    "ds18:0": [50, "powx-n"],
    "ds19:0": [53, "maximum-subarray"],
    "ds19:1": [78, "subsets"]
  };
  var EX_LV = { "入门": "green", "进阶": "orange", "挑战": "red" };

  function lcLink(chapterId, idx) {
    var e = EX_LC[chapterId + ":" + idx];
    if (!e) return "";
    return '<a class="ex-lc" href="https://leetcode.cn/problems/' + e[1] +
      '/" target="_blank" rel="noopener noreferrer" title="在新窗口打开力扣原题">力扣 ' + e[0] + ' 原题 ↗</a>';
  }

  function exHTML(list, chapterId) {
    if (!list || !list.length) return "";
    var h = "<h2>" + icons.get("lightbulb", 17) + " 典型例题与解答</h2>";
    list.forEach(function (e, i) {
      h +=
        '<div class="ds-ex">' +
        '<div class="q-title"><span class="badge ' + (EX_LV[e.lv] || "orange") + '">' + esc(e.lv || "进阶") + "</span>　例 " + (i + 1) + lcLink(chapterId, i) + "</div>" +
        '<div class="q-text">' + esc(e.q).replace(/\n/g, "<br>") + "</div>" +
        '<details><summary>查看思路与解答 ▾</summary><div class="sol">' + (e.sol || "") +
        (e.code ? "<pre><code>" + esc(e.code) + "</code></pre>" : "") +
        "</div></details></div>";
    });
    return h;
  }

  /* 找一道「相关知识点」直达本章的练习题 */
  function quizLinkFor(chapterId) {
    var route = "#/ds/" + chapterId;
    var qMap = window.APP_META.quizCatRoute || {};
    var quiz = D().quiz || [];
    for (var i = 0; i < quiz.length; i++) {
      if (qMap[quiz[i].cat] === route) return "#/quiz/all/q" + (i + 1);
    }
    return "#/quiz/sub-ds";
  }

  var listEl, artEl;

  function selectChapter(id) {
    var list = D().ds || [];
    var idx = -1;
    list.forEach(function (c, i) { if (c.id === id) idx = i; });
    if (idx === -1) {
      if (!list.length) { artEl.innerHTML = '<div class="kb-placeholder">教程数据未加载</div>'; return; }
      idx = 0;
    }
    var c = list[idx];
    listEl.querySelectorAll(".kb-item").forEach(function (b) {
      b.classList.toggle("active", b.dataset.id === c.id);
    });
    var items = list.map(function (x) {
      return { route: "#/ds/" + x.id, title: x.title };
    });
    artEl.innerHTML =
      "<h1>" + esc(c.title) + "</h1>" +
      '<div class="meta">' + window.App.cards.subjectBadge("ds") +
      '<span class="badge">' + esc(c.cat) + "</span>" +
      window.App.cards.levelBadge((window.APP_META.dsLevel || {})[c.id] || "入门") +
      '<span class="badge gray">' + icons.get("clock", 12) + " 约 " + esc(c.readTime) + "</span></div>" +
      (c.content || "") +
      exHTML((D().dsEx || {})[c.id], c.id) +
      window.App.cards.pointsHTML(c.points) +
      window.App.articleFoot.html(items, idx, [
        { label: "配套练习", links: [{ t: "去练习测验 · 数据结构题", u: quizLinkFor(c.id) }] },
        { label: "在知识库中筛选", links: [{ t: "浏览全部数据结构章节", u: "#/knowledge" }] }
      ]);
    window.App.cards.enhanceCode(artEl);
  }

  function init(param) {
    listEl = $("#dsList");
    artEl = $("#dsArticle");
    var list = D().ds || [];
    if (!list.length) return;

    listEl.innerHTML = list.map(function (c, i) {
      return '<button type="button" class="kb-item" data-id="' + c.id + '" data-route="#/ds/' + c.id + '">' +
        '<div class="cat">' + esc(c.cat) + " · 第 " + (i + 1) + " 篇</div>" +
        '<div class="t">' + esc(c.title) + "</div>" +
        '<div class="s"><span>' + esc(c.readTime) + "</span></div></button>";
    }).join("");
    listEl.addEventListener("click", function (e) {
      var btn = e.target.closest(".kb-item");
      if (btn) location.hash = btn.dataset.route;
    });

    selectChapter(param || list[0].id);
  }

  window.App = window.App || {};
  window.App.pages = window.App.pages || {};
  window.App.pages.ds = { init: init, selectChapter: selectChapter };
})();

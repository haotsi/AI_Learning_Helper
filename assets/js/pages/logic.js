/* ============================================================
   页面 · 数理逻辑（分章教程）
   #/logic 与 #/logic/<章节id> 路由：左侧 kb-item 章节列表，
   顶部「五阶段学习路线」（复用 .mainline / .flow-node，按 cat 首现顺序推导），
   正文 = 标题 + meta + content + 核心知识点 + 底部导航；
   章末「配套练习」经 meta.js.quizCatRoute 反查直达题号。
   ============================================================ */
(function () {
  "use strict";

  var dom = window.App.dom;
  var icons = window.App.icons;
  var esc = dom.esc;
  var $ = dom.$;

  function D() { return window.APP_DATA; }

  var CN = "一二三四五";

  /* 找一道「相关知识点」直达本章的练习题 */
  function quizLinkFor(chapterId) {
    var route = "#/logic/" + chapterId;
    var qMap = window.APP_META.quizCatRoute || {};
    var quiz = D().quiz || [];
    for (var i = 0; i < quiz.length; i++) {
      if (qMap[quiz[i].cat] === route) return "#/quiz/all/q" + (i + 1);
    }
    return "#/quiz/sub-logic";
  }

  /* 按 cat 首次出现顺序去重，推导学习阶段（不硬编码阶段名） */
  function stagesOf(list) {
    var byCat = {}, stages = [];
    list.forEach(function (c) {
      var k = c.cat || "";
      if (!k) return;
      if (!byCat[k]) { byCat[k] = { cat: k, firstId: c.id }; stages.push(byCat[k]); }
    });
    return stages;
  }

  var listEl, artEl, roadEl;

  /* 五阶段学习路线：渲染进 #logicRoadmap（container 内、kb-layout 外） */
  function renderRoadmap(list) {
    if (!roadEl) return;
    var stages = stagesOf(list);
    if (!stages.length) return;
    var h = '<div class="mainline"><div class="ml-title">' + icons.get("route", 15) +
      " 数理逻辑 · " + (CN[stages.length - 1] || stages.length) + "阶段学习路线</div><div class=\"mainline-flow\">";
    stages.forEach(function (s, i) {
      h += '<a class="flow-node" href="#/logic/' + s.firstId + '" data-cat="' + esc(s.cat) + '">' +
        "第" + (CN[i] || (i + 1)) + "阶段 · " + esc(s.cat) + "</a>";
      if (i < stages.length - 1) h += '<span class="flow-arrow">' + icons.get("chevDown", 14) + "</span>";
    });
    h += "</div></div>";
    roadEl.innerHTML = h;
  }

  function selectChapter(id) {
    var list = D().logic || [];
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
    /* 高亮当前章节所属阶段 */
    if (roadEl) roadEl.querySelectorAll(".flow-node").forEach(function (n) {
      n.classList.toggle("current", n.dataset.cat === c.cat);
    });
    var items = list.map(function (x) {
      return { route: "#/logic/" + x.id, title: x.title };
    });
    artEl.innerHTML =
      "<h1>" + esc(c.title) + "</h1>" +
      '<div class="meta">' + window.App.cards.subjectBadge("logic") +
      '<span class="badge">' + esc(c.cat) + "</span>" +
      window.App.cards.levelBadge((window.APP_META.logicLevel || {})[c.id] || "入门") +
      '<span class="badge gray">' + icons.get("clock", 12) + " 约 " + esc(c.readTime) + "</span></div>" +
      (c.content || "") +
      window.App.cards.pointsHTML(c.points) +
      window.App.articleFoot.html(items, idx, [
        { label: "配套练习", links: [{ t: "去练习测验 · 数理逻辑题", u: quizLinkFor(c.id) }] },
        { label: "延伸", links: [
          { t: "数理逻辑 × 数据结构：递归与归纳", u: "#/ds/ds17" },
          { t: "逻辑 × 概率：贝叶斯推理", u: "#/prob/p04" }
        ] }
      ]);
    window.App.cards.enhanceCode(artEl);
  }

  function init(param) {
    listEl = $("#logicList");
    artEl = $("#logicArticle");
    roadEl = $("#logicRoadmap");
    var list = D().logic || [];
    if (!list.length) return;

    renderRoadmap(list);

    listEl.innerHTML = list.map(function (c, i) {
      return '<button type="button" class="kb-item" data-id="' + c.id + '" data-route="#/logic/' + c.id + '">' +
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
  window.App.pages.logic = { init: init, selectChapter: selectChapter };
})();

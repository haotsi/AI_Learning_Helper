/* ============================================================
   页面 · 概率论与数理统计（分章教程）
   原 #/prob 与 #/prob/<章节id> 路由保持不变；新增底部导航与配套练习直达。
   ============================================================ */
(function () {
  "use strict";

  var dom = window.App.dom;
  var icons = window.App.icons;
  var esc = dom.esc;
  var $ = dom.$;

  function D() { return window.APP_DATA; }

  /* 找一道「相关知识点」直达本章的练习题 */
  function quizLinkFor(chapterId) {
    var route = "#/prob/" + chapterId;
    var qMap = window.APP_META.quizCatRoute || {};
    var quiz = D().quiz || [];
    for (var i = 0; i < quiz.length; i++) {
      if (qMap[quiz[i].cat] === route) return "#/quiz/all/q" + (i + 1);
    }
    return "#/quiz/sub-prob";
  }

  var listEl, artEl;

  function selectChapter(id) {
    var list = D().prob || [];
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
      return { route: "#/prob/" + x.id, title: x.title };
    });
    artEl.innerHTML =
      "<h1>" + esc(c.title) + "</h1>" +
      '<div class="meta">' + window.App.cards.subjectBadge("prob") +
      '<span class="badge">' + esc(c.cat) + "</span>" +
      window.App.cards.levelBadge((window.APP_META.probLevel || {})[c.id] || "入门") +
      '<span class="badge gray">' + icons.get("clock", 12) + " 约 " + esc(c.readTime) + "</span></div>" +
      (c.content || "") +
      window.App.cards.pointsHTML(c.points) +
      window.App.articleFoot.html(items, idx, [
        { label: "配套练习", links: [{ t: "去练习测验 · 概率统计题", u: quizLinkFor(c.id) }] },
        { label: "延伸", links: [{ t: "AI × 概率：交叉熵与 KL（第 14 篇）", u: "#/prob/p14" }] }
      ]);
    window.App.cards.enhanceCode(artEl);
  }

  function init(param) {
    listEl = $("#probList");
    artEl = $("#probArticle");
    var list = D().prob || [];
    if (!list.length) return;

    listEl.innerHTML = list.map(function (c, i) {
      return '<button type="button" class="kb-item" data-id="' + c.id + '" data-route="#/prob/' + c.id + '">' +
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
  window.App.pages.prob = { init: init, selectChapter: selectChapter };
})();

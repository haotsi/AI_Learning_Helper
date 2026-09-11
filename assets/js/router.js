/* ============================================================
   路由层 · hash 路由（保持原约定，新增二级参数）
   #/home
   #/courses[/<课程id 打开详情弹窗>]
   #/knowledge[/<笔记id>]
   #/ds[/<章节id>]   #/prob[/<章节id>]
   #/quiz[/<难度|sub-学科|wrong>[/<q题号>]]
   #/chat
   未知路由回落到 home；每次导航自动收起移动端菜单、记录最近路由。
   ============================================================ */
(function () {
  "use strict";

  var inited = {};     // 视图只初始化一次
  var lastHash = null;

  var VIEWS = ["home", "courses", "knowledge", "ds", "prob", "quiz", "chat"];

  function parseHash() {
    var h = (location.hash || "").replace(/^#\/?/, "");
    var parts = h.split("/");
    var name = parts[0];
    if (VIEWS.indexOf(name) === -1) name = "home";
    return {
      name: name,
      p1: decodeURIComponent(parts[1] || ""),
      p2: decodeURIComponent(parts[2] || "")
    };
  }

  function route() {
    var raw = location.hash;
    if (raw === lastHash) return;
    lastHash = raw;

    var r = parseHash();
    var App = window.App;
    var $ = App.dom.$;

    VIEWS.forEach(function (k) {
      var el = $("#view-" + k);
      if (el) el.classList.toggle("active", k === r.name);
    });
    App.dom.$$(".nav-links a").forEach(function (a) {
      a.classList.toggle("active", a.dataset.route === r.name);
    });
    document.body.dataset.page = r.name;
    var menu = $("#navLinks");
    if (menu) menu.classList.remove("open");   // 移动端点完菜单自动收起

    /* 换页时先收起弹窗（点菜单离开课程弹窗等场景） */
    App.modal.hide();

    if (!inited[r.name]) {
      inited[r.name] = true;
      App.pages[r.name].init(r.p1, r.p2);
    } else {
      var enter = App.pages[r.name].enter;
      if (enter) enter(r.p1, r.p2);
    }

    /* 二级参数直达 */
    if (r.name === "courses" && r.p1) App.pages.courses.openModal(r.p1);
    if (r.name === "knowledge" && r.p1) { App.pages.knowledge.selectArticle(r.p1); App.pages.knowledge.renderList(); }
    if (r.name === "ds" && r.p1) App.pages.ds.selectChapter(r.p1);
    if (r.name === "prob" && r.p1) App.pages.prob.selectChapter(r.p1);

    /* 记录最近访问路由（首页不记录，供「继续上次学习」使用） */
    App.state.setRoute("#/" + r.name + (r.p1 ? "/" + r.p1 : ""));

    /* 页面切换后重渲染数学公式（KaTeX，见 utils/math.js；无公式时为无害空跑） */
    if (App.math) App.math.typeset($("#view-" + r.name));

    if (r.name !== "chat") window.scrollTo(0, 0);
  }

  function start() {
    window.addEventListener("hashchange", route);
    route();
  }

  window.App = window.App || {};
  window.App.router = { route: route, start: start, parseHash: parseHash };
})();

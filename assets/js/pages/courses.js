/* ============================================================
   页面 · 学习路径
   引导增强：主线推荐链 / 每阶段（目标·预计时长·完成数·当前推荐）
   课程弹窗：小节打勾、整课完成标记、前置知识与关联练习。
   ============================================================ */
(function () {
  "use strict";

  var dom = window.App.dom;
  var icons = window.App.icons;
  var esc = dom.esc;
  var $ = dom.$;

  function D() { return window.APP_DATA; }
  function allCourses() {
    return (D().stages || []).reduce(function (acc, s) { return acc.concat(s.courses || []); }, []);
  }
  function byId(id) {
    var found = null;
    allCourses().forEach(function (c) { if (c.id === id) found = c; });
    return found;
  }

  /* ---------------- 阶段元信息 ---------------- */
  function stageHours(s) {
    return (s.courses || []).reduce(function (n, c) { return n + dom.parseHours(c.duration); }, 0);
  }
  function stageDoneCount(s) {
    var st = window.App.state;
    return (s.courses || []).filter(function (c) { return st.isCourseDone(c.id); }).length;
  }
  function stageCurrent(s) {
    var st = window.App.state;
    for (var i = 0; i < (s.courses || []).length; i++) {
      if (!st.isCourseDone(s.courses[i].id)) return s.courses[i];
    }
    return null;
  }

  /* ---------------- 主线推荐链（跨阶段关键路径） ---------------- */
  function renderMainline() {
    var host = $("#mainlineStrip");
    if (!host) return;
    var st = window.App.state;
    var ids = window.APP_META.mainline || [];
    var nodes = ids.map(byId).filter(Boolean);
    var current = null;
    nodes.forEach(function (c) { if (!current && !st.isCourseDone(c.id)) current = c.id; });
    var h = '<div class="mainline"><div class="ml-title">' + icons.get("route", 15) +
      " AI 主线推荐 · 按顺序学，完成自动打勾</div><div class=\"mainline-flow\">";
    nodes.forEach(function (c, i) {
      var done = st.isCourseDone(c.id);
      var cls = done ? "done" : (c.id === current ? "current" : "");
      h += '<a class="flow-node ' + cls + '" href="#/courses/' + c.id + '" data-course="' + c.id + '">' +
        (done ? icons.get("check", 13) : "<span>" + (i + 1) + "</span>") + esc(c.title) + "</a>";
      if (i < nodes.length - 1) h += '<span class="flow-arrow">' + icons.get("chevDown", 14) + "</span>";
    });
    h += "</div></div>";
    host.innerHTML = h;
  }

  /* ---------------- 阶段列表 ---------------- */
  function renderStages() {
    var host = $("#stageList");
    if (!host) return;
    host.innerHTML = (D().stages || []).map(function (s, i) {
      var done = stageDoneCount(s);
      var total = (s.courses || []).length;
      var cur = stageCurrent(s);
      var h = '<section class="stage">' +
        '<div class="stage-head"><div class="stage-num">' + (i + 1) + "</div>" +
        "<div><h2>" + esc(s.title) + "</h2>" +
        '<div class="stage-sub">' + esc(s.sub) + "</div></div></div>" +
        '<div class="stage-meta">' +
        '<span class="badge gray">' + icons.get("clock", 12) + " 预计共 " + stageHours(s) + " 小时</span>" +
        '<span class="badge ' + (done === total && total ? "green" : "gray") + '">已完成 ' + done + " / " + total + "</span>" +
        '<span class="badge blue">' + total + " 门课程 · 推荐顺序 1→" + total + "</span>" +
        "</div>";
      if (cur) {
        h += '<div class="stage-recommend">' + icons.get("target", 14) +
          " 当前推荐：<a href=\"#/courses/" + cur.id + "\" data-course=\"" + cur.id + "\"><b>《" + esc(cur.title) + "》</b></a>" +
          '<span>—— ' + esc((window.APP_META.courses || {})[cur.id] ? (window.APP_META.courses[cur.id].outcome || "") : "") + "</span></div>";
      } else if (total) {
        h += '<div class="stage-recommend" style="border-style:solid;background:var(--color-green-light);border-color:var(--color-green);color:var(--color-green-deep)">' +
          icons.get("checkCircle", 14) + " 本阶段全部完成，进入下一阶段！</div>";
      }
      h += '<div class="grid">' + (s.courses || []).map(function (c, ci) {
        return window.App.courseCard.render(c, { order: ci + 1 });
      }).join("") + "</div></section>";
      return h;
    }).join("");
  }

  /* ---------------- 课程详情弹窗 ---------------- */
  function modalBody(c) {
    var st = window.App.state;
    var M = (window.APP_META.courses || {})[c.id] || {};
    var done = st.isCourseDone(c.id);
    var h = "<h1>" + esc(c.title) + "</h1>" +
      '<div class="modal-meta">' + window.App.cards.levelBadge(c.level) +
      '<span class="badge gray">' + icons.get("clock", 12) + " " + esc(c.duration) + "</span>" +
      (c.lessons ? '<span class="badge gray">' + c.lessons.length + " 小节</span>" : "") +
      (c.points ? '<span class="badge green">' + c.points.length + " 个核心知识点</span>" : "") +
      (done ? '<span class="badge green">已完成</span>' : "") + "</div>" +
      '<p class="modal-desc">' + esc(c.desc) + "</p>" +
      (M.prereq ? '<div class="cc-info" style="border-top:none;padding-top:4px"><div class="row"><span class="k">前置知识</span><span>' + esc(M.prereq) + "</span></div></div>" : "") +
      (M.outcome ? '<div class="modal-outcome">' + icons.get("target", 14) + " <b>学完你能：</b>" + esc(M.outcome) + "</div>" : "") +
      window.App.cards.pointsHTML(c.points);

    if (c.lessons && c.lessons.length) {
      h += '<h2>课程大纲 · 学完一节勾一节</h2><ul class="lesson-list">' +
        c.lessons.map(function (l, li) {
          var ck = st.isLessonDone(c.id, li);
          return '<li class="' + (ck ? "checked" : "") + '"><label><input type="checkbox" data-lesson="' + li +
            '"' + (ck ? " checked" : "") + '><span class="lt">' + esc(l) + "</span></label></li>";
        }).join("") + "</ul>";
    }
    if (c.resources) {
      h += "<h2>精选学习资源</h2>" + window.App.cards.resHTML(c.resources);
    }
    h += '<div class="cc-actions" style="margin-top:22px">' +
      '<a class="btn btn-primary btn-sm" href="' + window.App.courseCard.startRoute(c) + '">' + icons.get("play", 13) + " 开始学习</a>" +
      '<a class="btn btn-outline btn-sm" href="' + window.App.courseCard.quizRoute(c) + '">' + icons.get("pencil", 13) + " 关联练习</a>" +
      '<button class="btn ' + (done ? "btn-quiet" : "btn-outline") + ' btn-sm js-toggle-done" data-course="' + c.id + '" type="button">' +
      (done ? icons.get("refresh", 13) + " 取消完成标记" : icons.get("check", 13) + " 标记整课完成") + "</button></div>";
    return h;
  }

  function openModal(id) {
    var c = byId(id);
    if (!c) return;
    $("#courseModalBody").innerHTML = modalBody(c);
    window.App.modal.show("#courseModal", "#courseModalClose");
  }

  /* ---------------- 事件 ---------------- */
  function bind() {
    /* 小节打勾 */
    dom.on("change", "#courseModalBody input[data-lesson]", function (e, input) {
      var anchor = document.querySelector("#courseModalBody [data-course]");
      if (!anchor) return;
      var cid = anchor.dataset.course;
      var li = +input.dataset.lesson;
      window.App.state.setLessonDone(cid, li, input.checked);
      var lab = input.closest("li");
      if (lab) lab.classList.toggle("checked", input.checked);
      var c = byId(cid);
      if (c) window.App.toast.show(input.checked ?
        "已记录小节进度：" + c.lessons[li] : "已取消该小节完成");
    });
    /* 整课完成 */
    dom.on("click", "#courseModalBody .js-toggle-done", function (e, btn) {
      var cid = btn.dataset.course;
      var st = window.App.state;
      var c = byId(cid);
      if (!c) return;
      if (st.isCourseDone(cid)) {
        st.setCourseDone(cid, false);
        window.App.toast.show("已取消《" + c.title + "》完成标记");
      } else {
        st.setCourseDone(cid, true);
        (c.lessons || []).forEach(function (_, li) { st.setLessonDone(cid, li, true); });
        window.App.toast.show("恭喜完成《" + c.title + "》！");
      }
      openModal(cid);         // 重渲染弹窗
      renderAll();            // 刷新列表状态
    });
  }

  function renderAll() {
    renderMainline();
    renderStages();
  }
  function init() {
    renderAll();
    window.App.state.subscribe(function () {
      renderMainline();
      renderStages();
    });
  }

  window.App = window.App || {};
  window.App.courses = { all: allCourses, byId: byId, openModal: openModal };
  window.App.pages = window.App.pages || {};
  window.App.pages.courses = { init: init, bind: bind, openModal: openModal, enter: renderAll };
})();

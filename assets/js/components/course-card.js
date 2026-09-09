/* ============================================================
   组件层 · 课程卡
   学科板块的「学什么」：难度 / 时长 / 小节数 / 前置知识 / 学完成果 / 操作组
   状态（已完成徽标、小节进度）来自 App.state，刷新后依旧正确。
   ============================================================ */
(function () {
  "use strict";

  var dom = window.App.dom;
  var icons = window.App.icons;
  var esc = dom.esc;

  /* 开始学习：优先课程资源中的第一条站内链接，其次 meta 兜底表 */
  function startRoute(c) {
    var r = (c.resources || {}).read || [];
    for (var i = 0; i < r.length; i++) {
      if (/^#\//.test(r[i].u || "")) return r[i].u;
    }
    var fb = (window.APP_META.courseStartFallback || {})[c.id];
    return fb || "#/courses/" + c.id;
  }
  /* 关联练习：测验路由带难度筛选参数 */
  function quizRoute(c) {
    var lv = (window.APP_META.courseQuizLevel || {})[c.level] || "all";
    return "#/quiz/" + encodeURIComponent(lv);
  }

  /* opts: { order: 阶段内序号(1起), compact: 紧凑模式(首页推荐) } */
  function render(c, opts) {
    opts = opts || {};
    var st = window.App.state;
    var done = st.isCourseDone(c.id);
    var M = (window.APP_META.courses || {})[c.id] || {};
    var nLessons = (c.lessons || []).length;
    var nDone = st.lessonDoneCount(c.id);

    var h = '<div class="card course-card' + (done ? " done" : "") + '" data-course="' + c.id +
      '" role="button" tabindex="0" aria-label="查看课程详情：' + esc(c.title) + '">' +
      (done ? '<span class="cc-done-flag">' + icons.get("check", 12) + " 已完成</span>" : "") +
      "<h3>" + (opts.order ? '<span class="order-dot">' + opts.order + "</span>" : "") + esc(c.title) + "</h3>" +
      '<div class="course-meta">' + window.App.cards.levelBadge(c.level) +
      '<span class="badge gray">' + icons.get("clock", 12) + " " + esc(c.duration) + "</span>" +
      '<span class="badge gray">' + nLessons + " 小节" + (nDone && !done ? " · 已学 " + nDone : "") + "</span></div>" +
      '<p class="desc">' + esc(c.desc) + "</p>";

    if (!opts.compact) {
      h += '<div class="cc-info">' +
        (M.prereq ? '<div class="row"><span class="k">前置知识</span><span>' + esc(M.prereq) + "</span></div>" : "") +
        (M.outcome ? '<div class="row"><span class="k">学完你能</span><span>' + esc(M.outcome) + "</span></div>" : "") +
        "</div>" +
        '<div class="cc-actions" data-no-card="1">' +
        '<a class="btn btn-primary btn-xs js-start" href="' + startRoute(c) + '" data-course="' + c.id + '">' + icons.get("play", 13) + " 开始学习</a>" +
        '<button class="btn btn-quiet btn-xs js-detail" type="button" data-course="' + c.id + '">查看详情</button>' +
        '<a class="btn btn-ghost btn-xs js-quiz" href="' + quizRoute(c) + '">' + icons.get("pencil", 13) + " 关联练习</a>" +
        "</div>";
    } else {
      h += '<div class="go-more" style="font-size:13px;font-weight:600;color:var(--color-primary)">' +
        icons.get("target", 13) + " " + (c.points || []).length + " 个知识点 · 查看详情 →</div>";
    }
    return h + "</div>";
  }

  window.App = window.App || {};
  window.App.courseCard = { render: render, startRoute: startRoute, quizRoute: quizRoute };
})();

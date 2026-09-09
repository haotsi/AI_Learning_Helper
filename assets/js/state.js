/* ============================================================
   状态层 · 学习进度（localStorage 持久化，刷新不丢失）
   约定结构（与需求一致）：
   {
     completedCourses: [],      // 已完成课程 id
     completedLessons: [],      // 已完成小节 "courseId:小节序号"
     quizProgress: {},          // 答题记录 { 题号(1起): 所选选项下标 }
     wrongQuestions: [],        // 错题本 [{ qid, source: "wrong"|"star", ts }]
     lastVisitedRoute: ""       // 最近访问路由，如 "#/ds/ds05"
   }
   ============================================================ */
(function () {
  "use strict";

  var S = window.App.storage;
  var KEY = "ai-learning-progress-v1";
  var CHAT_KEY = "ai-learning-chat-v1";
  /* 原单文件站的聊天键（键面含省略号字符），首次读取时一次性迁移，保住老用户记录 */
  var CHAT_KEY_LEGACY = "ai-l" + String.fromCharCode(8230) + "m-v1";

  function defaults() {
    return { completedCourses: [], completedLessons: [], quizProgress: {}, wrongQuestions: [], lastVisitedRoute: "" };
  }

  var data = (function () {
    var raw = S.getJSON(KEY, null);
    var d = defaults();
    if (raw && typeof raw === "object") {
      if (Array.isArray(raw.completedCourses)) d.completedCourses = raw.completedCourses.slice();
      if (Array.isArray(raw.completedLessons)) d.completedLessons = raw.completedLessons.slice();
      if (raw.quizProgress && typeof raw.quizProgress === "object") d.quizProgress = JSON.parse(JSON.stringify(raw.quizProgress));
      if (Array.isArray(raw.wrongQuestions)) d.wrongQuestions = raw.wrongQuestions.slice();
      if (typeof raw.lastVisitedRoute === "string") d.lastVisitedRoute = raw.lastVisitedRoute;
    }
    return d;
  })();

  var listeners = [];

  function save() { S.setJSON(KEY, data); }
  function emit() { listeners.forEach(function (fn) { try { fn(data); } catch (e) { /* 订阅者异常不阻断 */ } }); }
  function subscribe(fn) { listeners.push(fn); }

  function toggleArr(arr, v, on) {
    var i = arr.indexOf(v);
    if (on && i === -1) arr.push(v);
    if (!on && i !== -1) arr.splice(i, 1);
  }

  window.App.state = {
    raw: function () { return data; },
    save: save,
    subscribe: subscribe,

    /* ---- 课程完成 ---- */
    isCourseDone: function (id) { return data.completedCourses.indexOf(id) !== -1; },
    setCourseDone: function (id, on) {
      toggleArr(data.completedCourses, id, on);
      save(); emit();
    },

    /* ---- 小节完成 ---- */
    isLessonDone: function (courseId, idx) { return data.completedLessons.indexOf(courseId + ":" + idx) !== -1; },
    setLessonDone: function (courseId, idx, on) {
      toggleArr(data.completedLessons, courseId + ":" + idx, on);
      save(); emit();
    },
    lessonDoneCount: function (courseId) {
      var n = 0;
      data.completedLessons.forEach(function (k) { if (k.split(":")[0] === courseId) n++; });
      return n;
    },

    /* ---- 测验进度 ---- */
    quizAnswerOf: function (qid) {
      return Object.prototype.hasOwnProperty.call(data.quizProgress, qid) ? data.quizProgress[qid] : null;
    },
    recordQuiz: function (qid, pick) {
      data.quizProgress[qid] = pick;
      save();
    },
    clearQuiz: function () {
      data.quizProgress = {};
      save(); emit();
    },

    /* ---- 错题本 ---- */
    wrongList: function () { return data.wrongQuestions.slice(); },
    hasWrong: function (qid) {
      qid = String(qid);
      return data.wrongQuestions.some(function (w) { return String(w.qid) === qid; });
    },
    addWrong: function (qid, source) {
      qid = String(qid);
      if (this.hasWrong(qid)) return false;
      data.wrongQuestions.push({ qid: qid, source: source || "wrong", ts: Date.now() });
      save(); emit();
      return true;
    },
    removeWrong: function (qid) {
      qid = String(qid);
      data.wrongQuestions = data.wrongQuestions.filter(function (w) { return String(w.qid) !== qid; });
      save(); emit();
    },

    /* ---- 路由记忆 ---- */
    setRoute: function (route) {
      if (route && route !== "#/home") { data.lastVisitedRoute = route; save(); }
    },

    /* ---- 汇总 ---- */
    stats: function () {
      return {
        coursesDone: data.completedCourses.length,
        lessonsDone: data.completedLessons.length,
        wrong: data.wrongQuestions.length,
        answeredQuiz: Object.keys(data.quizProgress).length
      };
    },
    hasActivity: function () {
      return !!(data.completedCourses.length || data.completedLessons.length ||
        Object.keys(data.quizProgress).length || data.wrongQuestions.length || data.lastVisitedRoute);
    },
    reset: function () {
      data = defaults();
      save(); emit();
    },

    /* ---- 聊天记录（独立键；含旧站键一次性迁移） ---- */
    chatLoad: function () {
      var v = S.getJSON(CHAT_KEY, null);
      if (v === null) {
        var legacy = S.getJSON(CHAT_KEY_LEGACY, null);
        if (legacy) { S.setJSON(CHAT_KEY, legacy); S.removeItem(CHAT_KEY_LEGACY); return legacy; }
      }
      return v;
    },
    chatSave: function (messages) { S.setJSON(CHAT_KEY, messages.slice(-50)); },
    chatClear: function () { S.removeItem(CHAT_KEY); S.removeItem(CHAT_KEY_LEGACY); }
  };
})();

/* ============================================================
   页面 · 练习测验
   一题一答（可切换每页 1/5 题）· 学科 + 难度筛选 · 答后即批：
   正确答案 / 简短解析 / 每个错误选项为什么不选 / 相关知识点直达。
   答题进度与错题本存 localStorage；测验结束给出能力分析。
   路由：#/quiz ｜ #/quiz/<难度|sub-学科|wrong> ｜ #/quiz/all/q<题号>
   题库结构可扩展：题对象带 type 字段即可新增题型（默认按选择题渲染，
   未知题型给出友好占位而非报错）。
   ============================================================ */
(function () {
  "use strict";

  var dom = window.App.dom;
  var icons = window.App.icons;
  var esc = dom.esc;
  var $ = dom.$;
  var LETTERS = ["A", "B", "C", "D"];

  function D() { return window.APP_DATA; }
  function quizArr() { return D().quiz || []; }
  function subjectOf(q) { return window.App.search.subjectOfCat(q.cat); }

  var S = { mode: "practice", subject: "all", level: "all", pageSize: 1, pos: 0, showResult: false, browse: false, practicingWrong: false, practiceSnapshot: null };

  /* ---------------- 题目集合 ---------------- */
  function practiceIds() {
    var ids = [];
    quizArr().forEach(function (q, i) {
      if (S.subject !== "all" && subjectOf(q) !== S.subject) return;
      if (S.level !== "all" && (q.level || "入门") !== S.level) return;
      ids.push(i + 1);
    });
    return ids;
  }
  function wrongIds() {
    var valid = {};
    quizArr().forEach(function (_, i) { valid[i + 1] = 1; });
    return window.App.state.wrongList()
      .map(function (w) { return parseInt(w.qid, 10); })
      .filter(function (n) { return !isNaN(n) && valid[n]; });
  }
  function currentIds() {
    return S.mode === "wrong" ? wrongIds() : practiceIds();
  }

  /* ---------------- 工具条 ---------------- */
  function chips(name, opts, cur) {
    return opts.map(function (o) {
      return '<button type="button" class="chip' + (o.v === cur ? " active" : "") +
        '" data-s="' + name + '" data-v="' + esc(o.v) + '">' + esc(o.t) + "</button>";
    }).join("");
  }
  function toolbarHTML() {
    var total = quizArr().length;
    var wCount = wrongIds().length;
    var M = window.APP_META.subjects;
    return (
      '<div class="quiz-tabs" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px">' +
      '<button type="button" class="chip' + (S.mode === "practice" ? " active" : "") + '" data-s="mode" data-v="practice">' + icons.get("pencil", 13) + " 练习模式（" + total + " 题）</button>" +
      '<button type="button" class="chip' + (S.mode === "wrong" ? " active" : "") + '" data-s="mode" data-v="wrong">' + icons.get("bookmark", 13) + " 错题本（" + wCount + "）</button>" +
      "</div>" +
      (S.mode === "practice"
        ? '<div class="fgroup" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px">' +
          '<span class="flabel" style="font-size:12px;font-weight:700;color:var(--color-muted)">学科</span>' +
          chips("subject", [{ v: "all", t: "全部学科" }, { v: "ai", t: M.ai.short }, { v: "ds", t: M.ds.short }, { v: "prob", t: M.prob.short }], S.subject) +
          "</div>" +
          '<div class="fgroup" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px">' +
          '<span class="flabel" style="font-size:12px;font-weight:700;color:var(--color-muted)">难度</span>' +
          chips("level", [{ v: "all", t: "全部" }, { v: "入门", t: "入门" }, { v: "进阶", t: "进阶" }, { v: "挑战", t: "挑战" }], S.level) +
          "</div>"
        : "") +
      '<div class="fgroup" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">' +
      '<span class="flabel" style="font-size:12px;font-weight:700;color:var(--color-muted)">每页</span>' +
      chips("pageSize", [{ v: "1", t: "1 题" }, { v: "5", t: "5 题" }], String(S.pageSize)) +
      '<span style="flex:1"></span>' +
      '<button type="button" class="btn btn-ghost btn-sm js-qz-restart">' + icons.get("refresh", 13) + " 重新开始本组</button>" +
      "</div>");
  }

  /* ---------------- 题目卡 ---------------- */
  function notesFor(id, answer) {
    var notes = (D().quizOptNotes || {})[String(id)];
    if (!notes) return null;
    return notes;
  }

  function questionCard(id) {
    var q = quizArr()[id - 1];
    if (!q) return "";
    var type = q.type || "choice";
    var st = window.App.state;
    var pick = st.quizAnswerOf(String(id));
    var answered = pick !== null;
    var sDef = window.APP_META.subjects[subjectOf(q)];
    var starred = st.hasWrong(id);

    var h = '<div class="q-card" data-qid="' + id + '">' +
      '<div class="q-badges">' +
      window.App.cards.levelBadge(q.level) +
      '<span class="badge ' + sDef.cls + '">' + esc(sDef.short) + "</span>" +
      '<span class="badge gray">' + esc(q.cat || "") + "</span>" +
      '<span class="q-num">第 ' + id + " 题 / 全库 " + quizArr().length + "</span>" +
      '<button type="button" class="star-btn js-star' + (starred ? " on" : "") + '" data-qid="' + id + '" title="' +
      (starred ? "移出错题本 / 收藏" : "收藏本题（加入错题本）") + '" aria-label="收藏本题">' +
      icons.get(starred ? "starFill" : "star", 18) + "</button></div>";

    if (type !== "choice") {
      return h + '<div class="q-title">' + esc(q.q) + "</div>" +
        '<div class="empty-tip">该题型的作答界面暂未开放（题库结构已预留 type="' + esc(type) + '"），当前站点支持选择题。</div></div>';
    }

    h += '<div class="q-title">' + esc(q.q) + "</div>" +
      (q.code ? '<pre><code>' + esc(q.code) + "</code></pre>" : "");

    (q.options || []).forEach(function (opt, oi) {
      var cls = "opt";
      if (answered) {
        if (oi === q.answer) cls += " correct";
        else if (oi === pick) cls += " wrong";
        else cls += " dim";
      }
      h += '<button type="button" class="' + cls + '" data-qid="' + id + '" data-o="' + oi + '"' +
        (answered ? " disabled" : "") + '><span class="letter">' + (LETTERS[oi] || oi + 1) + "</span><span>" + esc(opt) + "</span></button>";
      if (answered && oi !== q.answer) {
        var notes = notesFor(id, q.answer);
        var note = notes && notes[LETTERS[oi]];
        h += '<span class="opt-note">✕ ' + (note ? esc(note) : "该项与题意不符，以解析为准。") + "</span>";
      }
    });

    if (answered) {
      var right = pick === q.answer;
      h += '<div class="explain show ' + (right ? "ok" : "no") + '">' +
        '<div class="ex-title">' + icons.get(right ? "checkCircle" : "warn", 15) +
        (right ? " 回答正确" : " 回答错误 · 正确答案是 " + LETTERS[q.answer]) + "</div>" +
        esc(q.explain || "") +
        "</div>";
    }
    return h + "</div>";
  }

  function actionsRow(ids, answered, isLast) {
    var h = '<div class="quiz-actions"><div class="left">' +
      (S.pos > 0 ? '<button type="button" class="btn btn-ghost btn-sm js-qz-prev">' + icons.get("arrowLeft", 13) + " 上一题</button>" : "") +
      "</div><div class=\"right\">";
    var cur = ids[S.pos];
    var kn = cur && window.APP_META.quizCatRoute[quizArr()[cur - 1].cat];
    h += (kn ? '<a class="btn btn-quiet btn-sm" href="' + kn + '">' + icons.get("book", 13) + " 查看相关知识点</a>" : "");
    if (!answered) {
      h += '<span style="font-size:12.5px;color:var(--color-muted)">选择一个选项作答，即时批改</span>' +
        (S.pos < ids.length - 1 ? '<button type="button" class="btn btn-quiet btn-sm js-qz-next">暂跳过，下一题 ' + icons.get("arrowRight", 13) + "</button>" : "");
    } else if (S.pos < ids.length - 1) {
      h += '<button type="button" class="btn btn-primary btn-sm js-qz-next">' + icons.get("arrowRight", 13) + " 下一题</button>";
    } else {
      h += '<button type="button" class="btn btn-primary btn-sm js-qz-result">' + icons.get("flag", 13) + " 查看结果</button>";
    }
    return h + "</div></div>";
  }

  /* ---------------- 结果页（能力分析） ---------------- */
  function resolveRouteTitle(route) {
    var d = D();
    var m = /^#\/knowledge\/(.+)$/.exec(route); if (m) { var a = (d.articles || []).filter(function (x) { return x.id === m[1]; })[0]; return a ? a.title : route; }
    m = /^#\/ds\/(.+)$/.exec(route); if (m) { var c = (d.ds || []).filter(function (x) { return x.id === m[1]; })[0]; return c ? c.title : route; }
    m = /^#\/prob\/(.+)$/.exec(route); if (m) { var p = (d.prob || []).filter(function (x) { return x.id === m[1]; })[0]; return p ? p.title : route; }
    return route;
  }

  function resultHTML(ids) {
    var st = window.App.state;
    var answered = 0, correct = 0;
    var subs = { ai: { c: 0, t: 0 }, ds: { c: 0, t: 0 }, prob: { c: 0, t: 0 } };
    var wrongCats = {};
    var wrongIdsSet = [];
    ids.forEach(function (id) {
      var q = quizArr()[id - 1];
      var pick = st.quizAnswerOf(String(id));
      subs[subjectOf(q)].t += 1;
      if (pick === null) return;
      answered += 1;
      if (pick === q.answer) { correct += 1; subs[subjectOf(q)].c += 1; }
      else {
        wrongIdsSet.push(id);
        wrongCats[q.cat] = (wrongCats[q.cat] || 0) + 1;
      }
    });
    var pct = ids.length ? Math.round((correct / ids.length) * 100) : 0;
    var acc = answered ? Math.round((correct / answered) * 100) : 0;
    var msg = pct >= 80 ? "太棒了！核心概念已经拿下 🎉"
      : pct >= 60 ? "不错的开始，错题解析值得再读一遍 💪"
      : "别灰心，去知识库补基础，回来再战 📚";

    var weak = Object.keys(wrongCats).sort(function (a, b) { return wrongCats[b] - wrongCats[a]; }).slice(0, 4);
    var M = window.APP_META.subjects;
    var bd = ["ai", "ds", "prob"].filter(function (k) { return subs[k].t > 0; }).map(function (k) {
      var r = subs[k].t ? Math.round((subs[k].c / subs[k].t) * 100) : 0;
      return '<div class="bd-row"><span class="bd-name">' + esc(M[k].short) + "</span>" +
        '<div class="bd-track"><div class="bd-fill ' + k + '" style="width:' + r + '%"></div></div>' +
        '<span class="bd-val">' + subs[k].c + "/" + subs[k].t + " · " + r + "%</span></div>";
    }).join("");

    var reviews = weak.map(function (cat) {
      var route = window.APP_META.quizCatRoute[cat];
      return '<a href="' + (route || "#/knowledge") + '"><span>' + icons.get("book", 14) + " 复习：" + esc(resolveRouteTitle(route || "#/knowledge")) + "</span><span>" + esc(cat) + "</span></a>";
    }).join("");

    return '<div class="card quiz-result show">' +
      '<div class="score-line">' +
      '<div><div class="score">' + pct + "</div><div class=\"score-label\">总分（答对 " + correct + " / " + ids.length + " 题）</div></div>" +
      '<div><div class="score" style="font-size:34px">' + acc + "%</div><div class=\"acc-label\">正确率（已答 " + answered + " 题）</div></div>" +
      "</div>" +
      '<div class="msg">' + esc(msg) + "</div>" +
      '<div class="breakdown"><div class="bd-title">学科表现</div>' + (bd || '<p style="font-size:13px;color:var(--color-muted)">本组未覆盖题目。</p>') + "</div>" +
      (weak.length ? '<div class="breakdown"><div class="bd-title">薄弱知识点</div><div class="weak-chips">' +
        weak.map(function (c) { return '<span class="badge orange">' + esc(c) + " ×" + wrongCats[c] + "</span>"; }).join("") + "</div></div>" :
        '<div class="breakdown"><div class="bd-title">薄弱知识点</div><p style="font-size:13px;color:var(--color-green)">全部答对，没有薄弱项！</p></div>') +
      (reviews ? '<div class="breakdown"><div class="bd-title">推荐复习内容</div><div class="review-list">' + reviews + "</div></div>" : "") +
      '<div class="result-actions">' +
      (wrongIdsSet.length ? '<button type="button" class="btn btn-primary js-qz-retry-wrong" data-ids="' + wrongIdsSet.join(",") + '">' + icons.get("refresh", 14) + " 重新练习本组错题（" + wrongIdsSet.length + "）</button>" : "") +
      '<button type="button" class="btn btn-outline js-qz-restart">' + icons.get("refresh", 14) + " 重做本组</button>" +
      '<button type="button" class="btn btn-quiet js-qz-browse">' + icons.get("book", 14) + " 逐题回看解析</button>" +
      '<a class="btn btn-ghost" href="#/knowledge">去知识库复习</a>' +
      '<a class="btn btn-ghost" href="#/quiz/wrong">打开错题本</a>' +
      "</div></div>";
  }

  /* ---------------- 错题本视图 ---------------- */
  function wrongBookHTML() {
    var ids = wrongIds();
    if (!ids.length) {
      return window.App.cards.emptyState("错题本还是空的", "答错的题会自动收录，也可以点题目右上角 ☆ 收藏。", "checkCircle",
        '<a class="btn btn-primary btn-sm" href="#/quiz">去练习 ' + icons.get("arrowRight", 13) + "</a>");
    }
    var st = window.App.state;
    var h = '<div class="wrong-book"><div class="toolbar"><div><strong>错题 ' + ids.length + ' 题</strong>　<span class="badge gray">答错自动收录 · ☆ 收藏手动加入</span></div>' +
      '<button type="button" class="btn btn-primary btn-sm js-qz-practice-wrong">' + icons.get("play", 13) + " 开始重练错题</button></div>";
    ids.forEach(function (id) {
      var q = quizArr()[id - 1];
      var sDef = window.APP_META.subjects[subjectOf(q)];
      h += '<div class="card wb-item"><button type="button" class="wb-q js-qz-goto" data-qid="' + id + '">' +
        (st.quizAnswerOf(String(id)) !== null ? icons.get("check", 13) + " " : "") + id + ". " + esc(q.q.length > 42 ? q.q.slice(0, 42) + "…" : q.q) + "</button>" +
        '<div class="wb-btns">' +
        '<span class="badge ' + sDef.cls + '">' + esc(sDef.short) + "</span>" +
        '<span class="badge gray">' + esc(q.level || "") + "</span>" +
        '<button type="button" class="btn btn-ghost btn-xs js-qz-remove-wrong" data-qid="' + id + '" title="移出错题本">' + icons.get("trash", 13) + " 移出</button>" +
        "</div></div>";
    });
    return h + "</div>";
  }

  /* ---------------- 主渲染 ---------------- */
  function render() {
    var host = $("#quizApp");
    if (!host) return;
    var st = window.App.state;
    var html = '<div class="quiz-shell">' +
      '<div class="toolbar" style="margin-bottom:14px">' + toolbarHTML() + "</div>";

    if (S.mode === "wrong" && !S.practicingWrong) {
      host.innerHTML = html + wrongBookHTML() + "</div>";
      return;
    }

    var ids = S.practicingWrong ? S.practiceSnapshot || wrongIds() : currentIds();
    if (S.pos >= Math.max(1, ids.length)) S.pos = 0;

    if (!ids.length) {
      host.innerHTML = html + window.App.cards.emptyState("当前条件下没有题目", "换一个学科 / 难度组合，或回到「全部」。", "filter",
        '<button type="button" class="btn btn-outline btn-sm js-qz-clearf">清空筛选</button>') + "</div>";
      return;
    }

    var answeredInSet = ids.filter(function (id) { return st.quizAnswerOf(String(id)) !== null; }).length;
    var correctInSet = ids.filter(function (id) {
      var pick = st.quizAnswerOf(String(id));
      return pick !== null && pick === quizArr()[id - 1].answer;
    }).length;
    var allDone = answeredInSet === ids.length;
    var pageCount = Math.ceil(ids.length / S.pageSize);
    var page = Math.min(pageCount - 1, Math.floor(S.pos / S.pageSize));
    var slice = ids.slice(page * S.pageSize, page * S.pageSize + S.pageSize);

    var head = '<div class="quiz-topline"><div class="quiz-count">' +
      (S.pageSize === 1 ? "第 <span class=\"cur\">" + (S.pos + 1) + "</span> / " + ids.length + " 题"
        : "第 <span class=\"cur\">" + (page + 1) + "</span> / " + pageCount + " 页 · 共 " + ids.length + " 题") +
      "</div><div style=\"font-size:13px;color:var(--color-muted)\">已答 " + answeredInSet + " · 正确率 " +
      (answeredInSet ? Math.round(correctInSet / answeredInSet * 100) : 0) + "%</div></div>" +
      '<div class="quiz-progress"><div class="bar" style="width:' + (answeredInSet / ids.length * 100) + '%"></div></div>';

    /* 结果页展示条件：主动点「查看结果」或本组全部答完；「逐题回看」可临时返回题卡 */
    var wantResult = !S.browse && (S.showResult || (allDone && S.mode === "practice"));
    if (wantResult) {
      host.innerHTML = html + head + resultHTML(ids) + "</div>";
      return;
    }

    var body = slice.map(function (id) { return questionCard(id); }).join("");
    var lastAnswered = S.pageSize === 1 ? st.quizAnswerOf(String(ids[S.pos])) !== null
      : slice.every(function (id) { return st.quizAnswerOf(String(id)) !== null; });
    body += actionsRow(ids, lastAnswered, page >= pageCount - 1);
    if (S.pageSize > 1) {
      body += '<div class="quiz-actions" style="justify-content:center"><div class="right">' +
        (page > 0 ? '<button type="button" class="btn btn-ghost btn-sm js-qz-prev">' + icons.get("arrowLeft", 13) + " 上一页</button>" : "") +
        (page < pageCount - 1 ? '<button type="button" class="btn btn-outline btn-sm js-qz-next">' + icons.get("arrowRight", 13) + " 下一页</button>" :
          '<button type="button" class="btn btn-primary btn-sm js-qz-result">' + icons.get("flag", 13) + " 查看结果</button>") +
        "</div></div>";
    }
    host.innerHTML = html + head + body + "</div>";
    window.App.cards.enhanceCode(host);
  }

  /* ---------------- 答题 ---------------- */
  function answer(qid, oi) {
    var st = window.App.state;
    var q = quizArr()[qid - 1];
    if (!q || st.quizAnswerOf(String(qid)) !== null) return;
    st.recordQuiz(qid, oi);
    if (oi !== q.answer) {
      st.addWrong(qid, "wrong");
    }
    render();
  }

  /* ---------------- 事件 ---------------- */
  function bind() {
    var host = $("#quizApp");
    host.addEventListener("click", function (e) {
      var t = e.target;
      var chip = t.closest(".chip[data-s]");
      if (chip) {
        var k = chip.dataset.s, v = chip.dataset.v;
        S.browse = false;
        if (k === "subject") { S.subject = v; S.pos = 0; }
        else if (k === "level") { S.level = v; S.pos = 0; }
        else if (k === "pageSize") { S.pageSize = +v; S.pos = 0; }
        else if (k === "mode") {
          S.mode = v; S.pos = 0; S.showResult = false; S.practicingWrong = false;
        }
        render();
        return;
      }
      var opt = t.closest(".opt:not([disabled])");
      if (opt) { answer(+opt.dataset.qid, +opt.dataset.o); return; }
      if (t.closest(".js-qz-next")) {
        var ids = S.practicingWrong ? (S.practiceSnapshot || currentIds()) : currentIds();
        var step = Math.max(1, S.pageSize);
        if (S.pos < ids.length - 1) { S.pos = Math.min(ids.length - 1, S.pos + step); render(); scrollCardIntoView(); }
        return;
      }
      if (t.closest(".js-qz-prev")) {
        var step2 = Math.max(1, S.pageSize);
        if (S.pos > 0) { S.pos = Math.max(0, S.pos - step2); render(); scrollCardIntoView(); }
        return;
      }
      if (t.closest(".js-qz-result")) { S.showResult = true; S.browse = false; render(); return; }
      if (t.closest(".js-qz-browse")) { S.browse = true; render(); return; }
      if (t.closest(".js-qz-restart")) {
        var setIds = S.practicingWrong ? (S.practiceSnapshot || []) : currentIds();
        /* 仅清除本组作答记录（错题本保留） */
        var st = window.App.state;
        var prog = st.raw().quizProgress;
        setIds.forEach(function (id) { delete prog[String(id)]; });
        st.save();
        S.pos = 0; S.showResult = false; S.browse = false;
        window.App.toast.show("本组题目已重置，进度已清空");
        render();
        return;
      }
      if (t.closest(".js-qz-retry-wrong")) {
        var wids = (t.closest(".js-qz-retry-wrong").dataset.ids || "").split(",").filter(Boolean).map(Number);
        S.practicingWrong = true; S.practiceSnapshot = wids; S.pos = 0; S.showResult = false; S.browse = false;
        render();
        return;
      }
      if (t.closest(".js-qz-practice-wrong")) {
        S.practicingWrong = true; S.practiceSnapshot = wrongIds(); S.pos = 0; S.showResult = false; S.browse = false;
        render();
        return;
      }
      if (t.closest(".js-qz-remove-wrong")) {
        window.App.state.removeWrong(+t.closest(".js-qz-remove-wrong").dataset.qid);
        window.App.toast.show("已移出错题本");
        render();
        return;
      }
      if (t.closest(".js-qz-goto")) {
        gotoQuestion(+t.closest(".js-qz-goto").dataset.qid);
        return;
      }
      if (t.closest(".js-star")) {
        var sid = +t.closest(".js-star").dataset.qid;
        var s2 = window.App.state;
        if (s2.hasWrong(sid)) { s2.removeWrong(sid); window.App.toast.show("已移出错题本"); }
        else { s2.addWrong(sid, "star"); window.App.toast.show("已收藏到错题本"); }
        render();
        return;
      }
      if (t.closest(".js-qz-clearf")) {
        S.subject = "all"; S.level = "all"; S.pos = 0;
        render();
        return;
      }
    });
    /* 键盘：1-4 / A-D 选择选项 */
    host.addEventListener("keydown", function (e) {
      if (/^[1-4]$/.test(e.key) || /^[abcdABCD]$/.test(e.key)) {
        var oi = /^[1-4]$/.test(e.key) ? +e.key - 1 : LETTERS.indexOf(e.key.toUpperCase());
        var ids = S.practicingWrong ? (S.practiceSnapshot || []) : currentIds();
        var cur = ids[S.pos];
        if (cur) answer(cur, oi);
      }
    });
  }
  function scrollCardIntoView() {
    var card = $("#quizApp .q-card");
    if (card) card.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function gotoQuestion(id) {
    /* 从错题本直达某题：定位到该题（练习模式全集） */
    S.mode = "practice"; S.subject = "all"; S.level = "all"; S.showResult = false; S.browse = false;
    S.practicingWrong = false;
    var ids = practiceIds();
    var idx = ids.indexOf(id);
    if (idx !== -1) S.pos = idx;
    render();
    scrollCardIntoView();
  }

  /* ---------------- 路由入口 ---------------- */
  function routeEntry(p1, p2) {
    S.browse = false;
    if (p1 === "wrong") { S.mode = "wrong"; S.practicingWrong = false; S.showResult = false; }
    else if (p1 && /^q(\d+)$/.test(p2 || "")) {
      S.mode = "practice"; S.subject = "all"; S.level = "all";
      S.practicingWrong = false; S.showResult = false;
      var ids = practiceIds();
      var n = +/^q(\d+)$/.exec(p2)[1];
      var idx = ids.indexOf(n);
      if (idx !== -1) S.pos = idx;
    } else if (p1 && /^sub-(ai|ds|prob)$/.test(p1)) {
      S.mode = "practice"; S.subject = p1.slice(4); S.level = "all"; S.showResult = false;
    } else if (p1 && p1 !== "all") {
      S.mode = "practice"; S.level = p1; S.showResult = false;
    } else {
      /* 无参数进入（如点击导航「练习测验」）：回到练习模式，避免停留在错题本 */
      S.mode = "practice"; S.practicingWrong = false; S.showResult = false;
    }
    render();
  }

  function init(p1, p2) {
    routeEntry(p1, p2);
  }

  window.App = window.App || {};
  window.App.pages = window.App.pages || {};
  window.App.pages.quiz = { init: init, bind: bind, routeEntry: routeEntry, render: render, enter: routeEntry };
})();

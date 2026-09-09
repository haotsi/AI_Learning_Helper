/* ============================================================
   页面 · 知识库（跨学科统一检索）
   筛选：学科 / 难度 / 标签；搜索：标题 + 正文，结果分「课程 / 知识笔记 / 练习题」。
   文章底部：上一条 / 下一条 / 前置知识 / 关联课程 / 配套练习。
   数据结构与概率统计章节点击后跳到各自的教程路由（#/ds、#/prob），原路由不变。
   ============================================================ */
(function () {
  "use strict";

  var dom = window.App.dom;
  var icons = window.App.icons;
  var esc = dom.esc;
  var $ = dom.$;

  function D() { return window.APP_DATA; }
  function M() { return window.APP_META; }

  /* ---------------- 统一条目模型 ---------------- */
  var ITEMS = null;
  function items() {
    if (ITEMS) return ITEMS;
    var d = D(), m = M();
    var out = [];
    (d.articles || []).forEach(function (a) {
      var mm = (m.articles || {})[a.id] || {};
      out.push({
        key: "ai:" + a.id, corpus: "ai", subject: "ai", id: a.id,
        title: a.title, cat: a.category, level: mm.level || "入门",
        tags: a.tags || [], readTime: a.readTime,
        route: "#/knowledge/" + a.id, data: a
      });
    });
    (d.ds || []).forEach(function (c) {
      out.push({
        key: "ds:" + c.id, corpus: "ds", subject: "ds", id: c.id,
        title: c.title, cat: c.cat, level: (m.dsLevel || {})[c.id] || "入门",
        tags: [], readTime: c.readTime,
        route: "#/ds/" + c.id, data: c
      });
    });
    (d.prob || []).forEach(function (c) {
      out.push({
        key: "prob:" + c.id, corpus: "prob", subject: "prob", id: c.id,
        title: c.title, cat: c.cat, level: (m.probLevel || {})[c.id] || "入门",
        tags: [], readTime: c.readTime,
        route: "#/prob/" + c.id, data: c
      });
    });
    ITEMS = out;
    return out;
  }

  /* ---------------- 筛选状态 ---------------- */
  var f = { subject: "all", level: "all", tag: "all", q: "" };

  function filtered() {
    return items().filter(function (it) {
      if (f.subject !== "all" && it.subject !== f.subject) return false;
      if (f.level !== "all" && it.level !== f.level) return false;
      if (f.tag !== "all" && (it.tags || []).indexOf(f.tag) === -1) return false;
      return true;
    });
  }

  /* ---------------- 工具条 ---------------- */
  function chipRow(label, name, opts, cur) {
    return '<div class="fgroup"><span class="flabel">' + label + "</span>" +
      opts.map(function (o) {
        return '<button type="button" class="chip' + (o.v === cur ? " active" : "") +
          '" data-f="' + name + '" data-v="' + esc(o.v) + '">' + esc(o.t) + "</button>";
      }).join("") + "</div>";
  }

  function renderToolbar() {
    var host = $("#kbToolbar");
    if (!host) return;
    var m = M();
    var subjectOpts = [{ v: "all", t: "全部学科" }, { v: "ai", t: "AI 笔记" }, { v: "ds", t: "数据结构" }, { v: "prob", t: "概率统计" }];
    var levelOpts = [{ v: "all", t: "全部难度" }, { v: "入门", t: "入门" }, { v: "进阶", t: "进阶" }, { v: "挑战", t: "挑战" }];
    var tags = ["all"];
    items().forEach(function (it) { (it.tags || []).forEach(function (t) { if (tags.indexOf(t) === -1) tags.push(t); }); });
    var tagOpts = tags.map(function (t) { return { v: t, t: t === "all" ? "全部标签" : "#" + t }; });
    host.innerHTML =
      chipRow("学科", "subject", subjectOpts, f.subject) +
      chipRow("难度", "level", levelOpts, f.level) +
      chipRow("标签", "tag", tagOpts, f.tag) +
      '<div class="fgroup"><span class="flabel">搜索</span>' +
      '<div class="kb-searchbar">' + icons.get("search", 15) +
      '<input id="kbSearch" type="search" placeholder="搜标题与正文，结果按 课程 / 知识笔记 / 练习题 分组…" value="' + esc(f.q) + '" aria-label="知识库搜索">' +
      (f.q ? '<button type="button" class="btn btn-ghost btn-sm js-kb-clear">清空</button>' : "") +
      "</div></div>";
  }

  /* ---------------- 列表渲染 ---------------- */
  function itemHTML(it, activeId) {
    var s = M().subjects[it.subject];
    return '<button type="button" class="kb-item' + (it.id === activeId ? " active" : "") +
      '" data-route="' + it.route + '" data-id="' + esc(it.id) + '">' +
      '<div class="cat">' + window.App.cards.subjectBadge(it.subject) + " " + esc(it.cat) + "</div>" +
      '<div class="t">' + esc(it.title) + "</div>" +
      '<div class="s"><span>' + esc(it.level) + "</span><span>" + icons.get("clock", 11) + " " + esc(it.readTime) + "</span>" +
      (it.tags.length ? "<span>" + esc(it.tags.slice(0, 3).map(function (t) { return "#" + t; }).join(" ")) + "</span>" : "") +
      "</div></button>";
  }

  function renderList() {
    var host = $("#kbList");
    if (!host) return;
    var active = (location.hash.match(/^#\/knowledge\/(.+)$/) || [])[1] || "";

    /* 搜索模式：分组结果（课程 / 知识笔记 / 练习题） */
    if (f.q.trim()) {
      var groups = window.App.search.grouped(f.q, 6);
      if (!groups.length) {
        host.innerHTML = '<div class="empty-state">' + icons.get("search", 30) +
          "<h3>没有找到「" + esc(f.q) + "」相关内容</h3>" +
          "<p>换个关键词试试，或清除筛选条件浏览全部 " + items().length + " 篇内容。</p>" +
          '<button type="button" class="btn btn-outline btn-sm js-kb-reset">重置搜索与筛选</button></div>';
        return;
      }
      var h = '<div class="kb-count-line">搜索「' + esc(f.q) + "」的结果</div>";
      groups.forEach(function (g) {
        h += '<div class="kb-group-title">' + esc(g.type) + " · " + g.items.length + "</div>";
        g.items.forEach(function (r) {
          var qm = /^#\/quiz\/all\/q(\d+)$/.exec(r.route);
          h += '<button type="button" class="kb-item" data-route="' + esc(r.route) + '">' +
            '<div class="cat"><span class="badge gray">' + esc(g.type) + "</span>" +
            (g.type === "练习题" && qm ? '<span class="badge orange">第 ' + qm[1] + " 题</span>" : "") + "</div>" +
            '<div class="t">' + esc(r.title) + "</div>" +
            '<div class="s"><span>' + esc(r.sub || "") + "</span></div></button>";
        });
      });
      host.innerHTML = h;
      return;
    }

    /* 浏览模式：筛选后的条目 */
    var list = filtered();
    var shown = list;
    if (f.subject === "all") {
      /* 默认视图聚焦 AI 笔记列表的阅读体验；ds/prob 也完整列出 */
      shown = list;
    }
    if (!shown.length) {
      host.innerHTML = '<div class="empty-state">' + icons.get("filter", 30) +
        "<h3>当前筛选条件下没有内容</h3><p>试试放宽学科 / 难度 / 标签，或清空条件。</p>" +
        '<button type="button" class="btn btn-outline btn-sm js-kb-reset">重置筛选</button></div>';
      return;
    }
    var html = '<div class="kb-count-line">共 ' + shown.length + " 篇 · 按学科分组</div>";
    var lastSubject = null;
    var order = ["ai", "ds", "prob"];
    shown = order.reduce(function (acc, sj) {
      return acc.concat(shown.filter(function (it) { return it.subject === sj; }));
    }, []);
    shown.forEach(function (it) {
      if (it.subject !== lastSubject) {
        lastSubject = it.subject;
        html += '<div class="kb-group-title">' + esc(M().subjects[it.subject].name) + "</div>";
      }
      html += itemHTML(it, f.subject === "ai" || f.subject === "all" ? active : "");
    });
    host.innerHTML = html;
  }

  /* ---------------- 文章正文 ---------------- */
  function quizLinkFor(articleId) {
    /* 找一道「相关知识点」指向本篇的练习题，直达该题；没有则回练习测验首页 */
    var route = "#/knowledge/" + articleId;
    var qMap = M().quizCatRoute || {};
    var quiz = D().quiz || [];
    for (var i = 0; i < quiz.length; i++) {
      if (qMap[quiz[i].cat] === route) return "#/quiz/all/q" + (i + 1);
    }
    return "#/quiz";
  }

  function selectArticle(id) {
    var aiItems = items().filter(function (it) { return it.corpus === "ai"; });
    var idx = -1;
    aiItems.forEach(function (it, i) { if (it.id === id) idx = i; });
    if (idx === -1) { id = (aiItems[0] || {}).id; aiItems.forEach(function (it, i) { if (it.id === id) idx = i; }); }
    var it = aiItems[idx];
    if (!it) return;
    var a = it.data;
    var mm = (M().articles || {})[a.id] || {};
    var host = $("#kbArticle");

    var related = [];
    if (mm.prereq && mm.prereq !== "无") {
      var prereqRoutes = String(mm.prereq).match(/a\d+/g) || [];
      related.push({ label: "前置知识", links: prereqRoutes.length
        ? prereqRoutes.map(function (pid) {
            var p = aiItems.filter(function (x) { return x.id === pid; })[0];
            return p ? { t: p.title, u: p.route } : { t: pid, u: "#/knowledge" };
          })
        : [{ t: mm.prereq, u: "#/knowledge" }] });
    }
    if (mm.course) {
      var c = (window.App.courses.all() || []).filter(function (x) { return x.id === mm.course; })[0];
      if (c) related.push({ label: "关联课程", links: [{ t: c.title + "（学习路径）", u: "#/courses/" + c.id }] });
    }
    related.push({ label: "配套练习", links: [{ t: "去练习测验 · 本篇相关题", u: quizLinkFor(a.id) }] });

    host.innerHTML =
      "<h1>" + esc(a.title) + "</h1>" +
      '<div class="meta">' + window.App.cards.subjectBadge("ai") +
      '<span class="badge">' + esc(a.category) + "</span>" +
      window.App.cards.levelBadge(it.level) +
      '<span class="badge gray">' + icons.get("clock", 12) + " 约 " + esc(a.readTime) + "</span>" +
      (a.tags || []).map(function (t) { return '<span class="badge gray">#' + esc(t) + "</span>"; }).join("") +
      "</div>" + a.content +
      window.App.cards.pointsHTML(a.points) +
      window.App.cards.resHTML(a.res) +
      window.App.articleFoot.html(aiItems, idx, related);
    window.App.cards.enhanceCode(host);
    dom.$$("#kbList .kb-item").forEach(function (b) {
      b.classList.toggle("active", b.dataset.id === a.id);
    });
  }

  /* ---------------- 事件 ---------------- */
  function bind() {
    var toolbar = $("#kbToolbar");
    toolbar.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip[data-f]");
      if (chip) {
        f[chip.dataset.f] = chip.dataset.v;
        renderToolbar();
        renderList();
        return;
      }
      if (e.target.closest(".js-kb-clear")) { f.q = ""; renderToolbar(); renderList(); focusSearch(false); return; }
    });
    var debounce = null;
    toolbar.addEventListener("input", function (e) {
      if (e.target.id !== "kbSearch") return;
      clearTimeout(debounce);
      debounce = setTimeout(function () { f.q = e.target.value; renderList(); }, 160);
    });
    var list = $("#kbList");
    list.addEventListener("click", function (e) {
      if (e.target.closest(".js-kb-reset")) {          /* 空状态里的重置按钮（渲染于列表内） */
        f = { subject: "all", level: "all", tag: "all", q: "" };
        renderToolbar();
        renderList();
        return;
      }
      var btn = e.target.closest(".kb-item[data-route]");
      if (!btn) return;
      location.hash = btn.dataset.route;   /* AI → #/knowledge/id；ds/prob → 各自教程路由 */
    });
  }
  function focusSearch(sel) {
    var el = $("#kbSearch");
    if (el) { el.focus(); if (sel) el.select(); }
  }

  function init(param) {
    renderToolbar();
    renderList();
    selectArticle(param || (items().filter(function (x) { return x.corpus === "ai"; })[0] || {}).id);
  }

  window.App = window.App || {};
  window.App.pages = window.App.pages || {};
  window.App.pages.knowledge = {
    init: init, bind: bind, selectArticle: selectArticle,
    renderList: renderList, items: items
  };
})();

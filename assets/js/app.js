/* ============================================================
   应用入口 · 启动引导
   依赖顺序：data/* → utils → icons → state → components → pages → router → app.js
   职责：注册 Service Worker、渲染 header/footer、装配全局搜索、
   课程卡事件委托、启动 hash 路由。
   ============================================================ */
(function () {
  "use strict";

  function boot() {
    var App = window.App;
    var $ = App.dom.$;
    var icons = App.icons;

    /* PWA：仅经 http(s) 访问时注册 Service Worker，file:// 自动跳过 */
    if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
      navigator.serviceWorker.register("./sw.js").catch(function () { /* 注册失败不影响使用 */ });
    }

    /* 头部 / 页脚 */
    App.header.render();
    App.header.bind();
    App.footer.render();

    /* 通用图标注入：静态骨架中的 <span data-icon="book"> 占位换成 SVG */
    App.dom.$$("[data-icon]").forEach(function (el) {
      el.innerHTML = icons.svg(el.dataset.icon, +(el.dataset.size || 18));
    });

    /* 搜索面板 */
    function openSearch() {
      App.search.build();
      App.modal.show("#searchModal", "#searchInput");
      var inp = $("#searchInput");
      inp.value = "";
      renderResults("");
    }
    function closeSearch() { App.modal.hide(); }
    function renderResults(q) {
      var box = $("#searchResults");
      if (!box) return;
      q = (q || "").trim();
      if (!q) {
        box.innerHTML = '<div class="search-hint">试试：「哈希表」「贝叶斯」「蒲丰」「链表」「提示词」「蒙特卡洛」「语法速览」…</div>';
        return;
      }
      var hits = App.search.search(q, 12);
      if (!hits.length) {
        box.innerHTML = '<div class="search-hint">没有找到「' + App.dom.esc(q) + "」相关内容，换个关键词试试～</div>";
        return;
      }
      var lastType = null, html = "";
      hits.forEach(function (h) {
        if (h.type !== lastType) { html += '<div class="search-group">' + h.type + "</div>"; lastType = h.type; }
        html += '<a class="search-item" href="' + h.route + '">' +
          '<div class="si-title">' + App.dom.esc(h.title) +
          (h.sub ? '<span class="si-sub">' + App.dom.esc(h.sub) + "</span>" : "") + "</div>" +
          '<div class="si-snip">' + App.search.snippet(h, q) + "</div></a>";
      });
      box.innerHTML = html;
    }

    $("#searchBtn").addEventListener("click", openSearch);
    $("#searchClose").addEventListener("click", closeSearch);
    $("#searchModal").addEventListener("click", function (e) {
      if (e.target === this) closeSearch();
    });
    var sInput = $("#searchInput"), sTimer = null;
    sInput.addEventListener("input", function () {
      clearTimeout(sTimer);
      sTimer = setTimeout(function () { renderResults(sInput.value); }, 120);
    });
    sInput.addEventListener("keydown", function (e) {
      var items = $("#searchResults").querySelectorAll(".search-item");
      if (!items.length) return;
      var activeIdx = -1;
      items.forEach(function (el, i2) { if (el.classList.contains("active")) activeIdx = i2; });
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        var next = e.key === "ArrowDown" ? Math.min(activeIdx + 1, items.length - 1) : Math.max(activeIdx - 1, 0);
        items.forEach(function (el, i2) { el.classList.toggle("active", i2 === next); });
        items[next].scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter") {
        e.preventDefault();
        var target = items[Math.max(activeIdx, 0)];
        closeSearch();
        location.hash = target.getAttribute("href");
      }
    });
    $("#searchResults").addEventListener("click", function (e) {
      if (e.target.closest(".search-item")) closeSearch();
    });
    document.addEventListener("keydown", function (e) {
      var tag = (document.activeElement && document.activeElement.tagName) || "";
      var typing = tag === "INPUT" || tag === "TEXTAREA";
      if ((e.key === "/" && !typing) || ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K"))) {
        e.preventDefault();
        openSearch();
      }
    });
    /* 首页「全站搜索」工具卡 */
    App.dom.on("click", ".js-open-search", function (e, el) {
      e.preventDefault();
      openSearch();
    });

    /* 课程卡点击 / 键盘打开详情弹窗（事件委托，覆盖首页推荐与路径页） */
    document.body.addEventListener("click", function (e) {
      var detail = e.target.closest(".js-detail");
      if (detail) { App.courses.openModal(detail.dataset.course); return; }
      var card = e.target.closest(".course-card[data-course]");
      if (card && !e.target.closest("a")) App.courses.openModal(card.dataset.course);
    });
    document.body.addEventListener("keydown", function (e) {
      if ((e.key === "Enter" || e.key === " ") && document.activeElement &&
        document.activeElement.classList.contains("course-card")) {
        e.preventDefault();
        App.courses.openModal(document.activeElement.dataset.course);
      }
    });
    $("#courseModalClose").addEventListener("click", function () { App.modal.hide(); });
    $("#courseModal").addEventListener("click", function (e) {
      if (e.target === this) App.modal.hide();   // 点遮罩关闭
    });

    /* 页面级事件装配（静态容器，可在路由前绑定） */
    App.pages.courses.bind();
    App.pages.knowledge.bind();
    App.pages.quiz.bind();

    /* 无头验证钩子（生产无影响）：?autosearch=关键词 */
    var mQ = new RegExp("[?&]autosearch=([^&]+)").exec(location.search);
    if (mQ) {
      openSearch();
      var q0 = decodeURIComponent(mQ[1]);
      sInput.value = q0;
      renderResults(q0);
      var hits0 = App.search.search(q0, 1);
      document.title = "SR:" + App.search.search(q0, 99).length + ":" +
        (hits0[0] ? hits0[0].type + "|" + hits0[0].title : "none");
    }

    /* 路由启动 */
    App.router.start();
  }

  document.addEventListener("DOMContentLoaded", boot);
})();

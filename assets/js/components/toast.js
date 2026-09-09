/* ============================================================
   组件层 · 轻量 Toast 轻提示（用于收藏 / 完成标记 / 进度保存反馈）
   ============================================================ */
(function () {
  "use strict";

  var wrap = null;
  var MAX_SHOW_MS = 2600;

  function ensure() {
    if (wrap) return wrap;
    wrap = document.createElement("div");
    wrap.className = "toast-wrap";
    wrap.setAttribute("aria-live", "polite");
    document.body.appendChild(wrap);
    return wrap;
  }

  function show(msg, type) {
    var box = ensure();
    var t = document.createElement("div");
    t.className = "toast" + (type === "err" ? " err" : "");
    t.textContent = msg;
    box.appendChild(t);
    requestAnimationFrame(function () { t.classList.add("show"); });
    setTimeout(function () {
      t.classList.remove("show");
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 260);
    }, MAX_SHOW_MS);
  }

  window.App = window.App || {};
  window.App.toast = { show: show };
})();

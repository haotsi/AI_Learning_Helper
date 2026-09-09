/* ============================================================
   组件层 · 区块标题（图标 + 标题 + 说明）
   ============================================================ */
(function () {
  "use strict";

  function html(icon, title, desc) {
    return '<div class="section-head"><h2 class="section-title">' +
      window.App.icons.get(icon, 20) + " " + window.App.dom.esc(title) + "</h2>" +
      (desc ? '<p class="section-desc">' + desc + "</p>" : "") + "</div>";
  }

  window.App = window.App || {};
  window.App.sectionHeader = { html: html };
})();

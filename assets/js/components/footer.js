/* ============================================================
   组件层 · 页脚（外链由数据注入）
   ============================================================ */
(function () {
  "use strict";

  function render() {
    var host = document.getElementById("siteFooter");
    if (!host) return;
    var esc = window.App.dom.esc;
    var ic = window.App.icons;
    var ext = (window.APP_DATA.externalLinks || {}).wiki;
    var gh = (window.APP_DATA.externalLinks || {}).github;
    var linkH = "";
    if (ext) linkH += '<a href="' + ext.url + '" target="_blank" rel="noopener noreferrer">' + esc("智科全家桶（南大智科学生 Wiki）") + " " + ic.get("external", 12) + "</a>";
    if (gh) linkH += '<a href="' + gh.url + '" target="_blank" rel="noopener noreferrer">GitHub 源码 ' + ic.get("external", 12) + "</a>";
    host.innerHTML =
      '<div class="footer-grid">' +
      "<div>学习助手 · 模块化前端 ｜ AI 人工智能 · 数据结构与算法 · 概率论与数理统计 ｜ 学习路径 · 知识库 · 练习测验 · AI 助手</div>" +
      '<div class="footer-links">' + linkH + "</div>" +
      '<div style="font-size:12px">课程内容数据在 <code>assets/js/data/</code>，学习进度保存在浏览器 localStorage。</div>' +
      "</div>";
  }

  window.App = window.App || {};
  window.App.footer = { render: render };
})();

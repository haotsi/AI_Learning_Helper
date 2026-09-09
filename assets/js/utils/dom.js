/* ============================================================
   工具层 · DOM 基础函数（选择器 / 转义 / 时间 / 事件委托）
   ============================================================ */
(function () {
  "use strict";

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function timeStr(ts) {
    var d = new Date(ts);
    return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
  }

  function stripTags(html) { return String(html || "").replace(/<[^>]+>/g, " "); }

  /* 事件委托：body.on("click", ".selector", fn)，fn(e, target) */
  function on(type, selector, fn, root) {
    (root || document).addEventListener(type, function (e) {
      var t = e.target.closest ? e.target.closest(selector) : null;
      if (t && (root || document).contains(t)) fn(e, t);
    });
  }

  /* 从 "6 小时" / "1.5 小时" 之类文本解析小时数 */
  function parseHours(s) {
    var m = /([\d.]+)\s*小时/.exec(String(s || ""));
    return m ? parseFloat(m[1]) : 0;
  }

  window.App = window.App || {};
  window.App.dom = { $: $, $$: $$, esc: esc, timeStr: timeStr, stripTags: stripTags, on: on, parseHours: parseHours };
})();

/* ============================================================
   组件层 · 通用弹窗控制器
   管理课程详情弹窗与搜索面板：打开 / 关闭 / 遮罩点击 / Esc / 焦点回归。
   ============================================================ */
(function () {
  "use strict";

  var lastFocus = null;
  var openEl = null;

  function show(maskSel, focusSel) {
    var m = document.querySelector(maskSel);
    if (!m || m === openEl) return;
    hide();
    lastFocus = document.activeElement;
    m.hidden = false;
    openEl = m;
    document.body.style.overflow = "hidden";
    var f = focusSel ? m.querySelector(focusSel) : null;
    if (f) setTimeout(function () { try { f.focus(); } catch (e) { /* noop */ } }, 30);
    /* 弹窗内容多为动态注入：打开时补一次公式渲染（无公式时空跑，不影响性能） */
    if (window.App.math) window.App.math.typeset(m);
  }

  function hide() {
    if (!openEl) return;
    openEl.hidden = true;
    openEl = null;
    document.body.style.overflow = "";
    if (lastFocus && document.contains(lastFocus)) { try { lastFocus.focus(); } catch (e) { /* noop */ } }
    lastFocus = null;
  }

  function isOpen() { return !!openEl; }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && openEl) { hide(); e.stopPropagation(); }
  });

  window.App = window.App || {};
  window.App.modal = { show: show, hide: hide, isOpen: isOpen };
})();

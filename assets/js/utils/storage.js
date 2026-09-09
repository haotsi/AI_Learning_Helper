/* ============================================================
   工具层 · localStorage 安全封装
   file:// 或隐私模式下 localStorage 可能抛异常，全部静默降级为内存。
   ============================================================ */
(function () {
  "use strict";

  var mem = {};           // 内存兜底存储
  var usable = (function () {
    try {
      var k = "__ls_probe__";
      window.localStorage.setItem(k, "1");
      window.localStorage.removeItem(k);
      return true;
    } catch (e) { return false; }
  })();

  function getItem(key) {
    if (usable) { try { return window.localStorage.getItem(key); } catch (e) { /* 落入内存 */ } }
    return Object.prototype.hasOwnProperty.call(mem, key) ? mem[key] : null;
  }
  function setItem(key, val) {
    if (usable) { try { window.localStorage.setItem(key, val); return; } catch (e) { /* 落入内存 */ } }
    mem[key] = val;
  }
  function removeItem(key) {
    if (usable) { try { window.localStorage.removeItem(key); } catch (e) { /* noop */ } }
    delete mem[key];
  }
  function getJSON(key, fallback) {
    try {
      var raw = getItem(key);
      if (!raw) return fallback;
      var v = JSON.parse(raw);
      return (v == null) ? fallback : v;
    } catch (e) { return fallback; }
  }
  function setJSON(key, value) {
    try { setItem(key, JSON.stringify(value)); return true; } catch (e) { return false; }
  }

  window.App = window.App || {};
  window.App.storage = { usable: usable, getItem: getItem, setItem: setItem, removeItem: removeItem, getJSON: getJSON, setJSON: setJSON };
})();

/* ============================================================
   组件层 · 统一 SVG 描边图标库（Lucide 风格，24×24 viewBox）
   用法：App.icons.get('book', 18) → <span class="icon">svg</span>
   界面 chrome 一律使用本图标库，避免 emoji 风格混用。
   ============================================================ */
(function () {
  "use strict";

  /* 每个条目 = svg 内部 path 集合（stroke 由外层统一控制） */
  var PATHS = {
    book:     '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    map:      '<path d="M9 3 4 5v16l5-2 6 2 5-2V3l-5 2-6-2z"/><path d="M9 3v16"/><path d="M15 5v16"/>',
    library:  '<path d="m16 6 4 4-4 4"/><path d="M8 6 4 10l4 4"/><path d="m11 13 2-6"/>',
    layers:   '<path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
    cpu:      '<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
    dice:     '<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.4" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>',
    pencil:   '<path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>',
    chat:     '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    robot:    '<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M12 8V4"/><circle cx="12" cy="3" r="1.2" fill="currentColor" stroke="none"/><circle cx="9" cy="13" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="13" r="1.1" fill="currentColor" stroke="none"/><path d="M9.5 17h5"/>',
    search:   '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/>',
    target:   '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/>',
    clock:    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    check:    '<path d="M20 6 9 17l-5-5"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12.2 2.5 2.5 4.7-5"/>',
    play:     '<path d="M6 4.5v15l13-7.5Z"/>',
    arrowRight: '<path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>',
    arrowLeft: '<path d="M19 12H5"/><path d="m11 19-7-7 7-7"/>',
    chevDown: '<path d="m6 9 6 6 6-6"/>',
    star:     '<path d="M12 3l2.7 5.8 6.3.8-4.7 4.3 1.3 6.1L12 17l-5.6 3 1.3-6.1L3 9.6l6.3-.8Z"/>',
    starFill: '<path d="M12 3l2.7 5.8 6.3.8-4.7 4.3 1.3 6.1L12 17l-5.6 3 1.3-6.1L3 9.6l6.3-.8Z" fill="currentColor"/>',
    refresh:  '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    trash:    '<path d="M3 6h18"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/>',
    compass:  '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2z"/>',
    lightbulb:'<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2z"/>',
    flag:     '<path d="M4 22V3"/><path d="M4 3s5-1.5 9 1 7 0 7 0v10s-3 1.5-7-1-9-1-9-1"/>',
    video:    '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="m22 8-6 4 6 4V8z"/>',
    file:     '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    link:     '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7L11.7 5.6"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    cap:      '<path d="m2 9 10-5 10 5-10 5L2 9z"/><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5"/><path d="M22 9v6"/>',
    spark:    '<path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.8 2.8M16.2 16.2 19 19M19 5l-2.8 2.8M7.8 16.2 5 19"/>',
    user:     '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"/>',
    bookmark: '<path d="M19 21 12 16 5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    x:        '<path d="M18 6 6 18M6 6l12 12"/>',
    grid:     '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    info:     '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01"/><path d="M11 12h1v4h1"/>',
    warn:     '<path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3l-8-14a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    filter:   '<path d="M3 5h18l-7 8v5l-4 2v-7Z"/>',
    route:    '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5"/>',
    copy:     '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>'
  };

  function svg(name, size) {
    var inner = PATHS[name] || PATHS.info;
    size = size || 18;
    return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size +
      '" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + "</svg>";
  }

  /* 带 .icon 包装（currentColor 继承外层文字色） */
  function get(name, size, extraCls) {
    return '<span class="icon' + (extraCls ? " " + extraCls : "") + '">' + svg(name, size) + "</span>";
  }

  window.App = window.App || {};
  window.App.icons = { svg: svg, get: get, has: function (n) { return !!PATHS[n]; } };
})();

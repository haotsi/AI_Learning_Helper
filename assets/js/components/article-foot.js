/* ============================================================
   组件层 · 文章底部导航
   「上一条 / 下一条 / 相关内容（前置知识 · 关联课程 · 配套练习）」
   供知识库笔记、数据结构章节、概率统计章节共用。
   items: [{ route, title, badgeText }] 顺序即上一条/下一条依据
   related: [{ label, links: [{ t, u, badge? }] }]
   ============================================================ */
(function () {
  "use strict";

  var esc = window.App.dom.esc;
  var icons = window.App.icons;

  function html(items, idx, related) {
    var h = '<nav class="art-foot" aria-label="文章导航">';
    var prev = items[idx - 1], next = items[idx + 1];
    h += '<div class="af-links">';
    if (prev) {
      h += '<a class="af-link" href="' + prev.route + '">' +
        '<span class="dir">' + icons.get("arrowLeft", 12) + " 上一条</span>" +
        '<span class="tt">' + esc(prev.title) + "</span></a>";
    } else {
      h += '<span class="af-link" style="visibility:hidden" aria-hidden="true"></span>';
    }
    if (next) {
      h += '<a class="af-link next" href="' + next.route + '">' +
        '<span class="dir">下一条 ' + icons.get("arrowRight", 12) + "</span>" +
        '<span class="tt">' + esc(next.title) + "</span></a>";
    }
    h += "</div>";

    if (related && related.length) {
      h += '<div class="art-related">';
      related.forEach(function (g) {
        if (!g.links || !g.links.length) return;
        h += '<div class="ar-row"><span class="ar-k">' + esc(g.label) + "</span>";
        g.links.forEach(function (l) {
          var ext = /^https?:/.test(l.u);
          h += '<a class="badge gray" style="text-decoration:none" href="' + l.u + '"' +
            (ext ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" + esc(l.t) +
            (ext ? " ↗" : "") + "</a>";
        });
        h += "</div>";
      });
      h += "</div>";
    }
    return h + "</nav>";
  }

  window.App = window.App || {};
  window.App.articleFoot = { html: html };
})();

/* ============================================================
   组件层 · 通用渲染片段
   徽章 / 知识点块 / 资源列表 / 代码块增强 / 空状态
   （课程卡见 components/course-card.js；区块标题见 components/section-header.js）
   ============================================================ */
(function () {
  "use strict";

  var dom = window.App.dom;
  var icons = window.App.icons;
  var esc = dom.esc;

  /* ---------- 徽章 ---------- */
  var LEVEL_CLS = { "入门": "green", "进阶": "", "应用": "orange", "通识": "gray", "挑战": "red" };
  function levelBadge(level) {
    return '<span class="badge ' + (LEVEL_CLS[level] || "blue") + '">' + esc(level || "进阶") + "</span>";
  }
  function subjectBadge(key) {
    var s = (window.APP_META.subjects || {})[key];
    if (!s) return "";
    return '<span class="badge ' + s.cls + '">' + esc(s.short) + "</span>";
  }

  /* ---------- 知识点块 ---------- */
  function pointsHTML(points) {
    if (!points || !points.length) return "";
    return '<div class="kb-points"><div class="pt-title">' + icons.get("target", 15) +
      " 核心知识点</div><ul>" +
      points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul></div>";
  }

  /* ---------- 推荐资源 ---------- */
  function resItem(r, kind) {
    var ext = /^https?:/.test(r.u);
    var attrs = ext ? ' target="_blank" rel="noopener noreferrer"' : "";
    var ic = kind === "video" ? icons.get("video", 14) : icons.get("file", 14);
    var tag = ext
      ? (r.zh ? '<span class="badge green">中</span>' : '<span class="badge gray">EN</span>')
      : '<span class="badge blue">站内</span>';
    return "<li>" + ic + ' <a href="' + r.u + '"' + attrs + ">" + esc(r.t) + "</a> " + tag +
      (r.d ? '<div class="res-d">' + esc(r.d) + "</div>" : "") + "</li>";
  }
  function resHTML(res) {
    if (!res) return "";
    var h = "";
    if (res.video && res.video.length) {
      h += '<div class="res-group-title">' + icons.get("video", 16) + " 推荐视频</div><ul class=\"res-list\">" +
        res.video.map(function (r) { return resItem(r, "video"); }).join("") + "</ul>";
    }
    if (res.read && res.read.length) {
      h += '<div class="res-group-title">' + icons.get("file", 16) + " 推荐阅读</div><ul class=\"res-list\">" +
        res.read.map(function (r) { return resItem(r, "read"); }).join("") + "</ul>";
    }
    return h;
  }

  /* ---------- 代码块增强：语法高亮 + 一键复制 + 外链新窗口 ---------- */
  function copyCode(pre, btn) {
    var txt = pre.innerText;
    function done(ok) {
      btn.textContent = ok ? "✓ 已复制" : "复制失败";
      setTimeout(function () { btn.textContent = "复制"; }, 1600);
    }
    function legacy() {
      try {
        var ta = document.createElement("textarea");
        ta.value = txt;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        var ok = document.execCommand("copy");
        document.body.removeChild(ta);
        done(ok);
      } catch (e) { done(false); }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function () { done(true); }, legacy);
    } else {
      legacy();
    }
  }
  function enhanceCode(el) {
    var HL = window.App.highlight;
    el.querySelectorAll('a[href^="http"]').forEach(function (l) {
      l.target = "_blank";
      l.rel = "noopener noreferrer";
    });
    el.querySelectorAll("pre").forEach(function (pre) {
      if (pre.closest(".code-wrap")) return;   // 已处理过
      var codeEl = pre.querySelector("code");
      if (codeEl && HL) {
        try {
          var raw = codeEl.textContent;
          codeEl.innerHTML = HL.highlight(raw, HL.detectLang(raw));
        } catch (e) { /* 高亮失败则保持原样 */ }
      }
      var box = document.createElement("div");
      box.className = "code-wrap";
      pre.parentNode.insertBefore(box, pre);
      box.appendChild(pre);
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "code-copy";
      btn.textContent = "复制";
      btn.addEventListener("click", function () { copyCode(pre, btn); });
      box.appendChild(btn);
    });
  }

  /* ---------- 空状态 ---------- */
  function emptyState(title, desc, icon, actionHTML) {
    return '<div class="empty-state">' + icons.get(icon || "search", 34) +
      "<h3>" + esc(title) + "</h3>" + (desc ? "<p>" + esc(desc) + "</p>" : "") +
      (actionHTML || "") + "</div>";
  }

  window.App = window.App || {};
  window.App.cards = {
    levelBadge: levelBadge, subjectBadge: subjectBadge, pointsHTML: pointsHTML,
    resHTML: resHTML, enhanceCode: enhanceCode, emptyState: emptyState,
    LEVEL_CLS: LEVEL_CLS
  };
})();

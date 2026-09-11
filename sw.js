/* ============================================================
   学习助手 · Service Worker
   站点为纯静态多文件结构（HTML + CSS + JS，零依赖）：
   - 安装时预缓存核心资源（页面骨架、样式、数据与逻辑脚本、图标）
   - 读取采用「缓存优先，未命中回源并回填」
   - 离线导航兜底返回缓存的 index.html
   升级版本：内容或结构变更后把 CACHE 版本号 +1，即可让旧缓存全部失效。
   ⚠ 版本号是唯一的升级手段：sw.js 自身也在 ASSETS 缓存列表中，浏览器对 sw.js
     的更新检查可能命中旧缓存而拿不到新版本；结构级改动（如新增/改名大量资源）
     时必须 +1，否则老用户会长期停留在旧缓存页面。
   ⚠ 新增 / 改名 assets 下的文件时，请同步维护下方 ASSETS 列表。
   ============================================================ */
var CACHE = "learning-helper-v5";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",

  "./assets/css/variables.css",
  "./assets/css/reset.css",
  "./assets/css/layout.css",
  "./assets/css/components.css",
  "./assets/css/responsive.css",
  "./assets/css/math.css",

  "./assets/vendor/katex/katex.min.css",
  "./assets/vendor/katex/katex.min.js",
  "./assets/vendor/katex/contrib/auto-render.min.js",
  "./assets/vendor/katex/fonts/KaTeX_AMS-Regular.woff2",
  "./assets/vendor/katex/fonts/KaTeX_Caligraphic-Bold.woff2",
  "./assets/vendor/katex/fonts/KaTeX_Caligraphic-Regular.woff2",
  "./assets/vendor/katex/fonts/KaTeX_Fraktur-Bold.woff2",
  "./assets/vendor/katex/fonts/KaTeX_Fraktur-Regular.woff2",
  "./assets/vendor/katex/fonts/KaTeX_Main-Bold.woff2",
  "./assets/vendor/katex/fonts/KaTeX_Main-BoldItalic.woff2",
  "./assets/vendor/katex/fonts/KaTeX_Main-Italic.woff2",
  "./assets/vendor/katex/fonts/KaTeX_Main-Regular.woff2",
  "./assets/vendor/katex/fonts/KaTeX_Math-BoldItalic.woff2",
  "./assets/vendor/katex/fonts/KaTeX_Math-Italic.woff2",
  "./assets/vendor/katex/fonts/KaTeX_SansSerif-Bold.woff2",
  "./assets/vendor/katex/fonts/KaTeX_SansSerif-Italic.woff2",
  "./assets/vendor/katex/fonts/KaTeX_SansSerif-Regular.woff2",
  "./assets/vendor/katex/fonts/KaTeX_Script-Regular.woff2",
  "./assets/vendor/katex/fonts/KaTeX_Size1-Regular.woff2",
  "./assets/vendor/katex/fonts/KaTeX_Size2-Regular.woff2",
  "./assets/vendor/katex/fonts/KaTeX_Size3-Regular.woff2",
  "./assets/vendor/katex/fonts/KaTeX_Size4-Regular.woff2",
  "./assets/vendor/katex/fonts/KaTeX_Typewriter-Regular.woff2",

  "./assets/js/data/courses.js",
  "./assets/js/data/knowledge.js",
  "./assets/js/data/ds.js",
  "./assets/js/data/prob.js",
  "./assets/js/data/questions.js",
  "./assets/js/data/question-notes.js",
  "./assets/js/data/external-links.js",
  "./assets/js/data/meta.js",
  "./assets/js/data/chat-rules.js",
  "./assets/js/data/chat-quick.js",

  "./assets/js/utils/dom.js",
  "./assets/js/utils/storage.js",
  "./assets/js/utils/highlight.js",
  "./assets/js/utils/math.js",
  "./assets/js/utils/search.js",

  "./assets/js/icons.js",
  "./assets/js/state.js",

  "./assets/js/components/cards.js",
  "./assets/js/components/course-card.js",
  "./assets/js/components/section-header.js",
  "./assets/js/components/article-foot.js",
  "./assets/js/components/toast.js",
  "./assets/js/components/modal.js",
  "./assets/js/components/header.js",
  "./assets/js/components/footer.js",

  "./assets/js/pages/home.js",
  "./assets/js/pages/courses.js",
  "./assets/js/pages/knowledge.js",
  "./assets/js/pages/data-structures.js",
  "./assets/js/pages/probability.js",
  "./assets/js/pages/quiz.js",
  "./assets/js/pages/chat.js",

  "./assets/js/router.js",
  "./assets/js/app.js"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE; })
          .map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (res) {
        if (res && res.ok && new URL(e.request.url).origin === self.location.origin) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        }
        return res;
      }).catch(function () {
        /* 完全离线且未命中：导航请求兜底返回整站页面 */
        if (e.request.mode === "navigate") {
          return caches.match("./index.html");
        }
        return Response.error();
      });
    })
  );
});

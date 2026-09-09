/* ============================================================
   工具层 · 语法高亮引擎（VSCode Dark+ 风格，C++ / Python）
   自原单文件内联脚本原样迁移（逻辑未改），挂载为 App.highlight。
   ============================================================ */
(function () {
  "use strict";

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var CPP_KW1 = { if: 1, else: 1, for: 1, while: 1, do: 1, switch: 1, case: 1, default: 1, return: 1, break: 1, continue: 1, goto: 1 };
  var CPP_KW2 = { const: 1, constexpr: 1, static: 1, inline: 1, using: 1, namespace: 1, template: 1, typename: 1, class: 1, struct: 1, enum: 1, union: 1, public: 1, private: 1, protected: 1, virtual: 1, override: 1, friend: 1, operator: 1, new: 1, delete: 1, this: 1, sizeof: 1, typedef: 1, true: 1, false: 1, nullptr: 1, NULL: 1, void: 1, int: 1, char: 1, short: 1, long: 1, float: 1, double: 1, bool: 1, signed: 1, unsigned: 1, size_t: 1 };
  var CPP_TYPE = { std: 1, vector: 1, string: 1, list: 1, map: 1, set: 1, unordered_map: 1, unordered_set: 1, multimap: 1, multiset: 1, queue: 1, deque: 1, stack: 1, priority_queue: 1, pair: 1, tuple: 1, array: 1, function: 1, hash: 1, cout: 1, cin: 1, cerr: 1, endl: 1 };

  var PY_KW1 = { if: 1, elif: 1, else: 1, for: 1, while: 1, return: 1, break: 1, continue: 1, pass: 1, with: 1, as: 1, in: 1, is: 1, not: 1, and: 1, or: 1, lambda: 1, yield: 1, assert: 1, raise: 1, try: 1, except: 1, finally: 1, import: 1, from: 1, del: 1, global: 1, nonlocal: 1 };
  var PY_KW2 = { True: 1, False: 1, None: 1, class: 1, def: 1 };
  var PY_TYPE = { print: 1, len: 1, range: 1, enumerate: 1, zip: 1, sorted: 1, reversed: 1, sum: 1, abs: 1, min: 1, max: 1, list: 1, dict: 1, set: 1, tuple: 1, str: 1, int: 1, float: 1, bool: 1, type: 1, open: 1, map: 1, filter: 1, any: 1, all: 1, isinstance: 1, input: 1, super: 1, self: 1, cls: 1, np: 1, numpy: 1, plt: 1, random: 1, math: 1 };

  var CPP_RE = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(^[ \t]*#[^\n]*)|(\b(?:0[xX][0-9a-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)[uUlLfF]*)|([A-Za-z_]\w*)/gm;
  var PY_RE = /(#[^\n]*)|("""[\s\S]*?"""|'''[\s\S]*?'''|[fFrRbBuU]{0,2}"(?:\\.|[^"\\\n])*"|[fFrRbBuU]{0,2}'(?:\\.|[^'\\\n])*')|(\b(?:0[xX][0-9a-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b)|(@\w+)|([A-Za-z_]\w*)/gm;

  function span(cls, text) {
    return '<span class="' + cls + '">' + esc(text) + "</span>";
  }

  function nextIsParen(src, end) {
    var i = end;
    while (i < src.length && (src.charAt(i) === " " || src.charAt(i) === "\t")) i++;
    return src.charAt(i) === "(";
  }

  function run(src, re, classify, ctx) {
    var out = [], last = 0, m, piece;
    re.lastIndex = 0;
    while ((m = re.exec(src))) {
      if (m.index > last) out.push(esc(src.slice(last, m.index)));
      if (m[0] === "") { re.lastIndex++; continue; }
      piece = classify(src, m, ctx);
      out.push(piece);
      last = m.index + m[0].length;
    }
    if (last < src.length) out.push(esc(src.slice(last)));
    return out.join("");
  }

  function classifyCpp(src, m, ctx) {
    if (m[1]) return span("tok-cm", m[1]);
    if (m[2]) return span("tok-str", m[2]);
    if (m[3]) return span("tok-pre", m[3]);
    if (m[4]) return span("tok-num", m[4]);
    var id = m[5];
    if (!id) return esc(m[0]);
    if (id === "class" || id === "struct" || id === "enum") { ctx.afterDecl = true; return span("tok-kw2", id); }
    if (ctx.afterDecl) { ctx.afterDecl = false; return span("tok-type", id); }
    if (CPP_KW1[id]) return span("tok-kw1", id);
    if (CPP_KW2[id]) return span("tok-kw2", id);
    var before = m.index >= 2 ? src.substr(m.index - 2, 2) : "";
    if (before === "::") return span(nextIsParen(src, m.index + id.length) ? "tok-fn" : "tok-type", id);
    if (CPP_TYPE[id]) return span("tok-type", id);
    if (nextIsParen(src, m.index + id.length)) return span("tok-fn", id);
    if (/^[A-Z]/.test(id)) return span("tok-type", id);
    return esc(id);
  }

  function classifyPy(src, m, ctx) {
    if (m[1]) return span("tok-cm", m[1]);
    if (m[2]) return span("tok-str", m[2]);
    if (m[3]) return span("tok-num", m[3]);
    if (m[4]) return span("tok-fn", m[4]);
    var id = m[5];
    if (!id) return esc(m[0]);
    if (id === "def" || id === "class") { ctx.afterDef = true; return span("tok-kw2", id); }
    if (ctx.afterDef) { ctx.afterDef = false; return span("tok-fn", id); }
    if (PY_KW1[id]) return span("tok-kw1", id);
    if (PY_KW2[id]) return span("tok-kw2", id);
    if (PY_TYPE[id]) return span("tok-type", id);
    if (nextIsParen(src, m.index + id.length)) return span("tok-fn", id);
    if (/^[A-Z]/.test(id)) return span("tok-type", id);
    return esc(id);
  }

  function detectLang(raw) {
    var s = String(raw || "");
    if (/(^|\n)\s*#\s*include|\bstd::|\bnullptr\b|\bcout\b|->/.test(s)) return "cpp";
    if (/(^|\n)\s*(import|from|def)\s|\bprint\s*\(/.test(s)) return "python";
    return "cpp";
  }

  function highlight(raw, lang) {
    var s = String(raw || "");
    if (lang === "python") return run(s, PY_RE, classifyPy, { afterDef: false });
    return run(s, CPP_RE, classifyCpp, { afterDecl: false });
  }

  window.App = window.App || {};
  window.App.highlight = { detectLang: detectLang, highlight: highlight };
  /* 兼容旧全局引用 */
  window.APP_HL = window.App.highlight;
})();

/* ============================================================
   工具层 · 数学公式渲染（KaTeX，本地内置于 assets/vendor/katex/）
   全站公式约定：
     行内公式：\( ... \)      独立公式：\[ ... \]
   ⚠ 数据文件（prob.js 等）里的字符串中，反斜杠必须写成双反斜杠：
     content 内写  \\(P(A\\mid B)\\)  → 运行时为  \(P(A|B)\) → KaTeX 渲染。
   本文件职责：
     1) App.math.typeset(root)   —— 对子树执行 auto-render；页面切换 /
        动态 innerHTML 注入后由 router.js / quiz.js / modal.js 调用；
     2) 渲染失败降级：单条公式解析错误仅标红原文（throwOnError:false）；
        KaTeX 脚本整体缺失（如异常离线）时把 \( \) 剥成可读纯文本，
        绝不整页空白；
     3) App.math.plain(tex) / plainAll(text) —— LaTeX 源码 → 可读纯文本，
        供搜索索引与降级路径使用。
   注意：<pre>/<code> 内不会被渲染（auto-render 默认忽略），代码块安全。
   ============================================================ */
(function () {
  "use strict";

  var DELIMITERS = [
    { left: "\\(", right: "\\)", display: false },
    { left: "\\[", right: "\\]", display: true }
  ];

  /* LaTeX 命令 → 可读纯文本（搜索片段 / KaTeX 缺失时降级用） */
  var SYM = {
    le: "≤", leq: "≤", ge: "≥", geq: "≥", ne: "≠", neq: "≠", approx: "≈", sim: "∼", cong: "≅",
    propto: "∝", equiv: "≡", "mp": "∓", pm: "±", div: "÷", cdot: "·", times: "×",
    sum: "∑", prod: "∏", int: "∫", oint: "∮", iint: "∬", infty: "∞", partial: "∂", nabla: "∇",
    in: "∈", notin: "∉", ni: "∋", subset: "⊂", subseteq: "⊆", supset: "⊃", cup: "∪", cap: "∩",
    emptyset: "∅", varnothing: "∅", setminus: "∖",
    forall: "∀", exists: "∃", neg: "¬", lnot: "¬", land: "∧", lor: "∨",
    to: "→", rightarrow: "→",longrightarrow: "→", leftarrow: "←", Rightarrow: "⇒",
    Leftrightarrow: "⇔", mapsto: "↦", uparrow: "↑", downarrow: "↓",
    leftrightarrow: "↔",
    langle: "⟨", rangle: "⟩", lvert: "|", rvert: "|", lVert: "‖", rVert: "‖",
    dots: "…", ldots: "…", cdots: "⋯", vdots: "⋮",
    alpha: "α", beta: "β", gamma: "γ", delta: "δ", epsilon: "ε", varepsilon: "ε", zeta: "ζ",
    eta: "η", theta: "θ", vartheta: "ϑ", iota: "ι", kappa: "κ", lambda: "λ", mu: "μ", nu: "ν",
    xi: "ξ", pi: "π", varpi: "ϖ", rho: "ρ", sigma: "σ", varsigma: "ς", tau: "τ", upsilon: "υ",
    phi: "φ", varphi: "φ", chi: "χ", psi: "ψ", omega: "ω",
    Gamma: "Γ", Delta: "Δ", Theta: "Θ", Lambda: "Λ", Xi: "Ξ", Pi: "Π", Sigma: "Σ",
    Upsilon: "Υ", Phi: "Φ", Psi: "Ψ", Omega: "Ω",
    log: "log", ln: "ln", lg: "lg", exp: "exp", sin: "sin", cos: "cos", tan: "tan",
    cov: "Cov", var: "Var", det: "det", max: "max", min: "min", deg: "deg",
    percent: "%", prime: "′"
  };
  var ACCENT = { hat: "̂", widehat: "̂", bar: "̄", overline: "̄", tilde: "̃",
    widetilde: "̃", vec: "⃗", dot: "̇", ddot: "̈" };
  /* \left \right 与排版空白/尺寸命令：直接去掉 */
  var DROP = /\\(?:left|right|bigl|bigr|Bigl|Bigr|biggl|biggr|Biggl|Biggr|big|Big|bigg|Bigg|displaystyle|textstyle|scriptstyle|limits|nolimits)\b|\\[,;:!]|\\ |\\quad|\\qquad|\\mathit|\\operatorname/g;

  function plain(tex) {
    var s = String(tex == null ? "" : tex);
    /* 重音：\hat{\theta} → θ̂（组合符跟在基字符后） */
    s = s.replace(/\\(hat|widehat|bar|overline|tilde|widetilde|vec|dot|ddot)\s*\{([^{}]*)\}/g,
      function (m, name, c) { return c + (ACCENT[name] || ""); });
    /* 分数与根号（内层不含嵌套花括号时化简；外层多跑几轮消化嵌套） */
    for (var k = 0; k < 3; k++) {
      var t = s
        .replace(/\\d?tfrac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "$1/$2")
        .replace(/\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "$1/($2)")
        .replace(/\\binom\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "C($1,$2)")
        .replace(/\\sqrt\s*\[([^\]]*)\]\s*\{([^{}]*)\}/g, "($2)^(1/$1)")
        .replace(/\\sqrt\s*\{([^{}]*)\}/g, "√($1)");
      if (t === s) break;
      s = t;
    }
    s = s.replace(/\\(?:text|textrm|textbf|textit|mathrm|mathbf|mathbb|mathcal|mathsf|bm)\s*\{([^{}]*)\}/g, "$1");
    s = s.replace(DROP, "");
    s = s.replace(/\\([a-zA-Z]+)/g, function (m, name) {
      return SYM[name] !== undefined ? SYM[name] : "";
    });
    s = s.replace(/\^\{([^{}]*)\}/g, "^$1");
    s = s.replace(/[{}]/g, "");
    return s.replace(/\s+/g, " ").trim();
  }

  /* 把一段运行时文本里的所有 \( \) / \[ \] 换成可读纯文本（搜索索引用） */
  function plainAll(text) {
    return String(text == null ? "" : text)
      .replace(/\\\[([\s\S]+?)\\\]/g, function (m, t) { return " " + plain(t) + " "; })
      .replace(/\\\(([\s\S]+?)\\\)/g, function (m, t) { return " " + plain(t) + " "; });
  }

  function katexReady() {
    return !!(window.renderMathInElement && window.katex);
  }

  /* KaTeX 缺失时的降级：把公式记号剥成纯文本，保留内容且不报错 */
  function degrade(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || n.nodeValue.indexOf("\\") === -1) return NodeFilter.FILTER_REJECT;
        var p = n.parentElement;
        if (p && p.closest("pre,code,script,style,textarea")) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (t) {
      t.nodeValue = t.nodeValue
        .replace(/\\\[([\s\S]+?)\\\]/g, function (m, x) { return plain(x); })
        .replace(/\\\(([\s\S]+?)\\\]/g, function (m, x) { return plain(x); });
    });
  }

  /* 主入口：渲染 root（默认整个文档）内尚未渲染的公式。幂等，可重复调用。 */
  function typeset(root) {
    var el = root || document.body;
    if (!el || !el.querySelectorAll) return;
    if (katexReady()) {
      try {
        window.renderMathInElement(el, {
          delimiters: DELIMITERS,
          throwOnError: false,   /* 单条公式出错：原文标红显示，不影响整页 */
          errorColor: "#b91c1c",
          strict: "ignore",      /* 公式内中文等一律放行，不产生 console 噪音 */
          output: "html",
          ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code", "option"],
          ignoredClasses: ["katex", "katex-display", "nomath"],
          errorCallback: function () { /* 静默：错误已由 errorColor 可视化 */ }
        });
      } catch (e) { /* 渲染器异常：退回降级路径，保证不留 \( \) 生文本 */
        degrade(el);
      }
      return;
    }
    degrade(el);
  }

  window.App = window.App || {};
  window.App.math = {
    typeset: typeset,
    plain: plain,
    plainAll: plainAll,
    ready: katexReady
  };
})();

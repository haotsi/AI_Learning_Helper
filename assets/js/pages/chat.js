/* ============================================================
   页面 · AI 助手（站内知识问答 · 本地模拟）
   产品边界：只回答站内已收录内容，暂不支持开放域对话。
   回复自动附带「继续学习 / 查看练习题」操作按钮（若回复含站内链接）。
   问答规则库见 data/chat-rules.js；快捷问题见 data/chat-quick.js。
   真实 API 扩展点：把 CONFIG.USE_MOCK 设为 false 并完善 callRealAPI()；
   ⚠ 密钥必须走后端代理，不要写进任何前端文件。
   ============================================================ */
(function () {
  "use strict";

  var dom = window.App.dom;
  var icons = window.App.icons;
  var esc = dom.esc;
  var $ = dom.$;

  /* ---------------- 接入配置（扩展点，本次不接真实模型） ---------------- */
  var CONFIG = {
    USE_MOCK: true,            // true = 本地规则 + 站内检索
    endpoint: "",              // TODO: OpenAI 兼容接口地址（建议走自建后端代理）
    apiKey: "",                // TODO: ⚠ 不要把真实密钥写进前端
    model: ""                  // TODO: 模型名，如 gpt-4o-mini / deepseek-chat / qwen-plus
  };

  var messages = [];
  var busy = false;
  var bound = false;
  var chatBody, chatInput, sendBtn, quickEl;

  /* ---------------- 回复生成（意图评分 + 站内检索兜底） ---------------- */
  function scoreRule(rule, lower) {
    var s = 0;
    rule.keys.forEach(function (k) {
      if (lower.indexOf(k) !== -1) s += k.length >= 3 ? 3 : 2;
    });
    return s;
  }

  function mockReply(text) {
    var lower = String(text || "").toLowerCase();
    var best = null, bestScore = 0;
    var RULES = (window.APP_DATA.chatRules || []);
    RULES.forEach(function (r) {
      var s = scoreRule(r, lower);
      if (s > bestScore) { bestScore = s; best = r; }
    });
    if (best) return best.reply();

    /* 兜底：站内全文检索，把相关章节推荐给用户 */
    var hits = window.App.search.search(text, 4);
    if (hits.length) {
      var lines = hits.map(function (h) {
        return "· 《" + h.title + "》〔" + h.type + "〕 " + h.route;
      });
      return "这个问题超出了我的固定问答库，但我在站内帮你找到了相关内容：\n\n" + lines.join("\n") +
        "\n\n点击链接直达；也可以用顶部搜索框（按 / 呼出）搜更多关键词。";
    }
    return (window.APP_DATA.chatNotFound || "我暂时没有找到相关内容，可以试试搜索知识库，或换一种问法。") +
      "\n\n站内检索更擅长这些词：「哈希表」「贝叶斯」「蒙特卡洛」「提示词」「过拟合」。";
  }

  /* ---------------- 真实 API 接口（预留骨架） ---------------- */
  function callRealAPI(text, history) {
    // TODO: 接入真实大模型时取消注释并完善（务必走后端代理，避免暴露密钥）
    // var msgs = history.map(function (m) {
    //   return { role: m.role === "ai" ? "assistant" : "user", content: m.text };
    // });
    // msgs.push({ role: "user", content: text });
    // return fetch(CONFIG.endpoint, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ model: CONFIG.model, messages: msgs })
    // }).then(function (r) { return r.json(); })
    //   .then(function (d) { return d.choices[0].message.content; });
    return Promise.reject(new Error("尚未配置真实 AI 接口，请保持 USE_MOCK = true 或完成 callRealAPI 实现"));
  }

  function getReply(text) {
    return CONFIG.USE_MOCK
      ? new Promise(function (resolve) {
          setTimeout(function () { resolve(mockReply(text)); }, 450 + Math.random() * 600);
        })
      : callRealAPI(text, messages);
  }

  /* ---------------- 渲染 ---------------- */
  function linkify(escaped) {
    return escaped
      .replace(/#\/[a-z]+(?:\/[a-z0-9]+)?/g, function (m) { return '<a href="' + m + '">' + m + "</a>"; })
      .replace(/https?:\/\/[^\s<)]+/g, function (m) { return '<a href="' + m + '" target="_blank" rel="noopener noreferrer">' + m + "</a>"; });
  }
  function firstRoute(text) {
    var m = /#\/[a-z]+(?:\/[a-z0-9]+)?/.exec(text);
    return m ? m[0] : null;
  }
  function msgHTML(m) {
    var bubble = esc(m.text);
    var actions = "";
    if (m.role === "ai") {
      bubble = linkify(bubble);
      var r = firstRoute(m.text);
      actions = '<div class="msg-actions">' +
        (r && /^#\/(knowledge|ds|prob|courses)/.test(r)
          ? '<a class="btn btn-primary btn-xs" href="' + r + '">' + icons.get("play", 12) + " 继续学习</a>" : "") +
        '<a class="btn btn-quiet btn-xs" href="#/quiz">' + icons.get("pencil", 12) + " 查看练习题</a>" +
        "</div>";
    }
    return (
      '<div class="msg ' + (m.role === "user" ? "user" : "ai") + '">' +
      '<div class="m-avatar">' + (m.role === "user" ? icons.get("user", 15) : icons.get("robot", 16)) + "</div>" +
      '<div class="msg-col"><div class="bubble">' + bubble + "</div>" + actions +
      "<time>" + dom.timeStr(m.ts) + "</time></div></div>"
    );
  }
  function renderChat() {
    chatBody.innerHTML = messages.map(msgHTML).join("");
    if (window.App.math) window.App.math.typeset(chatBody);   /* 动态消息渲染后补公式 */
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  function showTyping() {
    var t = document.createElement("div");
    t.className = "msg ai typing";
    t.id = "typingMsg";
    t.innerHTML = '<div class="m-avatar">' + icons.get("robot", 16) + '</div><div class="msg-col"><div class="bubble"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div></div>';
    chatBody.appendChild(t);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  function hideTyping() {
    var t = $("#typingMsg");
    if (t) t.remove();
  }

  function renderQuick() {
    if (!quickEl) return;
    var groups = window.APP_DATA.chatQuick || [];
    quickEl.innerHTML = groups.map(function (g) {
      return '<div class="qgroup"><span class="qlabel">' + icons.get(g.icon || "spark", 13) + " " + esc(g.label) + "</span>" +
        g.items.map(function (it) {
          return '<button type="button" class="chip" data-q="' + esc(it.q) + '">' + esc(it.t) + "</button>";
        }).join("") + "</div>";
    }).join("");
  }

  /* ---------------- 发送 ---------------- */
  function sendChat(text) {
    text = (text || "").trim();
    if (!text || busy) return;
    busy = true;
    sendBtn.disabled = true;

    messages.push({ role: "user", text: text, ts: Date.now() });
    window.App.state.chatSave(messages);
    renderChat();
    showTyping();
    chatInput.value = "";
    chatInput.style.height = "46px";

    getReply(text).then(function (reply) {
      hideTyping();
      messages.push({ role: "ai", text: reply, ts: Date.now() });
      window.App.state.chatSave(messages);
      renderChat();
    }).catch(function (err) {
      hideTyping();
      messages.push({ role: "ai", text: "⚠ 出错了：" + err.message, ts: Date.now() });
      renderChat();
    }).finally(function () {
      busy = false;
      sendBtn.disabled = false;
      chatInput.focus();
    });
  }

  /* ---------------- 整页渲染（视图骨架由本文件生成） ---------------- */
  function shell() {
    return '<div class="chat-wrap">' +
      '<div class="chat-top"><div class="row">' +
      '<div class="who"><div class="avatar">' + icons.get("robot", 17) + "</div>" +
      '<div><div>AI 答疑助手</div><div style="font-size:12px;color:var(--color-muted);font-weight:400">本地规则匹配 + 站内全文检索</div></div></div>' +
      '<button class="btn btn-ghost btn-sm" id="chatClear" type="button">' + icons.get("trash", 13) + " 清空对话</button>" +
      '</div><div class="chat-notice">' + icons.get("info", 13) +
      " 当前为站内知识问答，暂不支持开放域对话。回答基于本站课程、笔记与题库，不构成事实来源。</div></div>" +
      '<div class="chat-body" id="chatBody" aria-live="polite"></div>' +
      '<div class="chat-quick" id="chatQuick"></div>' +
      '<div class="chat-input">' +
      '<textarea id="chatInput" placeholder="输入你的问题…（Enter 发送，Shift+Enter 换行）" rows="1" aria-label="提问输入框"></textarea>' +
      '<button class="btn btn-primary" id="chatSend" type="button">发送</button>' +
      "</div></div>";
  }

  function init() {
    var host = $("#chatApp");
    if (!host) return;
    if (!host.querySelector(".chat-wrap")) host.innerHTML = shell();

    chatBody = $("#chatBody");
    chatInput = $("#chatInput");
    sendBtn = $("#chatSend");
    quickEl = $("#chatQuick");

    var saved = window.App.state.chatLoad();
    messages = saved && saved.length ? saved : [{
      role: "ai",
      text: "你好！我是本站的 AI 答疑助手。\n\n我能做什么：\n· 学习规划：该先学什么、路径怎么走\n· 概念解释：AI / 数据结构 / 概率统计的核心概念\n· 题目讲解：站内题目与易错点\n· 课程推荐：按目标推荐站内课程与资源\n\n产品边界：当前为站内知识问答，暂不支持开放域对话；未命中固定问答库时，我会全文检索站内内容并给出直达链接。\n\n点下方快捷问题，或直接提问。",
      ts: Date.now()
    }];
    renderChat();
    renderQuick();

    if (bound) return;
    bound = true;
    sendBtn.addEventListener("click", function () { sendChat(chatInput.value); });
    chatInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendChat(chatInput.value);
      }
    });
    chatInput.addEventListener("input", function () {
      chatInput.style.height = "46px";
      chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + "px";
    });
    quickEl.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (chip) sendChat(chip.dataset.q);
    });
    $("#chatClear").addEventListener("click", function () {
      messages = [];
      window.App.state.chatClear();
      init();   // 重新渲染欢迎消息（监听已绑定则跳过）
    });

    /* 无头验证钩子（生产无影响）：?autochat=问题 */
    var aQ = new RegExp("[?&]autochat=([^&]+)").exec(location.search);
    if (aQ) {
      var q1 = decodeURIComponent(aQ[1]);
      document.title = "AI:" + mockReply(q1).slice(0, 80).replace(/\n/g, " ");
    }
  }

  window.App = window.App || {};
  window.App.pages = window.App.pages || {};
  window.App.pages.chat = { init: init, sendChat: sendChat };
  /* 兼容旧全局调试钩子 */
  window.AI_CHAT = { getReply: getReply, mockReply: mockReply, CONFIG: CONFIG };
})();

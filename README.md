# 学习助手 · 模块化静态网站

一个**零依赖**的多学科学习助手网站：AI 人工智能、数据结构与算法、概率论与数理统计、数理逻辑四大板块并列推进。前端按「数据 / 工具 / 状态 / 组件 / 页面 / 路由」分层拆分为多个文件，纯静态运行，可直接部署到 GitHub Pages；**双击 `index.html` 也能打开**（脚本采用有序普通脚本而非 ES Module，以兼容 `file://`）。

> **项目地址**：<https://github.com/haotsi/AI_Learning_Helper>

## 目录结构

```
AI_Learning_Helper/
├── index.html                  # 页面骨架（视图容器 + 弹窗 + 分层脚本引用）
├── assets/
│   ├── css/
│   │   ├── variables.css       # 设计变量（主色 / 四学科主题色 / 圆角 / 阴影 / 间距）
│   │   ├── reset.css           # 基础重置与无障碍焦点样式
│   │   ├── layout.css          # 布局（导航 / 页脚 / Hero / 区块 / 双栏 / 聊天）
│   │   ├── components.css      # 组件（按钮 / 卡片 / 弹窗 / 测验 / 代码块 / Toast…）
│   │   ├── responsive.css      # 移动端适配
│   │   └── math.css            # 数学公式样式（KaTeX 输出美化，最后加载）
│   ├── vendor/
│   │   └── katex/              # KaTeX 本地内置（katex.min.css/js + auto-render + 20 个 woff2 字体，零外部请求）
│   └── js/
│       ├── data/               # ① 数据层（内容增改只动这里）
│       │   ├── courses.js      #   APP_DATA.stages   学习路径 4 阶段 12 门课
│       │   ├── knowledge.js    #   APP_DATA.articles AI 知识笔记 15 篇
│       │   ├── ds.js           #   APP_DATA.ds / dsEx  数据结构 23 章 + 典型例题
│       │   ├── prob.js         #   APP_DATA.prob     概率统计 14 章
│       │   ├── logic.js        #   APP_DATA.logic    数理逻辑 17 章（按五大阶段分组）
│       │   ├── questions.js    #   APP_DATA.quiz     基础题库 60 题
│       │   ├── logic-quiz.js   #   数理逻辑 24 题（追加为 61–84）+ 注释按偏移自动合并
│       │   ├── question-notes.js # APP_DATA.quizOptNotes 每题错误选项的「为什么不选」
│       │   ├── meta.js         #   APP_META 学科归属 / 前置知识 / 学习成果等引导元数据
│       │   ├── external-links.js # APP_DATA.externalLinks 外站接口（智科全家桶 / GitHub）
│       │   ├── chat-rules.js   #   APP_DATA.chatRules AI 助手问答规则库
│       │   └── chat-quick.js   #   APP_DATA.chatQuick AI 助手快捷问题（四类）
│       ├── utils/              # ② 工具层
│       │   ├── dom.js          #   选择器 / 转义 / 事件委托
│       │   ├── storage.js      #   localStorage 安全封装（file:// 自动降级内存）
│       │   ├── search.js       #   全站搜索索引与加权评分（含练习题）
│       │   ├── highlight.js    #   C++ / Python 语法高亮引擎
│       │   └── math.js         #   KaTeX 公式排版（自动渲染 + 失败降级 + LaTeX→纯文本）
│       ├── icons.js            #   统一 SVG 描边图标库
│       ├── state.js            #   学习进度状态（localStorage 持久化）
│       ├── components/         # ③ 组件层
│       │   ├── cards.js        #   徽章 / 知识点块 / 资源列表 / 代码块增强 / 空状态
│       │   ├── course-card.js  #   课程卡（前置知识 / 成果 / 开始·详情·练习按钮）
│       │   ├── section-header.js # 区块标题
│       │   ├── article-foot.js #   文章底部「上一条 / 下一条 / 相关内容」
│       │   ├── modal.js        #   通用弹窗（Esc / 遮罩 / 焦点回归）
│       │   ├── toast.js        #   轻提示
│       │   ├── header.js       #   导航（外站入口按数据注入 + 移动端菜单）
│       │   └── footer.js       #   页脚
│       ├── pages/              # ④ 页面层（每个 hash 路由一个控制器）
│       │   ├── home.js  courses.js  knowledge.js
│       │   ├── data-structures.js  probability.js  logic.js
│       │   └── quiz.js  chat.js
│       ├── router.js           # ⑤ hash 路由
│       └── app.js              # ⑤ 启动入口
├── icons/                      # PWA 应用图标
├── manifest.webmanifest        # PWA 清单
├── sw.js                       # Service Worker（离线缓存；资源列表需随文件增删维护）
├── .nojekyll                   # 关闭 GitHub Pages 的 Jekyll 处理
├── scripts/check.mjs           # 自动化冒烟测试（Node 无头 DOM）
├── README.md                   # 本说明
└── CHANGELOG.md                # 更新记录
```

## 路由

| Hash 路由 | 页面 |
| ---- | ---- |
| `#/home` | 首页（Hero / 我的学习进度 / 学科板块 / 学习工具 / 新手推荐 / 延伸阅读） |
| `#/courses` `#/courses/<课程id>` | 学习路径（弹窗直达，如 `#/courses/c102`） |
| `#/knowledge` `#/knowledge/<笔记id>` | 知识库（学科 / 难度 / 标签筛选 + 分组搜索） |
| `#/ds` `#/ds/ds02b` | 数据结构与算法分章教程 |
| `#/prob` `#/prob/p04` | 概率论与数理统计分章教程（公式由内置 KaTeX 渲染） |
| `#/logic` `#/logic/l03` | 数理逻辑分章教程（17 章 / 五大阶段路线，公式由内置 KaTeX 渲染） |
| `#/quiz` `#/quiz/入门` `#/quiz/sub-ds` `#/quiz/sub-logic` `#/quiz/wrong` `#/quiz/all/q12` | 练习测验（难度 / 学科筛选 / 错题本 / 题目直达） |
| `#/chat` | AI 助手（站内知识问答） |

## 如何运行

任选其一：

1. **直接打开**：双击 `index.html`（file:// 下 Service Worker 自动跳过注册，localStorage 正常；个别浏览器隐私模式下降级为内存存储）
2. **本地服务器**（与线上行为一致，推荐验证 PWA 时用）：`python -m http.server 8000`，访问 <http://localhost:8000/>
3. **自动化冒烟测试**：`node scripts/check.mjs`（覆盖 136 断言：路由渲染、公式渲染与降级、数理逻辑板块与学科主题色、四学科答题与错题本、逻辑关键词搜索直达、多视口导航溢出与学科卡列数、移动端 375px 无溢出与表格自适应换行、进度持久化、AI 助手等，全部通过退出码为 0）

## 部署到 GitHub Pages

推送仓库 → Settings → Pages → 选择分支（根目录）即可得到 `https://<用户名>.github.io/<仓库名>/`。

- 全站均为**相对路径**（`./assets/…`），子路径部署无碍；
- 根路径直达 `index.html`（含 `.nojekyll`，不会显示 README）；
- **更新内容后请同步 `sw.js`**：改动较大时把 `CACHE` 版本号 +1，新增/改名 assets 文件时维护 `ASSETS` 列表。

手机/桌面「添加到主屏幕」可安装为 PWA，一次访问后离线可用。

## 验证清单（上线前逐项人工过一遍）

基础：
- [ ] `node scripts/check.mjs` 全绿
- [ ] 双击 index.html 可直接打开、无控制台报错
- [ ] 本地服务器 + GitHub Pages 各访问一次，8 个 hash 路由可达
- [ ] 浏览器前进 / 后退 / 刷新当前路由不报错
- [ ] Network 面板无 404

功能：
- [ ] 顶栏导航高亮、移动端汉堡菜单、外站/GitHub 入口
- [ ] `/` 或 `Ctrl+K` 呼出搜索：中文关键词（贝叶斯、蒲丰）命中、↑↓/Enter 键盘导航
- [ ] 课程卡：开始学习 / 查看详情 / 关联练习三按钮；弹窗小节打勾、标记完成
- [ ] 学习路径：阶段时长 / 完成数 / 当前推荐 / 主线链
- [ ] 知识库：学科·难度·标签筛选；搜索分「课程 / 知识笔记 / 练习题」；空结果有提示
- [ ] 文章底部：上一条 / 下一条 / 相关课程 / 配套练习
- [ ] 测验：单题流与每页 5 题；即时批改 + 解析 + 为什么不选 + 相关知识点直达；学科筛选含「数理逻辑」（24 题）、结果页四学科能力分析
- [ ] 概率统计页：公式以 KaTeX 渲染（分数/根号/求和/积分/上下标）；长公式在手机上横向滚动不撑破版面；切换章节 / 刷新路由后公式仍正常渲染；控制台无 KaTeX 报错
- [ ] 数理逻辑页：17 章目录与五阶段路线可点；真值表 / 等价律表格正常渲染；`\neg \forall \exists \to \equiv \therefore` 等逻辑符号无残留 `\( `、无红色解析错误；章末「上一条 / 下一条 / 配套练习」可用
- [ ] 答题进度刷新不丢；错题自动进错题本；☆ 收藏；结果页能力分析
- [ ] 代码块高亮与一键复制（知识库 / 数据结构 / 概率统计 / 题目）
- [ ] AI 助手：四类快捷问题、输入发送、站内链接可点、无法回答时的兜底文案
- [ ] 搜索：「数理逻辑」「真值表」「蕴含」「德摩根律」「CNF」「谓词」「全称量词」「数学归纳法」均能命中对应逻辑章节并可跳转
- [ ] 外部链接均 `target="_blank" rel="noopener noreferrer"`

视觉：
- [ ] 移动端（≤720px）首屏在短高度内完成标题 / 说明 / 主按钮
- [ ] 375px / 320px 视口下无整页横向滚动条（含 5 列宽表格的 p06/p07、长公式 p09、ds14、数理逻辑 l03/l05/l16 的真值表与等价律大表）；表格改为定宽换行、单元格与长公式均无内部溢出（无横向滚动条）
- [ ] 1280 / 1100 / 1000 / 900 / 768px 视口下导航 8 项（含新增「数理逻辑」）不溢出、不重叠、不产生整页横向滚动；首页四张学科卡在 ≥1240px 一行四张、平板 2×2、手机单列
- [ ] 键盘 Tab 可达所有交互元素，focus 环清晰
- [ ] 四学科主题色（紫 / 蓝绿 / 橙 / 宝蓝）在各页面一致

## 扩充内容（只动数据层）

全部内容数据在 `assets/js/data/`：

- **加课程**：`courses.js` 的 `stages[].courses[]` 追加对象；同步在 `meta.js` 的 `APP_META.courses` 补 `prereq` / `outcome`（缺失也能运行，只是卡片不显示引导行）
- **加文章**：`knowledge.js` 的 `articles[]`；`content` 支持 HTML（`<pre><code>` 自动获得高亮与复制按钮）；同步 `meta.js.articles` 补难度与前置
- **加题目**：`questions.js` 的 `quiz[]` 追加 `{q, code?, options, answer, explain, level, cat}`——`level` 必须是 `入门|进阶|挑战`；在 `meta.js.quizCatSubject` 给新 `cat` 归学科；在 `question-notes.js` 补错误选项注释（可缺省，界面自动降级）
- **加数据结构 / 概率 / 数理逻辑章节**：`ds.js` / `prob.js` / `logic.js`（章节对象的 `cat` 即学习阶段分组，数理逻辑固定五组：逻辑基础 / 命题逻辑 / 谓词逻辑 / 证明方法 / 计算机逻辑）；C++ 代码里的 `<` 必须写成 `&lt;`；新章节 id 记得在 `meta.js.dsLevel / probLevel / logicLevel` 补难度
- **加数理逻辑题目**：`logic-quiz.js` 的 `LOGIC[]` 追加、`LOGIC_NOTES{}` 用**相对序号**补错误选项注释（运行时自动按题库长度偏移合并，不会错位）；新 `cat` 仍须在 `meta.js.quizCatSubject`（→`logic`）与 `quizCatRoute`（→`#/logic/lxx`）登记
- **题库题型扩展**：题目对象已预留 `type` 字段（默认选择题）；新增代码阅读 / 计算 / 场景题时在 `pages/quiz.js` 的 `questionCard` 分支渲染
- **主题**：只改 `assets/css/variables.css`（公式配色令牌 `--formula-bg` / `--formula-border` 同文件）
- **数学公式**：概率统计与数理逻辑教程正文统一用 KaTeX：行内 `\( ... \)`、独立 `\[ ... \]`；在数据 JS 字符串中反斜杠必须写成双反斜杠（`\\(`、`\\frac`；`\neg` `\neq` 这类以 `\n` 开头的命令若只写单反斜杠会被字符串转义吃掉变成换行），公式内小于号用 `\lt`、百分号用 `\%`、条件概率竖线用 `\mid`；代码块（`<pre><code>`）内的内容自动跳过渲染
- **外站接口**：`data/external-links.js`

## AI 助手边界与真实 API 扩展点

`#/chat` 当前为**本地规则匹配 + 站内全文检索**，界面已明示「暂不支持开放域对话」。接入真实大模型的扩展点在 `assets/js/pages/chat.js` 顶部的 `CONFIG`（`USE_MOCK` / `endpoint` / `apiKey` / `model`）与 `callRealAPI()` 骨架：取消注释、改为经**自建后端代理**转发。⚠ 真实密钥绝不能写进任何前端文件。

## 学习进度存储

浏览器 `localStorage` 键 `ai-learning-progress-v1`：

```js
{
  completedCourses: [],   // 已完成课程 id
  completedLessons: [],   // 已完成小节 "courseId:序号"
  quizProgress: {},       // { 题号: 所选选项下标 }
  wrongQuestions: [],     // 错题本 [{ qid, source: "wrong"|"star", ts }]
  lastVisitedRoute: ""    // 最近访问路由（首页「继续上次学习」）
}
```

聊天记录单独存 `ai-learning-chat-v1`。全部逻辑封装在 `assets/js/state.js`。

## 安全与协作提醒

- 真实 API Key 必须经自建后端代理，不要写进任何前端文件
- 提交前跑 `node scripts/check.mjs`

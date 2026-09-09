/* ============================================================
   数据层 · 元数据扩展（新增文件，不改动 APP_DATA 原始内容）
   为课程 / 笔记 / 题库补充「学科归属、难度、前置知识、学习成果」
   等学习引导字段。若新增内容，请在此同步补充；缺失条目有运行时兜底。
   ============================================================ */
window.APP_META = window.APP_META || {};

/* ---------------- 三大学科定义（主题色在 CSS 变量中） ---------------- */
window.APP_META.subjects = {
  ai:   { key: 'ai',   name: 'AI 人工智能',        short: 'AI',     route: '#/courses',   icon: 'cpu',    cls: 'subj-ai' },
  ds:   { key: 'ds',   name: '数据结构与算法',      short: '数据结构', route: '#/ds',      icon: 'layers', cls: 'subj-ds' },
  prob: { key: 'prob', name: '概率论与数理统计',    short: '概率统计', route: '#/prob',    icon: 'dice',   cls: 'subj-prob' }
};

/* ---------------- 测验题细分分类 → 学科 ---------------- */
window.APP_META.quizCatSubject = {
  'AI 概念': 'ai', 'ML 基础': 'ai', '深度学习': 'ai', '大模型': 'ai', '大模型原理': 'ai',
  'LLM 应用': 'ai', '数学直觉': 'ai', '提示词': 'ai', '评估指标': 'ai', '计算机视觉': 'ai',
  'Python 代码': 'ai', '工具': 'ai', '训练流程': 'ai', '微调': 'ai', '嵌入与检索': 'ai',
  '推理优化': 'ai', '调试与工程': 'ai', '应用开发': 'ai',
  '线性结构': 'ds', '链表': 'ds', '栈与队列': 'ds', '查找与排序': 'ds', '哈希表': 'ds',
  '树与BST': 'ds', '堆与优先队列': 'ds', '图': 'ds', '递归与分治': 'ds', '回溯': 'ds',
  '随机事件': 'prob', '贝叶斯': 'prob', '常见分布': 'prob', '数字特征': 'prob',
  '极限定理': 'prob', '信息论': 'prob', '蒙特卡洛': 'prob', '假设检验': 'prob', '极大似然': 'prob'
};

/* ---------------- 测验题细分分类 → 相关知识点直达路由 ---------------- */
window.APP_META.quizCatRoute = {
  'AI 概念': '#/knowledge/a1', 'ML 基础': '#/knowledge/a2', '深度学习': '#/knowledge/a3',
  '大模型': '#/knowledge/a4', '大模型原理': '#/knowledge/a4', 'LLM 应用': '#/knowledge/a8',
  '数学直觉': '#/prob/p01', '提示词': '#/knowledge/a5', '评估指标': '#/knowledge/a6',
  '计算机视觉': '#/knowledge/a7', 'Python 代码': '#/knowledge/a11', '工具': '#/knowledge/a10',
  '训练流程': '#/knowledge/a12', '微调': '#/knowledge/a8', '嵌入与检索': '#/knowledge/a14',
  '推理优化': '#/knowledge/a4', '调试与工程': '#/knowledge/a12', '应用开发': '#/knowledge/a13',
  '线性结构': '#/ds/ds05', '链表': '#/ds/ds06', '栈与队列': '#/ds/ds08',
  '查找与排序': '#/ds/ds16', '哈希表': '#/ds/ds14', '树与BST': '#/ds/ds12',
  '堆与优先队列': '#/ds/ds13', '图': '#/ds/ds15', '递归与分治': '#/ds/ds18', '回溯': '#/ds/ds19',
  '随机事件': '#/prob/p02', '贝叶斯': '#/prob/p04', '常见分布': '#/prob/p06',
  '数字特征': '#/prob/p08', '极限定理': '#/prob/p10', '信息论': '#/prob/p14',
  '蒙特卡洛': '#/prob/p13', '假设检验': '#/prob/p12', '极大似然': '#/prob/p11'
};

/* ---------------- 课程引导：前置知识 / 学完能做到什么 ---------------- */
window.APP_META.courses = {
  c101: { prereq: '无 · 零基础可学',        outcome: '讲清 AI / 机器学习 / 深度学习 / 大模型的概念边界，判断哪些任务适合用 AI 解决' },
  c102: { prereq: '无 · 零基础可学',        outcome: '独立编写 Python + NumPy / Pandas 数据处理脚本，跑通云端 Notebook' },
  c103: { prereq: '高中数学',               outcome: '看懂机器学习教材中的向量、矩阵、梯度与似然公式，建立反向传播的数学地基' },
  c201: { prereq: 'c102 Python 基础速成',   outcome: '完整走一遍「数据 → 特征 → 训练 → 评估」建模流程，会用指标诊断过拟合' },
  c202: { prereq: 'c201 机器学习基础',      outcome: '用 PyTorch 搭建并训练网络，解释前向 / 反向传播，调通基础超参数' },
  c203: { prereq: 'c202 神经网络与深度学习', outcome: '理解词向量到 Transformer 的演进，能用预训练语言模型完成文本任务' },
  c204: { prereq: 'c202 神经网络与深度学习', outcome: '用 CNN / ResNet 完成图像分类训练与迁移学习' },
  c301: { prereq: 'c101 什么是人工智能',    outcome: '设计稳定输出的提示词，30 行代码接入大模型 API 做小应用' },
  c302: { prereq: 'c301 提示词工程',        outcome: '搭建 RAG 检索问答系统，设计与工具联动的 Agent 工作流' },
  c303: { prereq: 'c202 神经网络与深度学习', outcome: '用 LoRA 等方式为垂直领域定制模型，并评估微调效果' },
  c401: { prereq: '无 · 建议先学 c101',     outcome: '识别偏见、幻觉与隐私风险，负责任地使用和评估 AI 产品' },
  c402: { prereq: '第三阶段任选课程',       outcome: '评估 AI 项目可行性、成本与部署运维要点，写出立项方案' }
};

/* 课程「开始学习」跳转兜底：优先取课程资源里的第一条站内链接，找不到时用此表 */
window.APP_META.courseStartFallback = {
  c101: '#/knowledge/a1', c102: '#/knowledge/a11', c103: '#/knowledge/a6',
  c201: '#/knowledge/a2', c202: '#/knowledge/a3', c203: '#/knowledge/a4',
  c204: '#/knowledge/a7', c301: '#/knowledge/a5', c302: '#/knowledge/a14',
  c303: '#/knowledge/a8', c401: '#/knowledge/a9', c402: '#/knowledge/a8'
};

/* 课程关联练习：课程等级 → 测验难度筛选参数 */
window.APP_META.courseQuizLevel = { '入门': '入门', '进阶': '进阶', '应用': '进阶', '通识': 'all' };

/* ---------------- AI 知识笔记引导：难度 / 前置 / 关联课程 ---------------- */
window.APP_META.articles = {
  a1:  { level: '入门', prereq: '无',            course: 'c101' },
  a2:  { level: '入门', prereq: 'a1 什么是人工智能',  course: 'c201' },
  a3:  { level: '进阶', prereq: 'a2 监督学习与无监督学习', course: 'c202' },
  a4:  { level: '进阶', prereq: 'a3 神经网络与反向传播直觉', course: 'c203' },
  a5:  { level: '入门', prereq: '无',            course: 'c301' },
  a6:  { level: '入门', prereq: '无（查表工具）',  course: 'c201' },
  a7:  { level: '进阶', prereq: 'a3 / a4',       course: 'c204' },
  a8:  { level: '进阶', prereq: 'a4 大语言模型与 Transformer', course: 'c302' },
  a9:  { level: '入门', prereq: '无',            course: 'c401' },
  a10: { level: '入门', prereq: '无',            course: '' },
  a11: { level: '入门', prereq: '无',            course: 'c102' },
  a12: { level: '进阶', prereq: 'a11 Python 数据处理速查', course: 'c202' },
  a13: { level: '进阶', prereq: 'a11 / a5',      course: 'c301' },
  a14: { level: '进阶', prereq: 'a11 / a4',      course: 'c302' },
  a15: { level: '进阶', prereq: 'a4 / a11',      course: 'c202' }
};

/* ---------------- 数据结构 / 概率统计章节难度（用于知识库统一筛选） ---------------- */
window.APP_META.dsLevel = {
  ds01: '入门', ds02: '入门', ds02b: '入门', ds02c: '进阶', ds02d: '入门', ds03: '入门', ds04: '入门',
  ds05: '入门', ds06: '入门', ds07: '进阶', ds08: '入门', ds09: '进阶', ds10: '入门',
  ds11: '入门', ds12: '进阶', ds13: '进阶', ds14: '进阶', ds15: '进阶',
  ds16: '入门', ds17: '进阶', ds18: '进阶', ds19: '挑战', ds20: '入门'
};
window.APP_META.probLevel = {
  p01: '入门', p02: '入门', p03: '入门', p04: '进阶', p05: '入门', p06: '入门', p07: '入门',
  p08: '进阶', p09: '进阶', p10: '进阶', p11: '挑战', p12: '挑战', p13: '进阶', p14: '挑战'
};

/* ---------------- 学习主线推荐（跨阶段的关键路径） ---------------- */
window.APP_META.mainline = ['c102', 'c201', 'c202', 'c302'];

/* ---------------- 兜底工具 ---------------- */
window.APP_META.subjectOfCat = function (cat) {
  return (window.APP_META.quizCatSubject || {})[cat] || 'ai';
};

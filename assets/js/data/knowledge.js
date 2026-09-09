// 数据层 · AI 知识库笔记（原 APP_DATA.articles，内容语义未改动）
window.APP_DATA = window.APP_DATA || {};

window.APP_DATA.articles = [
    {
      id: 'a1',
      title: '什么是人工智能',
      category: '基础概念',
      readTime: '5 分钟',
      tags: ['AI', '入门'],
      points: [
        'AI = 让机器完成需要人类智能的任务的工程学科',
        'ANI / AGI / ASI 三层次；目前一切仍是 ANI',
        '同心圆：AI ⊃ 机器学习 ⊃ 深度学习 ⊃ 大语言模型',
        '现代分水岭：从人写规则到机器从数据学规则'
      ],
      content: `
<h2>一句话定义</h2>
<p>人工智能（Artificial Intelligence, AI）是让计算机完成原本需要人类智能才能完成的任务的技术，例如看图识物、理解语言、下棋决策等。它的核心思想是：<strong>从数据中学习规律</strong>，而不是由人把每条规则写死。</p>
<h2>三个层次</h2>
<ul>
<li><strong>弱人工智能（ANI）</strong>：只擅长单一任务，如人脸识别、推荐算法——今天的 AI 全部属于这一类。</li>
<li><strong>强人工智能（AGI）</strong>：具备与人类相当的通用智能，目前仍是研究目标。</li>
<li><strong>超级智能（ASI）</strong>：全面超越人类的假想阶段。</li>
</ul>
<h2>AI、机器学习、深度学习的关系</h2>
<p>可以理解为同心圆：AI 最大；机器学习（ML）是 AI 的子集，强调从数据中学习；深度学习（DL）又是 ML 的子集，特指使用多层神经网络的方法。大语言模型（LLM）则属于深度学习在自然语言领域的成果。</p>`,
      res: {
        video: [
          { t: '吴恩达 AI for Everyone', u: 'https://www.deeplearning.ai/courses/ai-for-everyone/' },
          { t: '李宏毅机器学习 2026 课程官网', u: 'https://speech.ee.ntu.edu.tw/~hylee/ml/2026-spring.php', zh: 1 }
        ],
        read: [
          { t: 'Google ML Crash Course', u: 'https://developers.google.com/machine-learning/crash-course' },
          { t: 'D2L · 引言章（AI 全景图）', u: 'https://zh.d2l.ai/chapter_introduction/index.html', zh: 1 }
        ]
      }
    },
    {
      id: 'a2',
      title: '监督学习与无监督学习',
      category: '机器学习',
      readTime: '6 分钟',
      tags: ['ML', '基础'],
      points: [
        '监督学习：有标签 → 分类 / 回归',
        '无监督学习：无标签 → 聚类 / 降维 / 密度估计',
        '自监督学习：标签从数据自身产生（下一词预测）',
        '强化学习：奖励信号学策略',
        '一切方法的核心挑战相同：泛化'
      ],
      content: `
<h2>监督学习：有老师的学习</h2>
<p>训练数据自带标准答案（标签），模型的任务是学会从输入到输出的映射。典型任务包括<strong>分类</strong>（垃圾邮件识别）和<strong>回归</strong>（房价预测）。关键挑战是泛化：模型要在没见过的数据上也表现良好，而不是把答案背下来（过拟合）。</p>
<h2>无监督学习：自己找规律</h2>
<p>数据没有标签，模型需要自己发现结构，例如<strong>聚类</strong>（用户分群）、<strong>降维</strong>（可视化）和<strong>密度估计</strong>（异常检测）。</p>
<h2>介于两者之间</h2>
<ul>
<li><strong>自监督学习</strong>：从数据本身制造标签，如完形填空式的下一词预测——这是大语言模型预训练的核心方法。</li>
<li><strong>强化学习</strong>：通过与环境交互获得奖励信号来学习策略，常用于游戏与机器人，也是 RLHF 对齐大模型的基础。</li>
</ul>`,
      res: {
        video: [{ t: 'StatQuest：Supervised vs Unsupervised', u: 'https://www.youtube.com/@statquest', d: '10 分钟动画分清两大类方法' }],
        read: [
          { t: '南瓜书第 1 章（机器学习概论）', u: 'https://datawhalechina.github.io/pumpkin-book/', zh: 1 },
          { t: '站内文章《机器学习术语速查》', u: '#/knowledge/a6' }
        ]
      }
    },
    {
      id: 'a3',
      title: '神经网络与反向传播直觉',
      category: '深度学习',
      readTime: '7 分钟',
      tags: ['DL', '原理'],
      points: [
        '神经元 = 加权求和 + 激活函数',
        '损失函数是误差的尺子，训练 = 最小化损失',
        '反向传播 = 链式法则逐层求梯度',
        '训练循环：前向 → 反向 → 更新',
        '现代训练在此之上叠优化器 / 归一化 / 正则化'
      ],
      content: `
<h2>神经元与网络</h2>
<p>人工神经元做的事情很简单：把输入加权求和，再套一个非线性激活函数（如 ReLU）。把许多神经元分层连接，就构成神经网络。数学上每一层是一次<code>矩阵乘法 + 非线性变换</code>，层层堆叠后就能逼近非常复杂的函数。</p>
<h2>损失函数：给错误打分</h2>
<p>训练需要一个目标尺子——损失函数，衡量模型预测与真实答案的差距。训练目标就是让损失尽可能小。</p>
<h2>反向传播：沿着误差找方向</h2>
<p>如何调参数让损失变小？利用微积分中的链式法则，从输出层往回逐层计算每个参数对损失的影响（梯度），然后沿梯度反方向微调每个参数。重复前向计算、求梯度、更新参数的循环（梯度下降），网络就逐步学会了任务。</p>
<p>一个直觉比喻：蒙眼站在山坡上想下到谷底，每一步都用脚感受坡度，朝最陡的下坡方向迈一小步。</p>`,
      res: {
        video: [
          { t: '3Blue1Brown：反向传播可视化', u: 'https://www.3blue1brown.com/topics/neural-networks' },
          { t: 'Karpathy：手写 micrograd（反向传播从零实现）', u: 'https://karpathy.ai/zero-to-hero.html', d: '第一集就是 backprop' }
        ],
        read: [
          { t: 'D2L · 多层感知机', u: 'https://zh.d2l.ai/chapter_multilayer-perceptrons/index.html', zh: 1 },
          { t: 'D2L · 前向传播、反向传播和计算图', u: 'https://zh.d2l.ai/chapter_multilayer-perceptrons/backprop.html', zh: 1 }
        ]
      }
    },
    {
      id: 'a4',
      title: '大语言模型与 Transformer',
      category: '大模型',
      readTime: '8 分钟',
      tags: ['LLM', 'Transformer'],
      points: [
        'LLM 的单一目标：预测下一个 token',
        '自注意力解决长依赖 + 可并行训练',
        '三阶段：预训练 → 指令微调 → 人类偏好对齐',
        '规模法则（Scaling Law）：堆料涌现能力',
        '短板：幻觉、知识截止、精确计算'
      ],
      content: `
<h2>本质：超级下一个词预测器</h2>
<p>大语言模型（LLM）的核心任务只有一个：给定上文，预测下一个 token（词元）的概率分布。看似简单，但当模型足够大、数据足够多时，回答问题、写代码、翻译、推理等能力会涌现出来。</p>
<h2>注意力机制：让模型学会看哪里</h2>
<p>Transformer 的关键创新是<strong>自注意力（Self-Attention）</strong>：处理每个词时，模型可以动态地关注句子中任意位置的相关词，无论距离多远。这使它比早期的 RNN 更擅长捕捉长距离依赖，且可以高度并行训练。</p>
<h2>三个训练阶段</h2>
<ul>
<li><strong>预训练</strong>：海量文本上做自监督的下一词预测，学到语言与世界知识。</li>
<li><strong>指令微调（SFT）</strong>：用高质量的问题-回答样本学会听指令、按格式回答。</li>
<li><strong>人类反馈对齐（RLHF）</strong>：用人类偏好进一步修正回答风格与安全性。</li>
</ul>
<h2>局限</h2>
<p>LLM 会产生幻觉（一本正经地编造），知识有截止日期，数学与精确推理仍是弱项。工程上常用 RAG（检索增强）和工具调用补短板。</p>`,
      res: {
        video: [
          { t: 'Karpathy：从零构建 GPT 系列（Let us build GPT）', u: 'https://karpathy.ai/zero-to-hero.html' },
          { t: 'CS224n 2024：Transformer 与 LLM 讲次', u: 'https://www.youtube.com/playlist?list=PLoROMvodv4rOaMFbaqxPDoLWjDaRAdP9D' }
        ],
        read: [
          { t: 'Attention Is All You Need（原始论文）', u: 'https://arxiv.org/abs/1706.03762' },
          { t: 'The Illustrated Transformer（图解长文）', u: 'https://jalammar.github.io/illustrated-transformer/', d: '全网最佳可视化讲解，页内含中文翻译链接' },
          { t: 'DeepSeek-R1 技术报告', u: 'https://arxiv.org/abs/2501.12948', zh: 1, d: '开源推理大模型的公开细节' },
          { t: 'Hugging Face LLM Course', u: 'https://huggingface.co/learn/llm-course/chapter1/1' }
        ]
      }
    },
    {
      id: 'a5',
      title: '写好提示词的六个技巧',
      category: '应用实践',
      readTime: '5 分钟',
      tags: ['Prompt', '实战'],
      points: [
        '角色 + 任务 + 格式 + 示例 = 稳定 Prompt 骨架',
        'Few-shot 示例是性价比最高的提升手段',
        '思维链（CoT）显著提升复杂任务正确率',
        '允许说不知道 + 给依据 = 缓解幻觉',
        'Prompt 要像单元测试一样做回归迭代'
      ],
      content: `
<h2>1. 明确角色</h2>
<p>开头设定身份，例如：你是一位有 10 年经验的高中物理老师。模型会自动对齐该角色的知识范围与语气。</p>
<h2>2. 说清任务与输出格式</h2>
<p>把帮我看看这段文字改成：找出这段文字中的 3 个错别字，以表格输出，包含原文、修改、原因三列。</p>
<h2>3. 给示例（Few-shot）</h2>
<p>提供 1~3 个输入输出示例，是提升格式稳定性最有效的手段。</p>
<h2>4. 让模型分步思考</h2>
<p>复杂推理任务加上请一步步分析后再给结论，可显著降低出错率。</p>
<h2>5. 限定范围、允许说不知道</h2>
<p>加一句：若不确定请回答未知，不要编造。可缓解幻觉问题。</p>
<h2>6. 迭代而非一次完美</h2>
<p>把与模型的对话当作草稿协作：观察输出哪里不符合预期，针对性地补充约束，逐步收敛到稳定 Prompt。</p>`,
      res: {
        video: [{ t: 'ChatGPT Prompt Engineering for Developers（免费短课）', u: 'https://www.deeplearning.ai/courses/chatgpt-prompt-eng/' }],
        read: [
          { t: '提示工程指南 · Few-shot（中文）', u: 'https://www.promptingguide.ai/zh/techniques/fewshot', zh: 1 },
          { t: '提示工程指南 · 思维链 CoT（中文）', u: 'https://www.promptingguide.ai/zh/techniques/cot', zh: 1 },
          { t: 'OpenAI 官方 Prompt 最佳实践', u: 'https://platform.openai.com/docs/guides/prompt-engineering' }
        ]
      }
    },
    {
      id: 'a6',
      title: '机器学习术语速查',
      category: '基础概念',
      readTime: '6 分钟',
      tags: ['术语', '查表'],
      points: [
        '四要素：特征 / 标签 / 模型 / 参数',
        '训练 vs 推理；拟合 vs 泛化',
        '训练 = 在参数空间里沿着梯度下坡',
        '评估必须用没参与训练的数据',
        '类别不平衡时，准确率会骗人'
      ],
      content: `
<h2>新手名词对照表</h2>
<table>
<tr><th>概念</th><th>一句话解释</th></tr>
<tr><td>特征 / 标签</td><td>输入给模型的线索 / 希望模型预测的答案</td></tr>
<tr><td>模型 / 参数</td><td>那个可调的函数族 / 函数里的一组可调旋钮</td></tr>
<tr><td>训练 / 推理</td><td>调参数找规律的过程 / 用调好的模型做预测</td></tr>
<tr><td>损失函数</td><td>给预测与真实答案的差距打分</td></tr>
<tr><td>梯度 / 学习率</td><td>该往哪个方向调 / 每一步调多大</td></tr>
<tr><td>Epoch / Batch</td><td>完整过一遍数据 / 每次喂一小撮</td></tr>
<tr><td>正则化</td><td>惩罚太复杂的模型，防死记硬背</td></tr>
<tr><td>嵌入（Embedding）</td><td>把文字、图片等映射成稠密向量</td></tr>
</table>
<h2>容易混的概念对</h2>
<p><strong>过拟合 vs 欠拟合</strong>：一个是背题应考（训练集高分、新题就崩），一个是根本没学会。前者加数据 / 正则化，后者升级模型。</p>
<p><strong>精确率 vs 召回率</strong>：精确率管「挑出来的是否都对」，召回率管「该挑的是否都挑出来了」。癌症筛查重视召回，推荐系统重视精确。</p>
<h2>怎么读评估指标</h2>
<p>类别不平衡时准确率会骗人（全预测正常也有 99% 准确率）。先看混淆矩阵，再看精确率/召回率/F1；排序质量看 ROC-AUC。永远用没参与训练的数据评估。</p>`,
      res: {
        video: [{ t: 'StatQuest：Confusion Matrix 到 ROC-AUC 系列', u: 'https://www.youtube.com/@statquest', d: '每个指标一支短视频' }],
        read: [
          { t: 'sklearn 模型评估文档', u: 'https://scikit-learn.org/stable/user_guide.html', d: '指标的计算口径与代码实现' },
          { t: '南瓜书第 1/2 章', u: 'https://datawhalechina.github.io/pumpkin-book/', zh: 1 }
        ]
      }
    },
    {
      id: 'a7',
      title: '深度学习架构对比：CNN / RNN / Transformer',
      category: '深度学习',
      readTime: '7 分钟',
      tags: ['架构', '对比'],
      points: [
        'MLP 万能但无视数据结构',
        'CNN：局部感受野 + 权重共享，视觉之王',
        'RNN：按序处理、难并行、长程遗忘',
        'Transformer：自注意力 + 可并行，当代统一框架',
        '没有万能架构，只有取舍'
      ],
      content: `
<h2>一张表看懂</h2>
<table>
<tr><th>架构</th><th>核心思想</th><th>擅长</th><th>局限</th></tr>
<tr><td>MLP 全连接</td><td>逐层矩阵变换</td><td>表格数据、基线模型</td><td>无视结构、参数多</td></tr>
<tr><td>CNN 卷积</td><td>局部感受野 + 权重共享</td><td>图像、视频</td><td>长程全局关系弱</td></tr>
<tr><td>RNN/LSTM</td><td>按时间步循环 + 隐状态</td><td>短序列、时序信号</td><td>无法并行、长程衰减</td></tr>
<tr><td>Transformer</td><td>自注意力全连接任意位置</td><td>文本、多模态、大模型底座</td><td>长序列计算贵</td></tr>
</table>
<h2>为什么图像适合 CNN</h2>
<p>像素具有局部相关性（边缘、纹理）且位置平移不变（猫在左上和右下都是猫）。卷积核滑窗扫描 + 权重共享，用极少参数捕捉这些先验，远胜全连接。</p>
<h2>RNN 之痛与 Transformer 崛起</h2>
<p>RNN 必须一个词一个词按序处理，梯度沿时间传播时容易消失或爆炸；Transformer 用自注意力让任意两个位置一步直连，计算可完全并行，才有了「堆算力出智能」的大模型时代。</p>
<h2>怎么选</h2>
<ul>
<li>图像分类/检测 → CNN 或 ViT（把 Transformer 用于图像）</li>
<li>语言理解与生成 → Transformer 家族</li>
<li>工业时序预测 → 简单场景 LSTM / LightGBM 往往更香</li>
<li>拿不准 → 先跑规则和 sklearn 基线，再谈深度学习</li>
</ul>`,
      res: {
        video: [
          { t: 'CS231n（CNN 与视觉经典课）', u: 'https://www.youtube.com/playlist?list=PLoROMvodv4rOmsNzYBMe0gJY2XS8AQg16' },
          { t: 'Karpathy：从零手写 GPT', u: 'https://karpathy.ai/zero-to-hero.html' }
        ],
        read: [
          { t: 'D2L · 卷积神经网络', u: 'https://zh.d2l.ai/chapter_convolutional-neural-networks/index.html', zh: 1 },
          { t: 'D2L · 循环神经网络', u: 'https://zh.d2l.ai/chapter_recurrent-neural-networks/index.html', zh: 1 },
          { t: 'D2L · 注意力机制与 Transformer', u: 'https://zh.d2l.ai/chapter_attention-mechanisms/index.html', zh: 1 },
          { t: 'Attention Is All You Need', u: 'https://arxiv.org/abs/1706.03762' }
        ]
      }
    },
    {
      id: 'a8',
      title: 'LLM 应用四大范式：Prompt / RAG / 微调 / Agent',
      category: '大模型',
      readTime: '6 分钟',
      tags: ['应用', '选型'],
      points: [
        'Prompt 最便宜，永远先试',
        '缺知识上 RAG，缺能力做微调',
        'Agent 负责多步骤与工具编排',
        '四者是组合拳而非互斥',
        '没有评估集就没有迭代'
      ],
      content: `
<h2>决策树</h2>
<ul>
<li>模型能力已够，只是没说清楚？ → <strong>优化 Prompt</strong>（结构、示例、分步思考）</li>
<li>模型缺少你私有的知识（文档、数据、手册）？ → <strong>RAG 检索增强</strong></li>
<li>输出风格/格式/领域能力系统性不足？ → <strong>微调</strong>（LoRA 起步）</li>
<li>任务需要多步骤、查资料、调用系统？ → <strong>Agent 编排</strong>（ReAct + Function Calling）</li>
</ul>
<h2>组合示例：企业知识助手</h2>
<p>基座 API + Prompt 定角色 + RAG 接内部文档 + 微调固定话术 + Agent 挂工单系统。成本从低到高逐层叠加，能用低层解决就不用高层。</p>
<h2>工程提醒</h2>
<p>先建 50~200 条的黄金评估集，再接模型；每次改动跑一遍回归。线上日志回流成训练/评估数据，形成数据飞轮。多数项目失败不是模型问题，而是没有可靠评估。</p>`,
      res: {
        video: [{ t: '李宏毅生成式人工智能课程（全）', u: 'https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring.php', zh: 1 }],
        read: [
          { t: '提示工程指南 · RAG 章（中文）', u: 'https://www.promptingguide.ai/zh/techniques/rag', zh: 1 },
          { t: 'LangChain 文档', u: 'https://docs.langchain.com/' },
          { t: '开源大模型食用指南（部署实战）', u: 'https://github.com/datawhalechina/self-llm', zh: 1 },
          { t: '站内文章《大语言模型与 Transformer》', u: '#/knowledge/a4' }
        ]
      }
    },
    {
      id: 'a9',
      title: 'AI 幻觉、风险与负责任使用',
      category: 'AI 伦理',
      readTime: '6 分钟',
      tags: ['安全', '伦理'],
      points: [
        '幻觉的本质：模型优化像话，而不是真话',
        '缓解三板斧：给依据、允许拒答、交叉验证',
        '偏见来自数据与目标函数，需双管审计',
        '敏感数据不进公网模型',
        '高风险决策必须 human-in-the-loop'
      ],
      content: `
<h2>幻觉为什么存在</h2>
<p>LLM 学到的是语言的统计规律：它在预测「最可能的下一个词」，而不是查询事实数据库。所以当它没有把握时，也会生成流畅、自信但错误的内容——这就是幻觉。</p>
<h2>怎么缓解</h2>
<ul>
<li>提示词层面：要求引用来源，明确「不确定就说不知道」</li>
<li>系统层面：用 RAG 让回答锚定检索到的真实文档</li>
<li>流程层面：关键结论交叉验证、换模型互查、人工复核</li>
</ul>
<h2>偏见、隐私与合规</h2>
<p>模型会继承训练数据中的刻板印象，需要在数据与指标两端同时审计。隐私上遵循最小必要原则：不把敏感个人信息粘进公网模型；商用注意生成内容的版权与标识义务。</p>
<h2>使用安全检查表</h2>
<ul>
<li>医疗、法律、财务结论仅作参考，咨询专业人士</li>
<li>不把公司机密 / 个人身份信息输入外部 API</li>
<li>自动化决策保留人工审核环节</li>
<li>对模型输出做事实抽检，警惕「流畅但错误」</li>
<li>发布前做越狱与滥用测试（red-teaming）</li>
</ul>`,
      res: {
        video: [{ t: '李宏毅 · Pretrain 与 Alignment 讲座', u: 'https://youtu.be/Ozos6M1JtIE', zh: 1 }],
        read: [
          { t: 'LLM 幻觉研究综述', u: 'https://arxiv.org/abs/2311.05232' },
          { t: '提示工程指南 · 风险与误用（中文）', u: 'https://www.promptingguide.ai/zh/risks', zh: 1 },
          { t: 'OpenAI InstructGPT（对齐实践）', u: 'https://openai.com/research/instruction-following' }
        ]
      }
    },
    {
      id: 'a11',
      title: 'Python 数据处理速查',
      category: '代码实战',
      readTime: '6 分钟',
      tags: ['Python', 'NumPy', '代码'],
      points: [
        '列表推导 + zip + 解包覆盖 80% 日常语法',
        'NumPy 向量化替代 for 循环，快几十倍',
        'shape 广播规则：从右往左对齐，1 可扩张',
        'Pandas 三板斧：读 csv、布尔索引、groupby',
        '切片是左闭右开：x[1:3] 取 2 个元素'
      ],
      content: `
<h2>语法速查：十分钟够用版</h2>
<pre><code>nums = [1, 2, 3, 4]
squares = [n * n for n in nums]        # 列表推导：[1, 4, 9, 16]
evens = [n for n in nums if n % 2 == 0]  # 带条件

names = ["ai", "ml", "dl"]
scores = [90, 85, 88]
list(zip(names, scores))   # 配对：[("ai",90), ("ml",85), ("dl",88)]

a, b = 1, 2                # 解包交换
first, *rest = [1, 2, 3]   # first=1, rest=[2,3]</code></pre>
<h2>NumPy：告别 for 循环</h2>
<pre><code>import numpy as np

x = np.array([[1, 2, 3],
              [4, 5, 6]])    # shape (2, 3)

x * 2          # 整个数组乘 2，无循环
x.sum(axis=0)  # 按列求和：[5 7 9]
x.mean()       # 全局均值
x[x > 3]       # 布尔筛选：[4 5 6]</code></pre>
<p>广播口诀：<strong>形状从右往左逐维对齐，相等或其中一方为 1 才能算</strong>。(2,3) 与 (3,) 兼容；(2,3) 与 (2,) 不兼容——先 reshape 成 (2,1)。</p>
<h2>Pandas：表格数据三步曲</h2>
<pre><code>import pandas as pd

df = pd.read_csv("scores.csv")     # 1. 读入
top = df[df["score"] > 90]         # 2. 布尔筛选
avg = df.groupby("class")["score"].mean()  # 3. 分组聚合

df["pass"] = df["score"] >= 60     # 新增列
df.sort_values("score", ascending=False)</code></pre>
<h2>易错清单</h2>
<ul>
<li><strong>可变默认参数</strong>：def f(x=[]) 会共享同一个列表，用 None 占位</li>
<li><strong>浅拷贝陷阱</strong>：list.copy() 只拷一层，嵌套结构用 copy.deepcopy</li>
<li><strong>字符串拼接循环</strong>：大量拼接用 "".join(parts)，别用 s += x</li>
<li>比较浮点数用 abs(a-b) &lt; 1e-9，不用 a == b</li>
</ul>`,
      res: {
        video: [
          { t: 'CS231n Python/Numpy 官方前置教程', u: 'https://cs231n.github.io/python-numpy-tutorial/' }
        ],
        read: [
          { t: 'Python Data Science Handbook（免费全书）', u: 'https://jakevdp.github.io/PythonDataScienceHandbook/' },
          { t: 'NumPy 官方入门', u: 'https://numpy.org/doc/stable/user/absolute_beginners.html' },
          { t: '站内课程《Python 基础速成》', u: '#/courses', d: '含视频与文字教程资源' }
        ]
      }
    },
    {
      id: 'a12',
      title: 'PyTorch 最小训练循环',
      category: '代码实战',
      readTime: '6 分钟',
      tags: ['PyTorch', '训练', '代码'],
      points: [
        '训练五步：zero_grad → forward → loss → backward → step',
        'grad 会累积：不清零 = 拿旧梯度一起更新',
        '训练用 model.train()，推理用 model.eval()（BN/Dropout 行为不同）',
        '验证/推理包 with torch.no_grad()：省显存防误更新',
        'loss 必须是标量才能 backward()'
      ],
      content: `
<h2>一个能跑的最小模板</h2>
<pre><code>import torch
import torch.nn as nn

# 1. 数据
X = torch.randn(256, 20)           # 256 条样本，每条 20 维
y = torch.randint(0, 10, (256,))   # 0~9 的类别标签

# 2. 模型
model = nn.Sequential(
    nn.Linear(20, 64),
    nn.ReLU(),
    nn.Linear(64, 10),
)

# 3. 损失与优化器
loss_fn = nn.CrossEntropyLoss()    # 内含 log_softmax，直接吃 logits
opt = torch.optim.Adam(model.parameters(), lr=1e-3)

# 4. 训练循环（核心五步）
for epoch in range(100):
    opt.zero_grad()                # ① 清空上一轮梯度
    pred = model(X)                # ② 前向
    loss = loss_fn(pred, y)        # ③ 算损失
    loss.backward()                # ④ 反向求梯度
    opt.step()                     # ⑤ 更新参数
    if epoch % 20 == 0:
        print(epoch, loss.item())

# 5. 推理
model.eval()
with torch.no_grad():
    print(model(X[:5]).argmax(dim=1))</code></pre>
<h2>按批训练只改一行</h2>
<pre><code>for epoch in range(10):
    for i in range(0, len(X), 32):          # 每批 32 条
        xb, yb = X[i:i+32], y[i:i+32]
        opt.zero_grad()
        loss = loss_fn(model(xb), yb)
        loss.backward()
        opt.step()</code></pre>
<h2>排错三条经验</h2>
<ul>
<li><strong>loss 是 NaN</strong>：多半学习率太大，先降 10 倍；检查数据有无除零 / log(0)</li>
<li><strong>loss 不降</strong>：检查 lr 太小、标签与输入错位、忘了 zero_grad 导致梯度爆炸</li>
<li><strong>形状报错</strong>：在每一步 print(x.shape)，与 nn.Linear 的 in/out_features 对齐</li>
</ul>`,
      res: {
        video: [
          { t: 'Karpathy Zero to Hero（手写反向传播系列）', u: 'https://karpathy.ai/zero-to-hero.html' },
          { t: '李沐 D2L PyTorch 课程视频（中文）', u: 'https://space.bilibili.com/1567748478/channel/seriesdetail?sid=358497', zh: 1 }
        ],
        read: [
          { t: 'D2L 中文教材（每节可运行代码）', u: 'https://zh.d2l.ai/', zh: 1 },
          { t: '站内文章《神经网络与反向传播直觉》', u: '#/knowledge/a3' }
        ]
      }
    },
    {
      id: 'a13',
      title: '调用大模型 API：30 行写出对话小程序',
      category: '代码实战',
      readTime: '6 分钟',
      tags: ['LLM', 'API', '代码'],
      points: [
        'OpenAI 兼容格式已成事实标准，换平台基本只改 base_url',
        'messages 数组：system 定角色，user/assistant 交替轮转',
        '模型无状态：历史全靠你每次带上去（token 费随之增长）',
        'temperature 0~0.3 稳定、0.7~1 有创意；max_tokens 控制预算',
        '密钥放环境变量，永远不进前端与 Git'
      ],
      content: `
<h2>30 行命令行对话</h2>
<pre><code>import os, json, urllib.request

API_KEY = os.environ["OPENAI_API_KEY"]      # 密钥从环境变量读
BASE = "https://api.openai.com/v1"          # 换国内平台只改这里

def chat(history):
    req = urllib.request.Request(
        BASE + "/chat/completions",
        data=json.dumps({
            "model": "gpt-4o-mini",
            "messages": history,
            "temperature": 0.7,
        }).encode(),
        headers={"Content-Type": "application/json",
                 "Authorization": "Bearer " + API_KEY},
    )
    with urllib.request.urlopen(req) as r:
        data = json.load(r)
    return data["choices"][0]["message"]["content"]

history = [{"role": "system", "content": "你是一位耐心的 AI 学习导师"}]
while True:
    q = input("你: ")
    if q in ("exit", "quit"):
        break
    history.append({"role": "user", "content": q})
    reply = chat(history)
    history.append({"role": "assistant", "content": reply})
    print("AI:", reply)</code></pre>
<h2>成本与稳定性三件套</h2>
<ul>
<li><strong>历史压缩</strong>：对话变长后把早期轮次摘要成一条 system，控制 token</li>
<li><strong>重试</strong>：429/超时按 1s、2s、4s 指数退避重试 3 次</li>
<li><strong>JSON 输出</strong>：response_format=json_object + 解析兜底，比正则稳</li>
</ul>
<p>注意：本站 AI 助手（#/chat）预留的 <code>callRealAPI()</code> 就是同款结构，配好端点即可把模拟回复换成真实模型。</p>`,
      res: {
        read: [
          { t: 'OpenAI API 文档', u: 'https://platform.openai.com/docs/guides/text' },
          { t: 'llm-cookbook 中文课程（含 API 实战）', u: 'https://github.com/datawhalechina/llm-cookbook', zh: 1 },
          { t: '站内课程《提示词工程》', u: '#/courses', d: '弹窗内有配套资源清单' }
        ]
      }
    },
    {
      id: 'a14',
      title: '用 NumPy 手写迷你 RAG：检索是怎么跑的',
      category: '代码实战',
      readTime: '8 分钟',
      tags: ['RAG', 'Embedding', '代码'],
      points: [
        'RAG = 检索 + 生成：先找最相关的几段，再塞进 Prompt',
        '相似度计算：向量归一化后点积 = 余弦相似度',
        '嵌入把"语义相近"变成"方向相近"，本例用词频向量示意',
        '生产级升级：神经嵌入模型 + FAISS/HNSW 索引 + rerank',
        'chunk 切分要点：按语义段落，重叠 10~20% 防切断句子'
      ],
      content: `
<h2>可运行的教学版 RAG（约 30 行）</h2>
<pre><code>import numpy as np
from collections import Counter

# 1. "文档库"：真实场景是你自己的笔记/手册
docs = [
    "过拟合：模型在训练集好、测试集差，可用正则化缓解",
    "反向传播：用链式法则逐层计算损失对参数的梯度",
    "RAG：检索增强生成，先查资料再让模型据此回答",
    "学习率：梯度下降每步走的幅度，太大震荡太小龟速",
]

# 2. 简易向量：词频计数（生产请换嵌入模型）
def vectorize(texts):
    vocab = sorted({w for t in texts for w in t})
    mat = []
    for t in texts:
        c = Counter(t)
        mat.append([c.get(w, 0) for w in vocab])
    v = np.array(mat, dtype=float)
    return v / (np.linalg.norm(v, axis=1, keepdims=True) + 1e-9)  # 归一化

D = vectorize(docs)

# 3. 检索：查询向量与所有文档做点积（已归一化 = 余弦相似度）
def top_k(query, k=2):
    q = vectorize([query])[0]
    sims = D @ q
    idx = sims.argsort()[::-1][:k]
    return [docs[i] for i in idx]

# 4. 组装增强 Prompt
query = "模型训练集很好但测试很差怎么办"
context = "\n".join("- " + d for d in top_k(query))
prompt = "仅根据以下资料回答。资料:\n" + context + "\n问题: " + query
print(prompt)</code></pre>
<h2>把玩具换成生产件</h2>
<ul>
<li>词频向量 → 神经嵌入（如 bge-m3、text-embedding-3），语义才能"举一反三"</li>
<li>矩阵点积 → FAISS / HNSW 索引，百万文档也是毫秒级</li>
<li>top-2 → 检索后加 rerank 模型精排，再截断塞 Prompt</li>
<li>最后一步把 prompt 交给 a13 里的 chat() 函数，一个最小 RAG 闭环就通了</li>
</ul>`,
      res: {
        read: [
          { t: 'RAG 原始论文（Lewis et al. 2020）', u: 'https://arxiv.org/abs/2005.11401' },
          { t: 'LangChain RAG 教程', u: 'https://docs.langchain.com/' },
          { t: '站内文章《LLM 应用四大范式》', u: '#/knowledge/a8' }
        ]
      }
    },
    {
      id: 'a15',
      title: '读懂模型输出：logits、softmax 与采样',
      category: '代码实战',
      readTime: '6 分钟',
      tags: ['采样', 'temperature', '代码'],
      points: [
        'logits：模型最后一层的裸分数，可正可负不解释概率',
        'softmax 把 logits 变概率分布，温度 T 缩放 logit 改变平滑度',
        '贪心解码=每步取最大；采样=按概率抽签，才有多样性',
        'top-p 从最高概率累加到 p 截断，比 top-k 自适应更稳',
        '重复惩罚与 seed 影响复现性——API 调试常见开关'
      ],
      content: `
<h2>10 行看懂采样</h2>
<pre><code>import numpy as np

logits = np.array([2.0, 1.0, 0.1, -1.0])   # 候选词 A B C D 的裸分数

def softmax(z, temperature=1.0):
    z = z / temperature                     # T 大分布平，T 小分布尖
    e = np.exp(z - z.max())
    return e / e.sum()

for T in (0.5, 1.0, 2.0):
    print(T, np.round(softmax(logits, T), 3))
# T=0.5: [0.81  0.138 0.045 0.007]  几乎总选 A → 稳定但呆
# T=1.0: [0.608 0.223 0.111 0.058]  常选 A 偶尔 B
# T=2.0: [0.416 0.273 0.199 0.113]  百花齐放，也更容易胡说</code></pre>
<h2>top-p（nucleus）筛选</h2>
<pre><code>def top_p_sample(probs, p=0.9):
    order = probs.argsort()[::-1]
    keep, cum = [], 0.0
    for i in order:
        keep.append(i)
        cum += probs[i]
        if cum >= p:          # 概率攒够 p 就停
            break
    sel = probs[keep]
    return np.random.choice(keep, p=sel / sel.sum())</code></pre>
<h2>实用调参直觉</h2>
<ul>
<li>抽取/分类/代码 → T 0~0.2 + top_p 0.9，要稳定</li>
<li>头脑风暴/文案 → T 0.7~1.0，要多样</li>
<li>长文忽好忽坏 → 先查是不是 T 太高，再看是否缺上下文</li>
</ul>`,
      res: {
        read: [
          { t: 'OpenAI API 参数文档', u: 'https://platform.openai.com/docs/api-reference' },
          { t: 'GPT-3 论文（Few-shot 的开山之作）', u: 'https://arxiv.org/abs/2005.14165' },
          { t: '站内文章《大语言模型与 Transformer》', u: '#/knowledge/a4' }
        ]
      }
    },
    {
      id: 'a10',
      title: '精选 AI 学习资源导航',
      category: '资源导航',
      readTime: '10 分钟',
      tags: ['视频', '教材', '合集'],
      points: [
        '中文入门首选：李宏毅（兴趣与前沿）+ 李沐（系统与动手）',
        '英文深挖首选：Karpathy + CS231n / CS224n',
        '应用开发首选：提示工程指南 + HF 课程 + LangChain',
        '每个方向只选一个主资源，别囤课'
      ],
      content: `
<h2>系统视频课（中文）</h2>
<ul>
<li><a href="https://speech.ee.ntu.edu.tw/~hylee/ml/2026-spring.php">李宏毅 · 机器学习课程官网</a>：台大 2026 春最新课，讲义作业全公开；配套 B 站合集见 <a href="https://www.bilibili.com/video/BV1TAtwzTE1S/">2025 版全集</a>，生成式 AI 专题看 <a href="https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring.php">GenAI 课</a></li>
<li><a href="https://zh.d2l.ai/">李沐《动手学深度学习》D2L 中文站</a>：教材 + 代码 + <a href="https://space.bilibili.com/1567748478/channel/seriesdetail?sid=358497">配套课程视频</a>（D2L 官网链接），另有 <a href="https://courses.d2l.ai/zh-v2/">课程页</a></li>
<li><a href="https://space.bilibili.com/88461692">3Blue1Brown 官方 B 站空间</a>：神经网络 / 线代 / 微积分可视化系列</li>
</ul>
<h2>系统视频课（英文）</h2>
<ul>
<li><a href="https://www.deeplearning.ai/courses/ai-for-everyone/">吴恩达 AI for Everyone</a>：非技术向 AI 通识</li>
<li><a href="https://karpathy.ai/zero-to-hero.html">Karpathy Zero to Hero</a>：从零手写反向传播到 GPT</li>
<li><a href="https://www.youtube.com/playlist?list=PLoROMvodv4rOmsNzYBMe0gJY2XS8AQg16">CS231n</a> / <a href="https://www.youtube.com/playlist?list=PLoROMvodv4rOaMFbaqxPDoLWjDaRAdP9D">CS224n</a>：斯坦福 CV / NLP 公开课</li>
<li><a href="https://course.fast.ai/">fast.ai</a>：程序员实战向，先跑起来再讲原理</li>
<li><a href="https://www.youtube.com/@statquest">StatQuest</a>：每个算法一支直观动画</li>
</ul>
<h2>免费教材与文档</h2>
<ul>
<li><a href="https://datawhalechina.github.io/pumpkin-book/">南瓜书</a>：西瓜书公式逐条推导（中文）</li>
<li><a href="https://www.deeplearningbook.org/">Deep Learning 花书</a> / <a href="https://web.stanford.edu/~jurafsky/slp3/">SLP3</a>：理论与 NLP 两大圣经</li>
<li><a href="https://www.promptingguide.ai/zh">提示工程指南</a>（中文）/ <a href="https://huggingface.co/learn/llm-course/chapter1/1">HF LLM Course</a></li>
<li><a href="https://scikit-learn.org/stable/user_guide.html">sklearn</a> / <a href="https://numpy.org/doc/stable/user/absolute_beginners.html">NumPy</a> / <a href="https://pandas.pydata.org/docs/getting_started/index.html">Pandas</a> 官方入门文档</li>
</ul>
<h2>实践与工程</h2>
<ul>
<li><a href="https://www.kaggle.com/learn">Kaggle Learn</a>：边学边跑的微课程 + 真实比赛数据集</li>
<li><a href="https://github.com/datawhalechina/self-llm">开源大模型食用指南</a>：中文部署 + 微调全流程</li>
<li><a href="https://github.com/hiyouga/LLaMA-Factory">LLaMA-Factory</a>（WebUI 微调）/ <a href="https://docs.vllm.ai/en/latest/">vLLM</a>（生产推理）/ <a href="https://ollama.com/">Ollama</a>（本地跑模型）</li>
<li><a href="https://docs.langchain.com/">LangChain 文档</a>：LLM 应用开发框架</li>
</ul>
<h2>怎么选：三条推荐主线</h2>
<ul>
<li><strong>零基础建立框架</strong>：AI for Everyone（看）→ 李宏毅（学）→ 本站测验（测）</li>
<li><strong>动手做应用</strong>：提示工程指南 → HF LLM Course → LangChain + self-llm 实战</li>
<li><strong>深入原理</strong>：3B1B 动画 → Karpathy 手写系列 → D2L / 花书 + 论文</li>
</ul>`
      // 本篇正文内嵌全部链接，res 字段略
    }
];

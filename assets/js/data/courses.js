// 数据层 · 学习路径与课程目录（来自原 index.html APP_DATA.stages，内容语义未改动）
window.APP_DATA = window.APP_DATA || {};

window.APP_DATA.stages = [
    {
      id: 's1',
      title: '第一阶段 · AI 入门',
      sub: '建立基本概念，打好数学与编程基础',
      courses: [
        {
          id: 'c101', title: '什么是人工智能', desc: '了解 AI 的定义、发展历史与主要分支（机器学习、深度学习等）。',
          level: '入门', duration: '2 小时',
          lessons: ['AI 的定义与分类', 'AI 发展简史', 'AI 能做什么、不能做什么'],
          points: [
            'AI 的三种定义：像人一样思考 / 像人一样行动 / 理性智能体',
            '三大流派：符号主义、连接主义、行为主义',
            '机器学习、深度学习、大模型的概念边界与关系',
            '现代 AI 的范式转变：人写规则 → 机器从数据学规则'
          ],
          resources: {
            video: [
              { t: '吴恩达 AI for Everyone（DeepLearning.AI）', u: 'https://www.deeplearning.ai/courses/ai-for-everyone/', d: '写给非技术背景的经典 AI 通识课，无数学要求' },
              { t: '李宏毅 · 机器学习课程（台大官网，含 2026 春）', u: 'https://speech.ee.ntu.edu.tw/~hylee/ml/2026-spring.php', zh: 1, d: '中文圈口碑最好的系统课，讲义/作业/投影片全部公开' },
              { t: '李宏毅 2025 版课程合集（B 站）', u: 'https://www.bilibili.com/video/BV1TAtwzTE1S/', zh: 1, d: 'B 站观看更方便的系列合集' }
            ],
            read: [
              { t: 'Google ML Crash Course', u: 'https://developers.google.com/machine-learning/crash-course', d: '免费的机器学习速成课：短视频 + 文字 + 练习' },
              { t: '站内文章《什么是人工智能》', u: '#/knowledge/a1', d: '5 分钟建立概念框架' }
            ]
          }
        },
        {
          id: 'c102', title: 'Python 基础速成', desc: '为后续实践准备最小够用的 Python 语法与常用库。',
          level: '入门', duration: '6 小时',
          lessons: ['变量与数据类型', '控制流与函数', 'NumPy / Pandas 入门'],
          points: [
            '变量、数据类型与容器（list / dict / set）',
            '函数、模块与异常处理',
            'NumPy 数组与广播机制',
            'Pandas DataFrame 与数据清洗',
            'Jupyter / Colab 交互式工作流'
          ],
          resources: {
            video: [
              { t: '李宏毅课程 · Colab 与 Kaggle 上手教程', u: 'https://www.youtube.com/watch?v=kibL4oJbzy4', d: '10 分钟跑通第一个云端 Notebook' },
              { t: '李宏毅课程 · PyTorch 入门教程', u: 'https://youtu.be/6dEp6oRN2NE', zh: 1, d: '官方助教课，为后续深度学习做准备' }
            ],
            read: [
              { t: 'Python 官方中文教程', u: 'https://docs.python.org/zh-cn/3/tutorial/', zh: 1, d: '最权威的语言入门材料' },
              { t: 'Python Data Science Handbook（免费在线）', u: 'https://jakevdp.github.io/PythonDataScienceHandbook/', d: 'NumPy / Pandas / Matplotlib 一册打通' },
              { t: 'CS231n Python/Numpy Tutorial', u: 'https://cs231n.github.io/python-numpy-tutorial/', d: '斯坦福作业前置教程，直击 AI 常用子集' },
              { t: 'Kaggle Learn 微课程', u: 'https://www.kaggle.com/learn', d: 'Python / Pandas / 机器学习系列短课，边学边跑' },
              { t: '站内代码笔记《Python 数据处理速查》', u: '#/knowledge/a11', d: '可复制的速查代码与易错清单' }
            ]
          }
        },
        {
          id: 'c103', title: '必要的数学直觉', desc: '不堆公式，用直觉理解线性代数、概率与微积分在 AI 中的作用。',
          level: '入门', duration: '4 小时',
          lessons: ['向量与矩阵直觉', '概率与分布', '梯度是什么'],
          points: [
            '向量 / 矩阵与线性变换；点积与余弦相似度',
            '导数、偏导与梯度的几何意义',
            '链式法则——反向传播的数学地基',
            '概率分布、期望与方差',
            '极大似然与交叉熵损失的关系'
          ],
          resources: {
            video: [
              { t: '3Blue1Brown · 线性代数的本质', u: 'https://www.3blue1brown.com/topics/linear-algebra', d: '公认最好的可视化数学系列' },
              { t: '3Blue1Brown · 微积分的本质', u: 'https://www.3blue1brown.com/topics/calculus', d: '第 3 章专讲梯度' },
              { t: '3Blue1Brown 官方 B 站空间（中文搬运）', u: 'https://space.bilibili.com/88461692', zh: 1, d: '官方授权中文字幕版' },
              { t: 'MIT 18.06 线性代数（Gilbert Strang）', u: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', d: '想系统补线代的完整课程' }
            ],
            read: [
              { t: 'D2L · 线性代数预备知识', u: 'https://zh.d2l.ai/chapter_preliminaries/linear-algebra.html', zh: 1 },
              { t: 'D2L · 微积分预备知识', u: 'https://zh.d2l.ai/chapter_preliminaries/calculus.html', zh: 1, d: '深度学习视角的数学速查' }
            ]
          }
        }
      ]
    },
    {
      id: 's2',
      title: '第二阶段 · 核心技术',
      sub: '掌握机器学习与深度学习的原理和方法',
      courses: [
        {
          id: 'c201', title: '机器学习基础', desc: '监督学习、无监督学习、特征工程与模型评估的完整脉络。',
          level: '进阶', duration: '10 小时',
          lessons: ['线性回归与逻辑回归', '决策树与随机森林', '过拟合与正则化', '交叉验证与评估指标'],
          points: [
            '监督学习完整建模流程：数据 → 特征 → 模型 → 评估',
            '线性 / 逻辑回归与决策树三大经典模型',
            '集成方法：随机森林与 GBDT',
            '过拟合 / 欠拟合与正则化、交叉验证',
            '评估指标：准确率、精确率、召回率、F1、ROC-AUC'
          ],
          resources: {
            video: [
              { t: 'StatQuest（Josh Starmer）', u: 'https://www.youtube.com/@statquest', d: '每个 ML 算法一支 10 分钟动画，直观到哭' },
              { t: 'StatQuest 官方视频索引站', u: 'https://statquest.org/', d: '按主题检索全部视频' }
            ],
            read: [
              { t: '南瓜书（西瓜书公式推导详解）', u: 'https://datawhalechina.github.io/pumpkin-book/', zh: 1, d: 'Datawhale 社区逐公式讲解周志华《机器学习》' },
              { t: 'scikit-learn 用户指南', u: 'https://scikit-learn.org/stable/user_guide.html', d: '边学概念边上手最经典的 ML 库' },
              { t: 'D2L · 线性神经网络', u: 'https://zh.d2l.ai/chapter_linear-networks/index.html', zh: 1, d: '用代码从零实现回归与 softmax' }
            ]
          }
        },
        {
          id: 'c202', title: '神经网络与深度学习', desc: '从感知机到多层网络，理解反向传播与常见架构。',
          level: '进阶', duration: '12 小时',
          lessons: ['感知机与激活函数', '反向传播', 'CNN / RNN 概览', '训练技巧与调参'],
          points: [
            '前向传播 / 反向传播与计算图',
            '激活函数、损失函数与优化器（SGD / Adam）',
            'BatchNorm、Dropout、残差连接三大训练利器',
            'CNN 与 RNN 的定位及适用场景',
            '学习率、批大小等超参数调试方法论'
          ],
          resources: {
            video: [
              { t: 'Karpathy · Neural Networks: Zero to Hero', u: 'https://karpathy.ai/zero-to-hero.html', d: '从零手写反向传播直到 GPT，公认最佳实践课' },
              { t: '李沐 · 动手学深度学习课程视频（B 站，D2L 官网链接）', u: 'https://space.bilibili.com/1567748478/channel/seriesdetail?sid=358497', zh: 1, d: '中文逐节讲解 + 代码实战' },
              { t: '3Blue1Brown · 神经网络可视化', u: 'https://www.3blue1brown.com/topics/neural-networks', d: '梯度下降与反向传播的动画直觉' }
            ],
            read: [
              { t: '《动手学深度学习》D2L 中文站', u: 'https://zh.d2l.ai/', zh: 1, d: '公式 + 图示 + 可运行代码三合一教材' },
              { t: 'Deep Learning 花书（Goodfellow 免费在线版）', u: 'https://www.deeplearningbook.org/', d: '理论纵深参考，按需查阅' },
              { t: 'D2L · 优化算法章节', u: 'https://zh.d2l.ai/chapter_optimization/index.html', zh: 1, d: 'SGD / 动量 / Adam 系统梳理' },
              { t: '站内代码笔记《PyTorch 最小训练循环》', u: '#/knowledge/a12', d: '训练五步模板 + 排错经验' }
            ]
          }
        },
        {
          id: 'c203', title: '自然语言处理入门', desc: '分词、词向量、语言模型到 Transformer 架构的演进。',
          level: '进阶', duration: '8 小时',
          lessons: ['文本表示与词向量', '语言模型', 'Transformer 与注意力机制'],
          points: [
            '分词与 BPE 子词切分',
            '词向量：从 word2vec 到上下文表示',
            '序列建模：RNN → Seq2Seq → 注意力',
            'Transformer：自注意力 + 位置编码 + 并行化',
            '预训练范式：BERT（双向编码）vs GPT（自回归解码）'
          ],
          resources: {
            video: [
              { t: '斯坦福 CS224n · NLP with Deep Learning（2024 完整公开）', u: 'https://www.youtube.com/playlist?list=PLoROMvodv4rOaMFbaqxPDoLWjDaRAdP9D', d: 'NLP 研究生级课程，含 LLM 前沿' },
              { t: '李宏毅 · 生成式人工智能课程（2024 官网）', u: 'https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring.php', zh: 1, d: '系统覆盖 GPT / LLM 原理与应用' }
            ],
            read: [
              { t: 'Speech and Language Processing（Jurafsky & Martin 免费预览版）', u: 'https://web.stanford.edu/~jurafsky/slp3/', d: 'NLP 圣经教材，第 9/10 章讲 Transformer 与预训练' },
              { t: 'D2L · 注意力机制章节', u: 'https://zh.d2l.ai/chapter_attention-mechanisms/index.html', zh: 1, d: '含 Transformer 从零实现' },
              { t: 'Word2Vec 原始论文', u: 'https://arxiv.org/abs/1301.3781', d: '词向量思想的起点，读摘要即可' }
            ]
          }
        },
        {
          id: 'c204', title: '卷积神经网络与计算机视觉', desc: '从 LeNet 到 ResNet 理解 CNN 的设计哲学，完成图像分类实战。',
          level: '进阶', duration: '8 小时',
          lessons: ['从全连接层到卷积', '填充、步幅与汇聚', '经典架构：AlexNet / VGG / ResNet', '图像分类实战（CIFAR-10）'],
          points: [
            '图像为什么需要卷积：局部相关 + 权重共享',
            '填充、步幅与池化层的作用',
            '经典演进主线：LeNet → AlexNet → VGG → ResNet',
            '残差连接如何解决深层网络退化',
            '目标检测与语义分割任务概览'
          ],
          resources: {
            video: [
              { t: '斯坦福 CS231n · 深度学习与计算机视觉', u: 'https://www.youtube.com/playlist?list=PLoROMvodv4rOmsNzYBMe0gJY2XS8AQg16', d: 'CV 领域最著名的公开课' }
            ],
            read: [
              { t: 'CS231n 课程笔记', u: 'https://cs231n.github.io/', d: '比视频更省时间的文字版精华' },
              { t: 'D2L · 卷积神经网络', u: 'https://zh.d2l.ai/chapter_convolutional-neural-networks/index.html', zh: 1 },
              { t: 'D2L · 现代卷积神经网络', u: 'https://zh.d2l.ai/chapter_convolutional-modern/index.html', zh: 1, d: 'AlexNet 到 ResNet 逐个拆解' }
            ]
          }
        }
      ]
    },
    {
      id: 's3',
      title: '第三阶段 · 大模型应用',
      sub: '学会使用与调教大语言模型，做出真实产品',
      courses: [
        {
          id: 'c301', title: '提示词工程', desc: '系统学习 Prompt 设计方法，让大模型稳定输出高质量结果。',
          level: '应用', duration: '5 小时',
          lessons: ['Prompt 基本结构', '角色 / 示例 / 思维链', '常见失败模式与修复'],
          points: [
            'Prompt 五要素：角色 / 任务 / 上下文 / 格式 / 示例',
            'Few-shot、思维链（CoT）、自我一致性等技术',
            'temperature 与 top-p 对输出的影响',
            '结构化输出（JSON）与函数调用基础',
            '像单元测试一样迭代 Prompt'
          ],
          resources: {
            video: [
              { t: '吴恩达 × OpenAI · ChatGPT Prompt Engineering for Developers', u: 'https://www.deeplearning.ai/courses/chatgpt-prompt-eng/', d: '1 小时 40 分免费短课，开发者向最佳入门' }
            ],
            read: [
              { t: '提示工程指南（官方中文版）', u: 'https://www.promptingguide.ai/zh', zh: 1, d: '全部技术都有中文讲解与示例' },
              { t: 'OpenAI 官方 Prompt Engineering 指南', u: 'https://platform.openai.com/docs/guides/prompt-engineering', d: 'GPT 系列模型的官方最佳实践' },
              { t: 'llm-cookbook（吴恩达课程中文笔记）', u: 'https://github.com/datawhalechina/llm-cookbook', zh: 1, d: '中文化 + 可运行代码' }
            ]
          }
        },
        {
          id: 'c302', title: 'RAG 与智能体', desc: '检索增强生成与 Agent 工作流：让模型接入你的知识和工具。',
          level: '应用', duration: '9 小时',
          lessons: ['向量检索原理', '搭建 RAG 流程', '工具调用与 Agent'],
          points: [
            '文本嵌入与向量检索：余弦相似度、HNSW',
            'RAG 五步：切块 → 嵌入 → 检索 → 增强 → 生成',
            '查询改写与重排序对检索质量的提升',
            'ReAct：推理与行动交替的 Agent 范式',
            'Function Calling、记忆与规划组件'
          ],
          resources: {
            video: [
              { t: '李宏毅 · AI Agent 讲座（2025）', u: 'https://youtu.be/M2Yg1kwPpts', zh: 1, d: '官方课程讲次，讲透 Agent 框架' }
            ],
            read: [
              { t: '提示工程指南 · RAG 技术章（中文）', u: 'https://www.promptingguide.ai/zh/techniques/rag', zh: 1 },
              { t: 'RAG 原始论文（Lewis et al. 2020）', u: 'https://arxiv.org/abs/2005.11401' },
              { t: 'ReAct 论文', u: 'https://arxiv.org/abs/2210.03629' },
              { t: 'LangChain 官方文档', u: 'https://docs.langchain.com/', d: '主流 LLM 应用开发框架' },
              { t: 'Hugging Face LLM Course', u: 'https://huggingface.co/learn/llm-course/chapter1/1', d: '大模型免费系统课，含 RAG/微调/Agent 章节' },
              { t: '站内代码笔记《手写迷你 RAG》', u: '#/knowledge/a14', d: '30 行 NumPy 跑通检索增强' }
            ]
          }
        },
        {
          id: 'c303', title: '模型微调实战', desc: '了解 LoRA 等主流微调方式，用自有数据定制模型。',
          level: '应用', duration: '7 小时',
          lessons: ['什么时候需要微调', 'LoRA / QLoRA 原理', '数据集准备与训练'],
          points: [
            'Prompt / RAG / 微调的选型判断',
            'LoRA / QLoRA：低秩适配的原理与参数',
            '指令数据集的构建与清洗',
            '灾难性遗忘风险与数据配比',
            '混合精度、梯度累计等训练基础设施'
          ],
          resources: {
            video: [
              { t: '李宏毅 · Post-training 与灾难性遗忘讲座（2025）', u: 'https://youtu.be/Z6b5-77EfGk', zh: 1 }
            ],
            read: [
              { t: 'LoRA 原始论文', u: 'https://arxiv.org/abs/2106.09685' },
              { t: '开源大模型食用指南（self-llm）', u: 'https://github.com/datawhalechina/self-llm', zh: 1, d: '开源 LLM 部署 + 微调全程中文教程' },
              { t: 'LLaMA-Factory', u: 'https://github.com/hiyouga/LLaMA-Factory', zh: 1, d: '零代码微调框架，有 WebUI' },
              { t: 'Hugging Face PEFT 文档', u: 'https://huggingface.co/docs/peft/index', d: 'LoRA 等参数高效微调的官方实现' }
            ]
          }
        }
      ]
    },
    {
      id: 's4',
      title: '第四阶段 · 视野与责任',
      sub: '理解 AI 工程化落地与社会影响',
      courses: [
        {
          id: 'c401', title: 'AI 伦理与安全', desc: '偏见、幻觉、隐私与对齐：负责任的 AI 使用与开发。',
          level: '通识', duration: '3 小时',
          lessons: ['数据偏见与公平性', '模型幻觉与可靠性', '隐私与合规'],
          points: [
            '数据偏见的来源与公平性度量',
            '幻觉的成因、评测与缓解',
            '隐私保护：数据脱敏与合规红线',
            '对齐技术概览：RLHF / DPO',
            '高风险场景保持 human-in-the-loop'
          ],
          resources: {
            video: [
              { t: '李宏毅 · Pretrain 与 Alignment 讲座（2025）', u: 'https://youtu.be/Ozos6M1JtIE', zh: 1, d: '讲清大模型如何被对齐' }
            ],
            read: [
              { t: 'LLM 幻觉综述（Huang et al. 2023）', u: 'https://arxiv.org/abs/2311.05232', d: '幻觉研究最全综述' },
              { t: '提示工程指南 · 风险与误用（中文）', u: 'https://www.promptingguide.ai/zh/risks', zh: 1 },
              { t: 'OpenAI InstructGPT：对齐训练实录', u: 'https://openai.com/research/instruction-following', d: 'RLHF 首次大规模落地的博客' }
            ]
          }
        },
        {
          id: 'c402', title: 'AI 项目落地指南', desc: '从需求到部署：AI 项目的评估、成本与运维要点。',
          level: '通识', duration: '4 小时',
          lessons: ['需求与可行性评估', '评估集与错误分析', '部署与推理成本', '监控与迭代'],
          points: [
            '任务定义：什么问题适合 / 不适合用 AI',
            '评估集构建与错误分析方法论',
            'API 调用 vs 自托管的成本模型',
            '推理优化：量化、批处理、KV Cache',
            '上线监控与数据飞轮'
          ],
          resources: {
            video: [
              { t: 'fast.ai · Lesson 2: Deployment', u: 'https://course.fast.ai/Lessons/lesson2.html', d: '从训练到部署的完整一课' }
            ],
            read: [
              { t: 'vLLM 文档', u: 'https://docs.vllm.ai/en/latest/', d: '高吞吐 LLM 推理引擎事实标准' },
              { t: 'Ollama', u: 'https://ollama.com/', d: '本地一键跑开源模型' },
              { t: 'fast.ai 实战深度学习', u: 'https://course.fast.ai/', d: '免 GPU 也能跑完的完整实战课' },
              { t: '站内代码笔记《调用大模型 API》', u: '#/knowledge/a13', d: '30 行对话小程序 + 成本三件套' }
            ]
          }
        }
      ]
    }
];

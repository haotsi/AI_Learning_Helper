// 数据层 · 数理逻辑分章教程（APP_DATA.logic，与 ds / prob 同一套章节结构）
// 章节按「阶段一 ~ 阶段五」五个 cat 分组，顺序即学习路径；id 统一用 l + 两位序号。
// 正文公式统一 KaTeX：行内 \\( \\)、独立 \\[ \\]（JS 字符串中反斜杠双写）；代码块内 < 必须写 &lt;。
window.APP_DATA = window.APP_DATA || {};

/* ---------------- 分章教程 ---------------- */
window.APP_DATA.logic = [
  {
    id: 'l01', cat: '逻辑基础', title: '数理逻辑是什么', readTime: '6 分钟',
    points: [
      '逻辑研究的是「推理的有效性」：前提真时结论是否必然真',
      '数理逻辑 = 用人工符号语言 + 精确规则来研究推理的数学分支',
      '三个核心对象：命题（说得出真假的话）、推理（从前提到结论）、证明（可检查的推理链条）',
      '形式化的价值：把「讲道理」变成可以机械检验、也可以交给机器执行的事',
      '计算机科学处处是逻辑：条件语句、电路、数据库查询、程序验证、AI 推理'
    ],
    content: `
<h2>概念</h2>
<p><strong>逻辑（Logic）</strong>研究的是<strong>推理的有效性</strong>：给定一些前提，结论是否<strong>必然</strong>跟着成立。它不关心每句话在现实中到底对不对，而关心「从这些前提出发，这样推下去靠不靠谱」。</p>
<p><strong>数理逻辑（Mathematical Logic）</strong>则是把逻辑变成一门数学：用一套<strong>人工符号语言</strong>精确表达命题，用一组<strong>明确规定的规则</strong>进行推演，使得「这个推理对不对」可以像解方程一样被逐步检验。</p>
<table>
<tr><th></th><th>日常的自然语言</th><th>数理逻辑的形式语言</th></tr>
<tr><td>表达</td><td>「如果明天下雨，我就带伞，除非公司加班。」</td><td>\\(R \\to (\\neg W \\to U)\\)</td></tr>
<tr><td>真假</td><td>要看语境、要看「除非」到底算不算转折</td><td>由真值表唯一决定，没有歧义</td></tr>
<tr><td>推理</td><td>凭语感，容易吵起来</td><td>按规则一步步走，可以第三方检查</td></tr>
</table>
<h2>直觉解释</h2>
<p>自然语言<em>好用但含糊</em>。看这句经典歧义句：</p>
<blockquote>「我看见那个人拿着望远镜。」——是我拿着望远镜看见他，还是他拿着望远镜？</blockquote>
<p>语法结构不清，意思就有两种。而逻辑符号里，联结词的优先级和括号把结构写得<strong>明明白白</strong>，就像程序代码里的括号一样，绝不留给读者猜。</p>
<p>再看一个推理：</p>
<ul>
<li>前提 1：所有会飞的动物都有翅膀。</li>
<li>前提 2：企鹅没有翅膀。</li>
<li>结论：企鹅不会飞。</li>
</ul>
<p>这个推理之所以「一定对」，跟企鹅、翅膀的具体知识无关，只跟它的<strong>形式</strong>有关：\\(\\forall x(A(x) \\to B(x))\\)、\\(\\neg B(c)\\) 就能推出 \\(\\neg A(c)\\)。数理逻辑研究的正是这种「形式层面必然成立」的东西。</p>
<h2>三个核心概念</h2>
<table>
<tr><th>概念</th><th>一句话</th><th>好比</th></tr>
<tr><td><strong>命题</strong></td><td>一个可以说真或假的陈述</td><td>程序里的 <code>bool</code> 表达式</td></tr>
<tr><td><strong>推理</strong></td><td>从若干前提得出一个结论的过程</td><td>函数的调用链：输入 → 输出</td></tr>
<tr><td><strong>证明</strong></td><td>用允许的规则把推理过程完整写出来</td><td>可以被编译器逐行检查的代码</td></tr>
</table>
<h2>为什么计算机科学与逻辑有关</h2>
<ul>
<li><strong>条件判断</strong>：\\(\\texttt{if}\\) 里的表达式就是命题；<code>&amp;&amp;</code>、<code>||</code>、<code>!</code> 就是 \\(\\land,\\lor,\\neg\\)。</li>
<li><strong>硬件电路</strong>：与门、或门、非门是逻辑联结词的物理实现，CPU 是一台大型真值表机器。</li>
<li><strong>数据库与搜索</strong>：<code>WHERE age &gt; 18 AND (city = 'NJ' OR city = 'SZ')</code> 是一个复合命题。</li>
<li><strong>程序正确性</strong>：证明「程序对所有输入都满足规格」，用的正是推理与归纳。</li>
<li><strong>AI</strong>：知识表示、逻辑推理、自动规划、乃至大模型工具调用的约束满足，底层都是逻辑。</li>
</ul>
<h2>示例</h2>
<p>把一句话翻译为符号（设 \\(P\\)：今天下雨，\\(Q\\)：我带伞）：</p>
<table>
<tr><th>自然语言</th><th>符号</th></tr>
<tr><td>今天下雨并且我带伞</td><td>\\(P \\land Q\\)</td></tr>
<tr><td>如果今天下雨，那么我带伞</td><td>\\(P \\to Q\\)</td></tr>
<tr><td>只有今天下雨，我才带伞</td><td>\\(Q \\to P\\)</td></tr>
<tr><td>今天没下雨，或者我带伞</td><td>\\(\\neg P \\lor Q\\)</td></tr>
</table>
<p>第三行值得注意：「只有 A 才 B」写成 \\(B \\to A\\)，方向与直觉相反——这类翻译错误是本课程后面反复纠正的重点。</p>
<h2>常见错误</h2>
<ul>
<li><strong>把逻辑当「口才」</strong>：逻辑保证的是推理形式有效，不是「说得赢」。前提本身真假要另外负责。</li>
<li><strong>以为符号越多越高级</strong>：符号的唯一目的是消除歧义；能写清楚的符号才是好符号。</li>
<li><strong>把「有效」与「正确」混为一谈</strong>：「所有猫都怕水；老虎怕水；所以老虎是猫」——结论假，而且推理形式也无效；但「所有猫都怕水；小美是猫；所以小美怕水」形式有效（结论是否为真取决于前提）。</li>
</ul>
<h2>本章小结</h2>
<ul>
<li>逻辑管「推理有效性」，数理逻辑用符号与规则把它变成可检验的数学。</li>
<li>记住三件套：<strong>命题 → 推理 → 证明</strong>，本课程的五条阶段线就是沿着这三层展开的。</li>
<li>学习路线：<strong>阶段一 逻辑基础</strong>（命题、真值、联结词、真值表）→ <strong>阶段二 命题逻辑</strong>（等价、蕴含、范式、推理规则）→ <strong>阶段三 谓词逻辑</strong>（谓词、量词、量词否定、多重量词）→ <strong>阶段四 证明方法</strong> → <strong>阶段五 计算机逻辑</strong>。</li>
</ul>`
  },

  {
    id: 'l02', cat: '逻辑基础', title: '命题与真值', readTime: '7 分钟',
    points: [
      '命题 = 可以判断真假的陈述句，二者缺一不可',
      '每个命题恰取一个真值：真（T）或假（F）',
      '疑问句、祈使句、感叹句、真假未定的开语句都不是命题',
      '原子命题不可再分，用 P、Q、R 等命题变量表示；复合命题由联结词组装',
      '「现在不知道真假」不等于「不是命题」'
    ],
    content: `
<h2>概念</h2>
<p><strong>命题（proposition）</strong>是一个<strong>能够判断真假</strong>的<strong>陈述句</strong>。判断出来的结果叫<strong>真值（truth value）</strong>，只有两个取值：真（\\(T\\)，也可记 1）与假（\\(F\\)，记 0）。数理逻辑是「二值逻辑」——不接受「半真半假」「可能真」。</p>
<h2>直觉解释</h2>
<p>判断一句话是不是命题，有个非常好用的检验法：</p>
<blockquote>找一个人来问：「这句话对还是不对？」如果答案必须是「对」或「不对」中的一个，那它就是命题。</blockquote>
<p>「请把窗户关上。」——没法回答对错，只能照办或拒绝，所以不是命题。<br>
「x 比 5 大。」——先别急着说不是命题：它的问题在于 <em>x 还没定</em>，等 \\(x=7\\) 就有答案了。这种「等代入才有真假」的句子叫<strong>开语句</strong>，下一章会变成<strong>谓词</strong>。<br>
「这句话说的是假的。」——说真推出假、说假推出真，这是<strong>说谎者悖论</strong>，不属于我们讨论的命题范围。</p>
<h2>数学定义</h2>
<table>
<tr><th>句子</th><th>是否命题</th><th>原因</th></tr>
<tr><td>\\(2 + 3 = 5\\)</td><td>是（真）</td><td>陈述句且可判定</td></tr>
<tr><td>北京是中国的首都</td><td>是（真）</td><td>陈述句且可判定</td></tr>
<tr><td>\\(3 > 7\\)</td><td>是（假）</td><td>假命题也是命题</td></tr>
<tr><td>今天是星期几？</td><td>否</td><td>疑问句，不陈述任何事</td></tr>
<tr><td>请勿吸烟！</td><td>否</td><td>祈使句，无真假</td></tr>
<tr><td>这道题真难啊！</td><td>否</td><td>感叹句 + 主观标准</td></tr>
<tr><td>\\(x > 5\\)</td><td>否（开语句）</td><td>含自由变元，代入后才成命题</td></tr>
<tr><td>\\(2^{100}\\) 的十进制表示中数字 7 出现至少一次</td><td>是</td><td>虽未验证，但客观上非真即假</td></tr>
</table>
<p><strong>原子命题</strong>：自身不含其他命题、不可再分的命题。<br>
<strong>复合命题</strong>：由原子命题用逻辑联结词组合而成的命题。<br>
<strong>命题变量</strong>：表示命题的符号 \\(P, Q, R, p_1, \\dots\\)，它像变量一样可以取 \\(T\\) 或 \\(F\\)。</p>
<h2>示例</h2>
<p>设</p>
<ul>
<li>\\(P\\)：今天下雨。</li>
<li>\\(Q\\)：我带伞。</li>
</ul>
<p>\\(P\\) 与 \\(Q\\) 都可以作为命题变量，理由是：<strong>每个都是陈述句，且在每一场具体的天气/每一次具体的出门场景下，它要么真要么假，不存在第三种情况。</strong>我们不需要知道「今天到底下没下雨」——就像写函数时不需要知道参数的具体值，只需要知道它是个 <code>bool</code>。</p>
<p>由 \\(P, Q\\) 可以组装复合命题：</p>
<ul>
<li>「今天下雨并且我带伞」：\\(P \\land Q\\)</li>
<li>「今天没下雨」：\\(\\neg P\\)</li>
<li>「如果今天下雨，那么我带伞」：\\(P \\to Q\\)</li>
</ul>
<p>再拆一个复合命题：「张三和李四是同学，并且他们都学过离散数学」——它其实是三个原子命题的合取：\\(A \\land (B \\land C)\\)，其中 \\(A\\)：张三和李四是同学，\\(B\\)：张三学过离散数学，\\(C\\)：李四学过离散数学。</p>
<h2>常见错误</h2>
<ul>
<li><strong>「假话不是命题」</strong>：错。<code>3 &gt; 7</code> 是货真价实的假命题。</li>
<li><strong>「我现在不知道真假，所以不是命题」</strong>：错。「明天会地震」在逻辑上仍是命题（虽然我们不主张能预先知道它的真值），而「这个猜想对不对」这类未决问题通常也按命题处理。</li>
<li><strong>把命题和句子划等号</strong>：同一命题可以用不同句子表达。「\\(2+3=5\\)」与「五加二等于七？」后者根本不是命题；「\\(2+3=5\\)」与「\\(5=3+2\\)」则是同一命题的两种写法。</li>
<li><strong>含混的「我」和「今天」</strong>：形式化时要固定语境（谁、哪天），否则真值不确定。这是自然语言与形式语言的差距，不是逻辑的漏洞。</li>
</ul>
<h2>本章小结</h2>
<ul>
<li>命题的两个条件：<strong>陈述句</strong> + <strong>可判真假</strong>；真值只有 \\(T/F\\) 两个。</li>
<li>原子命题记作 \\(P, Q, R\\)；复合命题 = 原子命题 + 联结词。</li>
<li>下一步就是学会那五个联结词——它们是本课程的「运算符」。</li>
</ul>`
  },

  {
    id: 'l03', cat: '逻辑基础', title: '逻辑联结词', readTime: '10 分钟',
    points: [
      '五个基本联结词：¬ 否定、∧ 合取、∨ 析取、→ 蕴含、↔ 等价',
      '联结词是「真值函数」：结果只由操作数的真值决定，与内容无关',
      '\\(P \\to Q\\) 只在「P 真且 Q 假」时为假，其余三种情况都为真',
      '\\(\\lor\\) 是可兼或（可以同时为真），不是汉语里有时表达的「二选一」',
      '「只有 P 才 Q」= \\(Q \\to P\\)；「只要 P 就 Q」= \\(P \\to Q\\)'
    ],
    content: `
<h2>概念</h2>
<p>逻辑联结词把已有命题组装成新命题，规则完全由真值决定，因此也叫<strong>真值函数</strong>。本课程使用五个：</p>
<table>
<tr><th>符号</th><th>名称</th><th>读作</th><th>中文含义</th><th>为真的条件</th></tr>
<tr><td>\\(\\neg P\\)</td><td>否定</td><td>非 P</td><td>P 不成立</td><td>\\(P\\) 假</td></tr>
<tr><td>\\(P \\land Q\\)</td><td>合取</td><td>P 且 Q</td><td>两者同时成立</td><td>\\(P\\) 真 <strong>且</strong> \\(Q\\) 真</td></tr>
<tr><td>\\(P \\lor Q\\)</td><td>析取</td><td>P 或 Q</td><td>至少一个成立</td><td>\\(P\\)、\\(Q\\) 至少一个真</td></tr>
<tr><td>\\(P \\to Q\\)</td><td>蕴含</td><td>若 P 则 Q</td><td>P 成立时 Q 也成立</td><td>除「\\(P\\) 真 \\(Q\\) 假」外都为真</td></tr>
<tr><td>\\(P \\leftrightarrow Q\\)</td><td>等价</td><td>P 当且仅当 Q</td><td>两者同真同假</td><td>\\(P\\)、\\(Q\\) 真值相同</td></tr>
</table>
<h2>直觉解释</h2>
<p>把 \\(P \\to Q\\) 想成一份<strong>承诺</strong>：「如果下雨，我就带伞。」承诺只有在一种情况下被<strong>违背</strong>：下雨了，我却没带伞。至于没下雨时我带不带伞，承诺都没有被破坏——按逻辑约定，这时整个命题记为<strong>真</strong>。</p>
<p>这就是著名的「<strong>空真</strong>（vacuously true）」：条件没被触发时，蕴含式自动算真。数学里大量结论正靠它成立，例如「所有既是素数又是 1 的数都是偶数」——一个反例都找不出来，所以为真。</p>
<h2>数学定义：五个真值表</h2>
<p>记 \\(T\\) 为真、\\(F\\) 为假。</p>
<table>
<tr><th>\\(P\\)</th><th>\\(\\neg P\\)</th></tr>
<tr><td>\\(T\\)</td><td>\\(F\\)</td></tr>
<tr><td>\\(F\\)</td><td>\\(T\\)</td></tr>
</table>
<table>
<tr><th>\\(P\\)</th><th>\\(Q\\)</th><th>\\(P \\land Q\\)</th><th>\\(P \\lor Q\\)</th><th>\\(P \\to Q\\)</th><th>\\(P \\leftrightarrow Q\\)</th></tr>
<tr><td>\\(T\\)</td><td>\\(T\\)</td><td>\\(T\\)</td><td>\\(T\\)</td><td>\\(T\\)</td><td>\\(T\\)</td></tr>
<tr><td>\\(T\\)</td><td>\\(F\\)</td><td>\\(F\\)</td><td>\\(T\\)</td><td><strong>\\(F\\)</strong></td><td>\\(F\\)</td></tr>
<tr><td>\\(F\\)</td><td>\\(T\\)</td><td>\\(F\\)</td><td>\\(T\\)</td><td>\\(T\\)</td><td>\\(F\\)</td></tr>
<tr><td>\\(F\\)</td><td>\\(F\\)</td><td>\\(F\\)</td><td>\\(F\\)</td><td>\\(T\\)</td><td>\\(T\\)</td></tr>
</table>
<p>用一句话记住每种运算：\\(\\land\\) 见假即假；\\(\\lor\\) 见真即真；\\(\\to\\) 只在「前真后假」时为假；\\(\\leftrightarrow\\) 同真同假才为真。</p>
<h2>逐个联结词的例子</h2>
<ul>
<li><strong>否定 \\(\\neg\\)</strong>：\\(P\\)：「所有学生都及格了」。\\(\\neg P\\)：「并非所有学生都及格」——注意它不等于「所有学生都没及格」（量词否定是<a href="#/logic/l11">第 11 章</a>的重点）。</li>
<li><strong>合取 \\(\\land\\)</strong>：「该数能被 2 整除且能被 3 整除」。程序里写 <code>n % 2 == 0 &amp;&amp; n % 3 == 0</code>。</li>
<li><strong>析取 \\(\\lor\\)</strong>：「年龄满 18 岁或已满 12 年工龄」。两者都满足时这句话依然为真——逻辑的「或」永远是可以兼得的。</li>
<li><strong>蕴含 \\(\\to\\)</strong>：「若一个数末位是 0，则它能被 5 整除」。末位不是 0 的数（前件假）不参与判定，蕴含照样为真。</li>
<li><strong>等价 \\(\\leftrightarrow\\)</strong>：「一个整数能被 2 整除，当且仅当它是偶数」。两者互为充分必要条件。</li>
</ul>
<h2>优先级与约定</h2>
<p>为了让公式少写括号，规定优先级由强到弱：</p>
\\[
\\neg \\quad \\gt \\quad \\land \\quad \\gt \\quad \\lor \\quad \\gt \\quad \\to \\quad \\gt \\quad \\leftrightarrow
\\]
<p>于是 \\(\\neg P \\land Q \\to R\\) 应读作 <code>(((not P) and Q) implies R)</code>。写论文和作业时的稳妥做法是：拿不准就加括号。括号多余不扣分，少写会改变含义。</p>
<h2>常见错误</h2>
<ul>
<li><strong>把 \\(\\to\\) 当成因果或时间先后</strong>：\\(P \\to Q\\) 只谈真值关系，不谈「谁导致谁」。「如果 2 是奇数，那么月球是奶酪做的」前件假，整个蕴含式按定义为真——它没有任何因果关系。</li>
<li><strong>「或」理解成二选一</strong>：菜单上「咖啡或茶（任选其一）」是<em>排斥或</em>，逻辑 \\(\\lor\\) 是<em>可兼或</em>；排斥或要写成 \\((P \\lor Q) \\land \\neg(P \\land Q)\\)，即异或 \\(P \\oplus Q\\)。</li>
<li><strong>「只有…才…」方向写反</strong>：「只有年满 18 岁 \\(P\\)，才有选举权 \\(Q\\)」= 有选举权的人一定满 18 = \\(Q \\to P\\)。「只要 P 就 Q」才是 \\(P \\to Q\\)。</li>
<li><strong>否定范围搞错</strong>：「我不认为他会来」和「他一定不来」不一样；形式化时先确定被否定的原子命题是什么。</li>
</ul>
<h2>本章小结</h2>
<ul>
<li>五个联结词 = 五种真值函数，全部由真值表精确定义。</li>
<li>最难消化的是 \\(\\to\\)：它是<strong>承诺</strong>不是<strong>因果</strong>，只有「前真后假」为假。</li>
<li>下一张表把联结词组合起来算总账——真值表怎么做，是第 4 章。</li>
</ul>`
  },

  {
    id: 'l04', cat: '逻辑基础', title: '真值表', readTime: '8 分钟',
    points: [
      'n 个命题变量共有 \\(2^n\\) 种真值指派，所以真值表有 \\(2^n\\) 行',
      '造表口诀：第一列 T/F 各重复 \\(2^{n-1}\\) 次交替，最后一列每次翻转',
      '复杂公式要逐列计算，一列一个子公式，最后一条列就是整个公式',
      '永真式（重言式）：所有指派下都为真；永假式（矛盾式）：全假；可满足式：至少一行为真',
      '判定公式类型 = 看最后一列，这是纯机械操作，机器也能做'
    ],
    content: `
<h2>概念</h2>
<p><strong>真值表</strong>把一个公式在所有可能情况下的真值一次性列全。它是命题逻辑的「暴力计算」工具：只要变量有限，任何公式的语义都能被一张表完全刻画。</p>
<h2>为什么 n 个变量有 \\(2^n\\) 种组合</h2>
<p>每个命题变量独立地取 \\(T\\) 或 \\(F\\)，各 2 种选择。按<strong>乘法原理</strong>，\\(n\\) 个变量共</p>
\\[
\\underbrace{2 \\times 2 \\times \\cdots \\times 2}_{n\\ \\text{个}} = 2^n
\\]
<p>种指派。3 个变量 8 行、4 个变量 16 行、5 个变量 32 行——指数增长，这也是后面「SAT 问题很难」的根源。</p>
<table>
<tr><th>变量数 \\(n\\)</th><th>行数 \\(2^n\\)</th><th>说明</th></tr>
<tr><td>1</td><td>2</td><td>\\(P\\) 的真值表只有两行</td></tr>
<tr><td>2</td><td>4</td><td>最常见的练习规模</td></tr>
<tr><td>3</td><td>8</td><td>手写开始容易漏行</td></tr>
<tr><td>20</td><td>约 \\(10^{6}\\)</td><td>机器仍可暴力；SAT 求解器的实际规模远大于此</td></tr>
</table>
<h2>造表方法（附书写规律）</h2>
<p>以三个变量 \\(P, Q, R\\) 为例，按固定「阶梯」写指派，可保证不漏不重：</p>
<ul>
<li>\\(P\\) 列：\\(T\\) 连续 4 行，\\(F\\) 连续 4 行（即各重复 \\(2^{3-1}=4\\) 次）；</li>
<li>\\(Q\\) 列：\\(T,F\\) 各连续 2 行交替（重复 \\(2^{3-2}=2\\) 次）；</li>
<li>\\(R\\) 列：每行翻转（重复 \\(2^{3-3}=1\\) 次）。</li>
</ul>
<h2>示例：\\((P \\land Q) \\to P\\)</h2>
<p>分三列算：先算两个原子，再算括号里的 \\(P \\land Q\\)，最后算蕴含。</p>
<table>
<tr><th>行</th><th>\\(P\\)</th><th>\\(Q\\)</th><th>\\(P \\land Q\\)</th><th>\\((P \\land Q) \\to P\\)</th></tr>
<tr><td>1</td><td>\\(T\\)</td><td>\\(T\\)</td><td>\\(T\\)</td><td>\\(T\\)</td></tr>
<tr><td>2</td><td>\\(T\\)</td><td>\\(F\\)</td><td>\\(F\\)</td><td>\\(T\\)</td></tr>
<tr><td>3</td><td>\\(F\\)</td><td>\\(T\\)</td><td>\\(F\\)</td><td>\\(T\\)</td></tr>
<tr><td>4</td><td>\\(F\\)</td><td>\\(F\\)</td><td>\\(F\\)</td><td>\\(T\\)</td></tr>
</table>
<p>最后一列<strong>全为真</strong>：无论 \\(P,Q\\) 真假如何，「如果 P 且 Q，那么 P」都成立。这种公式叫<strong>永真式</strong>。它的直观含义很朴素：从「两者都成立」当然能推出「其中一个成立」。</p>
<h2>再练一个：\\(P \\to (Q \\to P)\\)</h2>
<table>
<tr><th>\\(P\\)</th><th>\\(Q\\)</th><th>\\(Q \\to P\\)</th><th>\\(P \\to (Q \\to P)\\)</th></tr>
<tr><td>\\(T\\)</td><td>\\(T\\)</td><td>\\(T\\)</td><td>\\(T\\)</td></tr>
<tr><td>\\(T\\)</td><td>\\(F\\)</td><td>\\(T\\)</td><td>\\(T\\)</td></tr>
<tr><td>\\(F\\)</td><td>\\(T\\)</td><td>\\(F\\)</td><td>\\(T\\)</td></tr>
<tr><td>\\(F\\)</td><td>\\(F\\)</td><td>\\(F\\)</td><td>\\(T\\)</td></tr>
</table>
<p>也是永真式。它说的是「如果 \\(P\\) 已经成立，那么<em>任何</em> \\(Q\\) 都能推出 \\(P\\)」——因为结论与 \\(Q\\) 无关。这类「看似古怪但确实有效」的公式，正是形式化比语感更可靠的地方。</p>
<h2>三类公式</h2>
<table>
<tr><th>名称</th><th>定义</th><th>例子</th><th>关系</th></tr>
<tr><td>永真式（重言式，tautology）</td><td>任何指派下都为真</td><td>\\(P \\lor \\neg P\\)、\\((P \\land Q) \\to P\\)</td><td>一定可满足</td></tr>
<tr><td>永假式（矛盾式，contradiction）</td><td>任何指派下都为假</td><td>\\(P \\land \\neg P\\)</td><td>不可满足</td></tr>
<tr><td>可满足式（satisfiable）</td><td>至少存在一个指派使它为真</td><td>\\(P \\land Q\\)、\\(P \\to Q\\)</td><td>包含永真式</td></tr>
<tr><td>不可满足式（unsatisfiable）</td><td>不存在使它为真的指派</td><td>\\((P \\to Q) \\land P \\land \\neg Q\\)</td><td>即永假式</td></tr>
</table>
<p>可满足性是 <strong>SAT 问题</strong>的核心：给定一个公式，问有没有一组赋值让它为真。它是第一个被证明 <strong>NP 完全</strong>的问题——第 17 章会回到这里。</p>
<h2>常见错误</h2>
<ul>
<li><strong>行数算错或指派漏重</strong>：先写 \\(2^n\\) 行编号，再按阶梯规律填 T/F，不要凭感觉。</li>
<li><strong>不看括号，把 \\(\\neg P \\land Q\\) 当成 \\(\\neg(P \\land Q)\\)</strong>：\\(\\neg\\) 只作用于紧跟它的那个式子。</li>
<li><strong>误以为「永真 = 有内容」</strong>：永真式的好处是<strong>不用知道前提真假</strong>就成立，这恰恰是它「形式化」的价值，不是空洞。</li>
<li><strong>把「永真」与「等价」混淆</strong>：\\(A \\leftrightarrow B\\) 永真时，才说 \\(A\\) 与 \\(B\\) 逻辑等价（下一张表专门讲）。</li>
<li><strong>变量多时硬撑手算</strong>：6 个变量就 64 行。此时用等价律化简（第 5 章）比列表快得多。</li>
</ul>
<h2>本章小结</h2>
<ul>
<li>\\(n\\) 个变量 → \\(2^n\\) 行；逐列计算子公式，最后一列定全局。</li>
<li>三类公式：永真 / 永假 / 可满足，判定完全机械。</li>
<li>真值表是命题逻辑的「语义裁判」，下一章用它来定义<strong>逻辑等价</strong>。</li>
</ul>`
  },

  {
    id: 'l05', cat: '命题逻辑', title: '逻辑等价与等价律', readTime: '10 分钟',
    points: [
      '\\(A \\equiv B\\) 表示两式在所有指派下真值相同，即 \\(A \\leftrightarrow B\\) 是永真式',
      '\\(\\equiv\\) 是「比较两个式子」的元语言记号，\\(\\leftrightarrow\\) 是式子内部的联结词',
      '蕴含等价 \\(P \\to Q \\equiv \\neg P \\lor Q\\) 是使用频率最高的一条定律',
      '德摩根律：\\(\\neg(P \\land Q) \\equiv \\neg P \\lor \\neg Q\\)，\\(\\neg(P \\lor Q) \\equiv \\neg P \\land \\neg Q\\)',
      '等价替换保持真值不变，因此可以用来化简公式与改写代码条件'
    ],
    content: `
<h2>概念</h2>
<p>如果两个公式 \\(A\\)、\\(B\\) 在<strong>每一种</strong>真值指派下取值都相同，就称它们<strong>逻辑等价</strong>，记作</p>
\\[
A \\equiv B
\\]
<p>等价的两句话「意思不同但真值总是一样」，所以可以互相替换而不改变整体公式的真假——这正是化简逻辑表达式、改写 <code>if</code> 条件的合法性来源。</p>
<h2>\\(\\equiv\\) 与 \\(\\leftrightarrow\\) 的区别</h2>
<table>
<tr><th></th><th>\\(\\leftrightarrow\\)</th><th>\\(\\equiv\\)</th></tr>
<tr><td>身份</td><td>对象语言里的联结词，结果仍是一个公式</td><td>元语言记号，是「我们对外说的话」</td></tr>
<tr><td>读法</td><td>「P 当且仅当 Q」</td><td>「A 与 B 逻辑等价」</td></tr>
<tr><td>怎么判定</td><td>查它那一列的真值</td><td>查 \\(A \\leftrightarrow B\\) 那一列是否<strong>全真</strong></td></tr>
</table>
<p>用真值表验证德摩根律 \\(\\neg(P \\land Q)\\) 与 \\(\\neg P \\lor \\neg Q\\)：</p>
<table>
<tr><th>\\(P\\)</th><th>\\(Q\\)</th><th>\\(P \\land Q\\)</th><th>\\(\\neg(P \\land Q)\\)</th><th>\\(\\neg P\\)</th><th>\\(\\neg Q\\)</th><th>\\(\\neg P \\lor \\neg Q\\)</th></tr>
<tr><td>\\(T\\)</td><td>\\(T\\)</td><td>\\(T\\)</td><td>\\(F\\)</td><td>\\(F\\)</td><td>\\(F\\)</td><td>\\(F\\)</td></tr>
<tr><td>\\(T\\)</td><td>\\(F\\)</td><td>\\(F\\)</td><td>\\(T\\)</td><td>\\(F\\)</td><td>\\(T\\)</td><td>\\(T\\)</td></tr>
<tr><td>\\(F\\)</td><td>\\(T\\)</td><td>\\(F\\)</td><td>\\(T\\)</td><td>\\(T\\)</td><td>\\(F\\)</td><td>\\(T\\)</td></tr>
<tr><td>\\(F\\)</td><td>\\(F\\)</td><td>\\(F\\)</td><td>\\(T\\)</td><td>\\(T\\)</td><td>\\(T\\)</td><td>\\(T\\)</td></tr>
</table>
<p>两列完全相同 → 二者逻辑等价。注意这<strong>不是巧合</strong>，也不是「大部分时候成立」：真值表穷尽了全部四种情况。</p>
<h2>常用逻辑等价律</h2>
<p>下表中 \\(A, B, C\\) 代表任意公式。</p>
<table>
<tr><th>名称</th><th>定律</th><th>直观解释</th></tr>
<tr><td>双重否定律</td><td>\\(\\neg\\neg A \\equiv A\\)</td><td>「并非他没有及格」= 他及格了。否定两次回到原地</td></tr>
<tr><td>幂等律</td><td>\\(A \\land A \\equiv A\\)，\\(A \\lor A \\equiv A\\)</td><td>「我带伞并且我带伞」没有增加任何信息</td></tr>
<tr><td>交换律</td><td>\\(A \\land B \\equiv B \\land A\\)，\\(A \\lor B \\equiv B \\lor A\\)</td><td>「既聪明又勤奋」与「既勤奋又聪明」是一回事</td></tr>
<tr><td>结合律</td><td>\\((A \\land B) \\land C \\equiv A \\land (B \\land C)\\)</td><td>三个条件的合取，先算哪两个都行</td></tr>
<tr><td>分配律</td><td>\\(A \\land (B \\lor C) \\equiv (A \\land B) \\lor (A \\land C)\\)<br>\\(A \\lor (B \\land C) \\equiv (A \\lor B) \\land (A \\lor C)\\)</td><td>像乘法对加法展开：「（会 Python 或 会 C++）且 英语好」= 「（会 Python 且英语好）或（会 C++ 且英语好）」</td></tr>
<tr><td>德摩根律</td><td>\\(\\neg(A \\land B) \\equiv \\neg A \\lor \\neg B\\)<br>\\(\\neg(A \\lor B) \\equiv \\neg A \\land \\neg B\\)</td><td>「并非既聪明又勤奋」=「或者不聪明，或者不勤奋」；「既不 A 也不 B」=「非 A 且非 B」</td></tr>
<tr><td>吸收律</td><td>\\(A \\lor (A \\land B) \\equiv A\\)，\\(A \\land (A \\lor B) \\equiv A\\)</td><td>「我带伞，或者（我带伞且穿外套）」——后半句被前半句吸收，条件只要「带伞」就够了</td></tr>
<tr><td>蕴含等价</td><td>\\(A \\to B \\equiv \\neg A \\lor B\\)</td><td>「如果下雨我就带伞」=「或者没下雨，或者我带伞」：承诺未被违背，只剩这两种可能</td></tr>
<tr><td>逆否等价</td><td>\\(A \\to B \\equiv \\neg B \\to \\neg A\\)</td><td>「下雨则地湿」= 「地没湿则没下雨」。第 6 章专门展开</td></tr>
<tr><td>等价分解</td><td>\\(A \\leftrightarrow B \\equiv (A \\to B) \\land (B \\to A)\\)</td><td>「当且仅当」= 双向都能推出</td></tr>
<tr><td>否定式</td><td>\\(A \\lor \\top \\equiv \\top\\)，\\(A \\land \\bot \\equiv \\bot\\)<br>\\(A \\lor \\bot \\equiv A\\)，\\(A \\land \\top \\equiv A\\)</td><td>\\(\\top\\) 恒真、\\(\\bot\\) 恒假：类比「与任何数相加都得原数」的 0</td></tr>
<tr><td>补余律</td><td>\\(A \\lor \\neg A \\equiv \\top\\)，\\(A \\land \\neg A \\equiv \\bot\\)</td><td>排中律与矛盾律：不可能既不真又不假</td></tr>
</table>
<h2>示例：化简一个招聘条件</h2>
<p>某岗位要求：「（会 Python 或会 C++）且 不是（不会数据结构和 不会 SQL）」。设 \\(Py,Cpp,DS,DB\\) 分别表示会这四项，条件为</p>
\\[
(Py \\lor Cpp) \\land \\neg(\\neg DS \\land \\neg DB)
\\]
<p>用德摩根律处理后半部分：</p>
\\[
\\neg(\\neg DS \\land \\neg DB) \\equiv \\neg\\neg DS \\lor \\neg\\neg DB \\equiv DS \\lor DB
\\]
<p>于是原条件化简为 \\((Py \\lor Cpp) \\land (DS \\lor DB)\\)——「两门语言至少会一门，且两门课至少会一门」，比原来的双重否定好读得多。</p>
<h2>示例：改写代码条件</h2>
<pre><code>// 原条件：不满足「a 为正 且 b 为偶」时执行
if (!(a &gt; 0 &amp;&amp; b % 2 == 0)) { ... }

// 用德摩根律改写（等价，且通常更好读）
if (a &lt;= 0 || b % 2 != 0) { ... }</code></pre>
<p>两段代码行为完全一致，因为 \\(\\neg(A \\land B) \\equiv \\neg A \\lor \\neg B\\)。写「卫语句（guard clause）」和做布尔表达式优化时，这是每天都在用的变换。</p>
<h2>常见错误</h2>
<ul>
<li><strong>德摩根忘变号</strong>：\\(\\neg(P \\land Q) \\equiv \\neg P \\land \\neg Q\\) 是<strong>错的</strong>。「并非（聪明且勤奋）」不能推出「既不聪明也不勤奋」——也许只是懒。</li>
<li><strong>否定蕴含写错</strong>：\\(\\neg(P \\to Q) \\equiv \\neg P \\to \\neg Q\\) 是<strong>错的</strong>。正确做法先换 \\(\\to\\)：\\(\\neg(P \\to Q) \\equiv \\neg(\\neg P \\lor Q) \\equiv P \\land \\neg Q\\)。要推翻「下雨我就带伞」，唯一办法是<strong>抓到下雨且我没带伞</strong>。</li>
<li><strong>分配律方向用反</strong>：\\(A \\lor (B \\land C)\\) 展开成 \\((A \\lor B) \\land (A \\lor C)\\)，别写成 \\(\\lor\\)。</li>
<li><strong>把 \\(\\equiv\\) 与 \\(\\to\\) 混用</strong>：\\(A \\to B\\) 为真只说明「A 真时 B 真」，不说明两者真值总是相同。</li>
</ul>
<h2>本章小结</h2>
<ul>
<li>等价 = 真值表相同 = 可以互相替换。判定靠真值表，化简靠定律。</li>
<li>最常用三条：<strong>德摩根律</strong>、<strong>蕴含等价 \\(P \\to Q \\equiv \\neg P \\lor Q\\)</strong>、<strong>逆否等价</strong>。</li>
<li>化简公式的标准流程：<em>消蕴含 → 否定内推 → 分配展开 → 吸收合并</em>，下一章把它做成范式。</li>
</ul>`
  },

  {
    id: 'l06', cat: '命题逻辑', title: '原命题 · 逆命题 · 否命题 · 逆否命题', readTime: '8 分钟',
    points: [
      '原命题 \\(P \\to Q\\)；逆命题 \\(Q \\to P\\)；否命题 \\(\\neg P \\to \\neg Q\\)；逆否命题 \\(\\neg Q \\to \\neg P\\)',
      '原命题与逆否命题永远同真值（逆否等价）；逆命题与否命题同真值',
      '原命题与逆命题、否命题通常不等价，需要独立证明或独立举反例',
      '「否命题」与「命题的否定」是两件事：\\(\\neg P \\to \\neg Q\\) 与 \\(\\neg(P \\to Q) \\equiv P \\land \\neg Q\\)',
      '数学里证 \\(P \\to Q\\) 常常改证逆否命题，这叫逆否证明法'
    ],
    content: `
<h2>概念</h2>
<p>一个蕴含式 \\(P \\to Q\\) 会带出三个「亲戚」。设</p>
<ul>
<li>\\(P\\)：一个数是 6 的倍数；\\(Q\\)：这个数是 3 的倍数。</li>
</ul>
<table>
<tr><th>名称</th><th>形式</th><th>例子（同一对 \\(P,Q\\)）</th><th>真假</th></tr>
<tr><td><strong>原命题</strong></td><td>\\(P \\to Q\\)</td><td>若一个数是 6 的倍数，则它是 3 的倍数</td><td>真</td></tr>
<tr><td><strong>逆命题</strong></td><td>\\(Q \\to P\\)</td><td>若一个数是 3 的倍数，则它是 6 的倍数</td><td>假（3 本身、9、15…）</td></tr>
<tr><td><strong>否命题</strong></td><td>\\(\\neg P \\to \\neg Q\\)</td><td>若一个数不是 6 的倍数，则它不是 3 的倍数</td><td>假（同上反例）</td></tr>
<tr><td><strong>逆否命题</strong></td><td>\\(\\neg Q \\to \\neg P\\)</td><td>若一个数不是 3 的倍数，则它不是 6 的倍数</td><td>真</td></tr>
</table>
<p>一眼可见：原命题与逆否命题<strong>同真</strong>；逆命题与否命题<strong>同假</strong>。这不是巧合。</p>
<h2>直觉解释</h2>
<p>用「下雨—地湿」来感受一次：</p>
<ul>
<li>原命题「如果下雨，那么地会湿」。</li>
<li>逆命题「如果地湿了，那么下过雨」——洒水车呢？有人泼水呢？显然不一定。</li>
<li>逆否命题「如果地没湿，那么没下雨」——只要原规则成立，地都没湿，那雨肯定没下。<strong>这个推理无论如何都站得住。</strong></li>
</ul>
<p>逆否命题之所以可靠，是因为它做的事是：<strong>结论没出现，就说明触发条件没发生</strong>。中文里它常被说成「没……就没有……」。</p>
<h2>数学定义与证明</h2>
<p>断言：\\(P \\to Q \\equiv \\neg Q \\to \\neg P\\)（逆否等价律）。用真值表穷尽验证：</p>
<table>
<tr><th>\\(P\\)</th><th>\\(Q\\)</th><th>\\(P \\to Q\\)</th><th>\\(\\neg Q\\)</th><th>\\(\\neg P\\)</th><th>\\(\\neg Q \\to \\neg P\\)</th></tr>
<tr><td>\\(T\\)</td><td>\\(T\\)</td><td>\\(T\\)</td><td>\\(F\\)</td><td>\\(F\\)</td><td>\\(T\\)</td></tr>
<tr><td>\\(T\\)</td><td>\\(F\\)</td><td>\\(F\\)</td><td>\\(T\\)</td><td>\\(F\\)</td><td><strong>\\(F\\)</strong></td></tr>
<tr><td>\\(F\\)</td><td>\\(T\\)</td><td>\\(T\\)</td><td>\\(F\\)</td><td>\\(T\\)</td><td>\\(T\\)</td></tr>
<tr><td>\\(F\\)</td><td>\\(F\\)</td><td>\\(T\\)</td><td>\\(T\\)</td><td>\\(T\\)</td><td>\\(T\\)</td></tr>
</table>
<p>第三、四列真值完全相同 → 两式等价。再对照 \\(Q \\to P\\) 那一列，它与 \\(P \\to Q\\) 在第 2、3 行取值不同 → <strong>原命题与逆命题不等价</strong>。</p>
<p>顺带记住一组关系：</p>
<ul>
<li>原命题 ↔ 逆否命题：<strong>等价</strong></li>
<li>逆命题 ↔ 否命题：<strong>等价</strong>（它们互为逆否）</li>
<li>原命题 ↔ 逆命题 / 否命题：<strong>不等价</strong></li>
</ul>
<h2>「否命题」≠「命题的否定」</h2>
<p>这是本课程最容易失分的一处对比：</p>
<table>
<tr><th></th><th>写法</th><th>含义</th></tr>
<tr><td>否命题</td><td>\\(\\neg P \\to \\neg Q\\)</td><td>仍然是个蕴含式，把条件与结论<em>各自</em>否定</td></tr>
<tr><td>命题的否定</td><td>\\(\\neg(P \\to Q) \\equiv P \\land \\neg Q\\)</td><td>推翻整句话：条件成立<em>但</em>结论不成立</td></tr>
</table>
<p>「若 \\(x=2\\)，则 \\(x^2=4\\)」的<em>否命题</em>是「若 \\(x \\neq 2\\)，则 \\(x^2 \\neq 4\\)」；而它的<em>否定</em>是「\\(x=2\\) 并且 \\(x^2 \\neq 4\\)」——后者才是用来反驳原话的东西。</p>
<h2>示例：用逆否命题证明</h2>
<p>命题：<em>若 \\(n^2\\) 是偶数，则 \\(n\\) 是偶数</em>（\\(n\\) 为整数）。</p>
<p>直接证不好下手（从「平方是偶数」反推 \\(n\\) 很别扭），改证逆否命题：<em>若 \\(n\\) 不是偶数，则 \\(n^2\\) 不是偶数</em>。</p>
<ul>
<li>设 \\(n\\) 为奇数，则 \\(n = 2k+1\\)。</li>
<li>\\(n^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1\\)，形如 \\(2m+1\\)，是奇数。</li>
<li>逆否命题成立 → 由逆否等价律，原命题成立。∎</li>
</ul>
<p>「要证 \\(P \\to Q\\)，就去证 \\(\\neg Q \\to \\neg P\\)」——第 14 章讲证明方法时会再遇到它。</p>
<h2>充分条件与必要条件</h2>
<table>
<tr><th>说法</th><th>形式</th><th>记法要点</th></tr>
<tr><td>\\(P\\) 是 \\(Q\\) 的<strong>充分条件</strong></td><td>\\(P \\to Q\\)</td><td>有 \\(P\\) 就「足够」推出 \\(Q\\)</td></tr>
<tr><td>\\(P\\) 是 \\(Q\\) 的<strong>必要条件</strong></td><td>\\(Q \\to P\\)</td><td>没 \\(P\\) 就「一定没有」\\(Q\\)，即 \\(\\neg P \\to \\neg Q\\)</td></tr>
<tr><td>\\(P\\) 是 \\(Q\\) 的充要条件</td><td>\\(P \\leftrightarrow Q\\)</td><td>双向都成立</td></tr>
</table>
<p>「满 18 岁」是「有选举权」的必要条件？还是充分条件？想清楚方向，比背口诀可靠。</p>
<h2>常见错误</h2>
<ul>
<li><strong>把逆命题当原命题用</strong>：「若两角是对顶角，则它们相等」为真，但「若两角相等，则它们是对顶角」为假（两个同位角也可能相等）。数学作业里最常见的错误就是「证了逆命题」。</li>
<li><strong>由一个具体例子断定等价</strong>：等价必须对所有指派成立，需要一个反例就足够推翻它（\\(P\\) 真 \\(Q\\) 假那一行）。</li>
<li><strong>混淆否命题与命题的否定</strong>：判否一个全称蕴含命题时，写成 \\(P \\land \\neg Q\\) 的形式，别写成 \\(\\neg P \\to \\neg Q\\)。</li>
</ul>
<h2>本章小结</h2>
<ul>
<li>四个命题两两配对：原⇄逆否 等价，逆⇄否 等价。</li>
<li>蕴含的否定是「前件真且后件假」：\\(\\neg(P \\to Q) \\equiv P \\land \\neg Q\\)。</li>
<li>「逆否等价」既是化简工具，也是证明策略（逆否证明法）。</li>
</ul>`
  },

  {
    id: 'l07', cat: '命题逻辑', title: '范式：DNF 与 CNF', readTime: '9 分钟',
    points: [
      '文字（literal）= 命题变量或其否定，如 \\(P\\)、\\(\\neg Q\\)',
      '子句 = 若干个文字的析取或合取，如 \\(\\neg P \\lor Q\\)、\\(P \\land \\neg Q\\)',
      'DNF（析取范式）= 若干个合取式的析取；CNF（合取范式）= 若干个析取式的合取',
      '\\((P \\lor Q) \\land (\\neg P \\lor R)\\) 是 CNF；\\((P \\land \\neg Q) \\lor (\\neg P \\land R)\\) 是 DNF',
      '化范式三步：消蕴含 → 否定内推（德摩根）→ 分配律展开',
      'CNF 是 SAT / SMT 求解器的输入格式，DNF 对应「多条规则任一命中」'
    ],
    content: `
<h2>概念</h2>
<p>先约定三个层层放大的词：</p>
<table>
<tr><th>术语</th><th>含义</th><th>例子</th></tr>
<tr><td><strong>文字</strong>（literal）</td><td>一个命题变量，或它的否定</td><td>\\(P\\)、\\(\\neg Q\\)、\\(R\\)</td></tr>
<tr><td><strong>子句</strong>（clause）</td><td>若干个文字用 \\(\\lor\\) 或 \\(\\land\\) 连成一串</td><td>\\(\\neg P \\lor Q \\lor R\\)（析取子句）；\\(P \\land \\neg Q\\)（合取子句）</td></tr>
<tr><td><strong>范式</strong></td><td>子句再按固定层次组合成的「规范形状」公式</td><td>见下</td></tr>
</table>
<ul>
<li><strong>析取范式 DNF</strong>（Disjunctive Normal Form）：<em>合取式的析取</em>——形如「小方块 或 小方块 或 …」。例：\\((P \\land \\neg Q) \\lor (\\neg P \\land R) \\lor (Q \\land R \\land \\neg S)\\)</li>
<li><strong>合取范式 CNF</strong>（Conjunctive Normal Form）：<em>析取式的合取</em>——形如「约束 且 约束 且 …」。例：\\((P \\lor Q) \\land (\\neg P \\lor R)\\)</li>
</ul>
<p>判别口诀看<em>最外层</em>运算符：最外层是 \\(\\land\\)、里面每块都是文字的 \\(\\lor\\) → CNF；最外层是 \\(\\lor\\)、里面每块都是文字的 \\(\\land\\) → DNF。</p>
<h2>直觉解释：两种范式对应两种思考方式</h2>
<p><strong>CNF 是「规则清单」</strong>：每条规则都必须满足。<br>
\\((P \\lor Q) \\land (\\neg P \\lor R)\\) 读作「第一条：\\(P\\)、\\(Q\\) 至少成立一个；第二条：\\(P\\) 不成立或 \\(R\\) 成立。两条都要过。」<br>
排课、配置约束、数据库 CHECK 约束、SAT 求解器的输入，天生就是这个形状。</p>
<p><strong>DNF 是「方案列表」</strong>：任一方案成立即可。<br>
\\((P \\land \\neg Q) \\lor (\\neg P \\land R)\\) 读作「要么走方案一（\\(P\\) 且非 \\(Q\\)），要么走方案二（非 \\(P\\) 且 \\(R\\)）。」<br>
风控规则「命中任一组合即报警」、真值表里把为真的行挨个列出来，都是 DNF。</p>
<h2>数学定义与转化方法</h2>
<p>把任意公式化为范式的机械三步：</p>
<ol>
<li><strong>消去 \\(\\to\\) 与 \\(\\leftrightarrow\\)</strong>：\\(A \\to B \\equiv \\neg A \\lor B\\)；\\(A \\leftrightarrow B \\equiv (\\neg A \\lor B) \\land (\\neg B \\lor A)\\)。</li>
<li><strong>否定内推</strong>：用双重否定律与德摩根律，把 \\(\\neg\\) 全部推到文字上。</li>
<li><strong>分配律展开</strong>：要 CNF 就用 \\(A \\lor (B \\land C) \\equiv (A \\lor B) \\land (A \\lor C)\\)；要 DNF 就用 \\(A \\land (B \\lor C) \\equiv (A \\land B) \\lor (A \\land C)\\)。</li>
</ol>
<p><strong>例：把 \\((P \\to Q) \\land \\neg P \\to R\\) 化 CNF。</strong>（先按优先级补括号：\\(((P \\to Q) \\land \\neg P) \\to R\\)）</p>
<ul>
<li>消蕴含：\\(\\neg((P \\to Q) \\land \\neg P) \\lor R\\)</li>
<li>继续消内层蕴含：\\(\\neg((\\neg P \\lor Q) \\land \\neg P) \\lor R\\)</li>
<li>德摩根内推：\\((\\neg(\\neg P \\lor Q) \\lor \\neg\\neg P) \\lor R \\equiv ((P \\land \\neg Q) \\lor P) \\lor R\\)</li>
<li>吸收：\\((P \\land \\neg Q) \\lor P \\equiv P\\)，得 \\(P \\lor R\\)——单文字的析取式，本身就是 CNF。</li>
</ul>
<p>原式其实等价于「\\(P\\) 真则 \\(R\\) 必须真，且 \\(P\\) 必须真」。化简的价值就在这里：一眼看穿。</p>
<h2>由真值表直接读出范式</h2>
<p>看 \\(P \\to Q\\) 的真值表：为真的指派是 \\((T,T)\\)、\\((F,T)\\)、\\((F,F)\\)。</p>
<ul>
<li><strong>主析取范式</strong>：把每个为真的指派写成「文字合取（极小项）」再析取：<br>
\\((P \\land Q) \\lor (\\neg P \\land Q) \\lor (\\neg P \\land \\neg Q)\\)</li>
<li><strong>主合取范式</strong>：把每个为假的指派写成「使其为假的析取子句（极大项）」再合取。这里只有 \\((T,F)\\) 为假，对应子句 \\(\\neg P \\lor Q\\)：<br>
\\((\\neg P \\lor Q)\\)</li>
</ul>
<p>「主」范式的意义在于<strong>唯一</strong>：给定变量顺序后，每个公式的主 DNF / 主 CNF 只有一个（同真值表一样是标准答案），因此可以用来<strong>判定两个公式是否逻辑等价</strong>——把两者都化成主范式比对即可。代价是可能爆炸：\\(n\\) 个变量最多 \\(2^n\\) 个极小项。</p>
<h2>范式在计算机中的应用</h2>
<ul>
<li><strong>SAT / SMT 求解器</strong>：输入几乎总是 CNF（DIMACS 格式），一行一条子句，例如 \\((P \\lor Q) \\land (\\neg P \\lor R)\\) 存成 <code>1 2</code> / <code>-1 3</code> 两个子句。</li>
<li><strong>数字电路</strong>：DNF = 与或两级电路（PLA / 组合逻辑综合）；化到最少子句就是省门电路。</li>
<li><strong>逻辑编程与求解</strong>：2-SAT（每条子句至多两个文字）可以在线性时间求解，图论解法正是「\\(\\neg A \\to B\\) 加边」。</li>
<li><strong>搜索与规则引擎</strong>：ES / 数据库查询里多个 filter 取交、should 取并，本质就是 CNF / DNF。</li>
</ul>
<h2>常见错误</h2>
<ul>
<li><strong>\\(\\neg(P \\land Q)\\) 当成范式</strong>：否定没推到文字上，先用德摩根变成 \\(\\neg P \\lor \\neg Q\\)。</li>
<li><strong>层次搞混</strong>：\\((P \\lor Q) \\lor (R \\land S)\\) 既不是 CNF 也不是 DNF——最外层是 \\(\\lor\\) 而它的子块里有 \\(\\land\\) 混在 \\(\\lor\\) 层里；要用分配律继续处理。</li>
<li><strong>以为范式唯一</strong>：一般 DNF / CNF <em>不唯一</em>（化简程度不同），只有<em>主</em>范式唯一。</li>
<li><strong>以为等价变换会保持长度</strong>：分配展开可能让公式指数级膨胀，实际求解器里会用 Tseitin 变换引入新变量换取线性规模。</li>
</ul>
<h2>本章小结</h2>
<ul>
<li>文字 → 子句 → 范式；DNF 是「方案任一命中」，CNF 是「约束全部满足」。</li>
<li>三步化范式：消蕴含、否定内推、分配展开。</li>
<li>真值表 → 主范式；主范式唯一，可用于判定等价。</li>
</ul>`
  },

  {
    id: 'l08', cat: '命题逻辑', title: '推理与推理规则', readTime: '10 分钟',
    points: [
      '论证 = 前提 + 结论；「有效」指前提全真时结论不可能为假',
      '假言推理 Modus Ponens：\\(P \\to Q, P \\vdash Q\\)；拒取式 Modus Tollens：\\(P \\to Q, \\neg Q \\vdash \\neg P\\)',
      '假言三段论、析取三段论、合取引入、化简是四条最常用的补充规则',
      '两条形式谬误：肯定后件、否定前件——它们看起来很像有效推理',
      '推理规则可以用真值表验证：把「前提合取 → 结论」列成表，若永真则有效'
    ],
    content: `
<h2>概念</h2>
<p>一个<strong>论证（argument）</strong>由若干<strong>前提</strong>和一个<strong>结论</strong>组成，通常写成一列，结论前加 \\(\\therefore\\)（所以）：</p>
\\[
\\frac{P \\to Q \\quad P}{\\therefore\\; Q}
\\]
<p>定义<strong>有效性</strong>：论证是<strong>有效的（valid）</strong>，当且仅当<strong>不存在</strong>一种真值指派使「所有前提为真而结论为假」。请注意这个定义的口味——它不要求前提<em>实际</em>为真，只保证「前提真则结论必真」这个结构靠得住。</p>
<blockquote>有效 + 前提实际为真 = 正确（sound）。逻辑课只负责「有效」这一半。</blockquote>
<h2>核心推理规则</h2>
<h3>1. 假言推理 Modus Ponens（肯定前件）</h3>
\\[
\\frac{P \\to Q \\qquad P}{\\therefore\\; Q}
\\]
<p>中文例：「如果今天下雨，那么比赛取消。今天下雨。所以比赛取消。」</p>
<h3>2. 拒取式 Modus Tollens（否定后件）</h3>
\\[
\\frac{P \\to Q \\qquad \\neg Q}{\\therefore\\; \\neg P}
\\]
<p>中文例：「如果服务器宕机，那么监控会报警。监控没有报警。所以服务器没宕机。」<br>
直觉：后件没出现，触发条件就一定没发生——这正是第 6 章的逆否等价在起作用。</p>
<h3>3. 假言三段论（传递性）</h3>
\\[
\\frac{P \\to Q \\qquad Q \\to R}{\\therefore\\; P \\to R}
\\]
<p>中文例：「读懂题就会做，会做就能得分 ⇒ 读懂题就能得分。」</p>
<h3>4. 析取三段论</h3>
\\[
\\frac{P \\lor Q \\qquad \\neg P}{\\therefore\\; Q}
\\]
<p>中文例：「凶手不是甲就是乙。不是甲。所以是乙。」这就是程序里「枚举所有可能，逐个排除」的逻辑形式。</p>
<h3>5. 合取引入 / 化简</h3>
\\[
\\frac{P \\qquad Q}{\\therefore\\; P \\land Q}
\\qquad
\\frac{P \\land Q}{\\therefore\\; P}
\\]
<p>中文例：「我会 Python，我也会 C++ ⇒ 我会 Python 且会 C++」；反过来从合取里任取一项也合法。</p>
<h3>6. 附带认识两条</h3>
<ul>
<li>构造性二难：\\(P \\lor Q,\\ P \\to R,\\ Q \\to R \\vdash R\\)（两种情况都通向同一结论）。</li>
<li>归谬（反证）：由 \\(P \\to (Q \\land \\neg Q)\\) 推出 \\(\\neg P\\)。第 14 章展开。</li>
</ul>
<h2>示例：一条完整推理链</h2>
<p>前提：①「如果模型过拟合（\\(O\\)），则验证误差上升（\\(V\\)」；②「如果验证误差上升，则应调低容量（\\(C\\)」；③ 没有调低容量（\\(\\neg C\\)）。结论？</p>
<table>
<tr><th>步骤</th><th>依据</th><th>得到</th></tr>
<tr><td>1</td><td>前提 ①② + <strong>假言三段论</strong></td><td>\\(O \\to C\\)</td></tr>
<tr><td>2</td><td>步骤 1 + 前提 ③ + <strong>拒取式</strong></td><td>\\(\\neg O\\)</td></tr>
<tr><td>结论</td><td>—</td><td>模型没有过拟合</td></tr>
</table>
<h2>怎么用真值表验证一条规则</h2>
<p>规则 \\(P \\to Q,\\ P \\vdash Q\\) 对应的判定式是 \\(((P \\to Q) \\land P) \\to Q\\)：把它列成真值表，最后一列全为 \\(T\\)（永真式）→ 规则有效。同理，\\(((P \\to Q) \\land Q) \\to P\\) 会在 \\(P\\) 假 \\(Q\\) 真那一行取值为假 → 该「推理形式」无效。</p>
<h2>两条最常见的形式谬误</h2>
<table>
<tr><th>谬误</th><th>错误形式</th><th>为什么错（反例）</th></tr>
<tr><td><strong>肯定后件</strong></td><td>\\(P \\to Q,\\ Q \\vdash P\\)</td><td>「地湿则下过雨（假规则）；地湿了；所以下过雨」——可能是洒水车。\\(Q\\) 可以有别的来源</td></tr>
<tr><td><strong>否定前件</strong></td><td>\\(P \\to Q,\\ \\neg P \\vdash \\neg Q\\)</td><td>「如果我是市长，我有车；我不是市长；所以我没车」——前提结构推不出结论</td></tr>
</table>
<p>对照记忆：<strong>Modus Ponens 走「前件真」，Modus Tollens 走「后件假」</strong>；凡是「后件真」「前件假」当起点的，都不是有效规则。</p>
<h2>与程序的关系</h2>
<ul>
<li><code>if (P) Q;</code> + 已知 <code>P</code> ⇒ 断言 <code>Q</code>：这是 Modus Ponens 在执行期发生的事。</li>
<li>断言检查 <code>assert !Q</code> 结合规格 <code>P → Q</code> 反推 <code>!P</code>：这是 Modus Tollens，也是「用后置条件失败定位前置原因」的调试思路。</li>
<li>把 if-else 分支穷举后用「析取三段论」逐个剪枝，就是静态分析 / 路径可达性检查的基本操作。</li>
</ul>
<h2>常见错误</h2>
<ul>
<li><strong>混淆「有效」与「结论为真」</strong>：有效论证的结论是否为真取决于前提；前提假时有效论证也能推出假结论。</li>
<li><strong>把 \\(\\vdash\\) 与 \\(\\to\\) 混用</strong>：\\(\\vdash\\) 是「可以从这些前提推出」，属于元语言；\\(\\to\\) 是对象语言里的联结词。</li>
<li><strong>前提没用完就慌</strong>：日常论证常有隐藏前提（「下雨则比赛取消」默认「今天是比赛日」）。逻辑课要求把它们显式写出来。</li>
</ul>
<h2>本章小结</h2>
<ul>
<li>记住六条正向规则：<strong>MP、MT、假言三段论、析取三段论、合取引入、化简</strong>。</li>
<li>警惕两条反向谬误：<strong>肯定后件、否定前件</strong>。</li>
<li>验证规则有效性的通法：构造「前提合取 → 结论」并检验它是否永真。命题逻辑到此告一段落，接下来进入更强的语言——谓词逻辑。</li>
</ul>`
  },

  {
    id: 'l09', cat: '谓词逻辑', title: '谓词与个体', readTime: '7 分钟',
    points: [
      '谓词 \\(P(x)\\) 是带空位的「性质模板」，代入个体后才成为命题',
      '个体 = 被谈论的对象；个体域（论域）= 变量的取值范围，必须事先声明',
      '一元谓词表达性质，二元及以上谓词表达关系',
      '命题逻辑无法表达「所有」「存在」与对象间的关系，这是引入谓词的动机',
      '同一句话在不同论域下真值可能相反'
    ],
    content: `
<h2>概念</h2>
<p>前面八章只把命题当整体处理，\\(P \\to Q\\) 里面的内容对逻辑来说是黑箱。可是这句常识：</p>
<blockquote>「所有人都会死，苏格拉底是人，所以苏格拉底会死。」</blockquote>
<p>在命题逻辑里写成 \\(A \\to (B \\to C)\\) 就<em>无效</em>了（前件真不能保证后件真）——因为「所有」「…是…」这些结构被抹掉了。<strong>谓词逻辑（一阶逻辑）</strong>就是把命题拆开、看到内部结构的语言。</p>
<table>
<tr><th>术语</th><th>含义</th><th>例子</th></tr>
<tr><td>个体（个体常元）</td><td>被谈论的对象</td><td>苏格拉底、数字 7、这台服务器</td></tr>
<tr><td>变元</td><td>代表「某个不确定的个体」的符号</td><td>\\(x, y, z\\)</td></tr>
<tr><td>谓词</td><td>描述性质或关系的模板，带若干空位</td><td>\\(Man(x)\\)、\\(GreaterThan(x,y)\\)</td></tr>
<tr><td>个体域 / 论域</td><td>变元允许取值的集合</td><td>全体人、整数 \\(\\mathbb{Z}\\)、某班学生</td></tr>
</table>
<h2>直觉解释</h2>
<p>把谓词想成<strong>函数</strong>：\\(P(x)\\) 就是「输入一个个体，返回真值」的函数。</p>
<ul>
<li>\\(P(x)\\)：\\(x > 5\\)。不指定 \\(x\\) 时它<strong>没有真值</strong>，所以不是命题——它是「带空位的模板」。</li>
<li>代入 \\(x = 7\\)：\\(P(7)\\) 即 \\(7 > 5\\)，是命题，真值为真。</li>
<li>代入 \\(x = 3\\)：\\(P(3)\\) 是假命题。</li>
<li>再加量词（下一章）：\\(\\forall x\\, P(x)\\)、\\(\\exists x\\, P(x)\\) 又变回命题。</li>
</ul>
<p>在编程里，这就是「谓词 / 判定函数」：<code>isPrime(n)</code> 返回 <code>bool</code>。<code>isPrime</code> 本身不是真或假，<code>isPrime(7)</code> 才是。</p>
<h2>数学定义</h2>
<p>谓词逻辑的合式公式递归定义：</p>
<ol>
<li>若 \\(P\\) 是 \\(n\\) 元谓词，\\(t_1,\\dots,t_n\\) 是项（个体常元或变元），则 \\(P(t_1,\\dots,t_n)\\) 是公式（<strong>原子公式</strong>）；</li>
<li>若 \\(A, B\\) 是公式，则 \\(\\neg A\\)、\\((A \\land B)\\)、\\((A \\lor B)\\)、\\((A \\to B)\\)、\\((A \\leftrightarrow B)\\) 是公式；</li>
<li>若 \\(A\\) 是公式，\\(x\\) 是变元，则 \\(\\forall x\\, A\\)、\\(\\exists x\\, A\\) 是公式；</li>
<li><strong>没有自由变元</strong>的公式称为<strong>语句（sentence）</strong>，它才有确定真值。</li>
</ol>
<p>一元谓词表达<strong>性质</strong>（\\(Even(x)\\)：\\(x\\) 是偶数）；二元及以上表达<strong>关系</strong>（\\(Likes(x,y)\\)：\\(x\\) 喜欢 \\(y\\)）。关系谓词<em>不</em>默认对称：\\(Likes(a,b)\\) 与 \\(Likes(b,a)\\) 是两回事。</p>
<h2>示例：把中文翻译成谓词公式</h2>
<p>设论域为「本校全体学生」，\\(StudyMath(x)\\)：\\(x\\) 学数学，\\(Smart(x)\\)：\\(x\\) 聪明。</p>
<table>
<tr><th>自然语言</th><th>公式</th></tr>
<tr><td>张三学数学</td><td>\\(StudyMath(zhang)\\)</td></tr>
<tr><td>有人学数学</td><td>\\(\\exists x\\, StudyMath(x)\\)</td></tr>
<tr><td>聪明人都学数学</td><td>\\(\\forall x\\,(Smart(x) \\to StudyMath(x))\\)</td></tr>
<tr><td>张三不学数学但很聪明</td><td>\\(\\neg StudyMath(zhang) \\land Smart(zhang)\\)</td></tr>
</table>
<h2>论域不可省略</h2>
<p>同一公式在不同论域下真值可能相反：</p>
<table>
<tr><th>公式</th><th>论域 \\(\\mathbb{N}\\)</th><th>论域 \\(\\mathbb{Z}\\)</th><th>论域 \\(\\mathbb{R}\\)</th></tr>
<tr><td>\\(\\forall x\\, \\exists y\\,(y \\gt x)\\)</td><td>真</td><td>真</td><td>真</td></tr>
<tr><td>\\(\\forall x\\, \\exists y\\,(y \\times y = x)\\)</td><td>假（\\(x=2\\)）</td><td>假（\\(x=-1\\)）</td><td>假（\\(x=-1\\)）</td></tr>
<tr><td>\\(\\exists x\\,(x \\gt 0 \\land x^2 = 2)\\)</td><td>假</td><td>假</td><td>真（\\(\\sqrt{2}\\)）</td></tr>
</table>
<p>所以严谨的表述要么事先声明论域，要么把范围写进公式里（\\(\\forall x\\,(Student(x) \\to \\dots)\\) 就是把论域限制进了谓词）。数学教材常默认「实数范围内」，忘了这一点是常见的失分原因。</p>
<h2>常见错误</h2>
<ul>
<li><strong>把 \\(P(x)\\) 当命题</strong>：它有自由变元，真值未定。</li>
<li><strong>混淆「谓词」与「项」</strong>：\\(P(x) \\land Q(y)\\) 是公式；\\(f(x)\\)（函数符号，如 \\(x+1\\)）是项，不是公式，不能单独作真值判断。</li>
<li><strong>忽略个体域</strong>：不声明论域就谈真假，等于不声明变量类型就写代码。</li>
<li><strong>以为 \\(P(a) \\lor \\neg P(a)\\) 需要看 \\(a\\)</strong>：不，代入具体个体后它就是命题逻辑的排中律实例，恒真。</li>
</ul>
<h2>本章小结</h2>
<ul>
<li>谓词 = 带空位的性质/关系模板；代入个体才成命题；量词把「带空位」变成「有真值」。</li>
<li>个体域是隐藏的第二套前提，必须明确。</li>
<li>下一章：全称量词 \\(\\forall\\) 与存在量词 \\(\\exists\\)——谓词逻辑真正的表达能力来自它们。</li>
</ul>`
  },

  {
    id: 'l10', cat: '谓词逻辑', title: '全称量词与存在量词', readTime: '9 分钟',
    points: [
      '\\(\\forall x\\,P(x)\\)：论域中每个个体都使 P 成立才为真；\\(\\exists x\\,P(x)\\)：只要有一个个体使 P 成立即为真',
      '直觉：在有限论域上，\\(\\forall\\) 就是无限合取（全部 AND），\\(\\exists\\) 就是无限析取（全部 OR）',
      '固定搭配：全称量词配蕴含 \\(\\to\\)，存在量词配合取 \\(\\land\\)；写反公式即废',
      '\\(\\exists\\) 只要求「至少一个」，不要求唯一，也不关心剩下的',
      '同一公式在不同论域下真值可能不同，量词语句必须先声明个体域'
    ],
    content: `
<h2>概念</h2>
<p>上一章里 \\(P(x)\\) 带着空位、没有真值。谓词逻辑用两个<strong>量词</strong>把空位「封起来」，让句子重新变回命题：</p>
<table>
<tr><th>符号</th><th>名称</th><th>读法</th><th>什么时候为真</th></tr>
<tr><td>\\(\\forall x\\, P(x)\\)</td><td>全称量词</td><td>「对所有 x，P(x) 成立」</td><td>论域中<strong>每一个</strong>个体都使 \\(P\\) 为真</td></tr>
<tr><td>\\(\\exists x\\, P(x)\\)</td><td>存在量词</td><td>「存在 x 使 P(x) 成立」</td><td>论域中<strong>至少一个</strong>个体使 \\(P\\) 为真</td></tr>
</table>
<p>\\(\\forall x\\) 是 "for <strong>A</strong>ll x" 里 A 的倒写，\\(\\exists x\\) 是 "there <strong>E</strong>xists x" 的 E——符号本身就是提示词。</p>
<h2>直觉解释：量词是写不完的合取与析取</h2>
<p>假设定理讨论的论域恰好是有限集 \\(\\{a, b, c\\}\\)，那么</p>
\\[
\\forall x\\, P(x) \\equiv P(a) \\land P(b) \\land P(c), \\qquad
\\exists x\\, P(x) \\equiv P(a) \\lor P(b) \\lor P(c)
\\]
<p>把论域换成全体自然数，右边就变成写不完的无限串——量词正是为「无限长的合取 / 析取」发明的缩写。顺着第 3 章的脾气立刻能记住：<em>合取见假即假</em>，所以一个反例就能打死 \\(\\forall\\)；<em>析取见真即真</em>，所以一个见证（witness）就能养活 \\(\\exists\\)。</p>
<h2>数学定义</h2>
<p>给公式一个<strong>解释</strong>：指定论域 \\(D\\) 以及每个谓词在 \\(D\\) 上的含义，再规定：</p>
<ul>
<li>\\(\\forall x\\, A(x)\\) 为真，当且仅当对每个 \\(d \\in D\\)，\\(A(d)\\) 都为真；</li>
<li>\\(\\exists x\\, A(x)\\) 为真，当且仅当存在某个 \\(d \\in D\\)，使 \\(A(d)\\) 为真。</li>
</ul>
<p>被量词罩住的变元叫<strong>约束变元</strong>：\\(\\forall x\\, P(x)\\) 与 \\(\\forall y\\, P(y)\\) 是同一个语句，好比改函数形参的名字不影响行为。公式里若还剩自由变元，它就仍不是语句。</p>
<h2>关键搭配：∀ 配 →，∃ 配 ∧</h2>
<p>这是本章最重要的工程守则。论域取「所有人」，\\(Student(x)\\)：x 是学生，\\(StudyMath(x)\\)：x 学数学。</p>
<p><strong>「每个学生都学习数学」</strong>——正确写法：</p>
\\[
\\forall x\\, (Student(x) \\to StudyMath(x))
\\]
<p>它只对「是学生的那部分人」提要求。错误写法 \\(\\forall x\\,(Student(x) \\land StudyMath(x))\\) 则断言「<em>每个人</em>都是学生且都学数学」——门卫、教授、三岁小孩全被它一口咬定是学生，一句话瞬间作废。</p>
<p><strong>「有学生学数学」</strong>——正确写法：</p>
\\[
\\exists x\\, (Student(x) \\land StudyMath(x))
\\]
<p>它要求同一个 x <em>既是学生又学数学</em>。错误写法 \\(\\exists x\\,(Student(x) \\to StudyMath(x))\\) 门槛低得离谱：只要论域里存在任何一个<em>不是</em>学生的人，前件为假、蕴含空真，这句话就被他「见证」为真——哪怕没有一个学生学数学。空真规则（第 3 章）在这里张开了嘴，这就是「写反就废」。</p>
<h2>示例：自然语言 ↔ 形式化对照</h2>
<p>论域为「所有人」；\\(Fail(x)\\)：x 挂过科，\\(Pass(x)\\)：x 及格，\\(PlayGame(x)\\)、\\(Py(x)\\)、\\(Cpp(x)\\) 按字面理解，\\(N(x)\\)：x 是自然数。</p>
<table>
<tr><th>自然语言</th><th>公式</th><th>要点</th></tr>
<tr><td>每个学生都学习数学</td><td>\\(\\forall x\\,(Student(x) \\to StudyMath(x))\\)</td><td>∀ + →</td></tr>
<tr><td>有的学生玩游戏</td><td>\\(\\exists x\\,(Student(x) \\land PlayGame(x))\\)</td><td>∃ + ∧</td></tr>
<tr><td>没有学生挂过科</td><td>\\(\\forall x\\,(Student(x) \\to \\neg Fail(x))\\)</td><td>「没有 S 是 P」译成 ∀→¬</td></tr>
<tr><td>存在一个不学数学的学生</td><td>\\(\\exists x\\,(Student(x) \\land \\neg StudyMath(x))\\)</td><td>∃ + ∧ + ¬（下一章的主角）</td></tr>
<tr><td>存在既会 Python 又会 C++ 的学生</td><td>\\(\\exists x\\,(Student(x) \\land Py(x) \\land Cpp(x))\\)</td><td>多个性质用 ∧ 并列</td></tr>
<tr><td>存在最大的自然数</td><td>\\(\\exists x\\,(N(x) \\land \\forall y\\,(N(y) \\to y \\le x))\\)</td><td>嵌套：先「存在 x」再「对所有 y」</td></tr>
<tr><td>恰有一人及格</td><td>\\(\\exists x\\,(Pass(x) \\land \\forall y\\,(Pass(y) \\to y = x))\\)</td><td>「恰有」= 存在 + 唯一（第 15 章）</td></tr>
</table>
<p>再注意自然语言的陷阱：中文说「学生都要军训」，省略了「所有」，真实含义是 \\(\\forall x\\,(Student(x) \\to \\dots)\\)。翻译时先在心里补全「所有 / 存在」，再套模板。</p>
<h2>论域对真值的影响</h2>
<p>同一条公式，换一个论域真值就可能变：</p>
<table>
<tr><th>公式</th><th>论域 \\(\\mathbb{N}\\)</th><th>论域 \\(\\mathbb{Z}\\)</th><th>论域 \\(\\mathbb{R}\\)</th></tr>
<tr><td>\\(\\forall x\\,(x^2 \\ge x)\\)</td><td>真</td><td>真</td><td>假（\\(x = 0.5\\)）</td></tr>
<tr><td>\\(\\exists x\\,(2x = 1)\\)</td><td>假</td><td>假</td><td>真</td></tr>
<tr><td>\\(\\exists x\\,(x^2 = 2)\\)</td><td>假</td><td>假</td><td>真（\\(x = \\sqrt 2\\)）</td></tr>
</table>
<p>所以严谨的习惯是：<em>先声明论域，再谈真假</em>；或者干脆把范围写进谓词里（\\(\\forall x\\,(N(x) \\to \\dots)\\)），让公式在任何足够大的论域中都表达同一个意思。</p>
<h2>常见错误</h2>
<ul>
<li><strong>∀ 配 ∧、∃ 配 →</strong>：本章头号错误，两种死法见上文——前者把论域里所有对象强行定性，后者被一个空真见证蒙混过关。</li>
<li><strong>以为 \\(\\exists\\) 含「只有一个」</strong>：\\(\\exists\\) 只保证「至少一个」，要表达「恰有一个」必须另加唯一性部分。</li>
<li><strong>把「有些」理解成「大多数」或「一半以上」</strong>：逻辑量词没有比例概念；「存在无穷多个」要老实写成 \\(\\forall n\\, \\exists x\\,(x \\gt n \\land P(x))\\)。</li>
<li><strong>不声明论域</strong>：\\(\\forall x\\,(x^2 \\gt 0)\\) 在实数上假（\\(x = 0\\)），在去掉 0 的集合上真——不写论域，真假无从谈起。</li>
<li><strong>把约束变元当「某个具体的 x」</strong>：\\(\\forall x\\, P(x)\\) 是完整语句，不依赖外部「x 现在等于几」；它含约束变元，不含自由变元。</li>
</ul>
<h2>本章小结</h2>
<ul>
<li>\\(\\forall\\) = 无限合取：见反例即假；\\(\\exists\\) = 无限析取：见见证即真。</li>
<li>模板背到肌肉记忆：「所有 S 是 P」写 \\(\\forall x\\,(S(x) \\to P(x))\\)；「有 S 是 P」写 \\(\\exists x\\,(S(x) \\land P(x))\\)。</li>
<li>量词把谓词变成语句；论域决定语句真假。会写了还不够——下一章学怎么把它们<em>否定</em>掉。</li>
</ul>`
  },

  {
    id: 'l11', cat: '谓词逻辑', title: '量词的否定', readTime: '8 分钟',
    points: [
      '\\(\\neg \\forall x\\, P(x) \\equiv \\exists x\\, \\neg P(x)\\)：「不都是」=「至少有一个不是」',
      '\\(\\neg \\exists x\\, P(x) \\equiv \\forall x\\, \\neg P(x)\\)：「不存在」=「全都不是」',
      '否定 \\(\\forall x\\,(S(x) \\to P(x))\\) 时内部的 \\(\\to\\) 也要变，正确结果是 \\(\\exists x\\,(S(x) \\land \\neg P(x))\\)',
      '量词否定就是德摩根律的无限版：∀ 是无限合取、∃ 是无限析取，否定进来必然互换',
      '反例就是把否定式落到一个具体对象上——第 14、15 章的反证与反驳都从这一步出发'
    ],
    content: `
<h2>概念</h2>
<p>第 3 章已经埋下伏笔：「并非所有学生都及格」<em>不等于</em>「所有学生都不及格」。否定一个量词语句有自己严格的规则，它也是把含糊的自然语言「不」字精确化的核心操作。两条<strong>量词否定律</strong>：</p>
\\[
\\neg \\forall x\\, P(x) \\equiv \\exists x\\, \\neg P(x)
\\qquad
\\neg \\exists x\\, P(x) \\equiv \\forall x\\, \\neg P(x)
\\]
<p>口诀：<strong>否定进域，量词翻转，谓词吃否定</strong>。\\(\\forall\\) 与 \\(\\exists\\) 互为对偶——就像第 5 章德摩根律里 \\(\\land\\) 与 \\(\\lor\\) 在否定下互换一样。</p>
<h2>直觉解释</h2>
<p>要反驳「<em>所有</em>学生都及格了」，需要做什么？不需要让所有人都挂科，只要<strong>抓出一个没及格的学生</strong>：</p>
<blockquote>「并非所有学生都及格」≡「至少有一个学生没及格」。</blockquote>
<p>反过来，要反驳「班里有转学生」，等于宣布「班里<em>每一个</em>人都不是转学生」——否定存在，就要全体都不。</p>
<p>再用第 10 章「∀ 是无限合取」的眼光看一遍。设论域为 \\(\\{a, b, c\\}\\)：</p>
\\[
\\neg \\forall x\\, P(x) \\equiv \\neg(P(a) \\land P(b) \\land P(c)) \\equiv \\neg P(a) \\lor \\neg P(b) \\lor \\neg P(c) \\equiv \\exists x\\, \\neg P(x)
\\]
<p>对无限合取用德摩根律，得到无限析取——量词否定律就是德摩根律的无限版，一条新规则都没有。</p>
<h2>数学定义</h2>
<p>在解释 \\(I\\)（固定论域 \\(D\\) 与谓词含义）下：\\(\\neg \\forall x\\, A(x)\\) 为真，当且仅当存在某个 \\(d \\in D\\) 使 \\(A(d)\\) 为假；\\(\\neg \\exists x\\, A(x)\\) 为真，当且仅当对一切 \\(d \\in D\\)，\\(A(d)\\) 都为假。四种基本形式的否定对照如下：</p>
<table>
<tr><th>原形式</th><th>否定（化简结果）</th><th>否定怎么读</th></tr>
<tr><td>\\(\\forall x\\, P(x)\\)</td><td>\\(\\exists x\\, \\neg P(x)\\)</td><td>不都是：至少一个不是</td></tr>
<tr><td>\\(\\exists x\\, P(x)\\)</td><td>\\(\\forall x\\, \\neg P(x)\\)</td><td>一个都没有：全不是</td></tr>
<tr><td>\\(\\forall x\\, \\neg P(x)\\)</td><td>\\(\\exists x\\, P(x)\\)</td><td>并非全不是：至少一个是</td></tr>
<tr><td>\\(\\exists x\\, \\neg P(x)\\)</td><td>\\(\\forall x\\, P(x)\\)</td><td>没有不是的：全都是</td></tr>
</table>
<p>双重否定 \\(\\neg \\forall x \\neg P(x) \\equiv \\exists x\\, P(x)\\)：「并非所有人都不及格」=「有人及格」。\\(\\neg\\) 每穿过一层量词，量词就翻一次面。</p>
<h2>难点：否定 \\(\\forall x\\,(S(x) \\to P(x))\\)，内部的 → 也要变</h2>
<p>「每个学生都及格」写作 \\(\\forall x\\,(S(x) \\to P(x))\\)。否定它需要<strong>两步</strong>，一步都不能省：</p>
<p><strong>第一步（先翻量词）</strong>：</p>
\\[
\\neg \\forall x\\,(S(x) \\to P(x)) \\equiv \\exists x\\, \\neg (S(x) \\to P(x))
\\]
<p><strong>第二步（再把蕴含否定成合取）</strong>：把 \\(S(x) \\to P(x)\\) 换成 \\(\\neg S(x) \\lor P(x)\\)，用德摩根律把 \\(\\neg\\) 推进去：</p>
\\[
\\neg(\\neg S(x) \\lor P(x)) \\equiv S(x) \\land \\neg P(x)
\\]
<p>合起来：</p>
\\[
\\neg \\forall x\\,(S(x) \\to P(x)) \\equiv \\exists x\\,(S(x) \\land \\neg P(x))
\\]
<p>读成中文：<strong>「存在一个人，他是学生<em>并且</em>没及格」</strong>。为什么内部必须变成 \\(\\land\\)，不能图省事写成 \\(\\exists x\\,(S(x) \\to \\neg P(x))\\)？因为蕴含在前件假时空真——「存在 x 使得如果他不是学生则他没及格」会被任何一个<em>非学生</em>满足，整句话几乎恒真，根本推不翻原命题。真正的反例必须<em>两个条件同时成立</em>：是学生、且没及格。这就是「∀ 配 →，取反变 ∃ 配 ∧」的由来。</p>
<h2>示例</h2>
<p><strong>例 1：否定「存在最大的素数」。</strong>论域为正整数，\\(Prime(x)\\)：x 是素数。原命题形式化：</p>
\\[
\\exists x\\,(Prime(x) \\land \\forall y\\,(Prime(y) \\to y \\le x))
\\]
<p>逐层否定：\\(\\exists\\) 翻 \\(\\forall\\)；否定进入合取时用「\\(\\neg(A \\land B) \\equiv A \\to \\neg B\\)」（吸收进去）；\\(\\forall y\\) 翻 \\(\\exists y\\)；蕴含翻合取：</p>
\\[
\\forall x\\,(Prime(x) \\to \\exists y\\,(Prime(y) \\land y \\gt x))
\\]
<p>中文：「对任何素数 x，都存在比它更大的素数 y」——素数有无穷多个。第 14 章欧几里得的反证法，证的正是这个否定式。</p>
<p><strong>例 2（点到为止）：极限定义的否定。</strong>「数列 \\(a_n\\) 收敛于 \\(A\\)」定义为</p>
\\[
\\forall \\varepsilon \\gt 0\\; \\exists N\\; \\forall n \\gt N\\; (\\lvert a_n - A \\rvert \\lt \\varepsilon)
\\]
<p>把否定逐层推到底，得到「不收敛于 \\(A\\)」：</p>
\\[
\\exists \\varepsilon_0 \\gt 0\\; \\forall N\\; \\exists n \\gt N\\; (\\lvert a_n - A \\rvert \\ge \\varepsilon_0)
\\]
<p>读法：「有一个固定的误差 \\(\\varepsilon_0\\)，无论你报到多靠后的 \\(N\\)，我都找得到一个更靠后的项偏出圈外」。注意 \\(\\forall n \\gt N\\) 是「量词 + 限制条件」的简写，取反后限制 \\(n \\gt N\\) 跟着量词一起换面，只有核心不等式 \\(\\lt\\) 翻成 \\(\\ge\\)。量词与否定纠缠的式子，规则依旧只有这一套。</p>
<h2>常见错误</h2>
<ul>
<li><strong>「不都是」写成「都不是」</strong>：把 \\(\\neg \\forall x\\, P(x)\\) 化成 \\(\\forall x\\, \\neg P(x)\\) 是否过头，正确的下界只是「至少一个不」。</li>
<li><strong>翻量词漏否定谓词</strong>：\\(\\neg \\forall x\\, P(x)\\) 写成 \\(\\exists x\\, P(x)\\)——「有人及格」不是「都及格」的否定。</li>
<li><strong>蕴含否定写成 \\(S(x) \\to \\neg P(x)\\)</strong>：空真陷阱见上文，反例必须是 \\(S(x) \\land \\neg P(x)\\)。</li>
<li><strong>连论域一起否定</strong>：论域是固定的背景板，否定只作用于公式本身，别「顺手」把「在学生范围内」也改掉了。</li>
<li><strong>嵌套否定跳步</strong>：三层量词一口气推到底，总有一层忘翻面。老老实实一层一层推，每步只翻一个量词。</li>
</ul>
<h2>本章小结</h2>
<ul>
<li>两条否定律 \\(\\neg \\forall \\equiv \\exists \\neg\\)、\\(\\neg \\exists \\equiv \\forall \\neg\\)，就是德摩根律的无限版。</li>
<li>否定全称蕴含的标准流程：<em>翻量词 → 蕴含改合取 → 谓词加否定</em>，结果是 \\(\\exists x\\,(S(x) \\land \\neg P(x))\\)。</li>
<li>下一章给量词排顺序：两个量词叠在一起时，就算不做否定，交换顺序也会彻底改变含义。</li>
</ul>`
  },

  {
    id: 'l12', cat: '谓词逻辑', title: '量词的顺序与多重量词', readTime: '9 分钟',
    points: [
      '\\(\\forall x \\exists y\\) 与 \\(\\exists y \\forall x\\) 一般不等价：前者允许 y 随 x 变，后者要求一个 y 通吃所有 x',
      '约定 \\(Likes(x,y)\\) 读作「x 喜欢 y」：「每个人都有喜欢的人」= \\(\\forall x \\exists y\\, Likes(x,y)\\)；「有人被所有人喜欢」= \\(\\exists y \\forall x\\, Likes(x,y)\\)',
      '依赖直觉：\\(\\forall x \\exists y\\) 相当于存在选择函数 \\(y = f(x)\\)；\\(\\exists y \\forall x\\) 要求一个不依赖 x 的万能 y',
      '\\(\\exists y \\forall x\\, A \\to \\forall x \\exists y\\, A\\) 恒真，反向不成立',
      '分析学的 \\(\\forall \\varepsilon \\exists N \\forall n\\) 三重嵌套只是本节规则的连续使用'
    ],
    content: `
<h2>概念</h2>
<p>一个公式里叠多个量词时，<strong>谁先谁后</strong>直接决定含义。本章约定 \\(Likes(x, y)\\) 读作「<em>x 喜欢 y</em>」（第一个位置是喜欢的人，第二个是被喜欢的人）。在这套约定下比较两句话：</p>
<table>
<tr><th>自然语言</th><th>符号</th><th>意思</th></tr>
<tr><td>每个人都有喜欢的人</td><td>\\(\\forall x\\, \\exists y\\, Likes(x, y)\\)</td><td>逐人检查：每人至少喜欢<em>某个人</em>，各人可以喜欢不同对象</td></tr>
<tr><td>有一个人被所有人喜欢</td><td>\\(\\exists y\\, \\forall x\\, Likes(x, y)\\)</td><td>存在一个<em>固定的</em> y，所有人都喜欢这同一个人</td></tr>
</table>
<p>两句话用的谓词相同、量词相同，只是顺序不同——意思天差地别。人人都暗恋不同的偶像，第一句真、第二句假；反之若有一个全民偶像，两句都真。</p>
<h2>直觉解释：y 能不能依赖 x</h2>
<p>判断两个多重量词式的强弱，就问一句：<strong>里面那个 \\(\\exists\\) 的对象，能不能看着外面 \\(\\forall\\) 的对象来挑？</strong></p>
<ul>
<li>\\(\\forall x\\, \\exists y\\)：先把 x 摆上桌，y 再<em>对症下药</em>——每个 x 都可以换一个新 y。相当于存在一个「选择函数」\\(y = f(x)\\)。</li>
<li>\\(\\exists y\\, \\forall x\\)：y 必须在还没见到任何 x 时就拍板定死，之后<em>一个答案应付所有考卷</em>。</li>
</ul>
<p>写成循环更直观：</p>
<pre><code>// ∀x ∃y：内层每轮重新选 y，每个人都可以有不同的答案
for (x of people) { y = pickFor(x); assert(Likes(x, y)); }

// ∃y ∀x：先定死一个 y，再逐个验收，一人不合即全盘失败
y = pickOnce();
for (x of people) { if (!Likes(x, y)) return false; }</code></pre>
<p>先量词翻转的式子更容易满足：\\(\\forall \\exists\\) 弱、\\(\\exists \\forall\\) 强，恒有</p>
\\[
(\\exists y\\, \\forall x\\, A(x,y)) \\to (\\forall x\\, \\exists y\\, A(x,y))
\\]
<p>（有万能 y，当然每个 x 都轮得上一个 y。）反向不成立——上面「暗恋偶像」的例子就是反例。</p>
<h2>数学定义</h2>
<p>在论域 \\(D\\) 与解释 \\(I\\) 下：</p>
<ul>
<li>\\(\\forall x\\, \\exists y\\, A(x,y)\\) 为真，当且仅当：对每个 \\(d_1 \\in D\\)，都存在（<em>可以依赖 \\(d_1\\)</em> 的）\\(d_2 \\in D\\)，使 \\(A(d_1, d_2)\\) 为真；</li>
<li>\\(\\exists y\\, \\forall x\\, A(x,y)\\) 为真，当且仅当：存在某个 \\(d_2^{*} \\in D\\)，使对<em>一切</em> \\(d_1 \\in D\\)，\\(A(d_1, d_2^{*})\\) 都为真。</li>
</ul>
<p>有限论域上还能把嵌套量词摊平成矩阵：\\(\\forall\\exists\\) 要求<strong>每行</strong>至少一个 ✓，\\(\\exists\\forall\\) 要求<strong>某一行整行</strong>全 ✓——下一节的表格就是把这句话画出来。</p>
<h2>示例：一张 3×3 真值表</h2>
<p>论域 \\(\\{a, b, c\\}\\)，\\(Likes\\) 关系如下（行 = 喜欢者，列 = 被喜欢者，✓ 表示该行喜欢该列）：</p>
<table>
<tr><th>Likes</th><th>喜欢 a</th><th>喜欢 b</th><th>喜欢 c</th></tr>
<tr><td>\\(a\\)</td><td></td><td>✓</td><td></td></tr>
<tr><td>\\(b\\)</td><td></td><td></td><td>✓</td></tr>
<tr><td>\\(c\\)</td><td>✓</td><td></td><td></td></tr>
</table>
<p>逐格核对两个式子：</p>
<ul>
<li>\\(\\forall x\\, \\exists y\\, Likes(x,y)\\)：a 喜欢 b ✓，b 喜欢 c ✓，c 喜欢 a ✓——每行都有 ✓，<strong>真</strong>。</li>
<li>\\(\\exists y\\, \\forall x\\, Likes(x,y)\\)：要求某一列全 ✓。列 a 只有 c 打勾、列 b 只有 a、列 c 只有 b——没有全 ✓ 的列，<strong>假</strong>。</li>
</ul>
<p>同一张表、同一批 ✓，两个式子一真一假，量词顺序的杀伤力一目了然。</p>
<h2>示例：数学里的两对经典</h2>
<p>论域实数 \\(\\mathbb{R}\\)：</p>
\\[
\\underbrace{\\forall x\\, \\exists y\\,(x + y = 0)}_{\\text{真：取 } y = -x\\text{，随 } x \\text{ 而变}}
\\qquad
\\underbrace{\\exists y\\, \\forall x\\,(x + y = 0)}_{\\text{假：一个 } y \\text{ 不可能抵消所有 } x}
\\]
<p>论域自然数 \\(\\mathbb{N}\\)：\\(\\forall x\\, \\exists y\\,(y \\gt x)\\) 真（每个数都有后继）；\\(\\exists y\\, \\forall x\\,(y \\gt x)\\) 假（没有最大的自然数当「天花板」）。顺带说明：同类型的相邻量词可以互换——\\(\\forall x\\, \\forall y\\) 与 \\(\\forall y\\, \\forall x\\) 等价，\\(\\exists x\\, \\exists y\\) 同理；<strong>只有 \\(\\forall\\exists\\) 异类混搭时顺序才是命门</strong>。</p>
<h2>三重嵌套怎么读</h2>
<p>分析学「\\(a_n\\) 收敛于 \\(A\\)」的定义把量词叠了三层：</p>
\\[
\\forall \\varepsilon \\gt 0\\; \\exists N\\; \\forall n \\gt N\\; (\\lvert a_n - A \\rvert \\lt \\varepsilon)
\\]
<p>按「外面的先定、里面的看着外面挑」的顺序读：<em>随便</em>你甩来一个苛刻的 \\(\\varepsilon\\)；<em>我</em>据此挑一个 \\(N = f(\\varepsilon)\\)（越苛刻 \\(N\\) 越大）；此后<em>所有</em>更靠后的项都逃不出圈。若把 \\(\\exists N\\) 提到 \\(\\forall \\varepsilon\\) 前面，就变成「一个 \\(N\\) 应付所有精度」——那是荒谬的强命题。读懂任何 \\(\\forall \\exists \\forall\\) 式定义，靠的全是本章这一条直觉。</p>
<h2>常见错误</h2>
<ul>
<li><strong>顺手交换 \\(\\forall\\) 与 \\(\\exists\\) 当「反正差不多」</strong>：3×3 表格就是判决书——强弱立判，方向只有一个。</li>
<li><strong>把「每个人都有喜欢的人」翻成 \\(\\exists y \\forall x\\)</strong>：翻译时先问「y 要不要随 x 变」，要变就写 \\(\\forall x \\exists y\\)。</li>
<li><strong>以为 \\(\\forall \\exists\\) 与 \\(\\exists \\forall\\) 只是「谁先开口」的语感差异</strong>：差的是选择依赖关系，不是语气。</li>
<li><strong>同类型量词也慌着不敢动</strong>：\\(\\forall x \\forall y\\)、\\(\\exists x \\exists y\\) 相邻互换完全等价，不必多虑。</li>
<li><strong>读 ε-N 定义被符号吓退</strong>：逐层套「外先内后、内看着外」的规则，三层也不过是三句话。</li>
</ul>
<h2>本章小结</h2>
<ul>
<li>顺序 = 依赖：\\(\\forall x \\exists y\\) 允许 \\(y = f(x)\\)；\\(\\exists y \\forall x\\) 要求一个万能常数 y。</li>
<li>\\(\\exists \\forall\\) 恒强于 \\(\\forall \\exists\\)，反向不成立；相邻同类量词可互换，异类不可。</li>
<li>谓词逻辑四课到此收官：会写（l09、l10）、会否（l11）、会排（l12）。从下一章起，我们开始用这套语言<strong>写证明</strong>。</li>
</ul>`
  },

  {
    id: 'l13', cat: '证明方法', title: '证明的写法：直接证明与分类讨论', readTime: '9 分钟',
    points: [
      '证明 = 每一步都有依据、可被第三方逐行检查的推理链；第 8 章的推理规则就是它的字母表',
      '直接证 \\(P \\to Q\\) 的模板：设 P 成立 → 展开定义 → 逐步推导 → 所以 Q 成立',
      '第一步几乎总是展开定义：偶数就是「存在整数 k 使 n = 2k」，不展开手里就没有材料',
      '分类讨论两条铁律：分类穷尽（并起来是全体）且两两互斥，每类各自给出结论',
      '例子再多也不是证明；直接证推不动不是失败，是换路的信号（第 14 章）'
    ],
    content: `
<h2>概念</h2>
<p>前十二章我们在<em>分析</em>别人的推理；从本章起要<em>生产</em>自己的推理。<strong>证明（proof）</strong>是从前提（定义、公理、已证定理）出发、每一步都套用第 8 章推理规则、最后得到结论的一条完整链条。它和「说服」的区别只有一条：说服靠听众的善意，证明靠<strong>每一步都可检查</strong>——任何人（包括机器）拿着它逐行验收，挑不出一步没有依据，才算成立。</p>
<h2>直觉解释</h2>
<p>把证明想成<strong>代码评审</strong>：你提交的每一行都要经得起「这行的依据是什么」的追问；引用一个没声明的函数（未证的事实）会被当场打回。而第 8 章的 Modus Ponens、拒取式这些规则，就是评审唯一认账的「语法」。</p>
<p>数学里最常见的定理形如 \\(P \\to Q\\)（「若条件 P，则结论 Q」）。按第 3 章的承诺视角，证 \\(P \\to Q\\) 就是兑现承诺：<strong>只有一种情况需要负责——P 真而 Q 假</strong>。所以证明从「假设 P 真」起步，目标只有一个：把 Q 也立起来。</p>
<h2>数学定义：直接证明的标准格式</h2>
<p>要证的定理若是 \\(\\forall n\\,(P(n) \\to Q(n))\\)，标准书写如下（先任取个体，再假设前件，正是第 8 章规则的展开）：</p>
<blockquote><strong>证明</strong>：设 \\(n\\) 任意，再设 \\(P(n)\\) 成立。……（若干步，每步只用定义或已知事实）…… 可见 \\(Q(n)\\) 成立。故 \\(P \\to Q\\)。∎</blockquote>
<p>「设 P 成立」不是请求许可而是领取原料；「∎」是证毕的句号。两个习惯现在就要养成：<em>结论先改写成 \\(P \\to Q\\) 的形状</em>；<em>用到的定义原样展开写出来</em>。</p>
<h2>示例①：若 n 是偶数，则 n² 是偶数</h2>
<p><strong>命题</strong>：对任意整数 \\(n\\)，若 \\(n\\) 是偶数，则 \\(n^2\\) 是偶数。</p>
<p><strong>证明</strong>：设 \\(n\\) 是偶数。由偶数的定义，存在整数 \\(k\\) 使 \\(n = 2k\\)。于是</p>
\\[
n^2 = (2k)^2 = 4k^2 = 2(2k^2)
\\]
<p>整数对乘法封闭，故 \\(2k^2\\) 仍是整数；记 \\(m = 2k^2\\)，则 \\(n^2 = 2m\\)，按定义 \\(n^2\\) 是偶数。∎</p>
<p>复盘三步：领取原料（\\(n = 2k\\)）→ 朝目标变形（凑出「2 × 整数」的形状）→ 按定义收口。<strong>目标形状决定变形的方向</strong>，这就是直接证明的全部心法。</p>
<h2>示例②：若 n² 是偶数，则 n 是偶数——直接证卡住了</h2>
<p>照猫画虎：设 \\(n^2\\) 是偶数，即存在整数 \\(k\\) 使 \\(n^2 = 2k\\)。下一步？\\(n = \\sqrt{2k}\\)？根号下是整数不说明根号外是整数——绕开定义就没有依据。条件只告诉我们<em>乘积</em> \\(n \\cdot n\\) 里有因子 2，却没说这个 2 落在哪个因子上，而结论恰恰需要「2 落在 \\(n\\) 上」。直接证明无从下手。</p>
<p>但注意结论的<em>反面</em>：「n 是奇数」能展开成 \\(n = 2k + 1\\)——手里立刻有可算的东西！把目标换成「奇数的平方仍是奇数」，问题瞬间解开。<strong>这条路叫逆否证明，本章留下的这个坑，第 14 章来填。</strong>「直接证困难」不是失败，是方法选择的信号。</p>
<h2>分类讨论</h2>
<p>当条件按<strong>互斥且穷尽</strong>的几种情形分别处理时，就该分类讨论。常见触发点：</p>
<ul>
<li><strong>绝对值</strong>：按内部正负拆 \\(x \\ge 0\\) / \\(x \\lt 0\\)；</li>
<li><strong>奇偶</strong>：整数分 \\(2k\\) / \\(2k+1\\)；</li>
<li><strong>符号或大小</strong>：\\(a \\gt b\\)、\\(a = b\\)、\\(a \\lt b\\) 三分；</li>
<li><strong>余数（模分类）</strong>：模 3 分 \\(3k, 3k+1, 3k+2\\) 三类；</li>
<li><strong>参数范围</strong>：方程含参时按 \\(a \\gt 0, a = 0, a \\lt 0\\) 等分段。</li>
</ul>
<p>两条铁律：<strong>穷尽</strong>——各类并起来是全体，一个对象都不许漏；<strong>互斥</strong>——各类不重不漏地切分（边界值分进哪一类都要写明）。每类独立证完，最后合并成结论。</p>
<h2>示例③：n² + n 恒为偶数（奇偶分类）</h2>
<p><strong>命题</strong>：对任意整数 \\(n\\)，\\(n^2 + n\\) 是偶数。</p>
<p><strong>证明</strong>：整数按奇偶二分（穷尽且互斥）：</p>
<ul>
<li><strong>情况 1</strong>：\\(n\\) 为偶数，\\(n = 2k\\)。则 \\(n^2 + n = 4k^2 + 2k = 2(2k^2 + k)\\)，是偶数。</li>
<li><strong>情况 2</strong>：\\(n\\) 为奇数，\\(n = 2k + 1\\)。则 \\(n^2 + n = n(n+1) = (2k+1)(2k+2) = 2(k+1)(2k+1)\\)，是偶数。</li>
</ul>
<p>两类都为偶，故对一切整数 \\(n\\)，\\(n^2 + n\\) 为偶数。∎</p>
<p>绝对值题也是同一套路：解 \\(|x| \\gt 2\\)，按 \\(x \\ge 0\\)（得 \\(x \\gt 2\\)）与 \\(x \\lt 0\\)（\\(-x \\gt 2\\)，得 \\(x \\lt -2\\)）分类，最后取并集 \\(x \\gt 2\\) 或 \\(x \\lt -2\\)。边界 \\(x = 0\\) 分进哪边都不影响结论，但<em>写证明时必须交代</em>。</p>
<h2>常见错误</h2>
<ul>
<li><strong>用例子代替证明</strong>：验算 \\(n = 1, 2, \\dots, 100\\) 全对，对「对一切正整数」依然零强制力——全称命题的敌人藏在第 101 个里（第 15 章有现成的翻车案例）。</li>
<li><strong>循环论证</strong>：把待证结论偷偷写进过程——「因为 Q 成立所以 Q 成立」，或在证明中引用「待证定理」本身。每步追问依据，就能自查是否用了还没挣来的事实。</li>
<li><strong>分类不穷尽</strong>：按「正数、负数」讨论时丢了 0；对实数题只分「奇、偶」两类。分类后默念一遍：还有掉在缝里的对象吗？</li>
<li><strong>「类似可证」滥用</strong>：只有结构真正对称的情况可以略写（情况 2 与情况 1 只差一步，注明对称即可）；「情况 3 太麻烦不写了」不是类似可证，是欠账。</li>
<li><strong>每步不自检依据</strong>：写完一行问「依据是什么？」答不上来的行，评审者同样答不上来。</li>
</ul>
<h2>本章小结</h2>
<ul>
<li>证明 = 逐行有依据的推理链；证 \\(P \\to Q\\) 的模板：<em>设 P → 展开定义 → 算到 Q</em>。</li>
<li>分类讨论：触发看结构（绝对值/奇偶/符号/余数），纪律是穷尽且互斥，收口必须合并。</li>
<li>直接证卡住（如「n² 偶则 n 偶」）时保存好这个疑问——下一章的逆否与反证就是为它准备的。</li>
</ul>`
  },

  {
    id: 'l14', cat: '证明方法', title: '反证法与逆否证明', readTime: '10 分钟',
    points: [
      '逆否证明的逻辑根据：\\(P \\to Q \\equiv \\neg Q \\to \\neg P\\)（第 6 章逆否等价律）——设结论不成立，倒推条件不成立',
      '反证法的逻辑根据：\\(P \\to Q\\) 的否定恰是 \\(P \\land \\neg Q\\)；若它推出矛盾，则原蕴含必真',
      '本章完成第 13 章的坑：「若 \\(n^2\\) 是偶数则 n 是偶数」的逆否证明',
      '两个经典反证：\\(\\sqrt 2\\) 是无理数；欧几里得证素数有无穷多个',
      '反设时结论的否定要按第 11 章量词翻面；「推不动」不等于「推出矛盾」'
    ],
    content: `
<h2>概念</h2>
<p>第 13 章的示例②演示了直接证明的窘境：条件给不出可算的形状。逻辑为这类命题预留了两条名正言顺的「弯路」：</p>
<table>
<tr><th>方法</th><th>逻辑根据</th><th>操作</th></tr>
<tr><td><strong>逆否证明</strong></td><td>\\(P \\to Q \\equiv \\neg Q \\to \\neg P\\)</td><td>「设 \\(\\neg Q\\)，证 \\(\\neg P\\)」——仍是蕴含的直接证，只是换了方向</td></tr>
<tr><td><strong>反证法（归谬）</strong></td><td>\\(P \\to Q\\) 的否定是 \\(P \\land \\neg Q\\)；若 \\(P \\land \\neg Q \\vdash R \\land \\neg R\\)，则该合取永假，原蕴含永真</td><td>「反设条件真而结论假，推到爆炸」</td></tr>
</table>
<p>两者的区别在假设的形状：逆否只领 \\(\\neg Q\\) 这一件原料，目标明确（造出 \\(\\neg P\\)）；反证把 \\(P\\) 与 \\(\\neg Q\\) <em>同时</em>领进车间，然后不挑目标——<strong>任何</strong>矛盾都算完工。</p>
<h2>直觉解释</h2>
<ul>
<li><strong>逆否 = 执果索因</strong>：「地没湿，那雨一定没下」。结论落空的那一刻，条件早已落空——把第 13 章的死胡同倒过来走，「n 是奇数」这种形状远比「n² 是偶数」好算。</li>
<li><strong>反证 = 假设反面，引爆它</strong>：「假如 √2 能写成分数——好，数学大厦要漏了（既约分数不既约）；大厦没漏，所以它写不成分数」。</li>
</ul>
<p>为什么反证合法？回到第 3 章的真值表：蕴含 \\(P \\to Q\\) 想要为假，只有一个入口——「前真后假」。反证法守的正是这个唯一的城门：把 \\(P \\land \\neg Q\\) 立起来，推出矛盾，说明这个入口焊死，于是 \\(P \\to Q\\) 在所有情形下都真。它是穷举法里最省事的一支：只审一种情形，因为它一倒，全案清白。</p>
<h2>数学定义</h2>
<p>把两种方法写成正式的推理格式（\\(R\\) 为任意公式）：</p>
\\[
\\text{逆否法：由 } \\neg Q \\to \\neg P \\text{ 证得 } P \\to Q;
\\qquad
\\text{反证法：由 } P \\land \\neg Q \\vdash R \\land \\neg R \\text{ 证得 } P \\to Q.
\\]
<p>反证所撞出的矛盾不一定是 \\(R \\land \\neg R\\) 的字面形状，与公理、定义、已证定理正面冲突同样算爆炸——示例②撞在「互素」上，示例③撞在「素数不能整除 1」上。</p>
<h2>示例①（逆否，接第 13 章）：若 n² 是偶数，则 n 是偶数</h2>
<p><strong>证明</strong>：证逆否命题：若 \\(n\\) 是奇数，则 \\(n^2\\) 是奇数。设 \\(n = 2k + 1\\)（\\(k\\) 为整数），则</p>
\\[
n^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1
\\]
<p>记 \\(m = 2k^2 + 2k \\in \\mathbb{Z}\\)，则 \\(n^2 = 2m + 1\\) 是奇数。逆否命题得证；由逆否等价律 \\(P \\to Q \\equiv \\neg Q \\to \\neg P\\)，原命题成立。∎</p>
<p>对比第 13 章的卡壳：结论的否定「n 是奇数」自带可计算的形状 \\(2k+1\\)，这正是选择逆否的信号。另外警惕一个陷阱：逆否<em>不是</em>否命题——「n² 偶则 n 偶」的否命题（n² 奇则 n 奇）与「n² 偶则 n 奇」这类写法都不与原命题等价。</p>
<h2>示例②（反证）：√2 是无理数</h2>
<p><strong>证明</strong>：反设结论不成立：\\(\\sqrt 2\\) 是<em>有理数</em>。那么它可以写成既约分数 \\(p/q\\)，即 \\(\\sqrt 2 = p/q\\)，其中 \\(p, q\\) 是整数、\\(q \\neq 0\\)，且 \\(p\\) 与 \\(q\\) <em>互素</em>。两边平方：\\(p^2 = 2q^2\\)。</p>
<p>于是 \\(p^2\\) 是偶数；由示例①（n² 偶则 n 偶），\\(p\\) 也是偶数，记 \\(p = 2s\\)。代回：\\(4s^2 = 2q^2\\)，化简得 \\(q^2 = 2s^2\\)。再用一次示例①：\\(q\\) 也是偶数。</p>
<p>2 同时整除 \\(p\\) 和 \\(q\\)，与「\\(p, q\\) 互素」矛盾！∎</p>
<p>三处复盘：反设给了<em>具体对象</em>（既约分数——每个有理数都能写成既约分数，这个依据要点明）；中途两次调用示例①，先证逆否小定理再反证，衔接得严丝合缝；矛盾必须撞在<em>明确事实</em>（互素）上，不是「感觉不对」。</p>
<h2>示例③（反证）：素数有无穷多个（欧几里得）</h2>
<p><strong>证明</strong>：反设素数只有有限个，把它们<em>全部</em>列出：\\(p_1, p_2, \\dots, p_n\\)。构造</p>
\\[
N = p_1 p_2 \\cdots p_n + 1
\\]
<p>\\(N \\gt 1\\)，所以 \\(N\\) 必有素因子 \\(p\\)（取 \\(N\\) 的大于 1 的最小因子即可）。既然列表号称包含<em>一切</em>素数，\\(p\\) 必等于某个 \\(p_i\\)。但 \\(p \\mid p_1 p_2 \\cdots p_n\\) 且 \\(p \\mid N\\)，于是 \\(p \\mid \\big(N - p_1 p_2 \\cdots p_n\\big) = 1\\)——素数整除 1，矛盾！∎</p>
<p>这正是第 11 章那句「否定『存在最大素数』得到的全称命题」的构造性证法：反设列表有限，我们当场造出列表外的 \\(p\\)。细节提醒：\\(N\\) 本身未必是素数（如 \\(2 \\cdot 3 \\cdot 5 \\cdot 7 \\cdot 11 \\cdot 13 + 1 = 30031 = 59 \\times 509\\)），但它的<em>素因子</em>一定不在表里。</p>
<h2>什么时候用哪种：速查表</h2>
<table>
<tr><th>命题长相</th><th>首选</th><th>理由</th></tr>
<tr><td>结论与条件都明确，且「结论的否定」比结论更好算（奇偶、不等式）</td><td>逆否证明</td><td>\\(\\neg Q\\) 提供强形状（\\(2k+1\\)），目标 \\(\\neg P\\) 单一</td></tr>
<tr><td>结论是否定式：「不存在…」「…是无理数」「A \\(\\neq\\) B」</td><td>反证法</td><td>反设把否定「转正」成具体对象，凭空多出一件原料</td></tr>
<tr><td>结论是「无穷多」「唯一」「至少一个不」</td><td>反证法</td><td>直接证没有抓手，否定后信息量大增</td></tr>
<tr><td>结论是析取（「A 或 B 有一个成立」）</td><td>反证法</td><td>否定后变成 \\(\\neg A \\land \\neg B\\)，两件事都归你用</td></tr>
</table>
<p>拿不准就各走三步：逆否与反证经常互为表里（示例②的反证里嵌着示例①的逆否）。证明是探索，规则只负责事后验收。</p>
<h2>常见错误</h2>
<ul>
<li><strong>结论否定错</strong>：反证第一杀手。结论含量词时必须按第 11 章翻面——「所有学生都及格」的反设是「存在一个学生没及格」，不是「所有学生都没及格」。</li>
<li><strong>推出的不是真矛盾</strong>：矛盾必须是 \\(R \\land \\neg R\\) 形状，或与公理、定义、已证定理正面冲突。「结果很丑」「不符合直觉」都不算爆炸。</li>
<li><strong>把「证不出来」当反证成功</strong>：推了十分钟没找到矛盾，只能说明方法没选对，不能说明假设是错的。</li>
<li><strong>假设了要证的结论</strong>：反证合法的原料是 \\(P\\) 与 \\(\\neg Q\\)；把 \\(Q\\) 写进假设是用结论证结论，纯循环。</li>
<li><strong>收尾不清</strong>：必须明写「矛盾，故反设不成立，从而原命题成立」——宣布炸掉的是<em>哪个</em>假设、救回的是<em>哪个</em>结论。</li>
</ul>
<h2>本章小结</h2>
<ul>
<li>逆否：借 \\(P \\to Q \\equiv \\neg Q \\to \\neg P\\) 换方向；反证：借 \\(P \\to Q\\) 等价于 \\(\\neg(P \\land \\neg Q)\\) 掀桌子。</li>
<li>三连跳回顾：n² 偶则 n 偶（逆否）→ √2 无理（反证）→ 素数无穷（反证 + 构造），每一步的依据都来自前两章。</li>
<li>反设清单三件套：<em>正确否定结论（量词翻面）→ 认真推 → 指出撞在哪条已知事实的矛盾上</em>。</li>
</ul>`
  },

  {
    id: 'l15', cat: '证明方法', title: '存在性证明与反例', readTime: '8 分钟',
    points: [
      '证 \\(\\exists x\\, P(x)\\) 两条路：构造性证明直接交出见证并验证；非构造性证明只论证「一定有」，不指明是谁',
      '经典非构造论证：存在无理数 a、b 使 \\(a^b\\) 为有理数——对 \\(\\sqrt 2^{\\sqrt 2}\\) 分有理、无理两支讨论',
      '唯一性证明两步曲：先证存在，再设两个都满足、证它们相等',
      '一个反例足以推翻全称命题，一万个正例也不能证明它——反例就是 \\(\\exists x\\, \\neg P(x)\\) 的见证',
      '推翻 \\(P \\to Q\\) 的反例必须前真后假；否命题、逆命题都没有推翻资格'
    ],
    content: `
<h2>概念</h2>
<p>存在量词 \\(\\exists x\\, P(x)\\) 的语义是「至少一个个体使 P 成立」（第 10 章），所以证「存在」天然有两条路：</p>
<table>
<tr><th>路线</th><th>做法</th><th>一句话类比</th></tr>
<tr><td><strong>构造性证明</strong></td><td>给出见证 \\(c\\)，再验证 \\(P(c)\\)</td><td>「谁中了奖？我，奖在这。」</td></tr>
<tr><td><strong>非构造性证明</strong></td><td>只推出「至少存在一个」，全程不指明是谁</td><td>「宿舍一定有人回来过」——钥匙在桌上，但没看见人</td></tr>
</table>
<p>构造性证明是计算机科学的挚爱：交出对象往往就附带了算法。非构造证明在经典逻辑里完全合法（排中律背书），只是「不解渴」。</p>
<h2>直觉解释</h2>
<p>生活里就有一枚非构造论证：北京超过两千万人，人头发数不超过二十万，按抽屉原理必有两人头发数相同——但我们<em>叫不出这两个人的名字</em>。「存在」的证明可以纯靠计数完成，见证缺席、结论照样成立。</p>
<h2>示例①：构造性——一行就够</h2>
<p><strong>命题</strong>：存在正整数 \\(a, b, c\\) 使 \\(a^2 + b^2 = c^2\\)。</p>
<p><strong>证明</strong>：取 \\(a = 3,\\ b = 4,\\ c = 5\\)，验证 \\(9 + 16 = 25\\)。∎</p>
<p>存在性证明可以短到一行——「找」是难题，「验」是机械。写完后别忘了交代见证都在正整数范围内。</p>
<h2>示例②：非构造经典——存在无理数 a、b 使 a^b 为有理数</h2>
<p><strong>证明</strong>：盯住一个数 \\(r = \\sqrt 2^{\\sqrt 2}\\)。由排中律，它或有理或无理，两支讨论：</p>
<ul>
<li><strong>支 1</strong>：设 \\(r\\) 无理。取 \\(a = r = \\sqrt 2^{\\sqrt 2}\\)、\\(b = \\sqrt 2\\)（两个都是无理数），则</li>
</ul>
\\[
a^b = \\left(\\sqrt 2^{\\sqrt 2}\\right)^{\\sqrt 2} = \\sqrt 2^{\\sqrt 2 \\times \\sqrt 2} = \\sqrt 2^{\\,2} = 2
\\]
<p>2 是有理数，命题成立。</p>
<ul>
<li><strong>支 2</strong>：设 \\(r\\) 有理。直接取 \\(a = b = \\sqrt 2\\)，则 \\(a^b = r\\) 为有理数，命题成立。</li>
</ul>
<p>两支都通向「存在无理数 \\(a, b\\) 使 \\(a^b\\) 为有理数」，故命题得证。∎ 全程没交代 \\(r\\) 到底属于哪一支——事实上（由 Gelfond–Schneider 定理）支 1 才是真相，但本证明不需要知道这一点。这就是非构造性的准确含义：<strong>存在被锁死，身份成谜</strong>。</p>
<h2>数学定义：唯一性证明两步曲</h2>
<p>「存在<em>恰一个</em> x 满足 \\(P(x)\\)」的形式化（第 10 章已见过）：</p>
\\[
\\exists x\\,\\big(P(x) \\land \\forall y\\,(P(y) \\to y = x)\\big)
\\]
<p>对应的证明模板分两步：<strong>存在</strong>——按上面任一条路交出一个 x；<strong>唯一</strong>——<em>假设有两个</em> \\(x_1, x_2\\) 都满足 P，推出 \\(x_1 = x_2\\)。示范（加单位唯一）：设 \\(e_1, e_2\\) 都满足「对一切 \\(x\\)，\\(x + e = x\\)」，则</p>
\\[
e_1 = e_1 + e_2 = e_2
\\]
<p>第一个等号用 \\(e_2\\) 的性质，第二个用 \\(e_1\\) 的性质——「交叉引用」是唯一性证明的招牌动作。</p>
<h2>示例③：反例——一个就封喉</h2>
<p>第 11 章的机器在这里上岗：</p>
\\[
\\neg \\forall x\\, P(x) \\equiv \\exists x\\, \\neg P(x)
\\]
<p><strong>一个反例足以推翻全称命题；再多正例也不能证明它。</strong>举反例 = 交出否定式的见证。三条「看起来对」的命题和它们的死法：</p>
<table>
<tr><th>命题</th><th>反例</th><th>核验</th></tr>
<tr><td>所有素数都是奇数</td><td>\\(2\\)</td><td>2 既是素数又是偶数；全称阵亡于这一个对象</td></tr>
<tr><td>若 \\(a \\mid bc\\)，则 \\(a \\mid b\\) 或 \\(a \\mid c\\)</td><td>\\(a = 6, b = 2, c = 3\\)</td><td>\\(6 \\mid 2 \\cdot 3\\) 真，但 \\(6 \\nmid 2\\) 且 \\(6 \\nmid 3\\)。条件换成 a 为素数才成立</td></tr>
<tr><td>对一切实数 x，\\(x^2 \\gt x\\)</td><td>\\(x = 0.5\\)</td><td>\\(0.25 \\lt 0.5\\)（\\(x = 0, 1\\) 时相等，同样不满足 \\(\\gt\\)）</td></tr>
</table>
<p>反例的格式纪律：要推翻蕴含 \\(P \\to Q\\)，见证必须<strong>前件真、后件假</strong>（第 6 章）。前件都不真的对象没资格反例——它只是空真路过。</p>
<h2>反例、否命题、命题的否定</h2>
<p>三个词容易搅成一团，用第 6、11 章的零件拆开：</p>
<ul>
<li><strong>命题的否定</strong>：\\(\\neg(P \\to Q) \\equiv P \\land \\neg Q\\)——一个「状态描述」，说反例该长什么样；</li>
<li><strong>反例</strong>：让该否定式为真的<em>一个具体对象</em>（如 \\(a = 6, b = 2, c = 3\\)）；</li>
<li><strong>否命题</strong> \\(\\neg P \\to \\neg Q\\)、<strong>逆命题</strong> \\(Q \\to P\\)：都是与原命题<em>平行的句子</em>，与「推翻原命题」毫无关系——反驳请用反例，别拿改写当证据。</li>
</ul>
<p>与计算机的渊源：软件测试只能证明「有 bug」（一个反例），永远不能证明「无 bug」（那是全称命题，需要证明）——这正是第 17 章形式化验证存在的原因。</p>
<h2>常见错误</h2>
<ul>
<li><strong>测了大量正例就当证毕</strong>：「\\(n\\) 从 1 验到 1000 都成立」对 \\(\\forall n \\in \\mathbb{N}^+\\) 零强制力——第 16 章的归纳法才是全称命题的正路。</li>
<li><strong>反例不落在点上</strong>：反驳 \\(P \\to Q\\) 却交出一个 \\(P\\) 为假的对象，等于没反驳。</li>
<li><strong>把非构造证明当耍赖</strong>：数学的「存在」门槛就是第 10 章的 \\(\\exists\\)，不是「造得出来」；两种证明在逻辑上等价地硬。</li>
<li><strong>唯一性只证存在</strong>：「恰有一个」缺第二步就是「至少有一个」，结论降了一档。</li>
<li><strong>「找不到反例」当证明</strong>：搜索有限 ≠ 不存在——哥德巴赫猜想验到天文数字，依然是猜想。</li>
</ul>
<h2>本章小结</h2>
<ul>
<li>存在命题：能点名就点名（构造 + 验证）；点不了名就借排中律分情况（非构造）。</li>
<li>唯一性 = 存在 + 「任意两个必相等」（交叉引用套路）。</li>
<li>反例是 \\(\\exists x\\, \\neg P(x)\\) 的见证，蕴含式反例必须前真后假；全称怕一个反例，正例堆不成定理。</li>
</ul>`
  },

  {
    id: 'l16', cat: '证明方法', title: '数学归纳法', readTime: '11 分钟',
    points: [
      '归纳法原理：\\(P(1)\\) 真，且对一切 \\(k\\) 有 \\(P(k) \\to P(k+1)\\) 真，则对一切正整数 \\(P(n)\\) 真——多米诺骨牌的两根腿',
      '三步分工：Base Case 推倒第一张；归纳假设 IH 是「第 k 张已倒」的临时前提；Inductive Step 只负责 k 到 k+1 的传动',
      '归纳步骤必须真正用到 IH；通篇不碰 IH 的证明不是归纳证明，八成藏着洞',
      '变体：基例可从 \\(n_0\\) 起（只断言 \\(n \\ge n_0\\)）；强归纳法假设 \\(P(1) \\dots P(k)\\) 全体成立',
      '递归程序的正确性证明就是归纳：递归出口对应基例，「递归调用已正确」正是归纳假设'
    ],
    content: `
<h2>概念</h2>
<p>要对<em>无穷多个</em>正整数逐一验证命题 \\(P(n)\\)，一个一个证是死路（第 15 章刚警告过「验算到一千万」的用法）。数学归纳法把无穷压缩成两件事：</p>
<ul>
<li><strong>基例（Base Case）</strong>：\\(P(1)\\) 为真；</li>
<li><strong>归纳步骤（Inductive Step）</strong>：对<em>任意</em> \\(k \\ge 1\\)，若 \\(P(k)\\) 为真则 \\(P(k+1)\\) 为真。</li>
</ul>
<p>两条同时成立，就 concludes「对所有正整数 \\(n\\)，\\(P(n)\\) 为真」。中间那句「若 \\(P(k)\\)」的临时假设，叫<strong>归纳假设（IH）</strong>。</p>
<h2>直觉解释：多米诺骨牌</h2>
<p>把 \\(P(1), P(2), P(3), \\dots\\) 排成一列无限长的骨牌。证明只需两句话：<strong>第一张被推倒</strong>（基例）；<strong>任何一张倒下都会带倒下一张</strong>（归纳步骤）。于是第二张倒（用 k=1）、第三张倒（用 k=2）……每颗骨牌倒下时只需负责<em>下一颗</em>，无穷多米诺全部放倒。</p>
<p>反过来也解释了为什么「验一万项」不算证明：骨牌哪怕前一万张都乖乖倒了，第一万零一张和第万张之间<em>没有传动装置</em>，照样立着。归纳步骤卖的正是「任意两张之间」的通用传动。</p>
<h2>数学定义</h2>
<p><strong>归纳原理</strong>：设 \\(P(n)\\) 是关于 \\(n \\in \\mathbb{N}^+\\) 的命题。若</p>
\\[
P(1) \\text{ 真}, \\qquad \\forall k \\ge 1\\, \\big(P(k) \\to P(k+1)\\big) \\text{ 真},
\\]
<p>则 \\(\\forall n \\ge 1\\, P(n)\\) 真。它是自然数的公理性事实（与「非空自然数集有最小元」等价）：若结论不成立，反例集合有最小元 \\(m\\)；\\(m\\) 不可能是 1（基例真），故 \\(P(m-1)\\) 真，由归纳步骤 \\(P(m)\\) 也真——与「m 是最小反例」矛盾。</p>
<table>
<tr><th>部件</th><th>职责</th><th>最容易犯的错</th></tr>
<tr><td>Base Case</td><td>推倒第一张</td><td>省略或「显然」带过</td></tr>
<tr><td>Inductive Hypothesis</td><td>假设 \\(P(k)\\) 真（\\(k\\) 任意但固定）</td><td>假设成「对所有 n 成立」——把结论预支了</td></tr>
<tr><td>Inductive Step</td><td>由 IH 推出 \\(P(k+1)\\)</td><td>全程没用 IH 的「伪归纳」</td></tr>
</table>
<h2>示例①（完整证明）：\\(1 + 2 + \\cdots + n = \\frac{n(n+1)}{2}\\)</h2>
<p><strong>命题</strong>：对一切 \\(n \\ge 1\\)，令 \\(P(n)\\) 为 \\(1 + 2 + \\cdots + n = \\frac{n(n+1)}{2}\\)。</p>
<p><strong>证明</strong>（对 \\(n\\) 归纳）：</p>
<p><strong>基例</strong> \\(n = 1\\)：左边 \\(= 1\\)，右边 \\(= \\frac{1 \\times 2}{2} = 1\\)，\\(P(1)\\) 真。</p>
<p><strong>归纳假设</strong>：设 \\(k \\ge 1\\) 且 \\(P(k)\\) 真，即 \\(1 + 2 + \\cdots + k = \\frac{k(k+1)}{2}\\)。</p>
<p><strong>归纳步骤</strong>：证 \\(P(k+1)\\)，即 \\(1 + 2 + \\cdots + k + (k+1) = \\frac{(k+1)(k+2)}{2}\\)。从左边出发，前 \\(k\\) 项恰是 IH 的左边，<em>此处使用归纳假设</em>：</p>
\\[
\\underbrace{1 + 2 + \\cdots + k}_{\\text{用 IH 替换}} + (k+1)
= \\frac{k(k+1)}{2} + (k+1)
= \\frac{k(k+1) + 2(k+1)}{2}
= \\frac{(k+1)(k+2)}{2}
\\]
<p>这正是 \\(P(k+1)\\) 的右边（把公式中的 \\(n\\) 换成 \\(k+1\\)）。</p>
<p><strong>结论</strong>：由数学归纳法，对一切 \\(n \\ge 1\\) 等式成立。∎</p>
<p>复盘：全部机关在「把 \\(k+1\\) 项的和拆成<em>前 k 项</em>加零头」——只有这种拆法能让 IH 恰好接上。写归纳证明先问：<strong>哪一块是 IH？</strong></p>
<h2>示例②（完整证明）：对一切正整数 n，\\(2^n \\gt n\\)</h2>
<p><strong>证明</strong>（对 \\(n\\) 归纳）：</p>
<p><strong>基例</strong> \\(n = 1\\)：\\(2^1 = 2 \\gt 1\\) ✓。</p>
<p><strong>归纳假设</strong>：设 \\(2^k \\gt k\\)。</p>
<p><strong>归纳步骤</strong>：</p>
\\[
2^{k+1} = 2 \\cdot 2^k \\gt 2k = k + k \\ge k + 1
\\]
<p>第一步恒等变形；第二步<strong>用 IH</strong> 把 \\(2^k\\) 换成下界 \\(k\\)；第三步因 \\(k \\ge 1\\) 有 \\(k + k \\ge k + 1\\)。于是 \\(2^{k+1} \\gt k + 1\\)，即 \\(P(k+1)\\)。<strong>结论</strong>：由归纳法，对一切 \\(n \\ge 1\\)，\\(2^n \\gt n\\)。∎</p>
<p>不等式归纳题的命门在「放大缩小的方向」：每一处 \\(\\gt\\) 或 \\(\\ge\\) 都要注明依据（IH 或某个 \\(k \\ge 1\\)），含糊一步全盘皆输。</p>
<h2>错误示范：基例起点错位</h2>
<p>下面这份「证明」错在哪？</p>
<blockquote><strong>「证明」</strong>：命题「对一切正整数 \\(n\\)，\\(n^2 \\gt n\\)」。归纳步骤：设 \\(k^2 \\gt k\\)，则 \\((k+1)^2 = k^2 + 2k + 1 \\gt k + 2k + 1 = 3k + 1 \\gt k + 1\\)，即 \\(P(k+1)\\)。<strong>证毕。</strong></blockquote>
<p>步骤本身无懈可击（用了 IH，也用了 \\(k \\ge 1\\)），<strong>但它没做基例</strong>。补做：\\(n = 1\\) 时 \\(1^2 = 1\\)，「\\(1 \\gt 1\\)」为假——骨牌第一张根本没倒，步骤再漂亮也只是「如果第一张倒的话」。真相：命题对 \\(n = 1\\) 假、对一切 \\(n \\ge 2\\) 真。正确写法是把起点改到 \\(n_0 = 2\\)：基例 \\(2^2 = 4 \\gt 2\\) ✓，归纳步骤对 \\(k \\ge 2\\) 照抄。这个案例同时演示了两件事：<strong>基例不可省、起点要核对</strong>。</p>
<p>另一条暗坑自查法：把 IH 划掉，归纳步骤还能走通吗？走不通，才说明真的用了它；若划掉照样通，你写的其实是直接证明，「归纳」只是贴上去的标签。</p>
<h2>变体：强归纳与一般起点</h2>
<p><strong>从 \\(n_0\\) 起</strong>：要证「对一切 \\(n \\ge n_0\\)，\\(P(n)\\)」，基例改验 \\(P(n_0)\\)，步骤对 \\(k \\ge n_0\\) 证明。例：\\(2^n \\gt n^2\\) 对一切 \\(n \\ge 5\\) 成立——基例 \\(32 \\gt 25\\)，步骤用 \\(2^{k+1} = 2 \\cdot 2^k \\gt 2k^2 \\ge (k+1)^2\\)（最后一步验证需 \\(k \\ge 5\\)）。</p>
<p><strong>强归纳法</strong>：假设升级为「\\(P(1), P(2), \\dots, P(k)\\) <em>全部</em>成立」再证 \\(P(k+1)\\)——允许前 k 张骨牌全体使劲。经典用例是算术基本定理（每个大于 1 的整数都能写成素数之积）：对 \\(n\\)，若它是素数则完事；否则 \\(n = ab\\) 且 \\(1 \\lt a, b \\lt n\\)，对更小的 \\(a, b\\) 动用假设。强归纳与普通归纳在自然数上等价，只是「假设更肥、义务更小」。</p>
<h2>与计算机科学的关系</h2>
<p>递归程序的正确性证明<em>就是</em>归纳法，一一对应：</p>
<ul>
<li>递归出口（如 \\(n = 0\\) 直接 return）↔ 基例；</li>
<li>「规模更小的递归调用已经算对」↔ 归纳假设——程序运行时信它，<em>证明者</em>用它；</li>
<li>把递归结果加工成当前答案的那段代码 ↔ 归纳步骤。</li>
</ul>
<p>例如用归纳证明「递归版 <code>sum(1..n)</code> 总输出 \\(n(n+1)/2\\)」：基例 \\(n = 0\\) 返回 0；步骤把 <code>n + sum(n-1)</code> 里的 <code>sum(n-1)</code> 用 IH 替换——与示例①是同一张骨牌图。循环的证明用「循环不变式 + 对轮数归纳」，细节留到第 17 章。</p>
<h2>常见错误</h2>
<ul>
<li><strong>不写基例或嘴上写「显然」</strong>：本节错误示范的教训——基例要真算。</li>
<li><strong>归纳假设用假公式</strong>：先把 \\(P(k)\\) 一字不差抄出来，代入时只能替换这个式子；把结论改写成另一条「看着差不多」的不等式，链条必断。</li>
<li><strong>步骤全程不碰 IH</strong>：要么其实是直接证明（标签贴错），要么某步偷偷默认了结论——划掉 IH 自查。</li>
<li><strong>起点错位还硬证</strong>：发现 \\(n_0\\) 处命题为假时，正确动作是把断言改成 \\(n \\ge n_0'\\)，不是篡改算式。</li>
<li><strong>以为归纳只能证等式</strong>：不等式、整除性（如「\\(n^3 - n\\) 被 6 整除」）、集合与串的长度命题，全都可以归纳——只要命题写成了 \\(P(n)\\)。</li>
</ul>
<h2>本章小结</h2>
<ul>
<li>三步模板：<em>写出 \\(P(n)\\) → 验 \\(P(1)\\)（或 \\(P(n_0)\\)）→ 设 IH、推出 \\(P(k+1)\\)（必须用 IH）→ 归纳结论</em>。</li>
<li>强归纳多拿假设，起点变体挪基例——同一副骨牌的三种摆法。</li>
<li>证明方法篇收官：直接/分类（l13）、逆否/反证（l14）、存在/反例（l15）、归纳（l16）。最后一章带这套兵器去看计算机。</li>
</ul>`
  },

  {
    id: 'l17', cat: '计算机逻辑', title: '数理逻辑与计算机科学', readTime: '10 分钟',
    points: [
      'if 条件、数字电路、数据库查询，跑的是同一套联结词与等价律（第 3、5 章）',
      '程序正确性也能写证明：Hoare 三元组 \\(\\{P\\}\\ C\\ \\{Q\\}\\) 是前置/后置条件的契约，循环不变式就是对执行轮数用归纳法',
      'SAT 是第一个 NP 完全问题：第 4 章的 \\(2^n\\) 暴力与第 7 章的 CNF 在这里会师',
      'Curry–Howard 对应一句话版：命题即类型、证明即程序——Modus Ponens（第 8 章）原来越来越像一次函数调用',
      'Lean / Coq / Isabelle 等证明助手让定理像代码一样编译通过，数学与程序共享同一套逻辑地基'
    ],
    content: `
<h2>概念：逻辑是计算机的母语</h2>
<p>全书五级台阶在第 1 章就立好了路牌：逻辑基础 → 命题逻辑 → 谓词逻辑 → 证明方法 → 计算机逻辑。最后一章不发新兵器，只回头清点：你会发现自己写的每个 <code>if</code>、见过的每个门电路、跑过的每条查询，都是一条数理逻辑公式在值班。</p>
<h2>直觉解释：同一命题的三种存在形态</h2>
<p>命题 \\(\\neg(P \\land Q) \\equiv \\neg P \\lor \\neg Q\\) 在三个世界里是同一件事：在代码里，它是两处可以互换的 <code>if</code>；在芯片上，它是两张等价的门电路图；在数据库里，它是两条返回相同结果的查询。<strong>逻辑研究的是真值，至于真值由电流、CPU 还是证明器来给出，它一概不管</strong>——这正是第 1 章「形式化」承诺的兑现。</p>
<h2>数学定义</h2>
<p>本章用到两句话就能说清的「定义」：公式 \\(F\\) 是<strong>可满足的</strong>（satisfiable），若存在一组真值指派使 \\(F\\) 为真，判定「给定 \\(F\\) 是否可满足」的问题即 <strong>SAT</strong>；Hoare 三元组 \\(\\{P\\}\\ C\\ \\{Q\\}\\) 为真，当且仅当「从任何使 \\(P\\) 成立的输入执行程序 \\(C\\)，只要 \\(C\\) 终止，结果就满足 \\(Q\\)」——它其实就是把蕴含 \\(P \\to Q\\) 插进了程序的头尾。</p>
<h2>示例：用德摩根改写 if 条件</h2>
<pre><code>// 原条件：a 不在区间 [0,9] 内，且 b 不为 0 时执行
if (!(a &gt;= 0 &amp;&amp; a &lt;= 9) &amp;&amp; !(b != 0)) { ... }

// ¬(A∧B) ≡ ¬A∨¬B；「a 不在 [0,9]」= a &lt; 0 或 a &gt; 9，于是：
if (a &lt; 0 || a &gt; 9 || b == 0) { ... }   // 行为完全等价，取反嵌套消失</code></pre>
<p>C++ 里同理：<code>!(x &amp;&amp; y)</code> 永远可以改写成 <code>!x || !y</code>。编译器优化条件跳转、你重构「读三遍才懂」的判断语句，用的都是第 5 章那张等价律表。</p>
<h2>数字电路</h2>
<p>与门、或门、非门就是 \\(\\land\\)、\\(\\lor\\)、\\(\\neg\\) 的硅基实现；第 4 章的真值表是电路的规格书，「组合逻辑综合」就是把公式烧进芯片。半加器一句话：<code>Sum = x ⊕ y</code>（异或门）、<code>Carry = x AND y</code>（与门）——第 3 章认识的 \\(\\oplus\\) 在这里领工资。</p>
<h2>程序正确性：给代码写证明</h2>
<ul>
<li><strong>断言</strong>：<code>assert(cond)</code> 是程序在运行途中对逻辑的宣誓——走到此处 cond 必须为真，否则当场报错，等于推理链断裂。</li>
<li><strong>前置/后置条件</strong>：\\(\\{P\\}\\ C\\ \\{Q\\}\\) 读作契约：「\\(C\\) 信任 \\(P\\)（调用方保证），承诺交出 \\(Q\\)」。</li>
<li><strong>循环不变式</strong>：找一条「进循环前真、每轮保持真」的性质 I，退出时 I ∧ 条件取假 ⟹ 后置条件。而「I 对每一轮都真」靠什么证？——<strong>对轮数做数学归纳</strong>（第 16 章）：循环前的 I 是基例，「保真」就是归纳步骤。第 15 章还说过：测试只配举反例，证明才配谈全称。</li>
</ul>
<h2>SAT 与 NP 完全</h2>
<p>第 4 章埋的雷在此引爆：\\(n\\) 个变量有 \\(2^n\\) 种指派，暴力查表必然指数爆炸。把公式化成 CNF（第 7 章）再问「有没有指派让每条子句同时为真」，就是 <strong>SAT 问题</strong>——历史上第一个被证明 <strong>NP 完全</strong>的问题：验证、规划、调度、软硬件纠错等海量难题都能高效<em>改写</em>成它。好消息是：现代 SAT/SMT 求解器靠冲突学习疯狂剪枝，百万变量的实际实例常常秒出——最坏情形仍是指数，但工程早已不等最坏情形。</p>
<h2>自动定理证明与逻辑编程</h2>
<p>第 8 章的推理规则交给机器执行，就是自动定理证明：归结原理驱动的求解器能自动判定命题公式的不可满足性；Prolog 程序干脆就是「事实 + 规则」的 Horn 子句库，你写的查询由引擎做机械化推理——程序即逻辑，执行即证明。</p>
<h2>把证明交给机器：一个 Lean 示例</h2>
<p>Lean / Coq / Isabelle 这类<strong>证明助手</strong>里，定理写成类型，证明写成程序，编译器逐行检查推理——上面所有话题（逻辑、程序、验证）在此汇成一点。一个极简 Lean 示例：</p>
<pre><code>example (P Q : Prop) (h1 : P → Q) (h2 : P) : Q := by
  exact h1 h2</code></pre>
<p>逐行读：第一行声明两个命题 \\(P, Q\\)、假设 \\(h_1 : P \\to Q\\)（若 P 则 Q）与 \\(h_2 : P\\)（P 成立），冒号后的 \\(Q\\) 是待证目标，<code>:= by</code> 开始给证明。第二行 <code>exact h1 h2</code>：把 \\(h_1\\) 看成一个<strong>函数类型</strong>——输入一个 \\(P\\)、返回一个 \\(Q\\)；把 \\(h_1\\) 作用到 \\(h_2\\) 上，得到的正是 \\(Q\\)，目标关闭，证明完成。</p>
<p>这不就是第 8 章的 <strong>Modus Ponens</strong> \\(P \\to Q,\\ P \\vdash\\ Q\\) 吗？「若 P 则 Q」+「P」得到「Q」，只是换了一身衣服：蕴含是函数类型，前提是实参，推理是函数调用——「证明即程序」说的就是这个 <code>h1 h2</code>。Curry–Howard 对应（命题即类型、证明即程序）是本章唯一一次露脸，以后在类型系统、程序验证的课程里你会与它重逢。</p>
<h2>全课程回顾地图</h2>
<table>
<tr><th>阶段</th><th>章节</th><th>打通了什么</th></tr>
<tr><td>逻辑基础</td><td>l01–l04</td><td>命题有真假、联结词是真值函数、真值表是语义裁判——顺便领教了 \\(2^n\\) 的规模</td></tr>
<tr><td>命题逻辑</td><td>l05–l08</td><td>等价可替换（化简）、四命题不互证（防错）、范式定形（进机器）、推理规则立章法（会论证）</td></tr>
<tr><td>谓词逻辑</td><td>l09–l12</td><td>「所有 / 存在」的完整拼写法：量词搭配、否定翻面、顺序依赖</td></tr>
<tr><td>证明方法</td><td>l13–l16</td><td>直接 / 分类、逆否 / 反证、构造 / 反例、归纳——把讲道理变成可验收的成品</td></tr>
<tr><td>计算机逻辑</td><td>l17</td><td>逻辑落地为条件语句、电路、验证、SAT 求解器与证明助手</td></tr>
</table>
<h2>推荐阅读</h2>
<ul>
<li>站内衔接：递归与归纳是同一副骨牌，去数据结构篇看 <a href="#/ds/ds18">递归与分治</a>。</li>
<li><a href="https://books.google.com/books?id=H89JEAAAQBAJ" target="_blank" rel="noopener noreferrer">Daniel J. Velleman《How to Prove It: A Structured Approach》</a>——证明写作入门的标准教材，与第 13–16 章互为镜像。</li>
<li><a href="https://leanprover-community.github.io/" target="_blank" rel="noopener noreferrer">Lean 证明助手社区</a>——官方下载、教程与数学库 mathlib 的入口。</li>
<li><a href="https://natural-number.game/" target="_blank" rel="noopener noreferrer">The Natural Number Game</a>——Lean 官方互动教程，用本章的 <code>h1 h2</code> 式手法亲手证明一遍第 16 章的归纳原理。</li>
</ul>
<h2>常见错误</h2>
<ul>
<li><strong>「测试跑过了就是对」</strong>：测试只能证伪（第 15 章），正确性要交给不变式与归纳证明。</li>
<li><strong>与取反嵌套硬拼</strong>：条件读三遍不懂，先德摩根化到最少 <code>!</code> 再读，别靠意志力。</li>
<li><strong>把 NP 完全当「永远算不动」</strong>：它的准确含义是「这批难题可以互相高效转化，找不到捷径但也没判死刑」——求解器每天都在打脸最坏情形。</li>
<li><strong>把 Curry–Howard 当玄学口号</strong>：它在 Lean 里就是一次实打实的函数应用；先记住本章那两行代码，再慢慢展开。</li>
</ul>
<h2>本章小结</h2>
<ul>
<li>一条主线贯穿全课：<em>语义（真值）→ 变换（等价/范式）→ 表达（量词）→ 推理（规则/证明）→ 落地（机器）</em>。</li>
<li>电路是硬件化的真值表，程序是可执行的逻辑，验证是可检查的证明，求解器是会自动试错的第 4 章。</li>
<li>结课赠言：下次写 <code>if</code> 卡壳、读定义犯迷糊、面对「所有 / 存在」犹豫该怎么否定时，回来翻这十七章——你缺的从来不是聪明，是一套符号系统。</li>
</ul>`
  }
];

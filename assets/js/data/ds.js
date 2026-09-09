// 数据层 · 数据结构与算法分章教程 + 典型例题（原 APP_DATA.ds / dsEx，内容语义未改动）
window.APP_DATA = window.APP_DATA || {};

/* ---------------- 分章教程 ---------------- */
window.APP_DATA.ds = [
    {
      id: 'ds01', cat: '基础入门', title: '数据结构与算法概述', readTime: '4 分钟',
      points: [
        '数据结构 = 数据在计算机中如何组织与存储；算法 = 在其上高效完成任务的步骤',
        '二者相辅相成：选对结构，算法往往一步到位',
        '本系列路线：概念 → 手写 C++ 实现 → STL 对照 → 复杂度分析',
        '适合有一点 C++ 基础（变量/函数/指针入门）的学习者'
      ],
      content: `
<h2>这门教程讲什么</h2>
<p>数据结构与算法（Data Structures and Algorithms，DSA）是计算机科学的核心基础，决定了程序处理数据的<strong>效率与质量</strong>。数据结构关注数据如何被组织和存储（数组、链表、树、图……），算法关注如何在这些结构上完成查找、排序、遍历等任务。</p>
<h2>谁适合阅读</h2>
<ul>
<li>会基本 C++ 语法（变量、循环、函数、指针初步）的开发者与学生</li>
<li>准备考研 / 面试刷题（LeetCode、校招）的求职者</li>
<li>想弄懂 PyTorch 计算图、KV Cache、向量检索底层原理的 AI 学习者</li>
</ul>
<h2>为什么用 C++ 学数据结构</h2>
<table>
<tr><th>底层概念</th><th>在 C++ 中如何体现</th></tr>
<tr><td>内存布局</td><td>数组连续存放，指针运算直接访问元素</td></tr>
<tr><td>动态内存</td><td>new / delete 创建链表节点，看清「谁拥有这块内存」</td></tr>
<tr><td>指针机制</td><td>树、图用指针把节点「手拉手」连起来</td></tr>
<tr><td>泛型抽象</td><td>模板让同一份结构适配 int / string / 自定义类型</td></tr>
<tr><td>工业级参照</td><td>STL 的 vector / list / map 就是标准答案，写完可对照</td></tr>
</table>
<p>Python 等语言把内存与指针封装掉了，方便但不透明。C++ 恰到好处：<strong>既看得见底层真相，又有模板和 RAII 保证现代安全</strong>。这也是竞赛与高性能系统长期偏爱 C++ 的原因。</p>
<h2>学习路线（对应本板块章节）</h2>
<p>基础（概述 / 环境 / 复杂度 / 基本概念）→ 线性结构（数组 / 链表 / 栈 / 队列）→ 层次结构（树 / BST / 堆）→ 散列与图 → 经典算法（查找 / 排序 / 递归 / 贪心 / DP / 回溯）→ 参考资料。</p>
<blockquote>重点不是背代码，而是理解：数据在内存中如何存在、如何被操作、代价多大。</blockquote>`
    },
    {
      id: 'ds02', cat: '基础入门', title: 'C++ 环境搭建', readTime: '4 分钟',
      points: [
        '编译器三选一：g++（Linux）/ clang++（macOS）/ MSVC（Windows）',
        '统一用 -std=c++17 -Wall -O2 编译本系列代码',
        '不想装环境：用 Compiler Explorer 或 OJ 在线跑',
        'undefined reference 多半是链接错误，不是语法错误'
      ],
      content: `
<h2>本地环境</h2>
<table>
<tr><th>系统</th><th>安装方式</th><th>编译器</th></tr>
<tr><td>Windows</td><td>Visual Studio（勾选 C++ 桌面开发）或装 MinGW-w64</td><td>cl.exe / g++</td></tr>
<tr><td>macOS</td><td>xcode-select --install 或 brew install llvm</td><td>clang++</td></tr>
<tr><td>Linux</td><td>sudo apt install build-essential</td><td>g++</td></tr>
</table>
<h2>编译并运行</h2>
<pre><code># 把本系列任意一节代码存为 main.cpp，然后：
g++ -std=c++17 -Wall -O2 main.cpp -o main
./main</code></pre>
<p>推荐编辑器：<strong>VS Code + clangd 插件</strong>（轻量通用）或 <strong>CLion</strong>（JetBrains 全家桶）。</p>
<h2>在线环境（免安装）</h2>
<ul>
<li><a href="https://godbolt.org/">Compiler Explorer</a>：网页版编译 + 查看汇编，还能看 -O2 优化效果</li>
<li><a href="https://leetcode.cn/">力扣（LeetCode 中国）</a>：学完每章顺手刷对应题</li>
<li><a href="https://www.runoob.com/cplusplus/cpp-online-editor.html">菜鸟教程 C++ 在线编辑器</a>：改完即跑</li>
</ul>
<h2>新手最常见报错</h2>
<ul>
<li>缺少分号、括号不配对——看编译器「指出的第一行」附近</li>
<li><code>undefined reference to ...</code>：定义了声明却没实现，或忘了链接库</li>
<li><code>segmentation fault</code>：越界访问或空指针解引用，下一章数组/链表会反复遇到</li>
</ul>`
    },
    {
      id: 'ds02b', cat: '基础入门', title: 'C++ 基础语法速览', readTime: '10 分钟',
      points: [
        '程序 = 类型 + 变量 + 控制流 + 函数：本篇给出读懂本站代码的最小集合',
        '整数除法 5/2 得 2：类型决定运算行为，混入小数才是真除法',
        '引用 int& 让函数能直接修改外部变量，本站代码大量使用',
        'vector / string / pair 是本站代码的三大常客',
        '编译报错先看第一行；数据超过约 21 亿请换 long long'
      ],
      content: `
<h2>最小的完整程序</h2>
<pre><code>#include &lt;iostream&gt;            // 引入输入输出库

int main() {                    // 程序入口，从 main 开始执行
    std::cout &lt;&lt; "Hello, DSA!" &lt;&lt; std::endl;
    return 0;                   // 0 表示正常结束
}</code></pre>
<p><code>#include</code> 引入库；<code>std::cout</code> 是标准输出，<code>&lt;&lt;</code> 把内容依次"送"进输出流；<code>std::endl</code> 输出换行。本站代码习惯显式写 <code>std::</code> 前缀（工程上更清晰），个别文章会注明 <code>using namespace std;</code> 的简写用法。</p>
<h2>变量与基本类型</h2>
<pre><code>int a = 42;                 // 整数（约 ±21 亿）
long long big = 9000000000LL;   // 更大整数，算法题常客
double x = 3.14;            // 双精度浮点
char c = 'A';               // 单个字符
bool ok = true;             // 布尔
const double PI = 3.14159;  // const：不可修改的常量
auto n = a + 1;             // auto：让编译器推断类型</code></pre>
<p><strong>类型决定运算行为</strong>：<code>5 / 2</code> 结果是 <code>2</code>（整数除法，直接舍去小数），而 <code>5.0 / 2</code> 才是 <code>2.5</code>。求余用 <code>%</code>：<code>7 % 3 == 1</code>。数据可能超过约 21 亿（比如计数、前缀和）时，果断用 <code>long long</code>。</p>
<h2>输入与输出</h2>
<pre><code>int n;
std::cin &gt;&gt; n;                  // 读入一个整数（&gt;&gt; 箭头指向变量）
std::cout &lt;&lt; "n = " &lt;&lt; n &lt;&lt; "\n";   // &lt;&lt; 箭头指向输出流</code></pre>
<p>记忆口诀：<strong>数据流向哪边，箭头就指向哪边</strong>。</p>
<h2>控制流</h2>
<pre><code>if (a &gt; 0) { /* ... */ } else if (a == 0) { /* ... */ } else { /* ... */ }

for (int i = 0; i &lt; 10; ++i) {   // i 从 0 到 9，本站下标一律从 0 开始
    /* 循环体 */
}

while (a &gt; 0) { a /= 10; }       // 逐位拆数字的经典写法</code></pre>
<p>逻辑运算：<code>&amp;&amp;</code> 与、<code>||</code> 或、<code>!</code> 非；相等判断是 <code>==</code>，一个 <code>=</code> 是赋值——漏写一个等号是最经典的入门 bug。</p>
<h2>函数与引用传参</h2>
<pre><code>int square(int x) { return x * x; }        // 传值：拿到副本

void swapVal(int&amp; a, int&amp; b) {             // 引用 &amp;：直接操作原变量
    int t = a; a = b; b = t;
}

int main() {
    int u = 1, v = 2;
    swapVal(u, v);                          // 调用后 u==2, v==1
}</code></pre>
<p><strong>引用（<code>&amp;</code>）是变量的别名</strong>：函数形参写成 <code>int&amp;</code> 时，修改它就是修改实参本身。本站手写代码中链表插入、交换、递归建树都靠它。只想"读"不想改的大对象，也常用 <code>const int&amp;</code> 传引用避免拷贝。</p>
<h2>本站代码三大常客：vector / string / pair</h2>
<pre><code>#include &lt;vector&gt;
#include &lt;string&gt;
#include &lt;utility&gt;     // pair

std::vector&lt;int&gt; v;         // 可变长数组
v.push_back(3);             // 尾部追加
v.push_back(5);
int s = v.size();           // 元素个数 2
int first = v[0];           // 下标访问，从 0 开始，越界不报错但会出错

std::string name = "dsa";   // 字符串：可 + 拼接、可 name[i] 取字符
name += " ok";

std::pair&lt;int, int&gt; p = {1, 2};   // 二元组
// p.first == 1, p.second == 2</code></pre>
<p><code>vector</code> 就是可以自动扩容的数组，本站数组、栈、图邻接表全部基于它；<code>string</code> 用法与 vector 高度相似。遍历写法两种任选：</p>
<pre><code>for (int i = 0; i &lt; (int)v.size(); ++i) { /* v[i] */ }
for (int x : v) { /* x 依次是每个元素 */ }        // 范围 for，C++11 起</code></pre>
<h2>struct：把相关数据打包</h2>
<pre><code>struct Node {
    int val;
    Node* next;             // 指向下一个同类结点的指针（链表章的主角）
};

Node nd;                    // 定义变量
nd.val = 7;                 // 用 . 访问成员</code></pre>
<p>链表、二叉树、图的结点都是 struct + 指针的组合，第 6 章起会反复出现。</p>
<h2>指针：最小须知</h2>
<pre><code>int x = 10;
int* p = &amp;x;        // p 存的是 x 的地址（&amp; 取地址）
int y = *p;         // *p 沿地址取值，y == 10</code></pre>
<p>记住两件事即可：<code>&amp;</code> 取地址、<code>*</code> 顺藤摸瓜取值；<strong>空指针/野指针不能解引用</strong>——<code>segmentation fault</code> 十有八九是它。现代 C++ 中 vector、引用已覆盖大部分场景，裸指针主要出现在链表/树的结点连接里。</p>
<h2>新手高频报错速查</h2>
<ul>
<li><code>expected ';' …</code>：上一行末尾漏分号。</li>
<li>变量未初始化就读取：结果是不确定的垃圾值，可能"有时对有时错"。</li>
<li>数组/vector 越界：小规模测试可能侥幸通过，换大数据就崩。</li>
<li><code>1 &lt;&lt; 40</code> 或大数连乘变负数/归零：int 溢出，换 <code>long long</code>（乘法常写 <code>1LL * a * b</code>）。</li>
</ul>
<div class="kb-points">
<div class="pt-title">🎯 怎么用这一篇</div>
<ul>
<li>不必背语法：读到后面章节看不懂某行 C++ 时，回到本篇对应小节查。</li>
<li>配合上一章的在线环境，把本篇每个代码块亲手跑一遍，10 分钟足够。</li>
<li>类、继承、多态、友元等面向对象内容在下一篇《C++ 面向对象入门》 #/ds/ds02c，看到 class Solution 不再发怵。</li>
<li>本站代码风格约定：下标从 0 开始、显式 std:: 前缀、递归函数带终止条件注释。</li>
</ul>
</div>`
    },
    {
      id: 'ds02c', cat: '基础入门', title: 'C++ 面向对象入门：类 · 继承 · 多态 · 友元', readTime: '15 分钟',
      points: [
        '类 = 数据 + 行为：public/private 访问控制是看懂 class Solution 的钥匙',
        '构造/析构与 RAII：资源跟着对象走，vector 用完自动回收',
        'virtual 实现动态绑定（多态）；多态基类必须写虚析构',
        '纯虚函数 = 抽象接口，只定契约不给实现',
        'friend 是单向、不传递、不继承的受控后门',
        '重载 operator< 让 sort / priority_queue 认识你的类型'
      ],
      content: `
<h2>为什么数据结构绕不开面向对象</h2>
<p>你会在本站代码里反复见到两种写法：力扣风格的 <code>class Solution { public: ... };</code>，以及把结点打包的 <code>struct</code>。<strong>类（class）是 C++ 面向对象的核心</strong>：把数据和操作这些数据的函数绑在一起，构成一个新"类型"。std::vector、std::string、priority_queue 也全是类——读懂这一篇，容器源码和力扣模板就不再神秘。</p>
<h2>类：把数据和行为绑在一起</h2>
<pre><code>class Stack {
private:                     // 私有区：外部不可直接访问
    vector&lt;int&gt; data;        // 成员变量（数据）

public:                      // 公有区：对外提供的接口
    void push(int x) { data.push_back(x); }       // 成员函数（行为）
    void pop()        { data.pop_back(); }
    int  top() const  { return data.back(); }     // const：承诺不修改成员
    bool empty() const { return data.empty(); }
};                           // 类定义结尾的分号别漏！

int main() {
    Stack s;                 // 创建对象（实例化）
    s.push(1); s.push(2);
    return s.top();          // 用 . 访问公有成员
}</code></pre>
<ul>
<li><strong>访问控制</strong>：<code>private</code> 只有类自己能用，<code>public</code> 谁都能用；<code>class</code> 默认 private、<code>struct</code> 默认 public——这是两者<strong>唯一</strong>的语法区别。本站结点用 struct 正是看中"数据全开放"。</li>
<li>成员函数可类内定义，也可类内声明、类外用 <code>void Stack::pop() { ... }</code> 补定义（:: 读作"属于"）。</li>
<li><code>top() const</code> 的 const 是好习惯：承诺只读。</li>
</ul>
<h2>构造函数与析构函数</h2>
<pre><code>class MyQueue {
    int* arr;                // 演示用裸数组（真实代码请用 vector）
    int cap, head, tail;
public:
    MyQueue(int capacity)                          // 构造函数：与类同名、无返回值
        : arr(new int[capacity]), cap(capacity), head(0), tail(0) {}  // 初始化列表
    ~MyQueue() { delete[] arr; }                   // 析构函数：对象销毁时自动调用
};</code></pre>
<ul>
<li>构造函数在对象诞生时自动运行，保证"出生即合法"；初始化列表（冒号后那份）比函数体内赋值更地道。</li>
<li>析构函数 <code>~类名()</code> 在对象销毁时自动运行：new 出来的内存在这里 delete。<strong>RAII</strong> 思想=资源跟着对象走——vector、string 能"用完自动收"，靠的正是它。</li>
</ul>
<h2>封装：把细节锁进 private</h2>
<p>直接暴露 data 会被人偷偷改坏；private 加公有接口才能守住"不变量"（如：栈非空才允许 top）。惯例：成员变量私有，读取走 getter、修改走 setter（必要时做校验）。这与数据结构里的"接口约定"同构——堆只暴露 push/pop/top，内部数组怎么排你说了算。</p>
<h2>继承：is-a 关系</h2>
<pre><code>class Animal {
protected:                   // protected：自己和孩子能用，外人不行
    string name;
public:
    Animal(string n) : name(n) {}
    void eat();              // 公有行为直接被继承
};

class Dog : public Animal {  // Dog 是一种 Animal
public:
    Dog(string n) : Animal(n) {}   // 先构造基类部分
    void bark();                   // 再补充自己的新行为
};</code></pre>
<p><code>: public Animal</code> 即继承；派生类构造时先跑基类构造函数。<code>protected</code> 介于两者之间：对类外等同 private，对派生类开放。</p>
<h2>多态：同一接口，不同行为（virtual）</h2>
<pre><code>class Shape {
public:
    virtual double area() const = 0;      // 纯虚函数：只定契约，不给实现
    virtual ~Shape() = default;           // 虚析构：多态基类必须加！
};

class Circle : public Shape {
    double r;
public:
    Circle(double r_) : r(r_) {}
    double area() const override { return 3.14159 * r * r; }
};

class Rect : public Shape {
    double w, h;
public:
    Rect(double w_, double h_) : w(w_), h(h_) {}
    double area() const override { return w * h; }
};

double total(vector&lt;Shape*&gt;&amp; shapes) {    // 基类指针容器：什么形状都能装
    double sum = 0;
    for (Shape* s : shapes) sum += s-&gt;area();  // 运行期自动调用各自版本
    return sum;
}</code></pre>
<ul>
<li><strong>virtual</strong> 让调用在运行期按"对象的真实类型"绑定（动态绑定）：同一句 <code>s-&gt;area()</code>，圆算圆的、矩形算矩形的。</li>
<li><strong>纯虚函数</strong>（写成 = 0）使 Shape 成为抽象类，只当接口用——排序的比较器、各种遍历器本质上都是这种契约。</li>
<li><strong>虚析构</strong>：用基类指针 delete 派生类对象时，若析构不是 virtual，只会析构基类部分，造成泄漏——多态基类必加。</li>
<li><code>override</code> 关键字让编译器帮你检查"确实覆盖了基类虚函数"，拼错签名会报错。</li>
</ul>
<h2>友元：受控的后门（friend）</h2>
<pre><code>class Matrix {
    friend Matrix operator*(const Matrix&amp; a, const Matrix&amp; b);  // 友元函数
    friend class MatrixPrinter;                                  // 友元类
private:
    double a[3][3];
};</code></pre>
<ul>
<li><strong>friend 函数/类</strong>可以访问本类的 private 成员——封装上开的一扇受控后门。典型用途：二元运算符（两侧都不是"我"）、打印内部状态的调试类、彼此紧密协作的两个类（如链表与链表结点）。</li>
<li>三条铁律：friend 是<strong>单向的</strong>（A 认 B 是朋友，B 不因此认 A）；<strong>不传递</strong>（B 的朋友不是 A 的朋友）；<strong>不继承</strong>（子类不自动继承父亲的朋友）。</li>
</ul>
<h2>运算符重载：让自定义类型像内置类型</h2>
<pre><code>struct Point { int x, y; };

bool operator&lt;(const Point&amp; a, const Point&amp; b) {    // 全局函数：供 sort 使用
    return a.x + a.y &lt; b.x + b.y;
}
ostream&amp; operator&lt;&lt;(ostream&amp; os, const Point&amp; p) {  // 常声明为友元
    return os &lt;&lt; "(" &lt;&lt; p.x &lt;&lt; "," &lt;&lt; p.y &lt;&lt; ")";
}</code></pre>
<p>重载 <code>&lt;</code> 之后 <code>sort(v.begin(), v.end())</code> 直接可用；给结构体提供比较（运算符重载或仿函数），是"让 priority_queue / sort 认识你的类型"的标准姿势——堆与排序两章会反复用到。</p>
<h2>static 与一句话补充</h2>
<ul>
<li><code>static</code> 成员变量属于类而非某个对象（全体对象共享一份），常用作实例计数器；<code>static</code> 成员函数没有 this 指针。</li>
<li>成员函数不占对象内存：<code>sizeof</code> 只统计成员变量。</li>
<li><code>vector&lt;int&gt;</code> 的尖括号是<strong>模板</strong>：按元素类型批量生成类，会用即可，进阶再深入。</li>
</ul>
<h2>常见误区</h2>
<ul>
<li>多态基类忘写虚析构：基类指针删除派生对象时资源泄漏。</li>
<li>默认拷贝是<strong>浅拷贝</strong>：类里有裸指针时两个对象共享同一块内存，一个析构另一个悬空（需要自定义拷贝构造/赋值，即"三法则"；用 vector 代替裸指针可绕开）。</li>
<li>把派生类对象按<strong>值</strong>塞进基类变量会发生切片，多态失效——多态请走指针或引用。</li>
<li>class 与 struct 只差默认访问权限，别背"struct 只能放数据"。</li>
</ul>
<div class="kb-points">
<div class="pt-title">🎯 与本站代码的对应关系</div>
<ul>
<li>力扣的 <code>class Solution { public: ... }</code>：类 + 公有成员函数，读完本篇即可放心照抄。</li>
<li>链表/树的 <code>struct TreeNode</code> 带构造函数：第 4、11 章反复出现。</li>
<li>priority_queue 自定义比较、sort 的比较器：运算符重载或仿函数，见第 13、17 章。</li>
</ul>
</div>`
    },
    {
      id: 'ds02d', cat: '基础入门', title: 'C 语言程序设计', readTime: '14 分钟',
      points: [
        '定位：给"学过 C 但忘了语法与库"的你，只摆骨架不求详解',
        '指针 + malloc/free 是 C 的灵魂，也是链表/树两章的前置',
        'qsort + 函数指针：C 标准库里最"数据结构"的函数',
        '常用库速查：stdio / stdlib / string / math / ctype',
        'typedef struct 与 -> 在 C 参考代码里随处可见',
        'C → C++ 只差类、引用与 vector，衔接路线见文末'
      ],
      content: `
<h2>定位：给"学过但忘了"的你</h2>
<p>本篇不解释"为什么"，只把 C 的语法骨架与常用库函数摆到台面上，供快速查阅。两点背景：① 本站数据结构教程是 <strong>C++</strong>，但 C 的语法几乎全部适用于 C++（printf 照样能用）；② 如果你还没配环境，先看《C++ 环境搭建》 #/ds/ds02，gcc 同一个编译器既能编 C 也能编 C++。</p>
<pre><code>#include &lt;stdio.h&gt;

int main(void) {
    printf("hello, C\n");
    return 0;
}</code></pre>
<pre><code>gcc -std=c11 -Wall main.c -o main &amp;&amp; ./main</code></pre>
<p>编译四阶段一句话：<strong>预处理</strong>（展开 #include / #define）→ <strong>编译</strong> → <strong>汇编</strong> → <strong>链接</strong>。<code>undefined reference</code> 是链接期错误（声明了没实现），语法错误则在编译期就报。</p>
<h2>变量、类型与常量</h2>
<table>
<tr><th>类型</th><th>典型大小</th><th>printf/scanf 格式符</th><th>范围/精度</th></tr>
<tr><td>char</td><td>1 字节</td><td>%c</td><td>-128 ~ 127</td></tr>
<tr><td>int</td><td>4 字节</td><td>%d</td><td>约 ±21 亿</td></tr>
<tr><td>long long</td><td>8 字节</td><td>%lld</td><td>约 ±9.2 × 10^18</td></tr>
<tr><td>unsigned int</td><td>4 字节</td><td>%u</td><td>0 ~ 42.9 亿</td></tr>
<tr><td>float</td><td>4 字节</td><td>%f</td><td>约 7 位有效数字</td></tr>
<tr><td>double</td><td>8 字节</td><td>%f 输出 / %lf 输入</td><td>约 15~16 位有效数字</td></tr>
</table>
<pre><code>const double PI = 3.14159;          // 常量：不可修改（推荐）
#define MAX_N 100                   // 宏：预处理期文本替换（建议加括号）
static int counter = 0;             // static 局部变量：函数多次调用间保留值
// static 全局变量 = 仅本文件可见；extern = "这个变量在别的文件里定义"</code></pre>
<p><code>sizeof(int)</code>、<code>sizeof(a)/sizeof(a[0])</code> 求数组长度（仅对真数组有效，指针不行）。</p>
<h2>控制流与函数</h2>
<pre><code>if (x &gt; 0) { /* ... */ } else if (x == 0) { /* ... */ } else { /* ... */ }

switch (op) {
    case 1:  /* ... */ break;       // 忘写 break 会"贯穿"到下一 case
    default: break;
}

for (int i = 0; i &lt; n; i++) { /* ... */ }
while (cond) { /* ... */ }
do { /* ... */ } while (cond);      // 至少执行一次</code></pre>
<p>函数：先声明原型再使用（原型放文件开头），参数一律<strong>传值</strong>（想改外部变量就传指针）。C 标准库里最"数据结构"的函数是 <code>qsort</code>——它把"怎么比较"以<strong>函数指针</strong>的形式交给你：</p>
<pre><code>#include &lt;stdlib.h&gt;

int cmp(const void* a, const void* b) {
    return (*(const int*)a) - (*(const int*)b);   // 升序
}
/* 调用：qsort(arr, n, sizeof(int), cmp); */</code></pre>
<p>函数指针语法 <code>返回值 (*)(参数表)</code> 看着唬人，本质就是"存函数地址的变量"——C 里实现"策略可替换"全靠它，对应 C++ 的仿函数/比较器。</p>
<h2>数组与字符串</h2>
<pre><code>int a[5] = {1, 2, 3, 4, 5};     // 不初始化则内容是垃圾值
int m[3][4];                    // 二维数组：按行存放
char s[] = "hello";             // 字符数组：自动补结尾的 '\0'

// sizeof(s) == 6（含 '\0'），strlen(s) == 5（不含）——这两个别混</code></pre>
<p>C 没有 string 类型，字符串就是<strong>以 '\0' 结尾的字符数组</strong>。常用 <code>string.h</code> 函数：</p>
<table>
<tr><th>函数</th><th>作用</th><th>注意</th></tr>
<tr><td>strlen(s)</td><td>长度（不含 '\0'）</td><td>O(n) 逐个数</td></tr>
<tr><td>strcpy(d, s) / strncpy</td><td>复制</td><td>d 空间必须够</td></tr>
<tr><td>strcat(d, s)</td><td>拼接</td><td>同上，越界不报错</td></tr>
<tr><td>strcmp(a, b)</td><td>比较：0 相等 / 负 / 正</td><td>判断相等要写 == 0</td></tr>
<tr><td>strchr / strstr</td><td>找字符 / 找子串</td><td>找不到返回 NULL</td></tr>
<tr><td>memcpy / memset</td><td>内存复制 / 置值</td><td>按字节，注意长度</td></tr>
</table>
<h2>指针：C 的灵魂（速览）</h2>
<pre><code>int x = 10;
int* p = &amp;x;          // &amp; 取地址；p 存 x 的地址
int y = *p;           // * 解引用：顺藤摸瓜取值，y == 10
p++;                  // 指针运算：按所指类型大小移动一个元素

int** pp = &amp;p;        // 二级指针：指向指针的指针（链表插入/删除会遇到）
void* v = p;          // 万能指针：malloc 的返回值，用前需强转</code></pre>
<ul>
<li>数组名在大多数场合退化为"首元素地址"，所以 <code>int* p = a;</code> 合法——但数组名不是指针变量，不能 p++。</li>
<li>野指针三大来源：未初始化、数组越界、free 之后继续用。解引用前判 <code>!= NULL</code> 是肌肉记忆。</li>
</ul>
<h2>动态内存：malloc 与 free</h2>
<pre><code>#include &lt;stdlib.h&gt;

int* arr = (int*)malloc(n * sizeof(int));        // 分配，不清零
int* zer = (int*)calloc(n, sizeof(int));         // 分配并清零
arr = (int*)realloc(arr, 2 * n * sizeof(int));   // 扩容（可能搬移）
free(arr);                                       // 用完必还</code></pre>
<ul>
<li>分配结果可能为 NULL，<strong>必须判空</strong>再用。</li>
<li>malloc/free 必须配对：不 free = 内存泄漏，free 两次/用已 free 的 = 悬空指针。</li>
<li>C++ 用 <code>new/delete</code>，更好的做法是 vector 自动管理——这也是本站教程几乎不写 malloc 的原因。</li>
</ul>
<h2>结构体、typedef 与 enum</h2>
<pre><code>struct Node {
    int val;
    struct Node* next;      // C 里引用自身类型必须写全 struct Node
};
typedef struct Node Node;   // 之后可直接写 Node 而不带 struct

Node n2;                    // C++ 里本来就不需要 struct 前缀
n2.val = 7;

Node* p = &amp;n2;
p-&gt;val = 8;                 // 通过指针访问成员用 -&gt;（等价 (*p).val）

enum { OK = 0, ERR = -1 };  // 枚举：一组整型常量
union U { int i; char c[4]; };  // 联合：成员共享同一块内存（较少用）</code></pre>
<p><code>typedef struct</code> 与 <code>-&gt;</code> 在网上任何 C 版链表/树参考代码里都长一个样，认识它们就能读懂。</p>
<h2>预处理器</h2>
<pre><code>#include &lt;stdio.h&gt;      // 系统头文件：在系统目录找
#include "mytool.h"     // 自己的头文件：先在当前目录找

#ifndef MYTOOL_H        // 头文件守卫（防止重复包含）
#define MYTOOL_H
/* ... 头文件内容 ... */
#endif

#define SQR(x) ((x) * (x))   // 带参宏：纯文本替换，参数必须加括号</code></pre>
<p>宏的坑：<code>SQR(1 + 2)</code> 若写成 <code>#define SQR(x) (x * x)</code> 会展开成 <code>1 + 2 * 1 + 2 = 5</code> 而不是 9。能写 const / 内联函数就不要用带参宏。</p>
<h2>标准库速查</h2>
<table>
<tr><th>头文件</th><th>常用内容</th></tr>
<tr><td>stdio.h</td><td>printf / scanf / getchar / putchar / fgets / fopen / fclose / fprintf / sprintf</td></tr>
<tr><td>stdlib.h</td><td>malloc / calloc / realloc / free / atoi / atof / abs / rand / srand / qsort / exit</td></tr>
<tr><td>string.h</td><td>strlen / strcpy / strcat / strcmp / strchr / strstr / memcpy / memset</td></tr>
<tr><td>math.h</td><td>sqrt / pow / fabs / floor / ceil / log / sin / cos（编译要加 -lm）</td></tr>
<tr><td>ctype.h</td><td>isdigit / isalpha / isspace / toupper / tolower</td></tr>
</table>
<h2>printf / scanf 格式速查</h2>
<pre><code>printf("%d %5d %-5d %.2f %s %c %p %x\n", a, b, c, d, s, ch, p, h);
scanf("%d %lf", &amp;n, &amp;x);        // 变量前必须 &amp;（数组名/指针除外）</code></pre>
<ul>
<li>double 的输出用 <code>%f</code>、输入用 <code>%lf</code>；<code>%6.2f</code> = 宽 6 保留 2 位小数。</li>
<li><code>scanf("%s", s)</code> 遇空格就停，读整行用 <code>fgets(s, sizeof(s), stdin)</code>。</li>
<li>经典坑：<code>printf("%.1f", 1/2)</code> 输出 0.0——先做整数除法再传参，写 <code>1.0/2</code>。</li>
</ul>
<h2>从 C 到 C++：本站教程怎么衔接</h2>
<table>
<tr><th>C 写法</th><th>C++ 等价（本站教程用法）</th></tr>
<tr><td>malloc / free</td><td>new / delete，更好的是 std::vector 自动管理</td></tr>
<tr><td>char* + string.h</td><td>std::string（+、==、size() 直接用）</td></tr>
<tr><td>数组 + 长度变量</td><td>std::vector（push_back / size / 越界更可控）</td></tr>
<tr><td>printf / scanf</td><td>std::cout / std::cin（printf 也依然可用）</td></tr>
<tr><td>struct + 函数指针</td><td>class + 成员函数 / 仿函数 / 虚函数</td></tr>
<tr><td>宏常量 #define</td><td>const / constexpr</td></tr>
</table>
<p>结论：<strong>会 C 的人学本站教程，新增量只有三块</strong>——类与对象（见《C++ 面向对象入门》 #/ds/ds02c）、引用（int&amp; 出参）、vector/string 与 STL。语法骨架完全复用。</p>
<h2>常见坑清单</h2>
<ul>
<li>数组越界：C 不检查，小数据侥幸通过、大数据崩溃。</li>
<li>字符串忘留 '\0' 的空间：strlen / strcpy 越界读写的重灾区。</li>
<li>scanf 忘写 &amp;、<code>==</code> 误写成 <code>=</code>、malloc 不判空不 free。</li>
<li>返回局部数组的地址：函数返回即销毁，得到悬空指针（用 static、堆分配或由调用方传入缓冲区）。</li>
</ul>
<div class="kb-points">
<div class="pt-title">🎯 怎么用这一篇</div>
<ul>
<li>把它当<strong>速查表</strong>：读后续章节遇到 C 语法/库函数不认识，回到对应小节。</li>
<li>两篇 C++ 前置（《C++ 基础语法速览》 #/ds/ds02b、《C++ 面向对象入门》 #/ds/ds02c）与本篇互补：C 讲指针与库，C++ 讲类与容器。</li>
<li>延伸阅读：<a href="https://www.runoob.com/cprogramming/c-tutorial.html" target="_blank" rel="noopener noreferrer">菜鸟教程 C 语言教程</a>（需要更系统的讲解时再查）。</li>
</ul>
</div>`
    },
    {
      id: 'ds03', cat: '基础入门', title: '算法基础与时间复杂度', readTime: '6 分钟',
      points: [
        '算法五要素：有穷性、确定性、输入、输出、可行性',
        '大 O 看「增长率」：忽略常数与低阶项，取上界',
        '双层循环通常 O(n²)；每次折半通常是 O(log n)',
        '常见排序里 O(n log n) 是比较类算法的理论下限',
        '内存换时间（如哈希表）是最常用的优化手段'
      ],
      content: `
<h2>大 O：用增长率评价算法</h2>
<p>不问「跑多少秒」（受机器影响），而问「数据量翻倍时，代价翻几倍」。</p>
<table>
<tr><th>复杂度</th><th>典型场景</th><th>n = 100 万时操作量</th></tr>
<tr><td>O(1)</td><td>哈希表平均查找、数组按下标访问</td><td>1 次</td></tr>
<tr><td>O(log n)</td><td>二分查找、平衡树、堆操作</td><td>约 20 次</td></tr>
<tr><td>O(n)</td><td>遍历、链表查找、建堆</td><td>100 万次</td></tr>
<tr><td>O(n log n)</td><td>快排、归并、堆排序</td><td>约 2000 万次</td></tr>
<tr><td>O(n²)</td><td>冒泡/选择/插入排序、双重循环</td><td>10^12 次（不可接受）</td></tr>
<tr><td>O(2ⁿ)</td><td>子集枚举、朴素递归</td><td>宇宙热寂也跑不完</td></tr>
</table>
<h2>同一需求，两种命运：两数之和</h2>
<pre><code>#include &lt;vector&gt;
#include &lt;unordered_map&gt;
using namespace std;

// 暴力：对每个数，向后找配对的数 —— O(n^2)
// 哈希：边走边记「见过的数」，查补数是否已出现 —— O(n)
vector&lt;int&gt; twoSum(vector&lt;int&gt;&amp; nums, int target) {
    unordered_map&lt;int, int&gt; seen;              // 值 → 下标
    for (int i = 0; i &lt; (int)nums.size(); ++i) {
        int need = target - nums[i];
        if (seen.count(need))                   // O(1) 平均
            return { seen[need], i };
        seen[nums[i]] = i;
    }
    return {};
}</code></pre>
<p>这就是「以空间换时间」：多花 O(n) 内存，换来快 n 倍的时间。</p>
<h2>最好、最坏、平均与摊还</h2>
<p>快排最好 O(n log n)、最坏 O(n²)；我们通常关心<strong>平均</strong>与<strong>最坏</strong>。另有一个概念叫摊还复杂度：动态数组 push_back 偶尔要整体搬一次（O(n)），但平摊到每次操作仍是 O(1)——因为扩容翻倍，n 次插入总共只搬家 O(n) 次。</p>`
    },
    {
      id: 'ds04', cat: '基础入门', title: '数据结构基本概念', readTime: '5 分钟',
      points: [
        '逻辑结构（线性/层次/网状/集合）与存储结构（顺序/链式）要分开看',
        '同一逻辑结构可以有两种物理实现：如队列可数组也可链表',
        'ADT：只约定「能做什么操作」，不约定「怎么实现」',
        'C++ 表达结构的最小三件套：struct + 指针 + new/delete'
      ],
      content: `
<h2>两层视角</h2>
<ul>
<li><strong>逻辑结构</strong>：数据之间的抽象关系——线性（队列）、层次（树）、网状（图）、集合</li>
<li><strong>存储结构</strong>：内存里怎么摆——顺序存放（数组，靠下标）或链式存放（链表，靠指针）</li>
</ul>
<p>例：「栈」是逻辑概念（后进先出），用数组实现叫顺序栈，用链表实现叫链栈——接口相同，代价不同。</p>
<h2>常用操作五类</h2>
<p>访问 Access、插入 Insert、删除 Delete、查找 Search、遍历 Traverse。每种结构的意义，就是把其中某些操作做到极致地快。</p>
<h2>C++ 最小知识包</h2>
<pre><code>struct Node {
    int val;            // 数据域
    Node* next;         // 指针域：存下一个节点的地址
    Node(int v) : val(v), next(nullptr) {}   // 构造函数初始化列表
};

Node* a = new Node(1);      // 在堆上创建节点
a->next = new Node(2);      // 用指针把节点连成链
// ... 使用完毕后
delete a->next;             // 先释放后面的
delete a;                   // 再释放头，否则内存泄漏</code></pre>
<p>三行速记：<code>struct</code> 定义节点长什么样，指针负责「拉钩」，new/delete 负责堆上生死。现代 C++ 工程里可用智能指针（unique_ptr）自动化第三件事，但学习阶段建议亲手管一次内存，才知道 STL 帮你做了什么。</p>`
    },
    {
      id: 'ds05', cat: '线性结构', title: '数组与动态数组', readTime: '7 分钟',
      points: [
        '数组 = 一段连续内存，按下标 O(1) 随机访问',
        '中间插/删要整体挪动，代价 O(n)',
        '动态数组用「容量翻倍扩容」，push_back 摊还 O(1)',
        '连续内存对 CPU 缓存极友好，同为 O(n) 数组比链表快得多',
        '日常 C++：无脑 std::vector，别用裸数组管理长度'
      ],
      content: `
<h2>内存里的连续格子</h2>
<p><code>int a[5]</code> 在内存中长这样：<code>[a0][a1][a2][a3][a4]</code> 背靠背。地址 = 首地址 + 下标 × 元素大小，所以 <code>a[i]</code> 就是一次乘法加法，O(1)。</p>
<h2>手写：定长数组上的插删</h2>
<pre><code>const int N = 100;
int arr[N] = { 10, 20, 30, 40 };
int n = 4;                            // 当前实际元素个数

void insertAt(int pos, int v) {       // 在下标 pos 处插入 v
    for (int i = n; i &gt; pos; --i)     // 从后往前挪，防止覆盖
        arr[i] = arr[i - 1];
    arr[pos] = v;
    ++n;
}

void removeAt(int pos) {              // 删除下标 pos 的元素
    for (int i = pos; i &lt; n - 1; ++i) // 从前往后补位
        arr[i] = arr[i + 1];
    --n;
}</code></pre>
<h2>手写：会自己长大的动态数组</h2>
<pre><code>class MyVec {
    int* data_ = nullptr;
    size_t size_ = 0, cap_ = 0;
public:
    void push_back(int v) {
        if (size_ == cap_) grow();    // 满了才扩容 → 摊还 O(1)
        data_[size_++] = v;
    }
    int&amp; operator[](size_t i) { return data_[i]; }
    size_t size() const { return size_; }
    ~MyVec() { delete[] data_; }
private:
    void grow() {
        size_t newCap = cap_ ? cap_ * 2 : 1;      // 关键：每次翻倍
        int* fresh = new int[newCap];
        for (size_t i = 0; i &lt; size_; ++i) fresh[i] = data_[i];
        delete[] data_;
        data_ = fresh;
        cap_ = newCap;
    }
};</code></pre>
<h2>STL 对照</h2>
<pre><code>#include &lt;vector&gt;
#include &lt;algorithm&gt;
std::vector&lt;int&gt; v = { 3, 1, 2 };
v.push_back(4);                       // 动态扩容，摊还 O(1)
std::sort(v.begin(), v.end());        // 工业级排序 O(n log n)
v.erase(v.begin());                   // 删除首元素，O(n) 挪动</code></pre>
<p>选型口诀：<strong>需要下标访问、尾部增删 → vector；频繁在中间插删 → 考虑链表；定长小数组 → std::array。</strong></p>`
    },
    {
      id: 'ds06', cat: '线性结构', title: '单链表', readTime: '8 分钟',
      points: [
        '节点分散在堆上，用指针串起来；长度不限、增长免费',
        '头部插/删 O(1)；按下标访问与查找 O(n)，不支持随机访问',
        '反转是面试第一大题：prev / cur / next 三指针',
        '「虚拟头节点 dummy」可让删除头节点不用写特判',
        '快慢指针：找中点、判环都是它'
      ],
      content: `
<h2>结构对比</h2>
<table>
<tr><th></th><th>数组 vector</th><th>链表 list</th></tr>
<tr><td>随机访问 a[i]</td><td>O(1)</td><td>O(n)</td></tr>
<tr><td>头部插入</td><td>O(n)</td><td>O(1)</td></tr>
<tr><td>内存布局</td><td>连续、缓存友好</td><td>分散、每节点多存一个指针</td></tr>
</table>
<h2>手写单链表：建立、增、删</h2>
<pre><code>struct Node {
    int val;
    Node* next;
    Node(int v) : val(v), next(nullptr) {}
};

void pushFront(Node*&amp; head, int v) {   // 引用传参才能改到指针本身
    Node* t = new Node(v);
    t->next = head;
    head = t;                           // O(1)
}

bool removeFirst(Node*&amp; head, int v) {
    Node* dummy = new Node(0);          // 虚拟头：省去删除头节点的特判
    dummy->next = head;
    Node* p = dummy;
    while (p->next &amp;&amp; p->next->val != v) p = p->next;
    if (!p->next) { delete dummy; return false; }
    Node* del = p->next;
    p->next = del->next;                // 跳过被删节点
    delete del;
    head = dummy->next;
    delete dummy;
    return true;
}</code></pre>
<h2>面试必考：反转链表</h2>
<pre><code>Node* reverse(Node* head) {
    Node* prev = nullptr;
    while (head != nullptr) {
        Node* nxt = head->next;         // ① 先存后继，防止断链
        head->next = prev;              // ② 掉头：当前节点指向 prev
        prev = head;                    // ③ prev 前进
        head = nxt;                     // ④ 当前指针前进
    }
    return prev;                        // prev 即新链头
}</code></pre>
<h2>快慢指针两用</h2>
<p>slow 一次一步、fast 一次两步：fast 到尾时 slow 恰在<strong>中点</strong>（归并排序切链用）；若存在环，两人必在环内<strong>相遇</strong>（判环，LeetCode 141）。</p>
<h2>STL 对照</h2>
<pre><code>#include &lt;list&gt;
std::list&lt;int&gt; ls = { 1, 2, 3 };
ls.push_front(0);       // O(1) 头插
ls.remove(2);           // 按值删除
ls.reverse();           // 标准库直接给你反转</code></pre>`
    },
    {
      id: 'ds07', cat: '线性结构', title: '双向链表与循环链表', readTime: '6 分钟',
      points: [
        '双向链表每个节点多存一个 prev 指针：可回走，已知节点删除 O(1)',
        'STL list 就是「双向 + 循环」实现，哨兵位节点省去大量判空',
        '循环链表：队尾指回队头，适合轮转调度类问题',
        'LRU 缓存 = 哈希表 + 双向链表，面试高频设计题'
      ],
      content: `
<h2>双向链表</h2>
<pre><code>struct DNode {
    int val;
    DNode *prev, *next;
    DNode(int v) : val(v), prev(nullptr), next(nullptr) {}
};

// 在节点 cur 之前插入 ins —— 四个指针按序接好
void insertBefore(DNode* cur, DNode* ins) {
    ins->prev = cur->prev;
    ins->next = cur;
    cur->prev->next = ins;
    cur->prev = ins;
}

// 删除已知节点 p —— 无需从头找前驱，O(1)
void erase(DNode* p) {
    p->prev->next = p->next;
    p->next->prev = p->prev;
    delete p;
}</code></pre>
<h2>循环链表与约瑟夫环</h2>
<p>把单链表的尾指针接回头节点即成循环链表：从任一节点出发都能遍历全环。经典应用约瑟夫问题——n 人围圈每数到 k 出局。模拟写法是循环链表逐个删除；也有 O(n) 递推公式：</p>
<pre><code>int josephus(int n, int k) {
    int pos = 0;                       // 1 人圈的幸存者位置（0 起）
    for (int i = 2; i &lt;= n; ++i)       // 从 2 人圈递推到 n 人圈
        pos = (pos + k) % i;
    return pos + 1;                    // 换算成 1 起编号
}</code></pre>
<h2>LRU：为什么需要「哈希 + 双向链表」</h2>
<p>需求：get/put 都 O(1)，且容量满时淘汰最久未用。哈希表负责按 key 秒定位节点；双向链表负责维护「最近使用顺序」——命中就把节点摘起挪到队头，淘汰只看队尾，两者都要求「已知节点 O(1) 摘除」，这正是单向链表做不到、双向链表轻松做到的事。STL list 的 splice 就是为这类操作准备的。</p>`
    },
    {
      id: 'ds08', cat: '线性结构', title: '栈', readTime: '6 分钟',
      points: [
        '栈 = 只允许在一端（栈顶）增删的线性表：后进先出 LIFO',
        'push / pop / top 全部 O(1)',
        '数组栈要管扩容，链表栈天然免扩容',
        '栈是「撤销 / 回溯 / 匹配 / 函数调用」的通用底座',
        'STL stack::top() 在空栈上是未定义行为，先判 empty()'
      ],
      content: `
<h2>一摞盘子</h2>
<p>只能从顶部放、顶部取——最后放的最先拿。计算机的函数调用栈就是它：每层调用的局部变量与返回地址压栈，return 弹栈。</p>
<h2>手写：数组实现顺序栈</h2>
<pre><code>class MyStack {
    std::vector&lt;int&gt; d_;               // 也可直接用定长数组 + 容量管理
public:
    void push(int v) { d_.push_back(v); }
    void pop()  { d_.pop_back(); }     // 调用前确保非空
    int  top()  { return d_.back(); }
    bool empty() const { return d_.empty(); }
    int  size() const { return (int)d_.size(); }
};</code></pre>
<p>核心就是「把出入口限制在 vector 尾部」，于是所有操作天然 O(1)。</p>
<h2>应用：括号匹配（栈的最短实战）</h2>
<pre><code>bool validParen(const std::string&amp; s) {
    std::stack&lt;char&gt; st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            if (st.empty()) return false;             // 右边多出来了
            char t = st.top(); st.pop();
            if ((c == ')' &amp;&amp; t != '(') ||
                (c == ']' &amp;&amp; t != '[') ||
                (c == '}' &amp;&amp; t != '{')) return false; // 类型不配
        }
    }
    return st.empty();                                // 左边不能有剩余
}</code></pre>
<h2>还有哪些地方藏着栈</h2>
<ul>
<li>表达式求值、编译器语法分析</li>
<li>浏览器的后退、编辑器的撤销</li>
<li>DFS（显式栈或递归）、单调栈求「下一个更大元素」</li>
<li>函数递归本身的调用帧</li>
</ul>`
    },
    {
      id: 'ds09', cat: '线性结构', title: '表达式解析：中缀变后缀', readTime: '8 分钟',
      points: [
        '人习惯中缀 3+(4×5)，机器爱后缀 3 4 5 × + ——无括号、无优先级歧义',
        '后缀求值一遍扫描：数字压栈，运算符弹两个算完再压回',
        '中缀转后缀用调度场算法：优先级低的运算符先出栈',
        '左右操作数出栈顺序相反——减法除法最容易写反'
      ],
      content: `
<h2>三种写法</h2>
<table>
<tr><th>形式</th><th>例子</th><th>特点</th></tr>
<tr><td>中缀 infix</td><td>3 + 4 × 5</td><td>符合直觉，需括号与优先级规则</td></tr>
<tr><td>后缀 RPN</td><td>3 4 5 × +</td><td>从左到右直接算，编译器实际使用的形态</td></tr>
<tr><td>前缀</td><td>+ 3 × 4 5</td><td>从右到左算，偶见于 Lisp</td></tr>
</table>
<h2>后缀表达式求值</h2>
<pre><code>int evalRPN(std::vector&lt;std::string&gt;&amp; tokens) {
    std::stack&lt;int&gt; st;
    for (std::string&amp; t : tokens) {
        if (t != "+" &amp;&amp; t != "-" &amp;&amp; t != "*" &amp;&amp; t != "/") {
            st.push(std::stoi(t));                    // 数字直接入栈
        } else {
            int b = st.top(); st.pop();               // 先弹出的是右操作数
            int a = st.top(); st.pop();
            int r = 0;
            if (t == "+") r = a + b;
            else if (t == "-") r = a - b;
            else if (t == "*") r = a * b;
            else r = a / b;
            st.push(r);                               // 结果回栈
        }
    }
    return st.top();
}</code></pre>
<h2>调度场算法（中缀 → 后缀）规则</h2>
<ul>
<li>数字：直接输出</li>
<li>左括号：压栈；右括号：弹栈输出直到遇到左括号</li>
<li>运算符 o：把栈顶所有「优先级 ≥ o」的运算符弹出输出，再把 o 压栈</li>
<li>结束时把栈里剩余运算符全部弹出</li>
</ul>
<p>手写一遍 3+(4×5−2)→3 4 5 2 × + − 之类的样例，规则立刻内化。LeetCode 150（求后缀）与 题解区「计算器」系列（150→224→227）是经典进阶三连。</p>`
    },
    {
      id: 'ds10', cat: '线性结构', title: '队列与循环队列', readTime: '6 分钟',
      points: [
        '队列 = 一端进（队尾）另一端出（队头）：先进先出 FIFO',
        '朴素数组队列会「假溢出」：头尾指针绕圈解决 → 循环队列',
        '空/满判定二选一：牺牲一个槽位，或额外记录元素个数',
        'STL：queue 只给队头队尾；要两头操作用 deque',
        'BFS、层序遍历、任务调度、消息队列都是它'
      ],
      content: `
<h2>从排队买咖啡说起</h2>
<p>栈处理「最要紧的先办」，队列处理「先来先服务」。数组做队列的问题：出队后前面的格子不能复用（除非整体搬移），头尾指针在定长数组上绕圈即成<strong>循环队列</strong>。</p>
<h2>手写循环队列</h2>
<pre><code>class MyCircularQueue {
    std::vector&lt;int&gt; data_;
    int head_ = 0, size_ = 0;                 // 用 size_ 判空满，思路最清晰
public:
    MyCircularQueue(int cap) : data_(cap) {}

    bool enQueue(int v) {
        if (size_ == (int)data_.size()) return false;              // 满
        data_[(head_ + size_) % data_.size()] = v;                 // 尾下标
        ++size_;
        return true;
    }
    bool deQueue() {
        if (size_ == 0) return false;                              // 空
        head_ = (head_ + 1) % data_.size();                        // 头前移
        --size_;
        return true;
    }
    int front() const { return data_[head_]; }
    bool empty() const { return size_ == 0; }
};</code></pre>
<p>取模 <code>% capacity</code> 就是把一维数组「卷成环」的那只手。</p>
<h2>STL 对照</h2>
<pre><code>#include &lt;queue&gt;
std::queue&lt;int&gt; q;          // 底层默认 deque
q.push(1); q.push(2);
int x = q.front(); q.pop(); // 注意：pop 不返回值！先 front() 再 pop()

#include &lt;deque&gt;
std::deque&lt;int&gt; dq;         // 双端队列：两头都能进出，还能随机访问
dq.push_front(0); dq.pop_back();</code></pre>
<p>一个易错点：C++ 的 <code>queue::pop()</code> 只删不返（异常安全设计），想要元素先 <code>front()</code>。</p>`
    },
    {
      id: 'ds11', cat: '层次结构', title: '树与二叉树', readTime: '7 分钟',
      points: [
        '树 = 一对多的层次结构；二叉树 = 每个节点最多两个孩子',
        '第 i 层最多 2^(i−1) 个节点；高度 h 的满二叉树共 2^h − 1 个',
        '任意二叉树：叶子数 n0 = 度为 2 的节点数 n2 + 1',
        '深度优先（前/中/后序）用递归或栈；广度优先用队列（层序）',
        '二叉搜索树的中序遍历是升序 —— 最常用的性质'
      ],
      content: `
<h2>名词速查</h2>
<p>根 / 父 / 子 / 叶 / 度 / 深度 / 高度，与家族树完全对应。完全二叉树：除最后一层外全满且最后一层靠左齐——因此<strong>可以用数组存</strong>（下标 i 的孩子是 2i+1、2i+2），堆就是这么干的。</p>
<h2>节点定义与三种 DFS</h2>
<pre><code>struct TreeNode {
    int val;
    TreeNode *left, *right;
    TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

void preorder(TreeNode* r) {            // 根 → 左 → 右（复制树用）
    if (!r) return;
    std::cout &lt;&lt; r->val &lt;&lt; " ";
    preorder(r->left);
    preorder(r->right);
}
void inorder(TreeNode* r) {             // 左 → 根 → 右（BST 出升序）
    if (!r) return;
    inorder(r->left);
    std::cout &lt;&lt; r->val &lt;&lt; " ";
    inorder(r->right);
}
void postorder(TreeNode* r) {           // 左 → 右 → 根（删树/算目录大小）
    if (!r) return;
    postorder(r->left);
    postorder(r->right);
    std::cout &lt;&lt; r->val &lt;&lt; " ";
}</code></pre>
<p>三个函数只差一行 <code>cout</code> 的位置——「前中后序」命名的就是<strong>根节点什么时候被访问</strong>。</p>
<h2>层序遍历：队列登场</h2>
<pre><code>void levelOrder(TreeNode* root) {
    if (!root) return;
    std::queue&lt;TreeNode*&gt; q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();                    // 本层节点数：逐层处理的关键
        for (int i = 0; i &lt; sz; ++i) {
            TreeNode* node = q.front(); q.pop();
            std::cout &lt;&lt; node->val &lt;&lt; " ";
            if (node->left)  q.push(node->left);
            if (node->right) q.push(node->right);
        }
        std::cout &lt;&lt; std::endl;               // 一层结束
    }
}</code></pre>
<p>BFS 全家（最短层数、右视图、锯齿遍历）都是这两段的变体。</p>`
    },
    {
      id: 'ds12', cat: '层次结构', title: '二叉搜索树 BST', readTime: '7 分钟',
      points: [
        'BST：左子树所有值 &lt; 根 &lt; 右子树所有值，对每个节点递归成立',
        '查找/插入 = 每步砍掉一半，平均 O(log n)',
        '删除分三种情况：叶子直删；独苗提上来；双子找后继替换',
        '按有序输入会退化成链表 O(n) —— 所以才有 AVL / 红黑树自我平衡',
        'set / map 的内部就是（红黑）BST：有序 + log n 的代价'
      ],
      content: `
<h2>查找与插入</h2>
<pre><code>struct TreeNode { int val; TreeNode *left, *right;
    TreeNode(int v) : val(v), left(nullptr), right(nullptr) {} };

bool find(TreeNode* r, int v) {               // 像查字典：小往左，大往右
    while (r) {
        if (v == r->val) return true;
        r = (v &lt; r->val) ? r->left : r->right;
    }
    return false;
}

TreeNode* insert(TreeNode* r, int v) {        // 递归版：落到该落的位置
    if (!r) return new TreeNode(v);
    if (v &lt; r->val)  r->left  = insert(r->left, v);
    else if (v &gt; r->val) r->right = insert(r->right, v);
    return r;                                  // 重复值通常直接忽略
}</code></pre>
<h2>删除：情况三最考理解</h2>
<ul>
<li><strong>叶子节点</strong>：直接摘掉</li>
<li><strong>只有一个孩子</strong>：孩子顶替自己的位置</li>
<li><strong>两个孩子</strong>：用「右子树最小节点」（即后继）替换当前值，再去右子树删那个后继——后继必然 ≤ 1 个孩子，化归上面两种情况</li>
</ul>
<h2>退化与平衡</h2>
<p>按 1,2,3,4,5 顺序插入，BST 会歪成一条链表，一切 O(n)。自平衡 BST（AVL 严格平衡、红黑树近似平衡）通过旋转把高度钉在 O(log n)——代价是实现复杂。所以工程建议：<strong>原理手写一遍，实战用 std::set / std::map。</strong></p>
<pre><code>#include &lt;set&gt;
std::set&lt;int&gt; s = { 5, 1, 3 };
s.insert(4);
auto it = s.lower_bound(4);        // 第一个 ≥ 4 的元素：BST 能力的直接体现
// 遍历 s 天然是升序</code></pre>`
    },
    {
      id: 'ds13', cat: '层次结构', title: '堆与优先队列', readTime: '7 分钟',
      points: [
        '堆 = 完全二叉树 + 堆序性：父总比子小（小顶堆）或大（大顶堆）',
        '只用「堆顶」最快：取极值 O(1)，插入/删除 O(log n)',
        '用数组存：i 的孩子是 2i+1 与 2i+2，无指针零碎片',
        '自底向上建堆 O(n)——比逐个插入 O(n log n) 快',
        'STL priority_queue 默认大顶堆；Top-K 用大小为 K 的小顶堆'
      ],
      content: `
<h2>手写小顶堆</h2>
<pre><code>class MinHeap {
    std::vector&lt;int&gt; a_;
    static int parent(int i) { return (i - 1) / 2; }
    static int left(int i)   { return 2 * i + 1; }
    static int right(int i)  { return 2 * i + 2; }

    void siftUp(int i) {                    // 上浮：和更小的父亲换
        while (i &gt; 0 &amp;&amp; a_[i] &lt; a_[parent(i)]) {
            std::swap(a_[i], a_[parent(i)]);
            i = parent(i);
        }
    }
    void siftDown(int i) {                  // 下沉：和更小的孩子换
        int n = a_.size();
        for (;;) {
            int m = i, l = left(i), r = right(i);
            if (l &lt; n &amp;&amp; a_[l] &lt; a_[m]) m = l;
            if (r &lt; n &amp;&amp; a_[r] &lt; a_[m]) m = r;
            if (m == i) break;
            std::swap(a_[i], a_[m]);
            i = m;
        }
    }
public:
    void push(int v) { a_.push_back(v); siftUp(a_.size() - 1); }
    int  pop() {
        int top = a_[0];
        std::swap(a_[0], a_.back());        // 末尾补顶，再下沉归位
        a_.pop_back();
        if (!a_.empty()) siftDown(0);
        return top;
    }
    void build(std::vector&lt;int&gt;&amp; src) {     // O(n) 建堆
        a_ = src;
        for (int i = a_.size() / 2 - 1; i &gt;= 0; --i) siftDown(i);
    }
};</code></pre>
<h2>STL 与 Top-K</h2>
<pre><code>#include &lt;queue&gt;
std::priority_queue&lt;int&gt; mx;                    // 默认大顶堆：push/pop O(log n)
std::priority_queue&lt;int, std::vector&lt;int&gt;,
                    std::greater&lt;int&gt;&gt; mn;      // 小顶堆

// 数据流中维护「最大的 K 个数」：大小为 K 的小顶堆
std::vector&lt;int&gt; topK(std::vector&lt;int&gt;&amp; nums, int k) {
    std::priority_queue&lt;int, std::vector&lt;int&gt;, std::greater&lt;int&gt;&gt; pq;
    for (int x : nums) {
        if ((int)pq.size() &lt; k) pq.push(x);
        else if (x &gt; pq.top()) { pq.pop(); pq.push(x); }  // 踢掉最小的
    }
    std::vector&lt;int&gt; ans;
    while (!pq.empty()) { ans.push_back(pq.top()); pq.pop(); }
    return ans;
}</code></pre>
<p>另一应用：堆排序——反复 pop 即得升序，原地 O(1) 额外空间版本用下沉式 heapify。合并 K 个有序链表、Dijkstra 最短路，背后都是优先队列。</p>`
    },
    {
      id: 'ds14', cat: '散列', title: '哈希表', readTime: '7 分钟',
      points: [
        '哈希表 = 数组 + 哈希函数：key 算出下标，平均 O(1) 直达',
        '冲突不可避免：链地址法（桶挂链表）或开放寻址（往后探）',
        '负载因子过高就 rehash 扩容重排，均摊后仍 O(1)',
        'unordered_map/set 是散列；map/set 是红黑树（要有序才选它）',
        '三大经典用法：计数、判重、两数之和式「边走边记」'
      ],
      content: `
<h2>原理：把钥匙算成门牌号</h2>
<p>h(key) 是一个函数（对字符串是滚动多项式之类），再 <code>% 桶数</code> 落进数组。两个 key 撞进同一格就是<strong>冲突</strong>，两条主流解法：<strong>链地址法</strong>——每格挂链表（Java HashMap、多数实现）；<strong>开放寻址</strong>——往后找空位（探测），缓存友好但删起来麻烦。</p>
<h2>手写：开放寻址 + 线性探测</h2>
<pre><code>struct Entry { bool used = false; int key = 0, val = 0; };

class HashMap {
    std::vector&lt;Entry&gt; slots_;
    size_t probe(int key) const {                 // 找到 key 应在/已在的位置
        size_t i = std::hash&lt;int&gt;{}(key) % slots_.size();
        while (slots_[i].used &amp;&amp; slots_[i].key != key)
            i = (i + 1) % slots_.size();          // 撞了就往后挪一格
        return i;
    }
public:
    HashMap(size_t cap = 8) : slots_(cap) {}
    void put(int key, int val) { slots_[probe(key)] = { true, key, val }; }
    int  get(int key) const {
        const Entry&amp; e = slots_[probe(key)];
        return e.used ? e.val : -1;               // 真实实现应能区分「值为-1」
    }
};</code></pre>
<p>注意这个玩具版没做 rehash：装得越满，探测越长。标准做法是负载因子超过 0.7 左右就开一个更大的桶数组（通常翻倍），把全部元素重新放置——均摊成本依旧 O(1)。</p>
<h2>STL 实战：词频统计</h2>
<pre><code>#include &lt;unordered_map&gt;
std::vector&lt;std::string&gt; words = { "ai", "ml", "ai" };
std::unordered_map&lt;std::string, int&gt; cnt;
for (const std::string&amp; w : words) ++cnt[w];      // 两行完事，平均 O(n)

std::unordered_set&lt;int&gt; seen;                      // 判重同款
bool isNew = seen.insert(42).second;               // 插入成功返回 true</code></pre>`
    },
    {
      id: 'ds15', cat: '图形结构', title: '图', readTime: '8 分钟',
      points: [
        '图 = 顶点 + 边；有向/无向、带权/无权是两个维度',
        '存储二选一：邻接矩阵查边 O(1) 费空间；邻接表省空间遍历快',
        'DFS 用递归/栈一条路走到黑；BFS 用队列逐层扩散求最少步数',
        '拓扑排序 = DAG 上的「先修课」调度；入度为 0 先出发',
        'Dijkstra = BFS + 优先队列 + 贪心，边权非负适用'
      ],
      content: `
<h2>把世界看成点与边</h2>
<p>地铁线路、社交关系、依赖包、PyTorch 计算图，全是图。术语最小包：顶点、边、度（无向）/ 入度出度（有向）、路径、连通、环、DAG（有向无环图）。</p>
<h2>两种存法</h2>
<table>
<tr><th></th><th>邻接矩阵 g[u][v]</th><th>邻接表 g[u] = 邻居列表</th></tr>
<tr><td>空间</td><td>O(V²)</td><td>O(V + E)</td></tr>
<tr><td>查 u、v 是否相邻</td><td>O(1)</td><td>O(deg u)</td></tr>
<tr><td>遍历 u 的所有邻居</td><td>O(V)</td><td>O(deg u) ✅ 常态更优</td></tr>
<tr><td>适合</td><td>稠密图 / 需要快速判边</td><td>稀疏图（绝大多数实际问题）</td></tr>
</table>
<h2>手写：邻接表 + DFS + BFS</h2>
<pre><code>int n = 6;
std::vector&lt;std::vector&lt;int&gt;&gt; g(n);       // g[u] 存 u 的所有邻居
g[0] = {1, 2}; g[1] = {3}; g[2] = {3, 4}; g[3] = {5}; g[4] = {5};

void dfs(int u, std::vector&lt;bool&gt;&amp; vis) {
    vis[u] = true;                        // 进门先盖章，防死循环
    std::cout &lt;&lt; u &lt;&lt; " ";
    for (int v : g[u]) if (!vis[v]) dfs(v, vis);
}

void bfs(int s) {
    std::queue&lt;int&gt; q;
    std::vector&lt;bool&gt; vis(n, false);
    q.push(s); vis[s] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        std::cout &lt;&lt; u &lt;&lt; " ";
        for (int v : g[u]) if (!vis[v]) {         // 一层层向外扩
            vis[v] = true;
            q.push(v);
        }
    }
}</code></pre>
<p>BFS 天然求「无权图最少步数」：第一次到达某点时的层数就是最短距离。迷宫问题、 contagious 扩散、单词接龙（LeetCode 127）都是这套骨架。</p>
<h2>再往前一步</h2>
<ul>
<li>拓扑排序：不断取入度为 0 的点；能排完 ⇔ 无环（课程表问题）</li>
<li>Dijkstra：优先队列里总取当前距离最小的点松弛邻居——堆与图的合奏</li>
<li>并查集：近乎 O(1) 合并 / 查询连通性，Kruskal 最小生成树的引擎</li>
</ul>`
    },
    {
      id: 'ds16', cat: '经典算法', title: '查找：线性与二分', readTime: '6 分钟',
      points: [
        '无序只能线性扫描 O(n)；有序才可二分 O(log n)',
        '二分模板：闭区间 [l, r]，每步砍一半',
        'mid = l + (r − l) / 2 防加法溢出——面试细节分',
        '边界变体「第一个 ≥ target」= 半开区间写法 = STL lower_bound',
        '二分的本质：判定函数具有单调性（一段 false 一段 true）'
      ],
      content: `
<h2>标准二分</h2>
<pre><code>int binarySearch(const std::vector&lt;int&gt;&amp; a, int target) {
    int l = 0, r = (int)a.size() - 1;          // 闭区间 [l, r]
    while (l &lt;= r) {                            // 区间非空就继续
        int m = l + (r - l) / 2;                // 防 (l + r) 溢出
        if (a[m] == target) return m;
        if (a[m] &lt; target) l = m + 1;           // 目标在右半
        else r = m - 1;                          // 目标在左半
    }
    return -1;                                   // 找不到
}</code></pre>
<h2>边界二分：第一个 ≥ target 的位置</h2>
<pre><code>int lowerBound(const std::vector&lt;int&gt;&amp; a, int target) {
    int l = 0, r = (int)a.size();                // 半开区间 [l, r)
    while (l &lt; r) {
        int m = l + (r - l) / 2;
        if (a[m] &lt; target) l = m + 1;            // m 不合格，答案在右边
        else r = m;                              // m 可能是答案，收缩到 m
    }
    return l;                                    // 收敛即答案，可等于 size
}
// 等价于 std::lower_bound(a.begin(), a.end(), target) - a.begin()</code></pre>
<h2>循环不变量心法</h2>
<p>写二分的唯一可靠办法，是说清楚「每轮开始时，答案一定在 [l, r] 里」。收缩后这个性质还成立吗？成立即正确。背诵模板不如每次自己推一遍区间。</p>
<h2>会了的标志</h2>
<p>能在这些题里认出二分：旋转数组找最小、x 的平方根、爱吃香蕉的珂珂（二分答案）、搜索插入位置——最后一个是 STL lower_bound 的一行题。</p>`
    },
    {
      id: 'ds17', cat: '经典算法', title: '排序算法', readTime: '10 分钟',
      points: [
        'O(n²) 三件套（冒泡/选择/插入）小数据或近乎有序时仍有价值',
        '快排平均 O(n log n) 原地，最坏 O(n²)——随机化枢纽规避',
        '归并稳定、链表友好、外存排序主力；代价 O(n) 辅助空间',
        '堆排序原地 O(n log n)，但缓存不友好，实战慢于快排',
        'std::sort 是 introsort：快排 + 堆排 + 插排混合，永不退化'
      ],
      content: `
<h2>全家福</h2>
<table>
<tr><th>算法</th><th>平均</th><th>最坏</th><th>空间</th><th>稳定</th></tr>
<tr><td>冒泡</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>✅</td></tr>
<tr><td>插入</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>✅</td></tr>
<tr><td>选择</td><td>O(n²)</td><td>O(n²)</td><td>O(1)</td><td>❌</td></tr>
<tr><td>快排</td><td>O(n log n)</td><td>O(n²)</td><td>O(log n) 栈</td><td>❌</td></tr>
<tr><td>归并</td><td>O(n log n)</td><td>O(n log n)</td><td>O(n)</td><td>✅</td></tr>
<tr><td>堆排</td><td>O(n log n)</td><td>O(n log n)</td><td>O(1)</td><td>❌</td></tr>
</table>
<p>「稳定」= 相等元素不改变相对次序，多关键字排序时是关键性质。</p>
<h2>入门三兄弟</h2>
<pre><code>void bubbleSort(int a[], int n) {
    for (int i = 0; i &lt; n - 1; ++i) {
        bool moved = false;                      // 提前结束优化：一轮无交换即有序
        for (int j = 0; j &lt; n - 1 - i; ++j)
            if (a[j] &gt; a[j + 1]) { std::swap(a[j], a[j + 1]); moved = true; }
        if (!moved) break;
    }
}

void insertionSort(int a[], int n) {             // 打扑克抓牌插牌
    for (int i = 1; i &lt; n; ++i) {
        int x = a[i], j = i - 1;
        while (j &gt;= 0 &amp;&amp; a[j] &gt; x) { a[j + 1] = a[j]; --j; }
        a[j + 1] = x;
    }
}</code></pre>
<h2>O(n log n) 双雄</h2>
<pre><code>void quickSort(int a[], int l, int r) {
    if (l &gt;= r) return;
    int pivot = a[l + (r - l) / 2];              // 取中值，降低最坏概率
    int i = l, j = r;
    while (i &lt;= j) {                              // 双指针对向扫描
        while (a[i] &lt; pivot) ++i;
        while (a[j] &gt; pivot) --j;
        if (i &lt;= j) { std::swap(a[i], a[j]); ++i; --j; }
    }
    quickSort(a, l, j);                           // 左段 ≤ pivot
    quickSort(a, i, r);                           // 右段 ≥ pivot
}

void mergeSort(std::vector&lt;int&gt;&amp; a, int l, int r, std::vector&lt;int&gt;&amp; tmp) {
    if (r - l &lt;= 1) return;                       // 小区间递归到只剩 1 个
    int m = (l + r) / 2;
    mergeSort(a, l, m, tmp); mergeSort(a, m, r, tmp);
    int i = l, j = m, k = l;                      // 合并两个有序段
    while (i &lt; m &amp;&amp; j &lt; r) tmp[k++] = (a[i] &lt;= a[j]) ? a[i++] : a[j++];
    while (i &lt; m) tmp[k++] = a[i++];
    while (j &lt; r) tmp[k++] = a[j++];
    for (int t = l; t &lt; r; ++t) a[t] = tmp[t];
}   // 调用：std::vector&lt;int&gt; tmp(n); mergeSort(a, 0, n, tmp);</code></pre>
<h2>实战</h2>
<pre><code>std::vector&lt;int&gt; v = { 5, 2, 9 };
std::sort(v.begin(), v.end());                    // introsort，默认选择
std::stable_sort(v.begin(), v.end());             // 需要稳定（归并）
std::sort(v.begin(), v.end(), [](int a, int b) {  // 自定义比较：按绝对值
    return std::abs(a) &lt; std::abs(b);
});</code></pre>`
    },
    {
      id: 'ds18', cat: '经典算法', title: '递归与分治', readTime: '6 分钟',
      points: [
        '递归三要素：把问题变小、问题与原来同形、有基本情况刹车',
        '每次调用压一个栈帧；递归过深爆栈（段错误常见原因）',
        '朴素递归斐波那契指数级重复计算；记忆化或自底向上变 O(n)',
        '分治 = 递归拆半 + 合并结果：归并排序、快速幂、主定理',
        '能写循环就别滥用递归，除非结构本身是树（前中后序天然递归）'
      ],
      content: `
<h2>斐波那契的三次进化</h2>
<pre><code>// ① 朴素递归：调用次数 ≈ O(1.6^n)，n=45 就要等
int fib1(int n) { return n &lt; 2 ? n : fib1(n - 1) + fib1(n - 2); }

// ② 记忆化：同一子问题只算一次 → O(n)，但吃 O(n) 栈深与空间
int fib2(int n, std::vector&lt;int&gt;&amp; memo) {
    if (n &lt; 2) return n;
    int&amp; r = memo[n];
    if (r != -1) return r;
    return r = fib2(n - 1, memo) + fib2(n - 2, memo);
}

// ③ 自底向上滚动变量：O(n) 时间 O(1) 空间
int fib3(int n) {
    int a = 0, b = 1;
    for (int i = 2; i &lt;= n; ++i) { int c = a + b; a = b; b = c; }
    return n &lt; 2 ? n : b;
}</code></pre>
<h2>递归的真相：调用栈</h2>
<p>每层递归在调用栈上压一帧（参数、局部变量、返回地址）。这就是站内笔记《最小 PyTorch 训练循环》里「反向传播递归求梯度」、以及二叉树「后序遍历天然自底向上」的共同机制。深度上限：一般栈 1MB～8MB，每帧几十～几百字节，<strong>链状树退化成 10⁵ 深链时爆栈</strong>。</p>
<h2>分治模板</h2>
<pre><code>long long countPairs(const std::vector&lt;int&gt;&amp; a, int l, int r) {
    if (r - l &lt;= 1) return 0;
    int m = (l + r) / 2;
    long long ans = countPairs(a, l, m) + countPairs(a, m, r);  // 分解
    // ... 合并阶段统计跨左右的答案（如逆序对：归并时顺带计数）
    return ans;
}</code></pre>
<p>「分解 → 解决 → 合并」，归并排序、逆序对、最近点对全是这套骨架。</p>`
    },
    {
      id: 'ds19', cat: '经典算法', title: '算法设计思想：贪心 / DP / 回溯', readTime: '8 分钟',
      points: [
        '贪心：每步取局部最优且绝不回头——必须先证明它对全局最优成立',
        'DP：最优子结构 + 重叠子问题；状态定义、转移方程、边界三件套',
        '回溯：带剪枝的 DFS 枚举，解空间树太大就回头',
        '同一道题常三种方法都能做，DP 换时间、回溯换表达力',
        '写 DP 先手推 n=1,2,3 找规律，再翻译成代码'
      ],
      content: `
<h2>三兄弟分工</h2>
<table>
<tr><th>思想</th><th>决策方式</th><th>典型题</th></tr>
<tr><td>贪心</td><td>局部最优 → 全局最优（需证明）</td><td>区间合并、找零（1/2/5）、跳跃游戏</td></tr>
<tr><td>DP</td><td>枚举所有可能但记录复用</td><td>爬楼梯、背包、编辑距离、最长递增子序列</td></tr>
<tr><td>回溯</td><td>DFS 全枚举 + 剪枝</td><td>全排列、N 皇后、子集、数独</td></tr>
</table>
<h2>DP 三步走：爬楼梯</h2>
<p>每次 1 或 2 阶，上 n 级有几种走法？<strong>状态</strong>：dp[i] = 到第 i 阶的方法数；<strong>转移</strong>：dp[i] = dp[i−1] + dp[i−2]（最后一步要么跨 1 要么跨 2）；<strong>边界</strong>：dp[1]=1, dp[2]=2。于是——</p>
<pre><code>int climbStairs(int n) {
    if (n &lt;= 2) return n;
    int a = 1, b = 2;                            // 滚动两个值，空间 O(1)
    for (int i = 3; i &lt;= n; ++i) { int c = a + b; a = b; b = c; }
    return b;
}</code></pre>
<p>0/1 背包压成 1 维的精髓在一句：<code>for (int j = W; j &gt;= w; --j) dp[j] = max(dp[j], dp[j - w] + v);</code>——逆序保证每个物品只被用一次。</p>
<h2>回溯骨架：全排列</h2>
<pre><code>void permute(std::vector&lt;int&gt;&amp; nums, int first,
             std::vector&lt;std::vector&lt;int&gt;&gt;&amp; res) {
    if (first == (int)nums.size()) { res.push_back(nums); return; } // 收集解
    for (int i = first; i &lt; (int)nums.size(); ++i) {
        std::swap(nums[first], nums[i]);         // 做选择
        permute(nums, first + 1, res);           // 进入下一层
        std::swap(nums[first], nums[i]);         // 撤销选择（回溯）
    }
}</code></pre>
<p>「选择 → 递归 → 撤销」是全部回溯题的三层楼。</p>
<h2>贪心的陷阱</h2>
<p>硬币面值 {1, 3, 4} 凑 6：贪心先拿 4 再 1+1 共 3 枚；最优是 3+3 两枚。<strong>能用贪心的前提（如面值 1/2/5）需要证明，拿不准就交给 DP。</strong></p>`
    },
    {
      id: 'ds20', cat: '参考资料', title: '参考资料与刷题路线', readTime: '3 分钟',
      points: [
        '主线：本系列 23 篇 → 每个结构 LeetCode 刷 2~3 题 → 冲刺 Top 100',
        '《Hello 算法》免费多语言动画图解，与 C++ 实现对照极佳',
        'cppreference 是 STL 权威手册，写容器前先查它',
        '学完回访本站知识库：AI 里的计算图、KV Cache、Top-K 都是 DSA'
      ],
      content: `
<h2>书籍</h2>
<ul>
<li><a href="https://www.hello-algo.com/">《Hello 算法》</a>：免费开源、动画图解、提供 C++ 代码版，零基础友好</li>
<li>《算法（第 4 版）》Sedgewick：Java 表述但讲解与图解是教科书天花板</li>
<li>《算法导论》CLRS：字典式参考，考研与理论深挖</li>
<li>《C++ Primer》：语法卡壳时回来查</li>
</ul>
<h2>课程与文档</h2>
<ul>
<li><a href="https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/">MIT 6.006 算法导论公开课</a></li>
<li><a href="https://cs61b.org/">UC Berkeley CS61B</a>：数据结构课，作业质量极高（Java）</li>
<li><a href="https://zh.cppreference.com/">cppreference 中文</a>：容器 / 算法复杂度权威速查</li>
<li>对照阅读：<a href="https://www.runoob.com/c-dsa/c-dsa-tutorial.html">菜鸟教程 C 版数据结构</a>——同一知识体系的不同语言视角</li>
</ul>
<h2>刷题路线（力扣）</h2>
<p>题号均可点击直达力扣原题页面。</p>
<table>
<tr><th>阶段</th><th>目标</th></tr>
<tr><td>第 1~2 周</td><td>数组 / 链表：<a href="https://leetcode.cn/problems/merge-two-sorted-lists/" target="_blank" rel="noopener noreferrer">21</a>, <a href="https://leetcode.cn/problems/merge-sorted-array/" target="_blank" rel="noopener noreferrer">88</a>, <a href="https://leetcode.cn/problems/linked-list-cycle/" target="_blank" rel="noopener noreferrer">141</a>, <a href="https://leetcode.cn/problems/linked-list-cycle-ii/" target="_blank" rel="noopener noreferrer">142</a>, <a href="https://leetcode.cn/problems/reverse-linked-list/" target="_blank" rel="noopener noreferrer">206</a>, <a href="https://leetcode.cn/problems/palindrome-linked-list/" target="_blank" rel="noopener noreferrer">234</a></td></tr>
<tr><td>第 3~4 周</td><td>栈队列 / 二分：<a href="https://leetcode.cn/problems/valid-parentheses/" target="_blank" rel="noopener noreferrer">20</a>, <a href="https://leetcode.cn/problems/min-stack/" target="_blank" rel="noopener noreferrer">155</a>, <a href="https://leetcode.cn/problems/implement-stack-using-queues/" target="_blank" rel="noopener noreferrer">225</a>, <a href="https://leetcode.cn/problems/implement-queue-using-stacks/" target="_blank" rel="noopener noreferrer">232</a>, <a href="https://leetcode.cn/problems/search-in-rotated-sorted-array/" target="_blank" rel="noopener noreferrer">33</a>, <a href="https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/" target="_blank" rel="noopener noreferrer">34</a>, <a href="https://leetcode.cn/problems/binary-search/" target="_blank" rel="noopener noreferrer">704</a></td></tr>
<tr><td>第 5~7 周</td><td>树 / 堆：<a href="https://leetcode.cn/problems/binary-tree-inorder-traversal/" target="_blank" rel="noopener noreferrer">94</a>, <a href="https://leetcode.cn/problems/symmetric-tree/" target="_blank" rel="noopener noreferrer">101</a>, <a href="https://leetcode.cn/problems/binary-tree-level-order-traversal/" target="_blank" rel="noopener noreferrer">102</a>, <a href="https://leetcode.cn/problems/maximum-depth-of-binary-tree/" target="_blank" rel="noopener noreferrer">104</a>, <a href="https://leetcode.cn/problems/validate-binary-search-tree/" target="_blank" rel="noopener noreferrer">98</a>, <a href="https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/" target="_blank" rel="noopener noreferrer">236</a>, <a href="https://leetcode.cn/problems/kth-largest-element-in-an-array/" target="_blank" rel="noopener noreferrer">215</a>, <a href="https://leetcode.cn/problems/top-k-frequent-elements/" target="_blank" rel="noopener noreferrer">347</a></td></tr>
<tr><td>第 8~10 周</td><td>哈希 / 图 / 算法：<a href="https://leetcode.cn/problems/two-sum/" target="_blank" rel="noopener noreferrer">1</a>, <a href="https://leetcode.cn/problems/group-anagrams/" target="_blank" rel="noopener noreferrer">49</a>, <a href="https://leetcode.cn/problems/number-of-islands/" target="_blank" rel="noopener noreferrer">200</a>, <a href="https://leetcode.cn/problems/rotting-oranges/" target="_blank" rel="noopener noreferrer">994</a>, <a href="https://leetcode.cn/problems/course-schedule/" target="_blank" rel="noopener noreferrer">207</a>, <a href="https://leetcode.cn/problems/valid-parentheses/" target="_blank" rel="noopener noreferrer">20</a>, <a href="https://leetcode.cn/problems/lru-cache/" target="_blank" rel="noopener noreferrer">146</a> + 排序手写一遍</td></tr>
<tr><td>冲刺</td><td>LeetCode Hot 100 二刷，按专题收尾</td></tr>
</table>
<p>学完请回访知识库：AI 的 token 上下文、注意力、计算图与 RAG，正是这 23 篇教程的工业应用现场。</p>`
    },
];

/* ---------------- 典型例题（按章节 id 索引） ---------------- */
window.APP_DATA.dsEx = {
    ds11: [
      {
        q: '给定二叉树的根节点 root，返回它的最大深度。二叉树的最大深度是指从根节点到最远叶子节点的最长路径上的节点数。叶节点是指没有子节点的节点。\n\n示例 1：\n输入：root = [3,9,20,null,null,15,7]\n输出：3\n\n示例 2：\n输入：root = [1,null,2]\n输出：2\n\n示例 3：\n输入：root = []\n输出：0\n\n提示：树中节点数在范围 [0, 10^4] 内。',
        lv: '入门',
        sol: `<ul>
<li>递归定义：一棵树的最大深度 = 较深子树的最大深度 + 1（当前节点这一层）。</li>
<li>递归出口：空树没有任何节点，深度为 0。</li>
<li>每个节点只访问一次，合并左右结果只花常数时间。</li>
</ul>
<p><code>时间 O(n)，空间 O(h)</code>（h 为树高，即递归栈深度；链状退化时最坏 O(n)）。</p>
<blockquote><strong>易错点：</strong>漏写空树出口会在空指针上崩溃；返回值别忘了 +1。</blockquote>`,
        code: `#include <algorithm>
using namespace std;

// LeetCode 标准二叉树节点定义
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (root == nullptr) return 0; // 空树深度为 0
        // 整棵树的深度 = 较深子树的深度 + 当前节点这一层
        return max(maxDepth(root->left), maxDepth(root->right)) + 1;
    }
};`
      },
      {
        q: '给你一棵二叉树的根节点 root，翻转这棵二叉树，并返回其根节点。翻转即将每个节点的左子树和右子树整体互换。\n\n示例 1：\n输入：root = [4,2,7,1,3,6,9]\n输出：[4,7,2,9,6,3,1]\n\n示例 2：\n输入：root = []\n输出：[]\n\n示例 3：\n输入：root = [1]\n输出：[1]\n\n提示：树中节点数在范围 [0, 100] 内。',
        lv: '入门',
        sol: `<ul>
<li>递归思路：交换当前节点的左右子树，再递归翻转两棵子树；空树直接返回。</li>
<li>先交换再递归、或先递归再交换都正确，只要每个节点都被处理到。</li>
<li>典故：Homebrew 的作者 Max Howell 面试 Google 时在白板上写挂了这道题而被拒，"会写 Homebrew 为什么不会翻转二叉树"成为名场面——基础递归要练到条件反射。</li>
</ul>
<p><code>时间 O(n)，空间 O(h)</code>（h 为树高，递归栈深度）。</p>
<blockquote><strong>易错点：</strong>只交换了左右孩子的指针、忘了继续向下递归，翻转就不完整。</blockquote>`,
        code: `#include <algorithm>
using namespace std;

// LeetCode 标准二叉树节点定义
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (root == nullptr) return nullptr; // 空树无需翻转
        swap(root->left, root->right);       // 交换左右子树
        invertTree(root->left);              // 递归翻转左子树
        invertTree(root->right);             // 递归翻转右子树
        return root;
    }
};`
      }
    ],
    ds12: [
      {
        q: '给你一个二叉树的根节点 root，判断其是否是一个有效的二叉搜索树（BST）。有效 BST 的定义：节点的左子树只包含严格小于当前节点的数；节点的右子树只包含严格大于当前节点的数；所有左子树和右子树自身也必须是二叉搜索树。\n\n示例 1：\n输入：root = [2,1,3]\n输出：true\n\n示例 2：\n输入：root = [5,1,4,null,null,3,6]\n输出：false\n解释：根节点的值是 5，但右子树中值为 3 的节点小于 5，不是有效 BST。\n\n提示：树中节点数在范围 [1, 10^4] 内，节点值 -2^31 <= Node.val <= 2^31 - 1。',
        lv: '进阶',
        sol: `<ul>
<li>递归时给每个节点携带合法区间 (lo, hi)：节点值必须严格落在开区间内，空树视为合法。</li>
<li>走向左子树时把上界收紧为当前节点值，走向右子树时把下界收紧为当前节点值——这样才能保证"整棵左子树都小于根"，而不只是左孩子小于根。</li>
<li>边界用 long long：若初始化为 INT_MIN/INT_MAX，节点值恰好取到这两个值时会误判。</li>
<li>等价做法：中序遍历得到的值序列必须严格递增。</li>
</ul>
<p><code>时间 O(n)，空间 O(h)</code>。</p>
<blockquote><strong>易错点：</strong>只检查"左孩子 &lt; 根 &lt; 右孩子"是错的，例如 [5,1,4,null,null,3,6] 中 3 在右子树里却小于 5；比较要用 &lt;= 把相等值也判为非法。</blockquote>`,
        code: `#include <climits>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    bool isValidBST(TreeNode* root) {
        // 用 long long 作上下界：节点值可能取到 INT_MIN/INT_MAX，
        // 若用 int 初始化边界，遇到恰好等于边界的合法值会误判
        return check(root, LLONG_MIN, LLONG_MAX);
    }
private:
    // 检查 node 的所有节点值是否严格落在开区间 (lo, hi) 内
    bool check(TreeNode* node, long long lo, long long hi) {
        if (node == nullptr) return true;
        if (node->val <= lo || node->val >= hi) return false; // 排除相等
        return check(node->left, lo, node->val)   // 左子树上界收紧为当前值
            && check(node->right, node->val, hi); // 右子树下界收紧为当前值
    }
};`
      },
      {
        q: '给定一个二叉搜索树 root 和该树中两个不同节点 p、q，找到并返回这两个节点的最近公共祖先（LCA）。最近公共祖先的定义：对于树的两个节点 p、q，最近公共祖先表示为一个节点，它是 p 和 q 的祖先且深度尽可能大（一个节点也可以是它自己的祖先）。\n\n示例 1：\n输入：root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8\n输出：6\n解释：节点 2 和节点 8 的最近公共祖先是 6。\n\n示例 2：\n输入：root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4\n输出：2\n解释：节点 2 和节点 4 的最近公共祖先是 2，因为根据定义最近公共祖先可以为节点本身。',
        lv: '进阶',
        sol: `<ul>
<li>利用 BST 的有序性，从根往下一次遍历：p、q 都小于当前节点 → 答案在左子树；都大于 → 答案在右子树。</li>
<li>第一次分叉（一个往左一个往右），或某个节点值等于 p、q 之一时，当前节点就是最近公共祖先。</li>
<li>比普通二叉树的 LCA 简单得多：不需要后序收集信息，也不需要记录父指针。</li>
</ul>
<p><code>时间 O(h)，空间 O(1)</code>（h 为树高）。</p>
<blockquote><strong>易错点：</strong>节点值等于 p 或 q 时不能再往下走——此时它本身就是答案，继续走会错过。</blockquote>`,
        code: `using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        TreeNode* cur = root;
        while (cur != nullptr) {
            if (p->val < cur->val && q->val < cur->val) {
                cur = cur->left; // p、q 都更小，公共祖先在左子树
            } else if (p->val > cur->val && q->val > cur->val) {
                cur = cur->right; // p、q 都更大，公共祖先在右子树
            } else {
                return cur; // 第一次分叉或其中一者等于当前节点：就是答案
            }
        }
        return nullptr; // 题目保证有解，理论上不会走到这里
    }
};`
      }
    ],
    ds13: [
      {
        q: '给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。\n\n示例 1：\n输入：nums = [3,2,1,5,6,4], k = 2\n输出：5\n\n示例 2：\n输入：nums = [3,2,3,1,2,4,5,5,6], k = 4\n输出：4\n\n提示：1 <= k <= nums.length <= 10^5，数组元素在 [-10^4, 10^4] 范围内。',
        lv: '进阶',
        sol: `<ul>
<li>维护一个大小不超过 K 的<strong>最小堆</strong>：逐个入堆，堆大小超过 K 就弹出堆顶（当前最小值）。</li>
<li>遍历结束后堆里恰好是最大的 K 个元素，堆顶就是第 K 大。</li>
<li>三种策略对比：整体排序 O(n log n)；快速选择平均 O(n) 但最坏 O(n^2)，且会打乱原数组；大小为 K 的最小堆 O(n log k)，k 通常远小于 n。</li>
<li>堆解法只需 O(k) 额外内存，特别适合数据流或海量数据求 Top K。</li>
</ul>
<p><code>时间 O(n log k)，空间 O(k)</code>。</p>
<blockquote><strong>易错点：</strong>求第 K 大必须用小根堆（greater&lt;int&gt;），大根堆无法在超容时弹出"当前最小的那一个"。</blockquote>`,
        code: `#include <queue>
#include <vector>
#include <functional>
using namespace std;

class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        // priority_queue 默认是大根堆，greater<int> 改成小根堆
        priority_queue<int, vector<int>, greater<int>> pq;
        for (int x : nums) {
            pq.push(x);
            if ((int)pq.size() > k) {
                pq.pop(); // 超过 k 就弹掉当前最小的，留下最大的 k 个
            }
        }
        return pq.top(); // 堆顶恰好是第 k 大的元素
    }
};`
      }
    ],
    ds14: [
      {
        q: '给定两个字符串 s 和 t，编写一个函数来判断 t 是否是 s 的字母异位词（即两个字符串包含的字母及各字母的出现次数完全相同，只是排列可能不同）。\n\n示例 1：\n输入：s = "anagram", t = "nagaram"\n输出：true\n\n示例 2：\n输入：s = "rat", t = "car"\n输出：false\n\n提示：1 <= s.length, t.length <= 5 * 10^4，s 和 t 仅包含小写字母。',
        lv: '入门',
        sol: `<ul>
<li>两字符串长度不同直接返回 false。</li>
<li>开一个长度 26 的计数数组：扫 s 时对应字母 +1，扫 t 时 -1。</li>
<li>最后 26 个计数全部为 0，说明每个字母出现次数完全一致，是异位词。</li>
<li>相比排序后比较的 O(n log n)，计数法只需一次线性扫描。</li>
</ul>
<p><code>时间 O(n)，空间 O(1)</code>（计数数组固定 26，与 n 无关）。</p>
<blockquote><strong>易错点：</strong>该写法依赖"只含小写字母"的题目条件；若含其他字符，改用哈希表计数。</blockquote>`,
        code: `#include <string>
using namespace std;

class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.size() != t.size()) return false; // 长度不同必然不是异位词
        int cnt[26] = {0};                      // 26 个小写字母的计数桶
        for (char c : s) cnt[c - 'a']++;        // s 中的字母计数加一
        for (char c : t) cnt[c - 'a']--;        // t 中的字母计数减一
        for (int i = 0; i < 26; i++) {
            if (cnt[i] != 0) return false;      // 有字母出现次数对不上
        }
        return true;                            // 全部归零：完全一致
    }
};`
      },
      {
        q: '给你一个整数数组 nums 和一个整数 k，请统计并返回该数组中和恰好为 k 的子数组的个数。子数组是数组中元素的连续非空序列。\n\n示例 1：\n输入：nums = [1,1,1], k = 2\n输出：2\n\n示例 2：\n输入：nums = [1,2,3], k = 3\n输出：2\n\n提示：1 <= nums.length <= 2 * 10^4，-1000 <= nums[i] <= 1000，-10^7 <= k <= 10^7。',
        lv: '挑战',
        sol: `<ul>
<li>记 pre[j] 为前 j 个元素的前缀和，则子数组和可写成 pre[j] - pre[i]；"和为 k" 即 pre[j] - pre[i] = k，变形为 pre[i] = pre[j] - k。</li>
<li>从左到右枚举右端点，用哈希表维护"每个前缀和出现的次数"，查询有多少个前缀和等于 pre - k，把双重枚举 O(n^2) 降到一次遍历。</li>
<li>初始化 cnt[0] = 1（空前缀）：覆盖"从头开始的子数组恰好等于 k"的情况。</li>
</ul>
<p><code>时间 O(n)，空间 O(n)</code>。</p>
<blockquote><strong>易错点：</strong>必须先查询 cnt[pre - k]，再把当前 pre 存入哈希表；顺序反了，k = 0 时会把空子数组也统计进去。</blockquote>`,
        code: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<long long, int> cnt; // 前缀和 -> 出现次数
        cnt[0] = 1;  // 空前缀：覆盖从下标 0 开始的子数组
        long long pre = 0;
        int ans = 0;
        for (int x : nums) {
            pre += x;
            // 查询之前有多少个前缀和等于 pre - k，
            // 每一个都对应一段和为 k 的子数组
            auto it = cnt.find(pre - k);
            if (it != cnt.end()) ans += it->second;
            cnt[pre]++; // 再存入当前前缀和，避免把空子数组算进去
        }
        return ans;
    }
};`
      }
    ],
    ds15: [
      {
        q: '给你一个由字符 1（陆地）和 0（水）组成的二维网格 grid，请计算网格中岛屿的数量。岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。你可以假设网格的四条边均被水包围。\n\n示例 1：\n输入：grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]\n输出：1\n\n示例 2：\n输入：grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]\n输出：3\n\n提示：1 <= grid.length, grid[i].length <= 300，grid[i][j] 为 0 或 1。',
        lv: '进阶',
        sol: `<ul>
<li>顺序扫描网格：遇到一个还是 '1' 的格子，说明发现一座新岛，计数加一。</li>
<li>从该格子出发 DFS，沿上下左右扩散，把整座岛的每个 '1' 改写成 '0'（沉岛），防止同一座岛被重复统计。</li>
<li>沉岛代替 visited 标记数组，省一份标记空间，代价是修改了输入数据。</li>
</ul>
<p><code>时间 O(n×m)，空间 O(n×m)</code>（最坏全是陆地时递归栈深达格子总数）。</p>
<blockquote><strong>易错点：</strong>进入递归前先判断越界和是否为 '1'；网格很大时可改用 BFS 或并查集，避免递归栈溢出。</blockquote>`,
        code: `#include <vector>
using namespace std;

class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        int n = grid.size(), m = grid[0].size(), ans = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == '1') {
                    ans++;           // 发现一座新岛
                    dfs(grid, i, j); // 沉掉整座岛，防止重复计数
                }
            }
        }
        return ans;
    }
private:
    void dfs(vector<vector<char>>& grid, int x, int y) {
        int n = grid.size(), m = grid[0].size();
        // 越界或是水，直接返回
        if (x < 0 || x >= n || y < 0 || y >= m || grid[x][y] != '1') return;
        grid[x][y] = '0'; // 沉岛
        dfs(grid, x + 1, y);
        dfs(grid, x - 1, y);
        dfs(grid, x, y + 1);
        dfs(grid, x, y - 1);
    }
};`
      },
      {
        q: '你这个学期必须选修 numCourses 门课程，编号为 0 到 numCourses - 1。有些课程有先修要求，prerequisites[i] = [a, b] 表示想修课程 a，必须先修完课程 b。判断是否可能完成所有课程：如果可以，返回 true；否则返回 false。\n\n示例 1：\n输入：numCourses = 2, prerequisites = [[1,0]]\n输出：true\n解释：先修完课程 0，再修课程 1。\n\n示例 2：\n输入：numCourses = 2, prerequisites = [[1,0],[0,1]]\n输出：false\n解释：两门课互相依赖，形成环，无法全部完成。\n\n提示：1 <= numCourses <= 2000，0 <= prerequisites.length <= 5000。',
        lv: '进阶',
        sol: `<ul>
<li>把课程看作节点、先修关系 (a, b) 看成有向边 b → a，"能否修完所有课"等价于"这张有向图是否无环"。</li>
<li>拓扑排序（Kahn 算法）：统计每个点的入度，入度为 0 的先入队；每处理一个点，就把它指向的点的入度减 1，减到 0 的点继续入队。</li>
<li>统计处理掉的点数：等于 n 说明全部课程都能排出顺序（无环），否则有环无法完成。</li>
</ul>
<p><code>时间 O(n + m)，空间 O(n + m)</code>（n 为课程数，m 为先修关系数）。</p>
<blockquote><strong>易错点：</strong>边方向别建反——"修完 b 才能修 a"建边 b → a 并把 a 的入度加 1；方向建反虽不影响有无环的判断，但输出的修课顺序是颠倒的。</blockquote>`,
        code: `#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> g(numCourses); // 邻接表
        vector<int> indeg(numCourses, 0);  // 入度数组
        for (auto& p : prerequisites) {
            g[p[1]].push_back(p[0]); // 修完 p[1] 才能修 p[0]，建边 p[1] -> p[0]
            indeg[p[0]]++;
        }
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (indeg[i] == 0) q.push(i); // 入度为 0 的课程可以直接修
        }
        int done = 0;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            done++;
            for (int v : g[u]) {
                if (--indeg[v] == 0) q.push(v); // 先修课全部完成
            }
        }
        return done == numCourses; // 全部处理完说明无环
    }
};`
      }
    ],
    ds17: [
      {
        q: '给你两个按非递减顺序排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n，分别表示 nums1 和 nums2 中的元素数目。请你把 nums2 合并到 nums1 中，使合并后的数组同样按非递减顺序排列。注意：nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个位置为 0，应被 nums2 的元素替换；nums2 的长度为 n。要求就地合并，不返回新数组。\n\n示例 1：\n输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3\n输出：[1,2,2,3,5,6]\n\n示例 2：\n输入：nums1 = [1], m = 1, nums2 = [], n = 0\n输出：[1]\n\n示例 3：\n输入：nums1 = [0], m = 0, nums2 = [1], n = 1\n输出：[1]',
        lv: '入门',
        sol: `<ul>
<li>nums1 尾部预留了 n 个空位，若从前往后合并会覆盖 nums1 中还没比较的元素，所以从后往前填。</li>
<li>三个指针：i 指向 nums1 有效部分末尾，j 指向 nums2 末尾，p 指向 nums1 的物理末尾；每步把两者中较大的放到 p，指针前移。</li>
<li>循环条件只需 j &gt;= 0：nums2 先用完时，nums1 剩余元素本来就在正确位置上。</li>
</ul>
<p><code>时间 O(m + n)，空间 O(1)</code>。</p>
<blockquote><strong>易错点：</strong>循环条件写成 i &gt;= 0 会漏掉 nums2 中剩余的较小元素，导致答案错误。</blockquote>`,
        code: `#include <vector>
using namespace std;

class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        // 从后往前填：尾部是空位，不会覆盖 nums1 还没比较的元素
        int i = m - 1;     // nums1 有效部分末尾
        int j = n - 1;     // nums2 末尾
        int p = m + n - 1; // nums1 物理末尾
        while (j >= 0) {   // 只需关心 nums2 是否用完
            if (i >= 0 && nums1[i] > nums2[j]) {
                nums1[p--] = nums1[i--]; // nums1 的更大，放尾部
            } else {
                nums1[p--] = nums2[j--]; // 否则放 nums2 的
            }
        }
    }
};`
      },
      {
        q: '给定一个大小为 n 的数组 nums，返回其中的多数元素。多数元素是指在数组中出现次数大于 n/2 的元素。你可以假设数组是非空的，并且给定的数组总是存在多数元素。\n\n示例 1：\n输入：nums = [3,2,3]\n输出：3\n\n示例 2：\n输入：nums = [2,2,1,1,1,2,2]\n输出：2\n\n提示：n == nums.length，1 <= n <= 5 * 10^4，数组元素在 [-10^9, 10^9] 范围内。你可以尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。',
        lv: '进阶',
        sol: `<ul>
<li>摩尔投票法：维护候选 cand 与计数 cnt。遇到相同元素 cnt 加 1，不同元素 cnt 减 1（互相抵消），cnt 减到 0 时换当前元素为新候选。</li>
<li>为什么候选必对：把多数元素记为 +1、其余元素记为 -1，总和一定大于 0。每次抵消都是"一个多数元素至多换掉一个非多数元素"，而非多数元素彼此之间也会互相消耗，因此多数元素不可能被完全抵消，活到最后的候选必然是它。</li>
<li>本题保证多数元素存在，故无需验证；若不保证，需再扫一遍统计候选出现次数是否超过一半。</li>
</ul>
<p><code>时间 O(n)，空间 O(1)</code>（比哈希计数、排序更省空间）。</p>
<blockquote><strong>易错点：</strong>cnt 为 0 时要先把当前元素设为新候选，再继续计数。</blockquote>`,
        code: `#include <vector>
using namespace std;

class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int cand = 0, cnt = 0; // 候选元素与其计数
        for (int x : nums) {
            if (cnt == 0) cand = x;      // 抵消完了，换当前元素当候选
            cnt += (x == cand) ? 1 : -1; // 相同加一，不同互相抵消
        }
        // 题目保证多数元素存在，最后候选必为答案，无需再验证；
        // 若不保证存在，需再扫一遍统计 cand 的出现次数是否超过一半
        return cand;
    }
};`
      }
    ],
    ds18: [
      {
        q: '实现函数 pow(x, n)，即计算 x 的整数 n 次幂（即 x^n）。要求不得使用库函数，并且不使用朴素的 O(n) 连乘。\n\n示例 1：\n输入：x = 2.00000, n = 10\n输出：1024.00000\n\n示例 2：\n输入：x = 2.10000, n = 3\n输出：9.26100\n\n示例 3：\n输入：x = 2.00000, n = -2\n输出：0.25000\n解释：2 的 -2 次幂等于 1/4，即 0.25。\n\n提示：-100.0 < x < 100.0，-2^31 <= n <= 2^31 - 1；要么 x 不为零，要么 n > 0。',
        lv: '进阶',
        sol: `<ul>
<li>快速幂：把指数按二进制拆分，指数每折半一次、底数平方一次，把 O(n) 次连乘降到 O(log n) 次。</li>
<li>指数当前二进制位为 1 时，把对应的底数乘进答案。</li>
<li>n 为负数时：先按正指数算出 x^|n|，再取倒数（或先把底数换成 1/x）。</li>
<li>坑点：n = INT_MIN 时直接取反会溢出（int 存不下 +2147483648），必须先转 long long。</li>
</ul>
<p><code>时间 O(log n)，空间 O(1)</code>。</p>
<blockquote><strong>易错点：</strong>循环里"先判最低位、再平方、再右移"的顺序不能乱。</blockquote>`,
        code: `class Solution {
public:
    double myPow(double x, int n) {
        long long e = n; // INT_MIN 直接取反会溢出，先转 long long
        if (e < 0) {
            e = -e;
            x = 1.0 / x; // 负指数：底数取倒数，指数变正
        }
        double ans = 1.0;
        while (e > 0) {
            if (e & 1) ans *= x; // 当前二进制位为 1，乘入答案
            x *= x;              // 底数平方
            e >>= 1;             // 指数折半
        }
        return ans;
    }
};`
      }
    ],
    ds19: [
      {
        q: '给你一个整数数组 nums，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。子数组是数组中的一个连续部分。\n\n示例 1：\n输入：nums = [-2,1,-3,4,-1,2,1,-5,4]\n输出：6\n解释：连续子数组 [4,-1,2,1] 的和最大，为 6。\n\n示例 2：\n输入：nums = [1]\n输出：1\n\n示例 3：\n输入：nums = [5,4,-1,7,8]\n输出：23\n\n提示：1 <= nums.length <= 10^5，-10^4 <= nums[i] <= 10^4。要求 O(n) 时间、O(1) 额外空间。',
        lv: '进阶',
        sol: `<ul>
<li>Kadane 算法：定义 dp[i] 为"以 nums[i] 结尾的最大子数组和"，转移 dp[i] = max(nums[i], dp[i-1] + nums[i])——前面的和为负时果断舍弃，从当前元素重新开始。</li>
<li>答案是所有 dp[i] 的最大值，不一定出现在末尾。</li>
<li>dp[i] 只依赖 dp[i-1]，用滚动变量代替整个 dp 数组，空间降到 O(1)。</li>
</ul>
<p><code>时间 O(n)，空间 O(1)</code>。</p>
<blockquote><strong>易错点：</strong>初值要用 nums[0] 而不是 0——数组可能全是负数，此时答案就是最大的那个负数。</blockquote>`,
        code: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // cur：以当前元素结尾的最大子数组和（滚动变量，代替 dp 数组）
        int cur = nums[0];
        int ans = nums[0]; // 全负数数组也能正确处理
        for (int i = 1; i < (int)nums.size(); i++) {
            // 要么把前面的和续上，要么从当前元素重新开始
            cur = max(nums[i], cur + nums[i]);
            ans = max(ans, cur); // 答案是所有 dp 值的最大值
        }
        return ans;
    }
};`
      },
      {
        q: '给你一个整数数组 nums，数组中的元素互不相同。返回该数组所有可能的子集（幂集）。解集不能包含重复的子集，你可以按任意顺序返回解集。\n\n示例 1：\n输入：nums = [1,2,3]\n输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]\n\n示例 2：\n输入：nums = [0]\n输出：[[],[0]]\n\n提示：1 <= nums.length <= 10，nums 中所有元素互不相同。',
        lv: '进阶',
        sol: `<ul>
<li>回溯模板三步：做选择（元素加入路径）→ 递归决策下一个位置 → 撤销选择（弹出路径尾元素）。</li>
<li>用下标 idx 表示当前决策到第几个元素，每个元素有"选 / 不选"两个分支；idx 到达 n 时把当前路径复制进答案。</li>
<li>n 个元素共 2^n 个子集，回溯树恰好枚举每一种。</li>
<li>另一写法：枚举 0 到 2^n - 1 的二进制掩码，每一位决定对应元素选或不选，代码更短，但回溯模板更通用。</li>
</ul>
<p><code>时间 O(n × 2^n)，空间 O(n)</code>（不计答案本身：递归深 O(n)，每个子集复制花 O(n)）。</p>
<blockquote><strong>易错点：</strong>撤销（pop_back）必须放在递归返回之后，否则路径会把上一层的残留带到下一层。</blockquote>`,
        code: `#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> ans;
        vector<int> path; // 当前已选的元素
        dfs(nums, 0, path, ans);
        return ans;
    }
private:
    void dfs(vector<int>& nums, int idx, vector<int>& path, vector<vector<int>>& ans) {
        if (idx == (int)nums.size()) { // 所有元素都决策完毕
            ans.push_back(path);
            return;
        }
        dfs(nums, idx + 1, path, ans); // 分支一：不选 nums[idx]
        path.push_back(nums[idx]);     // 选择
        dfs(nums, idx + 1, path, ans); // 递归
        path.pop_back();               // 撤销
    }
};`
      }
    ],
    ds03: [
      {
        q: `纸面复杂度分析题：下面三段伪 C++ 代码均以 n 为输入规模，假设 n 足够大。请分别给出段 A、段 B、段 C 的时间复杂度，并简要说明理由。

段 A（单层循环求和）：
s = 0
for i = 1 .. n: s += i

段 B（双层循环，内层求和）：
s = 0
for i = 1 .. n:
    for j = 1 .. n: s += i * j

段 C（朴素递归斐波那契）：
fib(n):
    if n ≤ 1: return n
    return fib(n - 1) + fib(n - 2)

提示：对段 C 请从"递归调用树"的角度分析节点（调用）总数。`,
        lv: '入门',
        sol: `<ul>
<li><strong>段 A</strong>：单层循环，循环体是一次 O(1) 的加法，恰好执行 n 次，故时间复杂度为 O(n)。</li>
<li><strong>段 B</strong>：内外两层循环，内层对每个 i 都执行 n 次加法，总执行次数为 n × n，故为 O(n²)。嵌套循环层数相乘，是出现平方级复杂度的典型场景。</li>
<li><strong>段 C</strong>：朴素递归 fib 每次调用分裂成两次子调用，调用次数满足 T(n) = T(n-1) + T(n-2) + O(1)，增长速度与斐波那契数列本身同阶，约为 1.618 的 n 次方，量级记作 O(1.6ⁿ)，属于指数级。</li>
<li><strong>如何理解"递归树节点数"</strong>：把每一次函数调用画成树上的一个节点，一次调用展开出的所有调用就是它的孩子。段 C 的递归树深度约 n 层，且每层节点数近似按黄金比 1.618 增长，节点总数就是总调用次数，因此呈指数爆炸；树中 fib(n-2) 等子问题被大量重复计算，这正是它慢的根本原因。</li>
</ul>
<p>汇总：<code>时间 A 为 O(n)，B 为 O(n²)，C 为 O(1.6ⁿ)；空间 A、B 为 O(1)，C 为递归栈深度 O(n)</code>。</p>
<blockquote><strong>提醒</strong>：复杂度看的是"基本操作次数随输入规模的增长趋势"，不是代码行数；分析递归时，数一数递归树的节点总数是最直接的办法。</blockquote>`
      }
    ],
    ds05: [
      {
        q: `LeetCode 27 移除元素：给你一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素，并返回移除后数组的新长度。不要使用额外的数组空间，必须仅使用 O(1) 额外空间并原地修改输入数组；元素的顺序可以改变，不需要考虑数组中超出新长度后面的元素。请用双指针的快慢写法实现。
示例：nums = [3,2,2,3]，val = 3，输出新长度 2，且数组前两个元素为 [2,2]。
示例：nums = [0,1,2,2,3,0,4,2]，val = 2，输出新长度 5，且数组前五个元素为 [0,1,3,0,4]。`,
        lv: '入门',
        sol: `<ul>
<li><strong>快慢双指针</strong>：slow 指向"保留区"的下一个写入位置，fast 负责扫描整个数组。</li>
<li>fast 遇到不等于 val 的元素，就把它复制到 slow 位置并让 slow 前进；等于 val 的元素直接跳过，相当于被原地删除。</li>
<li>扫描结束时，nums 的前 slow 个位置就是全部保留元素，slow 恰好是新长度。</li>
</ul>
<p><code>时间 O(n)，空间 O(1)</code>。</p>
<blockquote><strong>易错点</strong>：返回的是 slow 本身（写入位置下标恰好等于保留个数），不要写成 slow + 1；题目允许改变元素顺序，无需真的搬动或删除数组末尾的元素。</blockquote>`,
        code: `#include <iostream>
#include <vector>
using namespace std;

// 快慢双指针：slow 是"保留区"的下一个写入位置
int removeElement(vector<int>& nums, int val) {
    int slow = 0;
    for (int fast = 0; fast < (int)nums.size(); ++fast) {
        if (nums[fast] != val) {
            nums[slow++] = nums[fast];   // 保留不等于 val 的元素
        }
    }
    return slow;                          // slow 即新长度
}

int main() {
    vector<int> nums = {3, 2, 2, 3};
    int val = 3;
    int len = removeElement(nums, val);
    cout << len << std::endl;             // 输出 2
    for (int i = 0; i < len; ++i) cout << nums[i] << " ";
    cout << std::endl;                    // 输出 2 2
    return 0;
}`
      },
      {
        q: `LeetCode 189 轮转数组：给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。要求原地修改数组，空间复杂度为 O(1)。
示例：nums = [1,2,3,4,5,6,7]，k = 3，输出 [5,6,7,1,2,3,4]。
示例：nums = [-1,-100,3,99]，k = 2，输出 [3,99,-1,-100]。`,
        lv: '进阶',
        sol: `<ul>
<li><strong>三次翻转法</strong>：先把整个数组翻转，再翻转前 k 个，最后翻转后 n-k 个，即得到向右旋转 k 位的结果。例：[1,2,3,4,5,6,7] → 整体翻转 [7,6,5,4,3,2,1] → 翻前 3 个 [5,6,7,4,3,2,1] → 翻后 4 个 [5,6,7,1,2,3,4]。</li>
<li><strong>先取模</strong>：k 可能大于 n，而旋转 n 位等于没转，所以先执行 k %= n，把 k 归一到 [0, n-1]。</li>
<li>每次翻转都是原地交换首尾元素，不借助任何额外数组。</li>
</ul>
<p><code>时间 O(n)，空间 O(1)</code>（每个元素被翻转触及常数次）。</p>
<blockquote><strong>易错点</strong>：漏掉 k %= n 时，k 很大会导致翻转区间越界；两段翻转的边界（前 k 个、后 n-k 个）必须与取模后的 k 保持一致。</blockquote>`,
        code: `#include <iostream>
#include <vector>
using namespace std;

// 反转 nums[l..r] 闭区间
void reversePart(vector<int>& nums, int l, int r) {
    while (l < r) swap(nums[l++], nums[r--]);
}

void rotate(vector<int>& nums, int k) {
    int n = (int)nums.size();
    if (n == 0) return;
    k %= n;                       // 关键：k 可能大于 n
    if (k == 0) return;
    reversePart(nums, 0, n - 1);  // 第一步：整体翻转
    reversePart(nums, 0, k - 1);  // 第二步：翻转前 k 个
    reversePart(nums, k, n - 1);  // 第三步：翻转后 n-k 个
}

int main() {
    vector<int> nums = {1, 2, 3, 4, 5, 6, 7};
    rotate(nums, 3);
    for (int x : nums) cout << x << " ";
    cout << std::endl;            // 输出 5 6 7 1 2 3 4
    return 0;
}`
      }
    ],
    ds06: [
      {
        q: `LeetCode 21 合并两个有序链表：将两个升序链表合并为一个新的升序链表并返回，新链表是通过拼接给定的两个链表的所有节点组成的。请用哑节点加迭代（依次摘取较小节点）的写法实现。
示例：l1 = [1,2,4]，l2 = [1,3,4]，输出 [1,1,2,3,4,4]。
示例：l1 = []，l2 = [0]，输出 [0]。`,
        lv: '入门',
        sol: `<ul>
<li><strong>哑节点 dummy</strong>：在结果链表前挂一个哨兵节点，免去"新链表头"的特殊判断，最后返回 dummy.next。</li>
<li><strong>依次摘取较小者</strong>：比较两条链表的当前节点，把值较小的接到结果尾部并后移该链表指针，重复直到某条链表走完。</li>
<li>收尾时把还没走完的那条链表整体接到尾部（它本身有序，且值都不小于已接部分）。</li>
</ul>
<p><code>时间 O(m+n)，空间 O(1)</code>（只重用原节点，不新建节点）。</p>
<blockquote><strong>易错点</strong>：循环结束后必须把剩余链表接上，漏掉会整段丢节点；返回的是 dummy.next 而不是 dummy；始终维护一个 tail 指针指向结果尾部，避免每次都从头找尾。</blockquote>`,
        code: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* mergeTwoLists(ListNode* a, ListNode* b) {
    ListNode dummy(0);              // 哑节点，简化对头的处理
    ListNode* tail = &dummy;
    while (a && b) {
        if (a->val <= b->val) { tail->next = a; a = a->next; }
        else                  { tail->next = b; b = b->next; }
        tail = tail->next;          // 结果链表尾指针后移
    }
    tail->next = a ? a : b;         // 把没比完的一截直接接上
    return dummy.next;
}

int main() {
    ListNode* a = new ListNode(1); a->next = new ListNode(2); a->next->next = new ListNode(4);
    ListNode* b = new ListNode(1); b->next = new ListNode(3); b->next->next = new ListNode(4);
    ListNode* head = mergeTwoLists(a, b);
    for (; head; head = head->next) cout << head->val << " ";
    cout << std::endl;              // 输出 1 1 2 3 4 4
    return 0;
}`
      },
      {
        q: `LeetCode 141 环形链表：给你一个链表的头节点 head，判断链表中是否有环。如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达它，则链表中存在环。要求空间复杂度 O(1)，并说明为什么快慢指针"有环必相遇、无环 fast 先到空指针"。
示例：链表为 3→2→0→-4，尾节点连接到下标为 1 的节点（第二个节点），输出 true。
示例：链表为 1→2，无环，输出 false。`,
        lv: '进阶',
        sol: `<ul>
<li><strong>快慢指针</strong>：slow 每次走 1 步，fast 每次走 2 步，从头同时出发。</li>
<li><strong>无环必先到空</strong>：链表有限且无环时，fast 每步走得更远，一定先走到链表尽头，fast 或 fast-&gt;next 变成空指针，循环结束，返回 false。</li>
<li><strong>有环必相遇</strong>：两个指针进入环后都在环内绕圈，fast 每走一轮相对 slow 多前进 1 步，两者的相对距离每轮缩小 1，而环长有限，所以必然在某个节点相遇；因为相对速度是 1，fast 不会一步"跳过"slow。</li>
</ul>
<p><code>时间 O(n)，空间 O(1)</code>。</p>
<blockquote><strong>易错点</strong>：循环条件必须写成同时检查 fast 和 fast-&gt;next，只检查 fast 会对空指针解引用；相遇判断要在两指针各自移动之后比较 slow == fast。</blockquote>`,
        code: `#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast && fast->next) {       // 无环：fast 先撞到空指针
        slow = slow->next;             // 慢指针一次走 1 步
        fast = fast->next->next;       // 快指针一次走 2 步
        if (slow == fast) return true; // 有环：相对距离每轮缩 1，必相遇
    }
    return false;
}

int main() {
    ListNode* n1 = new ListNode(3);
    ListNode* n2 = new ListNode(2);
    ListNode* n3 = new ListNode(0);
    ListNode* n4 = new ListNode(-4);
    n1->next = n2; n2->next = n3; n3->next = n4; n4->next = n2; // 手工成环
    cout << (hasCycle(n1) ? "true" : "false") << std::endl; // 输出 true
    return 0;
}`
      }
    ],
    ds07: [
      {
        q: `LeetCode 146 LRU 缓存：设计并实现最近最少使用（LRU）缓存的数据结构，要求 get 和 put 的时间复杂度都是 O(1)。实现 LRUCache(int capacity) 以正整数容量初始化；int get(int key)：如果关键字 key 存在于缓存中，返回其值并把它标记为最近使用，否则返回 -1；void put(int key, int value)：如果 key 已存在，变更其数据值；如果不存在，则插入该组键值对，若插入导致关键字数量超过 capacity，则逐出最久未使用的关键字。
示例：capacity = 2，依次调用 put(1,1)、put(2,2)、get(1) 返回 1、put(3,3)（此时逐出 key=2）、get(2) 返回 -1、put(4,4)（逐出 key=1）、get(1) 返回 -1、get(3) 返回 3、get(4) 返回 4。`,
        lv: '挑战',
        sol: `<ul>
<li><strong>哈希表负责"找"</strong>：unordered_map&lt;int, DNode*&gt; 让 key 在 O(1) 内直接定位到链表节点，不必遍历链表。</li>
<li><strong>双向链表负责"排"</strong>：链表按使用顺序排列，头部是最近使用的，尾部是最久未使用的；get 或 put 命中就把该节点摘下插回头部，插入导致超容量就删除尾部节点。</li>
<li><strong>为什么必须双向链表</strong>：要把"任意一个"已知节点在 O(1) 内摘除，必须让它的前驱直接指向它的后继，这依赖 prev 指针；单链表找某节点的前驱只能从头遍历，O(n)，整体 O(1) 就无法保证。</li>
<li><strong>哨兵节点</strong>：带头、尾哨兵后，头插、删尾、摘除任意节点都不需要判空，边界代码大幅简化；节点里要额外存 key，淘汰时才能去哈希表里删除对应映射。</li>
</ul>
<p><code>时间 get/put 均 O(1)，空间 O(capacity)</code>。</p>
<blockquote><strong>易错点</strong>：put 已存在的 key 只更新值并移到头部，不算新增、不触发淘汰；淘汰尾部节点后，别忘了用节点内保存的原始 key 去 unordered_map 中 erase，否则哈希表会越积越大。</blockquote>`,
        code: `#include <iostream>
#include <unordered_map>
using namespace std;

struct DNode {
    int key, val;
    DNode *prev, *next;
    DNode(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}
};

class LRUCache {
    int cap;
    DNode *head, *tail;               // 哨兵：head 后是最新，tail 前是最旧
    unordered_map<int, DNode*> mp;
    void erase(DNode* p) { p->prev->next = p->next; p->next->prev = p->prev; }
    void pushFront(DNode* p) { p->next = head->next; p->prev = head; head->next->prev = p; head->next = p; }
public:
    LRUCache(int capacity) : cap(capacity) { head = new DNode(0, 0); tail = new DNode(0, 0); head->next = tail; tail->prev = head; }
    int get(int key) {
        auto it = mp.find(key);
        if (it == mp.end()) return -1;
        DNode* p = it->second;
        erase(p); pushFront(p);       // 命中后移到头部
        return p->val;
    }
    void put(int key, int value) {
        auto it = mp.find(key);
        if (it != mp.end()) { DNode* p = it->second; p->val = value; erase(p); pushFront(p); return; }
        if ((int)mp.size() == cap) {  // 容量满：删尾部（最久未使用）
            DNode* last = tail->prev;
            erase(last); mp.erase(last->key); delete last;
        }
        DNode* p = new DNode(key, value);
        mp[key] = p; pushFront(p);
    }
};

int main() {
    LRUCache c(2);
    c.put(1, 1); c.put(2, 2);
    cout << c.get(1) << std::endl;  // 输出 1
    c.put(3, 3);                    // 逐出 key=2
    cout << c.get(2) << std::endl;  // 输出 -1
    c.put(4, 4);                    // 逐出 key=1
    cout << c.get(1) << " " << c.get(3) << " " << c.get(4) << std::endl; // 输出 -1 3 4
    return 0;
}`
      }
    ],
    ds08: [
      {
        q: `LeetCode 155 最小栈：设计一个支持 push、pop、top 操作，并能在常数时间内检索到最小元素的栈。实现 MinStack 类：push(x) 将元素 x 压入栈；pop() 删除栈顶元素；top() 获取栈顶元素；getMin() 获取栈中的最小元素。要求每个函数的时间复杂度都是 O(1)。
示例：依次 push(-2)、push(0)、push(-3)，getMin() 返回 -3，pop()，top() 返回 0，getMin() 返回 -2。`,
        lv: '入门',
        sol: `<ul>
<li><strong>辅助栈与主栈同步压弹</strong>：主栈每压入一个元素，辅助栈就同步压入"压入该元素后，当前栈内的最小值"；每次 pop 两栈一起弹。</li>
<li>于是任意时刻辅助栈栈顶就是当前最小值，getMin 直接读栈顶即可。</li>
<li>新元素比当前最小值小或相等时压入新值，否则复制一份当前最小值，保证两栈高度永远一致。</li>
</ul>
<p><code>时间 各操作均 O(1)，空间 O(n)</code>。</p>
<blockquote><strong>易错点</strong>：压入相等的最小值也要同步压入辅助栈（比较用 &lt;= 而不是 &lt;），否则弹出重复最小值后再 getMin 会取错；pop 时两栈必须一起弹。</blockquote>`,
        code: `#include <iostream>
#include <stack>
using namespace std;

class MinStack {
    stack<int> st;   // 主栈
    stack<int> mn;   // 辅助栈：mn.top() 始终是"当前所有元素的最小值"
public:
    void push(int x) {
        st.push(x);
        if (mn.empty() || x <= mn.top()) mn.push(x); // 出现新最小值
        else mn.push(mn.top());                      // 最小值不变，复制一份
    }
    void pop() {
        st.pop();
        mn.pop();        // 两栈同步弹出
    }
    int top() { return st.top(); }
    int getMin() { return mn.top(); }
};

int main() {
    MinStack s;
    s.push(-2); s.push(0); s.push(-3);
    cout << s.getMin() << std::endl; // 输出 -3
    s.pop();
    cout << s.top() << std::endl;    // 输出 0
    cout << s.getMin() << std::endl; // 输出 -2
    return 0;
}`
      },
      {
        q: `LeetCode 739 每日温度：给定一个整数数组 temperatures 表示每天的温度，返回一个数组 answer，其中 answer[i] 是指第 i 天之后还需要等待几天才会遇到更高的温度；如果之后气温都不会升高，该位置用 0 代替。请用单调栈求解。
示例：temperatures = [73,74,75,71,69,72,76,73]，输出 [1,1,4,2,1,1,0,0]。
示例：temperatures = [30,40,50,60]，输出 [1,1,1,0]。`,
        lv: '进阶',
        sol: `<ul>
<li><strong>单调栈存下标</strong>：栈里放的是"还没等到更高温的天数"的下标，对应温度从栈底到栈顶严格递减。</li>
<li>从左往右遍历：当天温度高于栈顶下标的温度时，说明栈顶那天等到了答案，弹栈并结算 answer[j] = i - j；重复直到栈顶温度不低于当天温度，再把 i 入栈。</li>
<li>每个下标最多入栈一次、出栈一次，虽然内层是 while，总操作次数仍是线性量级。</li>
<li>遍历结束后还留在栈里的下标，右边再无更高温，答案保持初始的 0。</li>
</ul>
<p><code>时间 O(n)，空间 O(n)</code>。</p>
<blockquote><strong>易错点</strong>：栈里存的是下标不是温度，比较要写 t[i] &gt; t[stk.top()]；等待天数是 i 减栈顶下标，别写反方向。</blockquote>`,
        code: `#include <iostream>
#include <stack>
#include <vector>
using namespace std;

vector<int> dailyTemperatures(vector<int>& t) {
    int n = (int)t.size();
    vector<int> ans(n, 0);
    stack<int> stk;              // 栈存下标，对应温度从底到顶递减
    for (int i = 0; i < n; ++i) {
        while (!stk.empty() && t[i] > t[stk.top()]) {
            int j = stk.top(); stk.pop();
            ans[j] = i - j;      // 结算：j 号天等到了更高温
        }
        stk.push(i);
    }
    return ans;                  // 留在栈中的下标答案为 0
}

int main() {
    vector<int> t = {73, 74, 75, 71, 69, 72, 76, 73};
    vector<int> ans = dailyTemperatures(t);
    for (int x : ans) cout << x << " ";
    cout << std::endl;           // 输出 1 1 4 2 1 1 0 0
    return 0;
}`
      }
    ],
    ds09: [
      {
        q: `纸面题：将中缀表达式 (3 + 4) × 5 − 2 转换为后缀表达式（逆波兰表示）。要求使用调度场算法（shunting-yard）逐步推演：对每一个读入的 token，写出当前的动作（数字直接输出、运算符按优先级出入栈、括号处理）、运算符栈内容和当前输出，最后给出后缀表达式。运算符优先级：× 高于 + 与 −，+ 与 − 同级，同级运算符先弹先出（左结合）。`,
        lv: '入门',
        sol: `<p>调度场算法规则回顾：数字直接进输出；读到运算符时，先把栈顶所有<strong>优先级不低于它</strong>的运算符弹出输出，再把自己压栈；读到右括号时连续弹栈输出，直到弹出左括号；表达式读完后，把栈中剩余运算符全部依次弹出输出。</p>
<p>逐步推演（栈内容左端为栈底，输出按先后排列）：</p>
<ul>
<li><code>(</code> ｜ 动作：左括号压栈 ｜ 栈：<code>(</code> ｜ 输出：空</li>
<li><code>3</code> ｜ 动作：数字直接输出 ｜ 栈：<code>(</code> ｜ 输出：<code>3</code></li>
<li><code>+</code> ｜ 动作：栈顶是左括号，不弹出，<code>+</code> 压栈 ｜ 栈：<code>( +</code> ｜ 输出：<code>3</code></li>
<li><code>4</code> ｜ 动作：数字直接输出 ｜ 栈：<code>( +</code> ｜ 输出：<code>3 4</code></li>
<li><code>)</code> ｜ 动作：弹栈输出直到遇左括号，并把 <code>(</code> 丢弃 ｜ 栈：空 ｜ 输出：<code>3 4 +</code></li>
<li><code>×</code> ｜ 动作：栈空，<code>×</code> 压栈 ｜ 栈：<code>×</code> ｜ 输出：<code>3 4 +</code></li>
<li><code>5</code> ｜ 动作：数字直接输出 ｜ 栈：<code>×</code> ｜ 输出：<code>3 4 + 5</code></li>
<li><code>−</code> ｜ 动作：栈顶 <code>×</code> 优先级更高，先弹出输出；栈空后 <code>−</code> 压栈 ｜ 栈：<code>−</code> ｜ 输出：<code>3 4 + 5 ×</code></li>
<li><code>2</code> ｜ 动作：数字直接输出 ｜ 栈：<code>−</code> ｜ 输出：<code>3 4 + 5 × 2</code></li>
<li>结束 ｜ 动作：把栈中剩余运算符依次弹出输出 ｜ 栈：空 ｜ 输出：<code>3 4 + 5 × 2 −</code></li>
</ul>
<p>最终后缀表达式：<code>3 4 + 5 × 2 −</code>。</p>
<blockquote><strong>易错点</strong>：读到 <code>−</code> 时，栈顶 <code>×</code> 优先级更高必须先弹出；若遇到同级运算符（如 <code>+</code> 遇 <code>−</code>）也要先弹出再压栈，才能保住左结合性；左括号只在遇到右括号时弹出，不参与优先级比较。</blockquote>`
      }
    ],
    ds10: [
      {
        q: `LeetCode 232 用栈实现队列：请你仅使用两个栈实现先入先出队列。队列应当支持一般队列的全部操作：push(x) 将元素 x 推到队列末尾；pop() 从队列开头移除并返回元素；peek() 返回队列开头元素；empty() 如果队列为空返回 true，否则返回 false。只能使用标准的栈操作：push 到栈顶、从栈顶 peek/pop、size 和 empty。并解释为什么所有操作都是摊还 O(1)。
示例：依次 push(1)、push(2)，peek() 返回 1，pop() 返回 1，empty() 返回 false。`,
        lv: '进阶',
        sol: `<ul>
<li><strong>双栈分工</strong>：in 栈只负责入队（push 压 in）；out 栈只负责出队（pop/peek 从 out 取）。</li>
<li><strong>搬运时机</strong>：pop 或 peek 时若 out 为空，就把 in 的元素逐个弹出并压入 out，此时顺序正好翻转成队列的先进先出顺序；out 非空时绝不能再倒，否则顺序会乱。</li>
<li><strong>为什么摊还 O(1)</strong>：每个元素一生最多经历三次栈操作——压入 in、被搬运进 out、从 out 弹出，因为每个元素只在 out 为空的那一刻被倒入一次，搬运总量被入队总数固定；把偶发的 O(n) 大搬运平摊到 n 次操作上，每次操作平均 O(1)。</li>
</ul>
<p><code>时间 摊还 O(1)（单次最坏 O(n)），空间 O(n)</code>。</p>
<blockquote><strong>易错点</strong>：empty 必须同时看两个栈；搬运条件是"out 为空"，不是"in 非空就搬"。</blockquote>`,
        code: `#include <iostream>
#include <stack>
using namespace std;

class MyQueue {
    stack<int> in, out;                     // in 只管进，out 只管出
    void pour() {                           // 把 in 全部倒入 out，顺序正好翻转
        while (!in.empty()) { out.push(in.top()); in.pop(); }
    }
public:
    void push(int x) { in.push(x); }
    int pop() {
        if (out.empty()) pour();            // out 空才搬运
        int v = out.top(); out.pop(); return v;
    }
    int peek() {
        if (out.empty()) pour();
        return out.top();
    }
    bool empty() { return in.empty() && out.empty(); }
};

int main() {
    MyQueue q;
    q.push(1); q.push(2);
    cout << q.peek() << std::endl;  // 输出 1
    cout << q.pop() << std::endl;   // 输出 1
    cout << (q.empty() ? "true" : "false") << std::endl; // 输出 false
    return 0;
}`
      }
    ],
    ds16: [
      {
        q: `LeetCode 69 x 的平方根：给你一个非负整数 x，计算并返回 x 的算术平方根。由于返回类型是整数，结果只保留整数部分，小数部分被舍去。不允许使用任何内置指数函数和幂运算，例如 pow(x, 0.5)。请用二分答案实现，并注意 mid*mid 的溢出问题。
示例：x = 4，输出 2。
示例：x = 8，输出 2（8 的算术平方根约为 2.828，截断后为 2）。`,
        lv: '入门',
        sol: `<ul>
<li><strong>二分答案</strong>：答案 ans 是满足 ans × ans ≤ x 的最大整数。在 [1, x/2] 上二分（x ≥ 2 时平方根不超过 x/2）：mid*mid ≤ x 就记录 mid 并收缩左边界，否则收缩右边界。</li>
<li><strong>防溢出</strong>：x 接近 int 上限时 mid*mid 会溢出。两种写法：把 mid 声明为 long long（或写 1LL * mid * mid），让乘法在更宽类型中进行；或改用整除比较 mid ≤ x / mid，同样能判断 mid*mid 与 x 的大小关系。</li>
</ul>
<p><code>时间 O(log x)，空间 O(1)</code>。</p>
<blockquote><strong>易错点</strong>：若 mid 是 int，必须写 1LL * mid * mid 或把乘积强转为 long long，只把比较结果想清楚没用，乘法本身已经溢出；x = 0 和 x = 1 要单独返回，避免二分区间为空时答案取错。</blockquote>`,
        code: `#include <iostream>
using namespace std;

int mySqrt(int x) {
    if (x < 2) return x;              // 0 和 1 单独处理
    int lo = 1, hi = x / 2, ans = 1;  // x ≥ 2 时平方根不超过 x/2
    while (lo <= hi) {
        long long mid = lo + (hi - lo) / 2;   // 用 long long 防 mid*mid 溢出
        if (mid * mid <= x) { ans = (int)mid; lo = mid + 1; }
        else hi = mid - 1;
    }
    return ans;
}

int main() {
    cout << mySqrt(4) << std::endl;           // 输出 2
    cout << mySqrt(8) << std::endl;           // 输出 2
    cout << mySqrt(2147395599) << std::endl;  // 输出 46339，大数据也不溢出
    return 0;
}`
      },
      {
        q: `LeetCode 33 搜索旋转排序数组：整数数组 nums 按升序排列，数组中的值互不相同。在传给函数前，nums 在预先未知的某个下标 k（0 ≤ k ≤ n-1，n 为数组长度）上进行了旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], ..., nums[k-1]]。给你旋转后的数组 nums 和一个整数 target，如果 nums 中存在这个目标值，返回它的下标，否则返回 -1。要求时间复杂度 O(log n)，即只做一次二分。
示例：nums = [4,5,6,7,0,1,2]，target = 0，输出 4。
示例：nums = [4,5,6,7,0,1,2]，target = 3，输出 -1。`,
        lv: '挑战',
        sol: `<ul>
<li><strong>关键观察</strong>：旋转数组从任意 mid 切开，左半 [lo..mid] 和右半 [mid..hi] 中至少有一半是完全有序的。</li>
<li><strong>一次二分</strong>：若 nums[lo] ≤ nums[mid]，说明左半有序——看 target 是否落在 [nums[lo], nums[mid]) 内，是则收缩到左半，否则去右半；否则右半有序——看 target 是否落在 (nums[mid], nums[hi]] 内，是则收缩到右半，否则去左半。每一步都能安全地丢掉一半。</li>
</ul>
<p><code>时间 O(log n)，空间 O(1)</code>。</p>
<blockquote><strong>易错点</strong>：判断 target 是否落在有序半段时，区间端点开闭要写对——左半判断用 [nums[lo], nums[mid])，右半判断用 (nums[mid], nums[hi]]；nums[lo] ≤ nums[mid] 的等号不能省，区间只剩两个元素时全靠它判定左半"有序"。</blockquote>`,
        code: `#include <iostream>
#include <vector>
using namespace std;

int search(vector<int>& nums, int target) {
    int lo = 0, hi = (int)nums.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) return mid;
        if (nums[lo] <= nums[mid]) {          // 左半 [lo..mid] 有序
            if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
            else lo = mid + 1;
        } else {                              // 右半 [mid..hi] 有序
            if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return -1;
}

int main() {
    vector<int> nums = {4, 5, 6, 7, 0, 1, 2};
    cout << search(nums, 0) << std::endl; // 输出 4
    cout << search(nums, 3) << std::endl; // 输出 -1
    return 0;
}`
      }
    ]
};

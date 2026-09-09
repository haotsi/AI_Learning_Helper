/* ============================================================
   数据层 · 外站延伸资源
   首页「延伸阅读」、顶部导航与页脚的外链统一在此维护；
   新增外站只改这里（外链一律 target=_blank + rel=noopener noreferrer）。
   ============================================================ */
window.APP_DATA = window.APP_DATA || {};

window.APP_DATA.externalLinks = {
  wiki: {
    name: '智科全家桶 · NJU Intelligence Science & Technology',
    icon: 'cap',
    url: 'https://njuis-students.github.io/',
    navLabel: '智科全家桶',
    title: '南京大学智能科学与技术学院 · 智科全家桶（外站，新窗口打开）',
    desc: '南京大学智能科学与技术学院学生维护的学院 Wiki：学院介绍与师资百科、培养方案与课程攻略、保研 / 考研 / 留学经验、科研方向导航、实习就业经验，以及 LLM、扩散模型、具身智能等前沿技术专栏。',
    columns: [
      { t: '学习攻略', u: 'https://njuis-students.github.io/2-%E5%AD%A6%E4%B9%A0%E7%AF%87/1-%E5%9F%B9%E5%85%BB%E6%96%B9%E6%A1%88/1-%E5%9F%B9%E5%85%BB%E6%96%B9%E6%A1%88.html' },
      { t: '科研攻略', u: 'https://njuis-students.github.io/3-%E7%A7%91%E7%A0%94%E7%AF%87/1-%E7%A7%91%E7%A0%94%E6%A6%82%E8%A7%88/1-%E7%A7%91%E7%A0%94%E6%A6%82%E8%A7%88.html' },
      { t: '职场攻略', u: 'https://njuis-students.github.io/4-%E8%81%8C%E5%9C%BA%E7%AF%87/2-%E5%B0%B1%E4%B8%9A%E6%8C%87%E5%8D%97/1-%E5%BC%95%E8%A8%80.html' }
    ]
  },
  github: {
    url: 'https://github.com/haotsi/AI_Learning_Helper',
    title: '本站源码 · GitHub 仓库（新窗口打开）'
  }
};

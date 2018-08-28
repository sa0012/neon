const menu = require('../../examples/menu.js')

const formatMenu = list => {
  let arr = []
  list.forEach(item => {
    arr.push([`/${item.to}`, item.name.replace('- ', '')])
  })
  return arr
}

module.exports = {
  title: 'Neon',
  description: '上汽保险移动端Vue组件库',
  base: '/neon/',
  head: [
    ['link', { rel: 'icon', href: `/favicon.ico` }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }]
  ],
  themeConfig: {
    nav: [
      { text: 'Github', link: 'https://github.com/insaic/neon' }
    ],
    sidebar: [
      {
        title: '开发指南',
        collapsable: false,
        children: [
          ['/quickstart', '快速上手'],
          ['/defaultStyle', '内置样式'],
          ['/theme', '主题定制'],
          ['/changelog', '更新日志'],
        ]
      },
      {
        title: '基础组件',
        collapsable: false,
        children: formatMenu(menu.base)
      },
      {
        title: '表单组件',
        collapsable: false,
        children: formatMenu(menu.form)
      },
      {
        title: '操作反馈',
        collapsable: false,
        children: formatMenu(menu.action)
      },
      {
        title: '业务组件',
        collapsable: false,
        children: formatMenu(menu.business)
      }
    ],
    lastUpdated: '上次更新', // string | boolean
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    // repo: 'insaic/neon',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    // repoLabel: '查看源码',

    // 以下为可选的编辑链接选项

    // 假如你的文档仓库和项目本身不在一个仓库：
    // docsRepo: 'vuejs/vuepress',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'document',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '在 GitHub 上编辑此页'
  }
}
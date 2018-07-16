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
  description: '上汽保险移动端Vue组件',
  base: '/neon/',
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
    lastUpdated: '上次更新：', // string | boolean
  }
}
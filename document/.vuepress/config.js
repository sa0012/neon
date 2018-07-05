module.exports = {
  title: 'neon文档',
  description: '上汽保险移动端Vue组件文档',
  base: '/neon/',
  themeConfig: {
    nav: [
      { text: '快速上手', link: '/dialog' },
      { text: 'Github', link: 'https://github.com/insaic/neon' }
    ],
    sidebar: [
      {
        title: '插件式组件',
        collapsable: false,
        children: [
          ['/dialog', 'dialog 对话框'],
          ['/toast', 'toast 消息提示']
        ]
      },
      {
        title: '普通组件',
        collapsable: false,
        children: [
          ['/button', 'button 按钮'],
          ['/cell', 'cell 单元格'],
          ['/tabs', 'tabs 选项卡'],
          ['/actionsheet', 'actionsheet 弹出式菜单'],
          ['/picker', 'picker 滚动选择器'],
        ]
      },
      {
        title: '业务组件',
        collapsable: false,
        children: [
          ['/carLicense', 'carLicense 车牌录入键盘'],
          ['/agree', 'agree 勾选按钮']
        ]
      }
    ],
    lastUpdated: '上次更新：', // string | boolean
  }
}
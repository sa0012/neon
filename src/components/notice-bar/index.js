import NoticeBar from './src/index.vue'

NoticeBar.install = function (Vue) {
  Vue.component(NoticeBar.name, NoticeBar)
}

export default NoticeBar

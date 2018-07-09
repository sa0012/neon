import SwiperItem from './src/index.vue'

SwiperItem.install = function (Vue) {
  Vue.component(SwiperItem.name, SwiperItem)
}

export default SwiperItem

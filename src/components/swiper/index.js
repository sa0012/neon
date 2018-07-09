import Swiper from './src/index.vue'

Swiper.install = function (Vue) {
  Vue.component(Swiper.name, Swiper)
}

export default Swiper

import Loadmore from './src/index.vue'

Loadmore.install = function (Vue) {
  Vue.component(Loadmore.name, Loadmore)
}

export default Loadmore

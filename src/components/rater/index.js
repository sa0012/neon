import Rater from './src/index.vue'

Rater.install = function (Vue) {
  Vue.component(Rater.name, Rater)
}

export default Rater

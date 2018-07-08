import Accordion from './src/index.vue'

Accordion.install = function (Vue) {
  Vue.component(Accordion.name, Accordion)
}

export default Accordion

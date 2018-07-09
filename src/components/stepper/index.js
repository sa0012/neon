import Stepper from './src/index.vue'

Stepper.install = function (Vue) {
  Vue.component(Stepper.name, Stepper)
}

export default Stepper

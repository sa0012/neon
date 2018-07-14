import NumberKeyboard from './src/index.vue'

NumberKeyboard.install = function (Vue) {
  Vue.component(NumberKeyboard.name, NumberKeyboard)
}

export default NumberKeyboard

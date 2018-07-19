import Field from './src/index.vue'

Field.install = function (Vue) {
  Vue.component(Field.name, Field)
}

export default Field

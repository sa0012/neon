import FieldGroup from './src/index.vue'

FieldGroup.install = function (Vue) {
  Vue.component(FieldGroup.name, FieldGroup)
}

export default FieldGroup

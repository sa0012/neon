import CellGroup from './src/index.vue'

CellGroup.install = function (Vue) {
  Vue.component(CellGroup.name, CellGroup)
}

export default CellGroup

import CitySelector from './src/index.vue'

CitySelector.install = function (Vue) {
  Vue.component(CitySelector.name, CitySelector)
}

export default CitySelector

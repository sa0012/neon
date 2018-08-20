import Area from './src/index.vue'

Area.install = function (Vue) {
  Vue.component(Area.name, Area)
}

export default Area

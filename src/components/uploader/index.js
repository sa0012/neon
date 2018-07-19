import Uploader from './src/index.vue'

Uploader.install = function (Vue) {
  Vue.component(Uploader.name, Uploader)
}

export default Uploader

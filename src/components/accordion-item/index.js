import AccordionItem from './src/index.vue'

AccordionItem.install = function (Vue) {
  Vue.component(AccordionItem.name, AccordionItem)
}

export default AccordionItem

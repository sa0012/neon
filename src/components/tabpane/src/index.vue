<template>
  <div class="sq-tab-content" v-show="$parent.currentActive === name">
    <slot></slot>
  </div>
</template>

<script>
export default {
  /**
   * name在tabs组件逻辑引用，若修改name值，则tabs中需相应修改
   */
  name: 'sq-tabpane',

  props: {
    name: String,
    label: String
  },

  mounted () {
    this.$parent.updateNav()
  }
}
</script>
<style lang="scss">
</style>

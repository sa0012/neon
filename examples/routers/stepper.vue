<template>
  <div class="demo-page-wrap">
    <h4>基本样式</h4>
    <sq-stepper v-model="val1" max="8"/>&nbsp;&nbsp;&nbsp;&nbsp;{{ val1 }}
    <h4>disabled-input</h4>
    <sq-stepper readonly-input v-model="val2" step=".5" min="2" />&nbsp;&nbsp;&nbsp;&nbsp;{{ val2 }}
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      val1: 2,
      val2: 3
    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
</style>

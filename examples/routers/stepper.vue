<template>
  <div class="demo-page-wrap">
    <demo-title>基础用法</demo-title>
    <sq-stepper v-model="val1" min="6" max="8"/>

    <demo-title>禁用输入框</demo-title>
    <sq-stepper readonly-input v-model="val2" step=".5" min="2" />
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      val1: 8,
      val2: 3
    }
  },

  methods: {}
}
</script>

<style lang="scss">
</style>

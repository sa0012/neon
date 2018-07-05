<template>
  <div class="demo-page-wrap">
    <demo-title>选中状态</demo-title>
    <sq-switch v-model="isChecked1"/>

    <demo-title>未选中状态</demo-title>
    <sq-switch v-model="isChecked2"/>

    <demo-title>选中下的禁用状态</demo-title>
    <sq-switch v-model="isChecked3" disabled/>

    <demo-title>未选中下的禁用状态</demo-title>
    <sq-switch v-model="isChecked4" disabled/>
  

    <demo-title>调整大小</demo-title>
    <sq-switch v-model="isChecked5" size="20px"/>
    <sq-switch v-model="isChecked5" size="40px"/>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      isChecked1: true,
      isChecked2: false,
      isChecked3: true,
      isChecked4: false,
      isChecked5: false
    }
  },

  methods: {}
}
</script>

<style lang="scss">
</style>

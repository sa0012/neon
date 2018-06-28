<template>
  <div class="demo-page-wrap">
    <h4>true</h4>
    <sq-switch v-model="isChecked1"/>
    <h4>false</h4>
    <sq-switch v-model="isChecked2"/>
    <h4>diaabled</h4>
    <sq-switch v-model="isChecked" disabled/>
    <h4>size 40px</h4>
    <sq-switch v-model="isChecked" size="40px"/>
    {{ isChecked }}
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      isChecked: false,
      isChecked1: true,
      isChecked2: false
    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
</style>

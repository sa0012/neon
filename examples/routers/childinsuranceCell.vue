<template>
  <div class="childinsuranceCell-page">
    <demo-title left>基础用法</demo-title>
    <sq-childinsurance-cell
      label="司机责任险"
      middle-text="不计免赔"
      right-text="投保"
      v-model="exemptSelected"
      @click="click"
    />
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      exemptSelected: false
    }
  },

  methods: {
    click () {
      console.log(this.exemptSelected)
    }
  }
}
</script>

<style lang="scss">
</style>

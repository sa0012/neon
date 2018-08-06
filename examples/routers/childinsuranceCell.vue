<template>
  <div class="childinsuranceCell-page">
    <demo-title left>基础用法</demo-title>
    {{exemptSelected}}
    <sq-childinsurance-cell
      :has-exempt-clause="hasExemptClause"
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
      exemptSelected: false,
      hasExemptClause: true
    }
  },

  methods: {
    click () {
      this.exemptSelected = !this.exemptSelected
    }
  }
}
</script>

<style lang="scss">
</style>

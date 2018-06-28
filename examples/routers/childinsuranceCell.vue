<template>
  <div class="childinsuranceCell-page">
    <sq-childinsurance-cell
      label="司机责任险"
      middle-text="不计免赔"
      right-text="投保"
      v-model="exemptSelected"
    />
    <sq-button @click="click">{{ exemptSelected }}</sq-button>
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

<style lang="scss" scoped>
</style>

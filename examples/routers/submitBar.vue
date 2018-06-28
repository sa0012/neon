<template>
  <div class="demo-page-wrap">
    <h4>基础形式</h4>
    <sq-submit-bar
      label="保费："
      price="3000"
      button-text="立即投保"
      @submit="onSubmit"
    />
    <h4>禁用形式</h4>
    <sq-submit-bar
      disabled
      label="保费："
      price="3000"
      button-text="立即投保"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
    }
  },

  methods: {
    onSubmit () {
      alert('onSubmit')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <div class="demo-page-wrap">
    <sq-button @click="clickHandle">默认</sq-button>
    <sq-button type="primary">primary</sq-button>
    <sq-button type="ghost">ghost</sq-button>
    <sq-button type="primary" size="large" icon="loading">确认</sq-button>
    <sq-button type="primary" size="large" disabled>disabled</sq-button>
    <sq-button type="ghost"><img src="../assets/logo.png" alt="" slot="icon" width="14px" height="14px">取消</sq-button>
    <sq-button type="ghost" size="small">较小</sq-button>
    <sq-button type="ghost" size="small" icon="loading">较小</sq-button>
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
    clickHandle () {
      alert('clickHandle')
    }
  }
}

</script>
<style lang='scss' scoped>
</style>

<template>
  <div class="demo-page-wrap">
    <sq-carlicense
      :province-name.sync="provName"
      :car-number.sync="carNumber"
      placeholder="请输入车牌号"
    >
    </sq-carlicense>
    {{ provName }}{{ carNumber }}
  </div>
</template>

<script>
export default {
  name: 'carlicense',

  data () {
    return {
      provName: '沪',
      carNumber: ''
    }
  },

  methods: {}
}
</script>

<style scoped>

</style>

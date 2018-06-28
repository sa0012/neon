<template>
  <div class="demo-page-wrap">
    <sq-button type="primary" @click="showToast">默认3s关闭关闭</sq-button>
    <sq-button type="primary" @click="showToastsuccess">成功</sq-button>
    <sq-button type="primary" @click="showToasterror">-1,不关闭，通过JS关闭</sq-button>
    <sq-button type="primary" @click="showTloading">loading</sq-button>
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
    showToast () {
      this.$toast.text('测试~~')
    },
    showToastsuccess () {
      this.$toast.success('测试~~showToastsuccess', 2000)
    },
    showToasterror () {
      this.$toast.error('测试~~showToasterror', -1)
      setTimeout(() => {
        this.$toast.hide(() => {
          console.log(22)
        })
      }, 5000)
    },
    showTloading () {
      this.$toast.loading('测试~~loading')
    }
  }
}
</script>

<style lang="css" scoped>
</style>

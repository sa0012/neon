<template>
  <div class="demo-page-wrap">
    <demo-title>消息提示</demo-title>
    <sq-button type="primary" size="small" @click="showToast">消息提示</sq-button>

    <demo-title>成功/失败/警告提示</demo-title>
    <sq-button type="primary" size="small" @click="showSuccess">成功提示</sq-button>
    <sq-button type="primary" size="small" @click="showError">失败提示</sq-button>
    <sq-button type="primary" size="small" @click="showWarn">警告提示</sq-button>

    <demo-title>加载提示</demo-title>
    <sq-button type="primary" size="small" @click="showLoading">加载提示</sq-button>
    <sq-button type="primary" size="small" @click="showLoading2">加载提示无文字</sq-button>
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
    showSuccess () {
      this.$toast.success('操作成功', 2000)
    },
    showError () {
      this.$toast.error('5秒后关闭', -1)
      setTimeout(() => {
        this.$toast.hide(() => {
          console.log(22)
        })
      }, 5000)
    },
    showWarn () {
      this.$toast.warn('没有查到数据', 2000)
    },
    showLoading () {
      this.$toast.loading('加载中..')
    },
    showLoading2 () {
      this.$toast.loading('')
    }
  }
}
</script>

<style lang="css">
</style>

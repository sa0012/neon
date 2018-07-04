<template>
  <div class="demo-page-wrap">
    <demo-title>消息提示</demo-title>
    <sq-button type="primary" size="small" @click="showToast1">Alert</sq-button>
    <sq-button type="primary" size="small" @click="showToast2">带标题Alert</sq-button>

    <demo-title>消息确认</demo-title>
    <sq-button type="primary" size="small" @click="showToastsuccess">Confirm</sq-button>
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
    showToast1 () {
      this.$dialog.alert({
        title: '',
        message: '测试~~message',
        onConfirm: () => {
          console.log('点击了alert确认按钮')
          this.$dialog.hide()
        }
      })
    },
    showToast2 () {
      this.$dialog.alert({
        title: '系统提示',
        message: '测试~~message',
        onConfirm: () => {
          console.log('点击了alert确认按钮')
          this.$dialog.hide()
        }
      })
    },
    showToastsuccess () {
      this.$dialog.confirm({
        title: '测试~~标题',
        message: '测试~~message',
        onConfirm: () => {
          console.log('点击了confirm确认按钮')
          this.$dialog.hide()
        },
        onCancel: () => {
          console.log('点击了confirm取消按钮')
          this.$dialog.hide()
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>

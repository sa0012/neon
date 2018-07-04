<template>
  <div class="demo-page-wrap">
    <demo-title>基础用法</demo-title>
    <sq-button type="primary" size="small" @click="isShowAction1 = !isShowAction1">弹出Actionsheet</sq-button>
    <sq-actionsheet
      v-model="isShowAction1"
      :action-list="list"
      @on-item-click="action"
    />
    <demo-title>隐藏取消按钮</demo-title>
    <sq-button type="primary" size="small" @click="isShowAction2 = !isShowAction2">弹出Actionsheet</sq-button>
    <sq-actionsheet
      v-model="isShowAction2"
      :action-list="list"
      @on-item-click="action"
      :show-cancel-button="false"
    />
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      isShowAction1: false,
      isShowAction2: false,
      list: [
        {
          name: '身份证',
          value: 'sfz'
        },
        {
          name: '护照',
          value: 'hz'
        }
      ]
    }
  },

  computed: {
    stateText () {
      return this.isShowAction ? '显示' : '隐藏'
    }
  },

  methods: {
    action (item) {
      console.log(item)
      this.$toast.text(`${item.name} -- ${item.value}`)
    }
  }
}
</script>

<style lang="css">
</style>

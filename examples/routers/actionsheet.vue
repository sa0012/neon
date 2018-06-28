<template>
  <div class="demo-page-wrap">
    <sq-button type="primary" @click="isShowAction = !isShowAction">{{stateText}}</sq-button>
    <sq-actionsheet
      v-model="isShowAction"
      :action-list="list"
      @on-item-click="action"
    />
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      isShowAction: false,
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

<style lang="css" scoped>
</style>

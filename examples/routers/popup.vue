<template>
  <div class="demo-page-wrap">
    <sq-popup v-model="isShowDefault">default</sq-popup>
    <sq-button type="primary" @click="isShowDefault = !isShowDefault">默认</sq-button>
    <sq-popup v-model="isShowLeft" position="left">左侧显示</sq-popup>
    <sq-button type="primary" @click="isShowLeft = !isShowLeft">左侧显示</sq-button>
    <sq-popup v-model="isShowRight" position="right">右侧显示</sq-popup>
    <sq-button type="primary" @click="isShowRight = !isShowRight">右侧显示</sq-button>
    <sq-popup v-model="isShowTop" position="top">上方显示</sq-popup>
    <sq-button type="primary" @click="isShowTop = !isShowTop">上方显示</sq-button>
    <sq-popup v-model="isShowBottom" position="bottom">底部显示</sq-popup>
    <sq-button type="primary" @click="isShowBottom = !isShowBottom">底部显示</sq-button>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      isShowDefault: false,
      isShowLeft: false,
      isShowRight: false,
      isShowTop: false,
      isShowBottom: false
    }
  },

  methods: {}
}
</script>

<style lang="css" scoped>
</style>

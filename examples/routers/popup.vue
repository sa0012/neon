<template>
  <div class="demo-page-wrap">
    <demo-title>基础用法</demo-title>
    <sq-popup v-model="isShowDefault">default</sq-popup>
    <sq-button type="primary" size="small" @click="isShowDefault = !isShowDefault">弹出Popup</sq-button>

    <demo-title>弹出位置</demo-title>
    <sq-button type="primary" size="small" @click="isShowLeft = !isShowLeft">左侧</sq-button>
    <sq-button type="primary" size="small" @click="isShowRight = !isShowRight">右侧</sq-button>
    <sq-button type="primary" size="small" @click="isShowTop = !isShowTop">上方</sq-button>
    <sq-button type="primary" size="small" @click="isShowBottom = !isShowBottom">底部</sq-button>
    <sq-popup v-model="isShowLeft" position="left">左侧弹出</sq-popup>
    <sq-popup v-model="isShowRight" position="right">右侧弹出</sq-popup>
    <sq-popup v-model="isShowTop" position="top">上方弹出</sq-popup>
    <sq-popup v-model="isShowBottom" position="bottom">底部弹出</sq-popup>
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

<style lang="css">
</style>

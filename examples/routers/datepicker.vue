<template>
  <div class="demo-page-wrap">
    <demo-title>年月日形式</demo-title>
    <sq-date-picker
      title="请选择时间"
      min="1917-10-25"
      max="2030-10-25"
      :default-value="[new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()]"
      @confirm="confirm1"
      @cancel="cancel1"
      @on-change="onChange2"
    />

    <demo-title>搭配popup使用</demo-title>
    <sq-button type="primary" size="small" @click="isShow = !isShow">show</sq-button>
    <sq-popup v-model="isShow" position="bottom">
      <sq-date-picker
        title="请选择时间"
        min="2008-10-25"
        max="2028-1-1"
        :format="['年', '月', '日']"
        :default-value="[new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()]"
        @confirm="confirm2"
        @cancel="cancel2"
        @on-change="onChange2"
      />
    </sq-popup>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      isShow: false
    }
  },

  methods: {
    confirm1 (val) {
      console.log(val)
    },
    cancel1 (val) {
      console.log(val)
    },
    onChange1 (val) {
      console.log(val)
    },
    confirm2 (val) {
      console.log(val)
      this.isShow = false
    },
    cancel2 (val) {
      console.log(val)
      this.isShow = false
    },
    onChange2 (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss">
</style>

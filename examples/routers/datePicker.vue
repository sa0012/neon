<template>
  <div class="demo-page-wrap">
    <demo-title>yyyy-MM-dd hh:mm形式</demo-title>
    <sq-date-picker
      title="请选择时间"
      type="datetime"
      :format="['年', '月', '日', '时', '分']"
      @confirm="confirm1"
      @cancel="cancel1"
      @on-change="onChange2"
    />
    <demo-title>yyyy-MM-dd形式</demo-title>
    <sq-date-picker
      min-date="2016-5-5"
      max-date="2021-8-13"
      title="请选择时间"
      @confirm="confirm1"
      @cancel="cancel1"
      @on-change="onChange2"
    />
    <demo-title>yyyy-MM形式</demo-title>
    <sq-date-picker
      title="请选择时间"
      type="year-month"
      @confirm="confirm1"
      @cancel="cancel1"
      @on-change="onChange2"
    />
    <demo-title>hh-mm形式</demo-title>
    <sq-date-picker
      title="请选择时间"
      type="time"
      @confirm="confirm1"
      @cancel="cancel1"
      @on-change="onChange2"
    />

    <demo-title>搭配popup使用</demo-title>
    <sq-button type="primary" size="small" @click="isShow = !isShow">show</sq-button>
    <sq-popup v-model="isShow" position="bottom">
      <sq-date-picker
        title="请选择时间"
        :format="['年', '月', '日']"
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
      console.log(val.value, val)
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
      console.log(val.value, val)
    }
  }
}
</script>

<style lang="scss">
</style>

<template>
  <div class="demo-page-wrap">
    <!-- <demo-title>yyyy-MM-dd hh:mm形式</demo-title>
    <sq-date-picker
      title="请选择时间"
      type="datetime"
      :format="['年', '月', '日', '时', '分']"
      @confirm="confirm1"
      @cancel="cancel1"
      @on-change="onChange2"
    /> -->
    <sq-button type="primary" size="small" @click.native="dataValue = new Date('2018-08-10')">设置dataValue</sq-button>
    <demo-title>yyyy-MM-dd形式</demo-title>
    {{dataValue}}
    <sq-date-picker
      :min-date="minDate"
      :max-date="maxDate"
      v-model="dataValue"
      title="请选择时间"
      @confirm="confirm1"
      @cancel="cancel1"
      @on-change="onChange2"
    />
    <!-- <demo-title>yyyy-MM形式</demo-title>
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
    </sq-popup> -->
  </div>
</template>

<script>
const now = new Date()
export default {
  name: '',

  data () {
    return {
      isShow: false,
      dataValue: '',
      minDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
      maxDate: new Date(2030, 11, 31)
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

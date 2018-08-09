<template>
  <div class="demo-page-wrap">
    <sq-button type="primary" size="small"
      @click.native="dataValue1 = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2)">设置日期为后天</sq-button>
    <demo-title>yyyy-MM-dd形式</demo-title>
    {{dataValue1 | formatDate('yyyy-MM-dd')}}
    <sq-date-picker
      :min-date="minDate"
      :max-date="maxDate"
      v-model="dataValue1"
      title="请选择时间"
      @confirm="confirm1"
      @cancel="cancel1"
      @on-change="onChange2"
    />

    <sq-button type="primary" size="small" @click.native="dataValue2 = new Date()">设置日期为当前</sq-button>
    <demo-title>yyyy-MM-dd hh:mm形式</demo-title>
    {{dataValue2 | formatDate('yyyy-MM-dd hh:mm')}}
    <sq-date-picker
      type="datetime"
      v-model="dataValue2"
      :format="['年', '月', '日', '时', '分']"
      @confirm="confirm1"
      @cancel="cancel1"
      @on-change="onChange2"
    />

    <demo-title>yyyy-MM形式</demo-title>
    {{dataValue3 | formatDate('yyyy-MM')}}
    <sq-date-picker
      v-model="dataValue3"
      type="year-month"
      @confirm="confirm1"
      @cancel="cancel1"
      @on-change="onChange2"
    />
    <demo-title>hh-mm形式</demo-title>
    {{dataValue4 | formatDate('hh-mm')}}
    <sq-date-picker
      v-model="dataValue4"
      type="time"
      @confirm="confirm1"
      @cancel="cancel1"
      @on-change="onChange2"
    />

    <demo-title>搭配popup使用</demo-title>
    <sq-button type="primary" size="small" @click="isShow = !isShow">click{{dataValue5 | formatDate('yyyy-MM-dd')}}</sq-button>
    <sq-popup v-model="isShow" position="bottom">
      <sq-date-picker
        v-model="dataValue5"
        :format="['年', '月', '日']"
        @confirm="confirm2"
        @cancel="cancel2"
        @on-change="onChange2"
      />
    </sq-popup>
  </div>
</template>

<script>
const now = new Date()
export default {
  name: '',

  data () {
    return {
      isShow: false,
      dataValue1: '',
      dataValue2: '',
      dataValue3: '',
      dataValue4: '',
      dataValue5: '',
      minDate: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
      maxDate: new Date(2030, 11, 31)
    }
  },

  filters: {
    formatDate (datetime, fmt = 'yyyy-MM-dd hh:mm:ss') {
      if (!datetime) return
      if (typeof datetime === 'string' && datetime.indexOf(':') > -1) return datetime
      let date = datetime
      if (typeof datetime === 'string') {
        date = new Date(datetime.replace(/-/g, '/'))
      } else {
        date = new Date(datetime)
      }
      function padLeftZero (str) {
        return ('00' + str).substr(str.length)
      }

      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
        }
      }
      return fmt
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

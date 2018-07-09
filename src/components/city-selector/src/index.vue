<template>
  <div class="citySelector" v-show="currentVisible">
    <div class="main">
      <div class="close-bar">
        <i class="iconfont icon-error" @click="close()"></i>
      </div>
      <div>
        <div class="ulWrap">
          <h2 class="title" @click="toggleCurrentTab(0)" :class="{current: currentTab === 0}">
            {{currentProvince.name ? currentProvince.name : '请选择'}}
          </h2>
          <h2 class="title" @click="toggleCurrentTab(1)" :class="{current: currentTab === 1}">
            {{currentProvince.id ? city.name ? city.name : '请选择' : ''}}
          </h2>
          <div>
            <!-- <loading v-show="loading" /> -->
            <span v-show="loading">加载中。。。</span>
          </div>
          <ul class="ul provinceList" v-if="currentTab === 0">
            <li
              class="li"
              v-for="(item, index) in provinceList"
              @click="selectProvince(item)"
              :class="{current: currentProvince.id === item.id}"
              :key="index"
            >
              {{item.name}}
            </li>
          </ul>
          <ul class="ul cityList" v-if="currentProvince.id && currentTab === 1">
            <li
              class="li"
              v-for="(item, index) in cityList"
              :key="index"
              @click="selectCity(item)"
              :class="{current: city.id === item.id}"
            >
              {{item.name}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sq-city-selector',

  computed: {},

  props: ['visible', 'callback', 'currentCity'],

  data () {
    return {
      currentVisible: this.visible,
      provinceList: [{id: '110000', name: '北京'}, {id: '120000', name: '天津'}, {id: '130000', name: '河北'}, {id: '140000', name: '山西'}],
      cityList: [{id: '210000', name: '北x京'}, {id: '220000', name: '天x津'}],
      currentProvince: {},
      city: {},
      currentTab: 0,
      tempCity: {},
      loading: false
    }
  },
  methods: {
    close () {
      this.toggle()
      this.currentValue = this.oldValue
    },
    finished () {
      this.close()
      this.callback({
        province: this.currentProvince,
        city: this.city
      })
    },
    selectProvince (p) {
      this.currentProvince = p
      this.currentTab = 1
      this.cityList = []
      if (this.tempCity[p.id]) {
        this.cityList = this.tempCity[p.id]
      } else {
        this.loading = true
        this.cityList = require('../../../mockdata/mock1.json').result[0]
        this.loading = false
        // utils.get('/ws/district/v1/getchildren', {id: p.id, key: 'ZIVBZ-C2BR5-3QAI3-QENXF-SUMUF-NSFSN'}).then(response => {
        //   this.loading = false
        //   this.cityList = response.result[0]
        // })
      }
    },
    selectCity (item) {
      this.city = item
      this.finished()
    },
    toggleCurrentTab (index) {
      this.currentTab = index
    },
    toggle () {
      if (this.disabled) {
        return
      }
      this.currentVisible = !this.currentVisible
      this.$emit('update:visible', this.currentVisible)
    }
  },
  mounted () {
    if (this.currentCity) {
      this.currentProvince = this.currentCity.province
      this.city = this.currentCity.city
    }
  },
  watch: {
    visible: function (val, oldVal) {
      if (this.currentVisible === val) return
      const response = require('../../../mockdata/city1.json')
      this.provinceList = response
      this.currentVisible = val
      // utils.get('/ws/district/v1/list', {key: 'ZIVBZ-C2BR5-3QAI3-QENXF-SUMUF-NSFSN'}).then(response => {
      //   this.provinceList = response.result[0]
      //   this.currentVisible = val
      // })
    }
  }
}
</script>

<style lang="scss">
.citySelector {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.main {
  background: #fff;
  width: 100%;
  height: 60%;
  top: 40%;
  position: fixed;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;

  .close-bar {
    text-align: right;

    i {
      display: inline-block;
      height: 48px;
      line-height: 48px;
      border: 0;
      margin: 0;
      padding: 0 15px;
      background: transparent;
    }
  }

  .ulWrap {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;

    .title {
      float: left;
      padding: 0 25px;
      font-weight: normal;
      height: 48px;
      line-height: 48px;
      box-sizing: border-box;
      margin: 0;
      &.current {
        border-bottom: 2px solid #358ED7;
      }
    }
  }

  .ul {
    list-style: none;
    position: absolute;
    width: 100%;
    overflow: auto;
    top: 98px;
    right: 0;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    .li {
      height: 48px;
      line-height: 48px;
      padding: 0 15px;
      color: #777;

      &.current {
        color: #358ED7;
      }
    }
  }
}
</style>

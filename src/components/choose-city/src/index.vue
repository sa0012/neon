<template>
  <div class="sq-choose-city" ref="menuWrapper" v-if="showCity">
    <div class="sq-choose-city-inner">
      <div class="sq-choose-city-current-city">
        <span class="sq-choose-city-current-city-title">当前城市：</span>
        <span>{{ currentCity }}</span>
      </div>
      <div class="sq-choose-city-city-wrap">
        <ul class="sq-choose-city-city-list">
          <li class="sq-choose-city-city-item" v-for="(item, index) in cityIndex" :key="index">
            <h3 class="sq-choose-city-menu-title" :class="item" ref="+ item +">{{ item }}</h3>
            <ul class="sq-choose-city-item-list">
              <li class="sq-choose-city-item-list-item" v-for="(city, i) in chooseCityData[item]" :key="i" @click="closeCity(city)">{{ city.name }}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="sq-choose-city-index-wrap" :class="{'select': showStartColor}">
      <div class="sq-choose-city-index-inner" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <div class="sq-choose-city-index-title" v-for="(item, index) in cityIndex" :key="index">{{ item }}</div>
      </div>
    </div>
    <div class="car-index" v-show="showStartColor">{{ cityIndex[carIndex] || carNum }}</div>
  </div>
</template>

<script>
export default {
  name: 'chooseCity',
  props: {
    chooseCityData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    currentCity: ''
  },
  data () {
    return {
      cityIndex: [],
      start: 0,
      carIndex: 0,
      titlePos: {},
      carNum: '',
      showStartColor: false,
      showCity: true,
      curDistance: document.body.clientHeight || document.documentElement.clientHeight
    }
  },
  methods: {
    cityIndexArr () {
      this.cityIndex = Object.keys(this.chooseCityData)
      this.$nextTick(() => {
        this.cityIndex.forEach(item => {
          let scroll = document.querySelector(`.${item}`).offsetTop
          this.titlePos[item] = scroll
        })
      })
    },
    closeCity (city) {
      this.showCity = false
      this.$emit('cityNameCode', city)
    },
    touchStart (e) {
      let menuWrapper = this.$refs.menuWrapper
      this.showStartColor = true
      this.$refs.menuWrapper.style.overflow = 'hidden'
      this.start = e.changedTouches[0].pageY - this.curDistance / 4
      const everyDistance = (this.curDistance - 0) / this.cityIndex.length / 2
      this.carIndex = Math.floor(this.start / everyDistance)
      if (this.start < 0) {
        this.carNum = 'A'
      } else if (this.start > this.curDistance) {
        this.carNum = this.cityIndex[this.cityIndex.length - 1]
      } else {
        menuWrapper.scrollTop = this.titlePos[this.cityIndex[this.carIndex]]
      }
    },
    touchMove (e) {
      // 计算每个区间的距离
      let curMove = e.changedTouches[0].pageY - this.curDistance / 4
      const everyDistance = (this.curDistance - 0) / this.cityIndex.length / 2
      this.carIndex = Math.floor(curMove / everyDistance)
      let maxHeight = (this.curDistance - 0) / 2
      this.$nextTick(() => {
        let menuWrapper = this.$refs.menuWrapper
        if (curMove < 0) {
          this.carNum = 'A'
        } else if (curMove > maxHeight) {
          this.carNum = this.cityIndex[this.cityIndex.length - 1]
        } else {
          menuWrapper.scrollTop = this.titlePos[this.cityIndex[this.carIndex]]
        }
      })
    },
    touchEnd (e) {
      this.showStartColor = false
      this.$refs.menuWrapper.style.overflow = 'auto'
      let curMove = e.changedTouches[0].pageY - this.curDistance / 4
      const everyDistance = (this.curDistance - 0) / this.cityIndex.length / 2
      this.carIndex = Math.floor(curMove / everyDistance)
      let maxHeight = (this.curDistance - 0) / 2
      this.$nextTick(() => {
        let menuWrapper = this.$refs.menuWrapper
        if (curMove < 0) {
          this.carNum = 'A'
        } else if (curMove > maxHeight) {
          this.carNum = this.cityIndex[this.cityIndex.length - 1]
        } else {
          menuWrapper.scrollTop = this.titlePos[this.cityIndex[this.carIndex]]
        }
      })
    }
  },
  mounted () {
    this.cityIndexArr()
  }
}
</script>

<style lang="scss">
  @import '../../../common/styles/mixins.scss';
  .sq-choose-city {
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 333;
    font-size: 14px;
    &-inner {
      width: 100%;
      padding-left: 15px;
      box-sizing: border-box;
    }
    &-current-city {
      width: 100%;
      height: 52px;
      line-height: 52px;
    }
    &-current-city-title {
      color: #666;
    }
    &-city-wrap {
      height: auto;
    }
    &-city-item {
      list-style: none;
    }
    &-menu-title {
      margin: 0;
      padding: 0;
      font-weight: 400;
      font-size: 14px;
      @include mix-1px($bottom: 1);
      height: 50px;
      line-height: 50px;
    }
    &-item-list-item {
      height: 52px;
      line-height: 52px;
      list-style: none;
    }
    &-index-wrap {
      position: fixed;
      top: 0;
      right: 0;
      width: 30px;
      height: 100%;
      font-size: 12px;
      &.select {
        background: rgba(0, 0, 0, 0.3);
      }
    }
    &-index-inner {
      position: fixed;
      top: 0;
      right: 0;
      width: 30px;
      display: flex;
      flex-direction: column;
      top: 50%;
      height: 50%;
      transform: translateY(-50%);
      box-sizing: border-box;
    }
    &-index-title {
      color: #007AFF;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .car-index {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.3);
    z-index: 99999;
    text-align: center;
    line-height: 80px;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
  }
</style>

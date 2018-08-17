<template>
  <div v-if="myShowCity" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;">
    <div class="sq-choose-city" ref="menuWrapper">
      <div class="sq-choose-city-wrapper" ref="cityWrapper" >
        <div class="sq-choose-city-inner">
          <div class="sq-choose-city-current-city">
            <span class="sq-choose-city-current-city-title">当前城市：</span>
            <span>{{ currentCity }}</span>
          </div>
          <div class="sq-choose-city-city-wrap">
            <ul class="sq-choose-city-city-list">
              <li class="sq-choose-city-city-item" v-for="(item, index) in cityIndex" :key="index">
                <h3 class="sq-choose-city-menu-title" :class="item">{{ item }}</h3>
                <ul class="sq-choose-city-item-list">
                  <li class="sq-choose-city-item-list-item" v-for="(city, i) in chooseCityData[item]" :key="i" @click="closeCity(city)">{{ city.name }}</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="car-index" v-show="showStartColor">{{ cityIndex[carIndex] || carNum }}</div>
    </div>
    <div class="sq-choose-city-index-wrap" :class="{'select': showStartColor}">
      <div class="sq-choose-city-index-inner" @touchstart.stop="touchStart" @touchmove.stop="touchMove" @touchend.stop="touchEnd">
        <div class="sq-choose-city-index-title"  v-for="(item, index) in cityIndex" :key="index">
          <div :class="{ 'active': item ===  rightIndex }">{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chooseCity',
  model: {
    prop: 'showCity',
    event: 'praent-event'
  },
  props: {
    chooseCityData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    currentCity: {
      type: String,
      default: ''
    },
    showCity: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      cityIndex: [],
      start: 0,
      carIndex: 0,
      titlePos: {},
      carNum: '',
      showStartColor: false,
      curDistance: document.body.clientHeight || document.documentElement.clientHeight,
      selectCityStartX: 0,
      selectCityStartY: 0,
      firstMove: true,
      myShowCity: this.showCity,
      scrollArr: [],
      rightIndex: ''
    }
  },
  watch: {
    showCity (newVal, oldVal) {
      this.myShowCity = newVal
    },
    myShowCity (newVal, oldVal) {
      this.$emit('update:showCity', newVal)
      this.$emit('praent-event', newVal)
      if (newVal) {
        this.cityIndexArr()
      }
    }
  },
  methods: {
    cityIndexArr () {
      this.cityIndex = Object.keys(this.chooseCityData)
      this.$nextTick(() => {
        this.cityIndex.forEach(item => {
          let scroll = document.querySelector(`.${item}`).offsetTop
          this.scrollArr.push(scroll)
          this.titlePos[item] = scroll
        })
        let _this = this
        this.$refs.menuWrapper.addEventListener('scroll', _this.handleScroll, true)
      })
    },
    closeCity (city) {
      this.myShowCity = false
      this.$emit('cityNameCode', city)
      this.$emit('update:showCity', this.myShowCity)
      this.$emit('praent-event', this.myShowCity)
    },
    touchStart (e) {
      let menuWrapper = this.$refs.menuWrapper
      this.showStartColor = true
      this.start = e.changedTouches[0].clientY - this.curDistance / 4
      const everyDistance = (this.curDistance - 0) / this.cityIndex.length / 2
      this.carIndex = Math.floor(this.start / everyDistance)
      if (this.start < 0) {
        this.carNum = 'A'
      } else if (this.start > this.curDistance) {
        this.carNum = this.cityIndex[this.cityIndex.length - 1]
      } else {
        menuWrapper.scrollTop = this.titlePos[this.cityIndex[this.carIndex]]
      }
      e.stopPropagation()
      e.preventDefault()
    },
    touchMove (e) {
      // 计算每个区间的距离
      let curMove = e.changedTouches[0].clientY - this.curDistance / 4
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
        e.stopPropagation()
        e.preventDefault()
      })
    },
    touchEnd (e) {
      this.showStartColor = false
      let curMove = e.changedTouches[0].clientY - this.curDistance / 4
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
      e.stopPropagation()
      e.preventDefault()
    },
    touchMoveLogic (e, refs, touchStartX, touchStartY) {
      let currentDisX = e.changedTouches[0].clientX
      let currentDisY = e.changedTouches[0].clientY
      let lastDistanceX = Math.abs(currentDisX - this[touchStartX])
      let lastDistanceY = Math.abs(currentDisY - this[touchStartY])
      let currentMoveDisX = currentDisX - this[touchStartX]
      if (this.firstMove) {
        this.$refs[refs].style.overflow = 'hidden'
        if (lastDistanceY > lastDistanceX) {
          this.firstMove = false
          return false
        } else {
          // 左右双向滑动
          // this.$refs[refs].style.transform = 'translateX(' + currentMoveDisX + 'px)'
          // 只允许左滑动
          if (currentMoveDisX < 0) {
            this.$refs[refs].style.transform = 'translateX(0)'
          } else {
            this.$refs[refs].style.transform = 'translateX(' + currentMoveDisX + 'px)'
          }
        }
      }
      e.stopPropagation()
      // e.preventDefault()
    },
    touchEndLogic (e, refs, showModal, touchStart) {
      // this.firstMove = true
      let currentDis = e.changedTouches[0].clientX
      let lastDistance = currentDis - this[touchStart]
      let selectModelWidth = this.$refs[refs].clientWidth
      // 左右双向滑动
      // if ((lastDistance > 0 && lastDistance < (selectModelWidth / 2)) || (lastDistance < 0 && lastDistance > -(selectModelWidth / 3 * 2))) {
      if (this.firstMove) {
        this.$refs[refs].style.overflow = 'scroll'
        if ((lastDistance > 0 && lastDistance < (selectModelWidth / 3 * 1.5)) || lastDistance < 0) {
          this.$refs[refs].style.transform = 'translateX(0)'
        } else if (lastDistance === 0) {
          return false
        } else {
          this.$refs[refs].style.transform = 'translateX(100%)'
          this[showModal] = false
          if (showModal === 'myShowCity') {
            this.$emit('update:showCity', this.myShowCity)
            this.$emit('praent-event', this.myShowCity)
          }
        }
      } else {
        this.$refs[refs].style.transform = 'translateX(0)'
      }
      e.stopPropagation()
      // e.preventDefault()
    },
    cityStart (e) {
      this.firstMove = true
      this.selectCityStartX = e.changedTouches[0].clientX
      this.selectCityStartY = e.changedTouches[0].clientY
    },
    cityMove (e) {
      this.touchMoveLogic(e, 'cityWrapper', 'selectCityStartX', 'selectCityStartY')
    },
    cityEnd (e) {
      this.touchEndLogic(e, 'cityWrapper', 'myShowCity', 'selectCityStartX')
    },
    handleScroll () {
      let scrollTop = this.$refs.menuWrapper.scrollTop
      let findIndexArr = this.scrollArr.findIndex((item, index) => {
        return (item >= scrollTop)
      })
      this.rightIndex = this.cityIndex[findIndexArr]
      if (scrollTop < (this.scrollArr[0] - 40)) {
        this.rightIndex = ''
      }
    }
  },
  mounted () {
    if (this.myShowCity) {
      this.cityIndexArr()
    }
  }
}
</script>

<style lang="scss">
@import '~@/common/styles/mixins';
.sq-choose-city {
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 333;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.7);
  &-wrapper {
    background: #fff;
    width: 100%;
    box-sizing: border-box;
  }
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
    // height: 100%;
    bottom: 0;
    font-size: 12px;
    z-index: 444;
    &.select {
      background: rgba(0, 0, 0, 0.3);
    }
  }
  &-index-inner {
    position: fixed;
    // top: 0;
    bottom: 0;
    right: 0;
    width: 30px;
    display: flex;
    flex-direction: column;
    top: 50%;
    // height: 50%;
    transform: translateY(-50%);
    box-sizing: border-box;
  }
  &-index-title {
    color: #007AFF;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &>.active {
      display: inline-block;
      width: 15px;
      height: 15px;
      line-height: 15px;
      text-align: center;
      background: #007AFF;
      color: #fff;
      border-radius: 1000px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      vertical-align: middle;
    }
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

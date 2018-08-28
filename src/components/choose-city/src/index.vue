<template>
    <div class="sq-choose-city" ref="menuWrapper" v-if="myShowCity">
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
      <div class="sq-choose-city-index-wrap" :class="{'select': showStartColor}"  @touchstart.stop="touchStart" @touchmove.stop="touchMove" @touchend.stop="touchEnd">
        <!-- @touchstart.stop="touchStart" @touchmove.stop="touchMove" @touchend.stop="touchEnd" -->
        <div class="sq-choose-city-index-inner">
          <div class="sq-choose-city-index-title"  v-for="(item, index) in cityIndex" :key="index">
            <div :class="{ 'active': item ===  rightIndex }">{{ item }}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
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
      rightIndex: '',
      scrollY: 0
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
        // 禁止鼠标滚动

        this.cityIndex.forEach(item => {
          let scroll = document.querySelector(`.${item}`).offsetTop
          this.scrollArr.push(scroll)
          this.titlePos[item] = scroll
        })
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true,
          probeType: 3
        })
        this.menuScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y)) // 将位置四舍五入后取绝对值
          this.handleScroll(this.scrollY)
        })
      })
    },
    closeCity (city) {
      this.myShowCity = false
      this.$emit('cityNameCode', city)
      this.$emit('update:showCity', this.myShowCity)
      this.$emit('praent-event', this.myShowCity)
    },
    touchStart (e) {
      this.showStartColor = true
      this.start = e.changedTouches[0].clientY - this.curDistance / 4
      const everyDistance = (this.curDistance - 0) / this.cityIndex.length / 2
      this.carIndex = Math.floor(this.start / everyDistance)
      let listItem = document.querySelectorAll('.sq-choose-city-city-list > .sq-choose-city-city-item')
      let itemLi = listItem[this.carIndex]
      this.menuScroll.scrollToElement(itemLi, 300)
      e.stopPropagation()
      e.preventDefault()
    },
    touchMove (e) {
      // 计算每个区间的距离
      let curMove = e.changedTouches[0].clientY - this.curDistance / 4
      let maxHeight = (this.curDistance - 0) / 2
      if (curMove <= 0) {
        curMove = 0
      } else if (curMove >= maxHeight) {
        curMove = maxHeight
      }
      const everyDistance = (this.curDistance - 0) / this.cityIndex.length / 2
      this.carIndex = Math.floor(curMove / everyDistance)
      if (this.carIndex < 0) {
        this.carIndex = 0
      } else if (this.carIndex > this.cityIndex.length - 1) {
        this.carIndex = this.cityIndex.length - 1
      }
      this.$nextTick(() => {
        let listItem = document.querySelectorAll('.sq-choose-city-city-list > .sq-choose-city-city-item')
        let itemLi = listItem[this.carIndex]
        this.menuScroll.scrollToElement(itemLi, 300)
        this.carNum = this.cityIndex[this.carIndex]
        e.stopPropagation()
        e.preventDefault()
      })
    },
    touchEnd (e) {
      this.showStartColor = false
      this.$nextTick(() => {
        let listItem = document.querySelectorAll('.sq-choose-city-city-list > .sq-choose-city-city-item')
        let itemLi = listItem[this.carIndex]
        this.menuScroll.scrollToElement(itemLi, 300)
        this.carNum = this.cityIndex[this.carIndex]
        e.stopPropagation()
        e.preventDefault()
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
    handleScroll (scrollTop) {
      let findIndexArr = this.scrollArr.findIndex((item, index) => {
        return (item >= scrollTop)
      })
      this.rightIndex = this.cityIndex[findIndexArr]
    }
  },
  created () {
    if (this.myShowCity) {
      this.cityIndexArr()
    }
  },
  destroyed () {
    if (this.menuScroll) {
      this.menuScroll.destroy()
    }
  }
}
</script>

<style lang="scss">
.sq-choose-city {
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 333;
  font-size: 14px;
  background: #fff;
  -webkit-backface-visibility: hidden;
  -webkit-transform: translate3d(0,0,0);
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
    height: 100%;
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

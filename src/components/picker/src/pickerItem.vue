<template>
  <div class="sq-picker-item">
    <div class="sq-picker-item-content" :style="itemStyles">
      <div
        class="sq-picker-item-row"
        v-for="(item, index) in list"
        :key="index"
      >
        {{ valueKey ?
          (formatValueFun ? formatValueFun(item[valueKey]) : item[valueKey]) :
          (formatValueFun ? formatValueFun(item) : item) }}{{ format }}
      </div>
    </div>
    <div class="sq-picker-item-mask"></div>
    <div class="sq-picker-item-active-line sq-picker-item-top-line sq-picker-item-bottom-line"></div>
  </div>
</template>

<script>
export default {
  name: 'sq-picker-item',

  props: {
    dataList: {
      type: Array,
      default: () => []
    },
    valueKey: {
      type: String
    },
    format: {
      type: String
    },
    formatValueFun: {
      type: Function
    },
    defaultIndex: {
      type: Number,
      default: 0
    }
  },

  computed: {
    itemStyles () {
      return {
        transform: `translate3d(0px, ${this.translateY}px, 0px)`,
        transition: `transform ${this.transitionTime}s`
      }
    }
  },

  data () {
    return {
      list: this.dataList,
      temp: null, // 容器
      translateY: 96,
      transitionTime: 0,
      startY: 0, // 起始值
      moveY: 0, // 移动的距离
      saveY: 96, // 缓存偏移量
      currentIndex: this.defaultIndex, // 选中的下标
      rowHeight: 48, // 每行列的高度--为固定值
      offset: 2, // 列表初始偏移量--为固定值
      startTime: undefined,
      points: []
    }
  },

  methods: {
    init () {
      this.temp.addEventListener('touchstart', this.onTouchStart, false)
      this.temp.addEventListener('touchmove', this.onTouchMove, false)
      this.temp.addEventListener('touchend', this.onTouchEnd, false)
      this.temp.addEventListener('touchcancel', this.onTouchEnd, false)
    },

    onTouchStart (event) {
      if (this.loading) return

      this.startY = event.changedTouches[0].pageY
      this.moveY = 0
      this.startTime = +new Date()

      event.stopPropagation()
      event.preventDefault()
    },

    onTouchMove (event) {
      if (this.loading) return

      if (this.transitionTime) {
        this.transitionTime = 0
      }

      this.moveY = event.changedTouches[0].pageY - this.startY
      this.translateY = this.saveY + this.moveY

      this.startTime = +new Date()
      this.points.push({ time: this.startTime, y: event.changedTouches[0].pageY })
      if (this.points.length > 40) {
        this.points.shift()
      }

      event.stopPropagation()
      event.preventDefault()
    },

    onTouchEnd (event) {
      if (!this.startY || this.loading) return

      const endY = event.changedTouches[0].pageY
      const endTime = +new Date()
      // 如果最后次move时间与end时间超过100ms，不添加惯性滑动
      if (endTime - this.startTime > 100) {
        this.onStop()
      } else {
        if (Math.abs(endY - this.startY) > 10) {
          const endPos = this.points.length - 1
          let startPos = endPos
          for (let i = endPos; i > 0 && this.startTime - this.points[i].time < 100; i--) {
            startPos = i
          }

          if (startPos !== endPos) {
            const ep = this.points[endPos]
            const sp = this.points[startPos]
            const t = ep.time - sp.time
            const s = ep.y - sp.y
            const v = s / t // 出手时的速度
            const diff = v * 150 // 滑行 150ms,这里直接影响“灵敏度”
            this.onStop(diff)
          } else {
            this.onStop()
          }
        } else {
          this.onStop()
        }
      }

      event.stopPropagation()
      event.preventDefault()
    },

    onStop (diff = 0) {
      // 缓存上次translateY的值
      this.saveY = this.translateY
      const {offset, rowHeight, list, currentIndex} = this
      const _saveY = this.saveY
      const count = list.length
      // 获得list 下标
      let _index = parseInt((offset * rowHeight - _saveY - diff) / rowHeight)
      if (_index < 0) {
        _index = 0
      } else if (_index >= count) {
        _index = count - 1
      }

      // 当前位置与 标准情况下 下标距离值 进行对比， 不相同情况下，进行手动设置位置
      if (_saveY !== ((offset - currentIndex) * rowHeight)) {
        this.transitionTime = 0.3
        // 向下拉 超过显示情况下
        if (_saveY > 0 && _saveY > offset * rowHeight) {
          this.setIndex(0, true)
          // 向上拉 超过显示情况下
        } else if (_saveY < 0 && _saveY < (offset - count + 1) * rowHeight) {
          this.setIndex(count - 1, true)
        } else {
          this.setIndex(_index, true)
        }
      }
    },

    setIndex (index, userAction) {
      this.saveY = this.translateY = (this.offset - index) * this.rowHeight

      if (index !== this.currentIndex) {
        this.currentIndex = index
        userAction && this.$emit('on-change', index)
      }
    },

    getValue () {
      return this.list[this.currentIndex]
    },

    setValue (value) {
      const { list } = this
      const selectIndex = list.indexOf(value) > -1 ? list.indexOf(value) : 0
      this.setIndex(selectIndex)
    }
  },

  created () {
    this.$parent.children && this.$parent.children.push(this)
  },

  mounted () {
    this.$nextTick(() => {
      this.temp = this.$el
      this.init()
    })
  },

  beforeDestroy () {
    this.temp.removeEventListener('touchstart', this.onTouchStart)
    this.temp.removeEventListener('touchmove', this.onTouchMove)
    this.temp.removeEventListener('touchend', this.onTouchEnd)
    this.temp.removeEventListener('touchcancel', this.onTouchEnd)
  },

  destroyed () {
    this.$parent.children && this.$parent.children.splice(this.$parent.children.indexOf(this), 1)
  }
}
</script>

<style lang="scss">
@import '~@/common/styles/variable';
$prefixCls: sq-picker-item;

.#{$prefixCls} {
  flex: 1;
  position: relative;
  height: 100%;
  &-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)),
      linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));
    background-position: top, bottom;
    background-size: 100% 96px;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-active-line {
    width: 100%;
    height: 48px;
    position: absolute;
    left: 0;
    top: 96px;
  }
  &-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 16px;
  }
  &-row {
    height: 48px;
    &.#{$prefixCls}-bottom-line {
      &:last-child::after {
        border: 0;
      }
    }
  }
  &-top-line {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-bottom: 1px solid #E5E5E5;
      color: #E5E5E5;
      transform-origin: 0 100%;
      transform: scaleY(0.5);
    }
  }
  &-bottom-line {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      border-bottom: 1px solid #E5E5E5;
      color: #E5E5E5;
      transform-origin: 0 100%;
      transform: scaleY(0.5);
    }
  }
}
</style>

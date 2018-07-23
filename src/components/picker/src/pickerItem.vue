<template>
  <div class="sq-picker-item">
    <div class="sq-picker-item-content" :style="itemStyles">
      <div
        class="sq-picker-item-row"
        v-for="(item, index) in list"
        :key="index"
      >
        {{ valueKey ? item[valueKey] : item }}{{ format }}
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
    listIndex: {
      type: Number
    },
    valueKey: {
      type: String
    },
    format: {
      type: String
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
      index: 0, // 选中的下标
      maxY: 0, // 最大偏移距离
      minY: 0, // 最小偏移距离
      currentValue: null, // 当前选中的值
      rowHeight: 48, // 每行列的高度--为固定值
      offset: 2, // 列表初始偏移量--为固定值
      startTime: undefined,
      points: []
    }
  },

  methods: {
    updateCol (newDayCol, selectIndex) {
      this.list = newDayCol
      this.index = selectIndex

      const colLength = newDayCol.length
      this.maxY = (colLength + this.offset) * this.rowHeight
      this.minY = (this.offset - colLength + 1) * this.rowHeight

      this.$_setCurrentValueByIndex(selectIndex)
      this.$_setYByIndex(selectIndex)
    },
    $_setYByIndex (index) {
      this.saveY = this.translateY = (this.offset - index) * this.rowHeight
    },
    $_setCurrentValueByIndex (index) {
      this.currentValue = this.list[index]
    },
    $_setY (val) {
      this.saveY = this.translateY = val
    },
    $_setCurrentValue (val) {
      this.currentValue = val
    },
    $_start (event) {
      if (this.loading) return
      this.startY = event.changedTouches[0].pageY
      this.moveY = 0
      this.startTime = +new Date()

      event.stopPropagation()
      event.preventDefault()
    },
    $_move (event) {
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
    $_stop (diff = 0) {
      // 缓存上次translateY的值
      this.saveY = this.translateY

      // 获得list 下标
      this.index = parseInt((this.offset * this.rowHeight - this.saveY - diff) / this.rowHeight)
      if (this.index < 0) {
        this.index = 0
      } else if (this.index >= this.list.length) {
        this.index = this.list.length - 1
      }

      // 当前位置与 标准情况下 下标距离值 进行对比， 不相同情况下，进行手动设置位置
      if (this.saveY !== ((this.offset - this.index) * this.rowHeight)) {
        this.transitionTime = 0.3
        // 向下拉 超过显示情况下
        if (this.saveY > 0 && this.saveY > this.offset * this.rowHeight) {
          this.$_setY(this.offset * this.rowHeight)
          this.$_setCurrentValue(this.list[0])
          // 向上拉 超过显示情况下
        } else if (this.saveY < 0 && this.saveY < this.minY) {
          this.$_setY(this.minY)
          this.$_setCurrentValue(this.list[this.list.length - 1])
        } else {
          this.$_setY((this.offset - this.index) * this.rowHeight)
          this.$_setCurrentValue(this.list[this.index])
        }
      }
    },
    $_end (event) {
      if (!this.startY || this.loading) return

      const endY = event.changedTouches[0].pageY
      const endTime = +new Date()
      // 如果最后次move时间与end时间超过100ms，不添加惯性滑动
      if (endTime - this.startTime > 100) {
        this.$_stop()
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
            this.$_stop(diff)
          } else {
            this.$_stop()
          }
        } else {
          this.$_stop()
        }
      }

      event.stopPropagation()
      event.preventDefault()
    },
    init () {
      this.temp.addEventListener('touchstart', this.$_start, false)
      this.temp.addEventListener('touchmove', this.$_move, false)
      this.temp.addEventListener('touchend', this.$_end, false)
      this.maxY = (this.list.length + this.offset) * this.rowHeight
      this.minY = (this.offset - this.list.length + 1) * this.rowHeight
    }
  },

  watch: {
    list: {
      handler (val) {
        if (this.currentValue === null && val[0] !== void 0) {
          const parent = this.$parent
          const parentDefVal = parent.$data.defVal

          if (parentDefVal) {
            const _uid = this._uid
            let len = 0
            parent.$children.forEach((item, index) => {
              if (item._uid === _uid) {
                len = index
              }
            })
            const index = val.indexOf(parentDefVal[len])
            this.$_setYByIndex(index)
            this.$_setCurrentValueByIndex(index)
          } else {
            this.currentValue = val[0]
          }
        }
      },
      immediate: true
    },
    currentValue: {
      handler (val, oldVal) {
        if (oldVal === void 0) {
          const flag = !!this.$parent.$data.defVal
          this.$parent.updateCurrentValue({
            val: flag ? this.$parent.$data.defVal : val,
            isDefault: flag ? 1 : 0
          })
        } else if (val !== oldVal) {
          this.$emit('on-change', {
            item: this.list[this.index],
            itemIndex: this.index,
            listIndex: this.listIndex
          })
        }
      },
      immediate: true
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.temp = this.$el
      this.init()
    })
  },

  beforeDestroy () {
    this.temp.removeEventListener('touchstart', this.$_start)
    this.temp.removeEventListener('touchmove', this.$_move)
    this.temp.removeEventListener('touchend', this.$_end)
  }
}
</script>

<style lang="scss">
@import '../../../common/styles/variable.scss';
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

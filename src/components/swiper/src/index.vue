<template>
  <div class="sq-swiper">
    <div
      class="sq-swiper-wrap"
      :style="wrapStyles"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <slot></slot>
    </div>

    <div class="sq-swiper-point-wrap" v-if="showIndicators">
      <div
        v-for="(item, index) in childItems"
        :key="index"
        class="sq-swiper-point-item"
        :class="{
          'sq-swiper-point-active': index === currentIndex || (index === 0 && currentIndex === count)
        }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sq-swiper',

  props: {
    autoplay: {
      type: [ String, Number ],
      default: 3000
    },
    duration: {
      type: [ String, Number ],
      default: 300
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    touchable: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    wrapStyles () {
      return {
        'transform': `translateX(${this.translateX}px)`,
        'transition': `transform ${this.duration}ms`,
        'width': `${this.offsetWidth * this.childItems.length}px`
      }
    },
    count () {
      return this.childItems.length
    }
  },

  data () {
    return {
      currentIndex: 0,
      offsetWidth: 0,
      translateX: 0,
      firstWrap: 0,
      lastWrap: 0,
      childItems: [],
      timer: null,
      startPosition: 0,
      savePosition: 0,
      moveValue: 0
    }
  },

  methods: {
    onTouchStart (event) {
      if (!this.touchable) return

      this.clear()
      if (this.currentIndex === this.count) {
        this.currentIndex = 0
        this.firstWrap = 0
        this.duration = 0
        this.translateX = 0
      }
      if (this.currentIndex === this.count - 1 && this.translateX === this.offsetWidth) {
        this.duration = 0
        this.lastWrap = 0
        this.translateX = -this.offsetWidth * this.currentIndex
      }

      this.startPosition = event.changedTouches[0].pageX
      this.savePosition = this.translateX
    },

    onTouchMove (event) {
      if (!this.touchable) return

      this.moveValue = event.changedTouches[0].pageX - this.startPosition
      this.translateX = this.savePosition + this.moveValue

      const { count } = this
      if (this.currentIndex === count - 1) {
        this.firstWrap = this.offsetWidth * count
      }
      // first to last, move last position
      if (this.moveValue > 0 && this.currentIndex === 0) {
        this.lastWrap = this.offsetWidth * count * -1
      }
      event.preventDefault()
      event.stopPropagation()
    },

    onTouchEnd (event) {
      if (!this.touchable) return

      if (Math.abs(this.moveValue) > 50) {
        let direction = 1
        if (this.moveValue > 0) { // 2 -> 1 左移
          direction = -1
        }

        const { count } = this

        if (this.currentIndex === count - 1) {
          this.firstWrap = this.offsetWidth * count
        }
        // 重置this.firstWrap
        if (this.currentIndex === 0) {
          this.firstWrap = 0
        }

        if (this.currentIndex === count) {
          this.currentIndex = 0

          this.firstWrap = 0

          this.duration = 0
          this.translateX = 0

          setTimeout(() => {
            this.duration = 300
            direction === 1 ? ++this.currentIndex : --this.currentIndex
            if (this.currentIndex < 0) {
              this.currentIndex = count - 1
            }
            this.translateX = -this.offsetWidth * this.currentIndex
          }, 100)
          return
        }

        if (this.duration === 0) {
          this.duration = 300
        }

        direction === 1 ? ++this.currentIndex : --this.currentIndex
        if (this.currentIndex < 0) {
          this.currentIndex = count - 1
        }
        if (this.currentIndex === count - 1 && direction !== 1) {
          this.translateX = this.offsetWidth
        } else {
          this.translateX = -this.offsetWidth * this.currentIndex
        }
      } else {
        if (this.duration === 0) {
          this.duration = 300
        }
        this.translateX = this.savePosition
      }
      this.autoPlay()
    },

    clear () {
      clearInterval(this.timer)
    },

    autoPlay () {
      const { autoplay, count } = this

      this.clear()

      this.timer = setInterval(() => {
        if (this.currentIndex === count - 1) {
          this.firstWrap = this.offsetWidth * count
        }
        if (this.currentIndex === count - 1 && this.translateX === this.offsetWidth) {
          this.duration = 0
          this.lastWrap = 0
          this.translateX = -this.offsetWidth * this.currentIndex
        }

        if (this.currentIndex === count) {
          this.currentIndex = 0

          this.firstWrap = 0

          this.duration = 0
          this.translateX = 0

          setTimeout(() => {
            this.duration = 300
            this.translateX = -this.offsetWidth * ++this.currentIndex
          }, 100)
          return
        }

        if (this.duration === 0) {
          this.duration = 300
        }
        this.translateX = -this.offsetWidth * ++this.currentIndex
      }, autoplay)
    },

    offsetWidthResize () {
      this.offsetWidth = this.$el.offsetWidth
    }
  },

  mounted () {
    this.offsetWidth = this.$el.offsetWidth
    this.autoPlay()
    window.addEventListener('resize', this.offsetWidthResize, false)
  },

  destroyed () {
    this.clear()
    window.removeEventListener('resize', this.offsetWidthResize)
  }
}
</script>

<style lang="scss">
$prefixCls: sq-swiper;

.#{$prefixCls} {
  display: inline-block;
  overflow: hidden;
  position: relative;
  user-select: none;
  width: 100%;
  height: 250px;
  &-wrap {
    height: 100%;
    display: flex;
  }
  &-point-wrap {
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
    display: flex;
  }
  &-point-item {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    border: 1px solid #fff;
    background-color: transparent;
    &.#{$prefixCls}-point-active {
      background-color: #fff;
    }
    & ~ .#{$prefixCls}-point-item {
      margin-left: 6px;
    }
  }
}
</style>

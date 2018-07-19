<style lang="scss">
$prefixCls: sq-swiper;

.#{$prefixCls} {
  overflow: hidden;
  position: relative;
  user-select: none;
  width: 375px;
  height: 200px;
  &-wrap {
    width: 1500px;
    height: 100%;
  }
  &-item {
    width: 375px;
    height: 100%;
    display: inline-block;
    &:nth-child(1) {
      background-color: lightblue;
    }
    &:nth-child(2) {
      background-color: teal;
    }
    &:nth-child(3) {
      background-color: lightskyblue;
    }
    &:nth-child(4) {
      background-color: #4a90e2;
    }
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

<template>
  <div class="sq-swiper">
    <div class="sq-swiper-wrap" ref="wrap" :style="wrapStyles">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="sq-swiper-item"
        :style="{
          'transform': (index === 0 && currentIndex === 4) ? `translateX(${firstWrap}px)` : '',
          'transition': `transform ${firstSpeedX}ms`
        }"
      >
        {{ index }}
      </div>
    </div>

    <div class="sq-swiper-point-wrap" v-if="showPoint">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="sq-swiper-point-item"
        :class="{'sq-swiper-point-active': index === currentIndex || index === 0 && currentIndex === count}"
      >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sq-swiper',

  props: {
    speedTimeProp: {
      type: [ String, Number ],
      default: 3000
    },
    speedXProp: {
      type: [ String, Number ],
      default: 300
    },
    list: {
      type: Array,
      default: () => [1, 2, 3, 4]
    },
    showPoint: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    wrapStyles () {
      return {
        'transform': `translateX(${this.translateX}px)`,
        'transition': `transform ${this.speedX}ms`
      }
    }
  },

  data () {
    return {
      speedTime: this.speedTimeProp,
      speedX: this.speedXProp,
      currentIndex: 0,
      offsetWidth: 0,
      translateX: 0,
      count: 0,
      firstWrap: 0,
      firstSpeedX: 300
    }
  },

  methods: {
    autoPlay () {
      const { speedTime, offsetWidth, count } = this

      this.timer = setInterval(() => {
        if (this.currentIndex === count - 1) {
          this.firstSpeedX = 0
          this.firstWrap = offsetWidth * count
        }

        if (this.currentIndex === count) {
          this.currentIndex = 0

          this.firstSpeedX = 0
          this.firstWrap = 0

          this.speedX = 0
          this.translateX = 0

          setTimeout(() => {
            this.speedX = 300
            this.translateX = -offsetWidth * ++this.currentIndex
          }, 100)
          return
        }

        if (this.speedX === 0) {
          this.speedX = 300
        }
        this.translateX = -offsetWidth * ++this.currentIndex
      }, speedTime)
    }
  },

  mounted () {
    this.offsetWidth = this.$el.offsetWidth
    this.count = this.list.length

    this.autoPlay()
  }
}
</script>

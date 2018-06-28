<style lang="scss">
.swiper-wrap {
  overflow: hidden;
  position: relative;
  user-select: none;
  .wrap {
    width: 1500px;
    .item {
      width: 375px;
      height: 200px;
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
  }
  .swiper-point-wrap {
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
    display: flex;
    .point-item {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      border: 1px solid #fff;
      background-color: transparent;
      &.point-active {
        background-color: #fff;
      }
      &~.point-item {
        margin-left: 6px;
      }
    }
  }
}
</style>

<template>
  <div class="swiper-wrap">
    <div
      class="wrap"
      ref="wrap"
      :style="{
        'transform': `translateX(${translateX}px)`,
        'transition': `transform ${speedX}ms`
      }"
    >
      <div
        v-for="(item, index) in list"
        :key="index"
        class="item"
        :style="{
          'transform': (index === 0 && currentIndex === 4) ? `translateX(${firstWrap}px)` : '',
          'transition': `transform ${firstSpeedX}ms`
        }"
      >
        {{ index }}
      </div>
    </div>

    <div class="swiper-point-wrap" v-if="showPoint">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="point-item"
        :class="{
          'point-active': index === currentIndex || index === 0 && currentIndex === count
        }"
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

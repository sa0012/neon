<template>
  <div class="sq-loadmore">
    <div class="sq-loadmore-main" :style="{ 'transform': transform }" :class="{'sq-loadmore-is-transition': isTransition}">
      <slot></slot>
      <div :ref="flagWrap" class="sq-loadmore-flag"></div>
      <div class="sq-loadmore-bottom">
        <span v-show="showLoadingIcon && loading" class="sq-loadmore-spinner-wrap">
          <div class="sq-loadmore-loading-icon"></div>
        </span>
        <span>{{ bottomText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sq-loadmore',

  props: {
    bottomPullText: {
      type: String,
      default: '↑'
    },
    bottomDropText: {
      type: String,
      default: '↓'
    },
    bottomLoadingText: {
      type: String,
      default: '加载中...'
    },
    bottomFinishedText: {
      type: String,
      default: '没有更多内容了'
    },
    bottomFun: {
      type: Function
    },
    threshold: {
      type: Number,
      default: 70
    },
    loading: {
      type: Boolean,
      default: false
    },
    showLoadingIcon: {
      type: Boolean,
      default: true
    },
    isFinishedLoad: {
      type: Boolean,
      default: false
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  data () {
    return {
      bottomStatus: '',
      bottomText: '',
      startLength: 0,
      moveLength: 0,
      isTransition: false
    }
  },

  computed: {
    transform () {
      return this.moveLength > 0 ? null : `translate(0, ${this.moveLength}px)`
    },
    flagWrap () {
      return `flagWrap${String(Math.random()).slice(2)}`
    }
  },

  watch: {
    bottomStatus (val) {
      switch (val) {
        case 'pull':
          this.bottomText = this.bottomPullText
          break
        case 'drop':
          this.bottomText = this.bottomDropText
          break
        case 'loading':
          this.bottomText = this.bottomLoadingText
          break
        case 'finished':
          this.bottomText = this.bottomFinishedText
          break
      }
    },
    isFinishedLoad (val) {
      if (val) {
        this.bottomStatus = 'finished'
      }
    }
  },

  methods: {
    $_touchStart (event) {
      if (this.bottomStatus === 'finished' || this.loading) return
      this.startLength = event.touches[0].pageY
      if (this.bottomStatus !== 'loading') {
        this.bottomStatus = 'pull'
      }
      this.isTransition = false
    },
    $_touchmove (event) {
      if (this.bottomStatus === 'finished' || this.loading) return
      const len = (event.touches[0].pageY - this.startLength) / 2
      if (len < 0) {
        const flagWrapHeight = this.$refs[this.flagWrap].getBoundingClientRect().bottom
        const pullWrapHeight = this.$el.parentElement.getBoundingClientRect().bottom
        if (pullWrapHeight + 1 > flagWrapHeight && !this.isFinishedLoad && !this.loading) {
          this.moveLength = len
          if (Math.abs(len) > this.threshold) {
            this.bottomStatus = 'drop'
          } else {
            this.bottomStatus = 'pull'
          }
        }
      } else {
      }
    },
    $_touchend (event) {
      if (this.bottomStatus === 'finished' || this.loading) return
      if (this.moveLength < 0) {
        this.isTransition = true
        if (Math.abs(this.moveLength) > this.threshold) {
          this.bottomStatus = 'loading'
          this.moveLength = '-50'
          this.onPull()
        } else {
          this.moveLength = '0'
          this.bottomStatus = 'pull'
        }
      }
    },
    onPull () {
      this.bottomFun()
    },
    init () {
      this.bottomStatus = 'pull'
      this.$el.addEventListener('touchstart', this.$_touchStart)
      this.$el.addEventListener('touchmove', this.$_touchmove)
      this.$el.addEventListener('touchend', this.$_touchend)
    },
    inView (element, ref) {
      if (ref === void 0) ref = {}
      var offset = ref.offset
      if (offset === void 0) offset = 0
      var threshold = ref.threshold
      if (threshold === void 0) threshold = 0

      var ref$1 = element.getBoundingClientRect()
      var top = ref$1.top
      var right = ref$1.right
      var bottom = ref$1.bottom
      var left = ref$1.left
      var width = ref$1.width
      var height = ref$1.height

      var intersection = {
        t: bottom,
        r: window.innerWidth - left,
        b: window.innerHeight - top,
        l: right
      }

      var elementThreshold = {
        x: threshold * width,
        y: threshold * height
      }

      return (
        intersection.t >= (offset.top || offset + elementThreshold.y) &&
        intersection.r >= (offset.right || offset + elementThreshold.x) &&
        intersection.b >= (offset.bottom || offset + elementThreshold.y) &&
        intersection.l >= (offset.left || offset + elementThreshold.x)
      )
    }
  },

  beforeDestroy () {
    this.$el.removeEventListener('touchstart', this.$_touchStart)
    this.$el.removeEventListener('touchmove', this.$_touchmove)
    this.$el.removeEventListener('touchend', this.$_touchend)
  }
}
</script>

<style lang="scss">
$prefixCls: sq-loadmore;

@keyframes quan {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.#{$prefixCls} {
  overflow: hidden;
  &-bottom {
    margin-bottom: -50px;
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
  &-flag {
    height:0;
  }
  &-spinner-wrap {
    display: inline-block;
    vertical-align: middle;
  }
  &-loading-icon {
    box-sizing: border-box;
    width: 28px;
    height: 28px;
    border: 4px solid transparent;
    border-top-color: rgb(204, 204, 204);
    border-left-color: rgb(204, 204, 204);
    border-bottom-color: rgb(204, 204, 204);
    border-radius: 50%;
    animation: quan .8s infinite linear
  }
  &-is-transition {
    transition: transform 0.3s linear;
  }
}
</style>

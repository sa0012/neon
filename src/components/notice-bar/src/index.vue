<template>
  <div class="sq-notice-bar" v-show="isShowNoticeBar">
    <div class="sq-notice-bar-icon">
      <slot name="left-icon">
        <i class="sq-icon sq-icon-alert-full"></i>
      </slot>
    </div>
    <div class="sq-notice-bar-content" ref="content">
      <div
        ref="wrap"
        class="sq-notice-bar-text"
        :style="styles"
        :class="[animationClass]"
        @animationend="$_onAnimationEnd"
        @webkitAnimationEnd="$_onAnimationEnd"
      >
        <slot>{{ text }}</slot>
      </div>
    </div>
    <div class="sq-notice-bar-close" @click="$_close">
      <slot name="right-icon">
        <i class="sq-icon" :class="rightIconClasses"></i>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sq-notice-bar',

  props: {
    mode: {
      type: String,
      validator (value) {
        return ['close', 'link'].indexOf(value) !== -1
      }
    },
    text: {
      type: String
    },
    delay: {
      type: [Number, String],
      default: 1
    },
    deep: {
      type: Number,
      default: 50
    }
  },

  computed: {
    rightIconClasses () {
      return [
        {
          'sq-icon-error': this.mode === 'close',
          'sq-icon-arrow-right': this.mode === 'link'
        }
      ]
    },
    styles () {
      return {
        paddingLeft: this.firstRound ? 0 : this.contentWidth + 'px',
        animationDelay: this.delay + 's',
        animationDuration: this.animationDuration + 's'
      }
    }
  },

  data () {
    return {
      firstRound: true,
      animationDuration: 0,
      contentWidth: 0,
      offsetWidth: 0,
      animationClass: '',
      isShowNoticeBar: true
    }
  },

  methods: {
    $_close () {
      if (this.mode === 'close') {
        this.isShowNoticeBar = false
      }
    },
    $_onAnimationEnd () {
      this.firstRound = false
      this.animationDuration = (this.contentWidth + this.offsetWidth) / this.deep
      this.animationClass = 'sq-notice-bar-move-infinite'
    }
  },

  watch: {
    text: {
      handler () {
        this.$nextTick(() => {
          const contentRef = this.$refs.content
          const wrapRef = this.$refs.wrap
          if (!contentRef || !wrapRef) return

          const contentWidth = contentRef.getBoundingClientRect().width
          const offsetWidth = wrapRef.getBoundingClientRect().width

          if (offsetWidth > contentWidth) {
            this.contentWidth = contentWidth
            this.offsetWidth = offsetWidth
            this.animationDuration = offsetWidth / this.deep
            this.animationClass = 'sq-notice-bar-move'
          }
        })
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
/*依赖 base 里的动画*/
$prefixCls: sq-notice-bar;

.#{$prefixCls} {
  display: flex;
  height: 30px;
  background: #4a4c5b;
  color: #fffefe;
  line-height: 1.5;
  padding: 8px 15px;
  align-items: center;
  box-sizing: border-box;
  font-size: 0;
  &-icon {
    max-width: 20px;
    margin-right: 5px;
  }
  &-content {
    flex: 1;
    font-size: 12px;
    overflow: hidden;
  }
  &-text {
    position: relative;
    white-space: nowrap;
    display: inline-block;
  }
  &-move {
    animation: move linear both;
  }
  &-move-infinite {
    animation: move-infinite linear infinite both;
  }
  &-close {
    max-width: 20px;
    margin-left: 5px;
  }
}
</style>

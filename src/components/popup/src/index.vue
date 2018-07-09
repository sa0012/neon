<template>
  <div class="sq-popup">
    <transition name="ry-fade">
      <div class="sq-popup-mask" v-show="value" @click="$_cancel"></div>
    </transition>
    <transition :name="transitionSlideType">
      <div
        class="sq-popup-content"
        v-show="value"
        :class="positionClass"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
const objTransitionSlideType = {
  bottom: 'ry-slide-bottom',
  left: 'ry-slide-left',
  top: 'ry-slide-top',
  right: 'ry-slide-right',
  center: 'ry-fade'
}

export default {
  name: 'sq-popup',

  props: {
    position: {
      type: String,
      default: 'center'
    },
    value: {
      type: Boolean,
      required: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    positionClass () {
      return [ `sq-popup-${this.position}` ]
    },
    transitionSlideType () {
      return objTransitionSlideType[this.position]
    }
  },

  methods: {
    $_cancel () {
      if (!this.closeOnClickOverlay) return
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss">
// 内容从右往左动画
@keyframes ry-slide-right-enter {
  from {
    transform: translate3d(100%, 0, 0);
  }
}

@keyframes ry-slide-right-leave {
  to {
    transform: translate3d(100%, 0, 0);
  }
}
.ry-slide-right {
  &-enter-active {
    animation: ry-slide-right-enter .3s both ease;
  }

  &-leave-active {
    animation: ry-slide-right-leave .3s both ease;
  }
}
// 内容从左往右动画
@keyframes ry-slide-left-enter {
  from {
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes ry-slide-left-leave {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
.ry-slide-left {
  &-enter-active {
    animation: ry-slide-left-enter .3s both ease;
  }

  &-leave-active {
    animation: ry-slide-left-leave .3s both ease;
  }
}
// 内容从上往下动画
@keyframes ry-slide-top-enter {
  from {
    transform: translate3d(0, -100%, 0);
  }
}

@keyframes ry-slide-top-leave {
  to {
    transform: translate3d(0, -100%, 0);
  }
}
.ry-slide-top {
  &-enter-active {
    animation: ry-slide-top-enter .3s both ease;
  }

  &-leave-active {
    animation: ry-slide-top-leave .3s both ease;
  }
}
// 内容从下往上动画
@keyframes ry-slide-bottom-enter {
  from {
    transform: translate3d(0, 100%, 0);
  }
}

@keyframes ry-slide-bottom-leave {
  to {
    transform: translate3d(0, 100%, 0);
  }
}
.ry-slide-bottom {
  &-enter-active {
    animation: ry-slide-bottom-enter .3s both ease;
  }

  &-leave-active {
    animation: ry-slide-bottom-leave .3s both ease;
  }
}
// 蒙层渐变动画
@keyframes ry-fade-enter {
  from {
    opacity: 0;
  }
}

@keyframes ry-fade-leave {
  to {
    opacity: 0;
  }
}
.ry-fade {
  &-enter-active {
    animation: ry-fade-enter .3s both ease;
  }

  &-leave-active {
    animation: ry-fade-leave .3s both ease;
  }
}
$prefixCls: sq-popup;

.#{$prefixCls} {
  &-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 1010;
  }
  &-content {
    position: fixed;
    background-color: #fff;
    z-index: 1011;
    &.#{$prefixCls}-top {
      left: 0;
      right: 0;
      top: 0;
    }
    &.#{$prefixCls}-bottom {
      left: 0;
      right: 0;
      bottom: 0;
    }
    &.#{$prefixCls}-left {
      top: 0;
      left: 0;
      width: 60%;
      bottom: 0;
    }
    &.#{$prefixCls}-right {
      top: 0;
      right: 0;
      width: 60%;
      bottom: 0;
    }
    &.#{$prefixCls}-center {
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  }
}
</style>

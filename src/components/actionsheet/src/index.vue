<template>
  <div class="sq-actionsheet">
    <transition name="ry-fade">
      <div class="sq-actionsheet-mark" v-show="isShow" @click="$_cancel"></div>
    </transition>
    <transition name="ry-slide-bottom">
      <div class="sq-actionsheet-content" v-show="isShow">
        <div class="sq-actionsheet-row" @click="$_clickItem(item)" v-for="(item, index) in actionList" :key="index">{{ item.name }}</div>
        <div class="sq-actionsheet-row" @click="$_cancel" v-show="showCancelButton">取消</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'sq-actionsheet',

  props: {
    value: {
      type: Boolean
    },
    actionList: {
      type: Array,
      default: () => []
    },
    showCancelButton: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      isShow: this.value
    }
  },

  methods: {
    $_clickItem (item) {
      this.$emit('on-item-click', item)
      this.isShow = false
    },
    $_cancel () {
      this.$emit('on-cancel-click')
      this.isShow = false
    }
  },

  watch: {
    isShow (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.isShow = val
    }
  }
}
</script>

<style lang="scss">
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

$prefixCls: sq-actionsheet;

.#{$prefixCls} {
  &-mark {
    background-color: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
  }
  &-content {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1001;
    text-align: center;
    background-color: #EFEFF4;
  }
  &-row {
    color: #333;
    background-color: #fff;
    font-size: 16px;
    box-sizing: content-box;
    padding: 14px 0;
    position: relative;
    &::after {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      height: 1px;
      border-top: 1px solid #e5e5e5;
      color: #e5e5e5;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    &:last-child {
      margin-top: 6px;
      border-top: 0;
    }
  }
}
</style>

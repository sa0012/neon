<template>
  <transition name="sq-toast">
    <div class="sq-toast-wrapper" v-show="visible">
      <div class="sq-toast">
        <div class="sq-toast-mark"></div>
        <div class="sq-toast-content" :class="{'sq-toast-type':type === 'text', 'sq-toast-bottom': position === 'bottom'}">
          <i :class="classes"></i>
          <div class="sq-toast-text">{{ message }}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'sq-toast',

  props: {
    type: {
      type: String,
      default: 'text',
      validator (value) {
        return ['text', 'success', 'error'].indexOf(value) > -1
      }
    },
    message: {
      type: [String, Number],
      default: ''
    },
    duration: {
      type: Number,
      default: 3000
    },
    position: {
      type: String,
      default: 'middle'
    }
  },

  computed: {
    classes () {
      return [
        {
          [`sq-toast-icon iconfont icon-checkmark`]: this.type === 'success',
          [`sq-toast-icon iconfont icon-error`]: this.type === 'error',
          [`sq-toast-icon iconfont icon-animation-loading icon-loading`]: this.type === 'loading'
        }
      ]
    }
  },

  data () {
    return {
      visible: false
    }
  },

  methods: {}
}
</script>

<style lang="scss">
/*依赖 base 里的动画*/

.sq-toast-enter-active, .sq-toast-leave-active {
  transition: opacity .5s;
}
.sq-toast-enter, .sq-toast-leave-to{
  opacity: 0;
}
.sq-toast-wrapper {
  z-index: 11000;
}
.sq-toast-mark {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
}
.sq-toast-content.sq-toast-type {
  max-width: initial;
  min-width: initial;
}
.sq-toast-content.sq-toast-bottom {
  top: initial;
  bottom: 100px;
}
.sq-toast-content {
  z-index: 11000;
  max-width: 140px;
  min-width: 120px;
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  color: #fff;
  font-size: 15px;
  line-height: 1.2;
  border-radius: 5px;
  word-break: break-all;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  transform: translate3d(-50%, -50%, 0);
  background-color: rgba(0, 0, 0, .7);
  padding: 12px;
  text-align: center;
}
.sq-toast-icon {
  font-size: 54px !important;
  margin-bottom: 14px;
}
</style>

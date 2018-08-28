<template>
  <transition name="sq-dialog">
    <div class="sq-dialog-wrapper" v-show="visible">
      <div class="sq-dialog">
        <div class="sq-dialog-mark" @click="$_handleClickOnMark"></div>
        <div class="sq-dialog-content">
          <div v-show="title" class="sq-dialog-title">{{ title }}</div>
          <div class="sq-dialog-text" :class="textClasses">
            <i v-if="iconStatus" class="sq-icon sq-dialog-icon-status" :class="iconStatusClasses"></i>
            <span class="text" v-html="message"></span>
          </div>
          <div class="sq-dialog-footer">
            <div
              v-if="type === 'confirm'"
              class="sq-dialog-cancel"
              @click="$_handleCancel"
            >
              <span v-html="cancelButtonText"></span>
            </div>
            <div
              class="sq-dialog-confirm"
              @click="$_handleConfirm"
            >
              <span v-html="confirmButtonText"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'sq-dialog',

  props: {
    type: {
      type: String
    },
    clickCloseMark: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '系统提示'
    },
    message: {
      type: String,
      default: ''
    },
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    onConfirm: {
      type: Function,
      default: () => {}
    },
    onCancel: {
      type: Function,
      default: () => {}
    },
    iconStatus: {
      type: String
    }
  },

  computed: {
    textClasses () {
      return {
        'text-left': this.iconStatus
      }
    },
    iconStatusClasses () {
      return {
        'sq-icon-checkmark-full success': this.iconStatus === 'success',
        'sq-icon-error-gap fail': this.iconStatus === 'fail'
      }
    }
  },

  data () {
    return {
      visible: false
    }
  },

  methods: {
    $_handleClickOnMark () {
      this.clickCloseMark && (this.visible = false)
    },
    $_handleCancel () {
      this.onCancel()
      this.visible = false
    },
    $_handleConfirm () {
      this.onConfirm()
    }
  }
}
</script>

<style lang="scss">
// @import '~@/common/styles/variable';
$prefixCls: sq-dialog;

.#{$prefixCls} {
  &-enter-active, &-leave-active {
    transition: opacity .5s;
  }
  &-enter, &-leave-to{
    opacity: 0;
  }
  &-mark {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($color: #000000, $alpha: .45);
    z-index: 998;
  }
  &-content {
    z-index: 999;
    width: 80%;
    min-width: 120px;
    position: fixed;
    top: 50%;
    left: 50%;
    display: flex;
    color: #303133;
    font-size: 16px;
    line-height: 1.2;
    border-radius: 4px;
    word-break: break-all;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-sizing: border-box;
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    text-align: center;
  }
  &-title {
    height: 40px;
    line-height: 1.4;
    width: 100%;
    padding-top: 14px;
    box-sizing: border-box;
    text-align: center;
  }
  &-text {
    padding: 30px 20px 34px 20px;
    width: 100%;
    box-sizing: border-box;
    line-height: 1.4;
    &.text-left {
      text-align: left;
    }
  }
  &-footer {
    display:flex;
    width: 100%;
    font-size: 18px;
    align-items:  center;
    border-top: 1px solid #e5e5e5;
    justify-content:  center;
  }
  &-cancel {
    flex:1;
    padding: 12px 0;
    border-right:1px solid #e5e5e5;
    box-sizing:  border-box;
    color: #606265;
    text-align: center;
  }
  &-confirm {
    flex:1;
    padding: 12px 0;
    box-sizing: border-box;
    height: 100%;
    color: $theme-color;
    text-align: center;
  }
  &-icon-status {
    vertical-align: middle;
    margin-right: 12px;
    font-size: 50px;
    &.success {
      color: #00a0e9;
    }
    &.fail {
      color: #d0021b;
    }
  }
}
</style>

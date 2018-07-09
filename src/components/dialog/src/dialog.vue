<template>
  <transition name="sq-dialog">
    <div class="sq-dialog-wrapper" v-show="visible">
      <div class="sq-dialog">
        <div class="sq-dialog-mark" @click="$_handleClickOnMark"></div>
        <div class="sq-dialog-content" :class="{ 'sq-dialog-content-active': iconStatus === 'success' || iconStatus === 'fail'}">
          <div v-show="title" class="sq-dialog-title">{{ title }}</div>
          <div class="sq-dialog-text">
              <img v-if="iconStatus === 'success'" src="data:image/png;base64,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" alt="" class="sq-dialog-icon-status">
              <img v-if="iconStatus === 'fail'" src="data:image/png;base64,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" alt="" class="sq-dialog-icon-status">
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
      default: () => []
    },
    onCancel: {
      type: Function,
      default: () => []
    },
    iconStatus: {
      type: String,
      default: 'text'
    }
  },

  computed: {
    // classes () {
    //   return [
    //     'sq-dialog-icon',
    //     {
    //       [`icon-sqbx icon-shuruzhengque`]: this.type === 'success',
    //       [`icon-sqbx icon-cuowu`]: this.type === 'error'
    //     }
    //   ]
    // }
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
    border-radius: 5px;
    word-break: break-all;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-sizing: border-box;
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    text-align: center;
    &.#{$prefixCls}-content-active {
      text-align: left;
    }
  }
  &-title {
    height: 40px;
    line-height: 1.5;
    width: 100%;
    padding-top: 15px;
    box-sizing: border-box;
  }
  &-text {
    padding: 30px 20px 35px 20px;
    width: 100%;
    box-sizing: border-box;
    line-height: 1.5;
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
  }
  &-confirm {
    flex:1;
    padding: 12px 0;
    box-sizing: border-box;
    height: 100%;
    color:#4a90e2;
    text-align: center;
  }
  &-icon-status {
    width: 50px;
    height: 50px;
    vertical-align: middle;
    text-align: left;
    padding-right: 12px;
  }
}

</style>

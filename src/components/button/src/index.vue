<template>
  <button
    :type="htmlType"
    :class="classes"
    :disabled="disabled"
    :style="{'opacity':disabled ? '.5' : ''}"
    @click="handleClick"
  >
    <!-- <Icon class="ivu-load-loop" type="load-c" v-if="loading"></Icon> -->
    <!-- <Icon :type="icon" v-if="icon && !loading"></Icon> -->
    <div class="sq-btn-wrap">
      <span class="sq-btn-icon" v-if="icon || $slots.icon">
        <slot name="icon">
          <i v-if="icon" class="sq-icon" :class="'sq-icon-' + icon"></i>
        </slot>
      </span>
      <span class="sq-btn-text"><slot></slot></span>
    </div>
  </button>
</template>

<script>
const prefixCls = 'sq-btn'

export default {
  name: 'sq-button',
  props: {
    icon: String,
    type: {
      type: String,
      default: 'default',
      validator (value) {
        return ['default', 'primary', 'ghost'].indexOf(value) > -1
      }
    },
    htmlType: String,
    disabled: Boolean,
    size: {
      type: String,
      default: 'default',
      validator (value) {
        return ['small', 'large', 'default'].indexOf(value) > -1
      }
    }
  },
  data () {
    return {
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.type}`]: !!this.type,
          // [`${prefixCls}-long`]: this.long,
          // [`${prefixCls}-${this.shape}`]: !!this.shape,
          [`${prefixCls}-${this.size}`]: !!this.size
          // [`${prefixCls}-loading`]: this.loading != null && this.loading,
          // [`${prefixCls}-icon-only`]: !this.showSlot && (!!this.icon || this.loading)
        }
      ]
    }
  },
  methods: {
    handleClick (event) {
      if (this.disabled) return
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss">
@import '~@/common/styles/variable';

$prefixCls: sq-btn;

.#{$prefixCls} {
  display: inline-block;
  position: relative;
  outline: 0;
  text-align: center;
  overflow: hidden;
  border: 0;
  border-radius: 4px;
  box-sizing: border-box;
  color: inherit;
  font-size: 14px;
  height: 48px;
  padding: 0 28px;
  line-height: 1;
  &::after {
    background-color: #000;
    content: " ";
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  &:active::after {
    opacity: .3;
  }
  &-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // default
  &-default {
    color: $button-default-color;
    background-color: $button-default-background-color;
  }
  // primary button
  &-primary {
    color: $button-primary-color;
    background-color: $button-primary-background-color;
  }
   // ghost button
  &-ghost {
    color: $button-ghost-color;
    background-color: $button-ghost-background-color;
    border: 1px solid $button-ghost-color;
  }
  // large size
  &-large {
    width: 100%;
    font-size: 16px;
  }
  // small size
  &-small {
    height: 34px;
    line-height: 1;
    padding: 0 14px;
    font-size: 14px;
  }
  // icon
  &-icon {
    .sq-icon {
      font-size: inherit;
    }
    img {
      vertical-align: middle;
      width: 1em;
      height: 1em;
    }
    & + .#{$prefixCls}-text {
      margin-left: 4px;
    }
  }
}
.#{$prefixCls} ~ .#{$prefixCls} {
  margin-top: 10px;
}
</style>

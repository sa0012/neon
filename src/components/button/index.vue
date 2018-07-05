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
          <i v-if="icon" class="iconfont" :class="'icon-' + icon"></i>
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
@import '../../assets/style/components/button';
.sq-btn~.sq-btn {
  margin-top: 10px;
}
</style>

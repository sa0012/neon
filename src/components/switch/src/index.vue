<template>
  <div class="sq-switch" :class="classChecked" :style="wrapStyles" @click="$_click">
    <div class="sq-switch-circle"></div>
  </div>
</template>

<script>
export default {
  name: 'sq-switch',

  props: {
    value: {
      type: Boolean,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: '30px'
    }
  },

  computed: {
    classChecked () {
      return [
        {
          'sq-switch-checked': this.value,
          'sq-switch-disabled': this.disabled
        }
      ]
    },
    wrapStyles () {
      return `font-size: ${this.size}`
    }
  },

  methods: {
    $_click () {
      if (this.disabled) return
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="scss">
@import '~@/common/styles/variable';

$prefixCls: sq-switch;

.#{$prefixCls} {
  height: 1em;
  width: 1.6em;
  display: inline-block;
  position: relative;
  background: #fff;
  box-sizing: content-box;
  border: 1px solid rgba(0, 0, 0, .1);
  border-radius: 1em;
  transition: .3s;
  &-checked {
    transition: .3s;
    background-color: $theme-color;
    .#{$prefixCls}-circle {
      transform: translateX(.6em);
    }
  }
  &-disabled {
    opacity: .4;
  }
  &-circle {
    top: 0;
    left: 0;
    z-index: 1;
    width: 1em;
    height: 1em;
    transition: .3s;
    position: absolute;
    border-radius: 100%;
    background-color: #fff;
    box-shadow: 0 3px 1px 0 rgba(0, 0, 0, .05), 0 2px 2px 0 rgba(0, 0, 0, .1), 0 3px 3px 0 rgba(0, 0, 0, .05);
  }
}
</style>

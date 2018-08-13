<template>
  <div class="sq-child-checkicon-wrap" @click="$_click">
    <div class="sq-child-checkicon-checkbox" :class="classes">
    </div>
    <div class="sq-child-checkicon-text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sq-child-checkicon',

  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes () {
      return [
        {
          'sq-child-checkicon-checked': this.value
        }
      ]
    }
  },

  methods: {
    $_click (event) {
      if (this.disabled) return
      this.$emit('change', !this.value)
      this.$emit('input', !this.value)
    }
  }
}

</script>

<style lang="scss">
@import '~@/common/styles/variable';
$prefixCls: sq-child-checkicon;

.#{$prefixCls} {
  &-wrap {
    display: inline-block;
    position: relative;
  }
  &-checkbox {
    margin-right: 22px;
    display: inline-block;
    &::before {
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      background-color: transparent;
      border: 1px solid #ccc;
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -8px;
      border-radius: 50%;
      box-sizing: border-box;
    }
    &::after {
      content: "";
      display: table;
      width: 4px;
      height: 8px;
      position: absolute;
      top: 50%;
      margin-top: -6px;
      left: 5px;
      border: 2px solid #fff;
      border-top: 0;
      border-left: 0;
      transform: rotate(45deg) scale(0);
      transition: all .2s ease-in-out;
      box-sizing: content-box;
    }
  }
  &-text {
    display: inline-block;
  }
  &-checked.#{$prefixCls}-checkbox::before {
    background-color: $theme-color;
    border-color: $theme-color;
  }
  &-checked.#{$prefixCls}-checkbox::after {
    transform: rotate(45deg) scale(1);
  }
}
</style>

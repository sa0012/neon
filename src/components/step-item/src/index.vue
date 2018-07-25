<template>
  <div class="sq-step-item">
    <div class="sq-step-item-icon">
      <i v-if="isChecked" class="sq-icon sq-icon-checkmark-full"></i>
      <i v-else class="sq-icon sq-icon-yuandian" style="color: #999;"></i>
    </div>
    <div class="sq-step-item-text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sq-step-item',

  computed: {
    isChecked () {
      return this.$parent.steps.indexOf(this) <= this.$parent.active
    }
  },

  beforeMount () {
    this.$parent.steps.push(this)
  }
}
</script>

<style lang="scss">
@import '~@/common/styles/variable';
$prefixCls: sq-step-item;

.#{$prefixCls} {
  display: inline-block;
  font-size: 12px;
  width: 2em;
  flex: 0 0 2em;
  &-icon {
    .sq-icon {
      font-size: 2em;
      color: $theme-color;
    }
  }
  &-text {
    font-size: 1em;
    color: #878787;
    white-space: nowrap;
  }
  & ~ & .#{$prefixCls}-text {
    width: 2em;
    float: right;
    display: flex;
    justify-content: center;
  }
  & ~ & {
    flex: 1;
    text-align: right;
  }
  & ~ & .#{$prefixCls}-icon {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 6px;
      right: 30px;
      left: .6em;
      right: 2.6em;
      height: 1px;
      background-color: #e6e6e6;
      margin-top: -1px;
    }
  }
}
</style>

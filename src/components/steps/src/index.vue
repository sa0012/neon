<template>
  <div class="sq-steps">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'sq-steps',

  props: {
    active: {
      type: Number,
      default: 0
    }
  },

  data () {
    return {
      steps: []
    }
  }
}
</script>

<style lang="scss">
@import '~@/common/styles/variable';
$prefixCls: sq-steps;

.#{$prefixCls} {
  display: flex;
  overflow: hidden;
  background-color: #fff;
  padding: 0 10px;
  .sq-step-item:last-child .sq-step-item-text {
    justify-content: flex-end;
  }
}
</style>

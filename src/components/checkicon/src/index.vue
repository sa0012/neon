<template>
  <span class="sq-checkicon-wrap" :class="classes">
    <i class="sq-icon sq-icon-checkicon"></i>
  </span>
</template>

<script>
export default {
  name: 'sq-checkicon',

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes () {
      return [
        {
          'checked': this.value
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@import '~@/common/styles/variable';
.sq-checkicon {
  &-wrap {
    border: 1px solid #cccccc;
    border-radius: 50%;
    width: 1em;
    height: 1em;
    display: inline-block;
    background-color: #ffffff;
    box-sizing: border-box;
    line-height: 1;
    transform: translate3d(0, 1px, 0) scale(1.2);
    &.checked {
      background-color: transparent;
      border-color: transparent;
      .sq-icon-checkicon {
        transform: scale(1);
      }
    }
    .sq-icon-checkicon {
      color: $theme-color;
      transform: scale(0);
      transition: all .2s ease-in-out;
      font-size: inherit;
      width: 100%;
      height: 100%;
      display: inline-block;
    }
  }
}
</style>

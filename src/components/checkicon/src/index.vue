<template>
  <span class="sq-checkicon-wrap" :class="classes">
    <i class="sq-icon" :class="iconClasses"></i>
  </span>
</template>

<script>
export default {
  name: 'sq-checkicon',

  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'round',
      validator (value) {
        return ['round', 'square', 'square-border'].indexOf(value) > -1
      }
    },
    scale: {
      type: String,
      default: '1'
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
          'disabled': this.disabled
        }
      ]
    },
    iconClasses () {
      return [
        {
          'sq-icon-checkicon': this.value && this.type === 'round',
          'sq-icon-unchecked': !this.value && this.type === 'round',
          'sq-icon-square-checked': this.value && this.type === 'square',
          'sq-icon-square-unchecked': !this.value && this.type === 'square',
          'sq-icon-square-border-checked': this.value && this.type === 'square-border',
          'sq-icon-square-border-unchecked': !this.value && this.type === 'square-border'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
// @import '~@/common/styles/variable';
.sq-checkicon {
  &-wrap {
    &.disabled {
      .sq-icon-checkicon, .sq-icon-square-checked, .sq-icon-square-border-checked {
        color: #bbb;
      }
      .sq-icon-unchecked, .sq-icon-square-unchecked, .sq-icon-square-border-unchecked {
        opacity: .8;
      }
    }
    .sq-icon-checkicon, .sq-icon-square-checked, .sq-icon-square-border-checked {
      color: $theme-color;
      transition: all .2s ease-in-out;
      font-size: inherit;
      width: 100%;
      height: 100%;
      display: inline-block;
      transform: scale(1.2);
    }
    .sq-icon-unchecked, .sq-icon-square-unchecked, .sq-icon-square-border-unchecked {
      font-size: inherit;
      width: 100%;
      height: 100%;
      display: inline-block;
      color: #ccc;
      background-color: #fff;
      transform: scale(1.2);
    }
    .sq-icon-unchecked {
      border-radius: 50%;
    }
    .sq-icon-square-border-unchecked {
      border-radius: 4px;
    }
  }
}
</style>

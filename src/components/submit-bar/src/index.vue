<template>
  <div class="sq-submit-bar">
    <div class="sq-submit-bar-left">
      <span>{{ label }}</span>
      <span v-html="currency"></span>
      <span>{{ price }}</span>
    </div>
    <div class="sq-submit-bar-right" :class="buttonClasses" @click="$_submit">
      <sq-button type="primary" :disabled="disabled" class="sq-submit-bar-right-button">{{ buttonText }}</sq-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sq-submit-bar',

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    price: {
      type: [String, Number]
    },
    buttonText: {
      type: String
    },
    currency: {
      type: String,
      default: '&yen;'
    }
  },

  computed: {
    buttonClasses () {
      return [
        {
          'sq-submit-bar-disabled': this.disabled
        }
      ]
    }
  },

  methods: {
    $_submit () {
      if (this.disabled) return
      this.$emit('submit')
    }
  }
}
</script>

<style lang="scss">
@import '../../../common/styles/variable.scss';
$prefixCls: sq-submit-bar;

.#{$prefixCls} {
  display: flex;
  background-color: #ffffff;
  height: 48px;
  font-size: 16px;
  font-family: initial;
  color: #333;
  &-left {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-right {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .#{$prefixCls}-right-button {
      width: 100%;
      border-radius: 0;
      font-size: inherit;
      .sq-btn-text {
        font-size: inherit;
      }
    }
    &.#{$prefixCls}-disabled {
      background-color: #eee;
      color: #999;
    }
  }
}
</style>

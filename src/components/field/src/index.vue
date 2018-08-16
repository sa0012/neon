<template>
  <div class="sq-field">
    <div class="sq-field-label" v-if="label">
      <span>{{label}}</span>
    </div>
    <div class="sq-field-value" :class="classes">
      <input
        v-if="!$slots.control"
        class="sq-field-control"
        :class="{'sq-field-right': right}"
        :type="type"
        :value="value"
        :style="iptStyle"
        v-bind="$attrs"
        v-on="listeners"
      >
      <slot name="control"></slot>
      <div class="sq-field-button" v-if="$slots.button">
        <slot name="button"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sq-field',

  inheritAttrs: false,

  props: {
    iptStyle: {
      type: Object
    },
    right: {
      type: Boolean,
      default: false
    },
    label: String,
    type: {
      type: String,
      default: 'text'
    },
    arrow: {
      type: Boolean,
      default: false
    },
    value: null
  },

  computed: {
    classes () {
      return {
        'sq-field-islink': this.arrow,
        'sq-field-textright': this.right
      }
    },
    listeners () {
      return {
        ...this.$listeners,
        input: this.onInput
      }
    }
  },

  methods: {
    onInput (event) {
      this.$emit('input', event.target.value)
    }
  }
}

</script>
<style lang="scss">
@import '~@/common/styles/variable';
$prefixCls: sq-field;

.#{$prefixCls} {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  line-height: 48px;
  background-color: #fff;
  border-radius: 0;
  color: #333;
  overflow: hidden;
  font-size: 0;
  position: relative;
  padding-left: 16px;
  &-label {
    flex: 0 0 74px;
    width: 74px;
    box-sizing: border-box;
    span {
      font-size: 14px;
    }
    &~.#{$prefixCls}-value {
      .#{$prefixCls}-control {
        padding-left: 0;
      }
      .#{$prefixCls}-right {
        text-align: right;
        padding-right: 14px;
      }
    }
    &~.#{$prefixCls}-value.#{$prefixCls}-islink.#{$prefixCls}-textright {
      .#{$prefixCls}-right {
        padding-right: 28px;
      }
    }
  }
  &-value {
    flex: 1;
    position: relative;
    .#{$prefixCls}-control {
      outline: none;
    }
    .#{$prefixCls}-button {
      position: absolute;
      right: 12px;
      bottom: 8px;
      font-size: 14px;
      height: 34px;
      button {
        height: 100%;
        line-height: initial;
        vertical-align: top;
        padding: 0 14px;
        color: $theme-color;
        border-color: $theme-color;
        background-color: #F6F9FD;
      }
    }
  }
  &-control {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    line-height: normal;
    border:0;
    padding: 14px 0px;
    font-size: 14px;
  }
  &~&::after {
    content: '';
    position: absolute;
    top: 0;
    height: 200%;
    transform-origin: 0 0;
    pointer-events: none;
    box-sizing: border-box;
    left: 16px;
    right: 0;
    width: auto;
    transform: scale(1, .5);
    border: 0 solid #e5e5e5;
    border-top-width: 1px;
  }
}

// arrow
.#{$prefixCls}-islink {
  position: relative;
}
.#{$prefixCls}-islink::after {
  content: "";
  display: block;
  position: absolute;
  width: 10px;
  right: 14px;
  top: 20px;
  height: 10px;
  border-right: 2px solid #e6e6e6;
  border-top: 2px solid #e6e6e6;
  box-sizing: border-box;
  transform: rotate(45deg);
}
</style>

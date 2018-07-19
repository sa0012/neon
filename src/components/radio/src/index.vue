<template>
  <span class="sq-radio" :class="radioClasses">
    <span @click="$_change" class="sq-radio-wrap">
      <span class="sq-radio-radioicon" :class="radioiconClasses"></span>
      <span class="sq-radio-text">
        <slot></slot>
      </span>
    </span>
  </span>
</template>

<script>
export default {
  /**
   * name在radioGroup组件逻辑引用，若修改name值，则radioGroup中需相应修改
   */
  name: 'sq-radio',

  props: {
    name: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isGroupDisabled () {
      return this.$parent.disabled
    },
    type () {
      return this.$parent.type
    },
    radioClasses () {
      return [
        {
          'sq-radio-disabled': this.disabled
        }
      ]
    },
    radioiconClasses () {
      return [
        {
          'sq-radio-checked': this.name === this.currentValue,
          'sq-radio-checked-disabled': this.isGroupDisabled || this.disabled
        }
      ]
    }
  },

  data () {
    return {
      currentValue: ''
    }
  },

  methods: {
    $_change () {
      if (this.disabled || this.isGroupDisabled) return
      this.$parent.update(this.name)
    }
  },

  mounted () {
    this.$parent.update()
  }
}

</script>
<style lang="scss">
@import '../../../common/styles/variable.scss';
$prefixCls: sq-radio;

.#{$prefixCls} {
  display: inline-block;
  &.#{$prefixCls}-disabled {
    color: #bbb;
  }
  &-wrap {
    display: flex;
    align-items: baseline;
  }
  &-radioicon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.1em;
    height: 1.1em;
    border-radius: 50%;
    background: #ffffff;
    transform: translateY(-2px);
    border: 1px solid #ccc;
    box-sizing: border-box;
    &::before {
      content: '';
      width: .25em;
      height: .5em;
      border: 2px solid #fff;
      border-top: 0;
      border-left: 0;
      transition: transform .2s ease-in-out;
      transform: rotate(45deg) scale(0) translateY(-1px) translateX(-1px);
    }
  }
  &-checked {
    background-color: $theme-color;
    border-color: $theme-color;
    &.#{$prefixCls}-checked-disabled {
      background-color: #ccc;
      border-color: #ccc;
    }
    &.#{$prefixCls}-radioicon {
      &::before {
        transform: rotate(45deg) scale(1) translateY(-1px) translateX(-1px);
      }
    }
  }
  &-text {
    display: inline-block;
    margin-left: 6px;
  }
}
</style>

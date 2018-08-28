<template>
  <span class="sq-radio" :class="radioClasses">
    <span @click="$_change" class="sq-radio-wrap">
      <sq-checkicon :value="isChecked" :disabled="isGroupDisabled || disabled" :type="type"></sq-checkicon>
      <span class="sq-radio-text">
        <slot></slot>
      </span>
    </span>
  </span>
</template>

<script>
import SqCheckicon from '../../checkicon/src'

export default {
  /**
   * name在radioGroup组件逻辑引用，若修改name值，则radioGroup中需相应修改
   */
  name: 'sq-radio',

  components: {
    SqCheckicon
  },

  props: {
    name: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'round',
      validator (value) {
        return ['round', 'square', 'square-border'].indexOf(value) > -1
      }
    }
  },

  computed: {
    isChecked () {
      return this.name === this.currentValue
    },
    isGroupDisabled () {
      return this.$parent.disabled
    },
    radioClasses () {
      return [
        {
          'sq-radio-disabled': this.disabled
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
      this.$parent && this.$parent.$options.name === 'sq-radio-group' && this.$parent.update(this.name)
    }
  },

  mounted () {
    this.$parent && this.$parent.$options.name === 'sq-radio-group' && this.$parent.update()
  }
}

</script>
<style lang="scss">
$prefixCls: sq-radio;

.#{$prefixCls} {
  display: inline-block;
  font-size: 14px;
  &.#{$prefixCls}-disabled {
    color: #bbb;
  }
  &-wrap {
    display: flex;
    align-items: baseline;
  }
  &-text {
    display: inline-block;
    margin-left: 6px;
  }
}
</style>

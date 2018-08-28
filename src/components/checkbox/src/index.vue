<template>
  <span class="sq-checkbox" :class="checkboxClasses">
    <span @click="change" class="sq-checkbox-wrap">
      <sq-checkicon :value="isChecked" :disabled="isGroupDisabled || disabled" :type="borderType"></sq-checkicon>
      <span class="sq-checkbox-text">
        <slot></slot>
      </span>
    </span>
  </span>
</template>

<script>
import SqCheckicon from '../../checkicon/src'

export default {
  /**
   * name在checkboxGroup组件逻辑引用，若修改name值，则checkboxGroup中需相应修改
   */
  name: 'sq-checkbox',

  components: {
    SqCheckicon
  },

  props: {
    borderType: {
      type: String,
      default: 'round', // 默认圆形，可设置正方形
      validator (value) {
        return ['round', 'square', 'square-border'].indexOf(value) > -1
      }
    },
    name: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isChecked () {
      return this.name === this.currentValue.filter(item => { return this.name === item })[0]
    },
    isGroupDisabled () {
      return this.$parent.disabled
    },
    checkboxClasses () {
      return {
        'sq-checkbox-disabled': this.disabled
      }
    }
  },

  data () {
    return {
      currentValue: []
    }
  },

  methods: {
    change () {
      if (this.disabled || this.isGroupDisabled) return
      this.$parent && this.$parent.$options.name === 'sq-checkbox-group' && this.$parent.update(this.name)
    }
  },

  mounted () {
    this.$parent && this.$parent.$options.name === 'sq-checkbox-group' && this.$parent.update()
  }
}

</script>
<style lang='scss'>
// @import '~@/common/styles/variable';
$prefixCls: sq-checkbox;

.#{$prefixCls} {
  display: inline-block;
  font-size: 14px;
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

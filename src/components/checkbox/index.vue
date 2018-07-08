<template>
  <span class="sq-checkbox" :class="checkboxClasses">
    <span @click="change" class="sq-checkbox-wrap">
      <span class="sq-checkbox-icon" :class="checkboxIconClasses"></span>
      <span class="sq-checkbox-text">
        <slot></slot>
      </span>
    </span>
  </span>
</template>

<script>
export default {
  /**
   * name在checkboxGroup组件逻辑引用，若修改name值，则checkboxGroup中需相应修改
   */
  name: 'sq-checkbox',

  props: {
    borderType: {
      type: String,
      default: 'round', // 默认圆形，可设置正方形
      validator (value) {
        return ['round', 'square'].indexOf(value) > -1
      }
    },
    name: {
      type: null,
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
    checkboxClasses () {
      return {
        'sq-checkbox-disabled': this.disabled
      }
    },
    checkboxIconClasses () {
      return {
        'sq-checkbox-checked': this.name === this.currentValue.filter(item => { return this.name === item })[0],
        'sq-checkbox-square': this.borderType === 'square',
        'sq-checkbox-checked-disabled': this.isGroupDisabled || this.disabled
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
      this.$parent.update(this.name)
    }
  },

  mounted () {
    this.$parent.update()
  }
}

</script>
<style lang='scss'>
@import '../../common/styles/variable.scss';

.sq-checkbox {
  display: inline-block;
  &-wrap {
    display: flex;
    align-items: baseline;
  }
  &-icon {
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
    &.sq-checkbox-checked-disabled {
      background-color: #ccc;
      border-color: #ccc;
    }
    &.sq-checkbox-icon {
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

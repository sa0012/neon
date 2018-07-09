<template>
  <span class="sq-checkbox-group" :class="classes">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'sq-checkbox-group',

  props: {
    value: {
      type: Array,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      validator (value) {
        return ['button', 'cell', 'cell-between'].indexOf(value) > -1
      }
    }
  },

  computed: {
    classes () {
      return [
        this.type ? `sq-checkbox-group-${this.type}` : '',
        {
          'sq-checkbox-group-disabled': this.disabled
        }
      ]
    }
  },

  methods: {
    getChildrens () {
      return this.$children.filter(item => item.$options.name === 'sq-checkbox')
    },

    update (currentValue) {
      if (currentValue) {
        if (this.value.includes(currentValue)) {
          let flag = 0
          this.value.forEach((item, index) => {
            if (item === currentValue) {
              flag = index
            }
          })
          this.value.splice(flag, 1)
        } else {
          this.value.push(currentValue)
        }
        this.$emit('input', this.value)
        return
      }
      const children = this.getChildrens()

      children.forEach(item => {
        item.currentValue = this.value
      })
    }
  },

  watch: {
    value (val) {
      const children = this.getChildrens()

      children.forEach(item => {
        item.currentValue = val
      })

      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss">
@import '../../../common/styles/mixins.scss';
$prefixCls: sq-checkbox-group;

.#{$prefixCls} {
  &-cell,
  &-cell-between {
    display: block;
    .sq-checkbox {
      display: block;
      background-color: #ffffff;
      height: 48px;
      line-height: 48px;
      padding: 0 16px;
      &~.sq-checkbox {
        @include mix-1px($top: 1, $position-left: 16px);
      }
    }
  }
  &-cell-between {
    .sq-checkbox {
      .sq-checkbox-wrap {
        justify-content: space-between;
        flex-direction: row-reverse;
      }
    }
  }
  &-disabled {
    color: #bbb;
  }
}
</style>

<template>
  <span class="sq-radio-group" :class="classes">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'sq-radio-group',

  props: {
    value: {
      type: null,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      validator (value) {
        return ['button', 'cell'].indexOf(value) > -1
      }
    }
  },

  computed: {
    classes () {
      return [
        {
          'sq-radio-group-disabled': this.disabled,
          'sq-radio-group-cell': this.type === 'cell'
        }
      ]
    }
  },

  methods: {
    getChildrens () {
      return this.$children.filter(item => item.$options.name === 'sq-radio')
    },

    update (currentValue) {
      if (currentValue) {
        this.$emit('input', currentValue)
        return
      }
      const children = this.getChildrens()

      children.forEach(item => {
        if (this.value === item.name) {
          item.currentValue = this.value
        }
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
@import '../../assets/style/mixins.scss';

.sq-radio-group {
  &-cell {
    display: block;
    .sq-radio {
      display: block;
      background-color: #ffffff;
      height: 48px;
      line-height: 48px;
      padding: 0 16px;
      .sq-radio-wrap {
        justify-content: space-between;
        flex-direction: row-reverse;
      }
      &~.sq-radio {
        @include mix-1px($top: 1, $position-left: 16px);
      }
    }
  }
  &-disabled {
    color: #bbb;
  }
}
</style>

<template>
  <div class="sq-stepper">
    <div class="sq-stepper-wrap">
      <span class="sq-stepper-left" :class="cutClasses" @click="$_cut">
        <i class="sq-icon sq-icon-jian"></i>
      </span>
      <input
        type="text"
        pattern="[0-9]*"
        class="sq-stepper-input"
        v-model.number="currentVal"
        :readonly="readonlyInput"
        :disabled="isInputDisabled"
        @input="$_onInput"
        :class="inputClasses"
      >
      <span class="sq-stepper-right" :class="addClasses" @click="$_add">
        <i class="sq-icon sq-icon-jia"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sq-stepper',

  props: {
    max: {
      type: [Number, String]
    },
    min: {
      type: [Number, String]
    },
    value: {
      type: [Number, String],
      default: 0
    },
    step: {
      type: [Number, String],
      default: 1
    },
    readonlyInput: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    cutClasses () {
      return [
        {
          'sq-stepper-cut-disabled': this.isCutDisabled
        }
      ]
    },
    inputClasses () {
      return {
        'sq-stepper-input-disabled': this.readonlyInput
      }
    },
    addClasses () {
      return [
        {
          'sq-stepper-add-disabled': this.isAddDisabled
        }
      ]
    }
  },

  data () {
    return {
      currentVal: this.value,
      isInputDisabled: false,
      isCutDisabled: false,
      isAddDisabled: false
    }
  },

  methods: {
    $_cut () {
      if (this.isCutDisabled) return

      const result = this.currentVal - +this.step
      this.currentVal = result
      this.$emit('input', result)

      if (this.min !== void 0 && (result - +this.step < +this.min)) {
        this.isCutDisabled = true
      }
      if (this.isAddDisabled && this.max !== void 0 && result < +this.max) {
        this.isAddDisabled = false
      }
    },
    $_add () {
      if (this.isAddDisabled) return

      const result = this.currentVal + +this.step
      this.currentVal = result
      this.$emit('input', result)

      if (this.max !== void 0 && (result + +this.step > +this.max)) {
        this.isAddDisabled = true
      }
      if (this.isCutDisabled && this.min !== void 0 && result > +this.min) {
        this.isCutDisabled = false
      }
    },
    $_onInput (event) {
      const val = +event.target.value
      if (this.min !== void 0) {
        if (val <= +this.min) {
          this.currentVal = +this.min
          this.$emit('input', +this.min)
          this.isCutDisabled = true
          return
        }
      }

      if (this.max !== void 0) {
        if (val >= +this.max) {
          this.currentVal = +this.max
          this.$emit('input', +this.max)
          this.isAddDisabled = true
          return
        }
      }

      this.currentVal = val
      this.$emit('input', val)
      this.isAddDisabled && (this.isAddDisabled = false)
      this.isCutDisabled && (this.isCutDisabled = false)
    }
  },

  watch: {
    currentVal: {
      handler (val, oldVal) {
        if (oldVal === void 0 && val !== void 0) {
          if (this.max !== void 0 && +val >= +this.max) {
            this.isAddDisabled = true
          }
          if (this.min !== void 0 && +val <= +this.min) {
            this.isCutDisabled = true
          }
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
// @import '~@/common/styles/variable';
$prefixCls: sq-stepper;

.#{$prefixCls} {
  display: inline-block;
  background-color: #fff;
  &-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-left,
  &-right {
    border: 1px solid $theme-color;
    color: $theme-color;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 27px;
    height: 27px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #fff;
  }
  &-input {
    position: relative;
    width: 40px;
    height: 27px;
    padding: 0 5px;
    margin: 0;
    font-size: 16px;
    color: #333;
    text-align: center;
    border: 0;
    outline: 0;
    -webkit-appearance: none;
  }
  &-input-disabled {
    background-color: rgba(201, 201, 201, .5);
  }

  &-cut-disabled,
  &-add-disabled {
    border-color: #ccc;
    color: #ccc;
  }
}
</style>

<template>
  <transition name="ry-slide-bottom">
    <div class="sq-number-keyboard" :style="{'zIndex': zIndex}" :ref="keyboardRef" v-show="isShow">
      <div class="sq-number-keyboard-value"  @click="setValue">
        <div
          v-for="(item, index) in 12"
          :key="index"
          class="sq-number-keyboard-key"
        >
          <span
            v-if="index + 1 === 10"
            :data-key="extraKey"
            class="sq-number-keyboard-key-item"
            :class="{'sq-number-keyboard-key-active': extraKey }"
            :style="{ 'fontWeight': extraKey === '.' ? '700' : '' }"
          >
            {{ extraKey }}
          </span>
          <span v-else-if="index + 1 === 11" data-key="0" class="sq-number-keyboard-key-item sq-number-keyboard-key-active">0</span>
          <span v-else-if="index + 1 === 12" data-key="keyboard-down" class="sq-number-keyboard-key-item">
            <i class="sq-icon sq-icon-keyboard-down" data-key="keyboard-down"></i>
          </span>
          <span v-else :data-key="index + 1" class="sq-number-keyboard-key-item sq-number-keyboard-key-active">{{ index + 1 }}</span>
        </div>
      </div>
      <div class="sq-number-keyboard-button">
        <div class="sq-number-keyboard-delate sq-number-keyboard-key-active" @click="delateKey">
          <i class="sq-icon sq-icon-keyboard-remove"></i>
        </div>
        <div class="sq-number-keyboard-confirm" @click="confirm">{{ confirmText }}</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'sq-number-keyboard',

  props: {
    value: {
      type: Boolean,
      required: true
    },
    type: {
      type: String,
      default: 'number',
      validator (value) {
        return ['number', 'amount', 'idcard'].indexOf(value) > -1
      }
    },
    zIndex: {
      type: Number,
      default: 100
    },
    confirmText: {
      type: String,
      default: '确定'
    }
  },

  computed: {
    extraKey () {
      const type = {
        number: '',
        amount: '.',
        idcard: 'X'
      }
      return type[this.type]
    }
  },

  data () {
    return {
      isShow: this.value,
      keyboardRef: `keyboardRef${this._uid}`
    }
  },

  methods: {
    setValue (e) {
      const key = e.target.dataset.key

      if (key === '') return
      if (key === this.extraKey || +key < 10) {
        this.$emit('key-click', key)
      } else if (key === 'keyboard-down') {
        this.isShow = false
        this.$emit('input', false)
      }
    },
    delateKey () {
      this.$emit('delete')
    },
    confirm () {
      this.$emit('confirm')
    },
    closeKeyboard () {
      if (!this.$refs.hasOwnProperty(this.keyboardRef) || !this.$refs[this.keyboardRef]) {
        return
      }
      const isContains = this.$refs[this.keyboardRef].contains(event.target)
      if (!isContains && this.isShow) {
        this.isShow = false
        this.$emit('input', false)
      }
    }
  },

  watch: {
    value: {
      handler (val, oldVal) {
        this.isShow = val
      }
    }
  },

  mounted () {
    this.$nextTick(() => {
      document.addEventListener('click', this.closeKeyboard, false)
    })
  },

  beforeDestroy () {
    document.removeEventListener('click', this.closeKeyboard)
  }
}
</script>

<style lang="scss">
// @import '~@/common/styles/variable';
// @import '~@/common/styles/mixins';
/*依赖 base 里的动画*/
$prefixCls: sq-number-keyboard;

.#{$prefixCls} {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background-color: #ffffff;
  font-size: 24px;
  margin-top: 20px;
  &-value {
    flex: 3;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
  }
  &-key {
    flex: 0 0 33.3333%;
    width: 33.3333%;
    height: 54px;
    box-sizing: border-box;
    @include mix-flex-center;
    @include mix-onepx($top: 1, $right: 1);
    &:nth-child(-n+3)::before {
      border-top-width: 0;
    }

    .sq-icon {
      font-size: 30px;
    }
  }
  &-key-active {
    &:focus,
    &:active {
      background-color: #e8e8e8;
      outline: none;
    }
  }
  &-key-item {
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 54px;
    text-align: center;
  }
  &-button {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  &-delate,
  &-confirm {
    @include mix-flex-center;
    flex: 1;
  }
  &-delate {
    .sq-icon {
      font-size: 36px;
    }
  }
  &-confirm {
    background-color: $theme-color;
    color: #ffffff;
    font-size: 20px;
  }
}
</style>

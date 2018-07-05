<template>
  <div class="sq-sendcode">
    <div class="sq-sendcode-input-wrapper">
      <input type="text" pattern="[0-9]*" v-model="inputValue" class="sq-sendcode-input" :maxlength="maxlength" :placeholder="placeholder">
    </div>
    <sq-button
      class="sq-sendcode-btn"
      type="ghost"
      :disabled="disabled"
      @click="$_click"
      :style="styles"
    >
      {{ text }}
    </sq-button>
  </div>
</template>

<script>
import SqButton from '@/components/button'

export default {
  name: 'sq-sendcode',

  components: {
    SqButton
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 6
    },
    placeholder: {
      type: String,
      default: '请输入短信验证码'
    },
    buttonInitText: {
      type: String,
      default: '获取验证码'
    },
    timing: {
      default: 60,
      validator (val) {
        return /^\d*$/.test(val)
      }
    },
    code: {
      type: [String, Number]
    },
    sessionStorageKey: {
      type: String
    }
  },

  computed: {
    styles () {
      return {
        'backgroundColor': this.disabled ? '#ccc' : '',
        'opacity': 1
      }
    },
    text () {
      return this.disabled ? this.runTime + '秒后重试' : this.buttonInitText
    }
  },

  data () {
    return {
      disabled: false,
      status: 'init',
      runTime: this.timing,
      timerObj: null,
      inputValue: this.code
    }
  },

  methods: {
    $_click () {
      this.$emit('click')
    },
    run () {
      this.disabled = true
      if (this.sessionStorageKey) {
        window.sessionStorage[this.sessionStorageKey] = new Date().getTime() + this.runTime * 1000
      }
      this.timerObj = setInterval(() => {
        if (this.runTime <= 1) {
          this.timeInit()
        }
        --this.runTime
      }, 1000)
    },
    timeInit () {
      clearInterval(this.timerObj)
      this.disabled = false
      this.$emit('input', false)
      if (this.runTime !== this.timing) {
        this.runTime = this.timing
      }
    }
  },

  watch: {
    value (val, oldVal) {
      val ? this.run() : this.timeInit()
    },
    inputValue (val, oldVal) {
      this.$emit('update:code', val)
    }
  },

  created () {
    const oldTime = ~~((window.sessionStorage[this.sessionStorageKey] - new Date().getTime()) / 1000)
    if (oldTime > 0 && this.sessionStorageKey) {
      this.$emit('input', true)
      this.runTime = oldTime
    }
  },

  beforeDestroy () {
    !this.sessionStorageKey && clearInterval(this.timerObj)
  }
}
</script>

<style lang="scss">
.sq-sendcode {
  height: 48px;
  line-height: 48px;
  position: relative;
  &-input-wrapper {
    height: 100%;
    line-height: 100%;
    display: inline-block;
    background-color: #fff;
    box-sizing: border-box;
    position: absolute;
    right: 130px;
    left: 0;
    border-radius: 4px;
    overflow: hidden;
  }
  &-input {
    display: inline-block;
    border: 0;
    height: 100%;
    width: 100%;
    padding-left: 12px;
    box-sizing: border-box;
    font-size: 14px;
    padding-top: 14px;
    padding-bottom: 14px;
  }
  & {
    #{&}-btn {
      position: absolute;
      right: 0;
      padding: 0 18px;
    }
  }
}
</style>

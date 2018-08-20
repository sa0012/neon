<template>
  <div class="sq-rater">
    <input v-model="currentValue" style="display:none">
    <a class="sq-rater-box" v-for="(i, index) in max" @click="handleClick(i-1)" :key="index">
      <i
        class="sq-icon"
        :class="[charsetIcon ? charset[charsetIcon] : charset['star']]"
        :style="{fontSize: fontSize + 'px', color: (currentValue > i-1) ? activeColor : defaultColor}"
        v-if="charsetIcon !== 'smile'"
      ></i>
       <i
        class="sq-icon"
        :class="[(currentValue > i-1) ? charset['smile'] : charset['weep']]"
        :style="{fontSize: fontSize + 'px', color: (currentValue > i-1) ? activeColor : defaultColor}"
        v-if="charsetIcon === 'smile'"
      ></i>
    </a>
  </div>
</template>

<script>
export default {
  name: 'sq-rater',
  created () {
    this.currentValue = this.value
  },
  mounted () {
  },
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 5
    },
    value: {
      type: Number,
      default: 0
    },
    fontSize: {
      type: String,
      default: '16'
    },
    activeColor: {
      type: String,
      default: 'rgb(255, 137, 42)'
    },
    defaultColor: {
      type: String,
      default: 'rgb(219, 219, 219)'
    },
    charsetIcon: {
      type: String,
      default: 'star',
      validator (value) {
        return ['star', 'love', 'flower', 'smile'].indexOf(value) > -1
      }
    },
    disabled: Boolean
  },
  methods: {
    handleClick (i, force) {
      if (!this.disabled || force) {
        if (this.currentValue === i + 1) {
          this.currentValue = i < this.min ? this.min : i
        } else {
          this.currentValue = (i + 1) < this.min ? this.min : (i + 1)
        }
      }
      this.$emit('getScore', this.currentValue)
    }
  },
  data () {
    return {
      colors: [],
      currentValue: 0,
      charset: {
        star: 'sq-icon-pentagram',
        love: 'sq-icon-aixin',
        flower: 'sq-icon-flower',
        smile: 'sq-icon-emoji',
        weep: 'sq-icon-weep'
      }
    }
  },
  watch: {
    currentValue (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.currentValue = val
    }
  }
}
</script>

<style>
.sq-rater-box {
  display: inline-block;
}

.sq-rater-box img {
  width: 20px;
  margin-right: 12px;
}
</style>

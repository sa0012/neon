<template>
  <div class="sq-rater">
    <input v-model="currentValue" style="display:none">
    <a class="sq-rater-box" v-for="(i, index) in max" @click="handleClick(i-1)" :key="index">
      <!--<img :src="require('../assets/images/other/g_star.png')" alt="" v-if="!(currentValue > i-1)">
      <img :src="require('../assets/images/other/y_star.png')" alt="" v-if="currentValue > i-1">-->
      <i class="iconfont" :style="{fontSize: fontSize + 'px'}" :class="[(currentValue > i-1) ? 'icon-xingzhuang60kaobei2' : 'icon-xingzhuang60kaobei21']"></i>
    </a>
  </div>
</template>

<script>
export default {
  name: 'rater',
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
      currentValue: 0
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

.icon-xingzhuang60kaobei2 {
  color: rgb(255, 137, 42);
}

.icon-xingzhuang60kaobei21 {
  color: rgb(219, 219, 219);
}
</style>

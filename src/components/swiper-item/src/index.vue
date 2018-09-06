<template>
  <div class="sq-swiper-item" :style="wrapStyles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'sq-swiper-item',

  computed: {
    wrapStyles () {
      return {
        'transform': (this.index === 0 && this.$parent.currentIndex >= (this.$parent.count - 1))
          ? `translateX(${this.$parent.firstWrap}px)`
          : (
            (this.index === this.$parent.count - 1 && (this.$parent.currentIndex === 0 || this.$parent.currentIndex === this.index))
          ) ? `translateX(${this.$parent.lastWrap}px)` : ''
      }
    },
    index () {
      return this.$parent.childItems.indexOf(this)
    }
  },

  beforeCreate () {
    this.$parent.childItems.push(this)
  },

  destroyed () {
    this.$parent.childItems.splice(this.index, 1)
  }
}
</script>

<style lang="scss">
$prefixCls: sq-swiper-item;

.#{$prefixCls} {
  flex: 1;
  height: 100%;
}
</style>

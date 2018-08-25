<template>
  <div class="accordion-item">
    <div class="accordion-item-title accordion-item-arrow" :class="openClasses" @click="$_click">{{ title }}</div>
    <div class="accordion-item-content accordion-item-content-transition" :class="contentClasses" :style="contentStyles">
      <div ref="contentWrap">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sq-accordion-item',

  props: {
    title: {
      type: String
    },
    name: {
      type: [String, Number]
    }
  },

  data () {
    return {
      isOpen: false,
      contentHeight: 0
    }
  },

  computed: {
    openClasses () {
      return [
        {
          'accordion-item-open': this.isOpen
        }
      ]
    },
    contentClasses () {
      return [
        {
          'accordion-item-content-transition': this.isOpen
        }
      ]
    },
    contentStyles () {
      return {
        height: `${this.contentHeight}px`
      }
    }
  },

  methods: {
    $_click () {
      this.isOpen ? (this.contentHeight = 0) : (this.contentHeight = this.$refs.contentWrap.offsetHeight)
      this.isOpen = !this.isOpen
      this.$parent.childrenClickUpdateStatus(this.name, this.isOpen)
    }
  },

  watch: {
    isOpen: {
      handler (val, oldVal) {
        if (val && this.contentHeight === 0) {
          this.contentHeight = this.$refs.contentWrap.offsetHeight
        } else if (this.$parent.accordion && !val && this.contentHeight !== 0) {
          this.contentHeight = 0
        }
      },
      immediate: true
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.name !== undefined && this.$parent.updateStatus(this.name)
    })
  }
}
</script>

<style lang="scss">
// @import '~@/common/styles/mixins.scss';
$prefixCls: accordion-item;
.#{$prefixCls} {
  background-color: #fff;
  font-size: 15px;
  &-title {
    height: 50px;
    padding: 14px 16px;
    box-sizing: border-box;
  }
  &-content {
    box-sizing: border-box;
  }
  &-content.#{$prefixCls}-content-transition {
    overflow: hidden;
    border-top: 0;
    transition: height .2s ease-in-out;
  }
  &-open~.#{$prefixCls}-content-transition {
    // border-top: 1px solid #e6e6e6;
    @include mix-1px($top: 1);
  }
  & ~ & {
    // border-top: 1px solid #e6e6e6;
    @include mix-1px($top: 1);
  }
  &-arrow {
    position: relative;
  }
  &-open.#{$prefixCls}-arrow {
    &::after {
      transform: rotate(135deg);
    }
  }
  &-arrow::after {
    content: "";
    display: block;
    position: absolute;
    top: 20px;
    right: 14px;
    width: 10px;
    height: 10px;
    border-right: 2px solid #999999;
    border-top: 2px solid #999999;
    box-sizing: border-box;
    transform: rotate(-45deg);
    transition: transform .2s ease-in-out;
  }
}
</style>

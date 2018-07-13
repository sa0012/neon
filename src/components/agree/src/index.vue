<template>
  <div class="sq-agree" @click="$_Click">
    <div class="sq-agree-wrap">
      <span class="sq-agree-checkicon" :class="checkiconClasses"></span>
      <span class="sq-agree-text">
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sq-agree',

  props: {
    value: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    checkiconClasses () {
      return [
        {
          'sq-agree-checkicon-checked': this.value
        }
      ]
    }
  },

  methods: {
    $_Click (event) {
      this.$emit('input', !this.value)
    }
  }
}

</script>
<style lang="scss">
@import '../../../common/styles/variable.scss';
$prefixCls: sq-agree;

.#{$prefixCls} {
  display: inline-block;
  a {
    color: $theme-color;
  }
  &-wrap {
    display: flex;
    align-items: baseline;
  }
  &-checkicon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.2em;
    height: 1.2em;
    border-radius: 50%;
    background: #ccc;
    transform: translateY(-2px);
    &-checked {
      background-color: $theme-color;
      &.#{$prefixCls}-checkicon {
        &::before {
          transform: rotate(45deg) scale(1);
        }
      }
    }
    &::before {
      content: '';
      margin-top: -1px;
      width: .28em;
      height: .5em;
      border: 2px solid #fff;
      border-top: 0;
      border-left: 0;
      transition: transform .2s ease-in-out;
      transform: rotate(45deg) scale(0);
    }
  }
  &-text {
    display: inline-block;
    margin-left: 6px;
    flex: 1;
  }
}
</style>

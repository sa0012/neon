<template>
  <div class="sq-agree" @click="$_Click">
    <div class="sq-agree-wrap">
      <sq-checkicon v-model="value"></sq-checkicon>
      <span class="sq-agree-text">
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
import SqCheckicon from '../../checkicon/src'

export default {
  name: 'sq-agree',

  components: {
    SqCheckicon
  },

  props: {
    value: {
      type: Boolean,
      required: true
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
$prefixCls: sq-agree;

.#{$prefixCls} {
  display: inline-block;
  font-size: 14px;
  a {
    color: $theme-color;
  }
  &-wrap {
    display: flex;
    align-items: baseline;
  }
  &-text {
    display: inline-block;
    margin-left: 6px;
    flex: 1 1 0%;
    text-align: left;
  }
}
</style>

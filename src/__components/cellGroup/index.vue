<template>
  <div class="sq-cell-group">
    <div class="sq-cell-group-wrap" v-if="title !== void 0 && title !== null || label !== void 0 && label !== null">
      <div class="sq-cell-group-wrap-left">{{ title }}</div>
      <div class="sq-cell-group-wrap-right" @click="$_click">{{ label }}</div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'sq-cell-group',

  props: {
    title: {
      type: String
    },
    label: {
      type: String
    }
  },

  methods: {
    $_click () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/style/components/var.scss';

.sq-cell-group-wrap {
  height: 44px;
  font-size: 13px;
  padding: 12px 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-left {
    color: #666;
  }
  &-right {
    color: $theme-color;
  }
}
</style>

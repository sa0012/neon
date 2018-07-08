<template>
  <span class="sq-tag" :class="tagClasses">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'sq-tag',

  props: {
    type: {
      type: String,
      default: 'default',
      validator (value) {
        return ['default', 'primary', 'success', 'error'].includes(value)
      }
    },
    shape: {
      type: String,
      default: 'square',
      validator (value) {
        return ['square', 'circle'].includes(value)
      }
    },
    plain: {
      type: Boolean,
      default: false
    },
    color: {
      type: String
    },
    backgroundColor: {
      type: String
    }
  },

  computed: {
    tagClasses () {
      return [ `sq-tag-${this.type}`, `sq-tag-${this.shape}`, { 'sq-tag-plain': this.plain } ]
    }
  }
}
</script>

<style lang="scss">
@import '../../common/styles/variable.scss';
$success-color: #50a04f;
$error-color: #fc7152;
$default-color: #c9c9c9;

.sq-tag {
  padding: 2px 4px;
  color: #fff;
  font-size: 12px;
  box-sizing: border-box;
  &-plain {
    background-color: #fff !important;
    &.sq-tag-default {
      color: $default-color;
      border: 1px solid $default-color;
    }
    &.sq-tag-primary {
      color: $theme-color;
      border: 1px solid $theme-color;
    }
    &.sq-tag-success {
      color: $success-color;
      border: 1px solid $success-color;
    }
    &.sq-tag-error {
      color: $error-color;
      border: 1px solid $error-color;
    }
  }
  &-default {
    background-color: $default-color;
    border: 1px solid $default-color;
  }
  &-primary {
    background-color: $theme-color;
    border: 1px solid $theme-color;
  }
  &-success {
    background-color: $success-color;
    border: 1px solid $success-color;
  }
  &-error {
    background-color: $error-color;
    border: 1px solid $error-color;
  }
  &-square {
    border-radius: 2px;
  }
  &-circle {
    border-radius: 10000px;
  }
}
</style>

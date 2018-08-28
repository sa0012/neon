<template>
  <div class="sq-field-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'sq-field-group'
}
</script>

<style lang="scss">
$prefixCls: sq-field-group;

.#{$prefixCls} {
  padding: 16px;
  .sq-field {
    border-radius: 5px;
  }
  .sq-field~.sq-field,
  .sq-field~.sq-sendcode,
  .sq-sendcode~.sq-field {
    margin-top: 10px;
  }
  .sq-field::after {
    border: 0;
  }
}
</style>

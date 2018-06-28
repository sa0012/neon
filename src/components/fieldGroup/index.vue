<template>
  <div class="sq-field-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'sq-fieldgroup',

  data () {
    return {
    }
  },

  methods: {}
}
</script>

<style lang="scss">
.sq-field-group {
  padding: 16px;
  .sq-field {
    border-radius: 5px;
  }
  .sq-field~.sq-field {
    margin-top: 10px;
  }
  .sq-field:not(:last-child)::after {
    border: 0;
  }
}
</style>

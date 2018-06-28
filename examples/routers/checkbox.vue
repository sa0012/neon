<template>
  <div class="demo-page-wrap">
    <sq-checkboxgroup v-model="name">
      <sq-checkbox name="1">22</sq-checkbox>
      <sq-checkbox name="2">22</sq-checkbox>
      <sq-checkbox name="3">22</sq-checkbox>
      <sq-checkbox name="4">22</sq-checkbox>
    </sq-checkboxgroup>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      name: 1
    }
  },

  methods: {}
}
</script>

<style lang="css" scoped>
</style>

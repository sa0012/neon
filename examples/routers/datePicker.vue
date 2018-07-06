<template>
  <div class="demo-page-wrap">
    <sq-date-picker
      title="请选择时间"
      v-model="value"
      max="2030-10-25"
      min="1917-10-25"
      @confirm="confirm"
      @cancel="cancel"
      @on-change="onChange"
    />
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      value: '2008-01-10'
    }
  },

  methods: {
    confirm (val) {
      console.log(val)
    },
    cancel (val) {
      console.log(val)
    },
    onChange (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss">
</style>

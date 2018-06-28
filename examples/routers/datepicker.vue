<template>
  <div>
    <sq-datepicker
      show-toolbar
      :list="list"
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
      list: ['北京', '上海', '广州', '深圳', '重庆', '杭州', '天津', '南京', '温州']
    }
  },

  methods: {
    confirm () {

    },
    cancel () {

    },
    onChange () {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <div class="demo-page-wrap">
    <demo-title>类型为 png 且只能单张上传</demo-title>
    <sq-uploader accept="image/png" @file-change="change"/>
    <demo-title>类型不限，可多张上传</demo-title>
    <sq-uploader multiple @file-change="change"/>
  </div>
</template>

<script>
export default {
  name: '',

  mixins: [],

  components: {},

  props: {},

  data () {
    return {
    }
  },

  computed: {},

  watch: {},

  created () {},

  mounted () {},

  destroyed () {},

  methods: {
    change (files) {
      console.log(files)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

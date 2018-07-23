<template>
  <div class="demo-page-wrap">
    <sq-uploader accept="image/png" @file-change="change"/>
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

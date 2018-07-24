<template>
  <div class="demo-page-wrap">
    <rater
      :min="min"
      :max="max"
      :fontSize="fontSize">
    </rater>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      min: 0,
      max: 5,
      fontSize: '40'
    }
  },

  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
</style>

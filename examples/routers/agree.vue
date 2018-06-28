<style lang="scss" scoped>
</style>

<template>
  <div class="demo-page-wrap">
    <sq-agree v-model="isAgree">我已阅读并接受<a @click.stop="click">《保险须知》</a>中的条例</sq-agree>
    <sq-agree v-model="isAgree">
      我已阅读并接受<a @click.stop="click">《客户告知书》《保单条款》《产品详情》</a>中的条例
    </sq-agree>
    <p>
      {{ isAgree }}
    </p>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      isAgree: false
    }
  },

  methods: {
    click () {
      alert('click')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <div class="demo-page-wrap">
    <sq-agree v-model="isAgree1">我已阅读并接受<a @click.stop="click">《保险须知》</a>中的条例</sq-agree>
    <p>
      {{ isAgree1 }}
    </p>
    <sq-agree v-model="isAgree2">
      我已阅读并接受<a @click.stop="click">《客户告知书》《保单条款》《产品详情》</a>中的条例
    </sq-agree>
    <p>
      {{ isAgree2 }}
    </p>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      isAgree1: false,
      isAgree2: false
    }
  },

  methods: {
    click () {
      alert('click')
    }
  }
}
</script>

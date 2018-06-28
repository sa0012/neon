<template>
  <div>
    <h4 class="center">普通形式 -- 当前选中的值：{{ active2 }}</h4>
    <sq-accordion v-model="active2">
      <sq-accordion-item title="选项一" :name="1">
        <div>我是内容</div>
        <div>我是内容</div>
      </sq-accordion-item>
      <sq-accordion-item title="选项二" :name="2">
        <div>我是内容</div>
        <div>我是内容</div>
      </sq-accordion-item>
      <sq-accordion-item title="选项三" :name="3">
        <div>我是内容</div>
        <div>我是内容</div>
      </sq-accordion-item>
    </sq-accordion>
    <h4 class="center">手风琴形式 -- 当前选中的值：{{ active }}</h4>
    <sq-accordion v-model="active" accordion>
      <sq-accordion-item title="选项一" :name="1">
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
      </sq-accordion-item>
      <sq-accordion-item title="选项二" :name="2">
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
      </sq-accordion-item>
      <sq-accordion-item title="选项三" :name="3">
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
        <div>我是内容</div>
      </sq-accordion-item>
    </sq-accordion>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      active: [],
      active2: [3]
    }
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
.center {
  text-align: center;
}
</style>

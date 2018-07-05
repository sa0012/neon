<template>
  <div class="demo-page-wrap">
    <demo-title>基础用法</demo-title>
    <sq-tabs active="name1">
      <sq-tabpane label="标签一" name="name1">标签一的内容</sq-tabpane>
      <sq-tabpane label="标签二" name="name2">标签二的内容</sq-tabpane>
      <sq-tabpane label="标签三" name="name3">标签三的内容</sq-tabpane>
      <sq-tabpane label="标签四" name="name4">
        <p>标签四的内容</p><p>标签四的内容</p>
        <p>标签四的内容</p><p>标签四的内容</p>
        <p>标签四的内容</p><p>标签四的内容</p>
      </sq-tabpane>
    </sq-tabs>
  
    <demo-title>默认选中</demo-title>
    <sq-tabs active="name3">
      <sq-tabpane label="标签一" name="name1">标签一的内容</sq-tabpane>
      <sq-tabpane label="标签二" name="name2">标签二的内容</sq-tabpane>
      <sq-tabpane label="标签三" name="name3">标签三的内容</sq-tabpane>
      <sq-tabpane label="标签四" name="name4">
        <p>标签四的内容</p><p>标签四的内容</p>
        <p>标签四的内容</p><p>标签四的内容</p>
        <p>标签四的内容</p><p>标签四的内容</p>
      </sq-tabpane>
    </sq-tabs>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
    }
  },

  methods: {}
}

</script>
<style lang='scss'>
</style>

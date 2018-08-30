<template>
  <div>
    <demo-title>基础用法</demo-title>
    <sq-tabs active="name1" line-scale="0.6" font-size="14" title-height="40">
      <sq-tabpane label="第一年" name="name1">
        标签一的内容
      </sq-tabpane>
      <sq-tabpane label="第二年" name="name2">标签二的内容</sq-tabpane>
      <sq-tabpane label="第三年" name="name3">
        <p>标签三的内容</p><p>标签三的内容</p>
      </sq-tabpane>
    </sq-tabs>
  
    <demo-title>默认选中</demo-title>
    <sq-tabs active="name3" hide-line>
      <sq-tabpane label="标签一" name="name1">标签一的内容</sq-tabpane>
      <sq-tabpane label="标签二" name="name2">标签二的内容</sq-tabpane>
      <sq-tabpane label="标签三" name="name3">标签三的内容</sq-tabpane>
      <sq-tabpane label="标签四" name="name4">
        <p>标签四的内容</p><p>标签四的内容</p>
      </sq-tabpane>
    </sq-tabs>

    <demo-title>type为block，自定义title为多行</demo-title>
    <sq-tabs active="name3" type="block">
      <sq-tabpane label="标签一" name="name1">
        <template slot="title">
          <div class="aaa">
            <p>123</p>
            <p>456</p>
          </div>
        </template>
        标签一的内容
      </sq-tabpane>
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
<style lang='scss' scoped>
.aaa {
  width: 100%;
  height: 100%;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  p {
    margin: 0;
    padding: 0;
  }
}
</style>

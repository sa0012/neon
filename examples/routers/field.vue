<template>
  <div class="demo-page-wrap demo-field-wrap">
    <demo-title left>列表样式</demo-title>
    <sq-field placeholder="请输入用户名" v-model="name" arrow></sq-field>
    <sq-field label="用户名" placeholder="请输入用户名" v-model="name" arrow></sq-field>
    <sq-field label="密码" placeholder="请输入密码" v-model="name"></sq-field>

    <demo-title left>间隔样式</demo-title>
    <sq-fieldgroup>
      <sq-field placeholder="请输入用户名" v-model="name" arrow></sq-field>
      <sq-field label="用户名" placeholder="请输入用户名" v-model="name" arrow></sq-field>
      <sq-field label="密码" placeholder="请输入密码" v-model="name"></sq-field>
    </sq-fieldgroup>

  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      name: ''
    }
  },

  methods: {}
}

</script>
<style lang='scss'>
.demo-field-wrap {
  padding: 0;
}
</style>

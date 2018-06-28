<template>
  <div class="demo-page-wrap demo-field-wrap">
    <sq-fieldgroup>
      <sq-field placeholder="请输入用户名" v-model="name" arrow></sq-field>
      <sq-field label="用户名" placeholder="请输入用户名" v-model="name" arrow></sq-field>
      <sq-field label="密码" placeholder="请输入密码" v-model="name"></sq-field>
    </sq-fieldgroup>

    <sq-field placeholder="请输入用户名" v-model="name" arrow></sq-field>
    <sq-field label="用户名" placeholder="请输入用户名" v-model="name" arrow></sq-field>
    <sq-field label="密码" placeholder="请输入密码" v-model="name"></sq-field>
    {{name}}
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
<style lang='scss' scoped>
.demo-field-wrap {
  padding: 0;
}
</style>

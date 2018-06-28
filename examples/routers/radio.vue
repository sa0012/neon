<template>
  <div class="">
    <!-- demo-page-wrap -->
    <p>
      <sq-radio-group v-model="value1" @change="change">
        <sq-radio name="pt">普通</sq-radio>
      </sq-radio-group>
    </p>
    <p>
      <sq-radio-group v-model="value2" @change="change">
        <sq-radio name="mrxz">默认选中</sq-radio>
      </sq-radio-group>
    </p>
    <p>
      <sq-radio-group v-model="value3" disabled @change="change">
        <sq-radio name="jy">禁用</sq-radio>
      </sq-radio-group>
    </p>
    <p>
      <sq-radio-group v-model="value4" disabled @change="change">
        <sq-radio name="xzqjy">选中且禁用</sq-radio>
      </sq-radio-group>
    </p>
    
    <p>禁用状态</p>
    <sq-radio-group v-model="radioValue" @change="change" :disabled="radioDisabled">
      <sq-radio name="pg">苹果</sq-radio>
      <sq-radio name="xj">香蕉</sq-radio>
      <sq-radio name="hmg">哈密瓜</sq-radio>
    </sq-radio-group>

    <p>列表样式</p>
    <sq-radio-group v-model="value5" type="cell" @change="change">
      <sq-radio name="pg">苹果</sq-radio>
      <sq-radio name="xj">香蕉</sq-radio>
      <sq-radio name="hmg" disabled>哈密瓜</sq-radio>
    </sq-radio-group>
    <p>列表禁用状态</p>
    <sq-radio-group v-model="value5" type="cell" @change="change" :disabled="radioDisabled">
      <sq-radio name="pg">苹果</sq-radio>
      <sq-radio name="xj">香蕉</sq-radio>
      <sq-radio name="hmg">哈密瓜</sq-radio>
    </sq-radio-group>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      value1: '',
      value2: 'mrxz',
      value3: '',
      value4: 'xzqjy',
      value5: 'hmg',
      radioValue: 'hmg',
      radioDisabled: true
    }
  },

  methods: {
    change (name) {
      this.$toast.text(`当前选中的值为${name}`, 2000)
    }
  }
}

</script>
<style lang='scss' scoped>
</style>

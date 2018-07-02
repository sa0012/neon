<template>
  <div class="">
    <!-- demo-page-wrap -->
    <p>
      <sq-checkbox-group v-model="value1" @change="change">
        <sq-checkbox name="pt">普通</sq-checkbox>
      </sq-checkbox-group>
    </p>
    <p>
      <sq-checkbox-group v-model="value2" @change="change">
        <sq-checkbox name="mrxz">默认选中</sq-checkbox>
      </sq-checkbox-group>
    </p>
    <p>
      <sq-checkbox-group v-model="value3" disabled @change="change">
        <sq-checkbox name="jy">禁用</sq-checkbox>
      </sq-checkbox-group>
    </p>
    <p>
      <sq-checkbox-group v-model="value4" disabled @change="change">
        <sq-checkbox name="xzqjy">选中且禁用</sq-checkbox>
      </sq-checkbox-group>
    </p>
    
    <p>禁用状态</p>
    <sq-checkbox-group v-model="checkboxValue" @change="change" :disabled="checkboxDisabled">
      <sq-checkbox name="pg">苹果</sq-checkbox>
      <sq-checkbox name="xj">香蕉</sq-checkbox>
      <sq-checkbox name="hmg">哈密瓜</sq-checkbox>
    </sq-checkbox-group>

    <p>默认列表样式</p>
    <sq-checkbox-group v-model="value5" type="cell" @change="change">
      <sq-checkbox name="pg">苹果</sq-checkbox>
      <sq-checkbox name="xj">香蕉</sq-checkbox>
      <sq-checkbox name="hmg" disabled>哈密瓜</sq-checkbox>
    </sq-checkbox-group>
    <p>列表样式</p>
    <sq-checkbox-group v-model="value5" type="cell-between" @change="change">
      <sq-checkbox name="pg">苹果</sq-checkbox>
      <sq-checkbox name="xj">香蕉</sq-checkbox>
      <sq-checkbox name="hmg" disabled>哈密瓜</sq-checkbox>
    </sq-checkbox-group>
    <p>列表禁用状态</p>
    <sq-checkbox-group v-model="value5" type="cell" @change="change" :disabled="checkboxDisabled">
      <sq-checkbox name="pg">苹果</sq-checkbox>
      <sq-checkbox name="xj">香蕉</sq-checkbox>
      <sq-checkbox name="hmg">哈密瓜</sq-checkbox>
    </sq-checkbox-group>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      value1: [],
      value2: ['mrxz'],
      value3: [],
      value4: ['xzqjy'],
      value5: ['hmg'],
      checkboxValue: ['hmg'],
      checkboxDisabled: true
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

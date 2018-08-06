<template>
  <div class="demo-page-wrap">
    <sq-button size="small" type="primary" @click="value1 = ['广州']">设置新值</sq-button>
    <sq-button size="small" type="primary" @click="list1 = ['苹果', '香蕉', '菠萝', '草莓']">改变数据源</sq-button>
    <p>{{value1}}</p>
    <demo-title>单列形式 -- ['']数据结构</demo-title>
    <sq-picker
      show-toolbar
      v-model="value1"
      :columns="list1"
      @confirm="handleConfirm"
      @cancel="handleCancel"
      @on-change="onChange"
    />
    <sq-button size="small" type="primary" @click="value2 = ['菠萝', 'B']">设置新值</sq-button>
    <sq-button size="small" type="primary" @click="list2 = [['苹果', '香蕉', '菠萝', '草莓'], ['A', 'B', 'C', 'D']]">改变数据源</sq-button>
    <p>{{value2}}</p>
    <demo-title>单列形式 -- ['']数据结构</demo-title>
    <sq-picker
      show-toolbar
      v-model="value2"
      :columns="list2"
      @confirm="handleConfirm"
      @cancel="handleCancel"
      @on-change="onChange"
    />
    <p>***************</p>
    <demo-title>多列形式 -- [[''],['']]数据结构</demo-title>
    <p>{{value3}}</p>
    <sq-picker
      show-toolbar
      v-model="value3"
      :columns="list2"
      @on-change="onChange"
    />
    <demo-title>多列形式 -- [{},{}]数据结构</demo-title>
    <p>{{value4}}</p>
    <sq-picker
      show-toolbar
      v-model="value4"
      :columns="list3"
      @on-change="onChange"
      value-key="label"
    />

    <demo-title>联动形式</demo-title>
    <sq-picker
      show-toolbar
      v-model="value5"
      :columns="list4"
      value-key="label"
      @confirm="handleConfirm"
      @cancel="handleCancel"
      @on-change="handleChange"
    />
    
    <demo-title>loading状态</demo-title>
    <sq-picker
      :columns="list0"
      :loading="true"
    />

    <demo-title>搭配popup使用</demo-title>
    <sq-button type="primary" size="small" @click="isShow = !isShow">show</sq-button>
    <sq-popup v-model="isShow" position="bottom">
      <sq-picker
        show-toolbar
        :columns="list0"
        @confirm="confirm"
        @cancel="cancel"
        @on-change="onChange"
      />
    </sq-popup>
  </div>
</template>

<script>
import mock from './pickCityMock.js'

export default {
  name: '',

  data () {
    return {
      value1: ['上海'],
      value2: ['上海', '宁波'],
      value3: '',
      value4: '',
      value5: '',
      list0: ['北京', '上海', '广州', '深圳', '重庆', '杭州', '天津', '南京', '温州'],
      list1: ['北京', '上海', '广州', '深圳', '重庆', '杭州', '天津', '南京', '温州'],
      list2: [
        ['北京', '上海', '广州', '深圳', '重庆', '杭州', '天津', '南京', '温州'],
        ['杭州', '宁波', '温州', '嘉兴', '湖州']
      ],
      list3: [
        [
          { value: 1, label: 'A' },
          { value: 2, label: 'B' },
          { value: 3, label: 'C' },
          { value: 4, label: 'D' },
          { value: 5, label: 'E' },
          { value: 6, label: 'F' },
          { value: 7, label: 'G' }
        ],
        [
          { value: 11, label: 'Aa' },
          { value: 12, label: 'Bb' },
          { value: 13, label: 'Cc' },
          { value: 14, label: 'Dd' },
          { value: 15, label: 'Ee' },
          { value: 16, label: 'Ff' },
          { value: 17, label: 'Gg' }
        ]
      ],
      list4: mock,
      isShow: false
    }
  },

  methods: {
    set1 () {
      this.$refs.picker.updateColumnAndValue({
        newCol: ['苹果', '香蕉']
      })
    },
    set2 () {
      this.$refs.picker.updateColumnAndValue({
        newCol: ['A', 'B', 'C'],
        newValueIndex: 2
      })
    },
    onChange (result) {
      console.log(result)
      // this.$toast.text(`当前值为${item}`)
    },
    cancel1 (result) {
      console.log(result)
      // this.$toast.text(`当前值为${item}`)
    },
    confirm1 (result) {
      console.log(result)
      // this.$toast.text(`当前值为${item}`)
    },
    handleChange (result) {
      console.log(result)
      // this.$toast.text(`当前值为${item}`)
    },
    handleCancel (result) {
      console.log(result)
      // this.$toast.text(`当前值为${item}`)
    },
    handleConfirm (result) {
      console.log(result)
      // this.$toast.text(`当前值为${item}`)
    },
    cancel (result) {
      console.log(result)
      // this.$toast.text(`当前值为${item}`)
      this.isShow = !this.isShow
    },
    confirm (result) {
      console.log(result)
      // this.$toast.text(`当前值为${item}`)
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="css">
</style>

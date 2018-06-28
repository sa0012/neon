<template>
  <div class="demo-page-wrap">
    <h4>['']数据形式</h4>
    <sq-picker
      :columns="list1"
      @on-change="onChange"
    />
    <h4>[[''],['']]数据形式</h4>
    <sq-picker
      :columns="list2"
      @on-change="onChange"
    />
    <h4>[{},{}]数据形式</h4>
    <sq-picker
      :columns="list3"
      @on-change="onChange"
      value-key="label"
    />

    <h4>联动形式</h4>
    <sq-picker
      show-toolbar
      :columns="list4"
      value-key="label"
      @confirm="handleConfirm"
      @cancel="handleCancel"
      @on-change="handleChange"
    />
    
    <h4>异步请求loading</h4>
    <sq-picker
      :columns="list0"
      :loading="true"
    />

    <h4>搭配popup使用</h4>
    <sq-button type="primary" @click="isShow = !isShow">show</sq-button>
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
export default {
  name: '',

  data () {
    return {
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
      list4: [
        {
          value: 1,
          label: '浙江',
          children: [
            {
              value: '101',
              label: '杭州',
              children: [
                {
                  value: 10001,
                  label: '上城区',
                  children: []
                },
                {
                  value: 10002,
                  label: '下城区',
                  children: []
                },
                {
                  value: 10003,
                  label: '江干区',
                  children: []
                },
                {
                  value: 10004,
                  label: '滨江区',
                  children: []
                },
                {
                  value: 10005,
                  label: '下沙区',
                  children: []
                }
              ]
            },
            {
              value: '102',
              label: '宁波',
              children: [
                {
                  value: 20001,
                  label: '宁波11',
                  children: []
                },
                {
                  value: 20002,
                  label: '宁波12',
                  children: []
                },
                {
                  value: 20003,
                  label: '宁波13',
                  children: []
                },
                {
                  value: 20004,
                  label: '宁波14',
                  children: []
                },
                {
                  value: 20005,
                  label: '宁波15',
                  children: []
                }
              ]
            },
            {
              value: '103',
              label: '温州',
              children: [
                {
                  value: 30001,
                  label: '温州11',
                  children: []
                },
                {
                  value: 30002,
                  label: '温州12',
                  children: []
                },
                {
                  value: 30003,
                  label: '温州13',
                  children: []
                },
                {
                  value: 30004,
                  label: '温州14',
                  children: []
                },
                {
                  value: 30005,
                  label: '温州15',
                  children: []
                }
              ]
            }
          ]
        },
        {
          value: 2,
          label: '上海',
          children: [
            {
              value: '201',
              label: '黄浦区',
              children: [
                {
                  value: 1,
                  label: '黄浦街道1',
                  children: []
                },
                {
                  value: 2,
                  label: '黄浦街道2',
                  children: []
                },
                {
                  value: 3,
                  label: '黄浦街道3',
                  children: []
                }
              ]
            },
            {
              value: '202',
              label: '静安区',
              children: [
                {
                  value: 1,
                  label: '静安街道1',
                  children: []
                },
                {
                  value: 2,
                  label: '静安街道2',
                  children: []
                },
                {
                  value: 3,
                  label: '静安街道3',
                  children: []
                }
              ]
            },
            {
              value: '203',
              label: '长宁区',
              children: [
                {
                  value: 1,
                  label: '长宁街道1',
                  children: []
                },
                {
                  value: 2,
                  label: '长宁街道2',
                  children: []
                },
                {
                  value: 3,
                  label: '长宁街道3',
                  children: []
                }
              ]
            },
            {
              value: '204',
              label: '徐汇区',
              children: [
                {
                  value: 1,
                  label: '徐汇街道1',
                  children: []
                },
                {
                  value: 2,
                  label: '徐汇街道2',
                  children: []
                },
                {
                  value: 3,
                  label: '徐汇街道3',
                  children: []
                }
              ]
            },
            {
              value: '205',
              label: '闵行区',
              children: [
                {
                  value: 1,
                  label: '闵行街道1',
                  children: []
                },
                {
                  value: 2,
                  label: '闵行街道2',
                  children: []
                },
                {
                  value: 3,
                  label: '闵行街道3',
                  children: []
                }
              ]
            }
          ]
        }
      ],
      isShow: false
    }
  },

  methods: {
    onChange (result) {
      console.log(result)
      console.log(result.value)
      // this.$toast.text(`当前值为${item}`)
    },
    cancel1 (result) {
      console.log(result)
      console.log(result.value)
      // this.$toast.text(`当前值为${item}`)
    },
    confirm1 (result) {
      console.log(result)
      console.log(result.value)
      // this.$toast.text(`当前值为${item}`)
    },
    handleChange (result) {
      console.log(result)
      console.log(result.value)
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
      console.log(result.value)
      // this.$toast.text(`当前值为${item}`)
      this.isShow = !this.isShow
    },
    confirm (result) {
      console.log(result)
      console.log(result.value)
      // this.$toast.text(`当前值为${item}`)
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="css" scoped>
</style>

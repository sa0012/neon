<template>
  <div>
    <sq-button type="primary" size="small" @click.stop="show(0)">显示普通键盘</sq-button>
    <sq-number-keyboard
      v-model="isShow0"
      @delete="onDelete"
      @confirm="onConfirm"
      @key-click="onKeyClick"
    />
    <sq-button type="primary" size="small" @click.stop="show(1)">显示身份证键盘</sq-button>
    <sq-number-keyboard
      v-model="isShow1"
      type="idcard"
      @delete="onDelete"
      @confirm="onConfirm"
      @key-click="onKeyClick"
    />
    <sq-button type="primary" size="small" @click.stop="show(2)">显示数字键盘</sq-button>
    <sq-number-keyboard
      v-model="isShow2"
      type="amount"
      @delete="onDelete"
      @confirm="onConfirm"
      @key-click="onKeyClick"
    />
  </div>
</template>

<script>
export default {
  name: '',

  mixins: [],

  components: {},

  props: {},

  data () {
    return {
      isShow0: false,
      isShow1: false,
      isShow2: false
    }
  },

  computed: {},

  watch: {},

  created () {},

  mounted () {},

  destroyed () {},

  methods: {
    show (type) {
      this[`isShow${type}`] = !this[`isShow${type}`]
    },
    onDelete () {
      console.log('on-delete')
    },
    onConfirm () {
      console.log('on-confirm')
    },
    onKeyClick (key) {
      console.log('key:', key)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

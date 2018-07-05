<template>
  <picker
    show-toolbar
    :columns="columns"
    :title="title"
    :cancel-button-text="cancelButtonText"
    :confirm-button-text="confirmButtonText"
    @confirm="$_confirm"
    @cancel="$_cancel"
    @on-change="$_change"
  />
</template>

<script>
// import { utilFormatDate, getDate } from './utils'
import { getDate } from './utils'
import picker from '../picker'

export default {
  name: 'sq-date-picker',

  components: {
    picker
  },

  props: {
    value: {
      type: null
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    confirmButtonText: {
      type: String,
      default: '确认'
    },
    title: {
      type: String,
      default: ''
    },
    max: {
      type: String
    },
    min: {
      type: String
    }
  },

  computed: {
  },

  data () {
    return {
      columns: this.getColumns()
    }
  },

  methods: {
    getColumns () {
      const maxDate = getDate(this.max)
      const minDate = getDate(this.min)

      const maxYear = maxDate.getFullYear()
      const minYear = minDate.getFullYear()

      let yearCol = []

      for (let i = 0, len = maxYear - minYear; i <= len; i++) {
        yearCol.push(minYear + i)
      }
      return [yearCol, this.getMonthCol()]
    },
    getMonthCol () {
      let monthCol = []
      for (let i = 0, len = 12; i < len; i++) {
        monthCol.push(i + 1)
      }
      return monthCol
    },
    $_change (val) {
      this.$emit('on-change', JSON.parse(JSON.stringify(val)))
    },
    $_cancel (val) {
      this.$emit('cancel', JSON.parse(JSON.stringify(val)))
    },
    $_confirm (val) {
      this.$emit('confirm', JSON.parse(JSON.stringify(val)))
    }
  },

  mounted () {
  }
}
</script>

<style lang="scss">

</style>

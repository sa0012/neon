<template>
  <picker
    show-toolbar
    :columns="columns"
    :title="title"
    :cancel-button-text="cancelButtonText"
    :confirm-button-text="confirmButtonText"
    :default-value="defaultValue"
    :format="format"
    @confirm="$_confirm"
    @cancel="$_cancel"
    @on-change="$_change"
  />
</template>

<script>
import { getDate } from './utils'
import picker from '../../picker'

export default {
  name: 'sq-date-picker',

  components: {
    picker
  },

  props: {
    value: {
      type: null
    },
    defaultValue: {
      type: Array
    },
    format: {
      type: Array
    },
    type: {
      type: String,
      default: 'date',
      validator (value) {
        return ['date', 'datetime', 'time', 'year-month'].indexOf(value) > -1
      }
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
      return [yearCol, this.getMonthCol(), this.getDayCol()]
    },
    getMonthCol () {
      let monthCol = []
      for (let i = 0, len = 12; i < len; i++) {
        monthCol.push(i + 1)
      }
      return monthCol
    },
    getDayCol () {
      let dayCol = []
      for (let i = 0, len = 31; i < len; i++) {
        dayCol.push(i + 1)
      }
      return dayCol
    },
    getIndexOfValInArr (val, arr) {
      let index = 0
      arr.forEach((item, i) => {
        if (item === val) {
          index = i
        }
      })
      return index
    },
    getColByYearMonth (year, month) {
      let newDayCol = []
      const sumDay = 32 - new Date(year, month, 32).getDate()
      for (let i = 0; i < sumDay; i++) {
        newDayCol.push(i + 1)
      }
      return newDayCol
    },
    $_change (val) {
      // 根据年月  切换日
      if (this.type === 'date' && val.listIndex < 2) {
        const dayCol = this.getColByYearMonth(val.value[0], val.value[1] - 1)
        this.$children[0].$children[2].updateCol(dayCol, dayCol.includes(val.value[2]) ? this.getIndexOfValInArr(val.value[2], dayCol) : parseInt(dayCol.length / 2))
      }
      this.$emit('on-change', JSON.parse(JSON.stringify(val)))
    },
    $_cancel (val) {
      this.$emit('cancel', JSON.parse(JSON.stringify(val)))
    },
    $_confirm (val) {
      this.$emit('confirm', JSON.parse(JSON.stringify(val)))
    }
  }
}
</script>

<style lang="scss">

</style>

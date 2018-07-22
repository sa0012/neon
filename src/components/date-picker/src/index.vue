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
import { getDate, getArrByLength } from './utils'
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
    type: {
      type: String,
      default: 'date',
      validator (value) {
        return ['date', 'datetime', 'time', 'year-month'].indexOf(value) > -1
      }
    },
    defaultValue: {
      type: Array
    },
    format: {
      type: Array
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
    minDate: {
      type: String,
      default: `${new Date().getFullYear() - 10}-1-1`
    },
    maxDate: {
      type: String,
      default: `${new Date().getFullYear() + 10}-12-31`
    }
  },

  data () {
    const startDate = getDate(this.minDate)
    const endDate = getDate(this.maxDate)
    return {
      startDateArr: [startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()],
      endDateArr: [endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate()],
      columns: this.getColumns()
    }
  },

  methods: {
    setDefaultValue () {
      const now = new Date()
      const [year, month, day, hour, minute] = [now.getFullYear(), now.getMonth() + 1, now.getDate(), 0, 0]
      const type = {
        'date': [year, month, day],
        'datetime': [year, month, day, hour, minute],
        'time': [hour, minute],
        'year-month': [year, month]
      }
      return type[this.type]
    },
    getColumns () {
      if (!this.defaultValue) {
        this.defaultValue = this.setDefaultValue()
      }

      const maxYear = getDate(this.maxDate).getFullYear()
      const minYear = getDate(this.minDate).getFullYear()

      let columns = []
      switch (this.type) {
        case 'datetime':
          columns = [
            this.getYearCol(maxYear, minYear),
            this.getMonthCol(),
            this.getColByYearMonth({year: this.defaultValue[0], month: this.defaultValue[1]}),
            this.getHourCol(),
            this.getMinuteCol()
          ]
          break
        case 'date':
          columns = [
            this.getYearCol(maxYear, minYear),
            this.getMonthCol(),
            this.getColByYearMonth({year: this.defaultValue[0], month: this.defaultValue[1]})
          ]
          break
        case 'time':
          columns = [
            this.getHourCol(),
            this.getMinuteCol()
          ]
          break
        default:
          columns = [
            this.getYearCol(maxYear, minYear),
            this.getMonthCol()
          ]
          break
      }
      return columns
    },
    getYearCol (maxYear, minYear) {
      let yearCol = []
      for (let i = 0, len = maxYear - minYear; i <= len; i++) {
        yearCol.push(minYear + i)
      }
      return yearCol
    },
    getMonthCol () {
      return getArrByLength({length: 12})
    },
    getColByYearMonth ({year, month, min, max}) {
      return getArrByLength({length: 32 - new Date(year, month, 32).getDate(), min, max})
    },
    getHourCol () {
      return getArrByLength({length: 24, startByZero: true})
    },
    getMinuteCol () {
      return getArrByLength({length: 60, startByZero: true})
    },
    $_change ({item, itemIndex, listIndex, value}) {
      // 根据年月  切换日
      const { type, startDateArr, endDateArr } = this
      if ((type === 'date' || type === 'datetime') && listIndex < 2) {
        const colInstances = this.$children[0].$children
        if (listIndex === 0) {
          if (value[0] === startDateArr[0]) {
            const monthCol = getArrByLength({length: 12, min: startDateArr[1]})
            colInstances[1].updateCol(monthCol, monthCol.includes(value[1]) ? monthCol.indexOf(value[1]) : 0)

            const dayCol = this.getColByYearMonth({year: value[0], month: monthCol.includes(value[1]) ? value[1] - 1 : 0})
            colInstances[2].updateCol(dayCol, dayCol.includes(value[2]) ? dayCol.indexOf(value[2]) : parseInt(dayCol.length / 2))
          } else if (value[0] === endDateArr[0]) {
            const monthCol = getArrByLength({length: 12, max: endDateArr[1]})
            colInstances[1].updateCol(monthCol, monthCol.includes(value[1]) ? monthCol.indexOf(value[1]) : 0)

            const dayCol = this.getColByYearMonth({year: value[0], month: monthCol.includes(value[1]) ? value[1] - 1 : 0})
            colInstances[2].updateCol(dayCol, dayCol.includes(value[2]) ? dayCol.indexOf(value[2]) : parseInt(dayCol.length / 2))
          } else {
            if (colInstances[1].list.length !== 12) {
              const monthCol = getArrByLength({length: 12})
              colInstances[1].updateCol(monthCol, monthCol.includes(value[1]) ? monthCol.indexOf(value[1]) : 0)
            }

            const dayCol = this.getColByYearMonth({year: value[0], month: value[1] - 1})
            colInstances[2].updateCol(dayCol, dayCol.includes(value[2]) ? dayCol.indexOf(value[2]) : parseInt(dayCol.length / 2))
          }
        } else {
          if (value[0] === startDateArr[0] && value[1] === startDateArr[1]) {
            const dayCol = this.getColByYearMonth({year: value[0], month: value[1] - 1, min: startDateArr[2]})
            colInstances[2].updateCol(dayCol, dayCol.includes(value[2]) ? dayCol.indexOf(value[2]) : 0)
          } else if (value[0] === endDateArr[0] && value[1] === endDateArr[1]) {
            const dayCol = this.getColByYearMonth({year: value[0], month: value[1] - 1, max: startDateArr[2]})
            colInstances[2].updateCol(dayCol, dayCol.includes(value[2]) ? dayCol.indexOf(value[2]) : 0)
          } else {
            const dayCol = this.getColByYearMonth({year: value[0], month: value[1] - 1})
            colInstances[2].updateCol(dayCol, dayCol.includes(value[2]) ? dayCol.indexOf(value[2]) : parseInt(dayCol.length / 2))
          }
        }
      }
      this.$emit('on-change', JSON.parse(JSON.stringify({item, itemIndex, listIndex, value})))
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

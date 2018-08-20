<template>
  <picker
    ref="pickerRef"
    show-toolbar
    value-key="name"
    :columns="columns"
    :title="title"
    :cancel-button-text="cancelButtonText"
    :confirm-button-text="confirmButtonText"
    :loading="loading"
    hideEmptyColumn
    :row-height="rowHeight"
    :row-count="rowCount"
    @confirm="onConfirm"
    @cancel="$emit('on-cancel')"
    @on-change="onChange"
  />
</template>

<script>
import picker from '../../picker'

export default {
  name: 'sq-area',

  components: { picker },

  props: {
    value: {},
    areaData: {
      type: Object,
      default: () => ({})
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    confirmButtonText: {
      type: String,
      default: '确认'
    },
    loading: {
      type: Boolean,
      default: false
    },
    title: String,
    rowHeight: {
      type: Number,
      default: 34
    },
    rowCount: {
      type: Number,
      default: 7
    }
  },

  data () {
    return {
      code: this.value,
      columns: [
        { values: [] }, { values: [] }, { values: [] }
      ]
    }
  },

  watch: {
    value (val) {
      this.code = val
      this.setValues()
    },
    areaData: {
      handler () {
        this.setValues()
      },
      deep: true
    }
  },

  methods: {
    format (obj = {}) {
      return Object.entries(obj).map(item => {
        return {
          code: item[0],
          name: item[1]
        }
      })
    },

    onConfirm (value) {
      this.$emit('on-confirm', value.filter(i => { return !!i }))
    },

    onChange (value, picker, { columnInColumnsIndex }) {
      const { areaData, format } = this

      if (columnInColumnsIndex === 0) {
        const arr = format(areaData[value[columnInColumnsIndex].code])
        picker.setColumnValues(++columnInColumnsIndex, arr)

        this.$nextTick(() => {
          const _arr = arr[0] ? format(areaData[arr[0].code]) : []
          picker.setColumnValues(++columnInColumnsIndex, _arr.length > 0 ? _arr : [])
        })
      } else if (columnInColumnsIndex === 1) {
        const arr = format(areaData[value[columnInColumnsIndex].code])
        picker.setColumnValues(++columnInColumnsIndex, arr)
      }

      this.$nextTick(() => {
        this.$nextTick(() => {
          const result = picker.getValues().filter(i => { return !!i })
          // this.$emit('input', result[result.length - 1].code)
          this.$emit('on-change', result)
        })
      })
    },

    getValues () {
      return this.$refs.pickerRef ? this.$refs.pickerRef.getValues().filter(i => { return !!i }) : []
    },

    getTrueItem (obj, code) {
      let _obj = {}
      obj.forEach(p => {
        if (p.code === code) {
          _obj = p
        }
      })
      return _obj
    },

    setValues () {
      const { areaData, format, getTrueItem } = this
      const { pickerRef } = this.$refs
      const defaultCode = Object.keys(areaData)[0] ? Object.keys(areaData[Object.keys(areaData)[0]])[0] : ''
      let code = this.code || defaultCode || ''

      if (!code) {}

      const provKey = Object.keys(areaData)[0] // '100000'
      const provObj = areaData[provKey] // {'110000': '北京市'}
      const province = format(provObj) // [{code: '110000', name: '北京市'}]

      if (code.indexOf('00') === 2) {
        // 省 110000
        const city = format(areaData[code])
        const county = format(areaData[city[0].code])

        pickerRef.setColumns([ province, city, county ])
        this.$nextTick(() => {
          pickerRef.setValues([ getTrueItem(province, code) ])
        })
      } else if (code.indexOf('00') === 4) {
        // 市 110100
        const provCode = `${code.slice(0, 2)}0000`
        const city = format(areaData[provCode])
        const county = format(areaData[city[0].code])

        pickerRef.setColumns([ province, city, county ])
        this.$nextTick(() => {
          pickerRef.setValues([
            getTrueItem(province, provCode),
            getTrueItem(city, code)
          ])
        })
      } else if (code.indexOf('00') === -1) {
        // 区
        const provCode = `${code.slice(0, 2)}0000`
        const cityCode = `${code.slice(0, 4)}00`
        const city = format(areaData[provCode])
        const county = format(areaData[cityCode])

        if (city.length > 0) {
          pickerRef.setColumns([ province, city, county ])
          if (provCode === '110000' || provCode === '120000' || provCode === '310000' || provCode === '500000') {
            this.$nextTick(() => {
              pickerRef.setValues([
                getTrueItem(province, provCode),
                getTrueItem(city, code),
                getTrueItem(county, code)
              ])
            })
          } else {
            this.$nextTick(() => {
              pickerRef.setValues([
                getTrueItem(province, provCode),
                getTrueItem(city, cityCode),
                getTrueItem(county, code)
              ])
            })
          }
        } else {
          pickerRef.setColumns([ province, county, city ])
          this.$nextTick(() => {
            pickerRef.setValues([
              getTrueItem(province, provCode),
              getTrueItem(county, code),
              getTrueItem(city, cityCode)
            ])
          })
        }
      }
    }
  },

  mounted () {
    this.setValues()
  }
}
</script>

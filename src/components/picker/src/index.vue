<template>
  <div class="sq-picker">
    <div class="sq-picker-header sq-picker-bottom-line" v-show="showToolbar">
      <div @click="$_cancel">{{ cancelButtonText }}</div>
      <div>{{ title }}{{isCascade}}</div>
      <div @click="$_confirm">{{ confirmButtonText }}</div>
    </div>
    <div class="sq-picker-body" @touchmove.prevent>
      <picker-item
        v-for="(item, index) in formatColumns(columns)"
        :key="index"
        :data-list="item"
        :format="format ? format[index] : ''"
        :format-value-fun="formatValueFun"
        :list-index="index"
        :value-key="valueKey"
        @on-change="$_onChange"
      />
    </div>
    <div class="sq-picker-loading-mask" v-show="loading">
      <div class="sq-picker-loading-icon"></div>
    </div>
  </div>
</template>

<script>
import PickerItem from './pickerItem'

export default {
  name: 'sq-picker',

  components: {
    PickerItem
  },

  props: {
    formatValueFun: Function,
    format: Array,
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
    title: {
      type: String,
      default: ''
    },
    showToolbar: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: () => []
    },
    valueKey: String
  },

  data () {
    return {
      children: []
    }
  },

  watch: {
    columns (val) {
      this.setColumns(val)
    }
  },

  methods: {
    formatColumns (columns) {
      if (columns.length && Array.isArray(columns[0])) {
        return columns
      } else if (Object.prototype.toString.call(columns[0]) === '[object Object]' && columns[0].values) {
        return columns.map(column => { return column.values })
      } else {
        return [columns]
      }
    },

    $_cancel () {
      this.$emit('cancel')
    },

    $_confirm () {
      this.$emit('confirm', this.getValues())
    },

    $_onChange (columnIndex) {
      this.$emit('on-change', this.getValues(), this)
    },

    getValues () {
      return this.children.map(child => child.getValue())
    },

    setValues (values) {
      values.forEach((value, index) => {
        this.children[index] && this.children[index].setValue(value)
      })
    },

    setColumnValues (index, dataList) {
      const column = this.children[index]
      if (column && JSON.stringify(column.list) !== JSON.stringify(dataList)) {
        column.list = dataList
        column.setIndex(0)
      }
    },

    setColumns (val) {
      const columns = this.formatColumns(val || this.columns)
      columns.forEach((dataList, index) => {
        this.setColumnValues(index, dataList)
      })
    }
  },

  mounted () {
  }
}
</script>

<style lang="scss">
@import '~@/common/styles/variable';
$prefixCls: sq-picker;

.#{$prefixCls} {
  text-align: center;
  background-color: #fff;
  position: relative;
  &-header {
    display: flex;
    min-height: 50px;
    line-height: 50px;
    :nth-child(1) {
      width: 80px;
      flex: 0 0 80px;
      color: $theme-color;
      font-size: 16px;
    }
    :nth-child(2) {
      flex: 1;
    }
    :nth-child(3) {
      width: 80px;
      flex: 0 0 80px;
      color: $theme-color;
      font-size: 16px;
    }
  }
  &-body {
    height: 240px;
    line-height: 48px;
    position: relative;
    display: flex;
    overflow: hidden;
  }
  &-bottom-line {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      border-bottom: 1px solid #E5E5E5;
      color: #E5E5E5;
      transform-origin: 0 100%;
      transform: scaleY(0.5);
    }
  }
  &-loading-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-loading-icon {
    box-sizing: border-box;
    width: 1em;
    height: 1em;
    font-size: 36px;
    border: 3px solid transparent;
    border-top-color: $theme-color;
    border-left-color: $theme-color;
    border-bottom-color: $theme-color;
    border-radius: 50%;
    animation: quan .8s infinite linear
  }
}
</style>

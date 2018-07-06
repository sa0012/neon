<template>
  <div class="sq-picker">
    <div class="sq-picker-header sq-picker-bottom-line" v-show="showToolbar">
      <div @click="$_cancel">{{ cancelButtonText }}</div>
      <div>{{ title }}</div>
      <div @click="$_confirm">{{ confirmButtonText }}</div>
    </div>
    <div class="sq-picker-body">
      <picker-item
        v-for="(item, index) in currentColumns"
        :key="index"
        :data-list="item"
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
    value: {
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
    valueKey: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      isCascade: Object.prototype.toString(this.columns[0]) === '[object Object]' && Array.isArray(this.columns[0].children),
      currentColumns: this.formateColumns(this.columns),
      currentValue: []
    }
  },

  methods: {
    formateColumns (columns) {
      if (columns.length && Array.isArray(columns[0])) {
        return columns
      } else {
        let arr = columns
        if (Object.prototype.toString(arr[0]) === '[object Object]' && Array.isArray(arr[0].children)) {
          let result = []
          while (arr && arr[0] && Object.prototype.toString(arr[0]) === '[object Object]' && Array.isArray(arr[0].children)) {
            result.push(arr)
            arr = arr[0].children
          }
          return result
        } else {
          return [columns]
        }
      }
    },
    getChildrens () {
      return this.$children.filter(item => item.$options.name === 'sq-picker-item')
    },
    $_cancel () {
      this.$emit('cancel', this.currentValue, this.index)
    },
    $_confirm () {
      this.$emit('confirm', this.currentValue, this.index)
    },
    updateCurrentValue (val) {
      this.currentValue.push(this.valueKey ? val[this.valueKey] : val)
    },
    $_onChange ({ item, itemIndex, listIndex }) {
      let lenth = this.currentColumns.length
      const { valueKey } = this

      if (this.isCascade && listIndex < lenth) {
        let len = listIndex
        let newChildrenArr = JSON.parse(JSON.stringify(item.children))

        while (len < lenth && newChildrenArr.length > 0) {
          const child = this.getChildrens()[len + 1]
          const offset = child.offset
          const rowHeight = child.rowHeight

          child.list = newChildrenArr
          child.$_setY(offset * rowHeight)
          child.maxY = (newChildrenArr.length + offset) * rowHeight
          child.minY = (offset - newChildrenArr.length + 1) * rowHeight
          this.currentValue[len + 1] = valueKey ? newChildrenArr[0][valueKey] : newChildrenArr

          newChildrenArr = (newChildrenArr[0].children && (JSON.parse(JSON.stringify(newChildrenArr[0].children)))) || []
          len++
        }
      }

      this.currentValue[listIndex] = valueKey ? item[valueKey] : item

      this.$emit('on-change', {
        value: JSON.parse(JSON.stringify(this.currentValue)),
        item: JSON.parse(JSON.stringify(item)),
        itemIndex: itemIndex,
        listIndex: listIndex
      })
    }
  }
}
</script>

<style lang="scss">
$theme-color: #4a90e2;

@keyframes quan {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.sq-picker {
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
      -webkit-transform-origin: 0 100%;
      transform-origin: 0 100%;
      -webkit-transform: scaleY(0.5);
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

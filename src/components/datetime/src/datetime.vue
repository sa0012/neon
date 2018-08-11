<template>
  <sq-popup v-model="visible" position="bottom">
    <sq-date-picker
      v-model="value"
      :type="type"
      :format="format"
      :cancel-button-text="cancelButtonText"
      :confirm-button-text="confirmButtonText"
      :title="title"
      :min-date="minDate"
      :max-date="maxDate"
      :min-hour="minHour"
      :max-hour="maxHour"
      @confirm="onConfirm"
      @cancel="onCancel"
      @on-change="onChange"
    />
  </sq-popup>
</template>

<script>
import SqPopup from '@/components/popup'
import SqDatePicker from '@/components/date-picker'

export default {
  name: 'sq-datetime',

  components: {
    SqPopup,
    SqDatePicker
  },

  props: {
    value: {},
    type: {
      type: String,
      default: 'date'
    },
    format: {
      type: Array,
      default: () => []
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
      type: [Date, String],
      default: () => new Date(new Date().getFullYear() - 10, 0, 1, 0, 0)
    },
    maxDate: {
      type: [Date, String],
      default: () => new Date(new Date().getFullYear() + 10, 11, 31, 23, 59)
    },
    minHour: {
      type: Number,
      default: 0
    },
    maxHour: {
      type: Number,
      default: 23
    },
    onConfirm: {
      type: Function,
      default: () => {}
    },
    onCancel: {
      type: Function,
      default: () => {}
    },
    onChange: {
      type: Function,
      default: () => {}
    }
  },

  data () {
    return {
      visible: false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

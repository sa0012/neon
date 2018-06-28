<template>
  <div class="sq-accordion">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'sq-accordion',

  props: {
    value: {
      type: [Array, String, Number]
    },
    accordion: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    arrRemove: (arr, numOrStr) => {
      if (!Array.isArray(arr)) {
        throw Error('arrRemove:params is not array!')
      }
      function indexOf (numOrStr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === numOrStr) return i
        }
        return -1
      }
      const index = indexOf(numOrStr)
      if (index > -1) {
        arr.splice(index, 1)
      }
      return arr
    },
    getChildrens () {
      return this.$children.filter(item => item.$options.name === 'sq-accordion-item')
    },
    updateValue (val, status) {
      if (Array.isArray(this.value)) {
        if (!this.value.includes(val)) {
          if (status) {
            const arr = this.value
            arr.push(val)
            return arr
          }
        } else if (this.value.includes(val) && !status) {
          return this.arrRemove(this.value, val)
        }
      } else {
        return status ? val : undefined
      }
    },
    childrenClickUpdateStatus (name, status) {
      const children = this.getChildrens()
      const valIsArray = Array.isArray(this.value)
      if (this.accordion) {
        children.forEach(item => {
          if (name !== item.name) {
            item.isOpen && (item.isOpen = false)
          }
          this.$emit('input', valIsArray ? (status ? [name] : []) : (status ? name : undefined))
        })
      } else {
        this.$emit('input', this.updateValue(name, status))
      }
    },
    updateStatus (name) {
      const children = this.getChildrens()
      const valIsArray = Array.isArray(this.value)
      if (this.accordion) {
        children.forEach(item => {
          if (valIsArray) {
            (this.value[this.value.length - 1] === item.name) ? (item.isOpen = true) : (item.isOpen && (item.isOpen = false))
          } else {
            this.value === item.name ? (item.isOpen = true) : (item.isOpen && (item.isOpen = false))
          }
        })
      } else {
        children.forEach(item => {
          if (valIsArray) {
            if (this.value.includes(item.name)) {
              item.isOpen = true
            }
          } else if (this.value === item.name) {
            item.isOpen = true
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
</style>

import ToastComponent from './toast.vue'

let instance = null

const toastPlugin = {
  install (Vue, initOptions = {}) {
    const Toast = Vue.extend(ToastComponent)
    if (!instance) {
      instance = new Toast().$mount(document.createElement('div'))
      document.body && document.body.appendChild(instance.$el)
    }

    const defaults = {}
    for (let i in instance.$options.props) {
      if (i !== 'value') {
        defaults[i] = instance.$options.props[i].default
      }
    }

    const toast = {
      show (options = {}) {
        const opt = Object.assign({}, defaults, options)
        for (let key in opt) {
          instance[key] = opt[key]
        }
        if (instance.duration !== -1) {
          setTimeout(() => {
            instance.visible = false
          }, instance.duration)
        }
        instance.visible = true
      },
      hide (callback) {
        instance.visible = false
        callback && callback()
      },
      text (...option) {
        this.show({ ...this.marge(option), type: 'text' })
      },
      success (...option) {
        this.show({ ...this.marge(option), type: 'success' })
      },
      error (...option) {
        this.show({ ...this.marge(option), type: 'error' })
      },
      loading (...option) {
        this.show({ ...this.marge(option), type: 'loading' })
      },
      marge (data) {
        if (data.length === 1) {
          return { message: data[0] }
        }
        if (data.length === 2) {
          return { message: data[0], duration: data[1] }
        }
        if (data.length === 3) {
          return { message: data[0], duration: data[1], position: data[2] }
        }
      }
    }

    Vue.mixin({
      created: function () {
        this.$toast = toast
      }
    })
  }
}

export default toastPlugin

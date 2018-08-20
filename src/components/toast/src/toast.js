import ToastComponent from './toast.vue'

let instance = null

const toastPlugin = {
  install (Vue, initOptions = {}) {
    const toast = {
      show (options = {}) {
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

        const opt = Object.assign({}, defaults, options)
        for (let key in opt) {
          instance[key] = opt[key]
        }
        instance.timeOut && clearTimeout(instance.timeOut)
        if (instance.duration !== -1) {
          instance.timeOut = setTimeout(() => {
            instance.visible = false
            instance.timeOut && clearTimeout(instance.timeOut)
          }, instance.duration)
        }
        instance.visible = true
      },
      hide (callback) {
        instance && (instance.visible = false)
        typeof callback === 'function' && callback()
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
      warn (...option) {
        this.show({ iconSize: 24, ...this.marge(option), type: 'warn' })
      },
      loading (...option) {
        this.show({ iconSize: 34, ...this.marge(option), type: 'loading' })
      },
      marge (data) {
        let options = {}
        data.forEach((d, i) => {
          i === 0 && (options.message = d)
          i === 1 && (options.duration = d)
          if (i === 2) {
            if (typeof d === 'string') {
              options.position = d
            } else if (d && Object.prototype.toString.call(d) === '[object Object]') {
              options = Object.assign({}, options, d)
            }
          }
        })
        return options
      }
    }

    Vue.prototype.$toast = toast
  }
}

export default toastPlugin

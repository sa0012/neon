import DatetimeComponent from './datetime.vue'

let instance = null

const dateTimePlugin = {
  install (Vue, initOptions = {}) {
    const datetime = {
      show (options = {}) {
        const Datetime = Vue.extend(DatetimeComponent)

        if (!instance) {
          instance = new Datetime().$mount(document.createElement('div'))
          document.body && document.body.appendChild(instance.$el)
        }

        const defaults = {}
        for (let i in instance.$options.props) {
          if (instance.$options.props[i].default !== void 0) {
            defaults[i] = instance.$options.props[i].default
          } else {
            defaults[i] = void 0
          }
        }

        const opt = Object.assign({}, defaults, options)
        for (let key in opt) {
          instance[key] = opt[key]
        }
        instance.visible = true
      },
      hide (callback) {
        instance && (instance.visible = false)
        typeof callback === 'function' && callback()
      },
      datetime (option) {
        this.show(Object.assign({}, option, { type: 'datetime' }))
      },
      date (option) {
        this.show(Object.assign({}, option, { type: 'date' }))
      },
      yearMonth (option) {
        this.show(Object.assign({}, option, { type: 'year-month' }))
      },
      time (option) {
        this.show(Object.assign({}, option, { type: 'time' }))
      }
    }

    Vue.prototype.$datetime = datetime
  }
}

export default dateTimePlugin

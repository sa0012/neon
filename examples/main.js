// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Demo from './routers/demo'

import Accordion from '../src/components/accordion'
import AccordionItem from '../src/components/accordionItem'
import Actionsheet from '../src/components/actionsheet'
import Agree from '../src/components/agree'
import Button from '../src/components/button'
import Carlicense from '../src/components/carlicense'
import Cell from '../src/components/cell'
import CellGroup from '../src/components/cellGroup'
import Checkbox from '../src/components/checkbox'
import CheckboxGroup from '../src/components/checkboxGroup'
import ChildinsuranceCell from '../src/components/childinsuranceCell'
import CitySelector from '../src/components/citySelector'
import Datepicker from '../src/components/datepicker'
import Field from '../src/components/field'
import Fieldgroup from '../src/components/fieldGroup'
import Loadmore from '../src/components/loadmore'
import NoticeBar from '../src/components/noticeBar'
import Picker from '../src/components/picker'
import Popup from '../src/components/popup'
import Radio from '../src/components/radio'
import RadioGroup from '../src/components/radioGroup'
import Stepper from '../src/components/stepper'
import SubmitBar from '../src/components/submitBar'
import Swiper from '../src/components/swiper'
import Switch from '../src/components/switch'
import Tabpane from '../src/components/tabpane'
import Tabs from '../src/components/tabs'
import Tag from '../src/components/tag'

import Toast from '../src/components/toast'
import Dialog from '../src/components/dialog'

import '../src/assets/icon/iconfont.css'

const components = [
  Accordion,
  AccordionItem,
  Actionsheet,
  Agree,
  Button,
  Carlicense,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  ChildinsuranceCell,
  CitySelector,
  Datepicker,
  Demo,
  Field,
  Fieldgroup,
  Loadmore,
  NoticeBar,
  Picker,
  Popup,
  Radio,
  RadioGroup,
  Stepper,
  SubmitBar,
  Swiper,
  Switch,
  Tabpane,
  Tabs,
  Tag 
]

components.forEach(component => {
  Vue.component(component.name, component)
})

Vue.use(Toast)
Vue.use(Dialog)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { 
    App
  },
  template: '<App/>'
})

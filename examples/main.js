// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Demo from './routers/demo'
import DemoTitle from './routers/demoTitle'

import Accordion from '@/components/accordion'
import AccordionItem from '@/components/accordion-item'
import Actionsheet from '@/components/actionsheet'
import Agree from '@/components/agree'
import Button from '@/components/button'
import Carlicense from '@/components/carlicense'
import Cell from '@/components/cell'
import CellGroup from '@/components/cell-group'
import Checkbox from '@/components/checkbox'
import CheckboxGroup from '@/components/checkbox-group'
import ChildinsuranceCell from '@/components/childinsurance-cell'
import CitySelector from '@/components/city-selector'
import ChooseCar from '../src/components/choose-car'
import DatePicker from '@/components/date-picker'
import Field from '@/components/field'
import Fieldgroup from '@/components/field-group'
import Loadmore from '@/components/loadmore'
import NoticeBar from '@/components/notice-bar'
import Picker from '@/components/picker'
import Popup from '@/components/popup'
import Radio from '@/components/radio'
import RadioGroup from '@/components/radio-group'
import Sendcode from '@/components/sendcode'
import Stepper from '@/components/stepper'
import SubmitBar from '@/components/submit-bar'
import Swiper from '@/components/swiper'
import Switch from '@/components/switch'
import Tabpane from '@/components/tabpane'
import Tabs from '@/components/tabs'
import Tag from '@/components/tag'

import Toast from '@/components/toast'
import Dialog from '@/components/dialog'

import '../src/common/icon/iconfont.css'
import Filter from './filter'

Filter(Vue)

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
  ChooseCar,
  DatePicker,
  Demo,
  DemoTitle,
  Field,
  Fieldgroup,
  Loadmore,
  NoticeBar,
  Picker,
  Popup,
  Radio,
  RadioGroup,
  Sendcode,
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

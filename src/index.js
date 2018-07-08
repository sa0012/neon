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
import ChooseCar from '@/components/choose-car'
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

import Toast from '@/components/toast/index.js'
import Dialog from '@/components/dialog/index.js'

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

const install = Vue => {
  if (install.installed) return
  install.installed = true

  components.forEach(component => Vue.component(component.name, component))

  Vue.use(Toast)
  Vue.use(Dialog)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
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
}

export default {
  install
}

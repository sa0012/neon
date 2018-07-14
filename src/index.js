import '@/common/styles/base.scss'

// base
import Accordion from '@/components/accordion'
import AccordionItem from '@/components/accordion-item'
import Button from '@/components/button'
import Cell from '@/components/cell'
import CellGroup from '@/components/cell-group'
import Loadmore from '@/components/loadmore'
import NoticeBar from '@/components/notice-bar'
import Popup from '@/components/popup'
import Stepper from '@/components/stepper'
import Swiper from '@/components/swiper'
import Tabpane from '@/components/tabpane'
import Tabs from '@/components/tabs'
import Tag from '@/components/tag'

// form
import Checkbox from '@/components/checkbox'
import CheckboxGroup from '@/components/checkbox-group'
import Field from '@/components/field'
import Fieldgroup from '@/components/field-group'
import NumberKeyboard from '@/components/number-keyboard'
import Radio from '@/components/radio'
import RadioGroup from '@/components/radio-group'
import Switch from '@/components/switch'
import Uploader from '@/components/uploader'

// action
import Actionsheet from '@/components/actionsheet'
import DatePicker from '@/components/date-picker'
import Dialog from '@/components/dialog'
import Picker from '@/components/picker'
import Toast from '@/components/toast'

// business
import Agree from '@/components/agree'
import Carlicense from '@/components/carlicense'
import ChildinsuranceCell from '@/components/childinsurance-cell'
import ChooseCar from '@/components/choose-car'
import CitySelector from '@/components/city-selector'
import Sendcode from '@/components/sendcode'
import SubmitBar from '@/components/submit-bar'

const components = [
  // base
  Accordion,
  AccordionItem,
  Button,
  Cell,
  CellGroup,
  Loadmore,
  NoticeBar,
  Popup,
  Stepper,
  Swiper,
  Tabpane,
  Tabs,
  Tag,

  // form
  Checkbox,
  CheckboxGroup,
  Field,
  Fieldgroup,
  NumberKeyboard,
  Radio,
  RadioGroup,
  Switch,
  Uploader,

  // action
  Actionsheet,
  DatePicker,
  Picker,

  // business
  Agree,
  Carlicense,
  ChildinsuranceCell,
  ChooseCar,
  CitySelector,
  Sendcode,
  SubmitBar
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
  // base
  Accordion,
  AccordionItem,
  Button,
  Cell,
  CellGroup,
  Loadmore,
  NoticeBar,
  Popup,
  Stepper,
  Swiper,
  Tabpane,
  Tabs,
  Tag,

  // form
  Checkbox,
  CheckboxGroup,
  Field,
  Fieldgroup,
  NumberKeyboard,
  Radio,
  RadioGroup,
  Switch,
  Uploader,

  // action
  Actionsheet,
  Dialog,
  DatePicker,
  Picker,
  Toast,

  // business
  Agree,
  Carlicense,
  ChildinsuranceCell,
  ChooseCar,
  CitySelector,
  Sendcode,
  SubmitBar
}

export default {
  install
}

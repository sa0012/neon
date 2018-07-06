import Accordion from '@/components/accordion'
import AccordionItem from '@/components/accordionItem'
import Actionsheet from '@/components/actionsheet'
import Agree from '@/components/agree'
import Button from '@/components/button'
import Carlicense from '@/components/carlicense'
import Cell from '@/components/cell'
import CellGroup from '@/components/cellGroup'
import Checkbox from '@/components/checkbox'
import CheckboxGroup from '@/components/checkboxGroup'
import ChildinsuranceCell from '@/components/childinsuranceCell'
import CitySelector from '@/components/citySelector'
import ChooseCar from '@/components/chooseCar'
import DatePicker from '@/components/datePicker'
import Field from '@/components/field'
import Fieldgroup from '@/components/fieldGroup'
import Loadmore from '@/components/loadmore'
import NoticeBar from '@/components/noticeBar'
import Picker from '@/components/picker'
import Popup from '@/components/popup'
import Radio from '@/components/radio'
import RadioGroup from '@/components/radioGroup'
import Sendcode from '@/components/sendcode'
import Stepper from '@/components/stepper'
import SubmitBar from '@/components/submitBar'
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

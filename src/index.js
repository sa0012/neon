import Carlicense from '@/components/carlicense'
import Button from '@/components/button'
import Pane from '@/components/pane'
import Tabs from '@/components/tabs'
import Field from '@/components/field'
import Cell from '@/components/cell'
import Cellgroup from '@/components/cellgroup'
import Fieldgroup from '@/components/fieldGroup'
import Radio from '@/components/radio'
import Radiogroup from '@/components/radioGroup'
import Actionsheet from '@/components/actionsheet'
import Agree from '@/components/agree'
import Picker from '@/components/picker'
import Popup from '@/components/popup'
import Swiper from '@/components/swiper'
import ChildinsuranceCell from '@/components/childinsuranceCell'
import NoticeBar from '@/components/noticeBar'
// import CitySelector from '@/components/citySelector'
import Loadmore from '@/components/loadmore'

import Toast from '@/components/toast/index.js'
import Dialog from '@/components/dialog/index.js'

const version = '0.0.1'
const components = [
  Carlicense,
  Button,
  Pane,
  Tabs,
  Field,
  Cell,
  Cellgroup,
  Fieldgroup,
  Radiogroup,
  Radio,
  Actionsheet,
  Agree,
  Picker,
  Popup,
  Swiper,
  ChildinsuranceCell,
  NoticeBar,
  // CitySelector,
  Loadmore
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
  Carlicense,
  Button,
  Pane,
  Tabs,
  Field,
  Cell,
  Cellgroup,
  Fieldgroup,
  Radiogroup,
  Radio,
  Actionsheet,
  Agree,
  Picker,
  Popup,
  Swiper,
  ChildinsuranceCell,
  NoticeBar,
  // CitySelector,
  Loadmore
}

export default {
  install,
  version
}

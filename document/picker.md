### Picker - 选择器
---
#### 按需引入

```js
import { Picker } from '@insaic/neon'
Vue.use(Picker)
```

#### 例子
```html
<picker
  :list="list"
  v-model="value"
  @confirm="confirm"
  @cancel="cancel"
  @on-change="onChange"
/>
```
---
#### Props
| 名称        | 类型       | 说明                | 默认值   | 可选值         |
|:----------- |:--------- |:------------------- |:------- |:-------------- |
| value       | `Boolean` | 绑定值,用于显示与否   |         |               |
| list        | `Array`   | 选项list             |         |               |

---

#### Event
| 名称       | 参数  | 描述                             |
|:---------- |:---- |:-------------------------------- |
| confirm    | item | 点击确认按钮执行的事件,item为选中项 |
| cancel     | item | 点击取消按钮执行的事件,item为选中项 |
| on-change  | item | 改变项时执行的事件,item为选中项     |
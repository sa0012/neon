### DatePicker - 日期选择 | Datetime - 日期选择插件形式
---

:::tip
日期选择有两种使用形式，标签使用形式、js调用形式。<br>
推荐使用更为方便书写、单个实例的js调用形式。
:::
#### 按需引入

- 插件形式（推荐）
```js
import { Datetime } from '@insaic/neon'
Vue.use(Datetime)
```
- 标签形式
```js
import { DatePicker } from '@insaic/neon'
Vue.use(DatePicker)
```

#### 例子 [demo源码](https://github.com/insaic/neon/blob/dev/examples/routers/datePicker.vue)
- 插件形式
```js
this.$datetime.date({
  minDate: '2016-01-01',
  maxDate: '2020-12-31',
  value: new Date(),
  onConfirm: (value) => {
    console.log(value)
    this.$datetime.hide()
  },
  onCancel: () => {
    this.$datetime.hide()
  },
  onChange (value) {
    console.log(value)
  }
})
```
- 标签形式
```html
<!-- 搭配popup使用 -->
<sq-button type="primary" size="small" @click="isShow = !isShow">show</sq-button>
<sq-popup v-model="isShow" position="bottom">
  <sq-date-picker
    min-date="2008-10-25"
    max-date="2028-1-1"
    v-model="dataValue"
    @confirm="confirm1"
    @cancel="cancel1"
    @on-change="onChange2"
  />
</sq-popup>
```
---

:::tip
`this.$datetime.date` 即使用 `type` 为 `date` (年月日) 实例<br>
`this.$datetime.yearMonth` 即使用 `type` 为 `year-month` (年月) 实例
:::

#### Props
 名称                 | 类型              | 说明                       | 默认值                 | 可选值
:------              |:---------         |:---------------            |:------                |:-----
 type                | `String`          | 组件类型                    | date(年月日)           | datetime(年月日时分)，<br>time(时分)，<br>year-month(年月)
 value               | `Date`            | 当前日期，例：`new Date()`   | 当前年月日0时0分       |  --
 title               | `String`          | 标题                        | ''                    |  --
 confirm-button-text | `String`          | 确认按钮文本                 | '确认'                |  --
 cancel-button-text  | `String`          | 取消按钮文本                 | '取消'                |  --
 min-date            | `String`，<br>`Date`  | 例：'2008-10-25'，<br>type为`date`，`datetime`下有效 | --    |  --
 max-date            | `String`，<br>`Date`  | 例：'2028-1-1'，<br>type为`date`，`datetime`下有效   | --    |  --
 min-hour            | `Number`          | type为`time`，`datetime`下有效                       | 0    |  --
 max-hour            | `Number`          | type为`time`，`datetime`下有效                       | 23   |  --
 format              | `Array`           | 添加自定义文本                                       |  --   |  --

---

#### Event
 名称     | 参数    | 描述
:-----    |:----   |:------------
confirm   | date   | 确认按钮执行的事件，返回当前日期，为`date`类型
cancel    | --     | 取消按钮执行的事件
on-change | date   | 滚动列表执行的change事件，返回当前日期，为`date`类型
### DatePicker - 日期选择
---
#### 按需引入

```js
import { DatePicker } from '@insaic/neon'
Vue.use(DatePicker)
```

#### 例子
```html
<!-- 搭配popup使用 -->
<sq-button type="primary" size="small" @click="isShow = !isShow">show</sq-button>
<sq-popup v-model="isShow" position="bottom">
  <sq-date-picker
    title="请选择时间"
    min="2008-10-25"
    max="2028-1-1"
    :format="['年', '月', '日']"
    :default-value="[new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()]"
    @confirm="confirm"
    @cancel="cancel"
    @on-change="onChange"
  />
</sq-popup>
```
---
#### Props
 名称                 | 类型      | 说明                      | 默认值  | 可选值
:------              |:--------- |:---------------           |:------ |:-----
 title               | `String`  | 标题                       | ''    |  --
 confirm-button-text | `String`  | 确认按钮文本                | '确认' |  --
 cancel-button-text  | `String`  | 取消按钮文本                | '取消' |  --
 min                 | `String`  | yyyy-mm-dd或yyyy/mm/dd形式 |   --   |  --
 max                 | `String`  | yyyy-mm-dd或yyyy/mm/dd形式 | --     |  --
 defaultValue        | `Array`   | 默认日期                   | --     |  --
 format              | `Array`   | 添加自定义文本              |  --    |  --

---

#### Event
 名称     | 参数    | 描述
:-----    |:----   |:------------
on-change | date   | 当前日期数组
cancel    | date   | 当前日期数组
confirm   | date   | 当前日期数组
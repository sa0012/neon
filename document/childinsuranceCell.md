### ChildinsuranceCell - 子险列表

---
#### 按需引入

```js
import { ChildinsuranceCell } from '@insaic/neon'
Vue.use(ChildinsuranceCell)
```

#### 例子
```html
<sq-childinsurance-cell
  label="司机责任险"
  middle-text="不计免赔"
  right-text="投保"
  v-model="exemptSelected"
/>
```

---
#### Props
 名称           | 类型      | 说明             | 默认值   | 可选值
:------        |:--------- |:---------------  |:-------  |:-----
 value         | `Boolean` | 勾选框的绑定值    |   --     |  --
 label         | `String`  | 标题文本          | --      |  --
 middle-text   | `String`  | 中间位置的文本    | false    |  --
 right-text    | `String`  | 右边位置的文本    | false    |  --

---

#### Event
 名称  | 参数  | 描述             
:----- |:---- |:------------------ 
click  | --   | 点击右边文本触发事件
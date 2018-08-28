### ChildinsuranceCell - 子险列表

---
#### 按需引入

```js
import { ChildinsuranceCell } from '@insaic/neon'
Vue.use(ChildinsuranceCell)
```

#### 例子 [demo源码](https://github.com/insaic/neon/blob/dev/examples/routers/childinsuranceCell.vue)
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
 value         | `Boolean` | 勾选框的绑定值，必传    |   --     |  --
 label         | `String`  | 标题文本          | --      |  --
 middle-text   | `String`  | 中间位置的文本    | false    |  --
 right-text    | `String`、`Number`  | 右侧位置的文本    | false    |  --
 border-type    | `Boolean` | 勾选框图标样式    | `round`    |  `square`,`square-border`
 checkbox-disabled    | `Boolean` | 是否禁用中间的勾选功能    | false    |  true
 has-exempt-clause   | `Boolean` | 是否显示中间部分内容    | false    |  true

---

#### Event
 名称  | 参数  | 描述             
:----- |:---- |:------------------ 
click  | --   | 点击右边文本区域触发的事件
### Actionsheet - 行动按钮
---
#### 按需引入

```js
import { Actionsheet } from '@insaic/neon'
Vue.use(Actionsheet)
```

#### 例子 [demo源码](https://github.com/insaic/neon/blob/dev/examples/routers/actionsheet.vue)
```html
<actionsheet
  v-model="value"
  :action-list="actionList"
  @action-fun="actionFun(item)"
/>
```
---
#### Props
 名称        | 类型       | 说明                | 默认值   | 可选值 
:----------- |:--------- |:------------------- |:------- |:-------
 value       | `Boolean` | 绑定值,用于显示与否   |   --    |  -- 
 action-list | `Array`   | 选项list             |    --   |  -- 

---

#### Event
 名称       | 参数  | 描述             
:---------- |:---- |:------------------ 
 action-fun | item | 点击选中的项执行事件,item为选中项
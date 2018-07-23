### Button - 按钮
---
#### 按需引入

```js
import { Button } from '@insaic/neon'
Vue.use(Button)
```

#### 例子
```html
<!-- 改变样式 -->
<sq-button type="default">default</sq-button>
<sq-button type="primary">primary</sq-button>
<sq-button type="ghost">ghost</sq-button>
<!-- 改变大小 -->
<sq-button size="default">default</sq-button>
<sq-button size="large">large</sq-button>
<sq-button size="small">small</sq-button>
<!-- 绑定click事件-->
<sq-button @click="handleClick">click</sq-button>
```
---
#### Props
 名称     | 类型       | 说明     | 默认值   | 可选值         
:-------- |:--------- |:-------- |:------- |:-------------- 
 type     | `String`  | 类型     | default | primary、ghost 
 size     | `String`  | 大小     | default | large、small   
 disabled | `Boolean` | 禁用状态  | false   | true          

---

#### Slot
 名称 |  描述        
:---- | :---------- 
 --   | 显示文本内容 
 icon | 自定义图标   

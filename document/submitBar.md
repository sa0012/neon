### SubmitBar - 提交订单栏

---
#### 按需引入

```js
import { SubmitBar } from '@insaic/neon'
Vue.use(SubmitBar)
```

#### 例子
```html
<!-- 普通状态 -->
<sq-submit-bar
  label="保费："
  price="3000"
  button-text="立即投保"
  @submit="onSubmit"
/>
<!-- 禁止提交状态 -->
<sq-submit-bar
  disabled
  label="保费："
  price="3000"
  button-text="立即投保"
  @submit="onSubmit"
/>
```
#### Props
 名称        | 类型              | 说明           | 默认值  | 可选值         
:----------- |:---------        |:---------------|:-------|:-------- 
 disabled    | `Boolean`        | 是否为禁用状态  | false   | true        
 label       | `String`         | 名称           |   --    |  --           
 currency    | `String`         | 价格单位符号    |   &yen; |  --           
 price       | `String`,`Number`| 价格           |   --    |  --           
 buttonText  | `String`         | 按钮文本       |   --    |  --           
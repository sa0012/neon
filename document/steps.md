### Steps - 步骤条

---
#### 按需引入

```js
import { Steps, StepItem } from '@insaic/neon'
Vue.use(Steps).use(StepItem)
```

#### 例子
```html
<sq-steps :active="1">
  <sq-step-item>登录登录</sq-step-item>
  <sq-step-item>开通开通</sq-step-item>
  <sq-step-item>验证验证</sq-step-item>
  <sq-step-item>成功成功</sq-step-item>
</sq-steps>
```

#### Props
 名称    | 类型        | 说明                          | 默认值  | 可选值
:------ |:---------  |:--------                       |:-------|:------
 active | `Number`  | 选择到第几项，对应step-item的下标 |   0    | --
### Stepper - 步进器

---
#### 按需引入

```js
import { Stepper } from '@insaic/neon'
Vue.use(Stepper)
```

#### 例子 [demo源码](https://github.com/insaic/neon/blob/dev/examples/routers/stepper.vue)
```html
<!-- 基础用法 -->
<sq-stepper v-model="val1" min="6" max="8"/>
<!-- 禁用输入框 -->
<sq-stepper readonly-input v-model="val2" step=".5" min="2" />
```

#### Props
 名称             | 类型              | 说明            | 默认值  | 可选值
:------          |:---------         |:--------        |:-------|:------
 max             | `Number`，`String` | 最大值          |   --    | --
 min             | `Number`，`String` | 最小值          |   --    | --
 value           | `Number`，`String` | 绑定值          | 0       | --
 step            | `Number`，`String` | 数字间隔        | 1       | --
 readonly-input  | `Boolean`         | 是否禁用输入框   | false   | true
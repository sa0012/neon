### NumberKeyboard - 数字键盘

---
#### 按需引入

```js
import { NumberKeyboard } from '@insaic/neon'
Vue.use(NumberKeyboard)
```

#### 例子 [demo源码](https://github.com/insaic/neon/blob/dev/examples/routers/numberKeyboard.vue)
```html
<!-- 普通键盘 -->
<sq-number-keyboard
  v-model="isShow"
  @delete="onDelete"
  @confirm="onConfirm"
  @key-click="onKeyClick"
/>
<!-- 数字键盘 -->
<sq-number-keyboard
  v-model="isShow"
  type="amount"
  @delete="onDelete"
  @confirm="onConfirm"
  @key-click="onKeyClick"
/>
<!-- 身份证键盘 -->
<sq-number-keyboard
  v-model="isShow"
  type="idcard" 
  @delete="onDelete"
  @confirm="onConfirm"
  @key-click="onKeyClick"
/>
```

---
#### Props
 名称           | 类型      | 说明                  | 默认值   | 可选值
:------        |:--------- |:---------------       |:-------  |:-----
 value         | `Boolean` | 绑定值，是否显示        |   --     |  --
 type          | `String`  | 键盘类型               | number   |  amount，idcard
 z-index       | `String`  | 键盘的z-index CSS属性  | 100      |  --
 confirm-text  | `String`  | 按钮文本               | 确定     |  --

---

#### Event
 名称      | 参数        | 描述             
:-----     |:----       |:------------------ 
key-click  | keyValue   | 点击主key触发事件
delete     | --         | 点击delete key触发事件
confirm    | --         | 点击confirm key触发事件
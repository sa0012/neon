### Agree - 勾选按钮
---
#### 按需引入

```js
import { Agree } from '@insaic/neon'
Vue.use(Agree)
```

#### 例子
```html
<sq-agree v-model="isAgree">
  我已阅读并接受
  <a @click.stop="click">《保险须知》</a>中的条例
</sq-agree>
```
---

#### props
 参数           | 类型       | 说明       | 默认值
:--------------|:---------- |:---------- |:-----
 value         | `Boolean`  | 绑定值      |  --    
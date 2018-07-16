### Popup - 弹出层

---
#### 按需引入

```js
import { Popup } from '@insaic/neon'
Vue.use(Popup)
```

#### 例子
```html
<sq-popup v-model="isShowCenter">中间弹出</sq-popup>
<sq-popup v-model="isShowLeft" position="left">左侧弹出</sq-popup>
<sq-popup v-model="isShowRight" position="right">右侧弹出</sq-popup>
<sq-popup v-model="isShowTop" position="top">上方弹出</sq-popup>
<sq-popup v-model="isShowBottom" position="bottom">底部弹出</sq-popup>
```

#### Props
 名称                    | 类型        | 说明            | 默认值    | 可选值
:------                  |:---------  |:--------        |:-------  |:------
 value                   | `Boolean`  | 是否显示         |   --     | --
 position                | `String`   | 显示的位置       | center   | top, right, bottom, left
 close-on-click-overlay  | `Boolean`  | 点击蒙层是否关闭 | true     | false
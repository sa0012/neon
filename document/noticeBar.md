### NoticeBar - 通告栏

---
#### 按需引入

```js
import { NoticeBar } from '@insaic/neon'
Vue.use(NoticeBar)
```

#### 例子
```html
<!-- 基础用法 -->
<sq-notice-bar text="为了确保您的资金安全，请设置支付密码"/>
<!-- 点击可关闭 -->
<sq-notice-bar text="为了确保您的资金安全，请设置支付密码" mode="close"/>
<!-- 文字溢出，自动轮播 -->
<sq-notice-bar
  mode="link"
  text="为了确保您的资金安全，请设置支付密码。。。
  为了确保您的资金安全，请设置支付密码。。。
  为了确保您的资金安全，请设置支付密码"
/>
```

#### Props
 名称   | 类型                | 说明               | 默认值    | 可选值
:------|:---------           |:--------           |:------- |:------
 mode  | `String`            | 显示右边图标样式     |    --    | close，link
 text  | `String`            | 文本内容            |    --    | --
 delay | `Number`，`String`  | 延迟几秒轮播(单位s)  |    1     | --
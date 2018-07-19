### Sendcode - 发送验证码

---
#### 按需引入

```js
import { Sendcode } from '@insaic/neon'
Vue.use(Sendcode)
```

#### 例子
```html
<!-- 刷新保留倒计时 -->
<sq-sendcode
  v-model="sendcode1"
  :code.sync="code"
  session-storage-key="sessionStorageKey"
  @click="send1"
></sq-sendcode>

<!-- 嵌入fieldgroup形式 -->
<sq-field-group>
  <sq-field label="手机号码" placeholder="请输入手机号码" v-model="name"></sq-field>
  <sq-sendcode
    v-model="sendcode2"
    @click="send2"
  ></sq-sendcode>
</sq-field-group>
```
#### Props
 名称                 | 类型               | 说明                    | 默认值           | 可选值
:------              |:---------           |:--------               |:-------         |:------
 value               | `Boolean`           | 是否开始倒计时          |   false         | true
 maxlength           | `Number`            | input中最多输入的位数   | 6               | --
 placeholder         | `String`            | 占位内容文本            | 请输入短信验证码 | --
 button-init-text    | `String`            | 按钮初始文本            | 获取验证码       | --
 timing              | `Number`            | 总共倒计时数，单位s     | 60              | --
 code                | `Number`，`String`  | input中的输入的值       | --              | --
 session-storageKey  | `String`            | 刷新页面缓存的倒计时数值 | --              | --

### Field - 输入框

---
#### 按需引入

```js
import { Field, FieldGroup } from '@insaic/neon'
Vue.use(Field).use(FieldGroup)
```

#### 例子
```html
<!-- 列表样式 -->
<sq-field placeholder="请输入用户名" v-model="name"></sq-field>
<!-- 间隔样式 -->
<sq-field-group>
  <sq-field label="用户名" placeholder="请输入用户名" v-model="name"></sq-field>
  <sq-field label="密码" placeholder="请输入密码" v-model="password"></sq-field>
</sq-field-group>
```
---
#### Props
- field

 名称            | 类型      | 说明                     | 默认值   | 可选值
:------         |:--------- |:---------------          |:------- |:-------
 value          | `Boolean` | 绑定值                   |   --     |  --
 arrow          | `Boolean` | 是否显示右边箭头          | false    |  --
 type           | `String`  | input的type              | text     | input类型
 label          | `String`  | 标题文本                 | --       |  --
 right          | `Boolean` | 是否将input文本居右显示   | false    |true
 iptStyle       | `Object`  | input的style             | --       |--
input拥有的属性  | **        | 其他属性将作用于input上   | **       |**

---

#### Event
 名称            | 参数  | 描述             
:-----          |:---- |:------------------ 
input拥有的事件  | **   | 添加的事件将作用于input上

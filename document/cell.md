### cell
单元格，可用作展示列表信息、链接或者表单等。

---

#### 例子
```html
<sq-cell
  label="证件号码"
  placeholder="请输入证件号码"
  v-model="value"
  maxlength="18"
  @input="handleCertificateNoInput"
>
</sq-cell> 
```
---
#### API
| 名称        | 类型       | 说明     | 默认值   | 可选值         |
|:----------- |:--------- |:-------- |:------- |:-------------- |
| label       | `String`  | 标题     |          |                |
| placeholder | `String`  | 占位内容  |         |                |
| maxlength   | `String`  | 最大值    |         |                |
| value       | `*`       | 绑定值    |         |                |

---
#### slot
| 名称    |  描述        |
|:----    | :---------- |
| control | 自定义内容   |
| button  | 自定义按钮   |
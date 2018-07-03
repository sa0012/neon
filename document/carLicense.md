### carLicense
车牌输入模拟键盘。

---
#### 例子
```html
<car-license
  ref="carlicenseWrapper"
  :has-default-province="true"
  :province-name-prop="provName"
  :car-number-prop="carNumber"
  placeholder="请输入车牌号"
>
</car-license>
```
---
#### API
| 参数                 | 类型       | 说明                | 默认值 | 可选值 |
|:-------------------- |:--------- |:------------------- |:------ |:----- |
| province-name-prop   | `String`  | 车牌所在地[省份缩写]  | --    |        |
| car-number-prop      | `String`  | 车牌号[英文和数字]    | --    |        |
| has-default-province | `Boolean` | 设置默认省份[京]      | false | true   |
| placeholder          | `String`  | 占位内容              | --    |        |

#### Event
| 名称     | 参数 | 描述     | 调用方式                                   |
|:-------- |:-- |:--------- |:----------------------------------------- |
| getValue | -- | 获得车牌号 | `this.$refs.carlicenseWrapper.getValue()` |
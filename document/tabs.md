### Tabs - 标签页
---
#### 按需引入

```js
import { Tabs, Tabpane } from '@insaic/neon'
Vue.use(Tabs).use(Tabpane)
```

#### 例子
```html
<sq-tabs active="name1">
  <sq-tabpane label="标签一" name="name1">标签一的内容</sq-tabpane>
  <sq-tabpane label="标签二" name="name2">标签二的内容</sq-tabpane>
  <sq-tabpane label="标签三" name="name3">标签三的内容</sq-tabpane>
  <sq-tabpane label="标签四" name="name4">
    <p>标签四的内容</p><p>标签四的内容</p>
    <p>标签四的内容</p><p>标签四的内容</p>
    <p>标签四的内容</p><p>标签四的内容</p>
  </sq-tabpane>
</sq-tabs>
```
---
#### Props
* **tabs**
  | 名称        | 类型       | 说明     | 默认值   | 可选值         |
  |:----------- |:--------- |:-------- |:------- |:-------------- |
  | active      | `String`  | 选中项    |         |                |

* **tabpane**
  | 名称        | 类型       | 说明     | 默认值   | 可选值         |
  |:----------- |:--------- |:-------- |:------- |:-------------- |
  | label | `String`  | 占位内容   |         |                |
  | name  | `String`  | 标签项名称 |         |                |

---
#### slot
* **tabpane**
  | 名称    |  描述        |
  |:----    | :---------- |
  | --      | 自定义内容   |

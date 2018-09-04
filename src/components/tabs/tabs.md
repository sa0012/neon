### Tabs - 标签页
---
#### 按需引入

```js
import { Tabs, Tabpane } from '@insaic/neon'
Vue.use(Tabs).use(Tabpane)
```

#### 例子 [demo源码](https://github.com/insaic/neon/blob/dev/examples/routers/tabs.vue)
```html
<sq-tabs active="name1" line-scale="0.6" font-size="14" title-height="40">
  <sq-tabpane label="第一年" name="name1">
    标签一的内容
  </sq-tabpane>
  <sq-tabpane label="第二年" name="name2">标签二的内容</sq-tabpane>
  <sq-tabpane label="第三年" name="name3">
    <p>标签三的内容</p><p>标签三的内容</p>
  </sq-tabpane>
</sq-tabs>
```
---
#### Props
* tabs
   名称       | 类型                 | 说明                             | 默认值   | 可选值
  :--------   |:---------           |:--------                         |:------- |:-------
   active     | `String`，`Number`  | 选中项                            | --      |  -- 
   sticky     | `Boolean`           | 是否固定显示                      |  --      |  -- 
   type       | `String`            | 标签样式显示类型，线形或块状        | 'line'  |  'block'
   line-scale  | `String`，`Number` | 下划线缩放比例，仅type='line'下有效 | 1       |  -- 
   hide-line   | `Boolean`          | 是否隐藏下划线，仅type='line'下有效 |  false  |  true 
   title-height| `String`，`Number` | 标题高度                           |  48     |  -- 
   font-size   | `String`，`Number` | 标题字体大小                       |  16     |  -- 

* tabpane
   名称  | 类型       | 说明     | 默认值   | 可选值
  :------|:--------- |:-------- |:------- |:-------------- 
   label | `String`，`Number`  | 标签项的标题  |    --   |  --
   name  | `String`，`Number`  | 标签项名称 |   --   |   --

---
#### slot
* tabpane
  | 名称    |  描述        |
  |:----    | :---------- |
  | --      | 自定义内容   |
  | title   | 自定义该标签项的标题，会覆盖tabpane中的label值  |

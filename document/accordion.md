### Accordion - 折叠面板

---
#### 按需引入

```js
import { Accordion, AccordionItem } from '@insaic/neon'
Vue.use(Accordion).use(AccordionItem)
```

#### 例子
- 普通形式

```html
<sq-accordion v-model="active">
  <sq-accordion-item title="选项一" name="1">
    <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
  </sq-accordion-item>
  <sq-accordion-item title="选项二" name="2">
    <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
  </sq-accordion-item>
  <sq-accordion-item title="选项三" name="3">
    <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
  </sq-accordion-item>
</sq-accordion>
```
- 手风琴形式

```html
<sq-accordion v-model="active" accordion>
  <sq-accordion-item title="选项一" name="1">
    <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
  </sq-accordion-item>
  <sq-accordion-item title="选项二" name="2">
    <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
  </sq-accordion-item>
  <sq-accordion-item title="选项三" name="3">
    <div>我是内容</div><div>我是内容</div><div>我是内容</div><div>我是内容</div>
  </sq-accordion-item>
</sq-accordion>
```
---
#### Props
- accordion

 名称      | 类型                         | 说明                                | 默认值   | 可选值      
:--------  |:--------------------------- |:----------------------------------- |:------- |:-------
 value     | `Array`， `String`， `Number` | 展开项，对应accordion-item里的name    | --      | --             
 accordion | `Boolean`                   | 是否为手风琴模式                      | false   | true

- accordion-item

 名称      | 类型                         | 说明                                | 默认值   | 可选值
:--------  |:--------------------------- |:----------------------------------- |:-------  |:-------
 title     | `String`                    | 标题                                | --       | --             
 name      | `String`， `Number`          | 标识名称                             | --       | --          

---

#### Slot
- accordion-item

 名称 |  描述
:---- | :-------
 --   | 自定义内容
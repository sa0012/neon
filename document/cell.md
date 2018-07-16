### Cell - 单元格
---
#### 按需引入

```js
import { Cell, CellGroup } from '@insaic/neon'
Vue.use(Cell).use(CellGroup)
```

#### 例子
```html
<sq-cell-group title="交强险">
  <sq-cell title="交强险" is-link value="投保" @click="show"></sq-cell>
  <sq-cell title="起保时间" is-link></sq-cell>
</sq-cell-group>

<sq-cell-group title="商业险" label="添加更多" @click="addMore">
  <sq-cell title="交强险" is-link value="投保"></sq-cell>
  <sq-cell title="起保时间" is-link></sq-cell>
</sq-cell-group>
```
---
#### Props
 名称        | 类型       | 说明     | 默认值   | 可选值         
:----------- |:--------- |:-------- |:------- |:-------------- 
 label       | `String`  | 标题     |          |                
 placeholder | `String`  | 占位内容  |         |               
 maxlength   | `String`  | 最大值    |         |                
 value       | `*`       | 绑定值    |         |                

---
#### Slot
 名称    |  描述        
:----    | :---------- 
 control | 自定义内容   
 button  | 自定义按钮   
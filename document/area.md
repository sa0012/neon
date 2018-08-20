### Area - 省市区选择
---
#### 按需引入

```js
import { Area } from '@insaic/neon'
Vue.use(Area)
```

::: tip
地区列表数据源参照 <a href="https://github.com/insaic/neon/blob/dev/examples/mock/districts.js" target="_blank">此处</a>
:::

#### 例子
```html
<sq-popup v-model="isShow" position="bottom">
  <sq-area
    :value="code"
    title="选择地区"
    :area-data="areaData"
    :loading="loading"
    @on-confirm="onConfirm"
    @on-cancel="onCancel"
    @on-change="onChange"
  />
</sq-popup>
```
---

#### Props
 参数                 | 类型       | 说明                             | 默认值
:-------              |:----------|:----------                       |:-----
 value                | `String`  | 设置选中的值，如'110113'          |  --  
 title                | `String`  | 标题                             |  ''  
 area-data            | `Object`  | 地区数据源                        |  `{}`  
 loading              | `Boolean` | 是否显示loading状态               |  `false` 
 cancel-button-text   | `String`  | 取消按钮文字                      |  取消 
 confirm-button-text  | `String`  | 确认按钮文字                      |  确认 
 row-height           | `Number`  | 列表数据的行高                    |  34
 row-count            | `Number`  | 每列显示的数量                    |  7

---

#### Event
 名称       | 参数  | 描述             
:---------- |:---- |:------------------ 
 on-cancel | -- | 点击取消按钮执行的事件
 on-confirm | 当前选中项数组，如<br>[{"code":"320000","name":"江苏省"},<br>{"code":"320100","name":"南京市"},<br>{"code":"320102","name":"玄武区"}] | 点击确认按钮执行的事件
 on-change | 同on-confirm | 改变列表项执行的事件

 ::: warning 注意
依照目前的地区数据源，在设置value后，value的值不会根据change后的数据项而改变
:::
### CitySelector - 城市选择

---
#### 按需引入

```js
import { CitySelector } from '@insaic/neon'
Vue.use(CitySelector)
```
#### 例子
```html
<!-- 配合popup使用 -->
<sq-popup v-model="isShow" position="bottom">
  <sq-city-selector
    :province="province"
    province-key="name"
    :city="city"
    city-key="name"
    :county="county"
    county-key="fullname"
    :loading="isLoading"
    @set-province="onSetProvince"
    @set-city="onSetCity"
    @set-county="onSetCounty"
    @close="isShow = !isShow"
  />
</sq-popup>
```

---
#### Props
 名称          | 类型      | 说明                | 默认值 | 可选值
:------       |:--------- |:---------------     |:------|:-----
 province     | `Array`   | 省份列表数据         |   --  |  --
 city         | `Array`   | 城市列表数据         | --    |  --
 county       | `Array`   | 乡镇列表数据         | --    |  --
 province-key | `String`  | 省份项对应显示的key  |  --   |  --
 city-key     | `String`  | 城市项对应显示的key  |  --   |  --
 county-key   | `String`  | 乡镇项对应显示的key  |  --   |  --
 loading      | `Boolean` | 是否显示loading状态  |  --   |  --

---

#### Event
 名称          | 参数                    | 描述             
:-----         |:----                   |:------------------ 
set-province   | { item, index }        | 点击省份后触发事件，item为选择项，index为对应的下标
set-city       | { item, index }        | 点击城市后触发事件，item为选择项，index为对应的下标
set-county     | { item, index, value } | 点击乡镇后触发事件，item为选择项，index为对应的下标，value为当前选中值数组
close          | --                     | 点击关闭按钮触发事件
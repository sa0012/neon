### CarLicense - 车牌录入键盘
---
#### 按需引入

```js
import { CarLicense } from '@insaic/neon'
Vue.use(CarLicense)
```

#### 例子
```html
<sq-carlicense
  :province-name.sync="provName"
  :car-number.sync="carNumber"
  placeholder="请输入车牌号"
/>
```
---
#### Props
 参数                 | 类型       | 说明                                | 默认值 | 可选值 
:-------------------- |:--------- |:-------------------                 |:------ |:----- 
 province-name        | `String`  | 车牌所在地[省份缩写]，支持sync(2.3+)  | --    |        
 car-number           | `String`  | 车牌号[英文和数字]，支持sync(2.3+)    | --    |        
 has-default-province | `Boolean` | 设置默认省份[京]                      | false | true   
 placeholder          | `String`  | 占位内容                             | --    |        
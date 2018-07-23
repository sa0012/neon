### Tag - 标记
---
#### 按需引入

```js
import { Tag } from '@insaic/neon'
Vue.use(Tag)
```

#### 例子
```html
<!-- 基础样式 -->
<sq-tag>标签</sq-tag>
<!-- 主题样式 -->
<sq-tag type="primary">标签</sq-tag>
<!-- 圆角样式 -->
<sq-tag shape="circle">标签</sq-tag>
<!-- 空心样式 -->
<sq-tag plain>标签</sq-tag>
```
---
#### Props
 名称             | 类型       | 说明         | 默认值        |   可选值      
:--------         |:----------|:---------    |:-------       |:------
 type             | `String`  | 样式主题      | default       | primary，success，error
 shape            | `String`  | border的样式  | square（方形） | circle（圆角）
 plain            | `Boolean` | 是否为空心样式 | false         | true
 color            | `String`  | 文本样式      | --            | --
 background-color | `String`  | 背景颜色      | --            | --
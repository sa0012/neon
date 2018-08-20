### Toast - 轻提示
---
#### 按需引入

```js
import { Toast } from '@insaic/neon'
Vue.use(Toast)
```

#### 例子
```js
// text形式使用
this.$toast.text('请输入证件号码', 2000)
// success形式使用
this.$toast.success('操作成功')
// error形式使用
this.$toast.error('操作无效')
// error形式使用
this.$toast.warn('操作警告')
// loading形式使用
this.$toast.loading('加载中...', -1)
// 手动隐藏
this.$toast.hide()
```
---
#### Event
| 名称 | 参数 | 描述 |
|:---- |:--- |:---- |
| text<br>success<br>error<br>loading | text,<br>time,<br>position | **参数一：** 显示的文案<br> **参数二：** 显示时间，默认3000ms，time为-1时不消失，需手动调用hide方法隐藏<br> **参数三：** 显示位置，默认`middle`，还可设置为bottom则位于底部显示 |
| hide | -- | 隐藏toast，一般配合loading使用 |
| iconSize | `String` | 设置icon图标大小 |
| textSize | `String` | 设置提示信息字体大小 |

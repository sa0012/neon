### Toast - 轻提示
简短的消息提示框，支持自定义位置、持续时间。

---

操作提示toast以插件形式调用，类型分为text[纯文字]、success[含成功icon]、error[含失败icon]、loading[含loading icon]。
#### 例子
```js
// text形式使用
this.$toast.text('请输入证件号码', 2000)
// success形式使用
this.$toast.success('操作成功')
// error形式使用
this.$toast.error('操作无效')
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

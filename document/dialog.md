### Dialog - 对话框
---
#### 按需引入

```js
import { Dialog } from '@insaic/neon'
Vue.use(Dialog)
```

对话框dialog以插件形式调用，分为confirm、alert形式。
* #### confirm形式例子  [demo源码](https://github.com/insaic/neon/blob/dev/examples/routers/dialog.vue)
```js
this.$dialog.confirm({
  title: '系统提示',
  message: '<span style="font-size:16px;">您确认删除此车辆及相关信息吗？</span>',
  confirmButtonText: '确认',
  onConfirm: () => {
    // 手动隐藏
    this.$dialog.hide()
  }
})
```
* #### alert形式例子
```js
this.$dialog.alert({
  title: '',
  message: '链接中断！',
  onConfirm: () => {
    // 手动隐藏
    this.$dialog.hide()
  }
})
```

 :::warning 注意
 onConfirm、onCancel需使用箭头函数形式 `=>`，否则会造成this指向不一致问题。
 :::
 
---
#### Props
 参数               | 类型        | 说明                               | 默认值
:--------------     |:---------- |:---------------------------------- |:-------
 title              | `String`   | 标题                                | 系统提示
 message            | `String`   | 内容                                | --
 confirmButtonText  | `String`   | 底部右边按钮文字，alert形式下不显示   | 确定
 cancelButtonText   | `String`   | 底部左边按钮文字                     | 取消
 clickCloseMark     | `Boolean`  | 点击蒙层取消显示对话框               | false
 onConfirm          | `Function` | 底部右边按钮回调函数                 | -- 
 onCancel           | `Function` | 底部左边按钮回调函数                 | -- 

---
#### Event
 名称 | 参数 | 描述
:---- |:--- |:---------
 hide | --  | 隐藏对话框

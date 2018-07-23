### Loadmore - 加载更多

---
#### 按需引入

```js
import { Loadmore } from '@insaic/neon'
Vue.use(Loadmore)
```

#### 例子
按住列表，上拉一定距离（通过 threshold 配置）后释放，被指定为 bottom-fun 的方法就会执行
```html
<div style="overflow:scroll;" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
  <sq-loadmore
    :loading="loading"
    :bottom-fun="getData"
    :is-finished-load="isFinishedLoad"
  >
    <ul class="ul">
      <li class="li" v-for="(index) in list" :key="index" >
        {{ index }}
      </li>
    </ul>
  </sq-loadmore>
</div>
```
::: tip 注意
主内容外层wrapper需设置为固定高度的wrapper
:::

```js
data () {
  return {
    wrapperHeight: 0
  }
},
mounted () {
  this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
}
```
---
#### Props
 名称                 | 类型      | 说明                                                     | 默认值           | 可选值
:------               |:--------- |:---------------                                         |:------          |:-----
 bottom-pull-text     | `String`  | 超出当前内容后，向上滑动文本                              | '↑'              |  --
 bottom-drop-text     | `String`  | 活动超过 threshold 值后显示的文本                         | '↓'             |  --
 bottom-loading-text  | `String`  | 底部加载中文本                                           | 加载中...        |  --
 bottom-finished-text | `String`  | 数据全部加载完成后的文本                                  | '没有更多内容了'  |  --
 bottom-fun           | `Function`| 获取内容的function                                       | --              |  --
 threshold            | `Number`  | 上滑加载内容的阀值                                        | 70              |  --
 loading              | `Boolean` | 是否为获取数据中的状态                                    |  false          |  true
 show-loading-icon    | `Boolean` | 是否显示loadingicon                                      |  true           |  false
 is-finished-load     | `Boolean` | 是否为获取完数据的状态，为真则不会再执行bottom-fun对应的方法 |  false          |  true

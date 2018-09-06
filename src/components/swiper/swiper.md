### Swiper - 轮播

---
#### 按需引入

```js
import { Swiper, SwiperItem } from '@insaic/neon'
Vue.use(Swiper).use(SwiperItem)
```

#### 例子 [demo源码](https://github.com/insaic/neon/blob/dev/examples/routers/swiper.vue)
```html
<!-- 基础形式 -->
<sq-swiper>
  <sq-swiper-item>1</sq-swiper-item>
  <sq-swiper-item>2</sq-swiper-item>
  <sq-swiper-item>3</sq-swiper-item>
  <sq-swiper-item>4</sq-swiper-item>
</sq-swiper>

<!-- 禁止手势切换并定义宽高为200px -->
<sq-swiper :touchable="false" style="width:200px;height:200px;">
  <sq-swiper-item>1</sq-swiper-item>
  <sq-swiper-item>2</sq-swiper-item>
  <sq-swiper-item>3</sq-swiper-item>
  <sq-swiper-item>4</sq-swiper-item>
</sq-swiper>
```
#### Props
 名称            | 类型              | 说明                    | 默认值   | 可选值         
:-----------     |:---------         |:---------------        |:------- |:-------- 
 autoplay        | `String`,`Number` | 自动轮播间隔，单位为 ms  | `3000`  |  --           
 duration        | `String`,`Number` | 动画时长，单位为 ms      | `300`   |  --        
 show-indicators | `Boolean`         | 是否显示指示器           |  `true` |  `false`           
 touchable       | `Boolean`         | 是否可以通过手势滑动     |  `true`  |  `false`           
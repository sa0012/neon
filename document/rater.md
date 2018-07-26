### Rater - 评分
---
#### 按需引入

```js
import { Rater } from '@insaic/neon'
Vue.use(Rater)
```

#### 例子
```html
<template>
  <div class="wrap">
    <div class="rater-wrap">
      <div class="title">set min</div>
      <sq-rater :min="min" @getScore="getScore1">
      </sq-rater>
      <p>评分： {{ score1 }}</p>
    </div>
    <div class="rater-wrap">
      <div class="title">set max</div>
      <sq-rater :max="max" @getScore="getScore2">
      </sq-rater>
      <p>评分： {{ score2 }}</p>
    </div>
    <div class="rater-wrap">
      <div class="title">set value</div>
      <sq-rater :value="value" @getScore="getScore3">
      </sq-rater>
      <p>评分： {{ score3 || value }}</p>
    </div>
    <div class="rater-wrap">
      <div class="title">set fontSize</div>
      <sq-rater :fontSize="fontSize" @getScore="getScore4">
      </sq-rater>
      <p>评分： {{ score4 }}</p>
    </div>
    <div class="rater-wrap">
      <div class="title">set disabled = true</div>
      <sq-rater :disabled="disabled" :fontSize="fontSize">
      </sq-rater>
    </div>
    <div class="rater-wrap">
      <div class="title">set activeColor</div>
      <sq-rater 
      :fontSize="fontSize" 
      :activeColor="activeColor">
      </sq-rater>
    </div>
    <div class="rater-wrap">
      <div class="title">set defaultColor</div>
      <sq-rater 
      :fontSize="fontSize" 
      :defaultColor="defaultColor"
      :activeColor="activeColor">
      </sq-rater>
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  data() {
    return {
      min: 3,
      max: 10,
      fontSize: '40',
      disabled: true,
      value: 2,
      score1: 0,
      score2: 0,
      score3: 0,
      score4: 0
    }
  },

  methods: {
    getScore1(score) {
      this.score1 = score
    },
    getScore2(score) {
      this.score2 = score
    },
    getScore3(score) {
      this.score3 = score
    },
    getScore4(score) {
      this.score4 = score
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #fff;
  color: #666;
  padding-left: 15px;
  margin-bottom: 15px;
}

.rater-wrap {
  margin-bottom: 15px;
}
</style>
```
---
#### Props
| 名称        | 类型       | 说明                | 默认值   | 可选值         |
|:----------- |:--------- |:------------------- |:------- |:-------------- |
| min       | `Number` | 设置最小值   |     0    |               |
| max        | `Number`   | 设置最大值             |   5      |               |
| value        | `Number`   | 设置默认值             |   --      |               |
| fontSize        | `Number`   | 设置字体大小             |   16      |               |
| disabled        | `Number`   | 是否禁用             |   false      |               |
| activeColor        | `String`   | 设置选中时的字体颜色             |   --      |               |
| defaultColor        | `String`   | 设置未选中时的字体颜色             |   --      |               |

---

#### Event
| 名称       | 参数  | 描述                             |
|:---------- |:---- |:-------------------------------- |
| getScore    | score | 返回对应所选的分数 |
### chooseCity
---
#### 按需引入

```js
import { ChooseCity } from '@insaic/neon'
Vue.use(ChooseCity)
```

#### 例子 [demo源码](https://github.com/insaic/neon/blob/dev/examples/routers/chooseCity.vue)
```html
<!--:showCity.sync="showChooseCity"-->
<!--v-model="showChooseCity"-->
<template>
  <div class="choose-city">
    <sq-cell-group title="选择城市">
      <sq-cell title="选择城市" is-link :value="cityData.name" @click.native="chooseCity"></sq-cell>
    </sq-cell-group>
    <div class="address" v-if="showChooseCity">
      <choose-city 
      :showCity.sync="showCity"
      :chooseCityData="chooseCityData" 
      @cityNameCode="getCityData" 
      :currentCity="currentCity"></choose-city>
    </div>
  </div>
</template>

<script>
import chooseCity from '../mock/chooseCity.json'
export default {
  data() {
    return {
      showChooseCity: false,
      chooseCityData: chooseCity.result,
      cityData: {},
      currentCity: '上海'
    }
  },
  methods: {
    chooseCity() {
      this.showChooseCity = !this.showChooseCity
    },
    getCityData (city) {
      this.cityData = city
    }
  }
}
</script>
```

---
#### Props
| 参数              | 类型               | 说明            | 默认值 | 可选值 |
| :-----------      | :---------------  | :-------------- | :---- |:----  |
|  chooseCityData   |       `Object`     |    城市分类     | ----   | ----  |
|  currentCity      |       `String`    |    当前城市     | ----   | ----  |
|  showCity.sync (vue 2.30以上版本， 推荐使用v-model)      |       `Boolean`    |    组件的显示隐藏(或者使用v-model)     | ----   | ----  |

#### Event
| 名称              | 参数        |         描述       | 调用方式 |
| :-----------------| :---       |:----------------   | :------ |
| cityNameCode      | ----       | 返回选中的城市参数   | ---     |

### 城市分类参数要求
```json
{
	"result":{
		"A":[
			{"code":"110100","name":"北京市"},
			{"code":"110200","name":"XX市"}
		],
		"B":[
			{"code":"210100","name":"XXX市"}
		]
	},
	"status":"100"
}
```
### chooseCar
---
#### 按需引入

```js
import { ChooseCar } from '@insaic/neon'
Vue.use(ChooseCar)
```

#### 例子
```html
<!--:showChooseCar.sync="showChooseCar"-->
<!--v-model="showChooseCar"-->
<brand-cars 
  :loadMoreArr="loadMoreArr" 
  :carsData="carsData" 
  :selectCar="selectCar" 
  :selectModel="selectModel" 
  :showChooseCar.sync="showChooseCar"
  @brandCategoryCode="getBrandCategoryCode" 
  @brandModelId="getBrandModelId" 
  @loadMore="getLoadMore"
  @carDetail="getCarDetail"
  @searchOption="getSearchOption"
  @searchLoadMore="getSearchLoadMore"
  >
  <img :src="brandCategoryCode.data | imgUrl" alt="" slot-scope="brandCategoryCode" class="brand-img">
  <img :src="brandCategoryCode | imgUrl" alt="" slot="brandCategoryCode" class="detail-icon">
  <img :src="brandCategoryCode | imgUrl" alt="" slot="selectModelCode" class="model-icon">
</brand-cars>
```

---
#### Props
| 参数              | 类型               | 说明            | 默认值 | 可选值 |
| :-----------      | :---------------  | :-------------- | :---- |:----  |
|  carsData         |       `Array`     |    选车品牌     | ----   | ----  |
|  selectCar        |       `Array`     |    选择车型     | ----   | ----  |
|  selectModel      |       `Array`     |    选择车系     | ----   | ----  |
|  loadMoreArr      |       `Array`     |    选择车系分页数据     | ----   | ----  |
|  showChooseCar.sync (vue 2.30以上版本， 推荐使用v-model)|       `Boolean`     |    组件的显示隐藏(或者使用v-model)     | ----   | ----  |
|  slot-scope       |       --          |    作用于插槽（品牌logo）     | ----   | ----  |
|  brandCategoryCode      |       `slot`     |    车型logo     | ----   | ----  |
|  selectModelCode        |       `slot`     |      车系logo   | ----   | ----  |

#### Event
| 名称              | 参数        |         描述       | 调用方式 |
| :-----------------| :---       |:----------------   | :------ |
| brandCategoryCode | ----       | 获取(categoryCode) | ---     |
| brandModelId      | ----       | 获取(modelCode)    | ---     |
| loadMore          | `callback` | 执行上拉加载回调    | ---     |
| carDetail         | ----       | 获取选择车系详情    | ---     |
| searchOption      | `option callback`       | 接受两个返回参数，option(搜索字符)，callback(回调函数， 将请求回来的数据传入即可)    | ---     |
| searchLoadMore    | `callback`       | 搜索分页函数， 接受一个返回参数， 将分页数据传入即可    | ---     |

### 品牌车型车系参数要求
#### 品牌参数
```json
{
  "result": {
    "A": [{
      "brandCategoryCode": "audi",
      "brandCategoryName": "奥迪",
      "searchCode": "A"
    }
  ]
}
```

#### 车型参数
```json
"result": [{
  "brandId": "402880861203d16701122d764d7a0085",
  "brandPy": null,
  "brandName": "一汽奥迪",
  "brandCategoryCode": "audi",
  "jyVehicleFamilyMOs": [{
      "familyId": "I0000000000000000210000000000018",
      "brandId": "402880861203d16701122d764d7a0085",
      "familyPy": "YQAD100",
      "familyName": "一汽奥迪100"
  }]
```

#### 车系参数
```json
{
  "result": {
    "total": 137,
    "content": [{
      "carYear": "2016",
      "insurerVehicleModelMOs": [{
        "modelCode": "BMAAHD0125",
        "modelName": "宝马BMW7160DF(BMW316i)轿车",
        "carYear": "2016",
        "displayName": "华晨宝马316i AT时尚型标准轴距版 5座 (宝马BMW7160DF(BMW316i)轿车 参考价24.71万)"
      }, {
        "modelCode": "BMAAHD0126",
        "modelName": "宝马BMW7200FF(BMW320i)轿车",
        "carYear": "2016",
        "displayName": "华晨宝马320i AT时尚型标准轴距版 5座 (宝马BMW7200FF(BMW320i)轿车 参考价29.63万)"
      }]
    }, {
      "carYear": "2015",
      "insurerVehicleModelMOs": [{
        "modelCode": "BMAAHD0101",
        "modelName": "宝马BMW7160AL(BMW316Li)轿车",
        "carYear": "2015",
        "displayName": "华晨宝马316Li MT长轴距版 5座 (宝马BMW7160AL(BMW316Li)轿车 参考价25.03万)"
      }, {
        "modelCode": "BMAAHD0102",
        "modelName": "宝马BMW7160BL(BMW316Li)轿车",
        "carYear": "2015",
        "displayName": "华晨宝马316Li AT时尚型长轴距版 5座 (宝马BMW7160BL(BMW316Li)轿车 参考价27.11万)"
      }, {
        "modelCode": "BMAAHD0103",
        "modelName": "宝马BMW7200HL(BMW320Li)轿车",
        "carYear": "2015",
        "displayName": "华晨宝马320Li AT时尚型长轴距版 5座 (宝马BMW7200HL(BMW320Li)轿车 参考价33.11万)"
      }]
    }],
    "pageNumber": 0,
    "pageSize": 20,
    "totalPage": 7
  }
}

```

#### 搜索车型品牌参数
```json
{
  "result": {
    "total": 56,
    "content": [{
        "modelCode": "DZABGD0047",
        "modelName": "大众汽车SVW71417DL轿车",
        "carYear": "2015",
        "displayName": "大众汽车SVW71417DL轿车，朗行230TSI MT舒适版 5座 11.89万"
      },
      {
        "modelCode": "DZABGD0048",
        "modelName": "大众汽车SVW71417DL轿车",
        "carYear": "2015",
        "displayName": "大众汽车SVW71417DL轿车，朗行230TSI MT豪华版 5座 13.19万"
      },
      {
        "modelCode": "DZABGD0049",
        "modelName": "大众汽车SVW71417EL轿车",
        "carYear": "2015",
        "displayName": "大众汽车SVW71417EL轿车，朗行230TSI DSG舒适版 5座 13.29万"
      },
      {
        "modelCode": "DZABGD0050",
        "modelName": "大众汽车SVW71417EL轿车",
        "carYear": "2015",
        "displayName": "大众汽车SVW71417EL轿车，朗行230TSI DSG豪华版 5座 14.59万"
      },
      {
        "modelCode": "DZABGD0045",
        "modelName": "大众汽车SVW71617CM轿车",
        "carYear": "2015",
        "displayName": "大众汽车SVW71617CM轿车，朗行1.6L MT风尚版 5座 9.59万"
      }
    ],
    "pageNumber": 0,
    "pageSize": 20,
    "totalPage": 3
  },
  "errorMessges": null,
  "warningMessage": null,
  "status": "100"
}

```
<template>
  <div>
    <div class="address">
      <brand-cars :code="code" :loadMoreArr="loadMoreArr" :carsData="carsData" :selectCar="selectCar" :selectModel="selectModel" @brandCategoryCode="getBrandCategoryCode" @brandModelId="getBrandModelId" @loadMore="getLoadMore">
        <img :src="brandCategoryCode.data | imgUrl" alt="" slot-scope="brandCategoryCode" class="brand-img">
        <img :src="brandCategoryCode | imgUrl" alt="" slot="brandCategoryCode" class="detail-icon">
        <img :src="brandCategoryCode | imgUrl" alt="" slot="selectModelCode" class="model-icon">
      </brand-cars>
    </div>
  </div>
</template>

<script>
import carsData from '../chooseCar.json';
import selectCar from '../selectCar.json';
import selectModel from '../selectModel.json';

console.log(selectModel.result.content, 233444)
export default {
  name: 'chooseCar',

  data () {
    return {
      showChooseCar: false,
      carsData: carsData.result,
      selectCar: [],
      selectModel: [],
      brandCategoryCode: '',
      code: '',
      loadMoreArr: []
    }
  },

  methods: {
    chooseCar() {
      this.carsData = carsData.result;
      this.showChooseCar = true
    },
    test (code) {
      this.selectCar = selectCar.result
    },
    test1 (brandId, familyId) {
      this.selectModel = selectModel.result.content
    },
    getBrandCategoryCode (code) {
      this.brandCategoryCode = code
      this.test(code)
    },
    getBrandModelId ({ brandId, familyId }) {
      this.test1(brandId, familyId)
    },
    getLoadMore (callback) {
      console.log('this is a loadmore function')
      this.loadMoreArr = selectModel.result.content
      callback(this.loadMoreArr)
    }
  }
}
</script>

<style lang="scss" scoped>
.brand-img {
  width: 20px;
  vertical-align: middle;
  padding-right: 3px;
}

.detail-icon {
  width: 35px;
  vertical-align: middle;
  padding-right: 3px;
  margin-bottom: 4px;
}

.model-icon {
  width: 35px;
  vertical-align: middle;
  padding-right: 3px;
  margin-bottom: 4px;
}
</style>


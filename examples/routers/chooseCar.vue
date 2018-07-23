<template>
  <div>
    <div @click="chooseCar" class="button">选车组件</div>
    <div class="address" v-if="showChooseCar">
      <brand-cars 
        :code="code" 
        :loadMoreArr="loadMoreArr" 
        :carsData="carsData" 
        :selectCar="selectCar" 
        :selectModel="selectModel" 
        @brandCategoryCode="getBrandCategoryCode" 
        @brandModelId="getBrandModelId" 
        @loadMore="getLoadMore"
        @carDetail="getCarDetail"
        >
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
      loadMoreArr: [],
      showChooseCar: false
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
    },
    getCarDetail (detail) {
      console.log(detail)
    },
    chooseCar () {
      this.showChooseCar = !this.showChooseCar
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

.button {
  width: 100%;
  height: 40px;
  border-radius: 3px;
  line-height: 40px;
  text-align: center;
  background: #fff;
}
</style>


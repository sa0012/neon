<template>
  <div>
    <sq-cell-group title="选车组件">
      <sq-cell title="选车组件" is-link :value="modelName" @click.native="chooseCar"></sq-cell>
    </sq-cell-group>
    <!--<div v-if="showChooseCar">-->
      <!--:showChooseCar.sync="showChooseCar"-->
      <!--v-model="showChooseCar"-->
      <brand-cars 
        :loadMoreArr="loadMoreArr" 
        :carsData="carsData" 
        :selectCar="selectCar" 
        :selectModel="selectModel"
        v-model="showChooseCar"
        @brandCategoryCode="getBrandCategoryCode" 
        @brandModelId="getBrandModelId" 
        @loadMore="getLoadMore" 
        @carDetail="getCarDetail"
        @searchOption="getSearchOption"
        @searchLoadMore="getSearchLoadMore">
        <img :src="brandCategoryCode.data | imgUrl" alt="" slot-scope="brandCategoryCode" class="brand-img">
        <img :src="brandCategoryCode | imgUrl" alt="" slot="brandCategoryCode" class="detail-icon">
        <img :src="brandCategoryCode | imgUrl" alt="" slot="selectModelCode" class="model-icon">
      </brand-cars>
    <!--</div>-->

  </div>
</template>

<script>
import carsData from '../mock/chooseCar.json'
import selectCar from '../mock/selectCar.json'
import selectModel from '../mock/selectModel.json'
import searchCar from '../mock/searchCar.json'

console.log(selectModel.result.content, 233444)
export default {
  name: 'chooseCar',

  data() {
    return {
      showChooseCar: false,
      carsData: carsData.result,
      searchCarArr: searchCar.result.content,
      selectCar: [],
      selectModel: [],
      brandCategoryCode: '',
      code: '',
      loadMoreArr: [],
      modelName: '',
      searchLoadMoreArr: []
    }
  },

  methods: {
    test(code) {
      this.selectCar = selectCar.result
    },
    test1(brandId, familyId) {
      this.selectModel = selectModel.result.content
    },
    getBrandCategoryCode(code) {
      this.brandCategoryCode = code
      this.test(code)
    },
    getBrandModelId({ brandId, familyId }) {
      this.test1(brandId, familyId)
    },
    getLoadMore(callback) {
      console.log('this is a loadmore function')
      this.loadMoreArr = selectModel.result.content
      setTimeout(() => {
        callback(this.loadMoreArr)
      }, 200)
      // callback(this.loadMoreArr)
    },
    getSearchLoadMore (callback) {
      this.searchLoadMoreArr = this.searchCarArr
      callback(this.searchLoadMoreArr)
    },
    getCarDetail(detail) {
      console.log(detail)
      this.modelName = detail.modelName
    },
    chooseCar() {
      this.showChooseCar = !this.showChooseCar
    },
    searchCar(option, callback) {
      // if (option === 'aaaa') {
      //   callback([])
      // } else {
      //   callback(this.searchCarArr)
      // }
      callback(this.searchCarArr)
    },
    getSearchOption(option, callback) {
      console.log(option, 1234)
      this.searchCar(option, callback)
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


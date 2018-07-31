<template>
  <div class="choose-city">
    <sq-cell-group title="选择城市">
      <sq-cell title="选择城市" is-link :value="cityData.name" @click.native="chooseCity"></sq-cell>
    </sq-cell-group>
    <div class="address" v-if="showCity">
      <choose-city 
      :chooseCityData="chooseCityData" 
      @cityNameCode="getCityData"
      :showCity.sync="showCity"
      :currentCity="currentCity"></choose-city>
    </div>
  </div>
</template>

<script>
import chooseCity from '../mock/chooseCity.json'
export default {
  data() {
    return {
      chooseCityData: chooseCity.result,
      cityData: {},
      currentCity: '上海',
      showCity: false
    }
  },
  methods: {
    chooseCity() {
      this.showCity = !this.showCity
    },
    getCityData (city) {
      this.cityData = city
    }
  }
}
</script>

<style lang="scss">
  .address {}
</style>



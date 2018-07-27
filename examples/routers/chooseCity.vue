<template>
  <div class="choose-city">
    <sq-cell-group title="选择城市">
      <sq-cell title="选择城市" is-link :value="cityData.name" @click.native="chooseCity"></sq-cell>
    </sq-cell-group>
    <div class="address" v-if="showChooseCity">
      <choose-city :chooseCityData="chooseCityData" @cityNameCode="getCityData" :currentCity="currentCity"></choose-city>
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

<style lang="scss">
  .address {}
</style>



<template>
  <div>
    <div class="address" @click="viewCitySelector()">
      <sq-button class="addr-title">地址选择</sq-button>
      <div class="addr-cont" :class="{selected: province.name, 'not-selected': !province.name}">
        {{province.name ? `${province.name}${city.name}` : '请选择'}}
      </div>
      <i class="iconfont icon-youjiantou1 right-arrow"></i>
    </div>
    <sq-city-selector :visible.sync="showCitySelector" :current-city="currentCity" :callback="citySelectorCallback"  />
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      showCitySelector: false,
      province: {},
      city: {},
      currentCity: ''
    }
  },

  methods: {
    viewCitySelector () {
      this.showCitySelector = true
    },
    citySelectorCallback (data) {
      console.log(data)
      this.province = data.province
      this.city = data.city
      this.currentCity = data.currentCity
    }
  }
}
</script>

<style lang="scss">
</style>

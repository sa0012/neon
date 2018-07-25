<template>
  <div class="demo-page-wrap">
    <sq-button type="primary" size="small" @click="onShow">地址选择</sq-button>
    <p>{{ val }}</p>
    <sq-popup v-model="isShow" position="bottom">
      <sq-city-selector
        :province="province"
        province-key="name"
        :city="city"
        city-key="name"
        :county="county"
        county-key="fullname"
        :loading="isLoading"
        @set-province="onSetProvince"
        @set-city="onSetCity"
        @set-county="onSetCounty"
        @close="isShow = !isShow"
      />
    </sq-popup>
  </div>
</template>

<script>
const data = require('../mock/city.json').result

export default {
  name: '',

  data () {
    return {
      isShow: false,
      isLoading: false,
      province: [],
      city: [],
      county: [],
      val: []
    }
  },

  methods: {
    onShow () {
      this.isShow = !this.isShow
      this.isLoading = true
      this.province = data[0]
      this.isLoading = false
      // axios.post('/h5-api/basic/data/provinces')
      //   .then(response => {
      //     this.province = response.data.result
      //     this.isLoading = false
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
    },
    onSetProvince ({ item, index }) {
      console.log(item)
      console.log(index)
      // this.isLoading = true
      this.city = data[1].filter(element => {
        return element.id.slice(0, 2) + '0000' === item.id
      })
      // this.isLoading = false
      // axios.post(`/h5-api/basic/data/cities/${item.code}`)
      //   .then(response => {
      //     console.log(response)
      //     this.city = response.data.result
      //     this.isLoading = false
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
    },
    onSetCity ({ item, index }) {
      console.log(item)
      console.log(index)
      // this.isLoading = true
      this.county = data[2].filter(element => {
        return element.id.slice(0, 4) + '00' === item.id
      })
      // this.isLoading = false
      // axios.post(`/h5-api/basic/data/counties/${item.code}`)
      //   .then(response => {
      //     console.log(response)
      //     this.county = response.data.result
      //     this.isLoading = false
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
    },
    onSetCounty ({ item, index, value }) {
      console.log(item)
      console.log(index)
      console.log(value)
      this.val = [value.province, value.city, value.county]
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="scss">
</style>

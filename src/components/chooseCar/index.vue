<template>
  <div class="sq-brandCars" ref="menuWrapper">
    <div class="sq-brandCars-menu-wrapper">
      <ul class="sq-brandCars-list">
        <li class="sq-brandCars-item" v-for="(item, index) in brandCategorys" :key="index">
          <h3 class="sq-brandCars-menu-title" :class="item" ref="+ item +">{{item}}</h3>
          <ul class="sq-brandCars-menu-list">
            <li v-for="(car, inx) in carsData[item]" :key="inx" class="sq-brandCars-menu-item" @click="showModel(car.brandCategoryCode, car.brandCategoryName, item)">
              <div class="sq-brandCars-menu-list-item">
                <!--作用域插槽， 可传参-->
                <slot :data="car.brandCategoryCode" class="sq-brandCars-category-img"></slot>
                <span>{{car.brandCategoryName}}</span>
              </div>
            </li>

          </ul>
        </li>
      </ul>
    </div>
    <div class="sq-brandCars-category-rightbar">
      <ul class="sq-brandCars-category-rightbar-list">
        <li v-for="(item, index) in brandCategorys" :key="index" class="sq-brandCars-category-rightbar-item" @click.stop="jumpTitle(item)">{{ item }}</li>
      </ul>
    </div>
    <!--<select-car v-if="showSelectCar" :brandCategoryData="brandCategoryData" :brandFamilies="selectCar"></select-car>-->
    <!-- +++++++++++++++++++++++++++选车系+++++++++++++++++++++++++++ -->
    <div class="sq-selectcar" v-if="showSelectCar">
      <div class="sq-selectcar-cars-wrapper">
        <div class="sq-selectcar-inner" ref="selectCar">
          <div class="sq-selectcar-slide" ref="slide">
            <h3 class="sq-selectcar-carts-first-title">
              <slot name="brandCategoryCode"></slot>
              <span>{{ brandCategoryData.name }}</span>
            </h3>
            <ul class="sq-selectcar-cars-ul">
              <li class="sq-selectcar-cars-list" v-for="items in selectCar" :key="items.brandId">
                <h3 class="sq-selectcar-carts-second-title">{{ items.brandName }}</h3>
                <ul class="sq-selectcar-cars-ul">
                  <li class="sq-selectcar-cars-item" v-for="detail in items.jyVehicleFamilyMOs" :key="detail.familyId">
                    <div class="sq-selectcar-car-list-item border_bottom" @click="jumpChooseCar(detail.brandId, detail.familyId);">{{ detail.familyName }}</div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="sq-selectcar-car-modal" v-if="showSelectCar" @click="closeCarModal"></div>

    <!-- +++++++++++++++++++++++++++++++++选车型+++++++++++++++++++++++++++++++ -->
    <div class="sq-selectmodel" v-if="showSelectModel">
      <div class="sq-selectmodel-icon-title">
        <slot name="selectModelCode"></slot>
        <span>{{ brandCategoryData.name }}</span>
      </div>
      <div class="sq-selectmodel-wrapper">
        <div class="sq-selectmodel-inner" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
          <sq-loadmore :loading="loading" :bottom-fun="loadMore" :is-finished-load="isFinishedLoad">
            <ul class="sq-selectmodel-ul">
              <li class="sq-selectmodel-list" v-for="(item, index) in selectModel" :key="index">
                <h3 class="sq-selectmodel-second-title" v-if="item.carYear">{{ item.carYear }}款</h3>
                <ul class="sq-selectmodel-detail-ul">
                  <li class="sq-selectmodel-detail-item" @click="closeSelectModel()" v-for="detail in item.insurerVehicleModelMOs" :key="detail.modelCode">
                    <div class="sq-selectmodel-car-list-item" v-if="detail.carYear">
                      {{ `${detail.displayName}` }}
                    </div>
                    <div class="sq-selectmodel-car-list-item" v-if="!detail.carYear">
                      {{ ` ${detail.displayName}` }}
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </sq-loadmore>

          <div class="sq-selectmodel-footer" v-if="isShowText">
            <span class="sq-selectmodel-line-left"></span>
            <span class="sq-selectmodel-line-text">不好意思， 没有数据了</span>
            <span class="sq-selectmodel-line-left"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="sq-selectmodel-model-modal" v-if="showSelectModel"></div>
  </div>
</template>

<script>
export default {
  name: 'BrandCars',
  props: {
    carsData: {
      type: Object
    },
    selectCar: {
      type: Array
    },
    selectModel: {
      type: Array
    },
    loadMoreArr: {
      type: Array
    }
  },
  data () {
    return {
      brandCategorys: [],
      titlePos: {},
      brandCategoryData: {},
      showSelectCar: false,
      showSelectModel: false,
      isShowText: false,
      slideHeight: 0,
      start: null,
      lastDistance: 0,
      loading: false,
      wrapperHeight: 0,
      isFinishedLoad: false
    }
  },
  methods: {
    getBrandCategoryArr () {
      this.brandCategorys = Object.keys(this.carsData)
      this.$nextTick(() => {
        this.brandCategorys.forEach(item => {
          let scroll = document.querySelector(`.${item}`).offsetTop
          this.titlePos[item] = scroll
        })
      })
    },
    jumpTitle (item) {
      this.$nextTick(() => {
        let menuWrapper = this.$refs.menuWrapper
        menuWrapper.scrollTop = this.titlePos[item]
      })
    },
    showModel (code, name, item) {
      this.showSelectCar = true
      this.$nextTick(() => {
        document.querySelector('.sq-brandCars').style.overflow = 'hidden'
        // 目标盒子内容总高度 - 窗口可视区域高度
        let clientWidth = document.documentElement.clientWidth || document.body.clientWidth
        this.slideHeight = this.$refs.slide.offsetHeight - clientWidth
      })
      this.brandCategoryData.code = code
      this.brandCategoryData.name = name
      this.brandCategoryData.item = item
      this.$emit('brandCategoryCode', code)
    },
    jumpChooseCar (brandId, familyId) {
      document.querySelector('.sq-brandCars').style.overflow = 'inherit'
      this.showSelectCar = false
      this.showSelectModel = true
      this.$emit('brandModelId', { brandId, familyId })
      try {
        setTimeout(() => {
          if (this.$refs.wrapper) {
            this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
          }
        }, 30)
      } catch (e) {

      }
    },
    closeCarModal () {
      this.showSelectCar = false
      document.querySelector('.sq-brandCars').style.overflow = 'auto'
    },
    closeSelectModel () {
      document.querySelector('.sq-brandCars').style.overflow = 'scroll'
      this.showSelectModel = false
    },
    callback (arr) {
      setTimeout(() => {
        this.selectModel.push(...arr)
        this.loading = false
        if (arr.length <= 0) {
          this.isFinishedLoad = true
        }
      }, 2000)
    },
    loadMore () {
      this.loading = true
      this.$emit('loadMore', this.callback)
    }
  },
  mounted () {
    this.getBrandCategoryArr()
  }
}
</script>

<style lang="sass">
    @import "../../assets/style/components/chooseCar/brandCars/index.scss";
    @import "../../assets/style/components/chooseCar/brandCars/selectCar.scss";
</style>

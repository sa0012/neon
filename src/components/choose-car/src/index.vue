<template>
  <div class="sq-brandCars" ref="menuWrapper" v-if="showChooseCar">
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
                  <li class="sq-selectmodel-detail-item" @click="closeSelectModel(detail)" v-for="detail in item.insurerVehicleModelMOs" :key="detail.modelCode">
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
      isFinishedLoad: false,
      showChooseCar: true
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
    closeSelectModel (detail) {
      document.querySelector('.sq-brandCars').style.overflow = 'scroll'
      this.showSelectModel = false
      this.showChooseCar = false
      this.$emit('carDetail', detail)
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

<style lang="scss">
/*依赖 base 里的动画 */
@import '../../../common/styles/mixins.scss';
.sq-brandCars {
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 333;
  -webkit-overflow-scrolling: touch;
  &-menu-wrapper {
    width: 100%;
    overflow-x: hidden;
  }
  &-list {
    list-style: none;
    padding-left: 0;
    margin-top: 0;
  }
  &-item {
    box-sizing: border-box;
    list-style: none;
  }
  &-menu-title {
    background: #F5F5F5;
    font-weight: 400;
    height: 40px;
    line-height: 40px;
    margin: 0;
    padding: 0;
    padding-left: 15px;
  }
  &-menu-list {
    padding: 0;
    margin: 0;
  }
  &-menu-item {
    @include mix-1px($top: 1);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  &-menu-list-item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 44px;
    line-height: 44px;
    box-sizing: border-box;
    padding-left: 15px;
  }
  &-category-img {
    width: 20px;
    vertical-align: middle;
    padding-left: 3px;
  }
  &-category-rightbar {
    position: fixed;
    top: 20px;
    right: 0px;
    width: 50px;
    text-align: right;
    z-index: 444;
  }
  &-category-rightbar-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  &-category-rightbar-item {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: center;
    color: #007EFF;
    box-sizing: border-box;
  }
}

@media screen and (max-height: 480px) {
  .sq-brandCars {
    &-category-rightbar-item {
      height: 20px;
    }
  }
}

@media screen and (min-height: 560px) {
  .sq-brandCars {
    &-category-rightbar-item {
      height: 22px;
      line-height: 22px;
    }
  }
}

@media screen and (min-height: 640px) {
  .sq-brandCars {
    &-category-rightbar-item {
      height: 27px;
      line-height: 27px;
    }
  }
}

@media screen and (min-height: 667px) {
  .sq-brandCars {
    &-category-rightbar-item {
      height: 28px;
      line-height: 28px;
    }
  }
}

@media screen and (min-height: 736px) {
  .sq-brandCars {
    &-category-rightbar-item {
      height: 31px;
      line-height: 31px;
    }
  }
}

@media screen and (min-height: 812px) {
  .sq-brandCars {
    &-category-rightbar-item {
      height: 35px;
      line-height: 35px;
    }
  }
}

.sq-selectcar {
  position: fixed;
  top: 0;
  right: 0;
  width: 75%;
  height: 100%;
  z-index: 556;
  &-car-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 555;
  }
  &-cars-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 333;
    background: #fff;
    overflow-x: hidden;
    transition-property: transform, -webkit-transform;
    animation: fadeLeft 0.4s ease-out;
    animation-fill-mode: forwards;
  }
  &-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition-property: transform, -webkit-transform;
  }
  &-slide {
    height: auto;
  }
  &-cars-ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  &-cars-list {
    list-style: none;
  }
  &-carts-first-title {
    margin: 0;
    padding: 0;
    padding-left: 15px;
    height: 80px;
    line-height: 80px;
    background: #fff;
    font-size: 18px;
    letter-spacing: 2px;
  }
  &-detail-icon {
    width: 35px;
    vertical-align: middle;
    padding-right: 3px;
    margin-bottom: 4px;
  }
  &-carts-second-title {
    margin: 0;
    padding: 0;
    padding-left: 15px;
    height: 40px;
    line-height: 40px;
    background: #F5F5F5;
    color: #9A9A9A;
    font-weight: 400;
    font-size: 14px;
  }
  &-cars-item {
    padding-left: 15px;
  }
  &-car-list-item {
    margin: 0;
    padding: 0;
    list-style: none;
    height: 44px;
    line-height: 44px;
    box-sizing: border-box;
    position: relative;
    @include mix-1px($top: 1);
    &.checked {
      color: #007EFF;
    }
    &-checked {
      // display: none;
      position: absolute;
      top: 0;
      right: 15px;
      color: #007EFF;
      display: inline-block;
      height: 44px;
      line-height: 44px;
      text-align: right;
      font-size: 16px;
    }
  }
}

.sq-selectmodel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 888;
  animation: fadeInRight 0.8s ease;
  animation-fill-mode: forwards;
  &-model-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 777;
  }
  &-wrapper {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 80px;
    // overflow: auto;
  }
  &-inner {
    width: 100%;
    overflow: scroll;
  }
  &-icon-title {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 80px;
    line-height: 80px;
    padding-left: 15px;
    font-size: 18px;
    letter-spacing: 2px;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 999;
  }
  &-ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  &-list {
    // padding-left: 15px;
    word-break: break-all;
  }
  &-second-title {
    margin: 0;
    padding: 0;
    height: 40px;
    line-height: 40px;
    background: #F5F5F5;
    padding-left: 15px;
    color: #9A9A9A;
    font-weight: 400;
  }
  &-detail-item {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  &-detail-ul {
    margin: 0;
    padding: 0;
    list-style: none;
    padding-left: 15px;
  }
  &-car-list-item {
    padding-top: 8px;
    padding-bottom: 8px;
    padding-right: 15px;
    box-sizing: border-box;
    @include mix-1px($top: 1);
  }
  &-footer {
    width: 100%;
    text-align: center;
    padding: 20px 0;
    font-size: 12px;
    color: #ccc;
  }
  &-line-left {
    width: 50px;
    background: #ccc;
    display: inline-block;
    vertical-align: middle;
    @include mix-1px($top: 1);
  }
}
</style>

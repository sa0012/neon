<template>
  <div class="sq-city-selector">
    <div class="sq-city-selector-close-bar">
      <span class="sq-city-selector-title">{{ title }}</span>
      <i class="sq-icon sq-icon-error" @click="$_close"></i>
    </div>
    <div class="sq-city-selector-column-title-wrap">
      <h4
        class="sq-city-selector-column-title"
        :class="{current: currentTab === index}"
        v-for="(item, index) in 3"
        :key="index"
        @click="toggleCurrentTab(index)"
        v-show="currentTab >= index"
      >
        <span v-show="index === 0">{{ currentProvince ? currentProvince : '请选择' }}</span>
        <span v-show="index === 1">{{ currentCity ? currentCity : '请选择' }}</span>
        <span v-show="index === 2">{{ currentCounty ? currentCounty : '请选择' }}</span>
      </h4>
    </div>
    <div class="sq-city-selector-content">
      <div class="sq-city-selector-loading" v-show="loading">
        <span class="sq-city-selector-loading-icon"></span>
      </div>
      <transition name="sq-slide-right">
        <ul class="sq-city-selector-column" v-show="currentTab === 0" ref="citySelectorColumnRef0">
          <li
            class="sq-city-selector-column-item"
            :class="{current: currentProvince === item[provinceKey]}"
            v-for="(item, index) in province"
            :key="index"
            @click="$_setValue({ item, index, type: 'Province' })"
          >
            {{ item[provinceKey] }}
          </li>
        </ul>
      </transition>
      <transition name="sq-slide-right">
        <ul class="sq-city-selector-column" v-show="currentTab === 1" ref="citySelectorColumnRef1" id="test">
          <li
            class="sq-city-selector-column-item"
            :class="{current: currentCity === item[cityKey]}"
            v-for="(item, index) in city"
            :key="index"
            @click="$_setValue({ item, index, type: 'City' })"
          >
            {{ item[cityKey] }}
          </li>
        </ul>
      </transition>
      <transition name="sq-slide-right">
        <ul class="sq-city-selector-column" v-show="currentTab === 2" ref="citySelectorColumnRef2">
          <li
            class="sq-city-selector-column-item"
            :class="{current: currentCounty === item[countyKey]}"
            v-for="(item, index) in county"
            :key="index"
            @click="$_setValue({ item, index, type: 'County' })"
          >
            {{ item[countyKey] }}
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sq-city-selector',

  props: {
    title: {
      type: String,
      default: '选择地址'
    },
    province: {
      type: Array
    },
    provinceKey: {
      type: String,
      default: 'name'
    },
    city: {
      type: Array
    },
    cityKey: {
      type: String,
      default: 'name'
    },
    county: {
      type: Array
    },
    countyKey: {
      type: String,
      default: 'name'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      currentTab: 0,
      currentProvince: '',
      currentCity: '',
      currentCounty: ''
    }
  },
  methods: {
    $_close () {
      this.$emit('close')
    },
    $_setValue ({ item, index, type }) {
      const map = new Map([ ['province', 0], ['city', 1], ['county', 2] ])

      const lowerCaseType = type.toLocaleLowerCase()
      if (lowerCaseType === 'province' || lowerCaseType === 'city') {
        this.currentTab = map.get(lowerCaseType) + 1
        // 初始化列表位置
        this.$nextTick(() => {
          this.$refs[`citySelectorColumnRef${this.currentTab}`].scrollTop = 0
        })
      }
      this[`current${type}`] = item[this[`${lowerCaseType}Key`]]
      this.$emit(`set-${lowerCaseType}`, {
        item,
        index,
        value: type === 'County'
          ? {
            province: this.currentProvince,
            city: this.currentCity,
            county: this.currentCounty
          }
          : {}
      })
    },
    toggleCurrentTab (index) {
      if (index === 0) {
        this.currentCity = ''
        this.currentCounty = ''
      } else if (index === 1) {
        this.currentCounty = ''
      }
      this.currentTab = index
    }
  }
}
</script>

<style lang="scss">
@import '~@/common/styles/variable';

.sq-slide-left-enter,
.sq-slide-right-leave-active {
  opacity: 0;
  transform: translate(-100%, 0);
}

.sq-slide-left-leave-active,
.sq-slide-right-enter {
  opacity: 0;
  transform: translate(100% 0);
}

.sq-city-selector {
  background: #ffffff;
  position: relative;
  color: #777777;
  &-loading {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #ffffff, $alpha: .8);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-loading-icon {
    display: inline-block;
    box-sizing: border-box;
    width: 1em;
    height: 1em;
    font-size: 36px;
    border: 3px solid transparent;
    border-top-color: $theme-color;
    border-left-color: $theme-color;
    border-bottom-color: $theme-color;
    border-radius: 50%;
    animation: quan .8s infinite linear
  }
  &-column {
    list-style: none;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    height: 308px;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: all .3s linear;
    &:not(:first-of-type) {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
  &-column-item {
    height: 44px;
    line-height: 44px;
    padding: 0px 26px;
    &.current {
      color: $theme-color;
    }
  }
  &-close-bar {
    text-align: center;
    padding: 15px 10px 22px 10px;
    .sq-icon {
      font-size: 24px;
      position: absolute;
      right: 15px;
      top: 12px;
    }
  }
  &-content {
    position: relative;
    height: 308px;
  }
  &-column-title-wrap {
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
  }
  &-column-title {
    display: inline-block;
    font-weight: normal;
    margin: 0 0 0 20px;
    padding-bottom: 10px;
    font-size: 16px;
    box-sizing: border-box;
    &.current {
      color:  $theme-color;
      border-bottom: 1px solid $theme-color;
    }
  }
}
</style>

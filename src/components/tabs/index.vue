<template>
  <div class="sq-tabs-wrapper">
    <div
      class="sq-tabs-header"
      :style="{'position': sticky ? 'fixed' : 'absolute'}"
      ref="tabHeaderWrapper"
    >
      <div
        class="sq-tabs-header-line"
        :style="{
          'transform': tleft, 'width': lineWidth,
          'display': lineDisplay
        }"
      >
      </div>
      <div
        class="sq-tabs-header-item"
        :class="{'sq-tab-active': currentActive === tab.name}"
        @click="handleClick($event, index)"
        v-for="(tab, index) in tabList"
        :key="index"
      >
        {{ tab.label }}
      </div>
    </div>
    <div class="sq-tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sq-tabs',

  props: {
    active: {
      type: [String, Number]
    },
    sticky: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      tleft: `translate(0, 0)`,
      tabList: [],
      currentActive: this.active,
      lineWidth: '0',
      lineDisplay: 'none'
    }
  },

  methods: {
    handleClick (event, index) {
      const navName = this.tabList[index].name
      if (navName === this.currentActive) { return }

      this.currentActive = navName
      const parentLeft = event.srcElement.parentElement.getBoundingClientRect().left
      const targetLeft = event.target.getBoundingClientRect().left
      this.tleft = `translate(${targetLeft - parentLeft}px, 0)`

      this.$emit('click', navName)
    },
    getPane () {
      return this.$children.filter(item => item.$options.name === 'sq-tabpane')
    },
    updateNav () {
      const children = this.getPane()
      if (children.length === this.tabList.length) { return }

      this.tabList = []
      children.forEach((pane, index) => {
        this.tabList.push({
          label: pane.label,
          name: pane.name
        })
      })

      this.lineWidth = (100 / this.tabList.length) + '%'
    }
  },
  mounted () {
    const currentActive = this.currentActive

    if (currentActive) {
      const length = this.tabList.length
      const width = this.$refs.tabHeaderWrapper.clientWidth

      this.tabList.forEach((item, index) => {
        if (currentActive === item.name) {
          this.tleft = `translate(${index * (width / length)}px, 0)`
          this.lineDisplay = 'block'
        }
      })
    }
  }

}
</script>
<style lang="scss">
$theme-color: #4A8FE2;

.sq-tab-active {
  color: $theme-color;
}
.sq-tabs-wrapper {
  position: relative;
  padding-top: 48px;
  .sq-tabs-header {
    z-index: 1;
    box-sizing: border-box;
    display: flex;
    // position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 16px;
    overflow:hidden;
    color: #878787;
    background-color:#fff;
    .sq-tabs-header-line {
      z-index: 1;
      left: 0;
      bottom: 0;
      height: 2px;
      position: absolute;
      background-color: $theme-color;
      transition-duration: 0.2s;
    }
    .sq-tabs-header-item {
      flex:1;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
  }
}
</style>

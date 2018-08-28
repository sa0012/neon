<template>
  <div class="neon-doc-simulator" v-show="$page.path !== '/'">
    <div class="neon-doc-simulator__nav">
      <div class="neon-doc-simulator__navbar">
        <neon-narbar :title="title"></neon-narbar>
      </div>
    </div>
    <div class="neon-doc-iframe-wrap">
      <iframe :src="iframeSrc" frameborder="0" width="100%" height="100%"></iframe>
    </div>
  </div>
</template>

<script>
import NeonNarbar from './NeonNarbar.vue'
import menu from '../../../examples/menu.js'

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://insaic.github.io/neon/examples/#' : `http://${window.location.hostname}:8999/#`

export default {
  name: 'Simulator',

  components: {
    NeonNarbar
  },

  data () {
    return {
      hash: '/',
      title: ''
    }
  },

  computed: {
    iframeSrc () {
      return `${baseUrl}${this.hash}`
    }
  },

  watch: {
    '$route': {
      handler (to, from) {
        const docCurrentPath = this.$page.path.replace('.html', '')

        const oldTitle = this.title

        const path = docCurrentPath.replace('/', '')
        let inExampleMenu = false
        Object.values(menu).forEach(arr => {
          arr.forEach(item => {
            if (item.to === path) {
              this.title = item.name
              inExampleMenu = true
            }
          })
        })
        if (inExampleMenu) {
          this.hash = docCurrentPath
        } else {
          this.hash = '/'
        }

        if (oldTitle === this.title) {
          this.title = ''
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="stylus">
.neon-doc-simulator
  z-index 1
  overflow hidden
  position fixed
  border-radius 6px
  background #f2f2f4
  box-sizing border-box
  right 40px
  width 360px
  min-width 360px
  top 50%
  transform translateY(-50%)
  margin-top -30px
  height 704px
  background url(./iphoneX.png) no-repeat 0 0/cover

.neon-doc-simulator
  &__nav
    position relative
    height 106px
  &__navbar
    width 314px
    margin 0 auto
    position absolute
    bottom 0
    left 0
    right 0
    border 1px solid #efeff4
    box-sizing border-box
    background-color #EDF0F4
  iframe
    width 0
    max-width 100%
    min-width 100%
    width 100%
    display block
    border 1px solid #efeff4
    box-sizing border-box

.neon-doc-iframe-wrap
  height 580px
  box-sizing border-box
  border-radius 0 0 35px 35px
  width 314px
  overflow hidden
  margin 0px auto

::-webkit-scrollbar
  width 10px
  height 10px

::-webkit-scrollbar-track-piece
  background-color transparent
  border-radius 6px
  -webkit-border-radius 6px

.sidebar::-webkit-scrollbar-thumb
  background-color transparent
  height 12px

.sidebar:hover::-webkit-scrollbar-thumb
  background-color hsla(0,0%,49%,.3)

.page::-webkit-scrollbar-thumb
  background-color hsla(0,0%,49%,.5)
  height 12px

.page:hover::-webkit-scrollbar-thumb
  background-color hsla(0,0%,49%,.5)

::-webkit-scrollbar-thumb:vertical
  height 12px

::-webkit-scrollbar-thumb:horizontal,::-webkit-scrollbar-thumb:vertical
  background-color transparent
  border-radius 6px
  -webkit-border-radius 6px

::-webkit-scrollbar-thumb:horizontal
  width 12px

@media (max-width: 1120px)
  .theme-container
    .page
      padding-right 1rem

  .neon-doc-simulator
    display none
</style>

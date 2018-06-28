<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      show: false
    }
  }
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
body {
  background-color: #f8f8f8;
  // padding: 20px;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  -webkit-tap-highlight-color: transparent;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* margin-top: 20px; */
  height: 100%;
}
.demo-page-wrap {
  padding: 20px;
  min-height: 100%;
  box-sizing: border-box;
  background-color: #ECEFF9;
}
</style>

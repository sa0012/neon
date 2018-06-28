<template>
  <div class="hello">
    <h3 style="margin:0;text-align:center;">{{ msg }}</h3>
    <div style="overflow:scroll;" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <sq-loadmore
        :loading="loading"
        :bottom-fun="getData"
        :is-finished-load="isFinishedLoad"
      >
        <ul>
          <li v-for="(index) in list" :key="index" >
            {{ index }}
          </li>
        </ul>
      </sq-loadmore>
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  created () {
    this.list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },

  data () {
    return {
      loading: false,
      msg: '此例请用手机查看',
      list: [],
      wrapperHeight: 0,
      isFinishedLoad: false
    }
  },

  methods: {
    getData () {
      this.loading = true
      let arr = []
      const lastData = this.list.slice(-1)[0]
      for (let i = 1; i < 6; i++) {
        arr.push(lastData + i)
      }
      setTimeout(() => {
        this.list = [...this.list, ...arr]
        this.loading = false
        if (this.list.slice(-1)[0] > 25) {
          this.isFinishedLoad = true
        }
      }, 2000)
    }
  },

  mounted () {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* h1, h2 {
  font-weight: normal;
  margin: 0;
  background: bisque;
}*/
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
li {
  display: block;
  margin: 0;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  /* background: 0px 0px / cover no-repeat; */
}
img {
  width: 100%;
  height: 400px;
}
a {
  color: #42b983;
}

/* .is-transition {
  transition: transform 0.3s linear;
} */
</style>

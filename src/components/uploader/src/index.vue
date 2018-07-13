<template>
  <div class="sq-uploader">
    <div class="sq-uploader-mask" v-show="isShowFile" @click="isShowFile = !isShowFile">
      <span class="sq-uploader-full-item" :style="{'backgroundImage': fullFileUrl}"></span>
      <div class="sq-uploader-full-remove">X</div>
    </div>
    <ul class="sq-uploader-files" @click="$_click"></ul>
    <div class="sq-uploader-input-wrap">
      <input
        class="sq-uploader-input"
        type="file"
        accept="image/*"
        multiple
        v-bind="$attrs"
        v-on="$listeners"
        @change="$_change"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'sq-uploader',

  inheritAttrs: false,

  data () {
    return {
      isShowFile: false,
      fullFileUrl: ''
    }
  },

  methods: {
    $_click (e) {
      if (e.target.nodeName.toLocaleLowerCase() === 'li') {
        this.fullFileUrl = e.target.style.backgroundImage
        this.isShowFile = true
      }
    },
    $_change (e) {
      let src
      const url = window.URL || window.webkitURL || window.mozURL
      const files = e.target.files
      for (let i = 0, len = files.length; i < len; i++) {
        let file = files[i]

        if (url) {
          src = url.createObjectURL(file)
          url.revokeObjectURL(file)
        } else {
          src = e.target.result
        }
        const element = document.createElement('li')
        element.classList.add('sq-uploader-file')
        element.style = `background-image:url(${src})`
        e.target.parentNode.previousElementSibling.appendChild(element)
      }
    }
  }
}
</script>

<style lang="scss">
$prefixCls: sq-uploader;

.#{$prefixCls} {
  overflow: hidden;
  &-mask {
    background: #000;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    overflow: hidden;
  }
  &-full-item {
    display: block;
    width: 100%;
    height: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    transform: translateY(-60px);
  }
  &-full-remove {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
    font-size: 22px;
    transform: translateY(-60px);
  }
  &-files {
    list-style: none;
  }
  &-file {
    float: left;
    width: 80px;
    height: 80px;
    display: block;
    margin-right: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  &-input-wrap {
    float: left;
    width: 80px;
    height: 80px;
    display: block;
    margin-right: 10px;
    margin-bottom: 10px;
    border: 1px solid #D9D9D9;
    position: relative;
    box-sizing: border-box;
    &::before {
      content: '';
      position: absolute;
      left: 20px;
      right: 20px;
      top: 50%;
      height: 2px;
      transform: translate(0, -50%);
      background-color: #D9D9D9;
    }
    &::after {
      content: '';
      position: absolute;
      top: 20px;
      bottom: 20px;
      left: 50%;
      width: 2px;
      transform: translate(-50%, 0);
      background-color: #D9D9D9;
    }
  }
  &-input {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
</style>

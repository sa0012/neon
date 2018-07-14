<template>
  <div class="sq-uploader">
    <div class="sq-uploader-mask" v-show="isShowFile" @click="isShowFile = !isShowFile">
      <span class="sq-uploader-full-item" :style="{'backgroundImage': fullFileUrl}"></span>
      <div class="sq-uploader-full-remove">
        <i class="iconfont icon-error"></i>
      </div>
    </div>
    <ul class="sq-uploader-files" @click="$_click"></ul>
    <div class="sq-uploader-input-wrap">
      <input
        class="sq-uploader-input"
        type="file"
        v-bind="$attrs"
        v-on="listeners"
        :accept="accept"
        :multiple="multiple"
        @change="$_change"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'sq-uploader',

  inheritAttrs: false,

  props: {
    accept: {
      type: String,
      default: 'image/*'
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    listeners () {
      return {
        ...this.$listeners
      }
    }
  },

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

        const elementDelWrap = document.createElement('span')
        elementDelWrap.classList.add('sq-uploader-file-delete-wrap')

        const elementDel = document.createElement('i')
        elementDel.classList.add('iconfont')
        elementDel.classList.add('icon-error')
        elementDel.classList.add('sq-uploader-file-delete')

        elementDelWrap.appendChild(elementDel)
        element.appendChild(elementDelWrap)
        e.target.parentNode.previousElementSibling.appendChild(element)
      }
      this.$emit('file-change', files)
    }
  }
}
</script>

<style lang="scss">
$prefixCls: sq-uploader;

.#{$prefixCls} {
  display: inline-block;
  // overflow: hidden;
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
    i {
      font-size: inherit;
    }
  }
  &-files {
    display: inline;
    list-style: none;
  }
  &-file {
    float: left;
    width: 80px;
    height: 80px;
    display: block;
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
  &-file-delete-wrap {
    background-color: #e24a50;
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    margin-top: -8px;
    margin-right: -6px;
    padding: 2px;
    height: 20px;
    border-radius: 50%;
    box-sizing: border-box;
  }
  &-file-delete {
    color: #fff;
    font-size: 16px;
    display: inline-block;
    margin-top: -1px;
  }
  &-input-wrap {
    float: left;
    width: 80px;
    height: 80px;
    display: block;
    margin-top: 10px;
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

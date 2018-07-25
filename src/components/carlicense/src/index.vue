<template>
  <div ref="keyboardWrapper" class="sq-carlicense">
    <div class="sq-carlicense-wrapper" v-show="!$slots.input">
      <span class="sq-carlicense-province" @click="clickProvinceNameHandle">
        {{ provinceName }}
      </span>
      <div
        class="sq-carlicense-energy"
        :class="{'sq-carlicense-has-energy-text': hasEnergyText}">
        <span
          class="sq-carlicense-number"
          :data-content="placeholder"
          :class="{
            'sq-carlicense-blink-blur':keyBoardDisplay === 'none',
            'sq-carlicense-hidden-placeholder':carNumber
          }"
          @click="showEnNumberBoard"
        >{{carNumber}}</span>
      </div>
      <i
        class="sq-icon sq-icon-error-full sq-carlicense-keyboard-icon-delete"
        @click="cliackDeleteHandle"
        v-show="isShowDelIcon"
      ></i>
    </div>
    <transition name="ry-slide-bottom">
      <div class="sq-carlicense-province-wrapper" v-show="provinceDisplay === 'block'" @click="getProvince($event)">
        <p class="sq-carlicense-close-btn">
          <a
            class="sq-carlicense-close-btn-text"
            @click="provinceDisplay = 'none'"
          >关闭</a>
        </p>
        <ul
          class="sq-carlicense-row-wrapper"
          v-for="(rowProvince, index) in provinceList"
          :key="index">
          <li
            class="sq-carlicense-row-wrapper-item"
            :class="{'sq-carlicense-disabled': !province}"
            v-for="province in rowProvince"
            :key="province"
          >{{ province }}</li>
        </ul>
      </div>
    </transition>
    <transition name="ry-slide-bottom">
      <div class="sq-carlicense-en-num-wrapper" v-show="keyBoardDisplay === 'block'" @click="getContent($event)">
        <p class="sq-carlicense-close-btn">
          <a class="sq-carlicense-close-btn-text" @click="closeEnNumKeyboard($event)">
            {{ closeBtnText }}
          </a>
        </p>
        <ul
          class="sq-carlicense-row-key"
          v-for="(item, index) in keyboardList"
          :key="index">
          <template v-if="index === 0">
            <li
              class="sq-carlicense-row-key-item"
              v-for="(item, index) in item"
              :key="'num-' + index"
              :class="{ 'sq-carlicense-disabled': isNumKeyDisabled }"
            >{{ item }}</li>
          </template>
          <template v-else-if="index === 1">
            <li class="sq-carlicense-row-key-item" v-for="(item, index) in item" :key="'firstRow-' + index">{{ item }}</li>
            <li class="sq-carlicense-row-key-item" :class="{ 'sq-carlicense-disabled': isEnKeyDisabled }">I</li>
            <li class="sq-carlicense-row-key-item" :class="{ 'sq-carlicense-disabled': isEnKeyDisabled }">O</li>
            <li class="sq-carlicense-row-key-item">P</li>
          </template>
          <template v-else-if="index === 2">
            <li class="sq-carlicense-row-key-item" v-for="(item, index) in item" :key="'secondRow-' + index">{{ item }}</li>
          </template>
          <template v-else-if="index === 3">
            <li class="sq-carlicense-row-key-item sq-carlicense-uppercase sq-carlicense-disabled sq-icon sq-icon-keyboard-xiangshang"></li>
            <li class="sq-carlicense-row-key-item" v-for="(item, index) in item" :key="'threeRow-' + index">{{ item }}</li>
            <li class="sq-carlicense-row-key-item sq-carlicense-del sq-icon sq-icon-keyboard-delete"></li>
          </template>
        </ul>
      </div>
    </transition>
    <div class="sq-carlicense-keyboard-tip" v-if="isShowTip" :style="{'left': tipPosX, 'top': tipPosY}">{{ tipText }}</div>
  </div>
</template>

<script>
export default {
  name: 'sq-carlicense',

  props: {
    provinceName: {
      type: String,
      required: true
    },
    carNumber: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    closeButtonText: {
      type: String,
      default: '关闭'
    }
  },

  mounted () {
    this.$nextTick(() => {
      document.addEventListener('click', this.closeAllKeyboard, false)
    })
  },

  data () {
    return {
      closeBtnText: this.closeButtonText,
      isShowTip: false,
      tipText: '',
      tipPosX: '0',
      tipPosY: '-100px',
      provinceList: [
        ['京', '津', '冀', '晋', '蒙', '辽', '吉', '黑'], ['沪', '苏', '浙', '皖', '闽', '赣', '鲁', '豫'],
        ['鄂', '湘', '粤', '桂', '琼', '渝', '川', '贵'], ['云', '藏', '陕', '甘', '青', '宁', '新', '']
      ],
      keyboardList: [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], ['Q', 'W', 'E', 'R', 'T', 'Y', 'U'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
      ],
      isNumKeyDisabled: true, // 设置数字键盘是否含disabled样式属性
      isEnKeyDisabled: false, // 设置英文键盘是否含disabled样式属性
      provinceDisplay: 'none', // 设置省份键盘是否显示 的 display 属性
      keyBoardDisplay: 'none', // 设置数字英文键盘是否显示的 display 属性
      isShowDelIcon: false, // 是否显示删除图标
      hasEnergyText: false // 是否显示新能源文字提示
    }
  },

  methods: {
    closeAllKeyboard (event) {
      if (!this.$refs.hasOwnProperty('keyboardWrapper') || !this.$refs.keyboardWrapper) {
        return
      }
      const isContains = this.$refs.keyboardWrapper.contains(event.target)
      if (!isContains) {
        this.keyBoardDisplay !== 'none' && (this.keyBoardDisplay = 'none')
        this.provinceDisplay !== 'none' && (this.provinceDisplay = 'none')
      }
    },

    closeEnNumKeyboard (event) {
      this.keyBoardDisplay = 'none'
      event.stopPropagation()
    },

    cliackDeleteHandle () {
      this.$emit('update:carNumber', this.carNumber.slice(0, 1))
    },

    clickProvinceNameHandle () {
      this.showProvinceKeyBoard()
    },

    showProvinceKeyBoard () {
      this.provinceDisplay !== 'block' && (this.provinceDisplay = 'block')
      this.keyBoardDisplay !== 'none' && (this.keyBoardDisplay = 'none')
    },

    showEnNumberBoard () {
      this.keyBoardDisplay !== 'block' && (this.keyBoardDisplay = 'block')
      this.provinceDisplay !== 'none' && (this.provinceDisplay = 'none')
    },

    getProvince (event) {
      event.stopPropagation()

      const nodeName = event.target.nodeName.toLocaleLowerCase()
      const isDisabled = event.target.className.indexOf('sq-carlicense-disabled') !== -1

      if (isDisabled) return

      if (nodeName === 'li') {
        const text = event.target.innerText

        this.$emit('update:provinceName', text)
        this.$emit('update:carNumber', '')

        this.$emit('set-province', text)
        this.showEnNumberBoard()
      }
    },

    getContent (event) {
      event.stopPropagation()
      const nodeName = event.target.nodeName.toLocaleLowerCase()
      const isDisabled = event.target.className.indexOf('sq-carlicense-disabled') !== -1
      const isDel = event.target.className.indexOf('sq-carlicense-del') !== -1

      if (isDel) {
        this.$emit('update:carNumber', this.carNumber.slice(0, -1))
        return
      }

      if (nodeName === 'li') {
        if (isDisabled) { return }

        const textContent = event.target.textContent
        const position = event.target.getBoundingClientRect()

        this.tipText = textContent
        this.tipPosX = (position.left < 10
          ? 12
          : (textContent === '0' || textContent === 'P' || textContent === 'L' ? (position.left - 8) : position.left)) - 10 + 'px'
        this.tipPosY = position.top - 56 + 'px'
        this.isShowTip = true
        window.setTimeout(() => {
          this.isShowTip = false
          this.tipText = ''
        }, 250)

        if (this.carNumber.length < 7) {
          this.$emit('update:carNumber', this.carNumber + event.target.innerText)
        }
      }

      if (this.keyBoardDisplay === 'none') {
        this.showEnNumberBoard()
      }
    }
  },

  watch: {
    carNumber: {
      handler () {
        if (this.carNumber.length === 0) {
          !this.isNumKeyDisabled && (this.isNumKeyDisabled = true)
          this.isEnKeyDisabled && (this.isEnKeyDisabled = false)
          this.isShowDelIcon && (this.isShowDelIcon = false)
        }

        if (this.carNumber.length > 0) {
          this.isNumKeyDisabled && (this.isNumKeyDisabled = false)
          !this.isEnKeyDisabled && (this.isEnKeyDisabled = true)
          this.carNumber.length > 1 && !this.isShowDelIcon && (this.isShowDelIcon = true)
          this.carNumber.length === 1 && this.isShowDelIcon && (this.isShowDelIcon = false)
        }

        // this.carNumber 为 第2 到 第8位
        // 严格校验新能源车牌号码的约束规则：
        // 沪【第1位】  A【第2位】  D【第3位】  K【第4位】   1【第5位】   2【第6位】   3【第7位】   4【第8位】
        // 当第3位为D/F时，第4位可字母和数字，第5-8位必须纯数字；
        // 当第8位为D/F时，第3-7位必须纯数字；
        if (this.carNumber.length === 7 && (/[A-Z][DF][0-9A-Z]\d{4}/.test(this.carNumber) || /[A-Z]\d{5}[DF]/.test(this.carNumber))) {
          this.hasEnergyText = true
        } else {
          this.hasEnergyText && (this.hasEnergyText = false)
        }

        if (this.carNumber.length === 6 || this.carNumber.length === 7) {
          this.closeBtnText !== '完成' && (this.closeBtnText = '完成')
        } else {
          this.closeBtnText === '完成' && (this.closeBtnText = this.closeButtonText)
        }
      },
      immediate: true
    }
  },

  beforeDestroy () {
    document.removeEventListener('click', this.closeAllKeyboard)
  }
}
</script>

<style lang="scss">
/*以来 base 里的动画*/
$prefixCls: sq-carlicense;

.#{$prefixCls} {
  color: #000;
  line-height: initial;
  &-close-btn {
    text-align: right;
    display: block;
    background-color: #CAD1D9;
    margin: 0;
    &-text {
      display: inline-block;
      height: 100%;
      padding-right: 12px;
      padding-bottom: 6px;
      padding-top: 10px;
      padding-left: 12px;
      color: #2196F3;
      font-size: 14px;
    }
  }
  // ---输入框 start----
  &-wrapper {
    box-sizing: border-box;
    font-size: 0px;
    height: 48px;
    line-height: 48px;
    background-color: #FFFFFF;
    position: relative;
    color: #878787;
    border-radius: 4px;
  }
  &-province {
    width: 28px;
    height: 36px;
    display: inline-block;
    position: relative;
    font-size: 14px;
    top: 6px;
    color: #498FE2;
    line-height: 16px;
    box-sizing: border-box;
    border: 1px solid #498FE2;
    margin-right: 10px;
    padding: 9px 6px;
    border-radius: 4px;
    background-color: #F6F9FD;
    vertical-align: top;
    &::after {
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
      border-top: 3px solid transparent;
      border-left: 3px solid transparent;
      border-bottom: 3px solid #498FE2;
      border-right: 3px solid #498FE2;
      position: absolute;
      bottom: 3px;
      right: 3px;
    }
  }
  &-energy {
    display: inline-flex;
    position: relative;
    height: 100%;
    vertical-align: top;
    &::after {
      content: '新能源';
      display: none;
      font-size: 12px;
      background-color: #ecf4eb;
      color: #30c194;
      height: 14px;
      line-height: 14px;
      border-radius: 4px;
      padding: 2px 4px;
      position: absolute;
      left: 71px;
      top: 14px;
    }
    &.#{$prefixCls}-has-energy-text {
      &::after {
        display: inline-block;
      }
    }
  }
  &-number {
    border-top: 0;
    border-bottom: 0;
    border-right: 0;
    border-left: 0;
    font-size: 14px;
    color: #333333;
    box-sizing: border-box;
    width: 150px;
    height: 100%;
    &::before {
      content: attr(data-content);
      display: inline-block;
      position: absolute;
      left: 0;
      right: 0;
      top: -1px;
      color: #878787;
    }
    &::after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 16px;
      transform: translateY(2px);
      animation: blink 1s infinite steps(1, start);
      background-color: black;
    }
  }
  &-hidden-placeholder.#{$prefixCls}-number {
    &::before {
      opacity: 0;
    }
  }
  &-blink-blur.#{$prefixCls}-number {
    &::after {
      display: none;
    }
  }
  &-keyboard-icon-delete {
    color: #AAAAAA;
    width: 1em;
    height: 1em;
    font-size: 20px;
    margin: 12px 10px;
    display: inline-block;
    position: absolute;
    right: 10px;
  }
  // ---输入框 end----
  &-keyboard-tip {
    box-sizing: border-box;
    position: fixed;
    background: white;
    margin: 0 auto;
    width: 50px;
    height: 54px;
    line-height: 54px;
    color: #418af9;
    font-size: 28px;
    text-align: center;
    vertical-align: middle;
    border-radius: 10px;
    border: 1px solid #cccccc;
    box-shadow: 0 1px 2px #DDDDDD;
    z-index: 999;
    top: -100px;
  }
  // ---省份选择 start----
  &-province-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    min-height: 184px;
    background-color: rgb(202, 209, 217);
    user-select: none;
  }
  &-row-wrapper {
    background-color: #CAD1D9;
    padding-top: 8px;
    text-align: center;
    font-size: 0;
    display: flex;
    padding-left: 4px;
    padding-right: 4px;
    &-item {
      flex: 1;
      font-size: 20px;
      display: inline-block;
      background-color: #FFFFFF;
      border-radius: 4px;
      padding: 4px 6px;
      margin-left: 3px;
      margin-right: 3px;
      line-height: initial;
      height: initial;
      text-align: center;
      border: 0;
      box-sizing: border-box;
      &:active, &:focus {
        background-color: #A8AEBC;
        color: #DCDFE4;
        outline: none;
      }
    }
    &:last-child {
      padding-bottom: 8px;
      :last-child {
        background-color: transparent;
      }
    }
  }
  // ---省份选择 end----
  // ---英文 数字 keybord start----
  &-en-num-wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    user-select: none;
  }
  &-row-key {
    background-color: #CAD1D9;
    padding-top: 8px;
    text-align: center;
    font-size: 0;
    display: flex;
    padding-left: 4px;
    padding-right: 4px;
    &-item {
      flex: 1;
      font-size: 20px;
      display: inline-block;
      background-color: #FFFFFF;
      border-radius: 4px;
      width: 20px;
      padding: 4px 4px;
      margin-left: 2px;
      margin-right: 2px;
      line-height: initial;
      height: initial;
      text-align: center;
      border: 0;
      box-sizing: border-box;
      &.#{$prefixCls}-uppercase {
        margin-right: 4px;
      }
      &.#{$prefixCls}-del {
        color: #2c3e50;
        font-size: 22px;
        background-color: transparent;
        box-sizing: border-box;
        width: 30px;
        &:active, &:focus {
          background-color: #FFFFFF;
          color: #2c3e50;
          outline: none;
        }
      }
      &.#{$prefixCls}-disabled {
        color: #CCCCCC;
        &:active, &:focus {
          background-color: #FFFFFF;
          color: #CCCCCC;
          outline: none;
        }
      }
      &:active, &:focus {
        background-color: #A8AEBC;
        color: #DCDFE4;
        outline: none;
      }
    }
    &:last-child {
      padding-bottom: 8px;
    }
  }
  // ---英文 数字 keybord end----
}
</style>

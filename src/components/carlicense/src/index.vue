<template>
  <div ref="keyboardWrapper" class="sq-carlicense">
    <div class="sq-carlicense-wrapper" v-show="!$slots.input">
      <span class="sq-carlicense-province" @click="clickProvinceNameHandle">
        {{ provinceName }}
      </span>
      <div
        class="sq-carlicense-energy"
        :class="{'sq-carlicense-has-energy-text': hasEnergyText}"
      >
        <span
          class="sq-carlicense-number"
          :data-content="placeholder"
          :class="{
            'sq-carlicense-blink-blur':keyBoardDisplay === 'none',
            'sq-carlicense-hidden-placeholder':carNumber
          }"
          @click="showEnNumberBoard"
        >
          {{carNumber}}
        </span>
      </div>
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAABK9JREFUWAnNmU9IVEEcx33bShqSilEkEkJ26t/BWxEEhVcr0sCDgrpKWnTIQ11a7dKlDqUV7iqSdCiNTLwJBXXrIFJ5tCiEDSNwBXE9xG7f7+vN473ZmX3vbevWwGNmfvP7/eYz/2dnjZI8w+jo6EHDMJozmUwj4lq4qUWacQnyCUQJ5BNILyCe7e3t/cyyoMEIYjA5Obk3lUpdgc15fEeC2EJ3Cd9MeXn5SHt7+w+/tr4Ap6amKtbX16+n0+kBOK7w61yjtxEKhe5WVlbea21t3dDo2GJPwHg8fgFD9AjfPtuqAAkM/Sq+vkgk8jKXu5CuEEAG4KKIX+ArKBzrpE/6turQdpSyAENavra29gR+WnQNKLB8urq6ugNDnpL9ZvUgWmUUGY5MLayTdcuAO2RBXV1dFIr9srwI+cOLi4uZubm5t866XMTWguCcc8kxmZOQ3UfM7aEN6ZNOJz7Tm7Afhu5X2HObapLtUJ7Bd9G5cGwQbiXJZHIZxvKCWCktLT3d2dn5hQ5RHkJDYoi75Apy5H+Gw+GzXV1dH4QONvo7SN8QeREDcLWqqqpBbEH2HOQ+p4CjXYuAYwYO0mhhBPE48z7CT+x7Z5xwtMHJchPRvGxPBrIIuQnIE8LahIXcjAGRgKP3LiEykGd8Qppw0P0o+2AefmZUcrKQiWUm4NbW1lWks04ItKaGQ69y4gMyJ5zls17lG7IK60j9AwiQcxrFnVj+Iyi356pTLwekJ9z4+Phx+GXH6AIXUonBWwniZZ2WJX/c09PTTyCVHhuAhRNHzIXjCQfVYxjG19Ddo/LnkDWEUSmvTA6ZMnk5FotxBSshCY4QgU4SC2JSN+foOQAc52hzGI4blUjZQk9ImPC2ow1B4OiEbCFQmpdMrVd3ASEfwlA5J92q7lxQOFqTjas4CCDtAkPmA8eKEGpD6I2ggDT0DfkXcBxiswdZYT6hZWJios7LEJV0QMdrtSrdcPFxDvIHTtBgbiU4Ale8DLGiB1CH32NRdvedczAooOc+56yFveDzWHSaiXSCczAIYCA4UUu+kGTjEC8IRx6xJxxOpQNwqtyC8oEkG3tw1gOMxZ5wXK3QW8i1TwaFJJvZWrT8E5zrfohv4rJ5Qr7PkVoEayt5g3yNJfM8u9GQp9BtEz4U8RKuekfN6xZa9kqhIEQPAsLRLuc+yZ6ETh++X1TWBPOuaAKWlZUNQ0n5Kx/OvmkciIPf2XNO1ZyQ6J11KCedBo70Bp9ImDcB+VbC5wiHgp3EPDDvZbbASiiGVVZhXgsJ+1MoV27gZBHvNyYgPfGtBL21yrQUmqwfOLaYl03c53Q9Z+tZiSxInECH0PBnsiLzZCCLKHNtCWgV32GyfnZayvMw5ryohw5vwruEE5/xO+gRaj++a/h243MF+Nf/7BSagIyidwZFvpgxhnYQp86Qs05XD7IAvWNgC3iOZLHeZQTPNH5WXGIvCgFjew4KIRX4kIP8tJAVITYfj2Q41pvVgwKGPTk2NnYLcZRpIS9kbM25oe7u7tsqONblWbG1cP7ZA6YnIFvxXz8BE1AEPkfwFQJDzh/6urNbqMvxEgTb84gu18Q8f/Bj3mz73xC/AaIJkuz7UwKFAAAAAElFTkSuQmCC"
        alt="del"
        @click="cliackDeleteHandle"
        v-show="isShowDelIcon"
        class="sq-carlicense-keyboard-icon-delete"
      >
    </div>
    <transition name="ry-slide-bottom">
      <div class="sq-carlicense-province-wrapper" v-show="provinceDisplay === 'block'" @click="getProvince($event)">
        <p class="sq-carlicense-close-btn">
          <a
            class="sq-carlicense-close-btn-text"
            @click="provinceDisplay = 'none'"
          >
            关闭
          </a>
        </p>
        <ul
          class="sq-carlicense-row-wrapper"
          v-for="(rowProvince, index) in provinceList"
          :key="index"
        >
          <li
            class="sq-carlicense-row-wrapper-item"
            :class="{'sq-carlicense-disabled': !province}"
            v-for="province in rowProvince"
            :key="province"
          >
            {{ province }}
          </li>
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
          :key="index"
        >
          <template v-if="index === 0">
            <li
              class="sq-carlicense-row-key-item"
              v-for="(item, index) in item"
              :key="'num-' + index"
              :class="{ 'sq-carlicense-disabled': isNumKeyDisabled }"
            >
              {{ item }}
            </li>
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
            <li class="sq-carlicense-row-key-item sq-carlicense-uppercase sq-carlicense-disabled iconfont sq-carlicense-icon-xiangshang sq-carlicense-icon-keyboard-xiangshang"></li>
            <li class="sq-carlicense-row-key-item" v-for="(item, index) in item" :key="'threeRow-' + index">{{ item }}</li>
            <li class="sq-carlicense-row-key-item sq-carlicense-del iconfont sq-carlicense-icon-keyboard-shanchu"></li>
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
@keyframes blink {
 0%{
   opacity: 0;
 }
 50% {
   opacity: 1;
 }
 100% {
   opacity: 0;
 }
}
@keyframes ry-slide-bottom-enter {
  from {
    transform: translate3d(0, 100%, 0);
  }
}

@keyframes ry-slide-bottom-leave {
  to {
    transform: translate3d(0, 100%, 0);
  }
}
.ry-slide-bottom {
  &-enter-active {
    animation: ry-slide-bottom-enter .3s both ease;
  }

  &-leave-active {
    animation: ry-slide-bottom-leave .3s both ease;
  }
}

$prefixCls: sq-carlicense;

.#{$prefixCls} {
  color: #000;
  line-height: initial;
  &-icon-keyboard-xiangshang {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAArrSURBVHhe7Z1fjFTVHcd3doadVXBWkmatUjShktJugZ3dMbYLZQmBSiRN4QHSbpVSE+RFmqrYpommTTGxKcY+6EORBw3xD5FEHnRNVUJA7b44O7NANqkhSpSirlJht9SdnX/b74/7o2Ez9565M3Pnzrn3/D7J5J7zm9mde8/ve37nnHvOPdMmCIIgCIIgCIJhRPhoHOl0+huRSOT2WCx2ccWKFR8iXeS3jMIoAZw8eXJ+oVB4CM6+F9mllrWtbXZ2dhq2N9rb259KJpMjbDYCYwSQyWS2l8vlP8PRN7PJFojhZRweTqVSn1mWcGOEAEZHR/fhsMfKVQci+AhNw5re3t7zbAotoRdArc6/CkTwCUQwEHYRhFoAcP7TODxg5WqHRIB+wZq+vr6P2RQ6QikAOC6CNn8/kjstS0Ocnzdv3hqMFD7ifKho52NoIOej5j+PpKPz8Zmv8fpNIpHoQg1fjfQ/+C07FuXz+RGMIL7D+VARqggAR0ZR819A8meWxZbLcPpd1w738Hcx/N0rSG6xLJXgMxfQJ1iLPsE4m0JBaATg0olT0Wh0PZz/Ppv+D4vnMJKOfw8uQjzr8PdjnA88oRBAOp2eh8MRjPE3WRZbqjqPRaCMICoRBZHAC4CdPwznb7AslcBprsM3PnulD4H/t51NdlAzQmIKvAgC3Qk8c+ZMHIeqzkcvfrXbthv/a7a/v38Hkgcsiy0LyuXysWw2O8D5wBJYAZw7d+66ycnJv1dx/gQ5f+XKlR+wyRUsgvuRfMay2LKgVCodhQjWcj6QBLIJGB8fX5DL5d5EUlUDPRm/u7iTOIPm4CdoDt7mfKAIXARA2E/A+ceQdHQ+av4nqMWrvLh5g0jwCA5PWjlb4ogEw+iLqDqg2hKoCHDq1KmF+Xz+GJzby6YK4PymTOTAwY/he//E2QrwvUW8vw2COcKmQBAYAdACDhyOo5B7LEslcMIH8Xh8cPny5RNs8hScwx58PzUJtuD7S3h/a5BEEIgm4PTp0zfh8F4V51Mvf3WznE+kUilqCnZbuUpwflGcx+FMJqO6E6kV2kcAcv7MzMwICncJmypAoY91dHSsQ5t/kU1NBR1DmmegySan8pvF+e7o6+s7yHlt0VoAY2Nji4rF4jsq54P3E4nE+qVLl05x3hdQy7dDeDTp5CgCvHahOVDdT2g52jYBKODb4HxlzQcjnZ2d6/x2PkG1G+c2hCQ52g4SxrOIFnWvR/ADLSMAevtLCoXCO0gusiy2jHR3d69fvHjxNOdbArX35XL5BYghyqYKECke4f6DdmgXAWjenebfkXR0Pgr0uA7OJxAJDsH5W3FOjsvK8f4+COVRzmqFVgJAm9+Dmk+9fer124KCfrurq2ujDs6/Cg/7NuPcCpalEry3l+8qaoU2Ashms72lUuldOJ/G+7agEIdx2IQ2f8ay6ANC/HA0GqW7gapz26ObCLToA8D5d9DECpyfYJMdRxBut+EzWj/BQ5NDuJY3cJ7XscmOZxA1HO8n+EnLBUDOp6lVJBdYFlsOwfn3oFBLnNcaXNMAC1olggO4pl34jNMowhda2gRQQVVzPsL+QRTUUFCcTySTyRFaNYTkZctiy040B8/j+lpaCVsmAA6VR5FU1fwDCJU7Wl1L6oFEQKuG4GDHexS4ru0YHbyEzzgOIZtNS9QH529AzX8NSVrR44Q27WQj4Fp7OcottCy2UP9mayuinO8RgObNUfOpN69y/pNhcD6BSDCG5uBHqOUX2GTHFkSCw/hMjPO+4WsEQJu3BRf5CpSuulByPi3CCBV0g6tQKJzAtavucVDF2IIhpeP9BK/xLQLQLVNc4GGV8/HeY2F0PkHrEjs6OgZQBo7T1bh+uo8wzItdfcEXAcD5NHP2Ei5Qeb8c7eDjnA0ltESNRICk42ollNEGWuxKi17Z1FSa3gSw81XTpsRu1HzVCtxQgTK5DR1Dmua+lU120EznXT09PaqhZMM0NQKgzd9Zxfk0vLvfJOcTiHQf094DKBvVotUBWvxKi2A53xSaFgHgfJoHp+fznQjMqplmwaudqGPo+OQxRDLW1dU12Kw1D02JALR4EgdH5+OiaPHkkMnOJ3j9Ij2e7vjUEsqpF32CE7Qimk2e4nkEQM3/Iw5/sHKV4GIDuXy6mfByd5oJrbbodS2GiKr7CTXjaQSA82mqU+V8Gt9uFufPhRazYnRAN4scn1xmcbzHK6Q9w7MIAOdX248n0I9Q+QF1+Kampmh+5A7LUglE4umDLw1HAJwQPU79LJLVnL9RnK+GOnq0yBVJx80qEQmW0GJZGkqyqSEaigDsfOWz9PjMdDQavRvOP84moQp0E2hiYoIWlaiePPbk4de6I4Ab54PLvJuGOL8GaL0jrXtEGavK7crmVbSCmvN1UVcEwIkZt5VKK6A5AQwBX0Mlq7YHwmCteyBcpeYIgC+kzZhoMyXV828X4fxBcX5j8OLXTShzmiW0BeK4iVZS04pqNtVETREg7WIzJpxsKLdTayVc6ZQ7oIG6djBzHQF4ipL241E5/8qWLOJ8b0GZF2nFEJKHLIstC0ul0olsNus4hLTDtQDQFv1O1RaB8zTVWW9bJKhB2ZcggiFUMsfb5/hMolwuv0UP1bKpKq4EAFXdiIPjPjk4Kc+2ZBGcQRlf2cFMJQJwY7FY/Aunq+JKAFAVrcy9gbNzwMnQnakBmuJkk9BErooASdVj59vo11E4rcRtE/BjPs4Bzj8bj8dDv6e+brAIHLexw/sxVNpBzipxJQA4+vucnAO+6IlmbskiqIEIdsM3tn0udAhv4aQSVwKAo23X8sHuy5YsghLbh2bgG1fPULq6D4DxPz2yvYqz1/Ip7Hvx+ifnPQXj2s+CPKo4e/Zs56VLl37AWU9BiI+j9v8SZf9zNs0B9kH0y2iTDSWuBJDJZB7Fl+3lrJ88hzB3H6cDB+908iFnfQO+mka53QARVH3SyG0ncD/+6decFvTngBvnE64EgFDyJcLxw5wVNAYV9SsMy729D0BABH/DgRZ+CJoC51+g+YBahuWuBUCgXdmFL6FHt/5rWQSNoA5fPyrqSSvrjrrWA4yPj38zl8utRzvzPfRGv4tjQ0uWIapv4398i7PXEuZO4Lt4la1k/aDszqPsDqKcaPv8mqlLAF4zOjr6FA4PWrk5hFYA3d3d1+uw01lNTYAQPkQAhiMCMBwRgOGIAAxHBGA4IgDDEQEYjgjAcEQAhiMCMBwRgOGIAAxHBGA4IgDDEQEYjgjAcEQAhiMCMBwRgOGIAAxHBGA4IgDDEQEYjgjAcEQAhiMCMBwRgOGIAAxHBGA4IgDDEQEYjgjAcEQAhiMCMBwRgOGIAAxHBGA4WghgdnbWab88Lbaxq5d8Pu94/rlcruE9Ar1Alwjwbz7OAcLo52QgaW9vt/0FL1xXgX8TsOVoUcPS6fRQJBJ5kbNzQGE9HY1GX+VsICiVSricyA9x7r/GseLn3mEfT6VStr/C4jdaCIB+Nn1ycvIrFJbtL5OEkH39/f2/5XRL0aIJoJ9Nx0H1K1ihAbV/urOzk7bG1QJtRgEI879H4fj+6xp+gyj3YE9Pz+ecbTnaCCCZTF6KxWI/RfILyxJK/orQv5/TWqCNAAj6zWHUkCSSr1uWcIDIRqOcX8H5D1kWfdB2nI2RwZ04/AKvVRAF/TQ6/Xh1YIDT/4XzPo3kkfnz5x9atmzZf6x3BEEQBEEQBEEQBEEQBEEQBEEQ/KKt7X+vAYB9MVdJQgAAAABJRU5ErkJggg==') no-repeat center/60%;
  }
  &-icon-keyboard-shanchu {
    background: url('data:image/png;base64,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') no-repeat center/80%;
  }
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
    -webkit-box-sizing: border-box;
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
    -webkit-box-sizing: border-box;
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
        -webkit-box-sizing: border-box;
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

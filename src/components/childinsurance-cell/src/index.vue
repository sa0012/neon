<template>
  <div class="sq-childinsurance-cell">
    <div class="sq-childinsurance-cell-row">
      <div class="sq-childinsurance-cell-left">{{ label }}</div>
      <sq-checkicon v-model="exemptSelected" class="sq-childinsurance-cell-middle" @change="$_clickiconChangeHandle">
        <span style="color:rgb(153, 153, 153);">{{ middleText }}</span>
      </sq-checkicon>
      <div
        class="sq-childinsurance-cell-right sq-childinsurance-cell-arrow"
        @click="$_click"
      >
        {{ rightText }}
      </div>
    </div>
  </div>
</template>

<script>
import SqCheckicon from '../../checkicon'

export default {
  name: 'sq-childinsurance-cell',

  components: {
    SqCheckicon
  },

  props: {
    label: {
      type: String
    },
    value: {
      type: Boolean,
      required: true
    },
    middleText: {
      type: String
    },
    rightText: {
      type: String
    }
  },

  data () {
    return {
      exemptSelected: this.value
    }
  },

  methods: {
    $_clickiconChangeHandle (val) {
      this.$emit('input', val)
    },
    $_click () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
@import '~@/common/styles/mixins';
$prefixCls: sq-childinsurance-cell;

.#{$prefixCls} {
  background-color: #ffffff;
  overflow: hidden;
  position: relative;
  &-row {
    height: 50px;
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    & ~ .#{$prefixCls}-row {
      @include mix-1px($top:1, $color:#e5e5e5, $position-left: 15px);
    }
  }
  &-left {
    flex: 1;
  }
  &-middle {
    margin-left: 5px;
    height: 50px;
    line-height: 50px;
    font-size: 13px;
    color: #878787;
  }
  &-right {
    width: 80px;
    height: 50px;
    text-align: right;
    line-height: 50px;
    margin-right: 25px;
  }
  &-arrow {
    position: relative;
    &::after {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      border: 2px solid #e6e6e6;
      border-top: 0;
      border-left: 0;
      transform: rotate(-45deg);
      position: absolute;
      right: -15px;
      top: 50%;
      margin-top: -4px;
    }
  }
}
</style>

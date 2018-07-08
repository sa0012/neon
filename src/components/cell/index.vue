<template>
  <div class="sq-cell" :class="classes">
    <div
      class="sq-cell-head"
      v-if="title !== void 0 && title !== null || $slots.title"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <div
      class="sq-cell-bd"
      v-if="value !== void 0 && value !== null || $slots.default"
      @click="$_click"
    >
      <slot>
        {{ value }}
      </slot>
    </div>
    <slot name="right-icon">
      <i v-if="isLink" class="sq-cell-ft"/>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'sq-cell',

  props: {
    value: {
      type: [Number, String]
    },
    title: {
      type: String
    },
    isLink: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes () {
      return [
        {
          'sq-cell-islink': this.isLink
        }
      ]
    }
  },

  methods: {
    $_click () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
@import '../../common/styles/mixins.scss';

.sq-cell {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 48px;
  line-height: 48px;
  background-color: #fff;
  padding: 13px 16px;
  &~& {
    @include mix-1px($top: 1);
  }
  &-bd {
    flex: 1;
    text-align: right;
  }
  &-ft {
    padding-left: 10px;
  }
  // arrow
  &-islink {
    position: relative;
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 10px;
      right: 14px;
      top: 50%;
      margin-top: -5px;
      height: 10px;
      border-right: 2px solid #e6e6e6;
      border-top: 2px solid #e6e6e6;
      box-sizing: border-box;
      transform: rotate(45deg);
    }
  }
}
</style>

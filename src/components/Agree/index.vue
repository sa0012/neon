<template>
  <div class="sq-agree" @click="$_Click">
    <div class="sq-agree-wrap">
      <span class="sq-agree-checkicon" :class="checkiconClasses"></span>
      <span class="sq-agree-text">
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sq-agree',

  props: {
    value: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    checkiconClasses () {
      return [
        {
          'sq-agree-checkicon-checked': this.value
        }
      ]
    }
  },

  methods: {
    $_Click (event) {
      this.$emit('input', !this.value)
    }
  }
}

</script>
<style lang="scss">
@import '../../assets/style/components/var.scss';

.sq-agree {
  display: inline-block;
  a {
    color: $theme-color;
  }
  &-wrap {
    display: flex;
    align-items: baseline;
  }
  &-checkicon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.1em;
    height: 1.1em;
    border-radius: 50%;
    background: #ccc;
    transform: translateY(-2px);
    &-checked {
      background-color: $theme-color;
      &.sq-agree-checkicon {
        &::before {
          transform: rotate(45deg) scale(1) translateY(-1px) translateX(-1px);
        }
      }
    }
    &::before {
      content: '';
      width: .25em;
      height: .5em;
      border: 2px solid #fff;
      border-top: 0;
      border-left: 0;
      transition: transform .2s ease-in-out;
      transform: rotate(45deg) scale(0) translateY(-1px) translateX(-1px);
    }
  }
  &-text {
    display: inline-block;
    margin-left: 6px;
    flex: 1;
  }
}
</style>

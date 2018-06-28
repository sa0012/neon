<template>
  <div class="sq-checkbox-wrap" >
    <div class="sq-checkbox__checkbox" :class="[name === saveName ? 'sq-checkbox__checked' : '']" @click="$_click">
      <input type="checkbox" name="" :id="id">
    </div>
    <div class="sq-checkbox__text">
      <label :for="id" style="height: 100%;display: inline-block;" @click="$_click">
        <slot></slot>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sq-checkbox',

  props: {
    name: {
      required: true
    },
    value: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      saveName: this.name,
      id: Math.random()
    }
  },

  methods: {
    $_click (event) {
      this.$emit('input', !this.value)
    }
  }
}

</script>
<style lang='scss'>
.sq-checkbox-wrap {
  display: inline-flex;
  vertical-align: middle;
  .sq-checkbox__checkbox {
    margin-right: 6px;
    position: relative;
    input[type="checkbox"] {
      margin: 0;
      visibility: hidden;
    }
    &::before {
      content: '';
      display: inline-block;
      width: 18px;
      height: 18px;
      background-color: #D8D8D8;// #0097DF;
      position: absolute;
      left: -2px;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 50%;
    }
    &::after {
      content: "";
      display: inline-block;
      width: 4px;
      height: 8px;
      position: absolute;
      top: 50%;
      margin-top: -3px;
      left: 0;
      border: 2px solid #eee;
      border-top: 0;
      border-left: 0;
      transform: rotate(45deg) translateY(-50%) scale(0);
      transition: all .2s ease-in-out;
    }
  }
}
.sq-checkbox__checked.sq-checkbox__checkbox::before {
  background-color: #0097DF;
}
.sq-checkbox__checked.sq-checkbox__checkbox::after {
  transform: rotate(45deg) translateY(-50%) scale(1);
}
</style>

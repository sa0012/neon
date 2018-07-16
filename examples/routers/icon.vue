<template>
  <div class="demo-icon-page">
    <div class="demo-icon-row" v-for="(item, index) in iconArray" :key="index">
      <div class="demo-icon-item" v-for="(icon, index) in item" :key="index">
        <i class="demo-icon iconfont" :class="`icon-${icon.name}`"></i>
        <p class="icon-name" v-if="icon.name">{{ `icon-${icon.name}` }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      iconArray: [
        [
          { name: 'circle-left' },
          { name: 'circle-down' },
          { name: 'circle-right' },
          { name: 'alert-empty' }
        ],
        [
          { name: 'alert-full' },
          { name: 'alert' },
          { name: 'checkmark-full' },
          { name: 'checkmark' }
        ],
        [
          { name: 'error-full' },
          { name: 'error' },
          { name: 'loading' },
          { name: 'arrow-left' }
        ],
        [
          { name: 'arrow-up' },
          { name: 'arrow-right' },
          { name: 'arrow-down' },
          { name: '' },
        ]
      ]
    }
  },

  methods: {}
}
</script>

<style lang="scss">
$theme-color: #4a90e2;

.demo-icon-page {
  user-select: text;
}
.demo-icon-row {
  display: flex;
  .demo-icon-item {
    flex: 1;
    text-align: center;
  }
}
.demo-icon {
  display: block;
  margin-bottom: 15px;
  font-size: 45px;
  color: $theme-color;
}
.icon-name {
  font-size: 12px;
}
</style>

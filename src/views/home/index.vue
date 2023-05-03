<template>
  <div class="home">
    <header-component class="headerComponents" />
    <router-view class="viewComponents"></router-view>
  </div>
</template>
<script setup>
import HeaderComponent from "./page/header.vue"
</script>
<style lang="scss" scoped>
div.home {
  width: 100%;
  min-height: 100%;
  position: relative;
  div.headerComponents {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
  }
  div.viewComponents {
    margin-top: 130px;
  }
}
</style>

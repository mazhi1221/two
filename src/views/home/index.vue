<template>
  <div class="home">
    <header-component />
    <router-view></router-view>
  </div>
</template>
<script setup>
import HeaderComponent from "./page/header.vue"
</script>
<style lang="scss" scoped>
div.home {
  width: 100%;
  min-height: 100%;
  background-image: url("../../assets/img/home_background.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
</style>

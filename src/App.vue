<template>
  <div class="baseViews">
    <div class="topViews">
      <Header />
    </div>
    <div class="bottomViews">
      <div class="leftViews">
        <menuCom :activeRoute="$route" />
      </div>
      <div class="rightViews">
        <div class="routerBox" ref="wrapper">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Header from "/src/components/header/index.vue";
import MenuCom from "/src/components/menuCom/index.vue";
</script>
<style lang="scss" scoped>
div.baseViews {
  width: 100%;
  height: 100%;
  div.topViews {
    width: 100%;
    height: 63px;
  }
  div.bottomViews {
    width: 100%;
    height: calc(100% - 63px);
    div.leftViews {
      width: 256px;
      height: 100%;
      float: left;
    }
    div.rightViews {
      width: calc(100% - 256px);
      height: 100%;
      float: left;
      div.routerBox {
        height: 100%;
        overflow-y: auto;
        box-sizing: border-box;
        padding: 30px;
      }
    }
  }
}
</style>

<template>
  <div class="app-wrapper">
    <div class="leftNav">
      <h6>异常检测平台</h6>
      <el-menu default-active="2">
        <el-menu-item index="2">
          <span>工业生产过程可视化</span>
        </el-menu-item>
        <el-menu-item index="3">
          <span>工业生产过程管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <span>异常检测告警记录</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="rightView">
      <RouterView />
    </div>
  </div>
</template>
<script setup>


</script>
<style lang="scss" scoped>
div.app-wrapper {
  width: 100vw;
  height: 100vh;
  div.leftNav {
    height: 100%;
    width: 250px;
    float: left;
    h6 {
      width: 250px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 22px;
    }
  }
  div.rightView {
    min-height: 100%;
    margin-left: 250px;
    position: relative;
  }
}
</style>

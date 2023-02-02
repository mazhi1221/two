<template>
  <div class="menuCom">
    <div class="menuNav">
      <el-menu default-active="1">
        <el-menu-item index="1">
          <el-icon><icon-menu /></el-icon>
          <span>设备信息</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><document /></el-icon>
          <span>设备信息</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><setting /></el-icon>
          <span>设备信息</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>
<script setup>
import { Document, Menu as IconMenu, Setting } from "@element-plus/icons-vue";
</script>
<style scoped lang="scss">
div.menuCom {
  width: 100%;
  height: 100%;
  div.menuNav {
    width: 100%;
    height: 100%;
  }
}
</style>
  
<template>
  <div class="studiosManage">
    <div class="header">
      <div class="left">
        <span class="iconfont icon-shouye"></span>
        <span class="pageName">我的口袋</span>
      </div>
      <div class="right">
        <el-badge :value="12" class="item">
          <span class="iconfont icon-xiaoxi"></span>
        </el-badge>
        <el-switch
          v-model="themeMode"
          class="themeMode"
          size="large"
          inline-prompt
          :active-icon="Sunny"
          :inactive-icon="Moon"
        />
        <img class="author" src="../../assets/img/home_logo.jpg" alt="">
      </div>
    </div>
    <div class="content">

    </div>
  </div>
</template>
<script setup>
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const themeMode = ref(true)




</script>
<style lang="scss" scoped>
div.studiosManage {
  width: 100%;
  height: 100%;
  background: #292929;
  >div.header {
    width: 100%;
    height: 83px;
    padding: 0 32px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #2F2E2E;
    >div.left {
      height: 100%;
      display: flex;
      justify-content: start;
      align-items: center;
      span.iconfont {
        font-size: 18px;
        font-weight: 500;
        color: #FFFFFF;
        margin-right: 5px;
      }
      span.pageName {
        font-size: 18px;
        font-weight: 500;
        color: #FFFFFF;
        margin-right: 20px;
      }
    }
    >div.right {
      height: 100%;
      display: flex;
      justify-content: start;
      align-items: center;
      span.iconfont {
        font-size: 18px;
        font-weight: 500;
        color: #FFFFFF;
        margin-right: 5px;
      }
      .themeMode {
        margin: 0 20px;
      }
      img.author {
        width: 40px;
        height: 40px;
        cursor: pointer;
      }
    }
  }
  >div.content {
    width: 100%;
    height: calc(100% - 83px);
    position: relative;
  }
}
</style>

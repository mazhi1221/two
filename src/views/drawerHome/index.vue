<template>
  <div class="drawerHome">
    <div class="header">
      <div class="left">
        <img src="../../assets/img/drawer_home_logo.svg" alt="">
        <span class="pageName">{{ activeMenu }}</span>
        <span class="projectName">{{ name}}</span>
      </div>
      <div class="right">
        <el-badge :value="12" class="item">
          <img class="message" src="../../assets/img/home_message.svg" alt="">
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
      <div
        :class="['leftMenu', {collapseMenu: !isCollapse}]"
        @mouseenter="isCollapse = false"
        @mouseleave="isCollapse = true"
      >
        <ul>
          <li
            v-for="(item, index) in menuList"
            :key="index"
            @click="handleClickMenu(item)"
            :class="{ active: item.name === activeMenu }"
          >
            <span>
              <i :class="['iconfont', item.icon]"></i>
            </span>
            <span class="name" v-if="!isCollapse">{{ item.name }}</span>
          </li>
        </ul>
      </div>
      <div class="rightContent">
        <designing-scheme v-if="activeMenu === '设计草图创作'" @handleEditImage="handleEditImage"/>
        <line-drawing-generation v-if="activeMenu === '图片结构'"/>
        <design-inspiration v-if="activeMenu === '设计灵感'"/>
        <edit-image-dialog
          :dialogVisible="editImageDialogVisible"
          :editImageDialogUrl="editImageDialogUrl"
          @handleCloseDialog="editImageDialogVisible = false;"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import DesigningScheme from './page/designingScheme.vue'
import LineDrawingGeneration  from './page/lineDrawingGeneration.vue'
import DesignInspiration  from './page/designInspiration.vue'

import EditImageDialog from './components/editImageDialog.vue'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const themeMode = ref(true)

//口袋名称相关
const route = useRoute();
const { name } = route.query;

//侧栏菜单相关
const menuList = ref([
  { name: "设计草图创作", icon: "icon-sharpicons_stylus" },
  { name: "图片结构", icon: "icon-sharpicons_files" },
  { name: "设计灵感", icon: "icon-sharpicons_pen" },
])
const isCollapse = ref(true);
const activeMenu = ref('设计草图创作');
const handleClickMenu = (item) => {
  activeMenu.value = item.name;
}

let editImageDialogVisible = ref(false);
let editImageDialogUrl = ref("");
const handleEditImage = (url) => {
  editImageDialogUrl.value = url;
  editImageDialogVisible.value = true;
}
</script>
<style lang="scss" scoped>
div.drawerHome {
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
      img {
        width: 25px;
        height: 25px;
        margin-right: 5px;
      }
      span.pageName {
        font-size: 18px;
        font-weight: 500;
        color: #FFFFFF;
        margin-right: 20px;
      }
      span.projectName {
        font-size: 14px;
        font-weight: 500;
        color: #FFFFFF;
      }
    }
    >div.right {
      height: 100%;
      display: flex;
      justify-content: start;
      align-items: center;
      img.message {
        width: 24px;
        height: 24px;
        cursor: pointer;
        margin-top: 5px;
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
    div.leftMenu {
      width: 87px;
      height: 100%;
      border-radius: 0 40px 40px 0;
      background: #0E0D0D;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      display: flex;
      align-items: center;
      transition: all .55s linear;
      ul {
        margin: 0 23px;
        li {
          width: 41px;
          height: 41px;
          line-height: 41px;
          text-align: center;
          margin-bottom: 23px;
          color: #fff;
          background: #4D4D4D;
          cursor: pointer;
          border-radius: 25px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          transition: width .55s linear;
          &.active {
            color: #000;
            background: #ffffff;
          }
          span.name{
            padding-left: 10px;
          }
        }
      }
      &.collapseMenu {
        width: 250px;
        background: rgba(108, 108, 108, 0.9);
        ul {
          li {
            width: 204px;
            height: 50px;
            line-height: 50px;
            border-radius: 25px;
          }
        }
      }
    }
    div.rightContent {
      width: 100%;
      height: 100%;
      padding-left: 87px;
      box-sizing: border-box;
    }
  }
}
</style>

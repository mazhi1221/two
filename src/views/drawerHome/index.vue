<template>
  <div class="drawerHome">
    <div class="header">
      <div class="left">
        <img src="../../assets/img/drawer_home_logo.svg" alt="">
        <span>{{ name || "位命名口袋" }}</span>
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
      <div ref="leftMenuRef" :class="['leftMenu', {collapseMenu: !isCollapse}]">
        <el-menu
          default-active="1"
          :collapse="isCollapse"
        >
          <el-menu-item
            v-for="(item, index) in menuList"
            :index="String(index + 1)"
            :key="index + 1"
            @click="handleClickMenu"
          >
            <span slot="title">
              <el-icon>
                <i :class="['iconfont', item.icon]"></i>
              </el-icon>
              <span>
                {{ item.name }}
              </span>
            </span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="rightContent">
        <designing-scheme v-if="activeMenu === 1"/>
        <reference-synthesis v-if="activeMenu === 2"/>
        <line-drawing-generation v-if="activeMenu === 3"/>
        <original-color v-if="activeMenu === 4"/>
        <design-inspiration v-if="activeMenu === 5"/>
        <sketch-design v-if="activeMenu === 6"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import DesigningScheme from './components/designingScheme.vue'
import ReferenceSynthesis  from './components/referenceSynthesis.vue'
import LineDrawingGeneration  from './components/lineDrawingGeneration.vue'
import OriginalColor  from './components/originalColor.vue'
import DesignInspiration  from './components/designInspiration.vue'
import SketchDesign  from './components/sketchDesign.vue'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useClickOutSide } from "@/utils/event"
import { useRoute } from 'vue-router';
import { ref, reactive, onMounted } from 'vue';

const themeMode = ref(true)

//口袋名称相关
const route = useRoute();
const { name } = route.query;

//侧栏菜单相关
const isCollapse = ref(true);
const activeMenu = ref(1);
const menuList = ref([
  { name: "设计草图创作", icon: "icon-sharpicons_stylus" },
  { name: "参考图合成创作", icon: "icon-sharpicons_vector-shape" },
  { name: "线稿图生成", icon: "icon-sharpicons_files" },
  { name: "原图上色", icon: "icon-sharpicons_brush-" },
  { name: "设计灵感", icon: "icon-sharpicons_pen" },
  { name: "设计方案", icon: "icon-sharpicons_marker" },
])

//侧栏菜单是否点击外面
const leftMenuRef = ref();
const { isOutSide } = useClickOutSide(leftMenuRef);
// isCollapse = isOutSide;

const handleClickMenu = ({index}) => {
  activeMenu.value = Number(index);
  isCollapse.value = false;
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
        margin-right: 30px;
      }
      span {
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
      background: rgba(108, 108, 108, 0.9);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      display: flex;
      align-items: center;
      .el-menu {
        margin-left: 23px;
        border-right: unset;
        background: rgba(108, 108, 108, 0);
        .el-menu-item {
          width: 41px;
          height: 41px;
          line-height: 41px;
          text-align: center;
          margin-bottom: 27px;
          padding: 0;
          color: #fff;
          border-radius: 30px;
          span {
            display: inline;
            width: unset;
            height: unset;
          }
          i {
            padding-left: 13px;
            padding-right: 5px;
            visibility: visible;
          }
          &:hover {
            background: rgba(216, 216, 216, 0.39);
          }
          &.is-active {
            background: rgba(216, 216, 216, 0.39);
          }
        }
      }
      &.collapseMenu {
        width: 250px;
        .el-menu {
          .el-menu-item {
            width: 195px;
            height: 50px;
            line-height: 50px;
            padding-left: 20px;
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

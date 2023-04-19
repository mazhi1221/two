<template>
  <div class="home">
    <div class="home_contain">
      <div class="header">
        <div class="left">
          <img src="../../assets/img/home_logo.png" alt="">
          <div class="btn active">主页</div>
          <el-dropdown>
            <div class="btn">口袋</div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>创建新口袋</el-dropdown-item>
                <el-dropdown-item @click="dumpMyStudio">我的口袋</el-dropdown-item>
                <el-dropdown-item>学习我的画风</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <div class="search">
            <img src="../../assets/img/home_paint.svg" alt="">
            <input type="text" v-model="prompt">
            <div class="create" @click="createBtnClick">创造</div>
          </div>
        </div>
        <div class="right">
          <avatar v-if="userStore.token"/>
          <template v-else>
            <div class="btn login active" @click="loginBtnClick">登陆</div>
            <div class="btn register">注册</div>
          </template>
        </div>
      </div>
      <div class="imgFlow">
        <masonry-image
          class="masonry-image"
          :imageBlocks="studioList"
          :imgStyle="{
            width: '230px',
            'margin-right': '10px',
            'margin-bottom': '10px'
          }"
          @selectImage="detailBtnClick"
        />
      </div>
    </div>
    <login
      :dialogVisible="loginDialogVisible"
      @handleCloseDialog="loginDialogVisible = false;"
    />
    <create-project
      :defaultPrompt="prompt"
      :dialogVisible="createDialogVisible"
      @handleCloseDialog="createDialogVisible = false;"
    />
    <studio-detail
      :dialogVisible="detailDialogVisible"
      :detailDialogData="detailDialogData"
      @handleCloseDialog="detailDialogVisible = false;"
    />
  </div>
</template>
<script setup>
import Login from "./components/login.vue";
import CreateProject from "./components/createProject.vue";
import StudioDetail from "./components/studioDetail.vue";
import MasonryImage from "@/components/masonryImage/index.vue";
import Avatar from "@/components/avatar/index.vue";
import { ref, onMounted } from 'vue';
import { getStudioList } from "../../api/home";
import { useUserStore } from "../../stores/user";
import { useRouter } from 'vue-router';

//状态管理
const userStore = useUserStore();

//登陆相关
let loginDialogVisible = ref(false);
const loginBtnClick = () => {
  loginDialogVisible.value = true;
}

//创建新项目相关
let prompt = $ref("");
let createDialogVisible = ref(false);
const createBtnClick = () => {
  createDialogVisible.value = true;
}

//查看详情相关
let detailDialogVisible = ref(false);
let detailDialogData = ref({});
const detailBtnClick = (item) => {
  if (!userStore.token) {
    loginBtnClick();
    return;
  }
  detailDialogData = item;
  detailDialogVisible.value = true;
}

//瀑布流相关
let studioList = $ref([]);
onMounted(async () => {
  let studioList_ = await getStudioList();
  studioList = studioList_.filter(item => {
    return item.hasOwnProperty("content")
  })
})

//我的工作室
const router = useRouter();
const dumpMyStudio = () => {
  router.push({
    name: 'studiosManage',
  })
}

</script>
<style lang="scss" scoped>
div.home {
  width: 100%;
  min-height: 100%;
  background-image: url("../../assets/img/home_background.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  >div.home_contain {
    >div.header {
      width: 100%;
      height: 64px;
      padding: 32px 27px 0;
      box-sizing: border-box;
      margin-bottom: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      >div.left {
        flex: 1;
        display: flex;
        justify-content: start;
        align-items: center;
        img:first-child {
          width: 110px;
          height: 32px;
          margin-right: 15px;
        }
        div.btn {
          width: 66px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          border-radius: 20px;
          margin-right: 20px;
          font-size: 20px;
          font-weight: 900;
          color: #4D4D4D;
          cursor: pointer;
          &.active {
            background: #fff;
          }
        }
        div.search {
          flex: 1;
          height: 40px;
          border-radius: 20px;
          background: #FFFFFF;
          position: relative;
          img {
            width: 25px;
            height: 25px;
            position: absolute;
            top: 8px;
            left: 15px;
          }
          input {
            width: calc(100% - 40px - 100px);
            height: 40px;
            padding: 0 10px;
            outline-style: none;
            box-sizing: border-box;
            line-height: 40px;
            margin-left: 40px;
            border: none;
            font-size: 14px;
            color: #9C9A9A;
          }
          div.create {
            position: absolute;
            top: 8px;
            right: 15px;
            width: 79px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            border-radius: 20px;
            background: #860AB8;
            font-size: 12px;
            font-weight: 900;
            color: #FFFFFF;
            cursor: pointer;
          }
        }
      }
      >div.right {
        height: 32px;
        display: flex;
        justify-content: start;
        align-items: center;
        div.btn {
          width: 58px;
          height: 32px;
          border-radius: 20px;
          line-height: 32px;
          text-align: center;
          font-size: 12px;
          font-weight: 900;
          color: #ffffff;
          cursor: pointer;
          &.login {
            margin-right: 14px;
            margin-left: 14px;
          }
          &.active {
            background: #860AB8;
          }
        }
      }
    }
    >div.imgFlow {
      padding: 0 110px;
      box-sizing: border-box;
    }
  }
}
</style>

<template>
  <div class="home">
    <div class="home_contain">
      <div class="header">
        <div class="left">
          <img src="../../assets/img/home_logo.jpg" alt="">
          <img src="../../assets/img/home_logo_text.png" alt="">
          <div class="btn active">主页</div>
          <el-dropdown>
            <div class="btn">
              口袋<i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>创建新口袋</el-dropdown-item>
              <el-dropdown-item>我的口袋</el-dropdown-item>
              <el-dropdown-item>学习我的画风</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="search">
            <img src="../../assets/img/home_paint.svg" alt="">
            <input type="text">
            <div class="create" @click="createBtnClick">创造</div>
          </div>
        </div>
        <div class="right">
          <el-badge :value="12" class="item">
            <img src="../../assets/img/home_message.svg" alt="">
          </el-badge>
          <el-switch
            v-model="themeMode"
            class="themeMode"
            size="large"
            inline-prompt
            :active-icon="Sunny"
            :inactive-icon="Moon"
          />
          <div class="btn login active" @click="loginBtnClick">登陆</div>
          <div class="btn register">注册</div>
        </div>
      </div>
      <div class="bigIcon">
        <div>
          <img src="../../assets/img/home_big_log.png" alt="">
        </div>
      </div>
      <div class="imgFlow">
        <masonry-image />
      </div>
    </div>
    <login
      :dialogVisible="loginDialogVisible"
      @handleCloseDialog="loginDialogVisible = false;"
    />
    <create-project
      :dialogVisible="createDialogVisible"
      @handleCloseDialog="createDialogVisible = false;"
    />
  </div>
</template>
<script setup>
import Login from "./components/login.vue";
import CreateProject from "./components/createProject.vue";
import MasonryImage from "@/components/masonryImage/index.vue";
import { Sunny, Moon } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

//登陆相关
let loginDialogVisible = ref(false);
const loginBtnClick = () => {
  loginDialogVisible.value = true;
}

//创建新项目相关
const router = useRouter();
let createDialogVisible = ref(false);
const createBtnClick = () => {
  createDialogVisible.value = true;
}

const themeMode = ref(true)
onMounted(() => {

})

</script>
<style lang="scss" scoped>
div.home {
  width: 100%;
  min-height: 100%;
  background-image: url("../../assets/img/home_background.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  >div.home_contain {
    width: 1440px;
    margin: 0 auto;
    >div.header {
      width: 100%;
      height: 64px;
      margin-bottom: 100px;
      padding: 24px 27px 0;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      >div.left {
        display: flex;
        justify-content: start;
        align-items: center;
        img:first-child {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 15px;
        }
        img:nth-child(2) {
          width: 41px;
          height: 34px;
          margin-right: 45px;
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
            background: #FFFFFF;
          }
        }
        div.search {
          width: 730px;
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
            width: 575px;
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
        height: 40px;
        display: flex;
        justify-content: start;
        align-items: center;
        img {
          width: 24px;
          height: 24px;
          cursor: pointer;
          margin-top: 5px;
        }
        .themeMode {
          margin-left: 14px;
        }
        div.btn {
          width: 58px;
          height: 34px;
          border-radius: 20px;
          line-height: 34px;
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
    >div.bigIcon {
      margin-bottom: 50px;
      div {
        text-align: center;
      }
    }
    >div.imgFlow {}
  }
}
</style>

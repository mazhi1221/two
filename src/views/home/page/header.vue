<template>
  <div class="header">
    <div class="left">
      <img src="../../../assets/img/home_logo.png" alt="">
      <div
        :class="['btn', { active: activeBtn === 'homeView'}]"
        @click="dumpImage('homeView')">主页
      </div>
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
        <img src="../../../assets/img/home_paint.svg" alt="">
        <input type="text" v-model="prompt">
        <div class="create" @click="createBtnClick">创造</div>
      </div>
    </div>
    <div class="right">
      <div
        class="feature"
        :class="[{ active: activeBtn === 'fashionTrend'}]"
        @click="dumpImage('fashionTrend')">流行趋势
      </div>
      <div
        class="feature"
        :class="[{ active: activeBtn === 'styleLearning'}]"
        @click="dumpImage('studiosManage')">风格学习</div>
      <avatar v-if="userStore.token"/>
      <template v-else>
        <div class="btn login active" @click="loginBtnClick">登陆</div>
        <div class="btn">注册</div>
      </template>
    </div>
    <login-dialog
      :dialogVisible="loginDialogVisible"
      @handleCloseDialog="loginDialogVisible = false;"
    />
    <create-project-dialog
      :defaultPrompt="prompt"
      :dialogVisible="createDialogVisible"
      @handleCloseDialog="createDialogVisible = false;"
    />
  </div>
</template>
<script setup>
import Avatar from "@/components/avatar/index.vue";
import LoginDialog from "../components/loginDialog.vue";
import CreateProjectDialog from "../components/createProjectDialog.vue";
import { ref } from 'vue';
import { useUserStore } from "@/stores/user";
import { useRouter } from 'vue-router';

let activeBtn = $ref("homeView");
const dumpImage = (name) => {
  if (name === activeBtn) return;
  activeBtn = name;
  router.push({
    name: name,
  })
}

//我的口袋
const router = useRouter();
const dumpMyStudio = () => {
  router.push({
    name: 'studiosManage',
  })
}

//创建新项目相关
let prompt = $ref("");
let createDialogVisible = ref(false);
const createBtnClick = () => {
  createDialogVisible.value = true;
}

//状态管理
const userStore = useUserStore();

//登陆相关
let loginDialogVisible = ref(false);
const loginBtnClick = () => {
  loginDialogVisible.value = true;
}
</script>
<style lang="scss" scoped>
div.header {
  width: calc(100% - 40px);
  height: 58px;
  margin: 20px 20px 0;
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
      height: 58px;
      border-radius: 20px;
      background: #FFFFFF;
      position: relative;
      img {
        width: 25px;
        height: 25px;
        position: absolute;
        top: 16px;
        left: 15px;
      }
      input {
        width: calc(100% - 40px - 100px);
        height: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        outline-style: none;
        margin-left: 40px;
        border: none;
        font-size: 14px;
        color: #9C9A9A;
      }
      div.create {
        position: absolute;
        top: 9px;
        right: 15px;
        width: 85px;
        height: 40px;
        line-height: 40px;
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
    display: flex;
    justify-content: start;
    align-items: center;
    div.feature {
      width: 110px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      border-radius: 20px;
      font-size: 20px;
      font-weight: bold;
      color: #4D4D4D;
      margin-left: 20px;
      cursor: pointer;
      &.active {
        background: #fff;
      }
    }
    div.btn {
      width: 58px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 900;
      color: #000;
      cursor: pointer;
      &.login {
        margin-right: 14px;
        margin-left: 32px;
      }
      &.active {
        color: #ffffff;
        background: #860AB8;
      }
    }
  }
}
</style>

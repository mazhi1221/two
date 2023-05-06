<template>
  <div class="header">
    <img src="../../../assets/img/home_logo_white.png" alt="">
    <el-space :size="50">
      <div
        :class="['btn', { active: activeBtn === 'homeView'}]"
        @click="dumpImage('homeView')">Home
      </div>
      <div
        :class="['btn', { active: activeBtn === 'fashionTrend'}]"
        @click="dumpImage('fashionTrend')">Trend
      </div>
      <div
        :class="['btn', { active: activeBtn === 'studiosManage'}]"
        @click="dumpImage('studiosManage')">Pocket
      </div>
    </el-space>
    <div>
      <avatar v-if="userStore.token"/>
      <el-space :size="10" v-else>
        <div class="login" @click="loginBtnClick">登陆</div>
        <div class="register">注册</div>
      </el-space>
    </div>
  </div>
  <login-dialog
    :dialogVisible="loginDialogVisible"
    @handleCloseDialog="loginDialogVisible = false;"
  />
</template>
<script setup>
import LoginDialog from "../components/loginDialog.vue";
import Avatar from "@/components/avatar/index.vue";
import { ref } from 'vue';
import { useUserStore } from "@/stores/user";
import { useRouter } from 'vue-router';

let activeBtn = $ref("homeView");
const router = useRouter();
const dumpImage = (name) => {
  if (name === activeBtn) return;
  activeBtn = name;
  router.push({
    name: name,
  })
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
  width: 100% ;
  height: 80px;
  background: #101010;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  img {
    width: 110px;
  }
  div.btn {
    font-size: 18px;
    font-weight: bold;
    color: #FFFFFF;
    cursor: pointer;
    &.active {
      border-bottom: 1px solid #fff;
    }
  }
  div.login, div.register {
    font-size: 12px;
    font-weight: bold;
    color: #FFFFFF;
    cursor: pointer;
  }
}
</style>

<template>
  <div class="studiosManage">
    <my-header></my-header>
    <div class="content">
      <div class="Heads">
        <el-avatar
          :size="120"
          :src="userStore.userInfo.avatarPath"
        />
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :before-upload="handleBeforeUpload"
          :http-request="handleFileUpload"
        >
          <div class="upload"></div>
        </el-upload>
      </div>
      <p class="author">
        <span>test</span>
      </p>
      <ul class="tab">
        <li
          :class="{active: item.value === activeQueryType}"
          v-for="item in queryTypeList"
          :key="item.value"
          @click="activeQueryType = item.value"
        >{{ item.name }}</li>
      </ul>
      <div class="contentArea">
        <my-studio v-if="activeQueryType === 'MINE'"/>
        <collect-studio v-if="activeQueryType === 'COLLECT'" />
        <my-style v-if="activeQueryType === 'paintingStyle'" />
      </div>
    </div>
  </div>
</template>
<script setup>
import MyHeader from "../studiosCreate/page/header.vue"
import MyStudio from "./page/myStudio.vue";
import CollectStudio from "./page/collectStudio.vue";
import MyStyle from "./page/myStyle.vue"
import { ElMessage } from 'element-plus';
import { uploadUserAvatar } from "@/api/user";
import { useUserStore } from "../../stores/user";
const userStore = useUserStore();

let activeQueryType = $ref("MINE")
let queryTypeList = $ref([
  { name: "我的口袋", value: "MINE" },
  { name: "收藏的口袋", value: "COLLECT" },
  { name: "我的画风", value: "paintingStyle" },
])

const handleBeforeUpload = (file) => {
  const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
  const whiteList = ["gif", "jpg", "png", "jpeg"];
  if (whiteList.indexOf(fileSuffix.toLowerCase()) === -1) {
    ElMessage.error('文件格式错误！,仅支持 gif jpg png jpeg 格式');
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!');
    return false;
  }
}

//更新头像
const handleFileUpload = ({file}) => {
  uploadUserAvatar({ avatar: file }).then(res => {
    const { avatarUrl } = res;
    userStore.setAvatarUrl(avatarUrl);
  })
}
</script>
<style lang="scss" scoped>
div.studiosManage {
  width: 100%;
  height: 100%;
  background: #292929;
  >div.content {
    width: 100%;
    height: calc(100% - 83px);
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    div.Heads {
      width: 120px;
      height: 120px;
      margin: 0 auto;
      margin-top: 20px;
      position: relative;
      .avatar-uploader {
        width: 120px;
        height: 120px;
        position: absolute;
        left: 0;
        top: 0;
        div.upload {
          width: 120px;
          height: 120px;
          border-radius: 50%;
        }
      }
    }
    p.author {
      height: 20px;
      line-height: 20px;
      text-align: center;
      margin-top: 20px;
      color: #fff;
    }
    ul.tab {
      width: 280px;
      height: 20px;
      margin: 0 auto;
      margin-top: 20px;
      margin-bottom: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        text-align: center;
        flex-basis: 100px;
        color: #fff;
        cursor: pointer;
        &:first-child {
          text-align: left;
        }
        &:last-child {
          text-align: right;
        }
        &.active {
          color: red;
        }
      }
    }
    .contentArea {
      width: 1440px;
      flex: 1;
      margin: 0 auto;
      overflow: hidden;
    }
  }
}
</style>

<template>
  <div class="studiosManage">
    <div class="header">
      <div class="left">
        <span class="iconfont icon-shouye" @click="dumpHome"></span>
        <span class="pageName">我的口袋</span>
      </div>
      <div class="right">
        <el-badge :value="12" class="item">
          <span class="iconfont icon-xiaoxi"></span>
        </el-badge>
        <avatar/>
      </div>
    </div>
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
      <div class="studioArea">
        <masonry-image
          v-if="activeQueryType === 'MINE'"
          class="masonry-image"
          :imageBlocks="myStudiosList"
          :showInfo="true"
          :imgStyle="{
            width: '200px',
            'margin-right': '10px',
          }"
          @selectImage="selectImage"
        />
        <el-empty
          v-if="activeQueryType === 'COLLECT'"
          description="description" />
      </div>
    </div>
  </div>
</template>
<script setup>
import MasonryImage from "@/components/masonryImage/index.vue";
import { getMyStudioProject } from "../../api/project";
import { uploadUserAvatar } from "../../api/user";
import Avatar from "@/components/avatar/index.vue";
import { ElMessage } from 'element-plus';
import { useUserStore } from "../../stores/user";
import { useRoute } from 'vue-router';
import { ref } from 'vue';

//状态管理
const userStore = useUserStore();

let myStudiosList = $ref([]);
let collectStudiosList = $ref([]);
let queryTypeList = $ref([
  { name: "我的口袋", value: "MINE" },
  { name: "收藏的口袋", value: "COLLECT" },
])
let activeQueryType = $ref("MINE")

onMounted(async () => {
  //我的设计室列表
  let myStudiosList_ = await getMyStudioProject({ queryType: "MINE" })
  myStudiosList = myStudiosList_.map(item => {
    if (!item.hasOwnProperty("content")) {
      return {
        ...item,
        content: {
          url: "http://bucket-bangxiehui-1.oss-cn-beijing.aliyuncs.com/assets/download.jpg"
        }
      }
    }
    return item;
  })

  //收藏的设计室列表
  collectStudiosList = await getMyStudioProject({ queryType: "COLLECT" })
})

//点击瀑布流图片
const router = useRouter();
const selectImage = (item) => {
  const { id, name } = item;
  router.push({
    name: 'studiosCreate',
    query: { id, name }
  })
}

const dumpHome = () => {
  router.push({
    name: 'home',
  })
}

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
        cursor: pointer;
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
    }
  }
  >div.content {
    width: 100%;
    height: calc(100% - 83px);
    position: relative;
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
      margin-top: 20px;
      line-height: 20px;
      text-align: center;
      color: #fff;
    }
    ul.tab {
      width: 200px;
      height: 20px;
      margin: 0 auto;
      margin-top: 20px;
      margin-bottom: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        flex-basis: 100px;
        color: #fff;
        cursor: pointer;
        &.active {
          color: red;
        }
        &:last-child {
          text-align: right;
        }
      }
    }
    .studioArea {
      flex: 1;
      overflow: auto;
      padding: 0 110px;
      box-sizing: border-box;
    }
  }
}
</style>

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
        <template v-if="activeQueryType === 'MINE'">
          <div class="extraContain">
            <el-tag>未区分口袋</el-tag>
          </div>
          <masonry-image
            class="masonry-image"
            :imageBlocks="myStudiosList"
            :showInfo="true"
            :imgStyle="{
            width: '200px',
            'margin-right': '10px',
          }"
            @selectImage="selectImage"
          />
        </template>
        <template v-if="activeQueryType === 'COLLECT'">
          <div class="extraContain">
            <el-tag>未区分口袋</el-tag>
          </div>
          <el-empty description="description" />
        </template>
        <template v-if="activeQueryType === 'paintingStyle'">
          <div class="extraContain">
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :http-request="handleFileUploadType"
            >
              <el-button type="primary">上传图片</el-button>
            </el-upload>
          </div>
          <ul class="paintingStyleContent">
            <li v-for="item in paintingStyleList" :key="item.id">
              <img :src="item.content.url" alt="">
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import MasonryImage from "@/components/masonryImage/index.vue";
import Avatar from "@/components/avatar/index.vue";
import { ElMessage } from 'element-plus';
import { useUserStore } from "../../stores/user";
import { addMyStyle, getMyStyle, getMyStudioProject, uploadStudioImage } from "../../api/project";
import { uploadUserAvatar } from "../../api/user";

const userStore = useUserStore();

let queryTypeList = $ref([
  { name: "我的口袋", value: "MINE" },
  { name: "收藏的口袋", value: "COLLECT" },
  { name: "我的画风", value: "paintingStyle" },
])
let activeQueryType = $ref("MINE")
let myStudiosList = $ref([]);
let collectStudiosList = $ref([]);
let paintingStyleList = $ref([]);

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

  //我的画风
  paintingStyleList = await getMyStyle();
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

//更新头像
const handleFileUpload = ({file}) => {
  uploadUserAvatar({ avatar: file }).then(res => {
    const { avatarUrl } = res;
    userStore.setAvatarUrl(avatarUrl);
  })
}

//上传画风
const handleFileUploadType = ({file}) => {
  const params = { file: file };
  addMyStyle(params).then(async (res) => {
    paintingStyleList = await getMyStyle();
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
      line-height: 20px;
      margin-top: 20px;
      text-align: center;
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
        &:last-child {
          text-align: right;
        }
      }
    }
    .studioArea {
      flex: 1;
      padding: 0 110px;
      box-sizing: border-box;
      overflow: hidden;
      div.extraContain {
        height: 20px;
        margin-bottom: 20px;
      }
      div.masonry-image {
        height: calc(100% - 40px);
        overflow: auto;
      }
      ul.paintingStyleContent {
        overflow: hidden;
        li {
          width: 267px;
          height: 267px;
          margin-right: 10px;
          margin-bottom: 10px;
          float: left;
          border-radius: 20px;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>

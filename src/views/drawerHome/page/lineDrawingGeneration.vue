<template>
  <div class="lineDrawingGeneration">
    <div class="currentPicture">
      <div class="search">
        <img src="../../../assets/img/home_paint.svg" alt="">
        <input type="text" v-model="prompt">
        <div class="create" @click="handleCreateStudioWorks">创造</div>
      </div>
      <div class="imgBox">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :http-request="handleFileUpload">
          <img v-if="focusImageUrl" :src="focusImageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </div>
      <div class="imgScroll">
        <splide-image
          v-if="splideImageList.length"
          :splideImageList="splideImageList"
        />
      </div>
    </div>
    <div
      class="generatePicture"
      v-loading="loading"
      element-loading-text="图片生成中..."
      element-loading-background="rgba(122, 122, 122, 0.8)"
    >
      <el-empty v-if="!imageBlocks.length" description="暂无生成图片" />
      <masonry-image
        v-else
        :imageBlocks="imageBlocks"
        :imgStyle="imgStyle"
        @selectImage="selectImage"
      />
    </div>
  </div>
</template>
<script setup>
import MasonryImage from "@/components/masonryImage/index.vue";
import SplideImage from "@/components/splideImage/index.vue";
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { createStudioWorks, uploadStudioImage } from "@/api/project";
import { useRoute } from 'vue-router';
import { ref, defineEmits } from 'vue';

const focusImageUrl = ref(""); //聚焦图片地址
const splideImageList = ref([]); //用户收集图片轮播

const emit = defineEmits(['handleEditImage']);
const loading = ref(false);
const editImage = function() {
  const url = focusImageUrl.value;
  emit("handleEditImage", url)
}

//设计草图创作
const prompt = ref("");
const imgStyle = {
  width: '200px',
  'margin-right': '10px',
  'margin-bottom': '10px'
}
const imageBlocks = ref([]);
const route = useRoute();
const { id } = route.query;

const handleFileUpload = ({file}) => {
  const params = {
    mainId: id,
    type: "LINE",
    category: "COMPOSITE",
    file: file,
  }
  uploadStudioImage(params).then(res => {
    console.log(res);
  })
}



const handleCreateStudioWorks = () => {
  if (!prompt.value) {
    ElMessage({
      message: '描述信息不能为空.',
      type: 'warning',
    })
    return;
  }
  loading.value = true;
  const params = {
    mainId: id,
    prompt: prompt.value,
    type: "DESIGN"
  }
  createStudioWorks(params).then(res => {
    if (!imageBlocks.value.length) {
      focusImageUrl.value = res[0].content.url;
      splideImageList.value.push(res[0].content.url);
    }
    imageBlocks.value.push(...res);
    loading.value = false;
  })
}

const selectImage = (item) => {
  const { id: imageId, url } = item.content;
  focusImageUrl.value = url;
  splideImageList.value.push(url);
  if (!prompt.value) {
    ElMessage({
      message: '描述信息不能为空.',
      type: 'warning',
    })
    return;
  }
  loading.value = true;
  const params = {
    mainId: id,
    mainWorksId: imageId,
    prompt: prompt.value,
    type: "DESIGN"
  }
  createStudioWorks(params).then(res => {
    imageBlocks.value.push(...res);
    loading.value = false;
  })
}
</script>
<style lang="scss" scoped>
div.lineDrawingGeneration {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background: #292929;
  >div.currentPicture {
    float: left;
    width: calc(100% - 891px);
    height: 100%;
    margin-right: 30px;
    div.search {
      width: 100%;
      height: 40px;
      margin-bottom: 20px;
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
        width: calc(100% - 40px - 94px);
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
    div.imgBox {
      width: 100%;
      height: 640px;
      margin-bottom: 20px;
      border-radius: 20px;
      background: rgba(0 ,0 ,0, 0.1);
      position: relative;
      .avatar-uploader {
        width: 100%;
        height: 100%;
        ::v-deep {
          .el-upload {
            width: 100%;
            height: 640px;
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
            &:hover {
              border-color: var(--el-color-primary);
            }
            .el-icon.avatar-uploader-icon {
              font-size: 58px;
              color: #8c939d;
              width: 178px;
              height: 178px;
              text-align: center;
            }
          }
        }
      }
    }
    div.imgScroll {
      width: 100%;
      height: 96px;
      border-radius: 20px;
      background: rgba(0 ,0 ,0, 0.1);
    }
  }
  >div.generatePicture {
    float: left;
    width: 861px;
    height: 100%;
    border-radius: 20px;
    overflow-y: auto;
    .el-empty {
      height: 100%;
    }
  }
}
</style>


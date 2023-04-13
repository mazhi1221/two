<template>
  <div class="designingScheme">
    <div class="currentPicture">
      <div class="search">
        <img src="../../../assets/img/home_paint.svg" alt="">
        <input type="text" v-model="prompt">
        <div class="create" @click="handleCreateStudioWorks">创造</div>
      </div>
      <div class="imgBox">
        <el-image
          v-if="imageBlocks.length"
          :src="focusImageUrl"
          fit="contain"
        />
        <el-button
          v-if="focusImageUrl"
          @click="editImage"
          size="small">
          编辑图片
        </el-button>
      </div>
      <div class="imgScroll">
        <splide-image
          v-if="splideImageList.length"
          :splideImageList="splideImageList"
          @handleSelectImage="handleSelectImage"
        />
      </div>
    </div>
    <div class="generatePicture" >


      <el-skeleton style="width: 240px" :loading="loading" animated>
        <template #template>
          <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
        </template>
        <template #default>
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
        </template>
      </el-skeleton>



<!--      <el-empty v-if="!imageBlocks.length" description="暂无生成图片" />-->
<!--      <masonry-image-->
<!--        class="masonry-image"-->
<!--        v-else-->
<!--        :imageBlocks="imageBlocks"-->
<!--        :imgStyle="imgStyle"-->
<!--        @selectImage="selectImage"-->
<!--      />-->
<!--      <p>选中符合您要求的图片，系统主动学习并生成更佳图片</p>-->
    </div>
  </div>
</template>
<script setup name="designingScheme">
import MasonryImage from "@/components/masonryImage/index.vue";
import SplideImage from "@/components/splideImage/index.vue";
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router';
import { ref, defineEmits } from 'vue';
import { getStudioProjectID, getStudioProjectResult } from "../../../api/project";

const loading = ref(false);
const focusImageUrl = ref(""); //聚焦图片地址
const splideImageList = ref([]); //轮播图片地址

//编辑图片功能
const emit = defineEmits(['handleEditImage']);
const editImage = function() {
  const url = focusImageUrl.value;
  emit("handleEditImage", url)
}

//生成-设计草图创作
const prompt = ref("");
const imageBlocks = ref([]); //瀑布流图片源
const imgStyle = {           //瀑布流图片源样式
  width: '200px',
  'margin-right': '10px',
  'margin-bottom': '10px'
}
const route = useRoute();
const { id } = route.query;
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
  createStudioWorksMethods(params)
}

//选择瀑布流图片-生成-设计草图创作
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
  createStudioWorksMethods(params)
}

const createStudioWorksMethods = async (params) => {
  //获取任务ID
  const { id, total } = await getStudioProjectID(params);
  //获取任务结果(轮询)
  const timer = setInterval(async () => {
    const { status, urls } = await getStudioProjectResult(id);
    if (res.status === "FINISHED") {
      clearInterval(timer);
    }
  }, 3000);




  // FINISHED


  // const res = await createStudioWorks(params);
  // if (!imageBlocks.value.length) {
  //   focusImageUrl.value = res[0].content.url;
  //   splideImageList.value.push(res[0].content.url);
  // }
  // imageBlocks.value.push(...res);
  // loading.value = false;
}

//轮播图选择图片
const handleSelectImage = (url) => {
  focusImageUrl.value = url;
}
</script>
<style lang="scss" scoped>
div.designingScheme {
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
      .el-image {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 20px;
      }
      .el-button {
        position: absolute;
        right: 15px;
        bottom: 10px;
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
    width: 861px;
    height: 100%;
    border-radius: 20px;
    background: #141414;
    overflow-y: auto;
    float: left;
    .el-empty {
      height: calc(100% - 20px);
    }
    .masonry-image {
      height: calc(100% - 20px);
    }
    p {
      padding-right: 20px;
      height: 20px;
      line-height: 20px;
      text-align: right;
      font-size: 12px;
      color: #909399;
    }
  }
}
</style>

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
          v-if="focusImageUrl"
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
          v-if="selectedImageList.length"
          :splideImageList="selectedImageList"
          @handleSelectImage="handleSelectImage"
        />
      </div>
    </div>
    <div class="generatePicture" >
      <masonry-image
        class="masonry-image"
        :imageBlocks="generateImageList"
        :imgStyle="imgStyle"
        @selectImage="selectImage"
      />
    </div>
  </div>
</template>
<script setup name="designingScheme">
import { getHistoryImage, getStudioProjectID, getStudioProjectResult } from "../../../api/project";
import MasonryImage from "@/components/masonryImage/index.vue";
import SplideImage from "@/components/splideImage/index.vue";
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router';
import { ref, defineEmits } from 'vue';

const { id: mainId } = useRoute().query; //工作室ID
const prompt = ref("");            //生成图片提示信息
let focusImageUrl = $ref("");     //聚焦图片地址
let selectedImageList = $ref([]);  //选择的图片(轮播)
let generateImageList = $ref([]);  //生成的图片(瀑布流)

onMounted(async () => {
  selectedImageList = await getHistoryImage({ mainId, type: "DESIGN", category: "SELECTED" })
  generateImageList = await getHistoryImage({ mainId, type: "DESIGN", category: "GENERATE" })
  if (generateImageList.length) focusImageUrl = generateImageList[0]
})

//编辑图片功能
const emit = defineEmits(['handleEditImage']);
const editImage = function() {
  const url = focusImageUrl.value;
  emit("handleEditImage", url)
}

//生成-设计草图创作

const imageBlocks = ref([]); //瀑布流图片源
const imgStyle = {           //瀑布流图片源样式
  width: '200px',
  'margin-right': '10px',
  'margin-bottom': '10px'
}

const handleCreateStudioWorks = () => {
  if (!prompt.value) {
    ElMessage({
      message: '描述信息不能为空.',
      type: 'warning',
    })
    return;
  }

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

  const params = {
    mainId: id,
    mainWorksId: imageId,
    prompt: prompt.value,
    type: "DESIGN"
  }
  createStudioWorksMethods(params)
}

const createStudioWorksMethods = async (params) => {
  let timer = null;
  let loopTimer = 1000 * 3;
  const { id, total } = await getStudioProjectID(params);
  const { status, urls } = await getStudioProjectResult(id);
  if (status !== "FINISHED") {
    timer = setInterval(async () => {
      const { status, urls } = await getStudioProjectResult(id);
      if (status === "FINISHED") timer && clearInterval(timer);
      //当没有历史图片
      if (!historyImageBlocks.value.length) {
        focusImageUrl.value = urls[0];
        splideImageList.value.push(urls[0]);
      }
      imageBlocks.value = urls;
    }, loopTimer)
  }
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

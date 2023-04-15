<template>
  <div class="lineDrawingGeneration">
    <div class="currentPicture">
      <div class="search">
        <img src="../../../assets/img/home_paint.svg" alt="">
        <input type="text" placeholder="请一句话描述您想创作的图片" v-model="prompt">
        <el-button
          @click="handleCreateStudioWorks"
          type="primary"
          :loading-icon="Eleme"
          :loading="loading">
          {{ !loading ? '创造' : 'AI生成中...' }}
        </el-button>
      </div>
      <div class="imgBox">
        <el-image
          v-if="focusImageUrl"
          :src="focusImageUrl"
          fit="contain"
        />
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :http-request="handleFileUpload"
        >
          <el-button type="primary">
            <el-icon class="el-icon--right"><Upload /></el-icon>
          </el-button>
        </el-upload>
        <el-button
          class="edit-image"
          :icon="Edit"
          v-if="focusImageUrl"
          @click="editImage"
          type="primary">
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
      <ul class="themeColor">
        <li v-for="(item, index) in structureImageList" @click="selectStructure(item, index)">
          <div class="imgBox">
            <img :src="item.content.url" alt="">
          </div>
          <p :class="{active: structureValue === structureList[index].value}">
            {{ structureList[index].name }}
          </p>
        </li>
      </ul>
      <masonry-image
        class="masonry-image"
        :imageBlocks="generateImageList"
        :imgStyle="{
          width: '200px',
          'margin-right': '10px',
          'margin-bottom': '10px'
        }"
        @selectImage="selectImage"
      />
    </div>
  </div>
</template>
<script setup name="designingScheme">
import { getHistoryPrompt, getHistoryImage, getStudioProjectID, getStudioProjectResult, uploadStudioImage, getStructureStudioProject } from "../../../api/project";
import MasonryImage from "@/components/masonryImage/index.vue";
import SplideImage from "@/components/splideImage/index.vue";
import { Eleme, Upload, Edit } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router';
import { ref, defineEmits } from 'vue';

const { id: mainId } = useRoute().query; //工作室ID
const prompt = ref("");            //生成图片提示信息
let loading = $ref(false);
let focusImageUrl = $ref("");      //聚焦图片地址
let selectedImageList = $ref([]);  //选择的图片(轮播)
let generateImageList = $ref([]);  //生成的图片(瀑布流)

let structureImageList = $ref([]);  //生成的结构图(6张)
//生成的结构图名称
let structureList = [
  { name: "线稿", value: "CANNY"},
  { name: "深度", value: "DEPTH"},
  { name: "3D", value: "NORMAL"},
  { name: "姿势和动作", value: "OPENPOSE"},
  { name: "边缘", value: "HED"},
  { name: "直线", value: "MLSD"},
];
let structureValue = $ref("CANNY");

onMounted(async () => {
  //获取最后一次提示信息
  const prompt_ = await getHistoryPrompt({ mainId, type: "STRUCTURE" });
  const { sourceContent = "" } = prompt_;
  prompt.value = sourceContent;

  //获取生成的历史图片
  generateImageList = await getHistoryImage({ mainId, type: "STRUCTURE", category: "GENERATE" })
  if (generateImageList.length) focusImageUrl = generateImageList[0].content.url;

  //获取选择的历史图片
  const selectedImageList_ = await getHistoryImage({ mainId, type: "STRUCTURE", category: "SELECTED" })
  selectedImageList = selectedImageList_.map(item => item.content.url);
})

//上传图片-生成线稿图
const handleFileUpload = ({file}) => {
  const params = {
    mainId,
    type: "STRUCTURE",
    category: "SELECTED",
    file: file,
  }
  uploadStudioImage(params).then(async (res) => {
    const { id } = res;
    focusImageUrl = res.content.url;
    structureImageList = await getStructureStudioProject({mainId, mainWorksId: id});
  })
}

//选择瀑布流图片-生成生成线稿图
const selectImage = async (item) => {
  focusImageUrl = item.content.url;
  selectedImageList.push(item.content.url);
  if (loading) return;

  const { id } = item;
  structureImageList = await getStructureStudioProject({mainId, mainWorksId: id});
}

const selectStructure = (item, index) => {
  focusImageUrl = item.content.url;
  structureValue = structureList[index].value;
}

//生成-结构图
const handleCreateStudioWorks = () => {
  if (!prompt.value) {
    ElMessage({ message: '描述信息不能为空.', type: 'warning' })
    return;
  }
  const index = structureList.findIndex(item => item.value === structureValue);
  const { id: imageId, url } = structureImageList[index].content;
  const params = {
    mainId,
    mainWorksId: imageId,
    prompt: prompt.value,
    type: "STRUCTURE",
    structureType: structureValue,
  }
  createStudioWorksMethods(params)
}

const createStudioWorksMethods = async (params) => {
  loading = true;
  let timer = null;
  let loopTimer = 1000 * 3;
  const { id } = await getStudioProjectID(params);
  const { status, total } = await getStudioProjectResult(id);
  if (status !== "FINISHED") {
    timer = setInterval(async () => {
      const { status, total, dataList } = await getStudioProjectResult(id);
      //当没有历史图片
      if (!generateImageList.length) {
        focusImageUrl = dataList[0].content.url;
        selectedImageList.push(dataList[0].content.url);
      }
      dataList.forEach(item_ => {
        if (!generateImageList.filter(item => item.id === item_.id).length) {
          generateImageList.push(item_)
        }
      })
      if (status === "FINISHED") {
        loading = false;
        timer && clearInterval(timer);
      }
    }, loopTimer)
  }
}

//编辑图片功能
const emit = defineEmits(['handleEditImage']);
const editImage = function() {
  emit("handleEditImage", focusImageUrl)
}

//轮播图选择图片
const handleSelectImage = (url) => {
  focusImageUrl = url;
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
        width: calc(100% - 40px - 110px);
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
      .el-button{
        position: absolute;
        top: 8px;
        right: 15px;
        width: 100px;
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
      &:hover {
        .avatar-uploader, .edit-image {
          opacity: 1;
        }
      }
      .el-image {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 20px;
      }
      .avatar-uploader {
        position: absolute;
        right: 5px;
        bottom: 5px;
        opacity: 0;
        transition: opacity .35s linear;
      }
      .edit-image {
        position: absolute;
        right: 60px;
        bottom: 5px;
        opacity: 0;
        transition: opacity .35s linear;
      }
      .el-button{
        width: 50px;
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
    padding: 10px 0 10px 10px;
    box-sizing: border-box;
    border-radius: 20px 0 0 20px;
    background: #141414;
    float: left;
    display: flex;
    flex-direction: column;
    ul.themeColor {
      width: 100%;
      margin-bottom: 20px;
      padding-right: 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      li {
        cursor: pointer;
        div.imgBox {
          width: 109px;
          height: 109px;
          margin-bottom: 17px;
          border-radius: 20px;
          background: #D8D8D8;
          img {
            display: block;
            width: 100%;
          }
        }
        p {
          text-align: center;
          font-size: 16px;
          color: #FFFFFF;
          &.active {
            color: #7b0daf;
          }
        }
      }
    }
    .masonry-image {
      flex: 1;
      overflow-y: auto;
    }

  }
}
</style>

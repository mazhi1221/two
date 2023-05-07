<template>
  <div class="homeView">
    <div class="searchArea">
      <img src="../../../assets/img/home_logo_white.png" alt="">
      <div class="search">
        <img src="../../../assets/img/home_paint.svg" alt="">
        <input type="text" v-model="prompt">
        <div class="create" @click="createBtnClick">创造</div>
      </div>
      <p class="columns">
        <span>Columns: {{ columns }}</span>
      </p>
      <el-slider
        v-model="columns"
        size="small"
        :step="1"
        :min="4"
        :max="12"
        :show-tooltip="false"
        @input="handleChangeColumns"
      />
      <create-project-dialog
        :defaultPrompt="prompt"
        :dialogVisible="createDialogVisible"
        @handleCloseDialog="createDialogVisible = false;"
      />
    </div>
    <div class="contentArea" id="contentArea">
      <masonry-image
        class="masonry-image"
        :imageBlocks="studioList"
        :imgStyle="{ width: perWidth + 'px' }"
        @selectImage="detailBtnClick"
      />
      <studio-detail
        :dialogVisible="detailDialogVisible"
        :detailDialogData="detailDialogData"
        @handleCloseDialog="detailDialogVisible = false;"
      />
    </div>
  </div>
</template>
<script setup>
import CreateProjectDialog from "../components/createProjectDialog.vue";
import StudioDetail from "../components/studioDetailDialog.vue";
import MasonryImage from "@/components/masonryImage/index.vue";
import { ref, onMounted } from 'vue';
import { getStudioList } from "@/api/home";
import { useUserStore } from "@/stores/user";

//创建新项目相关
let prompt = $ref("穿着黑色毛衣的精致优雅女性");
let createDialogVisible = ref(false);
const createBtnClick = () => {
  createDialogVisible.value = true;
}

//瀑布流相关
let studioList = $ref([]);
onMounted(async () => {
  let studioList_ = await getStudioList();
  studioList = studioList_.filter(item => {
    return item.hasOwnProperty("content")
  })
})

let columns = $ref(6);
let perWidth = $ref(0);
//瀑布流图片宽度自适应
onMounted(() => {
  setPerWidth();
  window.onresize = () => { setPerWidth() }
})
const setPerWidth = () => {
  let totalWidth = document.getElementById("contentArea").clientWidth;
  perWidth = totalWidth / columns;
}
const handleChangeColumns = () => {
  setPerWidth();
  studioList.push({ id: -1 })
}

//查看详情相关
const userStore = useUserStore();
let detailDialogVisible = ref(false);
let detailDialogData = ref({});
const detailBtnClick = (item) => {
  detailDialogData = item;
  detailDialogVisible.value = true;
}
</script>
<style lang="scss" scoped>
div.homeView {
  width: 100%;
  padding: 0 4px;
  box-sizing: border-box;
  div.searchArea {
    width: 100%;
    height: 487px;
    padding: 180px 0 100px;
    >img {
      width: 200px;
      display: block;
      margin: auto;
      margin-bottom: 50px;
    }
    div.search {
      width: 612px;
      height: 43px;
      border-radius: 20px;
      margin: 0 auto;
      background: #ffffff;
      position: relative;
      >img {
        width: 25px;
        height: 25px;
        margin-right: 0;
        position: absolute;
        top: 8px;
        left: 10px;
      }
      input {
        width: calc(100% - 40px - 140px);
        height: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        outline-style: none;
        background: #ffffff;
        margin-left: 40px;
        border: none;
        font-size: 14px;
        color: #9C9A9A;
      }
      div.create {
        width: 125px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 20px;
        background: #070707;
        position: absolute;
        top: 7px;
        right: 15px;
        font-size: 12px;
        font-weight: 900;
        color: #FFFFFF;
        cursor: pointer;
      }
    }
    .columns {
      margin-top: 50px;
      text-align: center;
      span {
        font-size: 14px;
      }
    }
    .el-slider {
      width: 250px;
      margin: 0 auto;
      ::v-deep {
        .el-slider__bar {
          background: #7b7b7d;
        }
        .el-slider__runway {
          background: #454546;
        }
      }
    }
  }
  div.contentArea {
    width: 100%;
  }
}
</style>

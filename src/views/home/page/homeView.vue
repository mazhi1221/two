<template>
  <div class="homeView">
    <div class="filterArea">
      <div class="authorGroup">
        <el-space :size="20">
          <el-badge :value="15" class="item" type="primary">
            <el-avatar src="http://bucket-bangxiehui-1.oss-cn-beijing.aliyuncs.com/assets/IMG_0721.PNG"/>
          </el-badge>
          <el-badge :value="56" class="item" type="primary">
            <el-avatar src="http://bucket-bangxiehui-1.oss-cn-beijing.aliyuncs.com/assets/IMG_0722.PNG"/>
          </el-badge>
          <el-badge :value="20" class="item" type="primary">
            <el-avatar src="http://bucket-bangxiehui-1.oss-cn-beijing.aliyuncs.com/assets/IMG_0723.PNG"/>
          </el-badge>
        </el-space>
      </div>
      <div class="tagGroup">
        <el-space :size="10">
          <div class="tag active">设计</div>
          <div class="tag">时装</div>
          <div class="tag">室内</div>
          <div class="tag">动漫</div>
        </el-space>
      </div>
    </div>
    <div class="contentArea">
      <masonry-image
        class="masonry-image"
        :imageBlocks="studioList"
        :imgStyle="{
          width: '350px',
          'margin-right': '10px',
          'margin-bottom': '10px'
        }"
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
import StudioDetail from "../components/studioDetailDialog.vue";
import MasonryImage from "@/components/masonryImage/index.vue";
import { ref, onMounted } from 'vue';
import { getStudioList } from "@/api/home";
import { useUserStore } from "@/stores/user";
import { useRouter } from 'vue-router';

//瀑布流相关
let studioList = $ref([]);
onMounted(async () => {
  let studioList_ = await getStudioList();
  studioList = studioList_.filter(item => {
    return item.hasOwnProperty("content")
  })
})

//查看详情相关
const userStore = useUserStore();
let detailDialogVisible = ref(false);
let detailDialogData = ref({});
const detailBtnClick = (item) => {
  // if (!userStore.token) {
  //   loginBtnClick();
  //   return;
  // }
  detailDialogData = item;
  detailDialogVisible.value = true;
}
</script>
<style lang="scss" scoped>
div.homeView {
  width: 1440px;
  margin: 0 auto;
  margin-top: 20px;
  div.filterArea {
    display: flex;
    justify-content: space-between;
    align-items: center;
    div.authorGroup {
      .el-avatar {
        cursor: pointer;
      }
    }
    div.tagGroup {
      div.tag {
        width: 51px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        border-radius: 20px;
        font-size: 16px;
        font-weight: bold;
        color: #3D3D3D;
        cursor: pointer;
        &.active {
          background: #A19D9D;
          color: #FFFFFF;
        }
      }
    }
  }
  div.contentArea {
    margin-top: 20px;
  }
}
</style>

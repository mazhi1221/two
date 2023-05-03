<template>
  <div class="trendInfo">
    <div
      v-for="(item, index) in data"
      :key="index"
      :class="['trendInfoInner' + index]"
    >
      <div class="title">{{ item.type }}</div>
      <ul class="content">
        <li v-for="(img, index_) in item.imgList" @click="detailBtnClick(img)">
          <el-image :src="img.url" fit="cover" />
          <p class="title">{{ img.title }}</p>
          <p
            class="description"
            v-if="index === 0 && index_ !== 2"
          >{{ img.description }}</p>
        </li>
      </ul>
    </div>
    <studio-trend-detail
      :dialogVisible="detailDialogVisible"
      :detailDialogData="detailDialogData"
      @handleCloseDialog="detailDialogVisible = false;"
    />
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import StudioTrendDetail from "./studioTrendDetailDialog.vue"

const props = defineProps({ data: Array})

let detailDialogVisible = ref(false);
let detailDialogData = ref({});
const router = useRouter();
const detailBtnClick = (item) => {
  detailDialogData = item;
  detailDialogVisible.value = true;
}

</script>
<style lang="scss" scoped>
div.trendInfo {
  div.title {
    font-size: 24px;
    font-weight: bold;
    color: #3D3D3D;
    margin-bottom: 40px;
  }
  div.trendInfoInner0 {
    margin-bottom: 70px;
    ul.content {
      height: 950px;
      position: relative;
      li {
        width: 345px;
        height: 428px;
        cursor: pointer;
        &:nth-child(1) {
          position: absolute;
          top: 0; left: 0;
        }
        &:nth-child(2) {
          position: absolute;
          bottom: 0; left: 0;
        }
        &:nth-child(3) {
          position: absolute;
          top: 0; left: 365px;
          width: 710px;
          height: 920px;
          .el-image {
            width: 100%;
            height: 899px;
            border-radius: 20px;
          }
          p.title {
            text-align: center;
            font-size: 30px;
            color: #3D3D3D;
          }
        }
        &:nth-child(4) {
          position: absolute;
          top: 0; right: 0;
        }
        &:nth-child(5) {
          position: absolute;
          bottom: 0; right: 0;
        }
        .el-image {
          width: 100%;
          height: 377px;
          border-radius: 20px;
        }
        p.title {
          font-size: 16px;
          font-weight: bold;
          color: #3D3D3D;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p.description {
          width: 100%;
          font-size: 16px;
          color: #3D3D3D;
          opacity: 0.6;
          display: -webkit-box;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
  div.trendInfoInner1 {
    margin-bottom: 70px;
    ul.content {
      height: 856px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 345px;
        height: 428px;
        cursor: pointer;
        .el-image {
          width: 100%;
          height: 377px;
          border-radius: 20px;
        }
        p {
          width: 100%;
          font-size: 16px;
          font-weight: bold;
          color: #3D3D3D;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>

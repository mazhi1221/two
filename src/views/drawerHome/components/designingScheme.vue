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
          :src="imageBlocks[0].content.url"
          fit="cover"
        />
      </div>
      <div class="imgScroll">

      </div>
    </div>
    <div class="generatePicture">
      <masonry-image
        :imageBlocks="imageBlocks"
        :imgStyle="imgStyle"
      />
    </div>
  </div>
</template>
<script setup>
import MasonryImage from "@/components/masonryImage/index.vue";
import { createStudioWorks } from "@/api/project";
import { useRoute } from 'vue-router';
import { ref } from 'vue';

//设计草图创作
const imgStyle = {
  width: '207px',
  'margin-right': '10px',
  'margin-bottom': '10px'
}
const prompt = ref("马斯克在中国打工");
const imageBlocks = ref([]);
const route = useRoute();
const { id, name } = route.query;
const handleCreateStudioWorks = () => {
  const params = {
    mainId: id,
    prompt: prompt.value,
    type: "DESIGN"
  }
  createStudioWorks(params).then(res => {
    imageBlocks.value = res;
  })
}
</script>
<style lang="scss" scoped>
div.designingScheme {
  padding: 30px 20px 70px 90px;
  box-sizing: border-box;
  background: #292929;
  display: flex;
  justify-content: space-between;
  align-items: center;
  >div.currentPicture {
    width: 545px;
    margin-right: 30px;
    div.search {
      height: 40px;
      margin-bottom: 30px;
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
        width: 400px;
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
      width: 543px;
      height: 640px;
      margin-bottom: 30px;
      border-radius: 20px;
      background: #8C8C8C;
      .el-image {
        width: 100%;
        height: 100%;
        display: block;
        border-radius: 20px;
      }
    }
    div.imgScroll {
      width: 100%;
      height: 96px;
      border-radius: 20px;
      background: #8C8C8C;
    }
  }
  >div.generatePicture {
    flex: 1;
  }
}
</style>

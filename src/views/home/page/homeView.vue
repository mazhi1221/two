<template>
  <div class="homeView">
    <Splide
      v-if="studioList.length"
      :options="options"
      class="slideArea"
    >
      <SplideSlide
        v-for="(item, index) in studioList.slice(0, 3)"
        :key="index"
      >
        <p>为什么黑色总是吸引消费者的注意</p>
        <img
          :src="item.content.url"
          :key="index"
          @click="detailBtnClick(item)"
        >
      </SplideSlide>
    </Splide>
    <div class="contentArea">
      <masonry-image
        class="masonry-image"
        :imageBlocks="studioList.slice(3, studioList.length)"
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
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import StudioDetail from "../components/studioDetailDialog.vue";
import MasonryImage from "@/components/masonryImage/index.vue";
import { ref, onMounted } from 'vue';
import { getStudioList } from "@/api/home";
import { useUserStore } from "@/stores/user";
import { useRouter } from 'vue-router';

const options = {
  type: 'loop',
  height: '528px',
  autoWidth: true,
  gap: "20px",
  focus  : 'center',
  rewind : true,
  // autoplay: true,
}

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
  detailDialogData = item;
  detailDialogVisible.value = true;
}
</script>
<style lang="scss" scoped>
div.homeView {
  width: 100%;
  overflow-x: hidden;
  div.slideArea {
    margin: 0 20px 60px;
    ::v-deep {
      .splide__arrows {
        position: absolute;
        top: 0; bottom: 0;
        left: 0;right: 0;
        margin: auto;
      }
      .splide__list {
        .splide__slide {
          cursor: pointer;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          p {
            color: #7b0daf;
            font-size: 30px;
            font-weight: bold;
            position: absolute;
            bottom: 10px;
            left: 15px;
            z-index: 10;
          }
        }
      }
    }
  }
  div.contentArea {
    width: 1440px;
    margin: 0 auto;
  }
}
</style>

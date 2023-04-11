<template>
  <div class="splideImage">
    <Splide :options="options">
      <SplideSlide v-for="(item, index) in splideImageList">
        <img :src="item" :key="index" alt="Sample 2">
      </SplideSlide>
    </Splide>
  </div>
</template>
<script setup>
import { defineEmits, defineProps } from 'vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';

const props = defineProps({ splideImageList: Array});

const options = {
  perPage: 3,
  perMove: 1,
  padding: 40,
  focus  : 'center',
  type: 'slide',
  rewind: true,
  height: "96px",
}

</script>
<style lang="scss" scoped>
.splideImage {
  height: 100%;
  ::v-deep {
    .splide__arrows {
      position: absolute;
      top: 0; bottom: 0;
      left: 0;right: 0;
      margin: auto;
    }
  }
  img {
    height: 100%;
  }
}
</style>

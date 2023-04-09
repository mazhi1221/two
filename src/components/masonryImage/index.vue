<template>
  <div class="masonryImage">
    <div v-masonry  transition-duration="0.3s" item-selector=".item">
      <div v-masonry-tile class="item" v-for="(item, index) in imageBlocks">
        <img
          :src="item.content.url"
          alt=""
          :style="imgStyle"
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, defineEmits, defineProps } from 'vue';
const props = defineProps({
  imageBlocks: Array,
  imgStyle: Object,
});
</script>
<style lang="scss" scoped>
div.masonryImage {
  img {
    border-radius: 20px;
  }
}
</style>

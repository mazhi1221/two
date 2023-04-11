<template>
  <div class="masonryImage">
    <div v-masonry  transition-duration="0.3s" item-selector=".item">
      <div v-masonry-tile class="item" v-for="(item, index) in imageBlocks">
        <img
          :src="item.content.url"
          :style="imgStyle"
          @click="selectImage(item)"
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineEmits, defineProps } from 'vue';

const emit = defineEmits(['selectImage'])
const props = defineProps({
  imageBlocks: Array,
  imgStyle: Object,
});

const selectImage = (item) => {
  emit("selectImage", item);
}
</script>
<style lang="scss" scoped>
div.masonryImage {
  img {
    border-radius: 20px;
    cursor: pointer;
  }
}
</style>

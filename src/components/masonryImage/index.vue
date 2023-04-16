<template>
  <div class="masonryImage">
    <div v-masonry  transition-duration="0.3s" item-selector=".item">
      <div v-masonry-tile class="item" v-for="(item, index) in imageBlocks">
        <img
          :src="item.content.url"
          :style="imgStyle"
          @click="selectImage(item)"
        >
        <p v-if="showInfo">
          <span>{{ item.name}}</span>
          <span>{{ item.createTime.substr(0, 10) }}</span>
        </p>
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
  showInfo: {
    type: Boolean,
    default: false,
  }
});

const selectImage = (item) => {
  emit("selectImage", item);
}
</script>
<style lang="scss" scoped>
div.masonryImage {
  height: 100%;
  img {
    border-radius: 20px;
    cursor: pointer;
  }
  p {
    width: 100%;
    height: 20px;
    line-height: 20px;
    padding-right: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    color: #fff;
  }
}
</style>

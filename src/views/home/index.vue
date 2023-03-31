<template>
  <div class="home">
    <editor-image :imageUrl="imageUrl"/>
    <login
      :dialogVisible="dialogVisible"
      @handleCloseDialog="dialogVisible = false;"
    />
  </div>
</template>
<script setup>
import Login from "./components/login.vue";
import EditorImage from "@/components/editorImage/index.vue";
import { ref, onMounted } from 'vue';

let imageUrl = "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg";

let dialogVisible = ref(false);
const loginBtnClick = () => {
  dialogVisible.value = true;
}

onMounted(() => {

})

</script>
<style lang="scss" scoped>
div.home {
  width: 100%;
  height: 100%;
}
</style>

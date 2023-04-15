<template>
  <div class="editImageDialog">
    <el-dialog
      :model-value="dialogVisible"
      top="50px"
      width="1000"
      :before-close="handleCloseDialog"
    >
      <editor-image v-if="editImageDialogUrl" :imageUrl="editImageDialogUrl"/>
    </el-dialog>
  </div>
</template>
<script setup>
import EditorImage from "@/components/editorImage/index.vue";
import { defineEmits, defineProps } from 'vue';

const emit = defineEmits(['handleCloseDialog']);
const props = defineProps({
  dialogVisible: Boolean,
  editImageDialogUrl: String,
});

const handleCloseDialog = () => {
  emit("handleCloseDialog")
};

</script>
<style lang="scss" scoped>

</style>

<template>
  <div class="editImageDialog">
    <el-dialog
      :model-value="dialogVisible"
      width="80%"
      :before-close="handleCloseDialog"
    >
      <editor-image v-if="editImageDialogUrl" :imageUrl="editImageDialogUrl"/>
    </el-dialog>
  </div>
</template>
<script setup>
import EditorImage from "@/components/editorImage/index.vue";
import { reactive, ref, defineEmits, defineProps } from 'vue';

const props = defineProps({
  dialogVisible: Boolean,
  editImageDialogUrl: String,
});
const emit = defineEmits(['handleCloseDialog']);

const handleCloseDialog = () => {
  emit("handleCloseDialog")
};

</script>
<style lang="scss" scoped>

</style>

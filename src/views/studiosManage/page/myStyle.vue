<template>
  <div class="myStyle">
    <div class="operateGroup">
      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :http-request="handleFileUploadType"
      >
        <el-button type="primary">上传图片</el-button>
      </el-upload>
    </div>
    <ul class="contentArea">
      <li v-for="item in paintingStyleList" :key="item.id">
        <el-image
          style="width: 170px; height: 170px"
          :src="item.content.url"
          fit="cover" />
      </li>
    </ul>
  </div>
</template>
<script setup name="myStyle">
import { addMyStyle, getMyStyle } from "@/api/project";

let paintingStyleList = $ref([]);
onMounted(async () => {
  paintingStyleList = await getMyStyle();
})

const handleFileUploadType = ({file}) => {
  const params = { file: file };
  addMyStyle(params).then(async (res) => {
    paintingStyleList = await getMyStyle();
  })
}
</script>
<style lang="scss" scoped>
div.myStyle {
  div.operateGroup {
    margin-bottom: 20px;
  }
  ul.contentArea {
    overflow: hidden;
    li {
      float: left;
      width: 170px;
      margin-right: 10px;
      img {
        width: 100%;
      }
    }
  }
}
</style>

<template>
  <div class="myStudio">
    <div class="extraContain">
      <tag-group
        :tagValue="tagValue"
        :tagList="tagList"
        @update:tagValue="handleChangeTag"
      />
    </div>
    <masonry-image
      class="masonry-image"
      :imageBlocks="myStudiosList"
      :showInfo="true"
      :imgStyle="{
        width: '342px',
        'margin-right': '15px',
      }"
      @selectImage="selectImage"
    />
  </div>
</template>
<script setup name="myStudio">
import MasonryImage from "@/components/masonryImage/index.vue"
import TagGroup from "@/components/tagGroup/index.vue"
import { getMyStudioProject } from "@/api/project";

const tagValue = "untitledStudio"
const tagList = [
  { name: "未命名口袋", value: "untitledStudio" },
  { name: "测试口袋", value: "testStudio" },
  { name: "成功口袋", value: "successStudio" },
]
const handleChangeTag = (value) => {
  console.log(value);
}

let myStudiosList = $ref([]);
onMounted(async () => {
  myStudiosList = await getMyStudioProject({ queryType: "MINE" });
  myStudiosList = myStudiosList.filter(item => {
    return item.hasOwnProperty("content")
  })
})

const router = useRouter();
const selectImage = (item) => {
  const { id, name } = item;
  router.push({
    name: 'studiosCreate',
    query: { id, name }
  })
}
</script>
<style lang="scss" scoped>
div.myStudio {
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  div.extraContain {
    margin-bottom: 20px;
  }
  div.masonry-image {
    overflow: auto;
    flex: 1;
    margin-bottom: 100px;
  }
}
</style>

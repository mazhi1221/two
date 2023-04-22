<template>
  <div class="collectStudio">
    <div class="extraContain">
      <tag-group
        :tagValue="tagValue"
        :tagList="tagList"
        @update:tagValue="handleChangeTag"
      />
    </div>
    <el-empty description="description" />
  </div>
</template>
<script setup>
import TagGroup from "@/components/tagGroup/index.vue"

const tagValue = "untitledStudio"
const tagList = [
  { name: "未命名口袋", value: "untitledStudio" },
  { name: "测试口袋", value: "testStudio" },
  { name: "成功口袋", value: "successStudio" },
]
const handleChangeTag = (value) => {
  console.log(value);
}

</script>
<style lang="scss" scoped>

</style>

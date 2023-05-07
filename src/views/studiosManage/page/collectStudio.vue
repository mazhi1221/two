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

<!--    <div class="gridTest">-->
<!--      <div class="item" v-for="i in 10">-->
<!--        <span>{{i}}</span>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>
<script setup name="collectStudio">
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
div.gridTest {
  width: 400px;
  height: 400px;
  background: orange;
  display: grid;
  grid-gap: 10px 50px;  //行、列间距
  grid-auto-rows: 30px; //默认行高
  >div.item {
    color: #fff;
    text-align: center;
    line-height: 30px;
    background: blue;
    width: 80%;
  }
}
</style>

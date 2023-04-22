<template>
  <div class="header">
    <div class="left">
      <span class="iconfont icon-shouye" @click="dumpHome"></span>
      <slot name="extraLeft"></slot>
    </div>
    <div class="right">
      <el-badge :value="0" class="item">
        <span class="iconfont icon-xiaoxi"></span>
      </el-badge>
      <avatar/>
    </div>
  </div>
</template>
<script setup>
import Avatar from "@/components/avatar/index.vue";

const router = useRouter();
const dumpHome = () => {
  router.push({
    name: 'homeView',
  })
}
</script>
<style lang="scss" scoped>
div.header {
  width: 100%;
  height: 83px;
  padding: 0 32px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2F2E2E;
  >div.left {
    display: flex;
    justify-content: start;
    align-items: center;
    span.iconfont {
      font-size: 18px;
      font-weight: 500;
      color: #FFFFFF;
      margin-right: 5px;
      cursor: pointer;
    }
  }
  >div.right {
    display: flex;
    justify-content: start;
    align-items: center;
    span.iconfont {
      font-size: 18px;
      font-weight: 500;
      color: #FFFFFF;
      margin-right: 5px;
    }
  }
}
</style>

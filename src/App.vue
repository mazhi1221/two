<template>
  <div class="baseViews">
    <router-view v-slot="{ Component }">
      <keep-alive include="designingScheme, lineDrawingGeneration, designInspiration">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
div.baseViews {
  width: 100%;
  height: 100%;
}
</style>

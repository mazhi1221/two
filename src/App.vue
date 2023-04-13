<template>
  <div class="baseViews">
    <KeepAlive include="designingScheme, lineDrawingGeneration, designInspiration">
      <router-view />
    </KeepAlive>
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

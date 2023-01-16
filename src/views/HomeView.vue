<template>
  <div class="HomeView" @click="increment">
    {{ state.count }}
  </div>
</template>
<script setup>
import { reactive } from 'vue';

const state = reactive({ count: 0 });

function increment() {
  state.count++;
}
</script>

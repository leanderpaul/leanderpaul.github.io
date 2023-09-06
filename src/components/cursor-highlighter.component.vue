<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue';

const mousePosition = reactive({ x: 0, y: 0 });
const cursorStyle = computed(() => ({ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }));
const handleMouseMove = (event: MouseEvent) => ((mousePosition.x = event.clientX), (mousePosition.y = event.clientY));

onMounted(() => window.addEventListener('mousemove', handleMouseMove));
</script>

<template>
  <div :style="cursorStyle"></div>
</template>

<style scoped>
div {
  box-shadow: 0 0 250px 250px #1b294b;
  position: absolute;
  pointer-events: none;
  z-index: 1;
}
</style>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue';

let robotsMeta: HTMLMetaElement | undefined;

onMounted(() => {
  robotsMeta = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]') ?? document.createElement('meta');
  robotsMeta.name = 'robots';
  robotsMeta.content = 'noindex';
  document.head.append(robotsMeta);
});

onBeforeUnmount(() => robotsMeta?.remove());
</script>
<template>
  <h1>Résumé</h1>
</template>

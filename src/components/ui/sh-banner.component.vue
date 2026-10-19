<template>
  <div class="strip" :data-intent="intent"><slot /></div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ intent?: 'info' | 'success' | 'warning' | 'danger' }>(), { intent: 'info' });
</script>

<style scoped>
.strip {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 40px;
  padding: 8px 16px;
  font-size: var(--sh-text-body-sm);
  line-height: var(--sh-text-body-sm--line-height);
  background: var(--banner-bg);
  color: var(--banner-text);
}

.strip[data-intent='info'] {
  --banner-bg: var(--sh-info-bg-subtle);
  --banner-text: var(--sh-info-text-on-subtle);
}

.strip[data-intent='success'] {
  --banner-bg: var(--sh-success-bg-subtle);
  --banner-text: var(--sh-success-text-on-subtle);
}

.strip[data-intent='warning'] {
  --banner-bg: var(--sh-warning-bg-subtle);
  --banner-text: var(--sh-warning-text-on-subtle);
}

.strip[data-intent='danger'] {
  --banner-bg: var(--sh-danger-bg-subtle);
  --banner-text: var(--sh-danger-text-on-subtle);
}
</style>

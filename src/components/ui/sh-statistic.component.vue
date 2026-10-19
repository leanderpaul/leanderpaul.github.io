<template>
  <div class="root">
    <div class="value">{{ value }}</div>
    <div class="label">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ value: string | number; label: string }>();
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.value {
  font-size: var(--sh-text-display);
  font-weight: 600;
  line-height: var(--sh-text-display--line-height);
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
  color: var(--sh-text-primary);
}

.label {
  font-size: var(--sh-text-body-sm);
  line-height: var(--sh-text-body-sm--line-height);
  font-weight: 500;
  color: var(--sh-text-secondary);
}
</style>

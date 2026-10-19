<template>
  <span class="root" :data-intent="intent"><slot /></span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ intent?: 'neutral' | 'info' | 'success' | 'warning' }>(), { intent: 'neutral' });
</script>

<style scoped>
.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: 20px;
  padding: 0 8px;
  border: var(--sh-border-width) solid transparent;
  border-radius: var(--sh-radius-full);
  background: var(--badge-subtle);
  color: var(--badge-text);
  font-size: var(--sh-text-caption);
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
}

.root[data-intent='neutral'] {
  --badge-subtle: var(--sh-neutral-bg-subtle);
  --badge-text: var(--sh-neutral-text-on-subtle);
}

.root[data-intent='info'] {
  --badge-subtle: var(--sh-info-bg-subtle);
  --badge-text: var(--sh-info-text-on-subtle);
}

.root[data-intent='success'] {
  --badge-subtle: var(--sh-success-bg-subtle);
  --badge-text: var(--sh-success-text-on-subtle);
}

.root[data-intent='warning'] {
  --badge-subtle: var(--sh-warning-bg-subtle);
  --badge-text: var(--sh-warning-text-on-subtle);
}
</style>

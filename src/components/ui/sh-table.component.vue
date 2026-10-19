<template>
  <div class="wrapper" :role="label ? 'region' : undefined" :aria-label="label" :tabindex="label ? 0 : undefined">
    <table class="table">
      <caption v-if="$slots.caption" class="caption">
        <slot name="caption" />
      </caption>
      <slot />
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{ label?: string }>();
</script>

<style scoped>
.wrapper {
  overflow-x: auto;
  background: var(--sh-surface-card);
  border: var(--sh-border-width) solid var(--sh-border-default);
  border-radius: var(--sh-radius-lg);
}

.wrapper:focus-visible {
  outline: var(--sh-focus-ring-width) solid var(--sh-focus-ring);
  outline-offset: var(--sh-focus-ring-offset);
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--sh-text-body-sm);
  line-height: var(--sh-text-body-sm--line-height);
  color: var(--sh-text-primary);
}

.caption {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: var(--sh-text-secondary);
}

.table :deep(th) {
  height: var(--sh-row-height);
  padding: 0 16px;
  background: var(--sh-surface-app);
  border-bottom: var(--sh-border-width) solid var(--sh-border-default);
  text-align: left;
  font-size: var(--sh-text-caption);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--sh-text-secondary);
  white-space: nowrap;
}

.table :deep(td) {
  height: var(--sh-row-height);
  padding: 8px 16px;
  vertical-align: top;
  color: var(--sh-text-primary);
}

.table :deep(tbody tr:not(:last-child) > *) {
  border-bottom: var(--sh-border-width) solid var(--sh-border-subtle);
}
</style>

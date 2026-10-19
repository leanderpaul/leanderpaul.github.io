<script lang="ts" setup>
import { ARCHIVE_FILTERS, type ArchiveFilter } from '@app/content';

const filter = defineModel<ArchiveFilter>({ required: true });
</script>

<template>
  <div class="group" role="group" aria-label="Filter projects">
    <button
      v-for="option in ARCHIVE_FILTERS"
      :key="option.value"
      class="option"
      type="button"
      :aria-pressed="filter === option.value"
      @click="filter = option.value"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.option {
  min-height: 36px;
  padding: 0 14px;
  border: var(--sh-border-width) solid var(--sh-border-default);
  border-radius: var(--sh-radius-full);
  background: var(--sh-surface-card);
  color: var(--sh-text-secondary);
  font: inherit;
  font-size: var(--sh-text-body-sm);
  font-weight: 500;
  transition:
    border-color var(--sh-duration-fast) var(--sh-ease-standard),
    color var(--sh-duration-fast) var(--sh-ease-standard);
}

.option:hover {
  border-color: var(--sh-border-interactive);
  color: var(--sh-text-primary);
}

.option[aria-pressed='true'] {
  border-color: var(--sh-accent);
  background: var(--sh-accent-soft);
  color: var(--sh-accent-text);
}

.option:focus-visible {
  outline: var(--sh-focus-ring-width) solid var(--sh-focus-ring);
  outline-offset: var(--sh-focus-ring-offset);
}

@media (prefers-reduced-motion: reduce) {
  .option {
    transition: none;
  }
}
</style>

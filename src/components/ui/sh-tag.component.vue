<template>
  <span class="root"><slot /></span>
</template>

<style scoped>
.root {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 8px;
  border: var(--sh-border-width) solid var(--sh-border-default);
  border-radius: var(--sh-radius-sm);
  background: var(--sh-neutral-bg-subtle);
  color: var(--sh-neutral-text-on-subtle);
  font-size: var(--sh-text-caption);
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
}
</style>

<template>
  <component :is="as" class="root" :data-interactive="interactive ? 'true' : undefined"><slot /></component>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ as?: 'article' | 'section' | 'div'; interactive?: boolean }>(), { as: 'div', interactive: false });
</script>

<style scoped>
.root {
  display: block;
  padding: 20px;
  border: var(--sh-border-width) solid var(--sh-border-default);
  border-radius: var(--sh-radius-lg);
  background: var(--sh-surface-card);
  color: var(--sh-text-primary);
  box-shadow: var(--sh-shadow-e1);
  transition: border-color var(--sh-duration-fast) var(--sh-ease-standard);
}

.root[data-interactive='true']:hover,
.root[data-interactive='true']:focus-within {
  border-color: var(--sh-border-interactive);
}

@media (prefers-reduced-motion: reduce) {
  .root {
    transition: none;
  }
}
</style>

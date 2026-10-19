<template>
  <component
    :is="isLink ? 'a' : 'button'"
    class="root"
    :data-variant="variant"
    :data-size="size"
    :type="isLink ? undefined : 'button'"
    :href="isLink && !disabled ? href : undefined"
    :disabled="!isLink && disabled ? true : undefined"
    :aria-disabled="isLink && disabled ? 'true' : undefined"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{ variant?: 'primary' | 'secondary' | 'ghost'; size?: 'sm' | 'md' | 'lg'; href?: string; disabled?: boolean }>(),
  {
    variant: 'secondary',
    size: 'md',
    href: undefined,
    disabled: false,
  },
);

const isLink = computed(() => props.href !== undefined);
</script>

<style scoped>
.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: var(--sh-border-width) solid transparent;
  font-family: inherit;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  text-decoration: none;
  user-select: none;
  transition:
    background-color var(--sh-duration-fast) var(--sh-ease-standard),
    border-color var(--sh-duration-fast) var(--sh-ease-standard),
    color var(--sh-duration-fast) var(--sh-ease-standard);
}

.root:focus-visible {
  outline: var(--sh-focus-ring-width) solid var(--sh-focus-ring);
  outline-offset: var(--sh-focus-ring-offset);
}

.root:disabled,
.root[aria-disabled='true'] {
  opacity: var(--sh-disabled-opacity);
}

.root[data-size='sm'] {
  height: var(--sh-control-height-sm);
  padding: 0 10px;
  border-radius: var(--sh-radius-sm);
  font-size: var(--sh-text-body-sm);
}

.root[data-size='md'] {
  height: var(--sh-control-height-md);
  padding: 0 12px;
  border-radius: var(--sh-radius-md);
  font-size: var(--sh-text-body-sm);
}

.root[data-size='lg'] {
  height: var(--sh-control-height-lg);
  padding: 0 16px;
  border-radius: var(--sh-radius-md);
  font-size: var(--sh-text-body);
}

.root[data-variant='primary'] {
  background-color: var(--sh-accent);
  color: var(--sh-on-accent);
}

.root[data-variant='primary']:not(:disabled):not([aria-disabled='true']):hover {
  background-color: var(--sh-accent-hover);
  color: var(--sh-on-accent);
}

.root[data-variant='primary']:not(:disabled):not([aria-disabled='true']):active {
  background-color: var(--sh-accent-active);
}

.root[data-variant='secondary'] {
  background-color: var(--sh-surface-card);
  border-color: var(--sh-border-default);
  color: var(--sh-text-primary);
}

.root[data-variant='secondary']:not(:disabled):not([aria-disabled='true']):hover {
  background-color: var(--sh-surface-well);
  border-color: var(--sh-border-strong);
  color: var(--sh-text-primary);
}

.root[data-variant='secondary']:not(:disabled):not([aria-disabled='true']):active {
  background-color: var(--sh-bg-pressed);
}

.root[data-variant='ghost'] {
  background-color: transparent;
  color: var(--sh-text-primary);
}

.root[data-variant='ghost']:not(:disabled):not([aria-disabled='true']):hover {
  background-color: var(--sh-bg-hover);
  color: var(--sh-text-primary);
}

.root[data-variant='ghost']:not(:disabled):not([aria-disabled='true']):active {
  background-color: var(--sh-bg-pressed);
}

@media (pointer: coarse) {
  .root {
    min-height: var(--sh-tap-target);
  }
}

@media (prefers-reduced-motion: reduce) {
  .root {
    transition: none;
  }
}
</style>

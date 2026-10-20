<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { type Theme, applyTheme, getCurrentTheme, getStoredTheme, startViewTransition, storeTheme, watchSystemTheme } from '@app/utils';

const REVEAL_DURATION_MS = 480;

const theme = ref<Theme>(getCurrentTheme());
const isDark = computed(() => theme.value === 'dark');
let stopWatching: (() => void) | undefined;

function setTheme(next: Theme) {
  theme.value = next;
  applyTheme(next);
  storeTheme(next);
}

function revealFrom(origin: DOMRect, next: Theme) {
  const root = document.documentElement;
  root.dataset.transition = 'theme';
  const transition = startViewTransition(() => setTheme(next));
  if (!transition) {
    delete root.dataset.transition;
    setTheme(next);
    return;
  }
  const x = origin.left + origin.width / 2;
  const y = origin.top + origin.height / 2;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  transition.ready
    .then(() => {
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`];
      root.animate(
        { clipPath },
        { duration: REVEAL_DURATION_MS, easing: 'cubic-bezier(0.3, 0, 0, 1)', pseudoElement: '::view-transition-new(root)' },
      );
    })
    .catch(() => undefined);
  transition.finished.finally(() => delete root.dataset.transition);
}

function toggle(event: MouseEvent) {
  if (!(event.currentTarget instanceof HTMLElement)) return;
  revealFrom(event.currentTarget.getBoundingClientRect(), isDark.value ? 'light' : 'dark');
}

onMounted(() => {
  stopWatching = watchSystemTheme(system => {
    if (getStoredTheme()) return;
    theme.value = system;
    applyTheme(system);
  });
});

onBeforeUnmount(() => stopWatching?.());
</script>
<template>
  <button class="theme-toggle" type="button" aria-label="Dark theme" :aria-pressed="isDark" @click="toggle">
    <svg
      v-if="isDark"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
    <svg
      v-else
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  </button>
</template>
<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--sh-tap-target);
  height: var(--sh-tap-target);
  padding: 0px;
  color: var(--sh-text-primary);
  background-color: transparent;
  border: var(--sh-border-width) solid transparent;
  border-radius: var(--sh-radius-md);
  cursor: pointer;
  transition:
    color var(--sh-duration-normal) var(--sh-ease-standard),
    background-color var(--sh-duration-normal) var(--sh-ease-standard);
}

.theme-toggle:hover {
  color: var(--sh-accent-text);
  background-color: var(--sh-accent-soft);
}

.theme-toggle svg {
  transition: rotate var(--sh-duration-slow) var(--sh-ease-emphasized);
}

.theme-toggle:hover svg {
  rotate: 20deg;
}

@media (prefers-reduced-motion: reduce) {
  .theme-toggle svg {
    transition: none;
  }
}
</style>

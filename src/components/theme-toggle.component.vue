<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { type Theme, applyTheme, getCurrentTheme, getStoredTheme, storeTheme, watchSystemTheme } from '@app/utils';

const theme = ref<Theme>(getCurrentTheme());
const isDark = computed(() => theme.value === 'dark');
let stopWatching: (() => void) | undefined;

function toggle() {
  const next: Theme = isDark.value ? 'light' : 'dark';
  theme.value = next;
  applyTheme(next);
  storeTheme(next);
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
  width: 40px;
  height: 40px;
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
</style>

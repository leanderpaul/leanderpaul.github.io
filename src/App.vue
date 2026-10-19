<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { Footer, Navbar, SocialRail } from '@app/components';

const route = useRoute();
const router = useRouter();
const mainElement = ref<HTMLElement>();
const hasChrome = computed(() => (route.name ?? router.resolve(window.location.pathname).name) !== 'Resume');

function focusMain() {
  mainElement.value?.focus();
}
</script>

<template>
  <div class="app">
    <template v-if="hasChrome">
      <a class="skip-link" href="#main" @click.prevent="focusMain">Skip to content</a>
      <Navbar />
    </template>
    <main id="main" ref="mainElement" tabindex="-1" :class="{ container: hasChrome }">
      <router-view />
    </main>
    <template v-if="hasChrome">
      <SocialRail />
      <Footer />
    </template>
  </div>
</template>
<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: var(--sh-viewport-height);
}

main {
  flex: 1;
}

main:focus-visible {
  outline: none;
}

.container {
  display: flex;
  width: 100%;
  max-width: 1024px;
  margin: 0px auto;
  padding: 70px 80px 0px 80px;
}

.container > * {
  flex: 1;
  min-width: 0;
}

.skip-link {
  position: fixed;
  top: 8px;
  left: 8px;
  z-index: var(--sh-z-popover);
  padding: 8px 16px;
  color: var(--sh-text-primary);
  background-color: var(--sh-surface-card);
  border: var(--sh-border-width) solid var(--sh-border-default);
  border-radius: var(--sh-radius-md);
  box-shadow: var(--sh-shadow-e1);
  transform: translateY(calc(-100% - 16px));
}

.skip-link:focus {
  transform: none;
}

@media (max-width: 768px) {
  .container {
    max-width: 768px;
    padding: 70px 24px 0px 24px;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .container {
    padding: 70px 100px 0px 100px;
  }
}
</style>

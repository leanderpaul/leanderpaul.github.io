<template>
  <div>
    <p class="code" aria-hidden="true">404</p>
    <h1>Page Not Found</h1>
    <router-link v-slot="{ href, navigate }" custom to="/">
      <ShButton variant="primary" size="lg" :href="href" @click="navigate">Go home</ShButton>
    </router-link>
  </div>
</template>
<script lang="ts" setup>
import { ShButton } from '@app/components';
</script>
<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  margin: auto;
  text-align: center;
}

.code {
  font-family: var(--sh-font-mono);
  font-size: var(--sh-text-hero);
  line-height: var(--sh-text-hero--line-height);
  font-weight: 500;
  color: var(--sh-accent-text);
}

h1 {
  margin: 16px 0px 32px;
  font-size: var(--sh-text-h1);
  line-height: var(--sh-text-h1--line-height);
  font-weight: 400;
  color: var(--sh-text-secondary);
}
</style>

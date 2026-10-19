<script lang="ts" setup>
import { ABOUT_TEXT } from '@app/content';

import HomeSection from './home-section.component.vue';
</script>

<template>
  <HomeSection id="about" title="About">
    <div class="content">
      <p class="text">{{ ABOUT_TEXT }}</p>
      <img class="photo" src="/images/me.jpeg" alt="Leander Paul" width="380" height="475" loading="lazy" decoding="async" />
    </div>
  </HomeSection>
</template>

<style scoped>
.content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 200px;
  align-items: start;
  gap: 48px;
}

.text {
  max-width: 68ch;
  color: var(--sh-text-secondary);
}

.photo {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border: var(--sh-border-width) solid var(--sh-border-default);
  border-radius: var(--sh-radius-lg);
  background: var(--sh-surface-well);
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }

  .photo {
    grid-row: 1;
    max-width: 160px;
  }
}
</style>

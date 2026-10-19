<script lang="ts" setup>
import { ShButton } from '@app/components/ui';
import { CONTACT_SECTION, PROFILE, RESUME_DOWNLOAD_NAME, RESUME_FILE } from '@app/content';

import HomeSection from './home-section.component.vue';
</script>

<template>
  <HomeSection id="contact" :title="CONTACT_SECTION.heading">
    <template #lead>{{ CONTACT_SECTION.text }}</template>
    <a class="email" :href="`mailto:${PROFILE.email}`">{{ PROFILE.email }}</a>
    <ul class="links" role="list">
      <li><a :href="PROFILE.links.linkedin" target="_blank" rel="noopener">LinkedIn</a></li>
      <li><a :href="PROFILE.links.github" target="_blank" rel="noopener">GitHub</a></li>
    </ul>
    <ShButton class="resume" variant="primary" size="lg" :href="RESUME_FILE" :download="RESUME_DOWNLOAD_NAME"
      >Download résumé (PDF)</ShButton
    >
  </HomeSection>
</template>

<style scoped>
.email {
  font-size: var(--sh-text-h2);
  line-height: var(--sh-text-h2--line-height);
  font-weight: 600;
  overflow-wrap: anywhere;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0 24px;
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
}

.links a {
  display: inline-flex;
  align-items: center;
  min-height: var(--sh-tap-target);
  font-weight: 500;
}

.resume {
  margin-top: 24px;
}
</style>

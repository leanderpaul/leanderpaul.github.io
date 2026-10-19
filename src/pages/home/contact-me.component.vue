<script lang="ts" setup>
import { ShCard } from '@app/components/ui';
import { CONTACT_SECTION, PROFILE, RESUME_FILES, RESUME_VARIANTS } from '@app/content';

import HomeSection from './home-section.component.vue';
</script>

<template>
  <HomeSection id="contact" :title="CONTACT_SECTION.heading">
    <template #lead>{{ CONTACT_SECTION.text }}</template>
    <div class="content">
      <div class="reach">
        <a class="email" :href="`mailto:${PROFILE.email}`">{{ PROFILE.email }}</a>
        <ul class="social" role="list">
          <li><a :href="PROFILE.links.linkedin" target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a :href="PROFILE.links.github" target="_blank" rel="noopener">GitHub</a></li>
        </ul>
      </div>
      <ShCard class="resumes">
        <h3 class="resumes-title">Résumé</h3>
        <ul class="variants" role="list">
          <li v-for="variant in RESUME_VARIANTS" :key="variant" class="variant">
            <span class="label">{{ RESUME_FILES[variant].label }}</span>
            <span class="actions">
              <a
                :href="RESUME_FILES[variant].file"
                target="_blank"
                rel="noopener"
                :aria-label="`View ${RESUME_FILES[variant].label} résumé (PDF)`"
                >View</a
              >
              <a
                :href="RESUME_FILES[variant].file"
                :download="`Leander_Paul-Resume-${RESUME_FILES[variant].label}.pdf`"
                :aria-label="`Download ${RESUME_FILES[variant].label} résumé (PDF)`"
                >Download</a
              >
            </span>
          </li>
        </ul>
      </ShCard>
    </div>
  </HomeSection>
</template>

<style scoped>
.content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 20rem);
  align-items: start;
  gap: 32px 48px;
}

.email {
  font-size: var(--sh-text-h2);
  line-height: var(--sh-text-h2--line-height);
  font-weight: 600;
  overflow-wrap: anywhere;
}

.social {
  display: flex;
  flex-wrap: wrap;
  gap: 0 24px;
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
}

.social a,
.actions a {
  display: inline-flex;
  align-items: center;
  min-height: var(--sh-tap-target);
  font-weight: 500;
}

.resumes-title {
  font-size: var(--sh-text-body);
  line-height: var(--sh-text-body--line-height);
  font-weight: 600;
  color: var(--sh-text-secondary);
}

.variants {
  margin: 8px 0 0;
  padding: 0;
  list-style: none;
}

.variant {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0 16px;
}

.variant:not(:last-child) {
  border-bottom: var(--sh-border-width) solid var(--sh-border-subtle);
}

.label {
  font-weight: 500;
  color: var(--sh-text-primary);
}

.actions {
  display: flex;
  gap: 16px;
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>

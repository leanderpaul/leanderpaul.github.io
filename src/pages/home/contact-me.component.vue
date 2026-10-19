<script lang="ts" setup>
import { CONTACT_SECTION, PROFILE, RESUME_FILES, RESUME_VARIANTS } from '@app/content';
</script>
<template>
  <div id="contact-me" class="section">
    <h2 class="heading">{{ CONTACT_SECTION.heading }}</h2>
    <div class="content">
      <p>{{ CONTACT_SECTION.text }}</p>
      <a :href="`mailto:${PROFILE.email}`" class="email">{{ PROFILE.email }}</a>
      <p class="links">
        <a :href="PROFILE.links.linkedin" target="_blank" rel="noopener">LinkedIn</a>
        <a :href="PROFILE.links.github" target="_blank" rel="noopener">GitHub</a>
      </p>
      <ul class="resumes">
        <li v-for="variant in RESUME_VARIANTS" :key="variant">
          <span>Résumé ({{ RESUME_FILES[variant].label }})</span>
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
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 200px;
}

.heading {
  text-align: center;
}

p {
  max-width: 500px;
  text-align: center;
  color: var(--sh-text-secondary);
}

.email {
  margin-top: 32px;
  font-size: var(--sh-text-h2);
  line-height: var(--sh-text-h2--line-height);
  font-weight: 500;
}

.links {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.resumes {
  margin-top: 32px;
  padding: 0;
  list-style: none;
}

.resumes li {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 8px;
}

.resumes span {
  color: var(--sh-text-secondary);
}

@media (max-width: 768px) {
  .content {
    margin-bottom: 125px;
  }
}
</style>

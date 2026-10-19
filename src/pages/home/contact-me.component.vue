<script lang="ts" setup>
import { CONTACT_SECTION, PROFILE, RESUME_FILES, RESUME_VARIANTS } from '@app/content';
</script>
<template>
  <div id="contact-me" class="section">
    <h3 class="heading">{{ CONTACT_SECTION.heading }}</h3>
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
          <a :href="RESUME_FILES[variant].file" target="_blank" rel="noopener">View</a>
          <a :href="RESUME_FILES[variant].file" :download="`Leander_Paul-Resume-${RESUME_FILES[variant].label}.pdf`">Download</a>
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
  color: var(--color-primary);
}

p {
  max-width: 500px;
  text-align: center;
}

.email {
  margin-top: 30px;
  font-size: 1.25rem;
  color: var(--color-primary);
}

.links {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.resumes {
  list-style: none;
  padding: 0;
  margin-top: 30px;
}

.resumes li {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 8px;
}

.resumes a {
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .content {
    margin-bottom: 125px;
  }
}
</style>

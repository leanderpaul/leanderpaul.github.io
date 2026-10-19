<script lang="ts" setup>
import { ShButton } from '@app/components/ui';
import { PROFILE, RESUME_FILES } from '@app/content';
import { getResumeVariant } from '@app/utils';

const resumeFile = RESUME_FILES[getResumeVariant()].file;
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <p class="availability">{{ PROFILE.availability }}</p>
    <h1 id="hero-title" class="name">{{ PROFILE.name }}</h1>
    <p class="headline">{{ PROFILE.headline }}</p>
    <p class="tagline">{{ PROFILE.tagline }}</p>
    <div class="actions">
      <router-link v-slot="{ href, navigate }" custom :to="{ hash: '#work' }">
        <ShButton variant="primary" size="lg" :href="href" @click="navigate">View selected work</ShButton>
      </router-link>
      <ShButton
        variant="secondary"
        size="lg"
        :href="resumeFile"
        target="_blank"
        rel="noopener"
        aria-label="Résumé (PDF, opens in a new tab)"
      >
        Résumé
      </ShButton>
      <ShButton variant="secondary" size="lg" :href="PROFILE.links.github" target="_blank" rel="noopener">GitHub</ShButton>
    </div>
    <p class="email">
      <a :href="`mailto:${PROFILE.email}`">{{ PROFILE.email }}</a>
    </p>
  </section>
</template>

<style scoped>
.hero {
  padding: 112px 0 56px;
}

.availability {
  margin-bottom: 16px;
  font-family: var(--sh-font-mono);
  font-size: var(--sh-text-code);
  line-height: var(--sh-text-code--line-height);
  color: var(--sh-text-secondary);
}

.name {
  font-size: var(--sh-text-hero);
  line-height: var(--sh-text-hero--line-height);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.headline {
  max-width: 30ch;
  margin-top: 16px;
  font-size: var(--sh-text-h1);
  line-height: var(--sh-text-h1--line-height);
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--sh-text-primary);
  text-wrap: balance;
}

.tagline {
  max-width: 64ch;
  margin-top: 20px;
  color: var(--sh-text-secondary);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.email {
  margin-top: 24px;
  font-family: var(--sh-font-mono);
  font-size: var(--sh-text-code);
  line-height: var(--sh-text-code--line-height);
  overflow-wrap: anywhere;
}

.email a {
  display: inline-flex;
  align-items: center;
  min-height: var(--sh-tap-target);
}

.headline,
.tagline {
  overflow-wrap: anywhere;
}

@media (max-width: 768px) {
  .hero {
    padding: 72px 0 40px;
  }

  .headline {
    font-size: var(--sh-text-h2);
    line-height: var(--sh-text-h2--line-height);
  }
}

@media (max-width: 480px) {
  .actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .actions > :first-child {
    grid-column: 1 / -1;
  }
}
</style>

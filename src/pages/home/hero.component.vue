<script lang="ts" setup>
import { ShButton } from '@app/components/ui';
import { HERO_CONTEXT, PROFILE, RESUME_DOWNLOAD_NAME, RESUME_FILE } from '@app/content';
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <p class="location">Based in {{ PROFILE.location }}</p>
    <h1 id="hero-title" class="name">{{ PROFILE.name }}</h1>
    <p class="headline">{{ PROFILE.headline }}</p>
    <p class="context">{{ HERO_CONTEXT.join(' · ') }}</p>
    <p class="tagline">{{ PROFILE.tagline }}</p>
    <div class="actions">
      <ShButton variant="primary" size="lg" :href="RESUME_FILE" :download="RESUME_DOWNLOAD_NAME">Download résumé</ShButton>
      <router-link v-slot="{ href, navigate }" custom :to="{ hash: '#contact' }">
        <ShButton variant="secondary" size="lg" :href="href" @click="navigate">Contact</ShButton>
      </router-link>
      <ShButton variant="secondary" size="lg" :href="PROFILE.links.github" target="_blank" rel="noopener">GitHub</ShButton>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 112px 0 56px;
}

.location {
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

.context {
  margin-top: 12px;
  font-weight: 500;
  color: var(--sh-text-primary);
}

.tagline {
  max-width: 64ch;
  margin-top: 16px;
  color: var(--sh-text-secondary);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
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

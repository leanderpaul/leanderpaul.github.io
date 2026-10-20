<script lang="ts" setup>
import SocialIcon from '@app/components/social-icon.component.vue';
import { SOCIAL_LINKS } from '@app/components/social-links.util';
import { ShButton } from '@app/components/ui';
import { HERO_CONTEXT, PROFILE, RESUME_DOWNLOAD_NAME, RESUME_FILE } from '@app/content';

import TokenCard from './token-card.component.vue';
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="intro">
      <p class="location">Based in {{ PROFILE.location }}</p>
      <h1 id="hero-title" class="name">{{ PROFILE.name }}</h1>
      <p class="headline">{{ PROFILE.headline }}</p>
      <p class="context">
        <template v-for="(item, index) in HERO_CONTEXT" :key="item">
          <span class="fact">{{ item }}</span>
          <template v-if="index < HERO_CONTEXT.length - 1"> · </template>
        </template>
      </p>
      <p class="tagline">{{ PROFILE.tagline }}</p>
      <div class="actions">
        <ShButton variant="primary" size="lg" :href="RESUME_FILE" :download="RESUME_DOWNLOAD_NAME">Download résumé</ShButton>
        <router-link v-slot="{ href, navigate }" custom :to="{ hash: '#contact' }">
          <ShButton variant="secondary" size="lg" :href="href" @click="navigate">Contact</ShButton>
        </router-link>
      </div>
      <ul class="socials" role="list">
        <li v-for="link in SOCIAL_LINKS" :key="link.label">
          <a
            class="social"
            :href="link.href"
            :aria-label="link.label"
            :title="link.label"
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener' : undefined"
          >
            <SocialIcon :icon="link.icon" />
          </a>
        </li>
      </ul>
    </div>
    <TokenCard class="card" />
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 48px;
  align-items: center;
  padding: 112px 0 72px;
}

.hero::before,
.hero::after {
  content: '';
  position: absolute;
  inset: -100px 0 0 50%;
  z-index: -1;
  width: 100vw;
  translate: -50% 0;
  pointer-events: none;
}

.hero::before {
  background-image: radial-gradient(color-mix(in srgb, var(--sh-text-primary) 16%, transparent) 1px, transparent 1.5px);
  background-size: 22px 22px;
  mask-image: radial-gradient(ellipse 60% 70% at 70% 45%, #000 20%, transparent 75%);
}

.hero::after {
  background: radial-gradient(560px circle at 72% 48%, color-mix(in srgb, var(--sh-accent) 14%, transparent), transparent 70%);
}

.location {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  font-family: var(--sh-font-mono);
  font-size: var(--sh-text-code);
  line-height: var(--sh-text-code--line-height);
  color: var(--sh-text-secondary);
}

.location::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: var(--sh-radius-full);
  background: var(--sh-accent);
  box-shadow: 0 0 0 4px var(--sh-accent-soft);
}

.name {
  font-size: var(--sh-text-hero);
  line-height: var(--sh-text-hero--line-height);
  font-weight: 700;
  letter-spacing: -0.035em;
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

.fact {
  white-space: nowrap;
}

.tagline {
  max-width: 60ch;
  margin-top: 16px;
  color: var(--sh-text-secondary);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.socials {
  display: flex;
  gap: 4px;
  margin: 20px -10px 0;
  padding: 0;
  list-style: none;
}

.social {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--sh-tap-target);
  height: var(--sh-tap-target);
  color: var(--sh-text-secondary);
  border-radius: var(--sh-radius-md);
  transition:
    color var(--sh-duration-fast) var(--sh-ease-standard),
    background-color var(--sh-duration-fast) var(--sh-ease-standard);
}

.social:hover {
  color: var(--sh-accent-text);
  background-color: var(--sh-accent-soft);
}

.headline,
.tagline {
  overflow-wrap: anywhere;
}

.card {
  max-width: 440px;
}

@media (min-width: 1080px) {
  .hero {
    grid-template-columns: minmax(0, 1fr) 400px;
    gap: 56px;
  }

  .card {
    max-width: none;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .intro > * {
    animation: rise 600ms var(--sh-ease-emphasized) both;
  }

  .intro > :nth-child(2) {
    animation-delay: 60ms;
  }

  .intro > :nth-child(3) {
    animation-delay: 120ms;
  }

  .intro > :nth-child(4) {
    animation-delay: 180ms;
  }

  .intro > :nth-child(5) {
    animation-delay: 240ms;
  }

  .intro > :nth-child(n + 6) {
    animation-delay: 300ms;
  }
}

@keyframes rise {
  from {
    opacity: 0;
    translate: 0 12px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 72px 0 48px;
  }

  .headline {
    font-size: var(--sh-text-h2);
    line-height: var(--sh-text-h2--line-height);
  }
}

@media (max-width: 480px) {
  .actions {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>

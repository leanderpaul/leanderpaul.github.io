<script lang="ts" setup>
import { onBeforeUnmount, ref } from 'vue';

import SocialIcon from '@app/components/social-icon.component.vue';
import { SOCIAL_LINKS } from '@app/components/social-links.util';
import { ShButton } from '@app/components/ui';
import { CONTACT_SECTION, PROFILE, RESUME_DOWNLOAD_NAME, RESUME_FILE } from '@app/content';

import HomeSection from './home-section.component.vue';

type CopyState = 'idle' | 'copied' | 'failed';

const COPY_RESET_MS = 2400;

const COPY_LABELS: Record<CopyState, string> = { idle: 'Copy email', copied: 'Copied', failed: 'Copy failed' };

const PROFILE_LINKS = SOCIAL_LINKS.filter(link => link.icon === 'linkedin' || link.icon === 'github');

const copyState = ref<CopyState>('idle');
let resetTimer: ReturnType<typeof setTimeout> | undefined;

async function copyEmail() {
  clearTimeout(resetTimer);
  try {
    await navigator.clipboard.writeText(PROFILE.email);
    copyState.value = 'copied';
  } catch {
    copyState.value = 'failed';
  }
  resetTimer = setTimeout(() => (copyState.value = 'idle'), COPY_RESET_MS);
}

onBeforeUnmount(() => clearTimeout(resetTimer));
</script>

<template>
  <HomeSection id="contact" :title="CONTACT_SECTION.heading">
    <div class="panel">
      <p class="lead">{{ CONTACT_SECTION.text }}</p>
      <a class="email" :href="`mailto:${PROFILE.email}`">{{ PROFILE.email }}</a>
      <div class="actions">
        <ShButton variant="secondary" size="lg" @click="copyEmail">{{ COPY_LABELS[copyState] }}</ShButton>
        <ShButton variant="primary" size="lg" :href="RESUME_FILE" :download="RESUME_DOWNLOAD_NAME">Download résumé (PDF)</ShButton>
      </div>
      <p class="visually-hidden" role="status">{{ copyState === 'idle' ? '' : COPY_LABELS[copyState] }}</p>
      <ul class="links" role="list">
        <li v-for="link in PROFILE_LINKS" :key="link.label">
          <a class="link" :href="link.href" target="_blank" rel="noopener"><SocialIcon :icon="link.icon" />{{ link.label }}</a>
        </li>
      </ul>
    </div>
  </HomeSection>
</template>

<style scoped>
.panel {
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 72px 32px;
  overflow: hidden;
  text-align: center;
  color: var(--sh-neutral-300);
  background: var(--sh-neutral-950);
  border: var(--sh-border-width) solid var(--sh-neutral-800);
  border-radius: var(--sh-radius-2xl);
  box-shadow: 0 24px 48px -36px color-mix(in srgb, var(--sh-indigo-600) 35%, transparent);
}

.panel::before,
.panel::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

.panel::before {
  background-image: radial-gradient(rgb(255 255 255 / 0.14) 1px, transparent 1.5px);
  background-size: 22px 22px;
  mask-image: radial-gradient(ellipse 70% 80% at 50% 0%, #000 10%, transparent 70%);
}

.panel::after {
  background: radial-gradient(640px circle at 50% -10%, rgb(91 92 235 / 0.26), transparent 65%);
}

.lead {
  max-width: 46ch;
  font-size: 1.125rem;
  line-height: 1.6;
  text-wrap: balance;
}

.email {
  margin-top: 20px;
  font-size: clamp(1.25rem, 0.75rem + 2.6vw, 2.75rem);
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--sh-neutral-white);
  text-decoration: none;
  overflow-wrap: anywhere;
}

.email:hover {
  color: var(--sh-indigo-300);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}

.links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px 20px;
  margin: 24px 0 0;
  padding: 0;
  list-style: none;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: var(--sh-tap-target);
  font-weight: 500;
  color: var(--sh-neutral-300);
  text-decoration: none;
}

.link:hover {
  color: var(--sh-neutral-white);
}

@media (max-width: 640px) {
  .panel {
    padding: 48px 20px;
  }
}

@media (max-width: 480px) {
  .actions {
    display: grid;
    width: 100%;
  }
}
</style>

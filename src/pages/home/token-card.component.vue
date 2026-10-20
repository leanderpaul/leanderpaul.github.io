<script lang="ts" setup>
import { PROFILE_TOKEN } from '@app/content';

const SIGNATURE = '3ZzuXN2lbij103Epye5tl3UxafgSxEKCucCONFSdlcbNhrEMZ51JQZpLQciC_SdvLyWhpNibUr7h5rc1C5RrKQ';

const CLAIMS = Object.entries(PROFILE_TOKEN.payload);

function toBase64Url(value: unknown): string {
  return btoa(JSON.stringify(value)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function formatValue(value: string | string[]): string {
  return Array.isArray(value) ? `[${value.map(item => JSON.stringify(item)).join(', ')}]` : JSON.stringify(value);
}
</script>

<template>
  <figure class="token" aria-label="My profile, written as a decoded ID token">
    <header class="bar">
      <span class="name">id_token</span>
      <span class="alg">{{ PROFILE_TOKEN.header.alg }} · {{ PROFILE_TOKEN.header.typ }}</span>
    </header>
    <p class="encoded" aria-hidden="true">
      <span class="part part--header">{{ toBase64Url(PROFILE_TOKEN.header) }}</span
      >.<span class="part part--payload">{{ toBase64Url(PROFILE_TOKEN.payload) }}</span
      >.<span class="part part--signature">{{ SIGNATURE }}</span>
    </p>
    <p class="label">Payload</p>
    <code class="payload">
      <span class="line punct">{</span>
      <span v-for="([key, value], index) in CLAIMS" :key="key" class="line claim" :style="{ '--line': index }">
        <span class="key">"{{ key }}"</span><span class="punct">: </span><span class="value">{{ formatValue(value) }}</span
        ><span v-if="index < CLAIMS.length - 1" class="punct">,</span>
      </span>
      <span class="line punct">}</span>
    </code>
  </figure>
</template>

<style scoped>
.token {
  position: relative;
  margin: 0;
  overflow: hidden;
  font-family: var(--sh-font-mono);
  font-size: 0.78125rem;
  line-height: 1.6;
  background: var(--sh-surface-card);
  border: var(--sh-border-width) solid var(--sh-border-default);
  border-radius: var(--sh-radius-xl);
  box-shadow:
    0 1px 2px rgb(15 15 30 / 0.04),
    0 24px 48px -24px color-mix(in srgb, var(--sh-accent) 28%, transparent);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 20px;
  border-bottom: var(--sh-border-width) solid var(--sh-border-subtle);
  background: var(--sh-surface-well);
}

.name {
  font-weight: 600;
  color: var(--sh-text-primary);
}

.alg {
  color: var(--sh-text-tertiary);
}

.encoded {
  display: -webkit-box;
  margin: 16px 20px;
  overflow: hidden;
  word-break: break-all;
  color: var(--sh-text-tertiary);
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.part--header {
  color: var(--sh-text-secondary);
}

.part--payload {
  color: var(--sh-accent-text);
}

.part--signature {
  color: var(--sh-text-tertiary);
}

.label {
  margin: 0;
  padding: 14px 20px 0;
  border-top: var(--sh-border-width) solid var(--sh-border-subtle);
  font-size: var(--sh-text-caption);
  line-height: var(--sh-text-caption--line-height);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sh-text-tertiary);
}

.payload {
  display: block;
  padding: 8px 20px 20px;
  overflow-x: auto;
  font-size: inherit;
  line-height: inherit;
  color: var(--sh-text-primary);
}

.line {
  display: block;
  white-space: pre;
}

.claim {
  padding-left: 2ch;
}

.key {
  color: var(--sh-accent-text);
}

.punct {
  color: var(--sh-text-tertiary);
}

@media (max-width: 480px) {
  .token {
    font-size: 0.6875rem;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .token {
    animation: rise 700ms var(--sh-ease-emphasized) 240ms both;
  }

  .part {
    animation: fade 900ms var(--sh-ease-standard) both;
  }

  .part--payload {
    animation-delay: 360ms;
  }

  .part--signature {
    animation-delay: 720ms;
  }

  .claim {
    animation: fade 420ms var(--sh-ease-standard) both;
    animation-delay: calc(560ms + var(--line) * 70ms);
  }
}

@keyframes rise {
  from {
    opacity: 0;
    translate: 0 16px;
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }
}
</style>

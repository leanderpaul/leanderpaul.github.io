<script lang="ts" setup>
import { ABOUT_FACTS, ABOUT_TEXT } from '@app/content';
import { vReveal } from '@app/utils';

import HomeSection from './home-section.component.vue';
</script>

<template>
  <HomeSection id="about" title="About">
    <div class="content">
      <figure v-reveal class="portrait">
        <span class="corner corner--tl" aria-hidden="true"></span>
        <span class="corner corner--tr" aria-hidden="true"></span>
        <span class="corner corner--bl" aria-hidden="true"></span>
        <span class="corner corner--br" aria-hidden="true"></span>
        <div class="ring">
          <div class="frame">
            <img class="photo" src="/images/me.jpeg" alt="Leander Paul" width="380" height="475" loading="lazy" decoding="async" />
            <span class="scan" aria-hidden="true"></span>
            <span class="badge" aria-hidden="true"><span class="badge-subject">sub: leander-paul · </span>verified</span>
          </div>
        </div>
      </figure>
      <div class="story">
        <p class="text">{{ ABOUT_TEXT }}</p>
        <dl class="facts">
          <div v-for="fact in ABOUT_FACTS" :key="fact.label" class="fact">
            <dt>{{ fact.label }}</dt>
            <dd>{{ fact.value }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </HomeSection>
</template>

<style scoped>
.content {
  display: grid;
  grid-template-columns: 290px minmax(0, 1fr);
  align-items: center;
  gap: 64px;
}

.portrait {
  position: relative;
  margin: 0;
  padding: 18px;
}

.portrait[data-reveal='hidden'] {
  opacity: 1;
  translate: none;
}

.corner {
  position: absolute;
  width: 28px;
  height: 28px;
  border: 2px solid var(--sh-accent);
  transition:
    translate 700ms var(--sh-ease-emphasized),
    opacity 500ms var(--sh-ease-emphasized);
}

.corner--tl {
  top: 0;
  left: 0;
  border-right: 0;
  border-bottom: 0;
  border-top-left-radius: 10px;
}

.corner--tr {
  top: 0;
  right: 0;
  border-bottom: 0;
  border-left: 0;
  border-top-right-radius: 10px;
}

.corner--bl {
  bottom: 0;
  left: 0;
  border-top: 0;
  border-right: 0;
  border-bottom-left-radius: 10px;
}

.corner--br {
  right: 0;
  bottom: 0;
  border-top: 0;
  border-left: 0;
  border-bottom-right-radius: 10px;
}

.portrait[data-reveal='hidden'] .corner {
  opacity: 0;
  transition: none;
}

.portrait[data-reveal='hidden'] .corner--tl {
  translate: -22px -22px;
}

.portrait[data-reveal='hidden'] .corner--tr {
  translate: 22px -22px;
}

.portrait[data-reveal='hidden'] .corner--bl {
  translate: -22px 22px;
}

.portrait[data-reveal='hidden'] .corner--br {
  translate: 22px 22px;
}

.portrait:hover .corner--tl {
  translate: 8px 8px;
}

.portrait:hover .corner--tr {
  translate: -8px 8px;
}

.portrait:hover .corner--bl {
  translate: 8px -8px;
}

.portrait:hover .corner--br {
  translate: -8px -8px;
}

.ring {
  position: relative;
  isolation: isolate;
  padding: 2px;
  border-radius: calc(var(--sh-radius-xl) + 2px);
  box-shadow: 0 24px 48px -28px color-mix(in srgb, var(--sh-accent) 45%, transparent);
}

.ring::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: conic-gradient(
    from var(--orbit-angle),
    transparent 0deg,
    var(--sh-accent) 60deg,
    var(--sh-indigo-300) 90deg,
    transparent 150deg,
    transparent 360deg
  );
  opacity: 0;
  transition: opacity 400ms var(--sh-ease-standard);
}

.portrait:hover .ring::before {
  opacity: 1;
  animation: orbit 2.4s linear infinite;
}

.frame {
  position: relative;
  overflow: hidden;
  border-radius: var(--sh-radius-xl);
}

.photo {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  background: var(--sh-surface-well);
  clip-path: inset(0 round var(--sh-radius-xl));
  transition:
    clip-path 1300ms cubic-bezier(0.65, 0, 0.35, 1) 500ms,
    filter 800ms var(--sh-ease-emphasized) 1500ms;
}

.portrait[data-reveal='hidden'] .photo {
  clip-path: inset(0 0 100% 0 round var(--sh-radius-xl));
  filter: grayscale(1);
  transition: none;
}

.scan {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 2px;
  background: var(--sh-accent);
  box-shadow:
    0 0 12px 2px color-mix(in srgb, var(--sh-accent) 70%, transparent),
    0 0 40px 8px color-mix(in srgb, var(--sh-accent) 30%, transparent);
  opacity: 0;
}

.portrait[data-reveal='shown'] .scan {
  animation: sweep 1300ms cubic-bezier(0.65, 0, 0.35, 1) 500ms both;
}

.badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  font-family: var(--sh-font-mono);
  font-size: 0.6875rem;
  line-height: 1;
  white-space: nowrap;
  color: var(--sh-neutral-white);
  background: rgb(11 11 18 / 0.72);
  border: var(--sh-border-width) solid rgb(255 255 255 / 0.12);
  border-radius: var(--sh-radius-full);
  backdrop-filter: blur(8px);
  transition:
    opacity 500ms var(--sh-ease-emphasized) 1800ms,
    translate 500ms var(--sh-ease-emphasized) 1800ms;
}

.badge::before {
  content: '';
  width: 7px;
  height: 7px;
  border-radius: var(--sh-radius-full);
  background: var(--sh-green-500);
  box-shadow: 0 0 0 3px rgb(34 197 94 / 0.25);
}

.portrait[data-reveal='hidden'] .badge {
  opacity: 0;
  translate: 0 6px;
  transition: none;
}

@property --orbit-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

@keyframes orbit {
  to {
    --orbit-angle: 360deg;
  }
}

@keyframes sweep {
  0% {
    top: 0;
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    top: 100%;
    opacity: 0;
  }
}

.text {
  max-width: 60ch;
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--sh-text-secondary);
}

.facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  margin: 32px 0 0;
  overflow: hidden;
  border: var(--sh-border-width) solid var(--sh-border-default);
  border-radius: var(--sh-radius-lg);
  background: var(--sh-border-default);
}

.fact {
  padding: 16px 20px;
  background: var(--sh-surface-card);
}

dt {
  font-family: var(--sh-font-mono);
  font-size: var(--sh-text-caption);
  line-height: var(--sh-text-caption--line-height);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sh-accent-text);
}

dd {
  margin: 4px 0 0;
  font-weight: 500;
  color: var(--sh-text-primary);
}

@media (max-width: 768px) {
  .content {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
  }

  .portrait {
    max-width: 250px;
  }

  .badge-subject {
    display: none;
  }
}

@media (max-width: 480px) {
  .facts {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  .corner,
  .photo {
    transition: none;
  }

  .portrait:hover .corner {
    translate: none;
  }

  .portrait:hover .ring::before {
    animation: none;
  }
}
</style>

<script lang="ts" setup>
import { ShBadge, ShTag } from '@app/components/ui';
import { EMPLOYMENT_LABELS, EXPERIENCE, formatYearMonth, type Present, type YearMonth } from '@app/content';
import { vReveal } from '@app/utils';

import HomeSection from './home-section.component.vue';

const EXPANDED_ROLE_COUNT = 3;

function toDateTime(date: YearMonth): string {
  return `${date.year}-${String(date.month).padStart(2, '0')}`;
}

function isPresent(end: YearMonth | Present): end is Present {
  return end === 'present';
}

function isCollapsible(index: number): boolean {
  return index >= EXPANDED_ROLE_COUNT;
}
</script>

<template>
  <HomeSection id="experience" title="Experience">
    <ol class="roles" role="list">
      <li
        v-for="(item, index) in EXPERIENCE"
        :key="`${item.company}-${item.title}`"
        v-reveal
        class="role"
        :class="{ current: isPresent(item.end) }"
      >
        <div class="when">
          <span class="marker" aria-hidden="true"></span>
          <p class="period">
            <time :datetime="toDateTime(item.start)">{{ formatYearMonth(item.start) }}</time>
            –
            <span v-if="isPresent(item.end)">Present</span>
            <time v-else :datetime="toDateTime(item.end)">{{ formatYearMonth(item.end) }}</time>
          </p>
          <p class="where">{{ item.location }}</p>
        </div>
        <article class="body">
          <header class="header">
            <h3 class="title">{{ item.title }}</h3>
            <ShBadge :intent="item.employment === 'full-time' ? 'info' : 'neutral'">{{ EMPLOYMENT_LABELS[item.employment] }}</ShBadge>
          </header>
          <p class="company">
            <a v-if="item.companyUrl" :href="item.companyUrl" target="_blank" rel="noopener"
              >{{ item.company }}<span class="external" aria-hidden="true">↗</span></a
            >
            <template v-else>{{ item.company }}</template>
            <span v-if="item.client" class="client">
              · Client:
              <a v-if="item.clientUrl" :href="item.clientUrl" target="_blank" rel="noopener"
                >{{ item.client }}<span class="external" aria-hidden="true">↗</span></a
              >
              <template v-else>{{ item.client }}</template>
            </span>
          </p>
          <component :is="isCollapsible(index) ? 'details' : 'div'" class="details">
            <summary v-if="isCollapsible(index)" class="toggle">
              <span class="toggle-closed">Show details</span>
              <span class="toggle-open">Hide details</span>
            </summary>
            <ul class="bullets">
              <li v-for="bullet in item.siteBullets" :key="bullet">{{ bullet }}</li>
            </ul>
            <ul class="tags" aria-label="Technologies">
              <li v-for="technology in item.technologies" :key="technology">
                <ShTag>{{ technology }}</ShTag>
              </li>
            </ul>
          </component>
        </article>
      </li>
    </ol>
  </HomeSection>
</template>

<style scoped>
.roles {
  margin: 0;
  padding: 0;
  list-style: none;
}

.role {
  display: grid;
  grid-template-columns: 9.5rem minmax(0, 1fr);
  gap: 0 32px;
}

.when {
  position: relative;
  padding-top: 2px;
  font-family: var(--sh-font-mono);
  font-size: var(--sh-text-code);
  line-height: var(--sh-text-code--line-height);
  text-align: right;
}

.period {
  color: var(--sh-text-primary);
  white-space: nowrap;
}

.where {
  margin-top: 2px;
  color: var(--sh-text-tertiary);
}

.body {
  padding: 0 0 48px 32px;
  color: var(--sh-text-secondary);
  border-left: var(--sh-border-width) solid var(--sh-border-strong);
}

.role:last-child .body {
  padding-bottom: 0;
  border-image: linear-gradient(var(--sh-border-strong), transparent) 1;
}

.marker {
  position: absolute;
  top: 7px;
  right: -38px;
  width: 11px;
  height: 11px;
  border: 2px solid var(--sh-accent);
  border-radius: var(--sh-radius-full);
  background: var(--sh-surface-app);
}

.current .marker {
  background: var(--sh-accent);
  box-shadow: 0 0 0 4px var(--sh-accent-soft);
}

.header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 12px;
}

.title {
  font-size: var(--sh-text-h2);
  line-height: var(--sh-text-h2--line-height);
  letter-spacing: -0.01em;
  overflow-wrap: anywhere;
}

.company {
  margin-top: 4px;
  font-weight: 500;
  color: var(--sh-text-primary);
  overflow-wrap: anywhere;
}

.company a {
  color: inherit;
  text-decoration: none;
}

.company a:hover {
  color: var(--sh-accent-text);
  text-decoration: underline;
}

.external {
  margin-left: 2px;
  font-size: 0.8em;
  color: var(--sh-text-tertiary);
}

.client {
  font-weight: 400;
  color: var(--sh-text-secondary);
}

.bullets {
  margin-top: 14px;
  padding-left: 20px;
}

.bullets li {
  margin-bottom: 8px;
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.bullets li::marker {
  color: var(--sh-accent-text);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
}

.toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: var(--sh-tap-target);
  font-size: var(--sh-text-body);
  font-weight: 500;
  color: var(--sh-accent-text);
  cursor: pointer;
  list-style: none;
}

.toggle::-webkit-details-marker {
  display: none;
}

.toggle::after {
  content: '';
  width: 6px;
  height: 6px;
  border-right: 1.5px solid currentColor;
  border-bottom: 1.5px solid currentColor;
  rotate: 45deg;
  translate: 0 -2px;
  transition: rotate var(--sh-duration-normal) var(--sh-ease-standard);
}

.toggle:hover {
  color: var(--sh-accent-hover);
}

details[open] > .toggle::after {
  rotate: 225deg;
  translate: 0 2px;
}

.toggle-open,
details[open] .toggle-closed {
  display: none;
}

details[open] .toggle-open {
  display: inline;
}

@media (max-width: 768px) {
  .role {
    grid-template-columns: minmax(0, 1fr);
  }

  .when {
    display: flex;
    flex-wrap: wrap;
    gap: 0 12px;
    padding: 0 0 6px 32px;
    text-align: left;
    border-left: var(--sh-border-width) solid var(--sh-border-default);
  }

  .where {
    margin-top: 0;
  }

  .marker {
    top: 6px;
    right: auto;
    left: -5px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .toggle::after {
    transition: none;
  }
}
</style>

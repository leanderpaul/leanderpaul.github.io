<script lang="ts" setup>
import { ShBadge, ShTag, ShTimeline } from '@app/components/ui';
import { EMPLOYMENT_LABELS, EXPERIENCE, formatYearMonth, type Present, type YearMonth } from '@app/content';

import HomeSection from './home-section.component.vue';

function toDateTime(date: YearMonth): string {
  return `${date.year}-${String(date.month).padStart(2, '0')}`;
}

function isPresent(end: YearMonth | Present): end is Present {
  return end === 'present';
}
</script>

<template>
  <HomeSection id="experience" title="Experience">
    <ShTimeline :items="EXPERIENCE">
      <template #default="{ item }">
        <article class="role">
          <header class="header">
            <h3 class="title">{{ item.title }}</h3>
            <ShBadge :intent="item.employment === 'full-time' ? 'info' : 'neutral'">{{ EMPLOYMENT_LABELS[item.employment] }}</ShBadge>
          </header>
          <p class="company">
            <a v-if="item.companyUrl" :href="item.companyUrl" target="_blank" rel="noopener">{{ item.company }}</a>
            <template v-else>{{ item.company }}</template>
          </p>
          <p v-if="item.client" class="client">
            Client:
            <a v-if="item.clientUrl" :href="item.clientUrl" target="_blank" rel="noopener">{{ item.client }}</a>
            <template v-else>{{ item.client }}</template>
          </p>
          <p class="meta">
            <span>
              <time :datetime="toDateTime(item.start)">{{ formatYearMonth(item.start) }}</time>
              –
              <span v-if="isPresent(item.end)">Present</span>
              <time v-else :datetime="toDateTime(item.end)">{{ formatYearMonth(item.end) }}</time>
            </span>
            <span>{{ item.location }}</span>
          </p>
          <ul class="bullets">
            <li v-for="bullet in item.siteBullets" :key="bullet">{{ bullet }}</li>
          </ul>
          <ul class="tags" aria-label="Technologies">
            <li v-for="technology in item.technologies" :key="technology">
              <ShTag>{{ technology }}</ShTag>
            </li>
          </ul>
        </article>
      </template>
    </ShTimeline>
  </HomeSection>
</template>

<style scoped>
.role {
  color: var(--sh-text-secondary);
}

.header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 12px;
}

.title {
  overflow-wrap: anywhere;
}

.company,
.client {
  margin-top: 4px;
  overflow-wrap: anywhere;
}

.company {
  font-weight: 500;
  color: var(--sh-text-primary);
}

.company a,
.client a {
  color: var(--sh-accent-text);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0 16px;
  margin-top: 4px;
  font-family: var(--sh-font-mono);
  font-size: var(--sh-text-code);
  line-height: var(--sh-text-code--line-height);
  color: var(--sh-text-tertiary);
}

.bullets {
  margin-top: 12px;
  padding-left: 20px;
}

.bullets li {
  margin-bottom: 8px;
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
</style>

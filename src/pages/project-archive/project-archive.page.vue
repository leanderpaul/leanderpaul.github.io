<script lang="ts" setup>
import { computed, ref } from 'vue';

import LinkIcon from '@app/components/link-icon.component.vue';
import { ShBadge, ShTable, ShTag } from '@app/components/ui';
import { ARCHIVE_CAPTION, ARCHIVE_ROWS, getLinkName, matchesArchiveFilter, type ArchiveCategory, type ArchiveFilter, type ArchiveRow } from '@app/content';

import ArchiveFilterGroup from './archive-filter.component.vue';

const CATEGORY_LABELS: Record<ArchiveCategory, string> = { employer: 'Employer', personal: 'Personal', 'open-source': 'Open source' };

const filter = ref<ArchiveFilter>('all');
const rows = computed(() => ARCHIVE_ROWS.filter(row => matchesArchiveFilter(row, filter.value)));
const summary = computed(() => `Showing ${rows.value.length} of ${ARCHIVE_ROWS.length} projects`);

function rowKey(row: ArchiveRow): string {
  return `${row.year}-${row.title}`;
}
</script>

<template>
  <div class="page">
    <h1 class="page-title">Project archive</h1>
    <p class="intro">Things I've built, at work and on my own, newest first.</p>

    <ArchiveFilterGroup v-model="filter" />
    <p class="count" role="status" aria-live="polite">{{ summary }}</p>

    <p v-if="rows.length === 0" class="empty">Nothing matches this filter yet. Try another one.</p>

    <ShTable v-else class="table">
      <template #caption>{{ ARCHIVE_CAPTION }}</template>
      <thead>
        <tr>
          <th scope="col">Year</th>
          <th scope="col">Project</th>
          <th scope="col">Category</th>
          <th scope="col">Built with</th>
          <th scope="col">Links</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="rowKey(row)">
          <td class="year">{{ row.year }}</td>
          <th scope="row" class="project">
            <span class="title">
              {{ row.title }}
              <ShBadge v-if="row.status === 'archived'">archived</ShBadge>
            </span>
            <span v-if="row.company" class="company">{{ row.company }}</span>
          </th>
          <td class="category">{{ CATEGORY_LABELS[row.category] }}</td>
          <td>
            <ul class="tags" aria-label="Built with">
              <li v-for="technology in row.tech" :key="technology">
                <ShTag>{{ technology }}</ShTag>
              </li>
            </ul>
          </td>
          <td>
            <ul class="links">
              <li v-for="link in row.links" :key="link.url">
                <a class="link" :href="link.url" target="_blank" rel="noopener" :aria-label="getLinkName(link, row.title)">
                  <LinkIcon :type="link.type" />
                </a>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </ShTable>

    <template v-if="rows.length > 0">
      <p class="caption">{{ ARCHIVE_CAPTION }}</p>
      <ul class="cards">
        <li v-for="row in rows" :key="rowKey(row)" class="card">
          <p class="meta">
            <span class="year">{{ row.year }}</span>
            <span class="category">{{ CATEGORY_LABELS[row.category] }}</span>
            <ShBadge v-if="row.status === 'archived'">archived</ShBadge>
          </p>
          <h2 class="card-title">{{ row.title }}</h2>
          <p v-if="row.company" class="company">{{ row.company }}</p>
          <ul class="tags" aria-label="Built with">
            <li v-for="technology in row.tech" :key="technology">
              <ShTag>{{ technology }}</ShTag>
            </li>
          </ul>
          <ul v-if="row.links.length > 0" class="links">
            <li v-for="link in row.links" :key="link.url">
              <a class="link" :href="link.url" target="_blank" rel="noopener" :aria-label="getLinkName(link, row.title)">
                <LinkIcon :type="link.type" />
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </template>
  </div>
</template>

<style scoped>
.page {
  padding-bottom: 96px;
}

.page-title {
  margin: 32px 0;
  font-size: var(--sh-text-display);
  line-height: var(--sh-text-display--line-height);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.intro {
  margin: 8px 0 32px;
  color: var(--sh-text-secondary);
}

.count {
  margin: 16px 0 24px;
  font-size: var(--sh-text-body-sm);
  color: var(--sh-text-tertiary);
}

.empty {
  padding: 32px 16px;
  border: var(--sh-border-width) dashed var(--sh-border-default);
  border-radius: var(--sh-radius-lg);
  text-align: center;
  color: var(--sh-text-secondary);
}

.year {
  font-family: var(--sh-font-mono);
  font-size: var(--sh-text-code);
  color: var(--sh-text-tertiary);
}

.category {
  white-space: nowrap;
  color: var(--sh-text-secondary);
}

.company {
  display: block;
  font-size: var(--sh-text-body-sm);
  font-weight: 400;
  color: var(--sh-text-secondary);
}

.tags,
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.links {
  flex-wrap: nowrap;
  gap: 4px;
}

.link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--sh-radius-md);
  color: var(--sh-text-secondary);
}

.link:hover {
  color: var(--sh-accent-text);
}

.link:focus-visible {
  outline: var(--sh-focus-ring-width) solid var(--sh-focus-ring);
  outline-offset: var(--sh-focus-ring-offset);
}

.link svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.table :deep(th.project) {
  height: auto;
  min-width: 220px;
  padding: 8px 16px;
  background: transparent;
  border-bottom: none;
  text-align: left;
  font-size: var(--sh-text-body-sm);
  font-weight: 600;
  letter-spacing: normal;
  text-transform: none;
  white-space: normal;
  color: var(--sh-text-primary);
}

.table :deep(tbody tr:not(:last-child) > th.project) {
  border-bottom: var(--sh-border-width) solid var(--sh-border-subtle);
}

.table :deep(td),
.table :deep(th.project) {
  vertical-align: top;
}

.title {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.caption,
.cards {
  display: none;
}

.cards {
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.card {
  padding: 16px;
  border: var(--sh-border-width) solid var(--sh-border-default);
  border-radius: var(--sh-radius-lg);
  background: var(--sh-surface-card);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: var(--sh-text-caption);
}

.card-title {
  margin-top: 4px;
  font-size: var(--sh-text-h3);
  line-height: var(--sh-text-h3--line-height);
  font-weight: 600;
}

.card .tags {
  margin-top: 12px;
}

.card .links {
  margin-top: 8px;
}

@media (max-width: 767px) {
  .page-title {
    margin-bottom: 16px;
  }

  .table {
    display: none;
  }

  .caption {
    display: block;
    margin-bottom: 16px;
    font-size: var(--sh-text-body-sm);
    color: var(--sh-text-secondary);
  }

  .cards {
    display: flex;
  }
}
</style>

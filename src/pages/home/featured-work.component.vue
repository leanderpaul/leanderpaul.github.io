<script lang="ts" setup>
import LinkIcon from '@app/components/link-icon.component.vue';
import { ShBadge, ShCard, ShTag } from '@app/components/ui';
import { FEATURED_PROJECTS, getLinkName, type Ownership } from '@app/content';

import HomeSection from './home-section.component.vue';

const OWNERSHIP_LABELS: Record<Ownership, string> = { employer: 'Employer project', personal: 'Personal project' };
</script>

<template>
  <HomeSection id="work" title="Selected work">
    <ul class="cards" role="list">
      <li v-for="project in FEATURED_PROJECTS" :key="project.slug">
        <ShCard as="article" interactive class="card">
          <header class="header">
            <h3 class="title">{{ project.title }}</h3>
            <ShBadge>{{ OWNERSHIP_LABELS[project.ownership] }}</ShBadge>
          </header>
          <p class="summary">{{ project.summary }}</p>
          <ul class="tags" role="list" aria-label="Built with">
            <li v-for="tag in project.tags" :key="tag">
              <ShTag>{{ tag }}</ShTag>
            </li>
          </ul>
          <footer class="footer">
            <router-link class="case-link" :to="`/work/${project.slug}`" :aria-label="`Read case study: ${project.title}`">
              Read case study<span class="arrow" aria-hidden="true">→</span>
            </router-link>
            <ul class="links" role="list">
              <li v-for="link in project.links" :key="link.url">
                <a
                  class="icon-link"
                  :href="link.url"
                  target="_blank"
                  rel="noopener"
                  :aria-label="getLinkName(link, project.title)"
                  :title="getLinkName(link, project.title)"
                >
                  <LinkIcon :type="link.type" />
                </a>
              </li>
            </ul>
          </footer>
        </ShCard>
      </li>
    </ul>
    <p class="archive">
      <router-link to="/project-archive">View the full project archive<span class="arrow" aria-hidden="true">→</span></router-link>
    </p>
  </HomeSection>
</template>

<style scoped>
.cards {
  display: grid;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.cards .card {
  padding: 24px;
}

.header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 12px;
}

.title {
  font-size: var(--sh-text-h2);
  line-height: var(--sh-text-h2--line-height);
  overflow-wrap: anywhere;
}

.summary {
  max-width: 70ch;
  margin-top: 12px;
  color: var(--sh-text-secondary);
  overflow-wrap: anywhere;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}

.footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0 16px;
  margin-top: 16px;
  padding-top: 8px;
  border-top: var(--sh-border-width) solid var(--sh-border-subtle);
}

.case-link,
.archive a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: var(--sh-tap-target);
  font-weight: 500;
  text-decoration: none;
}

.case-link:hover,
.archive a:hover {
  text-decoration: underline;
}

.arrow {
  transition: transform var(--sh-duration-fast) var(--sh-ease-standard);
}

.case-link:hover .arrow,
.archive a:hover .arrow {
  transform: translateX(2px);
}

.links {
  display: flex;
  margin: 0 -12px;
  padding: 0;
  list-style: none;
}

.icon-link {
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

.icon-link:hover {
  color: var(--sh-accent-text);
  background-color: var(--sh-accent-soft);
}

.icon-link :deep(svg) {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.archive {
  margin-top: 24px;
}

@media (max-width: 640px) {
  .cards .card {
    padding: 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .arrow,
  .icon-link {
    transition: none;
  }
}
</style>

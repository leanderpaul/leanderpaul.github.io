<script lang="ts" setup>
import LinkIcon from '@app/components/link-icon.component.vue';
import { LINK_TYPE_LABELS, OPEN_SOURCE_INTRO, OPEN_SOURCE_PACKAGES, OPEN_SOURCE_TITLE } from '@app/content';

import HomeSection from './home-section.component.vue';
import { getLinkName } from './link-name.util';

function splitScope(name: string): [string, string] {
  const slash = name.indexOf('/');
  if (slash === -1) return ['', name];
  return [name.slice(0, slash + 1), name.slice(slash + 1)];
}
</script>

<template>
  <HomeSection id="open-source" :title="OPEN_SOURCE_TITLE">
    <template #lead>{{ OPEN_SOURCE_INTRO }}</template>
    <ul class="packages" role="list">
      <li v-for="pkg in OPEN_SOURCE_PACKAGES" :key="pkg.name" class="package">
        <div class="body">
          <h3 class="name">
            <span class="scope">{{ splitScope(pkg.name)[0] }}</span
            ><wbr />{{ splitScope(pkg.name)[1] }}
          </h3>
          <p class="purpose">{{ pkg.purpose }}</p>
        </div>
        <ul class="links" role="list">
          <li v-for="link in pkg.links" :key="link.url">
            <a class="link" :href="link.url" target="_blank" rel="noopener" :aria-label="getLinkName(link, pkg.name)">
              <LinkIcon :type="link.type" />
              {{ LINK_TYPE_LABELS[link.type] }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </HomeSection>
</template>

<style scoped>
.packages {
  margin: 0;
  padding: 0;
  list-style: none;
  background: var(--sh-surface-card);
  border: var(--sh-border-width) solid var(--sh-border-default);
  border-radius: var(--sh-radius-lg);
}

.package {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px 24px;
  padding: 16px 24px;
}

.package:not(:last-child) {
  border-bottom: var(--sh-border-width) solid var(--sh-border-subtle);
}

.name {
  font-family: var(--sh-font-mono);
  font-size: var(--sh-text-body-lg);
  line-height: var(--sh-text-body-lg--line-height);
  font-weight: 500;
  overflow-wrap: anywhere;
}

.scope {
  color: var(--sh-text-tertiary);
}

.purpose {
  max-width: 68ch;
  margin-top: 4px;
  font-size: var(--sh-text-body);
  line-height: var(--sh-text-body--line-height);
  color: var(--sh-text-secondary);
}

.links {
  display: flex;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: var(--sh-tap-target);
  padding: 0 10px;
  border-radius: var(--sh-radius-md);
  font-size: var(--sh-text-body-sm);
  line-height: var(--sh-text-body-sm--line-height);
  font-weight: 500;
  color: var(--sh-text-secondary);
  text-decoration: none;
  transition:
    color var(--sh-duration-fast) var(--sh-ease-standard),
    background-color var(--sh-duration-fast) var(--sh-ease-standard);
}

.link:hover {
  color: var(--sh-accent-text);
  background-color: var(--sh-accent-soft);
}

.link :deep(svg) {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (max-width: 640px) {
  .package {
    grid-template-columns: minmax(0, 1fr);
    padding: 16px;
  }

  .links {
    margin-left: -10px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .link {
    transition: none;
  }
}
</style>

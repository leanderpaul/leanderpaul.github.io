<script lang="ts" setup>
import { SKILL_GROUPS } from '@app/content';

import HomeSection from './home-section.component.vue';
</script>

<template>
  <HomeSection id="skills" title="Skills">
    <div class="groups">
      <section v-for="group in SKILL_GROUPS" :key="group.name" class="group" :aria-label="group.name">
        <h3 class="name">{{ group.name }}</h3>
        <ul class="skills" role="list">
          <li v-for="skill in group.skills" :key="skill">{{ skill }}</li>
        </ul>
      </section>
    </div>
  </HomeSection>
</template>

<style scoped>
.groups {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  border: var(--sh-border-width) solid var(--sh-border-default);
  border-radius: var(--sh-radius-lg);
  background: var(--sh-border-default);
  counter-reset: skill-group;
}

.group {
  padding: 20px 24px 22px;
  background: var(--sh-surface-card);
  counter-increment: skill-group;
}

.group:last-child:nth-child(odd) {
  grid-column: 1 / -1;
}

.name {
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-size: var(--sh-text-body-lg);
  line-height: var(--sh-text-body-lg--line-height);
  font-weight: 600;
}

.name::before {
  content: counter(skill-group, decimal-leading-zero);
  font-family: var(--sh-font-mono);
  font-size: var(--sh-text-caption);
  font-weight: 500;
  color: var(--sh-accent-text);
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 2px 0;
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
  font-size: var(--sh-text-body);
  line-height: 1.6;
  color: var(--sh-text-secondary);
}

.skills li:not(:last-child)::after {
  content: '/' / '';
  margin: 0 10px;
  color: var(--sh-border-strong);
}

@media (max-width: 768px) {
  .groups {
    grid-template-columns: minmax(0, 1fr);
  }

  .group {
    padding: 16px 18px 18px;
  }
}
</style>

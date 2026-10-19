<script lang="ts" setup>
import { SKILL_GROUPS } from '@app/content';

import HomeSection from './home-section.component.vue';
</script>

<template>
  <HomeSection id="skills" title="Skills">
    <div class="groups">
      <div v-for="group in SKILL_GROUPS" :key="group.name" class="group">
        <h3 class="name">{{ group.name }}</h3>
        <ul class="skills" role="list">
          <li v-for="skill in group.skills" :key="skill">{{ skill }}</li>
        </ul>
      </div>
    </div>
  </HomeSection>
</template>

<style scoped>
.group {
  display: grid;
  grid-template-columns: 14rem minmax(0, 1fr);
  gap: 4px 32px;
  padding: 14px 0;
}

.group:not(:last-child) {
  border-bottom: var(--sh-border-width) solid var(--sh-border-subtle);
}

.name {
  font-size: var(--sh-text-body);
  line-height: var(--sh-text-body-lg--line-height);
  font-weight: 600;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
  color: var(--sh-text-secondary);
}

.skills li:not(:last-child)::after {
  content: '·' / '';
  margin: 0 8px;
  color: var(--sh-text-tertiary);
}

@media (max-width: 768px) {
  .group {
    grid-template-columns: minmax(0, 1fr);
    padding: 12px 0;
  }
}
</style>

<script lang="ts" setup>
import { computed } from 'vue';

import { ShTag } from '@app/components';
import { findFeaturedProject } from '@app/content';

const props = defineProps<{ slug: string }>();

const project = computed(() => findFeaturedProject(props.slug));
</script>
<template>
  <article v-if="project">
    <h1>{{ project.title }}</h1>
    <p class="summary">{{ project.summary }}</p>
    <ul class="tags" aria-label="Technologies">
      <li v-for="tag in project.tags" :key="tag">
        <ShTag>{{ tag }}</ShTag>
      </li>
    </ul>
    <ul class="links" aria-label="Links">
      <li v-for="link in project.links" :key="link.url">
        <a :href="link.url" target="_blank" rel="noopener">{{ link.label }}</a>
      </li>
    </ul>
  </article>
</template>
<style scoped>
article {
  padding: 32px 0px 100px;
}

.summary {
  margin-top: 16px;
  color: var(--sh-text-secondary);
}

ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  list-style: none;
}

.tags {
  gap: 8px;
  margin-top: 24px;
}

.links {
  gap: 8px 24px;
  margin-top: 24px;
}
</style>

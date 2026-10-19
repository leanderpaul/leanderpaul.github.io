<script lang="ts" setup>
import { FEATURED_PROJECTS } from '@app/content';
import LinkIcon from '@app/components/link-icon.component.vue';
</script>
<template>
  <div id="projects" class="section">
    <h3 class="heading">What I've Built</h3>
    <ul class="content">
      <li class="project" v-for="project in FEATURED_PROJECTS" :key="project.slug">
        <h3>{{ project.title }}</h3>
        <div class="desc">{{ project.summary }}</div>
        <div class="footer">
          <ul class="tech-list">
            <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
          </ul>
          <div class="links">
            <a
              :href="link.url"
              target="_blank"
              rel="noopener"
              :aria-label="`${project.title}: ${link.label}`"
              v-for="link in project.links"
              :key="link.url"
            >
              <LinkIcon :type="link.type" />
            </a>
          </div>
        </div>
      </li>
    </ul>
    <div class="flex-center">
      <router-link class="btn" to="/project-archive">View Full Project Archive</router-link>
    </div>
  </div>
</template>
<style scoped>
.heading {
  margin-bottom: 48px;
}

ul {
  padding: 0;
  list-style: none;
}

svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.project {
  padding: 24px;
  background-color: var(--sh-surface-card);
  border: var(--sh-border-width) solid var(--sh-border-default);
  border-radius: var(--sh-radius-lg);
  box-shadow: var(--sh-shadow-e1);
}

.project .desc {
  color: var(--sh-text-secondary);
}

.project .footer {
  align-items: center;
}

.project .tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 20px;
  font-family: var(--sh-font-mono);
  font-size: var(--sh-text-code);
  line-height: var(--sh-text-code--line-height);
  color: var(--sh-text-tertiary);
  white-space: nowrap;
}

.project .links {
  display: flex;
  margin-top: 16px;
}

.project .links a {
  display: inline-flex;
  color: var(--sh-text-secondary);
}

.project .links a:hover {
  color: var(--sh-accent-text);
}

@media (max-width: 768px) {
  .project {
    margin-bottom: 24px;
  }

  .project .desc {
    padding: 24px 0px;
  }

  .project .links a {
    margin-right: 20px;
  }

  .btn {
    margin-top: 24px;
  }
}

@media (min-width: 768px) {
  .project {
    margin-bottom: 48px;
  }

  .project .links {
    margin-top: 0px;
  }

  .project .links a {
    margin-left: 20px;
  }

  .project .desc {
    margin: 20px 0px;
  }

  .project .footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
}
</style>

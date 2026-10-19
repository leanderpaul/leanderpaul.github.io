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
  margin-bottom: 50px;
}

ul {
  list-style: none;
  padding: 0;
}

svg {
  fill: none;
  width: 20px;
  stroke: var(--text-default);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.project {
  padding: 25px;
  background-color: var(--background-light);
}

.project .footer {
  align-items: center;
  font-size: 14px;
}

.project .tech-list {
  display: flex;
  gap: 5px 20px;
  white-space: nowrap;
  flex-wrap: wrap;
}

.project .links {
  margin-top: 15px;
}

.btn {
  padding: 10px 25px;
}

@media (max-width: 768px) {
  .project {
    margin-bottom: 25px;
  }

  .project .content {
    background: rgba(26, 33, 56, 0.6);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(3px);
    border: 1px solid rgba(26, 33, 56, 0.1);
    padding: 25px;
    border-radius: 2px;
  }

  .project .desc {
    padding: 25px 0px;
    background-color: transparent;
  }

  .project .links a {
    margin-right: 20px;
  }

  .btn {
    margin-top: 25px;
  }
}

@media (min-width: 768px) {
  .project {
    margin-bottom: 50px;
  }

  .project .links a {
    margin-left: 20px;
  }

  .project .desc {
    margin: 20px 0px;
  }

  .project .footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
}
</style>

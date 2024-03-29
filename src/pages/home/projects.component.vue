<script lang="ts" setup>
import { projects } from '@app/data';
</script>
<template>
  <div id="projects" class="section">
    <h3 class="heading">What I've Built</h3>
    <ul class="content">
      <li class="project" v-for="project in projects">
        <div class="image">
          <img :src="project.image" :alt="project.title" />
        </div>
        <div class="content">
          <a :href="project.demo" target="_blank">
            <h2>{{ project.title }}</h2>
          </a>
          <div class="desc">{{ project.description }}</div>
          <ul class="tech-list">
            <li v-for="tech in project.tech">{{ tech }}</li>
          </ul>
          <div class="links">
            <a :href="project.source" target="_blank">
              <svg viewBox="0 0 24 24">
                <title>GitHub</title>
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                ></path>
              </svg>
            </a>
            <a :href="project.demo" target="_blank">
              <svg viewBox="0 0 24 24">
                <title>Demo</title>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
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
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(12, 1fr);
}

.project > div {
  grid-row: 1;
}

.project img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project .content {
  margin: auto;
}

.project .desc {
  padding: 25px;
  background-color: var(--background-light);
}

.project .tech-list {
  display: flex;
  gap: 5px 20px;
  white-space: nowrap;
  flex-wrap: wrap;
  font-size: 14px;
}

.project .links {
  margin-top: 20px;
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

  .project .image,
  .project .content {
    grid-column: 1 / -1;
  }

  .project .image {
    opacity: 0.35;
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
    margin-bottom: 100px;
  }

  .project:nth-child(odd) .image {
    grid-column: 1 / 8;
  }

  .project:nth-child(odd) .content {
    grid-column: 7 / -1;
    text-align: right;
  }

  .project:nth-child(even) .content {
    grid-column: 1 / 7;
  }

  .project:nth-child(even) .image {
    grid-column: 6 / -1;
  }

  .project:nth-child(odd) .tech-list {
    justify-content: flex-end;
  }

  .project .links a {
    margin-left: 20px;
  }

  .project .desc {
    margin: 20px 0px;
  }
}
</style>

<script lang="ts" setup>
import { projects } from '@app/data';
</script>
<template>
  <div id="projects" class="section">
    <h3 class="heading">What I've Built</h3>
    <ul class="content">
      <li class="project" v-for="project in projects">
        <h3>{{ project.title }}</h3>
        <div class="desc">{{ project.description }}</div>
        <div class="footer">
          <ul class="tech-list">
            <li v-for="tech in project.tech">{{ tech }}</li>
          </ul>
          <div class="links">
            <a :href="link.url" target="_blank" v-for="link in project.links">
              <svg viewBox="0 0 24 24" v-if="link.type === 'Github'">
                <title>GitHub</title>
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                ></path>
              </svg>
              <svg viewBox="0 0 24 24" v-if="link.type === 'Demo'">
                <title>Demo</title>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              <svg viewBox="0 0 32 32" v-if="link.type === 'NPM'">
                <title>NPM</title>
                <path
                  fill="var(--text-default)"
                  stroke-width="1"
                  d="M 0 10 L 0 21 L 9 21 L 9 23 L 16 23 L 16 21 L 32 21 L 32 10 L 0 10 z M 1.7773438 11.777344 L 8.8886719 11.777344 L 8.890625 11.777344 L 8.890625 19.445312 L 7.1113281 19.445312 L 7.1113281 13.556641 L 5.3339844 13.556641 L 5.3339844 19.445312 L 1.7773438 19.445312 L 1.7773438 11.777344 z M 10.667969 11.777344 L 17.777344 11.777344 L 17.779297 11.777344 L 17.779297 19.443359 L 14.222656 19.443359 L 14.222656 21.222656 L 10.667969 21.222656 L 10.667969 11.777344 z M 19.556641 11.777344 L 30.222656 11.777344 L 30.224609 11.777344 L 30.224609 19.445312 L 28.445312 19.445312 L 28.445312 13.556641 L 26.667969 13.556641 L 26.667969 19.445312 L 24.890625 19.445312 L 24.890625 13.556641 L 23.111328 13.556641 L 23.111328 19.445312 L 19.556641 19.445312 L 19.556641 11.777344 z M 14.222656 13.556641 L 14.222656 17.667969 L 16 17.667969 L 16 13.556641 L 14.222656 13.556641 z"
                />
              </svg>
            </a>
          </div>
        </div>
        <!-- </div> -->
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

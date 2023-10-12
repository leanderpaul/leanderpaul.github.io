<script lang="ts" setup>
interface Project {
  year: number;
  title: string;
  company?: string;
  tech: string[];
  links: {
    github?: string;
    demo?: string;
  };
}

const projects: Project[] = [
  {
    title: 'Portfolio',
    year: 2023,
    tech: ['Vue 3', 'TypeScript', 'Tailwind CSS'],
    links: {
      github: 'https://github.com/leanderpaul/leanderpaul.github.io',
      demo: 'https://leanderpaul.github.io',
    },
  },
  {
    title: 'Shadow Chronicle',
    year: 2023,
    tech: ['Angular', 'Tailwind CSS', 'GraphQL', 'Vercel'],
    links: {
      github: 'https://github.com/leanderpaul/shadow-chronicle',
      demo: 'https://chronicle.shadow-apps.com',
    },
  },
  {
    title: 'Shadow Accounts',
    year: 2023,
    tech: ['Astro', 'Tailwind CSS', 'Vercel'],
    links: {
      github: 'https://github.com/leanderpaul/shadow-accounts',
      demo: 'https://accounts.shadow-apps.com',
    },
  },
  {
    title: 'Shadow Archive',
    year: 2023,
    tech: ['NestJS', 'Fastify', 'GraphQL', 'MongoDB', 'AWS EC2'],
    links: {
      github: 'https://github.com/leanderpaul/shadow-archive',
      demo: 'https://archive.shadow-apps.com',
    },
  },
  {
    title: 'Shadow Deploy',
    year: 2023,
    tech: ['Rust', 'AWS SQS', 'AWS Secrets Manager'],
    links: {
      github: 'https://github.com/leanderpaul/shadow-deploy',
    },
  },
  {
    title: 'Capture',
    year: 2023,
    company: 'WTV',
    tech: ['Node', 'NestJS', 'Mongoose', 'Fastify'],
    links: {
      demo: 'https://capture.wtvglobal.com',
    },
  },
  {
    title: 'Sagus',
    year: 2021,
    tech: ['Typescript', 'Node'],
    links: {
      github: 'https://github.com/leanderpaul/sagus',
      demo: 'https://www.npmjs.com/package/sagus',
    },
  },
  {
    title: 'Zoho Accounts',
    year: 2020,
    company: 'Zoho',
    tech: ['Java', 'Redis', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    links: {
      demo: 'https://accounts.zoho.com',
    },
  },
  {
    title: 'Library Management System',
    year: 2019,
    company: 'Zoho',
    tech: ['Express', 'Mongoose', 'React', 'Material UI'],
    links: {
      github: 'https://github.com/leanderpaul/LibraryManagementSystem',
    },
  },
  {
    title: 'Shadow 2048',
    year: 2019,
    tech: ['React', 'JavaScript', 'Electron'],
    links: {
      github: 'https://github.com/leanderpaul/Shadow2048',
    },
  },
  {
    title: 'Shadow Blog',
    year: 2019,
    tech: ['Express', 'React', 'Mongoose', 'Material UI'],
    links: {
      github: 'https://github.com/leanderpaul/ShadowBlog',
    },
  },
  {
    title: 'Pixelview',
    year: 2018,
    company: 'Phosphene AI',
    tech: ['TypeScript', 'Express', 'Mongoose', 'React'],
    links: {},
  },
  {
    title: 'Pristine',
    year: 2018,
    company: 'Phosphene AI',
    tech: ['Express', 'Mongoose'],
    links: {},
  },
  {
    title: 'Jute Emporium Website',
    year: 2018,
    company: 'Jute Emporium (Freelance)',
    tech: ['Express', 'Mongoose', 'Handlebars', 'Bootstrap CSS'],
    links: {},
  },
];
</script>
<template>
  <div>
    <h1>Project Archive</h1>
    <p>A list of the things I've worked on</p>
    <table>
      <thead>
        <tr>
          <th class="year">Year</th>
          <th class="title">Title</th>
          <th class="company">Company</th>
          <th class="tech-stack">Tech Stack</th>
          <th class="links">Links</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects">
          <td class="year">{{ project.year }}</td>
          <td class="title">{{ project.title }}</td>
          <td class="company">{{ project.company || '—' }}</td>
          <td class="tech-stack">
            <span v-for="tech in project.tech" :key="tech">
              {{ tech }}
              <span class="seperator" v-if="tech !== project.tech[project.tech.length - 1]">·</span>
            </span>
          </td>
          <td class="links">
            <a v-if="project.links.demo" :href="project.links.demo" target="_blank">
              <svg viewBox="0 0 24 24">
                <title>Demo</title>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
            <a v-if="project.links.github" :href="project.links.github" target="_blank">
              <svg viewBox="0 0 24 24">
                <title>GitHub</title>
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                ></path>
              </svg>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
h1 {
  font-size: 3em;
  margin-top: 2rem;
}

p {
  font-size: 1em;
  margin-top: 5px;
  color: var(--color-primary);
}

table {
  margin: 100px 0px;
  text-align: left;
  border-collapse: collapse;
}

td,
th {
  padding: 10px 10px;
}

table .year {
  padding: 10px 20px;
}

table .links {
  padding-right: 20px;
}

td.year {
  color: var(--color-primary);
}

td.title {
  font-weight: bold;
  color: var(--text-light);
}

td.company {
  font-size: 15px;
}

td.tech-stack {
  font-size: 13px;
}

td.tech-stack .seperator {
  margin: 0px 5px;
}

td.links a {
  margin-right: 10px;
}

svg {
  fill: none;
  width: 18px;
  stroke: var(--text-default);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

svg:hover {
  stroke: var(--color-primary);
}
</style>

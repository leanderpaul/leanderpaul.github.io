<script lang="ts" setup>
import { ARCHIVE_CAPTION, ARCHIVE_ROWS } from '@app/content';
import LinkIcon from '@app/components/link-icon.component.vue';
</script>
<template>
  <div>
    <h1>Project Archive</h1>
    <p>{{ ARCHIVE_CAPTION }}</p>
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
        <tr v-for="row in ARCHIVE_ROWS" :key="row.title">
          <td class="year">{{ row.year }}</td>
          <td class="title">{{ row.title }}</td>
          <td class="company">{{ row.company || '—' }}</td>
          <td class="tech-stack">{{ row.tech.join(' · ') }}</td>
          <td class="links">
            <a
              v-for="link in row.links"
              :key="link.url"
              :href="link.url"
              target="_blank"
              rel="noopener"
              :aria-label="`${row.title}: ${link.label}`"
            >
              <LinkIcon :type="link.type" />
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

td.year {
  color: var(--color-primary);
}

td.title {
  font-weight: bold;
  color: var(--text-light);
  padding-right: 20px;
}

td.company {
  font-size: 15px;
}

td.tech-stack {
  font-size: 13px;
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

@media (max-width: 768px) {
  table {
    margin: 50px 0px;
  }

  table .company {
    display: none;
  }

  table .tech-stack {
    display: none;
  }

  table .year {
    padding-left: 0px;
  }

  table .links {
    padding-right: 0px;
  }
}
</style>

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
  margin-top: 32px;
  font-size: var(--sh-text-display);
  line-height: var(--sh-text-display--line-height);
  font-weight: 700;
  letter-spacing: -0.02em;
}

p {
  margin-top: 8px;
  color: var(--sh-text-secondary);
}

table {
  width: 100%;
  margin: 64px 0px 100px;
  border-collapse: collapse;
  text-align: left;
}

th {
  font-size: var(--sh-text-caption);
  line-height: var(--sh-text-caption--line-height);
  font-weight: 500;
  color: var(--sh-text-tertiary);
  border-bottom: var(--sh-border-width) solid var(--sh-border-default);
}

td,
th {
  padding: 12px 10px;
}

td {
  border-bottom: var(--sh-border-width) solid var(--sh-border-subtle);
  color: var(--sh-text-secondary);
}

td.year {
  font-family: var(--sh-font-mono);
  font-size: var(--sh-text-code);
  color: var(--sh-text-tertiary);
}

td.title {
  padding-right: 20px;
  font-weight: 600;
  color: var(--sh-text-primary);
}

td.links {
  white-space: nowrap;
}

td.company {
  font-size: var(--sh-text-body);
}

td.tech-stack {
  font-size: var(--sh-text-body-sm);
  line-height: var(--sh-text-body-sm--line-height);
}

td.links a {
  display: inline-flex;
  margin-right: 10px;
  color: var(--sh-text-secondary);
}

td.links a:hover {
  color: var(--sh-accent-text);
}

svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@media (max-width: 768px) {
  table {
    margin: 48px 0px;
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

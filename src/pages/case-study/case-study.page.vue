<script lang="ts" setup>
import { computed, type FunctionalComponent, h, onBeforeUnmount, onMounted, ref } from 'vue';

import { ShBadge, ShTag } from '@app/components';
import { findFeaturedProject, type Ownership, toDisplayUrl } from '@app/content';

import PlatformDiagram from './platform-diagram.component.vue';

const OWNERSHIP_LABELS: Record<Ownership, string> = {
  personal: 'Personal project',
  employer: 'Employer project',
};

const SELECTED_WORK = { path: '/', hash: '#work' };

const CODE_SPAN_DELIMITER = '`';

const SECTIONS = [
  { id: 'context', label: 'Context' },
  { id: 'role', label: 'My role and scope' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'decisions', label: 'Key decisions' },
  { id: 'failure-modes', label: 'Failure modes' },
  { id: 'results', label: 'Results' },
  { id: 'links', label: 'Links' },
  { id: 'changes', label: 'What I would change' },
];

const props = defineProps<{ slug: string }>();

const project = computed(() => findFeaturedProject(props.slug));
const activeSection = ref(SECTIONS[0]?.id);
let sectionObserver: IntersectionObserver | undefined;

function trackActiveSection(entries: IntersectionObserverEntry[]) {
  const visible = entries.find(entry => entry.isIntersecting);
  if (visible) activeSection.value = visible.target.id;
}

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') return;
  sectionObserver = new IntersectionObserver(trackActiveSection, { rootMargin: '-20% 0px -70% 0px' });
  for (const { id } of SECTIONS) {
    const section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
  }
});

onBeforeUnmount(() => sectionObserver?.disconnect());

const InlineCode: FunctionalComponent<{ text: string }> = ({ text }) =>
  text.split(CODE_SPAN_DELIMITER).map((part, index) => (index % 2 === 1 ? h('code', part) : part));
</script>

<template>
  <div v-if="project" class="layout">
    <article class="case-study" aria-labelledby="case-study-title">
      <router-link class="back-link" :to="SELECTED_WORK"><span aria-hidden="true">← </span>Back to selected work</router-link>

      <header class="header">
        <h1 id="case-study-title">{{ project.title }}</h1>
        <p class="runtime">
          <ShBadge>{{ OWNERSHIP_LABELS[project.ownership] }}</ShBadge>
          <span>· {{ project.caseStudy.runtime }}</span>
        </p>
        <p class="summary">{{ project.summary }}</p>
        <ul class="tags" aria-label="Technologies">
          <li v-for="tag in project.tags" :key="tag">
            <ShTag>{{ tag }}</ShTag>
          </li>
        </ul>
      </header>

      <section id="context" aria-labelledby="context-heading">
        <h2 id="context-heading">Context</h2>
        <p v-for="paragraph in project.caseStudy.context" :key="paragraph"><InlineCode :text="paragraph" /></p>
      </section>

      <section id="role" aria-labelledby="role-heading">
        <h2 id="role-heading">My role and scope</h2>
        <p v-for="paragraph in project.caseStudy.role" :key="paragraph"><InlineCode :text="paragraph" /></p>
      </section>

      <section id="architecture" aria-labelledby="architecture-heading">
        <h2 id="architecture-heading">Architecture</h2>
        <p v-for="paragraph in project.caseStudy.architecture.text" :key="paragraph"><InlineCode :text="paragraph" /></p>
        <figure v-if="project.caseStudy.architecture.diagram" class="diagram">
          <PlatformDiagram :title="project.caseStudy.architecture.diagram.caption" />
          <figcaption>
            {{ project.caseStudy.architecture.diagram.caption }}, from
            <a :href="project.caseStudy.architecture.diagram.source.url" target="_blank" rel="noopener noreferrer">
              {{ project.caseStudy.architecture.diagram.source.label }}<span class="visually-hidden"> (opens in a new tab)</span>
            </a>
          </figcaption>
          <details class="text-version">
            <summary>Text version</summary>
            <pre tabindex="0"><code>{{ project.caseStudy.architecture.diagram.text }}</code></pre>
          </details>
        </figure>
      </section>

      <section id="decisions" aria-labelledby="decisions-heading">
        <h2 id="decisions-heading">Key decisions</h2>
        <ol class="decisions">
          <li v-for="item in project.caseStudy.decisions" :key="item.decision" class="decision">
            <h3><InlineCode :text="item.decision" /></h3>
            <dl>
              <div v-if="item.rejected" class="row">
                <dt>Rejected</dt>
                <dd><InlineCode :text="item.rejected" /></dd>
              </div>
              <div class="row">
                <dt>Why</dt>
                <dd><InlineCode :text="item.why" /></dd>
              </div>
            </dl>
          </li>
        </ol>
      </section>

      <section id="failure-modes" aria-labelledby="failure-modes-heading">
        <h2 id="failure-modes-heading">Failure modes</h2>
        <ul class="bullets">
          <li v-for="item in project.caseStudy.failureModes" :key="item"><InlineCode :text="item" /></li>
        </ul>
      </section>

      <section id="results" aria-labelledby="results-heading">
        <h2 id="results-heading">Results</h2>
        <ul class="bullets">
          <li v-for="item in project.caseStudy.results" :key="item"><InlineCode :text="item" /></li>
        </ul>
        <template v-if="project.caseStudy.validityThreats?.length">
          <h3 class="subheading">Threats to validity</h3>
          <ul class="bullets">
            <li v-for="item in project.caseStudy.validityThreats" :key="item"><InlineCode :text="item" /></li>
          </ul>
        </template>
        <p v-if="project.caseStudy.resultsSource" class="source">
          Full numbers and caveats:
          <a :href="project.caseStudy.resultsSource.url" target="_blank" rel="noopener noreferrer">
            {{ project.caseStudy.resultsSource.label }}<span class="visually-hidden"> (opens in a new tab)</span>
          </a>
        </p>
      </section>

      <section id="links" aria-labelledby="links-heading">
        <h2 id="links-heading">Links</h2>
        <ul class="links">
          <li v-for="link in project.links" :key="link.url">
            <a :href="link.url" target="_blank" rel="noopener noreferrer">
              {{ link.label }}<span class="visually-hidden"> (opens in a new tab)</span>
            </a>
            <span class="link-url">{{ toDisplayUrl(link.url) }}</span>
          </li>
        </ul>
      </section>

      <section id="changes" aria-labelledby="changes-heading">
        <h2 id="changes-heading">What I would change</h2>
        <ul class="bullets">
          <li v-for="item in project.caseStudy.changes" :key="item"><InlineCode :text="item" /></li>
        </ul>
      </section>

      <router-link class="back-link back-link--end" :to="SELECTED_WORK"
        ><span aria-hidden="true">← </span>Back to selected work</router-link
      >
    </article>
    <nav class="toc" aria-label="On this page">
      <p class="toc-title">On this page</p>
      <ol>
        <li v-for="section in SECTIONS" :key="section.id">
          <router-link :to="{ hash: `#${section.id}` }" replace :aria-current="activeSection === section.id ? 'location' : undefined">{{
            section.label
          }}</router-link>
        </li>
      </ol>
    </nav>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 64px;
}

.case-study {
  padding: 32px 0px 100px;
  color: var(--sh-text-primary);
}

.toc {
  display: none;
}

@media (min-width: 1120px) {
  .layout {
    grid-template-columns: minmax(0, 1fr) 200px;
  }

  .toc {
    position: sticky;
    top: calc(var(--sh-topbar-height) + 48px);
    display: block;
    align-self: start;
    margin-top: 220px;
  }
}

.toc-title {
  margin-bottom: 12px;
  font-family: var(--sh-font-mono);
  font-size: var(--sh-text-caption);
  line-height: var(--sh-text-caption--line-height);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--sh-text-tertiary);
}

.toc ol {
  margin: 0;
  padding: 0;
  list-style: none;
  border-left: var(--sh-border-width) solid var(--sh-border-default);
}

.toc a {
  display: block;
  margin-left: -1px;
  padding: 6px 0 6px 16px;
  font-size: var(--sh-text-body-sm);
  line-height: var(--sh-text-body-sm--line-height);
  color: var(--sh-text-secondary);
  font-weight: 500;
  text-decoration: none;
  border-left: 2px solid transparent;
  transition:
    color var(--sh-duration-fast) var(--sh-ease-standard),
    border-color var(--sh-duration-fast) var(--sh-ease-standard);
}

.toc a:hover {
  color: var(--sh-text-primary);
}

.toc a[aria-current='location'] {
  font-weight: 600;
  color: var(--sh-accent-text);
  border-left-color: var(--sh-accent);
}

.case-study :is(h1, h2, h3, p, li, dt, dd, figcaption) {
  max-width: 70ch;
}

.back-link {
  display: inline-flex;
  align-items: center;
  min-height: var(--sh-tap-target);
  font-weight: 500;
  font-size: var(--sh-text-body);
  line-height: var(--sh-text-body--line-height);
}

.back-link--end {
  margin-top: 56px;
}

.header {
  margin-top: 24px;
}

h1 {
  font-size: var(--sh-text-display);
  line-height: var(--sh-text-display--line-height);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.runtime {
  margin-top: 12px;
  font-size: var(--sh-text-body);
  line-height: var(--sh-text-body--line-height);
  color: var(--sh-text-secondary);
}

.runtime > :first-child {
  vertical-align: text-bottom;
}

.summary {
  margin-top: 16px;
  color: var(--sh-text-secondary);
}

.tags,
.links,
.decisions {
  padding: 0;
  list-style: none;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}

section {
  margin-top: 48px;
}

h2 {
  margin-bottom: 14px;
  font-size: var(--sh-text-h1);
  line-height: var(--sh-text-h1--line-height);
  letter-spacing: -0.02em;
}

section :is(p, li, dd) {
  line-height: 1.65;
}

section p + p,
section p + figure {
  margin-top: 12px;
}

.bullets {
  margin: 0;
  padding-left: 20px;
}

.bullets li + li {
  margin-top: 8px;
}

.subheading {
  margin: 24px 0px 8px;
}

.source {
  margin-top: 16px;
  font-size: var(--sh-text-body);
  line-height: var(--sh-text-body--line-height);
  color: var(--sh-text-secondary);
}

.diagram {
  margin-top: 20px;
}

.diagram figcaption {
  margin-top: 8px;
  font-size: var(--sh-text-body-sm);
  line-height: var(--sh-text-body-sm--line-height);
  color: var(--sh-text-secondary);
}

.text-version {
  margin-top: 8px;
  font-size: var(--sh-text-body-sm);
  line-height: var(--sh-text-body-sm--line-height);
}

.text-version summary {
  width: fit-content;
  color: var(--sh-accent-text);
  cursor: pointer;
}

.text-version pre {
  margin: 8px 0 0;
  padding: 16px;
  overflow-x: auto;
  border: var(--sh-border-width) solid var(--sh-border-default);
  border-radius: var(--sh-radius-md);
  background-color: var(--sh-surface-card);
  color: var(--sh-text-primary);
  font-size: var(--sh-text-caption);
  line-height: var(--sh-text-caption--line-height);
}

.text-version pre code {
  padding: 0;
  background: none;
  font-size: inherit;
}

.decisions {
  display: grid;
  gap: 12px;
  counter-reset: decision;
}

.decision {
  padding: 20px 24px;
  border: var(--sh-border-width) solid var(--sh-border-default);
  border-radius: var(--sh-radius-lg);
  background-color: var(--sh-surface-card);
  counter-increment: decision;
}

.decision h3 {
  display: flex;
  gap: 12px;
}

.decision h3::before {
  content: counter(decision, decimal-leading-zero);
  flex-shrink: 0;
  font-family: var(--sh-font-mono);
  font-weight: 500;
  color: var(--sh-accent-text);
}

dl {
  display: grid;
  gap: 10px;
  margin: 14px 0px 0px;
}

.row {
  display: grid;
  grid-template-columns: 5.5rem minmax(0, 1fr);
  gap: 4px 16px;
}

dt {
  padding-top: 3px;
  font-family: var(--sh-font-mono);
  font-size: var(--sh-text-caption);
  line-height: var(--sh-text-caption--line-height);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--sh-text-tertiary);
}

dd {
  margin: 0px;
  color: var(--sh-text-secondary);
}

@media (max-width: 640px) {
  .decision {
    padding: 16px;
  }

  .row {
    grid-template-columns: minmax(0, 1fr);
  }
}

.links li {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0px 12px;
}

.links li + li {
  margin-top: 8px;
}

.link-url {
  min-width: 0;
  overflow-wrap: anywhere;
  font-size: var(--sh-text-body-sm);
  line-height: var(--sh-text-body-sm--line-height);
  color: var(--sh-text-secondary);
}

.case-study :deep(:not(pre) > code) {
  padding: 1px 4px;
  border-radius: var(--sh-radius-sm);
  background-color: var(--sh-surface-well);
  font-size: 0.875em;
  overflow-wrap: anywhere;
}
</style>

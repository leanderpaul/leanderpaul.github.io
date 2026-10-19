<script lang="ts" setup>
import { computed, type FunctionalComponent, h } from 'vue';

import { ShBadge, ShTag } from '@app/components';
import { findFeaturedProject, type Ownership, toDisplayUrl } from '@app/content';

const OWNERSHIP_LABELS: Record<Ownership, string> = {
  personal: 'Personal project',
  employer: 'Employer project',
};

const SELECTED_WORK = { path: '/', hash: '#work' };

const CODE_SPAN_DELIMITER = '`';

const props = defineProps<{ slug: string }>();

const project = computed(() => findFeaturedProject(props.slug));

const InlineCode: FunctionalComponent<{ text: string }> = ({ text }) =>
  text.split(CODE_SPAN_DELIMITER).map((part, index) => (index % 2 === 1 ? h('code', part) : part));
</script>

<template>
  <article v-if="project" class="case-study" aria-labelledby="case-study-title">
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

    <section aria-labelledby="context-heading">
      <h2 id="context-heading">Context</h2>
      <p v-for="paragraph in project.caseStudy.context" :key="paragraph"><InlineCode :text="paragraph" /></p>
    </section>

    <section aria-labelledby="role-heading">
      <h2 id="role-heading">My role and scope</h2>
      <p v-for="paragraph in project.caseStudy.role" :key="paragraph"><InlineCode :text="paragraph" /></p>
    </section>

    <section aria-labelledby="architecture-heading">
      <h2 id="architecture-heading">Architecture</h2>
      <p v-for="paragraph in project.caseStudy.architecture.text" :key="paragraph"><InlineCode :text="paragraph" /></p>
      <figure v-if="project.caseStudy.architecture.diagram" class="diagram">
        <pre
          tabindex="0"
          :aria-label="project.caseStudy.architecture.diagram.caption"
        ><code>{{ project.caseStudy.architecture.diagram.text }}</code></pre>
        <figcaption>
          {{ project.caseStudy.architecture.diagram.caption }}, from
          <a :href="project.caseStudy.architecture.diagram.source.url" target="_blank" rel="noopener noreferrer">
            {{ project.caseStudy.architecture.diagram.source.label }}<span class="visually-hidden"> (opens in a new tab)</span>
          </a>
        </figcaption>
      </figure>
    </section>

    <section aria-labelledby="decisions-heading">
      <h2 id="decisions-heading">Key decisions</h2>
      <ol class="decisions">
        <li v-for="item in project.caseStudy.decisions" :key="item.decision">
          <h3><InlineCode :text="item.decision" /></h3>
          <dl>
            <template v-if="item.rejected">
              <dt>Alternative rejected</dt>
              <dd><InlineCode :text="item.rejected" /></dd>
            </template>
            <dt>Why</dt>
            <dd><InlineCode :text="item.why" /></dd>
          </dl>
        </li>
      </ol>
    </section>

    <section aria-labelledby="failure-modes-heading">
      <h2 id="failure-modes-heading">Failure modes</h2>
      <ul class="bullets">
        <li v-for="item in project.caseStudy.failureModes" :key="item"><InlineCode :text="item" /></li>
      </ul>
    </section>

    <section aria-labelledby="results-heading">
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

    <section aria-labelledby="links-heading">
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

    <section aria-labelledby="changes-heading">
      <h2 id="changes-heading">What I would change</h2>
      <ul class="bullets">
        <li v-for="item in project.caseStudy.changes" :key="item"><InlineCode :text="item" /></li>
      </ul>
    </section>

    <router-link class="back-link back-link--end" :to="SELECTED_WORK"><span aria-hidden="true">← </span>Back to selected work</router-link>
  </article>
</template>

<style scoped>
.case-study {
  padding: 32px 0px 100px;
  color: var(--sh-text-primary);
}

.case-study :is(h1, h2, h3, p, li, dt, dd, figcaption) {
  max-width: 70ch;
}

.back-link {
  display: inline-block;
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
  margin-bottom: 12px;
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

.diagram pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  border: var(--sh-border-width) solid var(--sh-border-default);
  border-radius: var(--sh-radius-md);
  background-color: var(--sh-surface-card);
  color: var(--sh-text-primary);
  font-size: var(--sh-text-caption);
  line-height: var(--sh-text-caption--line-height);
}

.diagram pre code {
  padding: 0;
  background: none;
  font-size: inherit;
}

.diagram figcaption {
  margin-top: 8px;
  font-size: var(--sh-text-body-sm);
  line-height: var(--sh-text-body-sm--line-height);
  color: var(--sh-text-secondary);
}

.decisions li {
  padding: 16px 0px;
  border-top: var(--sh-border-width) solid var(--sh-border-default);
}

.decisions li:last-child {
  padding-bottom: 0;
}

dl {
  margin: 8px 0px 0px;
}

dt {
  font-size: var(--sh-text-caption);
  line-height: var(--sh-text-caption--line-height);
  font-weight: 500;
  color: var(--sh-text-tertiary);
}

dd {
  margin: 2px 0px 0px;
}

dd + dt {
  margin-top: 10px;
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

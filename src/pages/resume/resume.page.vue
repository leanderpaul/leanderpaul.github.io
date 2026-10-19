<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import {
  EMPLOYMENT_LABELS,
  EXPERIENCE,
  PROFILE,
  RESUME_CONTACT_LINKS,
  RESUME_EDUCATION,
  RESUME_OPEN_SOURCE_LINE,
  RESUME_PROJECT,
  RESUME_SUMMARY,
  SKILL_GROUPS,
  type EducationEntry,
  type Role,
  formatDateRange,
  formatYearMonth,
  formatYearRange,
} from '@app/content';

interface ResumeEntry {
  key: string;
  heading: string;
  meta: string;
  bullets: string[];
  technologies: string;
}

const META_SEPARATOR = ' · ';

const router = useRouter();

const education = RESUME_EDUCATION.map(entry => ({ degree: entry.degree, details: formatEducationDetails(entry) }));

const contactLinks = RESUME_CONTACT_LINKS.map((link, index) => ({ ...link, separator: index > 0 ? META_SEPARATOR : '' }));
const entries: ResumeEntry[] = EXPERIENCE.map(toResumeEntry);
const projectHeading = `${RESUME_PROJECT.name} — ${RESUME_PROJECT.descriptor}`;
const projectYearsSuffix = `${META_SEPARATOR}${formatYearRange(RESUME_PROJECT.startYear, RESUME_PROJECT.endYear)}`;

function formatEducationDetails(entry: EducationEntry): string {
  return `${entry.institution} — ${formatYearRange(entry.startYear, entry.endYear)}`;
}

function formatRoleHeading(role: Role): string {
  const title = role.employment === 'full-time' ? role.title : `${role.title} (${EMPLOYMENT_LABELS[role.employment]})`;
  if (role.company === EMPLOYMENT_LABELS[role.employment]) return title;
  return `${title} — ${role.company}`;
}

function toResumeEntry(entry: Role): ResumeEntry {
  const dates = formatDateRange(entry.start, entry.end);
  const meta = [entry.client && `Client: ${entry.client}`, entry.location, dates].filter(Boolean).join(META_SEPARATOR);
  return {
    key: formatYearMonth(entry.start),
    heading: formatRoleHeading(entry),
    meta,
    bullets: entry.resumeBullets,
    technologies: entry.technologies.join(', '),
  };
}

let robotsMeta: HTMLMetaElement | undefined;
let previousTheme: string | undefined;

function restoreTheme() {
  if (previousTheme === undefined) delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = previousTheme;
}

const stopRestoringOnLeave = router.afterEach((to, _from, failure) => {
  if (!failure && to.name !== 'Resume') restoreTheme();
});

onBeforeMount(() => {
  previousTheme = document.documentElement.dataset.theme;
  document.documentElement.dataset.theme = 'light';
});

onMounted(() => {
  robotsMeta = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]') ?? document.createElement('meta');
  robotsMeta.name = 'robots';
  robotsMeta.content = 'noindex';
  document.head.append(robotsMeta);
});

onBeforeUnmount(() => {
  stopRestoringOnLeave();
  restoreTheme();
  robotsMeta?.remove();
});
</script>

<template>
  <article class="resume">
    <div class="intro">
      <h1>{{ PROFILE.name }}</h1>
      <p class="headline">{{ PROFILE.headline }}</p>
      <p class="location">{{ PROFILE.location }}</p>
      <p class="contact">
        <span data-contact="phone"></span>
        <span v-for="link in contactLinks" :key="link.kind"
          >{{ link.separator }}<a :href="link.href">{{ link.text }}</a></span
        >
      </p>
    </div>

    <section aria-labelledby="resume-summary">
      <h2 id="resume-summary">Summary</h2>
      <p>{{ RESUME_SUMMARY }}</p>
    </section>

    <section aria-labelledby="resume-experience">
      <h2 id="resume-experience">Experience</h2>
      <div v-for="entry in entries" :key="entry.key" class="entry">
          <h3>{{ entry.heading }}</h3>
          <p class="meta">{{ entry.meta }}</p>
          <ul>
            <li v-for="bullet in entry.bullets" :key="bullet">{{ bullet }}</li>
          </ul>
          <p class="technologies"><strong>Technologies:</strong> {{ entry.technologies }}</p>
      </div>
    </section>

    <section aria-labelledby="resume-projects">
      <h2 id="resume-projects">Projects</h2>
      <div class="entry">
        <h3>{{ projectHeading }}</h3>
        <p class="meta">
          <a :href="RESUME_PROJECT.url">{{ RESUME_PROJECT.urlText }}</a
          >{{ projectYearsSuffix }}
        </p>
        <ul>
          <li v-for="bullet in RESUME_PROJECT.bullets" :key="bullet">{{ bullet }}</li>
        </ul>
      </div>
      <p class="entry open-source">{{ RESUME_OPEN_SOURCE_LINE }}</p>
    </section>

    <section aria-labelledby="resume-education">
      <h2 id="resume-education">Education</h2>
      <p v-for="entry in education" :key="entry.degree" class="line">
        <strong>{{ entry.degree }}</strong> — {{ entry.details }}
      </p>
    </section>

    <section aria-labelledby="resume-skills">
      <h2 id="resume-skills">Skills</h2>
      <p v-for="group in SKILL_GROUPS" :key="group.name" class="line">
        <strong>{{ group.name }}:</strong> {{ group.skills.join(', ') }}
      </p>
    </section>
  </article>
</template>

<style scoped>
@page {
  size: A4;
  margin: 14mm 16mm;
}

.resume {
  width: 100%;
  max-width: 210mm;
  min-height: 297mm;
  margin: 32px auto;
  padding: 14mm 16mm;
  font-family: var(--sh-font-print);
  font-size: 10pt;
  line-height: 1.35;
  color: var(--sh-text-primary);
  background-color: var(--sh-surface-card);
  border: var(--sh-border-width) solid var(--sh-border-default);
  text-wrap: pretty;
  font-variant-ligatures: none;
  font-feature-settings:
    'calt' 0,
    'liga' 0;
  overflow-wrap: break-word;
}

.resume h1,
.resume h2,
.resume h3 {
  letter-spacing: normal;
  break-after: avoid;
}

h1 {
  font-size: 20pt;
  line-height: 1.2;
  color: var(--sh-accent-text);
}

.headline {
  margin-top: 1pt;
  font-size: 11pt;
  font-weight: 500;
  color: var(--sh-accent-text);
}

.location,
.contact {
  margin-top: 2pt;
  color: var(--sh-text-secondary);
}

.contact {
  text-wrap: wrap;
}

.resume a {
  color: var(--sh-text-primary);
  text-decoration: none;
}

.resume a:hover {
  text-decoration: underline;
}

section {
  margin-top: 10pt;
}

h2 {
  margin-bottom: 4pt;
  padding-bottom: 2pt;
  font-size: 11.5pt;
  line-height: 1.3;
  border-bottom: var(--sh-border-width) solid var(--sh-border-default);
}

h3 {
  font-size: 10.5pt;
  line-height: 1.35;
}

.entry + .entry {
  margin-top: 6pt;
}

.meta {
  color: var(--sh-text-secondary);
  break-after: avoid;
}

ul {
  margin: 2pt 0 0;
  padding-left: 12pt;
  list-style-type: disc;
}

li + li {
  margin-top: 1.5pt;
}

.technologies {
  margin-top: 2pt;
  color: var(--sh-text-secondary);
}

.technologies strong,
.line strong {
  font-weight: 600;
  color: var(--sh-text-primary);
}

.line + .line {
  margin-top: 2pt;
}

p,
li {
  orphans: 2;
  widows: 2;
}

li,
.open-source,
.line {
  break-inside: avoid;
}

@media screen and (max-width: 860px) {
  .resume {
    min-height: 0;
    margin: 0;
    padding: 24px 16px;
    border: 0;
  }
}

@media print {
  :global(body:has(.resume)) {
    background-color: transparent;
  }

  .resume {
    max-width: none;
    min-height: 0;
    margin: 0;
    padding: 0;
    border: 0;
    background-color: transparent;
  }
}
</style>

import { type EmploymentType, type LinkType, type Month, type Present, type ProjectLink, type Role, type YearMonth } from './content.types';

const MONTH_LABELS: Record<Month, string> = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
};

const PRESENT_LABEL = 'Present';

const RANGE_SEPARATOR = ' – ';

export const EMPLOYMENT_LABELS: Record<EmploymentType, string> = {
  'full-time': 'Full-time',
  contract: 'Contract',
  freelance: 'Freelance',
};

export const LINK_TYPE_LABELS: Record<LinkType, string> = {
  github: 'GitHub',
  npm: 'npm',
  demo: 'Demo',
  docs: 'Docs',
  employer: 'Website',
};

const LINK_NAME_BUILDERS: Record<LinkType, (title: string) => string> = {
  github: title => `GitHub repository for ${title}`,
  npm: title => `npm package for ${title}`,
  docs: title => `Documentation for ${title}`,
  employer: title => `${title} website`,
  demo: title => `Live demo of ${title}`,
};

export function formatYearMonth(date: YearMonth): string {
  return `${MONTH_LABELS[date.month]} ${date.year}`;
}

export function formatDateRange(start: YearMonth, end: YearMonth | Present): string {
  const endLabel = end === 'present' ? PRESENT_LABEL : formatYearMonth(end);
  return `${formatYearMonth(start)}${RANGE_SEPARATOR}${endLabel}`;
}

export function formatYearRange(start: number, end: number | Present): string {
  const endLabel = end === 'present' ? PRESENT_LABEL : String(end);
  return `${start}${RANGE_SEPARATOR}${endLabel}`;
}

export function formatRoleTitle(role: Role): string {
  if (role.employment !== 'contract') return role.title;
  return `${role.title} (${EMPLOYMENT_LABELS.contract})`;
}

export function toDisplayUrl(url: string): string {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '');
}

export function createLink(type: LinkType, url: string, label: string = LINK_TYPE_LABELS[type]): ProjectLink {
  return { type, label, url };
}

export function getLinkName(link: ProjectLink, title: string): string {
  if (link.label !== LINK_TYPE_LABELS[link.type]) return `${link.label} — ${title}`;
  return LINK_NAME_BUILDERS[link.type](title);
}

import { type FeaturedSlug, type RouteMeta } from './content.types';
import { SITE_META } from './profile.data';
import { FEATURED_PROJECTS } from './projects.data';

const CASE_STUDY_TITLES: Record<FeaturedSlug, string> = {
  identity: 'Shadow Identity case study — Leander Paul',
  'ai-platform': 'AI platform case study — Leander Paul',
  'code-atlas': 'Code Atlas case study — Leander Paul',
};

export const ROUTE_META: RouteMeta[] = [
  { robots: 'index', path: '/', title: SITE_META.title, description: SITE_META.description },
  {
    robots: 'index',
    path: '/project-archive',
    title: 'Project archive — Leander Paul',
    description: 'Everything Leander Paul has built: employer systems, personal projects and open-source TypeScript libraries.',
  },
  ...FEATURED_PROJECTS.map<RouteMeta>(project => ({
    robots: 'index',
    path: `/work/${project.slug}`,
    title: CASE_STUDY_TITLES[project.slug],
    description: project.summary,
  })),
  { robots: 'noindex', path: '/resume', title: 'Résumé — Leander Paul' },
];

export function findRouteMeta(path: string): RouteMeta | undefined {
  const normalizedPath = path.length > 1 ? path.replace(/\/+$/, '') : path;
  return ROUTE_META.find(meta => meta.path === normalizedPath);
}

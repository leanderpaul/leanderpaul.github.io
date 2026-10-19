import { LINK_TYPE_LABELS, type LinkType, type ProjectLink } from '@app/content';

const LINK_NAME_BUILDERS: Record<LinkType, (title: string) => string> = {
  github: title => `GitHub repository for ${title}`,
  npm: title => `npm package for ${title}`,
  docs: title => `Documentation for ${title}`,
  employer: title => `${title} website`,
  demo: title => `Live demo of ${title}`,
};

export function getLinkName(link: ProjectLink, title: string): string {
  if (link.label !== LINK_TYPE_LABELS[link.type]) return `${link.label} — ${title}`;
  return LINK_NAME_BUILDERS[link.type](title);
}

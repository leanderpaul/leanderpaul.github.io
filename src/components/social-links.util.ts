import { PROFILE } from '@app/content';

export type SocialIcon = 'email' | 'linkedin' | 'github' | 'organization' | 'source';

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
  external: boolean;
}

export const SOURCE_CODE_URL = 'https://github.com/leanderpaul/leanderpaul.github.io';

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Email', href: `mailto:${PROFILE.email}`, icon: 'email', external: false },
  { label: 'LinkedIn', href: PROFILE.links.linkedin, icon: 'linkedin', external: true },
  { label: 'GitHub', href: PROFILE.links.github, icon: 'github', external: true },
  { label: 'Shadow Library', href: PROFILE.links.githubOrganization, icon: 'organization', external: true },
  { label: 'Source code', href: SOURCE_CODE_URL, icon: 'source', external: true },
];

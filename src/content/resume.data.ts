import { type ContactLink, type EducationEntry, type ResumeProject } from './content.types';
import { toDisplayUrl } from './content.util';
import { PROFILE } from './profile.data';
import { SHADOW_PLATFORM_RESUME_BULLETS } from './projects.data';
import { SKILL_GROUPS } from './skills.data';

export const RESUME_DOWNLOAD_NAME = 'Leander_Paul_Resume.pdf';

export const RESUME_FILE = '/resumes/Resume-AE.pdf';

export const RESUME_PAGE_BREAK_BEFORE = 'Phosphene AI';

export const RESUME_SUMMARY =
  'Senior backend engineer with 8+ years of experience across banking, identity and backend platforms. Building authorization services for Emirates NBD in Dubai in a small AI-first squad, with production incident and disaster-recovery ownership. Previously worked on Zoho Accounts IAM.';

export const RESUME_EDUCATION: EducationEntry[] = [
  {
    degree: 'MSc Computer Science',
    institution: 'Queen Mary University of London',
    startYear: 2022,
    endYear: 2023,
  },
  {
    degree: 'Bachelor of Technology',
    institution: "St. Joseph's College of Engineering (Anna University), Chennai",
    startYear: 2016,
    endYear: 2020,
  },
];

export const RESUME_PROJECT: ResumeProject = {
  name: 'Shadow Platform',
  descriptor: 'personal project; not deployed to production',
  url: 'https://github.com/shadow-library/platform',
  urlText: 'github.com/shadow-library/platform',
  startYear: 2024,
  endYear: 'present',
  bullets: SHADOW_PLATFORM_RESUME_BULLETS,
};

export const RESUME_OPEN_SOURCE_LINE = 'Open source: @shadow-library npm packages, maintained in the platform monorepo.';

export const RESUME_CONTACT_LINKS: ContactLink[] = [
  { kind: 'email', href: `mailto:${PROFILE.email}`, text: PROFILE.email },
  { kind: 'linkedin', href: PROFILE.links.linkedin, text: toDisplayUrl(PROFILE.links.linkedin) },
  { kind: 'github', href: PROFILE.links.github, text: toDisplayUrl(PROFILE.links.github) },
  { kind: 'website', href: PROFILE.links.website, text: toDisplayUrl(PROFILE.links.website) },
];

const SITE_ONLY_SKILL_GROUPS = new Set(['Applied AI (personal projects)', 'Frontend', 'Practices']);
const SITE_ONLY_SKILLS = new Set(['Bun', 'Drizzle ORM']);

export const RESUME_SKILL_GROUPS = SKILL_GROUPS.filter(group => !SITE_ONLY_SKILL_GROUPS.has(group.name)).map(group => ({
  ...group,
  skills: group.skills.filter(skill => !SITE_ONLY_SKILLS.has(skill)),
}));

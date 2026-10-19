import { type ContactLink, type EducationEntry, type ResumeProject } from './content.types';
import { toDisplayUrl } from './content.util';
import { PROFILE } from './profile.data';
import { SHADOW_PLATFORM_RESUME_BULLETS } from './projects.data';

export const RESUME_DOWNLOAD_NAME = 'Leander_Paul_Resume.pdf';

export const RESUME_FILE = '/resumes/Resume-AE.pdf';

export const RESUME_SUMMARY =
  'Senior backend engineer with 8+ years of experience, most recently building banking and identity systems in Dubai. At Emirates NBD (via Sphere IT), architected an authorization microservice supporting OTP, IVR and Nafath with configurable mid-flow validation, built the manual-review stage of the in-app credit card application, and own escalated production issues and the disaster-recovery environment setup. Previously worked on Zoho Accounts IAM (SAML setup, hierarchical roles and permissions). Independently built Shadow Platform, a public TypeScript monorepo including an OIDC/OAuth 2.1 identity provider, developed with AI-assisted tooling; since 2026 also building LLM applications.';

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
  descriptor: 'personal project, public',
  url: 'https://github.com/shadow-library/platform',
  urlText: 'github.com/shadow-library/platform',
  startYear: 2024,
  endYear: 'present',
  bullets: SHADOW_PLATFORM_RESUME_BULLETS,
};

export const RESUME_OPEN_SOURCE_LINE =
  'Open source: @shadow-library npm packages (app, common, class-schema, fastify, modules; MIT), now maintained in the platform monorepo.';

export const RESUME_CONTACT_LINKS: ContactLink[] = [
  { kind: 'email', href: `mailto:${PROFILE.email}`, text: PROFILE.email },
  { kind: 'linkedin', href: PROFILE.links.linkedin, text: toDisplayUrl(PROFILE.links.linkedin) },
  { kind: 'github', href: PROFILE.links.github, text: toDisplayUrl(PROFILE.links.github) },
  { kind: 'website', href: PROFILE.links.website, text: toDisplayUrl(PROFILE.links.website) },
];

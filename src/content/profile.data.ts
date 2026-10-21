import { type ContactSection, type Profile, type ProfileFact, type ProfileToken, type SiteMeta } from './content.types';
import { BACHELORS_DEGREE, MASTERS_DEGREE } from './education.data';

export const PROFILE: Profile = {
  name: 'Leander Paul',
  headline: 'Senior Backend Engineer — Identity & Banking Platforms',
  tagline:
    "Backend and identity systems for banking and platform teams: ENBD X KSA's mobile and online banking backend at Emirates NBD, IAM at Zoho, and now my own OIDC identity provider. Also building LLM applications.",
  location: 'Dubai, UAE',
  email: 'leanderpaul97@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/leander-paul',
    github: 'https://github.com/leanderpaul',
    githubOrganization: 'https://github.com/shadow-library',
    website: 'https://leanderpaul.github.io',
  },
};

export const SITE_META: SiteMeta = {
  url: 'https://leanderpaul.github.io',
  title: 'Leander Paul — Senior Backend Engineer, Identity & Banking Platforms',
  description:
    "Leander Paul — Senior Backend Engineer in Dubai, focused on identity and banking platforms: ENBD X KSA's mobile and online banking backend at Emirates NBD, Zoho Accounts IAM, and a public OIDC/OAuth 2.1 identity provider.",
  keywords: [
    'Leander Paul',
    'Senior Backend Engineer',
    'Backend Engineer Dubai',
    'Identity and Access Management',
    'IAM',
    'OAuth 2.1',
    'OpenID Connect',
    'SAML',
    'Authentication',
    'Authorization',
    'Banking',
    'Retail banking',
    'Digital onboarding',
    'Instant payments',
    'Fintech',
    'Java',
    'Spring Boot',
    'Node.js',
    'TypeScript',
    'PostgreSQL',
    'Redis',
    'Claude Code',
    'AI-assisted development',
    'Dubai',
    'UAE',
  ],
  ogType: 'website',
  ogImage: { url: 'https://leanderpaul.github.io/og-image.png', width: 1200, height: 630 },
  twitterCard: 'summary_large_image',
};

export const ABOUT_TEXT =
  "I'm a backend engineer. I grew up in the Gulf, did my schooling in Qatar, and now live in Dubai. I enjoy the kind of debugging that needs a real understanding of the system underneath. Most of my day-to-day coding now goes through AI tools; my part is the judgement around them: design, review, debugging and deciding what is ready for production. Outside work I build Shadow Platform, read novels and follow science and technology.";

export const ABOUT_FACTS: ProfileFact[] = [
  { label: 'Based in', value: PROFILE.location },
  { label: 'Grew up', value: 'The Gulf, schooled in Qatar' },
  { label: "Master's", value: MASTERS_DEGREE.degree, detail: MASTERS_DEGREE.institution },
  { label: "Bachelor's", value: BACHELORS_DEGREE.degree, detail: BACHELORS_DEGREE.institution },
  { label: 'Building', value: 'Shadow Platform' },
  { label: 'Off-hours', value: 'Novels, science and technology' },
];

export const CONTACT_SECTION: ContactSection = {
  heading: 'Get in touch',
  text: "I'm looking for senior backend, identity and platform engineering roles in the UAE. I'm based in Dubai.",
};

export const HERO_CONTEXT = ['8+ years', 'Emirates NBD (via Sphere IT)', 'previously Zoho Accounts IAM'];

export const PROFILE_TOKEN: ProfileToken = {
  header: { alg: 'EdDSA', typ: 'JWT' },
  payload: {
    iss: PROFILE.links.website,
    sub: 'leander-paul',
    name: PROFILE.name,
    role: 'Senior Backend Engineer',
    focus: ['identity', 'banking platforms'],
    loc: PROFILE.location,
    exp: '8+ years',
    open_to: 'backend, identity, platform roles',
  },
};

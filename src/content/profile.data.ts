import { type ContactSection, type Profile, type ProofPoint, type SiteMeta } from './content.types';

export const PROFILE: Profile = {
  name: 'Leander Paul',
  headline: 'Senior Backend Engineer — Identity & Banking Platforms',
  tagline:
    'Authorization, identity and backend systems for banking and platform teams: OTP, IVR and Nafath at Emirates NBD, IAM at Zoho, and now my own OIDC identity provider. Also building LLM applications.',
  location: 'Dubai, United Arab Emirates',
  availability: "Dubai · one month's notice",
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
    'Leander Paul — Senior Backend Engineer in Dubai, focused on identity and banking platforms: OTP, IVR and Nafath authorization at Emirates NBD, Zoho Accounts IAM, and a public OIDC/OAuth 2.1 identity provider.',
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
    'Fintech',
    'Java',
    'Spring Boot',
    'Node.js',
    'TypeScript',
    'PostgreSQL',
    'Redis',
    'Dubai',
    'UAE',
  ],
  ogType: 'website',
  ogImage: { url: 'https://leanderpaul.github.io/og-image.png', width: 1200, height: 630 },
  twitterCard: 'summary_large_image',
};

export const ABOUT_TEXT =
  "I'm a backend engineer in Dubai. At Emirates NBD, through Sphere IT, I work on the retail mobile-banking backend: I architected the authorization microservice behind OTP, IVR and Nafath sign-in, built the manual-review stage of the in-app credit card application, and take on the production issues application support can't resolve. Before that I worked on Zoho Accounts IAM, built backend services for Capture at WTV in London, and led a three-person team at Phosphene AI. Outside work I build Shadow Platform, a public TypeScript monorepo that includes my own OIDC identity provider. I grew up in the Gulf and did my schooling in Qatar; my parents live in Dubai, which is why I made it home.";

export const CONTACT_SECTION: ContactSection = {
  heading: 'Get in touch',
  text: "I'm looking for senior backend, identity and platform engineering roles in the UAE. I'm based in Dubai and available on one month's notice.",
};

export const PROOF_POINTS: ProofPoint[] = [
  { value: '8+', label: 'years of experience' },
  { value: 'OTP · IVR · Nafath', label: 'authorization at Emirates NBD' },
  { value: 'IAM', label: 'Zoho Accounts, 2020–2022' },
  { value: 'OIDC', label: 'my own identity provider, public on GitHub' },
];

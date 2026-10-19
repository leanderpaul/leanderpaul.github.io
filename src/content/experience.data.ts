import { type Role } from './content.types';

const SPHERE_BULLETS = [
  "Architected the retail app's authorization microservice: OTP, IVR and Nafath (Saudi national identity) steps, with validation checks such as device trust defined in database configuration and run between steps, cancelling the flow when a check fails.",
  'Built the manual-review stage for partially eligible credit card applicants and contributed to the in-app application journey, integrating external credit-scoring and employment-verification services.',
  'Own escalated production incidents on live banking services, from root-cause analysis to shipped fix.',
  "Led the disaster-recovery environment setup for the team's services, completed in compliance with SAMA (Saudi Central Bank) regulations.",
];

const WTV_BULLETS = [
  'Worked on Capture, a carbon-footprint platform, from start to finish: helped design its APIs and its three NestJS microservices over RabbitMQ (auth and users; projects and permissions; calculations), and developed backend services.',
  'Initiated and set up end-to-end tests that reset and reseed the database before each run; services were deployed as Docker containers.',
];

const ZOHO_SITE_BULLETS = [
  'Architected a hierarchical role-and-permission system for Zoho Accounts IAM and contributed to setting up SAML-based authorization.',
  "Built a proof of concept that replaced Apache Directory Server's storage layer with the team's PostgreSQL database, so customers could query it over LDAP.",
  'Helped trace Redis server crashes to CPU load from setting TTLs; removed the TTLs and introduced a general approach that balanced the load and stopped the crashes.',
];

const PHOSPHENE_BULLETS = [
  "Designed and built PixelView's upload-to-upscale pipeline: browser-direct S3 uploads, Lambda notifications, an SQS queue, and an upscaler server started on demand and stopped after 5 idle minutes to cut compute cost.",
  'Led a team of 3 developers and wrote most of the frontend (React, Next.js) and Node.js backend, including Google sign-in, Google Drive import/export and Stripe payments.',
];

const FREELANCE_BULLETS = [
  'Built and deployed two web applications on AWS EC2, including Jute Emporium, an e-commerce store with Razorpay payments and an admin panel for orders and stock.',
];

const ZOHO_RESUME_BULLETS = [
  ...ZOHO_SITE_BULLETS,
  'Wrote migration scripts for application-level sharded databases and set up and optimised the admin panel the accounts team uses to inspect and clear user caches; helped mentor junior engineers.',
];

export const EXPERIENCE: Role[] = [
  {
    company: 'Sphere IT Consultants',
    companyUrl: 'https://sphereitglobal.com',
    client: 'Emirates NBD',
    clientUrl: 'https://www.emiratesnbd.com/en',
    title: 'Software Engineer',
    employment: 'full-time',
    location: 'Dubai, UAE',
    start: { year: 2024, month: 3 },
    end: 'present',
    siteBullets: SPHERE_BULLETS,
    resumeBullets: SPHERE_BULLETS,
    technologies: ['Java', 'Spring Boot', 'Node.js', 'Express'],
  },
  {
    company: 'WTV Global',
    companyUrl: 'https://wtvglobal.com',
    title: 'Full Stack Engineer',
    employment: 'contract',
    location: 'London, UK',
    start: { year: 2023, month: 3 },
    end: { year: 2023, month: 9 },
    siteBullets: WTV_BULLETS,
    resumeBullets: WTV_BULLETS,
    technologies: ['NestJS', 'RabbitMQ', 'Docker'],
  },
  {
    company: 'Zoho Corporation',
    companyUrl: 'https://www.zoho.com',
    title: 'Software Engineer',
    employment: 'full-time',
    location: 'Chennai, India',
    start: { year: 2020, month: 1 },
    end: { year: 2022, month: 8 },
    siteBullets: ZOHO_SITE_BULLETS,
    resumeBullets: ZOHO_RESUME_BULLETS,
    technologies: ['Java', 'JavaScript', 'PostgreSQL', 'Redis', 'Apache Directory Server', 'SAML', 'LDAP'],
  },
  {
    company: 'Phosphene AI',
    companyUrl: 'https://www.linkedin.com/company/phosphene-ai',
    title: 'Full Stack Engineer & Team Lead',
    employment: 'full-time',
    location: 'Chennai, India',
    start: { year: 2018, month: 4 },
    end: { year: 2020, month: 1 },
    siteBullets: PHOSPHENE_BULLETS,
    resumeBullets: PHOSPHENE_BULLETS,
    technologies: ['Node.js', 'React', 'Next.js', 'Python', 'MongoDB', 'AWS (EC2, S3, Lambda, SQS)', 'Stripe'],
  },
  {
    company: 'Freelance',
    title: 'Software Engineer',
    employment: 'freelance',
    location: 'Chennai, India',
    start: { year: 2017, month: 4 },
    end: { year: 2018, month: 3 },
    siteBullets: FREELANCE_BULLETS,
    resumeBullets: FREELANCE_BULLETS,
    technologies: ['Node.js', 'Handlebars', 'MongoDB', 'AWS EC2'],
  },
];

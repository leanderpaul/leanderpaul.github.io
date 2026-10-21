import { type Role } from './content.types';

const SPHERE_SITE_BULLETS = [
  "Part of the team that owns the mobile and online banking backend of ENBD X KSA, Emirates NBD's retail banking app in Saudi Arabia: the microservices behind login, new account opening, credit card applications, Request to Pay and instant payments.",
  'Built the mobile and online side of Request to Pay and instant payments: checking the balance, verifying the payment details and posting the payment, calling the other microservices for the data and changes each step needs.',
  "Architected the retail app's authorization microservice: OTP, IVR and Nafath (Saudi national identity) steps, with validation checks such as device trust defined in database configuration and run between steps, cancelling the flow when a check fails.",
  'Built the manual-review stage for partially eligible credit card applicants and contributed to the in-app application journey, integrating external credit-scoring and employment-verification services.',
  'Work in a small AI-first squad set up to deliver more with fewer engineers; squad velocity rose from 40–50 to 75–80 story points per sprint.',
  'Use Claude Code through AWS Bedrock to write code, review changes for security issues and bugs, and debug and fix defects. Every change is reviewed by hand before approval, and the model sees only code, never customer data.',
  'Own escalated production incidents on live banking services, from root-cause analysis to shipped fix.',
  "Led the disaster-recovery environment setup for the team's services, completed in compliance with SAMA (Saudi Central Bank) regulations.",
];

const WTV_SITE_BULLETS = [
  'Worked on Capture, a carbon-footprint platform, from start to finish: helped design its APIs and its three NestJS microservices over RabbitMQ (auth and users; projects and permissions; calculations), and developed backend services.',
  'Initiated and set up end-to-end tests that reset and reseed the database before each run; services were deployed as Docker containers.',
];

const ZOHO_SITE_BULLETS = [
  'Architected a hierarchical role-and-permission system for Zoho Accounts IAM and contributed to setting up SAML-based authorization.',
  "Built a proof of concept that replaced Apache Directory Server's storage layer with the team's PostgreSQL database, so customers could query it over LDAP.",
  'Helped trace Redis server crashes to CPU load from setting TTLs; removed the TTLs and introduced a general approach that balanced the load and stopped the crashes.',
];

const PHOSPHENE_SITE_BULLETS = [
  "Designed and built PixelView's upload-to-upscale pipeline: browser-direct S3 uploads, Lambda notifications, an SQS queue, and an upscaler server started on demand and stopped after 5 idle minutes to cut compute cost.",
  'Led a team of 3 developers and wrote most of the frontend (React, Next.js) and Node.js backend, including Google sign-in, Google Drive import/export and Stripe payments.',
];

const FREELANCE_SITE_BULLETS = [
  'Built and deployed two web applications on AWS EC2, including Jute Emporium, an e-commerce store with Razorpay payments and an admin panel for orders and stock.',
];

const SPHERE_RESUME_BULLETS = [
  "Part of the team owning the mobile and online banking backend of ENBD X KSA, Emirates NBD's Saudi retail banking app: login, account opening, credit cards and payments.",
  'Built the mobile and online Request to Pay and instant-payment flow: balance check, payment verification and posting, orchestrating calls to other microservices.',
  "Architected the retail app's OTP, IVR and Nafath authorization microservice, with database-configured validation checks between steps.",
  'Built manual review for partially eligible credit-card applicants and integrated credit-scoring and employment-verification services into the application journey.',
  'Deliver in a small AI-first squad using Claude Code (AWS Bedrock) for coding, security review and debugging, with manual review of every change; squad velocity rose from 40–50 to 75–80 story points per sprint.',
  'Own escalated production incidents on live banking services, from root-cause analysis to shipped fix.',
  "Led disaster-recovery environment setup for the team's services, meeting SAMA requirements.",
];

const WTV_RESUME_BULLETS = [
  'Helped design APIs and three RabbitMQ-connected NestJS microservices for Capture, a carbon-footprint platform, and developed backend services.',
  'Established end-to-end tests with database reset and reseeding before each run; services ran in Docker containers.',
];

const ZOHO_RESUME_BULLETS = [
  'Architected a hierarchical role-and-permission system for Zoho Accounts IAM and contributed to setting up SAML-based authorization.',
  'Built a proof of concept enabling LDAP queries against PostgreSQL through Apache Directory Server.',
  'Helped resolve Redis crashes caused by TTL-related CPU load by removing TTLs and balancing the load.',
  'Wrote migration scripts for sharded databases, set up and optimised an admin panel for inspecting and clearing user caches, and helped mentor junior engineers.',
];

const PHOSPHENE_RESUME_BULLETS = [
  "Designed and built PixelView's image-upscaling pipeline using direct S3 uploads, Lambda and SQS, with on-demand compute that stopped after five idle minutes.",
  'Led three developers and built most of the React/Next.js frontend and Node.js backend, including Google integrations and Stripe payments.',
];

const FREELANCE_RESUME_BULLETS = [
  'Built and deployed two web applications on AWS EC2, including an e-commerce store with Razorpay payments and order/stock administration.',
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
    siteBullets: SPHERE_SITE_BULLETS,
    resumeBullets: SPHERE_RESUME_BULLETS,
    technologies: ['Java', 'Spring Boot', 'Node.js', 'Express', 'Claude Code', 'AWS Bedrock'],
    resumeTechnologies: ['Java', 'Spring Boot', 'Node.js', 'Express', 'Claude Code', 'AWS Bedrock'],
  },
  {
    company: 'WTV Global',
    companyUrl: 'https://wtvglobal.com',
    title: 'Full Stack Engineer',
    employment: 'contract',
    location: 'London, UK',
    start: { year: 2023, month: 3 },
    end: { year: 2023, month: 9 },
    siteBullets: WTV_SITE_BULLETS,
    resumeBullets: WTV_RESUME_BULLETS,
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
    resumeTechnologies: ['Java', 'PostgreSQL', 'Redis'],
  },
  {
    company: 'Phosphene AI',
    companyUrl: 'https://www.linkedin.com/company/phosphene-ai',
    title: 'Full Stack Engineer & Team Lead',
    employment: 'full-time',
    location: 'Chennai, India',
    start: { year: 2018, month: 4 },
    end: { year: 2020, month: 1 },
    siteBullets: PHOSPHENE_SITE_BULLETS,
    resumeBullets: PHOSPHENE_RESUME_BULLETS,
    technologies: ['Node.js', 'React', 'Next.js', 'Python', 'MongoDB', 'AWS (EC2, S3, Lambda, SQS)', 'Stripe'],
  },
  {
    company: 'Freelance',
    title: 'Software Engineer',
    employment: 'freelance',
    location: 'Chennai, India',
    start: { year: 2017, month: 4 },
    end: { year: 2018, month: 3 },
    siteBullets: FREELANCE_SITE_BULLETS,
    resumeBullets: FREELANCE_RESUME_BULLETS,
    technologies: ['Node.js', 'Handlebars', 'MongoDB', 'AWS EC2'],
  },
];

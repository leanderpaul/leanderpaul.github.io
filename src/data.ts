/**
 * Importing npm packages
 */

/**
 * Importing user defined packages
 */

/**
 * Defining types
 */

type LinkType = 'Github' | 'Demo' | 'NPM';

export interface Experience {
  startDate: string;
  endDate: string;
  company?: string;
  client?: string;
  clientUrl?: string;
  companyUrl?: string;
  designation: string;
  description: string[];
}

interface Education {
  fromDate: string;
  toDate: string;
  university: string;
  universityUrl?: string;
  degree: string;
}

interface Link {
  type: LinkType;
  url: string;
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  links?: Link[];
}

/**
 * Declaring the constants
 */

export const resumeLinks: Record<string, string> = {
  IN: '/resumes/Resume-IN.pdf',
  AE: '/resumes/Resume-AE.pdf',
  GLOBAL: '/resumes/Resume-Global.pdf',
};

export const experiences: Experience[] = [
  {
    startDate: 'March 2024',
    endDate: 'Present',
    company: 'Sphere IT',
    client: 'Emirates NBD Bank',
    clientUrl: 'https://www.emiratesnbd.com/en',
    companyUrl: 'https://sphereitglobal.com',
    designation: 'Software Developer',
    description: [
      'Architected and built 9+ backend microservices using Node.js and Express for the retail mobile banking platform serving millions of customers',
      'Designed a configurable multi-factor authentication system supporting OTP, IVR, and Nafath (KSA national identity) with mid-flow validation checkpoints',
      'Engineered the end-to-end credit card application journey integrating external credit scoring and employment verification services',
      'Developed STP (Straight Through Processing) flow for new-to-bank customer onboarding with manual review stages for partial eligibility cases',
      'Built a custom automated testing suite *achieving 95% code coverage and reducing manual testing time by 50%*',
    ],
  },
  {
    startDate: 'March 2023',
    endDate: 'September 2023',
    company: 'WTV',
    companyUrl: 'https://wtvglobal.com',
    designation: 'Full Stack Developer',
    description: [
      'Designed the system architecture for Capture — a carbon footprint calculation platform built with 3 NestJS microservices communicating via RabbitMQ',
      'Architected service boundaries: auth & user management, project & permissions, and carbon footprint calculations as independent microservices',
      'Built the full backend using NestJS and Fastify with MongoDB, and contributed to the React + Tailwind CSS frontend',
      'Initiated and implemented end-to-end testing infrastructure with automated database seeding, *achieving 30% reduction in system downtime*',
      'Containerized all services with Docker for consistent deployment across environments',
    ],
  },
  {
    startDate: 'January 2020',
    endDate: 'August 2022',
    company: 'Zoho',
    companyUrl: 'https://zoho.com',
    designation: 'Software Engineer',
    description: [
      'Worked on the IAM platform (accounts.zoho.com) implementing SAML authorization and designing a hierarchy-based role and permission management system',
      'Diagnosed and resolved a critical Redis bottleneck caused by TTL overhead, *reducing CPU usage by 60%* across the caching infrastructure',
      'Built a POC integrating Apache Directory Server with PostgreSQL, replacing the built-in storage layer to enable LDAP queries against the production database',
      'Designed and executed data migration scripts for application-level sharded databases across service boundaries',
      'Mentored 3 junior developers and established internal best practices documentation for the IAM team',
    ],
  },
  {
    startDate: 'April 2018',
    endDate: 'January 2020',
    company: 'Phosphene AI',
    companyUrl: 'https://www.linkedin.com/company/phosphene-ai',
    designation: 'Full Stack Developer & Team Lead',
    description: [
      'Designed the full system architecture for Pixelview — an image upscaling platform using Node.js, React, Python, MongoDB, and AWS (EC2, S3, Lambda, SQS)',
      'Engineered a cost-optimized pipeline: client-side S3 uploads, Lambda triggers, SQS task queues, and auto-scaling GPU servers that idle after 5 min of inactivity, *reducing infrastructure cost by 75%*',
      'Implemented OAuth with Google and Google Drive integration for seamless image import/export workflows',
      'Led a team of 3 developers, owning 90% of the frontend and backend codebase while conducting weekly code reviews',
      'Deployed all services on AWS achieving 99% uptime and reduced frontend load time by 30% with SEO optimizations',
    ],
  },
  {
    startDate: 'April 2017',
    endDate: 'March 2018',
    company: 'Freelance',
    designation: 'Software Developer',
    description: [
      '*Built and deployed 2 full-stack web applications* — Bluebell (a form-based app using Node.js and Handlebars) and Jute Emporium (an e-commerce platform)',
      'Architected the e-commerce backend with Razorpay payment integration, dynamic order tracking, and automated email notifications',
      'Developed custom admin panels for inventory management, order status tracking, and customer communication workflows',
      'Deployed both applications on AWS EC2, handling infrastructure setup, domain configuration, and uptime monitoring',
    ],
  },
];

export const education: Education[] = [
  {
    fromDate: '2022',
    toDate: '2023',
    university: 'Queen Mary University of London',
    universityUrl: 'https://www.qmul.ac.uk',
    degree: "Master's in Computer Science",
  },
  {
    fromDate: '2016',
    toDate: '2020',
    university: 'Anna University',
    universityUrl: 'https://www.annauniv.edu',
    degree: "Bachelor's in Information Technology",
  },
];

export const projects: Project[] = [
  {
    title: 'Shadow Identity',
    description:
      'A centralized IAM platform for user identity, authentication, and authorization across the entire ecosystem. Manages users, sessions, tokens, and access control as the single source of truth — with detailed architecture diagrams and auth flow documentation.',
    tech: ['NestJS', 'TypeScript', 'MongoDB', 'Redis'],
    links: [{ type: 'Github', url: 'https://github.com/shadow-library/identity' }],
  },
  {
    title: 'Shadow Pulse',
    description:
      'A multi-channel notification platform with template management and delivery across Email, SMS, Push, and WhatsApp. Features vendor failover, retry mechanisms, configurable test modes, and an Angular dashboard for monitoring.',
    tech: ['NestJS', 'Angular', 'TypeScript', 'RabbitMQ'],
    links: [{ type: 'Github', url: 'https://github.com/shadow-library/pulse-server' }],
  },
  {
    title: 'Shadow Applications',
    description:
      'A platform-agnostic dependency-injection framework for Node.js built on SOLID principles. Unlike NestJS, it decouples from HTTP servers — supporting CLI tools, desktop apps, and microservices with modular architecture and lifecycle hooks.',
    tech: ['Bun', 'TypeScript', 'Jest'],
    links: [
      { type: 'Github', url: 'https://github.com/shadow-library/app' },
      { type: 'NPM', url: 'https://www.npmjs.com/package/@shadow-library/app' },
    ],
  },
];

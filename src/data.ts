/**
 * Importing npm packages
 */

/**
 * Importing user defined packages
 */

/**
 * Defining types
 */

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

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  source: string;
  demo: string;
}

/**
 * Declaring the constants
 */

export const experiences: Experience[] = [
  {
    startDate: 'March 2024',
    endDate: 'Present',
    company: 'Sphere IT Consultants',
    client: 'Emirates NBD Bank',
    clientUrl: 'https://www.emiratesnbd.com/en',
    companyUrl: 'https://sphereitglobal.com',
    designation: 'NodeJS Developer',
    description: [
      'Built 9+ NodeJS microservices using Express framework to support the credit card application journey',
      'Integrated multi-factor authentication (MFA) using SMS, IVR, and Number Matching authentication based on configurable flows',
      'Engineered APIs for fetching customer credit card details and dynamic credit limit computation via external services',
      'Developed end-to-end STP (Straight Through Processing) flow for onboarding new-to-bank customers',
      'Automated testing for all APIs using a custom-built suite, achieving 95% code coverage and reducing manual testing time by 50%',
    ],
  },
  {
    startDate: 'March 2023',
    endDate: 'September 2023',
    company: 'WTV',
    companyUrl: 'https://wtvglobal.com',
    designation: 'Backend NodeJS Developer',
    description: [
      'Architected scalable microservices with inter-service communication using RabbitMQ for enhanced reliability',
      'Developed MongoDB schemas optimized for performance under real-world query patterns',
      'Adopted TDD methodology with Jest for unit and integration tests, improving test coverage and code quality',
      'Created comprehensive API documentation using Swagger for seamless frontend integration',
      '*Achieved a 30% reduction in system downtime* by optimizing microservice messaging with RabbitMQ and Docker-based deployments',
    ],
  },
  {
    startDate: 'January 2020',
    endDate: 'August 2022',
    company: 'Zoho',
    companyUrl: 'https://zoho.com',
    designation: 'Member Technical Staff',
    description: [
      "Optimized application's data processing speed by over 40% using advanced cache management techniques in Redis",
      '*Reduced Redis CPU usage by 60%* and improved the reliability of the caching system',
      'Identified and resolved slow queries in the application thereby increasing the response time of certain queries by 20%',
      'Introduced a hierarchy-based role management system to facilitate authorization like Linux file system permissions improving performance by 40%',
      'Mentored 3 junior developers on the team and documented best practices within the organization',
    ],
  },
  {
    startDate: 'April 2018',
    endDate: 'January 2020',
    company: 'Phosphene AI',
    companyUrl: 'https://www.linkedin.com/company/phosphene-ai',
    designation: 'Full Stack Web Developer',
    description: [
      'Led architecture, design and development of 20+ new features and 35+ components in react',
      'Deployed applications on AWS, achieving a 99% uptime on small-sized servers, saving 30% in cost',
      'Implemented auto-scaling mechanism in the application logic for image upscaling application, *reducing the cost by 75%*',
      'Conducted weekly code reviews, ensuring the reliability of the application and helping the team find 40% more bugs in the application',
      'Reduced load time by 30% and made the web application SEO compliant',
    ],
  },
  {
    startDate: 'April 2017',
    endDate: 'March 2018',
    designation: 'Freelance Web Developer',
    description: [
      'Built and deployed 2 web applications (Bluebell - a frontend form app, and Jute Emporium - an e-commerce site)',
      'Integrated Razorpay for secure online payments and implemented dynamic order tracking with email notifications',
      'Developed custom admin panels for stock and order management',
      'Deployed both apps on AWS EC2, ensuring scalability and uptime',
      'Noteworthy: Delivered a complete e-commerce solution with real-time order updates and admin control, including email automation for customer communication',
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
    title: 'Shadow Accounts',
    description: 'A Web app to manage your account for all the shadow services. View and manage your profile, and sessions.',
    image: '/images/accounts.jpg',
    tech: ['Astro', 'Tailwind CSS', 'Vercel'],
    source: 'https://github.com/leanderpaul/shadow-accounts',
    demo: 'https://accounts.shadow-apps.com',
  },
  {
    title: 'Shadow Chronicle',
    description:
      'A web app to track your daily activities and to keep a journal of your life. It also tracks your expenses, workouts, and other activities.',
    image: '/images/chronicle.jpg',
    tech: ['Angular', 'Tailwind CSS', 'GraphQL', 'Vercel'],
    source: 'https://github.com/leanderpaul/shadow-chronicle',
    demo: 'https://chronicle.shadow-apps.com',
  },
  {
    title: 'Shadow Archive',
    description:
      'A backend service to store data from the shadow services and exposes the data using GraphQL API. It stores all the date required by other the shadow services such as accounts, chronicle, etc.',
    image: '/images/archive.jpg',
    tech: ['NestJS', 'Fastify', 'GraphQL', 'MongoDB', 'AWS EC2'],
    source: 'https://github.com/leanderpaul/shadow-archive',
    demo: 'https://archive.shadow-apps.com',
  },
];

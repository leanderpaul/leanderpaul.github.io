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
  company: string;
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
    companyUrl: 'https://sphereitglobal.com',
    designation: 'NodeJS Developer',
    description: [
      '*Reporting to Emirates NBD* and working on their digital banking application for the Egypt branch',
      'Collaborated with cross-functional teams to deliver high-quality software solutions within tight deadlines',
      'Documented 100% of the technical specifications and dependencies of the application',
    ],
  },
  {
    startDate: 'March 2023',
    endDate: 'September 2023',
    company: 'WTV',
    companyUrl: 'https://wtvglobal.com',
    designation: 'Backend NodeJS Developer',
    description: [
      'Designed and architected the microservices that make up the application',
      'Developed 30+ new software features by following the best practices',
      'Wrote 100+ integration tests to verify the functionality of the application',
      'Documented 100% of the technical specifications and dependencies of the application',
      'Improved bug detection to 99%, reducing customer inquiries to less than 5 per week',
      'Optimized microservice architecture by implementing RabbitMQ as a message broker, increasing system reliability and enabling horizontal scalability; achieved a *40% reduction in downtime* and improved overall system performance',
    ],
  },
  {
    startDate: 'January 2020',
    endDate: 'August 2022',
    company: 'Zoho',
    companyUrl: 'https://zoho.com',
    designation: 'Member Technical Staff',
    description: [
      'Collaborated with 10 client service teams to understand and solve bottlenecks and proposed feature expansions',
      'Mentored 3 junior developers on the team and documented best practices within the organization',
      "Optimized application's data processing speed by over 40% using advanced cache management techniques in Redis",
      '*Reduced Redis CPU usage by 60%* and improved the reliability of the caching system',
      'Identified and resolved slow queries in the application thereby increasing the response time of certain queries by 20%',
      'Introduced a hierarchy-based role management system to facilitate authorization like Linux file system permissions improving performance by 40%',
    ],
  },
  {
    startDate: 'April 2018',
    endDate: 'January 2020',
    company: 'Phosphene AI',
    companyUrl: 'https://www.linkedin.com/company/phosphene-ai',
    designation: 'Full Stack Web Developer',
    description: [
      'Led architecture, design and development of 20+ new features',
      'Deployed applications on AWS, achieving a 99% uptime on small-sized servers, saving 30% in cost',
      'Implemented auto-scaling mechanism in the application logic for image upscaling application, *reducing the cost by 75%*',
      'Developed and documented RESTful APIs, allowing other developers to leverage APIs for their daily tasks',
      'Conducted weekly code reviews, ensuring the reliability of the application and helping the team find 40% more bugs in the application',
      'Implemented rich user experiences by creating 35+ new components in react',
      'Reduced load time by 30% and made the web application SEO compliant',
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

/**
 * Importing npm packages
 */

/**
 * Importing user defined packages
 */

/**
 * Defining types
 */

interface WorkExperience {
  fromDate: string;
  toDate?: string;
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

export const workExperience: WorkExperience[] = [
  {
    fromDate: '03-2023',
    toDate: '09-2023',
    company: 'World Television (WTV)',
    companyUrl: 'https://wtvglobal.com',
    designation: 'Backend NodeJS Developer',
    description: [
      'API Development for micro service architecture using RabbitMQ',
      'Developed REST logic and tests to validate the working of theapplication',
    ],
  },
  {
    fromDate: '01-2020',
    toDate: '08-2022',
    company: 'Zoho Corporation',
    companyUrl: 'https://zoho.com',
    designation: 'Member Technical Staff',
    description: ['API Development using XML for internal service teams', 'Maintained Redis Cache in Accounts for all API queries'],
  },
  {
    fromDate: '04-2018',
    toDate: '01-2020',
    company: 'Phosphene AI',
    designation: 'Full Stack Web Developer',
    description: [
      'Maintained positive work ethic and commitment to providingexcellent service',
      'Designed the API and Database design for the application',
      'Developed the back-end server using Express, NodeJS andMongoDB',
      'Deployed the application to AWS and setup the internal VPCnetworking routes and SSL certificates',
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

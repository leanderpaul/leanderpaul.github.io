/**
 * Importing npm packages
 */

/**
 * Importing user defined packages
 */

/**
 * Defining types
 */

export interface WorkExperience {
  fromDate: string;
  toDate?: string;
  company: string;
  companyUrl?: string;
  designation: string;
  description: string | string[];
}

export interface Education {
  fromDate: string;
  toDate: string;
  university: string;
  universityUrl?: string;
  degree: string;
  description: string | string[];
}

export interface Project {
  name: string;
  description: string;
  url: string;
  techStack: string[];
  githubUrl: string;
  image: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Certificate {
  name: string;
  url: string;
  issuer: string;
  issueDate: string;
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
    description: ['Completed the course with distinction'],
  },
  {
    fromDate: '2016',
    toDate: '2020',
    university: 'Anna University',
    universityUrl: 'https://www.annauniv.edu',
    degree: "Bachelor's in Information Technology",
    description: ['Lead the technical Symposium', 'Graduated with 1st Class Degree'],
  },
];

export const projects: Project[] = [];

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
  endDate?: string;
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
    startDate: 'March 2023',
    endDate: 'September 2023',
    company: 'WTV',
    companyUrl: 'https://wtvglobal.com',
    designation: 'Backend NodeJS Developer',
    description: [
      "Designed and architected the microservices that make up the application. This involved breaking down the application's functionality into smaller, manageable services that can communicate with each other via RabbitMQ, promoting scalability and maintainability.",
      'Played a key role in designing, developing, and maintaining the APIs that power the application. This encompassed creating endpoints that allowed data input and retrieval, ensuring seamless interactions between the different microservices.',
      'Enhanced the usability of the APIs by utilizing Swagger to create comprehensive documentation. This documentation detailed the API endpoints, their functionality, and request/response data structures, making it easier for the team and stakeholders to work with the APIs effectively.',
      'Ensured the reliability and functionality of the APIs by employing Jest, a widely-used JavaScript testing framework, to write unit and integration tests for our microservices. This comprehensive testing strategy helped us identify and address issues early in development, maintaining the quality of our application.',
      "Collaborated and engaged in regular communication with the frontend team to understand their requirements and ensure that the APIs were designed and implemented in a way that aligned with the user interface's needs. This collaborative approach facilitated the seamless integration of the frontend and backend components in the application.",
    ],
  },
  {
    startDate: 'January 2020',
    endDate: 'August 2022',
    company: 'Zoho',
    companyUrl: 'https://zoho.com',
    designation: 'Member Technical Staff',
    description: [
      'Maintained an application that played a critical role in the organization by overseeing Authentication and Authorization for other services. This application served as a fundamental microservice, establishing communication through REST APIs and XML data exchange, ensuring secure access to resources.',
      "Created and maintained essential APIs vital for different service teams within the organization, addressing their specific requirements and enabling seamless interaction between systems. These APIs were instrumental in facilitating data transfer and user access, contributing to the overall effectiveness of the organization's services.",
      "Managed the application's caching strategy, optimizing performance by reducing data redundancy and enhancing response times. This effort significantly improved the efficiency and responsiveness of the system, resulting in a smoother user experience.",
      'Implemented SAML authentication within the application to bolster security and access control, safeguarding sensitive resources and data. This enhancement further solidified the robustness of the Authentication and Authorization mechanisms in place.',
      'Wrote migration scripts to execute the seamless transfer of data from one database to another, ensuring data integrity and consistency. This data migration was essential for maintaining the continuity of services during database transitions.',
      "Demonstrated a keen eye for detail by identifying and rectifying various bugs present in the application. These efforts not only improved the application's functionality but also enhanced the overall user experience, eliminating potential issues and bottlenecks.",
    ],
  },
  {
    startDate: 'April 2018',
    endDate: 'January 2020',
    company: 'Phosphene AI',
    companyUrl: 'https://www.linkedin.com/company/phosphene-ai',
    designation: 'Full Stack Web Developer',
    description: [
      "Architected and created the web application, orchestrating the various components to ensure a coherent and efficient user experience. This included designing the application's structure, identifying key functionalities, and establishing the overall flow of data and interactions.",
      "Orchestrated the creation and management of authentication and authorization systems within the backend application, as well as the development and maintenance of the essential APIs. This involved implementing secure access control, user authentication, and role-based permissions to safeguard sensitive data and resources, thereby enhancing the application's overall security.",
      "Designed the database schema, meticulously defining the structure and relationships of the tables to support the application's data requirements. These decisions were instrumental in ensuring data integrity and efficient data retrieval, improving the overall performance of the application.",
      "Developed the frontend React application to seamlessly interact with the backend, creating a cohesive user interface that facilitated a smooth and intuitive user experience. This included implementing data retrieval and display, user interactions, and dynamic content rendering to meet the application's requirements effectively.",
      'Deployed the application in the AWS (Amazon Web Services) environment, ensuring it was accessible and reliable. This deployment encompassed configuring cloud infrastructure, managing resources, and optimizing application performance to provide users with a dependable and responsive web application.',
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

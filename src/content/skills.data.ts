import { type SkillGroup } from './content.types';

export const SKILL_GROUPS: SkillGroup[] = [
  {
    name: 'Backend',
    skills: ['Java', 'Spring Boot', 'Node.js', 'TypeScript', 'Express', 'NestJS', 'Fastify', 'Bun', 'REST APIs', 'microservices'],
  },
  {
    name: 'Identity & security',
    skills: [
      'OAuth 2.0/2.1',
      'OpenID Connect',
      'SAML 2.0',
      'WebAuthn/passkeys',
      'TOTP MFA',
      'RBAC',
      'LDAP',
      'OTP/IVR/Nafath authentication',
    ],
  },
  {
    name: 'Data & messaging',
    skills: ['PostgreSQL', 'Drizzle ORM', 'Redis', 'MongoDB', 'RabbitMQ', 'AWS SQS'],
  },
  {
    name: 'Cloud & delivery',
    skills: ['AWS (EC2, S3, Lambda, SQS)', 'Docker', 'Kubernetes (k3d)', 'GitOps', 'CI/CD (GitHub Actions)'],
  },
  {
    name: 'Applied AI (personal projects)',
    skills: ['LangGraph', 'LangChain', 'pgvector', 'structured output', 'LLM evaluation', 'MCP'],
  },
  {
    name: 'Frontend',
    skills: ['React', 'Next.js', 'Vue', 'TanStack Start'],
  },
  {
    name: 'Practices',
    skills: ['system design', 'production incident analysis', 'disaster recovery', 'end-to-end testing', 'mentoring'],
  },
];

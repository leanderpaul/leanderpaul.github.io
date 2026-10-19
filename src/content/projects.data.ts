import { type CaseStudy, type FeaturedProject, type FeaturedSlug } from './content.types';
import { createLink } from './content.util';

export const FEATURED_SLUGS: FeaturedSlug[] = ['identity', 'ai-platform', 'code-atlas'];

export const AI_ASSISTED_STATEMENT = "Built solo with AI-assisted development, as the repository's overview states.";

export const SHADOW_PLATFORM_RESUME_BULLETS = [
  'Built a public TypeScript monorepo of six products (identity, notifications, AI gateway, novel authoring, reading, life tracking), each a server and web app, with servers on my own dependency-injection framework; 10,000+ automated tests (unit, integration, e2e); developed solo with AI-assisted tooling.',
  'Identity: OIDC/OAuth 2.1 provider (PKCE-only, refresh rotation with reuse detection), RBAC decision point, M2M and workload identity, SAML 2.0 IdP, passkeys, TOTP, back-channel logout, RFC 8693 delegation (single-hop).',
  'AI platform: LangGraph workflows checkpointed in PostgreSQL with idempotent retry and a generate → judge → repair loop; model calls routed through Synapse, an internal gateway with a model catalog, failover, budgets and a usage ledger.',
  'Self-hosted development environment using k3d/GitOps; production deployment planned.',
];

function createEmptyCaseStudy(): CaseStudy {
  return { context: [], role: [], architecture: { text: [] }, decisions: [], failureModes: [], results: [], changes: [] };
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    slug: 'identity',
    title: 'Shadow Identity',
    ownership: 'personal',
    status: 'dev-only',
    summary:
      'My own OIDC/OAuth 2.1 identity provider inside Shadow Platform: PKCE-only authorization code flow, refresh-token rotation with reuse detection, an RBAC decision point, M2M and workload identity, SAML 2.0 IdP, passkeys, TOTP and back-channel logout.',
    tags: ['TypeScript', 'Bun', 'Fastify', 'PostgreSQL', 'Drizzle', 'Redis'],
    links: [
      createLink('github', 'https://github.com/shadow-library/platform/tree/main/apps/identity-server'),
      createLink('docs', 'https://github.com/shadow-library/platform/blob/main/docs/identity.md'),
    ],
    caseStudy: createEmptyCaseStudy(),
    resumeBullets: SHADOW_PLATFORM_RESUME_BULLETS,
  },
  {
    slug: 'ai-platform',
    title: 'AI platform: Novel Forge and Synapse',
    ownership: 'personal',
    status: 'dev-only',
    summary:
      'An AI novel-authoring app built on checkpointed LangGraph workflows with a generate → judge → repair loop, calling models through Synapse, my internal AI gateway with a model catalog, failover, budgets and a usage ledger.',
    tags: ['TypeScript', 'LangGraph', 'LangChain', 'PostgreSQL', 'pgvector'],
    links: [
      createLink('docs', 'https://github.com/shadow-library/platform/blob/main/docs/novel-forge/novel-forge.md', 'Novel Forge docs'),
      createLink('docs', 'https://github.com/shadow-library/platform/blob/main/docs/synapse.md', 'Synapse docs'),
      createLink('github', 'https://github.com/shadow-library/platform/tree/main/apps/novel-forge-server'),
    ],
    caseStudy: createEmptyCaseStudy(),
  },
  {
    slug: 'code-atlas',
    title: 'Code Atlas',
    ownership: 'personal',
    status: 'dev-only',
    summary:
      'A Rust code knowledge graph for coding agents, served over a CLI and an MCP server, with an A/B evaluation harness. Its own evaluation found no benefit on 11 tasks, and the results and threats to validity are published.',
    tags: ['Rust', 'Tree-sitter', 'SQLite', 'MCP'],
    links: [
      createLink('github', 'https://github.com/shadow-library/code-atlas'),
      createLink('docs', 'https://github.com/shadow-library/code-atlas/blob/main/docs/evaluation/results.md', 'Evaluation results'),
    ],
    caseStudy: createEmptyCaseStudy(),
  },
];

export function isFeaturedSlug(value: unknown): value is FeaturedSlug {
  return typeof value === 'string' && (FEATURED_SLUGS as string[]).includes(value);
}

export function findFeaturedProject(slug: string): FeaturedProject | undefined {
  return FEATURED_PROJECTS.find(project => project.slug === slug);
}

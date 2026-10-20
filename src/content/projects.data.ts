import { type CaseStudy, type CaseStudyDiagram, type FeaturedProject, type FeaturedSlug } from './content.types';
import { createLink } from './content.util';

export const FEATURED_SLUGS: FeaturedSlug[] = ['identity', 'ai-platform', 'code-atlas'];

export const AI_ASSISTED_STATEMENT = "Built solo with AI-assisted development, as the repository's overview states.";

export const SHADOW_PLATFORM_RESUME_BULLETS = [
  'Built an OIDC/OAuth 2.1 identity provider with PKCE, refresh-token rotation and reuse detection, RBAC, SAML 2.0, passkeys and TOTP.',
  'Implemented token-family and session revocation on refresh-token reuse, plus back-channel logout through a database outbox with retries and dead-lettering.',
  'AI: LangGraph workflows with a judge-and-repair loop, calling models through Synapse, my AI gateway with failover and budgets.',
  'Built solo with AI-assisted tooling; 10,000+ automated tests across unit, integration and end-to-end suites.',
];

const SELF_HOSTED_RUNTIME = 'runs in my self-hosted development environment · not deployed to production';

const PLATFORM_DIAGRAM_TEXT = [
  'every server but identity ──auth SDK──> identity   (login, PDP checks, M2M tokens; identity registers every app)',
  'identity, memoir ──M2M──> pulse                    (notifications sink)',
  'novel-forge, memoir ──M2M──> synapse                (AI inference and model catalog)',
  'novel-forge ──M2M, one-way──> web-novel            (publish)',
  'identity ──svc://novel-forge-server/internal/bots/*──> novel-forge   (bot ownership; the only app that opts in today)',
].join('\n');

const PLATFORM_DIAGRAM_SOURCE = createLink(
  'docs',
  'https://github.com/shadow-library/platform/blob/main/docs/architecture.md',
  'docs/architecture.md',
);

function createPlatformDiagram(caption: string): CaseStudyDiagram {
  return { kind: 'platform-services', text: PLATFORM_DIAGRAM_TEXT, caption, source: PLATFORM_DIAGRAM_SOURCE };
}

const IDENTITY_CASE_STUDY: CaseStudy = {
  runtime: SELF_HOSTED_RUNTIME,
  context: [
    'Shadow Platform is my public TypeScript monorepo of six products, each a server and a web app. Identity is the only place authentication and authorization live; the other apps sign in through it and never store credentials.',
    'The `identity-server` code starts in November 2025. It follows Shadow Accounts, an identity service I started in May 2023 and rewrote that November.',
  ],
  role: [
    AI_ASSISTED_STATEMENT,
    "Scope: `identity-server` (the JSON API and a worker), `identity-web` (login, account portal and admin console) and the auth SDK the other servers use to enforce Identity's decisions.",
  ],
  architecture: {
    text: [
      'The server runs on Bun and Fastify over my own dependency-injection framework, with PostgreSQL through Drizzle as the source of truth. Redis holds only short-lived flows, rate limits, caches and counters.',
      "The browser holds an opaque session cookie, hashed at rest. A first-party app's backend exchanges the single-use authorization code, with its own M2M token, for an app-session handle on the app's own domain.",
      "Tokens are signed with Ed25519 keys (EdDSA) and carry no roles. Consuming services verify them offline against JWKS and ask the RBAC policy decision point, which permits an action only when one of the principal's roles grants it.",
      'Services get `client_credentials` tokens for one audience, authenticating with a client secret, a private key, or workload-identity assertions in-cluster, and a service call is denied unless an admin-managed rule allows it. Identity is also a SAML 2.0 IdP with pairwise persistent NameIDs, and supports passkeys, email OTP and TOTP.',
    ],
    diagram: createPlatformDiagram("How the platform's services depend on Identity"),
  },
  decisions: [
    {
      decision: 'Authorization code with PKCE (S256) and exact redirect-URI matching for every client',
      rejected: 'Implicit flow, password grant (ROPC), wildcard redirect URIs and dynamic client registration',
      why: 'The server targets OAuth 2.1, which removes both grants. Every client is created with PKCE required, and authorize refuses a request without an S256 challenge.',
    },
    {
      decision: 'First-party apps hold an app-session handle instead of refresh tokens',
      rejected: 'Refresh-token-based first-party sessions, which the docs list as a non-goal',
      why: "Every mint and refresh re-checks the central session, app access and scope entitlements, and the handle is useless without the app's own M2M credential.",
    },
    {
      decision: 'Roles and permissions stay out of tokens; consumers ask the PDP',
      rejected: 'Roles or permissions as token claims',
      why: "Identity decides and consumers enforce. Each PDP answer carries an authorization version kept in Redis; a grant change bumps it, and consumers drop that principal's cached decisions.",
    },
    {
      decision: 'RFC 8693 token exchange is single-hop',
      rejected: '`actor_token` and delegation chains',
      why: "The exchanged token keeps `sub`, `org` and `sid`, adds `act`, has no `aal`, never outlives the subject token and holds only the caller's own grants. An `actor_token`, or a subject token that already has `act`, is refused.",
    },
    {
      decision: 'SAML AuthnRequest signatures are not verified',
      rejected: 'Verifying AuthnRequest signatures',
      why: 'Security-relevant destinations come only from the registered service-provider configuration, never from the request.',
    },
    {
      decision: 'Back-channel logout goes through a database outbox, and the logout token is minted at delivery time',
      rejected: 'Minting the logout token when the logout is queued',
      why: 'Retries back off for 2, 4, 8 and then 16 minutes, and a logout token lives two minutes, so a token minted at sign-out could expire before a retry delivers it.',
    },
  ],
  failureModes: [
    'Refresh-token reuse revokes the whole token family, terminates the session and writes an audit event. A concurrent duplicate from the same client inside a short grace window is refused without revoking anything.',
    'Logout delivery is retried with exponential backoff and dead-lettered after five attempts, or at once when the SSRF guard refuses the target. Redirects are never followed.',
    'PDP unreachable: in the SDK, a transport failure or malformed response is a DENY unless the caller opted into fail-open.',
    'Revocation is bounded, not instant: access tokens, the PDP decision cache, service-access rules and JWKS each lag. Marking a route `highRisk` shortens only the PDP cache.',
  ],
  results: [
    'There are no usage, load or latency figures: Identity runs only in my development environment.',
    'Verification is by automated specs: unit specs, plus Playwright end-to-end specs for OIDC discovery, JWKS, PKCE, refresh rotation, M2M, the PDP, SAML, WebAuthn, MFA, back-channel logout and token exchange.',
    'I run the Playwright suite by hand against my local k3d cluster; CI only lints and type-checks it. Some back-channel logout specs skip, depending on cluster configuration.',
  ],
  changes: [
    "Add RP-initiated logout. Today the SDK's `endSessionUrl` does nothing against this IdP.",
    'Add SAML single logout. SAML covers SP-initiated SSO only, through the HTTP-Redirect binding only, and has no logout.',
    'Run the OpenID conformance suite. I have not run it against this server.',
    'Wire up signing-key rotation. `KeyService` can rotate keys, but nothing calls it, so there is no automated or admin rotation path.',
  ],
};

const AI_PLATFORM_CASE_STUDY: CaseStudy = {
  runtime: SELF_HOSTED_RUNTIME,
  context: [
    'Novel Forge is an authoring workbench for long serialized web novels, built around one chat. The chat designs the Story Bible with the author, plans each chapter just before it is written, has AI draft it or lets the author write it, then reviews it and finalizes it into canon.',
    "Synapse is the platform's internal AI service. By default every model call goes through it; Novel Forge keeps a legacy direct path behind a config switch. It is a recent component, first committed on 16 October 2026; Novel Forge dates from 3 July 2026.",
  ],
  role: [
    AI_ASSISTED_STATEMENT,
    'Scope: the AI module of `novel-forge-server` (LangGraph workflows, model router, retrieval) and `synapse-server` (model catalog, routing, budgets, usage ledger and provider credentials).',
  ],
  architecture: {
    text: [
      'A job runs through `WorkflowRunService`, which uses the run id as the LangGraph thread id and checkpoints to PostgreSQL with `PostgresSaver`. Nodes call models only through `ModelRouterService`.',
      'Of the four graphs (bible builder, chapter generation, chapter finalization, novel validation), only chapter generation branches: assemble context, draft, persist, run deterministic checks, judge, then accept, wait for review or repair.',
      'Repair closes a generate → judge → repair loop. A fix prompt returns patches or a rewrite; patches apply only when each target text occurs exactly once, otherwise the node rewrites the chapter. After three repair attempts by default, or sooner when the same findings repeat, the draft is accepted with its findings kept.',
      'Structured output goes through a repair ladder: parse into class-schema classes, re-ask with the validation issues, extract JSON from either reply, keep an advisory-only first reply, else fail. Raw output is stored before parsing.',
      'Retrieval is vector-only, over two pgvector indexes for prose and lore. Context is token-budgeted with tiktoken and split into a cacheable stable segment and a volatile one, and every model call records its tokens, latency, cost and prompt version.',
      'In Synapse, an app names a task such as `novel-forge.writing`. The route matching the most selectors picks the model, budgets are admitted, and deployments are tried in order, with failover only before the first byte. Request ids are claimed in the ledger before dispatch, and provider keys are sealed and bound to one origin.',
    ],
    diagram: createPlatformDiagram('How Novel Forge and the other services reach Synapse and Identity'),
  },
  decisions: [
    {
      decision: 'Graphs always run to a terminal state',
      rejected: 'Graph interrupts that pause a run for human review, which the docs list as a non-goal',
      why: 'A chapter that needs the author ends its run in the `awaitReview` node. Anything the author sees lives in domain tables, never only in a checkpoint.',
    },
    {
      decision: 'Model calls go through Synapse (the default backend)',
      rejected: 'Provider keys and SDKs in each app',
      why: 'Apps address tasks and aliases, never vendor model slugs, so retargeting an alias to a newer model needs no app change. Routing, budgets and the usage ledger live in one place.',
    },
    {
      decision: 'Budgets count list price',
      rejected: 'Counting what the provider billed',
      why: 'Budgets are guardrails, not invoices. Counting list price means a call on a zero-cost provider still spends budget.',
    },
    {
      decision: 'Synapse never stores prompt or completion text',
      rejected: 'Prompt storage, prompt templates or a completion cache, all listed as non-goals',
      why: 'The ledger holds identifiers, tokens, cost, timing and outcome, and logs carry no message content.',
    },
  ],
  failureModes: [
    'Retries: a retried job reuses its run id, but each runner calls `graph.invoke` with fresh input, so the run restarts from the beginning of the graph. It relies on idempotent nodes: stages that skip work already done, a lease on finalization, and upserts. The drafting node has no skip check, so drafting calls the model again.',
    'A failed or unparseable judge result sends the draft to human review, never to acceptance.',
    'A job that lost its authoring claim can still land the chapter it was writing, then stops and never settles as done.',
    'A failed embedding, including a budget refusal, leaves the text unembedded until the next backfill. When every Synapse deployment fails, the call ends with `SYN_PROVIDERS_EXHAUSTED`.',
  ],
  results: [
    'I have no measured quality, cost or latency results to report: Novel Forge and Synapse run only in my development environment.',
    'The per-call data for those measurements is recorded, and the AI features have manual test recipes in `docs/novel-forge/ai-testing.md`.',
  ],
  changes: [
    'Add a skip check to the drafting node, so a retried run does not call the model again, and correct the `createRun` comment that says a retry resumes from the last completed node.',
    'Apply repair patches with a replacer function. `String.replace` with a string replacement still expands special patterns such as `$&` and `$$` in the patch text.',
    "Synapse is a recent component. Once it has run as the only backend for a while, remove Novel Forge's legacy direct path to providers.",
    'Replace the lexical secret-disclosure check. A paraphrase of a secret in other words passes it today.',
  ],
};

const CODE_ATLAS_RESULTS = createLink(
  'docs',
  'https://github.com/shadow-library/code-atlas/blob/main/docs/evaluation/results.md',
  'Evaluation results',
);

const CODE_ATLAS_CASE_STUDY: CaseStudy = {
  runtime: 'CLI and MCP server, run locally',
  context: [
    'Code Atlas indexes a group of Rust and TypeScript/JavaScript repositories into one SQLite knowledge graph and serves it to coding agents over a CLI (`catl`) and an MCP stdio server. It answers questions such as “what breaks if I change this” and “which repos call this endpoint”.',
    'Its history runs from 4 to 15 October 2026, and it includes an A/B harness that runs the same coding tasks through an agent with and without Code Atlas.',
    'A separate, earlier Python prototype lives at github.com/leanderpaul/code-atlas (Python, FastAPI, LanceDB, SQLite FTS5, Tree-sitter, Ollama). This page does not describe it.',
  ],
  role: [
    'Scope: the Tree-sitter analyzers for Rust and TS/JS, the SQLite graph, the `catl` CLI, the MCP server, and the quality, performance and agent A/B evaluations.',
  ],
  architecture: {
    text: [
      'Analyzers extract symbols, calls, references, imports, HTTP endpoints and their cross-repo clients, auth schemes, env and config reads, and tests. Every fact carries exactly one certainty class and its evidence (file, span, content hash, producer), and inexact facts are hedged, for example `[heuristic 0.72]`.',
      'Each query runs a freshness barrier first, so an answer reflects the working tree at the time of the call; when the index cannot catch up, the answer says `DEGRADED`.',
      'Exact references and renames run through rust-analyzer and typescript-language-server and are never stored. LLM use is optional, off by default, and only produces facts tagged `inferred`.',
    ],
  },
  decisions: [
    {
      decision: 'Refresh the index inside every query',
      rejected: 'A separate reindex step',
      why: 'An answer then reflects the working tree at the time of the call. The barrier costs 6 ms (p50) when nothing changed.',
    },
    {
      decision: 'Build the bundled SQLite without its memory-management option',
      rejected: 'The default bundled SQLite build',
      why: 'The default uses one process-wide page cache behind a global mutex, so concurrent queries serialise. Losing the flag costs throughput, never correctness.',
    },
    {
      decision: 'Drop lexical reuse suggestions from task prompts',
      rejected: "Matching the task prompt's prose against code to propose reuse candidates",
      why: 'On a reviewer-owned held-out set, loose matching ran at about 5% precision and fired on why and bug prompts; tight matching added no true hits.',
    },
  ],
  failureModes: [
    'With a watcher active, the barrier may skip the scan, so an undelivered filesystem event can leave an answer stale for up to the 60 s full-scan interval.',
    'Absence is never certain. Reference recall against the compiler is 45.5%, so “no reference found” is weak evidence.',
    "Language servers start on first use, 20 to 65 s cold for rust-analyzer. When a server's view is incomplete, the answer is marked `PARTIAL`.",
  ],
  results: [
    'Measured 2026-10-04 to 2026-10-06.',
    "Knowledge quality: on hand-written fixtures, 184/184 expected entities and 98/98 expected edges, with none of 63 forbidden edges. Against the compiler (SCIP), `resolved` edges are 97.6% precise over confirmable edges but reproduce only 53.3% of the compiler's edges.",
    'Performance: this repository (116k LOC) indexes cold in about 1.1 s. Under concurrent edits at 1M synthetic LOC, it manages 8 to 26 queries per second, with p95 up to 974 ms. These runs were on a loaded desktop machine.',
    'Agent A/B, primary batch: 11 tasks × 2 conditions × 2 runs. All 44 runs passed their hidden tests, so correctness was at ceiling. The agent made 2 Code Atlas calls across the 22 sessions that had the tools, and tokens rose 18.7%, almost all of it about 6,300 prompt tokens per request for the tool definitions (measured on the earlier 16-tool server).',
    'Exploratory second batch, with a directive preamble: 21 of 22 sessions called `atlas_context` and read 23% fewer bytes, but tokens rose 24.8% and correctness did not change.',
    'Conclusion, quoted from the results: “On these 11 tasks, however, there is no evidence that Code Atlas helps a coding agent.”',
  ],
  resultsSource: CODE_ATLAS_RESULTS,
  validityThreats: [
    'Sample size: 2 runs per task and condition, and no significance test.',
    'Ceiling: every run passed in both batches, so the main outcome cannot separate the conditions.',
    'Task authorship: tasks, ground truth and hidden tests were written by the same developers and tooling that built Code Atlas.',
    'Judge: the judge is the same model family as the agent.',
    "Post-hoc design: the second batch's preamble was chosen after seeing the first.",
  ],
  changes: [
    'Add CI and a LICENSE file. `Cargo.toml` declares MIT, but the repository has neither.',
    'Evaluate on larger task sets written independently of Code Atlas, including tasks where baseline agents fail, with more runs per cell.',
    'Cut the fixed cost of offering the tools by exposing fewer of them or shortening their descriptions. That cost is larger than any read savings so far.',
    'Use a judge from another model family.',
  ],
};

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    slug: 'identity',
    title: 'Shadow Identity',
    ownership: 'personal',
    status: 'dev-only',
    summary:
      'My own OIDC/OAuth 2.1 identity provider. Every client uses PKCE, a reused refresh token revokes the whole token family and the session, and back-channel logout goes through a database outbox with retries, so a relying party that is briefly down still receives it.',
    tags: ['TypeScript', 'Bun', 'Fastify', 'PostgreSQL', 'Drizzle', 'Redis'],
    links: [
      createLink('github', 'https://github.com/shadow-library/platform/tree/main/apps/identity-server'),
      createLink('docs', 'https://github.com/shadow-library/platform/blob/main/docs/identity.md'),
    ],
    caseStudy: IDENTITY_CASE_STUDY,
    resumeBullets: SHADOW_PLATFORM_RESUME_BULLETS,
  },
  {
    slug: 'ai-platform',
    title: 'AI platform: Novel Forge and Synapse',
    ownership: 'personal',
    status: 'dev-only',
    summary:
      'Novel-authoring workflows in LangGraph, checkpointed in PostgreSQL. A judge model reviews each draft and a repair step patches it only where the target text occurs exactly once; model calls go through Synapse, my AI gateway with failover and budgets.',
    tags: ['TypeScript', 'LangGraph', 'LangChain', 'PostgreSQL', 'pgvector'],
    links: [
      createLink('docs', 'https://github.com/shadow-library/platform/blob/main/docs/novel-forge/novel-forge.md', 'Novel Forge docs'),
      createLink('docs', 'https://github.com/shadow-library/platform/blob/main/docs/synapse.md', 'Synapse docs'),
      createLink('github', 'https://github.com/shadow-library/platform/tree/main/apps/novel-forge-server'),
    ],
    caseStudy: AI_PLATFORM_CASE_STUDY,
  },
  {
    slug: 'code-atlas',
    title: 'Code Atlas',
    ownership: 'personal',
    status: 'dev-only',
    summary:
      'A Rust code knowledge graph served to coding agents over a CLI and an MCP server. Its A/B evaluation on 11 tasks found no measurable benefit, and the results and threats to validity are published.',
    tags: ['Rust', 'Tree-sitter', 'SQLite', 'MCP'],
    links: [createLink('github', 'https://github.com/shadow-library/code-atlas'), CODE_ATLAS_RESULTS],
    caseStudy: CODE_ATLAS_CASE_STUDY,
  },
];

export function isFeaturedSlug(value: unknown): value is FeaturedSlug {
  return typeof value === 'string' && (FEATURED_SLUGS as string[]).includes(value);
}

export function findFeaturedProject(slug: string): FeaturedProject | undefined {
  return FEATURED_PROJECTS.find(project => project.slug === slug);
}

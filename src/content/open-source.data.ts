import { type OpenSourcePackage } from './content.types';
import { createLink } from './content.util';

export const OPEN_SOURCE_TITLE = 'Shadow Library';

export const OPEN_SOURCE_INTRO =
  'TypeScript libraries I published to npm under the MIT licence. Their standalone repositories are archived and the code now lives in the Shadow Platform monorepo.';

export const OPEN_SOURCE_PACKAGES: OpenSourcePackage[] = [
  {
    name: '@shadow-library/app',
    purpose:
      'Dependency-injection framework for Node.js and Bun applications (HTTP servers, CLIs, workers), with modules and lifecycle hooks.',
    links: [
      createLink('npm', 'https://www.npmjs.com/package/@shadow-library/app'),
      createLink('github', 'https://github.com/shadow-library/platform/tree/main/packages/app'),
    ],
  },
  {
    name: '@shadow-library/common',
    purpose: 'Shared utilities: configuration, logging, errors, caching and task helpers.',
    links: [
      createLink('npm', 'https://www.npmjs.com/package/@shadow-library/common'),
      createLink('github', 'https://github.com/shadow-library/platform/tree/main/packages/common'),
    ],
  },
  {
    name: '@shadow-library/class-schema',
    purpose: 'Decorator-based JSON Schema generation from TypeScript classes.',
    links: [
      createLink('npm', 'https://www.npmjs.com/package/@shadow-library/class-schema'),
      createLink('github', 'https://github.com/shadow-library/platform/tree/main/packages/class-schema'),
    ],
  },
  {
    name: '@shadow-library/fastify',
    purpose: 'Decorator-based routing, validation and response serialization on top of Fastify.',
    links: [
      createLink('npm', 'https://www.npmjs.com/package/@shadow-library/fastify'),
      createLink('github', 'https://github.com/shadow-library/platform/tree/main/packages/fastify'),
    ],
  },
  {
    name: '@shadow-library/modules',
    purpose: 'Reusable application modules: HTTP core, database, cache, storage and bootstrap.',
    links: [
      createLink('npm', 'https://www.npmjs.com/package/@shadow-library/modules'),
      createLink('github', 'https://github.com/shadow-library/platform/tree/main/packages/modules'),
    ],
  },
];

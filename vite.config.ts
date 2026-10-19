import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig, type Plugin } from 'vite';

import { type RouteMeta } from './src/content/content.types';
import { SITE_META } from './src/content/profile.data';
import { ROUTE_META } from './src/content/route-meta.data';

const TEMPLATE_FILE_NAME = 'index.html';

class RouteHtmlError extends Error {
  override name = 'RouteHtmlError';
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function replaceOnce(html: string, pattern: RegExp, replacement: string, label: string): string {
  const matches = html.match(new RegExp(pattern.source, 'g')) ?? [];
  if (matches.length !== 1) throw new RouteHtmlError(`Expected exactly one ${label} in ${TEMPLATE_FILE_NAME}, found ${matches.length}`);
  return html.replace(pattern, () => replacement);
}

function insertBeforeHeadEnd(html: string, tag: string): string {
  return replaceOnce(html, /<\/head>/, `  ${tag}\n  </head>`, '</head>');
}

function metaPattern(attribute: 'name' | 'property', key: string): RegExp {
  return new RegExp(`<meta\\b[^>]*\\b${attribute}="${key}"[^>]*>`);
}

function toAbsoluteUrl(path: string): string {
  return new URL(path, SITE_META.url).href;
}

function renderRouteHtml(template: string, meta: RouteMeta): string {
  const url = escapeHtml(toAbsoluteUrl(meta.path));
  const title = escapeHtml(meta.title);
  let html = template;
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`, '<title>');
  html = replaceOnce(html, metaPattern('property', 'og:title'), `<meta property="og:title" content="${title}" />`, 'og:title');
  html = replaceOnce(html, metaPattern('property', 'og:url'), `<meta property="og:url" content="${url}" />`, 'og:url');
  if (meta.robots === 'noindex') return insertBeforeHeadEnd(html, '<meta name="robots" content="noindex" />');

  const description = escapeHtml(meta.description);
  html = replaceOnce(html, metaPattern('name', 'description'), `<meta name="description" content="${description}" />`, 'description');
  html = replaceOnce(
    html,
    metaPattern('property', 'og:description'),
    `<meta property="og:description" content="${description}" />`,
    'og:description',
  );
  return insertBeforeHeadEnd(html, `<link rel="canonical" href="${url}" />`);
}

function toOutputFileName(path: string): string {
  return path === '/' ? TEMPLATE_FILE_NAME : `${path.slice(1)}.html`;
}

function routeHtmlPlugin(routes: RouteMeta[]): Plugin {
  return {
    name: 'portfolio:route-html',
    apply: 'build',
    async writeBundle(options, bundle) {
      const asset = bundle[TEMPLATE_FILE_NAME];
      if (asset?.type !== 'asset') throw new RouteHtmlError(`${TEMPLATE_FILE_NAME} is missing from the bundle`);
      if (!options.dir) throw new RouteHtmlError('The build output directory is not set');

      const outputDir = options.dir;
      const template = typeof asset.source === 'string' ? asset.source : new TextDecoder().decode(asset.source);
      const writes = routes.map(async meta => {
        const filePath = join(outputDir, toOutputFileName(meta.path));
        await mkdir(dirname(filePath), { recursive: true });
        await writeFile(filePath, renderRouteHtml(template, meta));
      });
      await Promise.all(writes);
    },
  };
}

export default defineConfig({
  plugins: [vue(), vueJsx(), routeHtmlPlugin(ROUTE_META)],
  server: { port: 3000 },
  resolve: {
    alias: {
      '@app': '/src',
    },
  },
});

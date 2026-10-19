import { mkdir, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { chromium, type Browser, type Page } from 'playwright-core';
import { build, preview, type PreviewServer } from 'vite';

type ResumeVariant = 'ae' | 'in' | 'global';
type XrefKind = 'table' | 'stream';
type PhoneInjectionResult = 'ok' | 'missing-placeholder' | 'placeholder-not-empty' | 'separator-mismatch';

interface ResumeContact {
  phone: string;
  tel: string;
}

interface RenderedResume {
  variant: ResumeVariant;
  pdf: Buffer;
}

interface AuditHtml {
  html: string;
  keptRules: number;
  totalRules: number;
}

interface PdfDictionary {
  entries: Map<string, string>;
  end: number;
}

interface PreviousRevision {
  kind: XrefKind;
  startXref: number;
  trailer: Map<string, string>;
}

const ROOT_DIR = resolve(import.meta.dirname, '..');
const BUILD_DIR = join(ROOT_DIR, '.tmp', 'resume-dist');
const AUDIT_DIR = join(ROOT_DIR, '.tmp', 'resume');
const OUTPUT_DIR = join(ROOT_DIR, 'public', 'resumes');
const CONTACT_FILE = join(ROOT_DIR, '.local', 'resume-contact.json');

const PREVIEW_HOST = '127.0.0.1';
const PREVIEW_PORT = 4174;
const PHONE_SELECTOR = '[data-contact="phone"]';
const CONTACT_SEPARATOR = ' · ';
const PDF_TITLE = 'Leander Paul — Résumé';
const PDF_AUTHOR = 'Leander Paul';
const MAX_PAGES = 2;

const RESUME_OUTPUTS: Record<ResumeVariant, string> = {
  ae: 'Resume-AE.pdf',
  in: 'Resume-IN.pdf',
  global: 'Resume-Global.pdf',
};
const RESUME_VARIANTS = Object.keys(RESUME_OUTPUTS) as ResumeVariant[];

const DISPLAY_PHONE_PATTERN = /^\+?[\d ()-]{7,24}$/;
const E164_PATTERN = /^\+[1-9]\d{6,14}$/;

const PDF_WHITESPACE = new Set(['\0', '\t', '\n', '\f', '\r', ' ']);
const PDF_DELIMITERS = new Set(['(', ')', '<', '>', '[', ']', '{', '}', '/', '%']);
const XREF_STREAM_WIDTHS = '[1 4 2]';

class ResumeBuildError extends Error {
  override name = 'ResumeBuildError';
}

function log(message: string, meta: Record<string, unknown> = {}): void {
  process.stdout.write(`${JSON.stringify({ message, ...meta })}\n`);
}

function describeError(error: unknown): string {
  if (!(error instanceof Error)) return String(error);
  const cause = error.cause instanceof Error ? ` (cause: ${error.cause.message.split('\n')[0]})` : '';
  return `${error.name}: ${error.message}${cause}`;
}

function isErrnoException(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && 'code' in error;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

async function readContact(): Promise<ResumeContact> {
  const displayPath = relative(ROOT_DIR, CONTACT_FILE);
  let raw: string;
  try {
    raw = await readFile(CONTACT_FILE, 'utf8');
  } catch (error) {
    if (isErrnoException(error) && error.code === 'ENOENT') {
      throw new ResumeBuildError(`${displayPath} is missing; create it as { "phone": "<display>", "tel": "<E.164, e.g. +971…>" }`);
    }
    throw new ResumeBuildError(`${displayPath} could not be read (${isErrnoException(error) ? error.code : 'unknown error'})`);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new ResumeBuildError(`${displayPath} is not valid JSON`);
  }

  if (!isRecord(parsed)) throw new ResumeBuildError(`${displayPath} must contain a JSON object with "phone" and "tel"`);
  const { phone, tel } = parsed;
  if (typeof phone !== 'string' || !DISPLAY_PHONE_PATTERN.test(phone.trim())) {
    throw new ResumeBuildError(`${displayPath}: "phone" must be a display string of digits, spaces, "+", "(", ")" or "-"`);
  }
  if (typeof tel !== 'string' || !E164_PATTERN.test(tel)) throw new ResumeBuildError(`${displayPath}: "tel" must be an E.164 number such as +971…`);
  return { phone: phone.trim(), tel };
}

async function buildSite(): Promise<void> {
  await build({ root: ROOT_DIR, logLevel: 'warn', build: { outDir: BUILD_DIR, emptyOutDir: true } });
  log('Built the site', { outDir: relative(ROOT_DIR, BUILD_DIR) });
}

async function startPreview(): Promise<PreviewServer> {
  try {
    return await preview({
      root: ROOT_DIR,
      logLevel: 'warn',
      build: { outDir: BUILD_DIR },
      preview: { host: PREVIEW_HOST, port: PREVIEW_PORT, strictPort: true, open: false },
    });
  } catch (error) {
    throw new ResumeBuildError(`Could not start the preview server on port ${PREVIEW_PORT}; free the port and retry`, { cause: error });
  }
}

async function launchBrowser(): Promise<Browser> {
  try {
    return await chromium.launch();
  } catch (bundledError) {
    log('Bundled Chromium failed to launch; trying installed Chrome', { reason: describeError(bundledError).split('\n')[0] });
  }
  try {
    return await chromium.launch({ channel: 'chrome' });
  } catch (chromeError) {
    throw new ResumeBuildError('Neither the cached Playwright Chromium nor installed Google Chrome could be launched', {
      cause: chromeError,
    });
  }
}

async function waitForFonts(page: Page): Promise<void> {
  const pending = await page.evaluate(async () => {
    await new Promise<void>(done => requestAnimationFrame(() => requestAnimationFrame(() => done())));
    await document.fonts.ready;
    return [...document.fonts]
      .filter(face => face.status === 'error' || face.status === 'loading')
      .map(face => `${face.family}: ${face.status}`);
  });
  if (pending.length > 0) throw new ResumeBuildError(`Fonts did not load: ${pending.join(', ')}`);
}

async function injectPhone(page: Page, contact: ResumeContact): Promise<void> {
  const result = await page.evaluate(
    ({ phone, tel, selector, separator }): PhoneInjectionResult => {
      const placeholder = document.querySelector(selector);
      const line = placeholder?.parentElement;
      if (!placeholder || !line) return 'missing-placeholder';
      if (placeholder.childNodes.length > 0) return 'placeholder-not-empty';

      const link = document.createElement('a');
      const reference = line.querySelector('a');
      for (const attribute of reference?.attributes ?? []) if (attribute.name.startsWith('data-v-')) link.setAttribute(attribute.name, '');
      link.href = `tel:${tel}`;
      link.textContent = phone;
      placeholder.replaceChildren(link);
      placeholder.after(separator);

      const items = (line.textContent ?? '').split(separator);
      const isWellFormed =
        items.length === line.querySelectorAll('a').length && items.every(item => item.trim() !== '' && !item.includes(separator.trim()));
      return isWellFormed ? 'ok' : 'separator-mismatch';
    },
    { ...contact, selector: PHONE_SELECTOR, separator: CONTACT_SEPARATOR },
  );
  if (result !== 'ok') throw new ResumeBuildError(`Phone injection failed: ${result}`);
}

async function renderFullAuditHtml(page: Page): Promise<string> {
  return page.evaluate(async () => {
    const root = document.documentElement.cloneNode(true) as HTMLElement;
    for (const element of root.querySelectorAll('script, link[rel="modulepreload"]')) element.remove();
    for (const link of root.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')) {
      const response = await fetch(link.href);
      if (!response.ok) throw new Error(`Stylesheet ${link.href} returned ${response.status}`);
      const style = document.createElement('style');
      style.textContent = await response.text();
      link.replaceWith(style);
    }
    return `<!DOCTYPE html>\n${root.outerHTML}`;
  });
}

async function renderUsedRulesAuditHtml(page: Page): Promise<AuditHtml> {
  return page.evaluate(() => {
    const normaliseFamily = (family: string) =>
      family
        .trim()
        .replace(/^['"]|['"]$/g, '')
        .toLowerCase();
    const textFamilies = new Set<string>();
    const animationNames = new Set<string>();
    for (const element of document.querySelectorAll('*')) {
      const style = getComputedStyle(element);
      for (const name of style.animationName.split(',')) animationNames.add(name.trim());
      const hasText = [...element.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim());
      if (hasText) for (const family of style.fontFamily.split(',')) textFamilies.add(normaliseFamily(family));
    }

    const matchesElement = (selectorText: string) => {
      const originating = selectorText
        .replace(/::?(?:before|after|marker|first-line|first-letter)\b|::[\w-]+(?:\([^)]*\))?/g, '')
        .replace(/(^|,)\s*(?=,|$)/g, '$1*');
      try {
        return document.querySelector(originating) !== null;
      } catch {
        return false;
      }
    };

    let totalRules = 0;
    let keptRules = 0;
    const collect = (rules: CSSRuleList): string[] =>
      [...rules].flatMap(rule => {
        if (rule instanceof CSSStyleRule) {
          totalRules += 1;
          if (!matchesElement(rule.selectorText)) return [];
          keptRules += 1;
          return [rule.cssText];
        }
        if (rule instanceof CSSPageRule || rule instanceof CSSLayerStatementRule || rule instanceof CSSPropertyRule) return [rule.cssText];
        if (rule instanceof CSSFontFaceRule) {
          return textFamilies.has(normaliseFamily(rule.style.getPropertyValue('font-family'))) ? [rule.cssText] : [];
        }
        if (rule instanceof CSSKeyframesRule) return animationNames.has(rule.name) ? [rule.cssText] : [];
        if (rule instanceof CSSImportRule) return rule.styleSheet ? collect(rule.styleSheet.cssRules) : [];
        if (rule instanceof CSSMediaRule && !matchMedia(rule.media.mediaText).matches) return [];
        if (rule instanceof CSSSupportsRule && !CSS.supports(rule.conditionText)) return [];
        if (!(rule instanceof CSSGroupingRule)) return [];
        const children = collect(rule.cssRules);
        if (children.length === 0) return [];
        const prelude = rule.cssText.slice(0, rule.cssText.indexOf('{')).trim();
        return [`${prelude} {\n${children.join('\n')}\n}`];
      });

    const css = [...document.styleSheets].flatMap(sheet => collect(sheet.cssRules)).join('\n');
    const root = document.documentElement.cloneNode(true) as HTMLElement;
    for (const element of root.querySelectorAll('script, style, link[rel="stylesheet"], link[rel="modulepreload"]')) element.remove();
    const style = document.createElement('style');
    style.textContent = css;
    root.querySelector('head')?.append(style);
    return { html: `<!DOCTYPE html>\n${root.outerHTML}`, keptRules, totalRules };
  });
}

async function writeAuditHtml(page: Page, variant: ResumeVariant): Promise<void> {
  const full = await renderFullAuditHtml(page);
  const used = await renderUsedRulesAuditHtml(page);
  await writeFile(join(AUDIT_DIR, `resume-${variant}.full.html`), full);
  await writeFile(join(AUDIT_DIR, `resume-${variant}.html`), used.html);
  log('Wrote audit HTML', { variant, keptRules: used.keptRules, totalRules: used.totalRules });
}

async function renderVariant(browser: Browser, baseUrl: string, variant: ResumeVariant, contact: ResumeContact): Promise<RenderedResume> {
  const context = await browser.newContext({ colorScheme: 'light', viewport: { width: 794, height: 1123 } });
  try {
    const page = await context.newPage();
    const pageErrors: string[] = [];
    page.on('pageerror', error => pageErrors.push(error.message));

    const url = new URL('/resume', baseUrl);
    url.searchParams.set('variant', variant);
    const response = await page.goto(url.href, { waitUntil: 'networkidle' });
    if (!response?.ok()) throw new ResumeBuildError(`${url.pathname}${url.search} returned ${response?.status() ?? 'no response'}`);

    await page.emulateMedia({ media: 'print', colorScheme: 'light' });
    await page.waitForSelector(PHONE_SELECTOR, { state: 'attached' });
    await waitForFonts(page);
    await injectPhone(page, contact);
    await page.evaluate(title => (document.title = title), PDF_TITLE);
    await writeAuditHtml(page, variant);

    const pdf = await page.pdf({
      format: 'A4',
      preferCSSPageSize: true,
      printBackground: true,
      displayHeaderFooter: false,
      tagged: true,
      outline: true,
    });
    if (pageErrors.length > 0) throw new ResumeBuildError(`The résumé page threw: ${pageErrors.join('; ')}`);

    assertPrintablePdf(pdf, variant);
    return { variant, pdf: addDocumentInfo(pdf, { Title: PDF_TITLE, Author: PDF_AUTHOR }) };
  } finally {
    await context.close();
  }
}

function assertPrintablePdf(pdf: Buffer, variant: ResumeVariant): void {
  const text = pdf.toString('latin1');
  const pages = text.match(/\/Type\s*\/Page(?![A-Za-z])/g)?.length ?? 0;
  if (pages === 0 || pages > MAX_PAGES) throw new ResumeBuildError(`${variant}: expected 1–${MAX_PAGES} pages, found ${pages}`);
  if (/\/Subtype\s*\/Type3\b/.test(text)) throw new ResumeBuildError(`${variant}: the PDF contains a Type3 font, which breaks text extraction`);
  if (!/\/FontFile2\b/.test(text)) throw new ResumeBuildError(`${variant}: no embedded TrueType font found`);
}

function isWhitespace(char: string | undefined): boolean {
  return char !== undefined && PDF_WHITESPACE.has(char);
}

function isRegularChar(char: string | undefined): boolean {
  return char !== undefined && !PDF_WHITESPACE.has(char) && !PDF_DELIMITERS.has(char);
}

function skipWhitespace(text: string, start: number): number {
  let index = start;
  while (index < text.length) {
    if (text[index] === '%') {
      while (index < text.length && text[index] !== '\n' && text[index] !== '\r') index += 1;
      continue;
    }
    if (!isWhitespace(text[index])) return index;
    index += 1;
  }
  return index;
}

function readLiteralStringEnd(text: string, start: number): number {
  let depth = 0;
  for (let index = start; index < text.length; index += 1) {
    const char = text[index];
    if (char === '\\') index += 1;
    else if (char === '(') depth += 1;
    else if (char === ')' && --depth === 0) return index + 1;
  }
  throw new ResumeBuildError('Unterminated PDF string');
}

function readValueEnd(text: string, start: number): number {
  const index = skipWhitespace(text, start);
  if (text.startsWith('<<', index)) return readDictionary(text, index).end;
  if (text[index] === '(') return readLiteralStringEnd(text, index);
  if (text[index] === '<') {
    const end = text.indexOf('>', index);
    if (end < 0) throw new ResumeBuildError('Unterminated PDF hex string');
    return end + 1;
  }
  if (text[index] === '[') {
    let cursor = skipWhitespace(text, index + 1);
    while (text[cursor] !== ']') {
      if (cursor >= text.length) throw new ResumeBuildError('Unterminated PDF array');
      cursor = skipWhitespace(text, readValueEnd(text, cursor));
    }
    return cursor + 1;
  }

  let cursor = text[index] === '/' ? index + 1 : index;
  while (isRegularChar(text[cursor])) cursor += 1;
  if (cursor === index) throw new ResumeBuildError(`Unexpected PDF token at byte ${index}`);
  return cursor;
}

function readDictionary(text: string, start: number): PdfDictionary {
  if (!text.startsWith('<<', start)) throw new ResumeBuildError(`Expected a PDF dictionary at byte ${start}`);
  const entries = new Map<string, string>();
  let cursor = skipWhitespace(text, start + 2);
  while (!text.startsWith('>>', cursor)) {
    if (text[cursor] !== '/') throw new ResumeBuildError(`Expected a PDF name at byte ${cursor}`);
    const keyEnd = readValueEnd(text, cursor);
    const valueStart = skipWhitespace(text, keyEnd);
    let valueEnd = readValueEnd(text, valueStart);
    const reference = /\s+\d+\s+R(?![^\0\t\n\f\r ()<>[\]{}/%])/y;
    reference.lastIndex = valueEnd;
    if (/^\d+$/.test(text.slice(valueStart, valueEnd)) && reference.test(text)) valueEnd = reference.lastIndex;
    entries.set(text.slice(cursor + 1, keyEnd), text.slice(valueStart, valueEnd));
    cursor = skipWhitespace(text, valueEnd);
  }
  return { entries, end: cursor + 2 };
}

function writeDictionary(entries: Map<string, string>): string {
  return `<<${[...entries].map(([key, value]) => `/${key} ${value}`).join(' ')}>>`;
}

function findStartXref(text: string): number {
  const match = /startxref\s+(\d+)\s+%%EOF\s*$/.exec(text.slice(-1024));
  if (!match?.[1]) throw new ResumeBuildError('The PDF has no trailing startxref');
  return Number(match[1]);
}

function readPreviousRevision(text: string): PreviousRevision {
  const startXref = findStartXref(text);
  if (text.startsWith('xref', startXref)) {
    const trailerAt = text.indexOf('trailer', startXref);
    if (trailerAt < 0) throw new ResumeBuildError('The classic xref table has no trailer');
    return { kind: 'table', startXref, trailer: readDictionary(text, skipWhitespace(text, trailerAt + 'trailer'.length)).entries };
  }

  const header = /\d+\s+\d+\s+obj\s*/y;
  header.lastIndex = startXref;
  if (!header.test(text)) throw new ResumeBuildError(`startxref ${startXref} points at neither an xref table nor an object`);
  const trailer = readDictionary(text, header.lastIndex).entries;
  if (trailer.get('Type') !== '/XRef') throw new ResumeBuildError('startxref points at an object that is not an xref stream');
  return { kind: 'stream', startXref, trailer };
}

function findObjectDictionary(text: string, reference: string): Map<string, string> | undefined {
  const [objectNumber, generation] = reference.split(/\s+/);
  const pattern = new RegExp(`(?:^|[\\0\\t\\n\\f\\r ])${objectNumber}\\s+${generation}\\s+obj\\s*(?=<<)`, 'g');
  const offsets = [...text.matchAll(pattern)].map(match => match.index + match[0].length);
  const latest = offsets.at(-1);
  return latest === undefined ? undefined : readDictionary(text, latest).entries;
}

function toPdfTextString(value: string): string {
  if (/^[\x20-\x7e]*$/.test(value)) return `(${value.replace(/[\\()]/g, char => `\\${char}`)})`;
  const hex = [...value].flatMap(char => {
    const code = char.codePointAt(0) ?? 0;
    if (code <= 0xffff) return [code];
    const offset = code - 0x10000;
    return [0xd800 + (offset >> 10), 0xdc00 + (offset & 0x3ff)];
  });
  return `<FEFF${hex.map(unit => unit.toString(16).padStart(4, '0').toUpperCase()).join('')}>`;
}

function requireEntry(entries: Map<string, string>, key: string): string {
  const value = entries.get(key);
  if (value === undefined) throw new ResumeBuildError(`The PDF trailer has no /${key}`);
  return value;
}

function encodeXrefStreamRow(offset: number): string {
  if (offset > 0xffffffff) throw new ResumeBuildError('The PDF is too large for a 4-byte xref offset');
  return String.fromCharCode(1, (offset >>> 24) & 0xff, (offset >>> 16) & 0xff, (offset >>> 8) & 0xff, offset & 0xff, 0, 0);
}

function addDocumentInfo(pdf: Buffer, info: Record<'Title' | 'Author', string>): Buffer {
  const text = pdf.toString('latin1');
  const previous = readPreviousRevision(text);
  if (previous.trailer.has('Encrypt')) throw new ResumeBuildError('Encrypted PDFs are not supported');

  const size = Number(requireEntry(previous.trailer, 'Size'));
  const root = requireEntry(previous.trailer, 'Root');
  const previousInfoReference = previous.trailer.get('Info');
  const infoEntries = new Map(previousInfoReference ? findObjectDictionary(text, previousInfoReference) : undefined);
  for (const [key, value] of Object.entries(info)) infoEntries.set(key, toPdfTextString(value));

  const infoNumber = size;
  let update = text.endsWith('\n') ? '' : '\n';
  const infoOffset = pdf.length + update.length;
  update += `${infoNumber} 0 obj\n${writeDictionary(infoEntries)}\nendobj\n`;
  const xrefOffset = pdf.length + update.length;

  const trailer = new Map<string, string>();
  const id = previous.trailer.get('ID');
  if (previous.kind === 'table') {
    trailer
      .set('Size', String(size + 1))
      .set('Root', root)
      .set('Info', `${infoNumber} 0 R`)
      .set('Prev', String(previous.startXref));
    if (id) trailer.set('ID', id);
    update += `xref\n${infoNumber} 1\n${String(infoOffset).padStart(10, '0')} 00000 n \ntrailer\n${writeDictionary(trailer)}\n`;
  } else {
    const xrefNumber = size + 1;
    const rows = encodeXrefStreamRow(infoOffset) + encodeXrefStreamRow(xrefOffset);
    trailer
      .set('Type', '/XRef')
      .set('Size', String(size + 2))
      .set('Index', `[${infoNumber} 2]`)
      .set('W', XREF_STREAM_WIDTHS)
      .set('Root', root)
      .set('Info', `${infoNumber} 0 R`)
      .set('Prev', String(previous.startXref));
    if (id) trailer.set('ID', id);
    trailer.set('Length', String(rows.length));
    update += `${xrefNumber} 0 obj\n${writeDictionary(trailer)}\nstream\n${rows}\nendstream\nendobj\n`;
  }
  update += `startxref\n${xrefOffset}\n%%EOF\n`;

  const updated = Buffer.concat([pdf, Buffer.from(update, 'latin1')]);
  assertIncrementalUpdate(updated, previous, infoNumber, infoOffset);
  return updated;
}

function assertIncrementalUpdate(pdf: Buffer, previous: PreviousRevision, infoNumber: number, infoOffset: number): void {
  const text = pdf.toString('latin1');
  const current = readPreviousRevision(text);
  if (current.kind !== previous.kind) throw new ResumeBuildError('The incremental update changed the xref kind');
  if (current.trailer.get('Prev') !== String(previous.startXref)) throw new ResumeBuildError('The incremental update lost /Prev');
  if (current.trailer.get('Root') !== previous.trailer.get('Root')) throw new ResumeBuildError('The incremental update changed /Root');
  if (!text.startsWith(`${infoNumber} 0 obj`, infoOffset)) throw new ResumeBuildError('The new Info object is not at its xref offset');
}

async function writeOutputs(resumes: RenderedResume[]): Promise<void> {
  await mkdir(OUTPUT_DIR, { recursive: true });
  for (const { variant, pdf } of resumes) {
    const target = join(OUTPUT_DIR, RESUME_OUTPUTS[variant]);
    const staging = `${target}.partial`;
    try {
      await writeFile(staging, pdf);
      await rename(staging, target);
    } catch (error) {
      await unlink(staging).catch(() => undefined);
      throw error;
    }
    log('Wrote résumé PDF', { variant, file: relative(ROOT_DIR, target), bytes: pdf.length });
  }
}

async function main(): Promise<void> {
  const contact = await readContact();
  await mkdir(AUDIT_DIR, { recursive: true });
  await buildSite();

  const server = await startPreview();
  let browser: Browser | undefined;
  try {
    browser = await launchBrowser();
    const baseUrl = `http://${PREVIEW_HOST}:${PREVIEW_PORT}`;
    const resumes: RenderedResume[] = [];
    for (const variant of RESUME_VARIANTS) resumes.push(await renderVariant(browser, baseUrl, variant, contact));
    await writeOutputs(resumes);
  } finally {
    await Promise.allSettled([browser?.close(), server.close()]);
  }
}

main().catch((error: unknown) => {
  process.stderr.write(`${describeError(error)}\n`);
  process.exitCode = 1;
});

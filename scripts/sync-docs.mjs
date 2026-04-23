#!/usr/bin/env node
/**
 * sync-docs.mjs
 * Reads every component .astro file, extracts its Props interface,
 * parses tokens.scss for foundations, and regenerates the CLAUDE REFERENCE
 * block inside src/pages/components.astro.
 *
 * Usage:  node scripts/sync-docs.mjs
 *         npm run sync-docs
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');

const COMPONENTS_PAGE = join(ROOT, 'src/pages/components.astro');
const TOKENS_FILE     = join(ROOT, 'src/styles/tokens.scss');

const BLOCK_START = '// CLAUDE REFERENCE';
const BLOCK_END   = '// END CLAUDE REFERENCE';

// Components excluded from the reference (layout/internal, not content-facing)
const SKIP = new Set([
  'AgentationToolbar', 'BackButton', 'CollectionIndex',
  'Header', 'PasswordGate', 'ProjectModal', 'Section',
]);

// ── File discovery ─────────────────────────────────────────────────────────────

function getComponents(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isFile() && e.name.endsWith('.astro'))
    .map(e => ({ name: basename(e.name, '.astro'), path: join(dir, e.name) }))
    .filter(c => !SKIP.has(c.name))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// ── Interface parser ───────────────────────────────────────────────────────────

function extractInterfaceBody(content) {
  const start = content.indexOf('interface Props {');
  if (start === -1) return null;
  let depth = 0;
  let i = content.indexOf('{', start);
  const bodyStart = i + 1;
  while (i < content.length) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') { depth--; if (depth === 0) return content.slice(bodyStart, i); }
    i++;
  }
  return null;
}

function parseProps(body) {
  if (!body) return [];
  const props = [];
  let doc = '';
  for (const line of body.split('\n')) {
    const t = line.trim();
    if (!t) continue;
    if (t.startsWith('/**') || t.startsWith('*/')) { doc = ''; continue; }
    if (t.startsWith('*')) { const d = t.replace(/^\*\s*/, '').trim(); if (d && !d.startsWith('@')) doc = d; continue; }
    if (t.startsWith('//')) { doc = t.replace(/^\/\/\s*/, '').trim(); continue; }
    const m = t.match(/^(\w+)(\?)?\s*:\s*(.+?);?\s*$/);
    if (m) { props.push({ name: m[1], optional: !!m[2], type: m[3].trim(), doc }); doc = ''; }
  }
  return props;
}

function formatProp({ name, optional, type }) {
  const opt = optional ? '?' : '';
  if (type === 'boolean') return `${name}${opt}`;
  // String literal union → show options
  if (/^'[^']*'(\s*\|\s*'[^']*')+$/.test(type)) {
    const opts = type.split('|').map(s => s.trim().replace(/'/g, '')).join('|');
    return `${name}${opt}(${opts})`;
  }
  // Complex object/array — simplify
  if (type.startsWith('{') || type.includes('[]')) return `${name}${opt}`;
  return `${name}${opt}`;
}

function renderComponent({ name, path }) {
  const content = readFileSync(path, 'utf-8');
  const body = extractInterfaceBody(content);
  const props = parseProps(body);
  const label = `// ${name}`.padEnd(22);
  if (!props.length) return `// ${name}`;
  const formatted = props.map(formatProp).join(', ');
  const full = `${label}${formatted}`;
  if (full.length <= 100) return full;
  // Wrap long lines
  const indent = '//'.padEnd(22);
  const parts = formatted.split(', ');
  const lines = [];
  let cur = label;
  for (const p of parts) {
    const next = cur === label ? `${cur}${p}` : `${cur}, ${p}`;
    if (next.length > 100 && cur !== label) { lines.push(cur); cur = `${indent}${p}`; }
    else cur = next;
  }
  lines.push(cur);
  return lines.join('\n');
}

// ── Tokens parser ──────────────────────────────────────────────────────────────

function extractScale(tokens, prefix) {
  const regex = new RegExp(`--${prefix}-([a-z0-9]+)(?:-[a-z-]+)?\\s*:`, 'g');
  const seen = new Set();
  let m;
  while ((m = regex.exec(tokens)) !== null) seen.add(m[1]);
  return [...seen];
}

// ── Block builder ──────────────────────────────────────────────────────────────

function buildBlock() {
  const tokens  = existsSync(TOKENS_FILE) ? readFileSync(TOKENS_FILE, 'utf-8') : '';
  const spacing = extractScale(tokens, 'spacing');
  const titles  = extractScale(tokens, 'type-title');

  const spacingStr = spacing.length ? spacing.join(', ') : 'xxxs … max';
  const titlesStr  = titles.length  ? titles.map(s => `title-${s}`).join(' | ') : 'xl | l | m | s | xs';

  const elements     = getComponents(join(ROOT, 'src/components'));
  const compositions = getComponents(join(ROOT, 'src/components/mdx'));
  const report       = getComponents(join(ROOT, 'src/components/mdx/report'));

  const sep = (label) => `// ── ${label} ${'─'.repeat(Math.max(0, 78 - label.length))}`;

  const lines = [
    `// CLAUDE REFERENCE — Read until // END CLAUDE REFERENCE. Stop there unless you need visual examples.`,
    '//',
    sep('Foundations'),
    `// Grid        12-col (md+), 2-col (xs). Gap: 0. Max-width: --site-max-width.`,
    `//             Breakpoints: xs=default · md=48rem (768px) · xl=75rem (1200px). Hardcoded in media queries.`,
    `// Typography  ${titlesStr} — Dazzed SemiBold.`,
    `//             type-nameplate | type-text-l/m/s — IBM Plex Sans.`,
    `//             All values in tokens.scss. Use @include type($scale) — never write props by hand.`,
    `// Colors      Monochrome (black → white, all oklab). One accent: #7026C9 — use sparingly.`,
    `// Spacing     ${spacingStr}`,
    '//',
    sep('Elements'),
    ...elements.map(renderComponent),
    '//',
    sep('Compositions'),
    ...compositions.map(renderComponent),
  ];

  if (report.length) {
    lines.push('//', sep('Report Components'), ...report.map(renderComponent));
  }

  lines.push(
    '//',
    sep('Notes'),
    '// 2-col layouts: wrap each column in <div class="content-slot"> manually.',
    '// Captions: figure-level (Figure caption prop) vs section-level (PostSection caption prop).',
    '// New element classes must be registered in public/scripts/main.js for scroll reveal.',
    '// draft: true in frontmatter hides from public index — page still builds.',
    '//',
    '// END CLAUDE REFERENCE',
  );

  return lines.join('\n');
}

// ── Main ───────────────────────────────────────────────────────────────────────

function run() {
  if (!existsSync(COMPONENTS_PAGE)) {
    console.error(`❌  Not found: ${COMPONENTS_PAGE}`);
    process.exit(1);
  }

  const content  = readFileSync(COMPONENTS_PAGE, 'utf-8');
  const startIdx = content.indexOf(BLOCK_START);
  const endIdx   = content.indexOf(BLOCK_END);

  if (startIdx === -1 || endIdx === -1) {
    console.error('❌  Markers not found in components.astro.');
    console.error('    Add "// CLAUDE REFERENCE" and "// END CLAUDE REFERENCE" inside the frontmatter.');
    process.exit(1);
  }

  const before = content.slice(0, startIdx);
  const after  = content.slice(endIdx + BLOCK_END.length);
  const result = `${before}${buildBlock()}${after}`;

  writeFileSync(COMPONENTS_PAGE, result, 'utf-8');
  console.log('✓  CLAUDE REFERENCE regenerated in src/pages/components.astro');
}

run();

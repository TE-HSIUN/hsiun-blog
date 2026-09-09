import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { output } from './build.mjs';
import { collections } from '../src/content.mjs';

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const lists = await Promise.all(entries.map(entry => entry.isDirectory() ? collectFiles(path.join(directory, entry.name)) : [path.join(directory, entry.name)]));
  return lists.flat();
}

const files = await collectFiles(output);
const pages = files.filter(file => file.endsWith('.html'));
const expectedCount = 6 + collections.articles.length + collections.diary.length;
assert.equal(pages.length, expectedCount, 'Every collection and reading page must be built');
const titles = new Set();
let linkCount = 0;

for (const file of pages) {
  const html = await readFile(file, 'utf8');
  const route = '/' + path.relative(output, file).replaceAll(path.sep, '/').replace(/index\.html$/, '');
  assert.match(html, /<html lang="zh-Hant">/, `Language missing: ${route}`);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1, `Expected one h1: ${route}`);
  assert.doesNotMatch(html, /\{\{\w+\}\}/, `Unrendered template: ${route}`);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert.ok(title && !titles.has(title), `Missing or duplicate title: ${route}`);
  titles.add(title);
  assert.match(html, /<meta name="description" content="[^"]+"/, `Missing description: ${route}`);
  const idList = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(idList).size, idList.length, `Duplicate element IDs: ${route}`);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const href = match[1];
    assert.notEqual(href, '#', `Placeholder link on ${route}`);
    const target = new URL(href, `http://hsiun.test${route}`);
    if (target.origin !== 'http://hsiun.test') continue;
    let targetFile = path.join(output, target.pathname);
    if ((await stat(targetFile)).isDirectory()) targetFile = path.join(targetFile, 'index.html');
    await stat(targetFile);
    if (target.hash) {
      const targetHtml = await readFile(targetFile, 'utf8');
      assert.ok(targetHtml.includes(`id="${target.hash.slice(1)}"`), `Broken anchor ${href} on ${route}`);
    }
    linkCount += 1;
  }
}

// Verify the real served pages when a preview URL is supplied.
if (process.env.CHECK_URL) {
  const base = new URL(process.env.CHECK_URL);
  for (const file of files.filter(file => path.basename(file) !== '404.html')) {
    const route = '/' + path.relative(output, file).replaceAll(path.sep, '/').replace(/index\.html$/, '');
    const response = await fetch(new URL(route, base));
    assert.equal(response.status, 200, `HTTP error on ${route}`);
  }
  const missing = await fetch(new URL('/this-page-does-not-exist/', base));
  assert.equal(missing.status, 404, 'Unknown routes must return 404');
  assert.match(await missing.text(), /這一頁，暫時走丟了/);
  const redirect = await fetch(new URL('/articles', base), { redirect: 'manual' });
  assert.equal(redirect.status, 308, 'Directory URLs should normalize with a slash');
  assert.equal(redirect.headers.get('location'), '/articles/');
}

console.log(`PASS: ${pages.length} pages, ${linkCount} local references, metadata, headings, anchors, and output files.${process.env.CHECK_URL ? ' HTTP routes and 404 verified.' : ''}`);

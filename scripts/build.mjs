import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { categories, collections } from '../src/content.mjs';
import { categoryPage, homePage, notFoundPage, readingPage, renderDocument } from '../src/templates.mjs';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const output = path.join(root, 'dist');

export async function build() {
  const shell = await readFile(path.join(root, 'index.html'), 'utf8');
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  await cp(path.join(root, 'public'), output, { recursive: true });
  for (const file of ['style.css', 'script.js']) await cp(path.join(root, file), path.join(output, file));
  const data = Object.fromEntries(Object.entries(collections).map(([key, items]) => [key, [...items].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))]));
  const pages = [{ route: '/', content: homePage(data) }];
  for (const [key, items] of Object.entries(data)) {
    const category = categories[key];
    pages.push({ route: `/${key}/`, active: key, title: `${category.label} — Hsiun`, description: category.description, content: categoryPage(key, items) });
    if (key === 'articles' || key === 'diary') {
      for (const post of items) {
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) throw new Error(`Invalid slug: ${post.slug}`);
        pages.push({ route: `/${key}/${post.slug}/`, active: key, title: `${post.title} — Hsiun`, description: post.summary, ogType: 'article', content: readingPage(post) });
      }
    }
  }
  pages.push({ route: '/404.html', title: '找不到頁面 — Hsiun', content: notFoundPage() });
  const routes = new Set();
  for (const page of pages) {
    if (routes.has(page.route)) throw new Error(`Duplicate route: ${page.route}`);
    routes.add(page.route);
    const file = path.join(output, page.route.endsWith('/') ? page.route + 'index.html' : page.route);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, renderDocument(shell, page));
  }
  console.log(`Built ${pages.length} pages → dist`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await build();

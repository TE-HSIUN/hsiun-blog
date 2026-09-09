import { createServer } from 'node:http';
import { readFile, readdir, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import { createHash } from 'node:crypto';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { root, output, build } from './build.mjs';

const isDevelopment = process.argv.includes('--watch');
const port = Number(process.env.PORT || 4173);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.txt': 'text/plain; charset=utf-8' };
const clients = new Set();
await build();

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    if (isDevelopment && url.pathname === '/__reload') {
      response.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
      response.write(': connected\n\n');
      clients.add(response);
      request.on('close', () => clients.delete(response));
      return;
    }
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' });
      response.end();
      return;
    }
    const pathname = decodeURIComponent(url.pathname);
    let filename = path.resolve(output, `.${pathname}`);
    if (filename !== output && !filename.startsWith(output + path.sep)) {
      response.writeHead(403).end();
      return;
    }
    let status = 200;
    try {
      if ((await stat(filename)).isDirectory()) {
        if (!pathname.endsWith('/')) {
          response.writeHead(308, { Location: url.pathname + '/' + url.search }).end();
          return;
        }
        filename = path.join(filename, 'index.html');
      }
      await stat(filename);
    } catch {
      status = 404;
      filename = path.join(output, '404.html');
    }
    let body = await readFile(filename);
    if (isDevelopment && path.extname(filename) === '.html') {
      body = Buffer.from(body.toString().replace('</body>', '<script>new EventSource("/__reload").onmessage = () => location.reload();</script></body>'));
    }
    response.writeHead(status, { 'Content-Type': types[path.extname(filename)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch (error) {
    response.writeHead(error instanceof URIError ? 400 : 500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('暫時無法讀取這個頁面。');
  }
});

server.on('error', error => { console.error(error.message); process.exitCode = 1; });
server.listen(port, '127.0.0.1', () => console.log(`Local: http://localhost:${port}`));

if (isDevelopment) {
  let timer;
  let building = false;
  let pending = false;
  const sourceFiles = ['index.html', 'style.css', 'script.js'];
  const sourceDirectories = ['src', 'public'];

  // macOS file events may include metadata-only changes; rebuild only for content changes.
  async function sourceFingerprint() {
    const hash = createHash('sha256');
    for (const directory of sourceDirectories) {
      const files = await readdir(path.join(root, directory), { recursive: true, withFileTypes: true });
      for (const file of files.filter(file => file.isFile()).sort((a, b) => (a.parentPath + a.name).localeCompare(b.parentPath + b.name))) {
        hash.update(path.join(file.parentPath, file.name));
        hash.update(await readFile(path.join(file.parentPath, file.name)));
      }
    }
    for (const file of sourceFiles) hash.update(await readFile(path.join(root, file)));
    return hash.digest('hex');
  }
  let fingerprint = await sourceFingerprint();

  async function rebuild() {
    if (building) { pending = true; return; }
    building = true;
    let nextFingerprint;
    try { nextFingerprint = await sourceFingerprint(); }
    catch (error) { building = false; console.error('Unable to read source:', error.message); return; }
    if (fingerprint === nextFingerprint) { building = false; pending = false; return; }
    fingerprint = nextFingerprint;
    const child = spawn(process.execPath, ['scripts/build.mjs'], { cwd: root, stdio: 'inherit' });
    child.on('exit', code => {
      building = false;
      if (code === 0) for (const client of clients) client.write('data: reload\n\n');
      if (pending) { pending = false; rebuild(); }
    });
  }
  function scheduleRebuild() {
    clearTimeout(timer);
    timer = setTimeout(rebuild, 180);
  }
  for (const target of sourceDirectories) watch(path.join(root, target), { recursive: true }, scheduleRebuild).on('error', error => console.error('File watcher:', error.message));
  watch(root, (event, filename) => { if (sourceFiles.includes(String(filename))) scheduleRebuild(); }).on('error', error => console.error('File watcher:', error.message));
}

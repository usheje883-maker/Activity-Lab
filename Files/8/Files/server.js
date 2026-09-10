import { createServer } from 'node:http';
import { readFileSync, statSync, createReadStream } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 8200;

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.wasm': 'application/wasm',
  '.json': 'application/json',
  '.png': 'image/png',
  '.wav': 'audio/wav',
  '.bin': 'application/octet-stream',
};

const server = createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  let path = url.pathname === '/' ? '/index.html' : url.pathname;
  const file = join(__dirname, decodeURIComponent(path));

  try {
    const st = statSync(file);
    if (!st.isFile()) throw new Error('not a file');
    const ext = extname(file).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';
    const headers = {
      'Content-Type': mime,
      'Content-Length': st.size,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',
    };
    if (req.headers.range) {
      const m = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range);
      if (m) {
        const start = Number(m[1]);
        const end = m[2] ? Number(m[2]) : st.size - 1;
        const len = end - start + 1;
        res.writeHead(206, {
          ...headers,
          'Content-Range': `bytes ${start}-${end}/${st.size}`,
          'Content-Length': len,
        });
        createReadStream(file, { start, end }).pipe(res);
        return;
      }
    }
    res.writeHead(200, headers);
    createReadStream(file).pipe(res);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('not found');
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});

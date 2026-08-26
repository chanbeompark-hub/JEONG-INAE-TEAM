import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, isAbsolute, relative, resolve, sep } from 'node:path';

const MIME_TYPES = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.woff2', 'font/woff2'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
  ['.mp4', 'video/mp4'],
  ['.svg', 'image/svg+xml; charset=utf-8']
]);

const projectRoot = resolve(process.cwd());
const port = Number.parseInt(process.env.PORT || '4173', 10);

function send(response, statusCode, body, contentType = 'text/plain; charset=utf-8') {
  response.writeHead(statusCode, { 'Content-Type': contentType });
  response.end(body);
}

createServer(async (request, response) => {
  let pathname;

  try {
    pathname = decodeURIComponent(new URL(request.url || '/', 'http://127.0.0.1').pathname);
  } catch {
    send(response, 400, 'Bad Request');
    return;
  }

  const requestedPath = pathname === '/' ? '/index.html' : pathname;
  const filePath = resolve(projectRoot, `.${requestedPath}`);
  const rootRelativePath = relative(projectRoot, filePath);

  if (
    rootRelativePath === '..' ||
    rootRelativePath.startsWith(`..${sep}`) ||
    isAbsolute(rootRelativePath)
  ) {
    send(response, 403, 'Forbidden');
    return;
  }

  try {
    const body = await readFile(filePath);
    const contentType = MIME_TYPES.get(extname(filePath).toLowerCase()) || 'application/octet-stream';
    send(response, 200, body, contentType);
  } catch (error) {
    if (error?.code === 'ENOENT') {
      send(response, 404, 'Not Found');
      return;
    }

    send(response, 500, 'Internal Server Error');
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`Preview: http://127.0.0.1:${port}`);
});

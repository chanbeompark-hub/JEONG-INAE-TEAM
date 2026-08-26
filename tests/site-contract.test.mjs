import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const projectRoot = new URL('../', import.meta.url);

test('site keeps the visual, responsive, and progressive-enhancement contract', async () => {
  const [css, js, html] = await Promise.all([
    readFile(new URL('assets/css/site.css', projectRoot), 'utf8'),
    readFile(new URL('assets/js/site.js', projectRoot), 'utf8'),
    readFile(new URL('index.html', projectRoot), 'utf8')
  ]);

  assert.match(css, /@font-face/);
  assert.match(css, /PretendardVariable\.woff2/);
  assert.match(css, /--color-ink:\s*#111214/i);
  assert.match(css, /--color-accent:\s*#d9563f/i);
  assert.match(css, /@media\s*\(max-width:\s*48rem\)/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /\.coaching-frame__steps/);
  assert.match(css, /:focus-visible/);
  assert.match(js, /IntersectionObserver/);
  assert.match(js, /resolveConsultationState/);
  assert.match(html, /data-coaching-step/g);
  assert.equal((html.match(/data-coaching-step/g) || []).length, 4);
});

test('production validation accepts the checked-in site contract', () => {
  const result = spawnSync(process.execPath, ['scripts/validate-site.mjs'], {
    cwd: new URL('../', import.meta.url),
    encoding: 'utf8'
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /Site validation passed\./);
});

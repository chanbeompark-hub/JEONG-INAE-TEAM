import assert from 'node:assert/strict';
import { access, readFile, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const projectRoot = new URL('../', import.meta.url);
const distRoot = new URL('../dist/', import.meta.url);

test('build creates a Cloudflare-ready static dist directory', async (t) => {
  t.after(() => rm(distRoot, { recursive: true, force: true }));

  const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
  assert.equal(packageJson.scripts.build, 'node scripts/build-site.mjs');

  const result = spawnSync(process.execPath, ['scripts/build-site.mjs'], {
    cwd: projectRoot,
    encoding: 'utf8'
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  await access(new URL('index.html', distRoot));
  await access(new URL('assets/css/site.css', distRoot));
  await access(new URL('assets/js/site.js', distRoot));
  await access(new URL('assets/fonts/PretendardVariable.woff2', distRoot));
  await access(new URL('assets/media/trainer-credentials.webp', distRoot));

  const builtHtml = await readFile(new URL('index.html', distRoot), 'utf8');
  assert.match(builtHtml, /\.\/assets\/css\/site\.css/);
  await assert.rejects(access(new URL('tests/site-content.test.mjs', distRoot)));
  await assert.rejects(access(new URL('scripts/validate-site.mjs', distRoot)));
  await assert.rejects(access(new URL('package.json', distRoot)));
});

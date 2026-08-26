import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, rm, symlink, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverScript = resolve(dirname(fileURLToPath(import.meta.url)), '../scripts/dev-server.mjs');

let fixtureRoot;
let origin;
let serverProcess;

async function availablePort() {
  const probe = createServer();
  await new Promise((resolveListen, reject) => {
    probe.once('error', reject);
    probe.listen(0, '127.0.0.1', resolveListen);
  });

  const address = probe.address();
  const port = typeof address === 'object' && address ? address.port : null;
  await new Promise((resolveClose, reject) => probe.close((error) => error ? reject(error) : resolveClose()));

  if (!port) throw new Error('Could not allocate a test port');
  return port;
}

async function waitForPreview(child, port) {
  const expectedLine = `Preview: http://127.0.0.1:${port}`;

  await new Promise((resolveReady, reject) => {
    let stdout = '';
    let stderr = '';
    const timeout = setTimeout(() => reject(new Error(`Server startup timed out. stderr: ${stderr}`)), 5_000);

    child.stdout.on('data', (chunk) => {
      stdout += chunk;
      if (!stdout.includes(expectedLine)) return;
      clearTimeout(timeout);
      resolveReady();
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
    });
    child.once('exit', (code) => {
      clearTimeout(timeout);
      reject(new Error(`Server exited before startup with code ${code}. stderr: ${stderr}`));
    });
  });
}

before(async () => {
  fixtureRoot = await mkdtemp(join(tmpdir(), 'jeong-in-ae-dev-server-'));
  const siteRoot = join(fixtureRoot, 'site');
  const externalRoot = join(fixtureRoot, 'external');
  await mkdir(siteRoot);
  await mkdir(externalRoot);
  await writeFile(join(siteRoot, 'index.html'), '<h1>Fixture home</h1>');
  await writeFile(join(externalRoot, 'secret.txt'), 'outside-project');

  const linkType = process.platform === 'win32' ? 'junction' : 'dir';
  await symlink(externalRoot, join(siteRoot, 'linked-external'), linkType);

  const port = await availablePort();
  origin = `http://127.0.0.1:${port}`;
  serverProcess = spawn(process.execPath, [serverScript], {
    cwd: siteRoot,
    env: { ...process.env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  await waitForPreview(serverProcess, port);
});

after(async () => {
  if (serverProcess && serverProcess.exitCode === null) {
    const stopped = new Promise((resolveExit) => serverProcess.once('exit', resolveExit));
    serverProcess.kill();
    await stopped;
  }
  if (fixtureRoot) await rm(fixtureRoot, { recursive: true, force: true });
});

test('serves an ordinary file from the project root', async () => {
  const response = await fetch(`${origin}/`);

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'text/html; charset=utf-8');
  assert.equal(await response.text(), '<h1>Fixture home</h1>');
});

test('returns 404 for a missing project file', async () => {
  const response = await fetch(`${origin}/missing.txt`);

  assert.equal(response.status, 404);
  assert.equal(await response.text(), 'Not Found');
});

test('rejects a project junction whose real path escapes the project root', async () => {
  const response = await fetch(`${origin}/linked-external/secret.txt`);

  assert.equal(response.status, 403);
  assert.equal(await response.text(), 'Forbidden');
});

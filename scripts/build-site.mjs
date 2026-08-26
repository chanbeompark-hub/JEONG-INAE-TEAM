import { cp, mkdir, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const projectRoot = new URL('../', import.meta.url);
const distRoot = new URL('../dist/', import.meta.url);
const projectPath = fileURLToPath(projectRoot);

const validation = spawnSync(process.execPath, ['scripts/validate-site.mjs'], {
  cwd: projectPath,
  encoding: 'utf8'
});

if (validation.status !== 0) {
  process.stderr.write(validation.stderr || validation.stdout || 'Site validation failed.\n');
  process.exit(validation.status ?? 1);
}

await rm(distRoot, { recursive: true, force: true });
await mkdir(distRoot, { recursive: true });
await cp(new URL('../index.html', import.meta.url), new URL('index.html', distRoot));
await cp(new URL('../assets/', import.meta.url), new URL('assets/', distRoot), { recursive: true });

process.stdout.write('Cloudflare Pages build completed: dist/\n');

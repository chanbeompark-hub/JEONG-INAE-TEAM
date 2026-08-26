import { access, readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectRoot = resolve(process.cwd());
const requiredFiles = [
  'index.html',
  'package.json',
  'assets/css/site.css',
  'assets/js/site.js',
  'assets/js/site-config.js',
  'assets/fonts/PretendardVariable.woff2',
  'tests/site-contract.test.mjs'
];

function pass(message) {
  process.stdout.write(`PASS ${message}\n`);
}

function assertContract(condition, message) {
  if (!condition) throw new Error(message);
}

async function validateSite() {
  await Promise.all(requiredFiles.map((file) => access(resolve(projectRoot, file))));
  pass('required site files exist');

  const [html, packageSource, testEntries] = await Promise.all([
    readFile(resolve(projectRoot, 'index.html'), 'utf8'),
    readFile(resolve(projectRoot, 'package.json'), 'utf8'),
    readdir(resolve(projectRoot, 'tests'))
  ]);

  const packageJson = JSON.parse(packageSource);
  assertContract(typeof packageJson.scripts?.test === 'string' && packageJson.scripts.test.trim(), 'package.json must define an npm test script');
  assertContract(testEntries.some((entry) => entry.endsWith('.test.mjs')), 'tests must include at least one .test.mjs prerequisite');
  pass('npm test prerequisites are present');

  assertContract(!/(?:src|href)=["']\/assets(?:\/|["'])/i.test(html), 'index.html must not reference an absolute /assets path');
  pass('asset references are GitHub Pages-safe relative paths');

  assertContract(!html.includes('1986fitnessk.github.io'), 'index.html must not include the reference-site host');
  pass('reference-site host is absent');

  assertContract(!/<(?:img|video)\b/i.test(html), 'owned media is required before adding img or video elements');
  pass('unverified img and video elements are absent');

  const consultationButtons = html.match(/<button\b[^>]*class=["'][^"']*\bconsultation__button\b[^"']*["'][^>]*>/gi) || [];
  assertContract(consultationButtons.length > 0, 'index.html must include a consultation button');
  assertContract(consultationButtons.every((button) => /\bdisabled\b/i.test(button)), 'every consultation button must keep the disabled attribute');
  pass('consultation buttons preserve native disabled semantics');

  process.stdout.write('Site validation passed.\n');
}

try {
  await validateSite();
} catch (error) {
  process.stderr.write(`Site validation failed: ${error.message}\n`);
  process.exitCode = 1;
}

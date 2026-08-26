import { access, readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectRoot = resolve(process.cwd());
const requiredFiles = [
  'index.html',
  'package.json',
  'assets/css/site.css',
  'assets/js/site.js',
  'assets/js/site-behavior.js',
  'assets/js/site-config.js',
  'assets/fonts/PretendardVariable.woff2',
  'assets/media/jeong-in-ae-hero.mp4',
  'assets/media/jeong-in-ae-hero-poster.webp',
  'assets/media/jeong-in-ae-profile.webp',
  'assets/media/hero-studio-wide.webp',
  'assets/media/hero-studio-seated.webp',
  'assets/media/transformation-after-studio.webp',
  'assets/media/transformation-after-gym.webp',
  'assets/media/transformation-before-rear.webp',
  'assets/media/transformation-before-lifestyle.webp',
  'assets/media/method-evaluate.mp4',
  'assets/media/method-evaluate-poster.webp',
  'assets/media/method-design.mp4',
  'assets/media/method-design-poster.webp',
  'assets/media/method-practice.mp4',
  'assets/media/method-practice-poster.webp',
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

  assertContract((html.match(/data-hero-portrait/g) || []).length === 2, 'hero must contain exactly two supplied trainer portraits');
  assertContract((html.match(/data-transformation-image="before"/g) || []).length === 2, 'transformation story must contain exactly two before images');
  assertContract((html.match(/data-transformation-image="after"/g) || []).length === 3, 'transformation story must contain exactly three after images');
  assertContract(html.includes('aria-label="약 30kg 감량"'), 'transformation story must identify the supplied personal 30kg claim');
  assertContract((html.match(/data-media-option/g) || []).length === 3, 'method media must expose exactly three coaching steps');
  assertContract(!/(?:src|poster)=['"](?:https?:)?\/\//i.test(html), 'media must remain local to the project');
  pass('verified local trainer media contract is present');

  const consultationButtons = html.match(/<button\b[^>]*class=["'][^"']*\bconsultation__button\b[^"']*["'][^>]*>/gi) || [];
  assertContract(consultationButtons.length > 0, 'index.html must include a consultation button');
  const nativeDisabledAttribute = /\sdisabled(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?(?=\s|\/?>)/i;
  assertContract(consultationButtons.every((button) => nativeDisabledAttribute.test(button)), 'every consultation button must keep the native disabled attribute');
  pass('consultation buttons preserve native disabled semantics');

  process.stdout.write('Site validation passed.\n');
}

try {
  await validateSite();
} catch (error) {
  process.stderr.write(`Site validation failed: ${error.message}\n`);
  process.exitCode = 1;
}

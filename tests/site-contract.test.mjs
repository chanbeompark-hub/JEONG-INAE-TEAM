import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const projectRoot = new URL('../', import.meta.url);
const validatorPath = fileURLToPath(new URL('../scripts/validate-site.mjs', import.meta.url));

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
  assert.match(css, /prefers-reduced-motion:\s*reduce\)[\s\S]*?animation-duration:\s*\.01ms\s*!important/);
  assert.match(css, /prefers-reduced-motion:\s*reduce\)[\s\S]*?\.is-ready \[data-intro\],[\s\S]*?opacity:\s*1\s*!important;[\s\S]*?transform:\s*none\s*!important/);
  assert.match(css, /\.coaching-frame__portrait-duo/);
  assert.match(css, /\.intro__portrait img\s*\{[^}]*aspect-ratio:\s*966\s*\/\s*683;[^}]*height:\s*auto;/);
  assert.match(css, /\.transformation__comparison/);
  assert.match(css, /\.transformation__before/);
  assert.match(css, /\.transformation__after/);
  assert.match(css, /@media\s*\(max-width:\s*48rem\)[\s\S]*?\.transformation__after\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2,/);
  assert.match(css, /\.method-media__stage/);
  assert.match(css, /\.method-media__option\[aria-pressed="true"\]/);
  assert.match(css, /@media\s*\(max-width:\s*48rem\)[\s\S]*?\.method-media__rail\s*\{[\s\S]*?grid-auto-flow:\s*column/);
  assert.match(css, /\.hero h1\s*\{[\s\S]*?font-size:\s*clamp\(3\.1rem,\s*5\.5vw,\s*5\.8rem\)/);
  assert.match(css, /\.promise article:nth-child\(n\)\s*\{[\s\S]*?grid-row:\s*auto;/);
  assert.match(css, /@media\s*\(max-width:\s*48rem\)[\s\S]*?\.promise article:nth-child\(1\)\s*\{\s*grid-row:\s*1;/);
  assert.match(css, /@media\s*\(max-width:\s*48rem\)[\s\S]*?\.promise article:nth-child\(3\)\s*\{\s*grid-row:\s*2;/);
  assert.match(css, /@media\s*\(max-width:\s*48rem\)[\s\S]*?\.promise article:nth-child\(2\)\s*\{\s*grid-row:\s*3;/);
  assert.match(css, /@media\s*\(max-width:\s*48rem\)[\s\S]*?\.promise article:nth-child\(4\)\s*\{\s*grid-row:\s*4;/);
  assert.match(css, /--motion-intro:\s*720ms/);
  assert.match(css, /\.is-ready \.hero__action\s*\{\s*animation-delay:\s*180ms;/);
  assert.match(css, /\.is-ready \.coaching-frame__portrait--secondary\s*\{\s*animation-delay:\s*240ms;/);
  assert.match(css, /:focus-visible/);
  assert.match(js, /IntersectionObserver/);
  assert.match(js, /resolveConsultationState/);
  assert.match(js, /selectMethodMedia/);
  assert.equal((html.match(/data-hero-portrait/g) || []).length, 2);
  assert.equal((html.match(/data-transformation-image=/g) || []).length, 5);
});

test('production validation accepts the checked-in site contract', () => {
  const result = spawnSync(process.execPath, ['scripts/validate-site.mjs'], {
    cwd: new URL('../', import.meta.url),
    encoding: 'utf8'
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /Site validation passed\./);
});

test('production validation rejects aria-disabled without the native disabled attribute', async (t) => {
  const fixtureRoot = await mkdtemp(join(tmpdir(), 'jeong-in-ae-validation-'));
  t.after(() => rm(fixtureRoot, { recursive: true, force: true }));

  const fixtureFiles = new Map([
    ['index.html', '<img data-hero-portrait><img data-hero-portrait><img data-transformation-image="before"><img data-transformation-image="before"><img data-transformation-image="after"><img data-transformation-image="after"><img data-transformation-image="after"><span aria-label="약 30kg 감량"></span><button data-media-option></button><button data-media-option></button><button data-media-option></button><button class="consultation__button" type="button" aria-disabled="true">상담 준비 중</button>'],
    ['package.json', '{"scripts":{"test":"node --test tests/*.test.mjs"}}'],
    ['assets/css/site.css', ''],
    ['assets/js/site.js', ''],
    ['assets/js/site-behavior.js', ''],
    ['assets/js/site-config.js', ''],
    ['assets/fonts/PretendardVariable.woff2', ''],
    ['assets/media/jeong-in-ae-hero.mp4', ''],
    ['assets/media/jeong-in-ae-hero-poster.webp', ''],
    ['assets/media/jeong-in-ae-profile.webp', ''],
    ['assets/media/hero-studio-wide.webp', ''],
    ['assets/media/hero-studio-seated.webp', ''],
    ['assets/media/trainer-credentials.webp', ''],
    ['assets/media/transformation-after-studio.webp', ''],
    ['assets/media/transformation-after-gym.webp', ''],
    ['assets/media/transformation-before-rear.webp', ''],
    ['assets/media/transformation-before-lifestyle.webp', ''],
    ['assets/media/method-evaluate.mp4', ''],
    ['assets/media/method-evaluate-poster.webp', ''],
    ['assets/media/method-design.mp4', ''],
    ['assets/media/method-design-poster.webp', ''],
    ['assets/media/method-practice.mp4', ''],
    ['assets/media/method-practice-poster.webp', ''],
    ['tests/site-contract.test.mjs', '']
  ]);

  for (const [relativePath, contents] of fixtureFiles) {
    const destination = join(fixtureRoot, relativePath);
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, contents);
  }

  const result = spawnSync(process.execPath, [validatorPath], {
    cwd: fixtureRoot,
    encoding: 'utf8'
  });

  assert.notEqual(result.status, 0, result.stdout);
  assert.match(result.stderr, /native disabled attribute/i);
});

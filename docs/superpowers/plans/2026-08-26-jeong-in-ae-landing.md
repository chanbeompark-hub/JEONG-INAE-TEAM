# Jeong In-ae Trainer Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, responsive Korean editorial landing page for Jeong In-ae, PT team leader at 1986 Fitness Jichuk, with a truthful media-waiting state and disabled consultation CTA.

**Architecture:** Use a progressively enhanced static site: semantic content remains in `index.html`, design and responsive behavior live in one focused stylesheet, and a small ES module owns replaceable CTA/media configuration plus viewport-entry motion. Dependency-free Node tests validate copy, semantics, configuration, asset references, and responsive contracts; real browser QA validates layout and motion.

**Tech Stack:** HTML5, CSS custom properties and container/media queries, vanilla ES modules, Node.js built-in test runner, dependency-free local HTTP server, Codex in-app browser

**Spec:** `docs/superpowers/specs/2026-08-26-jeong-in-ae-landing-design.md`

## Global Constraints

- Deploy as a single-page static website that works from a GitHub Pages subpath using relative asset URLs only.
- Keep core Korean copy in HTML so it remains readable when JavaScript is unavailable.
- Use no framework and no runtime package dependency.
- Show no copied member image, proprietary wording, prices, testimonials, credentials, metrics, or contact information from the reference site.
- Use a native disabled `button` labelled `상담 준비 중` with a visible status explanation.
- Do not show an empty transformation gallery before user-owned case images are supplied.
- Use ink black, warm ivory, restrained vermilion, and neutral gray; keep radii at or below `8px`.
- Make the coaching frame vertical on desktop and a horizontal progress composition on mobile.
- Respect `prefers-reduced-motion: reduce` and keep all content immediately visible in that mode.
- Verify no horizontal overflow at `320`, `360`, `390`, and `430` CSS pixels.
- Do not create a project-level `AGENTS.md`.

## File Structure

- `DESIGN_BRIEF.md` — inspected reference evidence, design tokens, motion storyboard, implementation map, and acceptance evidence.
- `index.html` — all semantic marketing copy, landmarks, disabled CTA, and media-waiting markup.
- `assets/css/site.css` — tokens, layout, signature composition, responsive transformation, focus states, and reduced-motion rules.
- `assets/js/site-config.js` — replaceable consultation and media configuration plus pure state resolution.
- `assets/js/site.js` — DOM enhancement, intersection reveals, pointer response, media fallback, and document-ready state.
- `assets/fonts/PretendardVariable.woff2` — local, licensed Pretendard variable font artifact.
- `assets/fonts/LICENSE-Pretendard.txt` — Pretendard license notice copied from the official distribution.
- `package.json` — dependency-free scripts for tests, validation, and local preview.
- `scripts/dev-server.mjs` — local static file server with explicit MIME types and safe path resolution.
- `scripts/validate-site.mjs` — production-readiness checks for files, references, copy, and forbidden external media.
- `tests/site-content.test.mjs` — HTML structure and required-copy tests.
- `tests/site-config.test.mjs` — CTA/media state unit tests.
- `tests/site-contract.test.mjs` — CSS motion, responsive, font, focus, and asset contract tests.
- `artifacts/qa/` — generated screenshots and motion evidence; only verified final evidence is committed.

---

### Task 1: Design Brief and Dependency-Free Project Foundation

**Files:**
- Create: `DESIGN_BRIEF.md`
- Create: `package.json`
- Create: `scripts/dev-server.mjs`
- Create: `assets/fonts/PretendardVariable.woff2`
- Create: `assets/fonts/LICENSE-Pretendard.txt`
- Test: `DESIGN_BRIEF.md` with `validate-design-brief.mjs`

**Interfaces:**
- Consumes: approved spec at `docs/superpowers/specs/2026-08-26-jeong-in-ae-landing-design.md`
- Produces: `npm run dev`, `npm test`, `npm run validate`, local font URLs `./assets/fonts/PretendardVariable.woff2`, and the reference implementation map used by Tasks 2–4

- [ ] **Step 1: Write the complete design brief from inspected evidence**

Create `DESIGN_BRIEF.md` from the JH Design template with these exact decisions:

```markdown
# Design Brief

## Product job
A prospective PT member reads Jeong In-ae's evaluation-led coaching approach to decide whether this is a trainer they can trust; the current result is an honest consultation-preparing state.

## Direction
An asymmetric Korean editorial coaching page uses a vertical assessment line, large declarations, and alternating ink/ivory surfaces to move from visitor tension to method, proof structure, and a truthful inactive CTA.

## Brand reading
- Immutable identity: 1986 Fitness Jichuk; Jeong In-ae; PT team leader; supplied philosophy and four promises.
- Repeatable shapes/materials: alignment lines, numbered stages, edge-to-edge surface changes, thin rules, 0–8px corners.
- Existing inconsistencies to remove: generic equal cards, unverified fitness claims, fake member imagery, decorative metrics.
- Media provenance: no owned trainer video or case image is supplied yet; the inspected reference media is analysis-only and must not ship.

## Signature composition and component
- Signature composition: text and coaching stages alternate across one continuous assessment axis.
- Signature component: Coaching Standard Frame with 01 평가, 02 설계, 03 수행, 04 자립.

## Tokens
- Font: local Pretendard Variable for Korean; Arial Narrow/Arial fallback for Latin labels.
- Text colors: #F4F0E8 on ink; #151515 on ivory; #A6A29A for supporting copy.
- Surface colors: #111214 ink; #F4F0E8 ivory; #222326 raised ink.
- Accent and semantic colors: #D9563F vermilion; #77736D disabled text.
- Spacing steps: 4, 8, 12, 16, 24, 32, 48, 72, 112px.
- Radius: 0, 4, 8px.
- Border and shadow: 1px low-contrast rules; no decorative card shadow.
- Motion: 180ms feedback, 560ms reveal, 900ms intro; cubic-bezier(.22,1,.36,1).
```

Fill the reference implementation map with concrete rows for: reference hero 2-column composition → `.hero`; numbered method progression → `.philosophy__steps`; image comparison framing → future `.records` extension only; reference `arrive` motion → `.hero [data-intro]`; plan-card selection feedback → disabled `.consultation__button` state semantics, not pricing UI. Fill the motion storyboard for `assemble coaching standard`, `follow the coaching line`, item focus/hover, and reduced-motion final state. Use the exact planned artifact path `artifacts/qa/desktop-first-viewport.png (captured in Task 4)` in acceptance cells instead of claiming evidence that does not exist yet.

- [ ] **Step 2: Validate the brief and confirm the expected gate result**

Run:

```powershell
node "C:\Users\박찬범\.codex\skills\jh-design\scripts\validate-design-brief.mjs" "C:\Users\박찬범\Documents\ChatGPT\정인애 트레이너\DESIGN_BRIEF.md"
```

Expected: exit code `0` and a success message with no missing required field.

- [ ] **Step 3: Add dependency-free scripts and local server**

Create `package.json`:

```json
{
  "name": "jeong-in-ae-trainer",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "node scripts/dev-server.mjs",
    "test": "node --test tests/*.test.mjs",
    "validate": "node scripts/validate-site.mjs"
  }
}
```

Create `scripts/dev-server.mjs` with `node:http`, `node:fs/promises`, and `node:path`. Resolve requests relative to `process.cwd()`, map `/` to `/index.html`, reject any resolved path outside the project root with status `403`, return `404` for missing files, and set explicit MIME types for `.html`, `.css`, `.js`, `.woff2`, `.png`, `.jpg`, `.jpeg`, `.webp`, `.mp4`, and `.svg`. Listen on `127.0.0.1` and `process.env.PORT || 4173`; print exactly `Preview: http://127.0.0.1:<port>`.

- [ ] **Step 4: Add the licensed local font**

Download the official Pretendard variable WOFF2 and license from the `orioncactus/pretendard` distribution into the two font paths. Confirm the binary begins with the WOFF2 signature and the license names the SIL Open Font License.

Run:

```powershell
Format-Hex -LiteralPath '.\assets\fonts\PretendardVariable.woff2' -Count 4
Select-String -LiteralPath '.\assets\fonts\LICENSE-Pretendard.txt' -Pattern 'SIL OPEN FONT LICENSE'
```

Expected: WOFF2 magic bytes `77 4F 46 32` and at least one license match.

- [ ] **Step 5: Commit the foundation**

```powershell
git add DESIGN_BRIEF.md package.json scripts/dev-server.mjs assets/fonts
git -c user.name='Codex' -c user.email='codex@openai.com' commit -m "chore: establish trainer landing foundation"
```

---

### Task 2: Semantic Content and Truthful Consultation State

**Files:**
- Create: `index.html`
- Create: `assets/js/site-config.js`
- Create: `tests/site-content.test.mjs`
- Create: `tests/site-config.test.mjs`

**Interfaces:**
- Consumes: relative asset contract and local font path from Task 1
- Produces: `SITE_CONFIG`, `resolveConsultationState(config)`, semantic section IDs `intro`, `philosophy`, `promise`, `consultation`, and hooks `data-intro`, `data-reveal`, `data-coaching-step`

- [ ] **Step 1: Write failing content and configuration tests**

Create `tests/site-content.test.mjs` using `node:test`, `node:assert/strict`, and `readFile`. Assert that `index.html` contains exactly one `<h1`, contains the strings `PT팀장 정인애`, `1986피트니스 지축점`, all three philosophy headings, all four promise headings, `상담 준비 중`, and `상담 채널을 준비하고 있습니다.`. Assert that it contains `<button` with both `disabled` and `aria-describedby="consultation-status"`. Assert that it does not contain `<img`, `<video`, `http://`, `https://`, a price-shaped regex `/\d{1,3}(,\d{3})+원/`, or `AGENTS.md`.

Create `tests/site-config.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { SITE_CONFIG, resolveConsultationState } from '../assets/js/site-config.js';

test('default consultation state is truthful and inactive', () => {
  assert.deepEqual(resolveConsultationState(SITE_CONFIG.consultation), {
    enabled: false,
    label: '상담 준비 중',
    href: null,
    status: '상담 채널을 준비하고 있습니다.'
  });
});

test('enabled consultation requires a safe explicit URL', () => {
  assert.throws(() => resolveConsultationState({ enabled: true, label: '상담하기', href: '' }), /href/);
  assert.throws(() => resolveConsultationState({ enabled: true, label: '상담하기', href: 'javascript:alert(1)' }), /protocol/);
  assert.equal(resolveConsultationState({ enabled: true, label: '상담하기', href: 'https://example.com' }).enabled, true);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`

Expected: FAIL because `index.html` and `assets/js/site-config.js` do not exist.

- [ ] **Step 3: Implement the configuration module**

Create `assets/js/site-config.js` with:

```js
export const SITE_CONFIG = Object.freeze({
  consultation: Object.freeze({
    enabled: false,
    label: '상담 준비 중',
    href: null,
    status: '상담 채널을 준비하고 있습니다.'
  }),
  media: Object.freeze({ heroVideo: null, heroPoster: null, records: Object.freeze([]) })
});

export function resolveConsultationState(config) {
  const state = { enabled: Boolean(config.enabled), label: String(config.label || '').trim(), href: config.href || null, status: String(config.status || '').trim() };
  if (!state.enabled) return { ...state, href: null };
  if (!state.href) throw new Error('Enabled consultation requires href');
  const url = new URL(state.href);
  if (!['https:', 'http:', 'tel:'].includes(url.protocol)) throw new Error('Unsupported consultation protocol');
  return state;
}
```

- [ ] **Step 4: Implement semantic HTML with complete approved copy**

Create `index.html` with `lang="ko"`, viewport metadata, title `내 몸을 믿고 맡길 수 있는 지도자 | 정인애 PT팀장`, description metadata, local stylesheet, and module script. Use `<header>`, `<main>`, `<section aria-labelledby>`, and `<footer>`.

The content sequence must be:

1. Header labels `1986 FITNESS · JICHUK` and `JEONG IN AE · PT TEAM LEADER`.
2. Hero eyebrow `PERSONAL TRAINING · YOUR OWN STANDARD`; `<h1>` lines `내 몸을 믿고 / 맡길 수 있는 / 지도자.`; paragraph identifying Jeong In-ae and Jichuk; disabled CTA; Coaching Standard Frame ordered list with `01 평가`, `02 설계`, `03 수행`, `04 자립`.
3. Intro heading `정말 나를 잘 이끌어줄 수 있는 사람일까?` followed by the supplied explanation about different reasons for exercise, repetitive routines, accurate understanding, safety, and certain change.
4. Philosophy heading containing the supplied quotation, then three numbered articles using the full supplied paragraphs for evaluation, self-reliance, and sustainable results.
5. Full-width statement section repeating the philosophy quotation as the visual transition.
6. Promise section heading `정인애 팀장이 약속하는 4가지 차별점`, then four articles using the full supplied descriptions for monitoring, injury prevention, accessible explanation, and sustainable lifestyle.
7. Consultation section heading `내 몸을 이해하는 것부터 시작합니다.`, disabled button, and `<p id="consultation-status">상담 채널을 준비하고 있습니다.</p>`.
8. Footer with only verified identity: `1986 FITNESS JICHUK · JEONG IN AE`.

Do not add a gallery placeholder to the visitor-facing page. The coaching frame is a process visualization, not fake media.

- [ ] **Step 5: Run tests to verify content and state pass**

Run: `npm test`

Expected: all Task 2 tests PASS.

- [ ] **Step 6: Commit semantic content**

```powershell
git add index.html assets/js/site-config.js tests/site-content.test.mjs tests/site-config.test.mjs
git -c user.name='Codex' -c user.email='codex@openai.com' commit -m "feat: add trainer story and consultation state"
```

---

### Task 3: Signature Visual System, Motion, and Responsive Transformation

**Files:**
- Create: `assets/css/site.css`
- Create: `assets/js/site.js`
- Create: `tests/site-contract.test.mjs`
- Create: `scripts/validate-site.mjs`
- Modify: `index.html`

**Interfaces:**
- Consumes: `SITE_CONFIG`, `resolveConsultationState`, and data hooks from Task 2
- Produces: document class `is-ready`, reveal class `is-visible`, pointer variables `--pointer-x` and `--pointer-y`, validation command `npm run validate`

- [ ] **Step 1: Write failing visual-contract tests**

Create `tests/site-contract.test.mjs`. Read `assets/css/site.css`, `assets/js/site.js`, and `index.html`; assert:

```js
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
```

- [ ] **Step 2: Run the contract test to verify it fails**

Run: `node --test tests/site-contract.test.mjs`

Expected: FAIL because `assets/css/site.css` and `assets/js/site.js` do not exist.

- [ ] **Step 3: Implement tokens, editorial layout, and component anatomy**

Create `assets/css/site.css` with:

- local `@font-face` for `Pretendard Variable`, weight `100 900`, `font-display: swap`;
- exact color and spacing tokens from `DESIGN_BRIEF.md`;
- `.wrap { width: min(100% - 40px, 1240px); margin-inline: auto; }` with wider gutters above `768px`;
- desktop `.hero` grid near `minmax(0, 1.08fr) minmax(22rem, .92fr)` and intentional 72px gap;
- `clamp()` display type with Korean-safe line heights and no blanket body letter-spacing;
- `.coaching-frame` with alignment grid drawn using CSS gradients, one vermilion vertical axis, four semantic step nodes, and a real text label `MEDIA WILL FOLLOW · METHOD IS HERE NOW`;
- philosophy as a sticky editorial heading beside a bordered ordered flow on desktop;
- statement section with ivory surface and ink text;
- promise section as a 12-column asymmetric grid where items span `7/5/5/7` columns rather than four equal cards;
- disabled consultation button using visible text, `not-allowed` cursor, sufficient contrast, and no transform suggesting clickability;
- visible `:focus-visible` styles for every future active link/button.

- [ ] **Step 4: Implement the mobile transformation and text safety**

At `max-width: 48rem`:

- collapse hero copy and frame to one column but move the frame between identity copy and CTA using grid areas;
- convert `.coaching-frame__steps` from a vertical list to four equal horizontal columns with a horizontal accent axis;
- make the promise section one column in the mobile reading order monitoring → accessible explanation → injury prevention → lifestyle;
- reduce labels before body copy, not body copy below `15px`;
- use `overflow-wrap: break-word`, `word-break: keep-all`, and balanced headings where supported;
- remove sticky positioning and pointer parallax;
- guarantee every surface has `min-width: 0` and no page-level `overflow-x: hidden` masking real overflow.

- [ ] **Step 5: Implement orchestrated motion and progressive enhancement**

Create `assets/js/site.js` that imports Task 2 exports, resolves the CTA state, adds `is-ready` only after DOM lookup succeeds, and uses one `IntersectionObserver` with threshold `0.18` to add `is-visible` once to each `[data-reveal]` node. Add pointer tracking only to `.coaching-frame` when `(pointer: fine)` matches; update `--pointer-x` and `--pointer-y` with bounded values from `-1` to `1` and reset on `pointerleave`. If `IntersectionObserver` is unavailable or reduced motion is requested, immediately mark every reveal visible. Add an `error` listener for future `[data-project-media]` elements that replaces the media with the existing fallback label without changing frame dimensions.

CSS motion must include:

- `assemble coaching standard`: hero copy and four coaching nodes complete within 900ms using coordinated delays;
- `follow the coaching line`: revealed philosophy and promise elements move from `translateY(24px)` and opacity `0` to final state over 560ms;
- three microinteractions: active link underline shift, coaching node/pointer response, promise rule extension;
- a complete reduced-motion block setting animation and transition duration to `0.01ms`, one iteration, no transform, and visible opacity.

- [ ] **Step 6: Implement production validation**

Create `scripts/validate-site.mjs` using only Node built-ins. It must fail with a nonzero exit code when any required file is missing, when `index.html` references an absolute `/assets` path, when HTML includes reference-site host `1986fitnessk.github.io`, when HTML contains `<img>` or `<video>` before owned media is supplied, when `disabled` is missing from the consultation button, or when `npm test` prerequisites are absent. Print one line per passed check and finish with `Site validation passed.`.

- [ ] **Step 7: Run all automated verification**

Run:

```powershell
npm test
npm run validate
node "C:\Users\박찬범\.codex\skills\jh-design\scripts\validate-design-brief.mjs" ".\DESIGN_BRIEF.md"
```

Expected: all tests pass, `Site validation passed.`, and the design brief validator exits `0`.

- [ ] **Step 8: Commit the complete design pass**

```powershell
git add index.html assets/css/site.css assets/js/site.js tests/site-contract.test.mjs scripts/validate-site.mjs DESIGN_BRIEF.md
git -c user.name='Codex' -c user.email='codex@openai.com' commit -m "feat: apply editorial coaching design system"
```

---

### Task 4: Browser QA, Motion Evidence, and Final Acceptance

**Files:**
- Create: `artifacts/qa/desktop-first-viewport.png`
- Create: `artifacts/qa/desktop-flow.png`
- Create: `artifacts/qa/mobile-390-first-viewport.png`
- Create: `artifacts/qa/motion-sequence-01.png`
- Create: `artifacts/qa/motion-sequence-02.png`
- Create: `artifacts/qa/motion-sequence-03.png`
- Modify: `DESIGN_BRIEF.md`

**Interfaces:**
- Consumes: local preview at `http://127.0.0.1:4173/`, implementation map, and all automated validation from Tasks 1–3
- Produces: visual acceptance evidence, console result, overflow measurements, and final project readiness report

- [ ] **Step 1: Start the preview and verify the normal path**

Run `npm run dev` and keep the process session alive. Open `http://127.0.0.1:4173/` in the in-app browser. Confirm title, header identity, all seven required content blocks, four coaching steps, and disabled CTA are visible. Read browser console logs and require zero errors.

- [ ] **Step 2: Capture desktop evidence at 1440×900**

Set viewport to `1440×900`. Capture the first viewport and a representative full-page flow. Verify the primary identity and consultation status appear without horizontal scrolling; inspect computed font and require `Pretendard Variable` to be first in the used family. Save captures to the two desktop paths.

- [ ] **Step 3: Prove responsive behavior at four mobile widths**

For each width `320`, `360`, `390`, and `430` with height `844`, evaluate:

```js
({
  viewport: innerWidth,
  scrollWidth: document.documentElement.scrollWidth,
  overflow: document.documentElement.scrollWidth > innerWidth,
  stepsColumns: getComputedStyle(document.querySelector('.coaching-frame__steps')).gridTemplateColumns
})
```

Expected: `overflow` is `false` at all widths and `stepsColumns` contains four columns on mobile. At 390px capture the first viewport and visually inspect Korean line breaks, CTA text, horizontal coaching frame, and promise order.

- [ ] **Step 4: Verify non-interactive and reduced-motion states**

Confirm the disabled CTA cannot receive activation, does not navigate, and has the visible status description. Emulate or set reduced motion, reload, and verify all `[data-intro]` and `[data-reveal]` content is immediately visible with no transformed residual state. Disable JavaScript for one inspection or retrieve the raw HTML response and confirm all core copy and the disabled CTA remain present.

- [ ] **Step 5: Capture sequential motion evidence**

At desktop width, capture three sequential frames across the 900ms intro or use equivalent browser trace evidence: opening state, line/nodes assembling, and final composition. Confirm at least two coordinated elements change and that the sequence's job is visibly `assemble coaching standard`, not unrelated section fades.

- [ ] **Step 6: Run the design quality rubric and anti-template gate**

Read `C:\Users\박찬범\.codex\skills\jh-design\references\design-quality-rubric.md` and score the implemented page. Reject and iterate if the first viewport has accidental empty space, the signature frame looks like a generic card, the promises resolve into equal cards, mobile only stacks without horizontal frame transformation, or the accent has no structural role.

- [ ] **Step 7: Record observed acceptance evidence and revalidate**

Update every `DESIGN_BRIEF.md` acceptance cell with the exact QA capture or measured result. Run:

```powershell
npm test
npm run validate
node "C:\Users\박찬범\.codex\skills\jh-design\scripts\validate-design-brief.mjs" ".\DESIGN_BRIEF.md"
git diff --check
```

Expected: all commands exit `0`; every acceptance cell points to an observed capture or measurement.

- [ ] **Step 8: Commit verified evidence**

```powershell
git add DESIGN_BRIEF.md artifacts/qa
git -c user.name='Codex' -c user.email='codex@openai.com' commit -m "test: verify trainer landing experience"
```

- [ ] **Step 9: Prepare the completion handoff**

Report the chosen direction, reference principles and exact implementation mapping, font verification, truthful media status, first-three-seconds hook, preserved content, visible changes, signature component and motion evidence, desktop/mobile states checked, automated command results, and the remaining limitation that trainer-owned video, case imagery, and live consultation destination are not yet supplied.

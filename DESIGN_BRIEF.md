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

## Reference evidence
- Source: `https://1986fitnessk.github.io/park-minseok-renewal/han-seulgi-renewal/`, inspected 2026-08-26 as recorded in the approved specification.
- Exact page/section/state inspected: 1440px desktop and 390px mobile views of the hero, numbered method progression, image comparison framing, `arrive` intro motion, and plan-card selection feedback.
- Desktop behavior observed: an asymmetric two-column hero, vertical numbered progression, edge-to-edge surface changes, and short sequential entrance motion establish the reading order.
- Mobile behavior observed: the hero content intentionally reorders, the composition collapses without losing hierarchy, and stages remain scannable in a narrower flow.
- Evidence boundary: trainer/member media, pricing, proprietary copy, brand marks, and unverified claims belong to the reference and will not be shipped.

## Reference synthesis
- Structure comes from: the reference hero's asymmetric two-column reading order and its numbered method progression.
- Interaction comes from: the reference plan-card feedback, translated only into explicit disabled-state semantics for the current consultation action.
- Visual tone comes from: alternating dark/light editorial surfaces, restrained labels, large Korean declarations, and thin alignment rules, recolored for Jeong In-ae's identity.
- Hook/copy energy comes from: the reference's tension-to-promise rhythm, rewritten exclusively with the supplied coaching philosophy and verified identity.
- Motion/media behavior comes from: the reference `arrive` sequence and consistent comparison framing; motion becomes a coaching-standard assembly, while comparison media remains a future extension.
- The final screen will not copy: the reference trainer's identity, wording, prices, member imagery, logo treatment, navy palette, or complete layout.

## Reference implementation map

| Reference evidence | Extracted principle | Local component | Motion/state | Mobile translation | Acceptance evidence |
|---|---|---|---|---|---|
| Reference hero 2-column composition | Use unequal columns to separate the visitor promise from the coaching method | `.hero` | Copy and method frame assemble as one intro sequence | Reorder message → identity → coaching frame → CTA in one column | `artifacts/qa/desktop-first-viewport.png`: observed 1440×900 unequal columns with hero action ending at 828px; `artifacts/qa/mobile-390-first-viewport.png`: observed message → identity → horizontal frame → disabled CTA within 844px. |
| Numbered method progression | Make coaching legible as a sequence connected by one assessment axis | `.philosophy__steps` | Items reveal in order as the line is followed | Remove sticky behavior and preserve a single readable vertical flow | `artifacts/qa/desktop-flow.png`: 1425×5082 stitched live viewport captures at scrollY 0, 800, 1600, 2400, 3200, 4000, and 4182; visually passed across header/hero, intro, philosophy, statement, promises, consultation, and footer. Live 320/360/390/430×844 measurements found no overflow and the mobile heading computed `position: static`. |
| Image comparison framing | Reserve consistent crop, angle, caption, and consent anatomy without inventing proof | Future `.records` extension only — intentionally deferred; no current `.records` DOM or visitor-facing gallery | Hidden until owned, verified case media exists | Future cases become one-at-a-time snap reading or a controlled horizontal gallery | Deferred contract, excluded from current implementation-evidence scoring. Current proof is limited to `npm run validate` and raw-HTML inspection that no unverified `img`/`video` is shipped, plus the visible media-free fallback in both first-viewport PNGs. |
| Reference `arrive` motion | Coordinate headline, assessment line, and numbered stages around one comprehension job | `.hero [data-intro]` | `assemble coaching standard`, every delayed element complete by 900ms | Shorten spatial travel while retaining the final reading order | `artifacts/qa/motion-sequence-01.png` → `02.png` → `03.png`: copy opacity 0.136→0.954→1, frame 0→0.911→1, and nodes assemble in staggered order before all transforms resolve to `none`; source contract pins 720ms base intro + 180ms CTA delay and 360ms nodes through the 540ms final-node delay (900ms maximum). |
| Plan-card selection feedback | Make the current unavailable action unmistakable without implying pricing or selection | Disabled `.consultation__button` state semantics, not pricing UI | Native disabled state, `not-allowed` cursor, muted contrast, and visible status text | Full-width readable control with no hover transform or false affordance | Live click inspection: native `disabled`, `isEnabled=false`, active element remained `BODY`, URL stayed `http://127.0.0.1:4173/`, and status remained visible; all four mobile CTA regions ended within 844px. |

## Signature composition and component
- Signature composition: text and coaching stages alternate across one continuous assessment axis.
- Signature component: Coaching Standard Frame with 01 평가, 02 설계, 03 수행, 04 자립.

## Motion storyboard

| Beat | Trigger | Elements | From → to | Duration/ease | Purpose | Reduced motion |
|---|---|---|---|---|---|---|
| `assemble coaching standard` | Initial document-ready state | Hero declaration, vertical assessment line, four Coaching Standard Frame stages | Offset/transparent elements → aligned, fully visible composition | 720ms base hero, with 180ms CTA delay; 360ms nodes stagger from 180ms through 540ms, so every element completes within 900ms; cubic-bezier(.22,1,.36,1) | Build the evaluation-led method before asking the visitor to act | Render every element immediately in its final position and opacity |
| `follow the coaching line` | Each philosophy group enters the viewport | `.philosophy__steps` line, stage number, heading, and explanation | translateY(24px), opacity 0 → translateY(0), opacity 1 | 560ms; cubic-bezier(.22,1,.36,1), 40ms stagger | Connect evaluation, understanding, and persistence as one coaching progression | Show the complete line and all items immediately with no transform |
| Item focus/hover | Keyboard focus or fine-pointer hover on a future active control or coaching item | Focus ring, label underline, coaching node, and promise rule | Resting rule/node → accent-emphasized rule/node | 180ms; cubic-bezier(.22,1,.36,1) | Confirm the currently inspected item without shifting layout | Preserve the visible focus/state distinction but remove transition and transform |
| Reduced-motion final state | `prefers-reduced-motion: reduce` or unavailable observer | All `[data-intro]` and `[data-reveal]` content | Any pre-animation state → final readable state | 0.01ms; one iteration; no delay | Guarantee immediate access to content with no scroll-linked or repeated movement | This row defines the final state: opacity 1 and transform none |

## Tokens
- Font: local Pretendard Variable for Korean; Arial Narrow/Arial fallback for Latin labels.
- Text colors: #F4F0E8 on ink; #151515 on ivory; #A6A29A for supporting copy.
- Surface colors: #111214 ink; #F4F0E8 ivory; #222326 raised ink.
- Accent and semantic colors: #D9563F vermilion; #77736D disabled text.
- Spacing steps: 4, 8, 12, 16, 24, 32, 48, 72, 112px.
- Radius: 0, 4, 8px.
- Border and shadow: 1px low-contrast rules; no decorative card shadow.
- Motion: 180ms feedback, 560ms reveal, 720ms base intro; delayed hero CTA and final node both complete at 900ms; cubic-bezier(.22,1,.36,1).

## Copy ladder
1. Tension: `운동을 맡긴다는 건, 내 몸의 기준을 함께 세우는 일입니다.`
2. Promise: `내 몸을 믿고 맡길 수 있는 지도자, PT팀장 정인애입니다.`
3. Proof: evaluation-led coaching, self-reliance as the goal, and the four supplied coaching promises—not invented outcomes or metrics.
4. Choice: no plan or price choice is shown until a verified consultation destination exists.
5. Action: a native disabled `상담 준비 중` button with `상담 채널을 준비하고 있습니다.` as the honest current result.

## Screen priorities
1. Identify Jeong In-ae, 1986 Fitness Jichuk, and the evaluation-led coaching promise in the first viewport.
2. Explain the philosophy and four promises through one continuous assessment flow rather than equal cards.
3. End with a truthful consultation-preparing state and no false affordance.

## Behavior that must remain unchanged
- Core Korean copy and the disabled consultation state remain readable without JavaScript.
- The current CTA remains a native disabled button and performs no navigation or external transmission.
- Relative asset paths remain compatible with a GitHub Pages subpath.
- No prices, testimonials, credentials, performance metrics, contact details, gallery placeholder, or unverified media are introduced.
- Future media and consultation configuration can be replaced without restructuring the semantic page.
- `SITE_CONFIG.media.heroVideo` and `heroPoster` are intentionally deferred future-owned-media values: both remain `null`, and `site.js` does not consume them until owned media is supplied. The existing event-driven `[data-project-media]` fallback remains the tested failure contract for that future integration.

## Anti-template decisions
- Generic pattern being rejected: equal-size feature cards, decorative metrics, default shadows, stock fitness imagery, fake testimonials, and a prominent enabled CTA without a real destination.
- Project-specific replacement: a continuous vermilion assessment axis, asymmetric declarations and promise spans, the Coaching Standard Frame, alternating ink/ivory surfaces, and explicit disabled-state copy.

## Responsive and motion contract
- Desktop media behavior: the Coaching Standard Frame occupies the second hero column as a truthful process visualization; no media is implied or loaded.
- Mobile media behavior: the frame moves between identity copy and CTA and its four stages become a horizontal progress composition.
- Mobile promise behavior: the semantic source remains 01→02→03→04, while explicit one-column grid rows produce the approved visual reading order 01→03→02→04 (monitoring → accessible explanation → injury prevention → lifestyle).
- Scroll reveal grammar: eligible items rise 24px and become opaque over 560ms with a 40ms stagger along the assessment line.
- Reduced-motion fallback: all content is immediately visible at final opacity and position; animations and transitions use 0.01ms, one iteration, and no transform.
- Text-clipping viewports: inspect 320px, 360px, 390px, and 430px for horizontal overflow, Korean orphan syllables, CTA wrapping, and heading collisions.

## Verification captures
- `artifacts/qa/desktop-first-viewport.png`: 1440×900 final hero, Coaching Standard Frame, consultation-preparing result, and corrected headline scale.
- `artifacts/qa/desktop-flow.png`: 1425×5082 stitched from actual live viewport captures at scrollY 0, 800, 1600, 2400, 3200, 4000, and 4182; covers header/hero, intro, philosophy, statement, promises, consultation, and footer; visual inspection passed.
- `artifacts/qa/mobile-390-first-viewport.png`: 390×844 intentional horizontal frame, readable Korean copy, full-width CTA, and visible status.
- `artifacts/qa/motion-sequence-01.png`, `02.png`, `03.png`: opening, 300ms assembly, and 900ms final composition.
- Live measurements: document overflow was false at 320/360/390/430×844; coaching columns were respectively `56.75px × 4`, `66.75px × 4`, `72.25px × 4`, and `82.25px × 4`. At mobile widths, the promise grid's explicit rows read `01, 03, 02, 04` (monitoring → accessible explanation → injury prevention → lifestyle); `tests/site-contract.test.mjs` is the source regression contract for those four grid rows.
- Computed font: body used family starts with `"Pretendard Variable"` at desktop and all four mobile widths; browser console errors: `0`.
- Progressive enhancement: raw HTTP 200 HTML contained all seven core copy checks, two native disabled buttons, and both visible status strings without relying on JavaScript.
- Reduced-motion runtime QA: `artifacts/qa/reduced-motion-runtime.png` records the live local page at 1440×900 with URL `?qa-reduced-motion=1`; observed `html[data-qa-reduced-motion="true"]`, `is-ready=true`, native `matchMedia=false`, 3/3 `[data-intro]` and 15/15 `[data-reveal]` nodes at computed opacity 1 and transform `none`, all 15 reveals with `is-visible`, and no horizontal overflow (`scrollWidth=1425`, `innerWidth=1440`). `document.getAnimations` was unavailable in the in-app browser and is not claimed as evidence; the local QA override mechanism and native preference result are explicit.

## Final design quality acceptance
- Rubric score: 52/54. Product fit 6/6; hierarchy/content 6/6; interaction/states 6/6; responsive 6/6; reference translation 6/6; implementation evidence 5/6; expressive craft 5/6; brand/copy/media 6/6; technical integrity 6/6.
- Implementation-evidence deduction: `.records` is a deliberately deferred future contract, not a current implementation artifact or current proof point. The responsive promise-order grid rule and its source regression are current implementation evidence.
- Expressive-craft deduction: current pointer, rule, hover, focus, and reveal feedback is coherent, but the page intentionally has no enabled primary control, so interactive variety remains constrained until a real consultation destination exists.
- Anti-template gate: passed by direct visual inspection. The first viewport has purposeful scale and no accidental majority-empty region; the assessment axis and vermilion nodes have structural roles; promises use asymmetric spans; mobile changes the frame axis from vertical to horizontal instead of only stacking.

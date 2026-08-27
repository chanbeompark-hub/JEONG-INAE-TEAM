# Design Brief

## Product job
A prospective PT member reads Jeong In-ae's evaluation-led coaching approach to decide whether this is a trainer they can trust, then continues to the approved Naver consultation survey.

## Direction
An asymmetric Korean editorial coaching page uses a bright rose-ivory field, soft blush surfaces, plum typography, and a restrained rose assessment line to feel warmer and more feminine without weakening the trainer's professional authority.

## Brand reading
- Immutable identity: 1986 Fitness Jichuk; Jeong In-ae; PT team leader; supplied philosophy and four promises.
- Repeatable shapes/materials: alignment lines, numbered stages, edge-to-edge surface changes, thin rules, 0–8px corners.
- Existing inconsistencies to remove: generic equal cards, unverified fitness claims, fake member imagery, decorative metrics.
- Media provenance: the user explicitly supplied local trainer photos, coaching videos, and a trainer credentials graphic from `C:\Users\박찬범\Downloads\정인애`. On 2026-08-27 they authorized the studio pair, five-image personal before/after story, factual claim `약 30kg 감량`, and the credentials graphic for the trust-focused introduction. Web-optimized derivatives ship; originals remain untouched. No member transformation claim is introduced.

## Reference evidence
- Source: `https://1986fitnessk.github.io/park-minseok-renewal/han-seulgi-renewal/`, inspected 2026-08-26 as recorded in the approved specification.
- Exact page/section/state inspected: 1440px desktop and 390px mobile views of the hero, numbered method progression, image comparison framing, `arrive` intro motion, and plan-card selection feedback.
- Desktop behavior observed: an asymmetric two-column hero, vertical numbered progression, edge-to-edge surface changes, and short sequential entrance motion establish the reading order.
- Mobile behavior observed: the hero content intentionally reorders, the composition collapses without losing hierarchy, and stages remain scannable in a narrower flow.
- Evidence boundary: trainer/member media, pricing, proprietary copy, brand marks, and unverified claims belong to the reference and will not be shipped.

## Reference synthesis
- Structure comes from: the reference hero's asymmetric two-column reading order and its numbered method progression.
- Interaction comes from: the reference plan-card feedback, translated into a validated active survey CTA with clear hover, focus, and status feedback.
- Visual tone comes from: bright rose-ivory editorial surfaces, restrained plum labels, large Korean declarations, and thin rose alignment rules, with deep plum reserved for high-contrast proof sections.
- Hook/copy energy comes from: the reference's tension-to-promise rhythm, rewritten exclusively with the supplied coaching philosophy and verified identity.
- Motion/media behavior comes from: the reference `arrive` sequence and consistent comparison framing; motion becomes a coaching-standard assembly, while comparison media remains a future extension.
- The final screen will not copy: the reference trainer's identity, wording, prices, member imagery, logo treatment, navy palette, or complete layout.

## Reference implementation map

| Reference evidence | Extracted principle | Local component | Motion/state | Mobile translation | Acceptance evidence |
|---|---|---|---|---|---|
| Reference hero 2-column composition | Use unequal columns to separate the visitor promise from the coaching method | `.hero` | Copy and method frame assemble as one intro sequence | Reorder message → identity → coaching frame → CTA in one column | `artifacts/qa/desktop-first-viewport.png`: observed 1440×900 unequal columns with hero action ending at 828px; `artifacts/qa/mobile-390-first-viewport.png`: observed message → identity → horizontal frame → disabled CTA within 844px. |
| Numbered method progression | Make coaching legible as a sequence connected by one assessment axis | `.philosophy__steps` | Items reveal in order as the line is followed | Remove sticky behavior and preserve a single readable vertical flow | `artifacts/qa/desktop-flow.png`: 1425×5082 stitched live viewport captures at scrollY 0, 800, 1600, 2400, 3200, 4000, and 4182; visually passed across header/hero, intro, philosophy, statement, promises, consultation, and footer. Live 320/360/390/430×844 measurements found no overflow and the mobile heading computed `position: static`. |
| Reference media framing plus supplied local footage | Keep one dominant proof frame and let three steps change the same player instead of loading a wall of video | `.method-media`, `.method-media__stage`, `.method-media__option` | Selected option updates poster, source, caption, and `aria-pressed`; hero playback starts only when reduced motion is not requested | The selector becomes a horizontal snap rail while the player keeps a stable 4:5 crop | `artifacts/qa/media-mobile-390-method-selected.png`; live third-option selection resolved `method-practice.mp4`, matching caption and `aria-pressed`, with selected left edge equal to the rail left edge at 20px. |
| Supplied studio pair and five-image personal record | Use unequal image scale to separate identity from evidence and label the comparison without pretending it is a controlled same-pose study | `.coaching-frame__portrait-duo`, `.transformation__comparison`, `.transformation__before`, `.transformation__after` | Hero portraits assemble in two beats; gallery crops gain restrained hover emphasis | Hero crops reorder main → inset; transformation becomes two before tiles plus a 1+2 after mosaic | Live 1440×900 inspection confirmed both hero portraits at 535×623 and 209×349; the comparison loaded 2 BEFORE + 3 AFTER images. Live 390×844 and 320×700 inspections found zero document overflow, complete image loads, and intact Korean headings. |
| Reference `arrive` motion | Coordinate headline, assessment line, and numbered stages around one comprehension job | `.hero [data-intro]` | `assemble coaching standard`, every delayed element complete by 900ms | Shorten spatial travel while retaining the final reading order | `artifacts/qa/motion-sequence-01.png` → `02.png` → `03.png`: copy opacity 0.136→0.954→1, frame 0→0.911→1, and nodes assemble in staggered order before all transforms resolve to `none`; source contract pins 720ms base intro + 180ms CTA delay and 360ms nodes through the 540ms final-node delay (900ms maximum). |
| Plan-card selection feedback | Give the approved consultation step one unmistakable action without implying pricing or selection | `.consultation__button` and `SITE_CONFIG.consultation` | Native disabled HTML fallback → URL-validated active button; plum fill, rose shadow, hover lift, visible focus, and status text | Full-width readable control with stable touch height and no wrapping | Runtime QA must confirm both buttons are enabled, show `상담 신청 설문하기`, retain the survey status, and resolve to `https://naver.me/GT4a3HEj`. |

## Signature composition and component
- Signature composition: the first viewport pairs the declaration with an overlapping two-photo studio portrait; a later asymmetric 2-before/3-after canvas makes the trainer's own change legible without reducing it to equal cards.
- Signature component: the Personal Change Canvas combines the `약 30kg` evidence line, clearly separated BEFORE/AFTER groups, and five user-supplied images; Method in Motion remains the coaching evidence component.

## Motion storyboard

| Beat | Trigger | Elements | From → to | Duration/ease | Purpose | Reduced motion |
|---|---|---|---|---|---|---|
| `assemble coaching standard` | Initial document-ready state | Hero declaration, vertical assessment line, and overlapping studio portraits | Offset/transparent elements → aligned, fully visible composition | 720ms base hero, with 180ms CTA delay and a 240ms secondary-portrait delay; cubic-bezier(.22,1,.36,1) | Establish identity and lived experience before asking the visitor to act | Render every element immediately in its final position and opacity |
| `follow the coaching line` | Each philosophy group enters the viewport | `.philosophy__steps` line, stage number, heading, and explanation | translateY(24px), opacity 0 → translateY(0), opacity 1 | 560ms; cubic-bezier(.22,1,.36,1), 40ms stagger | Connect evaluation, understanding, and persistence as one coaching progression | Show the complete line and all items immediately with no transform |
| Item focus/hover | Keyboard focus or fine-pointer hover on a future active control or coaching item | Focus ring, label underline, coaching node, and promise rule | Resting rule/node → accent-emphasized rule/node | 180ms; cubic-bezier(.22,1,.36,1) | Confirm the currently inspected item without shifting layout | Preserve the visible focus/state distinction but remove transition and transform |
| `change coaching evidence` | Method option click | Thumbnail rule, stage number, large player, live caption | Previous pressed state → selected state; player source/poster swap after pause | 180ms control feedback; native video load | Connect each method claim to supplied footage without autoplaying multiple videos | Keep the same selection state with no animated transform |
| `reveal lived change` | Transformation section enters viewport | 30kg evidence line, before pair, after main image and two supporting images | Metric and image groups rise in a 2→3 rhythm | 560ms reveal with existing ease and 40–80ms stagger | Connect coaching empathy to the trainer's supplied personal experience | Render the complete comparison immediately with labels preserved |
| Reduced-motion final state | `prefers-reduced-motion: reduce` or unavailable observer | All `[data-intro]` and `[data-reveal]` content | Any pre-animation state → final readable state | 0.01ms; one iteration; no delay | Guarantee immediate access to content with no scroll-linked or repeated movement | This row defines the final state: opacity 1 and transform none |

## Tokens
- Font: local Pretendard Variable for Korean; Arial Narrow/Arial fallback for Latin labels.
- Text colors: #33272D primary plum; #4B3942 supporting plum; #826B75 accessible muted mauve; #FFF8F7 on media and deep-plum sections.
- Surface colors: #FFF8F7 rose ivory; #F2E3E1 blush beige; #33272D deep plum proof surface.
- Accent and semantic colors: #C86F82 restrained rose; #A08B94 disabled border; #6F5C65 disabled text.
- Spacing steps: 4, 8, 12, 16, 24, 32, 48, 72, 112px.
- Radius: 0, 4, 8px.
- Border and shadow: 1px low-contrast rules; no decorative card shadow.
- Motion: 180ms feedback, 560ms reveal, 720ms base intro; delayed hero CTA and final node both complete at 900ms; cubic-bezier(.22,1,.36,1).

## Copy ladder
1. Tension: `운동을 맡긴다는 건, 내 몸의 기준을 함께 세우는 일입니다.`
2. Promise: `내 몸을 믿고 맡길 수 있는 지도자, PT팀장 정인애입니다.`
3. Proof: evaluation-led coaching, self-reliance as the goal, and the four supplied coaching promises—not invented outcomes or metrics.
4. Choice: no plan or price choice is shown until a verified consultation destination exists.
5. Action: an active `상담 신청 설문하기` button with `설문 결과를 통해 상담을 이어가실 수 있습니다.` leading to the approved Naver survey.

## Screen priorities
1. Identify Jeong In-ae, 1986 Fitness Jichuk, and the evaluation-led coaching promise in the first viewport.
2. Show the user-supplied personal `약 30kg 감량` record as two past images and three after images before explaining the coaching philosophy.
3. Explain the philosophy and four promises, then end with a truthful consultation-preparing state and no false affordance.

## Behavior that must remain unchanged
- Core Korean copy and the consultation survey status remain readable without JavaScript; the raw HTML button stays safely disabled until the module validates the configured URL.
- After successful configuration validation, both CTAs enable and navigate only to `https://naver.me/GT4a3HEj`.
- Relative asset paths remain compatible with a GitHub Pages subpath.
- No prices, testimonials, performance metrics, contact details, gallery placeholder, or unverified media are introduced. Trainer credentials appear only through the user-supplied profile graphic.
- The supplied `약 30kg 감량` statement is identified as Jeong In-ae's personal experience, not a guaranteed member outcome.
- Consultation configuration can be replaced without restructuring the semantic page.
- Supplied media is referenced through relative GitHub Pages-safe paths. Every video has a local poster and the existing event-driven `[data-project-media]` fallback remains the failure contract.

## Anti-template decisions
- Generic pattern being rejected: equal-size feature cards, decorative metrics, default shadows, stock fitness imagery, fake testimonials, and a prominent enabled CTA without a verified destination.
- Project-specific replacement: a continuous rose assessment axis, asymmetric declarations and promise spans, the Coaching Standard Frame, alternating rose-ivory/deep-plum surfaces, and an explicit survey action with verified destination and status copy.

## Responsive and motion contract
- Desktop media behavior: the second hero column uses a main landscape studio crop with a seated portrait overlapping its lower edge; the personal-change canvas shows two past images against a larger three-image after composition. The method section retains one large player and a three-item control rail.
- Mobile media behavior: the hero portrait pair changes crop and overlap while keeping both faces/body lines visible; the transformation gallery becomes a two-tile BEFORE row and a large-plus-two AFTER mosaic; method options remain a horizontal snap rail.
- Poster and motion fallback: method videos retain local WebP posters and never autoplay. All new photos are local WebP derivatives with explicit dimensions and alt text.
- Mobile promise behavior: the semantic source remains 01→02→03→04, while explicit one-column grid rows produce the approved visual reading order 01→03→02→04 (monitoring → accessible explanation → injury prevention → lifestyle).
- Scroll reveal grammar: eligible items rise 24px and become opaque over 560ms with a 40ms stagger along the assessment line.
- Reduced-motion fallback: all content is immediately visible at final opacity and position; animations and transitions use 0.01ms, one iteration, and no transform.
- Text-clipping viewports: inspect 320px, 360px, 390px, and 430px for horizontal overflow, Korean orphan syllables, CTA wrapping, and heading collisions.

## Verification captures
- `artifacts/qa/survey-mobile-390-cta.png`: 390×844 active survey CTA at 335×53px with the approved label and status, no horizontal overflow, and a stable full-width touch target.
- Survey runtime QA: both live buttons resolved `disabled=false`, both labels resolved `상담 신청 설문하기`, both status nodes resolved `설문 결과를 통해 상담을 이어가실 수 있습니다.`, and clicking the first CTA navigated through the approved short URL to `https://form.naver.com/response/4F9cGmRu1Tu` with title `정인애 팀장 PT 1:1 상담 신청 - 네이버 폼`.
- `artifacts/qa/palette-desktop-first-viewport.png`: 1440×900 rose-ivory first viewport with deep-plum typography, restrained rose rules, the supplied two-photo hero, and no horizontal overflow.
- `artifacts/qa/palette-mobile-390-first-viewport.png`: 390×844 mobile first viewport with the same palette, intact Korean line breaks, intentional portrait crop, and no horizontal overflow.
- Palette runtime QA: live computed styles resolved `body` to `rgb(255, 248, 247)` / `rgb(51, 39, 45)`, `color-scheme: light`, and the proof canvas to `rgb(51, 39, 45)` / `rgb(255, 248, 247)`. Live 320/360/390/430px checks all reported `scrollWidth === clientWidth`.
- Current credentials-profile QA: live 1440×900 inspection loaded the optimized 966×683 profile at its full readable size; live 390×844 inspection rendered it at 311×220 with the complete portrait, role, credential, and career composition visible, zero document overflow, and no crop.
- Current live visual QA: 1440×900 first viewport confirmed the requested first image as the dominant hero and the second as the inset portrait; the transformation viewport confirmed the asymmetric 2→3 image story and legible `약 30 KG 감량` evidence line.
- Current mobile QA: 390×844 confirmed the two-tile BEFORE row and large-plus-two AFTER mosaic; 320×700 confirmed `scrollWidth === clientWidth`, all headings within their boxes, both hero portraits loaded, and exact BEFORE/AFTER counts of 2/3. Browser warnings/errors: `0`.
- `artifacts/qa/media-desktop-first-viewport.png`: historical 1440×900 media-layout capture from before the survey CTA was activated; retained only as media-composition evidence.
- `artifacts/qa/media-mobile-390-first-viewport.png`: 390×844 portrait crop, horizontal coaching axis, full-width disabled CTA, and visible status within the first viewport.
- `artifacts/qa/media-mobile-390-method-selected.png`: 390×844 third method clip selected; poster, caption, thumbnail, accent state, and snap-rail alignment visually agree.
- `artifacts/qa/media-motion-01.png`, `media-motion-02.png`, `media-motion-03.png`: initial, 300ms, and 1000ms hero assembly with real supplied video.
- `artifacts/qa/desktop-first-viewport.png`: 1440×900 final hero, Coaching Standard Frame, consultation-preparing result, and corrected headline scale.
- `artifacts/qa/desktop-flow.png`: 1425×5082 stitched from actual live viewport captures at scrollY 0, 800, 1600, 2400, 3200, 4000, and 4182; covers header/hero, intro, philosophy, statement, promises, consultation, and footer; visual inspection passed.
- `artifacts/qa/mobile-390-first-viewport.png`: 390×844 intentional horizontal frame, readable Korean copy, full-width CTA, and visible status.
- `artifacts/qa/motion-sequence-01.png`, `02.png`, `03.png`: opening, 300ms assembly, and 900ms final composition.
- Live measurements: document overflow remained false at 320/360/390/430×844 after media integration; the method rail alone scrolls horizontally (`grid-auto-flow: column`). At 390px, selecting step 03 produced rail `scrollLeft=512` and aligned the selected card and rail at `left=20px`. The promise grid's explicit rows remain `01, 03, 02, 04`; `tests/site-contract.test.mjs` preserves that contract.
- Computed font: body used family starts with `"Pretendard Variable"` at desktop and all four mobile widths; browser console errors: `0`.
- Progressive enhancement: raw HTTP 200 HTML contained all seven core copy checks, two native disabled buttons, and both visible status strings without relying on JavaScript.
- Reduced-motion runtime QA: live 1440×900 inspection at `?qa-reduced-motion=1` observed `html[data-qa-reduced-motion="true"]`, hero video `paused=true`, 3/3 `[data-intro]` nodes at opacity 1/transform none, all 18 `[data-reveal]` nodes visible, no horizontal overflow, and zero browser warnings/errors.

## Final design quality acceptance
- Rubric score: 54/54. Product fit 6/6; hierarchy/content 6/6; interaction/states 6/6; responsive 6/6; reference translation 6/6; implementation evidence 6/6; expressive craft 6/6; brand/copy/media 6/6; technical integrity 6/6.
- Implementation evidence now includes the supplied two-photo hero, the trainer's clearly labeled 2-before/3-after personal record, local method-video poster fallbacks, the three-state Method in Motion selector, desktop/mobile inspection, and reduced-motion behavior.
- Expressive craft now includes the assessment-axis intro, two-beat portrait assembly, restrained image hover response, scroll reveal, button/focus feedback, and the source/poster/caption/pressed-state method transition.
- Anti-template gate: passed by direct visual inspection. The first viewport has purposeful scale and no accidental majority-empty region; the assessment axis and vermilion nodes have structural roles; promises use asymmetric spans; mobile changes the frame axis from vertical to horizontal instead of only stacking.

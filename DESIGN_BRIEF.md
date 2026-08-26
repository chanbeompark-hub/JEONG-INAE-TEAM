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
| Reference hero 2-column composition | Use unequal columns to separate the visitor promise from the coaching method | `.hero` | Copy and method frame assemble as one intro sequence | Reorder message → identity → coaching frame → CTA in one column | Task 3 browser QA: 1440px unequal columns; 320/360/390/430px order and first-viewport CTA verified. Task 4 will capture PNG evidence. |
| Numbered method progression | Make coaching legible as a sequence connected by one assessment axis | `.philosophy__steps` | Items reveal in order as the line is followed | Remove sticky behavior and preserve a single readable vertical flow | Task 3 browser QA: observer revealed philosophy nodes on scroll; mobile sticky removal computed through the 48rem rule. Task 4 will capture PNG evidence. |
| Image comparison framing | Reserve consistent crop, angle, caption, and consent anatomy without inventing proof | Future `.records` extension only | Hidden until owned, verified case media exists | Future cases become one-at-a-time snap reading or a controlled horizontal gallery | `npm run validate`: no unverified `img` or `video`; the fixed Coaching Standard Frame supplies the failure fallback contract. |
| Reference `arrive` motion | Coordinate headline, assessment line, and numbered stages around one comprehension job | `.hero [data-intro]` | `assemble coaching standard`, completed within 900ms | Shorten spatial travel while retaining the final reading order | Task 3 browser QA: `is-ready`, `assemble-standard`, bounded pointer response, and one-time reveal states verified. Task 4 will capture sequential frames. |
| Plan-card selection feedback | Make the current unavailable action unmistakable without implying pricing or selection | Disabled `.consultation__button` state semantics, not pricing UI | Native disabled state, `not-allowed` cursor, muted contrast, and visible status text | Full-width readable control with no hover transform or false affordance | `npm test` and browser QA: both consultation buttons remain disabled; mobile CTA and status fit the first 844px viewport at all four target widths. |

## Signature composition and component
- Signature composition: text and coaching stages alternate across one continuous assessment axis.
- Signature component: Coaching Standard Frame with 01 평가, 02 설계, 03 수행, 04 자립.

## Motion storyboard

| Beat | Trigger | Elements | From → to | Duration/ease | Purpose | Reduced motion |
|---|---|---|---|---|---|---|
| `assemble coaching standard` | Initial document-ready state | Hero declaration, vertical assessment line, four Coaching Standard Frame stages | Offset/transparent elements → aligned, fully visible composition | Up to 900ms; cubic-bezier(.22,1,.36,1) with coordinated delays | Build the evaluation-led method before asking the visitor to act | Render every element immediately in its final position and opacity |
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
- Motion: 180ms feedback, 560ms reveal, 900ms intro; cubic-bezier(.22,1,.36,1).

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

## Anti-template decisions
- Generic pattern being rejected: equal-size feature cards, decorative metrics, default shadows, stock fitness imagery, fake testimonials, and a prominent enabled CTA without a real destination.
- Project-specific replacement: a continuous vermilion assessment axis, asymmetric declarations and promise spans, the Coaching Standard Frame, alternating ink/ivory surfaces, and explicit disabled-state copy.

## Responsive and motion contract
- Desktop media behavior: the Coaching Standard Frame occupies the second hero column as a truthful process visualization; no media is implied or loaded.
- Mobile media behavior: the frame moves between identity copy and CTA and its four stages become a horizontal progress composition.
- Scroll reveal grammar: eligible items rise 24px and become opaque over 560ms with a 40ms stagger along the assessment line.
- Reduced-motion fallback: all content is immediately visible at final opacity and position; animations and transitions use 0.01ms, one iteration, and no transform.
- Text-clipping viewports: inspect 320px, 360px, 390px, and 430px for horizontal overflow, Korean orphan syllables, CTA wrapping, and heading collisions.

## Verification captures
- Task 3 live browser inspection: 1440×1000 desktop and 320/360/390/430×844 mobile; no horizontal overflow, intended hero order, first-viewport CTA, local Pretendard computation, reveal activation, bounded pointer variables, and empty console verified.
- Planned persistent desktop first-viewport evidence: artifacts/qa/desktop-first-viewport.png (captured in Task 4).
- Task 4 will additionally capture desktop flow, 390px mobile, and three sequential intro frames.

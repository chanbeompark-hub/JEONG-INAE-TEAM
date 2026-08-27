import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';

const indexPath = new URL('../index.html', import.meta.url);

test('semantic page presents verified trainer content and the approved survey action', async () => {
  const html = await readFile(indexPath, 'utf8');

  assert.equal((html.match(/<h1\b/gi) || []).length, 1);

  for (const requiredCopy of [
    'PT팀장 정인애',
    '1986피트니스 지축점',
    '정확한 평가가 올바른 결과를 만듭니다.',
    '혼자서도 운동할 수 있는 자립을 목표로 합니다.',
    '과정은 즐겁게, 결과는 확실하게.',
    '체계적인 모니터링과 피드백',
    '지도 경험 기반의 부상 예방 트레이닝',
    '눈높이에 맞춘 세심하고 다정한 설명',
    '지속 가능한 건강한 라이프스타일 디자인',
    '상담 신청 설문하기',
    '설문 결과를 통해 상담을 이어가실 수 있습니다.'
  ]) {
    assert.ok(html.includes(requiredCopy), `missing required copy: ${requiredCopy}`);
  }

  assert.match(html, /<button\b[^>]*\bdisabled\b[^>]*aria-describedby="consultation-status"/i);
  assert.equal((html.match(/data-hero-portrait/g) || []).length, 2);
  assert.match(
    html,
    /<figure\b[^>]*class="intro__portrait"[^>]*>[\s\S]*?<img\b[^>]*src="\.\/assets\/media\/trainer-credentials\.webp"[^>]*alt="정인애 PT팀장의 자격과 경력을 소개하는 프로필"/i
  );
  assert.match(html, /<section\b[^>]*class="transformation[^>]*aria-labelledby="transformation-title"/i);
  assert.match(html, /aria-label="약 30kg 감량"/i);
  assert.equal((html.match(/data-transformation-image="before"/g) || []).length, 2);
  assert.equal((html.match(/data-transformation-image="after"/g) || []).length, 3);
  assert.match(html, /<section\b[^>]*class="method-media[^>]*aria-labelledby="method-media-title"/i);
  assert.equal((html.match(/data-media-option/g) || []).length, 3);
  assert.match(html, /<img\b[^>]*alt="정인애 PT팀장의 코칭 영상 미리보기/);
  assert.doesNotMatch(html, /http:\/\//i);
  assert.doesNotMatch(html, /https:\/\//i);
  assert.doesNotMatch(html, /\d{1,3}(,\d{3})+원/);
  assert.doesNotMatch(html, /AGENTS\.md/i);
});

test('trainer-owned media is shipped locally with a poster fallback for every video', async () => {
  const html = await readFile(indexPath, 'utf8');
  const expectedAssets = [
    'assets/media/hero-studio-wide.webp',
    'assets/media/hero-studio-seated.webp',
    'assets/media/trainer-credentials.webp',
    'assets/media/transformation-after-studio.webp',
    'assets/media/transformation-after-gym.webp',
    'assets/media/transformation-before-rear.webp',
    'assets/media/transformation-before-lifestyle.webp',
    'assets/media/method-evaluate.mp4',
    'assets/media/method-evaluate-poster.webp',
    'assets/media/method-design.mp4',
    'assets/media/method-design-poster.webp',
    'assets/media/method-practice.mp4',
    'assets/media/method-practice-poster.webp'
  ];

  for (const relativePath of expectedAssets) {
    assert.ok(html.includes(`./${relativePath}`), `media is not referenced: ${relativePath}`);
    await access(new URL(`../${relativePath}`, import.meta.url));
  }

  assert.doesNotMatch(html, /KakaoTalk_|20230408175442|Instagram/i);
});

test('trainer-supplied philosophy and promise details remain complete', async () => {
  const html = await readFile(indexPath, 'utf8');

  for (const requiredDetail of [
    "사람마다 체형, 가동범위, 생활 습관이 모두 다릅니다. 평가 없는 운동은 부상의 위험만 높일 뿐입니다. 정밀한 체형 평가와 움직임 분석을 통해 회원님에게 딱 맞춘 '맞춤형 솔루션'을 제공합니다.",
    'PT 수업이 끝난 후에도 스스로 내 몸을 제어하고 올바른 자세를 잡을 수 있도록, 동작 하나하나의 이유와 원리를 친절하게 이해시켜 드립니다.',
    '무작정 굶거나 몸을 갈아 넣는 극단적인 방식은 지속될 수 없습니다. 회원님의 일상에 자연스럽게 녹아드는 영양 가이드와 단계별 트레이닝으로 요요 없는 건강한 변화를 약속합니다.',
    '수업 시간 외에도 식단 및 개인 운동 루틴을 밀착 관리하며, 매 수업 피드백을 통해 체형 변화와 수행 능력 향상을 눈으로 확인시켜 드립니다.',
    '통증 완화, 재활, 체형 교정부터 고강도 근력 향상 및 다이어트까지 수많은 회원님들을 지도해 온 경험을 바탕으로 부상 없이 안전하게 목적지에 다다르도록 돕습니다.',
    '어려운 웨이트 트레이닝 용어를 쉬운 언어로 풀어 설명해 드리며, 운동이 처음인 입문자분들도 부담 없이 재미를 붙일 수 있도록 분위기를 이끌어갑니다.',
    '단기 다이어트에 그치지 않고, 수업이 종료된 후에도 평생 유지할 수 있는 건강한 식습관과 운동 습관을 만들어 드립니다.'
  ]) {
    assert.ok(html.includes(requiredDetail), `missing trainer-supplied detail: ${requiredDetail}`);
  }
});

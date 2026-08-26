import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const indexPath = new URL('../index.html', import.meta.url);

test('semantic page presents verified trainer content and an inactive consultation state', async () => {
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
    '상담 준비 중',
    '상담 채널을 준비하고 있습니다.'
  ]) {
    assert.ok(html.includes(requiredCopy), `missing required copy: ${requiredCopy}`);
  }

  assert.match(html, /<button\b[^>]*\bdisabled\b[^>]*aria-describedby="consultation-status"/i);
  assert.doesNotMatch(html, /<img\b/i);
  assert.doesNotMatch(html, /<video\b/i);
  assert.doesNotMatch(html, /http:\/\//i);
  assert.doesNotMatch(html, /https:\/\//i);
  assert.doesNotMatch(html, /\d{1,3}(,\d{3})+원/);
  assert.doesNotMatch(html, /AGENTS\.md/i);
});

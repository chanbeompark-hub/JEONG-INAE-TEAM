import test from 'node:test';
import assert from 'node:assert/strict';
import { SITE_CONFIG, resolveConsultationState } from '../assets/js/site-config.js';

test('default consultation state opens the approved Naver survey', () => {
  assert.deepEqual(resolveConsultationState(SITE_CONFIG.consultation), {
    enabled: true,
    label: '상담 신청 설문하기',
    href: 'https://naver.me/GT4a3HEj',
    status: '설문 결과를 통해 상담을 이어가실 수 있습니다.'
  });
});

test('enabled consultation requires a safe explicit URL', () => {
  assert.throws(() => resolveConsultationState({ enabled: true, label: '상담하기', href: '' }), /href/);
  assert.throws(() => resolveConsultationState({ enabled: true, label: '상담하기', href: 'javascript:alert(1)' }), /protocol/);
  assert.equal(resolveConsultationState({ enabled: true, label: '상담하기', href: 'https://example.com' }).enabled, true);
});

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

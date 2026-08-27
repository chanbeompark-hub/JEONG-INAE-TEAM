export const SITE_CONFIG = Object.freeze({
  consultation: Object.freeze({
    enabled: true,
    label: '상담 신청 설문하기',
    href: 'https://naver.me/GT4a3HEj',
    status: '설문 결과를 통해 상담을 이어가실 수 있습니다.'
  }),
  media: Object.freeze({
    heroVideo: './assets/media/jeong-in-ae-hero.mp4',
    heroPoster: './assets/media/jeong-in-ae-hero-poster.webp',
    records: Object.freeze([])
  })
});

export function resolveConsultationState(config) {
  const state = {
    enabled: Boolean(config.enabled),
    label: String(config.label || '').trim(),
    href: config.href || null,
    status: String(config.status || '').trim()
  };

  if (!state.enabled) return { ...state, href: null };
  if (!state.href) throw new Error('Enabled consultation requires href');

  const url = new URL(state.href);
  if (!['https:', 'http:', 'tel:'].includes(url.protocol)) {
    throw new Error('Unsupported consultation protocol');
  }

  return state;
}

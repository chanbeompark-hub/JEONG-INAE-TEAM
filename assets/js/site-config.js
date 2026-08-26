export const SITE_CONFIG = Object.freeze({
  consultation: Object.freeze({
    enabled: false,
    label: '상담 준비 중',
    href: null,
    status: '상담 채널을 준비하고 있습니다.'
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

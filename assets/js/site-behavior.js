export function resolveMotionPreference(locationLike, mediaReducedMotion) {
  const localHosts = new Set(['127.0.0.1', 'localhost']);
  const parameters = new URLSearchParams(locationLike?.search || '');
  const qaOverride = localHosts.has(locationLike?.hostname || '')
    && parameters.get('qa-reduced-motion') === '1';

  return {
    reduced: Boolean(mediaReducedMotion || qaOverride),
    qaOverride
  };
}

export function configureConsultationButton(button, consultation, navigate) {
  button.textContent = consultation.label;
  button.disabled = !consultation.enabled;

  if (!consultation.enabled) return;
  if (!consultation.href || typeof navigate !== 'function') {
    throw new Error('Enabled consultation requires navigation behavior');
  }

  button.addEventListener('click', () => navigate(consultation.href));
}

export function showProjectMediaFallback(failedMedia) {
  const wrapper = failedMedia?.closest?.('[data-project-media-frame]');
  const fallback = wrapper?.querySelector?.('[data-project-media-fallback]');
  if (!wrapper || !fallback) return false;

  failedMedia.hidden = true;
  failedMedia.setAttribute?.('aria-hidden', 'true');
  fallback.hidden = false;
  wrapper.dataset.mediaState = 'error';
  return true;
}

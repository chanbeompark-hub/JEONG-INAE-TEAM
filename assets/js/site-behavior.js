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

export function selectMethodMedia(player, captionNode, options, selectedOption) {
  const source = selectedOption?.dataset?.mediaSrc?.trim?.();
  const poster = selectedOption?.dataset?.mediaPoster?.trim?.();
  const caption = selectedOption?.dataset?.mediaCaption?.trim?.();
  if (!player || !captionNode || !source || !poster || !caption) return false;

  player.pause();
  player.src = source;
  player.poster = poster;
  captionNode.textContent = caption;

  for (const option of options) {
    option.setAttribute('aria-pressed', String(option === selectedOption));
  }

  player.load();
  return true;
}

export function revealSelectedMediaOption(option, reducedMotion) {
  if (!option?.scrollIntoView) return false;

  option.scrollIntoView({
    behavior: reducedMotion ? 'auto' : 'smooth',
    block: 'nearest',
    inline: 'start'
  });
  return true;
}

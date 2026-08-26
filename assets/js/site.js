import { SITE_CONFIG, resolveConsultationState } from './site-config.js';

const buttons = [...document.querySelectorAll('.consultation__button')];
const statusNodes = [...document.querySelectorAll('[data-consultation-status]')];
const revealNodes = [...document.querySelectorAll('[data-reveal]')];
const coachingFrame = document.querySelector('.coaching-frame');
const mediaFallback = document.querySelector('[data-media-fallback]');

if (buttons.length && statusNodes.length && revealNodes.length && coachingFrame && mediaFallback) {
  const consultation = resolveConsultationState(SITE_CONFIG.consultation);

  for (const button of buttons) {
    button.textContent = consultation.label;
    button.disabled = !consultation.enabled;
    button.dataset.consultationHref = consultation.href || '';
  }

  for (const statusNode of statusNodes) {
    statusNode.textContent = consultation.status;
  }

  document.documentElement.classList.add('is-ready');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealImmediately = prefersReducedMotion || !('IntersectionObserver' in window);

  if (revealImmediately) {
    for (const node of revealNodes) node.classList.add('is-visible');
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.18 });

    for (const node of revealNodes) revealObserver.observe(node);
  }

  const finePointer = window.matchMedia('(pointer: fine) and (min-width: 48.0625rem)');

  const updatePointer = (event) => {
    const bounds = coachingFrame.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
    coachingFrame.style.setProperty('--pointer-x', String(Math.max(-1, Math.min(1, x))));
    coachingFrame.style.setProperty('--pointer-y', String(Math.max(-1, Math.min(1, y))));
  };

  const resetPointer = () => {
    coachingFrame.style.setProperty('--pointer-x', '0');
    coachingFrame.style.setProperty('--pointer-y', '0');
  };

  if (finePointer.matches && !prefersReducedMotion) {
    coachingFrame.addEventListener('pointermove', updatePointer, { passive: true });
    coachingFrame.addEventListener('pointerleave', resetPointer);
  }

  document.addEventListener('error', (event) => {
    const failedMedia = event.target;
    if (!(failedMedia instanceof Element) || !failedMedia.matches('[data-project-media]')) return;

    mediaFallback.hidden = false;
    failedMedia.replaceWith(mediaFallback);
  }, true);
}

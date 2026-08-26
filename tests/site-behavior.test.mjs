import assert from 'node:assert/strict';
import test from 'node:test';

const behaviorModule = new URL('../assets/js/site-behavior.js', import.meta.url);

test('reduced-motion QA override is accepted only on an explicit local preview URL', async () => {
  const { resolveMotionPreference } = await import(behaviorModule);

  assert.deepEqual(resolveMotionPreference({
    hostname: '127.0.0.1',
    search: '?qa-reduced-motion=1'
  }, false), { reduced: true, qaOverride: true });
  assert.deepEqual(resolveMotionPreference({
    hostname: 'localhost',
    search: '?qa-reduced-motion=1'
  }, false), { reduced: true, qaOverride: true });
  assert.deepEqual(resolveMotionPreference({
    hostname: 'trainer.example.com',
    search: '?qa-reduced-motion=1'
  }, false), { reduced: false, qaOverride: false });
  assert.deepEqual(resolveMotionPreference({
    hostname: '127.0.0.1.example.com',
    search: '?qa-reduced-motion=1'
  }, false), { reduced: false, qaOverride: false });
});

test('media failure reveals the fallback inside its sized wrapper without moving shared heading content', async () => {
  const { showProjectMediaFallback } = await import(behaviorModule);
  const sharedHeadingFallback = { hidden: false, location: 'heading' };
  const wrapperFallback = { hidden: true, location: 'wrapper' };
  const wrapper = {
    dataset: {},
    querySelector(selector) {
      assert.equal(selector, '[data-project-media-fallback]');
      return wrapperFallback;
    }
  };
  const failedMedia = {
    hidden: false,
    closest(selector) {
      assert.equal(selector, '[data-project-media-frame]');
      return wrapper;
    },
    setAttribute() {}
  };

  assert.equal(showProjectMediaFallback(failedMedia), true);
  assert.equal(failedMedia.hidden, true);
  assert.equal(wrapperFallback.hidden, false);
  assert.equal(wrapper.dataset.mediaState, 'error');
  assert.deepEqual(sharedHeadingFallback, { hidden: false, location: 'heading' });
});

test('enabled consultation button navigates to its resolved safe URL', async () => {
  const { configureConsultationButton } = await import(behaviorModule);
  const button = new EventTarget();
  const navigations = [];

  configureConsultationButton(button, {
    enabled: true,
    label: '상담하기',
    href: 'https://example.com/consultation'
  }, (href) => navigations.push(href));

  button.dispatchEvent(new Event('click'));

  assert.equal(button.disabled, false);
  assert.equal(button.textContent, '상담하기');
  assert.deepEqual(navigations, ['https://example.com/consultation']);
});

test('disabled consultation button remains natively disabled and inert', async () => {
  const { configureConsultationButton } = await import(behaviorModule);
  const button = new EventTarget();
  const navigations = [];

  configureConsultationButton(button, {
    enabled: false,
    label: '상담 준비 중',
    href: null
  }, (href) => navigations.push(href));

  button.dispatchEvent(new Event('click'));

  assert.equal(button.disabled, true);
  assert.equal(button.textContent, '상담 준비 중');
  assert.deepEqual(navigations, []);
});

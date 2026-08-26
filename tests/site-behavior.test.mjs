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

test('method selector updates the real player, caption, and pressed state', async () => {
  const { selectMethodMedia } = await import(behaviorModule);
  const events = [];
  const player = {
    src: '',
    poster: '',
    paused: false,
    pause() { events.push('pause'); this.paused = true; },
    load() { events.push('load'); }
  };
  const caption = { textContent: '' };
  const first = {
    dataset: {
      mediaSrc: './assets/media/method-evaluate.mp4',
      mediaPoster: './assets/media/method-evaluate-poster.webp',
      mediaCaption: '움직임을 보고 기준을 세웁니다.'
    },
    setAttribute(name, value) { this[name] = value; }
  };
  const second = {
    dataset: {
      mediaSrc: './assets/media/method-design.mp4',
      mediaPoster: './assets/media/method-design-poster.webp',
      mediaCaption: '목적에 맞게 동작을 조절합니다.'
    },
    setAttribute(name, value) { this[name] = value; }
  };

  assert.equal(selectMethodMedia(player, caption, [first, second], second), true);
  assert.equal(player.src, './assets/media/method-design.mp4');
  assert.equal(player.poster, './assets/media/method-design-poster.webp');
  assert.equal(caption.textContent, '목적에 맞게 동작을 조절합니다.');
  assert.equal(first['aria-pressed'], 'false');
  assert.equal(second['aria-pressed'], 'true');
  assert.deepEqual(events, ['pause', 'load']);
});

test('method selector rejects an incomplete media option without mutating playback', async () => {
  const { selectMethodMedia } = await import(behaviorModule);
  const events = [];
  const player = {
    src: 'original.mp4',
    poster: 'original.webp',
    pause() { events.push('pause'); },
    load() { events.push('load'); }
  };
  const caption = { textContent: 'original' };
  const incomplete = {
    dataset: { mediaSrc: '', mediaPoster: '', mediaCaption: '' },
    setAttribute() {}
  };

  assert.equal(selectMethodMedia(player, caption, [incomplete], incomplete), false);
  assert.equal(player.src, 'original.mp4');
  assert.equal(player.poster, 'original.webp');
  assert.equal(caption.textContent, 'original');
  assert.deepEqual(events, []);
});

test('selected method option aligns to the rail start and removes smooth motion when requested', async () => {
  const { revealSelectedMediaOption } = await import(behaviorModule);
  const calls = [];
  const option = { scrollIntoView(config) { calls.push(config); } };

  assert.equal(revealSelectedMediaOption(option, false), true);
  assert.equal(revealSelectedMediaOption(option, true), true);
  assert.deepEqual(calls, [
    { behavior: 'smooth', block: 'nearest', inline: 'start' },
    { behavior: 'auto', block: 'nearest', inline: 'start' }
  ]);
});

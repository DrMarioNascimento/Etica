const {JSDOM} = require('jsdom');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = path.join(__dirname, '..');
const page = new JSDOM(fs.readFileSync(path.join(root, 'index.html'), 'utf8'));
const markup = page.window.document.getElementById('heroCompass').outerHTML;
assert.equal(page.window.document.querySelectorAll('img[src="assets/icons/balanca.png"]').length, 3);
assert.equal(page.window.document.querySelectorAll('.hero-compass').length, 1);
page.window.close();
const script = fs.readFileSync(path.join(root, 'assets/hero-compass.js'), 'utf8');
const flush = async () => { for (let i = 0; i < 4; i++) await new Promise(setImmediate); };

function setup(options = {}) {
  const dom = new JSDOM(`<body class="modal-open">${markup}</body>`, {url: 'https://example.test/', runScripts: 'outside-only'});
  const w = dom.window, d = w.document, host = d.getElementById('heroCompass');
  const video = host.querySelector('video'), control = host.querySelector('button');
  const motion = new w.EventTarget(), data = new w.EventTarget(), network = new w.EventTarget();
  motion.matches = Boolean(options.motion); data.matches = Boolean(options.reducedData);
  Object.assign(network, {effectiveType: '4g', downlink: 10, saveData: false}, options.network);
  if (!options.unknownNetwork) Object.defineProperty(w.navigator, 'connection', {value: network});
  Object.defineProperty(w.navigator, 'onLine', {value: !options.offline, configurable: true});
  let hidden = false, paused = true, observer, fetches = 0, plays = 0, aborted = 0;
  Object.defineProperty(d, 'hidden', {get: () => hidden});
  Object.defineProperty(video, 'paused', {get: () => paused});
  video.canPlayType = () => options.unsupported ? '' : 'probably';
  video.pause = () => { paused = true; };
  video.play = () => {
    plays++;
    if (options.blockPlayback) return Promise.reject(new Error('NotAllowedError'));
    paused = false;
    video.dispatchEvent(new w.Event('playing'));
    return Promise.resolve();
  };
  w.matchMedia = query => query.includes('reduced-motion') ? motion : data;
  w.IntersectionObserver = class { constructor(fn) { observer = fn; } observe() {} };
  w.URL.createObjectURL = () => 'blob:compass-test';
  const timers = new Map(); let timerID = 0;
  w.setTimeout = (fn, ms) => { const id = ++timerID; timers.set(id, {fn, ms}); return id; };
  w.clearTimeout = id => timers.delete(id);
  w.fetch = (_url, {signal}) => {
    fetches++;
    if (options.pending) return new Promise((_resolve, reject) => signal.addEventListener('abort', () => { aborted++; reject(new Error('AbortError')); }));
    return Promise.resolve({ok: !options.httpError, blob: async () => new w.Blob(['video'], {type: 'video/mp4'})});
  };
  w.eval(script);
  return {
    w, d, dom, host, video, control, motion, network, options,
    get fetches() { return fetches; }, get plays() { return plays; }, get aborted() { return aborted; },
    async show() { observer([{isIntersecting: true}]); d.body.classList.remove('modal-open'); await flush(); },
    async intersect(value) { observer([{isIntersecting: value}]); await flush(); },
    async tabHidden(value) { hidden = value; d.dispatchEvent(new w.Event('visibilitychange')); await flush(); },
    async deadline() { [...timers.values()].find(t => t.ms === 2500).fn(); await flush(); },
    async changeNetwork(values) { Object.assign(network, values); network.dispatchEvent(new w.Event('change')); await flush(); },
    close() { dom.window.close(); }
  };
}

(async () => {
  let h = setup();
  assert.equal(h.fetches, 0, 'No video download behind the opening dialog');
  assert.equal(h.video.getAttribute('src'), null);
  assert.equal(h.video.preload, 'none'); assert(h.video.loop); assert(h.video.hasAttribute('playsinline'));
  await h.show();
  assert.equal(h.fetches, 1); assert(h.host.classList.contains('is-playing')); assert(h.video.muted); assert(!h.control.hidden);
  await h.tabHidden(true); assert(h.video.paused); assert(!h.host.classList.contains('is-playing'));
  await h.tabHidden(false); assert(!h.video.paused); assert.equal(h.fetches, 1);
  h.control.click(); await flush(); assert(h.video.paused); assert(h.control.getAttribute('aria-label').includes('Reproduzir'));
  await h.intersect(false); await h.intersect(true); assert(h.video.paused, 'User pause survives scroll');
  h.control.click(); await flush(); assert(!h.video.paused);
  await h.changeNetwork({effectiveType: '3g'}); assert(h.video.paused); assert(h.control.hidden);
  await h.changeNetwork({effectiveType: '4g'}); assert(!h.video.paused); assert.equal(h.fetches, 1);
  h.motion.matches = true; h.motion.dispatchEvent(new h.w.Event('change')); await flush();
  assert(h.video.paused); assert(!h.host.classList.contains('is-playing'));
  h.close();

  for (const options of [
    {motion: true}, {reducedData: true}, {offline: true}, {unsupported: true},
    {network: {saveData: true}}, {network: {effectiveType: '3g'}},
    {network: {effectiveType: '2g'}}, {network: {downlink: 1}}
  ]) {
    h = setup(options); await h.show(); assert.equal(h.fetches, 0); assert(h.control.hidden);
    assert(!h.host.classList.contains('is-playing')); h.close();
  }
  h = setup({unknownNetwork: true}); await h.show();
  assert.equal(h.fetches, 1); assert(h.host.classList.contains('is-playing')); h.close();

  for (const options of [{httpError: true}, {blockPlayback: true}]) {
    h = setup(options); await h.show(); assert(!h.host.classList.contains('is-playing')); assert(h.control.hidden);
    await h.intersect(false); await h.intersect(true); assert.equal(h.fetches, 1); h.close();
  }
  h = setup({pending: true}); await h.show(); await h.deadline();
  assert.equal(h.aborted, 1); assert(!h.host.classList.contains('is-playing')); assert(h.control.hidden);
  await h.intersect(false); await h.intersect(true); assert.equal(h.fetches, 1, 'No repeated slow downloads'); h.close();

  h = setup({pending: true}); await h.show(); await h.intersect(false);
  assert.equal(h.aborted, 1); h.options.pending = false; await h.intersect(true);
  assert.equal(h.fetches, 2); assert(h.host.classList.contains('is-playing')); h.close();

  h = setup(); await h.show(); h.video.dispatchEvent(new h.w.Event('error')); await flush();
  assert(!h.host.classList.contains('is-playing')); assert(h.control.hidden); h.close();
  console.log('PASS: hero-only replacement; deferred download; fast and unknown connections; slow/offline/data-saving/reduced-motion fallbacks; timeout, network/media/autoplay failures; pause/resume; visibility and scroll; no repeated failed downloads.');
})().catch(error => { console.error(error); process.exitCode = 1; });

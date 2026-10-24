/* Percursos do Bonde no DOM com relógio virtual. Geometria SVG simulada: não é teste visual. */
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const { JSDOM, VirtualConsole } = require('jsdom');
function open(dir, reduced = false) {
  const root = path.resolve(__dirname, '..', dir), errors = [];
  const vc = new VirtualConsole(); vc.on('jsdomError', e => errors.push(e.message));
  const dom = new JSDOM(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), { url: 'https://etica.test/' + dir + '/', runScripts: 'outside-only', virtualConsole: vc });
  const w = dom.window, d = w.document;
  let now = 0, uid = 0; const tasks = new Map();
  const later = (fn, delay, repeat) => { const id = ++uid; tasks.set(id, { fn, at: now + delay, repeat }); return id; };
  w.performance.now = () => now;
  w.requestAnimationFrame = fn => later(() => fn(now), 16, 0);
  w.cancelAnimationFrame = id => tasks.delete(id);
  w.setTimeout = (fn, ms) => later(fn, ms, 0); w.clearTimeout = id => tasks.delete(id);
  w.setInterval = (fn, ms) => later(fn, ms, ms); w.clearInterval = id => tasks.delete(id);
  w.matchMedia = query => ({ matches: query.includes('prefers-reduced-motion') ? reduced : dir === 'dilema-bonde', addEventListener() {}, removeEventListener() {} });
  w.HTMLMediaElement.prototype.play = () => Promise.resolve();
  w.HTMLMediaElement.prototype.pause = () => {};
  w.SVGElement.prototype.getTotalLength = () => 600;
  w.SVGElement.prototype.getPointAtLength = n => ({ x: 620 + n * 580 / 600, y: 300 + n * 50 / 600 });
  w.SVGElement.prototype.getBBox = () => ({ x: 0, y: 0, width: 20, height: 50 });
  w.SVGElement.prototype.getCTM = () => null;
  for (const s of d.scripts) { const src = s.getAttribute('src'); w.eval(src ? fs.readFileSync(path.join(root, src.split('?')[0]), 'utf8') : s.textContent); }
  const tick = ms => { const until = now + ms; let count = 0; while (tasks.size) { const [id, task] = [...tasks].sort((a,b) => a[1].at - b[1].at)[0]; if (task.at > until) break; assert(count++ < 10000); now = task.at; if (task.repeat) task.at += task.repeat; else tasks.delete(id); task.fn(); } now = until; assert.deepEqual(errors, []); };
  const q = s => d.querySelector(s);
  const click = s => { assert(q(s) && !q(s).disabled, s); q(s).click(); assert.deepEqual(errors, []); };
  const input = (s, val) => { q(s).value = val; q(s).dispatchEvent(new w.Event('input', { bubbles: true })); };
  return { dom, w, d, tick, q, click, input };
}
(async () => {
for (const dir of ['dilema-bonde', 'dilema-bonde-mobile']) {
  for (const choice of ['manter', 'desviar', 'omissao']) {
    const { dom, d, q, click, input, tick } = open(dir);
    tick(1000);
    for (const id of ['btnScale', 'btnHelp', 'btnHeart', 'btnFileText']) { click('#' + id); assert(!q('#infoOverlay').classList.contains('hidden')); assert(q('#infoBody').textContent.trim()); click('#infoOk'); }
    click('#btnMap'); click('#freeModeToggle'); input('#scenarioMainSlider', 5); input('#scenarioSideSlider', choice === 'desviar' ? 0 : 2); click('#scenarioOk');
    await Promise.resolve();
    if (dir === 'dilema-bonde') {
      assert(q('.desktop-description').textContent.includes(`${choice === 'desviar' ? 0 : 2} no desvio`));
      click('#labelsToggle'); await Promise.resolve();
      assert(q('.desktop-description').textContent.includes('5 no trilho principal'));
      click('#labelsToggle');
    }
    assert.equal(q('#mainLabel').textContent, '5');
    click('#btnVolume'); input('#volumeSlider', 30); assert.equal(q('#volumeValue').textContent, '30%');
    click('#btnSettings'); click('#loopToggle'); click('#settingsOk');
    click('#timerBtn'); input('#timerSlider', 3); click('#timerPopoverOk');
    if (choice !== 'omissao') click(`[aria-label="${choice === 'manter' ? 'Manter o curso' : 'Desviar o bonde'}"]`);
    else click('[aria-label="Reproduzir"]');
    tick(1000); click('[aria-label="Pausar"]'); const left = q('#timerBtn').textContent; tick(5000); assert.equal(q('#timerBtn').textContent, left);
    click('[aria-label="Reproduzir"]'); tick(8500);
    assert(!q('#ethicsOverlay').classList.contains('hidden'), dir + ': fechamento');
    assert(q('#ethicsTitle').textContent.includes(choice === 'desviar' ? 'desviou' : 'manteve'));
    if (choice === 'desviar') assert(q('#ethicsSub').textContent.includes('não havia ninguém'));
    assert.equal(d.querySelectorAll('.ethics-row').length, 5);
    for (const b of d.querySelectorAll('.ethics-row-percent')) assert(Number.parseFloat(b.textContent) >= 0 && Number.parseFloat(b.textContent) <= 100);
    click('#ethicsOk'); click('[aria-label="Reiniciar"]'); tick(1000);
    assert(!q('[aria-label="Manter o curso"]').disabled);
    dom.window.close();
  }
  // Pausar deve deter também o bonde depois do cronômetro, sem pular o percurso ao retomar.
  for (const elapsed of [8000, 11500]) {
  const { dom, q, click, tick } = open(dir);
  tick(1000); click('[aria-label="Desviar o bonde"]'); tick(elapsed);
  if (elapsed === 11500) assert(q('[aria-label="Desviar o bonde"]').disabled, 'Decisão travada no ponto de não retorno');
  click('[aria-label="Pausar"]'); const position = q('#trolleyGroup').style.transform;
  tick(6000); assert.equal(q('#trolleyGroup').style.transform, position, dir + ': pausa durante deslocamento');
  assert(q('#ethicsOverlay').classList.contains('hidden'));
  click('[aria-label="Reproduzir"]'); tick(6000); assert(!q('#ethicsOverlay').classList.contains('hidden'));
  dom.window.close();
  }
  const reset = open(dir);
  reset.tick(1000); reset.click('[aria-label="Desviar o bonde"]'); reset.tick(8000);
  reset.click('[aria-label="Pausar"]'); reset.click('[aria-label="Reiniciar"]'); reset.tick(1000);
  reset.click('[aria-label="Manter o curso"]'); reset.tick(14000);
  assert(reset.q('#ethicsTitle').textContent.includes('manteve'), 'Reinício limpa animação pausada'); reset.dom.window.close();
  const r = open(dir, true); assert.equal(r.q('#reduceMotionToggle').getAttribute('aria-checked'), 'true', 'Preferência do sistema respeitada'); r.dom.window.close();
  console.log('OK:', dir, 'manter, desviar, omissão, trilho vazio, controles, pausa antes/durante movimento, resultado, reinício e movimento reduzido.');
}
})().catch(error => { console.error(error); process.exitCode = 1; });

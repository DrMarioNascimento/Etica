const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const { JSDOM, VirtualConsole } = require('jsdom');
const root = path.resolve(__dirname, '..');
const pages = ['index.html', 'dilema-bonde/index.html', 'dilema-bonde-mobile/index.html', 'casos-eticos/index.html', 'historias-eticas/index.html', 'percursos-eticos/index.html'];
const seen = new Set(), refs = new Set(), external = new Set();
function visit(file) {
  if (seen.has(file)) return;
  seen.add(file);
  if (!/\.(html|css|js|mjs|svg)$/.test(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  const urls = [...content.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/g), ...content.matchAll(/url\(\s*["']?([^)'"\s]+)["']?\s*\)/g), ...content.matchAll(/(?:from\s+|import\s*\(\s*)["']([^"']+)["']/g), ...content.matchAll(/["']((?:\.\.\/)?assets\/[^"']+\.(?:png|svg|mp3|webp|css|js|mp4))["']/g)].map(m => m[1]);
  for (const u of new Set(urls)) {
    if (/^(#|data:|blob:|mailto:|tel:)/.test(u) || u.includes('${') || u.includes('<')) continue;
    if (/^(https?:)?\/\//.test(u)) { external.add(u); continue; }
    const target = path.resolve(u.startsWith('/') ? root : path.dirname(file), u.replace(/^\//, '').split(/[?#]/)[0]);
    assert(target.startsWith(root + '/'), `Referência fora do site: ${u}`);
    assert(fs.existsSync(target), `${path.relative(root, file)}: referência ausente ${u}`);
    const actual = fs.statSync(target).isDirectory() ? path.join(target, 'index.html') : target;
    assert(fs.existsSync(actual), actual);
    refs.add(path.relative(root, actual)); visit(actual);
  }
}
for (const p of pages) {
  visit(path.join(root, p));
  const dom = new JSDOM(fs.readFileSync(path.join(root, p), 'utf8'));
  const ids = [...dom.window.document.querySelectorAll('[id]')].map(e => e.id);
  assert.equal(new Set(ids).size, ids.length, p + ': IDs duplicados');
  assert(dom.window.document.querySelector('meta[name=viewport]'), p + ': viewport');
  dom.window.close();
}
const errors = [], vc = new VirtualConsole(); vc.on('jsdomError', e => errors.push(e.message));
const dom = new JSDOM(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), { url: 'https://etica.test/', runScripts: 'outside-only', virtualConsole: vc });
const w = dom.window, d = w.document, q = s => d.querySelector(s);
for (const s of d.querySelectorAll('script:not([src])')) w.eval(s.textContent);
w.eval(fs.readFileSync(path.join(root, 'assets/card-motion.js'), 'utf8'));
const key = (value, shiftKey = false) => d.dispatchEvent(new w.KeyboardEvent('keydown', { key: value, shiftKey, bubbles: true, cancelable: true }));
assert.equal(d.activeElement.id, 'welcomeAccept'); key('Tab'); assert.equal(d.activeElement.id, 'welcomeAccept');
q('#welcomeAccept').click(); assert(!d.body.classList.contains('modal-open'));
assert.equal(d.querySelectorAll('.sim-card').length, 4);
for (let i = 1; i <= 3; i++) assert.equal([...d.querySelectorAll('a')].filter(a => a.textContent.trim().startsWith('Abrir Casos Éticas ' + i)).length, 1);
assert.equal(d.querySelectorAll('.trolley-headlight').length, 2);
for (const button of d.querySelectorAll('.art-motion-control')) {
  assert.equal(button.textContent, ''); assert(button.getAttribute('aria-label'));
  button.click(); assert(button.parentElement.classList.contains('motion-paused'));
  button.click(); assert(!button.parentElement.classList.contains('motion-paused'));
}
for (let i = 0; i < 4; i++) {
  const opener = q(`[data-map-open="${i}"]`); opener.focus(); opener.click();
  assert(!q('#mindmapModal').hidden && d.body.classList.contains('modal-open'));
  assert(q('#mindmapImage').src.startsWith('data:image/')); assert(q('#mindmapImage').alt);
  assert.equal(q('.map-tab[aria-pressed=true]').textContent, q('#mindmapTitle').textContent);
  key('Tab', true); assert.equal(d.activeElement.id, 'nextMap');
  key('Tab'); assert.equal(d.activeElement.id, 'closeMindmap');
  const title = q('#mindmapTitle').textContent; key('ArrowRight'); assert.notEqual(q('#mindmapTitle').textContent, title);
  key('ArrowLeft'); assert.equal(q('#mindmapTitle').textContent, title);
  key('Escape'); assert(q('#mindmapModal').hidden); assert.equal(d.activeElement, opener);
}
assert.deepEqual(errors, []);
dom.window.close();
console.log(`OK: ${pages.length} páginas, ${refs.size} arquivos locais referenciados presentes, IDs únicos; abertura, 4 cards, 3 acessos numerados, 4 mapas, navegação por teclado e animações pausáveis. ${external.size} URLs externas inventariadas (sem teste de rede).`);

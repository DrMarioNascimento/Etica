/* Simulação da interface atual do Caso 1. Não mede geometria ou renderização. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { JSDOM, VirtualConsole } = require('jsdom');
const root = path.resolve(__dirname, '..', 'casos-eticos');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const code = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'casos.js'), 'utf8'), ctx);
let journeys = 0, decisions = 0, chapters2 = 0;
const stages = new Set();
const errors = [];

function open(caso, modo, papel, variant) {
  const vc = new VirtualConsole();
  vc.on('jsdomError', e => errors.push(e.message));
  const dom = new JSDOM(html, { url: `https://etica.test/casos-eticos/?caso=${caso.id}&modo=${modo}&papel=${papel}`, runScripts: 'outside-only', virtualConsole: vc });
  const w = dom.window;
  w.CASOS = ctx.window.CASOS;
  w.TEMAS = ctx.window.TEMAS;
  w.scrollTo = () => {};
  w.HTMLElement.prototype.scrollIntoView = () => {};
  w.print = () => {};
  const NativeDate = w.Date;
  w.Date = class extends NativeDate { constructor(...args) { super(...(args.length ? args : [`2026-10-24T10:0${variant}:00Z`])); } };
  w.eval(code);
  return dom;
}

for (const caso of ctx.window.CASOS) {
  const roles = caso.papeis.map(p => ['ol', p.id]).concat([['tc', caso.trajetoria.protagonista]]);
  for (const [modo, papel] of roles) for (let variant = 0; variant < 3; variant++) {
    const dom = open(caso, modo, papel, variant), w = dom.window, d = w.document;
    const q = s => d.querySelector(s);
    const click = s => { const b = typeof s === 'string' ? q(s) : s; assert(b && !b.disabled, `${caso.id}/${modo}/${papel}: botão indisponível ${s}`); b.click(); };
    const set = (s, value, type = 'input') => { q(s).value = value; q(s).dispatchEvent(new w.Event(type, { bubbles: true })); };
    let moves = 0, chosen = 0;
    while (!q('#salvar') && moves++ < 80) {
      stages.add(q('#app .kicker')?.textContent);
      if (!q('#modal').hidden) click('#modalClose');
      const pick = s => { const all = [...d.querySelectorAll(s)].filter(b => !b.disabled); assert(all.length, `${caso.id}: sem opções ${s}`); click(all[(variant + chosen++) % all.length]); };
      if (q('#jOk')) {
        set('#jDec', q('#jDec').options[1].value, 'change');
        set('#jApo', q('#jApo').options[1].value, 'change');
        set('#jTxt', 'Considerei a pessoa atendida e as consequências <b>reais</b>.');
        click('#jOk'); decisions++;
      } else if (q('#irF')) {
        assert(q('#irF').disabled, 'Contraponto exige escolha');
        pick('[data-m]'); set('#mTxt', 'Reavaliaria os fatos e a proteção da pessoa atendida.'); click('#irF');
      } else if (q('[data-f]')) {
        assert(q('[data-act=seguir]').disabled, 'Investigação exige consulta');
        const limit = variant === 0 ? 1 : 4;
        for (let i = 0; i < limit; i++) { const available = [...d.querySelectorAll('[data-f]')].filter(b => !b.hasAttribute('aria-disabled')); if (!available.length) break; click(available[(variant + i) % available.length]); }
        click('[data-act=seguir]');
      } else {
        const next = ['#rSeg', '#irDec', '#irCons', '#irE', '#irFim'].find(s => q(s));
        if (next) click(next);
        else if (q('[data-c]')) { pick('[data-c]'); chapters2++; }
        else { const choice = ['[data-imp]', '[data-t]', '[data-o]', '[data-i]', '[data-r]'].find(s => q(s)); assert(choice, `${caso.id}: tela sem continuação: ${q('#app').textContent.slice(0, 250)}`); pick(choice); }
      }
      assert(!/undefined|\[object Object\]/.test(q('#app').textContent), `${caso.id}: conteúdo não resolvido`);
    }
    assert(q('#salvar'), `${caso.id}: não chegou ao final`);
    assert(q('.impulso-escolha') && q('.percurso') && q('.radar'), 'Fechamento mostra impulso, escolhas, percurso e lentes');
    const phrase = 'Assumo a responsabilidade <img src=x onerror=alert(1)>.';
    if (modo === 'tc') { set('#q1', phrase); set('#q2', 'A pessoa atendida'); set('#q3', 'Reparar o dano e acompanhar'); }
    else set('#assumo', phrase);
    click('#salvar');
    const memory = JSON.parse(w.localStorage.getItem('casosEticos.v2'));
    assert.equal(memory.caderno.length, 1);
    assert.equal(modo === 'tc' ? memory.caderno[0].tc.proteger : memory.caderno[0].assumo, phrase);
    const journeyCode = q('.codigo-valor').textContent;
    assert(w.__casos.lerCodigo(journeyCode), 'Código de jornada recuperável');
    click('#cad');
    assert(!q('#app img[onerror]'), 'Caderno deve escapar texto do aluno');
    assert(q('#app').textContent.includes(phrase));
    click('#imp'); click('#v');
    assert.equal(d.querySelectorAll('[data-tema]').length, ctx.window.TEMAS.length);
    assert.equal(errors.length, 0, errors.join('\n'));
    journeys++;
    dom.window.close();
  }
}
console.log(`OK: ${ctx.window.CASOS.length} casos, ${journeys} percursos completos, ${decisions} decisões, ${chapters2} continuações de duas semanas; investigação, justificativas, fechamento, caderno, código e escape HTML. Telas: ${[...stages].filter(Boolean).join(', ')}.`);

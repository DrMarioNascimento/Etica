/* Casos Éticos — motor do jogo (modelo de rotas e desfechos).
   Dados em casos.js (window.CASOS, window.TEMAS). Sem login: memória do navegador + código de jornada. */
(function () {
  'use strict';

  const CASOS = (window.CASOS || []).slice().sort((a, b) => a.id.localeCompare(b.id));
  const TEMAS = window.TEMAS || [];
  const app = document.getElementById('app');
  const stepsEl = document.getElementById('steps');

  const LENTES = {
    bonde: [
      ['U', 'Utilitarismo', 'pesa as consequências para todos os envolvidos'],
      ['V', 'Virtudes', 'pergunta o que faria uma pessoa íntegra e prudente naquele lugar'],
      ['I', 'Intenção', 'examina o motivo e o meio escolhido, não só o resultado'],
      ['E', 'Existencialismo', 'olha para a liberdade situada: o que você podia escolher e assumiu'],
      ['C', 'Complexidade', 'reconhece que vários bens reais estavam em jogo ao mesmo tempo']
    ],
    rel: [
      ['U', 'Utilitarismo', 'pesa as consequências para todos os envolvidos'],
      ['D', 'Deontologia', 'examina deveres, regras e compromissos assumidos'],
      ['V', 'Virtudes', 'pergunta o que faria uma pessoa íntegra e prudente'],
      ['Cu', 'Cuidado', 'olha para a relação e para quem está vulnerável'],
      ['J', 'Justiça e equidade', 'examina como riscos e benefícios foram distribuídos']
    ]
  };
  const ENFASES = {
    escuta: 'Ênfase deste episódio: escuta. Você pode consultar uma fonte a mais, e o mapa de atores abre na hora de decidir.',
    argumentacao: 'Ênfase deste episódio: argumentação. Justificar a decisão e responder à objeção fazem parte do caminho.',
    reparacao: 'Ênfase deste episódio: reparação. O que fica em aberto e o contraponto pedem a sua resposta.'
  };
  const ORDEM_ENFASES = ['escuta', 'argumentacao', 'reparacao'];
  const ROTEIRO_OMISSAO = [
    'Havia um dever profissional de agir?',
    'A situação era conhecida ou previsível?',
    'A pessoa tinha competência e autoridade?',
    'Existiam alternativas menos danosas?',
    'O encaminhamento foi adequado e acompanhado?'
  ];
  const PASSOS_OL = ['O que desejo?', 'O que compreendi?', 'O que decidi?', 'O que pretendia?', 'O que aconteceu?', 'O que assumo?'];
  const PASSOS_TC = ['Entrada', 'Exploração', 'Decisão', 'Consequência', 'Conselho', 'Contraponto', 'Capítulo 2', 'Fechamento'];

  /* ---------- utilidades ---------- */
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const porId = id => CASOS.find(c => c.id === id);
  const papelDe = (caso, id) => caso.papeis.find(p => p.id === id);
  const natureza = n => ({ vi: 'Vi', ouvi: 'Ouvi', interpretei: 'Interpretei' }[n] || n);
  function diaDoAno(d) { const ini = new Date(d.getFullYear(), 0, 0); return Math.floor((d - ini) / 86400000); }
  function topo() { try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, 0); } }

  function embaralhar(arr, semente) {
    const a = arr.filter(o => o.id !== 'nao_sei'), fim = arr.filter(o => o.id === 'nao_sei');
    let x = (semente * 9301 + 49297) % 233280;
    for (let i = a.length - 1; i > 0; i--) { x = (x * 9301 + 49297) % 233280; const j = x % (i + 1); [a[i], a[j]] = [a[j], a[i]]; }
    return a.concat(fim);
  }

  /* ---------- memória do navegador ---------- */
  const CHAVE = 'casosEticos.v2';
  function ler() {
    try { return JSON.parse(localStorage.getItem(CHAVE)) || {}; } catch (e) { return {}; }
  }
  function gravar(m) { try { localStorage.setItem(CHAVE, JSON.stringify(m)); } catch (e) { /* sem memória: a roda segue sozinha */ } }
  function memoria() {
    const m = ler();
    m.visitados = m.visitados || [];
    m.caderno = m.caderno || [];
    m.oculos = m.oculos || {};
    m.recentes = m.recentes || [];
    return m;
  }
  const chavePersp = (casoId, p) => casoId + '|' + p.modo + ':' + p.papel;

  /* ---------- a roda ---------- */
  function perspectivas(caso) {
    return caso.papeis.map(p => ({ modo: 'ol', papel: p.id })).concat([{ modo: 'tc', papel: caso.trajetoria.protagonista }]);
  }
  function rodar(tema, agora) {
    const casos = CASOS.filter(c => c.tema === tema);
    if (!casos.length) return null;
    const m = memoria();
    const vistos = new Set(m.visitados);
    const n = casos.length;
    const P = 4;
    const k = agora.getMinutes() + diaDoAno(agora);
    const total = n * P * ORDEM_ENFASES.length;
    let primeiro = null;
    for (let s = 0; s < total; s++) {
      const kk = k + s;
      const caso = casos[kk % n];
      const ps = perspectivas(caso);
      const p = ps[Math.floor(kk / n) % ps.length];
      const enfase = ORDEM_ENFASES[Math.floor(kk / (n * P)) % ORDEM_ENFASES.length];
      const escolha = { caso, persp: p, enfase, k: kk };
      if (!primeiro) primeiro = escolha;
      if (!vistos.has(chavePersp(caso.id, p))) return escolha;
    }
    return primeiro;
  }
  function sortearParametros(caso, k) {
    const out = {};
    (caso.parametros || []).forEach((par, i) => {
      const op = par.opcoes[(k * 7 + i * 3 + caso.id.length) % par.opcoes.length];
      out[par.id] = op.valor;
    });
    return out;
  }
  function motivoDaRoda(caso, persp, m) {
    const p = papelDe(caso, persp.papel);
    const ja = m.visitados.some(v => v.startsWith(caso.id + '|'));
    if (persp.modo === 'tc') return `Desta vez você acompanha a história em dois capítulos, como ${p.nome}. ${ja ? 'Você já esteve neste caso; agora vai ver o que as decisões produzem depois.' : 'As decisões voltam no capítulo seguinte.'}`;
    if (p.recebe) return `Desta vez você entra como ${p.nome}: ${ja ? 'você ainda não viveu este caso pelo lado de quem recebe a decisão.' : 'o lado de quem recebe a decisão.'}`;
    return `Desta vez você entra como ${p.nome}${ja ? ', um lugar que você ainda não ocupou neste caso.' : '.'}`;
  }

  /* ---------- código de jornada ---------- */
  const B32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  function gerarCodigo(m) {
    const bytes = m.recentes.slice(-6).map(v => {
      const [cid, pp] = v.split('|');
      const ci = CASOS.findIndex(c => c.id === cid);
      const caso = CASOS[ci];
      if (!caso) return null;
      const pi = perspectivas(caso).findIndex(p => p.modo + ':' + p.papel === pp);
      return ci * 4 + Math.max(0, pi);
    }).filter(b => b !== null);
    if (!bytes.length) return '';
    let bits = bytes.map(b => b.toString(2).padStart(8, '0')).join('');
    const soma = bytes.reduce((a, b) => a + b, 0) % 32;
    while (bits.length % 5) bits += '0';
    let s = '';
    for (let i = 0; i < bits.length; i += 5) s += B32[parseInt(bits.slice(i, i + 5), 2)];
    s = B32[bytes.length] + s + B32[soma];
    return s.match(/.{1,4}/g).join('-');
  }
  function lerCodigo(txt) {
    const s = String(txt || '').toUpperCase().replace(/[^0-9A-Z]/g, '').replace(/O/g, '0').replace(/[IL]/g, '1');
    if (s.length < 3) return null;
    const n = B32.indexOf(s[0]);
    const corpo = s.slice(1, -1);
    const soma = B32.indexOf(s[s.length - 1]);
    let bits = '';
    for (const ch of corpo) { const v = B32.indexOf(ch); if (v < 0) return null; bits += v.toString(2).padStart(5, '0'); }
    const bytes = [];
    for (let i = 0; i < n; i++) bytes.push(parseInt(bits.slice(i * 8, i * 8 + 8), 2));
    if (bytes.some(isNaN) || bytes.reduce((a, b) => a + b, 0) % 32 !== soma) return null;
    return bytes.map(b => {
      const caso = CASOS[Math.floor(b / 4)];
      if (!caso) return null;
      const p = perspectivas(caso)[b % 4];
      return chavePersp(caso.id, p);
    }).filter(Boolean);
  }

  /* ---------- estado da partida ---------- */
  let S = null;
  function novaPartida(caso, persp, enfase, k) {
    S = {
      caso, persp, modo: persp.modo, papel: papelDe(caso, persp.papel), enfase, k,
      params: sortearParametros(caso, k),
      impulso: null, consultadas: [], tarefa: null, caminho: [], marcas: [],
      justificativas: [], intencao: null, desfecho: null, replica: null, mudaria: null, porqueMudaria: '',
      cap2: null, assumo: '', tc: { proteger: '', custo: '', reduzir: '' }, carimbo: 'EM ABERTO'
    };
    const m = memoria();
    S.motivo = motivoDaRoda(caso, persp, m);
    telaEntrada();
  }
  const valor = obj => (obj && typeof obj === 'object' && !Array.isArray(obj)) ? (obj[Object.values(S.params)[0]] || Object.values(obj)[0]) : obj;
  function fontesDoPapel() {
    return S.caso.fontes.filter(f => (f.papeis || []).includes(S.papel.id) && (!f.so_se || Object.values(S.params).includes(f.so_se)));
  }
  const consultaveis = () => fontesDoPapel().filter(f => f.natureza !== 'interpretei');
  const leiturasProprias = () => fontesDoPapel().filter(f => f.natureza === 'interpretei');
  const corrigiu = f => [].concat(f.corrigida_por || []).some(id => S.consultadas.includes(id));
  const maxConsultas = () => (S.papel.consultas_max || 3) + (S.enfase === 'escuta' ? 1 : 0);

  function passos(i) {
    const lista = S && S.modo === 'tc' ? PASSOS_TC : PASSOS_OL;
    stepsEl.innerHTML = S ? lista.map((t, j) => `<li class="${j < i ? 'done' : j === i ? 'current' : ''}">${esc(t)}</li>`).join('') : '';
  }
  function marca() {
    document.getElementById('brandTitle').textContent = S ? S.caso.titulo : 'Entre o impulso e a escolha';
    document.getElementById('brandSub').textContent = S ? (TEMAS[S.caso.tema - 1] || {}).nome || '' : 'Deliberar sobre condutas, perspectivas e responsabilidades';
  }

  /* ---------- envelope (registro da investigação) ---------- */
  function envelope(opts) {
    opts = opts || {};
    const cons = S.consultadas.map(id => S.caso.fontes.find(f => f.id === id)).filter(Boolean);
    const vistas = cons.filter(f => f.natureza === 'vi');
    const ouvidas = cons.filter(f => f.natureza === 'ouvi');
    const linhas = arr => arr.length ? arr.map(t => `<div class="nb-entry">${t}</div>`).join('') : '<div class="nb-empty">Ainda não investigado.</div>';
    const fatos = vistas.map(f => esc(f.texto));
    const vozes = ouvidas.map(f => esc(f.texto));
    const resp = S.tarefa ? S.caso.piso.map(esc) : [];
    const abertas = leiturasProprias().map(f => {
      const corrigida = corrigiu(f);
      return corrigida ? `<s>${esc(f.texto)}</s> <span class="nb-fix">Corrigida pelo que você ouviu depois.</span>` : `${esc(f.texto)} <span class="nb-fix">Ainda não conferida.</span>`;
    });
    if (S.tarefa === 'nao_sei') abertas.push('Você registrou "não sei" na hora de compreender o caso.');
    if (S.desfecho && opts.final) abertas.push(esc(desfechoAtual().em_aberto));
    const rota = opts.rota ? `<div class="stamp stamp-rota">${esc(opts.rota)}</div>` : '';
    return `<div class="notebook envelope" aria-label="Registro da investigação">
      <div class="notebook-head">
        <div><div class="notebook-title">Registro da investigação</div>
        <div class="notebook-sub">${esc(S.caso.titulo)} · ${esc(S.papel.nome)}</div></div>
        <div class="stamp-col"><div class="stamp ${S.desfecho ? 'closed' : ''}">${esc(S.carimbo)}</div>${rota}</div>
      </div>
      <div class="notebook-body">
        <div><div class="nb-section-label">Fatos observados</div><div class="nb-entries">${linhas(fatos)}</div></div>
        <div><div class="nb-section-label">Vozes envolvidas</div><div class="nb-entries">${linhas(vozes)}</div></div>
        <div><div class="nb-section-label">Responsabilidades</div><div class="nb-entries">${linhas(resp)}</div></div>
        <div><div class="nb-section-label">Questões em aberto</div><div class="nb-entries">${linhas(abertas)}</div></div>
      </div>
    </div>`;
  }

  /* ---------- modais ---------- */
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  function abrirModal(html) { modalBody.innerHTML = html; modal.hidden = false; const b = modal.querySelector('button, [tabindex]'); if (b) b.focus(); }
  function fecharModal() { modal.hidden = true; modalBody.innerHTML = ''; }
  document.getElementById('modalClose').addEventListener('click', fecharModal);
  modal.addEventListener('click', e => { if (e.target === modal) fecharModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) fecharModal(); });
  function mapaAtores() {
    abrirModal(`<div class="kicker">Mapa de atores</div><h2 class="professor-title" id="modalTitle">Quem tem poder, quem está exposto, quem foi ouvido</h2>
      <div class="mapa">${S.caso.mapa_atores.map(a => `<div class="mapa-item"><div class="cast-role">${esc(a.quem)}</div><div class="cast-name">${esc(a.nome)}</div>
      <div class="mapa-linha"><span>Poder</span><b>${esc(a.poder)}</b></div><div class="mapa-linha"><span>Exposição</span><b>${esc(a.exposicao)}</b></div>
      <div class="cast-desc">${esc(a.ouvido)}</div></div>`).join('')}</div>`);
  }
  function matriz(opcao) {
    abrirModal(`<div class="kicker">Matriz intenção–meio–consequência</div><h2 class="professor-title" id="modalTitle">Antes de confirmar</h2>
      <div class="matriz"><div><b>Intenção</b><p>O que você quer alcançar com esta escolha?</p></div>
      <div><b>Meio</b><p>${esc(opcao.texto)}</p></div>
      <div><b>Consequências previsíveis</b><p>Quem ganha, quem perde e o que pode dar errado? Pense em ${esc(S.caso.mapa_atores.filter(a => /alta/i.test(a.exposicao)).map(a => a.nome).join(', ') || 'quem está mais exposto')}.</p></div></div>
      <p class="source-guidance">Prever um efeito negativo não é o mesmo que querê-lo; mas quem prevê responde por tê-lo aceitado.</p>`);
  }

  /* ---------- telas ---------- */
  function telaTemas() {
    S = null; marca(); passos(-1);
    const m = memoria();
    app.innerHTML = `<section class="screen active">
      <div class="kicker">Escolha o campo do caso</div>
      <h1 class="case-title">Onde a decisão ética acontece?</h1>
      <p class="lede theme-intro">Escolha um tema. Cada vez que você entra, o caso e o lugar de onde você o vive mudam.</p>
      <div class="theme-grid">${TEMAS.map((t, i) => {
        const tot = CASOS.filter(c => c.tema === i + 1).length;
        const vistos = new Set(m.visitados.filter(v => porId(v.split('|')[0]) && porId(v.split('|')[0]).tema === i + 1));
        return `<button class="theme-btn" type="button" data-tema="${i + 1}" ${tot ? '' : 'disabled'}>
          <span class="theme-name">${esc(t.nome)}</span>
          <span class="theme-desc">${esc(t.desc)} · ${tot} casos${vistos.size ? ` · ${vistos.size} de ${tot * 4} perspectivas vividas` : ''}</span></button>`;
      }).join('')}</div>
      <div class="btn-row">
        <button class="btn ghost" type="button" data-act="codigo">Tenho um código de jornada</button>
        <button class="btn ghost" type="button" data-act="caderno" ${m.caderno.length ? '' : 'disabled'}>Meu caderno de decisões</button>
      </div>
    </section>`;
    app.querySelectorAll('[data-tema]').forEach(b => b.addEventListener('click', () => {
      const r = rodar(Number(b.dataset.tema), new Date());
      if (r) novaPartida(r.caso, r.persp, r.enfase, r.k);
    }));
    app.querySelector('[data-act=codigo]').addEventListener('click', telaCodigo);
    app.querySelector('[data-act=caderno]').addEventListener('click', telaCaderno);
    topo();
  }

  function telaCodigo() {
    abrirModal(`<div class="kicker">Código de jornada</div><h2 class="professor-title" id="modalTitle">Continuar de onde parou</h2>
      <p class="professor-copy">Digite o código que apareceu no fim do seu último episódio. Ele guarda só os lugares que você já viveu, sem nome nem dados pessoais.</p>
      <div class="professor-field"><label class="professor-label" for="cod">Código</label><input class="professor-password" id="cod" autocomplete="off" maxlength="40" placeholder="Ex.: 3K2P-8QXA-T"></div>
      <div class="professor-actions"><button class="btn" type="button" id="codOk">Continuar</button></div>
      <p class="professor-status" id="codSt" aria-live="polite"></p>`);
    document.getElementById('codOk').addEventListener('click', () => {
      const lista = lerCodigo(document.getElementById('cod').value);
      const st = document.getElementById('codSt');
      if (!lista) { st.textContent = 'Código não reconhecido. Confira as letras e os números.'; st.classList.add('error'); return; }
      const m = memoria();
      lista.forEach(v => { if (!m.visitados.includes(v)) m.visitados.push(v); });
      m.recentes = lista.slice();
      gravar(m);
      st.classList.remove('error');
      st.textContent = `Pronto: ${lista.length} ${lista.length === 1 ? 'perspectiva recuperada' : 'perspectivas recuperadas'}. A roda vai levar você a lugares novos.`;
    });
  }

  function telaEntrada() {
    marca(); passos(0);
    const c = S.caso, p = S.papel;
    const tc = S.modo === 'tc';
    app.innerHTML = `<section class="screen active">
      <div class="kicker">${tc ? 'Trajetórias cruzadas · capítulo 1' : 'Outros lugares'}</div>
      <h1 class="case-title">${esc(c.gancho)}</h1>
      <p class="roda-motivo">${esc(S.motivo)}</p>
      <p class="lede">${esc(c.situacao)}</p>
      ${(c.parametros || []).map(par => { const op = par.opcoes.find(o => o.valor === S.params[par.id]); return op ? `<p class="lede param">${esc(op.texto)}</p>` : ''; }).join('')}
      <div class="papel-card"><div class="cast-role">Seu lugar: ${esc(p.papel)}</div><div class="cast-name">${esc(p.nome)}</div>
        <p class="cast-desc">${esc(p.apresentacao)}</p><p class="papel-fala">${esc(String(p.fala || '').replace(/^["“'”\s]+|["”'“\s]+$/g, ''))}</p></div>
      ${tc && c.trajetoria.capitulo2 && c.trajetoria.capitulo2.pressao ? '' : ''}
      <p class="enfase">${esc(ENFASES[S.enfase])}</p>
      <h2 class="section-title">${tc ? 'Pressão do momento' : 'O que estou desejando?'}</h2>
      <p class="source-guidance">${esc(p.impulso.pergunta)} Registre o primeiro impulso; ele volta no final.</p>
      <div class="decision-grid">${p.impulso.opcoes.map((o, i) => `<button class="decision-card" type="button" data-imp="${esc(o.id)}"><span class="decision-letter">${String.fromCharCode(65 + i) || ''}</span><span class="decision-title">${esc(o.texto)}</span></button>`).join('')}</div>
      <div class="btn-row"><button class="btn ghost" type="button" data-act="voltar">Voltar aos temas</button></div>
    </section>`;
    app.querySelectorAll('[data-imp]').forEach(b => b.addEventListener('click', () => {
      S.impulso = p.impulso.opcoes.find(o => o.id === b.dataset.imp);
      telaInvestigacao();
    }));
    app.querySelector('[data-act=voltar]').addEventListener('click', telaTemas);
    topo();
  }

  function telaInvestigacao() {
    passos(1);
    const lista = consultaveis();
    const max = maxConsultas();
    const usadas = S.consultadas.length;
    const fim = usadas >= max || usadas >= lista.length;
    app.innerHTML = `<section class="screen active">
      <div class="kicker">Investigação</div>
      <h1 class="case-title">O que compreendi?</h1>
      <p class="lede">Escolha com quem falar e o que ler. Você não tem tempo para tudo: cada consulta conta.</p>
      <div class="investig-layout">
        <div class="source-panel">
          <div class="investigation-meter"><span>Consultas</span><b>${usadas} de ${Math.min(max, lista.length)}</b></div>
          <div class="clue-list">${lista.map(f => {
            const aberta = S.consultadas.includes(f.id);
            const bloq = !aberta && fim;
            return `<button class="clue ${aberta ? 'unlocked' : ''} ${bloq ? 'locked' : ''}" type="button" data-f="${esc(f.id)}" ${bloq || aberta ? 'aria-disabled="true"' : ''}>
              <div class="clue-top"><span class="clue-style">${natureza(f.natureza)}</span><span class="clue-check">consultada</span></div>
              <div class="clue-title">${esc(f.quem)}</div>
              ${aberta ? `<div class="clue-feedback">${esc(f.texto)}</div>` : bloq ? '<div class="clue-locked-copy">Sem tempo para esta consulta.</div>' : ''}
            </button>`;
          }).join('')}</div>
        </div>
        <div>${envelope()}</div>
      </div>
      <div class="btn-row"><button class="btn" type="button" data-act="seguir" ${usadas ? '' : 'disabled'}>Já tenho o que preciso</button></div>
    </section>`;
    app.querySelectorAll('[data-f]').forEach(b => b.addEventListener('click', () => {
      if (b.getAttribute('aria-disabled')) return;
      S.consultadas.push(b.dataset.f);
      telaInvestigacao();
    }));
    app.querySelector('[data-act=seguir]').addEventListener('click', telaTarefa);
  }

  function telaTarefa() {
    passos(1);
    const t = S.papel.tarefa || S.caso.tarefa;
    app.innerHTML = `<section class="screen active">
      <div class="kicker">Investigação</div>
      <h1 class="case-title">O que compreendi?</h1>
      <p class="lede">${esc(t.pergunta)}</p>
      <div class="decision-grid">${embaralhar(t.opcoes, S.k).map((o, i) => `<button class="decision-card" type="button" data-t="${esc(o.id)}"><span class="decision-letter">${String.fromCharCode(65 + i)}</span><span class="decision-title">${esc(o.texto)}</span></button>`).join('')}</div>
      <div id="tRet"></div>
    </section>`;
    app.querySelectorAll('[data-t]').forEach(b => b.addEventListener('click', () => {
      const o = t.opcoes.find(x => x.id === b.dataset.t);
      S.tarefa = o.id;
      app.querySelectorAll('[data-t]').forEach(x => x.disabled = true);
      b.classList.add('selected');
      document.getElementById('tRet').innerHTML = `<div class="consequence-box"><p>${esc(o.retorno)}</p></div>
        <div class="investig-layout one">${envelope()}</div>
        <div class="btn-row"><button class="btn" type="button" id="irDec">Decidir</button></div>`;
      document.getElementById('irDec').addEventListener('click', () => telaDecisao(S.papel.inicio));
    }));
    topo();
  }

  function disponivel(o) {
    if (o.requer && !o.requer.every(id => S.consultadas.includes(id))) return false;
    if (o.requer_algum && !o.requer_algum.some(id => S.consultadas.includes(id))) return false;
    if (o.exclui_se && o.exclui_se.some(id => S.consultadas.includes(id))) return false;
    return true;
  }

  function telaDecisao(noId) {
    passos(2);
    const no = S.papel.nos[noId];
    const opcoes = no.opcoes.filter(disponivel);
    app.innerHTML = `<section class="screen active">
      <div class="kicker">Decisão</div>
      <h1 class="case-title">O que decidi?</h1>
      <p class="lede">${esc(valor(no.texto))}</p>
      <div class="btn-row slim"><button class="btn ghost" type="button" data-act="mapa">Mapa de atores: quem tem poder, quem está exposto</button></div>
      <div class="decision-grid">${opcoes.map((o, i) => `<button class="decision-card" type="button" data-o="${esc(o.id)}"><span class="decision-letter">${String.fromCharCode(65 + i)}</span><span class="decision-title">${esc(o.texto)}</span></button>`).join('')}</div>
      ${opcoes.length < no.opcoes.length ? '<p class="source-guidance">Algumas condutas dependem de informações que você não reuniu nesta investigação.</p>' : ''}
      <div id="just"></div>
    </section>`;
    app.querySelector('[data-act=mapa]').addEventListener('click', mapaAtores);
    if (S.enfase === 'escuta' && !S.mapaVisto) { S.mapaVisto = true; mapaAtores(); }
    app.querySelectorAll('[data-o]').forEach(b => b.addEventListener('click', () => {
      app.querySelectorAll('[data-o]').forEach(x => x.classList.toggle('selected', x === b));
      justificar(no, opcoes.find(o => o.id === b.dataset.o), noId);
    }));
    topo();
  }

  function justificar(no, o, noId) {
    const obrig = S.enfase === 'argumentacao';
    const fontes = S.consultadas.map(id => S.caso.fontes.find(f => f.id === id)).filter(Boolean);
    const omissao = (o.marca || []).includes('omissao');
    document.getElementById('just').innerHTML = `<div class="justifica">
      <h2 class="section-title">Por quê?</h2>
      <p class="just-frase">Vou <b>${esc(o.texto.charAt(0).toLowerCase() + o.texto.slice(1).replace(/\.$/, ''))}</b> porque considero decisivo
        <select id="jDec"><option value="">escolha…</option>${S.caso.decisivos.map((d, i) => `<option value="${i}">${esc(d)}</option>`).join('')}</select>,
        apoiado nesta informação: <select id="jApo"><option value="">escolha…</option>${fontes.map(f => `<option value="${esc(f.id)}">${esc(f.quem)}</option>`).join('')}<option value="-">nenhuma das que consultei</option></select>.</p>
      <label class="professor-label" for="jTxt">Uma frase sua (opcional)</label>
      <textarea id="jTxt" rows="2" maxlength="300"></textarea>
      ${omissao ? `<details class="interpretar" open><summary>Roteiro de ação e omissão</summary><div class="interpretar-body"><p>Calar ou não agir também é conduta. Antes de confirmar, responda para si:</p><ul>${ROTEIRO_OMISSAO.map(q => `<li>${esc(q)}</li>`).join('')}</ul></div></details>` : ''}
      <div class="btn-row"><button class="btn ghost" type="button" id="jMat">Matriz intenção–meio–consequência</button>
      <button class="btn" type="button" id="jOk" ${obrig ? 'disabled' : ''}>Confirmar o que faço</button></div>
      ${obrig ? '<p class="source-guidance">Nesta ênfase, complete a justificativa para confirmar.</p>' : ''}
    </div>`;
    const ok = document.getElementById('jOk');
    const chk = () => { if (obrig) ok.disabled = !(document.getElementById('jDec').value && document.getElementById('jApo').value); };
    document.getElementById('jDec').addEventListener('change', chk);
    document.getElementById('jApo').addEventListener('change', chk);
    document.getElementById('jMat').addEventListener('click', () => matriz(o));
    ok.addEventListener('click', () => {
      const di = document.getElementById('jDec').value;
      S.justificativas.push({ no: noId, opcao: o.id, decisivo: di === '' ? null : S.caso.decisivos[Number(di)], apoio: document.getElementById('jApo').value || null, frase: document.getElementById('jTxt').value.trim() });
      S.caminho.push({ no: noId, opcao: o });
      (o.marca || []).forEach(mk => { if (!S.marcas.includes(mk)) S.marcas.push(mk); });
      S.carimbo = 'DECIDIDO';
      const alvo = valor(o.vai);
      const seguir = () => { if (S.papel.nos[alvo]) telaDecisao(alvo); else { S.desfecho = alvo; telaIntencao(); } };
      const resp = o.resposta && (valor(o.resposta.texto) ? o.resposta : null);
      if (resp) telaResposta(resp, seguir); else seguir();
    });
    document.getElementById('just').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function telaResposta(r, seguir) {
    passos(2);
    app.innerHTML = `<section class="screen active">
      <div class="kicker">Resposta</div>
      <h1 class="case-title">${esc(r.quem)} responde</h1>
      <div class="voz outra"><div class="voz-quem">${esc(r.quem)}</div><p class="lede">${esc(valor(r.texto))}</p></div>
      <div class="investig-layout one">${envelope()}</div>
      <div class="btn-row"><button class="btn" type="button" id="rSeg">Continuar</button></div>
    </section>`;
    document.getElementById('rSeg').addEventListener('click', seguir);
    topo();
  }

  function telaIntencao() {
    passos(3);
    app.innerHTML = `<section class="screen active">
      <div class="kicker">Intenção</div>
      <h1 class="case-title">O que pretendia?</h1>
      <p class="lede">Uma boa intenção não torna correta qualquer conduta, e a mesma conduta pode vir de intenções diferentes. O que você queria alcançar?</p>
      <div class="decision-grid">${S.caso.intencoes.map((t, i) => `<button class="decision-card" type="button" data-i="${i}"><span class="decision-letter">${String.fromCharCode(65 + i)}</span><span class="decision-title">${esc(t)}</span></button>`).join('')}</div>
    </section>`;
    app.querySelectorAll('[data-i]').forEach(b => b.addEventListener('click', () => { S.intencao = S.caso.intencoes[Number(b.dataset.i)]; telaDesfecho(); }));
    topo();
  }

  const valeParam = l => !l.so_se || Object.values(S.params).includes(l.so_se);
  const desfechoAtual = () => S.caso.desfechos[S.desfecho];
  function leituraDoPercurso() {
    const cand = S.caso.leituras_percurso.filter(l => l.desfecho === S.desfecho && l.papel === S.papel.id && l.marcas.every(m => S.marcas.includes(m)) && valeParam(l));
    cand.sort((a, b) => b.marcas.length - a.marcas.length);
    return cand[0] || { carimbo_rota: 'SEU PERCURSO', texto: 'Você chegou aqui pelas escolhas que fez.' };
  }

  function telaDesfecho() {
    passos(S.modo === 'tc' ? 3 : 4);
    const d = desfechoAtual();
    S.carimbo = d.carimbo;
    app.innerHTML = `<section class="screen active">
      <div class="kicker">Consequência</div>
      <h1 class="case-title">O que aconteceu?</h1>
      <div class="desfecho"><div class="stamp big closed">${esc(d.carimbo)}</div><h2 class="section-title">${esc(d.titulo)}</h2><p class="lede">${esc(d.texto)}</p>
      <p class="em-aberto ${S.enfase === 'reparacao' ? 'forte' : ''}"><b>Fica em aberto:</b> ${esc(d.em_aberto)}</p></div>
      <div class="btn-row"><button class="btn" type="button" id="irCons">Ouvir o Conselho das Vozes</button></div>
    </section>`;
    document.getElementById('irCons').addEventListener('click', telaConselho);
    topo();
  }

  function telaConselho() {
    passos(S.modo === 'tc' ? 4 : 4);
    const base = S.caso.conselho[S.desfecho];
    const c = (base.por_papel && base.por_papel[S.papel.id]) || base;
    app.innerHTML = `<section class="screen active">
      <div class="kicker">Conselho das Vozes</div>
      <h1 class="case-title">A objeção mais forte</h1>
      <div class="voz"><div class="voz-quem">Uma voz pergunta</div><p class="lede">${esc(c.objecao)}</p></div>
      <details class="voz outra" ${S.papel.recebe ? 'open' : ''}><summary class="voz-quem">Ouvir outra leitura</summary><p>${esc(c.segunda)}</p></details>
      <h2 class="section-title">Sua réplica</h2>
      <div class="decision-grid">${c.replicas.map((r, i) => `<button class="decision-card" type="button" data-r="${i}"><span class="decision-letter">${String.fromCharCode(65 + i)}</span><span class="decision-title">${esc(r.texto)}</span></button>`).join('')}</div>
      <div id="rRet"></div>
    </section>`;
    app.querySelectorAll('[data-r]').forEach(b => b.addEventListener('click', () => {
      const r = c.replicas[Number(b.dataset.r)];
      S.replica = r.texto;
      app.querySelectorAll('[data-r]').forEach(x => x.disabled = true);
      b.classList.add('selected');
      document.getElementById('rRet').innerHTML = `<div class="consequence-box"><p>${esc(r.retorno)}</p></div><div class="btn-row"><button class="btn" type="button" id="irE">E se…?</button></div>`;
      document.getElementById('irE').addEventListener('click', telaContraponto);
    }));
    topo();
  }

  function telaContraponto() {
    passos(S.modo === 'tc' ? 5 : 4);
    const e = S.caso.e_se;
    const obrig = S.enfase === 'reparacao';
    app.innerHTML = `<section class="screen active">
      <div class="kicker">Contraponto</div>
      <h1 class="case-title">${esc(e.texto)}</h1>
      <p class="lede">${esc(e.reflexao)}</p>
      <div class="decision-grid two"><button class="decision-card" type="button" data-m="sim"><span class="decision-title">Minha decisão mudaria</span></button>
      <button class="decision-card" type="button" data-m="nao"><span class="decision-title">Minha decisão não mudaria</span></button></div>
      <label class="professor-label" for="mTxt">Que razão explica isso?${obrig ? '' : ' (opcional)'}</label>
      <textarea id="mTxt" rows="2" maxlength="300"></textarea>
      <div class="btn-row"><button class="btn" type="button" id="irF" disabled>${S.modo === 'tc' ? 'Duas semanas depois' : 'O que assumo?'}</button></div>
    </section>`;
    const ok = document.getElementById('irF');
    const chk = () => { ok.disabled = !S.mudaria || (obrig && !document.getElementById('mTxt').value.trim()); };
    app.querySelectorAll('[data-m]').forEach(b => b.addEventListener('click', () => { S.mudaria = b.dataset.m; app.querySelectorAll('[data-m]').forEach(x => x.classList.toggle('selected', x === b)); chk(); }));
    document.getElementById('mTxt').addEventListener('input', chk);
    ok.addEventListener('click', () => { S.porqueMudaria = document.getElementById('mTxt').value.trim(); if (S.modo === 'tc') telaCapitulo2(); else telaFinal(); });
    topo();
  }

  function telaCapitulo2() {
    passos(6);
    const c2 = S.caso.trajetoria.capitulo2;
    const opcoesC2 = c2.opcoes.filter(o => !o.so_apos || o.so_apos.includes(S.desfecho));
    app.innerHTML = `<section class="screen active">
      <div class="kicker">Trajetórias cruzadas · capítulo 2</div>
      <h1 class="case-title">${esc(c2.titulo)}</h1>
      <p class="lede">${esc(valor(c2.abertura[S.desfecho]))}</p>
      <p class="enfase">${esc(c2.pressao)}</p>
      <div class="decision-grid">${opcoesC2.map((o, i) => `<button class="decision-card" type="button" data-c="${esc(o.id)}"><span class="decision-letter">${String.fromCharCode(65 + i)}</span><span class="decision-title">${esc(o.texto)}</span></button>`).join('')}</div>
      <div id="c2Ret"></div>
    </section>`;
    app.querySelectorAll('[data-c]').forEach(b => b.addEventListener('click', () => {
      const o = opcoesC2.find(x => x.id === b.dataset.c);
      S.cap2 = o;
      app.querySelectorAll('[data-c]').forEach(x => x.disabled = true);
      b.classList.add('selected');
      const d = c2.desfechos[o.vai];
      const txt = valor((d.por_desfecho && d.por_desfecho[S.desfecho]) || d.texto);
      document.getElementById('c2Ret').innerHTML = `<div class="desfecho"><div class="stamp big closed">${esc(d.carimbo)}</div><p class="lede">${esc(txt)}</p></div>
        <div class="btn-row"><button class="btn" type="button" id="irFim">Fechamento</button></div>`;
      document.getElementById('irFim').addEventListener('click', telaFinal);
    }));
    topo();
  }

  /* ---------- escalas ---------- */
  function somar(escala) {
    const lentes = LENTES[escala];
    const ops = S.caminho.map(x => x.opcao).concat(S.cap2 ? [S.cap2] : []);
    const tot = {}, melhor = {};
    lentes.forEach(([k]) => { tot[k] = 0; melhor[k] = null; });
    ops.forEach(o => lentes.forEach(([k]) => {
      const v = (o[escala] || {})[k] || 0;
      tot[k] += v;
      if (v > 0 && (!melhor[k] || v > melhor[k].v)) melhor[k] = { v, por: o.por_que };
    }));
    const n = Math.max(1, ops.length);
    return lentes.map(([k, nome, def]) => ({ k, nome, def, valor: tot[k] / (2 * n), por: melhor[k] && melhor[k].por }));
  }
  function radar(pontos, titulo) {
    const N = pontos.length, R = 88, cx = 190, cy = 130;
    const ang = i => -Math.PI / 2 + i * 2 * Math.PI / N;
    const xy = (i, r) => [cx + r * Math.cos(ang(i)), cy + r * Math.sin(ang(i))];
    const aneis = [0.25, 0.5, 0.75, 1].map(f => `<polygon points="${pontos.map((_, i) => xy(i, R * f).join(',')).join(' ')}" class="r-anel"/>`).join('');
    const eixos = pontos.map((_, i) => `<line x1="${cx}" y1="${cy}" x2="${xy(i, R)[0]}" y2="${xy(i, R)[1]}" class="r-eixo"/>`).join('');
    const vals = pontos.map((p, i) => xy(i, R * (0.5 + p.valor / 2)).join(',')).join(' ');
    const rot = pontos.map((p, i) => { const [x, y] = xy(i, R + 18); return `<text x="${x}" y="${y}" class="r-rot" text-anchor="${x < cx - 5 ? 'end' : x > cx + 5 ? 'start' : 'middle'}">${esc(p.nome)}</text>`; }).join('');
    return `<figure class="radar"><svg viewBox="0 0 380 270" role="img" aria-label="${esc(titulo)}">${aneis}${eixos}<polygon points="${pontos.map((_, i) => xy(i, R * 0.5).join(',')).join(' ')}" class="r-meio"/><polygon points="${vals}" class="r-val"/>${rot}</svg><figcaption>${esc(titulo)}</figcaption></figure>`;
  }
  function leituraLentes(pontos) {
    const ord = pontos.slice().sort((a, b) => b.valor - a.valor);
    if (pontos.every(p => p.valor === 0)) return `<p class="lede">Seu percurso não puxou nenhuma lente para um lado: ele não somou nem tirou razões em nenhuma delas. Isso não quer dizer que nada estava em jogo. Veja na leitura do percurso quem ficou com o custo.</p>`;
    const top = ord.filter(p => p.valor > 0).slice(0, 2).map(p => p.nome);
    return `<p class="lede">${top.length ? `Seu caminho mobilizou sobretudo ${esc(top.join(' e '))}.` : 'Seu caminho pesou mais custos do que razões nas lentes.'}</p>
      <details class="lentes-det"><summary>O que cada lente olhou no seu percurso</summary><ul class="lentes">${ord.map(p => `<li><b>${esc(p.nome)}</b> ${esc(p.def)}. ${p.por && p.valor > 0 ? `No seu percurso: ${esc(p.por)}` : p.valor < 0 ? 'No seu percurso, esta lente aponta um custo da escolha.' : 'Pouco mobilizada neste percurso.'}</li>`).join('')}</ul></details>
      <p class="source-guidance">A área do gráfico não mede quem é mais ético. Mostra quais razões o seu caminho mobilizou.</p>`;
  }

  function registrar(pontos, escala) {
    const m = memoria();
    const k = chavePersp(S.caso.id, S.persp);
    if (!m.visitados.includes(k)) m.visitados.push(k);
    m.recentes.push(k);
    m.recentes = m.recentes.slice(-6);
    m.oculos[S.caso.id] = m.oculos[S.caso.id] || {};
    m.oculos[S.caso.id][S.modo] = { escala, pontos: pontos.map(p => ({ k: p.k, nome: p.nome, valor: p.valor })), desfecho: S.desfecho };
    m.caderno.push({
      quando: new Date().toISOString(), caso: S.caso.id, titulo: S.caso.titulo, modo: S.modo, papel: S.papel.nome,
      impulso: S.impulso && S.impulso.texto, decisoes: S.caminho.map(x => x.opcao.texto), justificativas: S.justificativas,
      intencao: S.intencao, desfecho: desfechoAtual().carimbo, rota: leituraDoPercurso().carimbo_rota,
      mudaria: S.mudaria, porque: S.porqueMudaria, assumo: S.assumo, tc: S.modo === 'tc' ? S.tc : null,
      cap2: S.cap2 ? S.caso.trajetoria.capitulo2.desfechos[S.cap2.vai].carimbo : null
    });
    m.caderno = m.caderno.slice(-80);
    gravar(m);
    return m;
  }

  function verificado() {
    const total = consultaveis().length;
    const corrigidas = leiturasProprias().filter(f => f.corrigida_por && corrigiu(f)).length;
    const pend = leiturasProprias().filter(f => f.corrigida_por && !corrigiu(f)).length;
    const t = S.tarefa === 'certa' ? 'Você cruzou as fontes e chegou ao que elas sustentam.'
      : S.tarefa === 'nao_sei' ? 'Você registrou "não sei" quando faltavam fontes.'
      : 'Sua leitura das fontes ficou parcial; o retorno da tarefa mostrou o que faltava.';
    return `<div class="verificado"><div class="cast-role">O que você verificou</div>
      <p>Consultou ${S.consultadas.length} de ${total} fontes. ${esc(t)}${corrigidas ? ` Corrigiu ${corrigidas === 1 ? 'uma leitura apressada' : corrigidas + ' leituras apressadas'}.` : ''}${pend ? ` ${pend === 1 ? 'Uma leitura apressada ficou' : pend + ' leituras apressadas ficaram'} sem conferir.` : ''}</p></div>`;
  }

  function vividos(m) {
    const ps = perspectivas(S.caso);
    const feitos = ps.filter(p => m.visitados.includes(chavePersp(S.caso.id, p)));
    const nome = p => p.modo === 'tc' ? 'Trajetória · ' + papelDe(S.caso, p.papel).nome : papelDe(S.caso, p.papel).nome;
    const carimbos = m.caderno.filter(e => e.caso === S.caso.id).map(e => e.desfecho);
    return `<div class="vividos"><div class="cast-role">Lugares vividos neste caso: ${feitos.length} de ${ps.length}</div>
      <div class="vividos-lista">${ps.map(p => `<span class="vivido ${feitos.includes(p) ? 'sim' : ''}">${esc(nome(p))}</span>`).join('')}</div>
      ${carimbos.length ? `<div class="vividos-carimbos">${[...new Set(carimbos)].map(c => `<span class="stamp mini closed">${esc(c)}</span>`).join(' ')}</div>` : ''}
      ${feitos.length < ps.length ? '<p class="source-guidance">Na próxima entrada, a roda leva você a um lugar que ainda não viveu.</p>' : ''}</div>`;
  }

  function telaFinal() {
    const tc = S.modo === 'tc';
    passos(tc ? 7 : 5);
    const escala = tc ? 'rel' : 'bonde';
    const pontos = somar(escala);
    const lp = leituraDoPercurso();
    const d = desfechoAtual();
    const outrosTodos = S.caso.leituras_percurso.filter(l => l.desfecho === S.desfecho && valeParam(l) && !(l.papel === S.papel.id && l.carimbo_rota === lp.carimbo_rota));
    const outros = [];
    outrosTodos.filter(l => l.papel !== S.papel.id).concat(outrosTodos.filter(l => l.papel === S.papel.id))
      .forEach(l => { if (outros.length < 3 && !outros.some(o => o.papel === l.papel && l.papel !== S.papel.id)) outros.push(l); });
    const m0 = memoria();
    const jaRegistrado = S.registrado;
    let m = m0;
    if (!jaRegistrado) { m = registrar(pontos, escala); S.registrado = true; }
    const oc = m.oculos[S.caso.id] || {};
    const codigo = gerarCodigo(m);
    app.innerHTML = `<section class="screen active">
      <div class="kicker">${tc ? 'Fechamento' : 'Responsabilidade'}</div>
      <h1 class="case-title">${tc ? 'O que procurei proteger?' : 'O que assumo?'}</h1>
      <div class="final-grid">
        <div>
          <div class="impulso-escolha">
            <div><div class="cast-role">Primeiro impulso</div><p>${esc(S.impulso ? S.impulso.texto : '')}</p></div>
            <div><div class="cast-role">O que você fez</div><p>${S.caminho.map(x => esc(x.opcao.texto)).join('<br>')}</p></div>
          </div>
          ${S.impulso && S.impulso.eco ? `<p class="eco-impulso">${esc(S.impulso.eco)}</p>` : ''}
          <p class="citacao">Entre o impulso e a conduta existe um espaço de reflexão.</p>
          ${verificado()}
          <div class="percurso"><div class="stamp stamp-rota">${esc(lp.carimbo_rota)}</div><p class="lede">${esc(lp.texto)}</p></div>
          ${outros.length ? `<details class="outros"><summary class="section-title">Outros chegaram aqui por outro caminho</summary>${outros.map(l => {
            const p = papelDe(S.caso, l.papel);
            return `<div class="outro"><div class="outro-top"><span class="stamp mini">${esc(l.carimbo_rota)}</span> <span class="cast-role">${l.papel === S.papel.id ? 'Também como ' : 'Como '}${esc(p ? p.nome : '')}</span></div><p>${esc(l.texto)}</p></div>`;
          }).join('')}</details>` : ''}
        </div>
        <div>${envelope({ final: true, rota: lp.carimbo_rota })}</div>
      </div>
      <h2 class="section-title">${tc ? 'Leitura relacional do seu percurso' : 'Escala do Bonde no seu percurso'}</h2>
      <div class="escala">${radar(pontos, tc ? 'Leitura relacional' : 'Escala do Bonde')}${leituraLentes(pontos)}</div>
      ${tc ? `<div class="tres-perguntas">
        <label class="professor-label" for="q1">O que você procurou proteger?</label><textarea id="q1" rows="2" maxlength="400">${esc(S.tc.proteger)}</textarea>
        <label class="professor-label" for="q2">Quem suportou o custo?</label><textarea id="q2" rows="2" maxlength="400">${esc(S.tc.custo)}</textarea>
        <label class="professor-label" for="q3">Como você poderia reduzir esse custo?</label><textarea id="q3" rows="2" maxlength="400">${esc(S.tc.reduzir)}</textarea></div>`
        : `<label class="professor-label" for="assumo">O que você assume por esta escolha?</label><textarea id="assumo" rows="3" maxlength="500">${esc(S.assumo)}</textarea>`}
      <div class="btn-row"><button class="btn ghost" type="button" id="salvar">Guardar no caderno</button><span class="salvo" id="salvo" aria-live="polite"></span></div>
      ${vividos(m)}
      <div class="codigo"><div class="cast-role">Código de jornada</div><div class="codigo-valor">${esc(codigo)}</div>
        <p class="source-guidance">Anote para continuar em outro aparelho ou mostrar ao professor os lugares que você já viveu.</p></div>
      <div class="btn-row">
        <button class="btn" type="button" id="denovo">Entrar de novo neste tema</button>
        ${oc.ol && oc.tc ? '<button class="btn" type="button" id="oculos">O mesmo caso por dois óculos</button>' : ''}
        <button class="btn ghost" type="button" id="temas">Outro tema</button>
        <button class="btn ghost" type="button" id="cad">Caderno de decisões</button>
      </div>
    </section>`;
    document.getElementById('salvar').addEventListener('click', () => {
      const mm = memoria();
      const ult = mm.caderno[mm.caderno.length - 1];
      if (tc) { S.tc = { proteger: document.getElementById('q1').value.trim(), custo: document.getElementById('q2').value.trim(), reduzir: document.getElementById('q3').value.trim() }; if (ult) ult.tc = S.tc; }
      else { S.assumo = document.getElementById('assumo').value.trim(); if (ult) ult.assumo = S.assumo; }
      gravar(mm);
      document.getElementById('salvo').textContent = 'Guardado neste aparelho.';
    });
    document.getElementById('denovo').addEventListener('click', () => { const r = rodar(S.caso.tema, new Date()); if (r) novaPartida(r.caso, r.persp, r.enfase, r.k); });
    document.getElementById('temas').addEventListener('click', telaTemas);
    document.getElementById('cad').addEventListener('click', telaCaderno);
    const bo = document.getElementById('oculos');
    if (bo) bo.addEventListener('click', () => telaOculos(S.caso));
    topo();
  }

  function telaOculos(caso) {
    const oc = memoria().oculos[caso.id];
    if (!oc || !oc.ol || !oc.tc) return;
    const fmt = (escala, p) => { const def = (LENTES[escala].find(l => l[0] === p.k) || [])[2]; return Object.assign({}, p, { def }); };
    const a = oc.ol.pontos.map(p => fmt('bonde', p)), b = oc.tc.pontos.map(p => fmt('rel', p));
    const topoDe = arr => arr.slice().sort((x, y) => y.valor - x.valor);
    const ta = topoDe(a), tb = topoDe(b);
    passos(-1);
    app.innerHTML = `<section class="screen active">
      <div class="kicker">${esc(caso.titulo)}</div>
      <h1 class="case-title">O mesmo caso por dois óculos</h1>
      <p class="lede">Você viveu este caso nos dois modos. Cada escala faz perguntas diferentes: a do Bonde olha para quem decide; a relacional, para quem recebe a decisão.</p>
      <div class="dois">${radar(a, 'Escala do Bonde · Outros lugares')}${radar(b, 'Leitura relacional · Trajetórias cruzadas')}</div>
      <div class="dois-texto">
        <p><b>A escala do Bonde destacou</b> ${esc(ta[0].nome)} e ${esc(ta[1].nome)}. Deixou na sombra ${esc(ta[ta.length - 1].nome)}.</p>
        <p><b>A leitura relacional destacou</b> ${esc(tb[0].nome)} e ${esc(tb[1].nome)}. Deixou na sombra ${esc(tb[tb.length - 1].nome)}.</p>
        <p>Desfechos: ${esc(caso.desfechos[oc.ol.desfecho] ? caso.desfechos[oc.ol.desfecho].carimbo : '')} (Outros lugares) e ${esc(caso.desfechos[oc.tc.desfecho] ? caso.desfechos[oc.tc.desfecho].carimbo : '')} (Trajetórias cruzadas). O que uma leitura viu que a outra não viu?</p>
      </div>
      <div class="btn-row"><button class="btn ghost" type="button" id="v">Voltar</button></div>
    </section>`;
    document.getElementById('v').addEventListener('click', () => (S ? telaFinal() : telaTemas()));
    topo();
  }

  function telaCaderno() {
    const m = memoria();
    passos(-1);
    const itens = m.caderno.slice().reverse();
    const porDec = {};
    m.caderno.forEach(e => (e.justificativas || []).forEach(j => { if (j.decisivo) (porDec[j.decisivo] = porDec[j.decisivo] || []).push(e); }));
    app.innerHTML = `<section class="screen active">
      <div class="kicker">Caderno de decisões</div>
      <h1 class="case-title">O que você decidiu, e por quê</h1>
      <p class="lede">Fica só neste aparelho. Mudar de ideia entre casos pode ser bom: o que importa é a razão.</p>
      ${itens.length ? itens.map(e => `<article class="cad-item">
        <div class="cad-top"><span class="stamp mini closed">${esc(e.desfecho)}</span><span class="stamp mini">${esc(e.rota || '')}</span></div>
        <h2 class="section-title">${esc(e.titulo)}</h2>
        <div class="notebook-sub">${esc(e.modo === 'tc' ? 'Trajetórias cruzadas' : 'Outros lugares')} · ${esc(e.papel)} · ${new Date(e.quando).toLocaleDateString('pt-BR')}</div>
        <p><b>Impulso:</b> ${esc(e.impulso)}</p><p><b>Fez:</b> ${(e.decisoes || []).map(esc).join(' → ')}</p>
        ${(e.justificativas || []).filter(j => j.decisivo).map(j => `<p><b>Decisivo:</b> ${esc(j.decisivo)}${j.frase ? ` — “${esc(j.frase)}”` : ''}</p>`).join('')}
        <p><b>Pretendia:</b> ${esc(e.intencao)}</p>
        ${e.cap2 ? `<p><b>Capítulo 2:</b> ${esc(e.cap2)}</p>` : ''}
        ${e.assumo ? `<p><b>Assumo:</b> ${esc(e.assumo)}</p>` : ''}
        ${e.tc && (e.tc.proteger || e.tc.custo || e.tc.reduzir) ? `<p><b>Protegi:</b> ${esc(e.tc.proteger)}<br><b>Custo:</b> ${esc(e.tc.custo)}<br><b>Reduzir:</b> ${esc(e.tc.reduzir)}</p>` : ''}
      </article>`).join('') : '<p class="nb-empty">Ainda não há decisões registradas neste aparelho.</p>'}
      <div class="btn-row"><button class="btn ghost" type="button" id="v">Voltar aos temas</button><button class="btn ghost" type="button" id="imp" ${itens.length ? '' : 'disabled'}>Imprimir ou salvar em PDF</button></div>
    </section>`;
    document.getElementById('v').addEventListener('click', telaTemas);
    document.getElementById('imp').addEventListener('click', () => window.print());
    topo();
  }

  /* ---------- área do professor: link para a aula ---------- */
  function areaProfessor() {
    abrirModal(`<div class="kicker">Para a aula</div><h2 class="professor-title" id="modalTitle">Link da turma</h2>
      <p class="professor-copy">Fixe um caso para todos. Cada participante cai num lugar diferente pelo minuto em que abre, a menos que você fixe também o modo ou o papel.</p>
      <div class="professor-field"><label class="professor-label" for="pCaso">Caso</label><select id="pCaso">${TEMAS.map((t, i) => `<optgroup label="${esc(t.nome)}">${CASOS.filter(c => c.tema === i + 1).map(c => `<option value="${esc(c.id)}">${esc(c.titulo)}</option>`).join('')}</optgroup>`).join('')}</select></div>
      <div class="professor-field"><label class="professor-label" for="pModo">Modo</label><select id="pModo"><option value="">Roda (sortear)</option><option value="ol">Outros lugares</option><option value="tc">Trajetórias cruzadas</option></select></div>
      <div class="professor-field"><label class="professor-label" for="pPapel">Papel (Outros lugares)</label><select id="pPapel"></select></div>
      <div class="professor-field"><label class="professor-label" for="pLink">Link</label><input class="professor-password" id="pLink" readonly></div>
      <div class="professor-actions"><button class="btn" type="button" id="pCopiar">Copiar link</button></div><p class="professor-status" id="pSt" aria-live="polite"></p>`);
    const sel = id => document.getElementById(id);
    const atualizar = () => {
      const caso = porId(sel('pCaso').value);
      const papelAtual = sel('pPapel').value;
      sel('pPapel').innerHTML = '<option value="">Roda (sortear)</option>' + caso.papeis.map(p => `<option value="${esc(p.id)}">${esc(p.nome)} (${esc(p.papel)})</option>`).join('');
      if (caso.papeis.some(p => p.id === papelAtual)) sel('pPapel').value = papelAtual;
      sel('pPapel').disabled = sel('pModo').value === 'tc';
      const u = new URL(location.href.split('?')[0].split('#')[0]);
      u.searchParams.set('caso', caso.id);
      if (sel('pModo').value) u.searchParams.set('modo', sel('pModo').value);
      if (sel('pPapel').value && sel('pModo').value !== 'tc') u.searchParams.set('papel', sel('pPapel').value);
      sel('pLink').value = u.toString();
    };
    ['pCaso', 'pModo', 'pPapel'].forEach(id => sel(id).addEventListener('change', atualizar));
    atualizar();
    sel('pCopiar').addEventListener('click', () => {
      const t = sel('pLink').value;
      const ok = () => { sel('pSt').textContent = 'Link copiado.'; };
      if (navigator.clipboard) navigator.clipboard.writeText(t).then(ok, () => { sel('pLink').select(); sel('pSt').textContent = 'Selecione e copie o link.'; });
      else { sel('pLink').select(); sel('pSt').textContent = 'Selecione e copie o link.'; }
    });
  }
  document.getElementById('professorTrigger').addEventListener('click', areaProfessor);

  /* ---------- início ---------- */
  function iniciar() {
    const q = new URLSearchParams(location.search);
    const caso = q.get('caso') && porId(q.get('caso'));
    if (caso) {
      const agora = new Date();
      const k = agora.getMinutes() + diaDoAno(agora);
      let ps = perspectivas(caso);
      if (q.get('modo')) ps = ps.filter(p => p.modo === q.get('modo'));
      if (q.get('papel')) ps = ps.filter(p => p.papel === q.get('papel'));
      if (!ps.length) ps = perspectivas(caso);
      const persp = ps[k % ps.length];
      novaPartida(caso, persp, ORDEM_ENFASES[k % 3], k);
      return;
    }
    telaTemas();
  }
  window.__casos = { rodar, gerarCodigo, lerCodigo, perspectivas };
  iniciar();
})();

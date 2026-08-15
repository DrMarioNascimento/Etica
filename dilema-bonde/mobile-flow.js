/* =========================================================
   mobile-flow.js (refatorado)
   Fluxo mobile em 3 fases sobre o bonde-responsivo existente.
   Não altera a lógica da animação nem dos indicadores — apenas
   escuta o evento "bonde:consequencia" disparado pelo motor da
   simulação (ver index.html) quando o impacto acontece.
   ========================================================= */

(function () {
  'use strict';

  const MQ = window.matchMedia('(max-width: 900px)');
  const IMPACT_DELAY_MS = 900;   // pequena espera após o impacto antes de mostrar o resultado
  const FALLBACK_MS = 25000;     // rede de segurança, caso o evento não dispare por algum motivo

  let phase = 'config'; // config | exp | result
  let fallbackTimer = null;

  function isMobile() {
    return MQ.matches || document.body.classList.contains('mf-force');
  }

  function setPhase(next) {
    phase = next;
    document.body.classList.remove('mf-config', 'mf-exp', 'mf-result');
    document.body.classList.add('mf-' + next);

    // .scene-wrap muda de tamanho/proporção nessa troca de classe, mas
    // isso não dispara o evento "resize" da janela — recalcula o
    // tamanho do relógio da torre manualmente, depois do layout assentar
    requestAnimationFrame(() => window.__syncTowerClockSize?.());

    if (next === 'result') {
      openAccordion('metricsAccordion');
      openAccordion('interpretationAccordion');
      // rola até os indicadores
      setTimeout(() => {
        document.getElementById('metricsAccordion')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 200);
    }

    if (next === 'config') {
      openAccordion('peopleAccordion');
      openAccordion('scenarioAccordion');
    }
  }

  function openAccordion(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('is-open');
    const btn = el.querySelector('.accordion-trigger');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  }

  function closeAccordion(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('is-open');
    const btn = el.querySelector('.accordion-trigger');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  function ensureChrome() {
    if (document.querySelector('.mf-start-bar')) return;

    // Barra "Iniciar experiência"
    const startBar = document.createElement('div');
    startBar.className = 'mf-start-bar';
    startBar.innerHTML =
      '<button type="button" class="mf-start-btn" id="mfStartExp">Iniciar experiência</button>';
    document.querySelector('.app')?.appendChild(startBar);

    // Botão voltar (na experiência)
    const back = document.createElement('button');
    back.type = 'button';
    back.className = 'mf-back-config';
    back.id = 'mfBackConfig';
    back.textContent = '← Reconfigurar';
    const controlArea = document.querySelector('.scene-control-area');
    if (controlArea) controlArea.appendChild(back);

    // Ações na tela de resultado
    const resultBar = document.createElement('div');
    resultBar.className = 'mf-result-actions';
    resultBar.innerHTML =
      '<button type="button" class="secondary" id="mfNewRound">Nova rodada</button>' +
      '<button type="button" class="primary" id="mfReconfig">Reconfigurar</button>';
    document.querySelector('.app')?.appendChild(resultBar);

    document.getElementById('mfStartExp')?.addEventListener('click', startExperience);
    document.getElementById('mfBackConfig')?.addEventListener('click', backToConfig);
    document.getElementById('mfReconfig')?.addEventListener('click', backToConfig);
    document.getElementById('mfNewRound')?.addEventListener('click', newRound);
  }

  function startExperience() {
    if (!isMobile()) {
      // no desktop só clica no play nativo
      document.getElementById('btnStart')?.click();
      return;
    }
    setPhase('exp');
    // dispara o iniciar original (contagem + animação)
    document.getElementById('btnStart')?.click();
    armFallback();
  }

  function backToConfig() {
    // reset nativo se existir
    document.getElementById('btnReset')?.click();
    setPhase('config');
    disarmFallback();
  }

  function newRound() {
    document.getElementById('btnReset')?.click();
    setPhase('exp');
    setTimeout(() => {
      document.getElementById('btnStart')?.click();
      armFallback();
    }, 120);
  }

  function armFallback() {
    disarmFallback();
    fallbackTimer = setTimeout(() => {
      if (phase === 'exp') setPhase('result');
    }, FALLBACK_MS);
  }

  function disarmFallback() {
    if (fallbackTimer) clearTimeout(fallbackTimer);
    fallbackTimer = null;
  }

  function goToResult() {
    disarmFallback();
    if (phase !== 'exp') return;
    setTimeout(() => {
      if (phase === 'exp') setPhase('result');
    }, IMPACT_DELAY_MS);
  }

  // Fonte oficial do fim da fase "exp": o próprio motor da simulação
  // avisa quando o bonde chega à consequência (ver dispatchEvent em
  // index.html). Substitui o antigo polling por requestAnimationFrame
  // que tentava adivinhar o fim lendo o texto da tela.
  document.addEventListener('bonde:consequencia', goToResult);

  // Delegação de evento num único listener, em vez de religar um
  // listener por botão toda vez que applyMode roda (isso acontecia
  // a cada resize/orientationchange e acumulava listeners duplicados).
  document.addEventListener(
    'click',
    (ev) => {
      if (phase !== 'exp') return;
      const btn = ev.target.closest('#actionButtons .seg-btn, .decision-rocker .seg-btn');
      if (btn) armFallback();
    },
    { passive: true }
  );

  function applyMode() {
    document.body.classList.add('mf-enabled');
    ensureChrome();

    if (isMobile()) {
      if (phase === 'config' || !phase) setPhase('config');
    } else {
      // desktop: remove classes de fase forçada
      document.body.classList.remove('mf-config', 'mf-exp', 'mf-result');
    }
  }

  function onReady() {
    applyMode();
    if (MQ.addEventListener) {
      MQ.addEventListener('change', applyMode);
    } else if (MQ.addListener) {
      // fallback para Safari antigo
      MQ.addListener(applyMode);
    }
    window.addEventListener('orientationchange', () => setTimeout(applyMode, 200));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();

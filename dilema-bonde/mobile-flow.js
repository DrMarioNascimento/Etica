/* =========================================================
   mobile-flow.js
   Fluxo mobile em 3 fases sobre o bonde-responsivo existente.
   Não altera a lógica da animação nem dos indicadores.
   ========================================================= */

(function () {
  'use strict';

  const MQ = window.matchMedia('(max-width: 900px)');
  let phase = 'config'; // config | exp | result
  let watching = false;

  function isMobile() {
    return MQ.matches || document.body.classList.contains('mf-force');
  }

  function setPhase(next) {
    phase = next;
    document.body.classList.remove('mf-config', 'mf-exp', 'mf-result');
    document.body.classList.add('mf-' + next);

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
    const btn = document.getElementById('btnStart');
    if (btn) btn.click();
    startWatchingEnd();
  }

  function backToConfig() {
    // reset nativo se existir
    document.getElementById('btnReset')?.click();
    setPhase('config');
    stopWatchingEnd();
  }

  function newRound() {
    document.getElementById('btnReset')?.click();
    setPhase('exp');
    setTimeout(() => {
      document.getElementById('btnStart')?.click();
      startWatchingEnd();
    }, 120);
  }

  /* Detecta fim da animação observando o texto de fase / status */
  function startWatchingEnd() {
    stopWatchingEnd();
    watching = true;

    const phaseEl =
      document.querySelector('.phase-card') ||
      document.getElementById('phaseLabel') ||
      document.querySelector('[class*="phase"]');

    const statusEl = document.getElementById('statusText');

    const check = () => {
      if (!watching) return;

      const phaseText = (phaseEl?.textContent || '').toLowerCase();
      const statusText = (statusEl?.textContent || '').toLowerCase();

      const ended =
        /consequ[eê]ncia|avalia[cç][aã]o|desfecho|resultado|atingiu|poupad|salva/.test(
          phaseText + ' ' + statusText
        ) ||
        document.body.classList.contains('run-complete');

      // também: progress visual — se o status mencionar desfecho
      if (ended && phase === 'exp') {
        // pequena espera para a animação de impacto terminar
        setTimeout(() => {
          if (phase === 'exp') setPhase('result');
        }, 900);
        stopWatchingEnd();
        return;
      }
      window.__mfWatchId = requestAnimationFrame(check);
    };

    window.__mfWatchId = requestAnimationFrame(check);

    // fallback por tempo (se a detecção de texto falhar)
    window.__mfFallback = setTimeout(() => {
      if (phase === 'exp') setPhase('result');
      stopWatchingEnd();
    }, 25000);
  }

  function stopWatchingEnd() {
    watching = false;
    if (window.__mfWatchId) cancelAnimationFrame(window.__mfWatchId);
    if (window.__mfFallback) clearTimeout(window.__mfFallback);
  }

  /* Quando o usuário decide (Manter / Desviar), ainda estamos em exp;
     o resultado só vem depois do impacto. */
  function hookDecisionButtons() {
    document.querySelectorAll('#actionButtons .seg-btn, .decision-rocker .seg-btn').forEach((btn) => {
      btn.addEventListener(
        'click',
        () => {
          if (phase === 'exp') startWatchingEnd();
        },
        { passive: true }
      );
    });
  }

  function applyMode() {
    document.body.classList.add('mf-enabled');
    ensureChrome();
    hookDecisionButtons();

    if (isMobile()) {
      if (phase === 'config' || !phase) setPhase('config');
    } else {
      // desktop: remove classes de fase forçada
      document.body.classList.remove('mf-config', 'mf-exp', 'mf-result');
    }
  }

  function onReady() {
    applyMode();
    MQ.addEventListener?.('change', applyMode);
    window.addEventListener('orientationchange', () => setTimeout(applyMode, 200));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();

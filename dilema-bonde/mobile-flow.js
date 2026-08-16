/* =========================================================
   mobile-flow.js (refatorado)
   Fluxo mobile em 3 fases + layout responsivo da cena.
   Layout de personagens só roda em mobile (max-width 900px).
   No desktop nenhum estilo inline é aplicado — CSS original vale.
   ========================================================= */

(function () {
  'use strict';

  const MQ = window.matchMedia('(max-width: 900px)');
  const MQ_PORTRAIT = window.matchMedia('(orientation: portrait)');
  const IMPACT_DELAY_MS = 900;
  const FALLBACK_MS = 25000;

  let phase = 'config'; // config | exp | result
  let fallbackTimer = null;
  let layoutRaf = 0;

  function isMobile() {
    return MQ.matches || document.body.classList.contains('mf-force');
  }

  function isPortrait() {
    return MQ_PORTRAIT.matches;
  }

  /* ---------- Layout da cena (somente mobile + fase exp) ---------- */
  function clearMobileSceneLayout() {
    const ids = ['mainCharGroup', 'sideCharGroup', 'operatorCharGroup'];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.removeProperty('transform');
      el.style.removeProperty('bottom');
      el.style.removeProperty('left');
      el.style.removeProperty('z-index');
      el.style.removeProperty('transform-origin');
    });
    document.querySelectorAll('.trolley, .trolley-shadow').forEach((el) => {
      el.style.removeProperty('transform');
      el.style.removeProperty('z-index');
      el.style.removeProperty('transform-origin');
    });
  }

  function layoutMobileScene() {
    // Desktop ou fora da experiência: limpa overrides e sai
    if (!isMobile() || phase !== 'exp') {
      clearMobileSceneLayout();
      return;
    }

    const scene = document.querySelector('.scene-wrap');
    const controls = document.querySelector('.scene-control-area');
    const main = document.getElementById('mainCharGroup');
    const side = document.getElementById('sideCharGroup');
    const op = document.getElementById('operatorCharGroup');
    const trolley = document.querySelector('.trolley');
    const shadow = document.querySelector('.trolley-shadow');

    if (!scene) return;

    const sh = scene.clientHeight || 1;
    const ctrlH = controls ? controls.offsetHeight : 90;
    const portrait = isPortrait();

    // Linha dos trilhos: acima da barra de controles, com margem
    // No retrato a barra é mais alta; no landscape a cena é mais baixa
    const gap = portrait ? 10 : 6;
    const bottomPx = Math.round(Math.max(ctrlH + gap, sh * (portrait ? 0.13 : 0.1)));

    const scale = portrait ? 0.5 : 0.58;
    const mainLeft = portrait ? '54%' : '72%';

    function place(el, opts) {
      if (!el) return;
      el.style.setProperty('z-index', '1', 'important');
      el.style.setProperty('transform-origin', 'bottom center', 'important');
      if (opts.bottom != null) el.style.setProperty('bottom', opts.bottom, 'important');
      if (opts.left != null) el.style.setProperty('left', opts.left, 'important');
      if (opts.scale != null) {
        el.style.setProperty('transform', 'scale(' + opts.scale + ')', 'important');
      }
    }

    place(main, { bottom: bottomPx + 'px', left: mainLeft, scale: scale });
    place(side, {
      bottom: Math.max(8, bottomPx - (portrait ? 6 : 10)) + 'px',
      scale: scale
    });
    place(op, { scale: scale * 0.92 });

    if (trolley) {
      trolley.style.setProperty('z-index', '1', 'important');
      trolley.style.setProperty('transform-origin', 'bottom left', 'important');
      trolley.style.setProperty(
        'transform',
        'scale(' + (portrait ? 0.72 : 0.85) + ')',
        'important'
      );
    }
    if (shadow) {
      shadow.style.setProperty('z-index', '1', 'important');
      shadow.style.setProperty(
        'transform',
        'scaleX(1.05) scaleY(0.4)',
        'important'
      );
    }
  }

  function scheduleLayout() {
    if (layoutRaf) cancelAnimationFrame(layoutRaf);
    layoutRaf = requestAnimationFrame(() => {
      layoutRaf = 0;
      layoutMobileScene();
      // segundo frame: layout assenta (barra de controles já medível)
      requestAnimationFrame(layoutMobileScene);
    });
  }

  function exitFullscreenAndFocusMode() {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      const leave = document.exitFullscreen || document.webkitExitFullscreen;
      leave?.call(document);
    }
    document.querySelector('.scene-wrap.focus-mode')?.classList.remove('focus-mode');
  }

  function setPhase(next) {
    phase = next;
    document.body.classList.remove('mf-config', 'mf-exp', 'mf-result');
    document.body.classList.add('mf-' + next);

    if (next !== 'exp') {
      exitFullscreenAndFocusMode();
      clearMobileSceneLayout();
    }

    requestAnimationFrame(() => window.__syncTowerClockSize?.());
    scheduleLayout();

    if (next === 'result') {
      openAccordion('metricsAccordion');
      openAccordion('interpretationAccordion');
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

    const startBar = document.createElement('div');
    startBar.className = 'mf-start-bar';
    startBar.innerHTML =
      '<button type="button" class="mf-start-btn" id="mfStartExp">Iniciar experiência</button>';
    document.querySelector('.app')?.appendChild(startBar);

    const back = document.createElement('button');
    back.type = 'button';
    back.className = 'mf-back-config';
    back.id = 'mfBackConfig';
    back.textContent = '← Reconfigurar';
    const controlArea = document.querySelector('.scene-control-area');
    if (controlArea) controlArea.appendChild(back);

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
      document.getElementById('btnStart')?.click();
      return;
    }
    setPhase('exp');
    document.getElementById('btnStart')?.click();
    armFallback();
    // layout depois que a fase e a barra estão no DOM
    setTimeout(scheduleLayout, 50);
    setTimeout(scheduleLayout, 300);
  }

  function backToConfig() {
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
      scheduleLayout();
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

  document.addEventListener('bonde:consequencia', goToResult);

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
      else scheduleLayout();
    } else {
      // desktop: remove classes de fase e limpa qualquer override mobile
      document.body.classList.remove('mf-config', 'mf-exp', 'mf-result');
      phase = 'config';
      clearMobileSceneLayout();
    }
  }

  function onReady() {
    applyMode();

    if (MQ.addEventListener) MQ.addEventListener('change', applyMode);
    else if (MQ.addListener) MQ.addListener(applyMode);

    if (MQ_PORTRAIT.addEventListener) {
      MQ_PORTRAIT.addEventListener('change', () => setTimeout(scheduleLayout, 150));
    } else if (MQ_PORTRAIT.addListener) {
      MQ_PORTRAIT.addListener(() => setTimeout(scheduleLayout, 150));
    }

    window.addEventListener('orientationchange', () => {
      setTimeout(applyMode, 200);
      setTimeout(scheduleLayout, 350);
    });
    window.addEventListener('resize', () => {
      if (isMobile() && phase === 'exp') scheduleLayout();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();

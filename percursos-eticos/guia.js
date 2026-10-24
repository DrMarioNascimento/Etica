/* Guia de progressão — janelas explicativas, uma por etapa.
   Mesma ideia do Comitê (e, antes dele, do MOSAICO): a interface se explica
   aos poucos. Ao entrar numa etapa nova aparece uma janela curta com o que
   fazer ali e o botão "Entendi". Ela só aparece uma vez por etapa neste
   aparelho; o botão "?" (canto inferior) reabre a explicação da etapa atual.

   CÓPIA INDEPENDENTE desta atividade (regra de independência das aplicações
   deste repositório): nada aqui é importado de outra pasta.

   Uso:  const guia = GuiaEtico({ chave, cores });
         guia.etapa('id', { titulo, texto: ['parágrafo', ...] });
         guia.esquecer()  // volta a mostrar todas (ex.: "Rever as explicações") */
(function (global) {
  'use strict';

  function GuiaEtico(opcoes) {
    var o = opcoes || {};
    var chave = o.chave || 'guiaEtico';
    var cores = o.cores || {};
    var vistas = ler();
    var atual = null;
    var aberta = null;
    var voltarFoco = null;

    function ler() {
      try { var v = JSON.parse(localStorage.getItem(chave) || '[]'); return Array.isArray(v) ? v : []; }
      catch (e) { return []; }
    }
    function gravar() { try { localStorage.setItem(chave, JSON.stringify(vistas)); } catch (e) { /* sem armazenamento: só nesta visita */ } }

    /* ---------- estilo próprio (variáveis com o tom de cada atividade) ---------- */
    var css = document.createElement('style');
    css.textContent =
      '.guia-camada{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:flex-end;justify-content:center;padding:12px;' +
      'background:rgba(15,15,20,.55);-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)}' +
      '@media(min-width:640px){.guia-camada{align-items:center}}' +
      '.guia-cartao{width:min(460px,100%);max-height:86vh;overflow:auto;border-radius:22px;padding:22px 22px 18px;' +
      'background:var(--guia-fundo,#fff);color:var(--guia-texto,#1d1d1f);border:2px solid var(--guia-borda,#1d1d1f);' +
      'box-shadow:0 18px 50px rgba(0,0,0,.35);font:16px/1.55 var(--guia-fonte,system-ui,sans-serif);' +
      'animation:guia-entra .22s ease-out}' +
      '@keyframes guia-entra{from{transform:translateY(14px);opacity:0}to{transform:none;opacity:1}}' +
      '@media (prefers-reduced-motion:reduce){.guia-cartao{animation:none}}' +
      '.guia-rotulo{font:700 12px/1.2 var(--guia-fonte-rotulo,ui-monospace,monospace);letter-spacing:.12em;text-transform:uppercase;' +
      'color:var(--guia-destaque,#555);margin:0 0 8px}' +
      '.guia-titulo{font:600 1.5rem/1.2 var(--guia-fonte-titulo,Georgia,serif);margin:0 0 12px;color:var(--guia-texto,#1d1d1f)}' +
      '.guia-cartao p{margin:0 0 10px}' +
      '.guia-cartao b{color:var(--guia-destaque,inherit)}' +
      '.guia-ok{display:block;width:100%;min-height:48px;margin-top:14px;border:0;border-radius:999px;cursor:pointer;' +
      'font:700 1rem/1 var(--guia-fonte,system-ui,sans-serif);background:var(--guia-botao,#1d1d1f);color:var(--guia-botao-texto,#fff);' +
      'box-shadow:inset 0 2px 0 rgba(255,255,255,.25),0 4px 0 var(--guia-botao-borda,rgba(0,0,0,.35))}' +
      '.guia-ok:focus-visible,.guia-ajuda:focus-visible{outline:3px solid var(--guia-destaque,#555);outline-offset:3px}' +
      '.guia-ajuda{position:fixed;right:max(14px,env(safe-area-inset-right));bottom:max(14px,env(safe-area-inset-bottom));' +
      'z-index:2147482000;width:48px;height:48px;border-radius:50%;cursor:pointer;font:700 1.35rem/1 Georgia,serif;' +
      'background:var(--guia-botao,#1d1d1f);color:var(--guia-botao-texto,#fff);border:2px solid var(--guia-fundo,#fff);' +
      'box-shadow:0 6px 18px rgba(0,0,0,.28)}' +
      '.guia-ajuda[hidden]{display:none}' +
      '@media print{.guia-ajuda,.guia-camada{display:none!important}}';
    document.head.appendChild(css);
    var raiz = document.documentElement;
    Object.keys(cores).forEach(function (k) { raiz.style.setProperty('--guia-' + k, cores[k]); });

    /* ---------- botão "?" ---------- */
    var ajuda = document.createElement('button');
    ajuda.type = 'button';
    ajuda.className = 'guia-ajuda';
    ajuda.hidden = true;
    ajuda.textContent = '?';
    ajuda.setAttribute('aria-label', 'Como funciona esta etapa');
    ajuda.title = 'Como funciona esta etapa';
    ajuda.addEventListener('click', function () { if (atual) abrir(atual); });
    function montarAjuda() { if (!ajuda.isConnected) document.body.appendChild(ajuda); }
    if (document.body) montarAjuda(); else document.addEventListener('DOMContentLoaded', montarAjuda);

    function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
    /* **negrito** permitido nos textos, nada mais */
    function marcar(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>'); }

    function fechar() {
      if (!aberta) return;
      if (atual && vistas.indexOf(atual.id) < 0) { vistas.push(atual.id); gravar(); }
      aberta.remove(); aberta = null;
      document.removeEventListener('keydown', teclas, true);
      if (voltarFoco && voltarFoco.focus) { try { voltarFoco.focus(); } catch (e) {} }
    }
    function teclas(e) {
      if (!aberta) return;
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); fechar(); return; }
      if (e.key === 'Tab') { e.preventDefault(); aberta.querySelector('.guia-ok').focus(); }
    }
    function abrir(etapa) {
      if (aberta) aberta.remove();
      voltarFoco = document.activeElement;
      var camada = document.createElement('div');
      camada.className = 'guia-camada';
      camada.innerHTML =
        '<div class="guia-cartao" role="dialog" aria-modal="true" aria-labelledby="guia-titulo">' +
        (etapa.rotulo ? '<p class="guia-rotulo">' + esc(etapa.rotulo) + '</p>' : '') +
        '<h2 class="guia-titulo" id="guia-titulo">' + esc(etapa.titulo) + '</h2>' +
        [].concat(etapa.texto || []).map(function (p) { return '<p>' + marcar(p) + '</p>'; }).join('') +
        '<button type="button" class="guia-ok">' + esc(etapa.botao || 'Entendi') + '</button></div>';
      camada.querySelector('.guia-ok').addEventListener('click', fechar);
      camada.addEventListener('click', function (e) { if (e.target === camada) fechar(); });
      document.body.appendChild(camada);
      aberta = camada;
      document.addEventListener('keydown', teclas, true);
      camada.querySelector('.guia-ok').focus();
    }

    return {
      /** Entra numa etapa: guarda para o "?" e mostra a janela se ainda não foi vista. */
      etapa: function (id, conteudo) {
        if (!conteudo) { atual = null; ajuda.hidden = true; return; }
        var mesma = atual && atual.id === id;
        atual = Object.assign({ id: id }, conteudo);
        montarAjuda();
        ajuda.hidden = false;
        if (!mesma && vistas.indexOf(id) < 0 && !aberta) abrir(atual);
      },
      /** Esconde o "?" (telas sem explicação própria). */
      sem: function () { atual = null; ajuda.hidden = true; },
      /** Volta a mostrar todas as explicações neste aparelho. */
      esquecer: function () { vistas = []; gravar(); },
      aberta: function () { return !!aberta; }
    };
  }

  global.GuiaEtico = GuiaEtico;
})(window);

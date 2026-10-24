/* Histórias Éticas — textos da progressão explicativa (uma janela por etapa).
   O motor das janelas está em guia.js (cópia própria desta pasta).
   app.js chama window.guiarHistorias(fase, cena) ao desenhar cada tela. */
(function () {
  'use strict';
  if (!window.GuiaEtico) return;
  var guia = window.GuiaEtico({
    chave: 'historiasEticas.guia.v1',
    cores: {
      fundo: '#fffdf8', texto: '#302537', borda: '#3d1e4e', destaque: '#613875',
      botao: '#613875', 'botao-texto': '#fffdf8', 'botao-borda': '#3d1e4e',
      'fonte-titulo': 'Georgia, serif'
    }
  });

  var E = {
    catalog: { rotulo: 'Como funciona', titulo: 'Escolha uma história', texto: [
      'Cada história acompanha uma pessoa ao longo de vários **capítulos**. Em cada um, você decide o que ela faz, e a história continua a partir da sua escolha.',
      'Busque pelo assunto que desperta curiosidade (pesquisa, escola, trabalho…). Todas estão abertas, em qualquer ordem.',
      'Seu percurso fica só neste navegador, durante esta sessão. No fim você pode baixar ou imprimir o registro.'
    ] },
    intro: { rotulo: 'Antes de começar', titulo: 'Você não precisa saber as teorias', texto: [
      'Conheça os personagens (se quiser, abra a lista). As explicações aparecem ao longo do caminho, no fim de cada capítulo.',
      'A decisão **confirmada fica registrada**: não dá para voltar e trocar. Como na vida, o que se faz depois é reconhecer e reparar os efeitos.'
    ] },
    scene: { rotulo: 'Cena', titulo: 'Leia, escolha e confirme', texto: [
      'Leia a cena e escolha uma ação para a protagonista ou o protagonista. Nada é revelado antes de você confirmar: nenhuma opção vem marcada como certa.',
      'Depois de **Confirmar minha decisão**, a história segue a partir dela.'
    ] },
    scene2: { rotulo: 'Uma ação leva a outra', titulo: 'A história reagiu à sua escolha', texto: [
      'O quadro **O que aconteceu no seu caminho** mostra o efeito da decisão anterior. Agora surge uma nova informação ou um compromisso que pede outra decisão.',
      'Algumas cenas têm mais de uma resposta defensável. O mapa do capítulo mostra isso no final.'
    ] },
    map: { rotulo: 'Fim do capítulo', titulo: 'O mapa das suas decisões', texto: [
      'Aqui você vê a sua escolha ao lado da alternativa de referência e da teoria que a sustenta: **verde** (escolha adequada), **amarelo** (alternativa de referência) e **vermelho** (escolha que precisa de revisão). Cada cor também vem escrita.',
      'O mapa avalia a conduta no caso, não você.',
      'Para continuar, escreva uma **reflexão breve**: o que você percebe agora que não tinha considerado. Uma frase basta.'
    ] },
    summary: { rotulo: 'Fim da história', titulo: 'Seu percurso completo', texto: [
      'Todos os capítulos aparecem ligados num mapa mental, com as suas escolhas, as alternativas e os fundamentos. Os detalhes das consequências podem ser abertos.',
      'Baixe o registro ou imprima/salve em PDF para levar à discussão. Não há placar de quem é mais ético.'
    ] }
  };

  window.guiarHistorias = function (fase, cena) {
    if (fase === 'scene' && cena > 0) { guia.etapa('scene2', E.scene2); return; }
    if (E[fase]) guia.etapa(fase, E[fase]); else guia.sem();
  };
  window.guiaHistoriasEticas = guia;
})();

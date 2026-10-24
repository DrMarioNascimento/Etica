/* Percursos Éticos — textos da progressão explicativa (uma janela por etapa).
   O motor das janelas está em guia.js (cópia própria desta pasta).
   app.js chama window.guiarPercursos(tela, passo) ao desenhar cada tela. */
(function () {
  'use strict';
  if (!window.GuiaEtico) return;
  var guia = window.GuiaEtico({
    chave: 'percursosEticos.guia.v1',
    cores: {
      fundo: '#ffffff', texto: '#192e40', borda: '#192e40', destaque: '#12656b',
      botao: '#12656b', 'botao-texto': '#ffffff', 'botao-borda': '#0a3d41',
      'fonte-titulo': 'Georgia, serif'
    }
  });

  var E = {
    themes: { rotulo: 'Como funciona', titulo: 'Escolha por onde investigar', texto: [
      'Escolha **um ou mais temas** no menu. Cada tema escolhido vira uma etapa de **investigação**; os outros chegam prontos, como fatos do caso.',
      'Depois você entra numa história, decide entre três caminhos, acompanha o que acontece e justifica a sua decisão por escrito.',
      'Nada é enviado nem guardado depois que a página fecha. No fim você pode baixar ou imprimir o registro.'
    ] },
    stories: { rotulo: 'Escolha do contexto', titulo: 'Escolha uma história', texto: [
      'São quatro histórias por página; use os botões para ver as outras. Todas estão disponíveis.',
      'Os temas que você escolheu valem para qualquer história.'
    ] },
    context: { rotulo: 'Seu contexto', titulo: 'Entenda a situação', texto: [
      'Leia a abertura e os fatos que já chegam prontos (os temas que você não escolheu investigar).',
      'O objetivo é construir uma **decisão justificável**, acompanhar seus efeitos e rever a conduta se for preciso.'
    ] },
    investigate: { rotulo: 'Investigação', titulo: 'Uma pista por vez', texto: [
      'Abra **Consultar pista do caso** e registre a sua leitura com as suas palavras. Sem registro não se avança: é o que você vai usar para decidir.',
      'Você pode voltar à etapa anterior quando quiser.'
    ] },
    decision: { rotulo: 'Bifurcação', titulo: 'Que caminho você escolhe?', texto: [
      'São três caminhos, cada um com desdobramentos próprios. Antes de escolher, você pode rever o dossiê e as suas anotações.',
      'Não há caminho "certo" marcado: há caminhos mais ou menos justificáveis com o que você sabe.'
    ] },
    outcome: { rotulo: 'Desdobramento', titulo: 'A história continua', texto: [
      'Veja o efeito da sua decisão e a **informação nova** que ela trouxe. Depois, escolha como acompanhar a situação.'
    ] },
    reflection: { rotulo: 'Decisão fundamentada', titulo: 'Justifique e planeje', texto: [
      'Classifique as hipóteses de conduta e escreva a sua justificativa. O professor lê o raciocínio: a atividade confere se você preencheu, mas **não dá nota automática**.',
      '"Deliberar não é achar resposta automática: é justificar uma decisão responsável."'
    ] },
    report: { rotulo: 'Percurso concluído', titulo: 'Seu registro de deliberação', texto: [
      'O registro reúne o dossiê, a sua decisão e a justificativa. Baixe o TXT ou imprima/salve em PDF para levar à discussão.'
    ] }
  };

  window.guiarPercursos = function (tela) {
    if (E[tela]) guia.etapa(tela, E[tela]); else guia.sem();
  };
  window.guiaPercursosEticos = guia;
})();

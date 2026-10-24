/* Casos Éticos — textos da progressão explicativa (uma janela por etapa).
   O motor das janelas está em guia.js (cópia própria desta pasta).
   app.js chama window.guiarCasos(modo, passo) a cada troca de passo. */
(function () {
  'use strict';
  if (!window.GuiaEtico) return;
  var guia = window.GuiaEtico({
    chave: 'casosEticos.guia.v1',
    cores: {
      fundo: '#f7f1e1', texto: '#1f1810', borda: '#1f1810', destaque: '#8a5a12',
      botao: '#184834', 'botao-texto': '#f7f1e1', 'botao-borda': '#0b2419',
      'fonte-titulo': "Lora, Georgia, serif", 'fonte-rotulo': "'IBM Plex Mono', ui-monospace, monospace"
    }
  });

  var TEMAS = {
    rotulo: 'Como funciona',
    titulo: 'Um caso, um lugar, uma decisão',
    texto: [
      'Escolha um **tema**. O sistema sorteia um caso e o **lugar** de onde você vai vivê-lo: alguém da história, com o que essa pessoa sabe, vê e sente.',
      'Cada vez que você volta, o caso ou o lugar mudam. Há dois modos: **Outros lugares** (quem decide) e **Trajetórias cruzadas** (o que a decisão provoca depois, em quem a recebe).',
      'Não existe resposta certa. Existe a decisão que você consegue **justificar** com o que sabia.',
      'Nada sai deste navegador. Para continuar em outro aparelho, use o **código de jornada** que aparece no fim.'
    ]
  };

  var OL = [
    { rotulo: 'Passo 1 de 6 · O que desejo?', titulo: 'Seu lugar no caso', texto: [
      'Leia a situação e quem você é nela. O quadro **Seu lugar** diz o que essa pessoa sabe e o que está em jogo para ela.',
      'Depois, marque o seu **primeiro impulso**: o que dá vontade de fazer agora, sem pensar muito. Não é compromisso: ele volta no final para você comparar.',
      'A **ênfase do episódio** (escuta, argumentação ou reparação) muda um detalhe do caminho. Ela aparece destacada na tela.'
    ] },
    { rotulo: 'Passo 2 de 6 · O que compreendi?', titulo: 'Investigar antes de decidir', texto: [
      'Escolha com quem falar e o que ler. As **consultas são limitadas**: você não terá tudo, como na vida real.',
      '**Vi** é o que você presenciou, **Ouvi** é o que alguém contou, **Interpretei** é leitura sua, que pode estar errada. Uma consulta pode corrigir uma interpretação.',
      'Tudo vai para o **Registro da investigação** ao lado. Ao terminar, responda o que você entendeu; "não sei" é uma resposta honesta e válida.'
    ] },
    { rotulo: 'Passo 3 de 6 · O que decidi?', titulo: 'Hora de decidir', texto: [
      'Escolha uma conduta. Antes de confirmar, a **matriz** pergunta pela intenção, pelo meio e pelas consequências previsíveis.',
      'O **mapa de atores** mostra quem tem poder, quem está exposto e quem foi ouvido. Algumas condutas dependem de informações que você talvez não tenha reunido.',
      'Escreva **por quê**. Uma decisão sem justificativa é só uma preferência.'
    ] },
    { rotulo: 'Passo 4 de 6 · O que pretendia?', titulo: 'Intenção não é resultado', texto: [
      'Diga o que você queria alcançar. A mesma conduta pode vir de intenções diferentes, e uma boa intenção não torna correta qualquer conduta.',
      'Essa resposta será comparada com o que de fato acontece no passo seguinte.'
    ] },
    { rotulo: 'Passo 5 de 6 · O que aconteceu?', titulo: 'A consequência, a objeção e o contraponto', texto: [
      'Primeiro você vê o que a sua decisão provocou e o que **fica em aberto**.',
      'Depois, o **Conselho das Vozes** traz a objeção mais forte ao seu caminho. Responda com uma réplica: manter, ajustar ou mudar também são decisões.',
      'Por fim, um **"e se…"** muda um detalhe do caso para você testar se o seu raciocínio se sustenta.'
    ] },
    { rotulo: 'Passo 6 de 6 · O que assumo?', titulo: 'O que você assume', texto: [
      'Compare o seu primeiro impulso com o que decidiu e com o que aconteceu. Veja também como outras pessoas chegaram ao mesmo ponto por outro caminho.',
      'A **Escala do Bonde** lê o seu percurso por cinco perspectivas (Utilitarismo, Virtudes, Intenção, Existencialismo e Complexidade). É um espelho para discutir, não uma nota.',
      'Anote o **código de jornada** para continuar em outro aparelho ou mostrar ao professor.'
    ] }
  ];

  var TC = [
    { rotulo: 'Passo 1 de 8 · Entrada', titulo: 'Trajetórias cruzadas', texto: [
      'Neste modo você acompanha a decisão **e o que ela provoca depois**, em quem a recebe. A história tem dois capítulos.',
      'Leia a situação e quem você é nela. Depois, marque como a **pressão do momento** pesa em você: o que dá vontade de fazer agora. Ela volta no final.'
    ] },
    { rotulo: 'Passo 2 de 8 · Exploração', titulo: OL[1].titulo, texto: OL[1].texto },
    { rotulo: 'Passo 3 de 8 · Decisão', titulo: 'Hora de decidir', texto: OL[2].texto },
    { rotulo: 'Passo 4 de 8 · Consequência', titulo: 'Intenção e consequência', texto: [
      'Primeiro diga o que você queria alcançar: uma boa intenção não torna correta qualquer conduta.',
      'Depois veja o que a decisão provocou e o que **fica em aberto**. Em trajetórias cruzadas, olhe sobretudo para quem recebeu a decisão.'
    ] },
    { rotulo: 'Passo 5 de 8 · Conselho', titulo: 'A objeção mais forte', texto: [
      'O **Conselho das Vozes** traz o argumento mais forte contra o seu caminho. Responda com uma réplica: você pode manter, ajustar ou mudar.'
    ] },
    { rotulo: 'Passo 6 de 8 · Contraponto', titulo: 'E se fosse diferente?', texto: [
      'Um detalhe do caso muda. Pense se a sua decisão continuaria a mesma e por quê. É assim que se testa um raciocínio.'
    ] },
    { rotulo: 'Passo 7 de 8 · Capítulo 2', titulo: 'Um tempo depois', texto: [
      'A história continua semanas depois. O que você decidiu no capítulo 1 abre este capítulo: a mesma decisão pode pesar de outro jeito agora.',
      'Responda às perguntas do fechamento com o que você aprendeu no caminho.'
    ] },
    { rotulo: 'Passo 8 de 8 · Fechamento', titulo: 'O que você procurou proteger', texto: [
      'Diga o que procurou proteger, o custo disso e o que faria para reduzir esse custo.',
      'A **leitura relacional** olha o seu percurso por Utilitarismo, Deontologia, Virtudes, Cuidado e Justiça e equidade. É um espelho para discutir, não uma nota.',
      'Anote o **código de jornada** para continuar em outro aparelho ou mostrar ao professor.'
    ] }
  ];

  window.guiarCasos = function (modo, passo) {
    if (passo < 0) { guia.etapa('temas', TEMAS); return; }
    var lista = modo === 'tc' ? TC : OL;
    var e = lista[Math.min(passo, lista.length - 1)];
    if (e) guia.etapa((modo === 'tc' ? 'tc-' : 'ol-') + passo, e); else guia.sem();
  };
  window.guiaCasosEticos = guia;
})();

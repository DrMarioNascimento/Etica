# Auditoria de Ética Interativa — 24/10/2026

**Situação:** verificação funcional automatizada e revisão de código concluídas, com correções. A inspeção visual em navegador real permanece pendente: a conexão do navegador não ficou disponível nesta sessão. Os testes de DOM abaixo verificam telas, textos e interações, mas não produzem capturas nem medem a disposição dos elementos na tela.

Escopo: página inicial, abertura, mapas, Bonde para computador e celular, Casos Éticos 1, 2 e 3 e Comitê de Ética Profissional. Base do site: commit `952bd26c3705ec4058db61abd26198c0f43abb78`, acrescido das correções deste relatório. Comitê: commit `70cb99564c6ddc83d245afd9c7f707a28bc6eb77` (código examinado e simulado sem alterações).

## Correções aplicadas

| Local | Problema encontrado | Resultado |
|---|---|---|
| Bonde, duas versões | Pausar interrompia apenas o cronômetro; o veículo continuava depois da partida | A pausa detém o deslocamento; reproduzir retoma do mesmo ponto, inclusive depois de a decisão ficar irreversível. Reiniciar limpa a animação pausada |
| Bonde para computador | A descrição inferia a quantidade pelo rótulo visível e mostrava 1 no desvio vazio; esconder rótulos também alterava os números descritos | A descrição usa a contagem do cenário, inclusive zero, independentemente dos rótulos |
| Bonde, duas versões | A opção de reduzir movimento começava desligada mesmo com essa preferência no sistema | A configuração inicial respeita a preferência do dispositivo |
| Página inicial | Cards externos das atividades, mapas e janela do mapa ainda tinham principalmente sombra difusa | Incluídas borda iluminada, base sólida e sombra, mantendo a paleta roxa |
| Bonde, duas versões | Painéis e pequenas janelas não tinham acabamento uniforme, especialmente no celular | Aplicado acabamento azul em relevo às informações, resultado, volume e cronômetro |
| Abertura e mapas | O foco podia sair da janela pelo teclado e não retornava ao botão que abriu o mapa | Foco permanece na janela; Escape fecha o mapa e devolve o foco; a seleção dos mapas também fica identificada para tecnologia assistiva |
| Auditoria | O roteiro antigo de setembro ainda esperava telas de uma versão anterior do Caso 1 | Acrescentado teste para o motor atual, sem tratar o roteiro antigo como evidência do funcionamento atual |

Antes da auditoria foram publicados o movimento suave da balança do Comitê e os dois faróis brancos do Bonde, com ciclo de 9 segundos. Ambos podem ser pausados tocando no ícone e respeitam a preferência por menos movimento. A bússola mantém a imagem como alternativa ao vídeo, com controle discreto e sem baixar o vídeo em condições desfavoráveis.

## Cobertura e resultados

| Área | Simulação/verificação executada | Resultado |
|---|---|---|
| Página inicial | Abertura, 4 cards, exatamente um acesso para cada Caso 1/2/3, 4 mapas, anterior/próximo, Escape, retorno do foco e pausa das figuras | Aprovado no DOM |
| Arquivos do site | 6 páginas de entrada e grafo de referências; 119 arquivos locais referenciados, IDs únicos, viewport | Nenhuma referência local ausente encontrada. 6 URLs externas inventariadas, sem teste de rede |
| CSS | Análise de sintaxe de 20 arquivos/blocos | Aprovada; não equivale à aprovação visual |
| Bonde, computador e celular | Manter, desviar, omissão, trilho vazio, painéis, volume, tempo, pausa no cronômetro e durante o deslocamento, trava da decisão, retomada e reinício | Fluxos chegaram ao painel com 5 perspectivas e valores no intervalo previsto |
| Casos 1 | 56 casos × 4 perspectivas/modos × 3 variações = **672 percursos completos**, 890 decisões e 168 continuações duas semanas depois | Investigação, justificativas, respostas, consequências, conselho, contraponto, fechamento, caderno, código de jornada e impressão simulada funcionaram; texto do aluno escapado corretamente |
| Casos 2 | **39 percursos completos**, 456 escolhas; testes adicionais de **8.748 combinações** das decisões principais | Catálogo, investigação, consequências, reflexões obrigatórias, mapas, memórias, retomada, migração de versões, epílogos, exportação TXT e acionamento da impressão aprovados |
| Casos 2 — proporção | 13 histórias; 80 capítulos; 152 decisões | **24 capítulos com 1 decisão (30%), 40 com 2 (50%), 16 com 3 (20%)** |
| Casos 3 | **216 percursos completos** no DOM; **6.804 combinações** de temas, decisão e acompanhamento nos dados | Seleções mínimas/completas, investigação, anotações, reflexão, resultado e retorno aprovados |
| Casos 3 — porta docente | Sessões simuladas: visitante, outra conta/provedor, professor Google autorizado, mensagem forjada e logout durante carregamento | Acesso negado/autorizado conforme a política; rota direta permanece fechada na interface sem autorização |
| Comitê | **30 casos, 3.738 montagens factuais e 180 fluxos completos de turma** | Entrada, distribuição de papéis, fontes, fiscalização, consenso, sessão, votação, resultado, revelação e relatório aprovados pelo motor em memória |
| Comitê — planilhas | Exportação e reimportação dos 30 casos, comparando dados e variantes utilizados pelo motor | Aprovada |
| Bússola | Conexão rápida/lenta/desconhecida, offline, economia de dados, menos movimento, timeout, falha de rede/mídia/autoplay, pausa, rolagem e aba oculta | Alternativa estática e carregamento adiado aprovados nos testes simulados |

Os 672 percursos do Caso 1 e os 39 do Caso 2 são amostras sistemáticas de caminhos completos; não representam todas as sequências possíveis de todas as escolhas. As combinações adicionais têm os limites indicados na tabela. Os testes do Bonde usam relógio virtual e geometria SVG simulada: verificam o fluxo, não a posição visual das colisões.

## Padrão de profundidade

- Página principal: botões, quatro rótulos das experiências, cards de atividades, cards e janela de mapas, instruções numeradas, perspectivas, aviso de acesso e abertura possuem regras de relevo.
- Casos 1 e 3: preservado o acabamento aprovado. Não houve alteração de paleta, estrutura ou narrativa nessas atividades.
- Casos 2: conferida a camada de profundidade em ameixa, marfim e cobre. As cores semânticas verde/vermelho/amarelo dos mapas foram preservadas, assim como os estilos de impressão.
- Bonde: preservados os controles e a identidade azul, complementando os painéis. As figuras SVG mantêm seus acabamentos.
- Comitê: conferidos os componentes compartilhados de relevo (`d-btn`, `d-sm`, `d-caixa`, `d-card`) e seu uso nos fluxos. Há controles auxiliares com apresentação textual ou mais simples; não foi feita uma reformulação do Comitê.

## O que ainda exige navegador real

1. Revisar capturas das telas inicial, intermediárias e finais em computador e celular, incluindo rolagem, cortes de texto, foco visível e alinhamento dos faróis.
2. Conferir visualmente a intensidade do relevo, o vídeo, as animações SVG e a saída de áudio. A geometria real não é calculada pelo ambiente de DOM utilizado.
3. Testar o login Google real do professor e a comunicação do Comitê entre aparelhos/Firebase. Os testes desta auditoria usaram sessões simuladas e armazenamento em memória, sem criar salas ou alterar dados de alunos.
4. Conferir no endereço público os arquivos efetivamente servidos após a publicação. O navegador ficou indisponível e a requisição direta ao domínio foi bloqueada pelo ambiente; o estado da publicação pode ser acompanhado pelo GitHub Actions.

Não se conclui, portanto, que todas as telas estejam visualmente aprovadas em todos os dispositivos. A parte funcional acima foi executada; estas verificações visuais e de serviços reais permanecem explicitamente abertas.

## Reproduzir a verificação local

Os testes de interface exigem `jsdom` disponível para o Node. Os testes do Comitê exigem as dependências de seu próprio repositório (`tsx` e `xlsx` para os comandos abaixo).

```sh
node auditoria/site-atual.test.cjs
node auditoria/bonde.test.cjs
node auditoria/casos-atuais.test.cjs
node auditoria/hero-compass.test.cjs
node historias-eticas/test.cjs
node historias-eticas/catalog-test.cjs
node historias-eticas/journey-test.cjs
node percursos-eticos/check.mjs
node percursos-eticos/dom-test.cjs
node percursos-eticos/review-test.cjs
```

No repositório do Comitê:

```sh
node --import tsx scripts/testar-casos.ts --fluxos
node --import tsx scripts/testar-planilha.ts
```

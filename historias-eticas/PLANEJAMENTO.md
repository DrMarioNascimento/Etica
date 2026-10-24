# Histórias Éticas — ampliação de 24/10/2026

Foram acrescentadas 12 histórias à história existente **Antes do apito**. Todas aparecem misturadas, sem classificação de curso para o estudante. A divisão abaixo serve exclusivamente ao planejamento docente.

| Contexto de planejamento | História | Conflito próprio do enredo |
| --- | --- | --- |
| Bacharelado | A porta que fechou às seis | Encerramento de serviço, cobranças futuras, saldos e continuidade do atendimento. |
| Licenciatura | Dois segundos para passar | Validade e equidade de um critério de avaliação que confunde tempo de corrida e aprendizagem. |
| Bacharelado | A mensagem das 23h | Convites íntimos associados a privilégios de agenda, proteção e possível retaliação institucional. |
| Licenciatura | A chave do portão | Conferência de autorização de retirada, continuidade da supervisão e responsabilidade pela entrega. |
| Bacharelado | A trilha atravessa uma casa | Impactos de evento esportivo sobre acesso, rotina, integridade e patrimônio dos moradores. |
| Licenciatura | O jogo que ganhou outro nome | Procedência de conhecimentos comunitários, colaboração e atribuição indevida de autoria. |
| Bacharelado | O relatório que chegou ao RH | Desvio de finalidade de informações de um programa e inferências sobre capacidade de trabalho. |
| Licenciatura | O apito como castigo | Uso punitivo de esforço físico, cuidado condicionado à obediência e efeitos sobre a confiança. |
| Bacharelado | A final dos bastidores | Pressão de patrocinador, conflito de interesses e alteração de resultado já conferido. |
| Licenciatura | O torneio das apostas | Cobranças, ameaças e proteção de estudantes antes, durante e depois de um torneio. |
| Bacharelado — pesquisa | A curva perfeita | Mudança de calibração, comparabilidade, rastreabilidade, relato fiel e correção de publicação. |
| Licenciatura — pesquisa | O mapa que entregou o caminho | Identificação por trajetos geográficos e horários, divulgação científica e proteção de crianças. |

## Comparação com o acervo anterior

Foram lidos os 56 enredos de `casos-eticos/casos.js`, os nove casos curtos de `cases-data.js`, os 12 percursos de `percursos-eticos/data.mjs` e a história original. As cópias desses arquivos e da entrada de Casos Éticos no site público foram baixadas e comparadas byte a byte com o repositório: coincidiam na auditoria.

A originalidade aqui é relativa a esse acervo consultado. Não é uma afirmação de inexistência de temas semelhantes em toda a literatura. Princípios como cuidado, justiça, privacidade e responsabilidade reaparecem por serem conteúdos da disciplina. Não foram reaproveitados cenas, diálogos ou cadeias de decisões dos outros casos.

Distinções verificadas: o relatório ao RH não reutiliza o estudo de VFC usado para escalação; o mapa de trajetos não reutiliza o vídeo ou áudio divulgado; a calibração não repete o pré-teste sem aprovação ou o descarte de crianças por não responderem; a entrega no portão não é a ausência de supervisão de uma sessão; a corrida como castigo não é a retirada de recreio por dever de casa; o resultado manipulado de uma competição não é a seleção educativa de vagas nem o julgamento instantâneo de um lance.

## Estrutura e passagem do tempo

Cada história nova tem seis capítulos: quatro de construção do conflito e decisões; um **duas semanas depois**, com acompanhamento e possível reparação; e um **um, dois ou três meses depois**, conforme o caso, com nova decisão sobre a continuidade. Ao concluir, um epílogo **seis meses depois** mostra o destino dos personagens segundo as escolhas. Antes do apito conserva oito capítulos e recebe passagem de duas semanas no último capítulo e epílogo de três meses.

A decisão do quarto capítulo define se o risco central foi evitado ou se ocorreu o dano narrado. No mapa de trajetos, publicar os dados no terceiro capítulo já produz exposição: uma contenção correta no quarto capítulo não reverte esse fato, e os desdobramentos reconhecem o dano. A decisão de acompanhamento define reparação versus pendência. A última decisão diferencia mudança efetiva e manutenção das condições de repetição. Escolhas anteriores continuam preservadas em vermelho, com suas consequências, mesmo quando houve reparação posterior.

Os desfechos são ficcionais e condicionais. Não afirmam que todo erro gera lesão ou que todo dano produz automaticamente sanção, ressarcimento ou obrigação pessoal. Quando há pagamento pessoal, o enredo identifica um acordo fictício; apuração e compromisso financeiro não são confundidos com uma sentença jurídica automática. Nas histórias de saúde não há instrução de diagnóstico ou tratamento: os personagens acionam atendimento e acompanhamento.

## Interação

- Catálogo com busca e seis cartões por carregamento, em ordem misturada; 13 histórias contando a original.
- Escolhas confirmadas permanecem no percurso; sem tentativas até acertar e sem teoria/gabarito antes de decidir.
- Explicação breve e mapa por capítulo; reflexão escrita antes de avançar.
- Verde: escolha sustentada e teoria; vermelho: escolha a rever; amarelo: referência para revisão. Rótulos e símbolos complementam as cores.
- Mapa integral conectado, com escolhas e fundamentos visíveis; detalhes de efeitos expansíveis.
- Epílogo incluído na tela, no registro TXT e na impressão/PDF.
- Progresso separado por história na sessão local do navegador, sem nome ou envio automático ao docente.
- Leitura complementar apenas na abertura de cada história.
- Percursos Éticos, atividade anterior de revisão docente, conserva seu bloqueio e autenticação existentes.

## Referências de apoio à pesquisa

Além das aulas fornecidas pelo professor e da bibliografia já informada na atividade, foram conferidas fontes institucionais:

- [CNPq — Diretrizes de integridade](https://www.gov.br/cnpq/pt-br/composicao/comissao-de-integridade/diretrizes).
- [Lei 14.874/2024 — pesquisa com seres humanos](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14874.htm).

As referências ficam na leitura complementar, sem converter os capítulos em textos legais. Os casos não substituem avaliação ética e institucional de projetos reais.

## Verificação

`test.cjs` mantém as verificações da história original. `catalog-test.cjs` avalia as 8.748 combinações das 12 histórias novas e percorre 36 trajetórias completas na interface DOM, verificando decisões, cores, reflexões, retomada, mapas, epílogos, TXT, impressão e isolamento entre histórias. Também verifica catálogo, busca e paginação. Isso não equivale a uma avaliação visual em navegador real ou telefone físico.

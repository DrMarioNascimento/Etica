# Ética Interativa

## Histórias Éticas — Antes do apito (24 de outubro de 2026)

História formativa para ingressantes em [historias-eticas/](https://etica.drmarionascimento.com.br/historias-eticas/), com entrada em Casos Éticos. Oito capítulos sobre uma turma preparando um festival. A decisão confirmada permanece registrada; uma reflexão breve acompanha o mapa de cada capítulo. Não há troca de alternativa até acertar, nem feedback antes da confirmação.

Os mapas comparam a escolha registrada e a alternativa de referência: **vermelho** = escolha que precisa de revisão, **amarelo** = alternativa adequada de referência, **verde** = escolha adequada e teoria que a sustenta. Todas as cores têm textos e símbolos equivalentes. Critérios, justificativas, alternativas aceitas e condições estão em `assessment.mjs`. Há mais de uma resposta defensável nos capítulos sobre campanha, vagas e organização das aulas; essas respostas não são marcadas como erradas. A avaliação se refere à conduta no caso, não ao caráter do estudante nem a uma conclusão jurídica.

Ao final, um mapa mental contínuo apresenta os oito capítulos ligados por um eixo, com escolhas, alternativas e fundamentos visíveis (sem acordeões para abrir cada capítulo). Consequências e pendências podem ser expandidas. Três conexões retomam decisões anteriores. A impressão abre todos os detalhes; o TXT inclui análise, critério, alternativa, fundamento e reflexão. Leituras complementares aparecem apenas na abertura.

Progresso em sessionStorage, sem coleta ou envio de respostas. Sessões anteriores preservam decisões e justificativas. A versão Percursos Éticos continua bloqueada para revisão docente.

Validação: `node historias-eticas/test.cjs` com jsdom instalado. Cobre as 24 escolhas, cores/fundamentos, alternativas legítimas, ausência de resposta antecipada, mapa final completo, reflexões, exportação, impressão, migração e contraste das três cores.

## Percursos Éticos — revisão docente (24 de outubro de 2026)

A entrada foi movida da página inicial para um botão com cadeado em `casos-eticos/`. A página e o endereço direto exigem sessão Google verificada da conta `mariocnascimento@gmail.com`. O módulo da atividade só é carregado após a autorização; contas de alunos não entram. Sessão restrita à aba/sessão do navegador, com saída explícita.

**Limite:** trata-se de uma restrição da interface em GitHub Pages. Código, histórias e histórico continuam no repositório público; não armazenar conteúdo confidencial aqui. O bloqueio não transforma os arquivos estáticos em conteúdo privado.

A autenticação usa Firebase `atividades-extras-e40b6`. Como o domínio de Ética ainda não está na lista de domínios autorizados, a janela de login usa `fisiologia-em-fuga.drmarionascimento.com.br/etica-review-login.html`. A ponte valida a conta, usa sessão em memória e envia credencial apenas à origem exata de Ética. O receptor valida origem, janela e nonce aleatório e submete a credencial ao Firebase antes de autorizar. Nenhuma senha ou token é colocado em URL, logs ou armazenamento manual. Para eliminar a ponte futuramente, autorize o domínio de Ética no Firebase e substitua a entrada por popup direto.

A liberação para alunos exige uma alteração explícita; não é automática.

Teste do bloqueio: `node percursos-eticos/review-test.cjs` (requer jsdom). Verifica visitante, aluno, provedor incorreto, autorização docente, origem/janela/nonce da ponte e saída durante carregamento.


Nova atividade em [percursos-eticos/](https://etica.drmarionascimento.com.br/percursos-eticos/): menu suspenso com seleção múltipla de seis eixos temáticos, seguido por 12 histórias sem rótulos de curso (quatro cards por página). Cada tema selecionado gera investigação; os demais fornecem fatos. Cada história oferece três decisões com desdobramentos próprios e três respostas de acompanhamento. O encerramento exige justificativa escrita e permite exportar TXT ou imprimir/PDF. Não há nota automática, envio a servidor nem persistência após fechar a página.

“Deliberar não é achar resposta automática: é justificar uma decisão responsável.”

Base: duas aulas de Mário César Nascimento (2026), livro de Tojal, Da Costa e Beresford (2004), e referência normativa CONFEF 508/2023, substituindo a 307/2015. Casos fictícios, sem diagnóstico jurídico automático. As aplicações anteriores e o Comitê permanecem independentes.

Validação: `node percursos-eticos/check.mjs`; `node percursos-eticos/dom-test.cjs` com jsdom instalado; teste de interface com Playwright em `percursos-eticos/ui-test.cjs` (servidor local na porta 4175).


## Situação atual — 19 de outubro de 2026

As aplicações Dilema do Bonde, sua versão móvel e Casos Éticos continuam neste repositório. O **Comitê de Ética Profissional** está sendo desenvolvido em repositório privado separado; sua existência não significa que esteja publicado dentro de `casos-eticos/`. A referência de independência das aplicações atuais permanece em [AUDITORIA-INDEPENDENCIA.md](AUDITORIA-INDEPENDENCIA.md).

## Ética e Pesquisa — aberta ao público

Esta linha reúne materiais e atividades interativas para apoiar o ensino de Ética e Metodologia da Pesquisa. Por meio de situações-problema, reflexão crítica e discussão, os recursos estimulam a construção do conhecimento.

Portal do autor: https://www.drmarionascimento.com.br/

O acesso público aos recursos não altera as condições de reutilização em [LICENSE.md](LICENSE.md).


## Registro anterior de manutenção — 10 de outubro de 2026

As aplicações `dilema-bonde/`, `dilema-bonde-mobile/` e `casos-eticos/` conservam recursos próprios. A independência é descrita em [AUDITORIA-INDEPENDENCIA.md](AUDITORIA-INDEPENDENCIA.md); preserve as fontes, bibliotecas e avisos de terceiros de cada pasta.

Os scripts em `auditoria/` permitem reproduzir verificações de referências e independência. Não há workflow de CI neste repositório nesta revisão. Uma escolha no simulador serve à discussão de razões, consequências e conflitos de valores; não deve ser apresentada como diagnóstico moral de uma pessoa.


**English** · [Português](#português)

> Personal intellectual project by Mário César Nascimento, PhD. All rights reserved.

Ética Interativa: ethics learning through interactive simulators and decision-making scenarios, including a 3D Trolley Problem. Makes values, intentions and consequences visible, without imposing a single right answer. Desktop and mobile.

The content is in Brazilian Portuguese.

## Access

- **Home page:** [etica.drmarionascimento.com.br](https://etica.drmarionascimento.com.br/)
- **Trolley Problem (desktop):** [dilema-bonde/](https://etica.drmarionascimento.com.br/dilema-bonde/index.html)
- **Trolley Problem (smartphone, landscape; version under validation):** [dilema-bonde-mobile/](https://etica.drmarionascimento.com.br/dilema-bonde-mobile/index.html)
- **Ethical Cases:** [casos-eticos/](https://etica.drmarionascimento.com.br/casos-eticos/index.html)

Everything runs in the browser, with no installation.

## Who it is for

Students and teachers (school and higher education), professionals, researchers, debate facilitators, study groups and anyone interested in moral philosophy and decision-making. It grew out of teaching Ethics and Professional Deontology in Physical Education, but the questions it raises are not limited to one profession.

## What it includes

- **Trolley Problem:** set the number of people on each track, the people involved, emotional bonds, decision time and pressure (Classic and Free modes); choose between keeping the course and diverting the trolley; then compare dynamic indicators from five perspectives: utilitarianism, virtue ethics, intention, existentialism and complexity ethics. Includes playback controls, speed, continuous loop, labels, reduced motion, volume and an optional "humor mode".
- **Ethical Cases:** investigation-based cases in professional settings (Gym, Clinic, School and Sport). Players pick a theme and an investigation level, consult sources, decide, and then see a multidimensional ethical reading (utilitarianism, deontology, virtue ethics, ethics of care, justice and equity) and the consequences of their choice. A password-protected teacher area lets the author test the case bank from a local spreadsheet without publishing anything.
- **Home page:** access to the experiences, four mind maps (foundations of ethics, the Trolley Problem, how to use the simulator, Ethical Cases) and a short guide on how to explore.

The indicators are teaching tools for comparison and reflection. They do not assess the participant's character and do not replace argument, dialogue or the study of ethical theories.

## How it works

Static HTML, CSS and JavaScript, published on GitHub Pages. Each application folder (`dilema-bonde/`, `dilema-bonde-mobile/`, `casos-eticos/`) is self-contained: fonts, icon, styles, scripts and the spreadsheet library are stored locally, with no CDN needed. See [AUDITORIA-INDEPENDENCIA.md](AUDITORIA-INDEPENDENCIA.md) (in Portuguese) for the independence audit and how to rerun it.

## Authorship, license and contact

**Author and declared rights holder:** Mário César Nascimento, PhD. The author's affiliation with CEFID/UDESC is academic information only and does not make the University an author, owner or licensor of this repository.

License: see [LICENSE.md](LICENSE.md) (all rights reserved; functional educational use permitted).

Contact: [DrMarioNascimento on GitHub](https://github.com/DrMarioNascimento).

---

## Português

> **Projeto intelectual pessoal de Mário César Nascimento, PhD. Todos os direitos reservados.**

Ambiente digital de aprendizagem dedicado à reflexão ética por meio de simuladores interativos, situações-problema e tomada de decisão.

O projeto busca aproximar conceitos filosóficos de experiências concretas, permitindo que estudantes, professores e demais interessados explorem valores, responsabilidades, intenções e consequências em diferentes cenários, sem impor uma resposta única como correta.

> **Decidir não é apenas escolher; é compreender valores, responsabilidades e consequências.**

## Acesso

| Página | Endereço | Observação |
| --- | --- | --- |
| **Página principal** | [etica.drmarionascimento.com.br](https://etica.drmarionascimento.com.br/) | Entrada, mapas mentais e orientações de uso. |
| **Dilema do Bonde — computador** | [dilema-bonde/](https://etica.drmarionascimento.com.br/dilema-bonde/index.html) | Menu com ícones e nomes, botões uniformes, fontes e painéis ampliados e descrição junto às decisões. |
| **Dilema do Bonde — smartphone** | [dilema-bonde-mobile/](https://etica.drmarionascimento.com.br/dilema-bonde-mobile/index.html) | Interface compacta para uso na horizontal. Identificada na página principal como versão em validação. |
| **Casos Éticos** | [casos-eticos/](https://etica.drmarionascimento.com.br/casos-eticos/index.html) | Casos investigativos em contextos profissionais. |

O ambiente funciona diretamente no navegador e pode ser utilizado em computadores, tablets e smartphones, sem necessidade de instalação.

## Para quem

O projeto é aberto a todas as pessoas interessadas na temática ética, incluindo:

- estudantes e professores da educação básica e do ensino superior;
- profissionais de diferentes áreas;
- pesquisadores e mediadores de debates;
- grupos de estudo;
- público geral interessado em filosofia moral e tomada de decisão.

Embora tenha origem em atividades de ensino de Ética e Deontologia da Educação Física, o conteúdo aborda questões humanas amplas e não se limita a uma profissão ou área de formação.

## O que o projeto oferece

### Página principal

- acesso ao Dilema do Bonde (computador e smartphone) e aos Casos Éticos;
- quatro mapas mentais ampliáveis: **Fundamentos da Ética**, **Dilema do Bonde**, **Como usar o simulador** e **Casos Éticos**;
- seção **Como explorar**, com quatro passos (relembrar conceitos, configurar o cenário, decidir, comparar e argumentar) e resumo das cinco perspectivas do simulador;
- janela de orientação inicial, com aviso de que se trata de experimento mental para fins didáticos.

### Dilema do Bonde

Simulação interativa em SVG, com efeitos de profundidade, baseada no conhecido experimento mental do Dilema do Bonde. O participante é colocado diante de uma situação moral na qual precisa decidir entre intervir no curso dos acontecimentos ou permitir que ele prossiga.

O objetivo não é indicar uma resposta única como correta, mas tornar visíveis os elementos envolvidos na decisão e favorecer a comparação entre diferentes perspectivas éticas.

**Recursos da simulação**

- definição do número de pessoas nos trilhos principal e secundário;
- escolha entre **manter o curso** (não intervir) e **desviar o bonde**;
- ajuste do tempo disponível para a decisão;
- modos de cenário **Clássico** e **Livre**;
- variação das pessoas envolvidas no cenário;
- inclusão de vínculo afetivo e de diferentes relações emocionais;
- **decisão sob pressão**, que reduz o tempo de decisão;
- reprodução, controle de velocidade, pausa, reinício e loop contínuo;
- ajuste de volume e **Modo humor** opcional;
- opção de reduzir movimento;
- exibição opcional de rótulos com o número de pessoas;
- acompanhamento das fases da simulação, da aproximação à avaliação do desfecho;
- feedback visual e leitura ética em tempo real.

**Versões.** As duas versões compartilham o acabamento da estação: telhado com volume, arcos com profundidade e relógio com efeito de vidro convexo. Os ícones superiores e inferiores usam as mesmas cores. O desenho e a lógica dos trilhos, do bonde e dos personagens foram preservados na atualização visual. No computador, **Som e volume** também oferece um atalho para **Modo humor**, sincronizado com o controle de cenários; na versão para smartphone, esse atalho adicional não foi incluído e o controle permanece no painel de cenários.

**Perspectivas éticas apresentadas.** Após a configuração do cenário e a escolha realizada, o simulador apresenta indicadores dinâmicos relacionados a cinco formas de leitura:

| Perspectiva | Questão central |
| --- | --- |
| **Utilitarismo** | Quais são as consequências e qual é o saldo global da decisão? |
| **Ética das virtudes** | O que a escolha revela sobre prudência, coragem, compaixão e caráter? |
| **Intenção** | Quais motivos orientaram a ação ou a omissão? |
| **Existencialismo** | Como liberdade, escolha e responsabilidade foram assumidas pelo agente? |
| **Ética da complexidade** | Quais contextos, incertezas, interdependências e efeitos não lineares participam da decisão? |

**Ação, omissão e responsabilidade.** Um dos eixos centrais do simulador é a distinção entre responsabilidade ativa e passiva:

- ao intervir, o agente modifica diretamente o curso dos acontecimentos e participa da produção do desfecho;
- ao não intervir, permite que o curso existente prossiga, mas a omissão também pode ser objeto de avaliação moral.

Diferentes correntes éticas atribuem pesos distintos às consequências, às intenções, ao dever, ao caráter do agente e ao contexto. Por isso, a experiência foi desenvolvida para estimular perguntas e argumentos, e não para encerrar o dilema com uma resposta automática.

### Casos Éticos

Casos investigativos ambientados em situações profissionais, construídos a partir do documento-base *Ética em Movimento*. O banco publicado contém **9 casos** distribuídos em quatro campos: **Academia** (2), **Clínica** (3), **Escola** (2) e **Esporte** (2).

Percurso de cada caso:

1. escolha do campo; o caso é sorteado entre os publicados daquela categoria;
2. escolha do nível de investigação: **Fácil** (as quatro fontes podem ser consultadas antes da decisão) ou **Difícil** (apenas duas das quatro; as demais são reveladas depois);
3. entrada no caso e apresentação das pessoas envolvidas;
4. investigação de personagens, registros, memórias e elementos do ambiente, reunidos no Registro da investigação;
5. decisão e consequência imediata;
6. leitura da tensão: o participante indica, em um marcador, qual de dois valores recebeu maior prioridade;
7. leitura ética: escalas de −2 (sacrifica fortemente) a +2 (fortalece muito) para **utilitarismo**, **deontologia**, **ética das virtudes**, **ética do cuidado** e **justiça e equidade**; síntese qualitativa da postura adotada (ação, omissão ou transferência de responsabilidade); e sinais pedagógicos de responsabilidade profissional (imperícia, imprudência, negligência), que não são conclusões jurídicas;
8. revelação das fontes restantes, perguntas para reflexão e desdobramento posterior do caso.

Os números não formam uma nota final: cada escala mostra como a alternativa se relaciona com uma perspectiva ética específica.

**Área do Professor.** Acesso protegido por senha que permite carregar a planilha-mestre (Excel) para validar e testar casos antes da publicação, inclusive casos em rascunho ou revisão. A planilha permanece apenas na sessão do navegador; a operação não publica nem modifica o banco do site.

## Objetivos educacionais

O projeto pretende contribuir para que o participante possa:

- reconhecer os elementos envolvidos em uma decisão moral;
- diferenciar resultado, intenção, dever, caráter e contexto;
- analisar as relações entre ação, omissão e responsabilidade;
- comparar diferentes perspectivas filosóficas diante do mesmo problema;
- desenvolver argumentação, escuta e respeito a posições divergentes;
- perceber como alterações no cenário podem modificar julgamentos e justificativas;
- refletir criticamente antes, durante e depois de uma escolha.

## Possibilidades de uso

Os materiais podem ser utilizados individualmente ou em atividades mediadas, como:

- introdução a conteúdos de ética e filosofia moral;
- discussão em sala de aula;
- comparação das decisões de diferentes grupos;
- construção e defesa de argumentos;
- análise da diferença entre decidir sob pressão e decidir com tempo para reflexão;
- debate sobre vínculos afetivos, imparcialidade e valor atribuído às pessoas;
- formação profissional e discussão de responsabilidade em situações complexas.

### Sugestão de dinâmica (Dilema do Bonde)

1. Apresente o cenário inicial sem antecipar as teorias éticas.
2. Solicite que cada participante registre sua decisão e justificativa.
3. Modifique uma variável por vez, como o número de pessoas, o vínculo afetivo ou o tempo de decisão.
4. Compare as escolhas e as justificativas apresentadas.
5. Utilize os indicadores do simulador para introduzir ou revisar as diferentes perspectivas éticas.
6. Finalize discutindo se houve mudança de decisão e quais valores produziram essa mudança.

## Cuidados na interpretação

O Dilema do Bonde é um experimento mental. Ele reduz uma situação complexa a escolhas delimitadas para tornar determinados conflitos morais mais visíveis. O mesmo cuidado vale para as leituras dos Casos Éticos. Portanto, os materiais:

- não medem caráter, personalidade ou competência ética;
- não fornecem uma resposta moral universal;
- não devem ser utilizados isoladamente para avaliar pessoas;
- não reproduzem integralmente a complexidade das decisões da vida real;
- devem ser acompanhados de reflexão, fundamentação e diálogo.

A representação visual foi planejada para fins didáticos, sem violência explícita.

## Como funciona

- Páginas estáticas em HTML, CSS e JavaScript, publicadas pelo GitHub Pages; não há etapa de compilação.
- O Dilema do Bonde é desenhado em SVG; personagens, bonde e áudio ficam em `assets/` de cada versão.
- Os Casos Éticos carregam o banco publicado de `cases-data.js`, arquivo gerado a partir da planilha-mestre (o próprio arquivo indica que a edição deve ser feita na planilha). A leitura de planilhas na Área do Professor usa SheetJS Community Edition em cópia local.

### Independência das aplicações

As pastas `dilema-bonde/`, `dilema-bonde-mobile/` e `casos-eticos/` podem ser servidas individualmente por HTTP. Cada uma contém suas fontes, ícone, estilos, scripts e demais recursos necessários; Casos Éticos também contém a biblioteca de planilhas. Não dependem de outras pastas do repositório nem de CDN para executar os fluxos auditados. Cada pasta deve ser copiada inteira, e as cópias locais são intencionais: compartilhar um recurso por `../` voltaria a criar dependência entre pastas.

Consulte [a auditoria de independência](AUDITORIA-INDEPENDENCIA.md) para os testes, resultados e registro da remoção das pastas antigas. As licenças das fontes e da biblioteca de terceiros acompanham as cópias locais e são descritas nos arquivos `THIRD-PARTY.md` das aplicações.

## Estrutura do repositório (manutenção)

```text
index.html                 página principal (mapas mentais incorporados)
responsive-ethics.css      estilos responsivos da página principal
brand/                     ícone usado pela página principal
dilema-bonde/              Dilema do Bonde para computador
  index.html
  desktop.css, desktop.js  apresentação desktop e acabamento visual
  assets/                  personagens, bonde, operador, áudio, ícone e fontes (Inter)
  THIRD-PARTY.md
dilema-bonde-mobile/       Dilema do Bonde para smartphone
  index.html
  estacao-visual.js        acabamento da estação no mobile
  icones-cores.css         cores dos ícones, sem alterações de tamanho
  assets/                  mesmos tipos de recurso da versão desktop
  THIRD-PARTY.md
casos-eticos/              Casos Éticos
  index.html
  cases-data.js            banco publicado (gerado a partir da planilha)
  responsive-ethics.css    cópia local da folha responsiva
  assets/                  ícone e fontes (Oswald, Lora, IBM Plex Mono)
  vendor/                  SheetJS 0.18.5 e sua licença
  THIRD-PARTY.md
auditoria/                 scripts e resultados da auditoria de independência
AUDITORIA-INDEPENDENCIA.md relatório da auditoria
LICENSE.md                 condições de uso educacional restrito
```

Observações de manutenção:

- `brand/` e `responsive-ethics.css` na raiz devem ser mantidos: a página principal ainda os utiliza.
- Os arquivos `payload-a.txt` e `payload-b.txt` das pastas dos bondes não são carregados pelos pontos de entrada atuais; foram preservados, e qualquer limpeza deve ser tratada separadamente.
- As pastas antigas `temporario-bonde-antigo/` e `temporario-bonde-mobile/` foram removidas após auditoria e autorização do autor e permanecem recuperáveis no histórico do Git (commit `83357b8`).

### Reprodução da auditoria

Com Node.js, Playwright e Microsoft Edge disponíveis, execute a partir da raiz do repositório:

```text
node auditoria/referencias.cjs
node auditoria/independencia.cjs
```

As variáveis de ambiente aceitas e os resultados de referência (`auditoria/*-20260908.json`) estão descritos em [AUDITORIA-INDEPENDENCIA.md](AUDITORIA-INDEPENDENCIA.md). Essas ferramentas são de desenvolvimento e não são carregadas pelas aplicações.

## Referência fundamental

FOOT, Philippa. *The Problem of Abortion and the Doctrine of the Double Effect*. Oxford Review, n. 5, p. 5-15, 1967.

## Autoria, licença e contato

**Autor e titular declarado:** Mário César Nascimento, PhD  
**Perfil responsável:** [DrMarioNascimento](https://github.com/DrMarioNascimento)

A vinculação profissional do autor ao CEFID/UDESC é informação acadêmica e não identifica a Universidade como autora, titular ou licenciadora deste repositório.

**Licença:** ver [LICENSE.md](LICENSE.md) (todos os direitos reservados; uso educacional funcional permitido). A publicação do código não autoriza cópia, adaptação, republicação ou exploração comercial.

**Contato e pedidos de autorização:** pelo perfil [DrMarioNascimento](https://github.com/DrMarioNascimento) no GitHub.

**Identificação profissional do autor**

**Prof. Dr. Mario Cesar Nascimento**  
CREFSC 000004/G  
Doutor em Ciências da Reabilitação  
Avaliação e intervenção terapêutica/Fisiologia Translacional  
Universidade do Estado de Santa Catarina — UDESC  
Centro de Ciências da Saúde e do Esporte — CEFID

**Atualização da documentação:** 19 de outubro de 2026.

---

Material didático destinado ao ensino, à aprendizagem e à divulgação da ética aplicada.

Nos percursos com uso da base insegura ou reparo improvisado, o dano ocorre na história: queda, fratura, hospital, afastamento e efeitos na família. O capítulo final se adapta à lesão e mantém acompanhamento, apuração e possibilidade de acordo de reembolso com custo para Helena. Valores e acordo são fictícios, não consequências jurídicas automáticas. A reparação não apaga a escolha anterior no mapa.

## Ampliação das Histórias Éticas — 24/10/2026

O catálogo em `historias-eticas/` reúne Antes do apito e 12 histórias novas, sem divisão de curso na interface. As novas histórias têm seis capítulos, desdobramentos após semanas e meses e epílogo condicionado às escolhas seis meses depois. A original conserva oito capítulos e ganha epílogo de três meses. O mapa completo e o TXT incluem escolhas, fundamentos, consequências e acompanhamento. Planejamento e auditoria do acervo: `historias-eticas/PLANEJAMENTO.md`.

Verificação: `NODE_PATH=/caminho/para/node_modules node historias-eticas/test.cjs` e `NODE_PATH=/caminho/para/node_modules node historias-eticas/catalog-test.cjs` (dependência de teste: jsdom).

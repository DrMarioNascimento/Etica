# Ética Interativa

Atividades formativas de Ética e Deontologia da Educação Física, por histórias, investigação, consequências e reflexão. **Deliberar não é achar resposta automática: é justificar uma decisão responsável.**

[**Abrir Ética Interativa**](https://etica.drmarionascimento.com.br/) · [Recursos públicos do autor](https://www.drmarionascimento.com.br/#acesso-publico)

## Disponibilidade — 24 de outubro de 2026

| Entrada | Conteúdo atual | Acesso |
|---|---|---|
| [Dilema do Bonde](https://etica.drmarionascimento.com.br/dilema-bonde/) | Simulação para computador e discussão por cinco perspectivas éticas | Público, sem cadastro |
| [Bonde para celular](https://etica.drmarionascimento.com.br/dilema-bonde-mobile/) | Versão adaptada à tela do smartphone | Público, sem cadastro |
| [Abrir Casos Éticas 1](https://etica.drmarionascimento.com.br/casos-eticos/) | 60 casos, perspectivas, investigação, consequências e caderno de jornada | Público, sem cadastro |
| [Abrir Casos Éticas 2](https://etica.drmarionascimento.com.br/historias-eticas/) | 13 histórias, 80 capítulos e 152 decisões | Público, sem cadastro |
| [Abrir Casos Éticas 3](https://etica.drmarionascimento.com.br/percursos-eticos/) | Percursos modulares; 12 histórias e seis temas | Revisão do professor, com Google autorizado |
| [Comitê de Ética Profissional](https://comite-etica.drmarionascimento.com.br/) | Deliberação em turma, em aplicação separada | Professor autorizado cria a sala; turma por código/QR |

O card Casos Éticos mantém o mapa mental e os três botões numerados. Casos 3 permanece com cadeado. O acesso direto à rota também exige a conta docente na interface. As versões do Bonde estão disponíveis ao público, sem o aviso antigo de construção/testes.

## Casos Éticos 1

O motor atual reúne 60 casos em oito temas, incluindo casos de pesquisa situados no bacharelado e na licenciatura. O aluno observa os fatos, escolhe uma perspectiva ou o modo de trajetória, investiga, justifica e acompanha consequências. Há conselho, contraponto, fechamento, caderno, código de jornada e continuações duas semanas depois nos caminhos que as preveem. Arquivos atuais: `casos-eticos/cases-data.js`, `app.js` e `index.html`. Arquivos `SUBSTITUIDO` preservam versões históricas e não descrevem o fluxo vigente.

Casos 1, 2 e 3 têm progressão explicativa: uma janela por etapa, com o botão **Entendi**, e um botão **?** para rever a explicação da etapa atual (`guia.js` e `guia-etapas.js` em cada pasta).

## Casos Éticos 2 — histórias formativas

As 13 histórias incluem **Antes do apito** e outras 12 histórias, com situações de atuação profissional, ensino e pesquisa. Os temas ficam misturados, sem separar o estudante por curso. Decisões podem agravar a situação de pessoas atendidas; a narrativa acompanha responsabilidades, reparação e consequências posteriores. Leituras complementares aparecem na abertura.

A distribuição atual dos 80 capítulos é **24 com uma decisão (30%), 40 com duas (50%) e 16 com três (20%)**. As decisões confirmadas permanecem registradas: não há troca livre para clicar até acertar. Ao final do capítulo, uma reflexão acompanha o mapa da situação; ao terminar, o aluno vê a construção completa e os desdobramentos posteriores dos personagens.

O mapa compara escolhas e fundamentos: **vermelho** identifica a escolha que precisa de revisão, **amarelo** a alternativa de referência, e **verde** a escolha adequada e a teoria que a sustenta. Textos e símbolos complementam as cores. Quando mais de uma alternativa é defensável, o critério reconhece essa possibilidade. A avaliação diz respeito à conduta no caso, não ao caráter do estudante nem a uma conclusão jurídica real.

O progresso fica em `sessionStorage`; não há envio das respostas a um servidor nesta atividade. Estão disponíveis retomada na sessão, impressão e exportação TXT. Fonte em `historias-eticas/`, com narrativas em `stories/` e ampliações em `expansions/`.

## Casos Éticos 3 e Comitê

`percursos-eticos/` fica reservado à revisão docente. A porta usa Firebase Authentication e verifica a conta Google autorizada antes de carregar a aplicação. Como este repositório e os arquivos estáticos são públicos, a porta controla a navegação: não torna os arquivos confidenciais. A disponibilização das outras atividades não remove essa restrição.

O Comitê possui projeto separado e infraestrutura Firebase. A Autoridade Ética conduz a sala; estudantes participam por código. As condições de entrada e os materiais docentes são próprios dessa aplicação.

## Apresentação e acessibilidade

A página principal usa a identidade roxa da Ética, cards e botões com profundidade, mapas e janela de abertura. Bonde para computador e celular ficam lado a lado em telas largas. Casos 2 usa ameixa, marfim e cobre, preservando as cores de avaliação. A bússola oferece imagem alternativa ao vídeo; balança e faróis têm movimento/iluminação com controle discreto e respeito à preferência por menos movimento. Ícones de cadeado mantêm a indicação de acesso reservado.

## Verificação e manutenção

Consulte o [relatório de auditoria de 24/10/2026](auditoria/relatorio-2026-10-24.md), com os resultados e seus limites. Foram simulados 672 percursos de Casos 1, 39 de Casos 2 e 216 de Casos 3, além de combinações dos motores e fluxos do Bonde. A inspeção visual em navegador real, login Google real e sessões entre dispositivos não foram concluídos nessa auditoria; a revisão documental não substitui essas verificações.

Testes relevantes, com `jsdom` disponível para os testes de DOM:

```sh
node auditoria/site-atual.test.cjs
node auditoria/bonde.test.cjs
node auditoria/casos-atuais.test.cjs
node historias-eticas/test.cjs
node historias-eticas/catalog-test.cjs
node historias-eticas/journey-test.cjs
```

As páginas são HTML/CSS/JavaScript, com recursos compartilhados e algumas dependências externas. Preserve as referências relativas e os termos dos componentes em `casos-eticos/THIRD-PARTY.md` e demais avisos locais. Não confunda uma verificação de sintaxe/DOM com aprovação visual ou funcionamento de serviços externos.

## Autoria e uso

**Mário César Nascimento, PhD.** [Licença de Uso Educacional Restrito](LICENSE.md). Acesso público permite o uso funcional educacional previsto; não concede licença aberta para copiar, adaptar ou republicar código, casos, narrativas, ícones, vídeos ou outros componentes. Bibliotecas, fontes e recursos de terceiros preservam suas próprias licenças.

**English:** Trolley Problem (desktop/mobile) and Ethical Cases 1 and 2 are publicly available. Ethical Cases 3 remains restricted to teacher review. The separate Ethics Committee requires an authorized host and room-code participation. Educational use follows LICENSE.md; public access does not mean open source.

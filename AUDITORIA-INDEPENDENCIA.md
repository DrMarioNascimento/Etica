# Auditoria de independência — Ética

Data: 8 de setembro de 2026. Escopo: dependências e funcionamento isolado das três aplicações publicadas.

## Conclusão

**As três pastas funcionam separadamente**, servidas por HTTP, sem outras pastas do repositório e sem serviços externos. Cada pasta deve ser copiada inteira, incluindo seus assets, fontes, scripts e licenças. Os caminhos públicos existentes foram mantidos.

| Aplicação | Dependências externas à pasta encontradas antes | Correção |
| --- | --- | --- |
| `dilema-bonde/` | Ícone em `../brand/`; Google Fonts | Ícone e fontes locais |
| `dilema-bonde-mobile/` | Ícone em `../brand/`; Google Fonts | Ícone e fontes locais |
| `casos-eticos/` | Ícone em `../brand/`; `../responsive-ethics.css`; Google Fonts; SheetJS via CDN | Cópias locais; SheetJS 0.18.5 preservado com licença Apache 2.0 |

A folha responsiva copiada para Casos Éticos é idêntica à original (SHA-256 `d6e929d784e10312adbb071ddae4a22841f0e1b8d9bcce5c3928030450dd37ee`). As fontes conservam as famílias e pesos existentes e incluem suas licenças OFL. Consulte `THIRD-PARTY.md` dentro de cada aplicação.

## Refatoração delimitada

Foram alterados apenas os caminhos de carregamento nos três HTMLs e adicionadas as dependências locais. Não foram alterados cálculos, casos, autenticação do professor, controles, tamanhos, animações ou geometria dos simuladores.

As cópias locais são intencionais: compartilhar um recurso por `../` voltaria a criar dependência entre pastas. Atualizações futuras de fontes ou bibliotecas devem ser aplicadas explicitamente nas aplicações pertinentes.

## Verificação realizada

- Auditoria estática: 19 referências locais em cada bonde e 14 em Casos Éticos, todas existentes e dentro da respectiva pasta. Recursos internos de SVG e dados embutidos são tratados separadamente de caminhos de arquivos.
- Cada aplicação foi a única raiz de um servidor HTTP temporário, sem acesso às pastas irmãs ou à raiz do repositório. Pedidos a serviços externos foram bloqueados e tratados como falha.
- Resultado: **zero recursos locais ausentes, zero solicitações externas e zero erros de JavaScript** nos fluxos exercitados.
- Bondes: cenário livre com 5/2 pessoas; reprodução, pausa e reinício; ambos os desfechos completos até os indicadores éticos; volume; Modo humor original; acesso a todos os arquivos de personagens, SVGs e áudio.
- Mobile: testado em 844 × 390; não recebeu o atalho adicional de Modo humor. Desktop: 1440 × 900.
- Casos Éticos: investigação completa e limitada, decisão, reflexão e leitura ética; importação local de uma planilha XLSX sintética. A planilha existiu somente no navegador de teste e não modificou o banco publicado.

A auditoria comprova as dependências estáticas inspecionadas e os fluxos acima. Não pretende ser uma certificação exaustiva de todos os casos, navegadores ou de segurança da aplicação.

## Pastas antigas — remoção autorizada

Não há referências de execução às pastas abaixo na página principal nem nas três aplicações auditadas:

- `temporario-bonde-antigo/`
- `temporario-bonde-mobile/`

**Removidas após a conclusão da auditoria e autorização expressa do autor.** O último commit anterior à remoção é `83357b809ad13411dc2d3141fd91575e72ae9349`, que permite recuperar integralmente as pastas pelo Git. Os links das três aplicações atuais permanecem iguais. Endereços que apontem diretamente às pastas antigas não são mais publicados.

**Manter `brand/` e `responsive-ethics.css` na raiz:** a página principal `index.html` ainda os utiliza, embora as três aplicações agora sejam independentes deles. Não remover assets ou fontes dentro das pastas ativas.

Os arquivos `payload-a.txt` e `payload-b.txt` das pastas dos bondes não são carregados pelos pontos de entrada atuais. Foram preservados; qualquer limpeza deles deve ser tratada separadamente.

## Reprodução da auditoria

Com Node.js, Playwright e Microsoft Edge disponíveis, execute a partir da raiz do repositório:

```text
node auditoria/referencias.cjs
node auditoria/independencia.cjs
```

O módulo Playwright pode ser indicado pela variável `PLAYWRIGHT_MODULE`; `BROWSER_CHANNEL` permite selecionar outro canal instalado. `AUDIT_OUTPUT` e `AUDIT_REFERENCES_OUTPUT` permitem salvar novos resultados. Essas ferramentas são de desenvolvimento e não são carregadas pelas aplicações.

Resultados desta execução: `auditoria/resultado-20260908.json` e `auditoria/referencias-20260908.json`.

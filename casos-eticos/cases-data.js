/* Arquivo gerado automaticamente. Edite a planilha, não este arquivo. */
window.ETICA_BANK_META = {"schemaVersion":2,"publishedCount":9};
window.ETICA_CASES = [
  {
    "id": "arbitro_01",
    "categoria": "Esporte",
    "numero": "Caso 01",
    "tituloCurto": "O Árbitro",
    "colecao": "Competição, fair play e resultado",
    "titulo": "Faltam 40 segundos.",
    "entrada1": "A semifinal escolar está por um fio. Enzo cai na área após possível contato. Você é o árbitro assistente, estava perto, mas não teve ângulo perfeito.",
    "entrada2": "Carla pergunta se você viu contato. As arquibancadas silenciam e você tem poucos segundos para responder.",
    "perguntaDecisao": "Carla espera sua resposta. O que você diz a ela?",
    "tipoDecisao": "alternativas",
    "regua": {
      "esquerda": "",
      "direita": ""
    },
    "tensao": {
      "esquerda": "Lealdade ao grupo",
      "direita": "Honestidade profissional"
    },
    "elenco": [
      [
        "Árbitra principal",
        "Carla",
        "Não teve ângulo claro do lance e confia na sua palavra."
      ],
      [
        "Capitão",
        "Enzo",
        "Caiu na área e precisa do pênalti para empatar."
      ],
      [
        "Capitã adversária",
        "Bia",
        "Nega o contato e recorda decisões anteriores."
      ],
      [
        "Técnico",
        "Renato",
        "Pressiona pela marcação e teme perder patrocínio."
      ]
    ],
    "pistas": [
      {
        "id": "arb_lance",
        "estilo": "Observacional",
        "titulo": "Reveja o lance na memória",
        "texto": "Possível contato leve, sem certeza sobre sua influência na queda.",
        "categoria": "fatos",
        "fonte": "",
        "tag": "",
        "essencial": 1,
        "condicao": "sempre"
      },
      {
        "id": "arb_bia",
        "estilo": "Empático",
        "titulo": "Converse com Bia",
        "texto": "Bia nega o contato e tem motivos legítimos e competitivos para sustentar sua versão.",
        "categoria": "vozes",
        "fonte": "",
        "tag": "",
        "essencial": 0,
        "condicao": "sempre"
      },
      {
        "id": "arb_renato",
        "estilo": "Confrontativo",
        "titulo": "Pergunte a Renato",
        "texto": "Perder pode custar o patrocínio; ele pede ajuda para Carla enxergar direito.",
        "categoria": "vozes",
        "fonte": "",
        "tag": "",
        "essencial": 0,
        "condicao": "sempre"
      },
      {
        "id": "arb_regra",
        "estilo": "Procedimental",
        "titulo": "Verifique o regulamento",
        "texto": "O assistente relata somente o que observou com clareza; a decisão final é da árbitra.",
        "categoria": "responsabilidades",
        "fonte": "",
        "tag": "",
        "essencial": 1,
        "condicao": "sempre"
      }
    ],
    "decisoes": {
      "arb_A": {
        "letra": "A",
        "titulo": "Confirmar o pênalti",
        "desc": "Você diz a Carla que teve certeza do contato, mesmo com dúvida.",
        "consequenciaTitulo": "Carla marca o pênalti.",
        "consequencia": "Enzo cobra e empata; o Grêmio Vitória vence a semifinal. Bia sai sem olhar para você e Renato agradece efusivamente.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Interveio ativamente",
        "eixos": {
          "utilitarismo": 1,
          "deontologia": -2,
          "virtudes": -1,
          "cuidado": -1,
          "justica": -1
        },
        "custo": "Você relativizou a exatidão factual e o regulamento para aliviar a pressão social e favorecer o time da casa.",
        "eco": "Duas semanas depois, um vídeo mostra que não houve contato suficiente. Carla evita escalar você para jogos decisivos.",
        "tensaoPos": 1,
        "tensaoNota": "Interesse do grupo acima da honestidade factual."
      },
      "arb_B": {
        "letra": "B",
        "titulo": "Dizer que não houve contato",
        "desc": "Você diz a Carla que não houve contato, mesmo com dúvida.",
        "consequenciaTitulo": "Carla mantém o jogo sem pênalti.",
        "consequencia": "O jogo termina. Enzo fica arrasado e Renato critica publicamente a decisão.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Interveio ativamente",
        "eixos": {
          "utilitarismo": -1,
          "deontologia": -1,
          "virtudes": -1,
          "cuidado": -1,
          "justica": -1
        },
        "custo": "Você relativizou a exatidão factual na direção oposta para evitar o desconforto de confirmar algo incômodo.",
        "eco": "Um novo ângulo mostra contato leve. Enzo nunca soube que você tinha observado algo relevante.",
        "tensaoPos": 2,
        "tensaoNota": "Evita favorecer o grupo, mas ainda afirma o que não sabe."
      },
      "arb_C": {
        "letra": "C",
        "titulo": "Relatar a dúvida com honestidade",
        "desc": "Você relata um possível contato leve, sem certeza suficiente, e deixa a decisão final para Carla.",
        "consequenciaTitulo": "Carla decide com a informação real disponível.",
        "consequencia": "Na dúvida, Carla não marca. Enzo se frustra; Bia reconhece sua honestidade e Carla preserva a confiança profissional.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Transferiu a responsabilidade de forma transparente",
        "eixos": {
          "utilitarismo": 1,
          "deontologia": 2,
          "virtudes": 2,
          "cuidado": 1,
          "justica": 2
        },
        "custo": "Você relativizou a vontade de oferecer uma resposta definitiva em nome da precisão sobre o que realmente observou.",
        "eco": "Carla convida você para arbitrar a final: prefere trabalhar com quem admite dúvida a quem finge certeza.",
        "tensaoPos": 5,
        "tensaoNota": "Honestidade sobre observação e incerteza."
      }
    },
    "aberto": "Quais informações ainda faltam para compreender plenamente este conflito?",
    "feedbackInvestigacao": {
      "completa": "",
      "parcial": "",
      "superficial": ""
    }
  },
  {
    "id": "inclusao_01",
    "categoria": "Escola",
    "numero": "Caso 02",
    "tituloCurto": "O Lugar de Lia",
    "colecao": "Escola, inclusão e equidade",
    "titulo": "Uma vaga, três minutos.",
    "entrada1": "Na final interturmas, Lia, aluna com hemiparesia leve, pede para cumprir a função adaptada que treinou. A equipe vence por um ponto.",
    "entrada2": "Dois alunos dizem que agora não é hora de testar. Lia espera a decisão da professora responsável.",
    "perguntaDecisao": "A substituição está aberta. Como você conduz a situação?",
    "tipoDecisao": "alternativas",
    "regua": {
      "esquerda": "",
      "direita": ""
    },
    "tensao": {
      "esquerda": "Resultado competitivo",
      "direita": "Inclusão com equidade"
    },
    "elenco": [
      [
        "Professora responsável",
        "Você",
        "Protege segurança, participação e coerência pedagógica."
      ],
      [
        "Aluna",
        "Lia",
        "Treinou a função adaptada e quer participar."
      ],
      [
        "Capitão",
        "Davi",
        "Teme ser responsabilizado se o resultado mudar."
      ],
      [
        "Colega",
        "Marina",
        "Percebe que Lia treinou, mas ainda não jogou."
      ]
    ],
    "pistas": [
      {
        "id": "lia_lia",
        "estilo": "Empático",
        "titulo": "Converse com Lia",
        "texto": "Ela se sente segura para cumprir a função lateral que treinou.",
        "categoria": "vozes",
        "fonte": "",
        "tag": "",
        "essencial": 1,
        "condicao": "sempre"
      },
      {
        "id": "lia_plano",
        "estilo": "Procedimental",
        "titulo": "Relembre o plano pedagógico",
        "texto": "Todos teriam participação significativa com adaptações planejadas.",
        "categoria": "responsabilidades",
        "fonte": "",
        "tag": "",
        "essencial": 1,
        "condicao": "sempre"
      },
      {
        "id": "lia_quadra",
        "estilo": "Observacional",
        "titulo": "Observe a quadra",
        "texto": "A lateral está livre; a função de Lia altera a transição, mas abre outra rota.",
        "categoria": "fatos",
        "fonte": "",
        "tag": "",
        "essencial": 0,
        "condicao": "sempre"
      },
      {
        "id": "lia_davi",
        "estilo": "Confrontativo",
        "titulo": "Pergunte a Davi",
        "texto": "Ele teme ser responsabilizado pelo grupo caso o resultado mude.",
        "categoria": "vozes",
        "fonte": "",
        "tag": "",
        "essencial": 0,
        "condicao": "sempre"
      }
    ],
    "decisoes": {
      "lia_A": {
        "letra": "A",
        "titulo": "Mantê-la no banco até o fim",
        "desc": "Você preserva o plano defensivo e promete ampliar a participação de Lia na próxima partida.",
        "consequenciaTitulo": "Lia permanece fora da final.",
        "consequencia": "A equipe vence por um ponto. Lia se afasta da comemoração e questiona se o compromisso de participação só vale sem pressão.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Evitou envolver-se",
        "eixos": {
          "utilitarismo": 1,
          "deontologia": -1,
          "virtudes": -1,
          "cuidado": -2,
          "justica": -2
        },
        "custo": "Você protegeu a previsibilidade competitiva, mas relativizou participação significativa e pertencimento.",
        "eco": "Na aula seguinte, Lia pergunta se vale a pena treinar quando sua participação depende de um placar confortável.",
        "tensaoPos": 1,
        "tensaoNota": "Resultado acima da participação."
      },
      "lia_B": {
        "letra": "B",
        "titulo": "Colocá-la sem ajustar a estratégia",
        "desc": "Você chama Lia imediatamente, mantendo a mesma função prevista para outro aluno.",
        "consequenciaTitulo": "Lia entra, mas a função não a favorece.",
        "consequencia": "Sob pressão no centro, Lia perde o equilíbrio e sai constrangida quando alguém diz que a substituição não funcionou.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Interveio ativamente",
        "eixos": {
          "utilitarismo": -1,
          "deontologia": -1,
          "virtudes": 0,
          "cuidado": -1,
          "justica": 0
        },
        "custo": "Você priorizou presença imediata sem assegurar adaptação competente; a inclusão assumiu o custo da improvisação.",
        "eco": "Marina propõe voltar a treinar funções adaptadas, reconhecendo que presença sem reorganização não garante inclusão.",
        "tensaoPos": 3,
        "tensaoNota": "Presença sem adaptação tenta equilibrar, mas falha."
      },
      "lia_C": {
        "letra": "C",
        "titulo": "Reorganizar a função e incluí-la",
        "desc": "Você orienta Lia para a lateral treinada, aproxima Marina e ajusta a cobertura defensiva.",
        "consequenciaTitulo": "A equipe muda o desenho da última posse.",
        "consequencia": "A jogada não é perfeita, mas Lia participa significativamente e permanece no centro da roda de avaliação.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Interveio ativamente",
        "eixos": {
          "utilitarismo": 1,
          "deontologia": 2,
          "virtudes": 2,
          "cuidado": 2,
          "justica": 2
        },
        "custo": "Você aceitou risco competitivo e reorganização para sustentar participação com competência, não apenas presença.",
        "eco": "A equipe passa a propor funções adaptadas para outros colegas e muda seu modo de planejar participação e desempenho.",
        "tensaoPos": 4,
        "tensaoNota": "Inclusão priorizada com adaptação para preservar desempenho."
      }
    },
    "aberto": "Quais informações ainda faltam para compreender plenamente este conflito?",
    "feedbackInvestigacao": {
      "completa": "",
      "parcial": "",
      "superficial": ""
    }
  },
  {
    "id": "academia_01",
    "categoria": "Academia",
    "numero": "Caso 03",
    "tituloCurto": "A Última Série",
    "colecao": "Academia, desempenho e segurança",
    "titulo": "O celular já está gravando.",
    "entrada1": "Caio prepara uma série máxima de agachamento para as redes. Dormiu pouco, tomou duas doses de pré-treino e apresentou breve instabilidade.",
    "entrada2": "Ele afirma estar bem e a gerente observa: Caio é influenciador e trouxe alunos para a academia.",
    "perguntaDecisao": "A barra está montada e a gravação começou. Como você intervém?",
    "tipoDecisao": "alternativas",
    "regua": {
      "esquerda": "",
      "direita": ""
    },
    "tensao": {
      "esquerda": "Autonomia imediata",
      "direita": "Segurança profissional"
    },
    "elenco": [
      [
        "Profissional do salão",
        "Você",
        "Responsável por supervisão, segurança e condução técnica."
      ],
      [
        "Praticante",
        "Caio",
        "Quer completar a série máxima e preservar sua imagem."
      ],
      [
        "Gerente",
        "Sílvia",
        "Teme conflito com um influenciador importante."
      ],
      [
        "Parceira de treino",
        "Nina",
        "Percebeu sinais de mal-estar e protege o amigo."
      ]
    ],
    "pistas": [
      {
        "id": "aca_observar",
        "estilo": "Observacional",
        "titulo": "Observe Caio",
        "texto": "Fala rápida, suor elevado e dificuldade breve para fixar o olhar.",
        "categoria": "fatos",
        "fonte": "",
        "tag": "",
        "essencial": 1,
        "condicao": "sempre"
      },
      {
        "id": "aca_escutar",
        "estilo": "Empático",
        "titulo": "Pergunte como ele está",
        "texto": "Caio admite tontura e pede privacidade para não ser humilhado.",
        "categoria": "vozes",
        "fonte": "",
        "tag": "",
        "essencial": 1,
        "condicao": "sempre"
      },
      {
        "id": "aca_protocolo",
        "estilo": "Procedimental",
        "titulo": "Consulte o protocolo",
        "texto": "Sinais agudos exigem interrupção, avaliação e preservação da privacidade.",
        "categoria": "responsabilidades",
        "fonte": "",
        "tag": "",
        "essencial": 1,
        "condicao": "sempre"
      },
      {
        "id": "aca_nina",
        "estilo": "Confrontativo",
        "titulo": "Pergunte a Nina",
        "texto": "Caio já sentiu palpitações após a primeira dose e tomou outra.",
        "categoria": "vozes",
        "fonte": "",
        "tag": "",
        "essencial": 0,
        "condicao": "sempre"
      }
    ],
    "decisoes": {
      "aca_A": {
        "letra": "A",
        "titulo": "Liberar e reforçar a segurança da barra",
        "desc": "Você aceita a decisão de Caio e posiciona auxiliares.",
        "consequenciaTitulo": "A tentativa começa.",
        "consequencia": "Caio perde estabilidade e precisa ser amparado. Ninguém se machuca, mas a cena é gravada.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Evitou interromper",
        "eixos": {
          "utilitarismo": -1,
          "deontologia": -2,
          "virtudes": -1,
          "cuidado": -2,
          "justica": -1
        },
        "custo": "Você priorizou autonomia imediata e satisfação comercial, relativizando sinais de risco e o dever de supervisão.",
        "eco": "Caio pergunta por que ninguém impediu uma tentativa que ele próprio sabia ser imprudente.",
        "tensaoPos": 1,
        "tensaoNota": "Autonomia imediata acima dos sinais de risco."
      },
      "aca_B": {
        "letra": "B",
        "titulo": "Interromper e explicar tudo diante da câmera",
        "desc": "Você cancela a série e anuncia publicamente a tontura e o uso duplicado do pré-treino.",
        "consequenciaTitulo": "A barra é retirada.",
        "consequencia": "O risco imediato é contido, mas Caio se sente exposto e o vídeo circula.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Interveio ativamente",
        "eixos": {
          "utilitarismo": 1,
          "deontologia": 0,
          "virtudes": 0,
          "cuidado": -2,
          "justica": -1
        },
        "custo": "Você protegeu a segurança física, mas relativizou privacidade, vínculo e condução respeitosa.",
        "eco": "Caio retorna, porém evita pedir ajuda quando sente algo diferente.",
        "tensaoPos": 5,
        "tensaoNota": "Segurança máxima, mas com exposição."
      },
      "aca_C": {
        "letra": "C",
        "titulo": "Pausar a gravação e conduzi-lo em particular",
        "desc": "Você interrompe sem divulgar o motivo e inicia avaliação em local reservado.",
        "consequenciaTitulo": "A tentativa é adiada.",
        "consequencia": "A tontura reaparece; Nina permanece com Caio e a gerente reorganiza o espaço discretamente.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Interveio ativamente",
        "eixos": {
          "utilitarismo": 2,
          "deontologia": 2,
          "virtudes": 2,
          "cuidado": 2,
          "justica": 2
        },
        "custo": "Você relativizou a gravação e o desejo imediato para sustentar segurança, privacidade e responsabilidade.",
        "eco": "Caio produz outro conteúdo sobre reconhecer quando interromper uma sessão.",
        "tensaoPos": 4,
        "tensaoNota": "Segurança priorizada com privacidade."
      }
    },
    "aberto": "Quais informações ainda faltam para compreender plenamente este conflito?",
    "feedbackInvestigacao": {
      "completa": "",
      "parcial": "",
      "superficial": ""
    }
  },
  {
    "id": "clinica_01",
    "categoria": "Clínica",
    "numero": "Caso 04",
    "tituloCurto": "O Passo de Helena",
    "colecao": "Clínica, autonomia e responsabilidade",
    "titulo": "Faltam seis metros.",
    "entrada1": "Helena, 67 anos, participa de reabilitação após internação cardíaca e quer concluir uma caminhada sem ajuda.",
    "entrada2": "Ela relata um aperto leve; a filha quer encerrar, mas Helena pede participação na decisão.",
    "perguntaDecisao": "Helena espera sua decisão. Como você conduz os próximos instantes?",
    "tipoDecisao": "alternativas",
    "regua": {
      "esquerda": "",
      "direita": ""
    },
    "tensao": {
      "esquerda": "Autonomia imediata",
      "direita": "Segurança e cuidado"
    },
    "elenco": [
      [
        "Profissional responsável",
        "Você",
        "Integra segurança, protocolo e autonomia."
      ],
      [
        "Participante",
        "Helena",
        "Quer recuperar independência e ser ouvida."
      ],
      [
        "Filha",
        "Patrícia",
        "Teme nova intercorrência e tende a decidir pela mãe."
      ],
      [
        "Fisioterapeuta",
        "Rafael",
        "Pode participar da avaliação compartilhada."
      ]
    ],
    "pistas": [
      {
        "id": "cli_sinais",
        "estilo": "Observacional",
        "titulo": "Observe os sinais",
        "texto": "Palidez, passo curto e alteração discreta no monitor, sem diagnóstico isolado.",
        "categoria": "fatos",
        "fonte": "",
        "tag": "",
        "essencial": 1,
        "condicao": "sempre"
      },
      {
        "id": "cli_helena",
        "estilo": "Empático",
        "titulo": "Escute Helena",
        "texto": "A meta representa recuperar independência e controle da rotina.",
        "categoria": "vozes",
        "fonte": "",
        "tag": "",
        "essencial": 1,
        "condicao": "sempre"
      },
      {
        "id": "cli_plano",
        "estilo": "Procedimental",
        "titulo": "Releia os critérios",
        "texto": "Sintoma novo exige pausa, avaliação e registro antes da retomada.",
        "categoria": "responsabilidades",
        "fonte": "",
        "tag": "",
        "essencial": 1,
        "condicao": "sempre"
      },
      {
        "id": "cli_filha",
        "estilo": "Confrontativo",
        "titulo": "Pergunte à filha",
        "texto": "Patrícia reconhece que proteção e controle começaram a se confundir.",
        "categoria": "vozes",
        "fonte": "",
        "tag": "",
        "essencial": 0,
        "condicao": "sempre"
      }
    ],
    "decisoes": {
      "cli_A": {
        "letra": "A",
        "titulo": "Permitir que ela conclua os seis metros",
        "desc": "Você mantém supervisão e respeita o desejo imediato de Helena.",
        "consequenciaTitulo": "Helena continua.",
        "consequencia": "Após dois passos o aperto aumenta e o percurso é interrompido para avaliação.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Interveio tardiamente",
        "eixos": {
          "utilitarismo": -2,
          "deontologia": -2,
          "virtudes": -1,
          "cuidado": -1,
          "justica": 0
        },
        "custo": "Você tratou autonomia como autorização imediata, relativizando o dever de responder ao sintoma novo.",
        "eco": "Helena pergunta se ser ouvida significa receber sempre permissão ou participar de decisões responsáveis.",
        "tensaoPos": 1,
        "tensaoNota": "Autonomia imediata diante de sintoma novo."
      },
      "cli_B": {
        "letra": "B",
        "titulo": "Encerrar a sessão sem diálogo",
        "desc": "Você determina o fim e pede que a filha conduza Helena à avaliação.",
        "consequenciaTitulo": "A caminhada termina imediatamente.",
        "consequencia": "O risco é contido, mas Helena se cala e permite que a filha fale por ela.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Interveio ativamente",
        "eixos": {
          "utilitarismo": 1,
          "deontologia": 1,
          "virtudes": 0,
          "cuidado": -1,
          "justica": -1
        },
        "custo": "Você fortaleceu a proteção imediata, mas relativizou participação, escuta e autonomia.",
        "eco": "Helena volta perguntando primeiro à filha o que está autorizada a fazer.",
        "tensaoPos": 5,
        "tensaoNota": "Segurança sem diálogo."
      },
      "cli_C": {
        "letra": "C",
        "titulo": "Pausar, avaliar e renegociar a meta com Helena",
        "desc": "Você interrompe, explica, chama a equipe e mantém Helena no centro da conversa.",
        "consequenciaTitulo": "Os seis metros ficam para depois.",
        "consequencia": "Após avaliação, Helena participa da definição de meta intermediária e critérios de retomada.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Interveio ativamente",
        "eixos": {
          "utilitarismo": 2,
          "deontologia": 2,
          "virtudes": 2,
          "cuidado": 2,
          "justica": 2
        },
        "custo": "Você relativizou a conclusão imediata para preservar segurança sem retirar participação.",
        "eco": "Duas semanas depois, Helena alcança a marca e escolhe a próxima meta.",
        "tensaoPos": 4,
        "tensaoNota": "Segurança imediata com autonomia na renegociação."
      }
    },
    "aberto": "Quais informações ainda faltam para compreender plenamente este conflito?",
    "feedbackInvestigacao": {
      "completa": "",
      "parcial": "",
      "superficial": ""
    }
  },
  {
    "id": "academia_02",
    "categoria": "Academia",
    "numero": "Caso 05",
    "tituloCurto": "A Recomendação",
    "colecao": "Academia, publicidade e confiança",
    "titulo": "O cupom já está pronto.",
    "entrada1": "A academia fechou parceria com uma marca. A gerente pede recomendação aos iniciantes e oferece comissão por venda.",
    "entrada2": "Ruan pergunta se o produto é necessário; a gerente aproxima o celular para gravar a resposta.",
    "perguntaDecisao": "Ruan aguarda sua orientação. O que você faz?",
    "tipoDecisao": "alternativas",
    "regua": {
      "esquerda": "",
      "direita": ""
    },
    "tensao": {
      "esquerda": "Lealdade comercial",
      "direita": "Transparência profissional"
    },
    "elenco": [
      [
        "Profissional",
        "Você",
        "Sua recomendação é percebida como orientação técnica."
      ],
      [
        "Aluno iniciante",
        "Ruan",
        "Confia que a indicação considera suas necessidades."
      ],
      [
        "Gerente",
        "Sílvia",
        "Depende da campanha para financiar melhorias."
      ],
      [
        "Representante",
        "Otávio",
        "Espera uma fala favorável à marca."
      ]
    ],
    "pistas": [
      {
        "id": "rec_contrato",
        "estilo": "Procedimental",
        "titulo": "Leia o acordo",
        "texto": "O contrato não obriga recomendação individual e permite declarar conflito.",
        "categoria": "responsabilidades",
        "fonte": "",
        "tag": "",
        "essencial": 1,
        "condicao": "sempre"
      },
      {
        "id": "rec_ruan",
        "estilo": "Empático",
        "titulo": "Pergunte o objetivo",
        "texto": "Ruan busca saúde e acredita que o produto foi prescrito.",
        "categoria": "vozes",
        "fonte": "",
        "tag": "",
        "essencial": 1,
        "condicao": "sempre"
      },
      {
        "id": "rec_rotulo",
        "estilo": "Observacional",
        "titulo": "Observe o rótulo",
        "texto": "As alegações não demonstram necessidade individual.",
        "categoria": "fatos",
        "fonte": "",
        "tag": "",
        "essencial": 0,
        "condicao": "sempre"
      },
      {
        "id": "rec_silvia",
        "estilo": "Confrontativo",
        "titulo": "Pergunte sobre a comissão",
        "texto": "O público não seria informado sobre o ganho por venda.",
        "categoria": "vozes",
        "fonte": "",
        "tag": "",
        "essencial": 0,
        "condicao": "sempre"
      }
    ],
    "decisoes": {
      "rec_A": {
        "letra": "A",
        "titulo": "Recomendar sem mencionar a parceria",
        "desc": "Afirma que o produto ajudará e apresenta o cupom.",
        "consequenciaTitulo": "A gravação é publicada.",
        "consequencia": "Ruan entende a fala como prescrição.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Interveio ativamente",
        "eixos": {
          "utilitarismo": 0,
          "deontologia": -2,
          "virtudes": -2,
          "cuidado": -1,
          "justica": -1
        },
        "custo": "Transparência e individualização cedem à campanha.",
        "eco": "Ruan descobre a comissão e desconfia das orientações.",
        "tensaoPos": 1,
        "tensaoNota": "Lealdade comercial domina; conflito oculto."
      },
      "rec_B": {
        "letra": "B",
        "titulo": "Recusar qualquer conversa",
        "desc": "Encerra a gravação e evita falar de marcas.",
        "consequenciaTitulo": "A campanha perde sua participação.",
        "consequencia": "Ruan não é induzido, mas fica sem orientação crítica.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Evitou envolver-se",
        "eixos": {
          "utilitarismo": 0,
          "deontologia": 1,
          "virtudes": 1,
          "cuidado": 0,
          "justica": 1
        },
        "custo": "Independência preservada; oportunidade educativa perdida.",
        "eco": "Ruan compra produto semelhante por outra propaganda.",
        "tensaoPos": 5,
        "tensaoNota": "Independência máxima, sem mediação educativa."
      },
      "rec_C": {
        "letra": "C",
        "titulo": "Declarar a parceria e orientar",
        "desc": "Explica conflito e diferencia publicidade de necessidade.",
        "consequenciaTitulo": "A gravação muda de formato.",
        "consequencia": "Ruan compreende que suplemento não é requisito.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Interveio ativamente",
        "eixos": {
          "utilitarismo": 2,
          "deontologia": 2,
          "virtudes": 2,
          "cuidado": 2,
          "justica": 2
        },
        "custo": "Força publicitária cede à confiança.",
        "eco": "A academia identifica conteúdos patrocinados.",
        "tensaoPos": 4,
        "tensaoNota": "Transparência priorizada com relação comercial declarada."
      }
    },
    "aberto": "Quais informações ainda faltam para compreender plenamente este conflito?",
    "feedbackInvestigacao": {
      "completa": "",
      "parcial": "",
      "superficial": ""
    }
  },
  {
    "id": "clinica_02",
    "categoria": "Clínica",
    "numero": "Caso 06",
    "tituloCurto": "O Vídeo de Miguel",
    "colecao": "Clínica, imagem e consentimento",
    "titulo": "A evolução impressiona.",
    "entrada1": "Miguel, 15 anos, realiza exercício terapêutico. Um vídeo mostraria sua evolução e a mãe assinou autorização geral.",
    "entrada2": "Ao ver o celular, Miguel cobre o rosto e pergunta onde o vídeo será exibido.",
    "perguntaDecisao": "A sessão está pronta. Como você conduz a gravação?",
    "tipoDecisao": "alternativas",
    "regua": {
      "esquerda": "",
      "direita": ""
    },
    "tensao": {
      "esquerda": "Benefício educativo",
      "direita": "Privacidade e consentimento"
    },
    "elenco": [
      [
        "Profissional",
        "Você",
        "Conduz a atividade e responde pela confiança."
      ],
      [
        "Adolescente",
        "Miguel",
        "Demonstra desconforto com a gravação."
      ],
      [
        "Mãe",
        "Luciana",
        "Assinou autorização geral."
      ],
      [
        "Coordenadora",
        "Denise",
        "Vê valor educativo e institucional."
      ]
    ],
    "pistas": [
      {
        "id": "vid_miguel",
        "estilo": "Empático",
        "titulo": "Pergunte a Miguel",
        "texto": "Aceita uso didático sem rosto, mas recusa redes sociais.",
        "categoria": "vozes",
        "fonte": "",
        "tag": "",
        "essencial": 1,
        "condicao": "sempre"
      },
      {
        "id": "vid_termo",
        "estilo": "Procedimental",
        "titulo": "Leia o termo",
        "texto": "A autorização é revogável e não substitui esclarecimento específico.",
        "categoria": "responsabilidades",
        "fonte": "",
        "tag": "",
        "essencial": 1,
        "condicao": "sempre"
      },
      {
        "id": "vid_cena",
        "estilo": "Observacional",
        "titulo": "Observe o enquadramento",
        "texto": "É possível registrar o movimento sem identificação.",
        "categoria": "fatos",
        "fonte": "",
        "tag": "",
        "essencial": 0,
        "condicao": "sempre"
      },
      {
        "id": "vid_coord",
        "estilo": "Confrontativo",
        "titulo": "Pergunte a finalidade",
        "texto": "A coordenadora deseja uso didático e publicitário.",
        "categoria": "vozes",
        "fonte": "",
        "tag": "",
        "essencial": 0,
        "condicao": "sempre"
      }
    ],
    "decisoes": {
      "vid_A": {
        "letra": "A",
        "titulo": "Gravar com base no termo",
        "desc": "Mantém enquadramento completo.",
        "consequenciaTitulo": "A sessão é registrada.",
        "consequencia": "Miguel participa desconfortável.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Interveio ativamente",
        "eixos": {
          "utilitarismo": 1,
          "deontologia": -1,
          "virtudes": -1,
          "cuidado": -2,
          "justica": -1
        },
        "custo": "Privacidade cede à autorização formal.",
        "eco": "Miguel passa a procurar câmeras antes das tarefas.",
        "tensaoPos": 1,
        "tensaoNota": "Benefício educativo acima do assentimento atual."
      },
      "vid_B": {
        "letra": "B",
        "titulo": "Cancelar qualquer registro",
        "desc": "Guarda o celular e encerra a proposta.",
        "consequenciaTitulo": "Nenhuma imagem é produzida.",
        "consequencia": "Miguel relaxa, mas alternativas não são discutidas.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Evitou envolver-se",
        "eixos": {
          "utilitarismo": 0,
          "deontologia": 1,
          "virtudes": 0,
          "cuidado": 1,
          "justica": 1
        },
        "custo": "Privacidade preservada; decisão compartilhada perdida.",
        "eco": "Miguel diz que aceitaria filmar apenas as pernas.",
        "tensaoPos": 5,
        "tensaoNota": "Privacidade máxima, sem explorar alternativa consentida."
      },
      "vid_C": {
        "letra": "C",
        "titulo": "Negociar finalidade e enquadramento",
        "desc": "Separa uso didático de publicidade.",
        "consequenciaTitulo": "Miguel escolhe como participar.",
        "consequencia": "Aceita tomada sem rosto em aula fechada.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Interveio ativamente",
        "eixos": {
          "utilitarismo": 2,
          "deontologia": 2,
          "virtudes": 2,
          "cuidado": 2,
          "justica": 2
        },
        "custo": "Alcance cede ao consentimento específico.",
        "eco": "A clínica passa a registrar finalidade e público.",
        "tensaoPos": 4,
        "tensaoNota": "Privacidade priorizada preservando benefício didático."
      }
    },
    "aberto": "Quais informações ainda faltam para compreender plenamente este conflito?",
    "feedbackInvestigacao": {
      "completa": "",
      "parcial": "",
      "superficial": ""
    }
  },
  {
    "id": "escola_02",
    "categoria": "Escola",
    "numero": "Caso 07",
    "tituloCurto": "O Colete de Alex",
    "colecao": "Escola, pertencimento e regras",
    "titulo": "Os times já foram chamados.",
    "entrada1": "Os coletes foram separados por gênero. Alex pede para jogar no grupo em que se sente seguro.",
    "entrada2": "Colegas divergem e a coordenação ainda não possui orientação específica.",
    "perguntaDecisao": "A turma espera. O que você decide?",
    "tipoDecisao": "alternativas",
    "regua": {
      "esquerda": "",
      "direita": ""
    },
    "tensao": {
      "esquerda": "Regra uniforme",
      "direita": "Pertencimento e equidade"
    },
    "elenco": [
      [
        "Professor",
        "Você",
        "Precisa conduzir a aula sem expor o estudante."
      ],
      [
        "Estudante",
        "Alex",
        "Busca participar no grupo em que se sente respeitado."
      ],
      [
        "Colega",
        "Júlia",
        "Defende que a turma escute Alex."
      ],
      [
        "Coordenador",
        "Marcelo",
        "Teme reclamações e pede cautela."
      ]
    ],
    "pistas": [
      {
        "id": "alex_voz",
        "estilo": "Empático",
        "titulo": "Converse com Alex",
        "texto": "Ele busca segurança e não vantagem esportiva.",
        "categoria": "vozes",
        "fonte": "",
        "tag": "",
        "essencial": 1,
        "condicao": "sempre"
      },
      {
        "id": "alex_regra",
        "estilo": "Procedimental",
        "titulo": "Verifique a regra",
        "texto": "A divisão buscava equilíbrio, mas não prevê identidade e segurança.",
        "categoria": "responsabilidades",
        "fonte": "",
        "tag": "",
        "essencial": 1,
        "condicao": "sempre"
      },
      {
        "id": "alex_turma",
        "estilo": "Observacional",
        "titulo": "Observe os grupos",
        "texto": "É possível reorganizar por nível e função.",
        "categoria": "fatos",
        "fonte": "",
        "tag": "",
        "essencial": 0,
        "condicao": "sempre"
      },
      {
        "id": "alex_coord",
        "estilo": "Confrontativo",
        "titulo": "Pergunte ao coordenador",
        "texto": "Manter igual parece fácil, não necessariamente justo.",
        "categoria": "vozes",
        "fonte": "",
        "tag": "",
        "essencial": 0,
        "condicao": "sempre"
      }
    ],
    "decisoes": {
      "alex_A": {
        "letra": "A",
        "titulo": "Manter a lista administrativa",
        "desc": "Adia qualquer mudança.",
        "consequenciaTitulo": "Alex vai ao grupo indicado.",
        "consequencia": "A aula começa, mas Alex participa pouco.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Transferiu a responsabilidade",
        "eixos": {
          "utilitarismo": 0,
          "deontologia": 0,
          "virtudes": -1,
          "cuidado": -2,
          "justica": -2
        },
        "custo": "Pertencimento cede à previsibilidade.",
        "eco": "Alex falta à aula seguinte.",
        "tensaoPos": 1,
        "tensaoNota": "Regra uniforme acima da segurança concreta."
      },
      "alex_B": {
        "letra": "B",
        "titulo": "Mudar Alex discretamente",
        "desc": "Faz exceção sem rever critérios.",
        "consequenciaTitulo": "Alex troca de grupo.",
        "consequencia": "Participa mais, mas a turma interpreta como favor.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Interveio ativamente",
        "eixos": {
          "utilitarismo": 1,
          "deontologia": 0,
          "virtudes": 1,
          "cuidado": 2,
          "justica": 0
        },
        "custo": "Proteção individual sem aprendizagem coletiva.",
        "eco": "Outro estudante pede mudança semelhante.",
        "tensaoPos": 4,
        "tensaoNota": "Pertencimento priorizado sem mudar a estrutura."
      },
      "alex_C": {
        "letra": "C",
        "titulo": "Reorganizar por critérios pedagógicos",
        "desc": "Forma equipes por função e nível.",
        "consequenciaTitulo": "Os coletes são redistribuídos.",
        "consequencia": "A aula começa com critérios explicados.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Interveio ativamente",
        "eixos": {
          "utilitarismo": 2,
          "deontologia": 1,
          "virtudes": 2,
          "cuidado": 2,
          "justica": 2
        },
        "custo": "Regra original cede a organização justificável.",
        "eco": "A coordenação revisa o torneio.",
        "tensaoPos": 4,
        "tensaoNota": "Equidade priorizada preservando equilíbrio."
      }
    },
    "aberto": "Quais informações ainda faltam para compreender plenamente este conflito?",
    "feedbackInvestigacao": {
      "completa": "",
      "parcial": "",
      "superficial": ""
    }
  },
  {
    "id": "esporte_02",
    "categoria": "Esporte",
    "numero": "Caso 08",
    "tituloCurto": "A Dor de Júlia",
    "colecao": "Esporte, saúde e lealdade",
    "titulo": "A final começa em vinte minutos.",
    "entrada1": "Júlia torceu o tornozelo no aquecimento e manca quando acelera. O técnico diz que a decisão deve ser dela.",
    "entrada2": "Ela pede que a dor não seja registrada até depois da final.",
    "perguntaDecisao": "A escalação precisa ser entregue. Como você age?",
    "tipoDecisao": "alternativas",
    "regua": {
      "esquerda": "",
      "direita": ""
    },
    "tensao": {
      "esquerda": "Lealdade competitiva",
      "direita": "Proteção da atleta"
    },
    "elenco": [
      [
        "Comissão técnica",
        "Você",
        "Tem dever de cuidado e participa da escalação."
      ],
      [
        "Atleta",
        "Júlia",
        "Quer jogar e teme perder lugar."
      ],
      [
        "Técnico",
        "André",
        "Sente pressão pelo resultado."
      ],
      [
        "Capitã",
        "Marta",
        "Quer Júlia em campo, mas percebe limitação."
      ]
    ],
    "pistas": [
      {
        "id": "jul_sinais",
        "estilo": "Observacional",
        "titulo": "Observe o deslocamento",
        "texto": "Júlia altera corrida e evita mudança rápida de direção.",
        "categoria": "fatos",
        "fonte": "",
        "tag": "",
        "essencial": 1,
        "condicao": "sempre"
      },
      {
        "id": "jul_voz",
        "estilo": "Empático",
        "titulo": "Converse com Júlia",
        "texto": "Ela sente que precisa provar compromisso.",
        "categoria": "vozes",
        "fonte": "",
        "tag": "",
        "essencial": 1,
        "condicao": "sempre"
      },
      {
        "id": "jul_prot",
        "estilo": "Procedimental",
        "titulo": "Consulte o protocolo",
        "texto": "Dor aguda e alteração funcional exigem avaliação.",
        "categoria": "responsabilidades",
        "fonte": "",
        "tag": "",
        "essencial": 1,
        "condicao": "sempre"
      },
      {
        "id": "jul_tecnico",
        "estilo": "Confrontativo",
        "titulo": "Pergunte ao técnico",
        "texto": "Dizer que a decisão é dela também transfere responsabilidade.",
        "categoria": "vozes",
        "fonte": "",
        "tag": "",
        "essencial": 0,
        "condicao": "sempre"
      }
    ],
    "decisoes": {
      "jul_A": {
        "letra": "A",
        "titulo": "Respeitar o pedido e escalá-la",
        "desc": "Não registra a dor.",
        "consequenciaTitulo": "Júlia começa a partida.",
        "consequencia": "Agrava a dor e sai no primeiro tempo.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Evitou interromper",
        "eixos": {
          "utilitarismo": -1,
          "deontologia": -2,
          "virtudes": -1,
          "cuidado": -2,
          "justica": -1
        },
        "custo": "Proteção cede à escalação.",
        "eco": "Júlia pergunta por que aceitaram sua decisão pressionada.",
        "tensaoPos": 1,
        "tensaoNota": "Lealdade competitiva acima da proteção."
      },
      "jul_B": {
        "letra": "B",
        "titulo": "Retirá-la sem ouvi-la",
        "desc": "Comunica o afastamento.",
        "consequenciaTitulo": "Júlia não joga.",
        "consequencia": "Sente-se punida por revelar a dor.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Interveio ativamente",
        "eixos": {
          "utilitarismo": 1,
          "deontologia": 1,
          "virtudes": 0,
          "cuidado": 0,
          "justica": 0
        },
        "custo": "Proteção sem participação.",
        "eco": "Atletas passam a esconder desconfortos.",
        "tensaoPos": 5,
        "tensaoNota": "Proteção máxima, sem diálogo suficiente."
      },
      "jul_C": {
        "letra": "C",
        "titulo": "Suspender e avaliar",
        "desc": "Registra sinais e mantém Júlia na conversa.",
        "consequenciaTitulo": "A escalação é alterada.",
        "consequencia": "Júlia participa do plano e apoia a substituta.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Interveio ativamente",
        "eixos": {
          "utilitarismo": 2,
          "deontologia": 2,
          "virtudes": 2,
          "cuidado": 2,
          "justica": 2
        },
        "custo": "Resultado cede ao cuidado responsável.",
        "eco": "A equipe cria protocolo não punitivo.",
        "tensaoPos": 4,
        "tensaoNota": "Proteção priorizada com responsabilidade compartilhada."
      }
    },
    "aberto": "Quais informações ainda faltam para compreender plenamente este conflito?",
    "feedbackInvestigacao": {
      "completa": "",
      "parcial": "",
      "superficial": ""
    }
  },
  {
    "id": "clinica_03",
    "categoria": "Clínica",
    "numero": "Caso 09",
    "tituloCurto": "O que Maria quer saber",
    "colecao": "Clínica, informação e responsabilidade",
    "titulo": "“Professor, o que aconteceu com o João?”",
    "entrada1": "Antes do início de uma atividade em grupo, Maria se aproxima enquanto João organiza seus materiais do outro lado da sala. Ela observa que ele está diferente desde a semana passada e pergunta o que realmente aconteceu com ele.",
    "entrada2": "Maria também participa das sessões, mas não explica inicialmente por que deseja saber. João ainda não percebeu a conversa. Você dispõe de alguns instantes antes de responder.",
    "perguntaDecisao": "Considerando o que você descobriu, como conduz a conversa com Maria?",
    "tipoDecisao": "regua_conduta",
    "regua": {
      "esquerda": "Contar com detalhes",
      "direita": "Encerrar o assunto"
    },
    "tensao": {
      "esquerda": "Proteção das informações de João",
      "direita": "Resposta à preocupação apresentada"
    },
    "elenco": [
      [
        "Profissional responsável",
        "Você",
        "Conduz as sessões e precisa decidir como responder ao que Maria perguntou."
      ],
      [
        "Participante",
        "João",
        "Realiza acompanhamento após um AVC e está do outro lado da sala."
      ],
      [
        "Participante",
        "Maria",
        "Percebeu algo diferente e procura o profissional antes da atividade."
      ],
      [
        "Grupo",
        "Outros participantes",
        "Circulam pelo ambiente e podem ouvir parte da conversa."
      ]
    ],
    "pistas": [
      {
        "id": "jm_sessao",
        "estilo": "Memória",
        "titulo": "Relembre a última sessão",
        "texto": "Durante a sessão anterior, João mencionou que algumas dificuldades permaneceram após o AVC. Descreveu insegurança para caminhar, alterações na rotina e receio de perder autonomia.",
        "categoria": "fatos",
        "fonte": "Memória",
        "tag": "origem_sessao",
        "essencial": 1,
        "condicao": "sempre"
      },
      {
        "id": "jm_relacao",
        "estilo": "Observacional",
        "titulo": "Observe a relação entre eles",
        "texto": "Maria participa do mesmo grupo. Ela e João conversam ocasionalmente, mas ela não é familiar, responsável por ele ou integrante da equipe profissional.",
        "categoria": "fatos",
        "fonte": "Ambiente",
        "tag": "sem_vinculo_legitimo",
        "essencial": 1,
        "condicao": "sempre"
      },
      {
        "id": "jm_motivo",
        "estilo": "Empático",
        "titulo": "Pergunte por que Maria quer saber",
        "texto": "Maria relata que viu João se desequilibrar na saída. Pouco depois, ouviu quando ele ofereceu carona para dois participantes.",
        "categoria": "vozes",
        "fonte": "Personagem",
        "tag": "risco_direcao",
        "essencial": 1,
        "condicao": "sempre"
      },
      {
        "id": "jm_registro",
        "estilo": "Procedimental",
        "titulo": "Consulte o registro da sessão",
        "texto": "O relato de João foi registrado para acompanhamento profissional. Não há indicação de que ele tenha autorizado o compartilhamento dessas informações com outros participantes.",
        "categoria": "responsabilidades",
        "fonte": "Registro",
        "tag": "sem_autorizacao",
        "essencial": 1,
        "condicao": "sempre"
      }
    ],
    "decisoes": {
      "jm_1": {
        "letra": "1",
        "posicaoRegua": 1,
        "titulo": "Contar o que João relatou",
        "desc": "“João contou que, depois do AVC, permaneceu com insegurança para caminhar e outras limitações na rotina.”",
        "consequenciaTitulo": "A informação circula pelo grupo.",
        "consequencia": "Maria agradece, mas comenta o relato com outros participantes. No encontro seguinte, João percebe que detalhes mencionados durante a sessão se tornaram conhecidos e passa a responder apenas o indispensável.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Interveio ativamente",
        "eixos": {
          "utilitarismo": -1,
          "deontologia": -2,
          "virtudes": -1,
          "cuidado": -2,
          "justica": -1
        },
        "custo": "Você respondeu à preocupação de Maria expondo informações de João além do necessário.",
        "eco": "Duas semanas depois, João pergunta se ainda pode falar livremente durante as sessões sem que o grupo fique sabendo.",
        "tensaoPos": 5,
        "tensaoNota": "A resposta à preocupação recebe prioridade máxima por meio da revelação de informações que João forneceu durante uma sessão.",
        "profissional": {
          "nivel": "Atenção elevada",
          "feedback": "A decisão apresenta sinal de imprudência na divulgação e compromete a confidencialidade da relação profissional."
        }
      },
      "jm_2": {
        "letra": "2",
        "posicaoRegua": 2,
        "titulo": "Resumir a situação de João",
        "desc": "“Ele ainda apresenta algumas sequelas e dificuldades na rotina.”",
        "consequenciaTitulo": "Uma confirmação ganha novas versões.",
        "consequencia": "Maria interpreta a resposta como confirmação de que João ainda não está bem. A informação se espalha pelo grupo e recebe detalhes que você nunca forneceu.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Interveio ativamente",
        "eixos": {
          "utilitarismo": 0,
          "deontologia": -1,
          "virtudes": -1,
          "cuidado": -1,
          "justica": -1
        },
        "custo": "Você reduziu os detalhes, mas ainda relativizou a proteção da informação para responder diretamente a Maria.",
        "eco": "João ouve de um colega que todos estão sabendo das sequelas e não consegue identificar de onde a informação partiu.",
        "tensaoPos": 5,
        "tensaoNota": "Mesmo sem detalhar, a resposta confirma uma condição pessoal de João a alguém que não integra seu cuidado.",
        "profissional": {
          "nivel": "Merece atenção",
          "feedback": "A comunicação parcial não elimina o risco de exposição; confirmar uma condição também compartilha informação."
        }
      },
      "jm_3": {
        "letra": "3",
        "posicaoRegua": 3,
        "titulo": "Confirmar sem detalhar",
        "desc": "“Ele está enfrentando algumas limitações, mas prefiro não entrar em detalhes.”",
        "consequenciaTitulo": "A pergunta permanece parcialmente aberta.",
        "consequencia": "Maria entende que existe uma condição pessoal confirmada, mas sua preocupação com o episódio da saída não é explorada. Ela procura outros participantes para tentar compreender o que ocorreu.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Interveio ativamente",
        "eixos": {
          "utilitarismo": 0,
          "deontologia": 0,
          "virtudes": 0,
          "cuidado": -1,
          "justica": 0
        },
        "custo": "Você tentou preservar detalhes, mas confirmou uma situação de João e deixou a preocupação de Maria sem encaminhamento.",
        "eco": "Maria comenta que não queria conhecer o diagnóstico de João; queria apenas evitar que ele dirigisse caso estivesse inseguro.",
        "tensaoPos": 4,
        "tensaoNota": "A decisão limita os detalhes, porém ainda confirma informação pessoal e não acolhe adequadamente o motivo da pergunta.",
        "profissional": {
          "nivel": "Atenção moderada",
          "feedback": "Há proteção parcial, mas a resposta combina confirmação desnecessária com investigação insuficiente da preocupação."
        }
      },
      "jm_4": {
        "letra": "4",
        "posicaoRegua": 4,
        "titulo": "Não revelar e acolher a preocupação",
        "desc": "“Não posso comentar a situação dele, mas quero compreender por que você está preocupada.”",
        "consequenciaTitulo": "A pergunta revela outro problema.",
        "consequencia": "Maria explica o que observou na saída. Você não revela informações de João e reconhece que existe uma questão de segurança a ser verificada diretamente com ele antes do fim da sessão.",
        "consequenciaComPistaTitulo": "",
        "consequenciaComPista": "",
        "pistaCondicional": "",
        "acaoOmissao": "Interveio ativamente",
        "eixos": {
          "utilitarismo": 2,
          "deontologia": 2,
          "virtudes": 2,
          "cuidado": 2,
          "justica": 2
        },
        "custo": "Você não ofereceu a resposta direta que Maria esperava, mas preservou João sem abandonar a responsabilidade de compreender o possível risco.",
        "eco": "Após conversar diretamente com João, vocês combinam uma alternativa segura para o retorno. Maria recebe apenas a informação necessária para reorganizar a carona.",
        "tensaoPos": 3,
        "tensaoNota": "A decisão procura preservar as informações de João e, ao mesmo tempo, mantém aberta a investigação de uma preocupação relevante.",
        "profissional": {
          "nivel": "Sem alerta relevante",
          "feedback": "A conduta articula confidencialidade, escuta e vigilância sem compartilhar informações além do necessário."
        }
      },
      "jm_5": {
        "letra": "5",
        "posicaoRegua": 5,
        "titulo": "Encerrar imediatamente",
        "desc": "“Não vou falar sobre isso.”",
        "consequenciaTitulo": "Maria se afasta sem explicar a pergunta.",
        "consequencia": "Você não revela informações de João. Mais tarde, descobre que Maria havia observado o desequilíbrio antes de ele oferecer carona a outros participantes.",
        "consequenciaComPistaTitulo": "A preocupação conhecida não recebe encaminhamento.",
        "consequenciaComPista": "Mesmo depois de saber que Maria observou um desequilíbrio e uma possível situação de risco, você encerra o assunto sem conversar com João ou organizar outra forma de retorno.",
        "pistaCondicional": "jm_motivo",
        "acaoOmissao": "Evitou envolver-se",
        "eixos": {
          "utilitarismo": -1,
          "deontologia": 0,
          "virtudes": -1,
          "cuidado": -2,
          "justica": -1
        },
        "custo": "Você evitou compartilhar informações, mas colocou em tensão a escuta, a vigilância e o acompanhamento de uma preocupação concreta.",
        "eco": "No encontro seguinte, Maria diz que deixou de procurar a equipe porque interpretou a resposta como falta de interesse.",
        "tensaoPos": 1,
        "tensaoNota": "A proteção das informações é tratada como silêncio absoluto, sem acolhimento ou continuidade do cuidado.",
        "profissional": {
          "nivel": "Merece atenção",
          "feedback": "Há possível sinal de negligência: preservar informações não elimina o dever de escutar e encaminhar uma preocupação relevante."
        }
      }
    },
    "aberto": "A pergunta de Maria é apenas curiosidade ou contém uma preocupação relevante? Como responder sem transformar proteção da informação em encerramento da responsabilidade?",
    "feedbackInvestigacao": {
      "completa": "Você reuniu a origem da informação, a relação entre as pessoas, a ausência de autorização e o motivo da preocupação antes de decidir.",
      "parcial": "Você encontrou parte do contexto, mas decidiu sem esclarecer todas as relações e riscos relevantes.",
      "superficial": "Sua decisão foi tomada com uma compreensão muito limitada do caso. Uma conduta aparentemente prudente pode produzir omissão ou exposição quando faltam informações essenciais."
    }
  }
];

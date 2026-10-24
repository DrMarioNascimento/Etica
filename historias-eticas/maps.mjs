// A situação reflete o conhecimento disponível; efeitos e pendências variam com a escolha.
const rows=[
['Lia anotou pontos em três aulas. Davi atribuiu isso a desinteresse, sem que Lia tivesse sido ouvida.',
['Lia ganha um espaço reservado para explicar sua experiência; Davi tem sua interpretação colocada em exame.','Lia precisa responder diante dos colegas; Helena ainda não compreende seu interesse.','A turma mantém o treino, enquanto Lia continua fora do jogo.'],
['Ouvir Lia e confrontar a interpretação inicial com seu relato.','Reabrir a conversa sem pressupor desinteresse e sem expor Lia.','Ouvir também Lia: a explicação de Davi não substitui a dela.'],
'Fatos descrevem o que ocorreu. Interpretações atribuem sentidos e motivos, que precisam de evidências e podem ser revistos.'],
['Lia relatou comentários dos colegas, disse querer jogar e pediu para não ser exposta.',
['Lia recebe uma promessa de sigilo absoluto; Helena pode precisar de apoio que não explicou.','Lia participa da construção da resposta; Helena assume um compromisso de retorno.','Lia enfrenta a possibilidade de exposição pública que pediu para evitar.'],
['Esclarecer com cuidado os limites da promessa e combinar uma resposta protetiva.','Realizar a medida combinada e verificar com Lia seus efeitos.','Rever a proposta com Lia antes de levar seu relato ao grupo.'],
'O cuidado considera necessidades concretas, relações e vulnerabilidades. Proteger inclui ouvir a pessoa e acompanhar os efeitos da resposta.'],
['Lia aceitou participar da aula, mas recusou aparecer na campanha proposta pela direção.',
['Lia enfrenta a insistência de uma autoridade; a campanha mantém prioridade sobre sua recusa.','Lia deixa de ser exposta; outras possibilidades de campanha não foram exploradas.','Lia mantém sua participação na aula; a direção precisa buscar adesão voluntária à campanha.'],
['Interromper a pressão e distinguir participação na aula de participação na campanha.','Examinar alternativas que preservem a recusa de Lia e permitam participação voluntária.','Garantir que a recusa não gere prejuízo e que a participação na campanha seja voluntária.'],
'Autonomia exige informação e ausência de pressão indevida. Uma finalidade positiva não dispensa respeito à pessoa e aos meios utilizados.'],
['Há quatro vagas para uma demonstração educativa. Os estudantes tiveram diferentes oportunidades anteriores de preparação.',
['Bruno tem o desempenho reconhecido; estudantes com menos oportunidades podem continuar sem acesso.','Interessados têm uma chance comum; Bruno questiona como sua dedicação será reconhecida.','A turma participa da discussão; Helena precisa aplicar critérios que sejam claros e justificáveis.'],
['Justificar o critério diante do objetivo educativo e enfrentar a desigualdade de oportunidades.','Explicar os limites do sorteio e concretizar as próximas oportunidades prometidas.','Explicar preparação suficiente, aplicar os critérios com transparência e acompanhar quem ficou fora.'],
'Justiça examina a distribuição de oportunidades. Equidade considera diferenças relevantes; nenhum procedimento garante justiça em todo contexto.'],
['A direção propôs dedicar três aulas aos quatro representantes. Os demais estudantes também precisam de oportunidades de aprendizagem.',
['Representantes ganham ensaio exclusivo; o restante da turma perde tempo de prática.','A turma mantém a programação; os representantes ficam sem preparação específica.','A turma conserva oportunidades; os representantes têm menos ensaio exclusivo e pedem avaliação.'],
['Responder pela aprendizagem dos demais, que não é representada pelo brilho da apresentação.','Reavaliar como cumprir o compromisso com o festival sem excluir os demais.','Verificar se a proposta integrada realmente atende à aprendizagem e à preparação.'],
'Analisar consequências exige considerar pessoas, intensidade e duração dos efeitos. Apoio da maioria não basta para demonstrar uma boa decisão.'],
['Helena enfrenta pressão por rapidez e teme conflito com Davi e a coordenação.',
['A reunião fica menos tensa; os estudantes não sabem quais compromissos poderão cobrar.','Helena sustenta uma posição; a coordenação autoriza uma experiência e Davi mantém a discordância.','Davi se defende de uma acusação pessoal; a discussão se afasta das razões da proposta.'],
['Tornar os compromissos explícitos e enfrentar o problema adiado.','Executar a experiência e apresentar seus resultados no prazo combinado.','Retomar o debate sobre fatos e argumentos, reconhecendo a acusação não demonstrada.'],
'Prudência avalia a ação possível no contexto. Coragem permite sustentar razões; não se confunde com agressividade nem ignora as pressões existentes.'],
['Existe um aviso de instabilidade na base, uma montagem alternativa e nenhuma verificação competente que confirme a segurança.',
['Estudantes continuam expostos a uma instabilidade conhecida, apesar da advertência.','Estudantes usam outra montagem; a turma perde parte do ensaio e precisa reorganizar a apresentação.','Estudantes usam uma base reparada sem preparo para atestar sua segurança.'],
['Retirar a instabilidade conhecida do uso e buscar verificação competente; a ausência de lesão não resolve o problema.','Registrar a ocorrência e confirmar quem realizará a verificação antes de retomar o uso.','Interromper o uso sem verificação e encaminhar o material a uma pessoa competente.'],
'O resultado sozinho não prova nem exclui falhas. Examine cuidado devido, cautela e preparo técnico ao discutir negligência, imprudência ou imperícia.'],
['A apresentação foi elogiada, mas os estudantes relataram necessidades e compromissos ainda sem resposta.',
['A instituição registra o êxito; necessidades de Lia, Bruno e de quem não viajou ficam fora do balanço.','O projeto é abandonado; a turma perde também as possibilidades de continuidade e melhoria.','Os envolvidos participam do balanço; novos compromissos precisam de responsáveis e prazo.'],
['Incluir os efeitos menos visíveis na avaliação antes de repetir o formato.','Distinguir o que precisa ser corrigido daquilo que merece continuidade.','Cumprir os encaminhamentos e voltar aos envolvidos para avaliar seus efeitos.'],
'Deliberar inclui acompanhar e revisar. Novas informações podem exigir correção; rever uma escolha não apaga a responsabilidade pelos efeitos anteriores.']
];
export function situationMap(index,choice,chapter){
 const [facts,people,pending,theory]=rows[index];
 return [{label:'Situação conhecida',text:facts,kind:'facts'},{label:'Sua escolha confirmada',text:chapter.choices[choice][0],kind:'choice'},
 {label:'Pessoas afetadas',text:people[choice],kind:'people'},{label:'Consequências na história',text:chapter.choices[choice][1],kind:'effects'},
 {label:chapter.theory.name,text:theory,kind:'theory'},{label:'O que segue adiante',text:pending[choice],kind:'pending'}];
}

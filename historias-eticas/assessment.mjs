// Referência pedagógica para os fatos desta história, não julgamento de caráter.
// Várias respostas podem ser defensáveis; o critério é explícito por capítulo.
const rubrics=[
{reference:0,accepted:[0],criterion:'Distinguir o fato observado de uma interpretação ainda não verificada e ouvir a pessoa envolvida.',reasons:[
'A escolha verifica a distribuição dos papéis e ouve Lia antes de atribuir um motivo à sua conduta.',
'A pergunta assume como verdadeiro que Lia não gosta de jogar e a expõe diante da turma, sem confirmar essa interpretação.',
'A escolha adia a escuta de Lia e mantém sua exclusão naquele dia. A impressão de Davi, sozinha, não esclarece o interesse dela.'],support:'Distinguir fatos e interpretações exige verificar as razões atribuídas às pessoas. Ouvir Lia permite confrontar a hipótese de desinteresse com seu relato.'},
{reference:1,accepted:[1],criterion:'Construir o cuidado com Lia, respeitando sua participação e explicando os limites das promessas.',reasons:[
'A promessa de segredo absoluto foi feita antes de avaliar possíveis necessidades de proteção e apoio. Ela cria um compromisso que pode impedir o cuidado necessário.',
'A escolha combina escuta, participação de Lia, explicação dos limites e acompanhamento da resposta.',
'A conversa coletiva foi proposta sem combinar a exposição com Lia, apesar de ela ter pedido que seu nome não fosse usado.'],support:'A ética do cuidado considera a pessoa concreta, sua vulnerabilidade e a relação de confiança. Cuidar inclui combinar uma resposta e acompanhar seus efeitos.'},
{reference:2,accepted:[1,2],criterion:'Respeitar a recusa da campanha sem prejudicar a participação de Lia na aula.',reasons:[
'A insistência diante de uma autoridade aumenta a pressão sobre Lia e não respeita a recusa já apresentada.',
'Interromper a campanha protege Lia da exposição. É uma decisão defensável; sua limitação é deixar de explorar outras formas de realizar o projeto.',
'A escolha respeita a recusa de Lia e reformula os meios da campanha com participação voluntária.'],support:'Autonomia e dignidade exigem respeitar a pessoa, sem usá-la meramente como instrumento de uma boa causa. Participar da aula não implica aceitar a campanha.',conditions:{1:'A suspensão não pode gerar punição, culpa ou prejuízo para Lia. Outras possibilidades de campanha podem ser discutidas depois.'}},
{reference:2,accepted:[1,2],criterion:'Distribuir oportunidades de acordo com o objetivo educativo e com critérios justificáveis para a turma.',reasons:[
'O desempenho atual, como único critério, ignora diferenças de oportunidade e não foi justificado para uma demonstração educativa, que não é um campeonato.',
'O sorteio entre interessados preparados oferece uma chance comum. É defensável neste objetivo, desde que as condições sejam claras e as oportunidades futuras sejam cumpridas.',
'A combinação de critérios públicos considera interesse, preparação e oportunidades anteriores, com participação da turma.'],support:'Justiça e equidade exigem examinar objetivos, barreiras e oportunidades. Procedimentos diferentes podem ser justificáveis, desde que seus critérios sejam claros e seus efeitos acompanhados.',conditions:{1:'Verificar interesse e preparação necessária, explicar o sorteio e concretizar as próximas oportunidades.',2:'Explicar o que conta como preparação suficiente e aplicar os critérios com transparência, sem favoritismo.'}},
{reference:2,accepted:[1,2],criterion:'Considerar a aprendizagem de toda a turma e explicitar os custos e compromissos da preparação para o festival.',reasons:[
'A preparação exclusiva beneficia quatro pessoas e retira dos demais três aulas de prática. O brilho da apresentação não justifica ignorar esse custo educativo.',
'Preservar a programação protege a aprendizagem da turma. É defensável, mas exige rever explicitamente o compromisso com o festival e comunicar os limites de preparação.',
'A integração busca preservar a aprendizagem da turma e oferecer preparação específica, com avaliação dos resultados.'],support:'A análise das consequências inclui todas as pessoas afetadas e os custos menos visíveis. Pode haver mais de uma decisão justificável quando prioridades e compromissos são explicitados.',conditions:{1:'Renegociar as expectativas do festival e não tratar como cumprido um compromisso de preparação que deixou de ser atendido.',2:'Confirmar que as tarefas integradas proporcionam aprendizagem real aos demais, em vez de apenas ocupá-los.'}},
{reference:1,accepted:[1],criterion:'Enfrentar a pressão com razões, transparência e ação possível, sem atacar pessoas nem ocultar compromissos.',reasons:[
'A concordância pública acompanhada de compensação discreta deixa os compromissos pouco claros e adia o problema em vez de enfrentá-lo com transparência.',
'A escolha sustenta razões, reconhece os limites de tempo e negocia condições concretas para agir.',
'A acusação atribui a Davi um motivo não demonstrado e desloca a discussão dos argumentos para um ataque pessoal.'],support:'Prudência avalia o que é possível e adequado no contexto; coragem permite sustentar uma posição com razões. Nenhuma delas dispensa respeito e honestidade.'},
{reference:1,accepted:[1],criterion:'Responder à instabilidade conhecida com cuidado e verificação competente, em vez de transferir o risco aos estudantes.',reasons:[
'Pedir atenção extra não corrige nem esclarece a instabilidade conhecida. A escolha mantém uma exposição que poderia ser evitada com a montagem alternativa.',
'A escolha retira o material de uso, busca verificação competente e adapta a atividade, assumindo o custo de reorganizar o ensaio.',
'O reparo foi improvisado sem preparo para atestar sua segurança. A aparência de estabilidade não substitui a verificação competente.'],support:'Responsabilidade envolve cuidado, cautela e reconhecimento dos limites de competência. A ausência de lesão não comprova que os cuidados exigidos foram tomados.'},
{reference:2,accepted:[2],criterion:'Avaliar benefícios e problemas do projeto e acompanhar as necessidades que permaneceram.',reasons:[
'O registro apenas do sucesso deixa de fora problemas relatados e repete o formato sem examiná-los.',
'O abandono impede distinguir o que precisa de correção das aprendizagens e possibilidades que poderiam continuar.',
'A escolha incorpora os relatos dos envolvidos e transforma a avaliação em mudanças com responsáveis e prazo.'],support:'Uma análise atenta à complexidade reconhece benefícios, problemas e incertezas simultâneos. Deliberar inclui acompanhar, corrigir e justificar o que será mantido.'}
];
export function assessDecision(index,choice,decisions=[]){
 const r= index===7&&[0,2].includes(decisions[6])?{reference:2,accepted:[2],criterion:'Priorizar a pessoa lesionada, assumir o acompanhamento e responder pelos efeitos da decisão com apuração e reparação.',reasons:[
 'Havia um aviso e uma alternativa de montagem. Tratar a queda como inevitável ignora informações disponíveis e deixa a família sem resposta ao dano.',
 'Abandonar o projeto não oferece acompanhamento nem esclarece a decisão anterior. O afastamento transfere as tarefas sem resolver a responsabilidade.',
 'A escolha transforma o reconhecimento do dano em acompanhamento, esclarecimento e reparação com compromissos verificáveis. Isso não apaga a lesão nem encerra por si só a apuração.'],support:'Responsabilidade e cuidado continuam depois do dano. Revisar exige responder às pessoas afetadas, reparar o que for possível e prevenir repetição. Uma decisão posterior adequada não torna adequada a exposição anterior ao risco.'}:rubrics[index];if(!r||!Number.isInteger(choice)||choice<0||choice>2)throw new Error('Decisão inválida');
 const adequate=r.accepted.includes(choice);
 return {adequate,reference:r.reference,accepted:[...r.accepted],criterion:r.criterion,reason:r.reasons[choice],support:r.support,condition:r.conditions?.[choice]||'',referenceReason:r.reasons[r.reference]};
}

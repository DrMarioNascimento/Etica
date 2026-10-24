import * as base from './story.mjs?v=4';
import {situationMap as baseMap} from './maps.mjs?v=4';
import {assessDecision as baseAssessment} from './assessment.mjs?v=4';
import {newStories} from './stories/catalog-data.mjs?v=4';
const concepts={
 fatos:['Fatos e interpretações','Uma observação e a explicação que damos a ela não são a mesma coisa. Verificar registros e ouvir as pessoas ajuda a reconhecer o que sabemos e o que ainda é hipótese.'],
 cuidado:['Ética do cuidado','Cuidar exige atenção às necessidades e às relações concretas. A pessoa afetada participa da resposta, e o compromisso continua depois da primeira conversa.'],
 autonomia:['Autonomia e dignidade','Decidir com informação e sem pressão indevida exige considerar desigualdades de poder. A pessoa não é apenas um meio para o objetivo de um serviço ou projeto.'],
 justica:['Justiça e equidade','Justiça examina quem recebe oportunidades e quem suporta custos. Equidade considera diferenças relevantes, com critérios justificáveis e aplicados de modo consistente.'],
 deveres:['Deveres e meios da ação','Uma finalidade desejável não torna qualquer meio aceitável. Respeitar as pessoas também exige honestidade, limites e compromissos que possam ser explicados.'],
 virtudes:['Prudência, coragem e liberdade situada','Agir com prudência é examinar possibilidades e limites concretos. Coragem permite sustentar razões sob pressão, sem confundir firmeza com agressividade.'],
 consequencias:['Consequências e complexidade','Uma decisão pode beneficiar alguns e prejudicar outros. É preciso considerar intensidade, duração e distribuição dos efeitos, incluindo quem quase não aparece na decisão.'],
 responsabilidade:['Responsabilidade profissional','Negligência envolve omissão de cuidado devido; imprudência, ação sem a cautela exigida; imperícia, insuficiência de preparo técnico necessário. São hipóteses que exigem fatos, não rótulos automáticos a partir do resultado.'],
 integridade:['Integridade na pesquisa','Produzir conhecimento exige fidelidade ao que foi feito e observado, registro das decisões e respeito aos participantes. Uma conclusão útil ou atraente precisa continuar sustentada pelas evidências.'],
 revisao:['Reparação e acompanhamento','Reconhecer um dano exige responder à pessoa e reparar o que for possível. Uma ação posterior adequada não apaga a decisão anterior nem garante que a confiança volte.']
};
export const catalog=[{id:'antes-do-apito',title:base.intro.title,description:base.intro.subtitle,chapters:8},...newStories.map(s=>({id:s.id,title:s.title,description:s.description,chapters:6}))];
function rubric(c,choice){const r=c.rubric;return {adequate:r.accepted.includes(choice),reference:r.reference,accepted:[...r.accepted],criterion:r.criterion,reason:r.reasons[choice],support:c.theory.text,condition:'',referenceReason:r.reasons[r.reference]};}
function chapterFrom(raw,index){
 const [name,text]=concepts[raw.concept];
 return {id:`etapa-${index}`,title:raw.title,scene:raw.scene,question:raw.question,choices:raw.options.map(o=>o.slice(0,2)),theory:{name,text:`${text} ${raw.support}`},rubric:{reference:raw.reference,accepted:raw.accepted||[raw.reference],criterion:raw.support,reasons:raw.options.map(o=>o[2])},people:raw.people,pending:raw.options.map((o,i)=>i===raw.reference?'Cumprir o encaminhamento e verificar seus efeitos com as pessoas afetadas.':'Responder aos efeitos registrados, rever a conduta e acompanhar quem assumiu seus custos.')};
}
const rotate=(options,amount)=>[...options.slice(amount),...options.slice(0,amount)];
function harmFor(s,d){return d[3]!==s.chapters[3].reference||(s.id==='mapa-caminho'&&d[2]===0);}
function delayedChapter(s,index,decisions,order){
 const a=s.aftermath,harm=harmFor(s,decisions),shift=(order+index)%3;
 if(index===4){
 const options=rotate([
 [a.repair,harm?a.repairEffect:a.safeEffect,'A resposta enfrenta os efeitos conhecidos, preserva os fatos e estabelece compromissos com as pessoas afetadas.'],
 [a.avoid,a.avoidEffect,'A medida desloca a atenção do que as pessoas precisam para a conveniência ou a imagem de quem decidiu.'],
 [a.delegate,a.delegateEffect,'A responsabilidade pelo que foi feito exige esclarecimento e acompanhamento; transferi-la sem responder aos fatos não resolve o problema.']],shift);
 return chapterFrom({title:'Duas semanas depois',scene:harm?a.harm:a.safe,question:a.task,concept:'revisao',reference:(3-shift)%3,options,support:a.legacy,people:s.cast.map(c=>c[0]).join(', ')+': as necessidades e os efeitos narrados continuam em acompanhamento.'},index);
 }
 const repairIndex=(3-((order+4)%3))%3,repaired=decisions[4]===repairIndex;
 const options=rotate([
 [a.prevent,'A nova medida tem responsáveis e passa a ser acompanhada. '+a.legacy,'A proposta muda condições que produziram o problema e permite verificar se os compromissos foram cumpridos.'],
 [a.shortcut,'A facilidade imediata mantém condições do problema. '+a.legacy,'A escolha repete o mecanismo que precisa ser revisto e não responde aos efeitos já conhecidos.'],
 [a.cosmetic,'A apresentação muda, mas as condições essenciais permanecem. '+a.legacy,'Uma mudança de aparência não substitui uma mudança na forma de agir e acompanhar.']],shift);
 return chapterFrom({title: /Três meses/.test(a.finalScene)?'Três meses depois':/Dois meses/.test(a.finalScene)?'Dois meses depois':'Um mês depois',scene:a.finalScene+' '+(repaired?'Os encaminhamentos anteriores estão registrados e precisam continuar sendo cumpridos.':'A resposta anterior deixou pendências com as pessoas afetadas. A nova proposta não as encerra.'),question:'Que mudança será assumida daqui em diante?',concept:'revisao',reference:(3-shift)%3,options,support:a.legacy,people:s.cast.map(c=>c[0]).join(', ')+': a continuidade das relações não depende apenas de encerrar o projeto.'},index);
}
function newMap(index,choice,c){return [{label:'Situação conhecida',text:c.scene,kind:'facts'},{label:'Sua escolha confirmada',text:c.choices[choice][0],kind:'choice'},{label:'Pessoas afetadas',text:c.people,kind:'people'},{label:'Consequências na história',text:c.choices[choice][1],kind:'effects'},{label:c.theory.name,text:c.theory.text,kind:'theory'},{label:'O que segue adiante',text:c.pending[choice],kind:'pending'}];}
function baseEpilogue(d){
 const hurt=[0,2].includes(d[6]),person=d[6]===0?'Bruno':'Lia';
 return {title:'Três meses depois',paragraphs:hurt?[
 `${person} retomou parte da rotina, mas ainda tem receio de algumas atividades. O acompanhamento continua; o fim do festival não marcou o fim da recuperação.`,
 d[7]===2?'A família recebeu os valores do acordo narrado. Helena cumpriu sua parte e continua respondendo à apuração; o reembolso não recuperou o tempo perdido.':'A família continua cobrando explicações e tratamento dos prejuízos. Helena ainda precisa responder pela decisão sobre a base e pela forma como lidou com o dano.',
 'A turma conhece a história da interrupção. Reconstruir confiança exige mudanças verificáveis no cuidado com os materiais e nas decisões de quem orienta.']:[
 'Bruno voltou a treinar para outras oportunidades. Retirar a base não garantiu uma vitória, mas evitou aquele risco conhecido durante a preparação.',
 d[7]===2?'Lia participa do acompanhamento dos comentários e dos novos combinados. Ainda pode discordar e pedir mudanças; sua participação não encerra o trabalho de inclusão.':'Lia ainda pergunta o que será feito sobre os comentários. O resultado da apresentação não respondeu às necessidades que ficaram sem acompanhamento.',
 d[7]===2?'Helena revisita com a turma os responsáveis e prazos. A coordenação avalia o projeto por seus efeitos, além dos aplausos.':'Helena percebe que encerrar ou abandonar o projeto não respondeu aos compromissos assumidos. A turma continua esperando uma devolutiva.']};
}
export function getStory(id){
 if(id==='antes-do-apito')return {id,version:base.VERSION,motto:base.motto,intro:base.intro,protagonist:'Helena',chapters:base.chapters,chapterFor:(i,d)=>{const c=base.chapterFor(i,d);return i===7?{...c,title:'Duas semanas depois · '+c.title,scene:'Duas semanas se passaram desde a última aula de preparação. '+c.scene}:c;},situationMap:baseMap,assessDecision:baseAssessment,echo:base.echo,previous:i=>({1:0,4:3,7:6})[i],epilogue:baseEpilogue};
 const order=newStories.findIndex(s=>s.id===id);if(order<0)return null;const s=newStories[order];
 const chapterFor=(i,d=[])=>{
  if(i>=4)return delayedChapter(s,i,d,order);
  const c=chapterFrom(s.chapters[i],i);
  if(s.id==='mapa-caminho'&&i===3&&d[2]===0){
   c.scene='O arquivo bruto que você decidiu publicar já foi copiado. Um colega identificou a casa e o horário de Cauê; outros passaram a esperá-lo para intimidá-lo. Marisa reorganizou seu trabalho para acompanhá-lo. O painel às famílias ainda será enviado e Olívia pode restringir o acesso e mudar o material. O dano inicial já aconteceu.';
   c.choices=c.choices.map(o=>[...o]);
   c.choices[0][1]='Olívia restringe o acesso e envia apenas o material revisto, mas as cópias anteriores continuam sendo uma preocupação. Cauê já foi intimidado e a família precisou mudar a rotina. A contenção reduz nova exposição; não desfaz a divulgação anterior.';
   c.pending[0]='Acompanhar Cauê e a família, comunicar o incidente às instâncias responsáveis e tratar as cópias, os riscos e os prejuízos já produzidos.';
  }
  return c;
 };
 return {id,version:id+'-1',motto:base.motto,protagonist:s.protagonist,intro:{title:s.title,subtitle:s.description,text:`Você acompanha ${s.protagonist}. As decisões vão afetar pessoas, compromissos e relações que continuam depois da atividade. A história avança no tempo e retoma o que você escolheu.`,cast:s.cast},chapters:Array.from({length:6},(_,i)=>chapterFor(i,[])),chapterFor,situationMap:newMap,assessDecision:(i,c,d)=>rubric(chapterFor(i,d),c),previous:i=>i>0?i-1:undefined,echo:(i,d)=>i>0?chapterFor(i-1,d).choices[d[i-1]]?.[1]||'':'',epilogue:d=>{
 const hurt=harmFor(s,d),repaired=rubric(chapterFor(4,d),d[4]).adequate,prevention=rubric(chapterFor(5,d),d[5]).adequate;
 // Os desfechos positivos de acompanhamento só são narrados quando a escolha os sustenta.
 const pathway=repaired?(hurt?1:0):2;
 const paragraphs=(!hurt&&!repaired)?[...s.safeUnresolved]:prevention?[...s.endings[pathway]]:[s.endings[pathway][0],`${s.protagonist} continua vinculado aos efeitos do encaminhamento escolhido: ${chapterFor(4,d).choices[d[4]][1]}`];
 return {title:'Seis meses depois',paragraphs:[...paragraphs,prevention?'A mudança escolhida no último capítulo foi iniciada e será avaliada. Ela não altera as escolhas nem os danos anteriores registrados no mapa.':'A última decisão manteve condições que precisavam mudar. Mesmo quando houve alguma reparação, o risco de repetição e os compromissos pendentes continuam.']};
 }};
}

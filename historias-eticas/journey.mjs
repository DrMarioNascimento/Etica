import {getStory as originalStory,catalog as originalCatalog} from './engine.mjs?v=5';
import {expansions} from './expansions/index.mjs?v=5';
export const catalog=originalCatalog.map(s=>({...s,decisions:s.chapters+Object.values(expansions[s.id].extras).reduce((n,x)=>n+x.length,0)}));
export function getStory(id){
 const base=originalStory(id);if(!base)return null;const x=expansions[id];
 function chapterFor(i,d=[]){const c=base.chapterFor(i,d);return {...c,scene:x.details[i]+'\n\n'+c.scene};}
 function stepsFor(i,d=[]){const primary=chapterFor(i,d);return [primary,...(x.extras[i]||[]).map((r,j)=>({id:primary.id+'-cena-'+(j+2),title:r.title,scene:r.scene,question:r.question,choices:r.options.map(o=>o.slice(0,2)),theory:{name:primary.theory.name,text:primary.theory.text+' Nesta decisão: '+r.options[r.reference][2]},rubric:{reference:r.reference,accepted:r.accepted||[r.reference],reasons:r.options.map(o=>o[2])},later:r.options.map(o=>o[3]),people:base.situationMap(i,0,primary).find(n=>n.kind==='people').text}))];}
 function assessStep(i,j,choice,d){if(j===0)return base.assessDecision(i,choice,d);const c=stepsFor(i,d)[j],r=c.rubric;return {adequate:r.accepted.includes(choice),accepted:r.accepted,reference:r.reference,reason:r.reasons[choice],referenceReason:r.reasons[r.reference],support:c.theory.text,criterion:r.reasons[r.reference],condition:''};}
 function stepMap(i,j,choice,d){const c=stepsFor(i,d)[j];if(j===0)return base.situationMap(i,choice,c);return [{kind:'facts',label:'Situação conhecida',text:c.scene},{kind:'choice',label:'Sua escolha confirmada',text:c.choices[choice][0]},{kind:'people',label:'Pessoas afetadas',text:base.intro.cast.map(p=>p[0]).join(', ')+' e as pessoas citadas nesta cena.'},{kind:'effects',label:'Consequências na história',text:c.choices[choice][1]},{kind:'theory',label:c.theory.name,text:c.theory.text},{kind:'pending',label:'O que segue adiante',text:c.later[choice]}];}
 function epilogue(d,steps={}){const end=base.epilogue(d),memories=[];for(let i=0;i<base.chapters.length;i++)for(let j=1;j<(steps[i]||[]).length;j++){const c=stepsFor(i,d)[j];memories.push({title:c.title,text:c.later[steps[i][j]]});}return {...end,memories};}
 function echo(i,d,steps={}){const original=base.echo(i,d);const last=steps[i-1];if(last?.length>1){const c=stepsFor(i-1,d)[last.length-1];return [original,c.choices[last.at(-1)][1]].filter(Boolean).join(' ');}return original;}
 return {...base,chapterFor,stepsFor,assessStep,stepMap,epilogue,echo,totalDecisions:catalog.find(s=>s.id===id).decisions};
}
// Versões antigas permanecem legíveis: nenhuma decisão nova é atribuída ao estudante.
export function restoreJourney(raw,story){
 const blank=()=>({version:story.version,format:2,chapter:0,phase:'intro',decisions:[],steps:{},legacy:[],reflections:{},finished:false});
 if(!raw||typeof raw!=='object')return blank();let d=structuredClone(raw);
 if(story.id==='antes-do-apito'&&d.version==='antes-do-apito-1'){d.version=story.version;if(d.phase==='learning')d.phase='map';delete d.checks;}
 if(d.version!==story.version||!['intro','scene','map','summary'].includes(d.phase)||!Number.isInteger(d.chapter)||d.chapter<0||d.chapter>=story.chapters.length||!Array.isArray(d.decisions)||!d.decisions.every(validChoice)||d.decisions.length>story.chapters.length||!d.reflections||typeof d.reflections!=='object'||Array.isArray(d.reflections)||!Object.values(d.reflections).every(v=>typeof v==='string'&&v.length<=2000))return blank();
 if(d.format===undefined){const n=d.phase==='summary'?story.chapters.length:d.chapter+(d.phase==='map'?1:0);if(d.decisions.length!==n)return blank();d.steps=Object.fromEntries(d.decisions.map((v,i)=>[i,[v]]));d.legacy=d.decisions.map((_,i)=>i);d.format=2;}
 if(d.format!==2||!d.steps||typeof d.steps!=='object'||Array.isArray(d.steps)||!Array.isArray(d.legacy)||!d.legacy.every(i=>Number.isInteger(i)&&i>=0&&i<d.decisions.length)||new Set(d.legacy).size!==d.legacy.length)return blank();
 const n=story.chapters.length;
 if(d.phase==='intro'&&(d.chapter!==0||d.decisions.length||Object.keys(d.steps).length)||d.phase==='summary'&&d.chapter!==n-1)return blank();
 for(const [key,choices] of Object.entries(d.steps)){const i=Number(key);if(!Number.isInteger(i)||String(i)!==key||i<0||i>d.chapter||!Array.isArray(choices)||!choices.length||!choices.every(validChoice)||choices[0]!==d.decisions[i])return blank();}
 const count=i=>d.legacy.includes(i)?1:story.stepsFor(i,d.decisions).length;
 for(let i=0;i<d.chapter;i++)if(d.steps[i]?.length!==count(i))return blank();
 const current=d.steps[d.chapter]||[];
 if(d.phase==='scene'&&(current.length>=count(d.chapter)||d.decisions.length!==d.chapter+(current.length?1:0)))return blank();
 if(d.phase==='map'&&(current.length!==count(d.chapter)||d.decisions.length!==d.chapter+1))return blank();
 if(d.phase==='summary'&&(d.decisions.length!==n||current.length!==count(n-1)))return blank();
 return d;
}
function validChoice(v){return Number.isInteger(v)&&v>=0&&v<3;}

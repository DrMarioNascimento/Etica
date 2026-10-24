const {JSDOM}=require('jsdom'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const engine=await import('./journey.mjs');const {getStory,catalog,restoreJourney}=engine;
 const distribution={1:0,2:0,3:0};for(const item of catalog){const st=getStory(item.id);for(let i=0;i<st.chapters.length;i++)distribution[st.stepsFor(i).length]++;}assert.deepEqual(distribution,{1:24,2:40,3:16});assert.equal(catalog.reduce((n,s)=>n+s.decisions,0),152);
 const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8'),code='const {getStory,catalog,restoreJourney}=window.__engine;\n'+fs.readFileSync(path.join(__dirname,'app.js'),'utf8').replace(/^import .*?;\n/gm,'');
 function setup(id,saved){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://example.test/historias-eticas/'+(id?'?historia='+id:'')});const w=dom.window;w.__engine=engine;w.scrollTo=()=>{};w.Element.prototype.scrollIntoView=()=>{};if(saved)w.sessionStorage.setItem('historia-etica.'+id,saved);w.eval(code);return dom;}
 let dom=setup(),d=dom.window.document;assert.equal(d.querySelectorAll('.story-card').length,6);d.getElementById('catalog-more').click();assert.equal(d.querySelectorAll('.story-card').length,12);d.getElementById('catalog-more').click();assert.equal(d.querySelectorAll('.story-card').length,13);assert(d.getElementById('catalog-more').hidden);const search=d.getElementById('story-search');search.value='pesquisa';search.dispatchEvent(new dom.window.Event('input',{bubbles:true}));assert.equal(d.querySelectorAll('.story-card').length,2);assert(!/bacharelado|licenciatura/i.test(d.body.textContent));dom.window.close();
 let played=0;
 for(const item of catalog)for(let route=0;route<3;route++){
  const story=getStory(item.id),decisions=[],steps={};dom=setup(item.id);let w=dom.window;d=w.document;
  const click=a=>{const b=d.querySelector(`[data-action="${a}"]`);assert(b,a);b.click();};const key='historia-etica.'+item.id;
  const reload=()=>{const saved=w.sessionStorage.getItem(key);dom.window.close();dom=setup(item.id,saved);w=dom.window;d=w.document;};
  assert(d.body.textContent.includes('Leitura complementar'));click('start');
  for(let i=0;i<story.chapters.length;i++){
   steps[i]=[];const count=story.stepsFor(i,decisions,steps).length;assert(count>=1&&count<=3);
   for(let j=0;j<count;j++){
    const c=story.stepsFor(i,decisions,steps)[j];assert(!d.querySelector('.map-legend'));assert(!d.querySelector('.foundation-node'));assert(!d.querySelector('.status-good'));assert(!d.querySelector('#reflection'));assert(!d.body.textContent.includes('Leitura complementar'));assert(d.querySelector('[data-action=confirm]').disabled);for(const paragraph of c.scene.split('\n\n'))assert(d.body.textContent.includes(paragraph));
    const choice=(i+j+route)%3;const radio=d.querySelector(`input[value="${choice}"]`);radio.checked=true;radio.dispatchEvent(new w.Event('change',{bubbles:true}));click('confirm');if(j===0)decisions.push(choice);steps[i].push(choice);played++;
    const stored=JSON.parse(w.sessionStorage.getItem(key));assert.equal(stored.steps[i].length,j+1);assert.deepEqual(stored.decisions,decisions);reload();
    if(j<count-1){assert(d.querySelector('[data-action=confirm]'));assert(!d.querySelector('.map-legend'));assert(d.body.textContent.includes(c.choices[choice][1]));}else assert(d.querySelector('.map-legend'));
   }
   const nodes=d.querySelectorAll('.chosen-path .decision-node');assert.equal(nodes.length,count);assert.equal(d.querySelectorAll('.foundation-node').length,count);assert.equal(d.querySelectorAll('.chapter-chain>.chain-step').length,count);
   for(let j=0;j<count;j++){const c=story.stepsFor(i,decisions,steps)[j],a=story.assessStep(i,j,steps[i][j],decisions);assert(nodes[j].textContent.includes(c.choices[steps[i][j]][0]));assert(nodes[j].classList.contains(a.adequate?'status-good':'status-review'));assert(d.body.textContent.includes(c.choices[steps[i][j]][1]));assert(d.body.textContent.includes(a.reason));}
   click('next');assert(d.getElementById('validation').textContent);const t=d.getElementById('reflection');t.value='Minha reflexão <img src=x onerror=alert(1)> precisa de acompanhamento.';t.dispatchEvent(new w.Event('input',{bubbles:true}));reload();assert(d.getElementById('reflection').value.includes('Minha reflexão'));assert.equal(d.querySelectorAll('img').length,0);click('next');
  }
  assert.equal(d.querySelectorAll('.mind-chapter').length,story.chapters.length);assert.equal(d.querySelectorAll('.chosen-path').length,story.totalDecisions);assert.equal(story.totalDecisions,item.decisions);const end=story.epilogue(decisions,steps);assert.equal(end.memories.length,story.totalDecisions-story.chapters.length);for(const m of end.memories)assert(d.querySelector('.epilogue').textContent.includes(m.text));
  let blob,filename;w.URL.createObjectURL=b=>{blob=b;return'blob:test';};w.URL.revokeObjectURL=()=>{};w.HTMLAnchorElement.prototype.click=function(){filename=this.download;};click('download');assert.equal(filename,item.id+'-meu-percurso.txt');const text=await new Promise(resolve=>{const r=new w.FileReader();r.onload=()=>resolve(r.result);r.readAsText(blob)});assert.equal((text.match(/Sua escolha confirmada:/g)||[]).length,story.totalDecisions);for(const m of end.memories)assert(text.includes(m.text));
  w.print=()=>assert.equal(d.querySelectorAll('.consequence-detail[open]').length,story.totalDecisions);click('print');assert.equal(d.querySelectorAll('.consequence-detail[open]').length,0);click('ask-reset');click('cancel-reset');assert(d.querySelector('.epilogue'));click('ask-reset');click('reset');assert(d.querySelector('[data-action=start]'));dom.window.close();
  // Toda opção das novas cenas altera seu efeito e sua memória posterior.
  for(let i=0;i<story.chapters.length;i++)for(let j=1;j<story.stepsFor(i,decisions,steps).length;j++){const c=story.stepsFor(i,decisions,steps)[j];assert.equal(new Set(c.choices.map(o=>o[1])).size,3);assert.equal(new Set(c.later).size,3);for(let k=0;k<3;k++){const changed=structuredClone(steps);changed[i][j]=k;assert(story.epilogue(decisions,changed).memories.some(m=>m.text===c.later[k]));}}
 }
 // Migração mantém escolhas antigas, sem inventar respostas para novas cenas.
 for(const item of catalog){const story=getStory(item.id),n=story.chapters.length;const old={version:story.version,chapter:n-1,phase:'summary',decisions:Array(n).fill(0),reflections:{},finished:true};const migrated=restoreJourney(old,story);assert.equal(migrated.legacy.length,n);assert.equal(Object.values(migrated.steps).flat().length,n);dom=setup(item.id,JSON.stringify(old));assert.equal(dom.window.document.querySelectorAll('.chosen-path').length,n);assert(dom.window.document.body.textContent.includes('versão anterior'));dom.window.close();
 const partial={...old,chapter:1,phase:'map',decisions:[0,1]};const m=restoreJourney(partial,story);assert.deepEqual(m.steps,{'0':[0],'1':[1]});assert.equal(m.phase,'map');
 for(const bad of [{...m,steps:{'0':[0],'1':[1,8]}},{...m,decisions:[0,2]},{...m,phase:'summary'},{...m,steps:{'0':[0],'1':[1],'9':[0]}}])assert.equal(restoreJourney(bad,story).phase,'intro');}
 const oldV1={version:'antes-do-apito-1',chapter:1,phase:'learning',decisions:[2,0],checks:[1],reflections:{}};assert.equal(restoreJourney(oldV1,getStory('antes-do-apito')).phase,'map');
 // Compatibilidade com a versão imediatamente anterior: capítulos com 2 decisões não podem perder a segunda ao ganhar uma terceira.
 for(const item of catalog){const story=getStory(item.id),n=story.chapters.length,counts=item.id==='antes-do-apito'?[1,2,1,2,1,1,3,1]:[1,2,2,3,1,1];
 const older={version:story.version,format:2,chapter:n-1,phase:'summary',decisions:Array(n).fill(0),steps:Object.fromEntries(counts.map((c,i)=>[i,Array(c).fill(0)])),legacy:[],reflections:{},finished:true};
 const migrated=restoreJourney(older,story);assert.equal(migrated.format,3);assert.deepEqual(migrated.steps,older.steps);assert.equal(migrated.phase,'summary');assert.equal(Object.values(migrated.steps).flat().length,counts.reduce((a,b)=>a+b));
 dom=setup(item.id,JSON.stringify(older));assert.equal(dom.window.document.querySelectorAll('.chosen-path').length,counts.reduce((a,b)=>a+b));dom.window.close();
 // Uma cena em andamento retoma no ponto real e oferece a continuação nova.
 const ch=1,partial={...older,phase:'scene',chapter:ch,decisions:[0,0],steps:{0:older.steps[0],1:[0]}};const resumed=restoreJourney(partial,story);assert.equal(resumed.phase,'scene');assert.equal(resumed.steps[1].length,1);dom=setup(item.id,JSON.stringify(partial));assert(dom.window.document.querySelector('[data-action=confirm]'));assert(!dom.window.document.querySelector('.map-legend'));dom.window.close();
 }
 // As três continuações de uma cena respondem à ação anterior, sem alterar a escolha que foi registrada.
 for(const [id,ch] of [['dois-segundos',1],['curva-perfeita',2],['mapa-caminho',1]]){const story=getStory(id),d=Array(6).fill(0),scenes=[];for(let previous=0;previous<3;previous++){const history={[ch]:[0,previous]};const c=story.stepsFor(ch,d,history)[2];scenes.push(c.scene);assert.equal(story.stepMap(ch,2,0,d,history)[0].text,c.scene);}assert.equal(new Set(scenes).size,3);}
 for(const [id,ch,option] of [['dois-segundos',1,2],['mapa-caminho',1,2]]){const a=getStory(id).assessStep(ch,2,option,Array(6).fill(0));assert(a.adequate);assert(a.condition);}
 console.log(`OK: 24/40/16 capítulos (30%/50%/20%); 152 decisões; ${played} escolhas em 39 percursos; continuação condicionada, alternativas defensáveis, recarga e migração das duas versões anteriores sem perder escolhas; mapas, memórias, TXT e impressão.`);
})().catch(e=>{console.error(e);process.exit(1)});

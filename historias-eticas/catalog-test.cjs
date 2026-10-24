const {JSDOM}=require('jsdom'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),vm=require('node:vm');
(async()=>{
 const {getStory,catalog}=await import('./engine.mjs');const {newStories}=await import('./stories/catalog-data.mjs');
 assert.equal(newStories.length,12);assert.equal(catalog.length,13);assert.equal(new Set(catalog.map(s=>s.id)).size,13);
 const original={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../casos-eticos/casos.js'),'utf8'),original);const brief={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../casos-eticos/cases-data.js'),'utf8'),brief);const {cases}=await import('../percursos-eticos/data.mjs');
 const known=[...original.window.CASOS,...brief.window.ETICA_CASES,...cases].map(c=>c.title||c.titulo);
 for(const s of newStories){assert(!known.includes(s.title));assert.equal(s.chapters.length,4);for(const c of s.chapters){assert(c.scene.length>100);assert.equal(c.options.length,3);assert(c.options.every(o=>o.length===3&&o.every(x=>x.length>20)));}assert.equal(s.endings.length,3);}
 let routes=0;
 for(const item of catalog){const story=getStory(item.id);if(item.id==='antes-do-apito')continue;
  for(let k=0;k<729;k++){
   let n=k;const d=Array.from({length:6},()=>{const x=n%3;n=Math.floor(n/3);return x;});
   for(let i=0;i<6;i++){const c=story.chapterFor(i,d),a=story.assessDecision(i,d[i],d),m=story.situationMap(i,d[i],c);assert(c.title&&c.scene&&c.question);assert(a.accepted.includes(a.reference));assert.equal(m.length,6);assert(m.every(x=>x.text&&!x.text.includes('undefined')));assert(c.choices[a.reference]);if(i)assert(story.echo(i,d));}
   const end=story.epilogue(d);assert.equal(end.title,'Seis meses depois');assert(end.paragraphs.length>=3);assert(!end.paragraphs.join(' ').includes('undefined'));
   if(item.id==='mapa-caminho'&&d[2]===0){assert(story.chapterFor(3,d).scene.includes('já aconteceu'));assert(story.chapterFor(4,d).scene.includes('capturas'));assert(!end.paragraphs.includes(newStories.find(s=>s.id===item.id).endings[0][0]));}
   const a4=story.assessDecision(4,d[4],d),a5=story.assessDecision(5,d[5],d),raw=newStories.find(s=>s.id===item.id);
   if(d[3]===raw.chapters[3].reference&&!(item.id==='mapa-caminho'&&d[2]===0)&&!a4.adequate)assert(end.paragraphs.includes(raw.safeUnresolved[0]));
   if(a5.adequate)assert(end.paragraphs.at(-1).includes('foi iniciada'));else assert(end.paragraphs.at(-1).includes('risco de repetição'));
   routes++;
  }
 }
 const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8'),code='const {getStory,catalog}=window.__engine;\n'+fs.readFileSync(path.join(__dirname,'app.js'),'utf8').replace(/^import .*?;\n/gm,'');
 function setup(id,saved){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://example.test/historias-eticas/'+(id?'?historia='+id:'')});const w=dom.window;w.__engine={getStory,catalog};w.scrollTo=()=>{};w.Element.prototype.scrollIntoView=()=>{};if(saved)w.sessionStorage.setItem('historia-etica.'+id,saved);w.eval(code);return dom;}
 let dom=setup(),d=dom.window.document;assert.equal(d.querySelectorAll('.story-card').length,6);d.getElementById('catalog-more').click();assert.equal(d.querySelectorAll('.story-card').length,12);d.getElementById('catalog-more').click();assert.equal(d.querySelectorAll('.story-card').length,13);assert(d.getElementById('catalog-more').hidden);const search=d.getElementById('story-search');search.value='pesquisa';search.dispatchEvent(new dom.window.Event('input',{bubbles:true}));assert(d.querySelectorAll('.story-card').length>=1);assert(!/bacharelado|licenciatura/i.test(d.body.textContent));search.value='zzzznonexistent';search.dispatchEvent(new dom.window.Event('input',{bubbles:true}));assert(d.body.textContent.includes('Nenhuma história'));dom.window.close();dom=setup('unknown');assert(dom.window.document.body.textContent.includes('não foi encontrada'));dom.window.close();
 for(const item of catalog.filter(x=>x.id!=='antes-do-apito'))for(let route=0;route<3;route++){
  const story=getStory(item.id),decisions=[];dom=setup(item.id);let w=dom.window;d=w.document;
  const click=a=>{const b=d.querySelector(`[data-action="${a}"]`);assert(b,a);b.click();};click('start');
  for(let i=0;i<6;i++){
   assert(!d.querySelector('.map-legend'));assert(!d.querySelector('.status-good'));assert(d.body.textContent.includes(story.chapterFor(i,decisions).scene));
   const j=(i+route)%3;const radio=d.querySelector(`input[value="${j}"]`);radio.checked=true;radio.dispatchEvent(new w.Event('change',{bubbles:true}));click('confirm');decisions.push(j);
   const c=story.chapterFor(i,decisions),a=story.assessDecision(i,j,decisions);assert(d.querySelector('.chosen-path').textContent.includes(c.choices[j][0]));assert(d.querySelector('.chosen-path .decision-node').classList.contains(a.adequate?'status-good':'status-review'));assert(d.body.textContent.includes(c.choices[j][1]));assert(!d.querySelector('[data-action=confirm]'));click('next');assert(d.getElementById('validation').textContent);const t=d.getElementById('reflection');t.value='Preciso acompanhar as pessoas e os efeitos <script>sem executar</script>.';t.dispatchEvent(new w.Event('input',{bubbles:true}));
   const saved=w.sessionStorage.getItem('historia-etica.'+item.id);dom.window.close();dom=setup(item.id,saved);w=dom.window;d=w.document;assert(d.getElementById('reflection').value.includes('Preciso'));click('next');
  }
  assert.equal(d.querySelectorAll('.mind-chapter').length,6);assert.equal(d.querySelectorAll('.chapter-crosslink').length,5);assert.equal(d.querySelectorAll('details.mind-chapter').length,0);assert(d.querySelector('.epilogue').textContent.includes('Seis meses depois'));for(const p of story.epilogue(decisions).paragraphs)assert(d.querySelector('.epilogue').textContent.includes(p));assert(!d.body.textContent.includes('Leitura complementar'));
  let blob,filename;w.URL.createObjectURL=b=>{blob=b;return'blob:test';};w.URL.revokeObjectURL=()=>{};w.HTMLAnchorElement.prototype.click=function(){filename=this.download;};click('download');assert.equal(filename,item.id+'-meu-percurso.txt');const text=await new Promise(resolve=>{const r=new w.FileReader();r.onload=()=>resolve(r.result);r.readAsText(blob)});assert(text.includes('Seis meses depois'));assert.equal((text.match(/Sua escolha confirmada:/g)||[]).length,6);
  let printed=false;w.print=()=>{printed=true;assert.equal(d.querySelectorAll('.consequence-detail[open]').length,6);};click('print');assert(printed);assert.equal(d.querySelectorAll('.consequence-detail[open]').length,0);
  // Progresso de outra história não pode ser restaurado por engano.
  const saved=w.sessionStorage.getItem('historia-etica.'+item.id);const other=setup('antes-do-apito',saved);assert(other.window.document.querySelector('[data-action=start]'));other.window.close();dom.window.close();
 }
 console.log(`OK: ${routes} percursos temporais avaliados; 12 histórias novas; 36 percursos completos na interface; catálogo, busca, paginação, isolamento de progresso, mapas, epílogos, TXT e impressão.`);
})().catch(e=>{console.error(e);process.exit(1)});

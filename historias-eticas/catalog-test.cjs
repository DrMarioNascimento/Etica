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
 console.log(`OK: ${routes} combinações das decisões principais; acervo e desfechos originais preservados.`);
})().catch(e=>{console.error(e);process.exit(1)});

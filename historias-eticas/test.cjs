const {JSDOM}=require('jsdom'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
const {chapters,VERSION}=await import('./story.mjs');const {situationMap}=await import('./maps.mjs');
for(let i=0;i<8;i++){const maps=[0,1,2].map(j=>situationMap(i,j,chapters[i]));assert(maps.every(x=>x.length===6&&x.every(n=>n.label&&n.text)));for(const kind of ['choice','people','effects','pending'])assert.equal(new Set(maps.map(m=>m.find(n=>n.kind===kind).text)).size,3);}
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
const code=['story.mjs','maps.mjs'].map(f=>fs.readFileSync(path.join(__dirname,f),'utf8').replace(/export /g,'')).join('\n')+'\n'+fs.readFileSync(path.join(__dirname,'app.js'),'utf8').replace(/^import .*?;\n/gm,'');
const key='historia-etica.antes-do-apito';
function setup(saved){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://example.test/historias-eticas/'});dom.window.scrollTo=()=>{};dom.window.Element.prototype.scrollIntoView=()=>{};if(saved)dom.window.sessionStorage.setItem(key,saved);dom.window.eval(code);return dom;}
for(let route=0;route<3;route++){
let dom=setup(),w=dom.window,d=w.document;
const click=a=>{const el=d.querySelector(`[data-action="${a}"]`);assert(el,a);el.click();};
assert(d.body.textContent.includes('Leitura complementar'));click('start');
for(let i=0;i<8;i++){
assert(!d.body.textContent.includes('Leitura complementar'));assert(!d.querySelector('[data-action=check]'));assert(d.querySelector('[data-action=confirm]').disabled);
const radio=d.querySelector(`input[value="${(i+route)%3}"]`);radio.checked=true;radio.dispatchEvent(new w.Event('change',{bubbles:true}));click('confirm');
assert.equal(d.querySelectorAll('.map-node').length,6);assert.equal(d.querySelectorAll('.map-link').length,5);assert(d.querySelector('.map-choice').textContent.includes(chapters[i].choices[(i+route)%3][0]));assert(!d.querySelector('[data-action=confirm]'));
click('next');assert(d.querySelector('#validation').textContent);
const t=d.querySelector('#reflection');t.value='Minha escolha tem efeitos <img src=x onerror=alert(1)> que preciso acompanhar.';t.dispatchEvent(new w.Event('input',{bubbles:true}));
const saved=w.sessionStorage.getItem(key);dom.window.close();dom=setup(saved);w=dom.window;d=w.document;
assert.equal(d.querySelectorAll('.map-node').length,6);assert(d.querySelector('#reflection').value.includes('Minha escolha'));assert.equal(d.querySelectorAll('img').length,0);
click('next');
}
assert.equal(d.querySelectorAll('.chapter-map').length,8);assert.equal(d.querySelectorAll('.map-node').length,48);assert.equal(d.querySelectorAll('img').length,0);assert(!d.body.textContent.includes('Leitura complementar'));
let blob,filename;w.URL.createObjectURL=b=>{blob=b;return 'blob:test';};w.URL.revokeObjectURL=()=>{};w.HTMLAnchorElement.prototype.click=function(){filename=this.download;};click('download');assert.equal(filename,'antes-do-apito-meu-percurso.txt');const output=await new Promise(resolve=>{const r=new w.FileReader();r.onload=()=>resolve(r.result);r.readAsText(blob);});assert.equal((output.match(/Sua escolha confirmada:/g)||[]).length,8);assert.equal((output.match(/Sua reflexão:/g)||[]).length,8);assert(output.includes('Minha escolha'));
let printed=0;w.print=()=>{printed++;assert.equal(d.querySelectorAll('.chapter-map[open]').length,8);};click('print');assert.equal(printed,1);assert.equal(d.querySelectorAll('.chapter-map[open]').length,1);
click('ask-reset');click('cancel-reset');assert.equal(d.querySelectorAll('.chapter-map').length,8);click('ask-reset');click('reset');assert(d.querySelector('[data-action=start]'));dom.window.close();
}
// The first-version learner keeps their confirmed choices and notes, without a retry gate.
const old={version:'antes-do-apito-1',chapter:1,phase:'learning',decisions:[2,0],checks:[1,2],reflections:{fatos:'Eu manteria a escolha.'},finished:false};let dom=setup(JSON.stringify(old));assert(dom.window.document.querySelector('.map-choice').textContent.includes(chapters[1].choices[0][0]));assert(!dom.window.document.querySelector('[data-action=check]'));dom.window.close();
for(const bad of ['{}','broken',JSON.stringify({...old,version:VERSION,phase:'summary',chapter:7}),JSON.stringify({...old,version:VERSION,phase:'map',decisions:[0,null]})]){dom=setup(bad);assert(dom.window.document.querySelector('[data-action=start]'));dom.window.close();}
console.log('OK: 24 mapas com escolhas/efeitos/pendências distintos; 3 percursos completos; confirmação sem troca posterior, reflexão em todos os capítulos, conexões rotuladas, recarga, migração, TXT, impressão e ausência de tentativas até acertar.');
})().catch(e=>{console.error(e);process.exit(1)});

const {JSDOM}=require('jsdom'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
const {chapters,chapterFor,VERSION}=await import('./story.mjs');const {situationMap}=await import('./maps.mjs');const {assessDecision}=await import('./assessment.mjs');
let adequate=0,revised=0;
for(let i=0;i<8;i++){const maps=[0,1,2].map(j=>situationMap(i,j,chapters[i]));assert(maps.every(x=>x.length===6&&x.every(n=>n.label&&n.text)));for(const kind of ['choice','people','effects','pending'])assert.equal(new Set(maps.map(m=>m.find(n=>n.kind===kind).text)).size,3);
 for(let j=0;j<3;j++){const a=assessDecision(i,j);assert(a.accepted.includes(a.reference));assert(a.criterion&&a.reason&&a.support&&a.referenceReason);if(a.adequate)adequate++;else revised++;}
}
assert.equal(adequate,11);assert.equal(revised,13);for(const i of [2,3,4]){assert(assessDecision(i,1).adequate);assert(assessDecision(i,1).condition);}
for(const equipment of [0,1,2])for(const last of [0,1,2]){
 const decisions=[0,1,2,2,2,1,equipment,last],c=chapterFor(7,decisions),map=situationMap(7,last,c);
 if(equipment===1){assert.equal(c.title,'Depois do último aplauso');assert(!c.scene.includes('fratura'));}
 else{assert.equal(c.title,'Depois da interrupção');assert(c.scene.includes('hospitalar'));assert(map[0].text.includes('fratura'));assert(!c.scene.includes('recebe elogios'));assert(assessDecision(7,last,decisions).reason);assert(c.choices[last][1].includes(last===2?'R$ 600':'apuração'));}
}
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
const code=['story.mjs','maps.mjs','assessment.mjs'].map(f=>fs.readFileSync(path.join(__dirname,f),'utf8').replace(/export /g,'')).join('\n')+'\n'+fs.readFileSync(path.join(__dirname,'app.js'),'utf8').replace(/^import .*?;\n/gm,'');
const key='historia-etica.antes-do-apito';
function setup(saved){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://example.test/historias-eticas/'});dom.window.scrollTo=()=>{};dom.window.Element.prototype.scrollIntoView=()=>{};if(saved)dom.window.sessionStorage.setItem(key,saved);dom.window.eval(code);return dom;}
for(let route=0;route<3;route++){
let dom=setup(),w=dom.window,d=w.document;
const click=a=>{const el=d.querySelector(`[data-action="${a}"]`);assert(el,a);el.click();};
assert(d.body.textContent.includes('Leitura complementar'));click('start');
for(let i=0;i<8;i++){
assert(!d.body.textContent.includes('Leitura complementar'));assert(!d.querySelector('[data-action=check]'));assert(!d.querySelector('.map-legend'));assert(!d.querySelector('.status-good'));assert(d.querySelector('[data-action=confirm]').disabled);
const decisions=JSON.parse(w.sessionStorage.getItem(key)).decisions,c=chapterFor(i,decisions);const j=(i+route)%3,a=assessDecision(i,j,decisions),radio=d.querySelector(`input[value="${j}"]`);radio.checked=true;radio.dispatchEvent(new w.Event('change',{bubbles:true}));click('confirm');
const own=d.querySelector('.chosen-path .decision-node'),theory=d.querySelector('.foundation-node');
assert(own.classList.contains(a.adequate?'status-good':'status-review'));assert(theory.classList.contains(a.adequate?'status-good':'status-reference'));assert(own.textContent.includes(c.choices[j][0]));assert(d.body.textContent.includes(a.reason));assert(theory.textContent.includes(a.support));
const reference=d.querySelector('.reference-path .decision-node');
if(j!==a.reference){assert(reference);assert(reference.textContent.includes(c.choices[a.reference][0]));assert(reference.classList.contains(a.adequate?'status-good':'status-reference'));}else assert.equal(reference,null);
if(a.condition)assert(d.body.textContent.includes(a.condition));
assert(!d.querySelector('[data-action=confirm]'));click('next');assert(d.querySelector('#validation').textContent);
const t=d.querySelector('#reflection');t.value='Minha escolha tem efeitos <img src=x onerror=alert(1)> que preciso acompanhar.';t.dispatchEvent(new w.Event('input',{bubbles:true}));
const saved=w.sessionStorage.getItem(key);dom.window.close();dom=setup(saved);w=dom.window;d=w.document;
assert(d.querySelector('.chosen-path .decision-node').classList.contains(a.adequate?'status-good':'status-review'));assert(d.querySelector('#reflection').value.includes('Minha escolha'));assert.equal(d.querySelectorAll('img').length,0);click('next');
}
assert.equal(d.querySelectorAll('.mind-chapter').length,8);assert.equal(d.querySelectorAll('details.mind-chapter').length,0);assert.equal(d.querySelectorAll('.mind-chapter .chosen-path').length,8);assert.equal(d.querySelectorAll('.mind-chapter .foundation-node').length,8);assert.equal(d.querySelectorAll('.chapter-crosslink a').length,3);
for(const a of d.querySelectorAll('.chapter-crosslink a'))assert(d.querySelector(a.getAttribute('href')));
assert.equal(d.querySelectorAll('img').length,0);assert(!d.body.textContent.includes('Leitura complementar'));
let blob,filename;w.URL.createObjectURL=b=>{blob=b;return 'blob:test';};w.URL.revokeObjectURL=()=>{};w.HTMLAnchorElement.prototype.click=function(){filename=this.download;};click('download');assert.equal(filename,'antes-do-apito-meu-percurso.txt');const output=await new Promise(resolve=>{const r=new w.FileReader();r.onload=()=>resolve(r.result);r.readAsText(blob);});assert.equal((output.match(/Sua escolha confirmada:/g)||[]).length,8);assert.equal((output.match(/Sua reflexão:/g)||[]).length,8);assert.equal((output.match(/Alternativa de referência:/g)||[]).length,8);assert.equal((output.match(/Fundamento teórico:/g)||[]).length,8);
let printed=0;w.print=()=>{printed++;assert.equal(d.querySelectorAll('.consequence-detail[open]').length,8);};click('print');assert.equal(printed,1);assert.equal(d.querySelectorAll('.consequence-detail[open]').length,0);
click('ask-reset');click('cancel-reset');assert.equal(d.querySelectorAll('.mind-chapter').length,8);click('ask-reset');click('reset');assert(d.querySelector('[data-action=start]'));dom.window.close();
}
const old={version:'antes-do-apito-1',chapter:1,phase:'learning',decisions:[2,0],checks:[1,2],reflections:{fatos:'Eu manteria a escolha.'},finished:false};let dom=setup(JSON.stringify(old));assert(dom.window.document.querySelector('.chosen-path').textContent.includes(chapters[1].choices[0][0]));assert(!dom.window.document.querySelector('[data-action=check]'));dom.window.close();
for(const bad of ['{}','broken',JSON.stringify({...old,version:VERSION,phase:'summary',chapter:7}),JSON.stringify({...old,version:VERSION,phase:'map',decisions:[0,null]})]){dom=setup(bad);assert(dom.window.document.querySelector('[data-action=start]'));dom.window.close();}
// Colour is supplemented with visible labels. Text/background contrast remains AA.
function luminance(hex){const rgb=hex.match(/[0-9a-f]{2}/g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;}
for(const [fg,bg] of [['17603d','e8f5eb'],['9d2929','fff0ee'],['775600','fff4c5']])assert((luminance(bg)+.05)/(luminance(fg)+.05)>=4.5);
console.log('OK: 24 escolhas avaliadas (11 defensáveis, 13 para revisão); cores e fundamentos coerentes; alternativas condicionais; 8 capítulos conectados sem acordeões; nenhuma resposta revelada antes da confirmação; recarga, migração, TXT, impressão e contraste.');
})().catch(e=>{console.error(e);process.exit(1)});

// Test dependency: npm install jsdom
const {JSDOM}=require('jsdom'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
const {chapters,echo}=await import('./story.mjs');assert.equal(chapters.length,8);
for(const c of chapters){assert.equal(c.choices.length,3);assert.equal(c.check.options.length,3);assert(c.theory.text&&c.theory.help&&c.check.explanation);assert(Number.isInteger(c.check.correct));assert.equal(new Set(c.choices.map(x=>x[1])).size,3);}
for(const i of [1,4,7])assert.equal(new Set([0,1,2].map(n=>echo(i,Array(8).fill(n)))).size,3);
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
const code=fs.readFileSync(path.join(__dirname,'story.mjs'),'utf8').replace(/export /g,'')+'\n'+fs.readFileSync(path.join(__dirname,'app.js'),'utf8').replace(/^import .*?;\n/,'');
const key='historia-etica.antes-do-apito';
function setup(saved){const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://example.test/historias-eticas/'});dom.window.scrollTo=()=>{};dom.window.Element.prototype.scrollIntoView=()=>{};if(saved)dom.window.sessionStorage.setItem(key,saved);dom.window.eval(code);return dom;}
let count=0;
for(let route=0;route<3;route++)for(let wrong=0;wrong<3;wrong++){
let dom=setup(),w=dom.window,d=w.document;
function click(action,index){const q=`[data-action="${action}"]${index===undefined?'':`[data-index="${index}"]`}`;const el=d.querySelector(q);assert(el,q);el.click();}
click('start');
for(let i=0;i<8;i++){
assert.match(d.querySelector('h1').textContent,new RegExp(chapters[i].title));
click('choose',(route+i)%3);assert(d.body.textContent.includes(chapters[i].choices[(route+i)%3][1]));
assert(d.querySelector('[data-action=next]').disabled);
click('check',wrong);if(wrong!==chapters[i].check.correct){assert(d.querySelector('[data-action=next]').disabled);assert(d.querySelector('#feedback').textContent.includes('Vamos examinar'));}
click('check',chapters[i].check.correct);assert(!d.querySelector('[data-action=next]').disabled);
if(chapters[i].reflection){click('next');assert(d.querySelector('#validation').textContent);const t=d.querySelector('#reflection');t.value='Minha justificativa <img src=x onerror=alert(1)> considera fatos e alternativas.';t.dispatchEvent(new w.Event('input',{bubbles:true}));}
// Reload after the understanding question, preserving the current stage and writing.
const saved=w.sessionStorage.getItem(key);dom.window.close();dom=setup(saved);w=dom.window;d=w.document;assert(d.body.textContent.includes('Isso mesmo.'));click('next');
}
assert(d.querySelector('h1').textContent.includes('método'));assert.equal(d.querySelectorAll('.trail li').length,8);assert.equal(d.querySelectorAll('img').length,0);
assert(d.querySelector('.trail').textContent.includes('Minha justificativa <img'));
let blob,filename;w.URL.createObjectURL=b=>{blob=b;return 'blob:local-test';};w.URL.revokeObjectURL=()=>{};w.HTMLAnchorElement.prototype.click=function(){filename=this.download;};click('download');assert.equal(filename,'antes-do-apito-meu-percurso.txt');assert(blob&&blob.type==='text/plain;charset=utf-8');
const text=await new Promise(resolve=>{const reader=new w.FileReader();reader.onload=()=>resolve(reader.result);reader.readAsText(blob);});assert(text.includes('Minha justificativa'));assert(text.includes('Registro educativo'));
click('ask-reset');assert(d.querySelector('[data-action=reset]'));click('cancel-reset');assert(d.querySelector('h1').textContent.includes('método'));click('ask-reset');click('reset');assert(d.querySelector('[data-action=start]'));dom.window.close();count++;
}
for(const bad of ['{}','oops',JSON.stringify({version:'wrong'}),JSON.stringify({version:'antes-do-apito-1',chapter:7,phase:'summary',decisions:[],checks:[],reflections:{}})]){const dom=setup(bad);assert(dom.window.document.querySelector('[data-action=start]'));dom.window.close();}
console.log(`OK: ${count} histórias completas; todas as opções de decisão e de compreensão; bloqueio até compreender, duas justificativas, recarga em todos os capítulos, memórias distintas, exportação de texto na síntese, reinício e escape HTML.`);
})().catch(e=>{console.error(e);process.exit(1)});

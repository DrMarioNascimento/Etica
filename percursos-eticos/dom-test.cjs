// npm install jsdom (dependency used only for tests)
const {JSDOM}=require('jsdom');const fs=require('node:fs');const assert=require('node:assert/strict');const path=require('node:path');
const dir=__dirname;
const code=fs.readFileSync(path.join(dir,'data.mjs'),'utf8').replace(/export /g,'')+'\n'+fs.readFileSync(path.join(dir,'app.js'),'utf8').replace(/^import .*?;\n/,'');
let count=0;
for(const all of [false,true])for(let c=0;c<12;c++)for(let branch=0;branch<3;branch++)for(let follow=0;follow<3;follow++){
 const dom=new JSDOM('<main id="app" tabindex="-1"></main>',{runScripts:'outside-only',url:'https://example.test/percursos-eticos/'}),w=dom.window,d=w.document;
 w.scrollTo=()=>{};w.URL.createObjectURL=()=> 'blob:test';w.URL.revokeObjectURL=()=>{};w.eval(code);
 const click=(action,n=0)=>{const e=d.querySelectorAll(`[data-action="${action}"]`)[n];assert(e,action);e.click();};
 const fill=(selector,value)=>{const e=d.querySelector(selector);assert(e,selector);e.value=value;e.dispatchEvent(new w.Event('input',{bubbles:true}));};
 assert(d.querySelector('[data-action=stories]').disabled);
 if(all)click('all');else{const e=d.querySelector('[data-theme=deveres]');e.checked=true;e.dispatchEvent(new w.Event('change',{bubbles:true}));}
 click('stories');assert.equal(d.querySelectorAll('.card').length,4);
 for(let i=0;i<Math.floor(c/4);i++)click('next');
 click('case',c%4);assert.equal(d.querySelectorAll('.panel')[1]?.textContent.includes('Informações fornecidas')||false,!all);
 click('investigate');click('advance');assert(d.querySelector('#validation').textContent);
 for(let i=0;i<(all?6:1);i++){fill('#note','Evidência <script>alert(1)</script> & incerteza');click('advance');}
 assert.equal(d.querySelectorAll('.branch').length,3);click('choose',branch);click('follow',follow);
 click('finish');assert(d.querySelector('#validation').textContent);
 for(const e of d.querySelectorAll('[data-answer]'))fill('#'+e.id,'Argumentação com <img src=x onerror=alert(1)> fatos e acompanhamento.');
 click('finish');assert.match(d.querySelector('h1').textContent,/registro/);assert.equal(d.querySelectorAll('script,img').length,0);
 assert(d.querySelector('.report-block').textContent.includes('Argumentação'));assert(d.querySelector('.report-block').textContent.includes('Evidência'));
 click('reflection');assert(d.querySelector('#facts').value.includes('Argumentação'));
 count++;dom.window.close();
}
console.log(`OK: ${count} percursos completos no DOM; 12 casos × 3 decisões × 3 acompanhamentos × seleção mínima/completa; validação, anotações, retorno e escape HTML.`);

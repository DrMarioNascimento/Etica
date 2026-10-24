import assert from 'node:assert/strict';
import {themes,cases,dossier,followups,motto} from './data.mjs';
assert.equal(cases.length,12);assert.equal(new Set(cases.map(c=>c.id)).size,12);
assert.equal(followups.length,3);assert.equal(themes.length,6);assert.match(motto,/justificar uma decisão responsável/);
let combinations=0;
for(const c of cases){
 assert.equal(c.facts.length,themes.length);assert.equal(c.choices.length,3);assert.equal(c.outcomes.length,3);
 assert.equal(new Set(c.outcomes).size,3);
 for(let mask=1;mask<64;mask++){
 const selected=themes.filter((_,i)=>mask&(1<<i)).map(t=>t.id),d=dossier(c,selected);
 assert.equal(d.length,6);assert.equal(d.filter(t=>t.investigate).length,selected.length);
 assert(d.every(t=>t.fact?.length>20));assert.equal(new Set(d.map(t=>t.id)).size,6);
 for(const outcome of c.outcomes)for(const f of followups){assert(outcome&&f.title&&f.text);combinations++;}
 }
}
console.log(`OK: 12 histórias; 756 combinações de temas/caso; ${combinations} combinações com decisões e acompanhamentos.`);

const {JSDOM}=require('jsdom'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
const {getStory,catalog}=await import('./engine.mjs');const {chapters,chapterFor,version:VERSION,situationMap,assessDecision}=getStory('antes-do-apito');
let adequate=0,revised=0;
for(let i=0;i<8;i++){const maps=[0,1,2].map(j=>situationMap(i,j,chapters[i]));assert(maps.every(x=>x.length===6&&x.every(n=>n.label&&n.text)));for(const kind of ['choice','people','effects','pending'])assert.equal(new Set(maps.map(m=>m.find(n=>n.kind===kind).text)).size,3);
 for(let j=0;j<3;j++){const a=assessDecision(i,j);assert(a.accepted.includes(a.reference));assert(a.criterion&&a.reason&&a.support&&a.referenceReason);if(a.adequate)adequate++;else revised++;}
}
assert.equal(adequate,11);assert.equal(revised,13);for(const i of [2,3,4]){assert(assessDecision(i,1).adequate);assert(assessDecision(i,1).condition);}
for(const equipment of [0,1,2])for(const last of [0,1,2]){
 const decisions=[0,1,2,2,2,1,equipment,last],c=chapterFor(7,decisions),map=situationMap(7,last,c);
 if(equipment===1){assert(c.title.endsWith('Depois do último aplauso'));assert(!c.scene.includes('fratura'));}
 else{assert(c.title.endsWith('Depois da interrupção'));assert(c.scene.includes('hospitalar'));assert(map[0].text.includes('fratura'));assert(!c.scene.includes('recebe elogios'));assert(assessDecision(7,last,decisions).reason);assert(c.choices[last][1].includes(last===2?'R$ 600':'apuração'));}
}
// Colour is supplemented with visible labels. Text/background contrast remains AA.
function luminance(hex){const rgb=hex.match(/[0-9a-f]{2}/g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;}
for(const [fg,bg] of [['17603d','e8f5eb'],['9d2929','fff0ee'],['775600','fff4c5']])assert((luminance(bg)+.05)/(luminance(fg)+.05)>=4.5);
console.log('OK: decisões principais da história original, ramificações de dano, alternativas defensáveis e contraste.');
})().catch(e=>{console.error(e);process.exit(1)});

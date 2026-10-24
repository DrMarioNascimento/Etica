const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
let runs=0;
for(const width of [390,1280]){
 const page=await browser.newPage({viewport:{width,height:844}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4175/percursos-eticos/');
 assert(await page.locator('[data-action=stories]').isDisabled());
 await page.locator('#theme-menu summary').click();await page.locator('[data-theme=deveres]').check();
 await page.locator('[data-action=stories]').click();
 assert.equal(await page.locator('.card').count(),4);
 await page.locator('[data-action=next]').click();assert.match(await page.locator('.pagination').innerText(),/5–8 de 12/);
 await page.locator('[data-action=next]').click();assert.match(await page.locator('.pagination').innerText(),/9–12 de 12/);
 assert(await page.locator('[data-action=next]').isDisabled());
 for(let n=0;n<12;n++){
  await page.goto('http://127.0.0.1:4175/percursos-eticos/');
  await page.locator('#theme-menu summary').click();
  if(n===0)await page.locator('[data-action=all]').click();else await page.locator('[data-theme=deveres]').check();
  await page.locator('[data-action=stories]').click();
  for(let i=0;i<Math.floor(n/4);i++)await page.locator('[data-action=next]').click();
  await page.locator('[data-action=case]').nth(n%4).click();
  await page.locator('[data-action=investigate]').click();
  await page.locator('[data-action=advance]').click();assert.match(await page.locator('#validation').innerText(),/Registre/);
  for(let i=0;i<(n===0?6:1);i++){
   await page.locator('#clue summary').click();await page.locator('#note').fill('A evidência permite investigar os deveres, mas não concluir culpa apenas pelo resultado.');await page.locator('[data-action=advance]').click();
  }
  for(let branch=0;branch<3;branch++){
   await page.locator('[data-action=choose]').nth(branch).click();
   await page.locator('[data-action=follow]').nth((branch+n)%3).click();
   await page.locator('[data-action=finish]').click();assert.match(await page.locator('#validation').innerText(),/Preencha/);
   for(const field of await page.locator('[data-answer]').all())await field.fill('Considero os fatos e as incertezas do caso. Comparo alternativas, respeito os deveres e planejo acompanhamento com os envolvidos.');
   await page.locator('[data-action=finish]').click();assert.match(await page.locator('h1').innerText(),/registro/);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
   if(n===0&&branch===0){const download=page.waitForEvent('download');await page.locator('[data-action=download]').click();assert.match((await download).suggestedFilename(),/percurso-etico/);}
   runs++;await page.locator('[data-action=decision]').click();
  }
  // report is the safe exit point: complete once more before navigating.
  await page.locator('[data-action=choose]').first().click();await page.locator('[data-action=follow]').first().click();
  for(const field of await page.locator('[data-answer]').all())await field.fill('Registro final para encerrar a simulação.');await page.locator('[data-action=finish]').click();
 }
 assert.deepEqual(errors,[]);await page.close();
}
const page=await browser.newPage({viewport:{width:390,height:844}});await page.goto('http://127.0.0.1:4175/percursos-eticos/');await page.locator('#theme-menu summary').click();await page.locator('[data-theme=deveres]').check();await page.locator('[data-action=stories]').click();await page.screenshot({path:'/workspace/scratch/72928b5c65ba/percursos-mobile.png',fullPage:true});
console.log(`OK: ${runs} percursos completos em celular/desktop, paginação, seleção, campos obrigatórios e exportação; sem erros JS ou overflow.`);await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

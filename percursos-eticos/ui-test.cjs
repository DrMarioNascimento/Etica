// Smoke test for the public review gate. The activity itself is covered by dom-test.cjs.
const {chromium}=require('playwright');const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
for(const width of [390,1280]){
 const page=await browser.newPage({viewport:{width,height:844}});
 await page.goto('http://127.0.0.1:4175/percursos-eticos/');
 assert(await page.locator('#review-lock').isVisible());assert(await page.locator('#app').isHidden());
 assert.equal(await page.locator('[data-action=case]').count(),0);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await page.goto('http://127.0.0.1:4175/casos-eticos/');
 assert(await page.locator('a[href="../percursos-eticos/"]').isVisible());await page.close();
}
await browser.close();console.log('OK: entrada anônima bloqueada em desktop/celular; botão de revisão em Casos Éticos.');
})().catch(e=>{console.error(e);process.exit(1)});

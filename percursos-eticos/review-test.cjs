const {JSDOM}=require('jsdom');const assert=require('node:assert/strict');const fs=require('node:fs');const path=require('node:path');
(async()=>{
const {canReview,validBridgeMessage,BRIDGE_ORIGIN}=await import('./review-policy.mjs');
const owner={uid:'owner',email:'mariocnascimento@gmail.com',emailVerified:true};
const claims={claims:{email:'mariocnascimento@gmail.com',email_verified:true,firebase:{sign_in_provider:'google.com'}}};
assert(canReview(owner,claims));
for(const [user,token] of [[null,null],[{...owner,email:'student@example.test'},claims],[{...owner,emailVerified:false},claims],[owner,{claims:{...claims.claims,email_verified:false}}],[owner,{claims:{...claims.claims,firebase:{sign_in_provider:'password'}}}],[owner,{claims:{...claims.claims,email:'student@example.test'}}]])assert(!canReview(user,token));
const popup={},nonce='f'.repeat(32),event={source:popup,origin:BRIDGE_ORIGIN,data:{type:'etica-review-google',nonce,idToken:'x'.repeat(150)}};
assert(validBridgeMessage(event,popup,nonce));assert(!validBridgeMessage({...event,origin:'https://evil.example'},popup,nonce));assert(!validBridgeMessage({...event,source:{}},popup,nonce));assert(!validBridgeMessage(event,popup,'wrong'));
const html=fs.readFileSync(path.join(__dirname,'index.html'),'utf8');assert(!html.includes('src="app.js'));assert(html.includes('id="app" tabindex="-1" hidden'));
const gate=fs.readFileSync(path.join(__dirname,'review-gate.js'),'utf8').replace(/^import .*?;\n/,'').replace(/import\(/g,'loadModule(');
async function scenario(user,delay=false){
 const dom=new JSDOM(html,{runScripts:'outside-only',url:'https://etica.drmarionascimento.com.br/percursos-eticos/'}),w=dom.window;
 let observer,loaded=0,started=0,resolveActivity;
 const auth={currentUser:user};const sdk={getAuth:()=>auth,setPersistence:async()=>{},onIdTokenChanged:(a,fn)=>{observer=fn;},signOut:async()=>{},browserSessionPersistence:{}};
 Object.assign(w,{canReview,validBridgeMessage,BRIDGE_ORIGIN,loadModule:async url=>{
 if(url.includes('firebase-app'))return {initializeApp:()=>({})};
 if(url.includes('firebase-auth'))return sdk;
 loaded++;if(delay)return new Promise(resolve=>{resolveActivity=resolve;});return {startActivity:()=>started++,stopActivity:()=>{}};
 }});
 w.eval(gate);await new Promise(r=>setImmediate(r));
 const pending=observer(user);await new Promise(r=>setImmediate(r));
 if(delay){auth.currentUser=null;await observer(null);resolveActivity({startActivity:()=>started++,stopActivity:()=>{}});}
 await pending;
 if(user&&!delay&&canReview(user,await user.getIdTokenResult())){assert.equal(started,1);assert(!w.document.getElementById('app').hidden);}
 else{assert.equal(started,0);assert(w.document.getElementById('app').hidden);if(!delay)assert.equal(loaded,0);}
 dom.window.close();
}
await scenario(null);
await scenario({...owner,email:'student@example.test',getIdTokenResult:async()=>claims});
await scenario({...owner,getIdTokenResult:async()=>claims});
await scenario({...owner,getIdTokenResult:async()=>claims},true);
const portal=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');assert(!portal.includes('href="percursos-eticos/index.html"'));
const cases=fs.readFileSync(path.join(__dirname,'../casos-eticos/index.html'),'utf8');assert(cases.includes('href="../percursos-eticos/"'));assert(cases.includes('🔒'));
console.log('OK: visitante/aluno/provedor incorreto negados; professor Google autorizado; mensagem forjada rejeitada; corrida de logout bloqueada; rota direta fechada e botão movido.');
})().catch(e=>{console.error(e);process.exit(1)});

import {canReview, validBridgeMessage, BRIDGE_ORIGIN} from './review-policy.mjs';
const root=document.getElementById('app');
const status=document.getElementById('review-status');
const login=document.getElementById('review-login');
let stopActivity, auth, sdk, popup, nonce, timer, active=false, revision=0, busy=false;
const config={apiKey:'AIzaSyCDpYpar6S9X1uQvjm8yf4WXJGxXHxZLNM',authDomain:'atividades-extras-e40b6.firebaseapp.com',projectId:'atividades-extras-e40b6',appId:'1:220943378937:web:7c24574644d58a760bf528'};
function message(text){status.textContent=text;}
function clearAttempt(){clearInterval(timer);timer=null;nonce=null;popup=null;busy=false;login.disabled=!sdk;}
function lock(text){revision++;root.hidden=true;document.getElementById('review-session').hidden=true;document.getElementById('review-lock').hidden=false;message(text);if(active){stopActivity?.();root.replaceChildren();location.reload();}}
login.addEventListener('click',()=>{
 if(!sdk||busy)return;
 nonce=Array.from(crypto.getRandomValues(new Uint8Array(16)),x=>x.toString(16).padStart(2,'0')).join('');
 popup=window.open(`${BRIDGE_ORIGIN}/etica-review-login.html#${nonce}`,'etica-review-google','popup,width=520,height=720');
 if(!popup){clearAttempt();message('Permita a janela de login e tente novamente. No celular, abra no Safari ou Chrome.');return;}
 busy=true;login.disabled=true;message('Conclua a entrada Google na janela aberta.');
 const deadline=Date.now()+180000;
 timer=setInterval(()=>{if(!popup||popup.closed||Date.now()>deadline){clearAttempt();message('A entrada não foi concluída. Você pode tentar novamente.');}},1000);
});
window.addEventListener('message',async event=>{
 if(!validBridgeMessage(event,popup,nonce)||!busy)return;
 const idToken=event.data.idToken;const bridge=popup;clearAttempt();login.disabled=true;
 try{await sdk.signInWithCredential(auth,sdk.GoogleAuthProvider.credential(idToken));bridge?.close();}
 catch{message('Não foi possível validar a entrada Google. Tente novamente.');}
 finally{login.disabled=false;}
});
document.getElementById('review-logout').addEventListener('click',async()=>{
 stopActivity?.();
 root.hidden=true;document.getElementById('review-session').hidden=true;document.getElementById('review-lock').hidden=false;
 try{await sdk.signOut(auth);}catch{location.reload();}
});
async function boot(){
 try{
  const [appSdk,authSdk]=await Promise.all([import('https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js'),import('https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js')]);
  sdk=authSdk;auth=sdk.getAuth(appSdk.initializeApp(config,'etica-review'));auth.languageCode='pt-BR';
  await sdk.setPersistence(auth,sdk.browserSessionPersistence);
  sdk.onIdTokenChanged(auth,async user=>{
   const attempt=++revision;
   try{
    const token=user?await user.getIdTokenResult():null;
    if(attempt!==revision)return;
    if(!canReview(user,token)){lock(user?'Esta conta não tem acesso à revisão. Entre com a conta Google do professor.':'Atividade em revisão. A entrada está restrita ao professor.');login.disabled=false;return;}
    const activity=await import('./app.js?v=review-20261024-guia');
    if(attempt!==revision||auth.currentUser?.uid!==user.uid)return;
    document.getElementById('review-lock').hidden=true;document.getElementById('review-session').hidden=false;root.hidden=false;
    if(!active){active=true;stopActivity=activity.stopActivity;activity.startActivity();}
   }catch{if(attempt===revision)lock('Não foi possível confirmar a autorização. A atividade permanece bloqueada.');}
  },()=>lock('Falha ao verificar a sessão. A atividade permanece bloqueada.'));
  login.disabled=false;
 }catch{message('Não foi possível carregar a entrada Google. Confira a conexão e recarregue a página.');}
}
boot();

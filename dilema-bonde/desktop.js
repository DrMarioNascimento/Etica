(()=>{
const media=matchMedia('(min-width:1000px) and (min-height:600px)');
const names=['Cenários','Indicadores éticos','Como interpretar','Relação emocional','Autoria e referências','Som e volume','Configurações'];
document.querySelectorAll('.top-bar .icon-btn').forEach((b,i)=>{const s=document.createElement('span');s.className='desktop-menu-label';s.textContent=names[i];b.append(s)});
const context=document.createElement('header');context.className='desktop-context';context.innerHTML='<h1>Dilema do bonde</h1><p></p>';document.querySelector('.app').append(context);
function describe(){const a=document.getElementById('mainLabel')?.textContent.trim()||'3',b=document.getElementById('sideLabel')?.textContent.trim()||'1';context.querySelector('p').textContent=`O bonde se aproxima de dois caminhos: ${a} no trilho principal e ${b} no desvio. Você pode manter o curso ou acionar a alavanca. Explore o cenário e decida.`}
const observer=new MutationObserver(describe);['mainLabel','sideLabel'].forEach(id=>{const e=document.getElementById(id);if(e)observer.observe(e,{childList:true,subtree:true,characterData:true})});describe();
const svg=document.querySelector('.scene-svg'),defs=svg.querySelector('defs'),saved=[],decorations=[];
function change(el,attr,value){saved.push([el,attr,el.getAttribute(attr)]);el.setAttribute(attr,value)}
function add(parent,markup){const wrap=document.createElementNS('http://www.w3.org/2000/svg','g');wrap.innerHTML=markup;parent.append(wrap);decorations.push(wrap)}
function apply(){if(!media.matches||decorations.length)return;
add(defs,`<linearGradient id="desktopRoof" x2="0" y2="1"><stop stop-color="#a5b5c4"/><stop offset=".5" stop-color="#8c9fb1"/><stop offset="1" stop-color="#758ba0"/></linearGradient><linearGradient id="desktopWall"><stop stop-color="#8e9fb0"/><stop offset="1" stop-color="#788c9f"/></linearGradient><linearGradient id="desktopClockRim" x2=".8" y2="1"><stop stop-color="#708996"/><stop offset=".35" stop-color="#354e5c"/><stop offset=".7" stop-color="#182e3a"/><stop offset="1" stop-color="#587380"/></linearGradient><radialGradient id="desktopClockWell" cx="60%" cy="68%" r="78%"><stop stop-color="#fffdf0"/><stop offset=".65" stop-color="#e4e0ce"/><stop offset=".88" stop-color="#abaeaa"/><stop offset="1" stop-color="#59686d"/></radialGradient>`);
const city=svg.querySelector('g[opacity="0.4"][transform="translate(0,-27)"]');if(city){let faces='';city.querySelectorAll('rect').forEach(r=>{const x=+r.getAttribute('x'),y=+r.getAttribute('y'),w=+r.getAttribute('width'),height=+r.getAttribute('height');faces+=`<path d="M${x+w-4} ${y}h4v${height}h-4Z" fill="#70869d" opacity=".18"/>`});add(city,faces)}
const clock=document.getElementById('stationClock'),station=clock.parentNode;
station.querySelectorAll('path[fill="#8fa1b3"]').forEach(e=>change(e,'fill','url(#desktopRoof)'));
station.querySelectorAll('rect[fill="#8a9bad"],rect[fill="#75889c"]').forEach(e=>change(e,'fill','url(#desktopWall)'));
add(station,'<g fill="none" pointer-events="none"><path d="M337 145H803M501 40H637" stroke="#566e83" stroke-width="3" opacity=".48"/><path d="M400 111H740M502 38L569 5L636 38" stroke="#cad5de" stroke-width="1" opacity=".65"/><path d="M434 112L404 142M501 112L487 142M640 112L654 142M706 112L737 142" stroke="#687f94" stroke-width=".7" opacity=".3"/></g>');
const circles=clock.querySelectorAll(':scope > circle');change(circles[0],'fill','url(#desktopClockRim)');change(circles[1],'fill','#102733');change(circles[2],'fill','url(#desktopClockWell)');change(circles[2],'stroke','#263f4d');change(circles[3],'stroke','#9daea9');
clock.querySelectorAll('path[stroke="#b5ab94"]').forEach(e=>change(e,'stroke','#b6c8cf'));clock.querySelectorAll('path[stroke="#211e18"]').forEach(e=>change(e,'stroke','#112631'));clock.querySelectorAll('circle[fill="rgba(255,255,255,0.27)"]').forEach(e=>change(e,'opacity','0'));
}
function refresh(){if(!media.matches){saved.splice(0).forEach(([e,a,v])=>v===null?e.removeAttribute(a):e.setAttribute(a,v));decorations.splice(0).forEach(e=>e.remove())}else apply()}
media.addEventListener('change',refresh);refresh();
})();

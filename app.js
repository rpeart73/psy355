/* BFS218 Atlas: learning companion. Vanilla JS, self-contained, no build step.
   Companion to Blackboard: no assessment, no student-to-student interaction here. */
(function(){
"use strict";
var D = window.PSY355 || {};
var MAIN = document.getElementById('main');
var NAV = document.getElementById('nav');
var OVERLAY = document.getElementById('overlay');

/* ---------- injected styles for richer components ---------- */
var CSS = [
"#hero{position:relative;overflow:hidden;border-radius:16px;padding:32px clamp(22px,5vw,42px);margin-bottom:22px;color:#fff;background:#1B2A4A;border:1px solid #1B2A4A}",
"#hero .htag{font-family:var(--mono);font-size:.78rem;letter-spacing:.06em;text-transform:uppercase;color:#F2A900}",
"#hero h1{font-size:clamp(1.9rem,4.4vw,2.9rem);margin:.18em 0 .12em;color:#fff}",
"#hero .hsub{font-size:1.15rem;color:rgba(255,255,255,.82)}",
"#hero .hcontour{position:absolute;inset:0;opacity:.5;pointer-events:none}",
"#hero .hactions{margin-top:20px;display:flex;flex-wrap:wrap;gap:10px}",
".toolgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}",
".toolcard{display:block;text-decoration:none;color:inherit;border:1px solid var(--hair);border-radius:14px;padding:18px;background:var(--surface);transition:transform .15s,border-color .15s}",
".toolcard:hover{transform:translateY(-2px);border-color:#cfc9bb}",
".toolcard .ic{width:42px;height:42px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.2rem;margin-bottom:10px}",
".wkgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px}",
".wktile{display:flex;flex-direction:column;gap:6px;text-decoration:none;color:#1A1A1A;border:1px solid var(--hair);border-radius:12px;padding:14px;min-height:104px;transition:transform .15s}",
".wktile:hover{transform:translateY(-2px)}",
".wktile .wn{font-family:var(--mono);font-size:.74rem;font-weight:600}",
".wktile b{font-size:.98rem;line-height:1.25}",
".cmap{display:flex;gap:6px;overflow-x:auto;padding:14px 4px 8px;border:1px solid var(--hair);border-radius:12px;background:var(--surface)}",
".cphase{display:flex;flex-direction:column;gap:6px}",
".cphase .pl{font-family:var(--mono);font-size:.66rem;text-transform:uppercase;letter-spacing:.04em;color:#54585A;padding:0 4px}",
".ccols{display:flex;gap:6px}",
".ccol{min-width:50px;display:flex;flex-direction:column;align-items:center;gap:5px;border-radius:8px;padding:6px 4px}",
".ccol .cw{font-family:var(--mono);font-size:.66rem;color:#54585A}",
".cpin{width:20px;height:20px;border-radius:50%;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.18);cursor:pointer}",
".cpin:focus-visible{outline:3px solid var(--focus);outline-offset:2px}",
".cempty{width:10px;height:10px;border-radius:50%;background:#EDEAE2}",
".glossweek{border:1px solid var(--hair);border-radius:12px;padding:6px 16px 14px;margin-bottom:14px;background:var(--surface)}",
".cite{font-size:.85rem;color:#4A4A4A;border-left:3px solid var(--hair);padding-left:10px;margin:.5em 0 0}",
".rlink{font-weight:600;font-size:.9rem}",
".slideshow-grid{display:grid;grid-template-columns:1.5fr 1fr;gap:16px;align-items:start}",
".herogrid{display:grid;grid-template-columns:1.6fr 1fr;gap:24px;align-items:center}",
".heroimg img{width:100%;max-height:260px;object-fit:cover;border-radius:14px;box-shadow:0 8px 24px rgba(26,26,26,.14)}",
"@media (max-width:760px){.herogrid{grid-template-columns:1fr}.heroimg{display:none}}",
".slide-kp{background:var(--raised);border:1px solid var(--hair);border-radius:12px;padding:16px}",
"@media (max-width:760px){.slideshow-grid{grid-template-columns:1fr}}",
"@media (max-width:640px){.toolgrid{grid-template-columns:1fr}}",
".cmpgrid{display:grid;grid-template-columns:1fr 300px;gap:24px;align-items:start}",
".cmppick{display:flex;align-items:center;gap:10px;width:100%;text-align:left;border:none;border-bottom:1px solid var(--raised);padding:10px 12px;background:none}",
".cmpcol{flex:none;width:288px;background:var(--surface);border:1px solid var(--hair);border-radius:14px;overflow:hidden;display:flex;flex-direction:column}",
"@media (max-width:760px){.cmpgrid{grid-template-columns:1fr}}",
".deck{position:fixed;inset:0;z-index:300;display:flex;flex-direction:column;background:radial-gradient(1100px 560px at 50% -8%, #E6EDF5, #F7F8FA)}",
".deck-top{display:flex;align-items:center;gap:14px;padding:14px 20px}",
".deck-top .pin{font-family:var(--mono);font-size:.72rem;letter-spacing:.08em;color:var(--ink-faint);white-space:nowrap}",
".deck-prog{flex:1;height:5px;background:var(--hair);border-radius:3px;overflow:hidden}",
".deck-prog i{display:block;height:100%;background:var(--red);border-radius:3px;transition:width .35s cubic-bezier(.2,.7,.2,1)}",
".deck-close{border:1px solid var(--hair);background:var(--surface);border-radius:999px;padding:8px 15px;font-weight:600;color:var(--ink);white-space:nowrap}",
".deck-stage{flex:1;display:flex;align-items:center;justify-content:center;padding:18px 24px 0;min-height:0}",
".deck-card{width:min(880px,100%);max-height:100%;overflow:auto;background:var(--surface);border:1px solid var(--hair);border-radius:22px;box-shadow:0 24px 70px rgba(27,42,74,.18);padding:clamp(28px,5vw,56px);position:relative;animation:deckIn .45s cubic-bezier(.2,.7,.2,1) both}",
"@keyframes deckIn{from{opacity:0;transform:translateY(14px) scale(.985)}to{opacity:1;transform:none}}",
".deck-card .strip{position:absolute;top:0;left:0;right:0;height:7px;border-radius:22px 22px 0 0}",
".deck-eyebrow{font-family:var(--mono);font-size:.76rem;letter-spacing:.12em;text-transform:uppercase;color:var(--accent,#3A6EA5);font-weight:600}",
".deck-h{font-size:clamp(1.7rem,4.2vw,2.7rem);font-weight:700;line-height:1.12;color:var(--navy);margin:.32em 0 .2em;letter-spacing:-.01em}",
".deck-sub{font-size:clamp(1.05rem,2.1vw,1.3rem);color:var(--ink-soft);line-height:1.5;margin:0}",
".deck-statement{font-size:clamp(1.5rem,3.7vw,2.5rem);font-weight:600;line-height:1.24;color:var(--ink);margin:0}",
".deck-statement em{font-style:normal;color:var(--red)}",
".deck-points{list-style:none;padding:0;margin:22px 0 0;display:flex;flex-direction:column;gap:15px}",
".deck-points li{font-size:clamp(1.05rem,2.1vw,1.28rem);line-height:1.45;color:var(--ink);padding-left:22px;position:relative;opacity:0;transform:translateY(9px);transition:opacity .42s ease,transform .42s cubic-bezier(.2,.7,.2,1)}",
".deck-points li.show{opacity:1;transform:none}",
".deck-points li:before{content:'';position:absolute;left:0;top:.6em;width:10px;height:10px;border-radius:50%;background:var(--accent,#3A6EA5)}",
".deck-cite{font-family:var(--mono);font-size:.8rem;color:var(--ink-faint);margin-top:20px;border-left:3px solid var(--hair);padding-left:12px}",
".deck-q{font-size:clamp(1.4rem,3.2vw,2.1rem);font-weight:600;line-height:1.3;color:var(--navy);border-left:4px solid var(--accent,#3A6EA5);padding-left:20px;margin:0}",
".deck-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 22px 20px}",
".deck-btn{border:1px solid var(--hair);background:var(--surface);border-radius:999px;padding:11px 20px;font-weight:600;font-size:.95rem;color:var(--ink);min-height:44px}",
".deck-btn[disabled]{opacity:.4;cursor:default}",
".deck-next{background:var(--red);border-color:var(--red);color:#fff}",
".deck-count{font-family:var(--mono);font-size:.82rem;color:var(--ink-faint)}",
"@media (prefers-reduced-motion:reduce){.deck-points li{transition:none}.deck-card{animation:none}}"
].join("\n");
(function(){ var s=document.createElement('style'); s.textContent=CSS; document.head.appendChild(s); })();

/* ---------- state (saved on the student's own device) ---------- */
var CKEY='bfs218-compare-v1';
function loadCmp(){ try{ var a=JSON.parse(localStorage.getItem(CKEY)||'[]'); return Array.isArray(a)?a.slice(0,3):[]; }catch(e){ return []; } }
function saveCmp(){ try{ localStorage.setItem(CKEY, JSON.stringify(CMP)); }catch(e){} }
var CMP = loadCmp();
var SHOWSYN = false;
var HQ = '', HL = 'phase';

/* ---------- helpers ---------- */
function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
function linkify(t){
  t=String(t==null?'':t); var re=/(https?:\/\/[^\s]+|doi:\s*10\.\d{4,}\/[^\s]+|\b10\.\d{4,}\/[^\s]+)/gi, out='', last=0, m;
  while((m=re.exec(t))){
    out+=esc(t.slice(last,m.index));
    var full=m[0], trail=''; var tm=full.match(/[).,;:]+$/); if(tm){ trail=tm[0]; full=full.slice(0,full.length-trail.length); }
    var href=full; if(/^10\./.test(full)) href='https://doi.org/'+full; else if(/^doi:/i.test(full)) href='https://doi.org/'+full.replace(/^doi:\s*/i,'');
    out+='<a href="'+esc(href)+'" target="_blank" rel="noopener">'+esc(full)+'</a>'+esc(trail);
    last=m.index+m[0].length;
  }
  return out+esc(t.slice(last));
}
function phaseOf(id){ for(var i=0;i<(D.phases||[]).length;i++){ if(D.phases[i].id===id) return D.phases[i]; } return {name:'',accent:'#5B7A8C',fill:'#eee'}; }
function week(n){ for(var i=0;i<(D.weeks||[]).length;i++){ if(D.weeks[i].number===n) return D.weeks[i]; } return null; }
function pad(n){ return (n<10?'0':'')+n; }
function toast(msg){ OVERLAY.insertAdjacentHTML('beforeend','<div class="toast" role="status">'+esc(msg)+'</div>'); var t=OVERLAY.lastChild; setTimeout(function(){ if(t&&t.parentNode) t.parentNode.removeChild(t); },2600); }
function dl(name,text){ var b=new Blob([text],{type:'application/json'}); var u=URL.createObjectURL(b); var a=document.createElement('a'); a.href=u; a.download=name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function(){URL.revokeObjectURL(u);},1000); }
function contourSVG(){ return '<svg class="hcontour" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true">'+
  [40,90,150,220,300].map(function(y,i){ return '<path d="M0 '+y+' C 200 '+(y-30)+', 420 '+(y+34)+', 640 '+y+' S 1020 '+(y-26)+', 1200 '+(y+10)+'" fill="none" stroke="#FFFFFF" stroke-opacity="0.14" stroke-width="1.5"/>'; }).join('')+'</svg>'; }

/* ---------- modal with focus trap + return ---------- */
var lastFocus=null;
function openModal(html){
  lastFocus=document.activeElement;
  OVERLAY.innerHTML='<div class="backdrop" data-close="1"><div class="modal" role="dialog" aria-modal="true">'+html+'</div></div>';
  var m=OVERLAY.querySelector('.modal'); var f=m.querySelector('input,textarea,select,button,[href]'); if(f) f.focus(); else m.focus();
  OVERLAY.querySelector('.backdrop').addEventListener('mousedown',function(e){ if(e.target.getAttribute('data-close')) closeModal(); });
  document.addEventListener('keydown',modalKey);
}
function modalKey(e){
  if(e.key==='Escape'){ closeModal(); return; }
  if(e.key!=='Tab') return;
  var m=OVERLAY.querySelector('.modal'); if(!m) return;
  var f=m.querySelectorAll('a[href],button:not([disabled]),input,textarea,select'); if(!f.length) return;
  var first=f[0],last=f[f.length-1];
  if(e.shiftKey&&document.activeElement===first){ e.preventDefault(); last.focus(); }
  else if(!e.shiftKey&&document.activeElement===last){ e.preventDefault(); first.focus(); }
}
function closeModal(){ OVERLAY.innerHTML=''; document.removeEventListener('keydown',modalKey); if(lastFocus&&lastFocus.focus) lastFocus.focus(); }

/* ---------- icons (SOC122 family set) ---------- */
var ICON={
  grid:['M4 4h7v7H4z','M13 4h7v7h-7z','M4 13h7v7H4z','M13 13h7v7h-7z'],
  book:['M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21z','M4 18.5A2.5 2.5 0 0 1 6.5 16H20'],
  clipboard:['M9 4.5h6v3H9z','M9 6H6v15h12V6h-3'],
  columns:['M4 4h7v16H4z','M13 4h7v16h-7z'],
  search:['M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z','M20 20l-4-4'],
  x:['M6 6l12 12','M18 6L6 18'],
  layers:['M12 3l9 5-9 5-9-5z','M3 13l9 5 9-5'],
  list:['M8 6h13','M8 12h13','M8 18h13','M3 6h.01','M3 12h.01','M3 18h.01'],
  map:['M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z','M9 4v14','M15 6v14']
};
function ic(name,size,w){ var p=ICON[name]||ICON.grid,s=size||20,out='<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="'+(w||1.8)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'; for(var i=0;i<p.length;i++) out+='<path d="'+p[i]+'"></path>'; return out+'</svg>'; }

/* ---------- navigation ---------- */
var ROUTES=[
  {id:'home',label:'Home',hash:'#/home',icon:'grid'},
  {id:'walkthrough',label:'Weekly Walkthrough',url:'https://rpeart73.github.io/psy355-companion/walkthroughs/',icon:'layers',external:true},
  {id:'glossary',label:'Glossary & Thinkers',hash:'#/glossary',icon:'book'},
  {id:'cards',label:'Self-check',hash:'#/cards',icon:'clipboard'},
  {id:'compare',label:'Compare ideas',hash:'#/compare',icon:'columns'}
];
function renderNav(active){
  var nav=ROUTES.map(function(r){
    var on=r.id===active;
    var href=r.external?r.url:r.hash; var ext=r.external?' target="_blank" rel="noopener"':'';
    return '<a href="'+href+'"'+ext+' aria-current="'+(on?'page':'false')+'" style="display:flex;align-items:center;gap:11px;border-radius:10px;padding:10px 12px;font-size:.9375rem;font-weight:'+(on?'600':'500')+';background:'+(on?'#EEF1F5':'transparent')+';color:'+(on?'#15171C':'#474C57')+';text-decoration:none;margin-bottom:2px"><span style="display:flex;align-items:center;justify-content:center;width:22px;height:22px;flex:none;color:'+(on?'var(--red)':'#8a909c')+'">'+ic(r.icon,19)+'</span><span style="flex:1">'+esc(r.label)+'</span></a>';
  }).join('');
  var weeks='<div style="margin-top:14px;padding-top:14px;border-top:1px solid var(--hair)"><div class="mono" style="font-size:.6875rem;letter-spacing:.04em;color:#8a909c;padding:0 12px 8px">WEEKS</div>'+
    (D.weeks||[]).map(function(w){ var p=phaseOf(w.phaseId);
      return '<a href="#/week/'+w.number+'" style="display:flex;align-items:center;gap:9px;border-radius:9px;padding:7px 12px;font-size:.8125rem;font-weight:500;color:#474C57;text-decoration:none"><span class="mono" style="font-size:.6875rem;color:'+p.accent+';flex:none;width:18px">'+pad(w.number)+'</span><span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(w.title||'')+'</span></a>';
    }).join('')+'</div>';
  var foot='<div style="margin-top:14px;padding:13px 12px;border-radius:12px;background:var(--raised)"><div class="mono" style="font-size:.75rem;color:#474C57;margin-bottom:4px">'+esc((D.course||{}).code||'BFS218')+'</div><div style="font-size:.8125rem;color:#15171C;line-height:1.45">A companion to Blackboard, week by week.</div></div>';
  NAV.innerHTML=nav+weeks+foot;
}

/* ---------- media embeds ---------- */
function videoBlock(wk){
  var v=wk.video||{};
  if(!v.url&&!v.id) return '<div class="aspect"><div class="placeholder">Your weekly video will appear here once it is posted. It loads only when a student presses play.</div></div>';
  var poster=v.poster?'<img src="'+esc(v.poster)+'" alt="">':'';
  return '<div class="aspect" data-video="1">'+poster+'<button class="playbtn" data-action="play-video" data-week="'+wk.number+'" aria-label="Play the Week '+wk.number+' video"><span class="circ" aria-hidden="true">&#9654;</span><span>Play the video</span><span class="muted" style="font-size:.8rem">Loads only when you click</span></button></div>';
}
function videoEmbed(v,label){
  if(v.provider==='youtube'||/youtu/.test(v.url||v.id||'')){ var id=v.id||(String(v.url).match(/[?&]v=([^&]+)/)||[])[1]||String(v.url).split('/').pop(); return '<iframe src="https://www.youtube-nocookie.com/embed/'+esc(id)+'?rel=0" title="'+esc(label||'Video')+'" allow="fullscreen" allowfullscreen></iframe>'; }
  if(v.provider==='vimeo'||/vimeo/.test(v.url||'')){ var vid=v.id||String(v.url).split('/').pop(); return '<iframe src="https://player.vimeo.com/video/'+esc(vid)+'" title="'+esc(label||'Video')+'" allowfullscreen></iframe>'; }
  return '<video controls preload="metadata" '+(v.poster?'poster="'+esc(v.poster)+'"':'')+'><source src="'+esc(v.url)+'"></video>';
}
function readingMedia(r){ return '<div class="aspect">'+videoEmbed({provider:r.provider,url:r.url})+'</div>'; }

/* ---------- slideshow ---------- */
function kpHTML(wk,cur){
  var s=wk.slides||{}, ins=(s.insights||[])[cur-1], count=s.count||0;
  var h='<div class="eyebrow">The deeper point &middot; slide '+cur+' of '+count+'</div>';
  if(!ins) return h+'<p class="muted" style="margin:0">Follow the narration for this slide.</p>';
  return h+'<p style="margin:.2em 0 0;font-size:1.02rem;line-height:1.55">'+esc(ins)+'</p>';
}
function slideBlock(wk){
  var s=wk.slides||{};
  if(!s.available||!s.count) return '<div class="aspect"><div class="placeholder">The slideshow for this week will appear here once the deck is posted.</div></div>';
  var dir=s.dir||('slides/week-'+pad(wk.number));
  return '<div class="slidewrap" data-week="'+wk.number+'" data-count="'+s.count+'" data-dir="'+esc(dir)+'" tabindex="0" aria-label="Slideshow for Week '+wk.number+', use arrow keys to move">'+
    '<div class="slideshow-grid"><div><div class="aspect"><img id="slide-img" src="'+esc(dir+'/slide-1.png')+'" alt="Slide 1 of '+s.count+'"></div>'+
    '<div style="height:4px;background:var(--hair);border-radius:2px;margin-top:8px"><div id="slide-bar" style="height:100%;width:'+(100/s.count)+'%;background:var(--red);border-radius:2px"></div></div>'+
    '<div class="slidebar"><button class="btn" data-action="slide-prev">Previous</button><span class="count"><span id="slide-n">1</span> / '+s.count+'</span><button class="btn" data-action="slide-next">Next</button></div></div>'+
    '<aside class="slide-kp" id="slide-kp" aria-live="polite">'+kpHTML(wk,1)+'</aside></div></div>';
}
function stepSlide(wrap,dir){
  if(!wrap) return;
  var count=parseInt(wrap.getAttribute('data-count'),10),dirp=wrap.getAttribute('data-dir');
  var nEl=wrap.querySelector('#slide-n'),img=wrap.querySelector('#slide-img'),bar=wrap.querySelector('#slide-bar');
  var cur=parseInt(nEl.textContent,10)+dir; if(cur<1)cur=count; if(cur>count)cur=1;
  nEl.textContent=cur; img.src=dirp+'/slide-'+cur+'.png'; img.alt='Slide '+cur+' of '+count; if(bar) bar.style.width=(100*cur/count)+'%';
  var wk=week(parseInt(wrap.getAttribute('data-week'),10)); var kpEl=document.getElementById('slide-kp'); if(kpEl&&wk) kpEl.innerHTML=kpHTML(wk,cur);
}

/* ---------- home ---------- */
function home(){
  var c=D.course||{},inst=D.instructor||{};
  var conceptCount=0; (D.weeks||[]).forEach(function(w){ conceptCount+=(w.concepts||[]).length; });
  var stats=[['Weeks',(D.weeks||[]).length],['Key ideas',conceptCount],['Tools',ROUTES.length-1]];
  var hero='<section style="background:var(--surface);border:1px solid var(--hair);border-top:4px solid var(--red);border-radius:14px;padding:30px 32px;margin-bottom:22px;box-shadow:0 1px 2px rgba(21,23,28,.04)">'+
    '<div style="display:flex;align-items:flex-start;gap:24px;flex-wrap:wrap;justify-content:space-between">'+
    '<div style="flex:1;min-width:280px"><div class="eyebrow" style="color:var(--red)">'+esc(c.code||'BFS218')+' &middot; '+esc(c.institution||'Seneca Polytechnic')+'</div>'+
    '<h1 style="font-size:2.05rem;line-height:1.14;margin:0 0 10px;color:var(--ink)">'+esc(c.title||'')+'</h1>'+
    '<p class="lede" style="margin:0;max-width:60ch">'+esc(c.subtitle||'')+'. Read, watch, and work through the course week by week, with tools that help the ideas take hold.</p>'+
    '</div>'+
    '<div style="display:flex;gap:10px;flex:none">'+stats.map(function(st){return '<div style="background:var(--raised);border:1px solid var(--hair);border-radius:12px;padding:12px 16px;text-align:center;min-width:78px"><div class="mono" style="font-size:1.7rem;font-weight:600;line-height:1;color:var(--red)">'+st[1]+'</div><div style="font-size:.6875rem;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-soft);margin-top:5px">'+st[0]+'</div></div>';}).join('')+'</div>'+
    '</div></section>';
  var layoutDefs=[['phase','By phase','layers'],['tiles','Tiles','grid'],['index','Index','list']];
  var chips=layoutDefs.map(function(d){ var on=HL===d[0]; return '<button data-action="home-layout" data-layout="'+d[0]+'" aria-pressed="'+on+'" style="display:flex;align-items:center;gap:6px;border:none;border-radius:7px;padding:6px 12px;font-size:.8125rem;font-weight:'+(on?'600':'500')+';background:'+(on?'#fff':'transparent')+';color:'+(on?'#15171C':'#474C57')+';box-shadow:'+(on?'0 1px 2px rgba(21,23,28,.12)':'none')+'">'+ic(d[2],15)+'<span>'+d[1]+'</span></button>'; }).join('');
  var bar='<section style="background:var(--surface);border:1px solid var(--hair);border-radius:14px;padding:16px 18px;margin-bottom:18px;box-shadow:0 1px 2px rgba(21,23,28,.04)">'+
    '<div style="display:flex;align-items:center;gap:10px;background:var(--paper);border:1px solid var(--hair);border-radius:10px;padding:11px 14px">'+
    '<span style="color:var(--ink-faint);display:flex;flex:none">'+ic('search',18)+'</span>'+
    '<input id="home-search" value="'+esc(HQ)+'" placeholder="Search weeks, topics, or concepts..." aria-label="Search weeks" autocomplete="off" style="flex:1;border:none;background:none;outline:none;font-size:1rem;color:var(--ink);min-width:0">'+
    (HQ?'<button data-action="home-clear" aria-label="Clear search" style="background:none;border:none;color:var(--ink-faint);display:flex;padding:2px">'+ic('x',16)+'</button>':'')+
    '</div>'+
    '<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:14px;padding-top:14px;border-top:1px solid var(--raised)">'+
    '<span id="home-resultlabel" style="font-size:.8125rem;color:var(--ink-soft)">'+resultLabel()+'</span>'+
    '<div style="margin-left:auto;display:flex;gap:4px;background:var(--raised);border-radius:9px;padding:4px" role="group" aria-label="Layout">'+chips+'</div>'+
    '</div></section>';
  var foot='<div class="card"><div class="eyebrow">A companion to Blackboard</div><p style="margin:0">This site holds the learning materials and private study tools. Official records, submission, and class discussion live in Blackboard. Nothing here is assessed or tracked.</p></div>';
  return hero+bar+'<div id="home-results">'+homeList()+'</div>'+foot;
}
function resultLabel(){ var n=filteredWeeks().length, total=(D.weeks||[]).length; return HQ.trim()?(n+' of '+total+' weeks'):('All '+total+' weeks'); }
function filteredWeeks(){
  var q=HQ.trim().toLowerCase();
  return (D.weeks||[]).filter(function(w){
    if(!q) return true;
    var hay=(w.title+' '+(w.concept||'')+' '+(w.concepts||[]).map(function(c){return c.term+' '+(c.paras||[]).join(' ');}).join(' ')+' week '+w.number).toLowerCase();
    return hay.indexOf(q)>=0;
  });
}
function weekCard(w){
  var p=phaseOf(w.phaseId);
  return '<a href="#/week/'+w.number+'" style="text-decoration:none;color:inherit;background:var(--surface);border:1px solid var(--hair);border-radius:14px;overflow:hidden;box-shadow:0 1px 2px rgba(21,23,28,.04);display:flex;flex-direction:column"><div style="height:5px;background:'+p.accent+'"></div><div style="padding:15px 16px"><div class="mono" style="font-size:.6875rem;color:var(--ink-faint);letter-spacing:.04em">WEEK '+pad(w.number)+'</div><div style="font-weight:600;font-size:1rem;line-height:1.3;margin:5px 0 4px;color:var(--ink)">'+esc(w.title||'')+'</div><div style="font-size:.8125rem;color:var(--ink-soft);line-height:1.45">'+esc(w.concept||'')+'</div></div></a>';
}
function weekRow(w){
  var p=phaseOf(w.phaseId);
  return '<a href="#/week/'+w.number+'" style="display:flex;align-items:center;gap:14px;padding:13px 18px;border-bottom:1px solid var(--raised);text-decoration:none;color:inherit"><span class="mono" style="font-size:.74rem;color:'+p.accent+';flex:none;width:56px">WEEK '+pad(w.number)+'</span><span style="flex:1;min-width:0"><span style="font-weight:600;color:var(--ink)">'+esc(w.title||'')+'</span><span style="display:block;font-size:.82rem;color:var(--ink-soft);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(w.concept||'')+'</span></span><span style="color:var(--ink-faint);flex:none">&rarr;</span></a>';
}
function homeList(){
  var weeks=filteredWeeks();
  if(!weeks.length) return '<div style="text-align:center;padding:54px 20px;color:var(--ink-soft)"><div style="font-size:1.05rem;font-weight:600;color:var(--ink);margin-bottom:6px">No weeks match that.</div><p style="margin:0">Try a broader word.</p></div>';
  if(HL==='index') return '<div style="background:var(--surface);border:1px solid var(--hair);border-radius:14px;overflow:hidden;box-shadow:0 1px 2px rgba(21,23,28,.04)">'+weeks.map(weekRow).join('')+'</div>';
  if(HL==='tiles') return '<div class="wkgrid">'+weeks.map(weekCard).join('')+'</div>';
  return (D.phases||[]).map(function(p){
    var pw=(p.weeks||[]).map(function(n){return week(n);}).filter(Boolean).filter(function(w){return weeks.indexOf(w)>=0;});
    if(!pw.length) return '';
    return '<section style="margin-bottom:22px"><div style="display:flex;align-items:baseline;gap:10px;margin-bottom:12px"><span style="display:inline-flex;align-items:center;height:24px;padding:0 10px;border-radius:8px;background:'+p.fill+';color:'+p.accent+';font-family:var(--mono);font-size:.75rem;font-weight:600">'+esc(p.name)+'</span><span class="muted" style="font-size:.8125rem">Weeks '+p.weeks[0]+' to '+p.weeks[p.weeks.length-1]+'</span><div style="flex:1;height:1px;background:var(--raised)"></div></div><div class="wkgrid">'+pw.map(weekCard).join('')+'</div></section>';
  }).join('');
}

/* ---------- week page ---------- */
function structList(arr){
  return (arr||[]).map(function(it){ return it.type==='head' ? '<h4 style="margin:14px 0 6px">'+esc(it.text)+'</h4>' : '<p style="margin:.45em 0">'+esc(it.text)+'</p>'; }).join('');
}
function readingLink(r){
  if(r.url) return '<a class="rlink" href="'+esc(r.url)+'" target="_blank" rel="noopener">Access Reading</a>';
  return '<span class="muted" style="font-size:.85rem">Available through the Seneca library.</span>';
}
function weekView(n){
  var wk=week(n); if(!wk) return '<p>Week not found.</p>';
  var p=phaseOf(wk.phaseId);
  function sec(id,title,inner){ return '<section id="sec-'+id+'" class="card" style="scroll-margin-top:14px" aria-labelledby="h-'+id+'"><h2 id="h-'+id+'" style="margin-top:0">'+esc(title)+'</h2>'+inner+'</section>'; }
  function li(x){ return '<li>'+esc(x)+'</li>'; }
  var head='<a class="btn btn-quiet" href="#/home">&#8592; All weeks</a><p class="eyebrow" style="margin-top:14px">Week '+pad(n)+' &middot; <span style="color:'+p.accent+'">'+esc(p.name)+'</span></p><h1>'+esc(wk.title||'')+'</h1><p><span class="tag" style="background:'+p.fill+'"><span class="dot" style="background:'+p.accent+'"></span>'+esc(wk.concept||'')+'</span></p>';
  var defs=[['overview','Overview'],['purpose','Purpose and Learning Outcomes'],['guiding','Guiding Questions'],['concepts','Weekly Concepts'],['readings','Readings'],['reflect','Reflection Corner'],['references','References']];
  var jump='<nav class="section-tabs" aria-label="On this page">'+defs.map(function(s){return '<button data-action="jump" data-target="sec-'+s[0]+'">'+esc(s[1])+'</button>';}).join('')+'</nav>';
  var pu=wk.purpose||{statement:[],outcomes:[]};
  var s=
    sec('overview','Overview', (wk.overview&&wk.overview.length)?structList(wk.overview):'<p class="muted">Overview coming soon.</p>')+
    sec('purpose','Purpose and Learning Outcomes', ((pu.statement||[]).map(function(x){return '<p>'+esc(x)+'</p>';}).join(''))+((pu.outcomes&&pu.outcomes.length)?'<div class="eyebrow">By the end of this week you will be able to:</div><ul style="line-height:1.7">'+pu.outcomes.map(li).join('')+'</ul>':''))+
    sec('guiding','Guiding Questions', (wk.guiding&&wk.guiding.length)?'<ol style="line-height:1.8">'+wk.guiding.map(li).join('')+'</ol>':'<p class="muted">Guiding questions coming soon.</p>')+
    sec('concepts','Weekly Concepts', (wk.concepts&&wk.concepts.length)?wk.concepts.map(function(c,ci){return '<div style="margin-bottom:22px;padding-bottom:18px;border-bottom:1px solid var(--hair)"><h3 style="margin:0 0 .4em">'+esc((ci+1)+'. '+c.term)+'</h3>'+((c.paras||[]).map(function(x){return '<p style="margin:.5em 0">'+esc(x)+'</p>';}).join(''))+((c.cites&&c.cites.length)?'<p class="cite"><b>Reference (APA 7th):</b><br>'+c.cites.map(function(x){return esc(x);}).join('<br>')+'</p>':'')+'</div>';}).join(''):'<p class="muted">Concepts coming soon.</p>')+
    sec('readings','Readings', (function(){var rs=wk.readings||[];if(!rs.length)return '<p class="muted">Readings will be listed here.</p>';return rs.map(function(r){if(r.type==='head')return '<h4 style="margin:16px 0 6px">'+esc(r.text)+'</h4>';if(r.type==='video')return '<div class="reading">'+(r.label?'<p style="margin:0 0 8px"><b>'+esc(r.label)+'</b></p>':'')+readingMedia(r)+'</div>';if(r.type==='cite')return '<div class="reading"><p style="margin:0 0 .4em">'+linkify(r.text)+'</p>'+readingLink(r)+'</div>';return '<p style="margin:.45em 0">'+esc(r.text)+'</p>';}).join('');})())+
    sec('reflect','Reflection Corner', '<p class="muted">A question to carry through this week. It is not a quiz. There is no right answer. It is here to make you think.</p><blockquote style="border-left:4px solid '+p.accent+';margin:14px 0 0;padding:6px 0 6px 18px;font-size:1.2rem;line-height:1.5">'+esc(wk.reflection||'')+'</blockquote>')+
    sec('references','References', (function(){var rf=wk.references||[];return rf.length?rf.map(function(r){return '<div class="reading"><p style="margin:0">'+linkify(r)+'</p></div>';}).join(''):'<p class="muted">References will be listed here.</p>';})());
  var deckCta=(wk.slides&&(wk.slides.deck||[]).length)?'<section class="card" style="background:linear-gradient(180deg,var(--surface),#FBFCFD);border:1px solid var(--hair)"><div style="display:flex;align-items:center;gap:18px;flex-wrap:wrap"><div style="flex:1;min-width:240px"><div class="eyebrow" style="color:'+p.accent+'">Walkthrough</div><h2 style="margin:0 0 4px">Walk through this week</h2><p class="muted" style="margin:0">A short interactive walkthrough of the week\'s big idea. '+wk.slides.deck.length+' slides, about five minutes.</p></div><button class="btn btn-primary" data-action="deck-open" data-week="'+n+'">Start the walkthrough &rarr;</button></div></section>':'';
  return head+jump+deckCta+s;
}

/* ---------- glossary and thinkers, by week ---------- */
function glossary(){
  var sel=(location.hash.split('?week=')[1])||'all';
  var weekOpts='<option value="all"'+(sel==='all'?' selected':'')+'>All weeks</option>'+(D.weeks||[]).map(function(w){return '<option value="'+w.number+'"'+(String(w.number)===String(sel)?' selected':'')+'>Week '+pad(w.number)+': '+esc(w.title||'')+'</option>';}).join('');
  var head='<h1>Glossary and Thinkers</h1><p class="lede">The language of the course in plain words, and the people behind the ideas, organized by week.</p>'+
    '<label for="gsearch">Search every term</label><input id="gsearch" data-action="g" placeholder="Type a word, for example: coded exposure" autocomplete="off">'+
    '<div id="gsearchout" style="margin-top:12px"></div>'+
    '<label for="gweek" style="margin-top:16px">Or browse by week</label><select id="gweek" data-action="gweek" style="max-width:420px">'+weekOpts+'</select>'+
    '<div id="gout" style="margin-top:16px">'+glossaryByWeek(sel)+'</div>';
  return head;
}
function glossaryByWeek(sel){
  var ws=(sel==='all')?(D.weeks||[]):[week(parseInt(sel,10))].filter(Boolean);
  return ws.map(function(w){
    var p=phaseOf(w.phaseId);
    var cons=(w.concepts||[]).map(function(c){return '<div style="margin:10px 0"><b>'+esc(c.term)+'</b><p style="margin:.25em 0 .3em">'+esc((c.paras||[]).join(' '))+'</p>'+((c.cites&&c.cites.length)?'<p class="cite">'+esc(c.cites[0])+'</p>':'')+'</div>';}).join('');
    var thinks=(D.thinkers||[]).filter(function(t){return (t.weeks||[]).indexOf(w.number)>=0;});
    var tk=thinks.length?'<div class="eyebrow" style="margin-top:10px">Thinkers this week</div>'+thinks.map(function(t){return '<p style="margin:.2em 0"><b>'+esc(t.name)+'.</b> '+esc(t.note)+'</p>';}).join(''):'';
    return '<div class="glossweek"><div class="eyebrow" style="color:'+p.accent+';margin-top:8px">Week '+pad(w.number)+' &middot; '+esc(w.title||'')+'</div>'+(cons||'<p class="muted">No concepts listed.</p>')+tk+'</div>';
  }).join('');
}
function glossarySearch(q){
  q=(q||'').toLowerCase().trim(); if(!q) return '';
  var hits=(D.glossary||[]).filter(function(g){return (g.term+' '+g.def).toLowerCase().indexOf(q)>=0;});
  if(!hits.length) return '<p class="muted">No matches. Try another word.</p>';
  return '<div class="grid grid-2">'+hits.map(function(g){return '<div class="card"><b>'+esc(g.term)+'</b><p style="margin:.3em 0 .4em">'+esc(g.def||'')+'</p>'+(g.cite?'<p class="cite">'+esc(g.cite)+'</p>':'')+'<div class="mono" style="font-size:.72rem;color:#54585A;margin-top:6px">Weeks: '+(g.weeks||[]).map(function(n){return '<a href="#/week/'+n+'">W'+pad(n)+'</a>';}).join(', ')+'</div></div>';}).join('')+'</div>';
}

/* ---------- self-check cards ---------- */
function cards(){
  var pre=(location.hash.split('?week=')[1])||'';
  var opts='<option value="">All weeks</option>'+(D.weeks||[]).map(function(w){return '<option value="'+w.number+'"'+(String(w.number)===String(pre)?' selected':'')+'>Week '+pad(w.number)+'</option>';}).join('');
  return '<h1>Self-check cards</h1><p class="lede">Practice recalling the key ideas in your own words, then flip to check. Private study, never a test.</p>'+
    '<label for="card-week">Show cards for</label><select id="card-week" data-action="cw" style="max-width:280px">'+opts+'</select><div id="cardgrid" style="margin-top:16px">'+cardGrid(pre)+'</div>';
}
function cardGrid(wk){
  var cs=(D.cards||[]).filter(function(c){return !wk||(c.weeks||[]).indexOf(parseInt(wk,10))>=0;});
  if(!cs.length) return '<p class="muted">No cards for this selection.</p>';
  return '<div class="grid grid-2">'+cs.map(function(c){return '<div class="flip" data-action="flip" tabindex="0" role="button" aria-label="Flashcard: '+esc(c.front)+'. Activate to flip."><div class="flip-inner"><div class="flip-face"><div class="eyebrow">Recall</div><b style="font-size:1.1rem">'+esc(c.front)+'</b><span class="muted" style="margin-top:auto;font-size:.8rem">Click to flip</span></div><div class="flip-face flip-back"><div class="eyebrow">Definition</div><p style="margin:0">'+esc(c.back)+'</p></div></div></div>';}).join('')+'</div>';
}

/* ---------- compare ideas (hold concepts side by side + synthesize) ---------- */
function allConcepts(){ var out=[]; (D.weeks||[]).forEach(function(w){ (w.concepts||[]).forEach(function(c,i){ out.push({id:'w'+w.number+'-'+i,week:w.number,term:c.term,text:(c.paras||[]).join(' '),cite:(c.cites&&c.cites[0])||'',wtitle:w.title||''}); }); }); return out; }
function conceptById(id){ var a=allConcepts(); for(var i=0;i<a.length;i++) if(a[i].id===id) return a[i]; return null; }
function cmpToggle(id){ var i=CMP.indexOf(id); if(i>=0){ CMP.splice(i,1); } else { if(CMP.length>=3){ toast('Compare holds three ideas at a time.'); return; } CMP.push(id); } SHOWSYN=false; saveCmp(); render(); }
function cmpSynth(items){
  var named=items.map(function(c){ return c.term; });
  var list=items.length===2?(named[0]+' and '+named[1]):(named.slice(0,-1).join(', ')+', and '+named[named.length-1]);
  return 'Put '+list+' in the same frame and read the explanations above against one real technology, a hiring tool, a facial recognition system, a predictive model. Ask three things. Where do these concepts reinforce one another, naming the same force from different angles? Where does one make visible what the others leave in the dark, a harm, a history, or a person the system was never built for? And what would you miss if you reached for only one of them? The work of this course is to hold them together: technology is never neutral, and neither is the data it learns from.';
}
function compareView(){
  var picked=CMP.map(conceptById).filter(Boolean), all=allConcepts();
  var left;
  if(picked.length){
    var cols=picked.map(function(c){ var p=phaseOf((week(c.week)||{}).phaseId);
      return '<div class="cmpcol"><div style="height:5px;background:'+p.accent+'"></div><div style="padding:16px 17px"><h3 style="margin:0 0 .5em">'+esc(c.term)+'</h3><p style="margin:0;font-size:.92rem;color:var(--ink-soft);line-height:1.55">'+esc(c.text)+'</p>'+(c.cite?'<p class="cite" style="margin-top:10px">'+esc(c.cite)+'</p>':'')+'<button class="btn btn-quiet" data-action="cmp-add" data-id="'+esc(c.id)+'" style="margin-top:10px;color:var(--red)">Remove</button></div></div>';
    }).join('');
    var synth=picked.length>=2?(SHOWSYN?'<div style="background:#1B2A4A;color:#fff;border-radius:14px;padding:20px 22px;margin-bottom:18px"><div style="display:flex;align-items:center;gap:9px;margin-bottom:10px"><span class="eyebrow" style="color:#F2A900;margin:0">How these connect</span><button class="btn btn-quiet" data-action="cmp-hide" style="margin-left:auto;color:#fff">Hide</button></div><p style="margin:0;font-size:1rem;line-height:1.6;color:rgba(255,255,255,.92)">'+esc(cmpSynth(picked))+'</p></div>':'<button class="btn btn-primary" data-action="cmp-synth" style="margin-bottom:18px">Synthesize their relationship</button>'):'<p class="muted" style="margin:0 0 14px">Add one more idea to compare it against this one.</p>';
    left=synth+'<div style="display:flex;gap:16px;overflow-x:auto;padding-bottom:10px">'+cols+'</div>';
  } else {
    left='<div class="card" style="text-align:center;padding:42px 24px"><p class="muted" style="margin:0">Nothing selected yet. Choose two or three ideas from the list on the right.</p></div>';
  }
  var picklist=all.map(function(c){ var sel=CMP.indexOf(c.id)>=0; var p=phaseOf((week(c.week)||{}).phaseId);
    return '<button class="cmppick" data-action="cmp-add" data-id="'+esc(c.id)+'" style="background:'+(sel?'#E6EAF1':'none')+'"><span style="width:9px;height:9px;border-radius:50%;background:'+p.accent+';flex:none"></span><span style="flex:1;min-width:0;font-size:.85rem;font-weight:600;color:var(--ink)">'+esc(c.term)+'</span><span style="flex:none;font-weight:700;color:'+(sel?'#1B2A4A':'#9aa3b2')+'">'+(sel?'&#10003;':'+')+'</span></button>';
  }).join('');
  var head='<h1>Compare ideas</h1><p class="lede">Hold two or three of the course\'s key ideas side by side, then synthesize how they connect. Private study, saved on your device.</p>'+(picked.length?'<button class="btn btn-quiet" data-action="cmp-clear" style="color:var(--red);margin-bottom:10px">Clear all</button>':'');
  return head+'<div class="cmpgrid"><div>'+left+'</div><aside style="position:sticky;top:72px"><div class="card" style="padding:0;overflow:hidden;max-height:calc(100vh - 120px);display:flex;flex-direction:column"><div style="padding:13px 14px;border-bottom:1px solid var(--hair)"><b>Key ideas</b><div class="muted" style="font-size:.78rem;margin-top:2px">'+picked.length+' of 3 selected &middot; tap to add or remove</div></div><div style="overflow:auto">'+picklist+'</div></div></aside></div>';
}

/* ---------- living slides (interactive walkthrough) ---------- */
var DECK={n:0,i:0,slides:[],week:0};
function deckAccent(){ var p=phaseOf((week(DECK.week)||{}).phaseId); return (p&&p.accent)||'#3A6EA5'; }
function deckSlide(s){
  if(s.kind==='title') return '<div class="deck-eyebrow">'+(s.eyebrow||'')+'</div><h2 class="deck-h">'+(s.title||'')+'</h2><p class="deck-sub">'+(s.sub||'')+'</p>';
  if(s.kind==='statement') return '<p class="deck-statement">'+(s.text||'')+'</p>'+(s.note?'<p class="deck-sub" style="margin-top:20px">'+s.note+'</p>':'');
  if(s.kind==='concept') return '<div class="deck-eyebrow">Concept</div><h2 class="deck-h">'+esc(s.term||'')+'</h2><p class="deck-sub">'+esc(s.def||'')+'</p>'+(s.cite?'<div class="deck-cite">'+esc(s.cite)+'</div>':'');
  if(s.kind==='reflect') return '<div class="deck-eyebrow">Reflection</div><h2 class="deck-h" style="font-size:clamp(1.15rem,2.4vw,1.45rem);color:var(--ink-faint);font-weight:600;margin-bottom:.5em">Carry this with you</h2><p class="deck-q">'+esc(s.question||'')+'</p>';
  var pts=(s.points||[]).map(function(x){return '<li>'+x+'</li>';}).join('');
  return '<div class="deck-eyebrow">'+(s.eyebrow||(s.kind==='close'?'For this week':'Key idea'))+'</div><h2 class="deck-h" style="font-size:clamp(1.5rem,3.2vw,2.1rem)">'+(s.title||'')+'</h2>'+(s.lead?'<p class="deck-sub" style="margin-bottom:4px">'+s.lead+'</p>':'')+'<ul class="deck-points">'+pts+'</ul>';
}
function deckRender(){
  var s=DECK.slides[DECK.n], total=DECK.slides.length, acc=deckAccent(), pts=(s.points||[]);
  var last=(DECK.n===total-1 && DECK.i>=pts.length);
  OVERLAY.innerHTML='<div class="deck" role="dialog" aria-modal="true" aria-label="Week '+DECK.week+' walkthrough" style="--accent:'+acc+'">'+
    '<div class="deck-top"><span class="pin">'+esc((D.course||{}).code||'PSY355')+' &middot; WEEK '+pad(DECK.week)+'</span><div class="deck-prog"><i style="width:'+(100*(DECK.n+1)/total)+'%"></i></div><button class="deck-close" data-action="deck-close" aria-label="Close walkthrough">Close &times;</button></div>'+
    '<div class="deck-stage"><div class="deck-card"><div class="strip" style="background:'+acc+'"></div>'+deckSlide(s)+'</div></div>'+
    '<div class="deck-foot"><button class="deck-btn" data-action="deck-prev"'+((DECK.n===0&&DECK.i===0)?' disabled':'')+'>&larr; Back</button><span class="deck-count">'+(DECK.n+1)+' / '+total+'</span><button class="deck-btn deck-next" data-action="deck-next">'+(last?'Finish':'Next &rarr;')+'</button></div>'+
    '</div>';
  var lis=OVERLAY.querySelectorAll('.deck-points li');
  for(var k=0;k<lis.length && k<DECK.i;k++){ lis[k].classList.add('show'); }
  var nb=OVERLAY.querySelector('.deck-next'); if(nb) nb.focus();
}
function deckOpen(wk){ var w=week(wk); if(!w||!w.slides||!(w.slides.deck||[]).length) return; DECK.week=wk; DECK.slides=w.slides.deck; DECK.n=0; DECK.i=0; document.body.style.overflow='hidden'; deckRender(); document.addEventListener('keydown',deckKey); }
function deckNext(){ var pts=(DECK.slides[DECK.n].points||[]); if(DECK.i<pts.length){ DECK.i++; deckRender(); return; } if(DECK.n<DECK.slides.length-1){ DECK.n++; DECK.i=0; deckRender(); return; } deckClose(); }
function deckPrev(){ if(DECK.i>0){ DECK.i--; deckRender(); return; } if(DECK.n>0){ DECK.n--; DECK.i=(DECK.slides[DECK.n].points||[]).length; deckRender(); } }
function deckClose(){ OVERLAY.innerHTML=''; document.body.style.overflow=''; document.removeEventListener('keydown',deckKey); }
function deckKey(e){ if(e.key==='Escape'){ deckClose(); } else if(e.key==='ArrowRight'||e.key===' '){ e.preventDefault(); deckNext(); } else if(e.key==='ArrowLeft'){ e.preventDefault(); deckPrev(); } }

/* ---------- render dispatch ---------- */
function render(){
  var h=location.hash||'#/home', path=h.replace(/^#\//,'').split('?')[0], html, active;
  if(path.indexOf('week/')===0){ active='home'; html=weekView(parseInt(path.split('/')[1],10)); }
  else if(path==='glossary'){ active='glossary'; html=glossary(); }
  else if(path==='cards'){ active='cards'; html=cards(); }
  else if(path==='compare'){ active='compare'; html=compareView(); }
  else { active='home'; html=home(); }
  renderNav(active); MAIN.innerHTML=html; MAIN.focus(); window.scrollTo(0,0);
}

/* ---------- events ---------- */
document.addEventListener('click',function(e){
  var t=e.target.closest('[data-action]'); if(!t) return;
  var a=t.getAttribute('data-action');
  if(a==='play-video'){ var wk=week(parseInt(t.getAttribute('data-week'),10)); t.closest('.aspect').innerHTML=videoEmbed(wk.video,'Week '+wk.number+' video'); }
  else if(a==='jump'){ var je=document.getElementById(t.getAttribute('data-target')); if(je) je.scrollIntoView({behavior:'smooth',block:'start'}); }
  else if(a==='slide-prev'||a==='slide-next'){ stepSlide(t.closest('.slidewrap'),a==='slide-next'?1:-1); }
  else if(a==='flip'){ t.classList.toggle('flipped'); }
  else if(a==='modal-close'){ closeModal(); }
  else if(a==='cmp-add'){ cmpToggle(t.getAttribute('data-id')); }
  else if(a==='cmp-clear'){ CMP=[]; SHOWSYN=false; saveCmp(); render(); }
  else if(a==='cmp-synth'){ SHOWSYN=true; render(); }
  else if(a==='cmp-hide'){ SHOWSYN=false; render(); }
  else if(a==='home-layout'){ HL=t.getAttribute('data-layout'); MAIN.innerHTML=home(); }
  else if(a==='home-clear'){ HQ=''; MAIN.innerHTML=home(); var hs=document.getElementById('home-search'); if(hs) hs.focus(); }
  else if(a==='deck-open'){ deckOpen(parseInt(t.getAttribute('data-week'),10)); }
  else if(a==='deck-next'){ deckNext(); }
  else if(a==='deck-prev'){ deckPrev(); }
  else if(a==='deck-close'){ deckClose(); }
});
document.addEventListener('keydown',function(e){
  var f=e.target.closest&&e.target.closest('[data-action=flip]');
  if(f&&(e.key==='Enter'||e.key===' ')){ e.preventDefault(); f.classList.toggle('flipped'); }
  var sw=e.target.closest&&e.target.closest('.slidewrap');
  if(sw&&(e.key==='ArrowLeft'||e.key==='ArrowRight')){ e.preventDefault(); stepSlide(sw,e.key==='ArrowRight'?1:-1); }
});
document.addEventListener('input',function(e){
  if(e.target.id==='gsearch'){ document.getElementById('gsearchout').innerHTML=glossarySearch(e.target.value); }
  else if(e.target.id==='home-search'){ HQ=e.target.value; var hr=document.getElementById('home-results'); if(hr) hr.innerHTML=homeList(); var rl=document.getElementById('home-resultlabel'); if(rl) rl.textContent=resultLabel(); }
});
document.addEventListener('change',function(e){
  if(e.target.id==='gweek'){ location.hash='#/glossary?week='+e.target.value; }
  else if(e.target.id==='card-week'){ document.getElementById('cardgrid').innerHTML=cardGrid(e.target.value); }
});
window.addEventListener('hashchange',render);
render();
})();

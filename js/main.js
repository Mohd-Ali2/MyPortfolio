const prefersReducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initReveal(){
  const items=document.querySelectorAll('.reveal');
  if(prefersReducedMotion||!('IntersectionObserver'in window)){items.forEach(el=>el.classList.add('visible'));return;}
  const observer=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target);}})},{threshold:.14,rootMargin:'0px 0px -80px 0px'});
  items.forEach(el=>observer.observe(el));
}

function initNav(){
  const toggle=document.querySelector('[data-nav-toggle]');
  const links=document.querySelector('[data-nav-links]');
  if(!toggle||!links)return;
  toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
  links.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{links.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
}

function initActiveLinks(){
  const sections=[...document.querySelectorAll('main section[id]')];
  const links=[...document.querySelectorAll('.nav-links a')];
  if(!sections.length||!links.length||!('IntersectionObserver'in window))return;
  const map=new Map(links.map(link=>[link.getAttribute('href').replace('#',''),link]));
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(link=>link.classList.remove('active'));const link=map.get(entry.target.id);if(link)link.classList.add('active');}})},{threshold:.35,rootMargin:'-18% 0px -55% 0px'});
  sections.forEach(section=>observer.observe(section));
}

function initCursorLight(){
  const light=document.querySelector('[data-cursor-light]');
  if(!light||prefersReducedMotion)return;
  let x=window.innerWidth/2,y=window.innerHeight/2,tx=x,ty=y,ticking=false;
  window.addEventListener('pointermove',event=>{tx=event.clientX;ty=event.clientY;if(!ticking){requestAnimationFrame(update);ticking=true;}},{passive:true});
  function update(){x+=(tx-x)*.16;y+=(ty-y)*.16;light.style.left=x+'px';light.style.top=y+'px';ticking=false;if(Math.abs(tx-x)>.4||Math.abs(ty-y)>.4){requestAnimationFrame(update);ticking=true;}}
}

function initTilt(){
  const tilt=document.querySelector('[data-tilt] .iphone-shell');
  if(!tilt||prefersReducedMotion)return;
  window.addEventListener('pointermove',event=>{if(window.innerWidth<980)return;const x=(event.clientX/window.innerWidth-.5)*8;const y=(event.clientY/window.innerHeight-.5)*-8;tilt.style.transform=`rotateX(${y}deg) rotateY(${x}deg)`;},{passive:true});
  window.addEventListener('pointerleave',()=>{tilt.style.transform='rotateX(0deg) rotateY(0deg)';});
}

function initMagnet(){
  if(prefersReducedMotion)return;
  document.querySelectorAll('.btn,.liquid-card').forEach(el=>{
    el.addEventListener('pointermove',event=>{if(window.innerWidth<760)return;const r=el.getBoundingClientRect();const x=(event.clientX-r.left-r.width/2)/r.width;const y=(event.clientY-r.top-r.height/2)/r.height;el.style.setProperty('--mx',`${50+x*24}%`);el.style.setProperty('--my',`${50+y*24}%`);});
    el.addEventListener('pointerleave',()=>{el.style.removeProperty('--mx');el.style.removeProperty('--my');});
  });
}

document.addEventListener('DOMContentLoaded',()=>{initReveal();initNav();initActiveLinks();initCursorLight();initTilt();initMagnet();});

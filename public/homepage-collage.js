/* Reuses the project's own cover images. Does not modify app.js or content.json. */
(()=>{
 const app=document.querySelector('#app');
 if(!app)return;
 let queued=false;
 function update(){
  queued=false;
  const intro=app.querySelector('.portfolio-intro');
  if(!intro||intro.querySelector('.intro-art'))return;
  const covers=[...app.querySelectorAll('.project-card img')].slice(0,4);
  if(!covers.length)return;
  const art=document.createElement('div');art.className='intro-art';art.setAttribute('aria-hidden','true');
  covers.forEach((cover)=>{const img=document.createElement('img');img.src=cover.src;img.alt='';img.loading='lazy';art.appendChild(img)});
  const text=intro.querySelector(':scope > p');
  if(text)intro.insertBefore(art,text);else intro.appendChild(art);
 }
 const observer=new MutationObserver(()=>{if(!queued){queued=true;requestAnimationFrame(update)}});
 observer.observe(app,{childList:true,subtree:true});
 update();
})();

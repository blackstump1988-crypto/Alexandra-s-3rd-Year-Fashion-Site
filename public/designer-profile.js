/* Loads editable designer copy from designer.json and inserts it before the four project tiles. */
(()=>{
 const app=document.querySelector('#app');
 if(!app)return;
 let profile=null,loading=false;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 async function getProfile(){
  if(profile)return profile;
  if(loading)return null;
  loading=true;
  try{const response=await fetch('/designer.json',{cache:'no-store'});if(!response.ok)throw Error('designer.json not found');profile=await response.json();return profile}finally{loading=false}
 }
 async function render(){
  const grid=app.querySelector('.project-grid');
  if(!grid||app.querySelector('.designer-profile'))return;
  try{
   const d=await getProfile();if(!d)return;
   const section=document.createElement('section');section.className='designer-profile';
   const paragraphs=(d.paragraphs||[]).filter(Boolean).map(p=>`<p>${esc(p)}</p>`).join('');
   section.innerHTML=`<div class="designer-profile__portrait"><img src="${esc(d.headshot)}" alt="${esc(d.headshotAlt||d.name||'Designer portrait')}" loading="lazy"></div><div class="designer-profile__content"><span class="designer-profile__eyebrow">${esc(d.heading||'About the Designer')}</span><h2>${esc(d.name||'Alexandra')}</h2><div class="designer-profile__text">${paragraphs}</div></div>`;
   grid.parentNode.insertBefore(section,grid);
  }catch(error){console.warn('Designer profile could not be loaded',error)}
 }
 const observer=new MutationObserver(()=>requestAnimationFrame(render));observer.observe(app,{childList:true,subtree:true});render();
})();

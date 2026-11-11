/* Enhances dynamically loaded R2 galleries; no app.js changes required. */
(()=>{
 const valid=new Set(['process','illustrations','photoshoot']);
 let observer;
 function refresh(){
  const parts=location.hash.replace(/^#\/?/,'').split('/');
  document.body.dataset.section=valid.has(parts[1])?parts[1]:'';
  if(observer)observer.disconnect();
  observer=new IntersectionObserver(entries=>{
   for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}
  },{rootMargin:'0px 0px 80px 0px',threshold:.05});
  document.querySelectorAll('.gallery button').forEach(button=>{
   if(matchMedia('(prefers-reduced-motion: reduce)').matches)button.classList.add('in-view');
   else observer.observe(button);
  });
 }
 const mutations=new MutationObserver(()=>{clearTimeout(mutations.timer);mutations.timer=setTimeout(refresh,60)});
 mutations.observe(document.querySelector('#app')||document.body,{childList:true,subtree:true});
 addEventListener('hashchange',refresh);
 refresh();
})();

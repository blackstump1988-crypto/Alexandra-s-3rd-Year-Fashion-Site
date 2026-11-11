(()=>{function update(){const id=location.hash.replace(/^#\/?/,'').split('/')[0];document.body.dataset.project=/^project-[1-4]$/.test(id)?id:'';}addEventListener('hashchange',update);update();})();

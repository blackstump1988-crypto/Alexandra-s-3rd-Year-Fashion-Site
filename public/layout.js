// Detect the current portfolio section from the URL. No changes to app.js required.
(function(){function update(){const parts=location.hash.replace(/^#\/?/,'').split('/');const section=parts[1]||'';document.body.dataset.section=['process','illustrations','photoshoot'].includes(section)?section:'';}window.addEventListener('hashchange',update);update();})();

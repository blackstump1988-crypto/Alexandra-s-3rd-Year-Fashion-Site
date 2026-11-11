const PROJECTS = new Set(['project-1','project-2','project-3','project-4']);
const SECTIONS = new Set(['process','illustrations','photoshoot']);
const IMAGE_EXT = /\.(png|jpe?g)$/i;
const mime = {png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg'};
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/gallery/')) {
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts.length !== 4 || parts[0] !== 'api' || parts[1] !== 'gallery' || !PROJECTS.has(parts[2]) || !SECTIONS.has(parts[3])) return Response.json({error:'Invalid gallery'}, {status:404});
      const prefix = `${parts[2]}/${parts[3]}/`;
      let cursor, objects = [];
      do {
        const batch = await env.PHOTOS.list({prefix, cursor, limit:1000});
        objects.push(...batch.objects.filter(o => IMAGE_EXT.test(o.key)));
        cursor = batch.truncated ? batch.cursor : undefined;
      } while (cursor && objects.length < 5000);
      objects.sort((a,b)=>a.key.localeCompare(b.key,undefined,{numeric:true,sensitivity:'base'}));
      return Response.json({images:objects.map(o=>({src:'/photos/'+o.key.split('/').map(encodeURIComponent).join('/'),alt:o.key.slice(prefix.length).replace(/\.[^.]+$/,'').replace(/[-_]/g,' '),caption:''}))}, {headers:{'Cache-Control':'public, max-age=60'}});
    }
    if (url.pathname.startsWith('/photos/')) {
      let key;
      try {key=decodeURIComponent(url.pathname.slice(8));} catch {return new Response('Invalid image path',{status:400});}
      if (!key || key.split('/').some(x=>x==='.'||x==='..')) return new Response('Invalid image path',{status:400});
      if (!IMAGE_EXT.test(key)) return new Response('Unsupported image format',{status:415});
      const image=await env.PHOTOS.get(key);
      if (!image) return new Response('Image not found',{status:404});
      const headers=new Headers();image.writeHttpMetadata(headers);
      if (!headers.has('Content-Type')) headers.set('Content-Type',mime[key.split('.').pop().toLowerCase()]);
      headers.set('ETag',image.httpEtag);headers.set('Cache-Control','public, max-age=86400');
      return new Response(image.body,{headers});
    }
    return env.ASSETS.fetch(request);
  }
};

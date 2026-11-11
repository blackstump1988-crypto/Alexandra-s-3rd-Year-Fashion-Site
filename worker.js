export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/photos/')) {
      let key;
      try { key = decodeURIComponent(url.pathname.slice('/photos/'.length)); }
      catch { return new Response('Invalid image path', { status: 400 }); }
      if (!key || key.split('/').some(part => part === '..' || part === '.')) return new Response('Invalid image path', { status: 400 });
      const image = await env.PHOTOS.get(key);
      if (!image) return new Response('Image not found', { status: 404 });
      const headers = new Headers();
      image.writeHttpMetadata(headers);
      headers.set('ETag', image.httpEtag);
      headers.set('Cache-Control', 'public, max-age=86400');
      return new Response(image.body, { headers });
    }
    return env.ASSETS.fetch(request);
  }
};

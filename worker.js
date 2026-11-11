export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Retrieve photographs from Cloudflare R2
    if (url.pathname.startsWith("/photos/")) {
      const key = decodeURIComponent(
        url.pathname.slice("/photos/".length)
      );

      if (!key || key.split("/").includes("..")) {
        return new Response("Invalid image path", {
          status: 400
        });
      }

      const image = await env.PHOTOS.get(key);

      if (!image) {
        return new Response("Image not found", {
          status: 404
        });
      }

      const headers = new Headers();

      image.writeHttpMetadata(headers);

      headers.set(
        "Cache-Control",
        "public, max-age=86400"
      );

      return new Response(image.body, {
        headers
      });
    }

    // Serve the existing website
    return env.ASSETS.fetch(request);
  }
};

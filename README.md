# Alexandra Fashion Portfolio

Upload the **contents** of this folder to the root of a new GitHub repository, preserving the `public` folder. In Cloudflare Workers, connect the repository. Build command: `npm run build`. Deploy command: `npx wrangler deploy`. The Worker is named `alexandra-fashion-portfolio`.

**Important:** `wrangler.jsonc` uses `./public` as the assets directory, not `.`. This excludes `node_modules` and avoids the previous 152 MiB asset error.

Images currently use temporary Unsplash examples. Replace the `src` entries in `public/gallery.json` when Alexandra's own images are ready. Do not upload the original photo collection to GitHub. Cloudflare R2 can be connected as a later step.

# Alexandra's Four-Project Fashion Portfolio

This replaces the earlier one-project site while retaining the existing Cloudflare Worker and R2 image setup.

## Replace the GitHub files

1. Download and extract the ZIP.
2. In the GitHub repository, upload the contents of the extracted folder.
3. Choose **Replace files** if GitHub warns that files already exist.
4. Confirm the `public` folder contains `index.html`, `style.css`, `app.js` and `content.json`.
5. Commit the changes. Cloudflare should deploy automatically.

## Edit text, project names and images

All routine portfolio content is in `public/content.json`. Edit this one file in GitHub to change:

- portfolio introduction and year
- four project titles, subtitles and overview text
- section explanatory text
- project colours
- cover images
- gallery images, captions and alt text

R2 images use paths such as `/photos/project-1/process/001.jpg`.

## Recommended R2 structure

- `project-1/process/`
- `project-1/illustrations/`
- `project-1/photoshoot/`
- repeat for `project-2`, `project-3` and `project-4`

The site does not yet list R2 folders automatically. Images must be added to `content.json`, which preserves deliberate ordering and captions.

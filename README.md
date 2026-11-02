# troveOS

troveOS is a static, browser-based desktop environment. It uses HTML, CSS, vanilla JavaScript modules, and IndexedDB; there is no build step or server-side component.

## Run locally
Open `index.html` from a local web server or publish the folder with GitHub Pages. ES modules and service workers require a secure context (HTTPS or localhost), so a direct `file://` launch may not support every feature.

## GitHub Pages
1. Create a GitHub repository and upload the contents of this folder to the `main` branch.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select **main** and **/(root)**, then save.
5. Open the Pages URL GitHub displays. This project uses relative paths and works in a repository subpath.

## Files and privacy
Files and settings are stored locally in the browser's IndexedDB and local storage. They are not uploaded to the website. Clearing browser data removes them. Export important files from File Manager before clearing site data.

## Apps
The launcher contains built-in apps. Third-party modules can be registered in `apps/catalog.json`; modules are ES modules exporting a default app class. App code runs in the same page as troveOS, so only install code you trust.

## Browser app
Some sites block iframe embedding through their security headers. Those sites cannot be displayed inside the browser app; use its Open externally action instead.

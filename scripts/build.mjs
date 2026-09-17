import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

await mkdir('dist/sub-pages', { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', 'treatments.js', 'sub-pages', 'robots.txt', 'sitemap.xml']) {
  await cp(`src/${file}`, `dist/${file}`, { recursive: true });
}
// Render treatment content at build time so it also works without JavaScript.
const treatments = runInNewContext(`${await readFile('src/treatments.js', 'utf8')}; treatmentObj`);
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const details = Object.entries(treatments).map(([id, item]) =>
  `<details class="treatment-item" id="${id}"><summary>${escape(item.title)}</summary><p>${escape(item.description)}</p></details>`
).join('\n');
for (const path of ['dist/sub-pages/treatment.html', 'dist/sub-pages/services.html']) {
const html = await readFile(path, 'utf8');
await writeFile(path, html.replace('<div class="treatment-grid" id="treatment-list"></div>', `<div class="treatment-grid" id="treatment-list">${details}</div>`));
}
console.log('Built all six pages in dist/');

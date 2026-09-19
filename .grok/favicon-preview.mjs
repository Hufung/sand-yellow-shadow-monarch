import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const svg = readFileSync("/workspace/.grok/favicon.svg.tmp", "utf8");
const html = `<!doctype html>
<html><head><style>
  html,body { margin:0; padding:8px; background:#4a4a4a; }
  .row { display:flex; gap:16px; align-items:flex-end; }
  .box { background:#222; padding:4px; }
  img { display:block; }
</style></head>
<body>
<div class="row">
  <div class="box"><img id="s16" width="16" height="16" src='data:image/svg+xml;utf8,${encodeURIComponent(svg)}'></div>
  <div class="box"><img id="s32" width="32" height="32" src='data:image/svg+xml;utf8,${encodeURIComponent(svg)}'></div>
  <div class="box"><img id="s64" width="64" height="64" src='data:image/svg+xml;utf8,${encodeURIComponent(svg)}'></div>
</div>
</body></html>`;
writeFileSync("/workspace/.grok/favicon-preview.html", html);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 280, height: 120 } });
await page.goto(pathToFileURL("/workspace/.grok/favicon-preview.html").href);
await page.screenshot({ path: "/workspace/.grok/favicon-preview.png" });
await page.locator("#s16").screenshot({ path: "/workspace/.grok/favicon-16.png" });
await page.locator("#s32").screenshot({ path: "/workspace/.grok/favicon-32.png" });
await browser.close();
console.log("ok");

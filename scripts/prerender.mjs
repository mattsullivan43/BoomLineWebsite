// Post-build: render every route to static HTML so crawlers that don't run
// JavaScript (Bing, ChatGPT, Perplexity, social previews) get real content
// and per-page <head> tags. Also writes the sitemap and the 404 fallback.
//
// Output uses flat files (dist/features.html, not dist/features/index.html)
// so GitHub Pages serves /features directly instead of 301-ing to /features/.

import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render, pages, notFoundMeta, canonicalUrl, SITE_URL } = await import(
  path.join(ssrDir, 'entry-server.js')
)

const template = readFileSync(path.join(dist, 'index.html'), 'utf8')

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function headTags({ title, description, canonical, robots }) {
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    canonical && `<link rel="canonical" href="${canonical}" />`,
    canonical && `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
  ]
    .filter(Boolean)
    .join('\n    ')
}

function fill(head, html) {
  if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
    throw new Error('index.html is missing <!--app-head--> or <!--app-html--> placeholders')
  }
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html)
}

for (const page of pages) {
  const html = render(page.path)
  if (!html.trim()) throw new Error(`Empty render for ${page.path}`)
  const head = headTags({
    title: page.title,
    description: page.description,
    canonical: canonicalUrl(page.path),
    robots: 'index, follow, max-image-preview:large',
  })
  const file = page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`
  writeFileSync(path.join(dist, file), fill(head, html))
  console.log(`prerendered ${page.path} → dist/${file}`)
}

// 404 fallback: GitHub Pages serves this (with a 404 status) for any unknown
// path. Old trailing-slash URLs (/features/) get sent to the canonical form;
// anything else renders the app's NotFound page client-side.
const redirect = `<script>
      (function () {
        var p = location.pathname;
        if (p.length > 1 && p.slice(-1) === '/') {
          location.replace(p.replace(/\\/+$/, '') + location.search + location.hash);
        }
      })();
    </script>`
const notFoundHead = headTags({ ...notFoundMeta, robots: 'noindex' }) + '\n    ' + redirect
writeFileSync(path.join(dist, '404.html'), fill(notFoundHead, ''))
console.log('wrote dist/404.html')

// Sitemap, with <lastmod> from each page's last commit.
function lastmod(source) {
  try {
    const d = execSync(`git log -1 --format=%cs -- "${source}"`, { cwd: root }).toString().trim()
    if (d) return d
  } catch {
    // not a git checkout — fall through
  }
  return new Date().toISOString().slice(0, 10)
}

const urls = pages
  .map(
    (p) => `  <url>
    <loc>${canonicalUrl(p.path)}</loc>
    <lastmod>${lastmod(p.source)}</lastmod>
  </url>`,
  )
  .join('\n')
writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
)
console.log(`wrote dist/sitemap.xml (${pages.length} URLs, ${SITE_URL})`)

rmSync(ssrDir, { recursive: true, force: true })

/* eslint-disable react-refresh/only-export-components -- server entry, never hot-reloaded */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import App from './App'

export { pages, notFoundMeta, canonicalUrl, SITE_URL } from './seo'

function app(url: string) {
  return (
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  )
}

// Two passes: the first waits for the route's lazy page chunk to load; the
// second renders with it already resolved, so the HTML comes out in order
// with no Suspense placeholders or streaming scripts.
export async function render(url: string) {
  const { prelude } = await prerenderToNodeStream(app(url))
  // Node stream at runtime; the app tsconfig types it as a web stream.
  for await (const _ of prelude as unknown as AsyncIterable<unknown>) void _
  return renderToString(app(url))
}

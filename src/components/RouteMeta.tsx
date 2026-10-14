import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { canonicalUrl, metaFor, notFoundMeta } from '../seo'

// Keeps <head> in sync on client-side navigation. The initial values are
// baked into each prerendered HTML file by scripts/prerender.mjs.
function setAttr(selector: string, attr: string, value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value)
}

export default function RouteMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const page = metaFor(pathname)
    const title = page?.title ?? notFoundMeta.title
    const description = page?.description ?? notFoundMeta.description

    document.title = title
    setAttr('meta[name="description"]', 'content', description)
    setAttr('meta[property="og:title"]', 'content', title)
    setAttr('meta[property="og:description"]', 'content', description)
    setAttr('meta[name="twitter:title"]', 'content', title)
    setAttr('meta[name="twitter:description"]', 'content', description)
    if (page) {
      setAttr('link[rel="canonical"]', 'href', canonicalUrl(page.path))
      setAttr('meta[property="og:url"]', 'content', canonicalUrl(page.path))
    }
  }, [pathname])

  return null
}

// Per-route SEO metadata. Single source of truth for the prerender script
// (scripts/prerender.mjs), the generated sitemap, and client-side head
// updates on navigation (components/RouteMeta.tsx).

export const SITE_URL = 'https://boomline.co'

export type PageMeta = {
  path: string
  title: string
  description: string
  /** Source file, used for sitemap <lastmod>. */
  source: string
}

export const pages: PageMeta[] = [
  {
    path: '/',
    title: 'Boomline — Crane Rental Software | Dispatch, Fleet, Inspections',
    description:
      'Boomline is purpose-built crane rental software — dispatch, equipment, inspections, certifications, and field operations for crane companies. Designed by people who run cranes.',
    source: 'src/pages/Home.tsx',
  },
  {
    path: '/features',
    title: 'Everything your crane operation actually needs | Boomline',
    description:
      'Everything from dispatch to the back office. Start small or run the full platform — we flip features on as you grow.',
    source: 'src/pages/Features.tsx',
  },
  {
    path: '/about',
    title: 'Software written by people who actually run cranes | Boomline',
    description:
      'Built with trusted field experts, for crane companies. A platform built around how a crane company actually runs — not bolted onto generic field-service tools that were never made for the industry.',
    source: 'src/pages/About.tsx',
  },
  {
    path: '/terms',
    title: 'Terms & Conditions | Boomline',
    description:
      'Boomline is a business-to-business platform for crane and equipment rental management. These terms explain the rules for using Boomline, what you can expect from us, and what we expect from you.',
    source: 'src/pages/Terms.tsx',
  },
]

export const notFoundMeta = {
  title: 'Page not found | Boomline',
  description: 'This page does not exist.',
}

export function canonicalUrl(path: string) {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
}

export function metaFor(pathname: string) {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  return pages.find((p) => p.path === clean)
}

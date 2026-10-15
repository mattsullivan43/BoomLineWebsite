// Per-route SEO metadata. Single source of truth for the prerender script
// (scripts/prerender.mjs), the generated sitemap, and client-side head
// updates on navigation (components/RouteMeta.tsx).

export const SITE_URL = 'https://boomline.co'

export type PageMeta = {
  path: string
  title: string
  description: string
  /** Page component file: sitemap <lastmod> and the chunk to preload. */
  source: string
  /** Extra JSON-LD for this page (site-wide schema lives in index.html). */
  jsonLd?: object
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
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      url: 'https://boomline.co/about',
      mainEntity: {
        '@type': 'Organization',
        name: 'Boomline',
        url: 'https://boomline.co',
        founder: [
          { '@type': 'Person', name: 'Matt Sullivan', jobTitle: 'Co-founder, Technology' },
          { '@type': 'Person', name: "Jason O'Donnell", jobTitle: 'Co-founder, Crane Operations' },
        ],
      },
    },
  },
  {
    path: '/crane-dispatch-software',
    title: 'Crane Dispatch Software for Crane Companies | Boomline',
    description:
      'Crane dispatch software with one board for the whole day. See crews, cranes, and job sites, then dispatch employees and outside trucking at once.',
    source: 'src/pages/solutions/CraneDispatchSoftware.tsx',
  },
  {
    path: '/crane-field-ticket-software',
    title: 'Crane Field Ticket Software | Digital Job Tickets | Boomline',
    description:
      'Crane field ticket software that replaces paper job tickets. Capture signatures in the field and link every ticket to the job for billing.',
    source: 'src/pages/solutions/CraneFieldTicketSoftware.tsx',
  },
  {
    path: '/crane-certification-tracking',
    title: 'Crane Operator Certification Tracking | Boomline',
    description:
      'Track crane operator certifications, medical cards, and training records in one place, with alerts before anything expires.',
    source: 'src/pages/solutions/CraneCertificationTracking.tsx',
  },
  {
    path: '/crane-inspection-software',
    title: 'Crane Inspection Software | Daily Inspections | Boomline',
    description:
      'Crane inspection software for daily and monthly inspections, filed in the field, converted to PDF, and kept on each crane’s record.',
    source: 'src/pages/solutions/CraneInspectionSoftware.tsx',
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

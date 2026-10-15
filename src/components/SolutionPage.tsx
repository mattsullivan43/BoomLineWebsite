import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import FeatureMarquee from './FeatureMarquee'
import LiveProductShowcase from './LiveProductShowcase'
import { useDemo } from '../contexts/DemoContext'

// Shared layout for keyword landing pages (/crane-dispatch-software, …).
// Each page passes its content; structure and styling live here so every
// page stays consistent with Home/Features.

export type SolutionContent = {
  eyebrow: string
  h1: string
  h1Accent: string
  intro: string[]
  showcase?: boolean
  features: {
    eyebrow: string
    heading: string
    intro?: string
    items: { title: string; body: string; tag?: string }[]
  }
  steps: {
    eyebrow: string
    heading: string
    items: { title: string; body: string }[]
  }
  comparison?: {
    eyebrow: string
    heading: string
    intro: string[]
    columns: [string, string]
    rows: { label: string; before: string; after: string }[]
  }
  related: {
    eyebrow: string
    heading: string
    items: { title: string; body: string; to: string; tag?: string }[]
  }
  faqs: { q: string; a: string }[]
  cta: { heading: string; body: string }
}

const ease = [0.19, 1, 0.22, 1] as const

const accentStyle = { fontFamily: 'var(--font-accent)', letterSpacing: '0.005em' }
const accentClass =
  'uppercase font-normal bg-gradient-to-r from-[var(--color-yellow)] via-amber-300 to-orange-300 bg-clip-text text-transparent pr-1'

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">
      {children}
    </p>
  )
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
  )
}

function Tag({ tag }: { tag: string }) {
  return (
    <span
      className={[
        'font-mono text-[9px] uppercase tracking-widest rounded-full border px-2 py-0.5',
        tag === 'beta'
          ? 'text-[var(--color-yellow)] border-[var(--color-yellow)]/30 bg-[var(--color-yellow)]/[0.06]'
          : 'text-white/35 border-white/10',
      ].join(' ')}
    >
      {tag}
    </span>
  )
}

export default function SolutionPage({ content: c }: { content: SolutionContent }) {
  const { open: openDemo } = useDemo()

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      {/* HERO */}
      <section className="relative pt-36 sm:pt-44 pb-20 sm:pb-24 overflow-hidden">
        <div
          aria-hidden
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[1100px] h-[700px] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,184,0,0.18) 0%, rgba(255,184,0,0.06) 35%, transparent 70%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-yellow)] mb-5">
            {c.eyebrow}
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-[-0.04em] leading-[1.05] text-white text-balance">
            {c.h1}{' '}
            <span style={accentStyle} className={accentClass}>
              {c.h1Accent}
            </span>
          </h1>
          {c.intro.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? 'mt-7 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed'
                  : 'mt-4 text-base text-white/50 max-w-2xl mx-auto leading-relaxed'
              }
            >
              {p}
            </p>
          ))}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={openDemo}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium bg-white text-black rounded-lg hover:bg-[var(--color-yellow)] transition-colors"
            >
              Book a demo
              <Arrow />
            </button>
            <Link
              to="/features"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white/80 hover:text-white border border-white/15 hover:border-white/30 rounded-lg transition-colors"
            >
              See all features
            </Link>
          </div>
        </div>

        {c.showcase && (
          <div className="relative max-w-6xl mx-auto px-6 sm:px-8 mt-16 sm:mt-20">
            <LiveProductShowcase />
          </div>
        )}
      </section>

      <FeatureMarquee />

      {/* FEATURES */}
      <section className="relative border-t border-white/5 py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <Eyebrow>{c.features.eyebrow}</Eyebrow>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.02] text-white text-balance">
              {c.features.heading}
            </h2>
            {c.features.intro && (
              <p className="mt-6 text-white/60 leading-relaxed text-lg">{c.features.intro}</p>
            )}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {c.features.items.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.05, ease }}
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 hover:border-white/20 transition-colors overflow-hidden"
              >
                <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-[var(--color-yellow)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-white tracking-tight">{f.title}</h3>
                  {f.tag && <Tag tag={f.tag} />}
                </div>
                <p className="text-sm text-white/55 leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="relative border-t border-white/5 py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <Eyebrow>{c.steps.eyebrow}</Eyebrow>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.02] text-white text-balance">
              {c.steps.heading}
            </h2>
          </div>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {c.steps.items.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease }}
                className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6"
              >
                <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-yellow)]">
                  Step {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">{s.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* COMPARISON */}
      {c.comparison && (
        <section className="relative border-t border-white/5 py-24 sm:py-32">
          <div className="max-w-6xl mx-auto px-6 sm:px-8">
            <div className="max-w-3xl mb-12">
              <Eyebrow>{c.comparison.eyebrow}</Eyebrow>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.02] text-white text-balance">
                {c.comparison.heading}
              </h2>
              {c.comparison.intro.map((p, i) => (
                <p key={i} className="mt-5 text-white/60 leading-relaxed text-lg">{p}</p>
              ))}
            </div>
            <div className="rounded-2xl border border-white/10 overflow-hidden">
              <div className="hidden sm:grid grid-cols-[1fr_1.3fr_1.3fr] bg-white/[0.03] border-b border-white/10 font-mono text-[11px] uppercase tracking-widest">
                <span className="px-5 py-3 text-white/40" />
                <span className="px-5 py-3 text-white/40">{c.comparison.columns[0]}</span>
                <span className="px-5 py-3 text-[var(--color-yellow)]">{c.comparison.columns[1]}</span>
              </div>
              {c.comparison.rows.map((r) => (
                <div
                  key={r.label}
                  className="grid sm:grid-cols-[1fr_1.3fr_1.3fr] border-b border-white/5 last:border-b-0"
                >
                  <span className="px-5 pt-4 sm:py-4 text-sm font-semibold text-white">{r.label}</span>
                  <span className="px-5 pt-1 sm:py-4 text-sm text-white/45">
                    <span className="sm:hidden font-mono text-[10px] uppercase tracking-widest text-white/30 mr-2">
                      {c.comparison!.columns[0]}:
                    </span>
                    {r.before}
                  </span>
                  <span className="px-5 pt-1 pb-4 sm:py-4 text-sm text-white/80">
                    <span className="sm:hidden font-mono text-[10px] uppercase tracking-widest text-[var(--color-yellow)] mr-2">
                      {c.comparison!.columns[1]}:
                    </span>
                    {r.after}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED */}
      <section className="relative border-t border-white/5 py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mb-12">
            <Eyebrow>{c.related.eyebrow}</Eyebrow>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.02] text-white text-balance">
              {c.related.heading}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {c.related.items.map((r) => (
              <Link
                key={r.title}
                to={r.to}
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 hover:border-white/25 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-white tracking-tight">{r.title}</h3>
                  {r.tag && <Tag tag={r.tag} />}
                </div>
                <p className="text-sm text-white/55 leading-relaxed">{r.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-yellow)] group-hover:text-white transition-colors">
                  Learn more <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative border-t border-white/5 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.02] text-white text-balance mb-10">
            Frequently asked questions
          </h2>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {c.faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-lg font-semibold text-white [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg font-semibold">{f.q}</h3>
                  <span className="mt-1 text-[var(--color-yellow)] transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-white/60 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
        />
      </section>

      {/* CTA */}
      <section className="relative border-t border-white/5 py-24 sm:py-32 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full opacity-50 pointer-events-none blur-3xl"
          style={{ background: 'radial-gradient(ellipse at center, rgba(255,184,0,0.25) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.03em] leading-[1.02] text-white text-balance">
            {c.cta.heading}
          </h2>
          <p className="mt-6 text-white/60 leading-relaxed max-w-xl mx-auto">{c.cta.body}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={openDemo}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium bg-[var(--color-yellow)] text-black rounded-lg hover:bg-white transition-colors"
            >
              Book a demo
              <Arrow />
            </button>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white/80 hover:text-white border border-white/15 hover:border-white/30 rounded-lg transition-colors"
            >
              About Boomline
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

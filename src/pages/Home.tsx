import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import logo from '../assets/boomline-logo.png'
import FeatureMarquee from '../components/FeatureMarquee'
import LiveProductShowcase from '../components/LiveProductShowcase'
import { useDemo } from '../contexts/DemoContext'

type HomeFeature = {
  n: string
  title: string
  body: string
  span: string
  tag?: string
}

const features: HomeFeature[] = [
  {
    n: '01',
    title: 'Dispatch & Scheduling',
    body:
      'One board for the day. See crews, cranes, and job sites at a glance — make scheduled adjustments with ease. Dispatch employees with the click of a button.',
    span: 'md:col-span-3',
  },
  {
    n: '02',
    title: 'Equipment Management',
    body:
      'Track every asset — maintenance, utilization, and inspections.',
    span: 'md:col-span-3',
  },
  {
    n: '03',
    title: 'Daily Inspections',
    body:
      'Daily and monthly on your device — tracked in the field and converted to a PDF document.',
    span: 'md:col-span-2',
    tag: 'beta',
  },
  {
    n: '04',
    title: 'Invoicing & Billing',
    body:
      'Generate invoices from a job. Hourly, daily, or project-based.',
    span: 'md:col-span-2',
    tag: 'beta',
  },
  {
    n: '05',
    title: 'Operator Certifications',
    body:
      'Medical cards, training records, and certifications. Stay updated before anything expires.',
    span: 'md:col-span-2',
  },
]

const roles = [
  {
    label: 'Admin',
    desc: 'Full operational visibility. Run the business.',
    bullets: ['Equipment & financials', 'User management', 'Reports & analytics'],
  },
  {
    label: 'Management/Dispatch',
    desc: 'Run the day. Move crews and equipment.',
    bullets: ['Job dispatch', 'Crew assignments', 'Oversee maintenance'],
  },
  {
    label: 'Employee',
    desc: 'See your jobs. File inspections. Clock in.',
    bullets: ['Daily schedule', 'Pre-op checklists', 'Time & paperwork'],
  },
]

export default function Home() {
  const { open: openDemo } = useDemo()
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-28 pb-8 sm:pt-32 sm:pb-12">
        {/* Background grid + glow */}
        <div className="absolute inset-0 dot-bg mask-fade pointer-events-none" />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] rounded-full opacity-60 pointer-events-none blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,184,0,0.18) 0%, rgba(255,184,0,0.06) 35%, transparent 70%)',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease: [0.19, 1, 0.22, 1] }}
                className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-[-0.04em] leading-[1.05] text-white text-balance"
              >
                The operating system for{' '}
                <span
                  style={{ fontFamily: 'var(--font-accent)', letterSpacing: '0.005em' }}
                  className="uppercase font-normal bg-gradient-to-r from-[var(--color-yellow)] via-amber-300 to-orange-300 bg-clip-text text-transparent pr-1"
                >
                  Crane Rental.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
                className="mt-6 text-base sm:text-lg text-white/60 max-w-xl leading-relaxed"
              >
                Built with trusted field experts, for crane companies.
                Dispatch, equipment, inspections, certifications, and more
                &mdash; turn on what you need today, add the rest as you grow.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <button
                  type="button"
                  onClick={openDemo}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium bg-white text-black rounded-lg hover:bg-[var(--color-yellow)] transition-colors"
                >
                  Book a demo
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white/80 hover:text-white border border-white/15 hover:border-white/30 rounded-lg transition-colors"
                >
                  See the platform
                </a>
              </motion.div>

            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
              className="md:col-span-5 flex justify-center md:justify-end"
            >
              <div className="relative w-full max-w-[260px] sm:max-w-[340px] md:max-w-[440px]">
                <div className="absolute inset-0 bg-[var(--color-yellow)]/20 blur-3xl scale-110" />
                <img
                  src={logo}
                  alt="Boomline"
                  className="relative w-full h-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <FeatureMarquee />

      {/* PROBLEM */}
      <section className="relative border-t border-white/5 py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">
              The problem
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.02] text-white text-balance">
              Generic field-service software wasn&rsquo;t built for{' '}
              <span
                style={{ fontFamily: 'var(--font-accent)', letterSpacing: '0.005em' }}
                className="uppercase font-normal bg-gradient-to-r from-[var(--color-yellow)] via-amber-300 to-orange-300 bg-clip-text text-transparent pr-1"
              >
                This Industry.
              </span>
            </h2>
            <p className="mt-6 text-white/60 leading-relaxed text-lg">
              They don&rsquo;t properly cover the complexity of the scheduling,
              operations, and maintenance behind the scenes of a crane rental
              company.
            </p>
            <p className="mt-4 text-white/80 text-lg">
              Boomline is different — built from the ground up for crane
              companies, by people who run them.
            </p>
          </div>

          <LiveProductShowcase />
        </div>
      </section>

      {/* FEATURES — BENTO */}
      <section id="features" className="relative border-t border-white/5 py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">
                Platform
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.02] text-white text-balance">
                Everything your crane operation needs.
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <p className="text-white/55 max-w-sm text-sm md:text-right leading-relaxed">
                Use what you need today. Add or drop anything as your
                operation changes.
              </p>
              <Link
                to="/features"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-yellow)] hover:text-white transition-colors"
              >
                See all features
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-6 gap-3">
            {features.map((f, i) => (
              <motion.div
                key={f.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.05,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className={[
                  f.span,
                  'group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 sm:p-8',
                  'hover:border-white/20 transition-all duration-300',
                  'overflow-hidden',
                ].join(' ')}
              >
                <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-[var(--color-yellow)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-start justify-between mb-6">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-white/30">
                    {f.n}
                  </span>
                  {f.tag && (
                    <span
                      className={[
                        'font-mono text-[9px] uppercase tracking-widest rounded-full border px-2 py-0.5',
                        f.tag === 'beta'
                          ? 'text-[var(--color-yellow)] border-[var(--color-yellow)]/30 bg-[var(--color-yellow)]/[0.06]'
                          : 'text-white/35 border-white/10',
                      ].join(' ')}
                    >
                      {f.tag}
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES — admin / foreman / employee */}
      <section id="roles" className="relative border-t border-white/5 py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">
              Role-based Access
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.02] text-white text-balance">
              Three roles.{' '}
              <span
                style={{ fontFamily: 'var(--font-accent)', letterSpacing: '0.005em' }}
                className="uppercase font-normal bg-gradient-to-r from-[var(--color-yellow)] via-amber-300 to-orange-300 bg-clip-text text-transparent pr-1"
              >
                One Platform.
              </span>
            </h2>
            <p className="mt-5 text-white/55 leading-relaxed">
              Every person on your crew sees exactly what they need. Nothing
              more, nothing less. Permissions handled, hierarchy respected.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            {roles.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-7 sm:p-8 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-yellow)]">
                    Role · {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[var(--color-yellow)]" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                  {r.label}
                </h3>
                <p className="text-sm text-white/55 mb-5">{r.desc}</p>
                <ul className="space-y-2.5">
                  {r.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2 text-sm text-white/75"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[var(--color-yellow)] shrink-0"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative border-t border-white/5 py-24 sm:py-32 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full opacity-50 pointer-events-none blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,184,0,0.25) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">
            Let&rsquo;s go
          </p>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-[-0.03em] leading-[1.02] text-white text-balance">
            Ready to modernize your operation?
          </h2>
          <p className="mt-6 text-white/60 leading-relaxed max-w-xl mx-auto">
            Book a 15-minute demo. We&rsquo;ll show you Boomline running on a
            real crane company&rsquo;s data.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={openDemo}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium bg-[var(--color-yellow)] text-black rounded-lg hover:bg-white transition-colors"
            >
              Book a demo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
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

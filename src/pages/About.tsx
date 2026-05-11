import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import FeatureMarquee from '../components/FeatureMarquee'
import { useDemo } from '../contexts/DemoContext'
import mattHeadshot from '../assets/matt-headshot.jpg'
import jasonHeadshot from '../assets/IMG_9970.png'

const values = [
  {
    n: '01',
    title: 'Built in the field',
    body: 'Every feature is informed by real crane companies. No assumptions, no theory.',
  },
  {
    n: '02',
    title: 'Operator-first',
    body: 'If it adds friction for the foreman or the operator, we don’t ship it.',
  },
  {
    n: '03',
    title: 'Compliance by default',
    body: 'OSHA, DOT — built into the workflow, not bolted on.',
  },
  {
    n: '04',
    title: 'Modular by design',
    body: 'No big-bang go-lives. Turn on the modules you need today, add — or drop — features as your operation changes. Adopt on your timeline, not ours.',
  },
]

export default function About() {
  const { open: openDemo } = useDemo()
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-40 sm:pb-24">
        <div className="absolute inset-0 dot-bg mask-fade pointer-events-none" />
        <div
          className="absolute left-1/2 -top-40 -translate-x-1/2 w-[1000px] h-[500px] rounded-full opacity-50 pointer-events-none blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,184,0,0.15) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-5"
          >
            About Boomline
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.19, 1, 0.22, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-[-0.04em] leading-[1.12] text-white text-balance"
          >
            Software written by people who actually{' '}
            <span
              style={{ fontFamily: 'var(--font-accent)', letterSpacing: '0.005em' }}
              className="uppercase font-normal bg-gradient-to-r from-[var(--color-yellow)] via-amber-300 to-orange-300 bg-clip-text text-transparent pr-1"
            >
              Run Cranes.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
            className="mt-7 text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            Designed by crane rental business owners, for crane rental
            business owners. A platform built around how a crane company
            actually runs &mdash; not bolted onto generic field-service
            tools that were never made for the industry.
          </motion.p>
        </div>
      </section>

      <FeatureMarquee />

      {/* MISSION */}
      <section className="relative border-t border-white/5 py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-3">
              Mission
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.05] text-white text-balance mb-8">
              Why we&rsquo;re building it.
            </h2>
            <div className="space-y-5 text-white/70 leading-relaxed text-lg">
              <p>
                Crane companies move the country forward &mdash; literally.
                Bridges, hospitals, data centers, wind farms. None of it
                goes up without a crane on site. But the people running
                these businesses are stuck stitching together half a dozen
                tools that were never made for them.
              </p>
              <p>
                We&rsquo;re building the operating system for crane rental:
                one platform for dispatch, fleet, inspections, billing, and
                the whole crew &mdash; from the admin to the foreman to the
                operator on shift.
              </p>
              <p className="text-white/90">
                The goal is simple: make the best crane companies in the
                country run sharper, safer, and more profitably.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="relative border-t border-white/5 py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="mb-12 max-w-xl">
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">
              How we work
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.02] text-white text-balance">
              Principles we don&rsquo;t bend on.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {values.map((v, i) => (
              <motion.div
                key={v.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.19, 1, 0.22, 1] }}
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 sm:p-8 hover:border-white/20 transition-all"
              >
                <span className="font-mono text-[11px] uppercase tracking-widest text-white/30">
                  {v.n}
                </span>
                <h3 className="mt-5 text-xl font-semibold text-white tracking-tight">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="relative border-t border-white/5 py-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mb-14">
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-3">
              Team
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.05] text-white text-balance">
              Two friends.{' '}
              <span
                style={{ fontFamily: 'var(--font-accent)', letterSpacing: '0.005em' }}
                className="uppercase font-normal bg-gradient-to-r from-[var(--color-yellow)] via-amber-300 to-orange-300 bg-clip-text text-transparent pr-1"
              >
                One Crane Company.
              </span>
            </h2>
            <p className="mt-6 text-white/60 leading-relaxed text-lg">
              Matt and Jason met in elementary school and have been friends
              ever since. Decades later &mdash; Matt deep in software,
              Jason running cranes &mdash; they came together when they
              realized the specialized platform the crane industry
              actually needed didn&rsquo;t exist. So they built it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Matt */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
              className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent overflow-hidden hover:border-white/20 transition-colors"
            >
              <div className="aspect-square overflow-hidden bg-white/[0.03] relative">
                <img
                  src={mattHeadshot}
                  alt="Matt Sullivan"
                  className="w-full h-full object-cover object-[50%_30%] grayscale-[0.15] group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-6 sm:p-7">
                <div className="flex items-baseline justify-between flex-wrap gap-2 mb-2">
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    Matt Sullivan
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-yellow)]">
                    Co-founder
                  </span>
                </div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-white/45 mb-3">
                  Technology
                </div>
                <p className="text-sm text-white/55 leading-relaxed">
                  Builds the software side of Boomline. Brings the
                  engineering experience that lets the platform actually
                  ship at the speed the industry needs.
                </p>
              </div>
            </motion.div>

            {/* Jason */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.19, 1, 0.22, 1] }}
              className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent overflow-hidden hover:border-white/20 transition-colors"
            >
              <div className="aspect-square overflow-hidden bg-white/[0.03] relative">
                <img
                  src={jasonHeadshot}
                  alt="Jason"
                  className="w-full h-full object-cover object-top grayscale-[0.15] group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-6 sm:p-7">
                <div className="flex items-baseline justify-between flex-wrap gap-2 mb-2">
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    Jason
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-yellow)]">
                    Co-founder
                  </span>
                </div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-white/45 mb-3">
                  Crane Operations
                </div>
                <p className="text-sm text-white/55 leading-relaxed">
                  Runs cranes for a living. Brings the operational
                  knowledge that keeps Boomline grounded in how a real
                  crane company actually moves money, machines, and crews.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-white/5 py-24 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-50 pointer-events-none blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,184,0,0.18) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] leading-[1.02] text-white text-balance">
            Want to see it running?
          </h2>
          <p className="mt-5 text-white/60 max-w-xl mx-auto">
            Book a 15-minute demo and we&rsquo;ll walk you through Boomline on
            real crane company workflows.
          </p>
          <div className="mt-7 flex items-center justify-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={openDemo}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium bg-[var(--color-yellow)] text-black rounded-lg hover:bg-white transition-colors"
            >
              Book a demo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white/80 hover:text-white border border-white/15 hover:border-white/30 rounded-lg transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

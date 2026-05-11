import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Briefcase,
  Send,
  Lightbulb,
  Calculator,
  Activity,
  MapPin,
  FileSignature,
  Wrench,
  ClipboardList,
  Construction,
  Truck,
  Container,
  RefreshCw,
  Users,
  Clock,
  CalendarOff,
  ListChecks,
  UserCheck,
  ClipboardCheck,
  ShieldCheck,
  Award,
  FileWarning,
  Receipt,
  DollarSign,
  TrendingUp,
  PieChart,
  BarChart3,
  AlertTriangle,
  Bell,
  Mic,
  Sparkles,
  Gauge,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import FeatureMarquee from '../components/FeatureMarquee'
import { useDemo } from '../contexts/DemoContext'

type Feature = { Icon: LucideIcon; title: string; body: string; tag?: string }
type Category = {
  eyebrow: string
  title: string
  description: string
  features: Feature[]
}

const categories: Category[] = [
  {
    eyebrow: 'Operations',
    title: 'Run the day, every day.',
    description:
      'The board, the calendar, the dispatch — everything your foreman touches before coffee.',
    features: [
      {
        Icon: Briefcase,
        title: 'Jobs',
        body: 'Calendar and list views. Multi-day jobs, multi-crane jobs, job-site notes — all linked to a customer record.',
      },
      {
        Icon: Send,
        title: 'Daily Dispatch',
        body: 'One board for the whole day. See who’s available, assigned, or off — then push the dispatch to every employee and outside trucking partner at once.',
      },
      {
        Icon: Lightbulb,
        title: 'Unscheduled Jobs',
        body: 'The pipeline of work that isn’t on the calendar yet. Quote it, schedule it, lose nothing.',
      },
      {
        Icon: Calculator,
        title: 'Quotes',
        body: 'Build quotes from rate cards. Convert to jobs in one click. Send PDF to customer.',
      },
      {
        Icon: Activity,
        title: 'Operations Hub',
        body: 'Live status of every active job — on-site, en-route, pre-op, complete.',
      },
      {
        Icon: MapPin,
        title: 'Job-site Logistics',
        body: 'Address, contact, lift specs, access notes. Everything the operator needs before showing up.',
      },
      {
        Icon: FileSignature,
        title: 'Field Tickets',
        body: 'Customer signatures, job-site photos, and ticket sign-offs — captured on a phone from the field and attached to the work order.',
        tag: 'coming soon',
      },
    ],
  },
  {
    eyebrow: 'Fleet & Maintenance',
    title: 'Cranes that earn their keep.',
    description:
      'Track every asset. Catch problems before downtime. Keep your inspectors happy.',
    features: [
      {
        Icon: Wrench,
        title: 'Maintenance Command Center',
        body: 'Recurring PM by hours, miles, or calendar days. Whichever-comes-first logic. Overdue / Due soon / On track.',
      },
      {
        Icon: ClipboardList,
        title: 'Work Orders',
        body: 'Field, Shop, or Maintenance source. Priority + status workflow. Assigned to a tech, files in history.',
      },
      {
        Icon: Construction,
        title: 'Cranes',
        body: 'Full asset record per machine. Hours, miles, location, certifications, maintenance log, work order history.',
      },
      {
        Icon: Truck,
        title: 'Trucks',
        body: 'Track service trucks and boom trucks alongside cranes — same PM logic, same visibility.',
      },
      {
        Icon: Container,
        title: 'Trailers',
        body: 'Lowboys, flatbeds, jeeps. Inspection schedules, load ratings, current location.',
      },
      {
        Icon: RefreshCw,
        title: 'Re-Rent Tracking',
        body: 'When you sub work out or rent machines in. Cost, duration, customer billing — all reconciled.',
      },
    ],
  },
  {
    eyebrow: 'Workforce',
    title: 'Your people, accounted for.',
    description:
      'Who’s on what. Who’s out. Who’s costing you overtime.',
    features: [
      {
        Icon: Users,
        title: 'Employee Board',
        body: 'Every operator, every laborer, every foreman — at-a-glance availability for today.',
      },
      {
        Icon: Clock,
        title: 'TimeSheets',
        body: 'Weekly grid by employee. ST and OT auto-calc by job. Export to PDF or push to QuickBooks.',
      },
      {
        Icon: CalendarOff,
        title: 'Time Off',
        body: 'Request, approve, balance-track. Visible on the dispatch board so you don’t double-book.',
      },
      {
        Icon: ListChecks,
        title: 'My Assignments',
        body: 'Each employee sees only their schedule. Today’s job, this week’s plan, on their phone.',
      },
      {
        Icon: UserCheck,
        title: 'Crews',
        body: 'Build standing crews — operator + oiler + laborer — and assign as a unit.',
      },
      {
        Icon: Gauge,
        title: 'Utilization & Idle Time',
        body: 'See exactly who isn’t on a job — and when. Spot unassigned hours before they become a lost day, and squeeze every dollar of capacity out of the people you already have.',
      },
    ],
  },
  {
    eyebrow: 'Compliance & Safety',
    title: 'Audit-ready by default.',
    description:
      'OSHA, DOT — built into the workflow, not bolted on after.',
    features: [
      {
        Icon: ClipboardCheck,
        title: 'Pre-Op Inspections',
        body: 'Mobile-first checklists keyed to crane type. Filed automatically with the job record.',
      },
      {
        Icon: ShieldCheck,
        title: 'Annual Inspections',
        body: 'Load tests, safety-lane reviews, full annual workflow. Print-ready report, signature capture.',
      },
      {
        Icon: Award,
        title: 'Operator Certifications',
        body: 'Medical cards, training records, license expiry. Alerts before anything lapses.',
      },
      {
        Icon: FileWarning,
        title: 'Safety & Training',
        body: 'Who’s trained on what crane. What HazMat, what rigging classes. All tracked.',
      },
    ],
  },
  {
    eyebrow: 'Finance',
    title: 'Bill faster. Get paid faster.',
    description:
      'Job data flows straight to invoices. Invoices flow straight to QuickBooks. Rolling out next — every card below is on the roadmap.',
    features: [
      {
        Icon: Receipt,
        title: 'Billing',
        body: 'Hourly, daily, or project-based. Standby, overtime, travel, mileage — all built in.',
        tag: 'coming soon',
      },
      {
        Icon: DollarSign,
        title: 'Invoicing',
        body: 'Generate from job data automatically. Email to customer. Track sent / viewed / paid.',
        tag: 'coming soon',
      },
      {
        Icon: RefreshCw,
        title: 'QuickBooks Integration',
        body: 'Two-way sync. Customers, items, invoices, payments. No double-entry, ever.',
        tag: 'coming soon',
      },
      {
        Icon: TrendingUp,
        title: 'Outstanding AR',
        body: 'Past-due tracking with aging buckets. One-click resend. See concentration by customer.',
        tag: 'coming soon',
      },
    ],
  },
  {
    eyebrow: 'Insights & AI',
    title: 'Owner-grade analytics — plus an AI that listens.',
    description:
      'The numbers behind the numbers — every crane’s ROI, every customer’s weight, every risk on the horizon. And if you want, an AI you can talk to.',
    features: [
      {
        Icon: Mic,
        title: 'Voice AI',
        body: 'Talk to Boomline on phone or desktop. Update jobs, dispatch crews, or log a note out loud — the AI writes it into the right record. Optional: turn it off if you don’t want it.',
        tag: 'optional',
      },
      {
        Icon: Sparkles,
        title: 'AI Business Analyst',
        body: 'Ask "which crane underperformed this quarter?" or "who’s our concentration risk?" — the AI reads your data and answers in plain English.',
        tag: 'optional',
      },
      {
        Icon: BarChart3,
        title: 'Equipment ROI',
        body: 'Jobs-per-crane, this quarter vs last. Which machines earn their keep, which collect dust.',
      },
      {
        Icon: PieChart,
        title: 'Customer Concentration',
        body: 'Top customers by revenue, by jobs, by risk. Know who you can’t afford to lose.',
      },
      {
        Icon: AlertTriangle,
        title: 'Maintenance Risk',
        body: 'Overdue PM exposure. Certification gaps. Where downtime is about to bite.',
      },
      {
        Icon: Bell,
        title: 'Notifications',
        body: 'Inspections expiring, certs lapsing, jobs unassigned. The right alert, to the right person, at the right time.',
      },
    ],
  },
]

const ease = [0.19, 1, 0.22, 1] as const

export default function Features() {
  const { open: openDemo } = useDemo()
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-28 pb-10 sm:pt-40 sm:pb-16">
        <div className="absolute inset-0 dot-bg mask-fade pointer-events-none" />
        <div
          className="absolute left-1/2 -top-32 -translate-x-1/2 w-[1100px] h-[600px] rounded-full opacity-50 pointer-events-none blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,184,0,0.18) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-5"
          >
            Platform · Capabilities
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-[-0.04em] leading-[1.05] text-white text-balance"
          >
            Everything your crane operation{' '}
            <span
              style={{ fontFamily: 'var(--font-accent)', letterSpacing: '0.005em' }}
              className="uppercase font-normal bg-gradient-to-r from-[var(--color-yellow)] via-amber-300 to-orange-300 bg-clip-text text-transparent pr-1"
            >
              Actually Needs.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="mt-7 text-lg text-white/60 max-w-2xl mx-auto leading-relaxed"
          >
            Six pillars. Dozens of modules. Modular by design &mdash; turn on
            the ones you need today, add the rest as your operation grows.
            Items marked{' '}
            <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-yellow)] border border-[var(--color-yellow)]/30 bg-[var(--color-yellow)]/[0.06] rounded-full px-2 py-0.5 align-middle">
              coming soon
            </span>{' '}
            are on the near-term roadmap.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
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
          </motion.div>
        </div>
      </section>

      <FeatureMarquee />

      {/* CATEGORIES */}
      {categories.map((cat, i) => (
        <CategorySection key={cat.title} cat={cat} index={i} />
      ))}

      {/* CTA */}
      <section className="relative border-t border-white/5 py-24 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] rounded-full opacity-50 pointer-events-none blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,184,0,0.18) 0%, transparent 70%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.05] text-white text-balance">
            Want to see it{' '}
            <span
              style={{ fontFamily: 'var(--font-accent)', letterSpacing: '0.005em' }}
              className="uppercase font-normal bg-gradient-to-r from-[var(--color-yellow)] via-amber-300 to-orange-300 bg-clip-text text-transparent pr-1"
            >
              Running?
            </span>
          </h2>
          <p className="mt-6 text-white/60 max-w-xl mx-auto">
            Book a 15-minute demo and we&rsquo;ll walk through Boomline on
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

function CategorySection({ cat, index }: { cat: Category; index: number }) {
  // Pick a grid that doesn't leave orphan rows.
  // 4 cards → 2 cols (clean 2x2); otherwise default 3 cols.
  const gridCls =
    cat.features.length === 4
      ? 'grid sm:grid-cols-2 gap-3'
      : 'grid sm:grid-cols-2 lg:grid-cols-3 gap-3'

  return (
    <section
      className={[
        'relative border-t border-white/5 py-20 sm:py-24',
        index % 2 === 1 ? 'bg-[var(--color-bg-2)]/40' : '',
      ].join(' ')}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid md:grid-cols-12 gap-10 mb-10">
          <div className="md:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-yellow)] mb-3 flex items-center gap-2">
              <span className="font-mono text-white/30">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="w-6 h-px bg-white/10" />
              {cat.eyebrow}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] leading-[1.05] text-white text-balance">
              {cat.title}
            </h2>
          </div>
          <p className="md:col-span-6 md:col-start-7 text-white/60 text-base leading-relaxed self-end">
            {cat.description}
          </p>
        </div>

        <div className={gridCls}>
          {cat.features.map((f, i) => {
            const Icon = f.Icon
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.04, ease }}
                className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 hover:border-white/20 transition-colors overflow-hidden"
              >
                <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-[var(--color-yellow)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start justify-between mb-5">
                  <span className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-[var(--color-yellow)] group-hover:border-[var(--color-yellow)]/40 transition-colors">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  {f.tag && (
                    <span
                      className={[
                        'font-mono text-[9px] uppercase tracking-widest rounded-full px-2 py-0.5 border',
                        f.tag === 'coming soon'
                          ? 'text-[var(--color-yellow)] border-[var(--color-yellow)]/30 bg-[var(--color-yellow)]/[0.06]'
                          : 'text-white/35 border-white/10',
                      ].join(' ')}
                    >
                      {f.tag}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white tracking-tight mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed">{f.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import {
  Briefcase,
  Send,
  Lightbulb,
  Activity,
  Wrench,
  ClipboardList,
  Calculator,
  Receipt,
  Clock,
  CalendarOff,
  Bell,
  ShieldCheck,
  Users,
  Truck,
  Container,
  Construction,
  FileCheck2,
  FileSignature,
  Award,
  BarChart3,
  RefreshCw,
  Mic,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Feature = { label: string; Icon: LucideIcon; tag?: string }

const features: Feature[] = [
  { label: 'Jobs', Icon: Briefcase },
  { label: 'Daily Dispatch', Icon: Send },
  { label: 'Unscheduled Jobs', Icon: Lightbulb },
  { label: 'Operations', Icon: Activity },
  { label: 'Quotes', Icon: Calculator },
  { label: 'Billing', Icon: Receipt, tag: 'beta' },
  { label: 'QuickBooks Sync', Icon: RefreshCw, tag: 'beta' },
  { label: 'Field Tickets', Icon: FileSignature, tag: 'beta' },
  { label: 'Voice AI', Icon: Mic, tag: 'optional' },
  { label: 'TimeSheets', Icon: Clock },
  { label: 'Time Off', Icon: CalendarOff },
  { label: 'Maintenance', Icon: Wrench },
  { label: 'Work Orders', Icon: ClipboardList },
  { label: 'Cranes', Icon: Construction },
  { label: 'Trucks', Icon: Truck },
  { label: 'Trailers', Icon: Container },
  { label: 'Employees', Icon: Users },
  { label: 'Inspections', Icon: FileCheck2 },
  { label: 'Certifications', Icon: Award },
  { label: 'Notifications', Icon: Bell },
  { label: 'Safety & Training', Icon: ShieldCheck },
  { label: 'Reports', Icon: BarChart3 },
]

export default function FeatureMarquee({
  variant = 'default',
}: {
  variant?: 'default' | 'compact'
}) {
  // Duplicate the array twice for a seamless infinite loop
  const items = [...features, ...features]

  return (
    <section
      aria-label="Boomline platform capabilities"
      className={[
        'relative border-y border-white/5 bg-[var(--color-bg-2)]/60',
        'overflow-hidden group',
        variant === 'compact' ? 'py-6' : 'py-8',
      ].join(' ')}
    >
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--color-bg)] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--color-bg)] to-transparent z-10" />

      <div className="marquee-track flex items-center w-max">
        {items.map((f, i) => {
          const { Icon } = f
          return (
            <div
              key={`${f.label}-${i}`}
              className="shrink-0 inline-flex items-center gap-2.5 sm:gap-3 px-5 sm:px-8"
            >
              <Icon
                size={18}
                strokeWidth={1.75}
                className="text-[var(--color-yellow)] shrink-0"
              />
              <span className="text-sm sm:text-[15px] font-medium text-white/80 whitespace-nowrap tracking-tight">
                {f.label}
              </span>
              {f.tag && (
                <span
                  className={[
                    'ml-1 font-mono text-[9px] uppercase tracking-widest rounded-full border px-2 py-0.5',
                    f.tag === 'beta'
                      ? 'text-[var(--color-yellow)] border-[var(--color-yellow)]/30 bg-[var(--color-yellow)]/[0.06]'
                      : 'text-white/35 border-white/10',
                  ].join(' ')}
                >
                  {f.tag}
                </span>
              )}
              <span aria-hidden className="ml-5 sm:ml-8 w-1 h-1 rounded-full bg-white/15" />
            </div>
          )
        })}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 60s linear infinite;
        }
        .group:hover .marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </section>
  )
}

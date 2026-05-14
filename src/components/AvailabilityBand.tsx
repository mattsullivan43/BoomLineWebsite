import { Apple, Globe } from 'lucide-react'

export default function AvailabilityBand() {
  return (
    <section
      aria-label="Available on iOS, Android, and the web"
      className="relative border-t border-white/5 bg-[var(--color-bg-2)]/40"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-yellow)]">
              Available everywhere
            </span>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              On iOS, Android, and the web.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* App Store */}
            <a
              href="https://apps.apple.com/us/app/boomline/id6764630978"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Download Boomline on the App Store"
              className="group inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/12 bg-white/[0.03] hover:bg-white/[0.06] hover:border-[var(--color-yellow)]/40 transition-colors"
            >
              <Apple
                size={26}
                strokeWidth={1.6}
                className="text-white shrink-0"
                fill="currentColor"
              />
              <span className="flex flex-col leading-tight text-left">
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">
                  Download on the
                </span>
                <span className="text-[15px] font-semibold text-white tracking-tight">
                  App Store
                </span>
              </span>
            </a>

            {/* Google Play — beta */}
            <div
              role="button"
              aria-disabled="true"
              aria-label="Google Play — beta"
              className="relative inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.02] opacity-75 cursor-not-allowed"
            >
              <PlayIcon className="shrink-0 grayscale opacity-70" />
              <span className="flex flex-col leading-tight text-left">
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">
                  Beta on
                </span>
                <span className="text-[15px] font-semibold text-white/70 tracking-tight">
                  Google Play
                </span>
              </span>
              <span className="absolute -top-2 -right-2 font-mono text-[9px] uppercase tracking-widest text-[var(--color-yellow)] bg-[var(--color-bg)] border border-[var(--color-yellow)]/40 rounded-full px-2 py-0.5">
                Beta
              </span>
            </div>

            {/* Web */}
            <a
              href="https://boomline.app"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Open Boomline web app"
              className="group inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/12 bg-white/[0.03] hover:bg-white/[0.06] hover:border-[var(--color-yellow)]/40 transition-colors"
            >
              <Globe
                size={24}
                strokeWidth={1.6}
                className="text-[var(--color-yellow)] shrink-0"
              />
              <span className="flex flex-col leading-tight text-left">
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">
                  Use on the web
                </span>
                <span className="text-[15px] font-semibold text-white tracking-tight">
                  boomline.app
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* Triangular Google-Play-style icon, using brand-suggesting colors */
function PlayIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="24"
      height="26"
      viewBox="0 0 24 26"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="g-pl-1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#0080ff" />
        </linearGradient>
        <linearGradient id="g-pl-2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd200" />
          <stop offset="100%" stopColor="#ff9500" />
        </linearGradient>
        <linearGradient id="g-pl-3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff3a3a" />
          <stop offset="100%" stopColor="#d9006c" />
        </linearGradient>
        <linearGradient id="g-pl-4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <path d="M3 1 L17.5 13 L3 25 Z" fill="url(#g-pl-1)" />
      <path d="M3 1 L21 11 L17.5 13 Z" fill="url(#g-pl-2)" />
      <path d="M3 25 L17.5 13 L21 15 Z" fill="url(#g-pl-3)" />
      <path d="M17.5 13 L21 11 L21 15 Z" fill="url(#g-pl-4)" />
    </svg>
  )
}

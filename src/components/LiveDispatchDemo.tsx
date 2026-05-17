import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Briefcase, Check, Send, Truck, UserPlus, UserX } from 'lucide-react'

type Phase = 'idle' | 'sending' | 'notified' | 'accepted'

type Kind = 'employee' | 'trucking' | 'temp' | 'available' | 'off'

type RosterEntry = {
  id: string
  name: string
  role: string
  kind: Kind
  job?: { name: string; crane: string }
  offReason?: string
}

const ROSTER: RosterEntry[] = [
  { id: 'a', name: 'Mike Carter',     role: 'Operator',  kind: 'employee', job: { name: 'Hudson Yards Tower B', crane: 'GMK5275' } },
  { id: 'b', name: 'Tony Caruso',     role: 'Operator',  kind: 'employee', job: { name: 'JFK Terminal 4',       crane: 'LTM 1300' } },
  { id: 'c', name: 'Derek Williams',  role: 'Oiler',     kind: 'employee', job: { name: 'Hudson Yards Tower B', crane: 'GMK5275' } },
  { id: 'd', name: 'Carlos Vasquez',  role: 'Operator',  kind: 'employee', job: { name: 'Tappan Zee Span 4',    crane: 'GMK6300L' } },
  { id: 'e', name: 'Frank DiMarco',   role: 'Operator',  kind: 'employee', job: { name: 'Con Ed Substation',    crane: 'GMK4100L' } },
  { id: 'f', name: 'JBM Heavy Haul',  role: 'Outside trucking', kind: 'trucking', job: { name: 'Con Ed Substation', crane: 'Haul: GMK4100L' } },
  { id: 'g', name: 'Jimmy Reyes',     role: 'Oiler',     kind: 'employee', job: { name: 'JFK Terminal 4',       crane: 'LTM 1300' } },
  { id: 'h', name: 'Adam K.',         role: 'Day labor', kind: 'temp',     job: { name: 'Hudson Yards Tower B', crane: 'Ground crew' } },
  { id: 'i', name: 'Steve Petrowski', role: 'Operator',  kind: 'employee', job: { name: 'Penn Station Pl. 7',   crane: 'GMK3060L' } },
  { id: 'j', name: 'Rich Bauer',      role: 'Operator',  kind: 'available' },
  { id: 'k', name: 'Pete Hernandez',  role: 'Operator',  kind: 'off', offReason: 'Vacation' },
  { id: 'l', name: 'Ryan Walsh',      role: 'Oiler',     kind: 'employee', job: { name: 'Tappan Zee Span 4',    crane: 'GMK6300L' } },
]

const ASSIGNED_KINDS: Kind[] = ['employee', 'trucking', 'temp']

const TIMELINE = {
  idle: 0,
  press: 900,       // button press
  firstNotify: 1300, // first card notified
  perCardStagger: 70,
  firstAccept: 3400, // first card accepted
  acceptStagger: 110,
  hold: 6800,        // hold final state until reset
  total: 7800,
}

function isAssigned(kind: Kind) {
  return ASSIGNED_KINDS.includes(kind)
}

function cardThresholds(index: number, kind: Kind) {
  if (!isAssigned(kind)) return null
  const notifyAt = TIMELINE.firstNotify + index * TIMELINE.perCardStagger
  // Mild jitter so accepts don't feel mechanical
  const jitter = ((index * 53) % 7) * 60
  const acceptAt = TIMELINE.firstAccept + index * TIMELINE.acceptStagger + jitter
  return { notifyAt, acceptAt }
}

function phaseFor(tick: number, thresholds: { notifyAt: number; acceptAt: number } | null): Phase {
  if (!thresholds) return 'idle'
  if (tick < TIMELINE.press) return 'idle'
  if (tick < thresholds.notifyAt) return 'sending'
  if (tick < thresholds.acceptAt) return 'notified'
  return 'accepted'
}

export default function LiveDispatchDemo() {
  const [tick, setTick] = useState(0)
  const [active, setActive] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  // Pause animation when off-screen.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Animation loop (coarse 80ms tick — enough for cascading badges, light on CPU).
  useEffect(() => {
    if (!active || reduced) {
      // Reduced-motion: jump to the end-state so visitors still see the payoff.
      setTick(reduced ? TIMELINE.hold : 0)
      return
    }
    const start = performance.now()
    let timer: number | undefined
    const loop = () => {
      const elapsed = (performance.now() - start) % TIMELINE.total
      setTick(elapsed)
      timer = window.setTimeout(loop, 80)
    }
    loop()
    return () => {
      if (timer) window.clearTimeout(timer)
    }
  }, [active, reduced])

  const pressed = tick >= TIMELINE.press && tick < TIMELINE.hold

  const notifiedCount = ROSTER.reduce((sum, entry, i) => {
    const t = cardThresholds(i, entry.kind)
    if (!t) return sum
    return tick >= t.notifyAt ? sum + 1 : sum
  }, 0)

  const acceptedCount = ROSTER.reduce((sum, entry, i) => {
    const t = cardThresholds(i, entry.kind)
    if (!t) return sum
    return tick >= t.acceptAt ? sum + 1 : sum
  }, 0)

  const assignedTotal = ROSTER.filter((r) => isAssigned(r.kind)).length

  return (
    <div ref={containerRef} className="relative">
      {/* Soft glow behind the panel */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 blur-3xl opacity-60 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(255,184,0,0.18) 0%, transparent 65%)',
        }}
      />

      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5 sm:p-6 backdrop-blur-sm shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-white/55">
              Daily Dispatch
            </span>
          </div>
          <span className="font-mono text-[10px] text-white/35">
            Tue · Mar 05
          </span>
        </div>

        {/* Stat bar */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          <Stat label="Crew today" value={ROSTER.length} tone="white" />
          <Stat label="Assigned" value={assignedTotal} tone="white" />
          <Stat
            label="Notified"
            value={notifiedCount}
            tone={notifiedCount === assignedTotal && pressed ? 'yellow' : 'white'}
            secondaryLabel={
              acceptedCount > 0
                ? `${acceptedCount} accepted`
                : undefined
            }
          />
        </div>

        {/* Roster grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ROSTER.map((entry, i) => (
            <Card key={entry.id} entry={entry} index={i} tick={tick} />
          ))}
        </div>

        {/* Send button */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          className={[
            'mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg transition-all cursor-default',
            pressed
              ? 'bg-emerald-400 text-black shadow-[0_0_0_3px_rgba(52,211,153,0.18)]'
              : 'bg-[var(--color-yellow)] text-black hover:bg-[var(--color-yellow)] shadow-[0_0_0_0_rgba(255,184,0,0)] animate-[dispatchPulse_2.4s_ease-in-out_infinite]',
          ].join(' ')}
        >
          {pressed ? (
            <>
              <Check size={16} strokeWidth={2.5} />
              <span>Dispatch sent · {notifiedCount}/{assignedTotal} notified</span>
            </>
          ) : (
            <>
              <Send size={16} strokeWidth={2.25} />
              <span>Send Today&rsquo;s Dispatch</span>
            </>
          )}
        </button>
      </div>

      <style>{`
        @keyframes dispatchPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,184,0,0.35); }
          50%      { box-shadow: 0 0 0 6px rgba(255,184,0,0); }
        }
      `}</style>
    </div>
  )
}

function Stat({
  label,
  value,
  tone,
  secondaryLabel,
}: {
  label: string
  value: number
  tone: 'white' | 'yellow'
  secondaryLabel?: string
}) {
  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/5 px-3 py-2.5">
      <div
        className={[
          'text-xl sm:text-2xl font-semibold tabular-nums leading-none',
          tone === 'yellow' ? 'text-[var(--color-yellow)]' : 'text-white',
        ].join(' ')}
      >
        {value}
      </div>
      <div className="mt-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-white/40 leading-tight">
        {label}
      </div>
      {secondaryLabel && (
        <div className="mt-0.5 font-mono text-[9px] text-emerald-300/80 leading-tight">
          {secondaryLabel}
        </div>
      )}
    </div>
  )
}

function Card({
  entry,
  index,
  tick,
}: {
  entry: RosterEntry
  index: number
  tick: number
}) {
  const thresholds = cardThresholds(index, entry.kind)
  const phase = phaseFor(tick, thresholds)

  const isOff = entry.kind === 'off'
  const isAvail = entry.kind === 'available'
  const isTrucking = entry.kind === 'trucking'
  const isTemp = entry.kind === 'temp'

  const border =
    phase === 'accepted'
      ? 'border-emerald-400/40 bg-emerald-500/[0.06]'
      : phase === 'notified'
      ? 'border-[var(--color-yellow)]/45 bg-[var(--color-yellow)]/[0.06]'
      : isTrucking
      ? 'border-sky-400/30 bg-sky-500/[0.05]'
      : isTemp
      ? 'border-amber-400/30 bg-amber-500/[0.05]'
      : isAvail
      ? 'border-emerald-400/20 bg-emerald-500/[0.03]'
      : isOff
      ? 'border-white/8 bg-white/[0.015]'
      : 'border-white/10 bg-white/[0.025]'

  return (
    <motion.div
      animate={
        phase === 'sending' && thresholds
          ? { scale: [1, 1.02, 1] }
          : { scale: 1 }
      }
      transition={{ duration: 0.4 }}
      className={[
        'relative rounded-lg border p-2.5 transition-colors duration-300 overflow-hidden',
        border,
      ].join(' ')}
    >
      {/* Notification ping ring */}
      <AnimatePresence>
        {phase === 'notified' && (
          <motion.span
            key="ping"
            initial={{ opacity: 0.6, scale: 0.8 }}
            animate={{ opacity: 0, scale: 1.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="pointer-events-none absolute inset-0 rounded-lg border border-[var(--color-yellow)]/60"
          />
        )}
      </AnimatePresence>

      <div className="relative flex items-start justify-between gap-1.5">
        <div className="min-w-0 flex-1">
          <div
            className={[
              'text-[12px] font-semibold leading-tight truncate flex items-center gap-1',
              isOff ? 'text-white/40' : 'text-white/90',
            ].join(' ')}
          >
            {isTrucking && (
              <Truck size={11} className="shrink-0 text-sky-300/80" />
            )}
            <span className="truncate">{entry.name}</span>
          </div>
          <div className="text-[10px] text-white/40 truncate mt-0.5">
            {entry.role}
          </div>

          {entry.job && (
            <div className="mt-1.5 flex items-center gap-1 rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5">
              <Briefcase size={9} className="shrink-0 text-[var(--color-yellow)]/80" />
              <span className="text-[10px] text-white/70 truncate">
                {entry.job.name}
              </span>
            </div>
          )}

          {isAvail && (
            <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-emerald-300/85">
              <UserPlus size={10} />
              <span>Available</span>
            </div>
          )}

          {isOff && (
            <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-white/35">
              <UserX size={10} />
              <span>{entry.offReason || 'Off'}</span>
            </div>
          )}
        </div>

        {/* Status badge */}
        <div className="shrink-0">
          <AnimatePresence mode="wait" initial={false}>
            {phase === 'notified' && (
              <motion.span
                key="sent"
                initial={{ opacity: 0, y: -3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-[8px] uppercase tracking-widest rounded-full px-1.5 py-0.5 border border-[var(--color-yellow)]/40 bg-[var(--color-yellow)]/10 text-[var(--color-yellow)] whitespace-nowrap"
              >
                Sent
              </motion.span>
            )}
            {phase === 'accepted' && (
              <motion.span
                key="ack"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="inline-flex items-center gap-0.5 font-mono text-[8px] uppercase tracking-widest rounded-full px-1.5 py-0.5 border border-emerald-400/40 bg-emerald-500/10 text-emerald-300 whitespace-nowrap"
              >
                <Check size={9} strokeWidth={3} />
                Ack
              </motion.span>
            )}
            {isTrucking && phase === 'idle' && (
              <motion.span
                key="ot"
                initial={false}
                className="font-mono text-[8px] uppercase tracking-widest rounded-full px-1.5 py-0.5 border border-sky-400/30 text-sky-300/80 whitespace-nowrap"
              >
                3rd-party
              </motion.span>
            )}
            {isTemp && phase === 'idle' && (
              <motion.span
                key="tp"
                initial={false}
                className="font-mono text-[8px] uppercase tracking-widest rounded-full px-1.5 py-0.5 border border-amber-400/30 text-amber-300/80 whitespace-nowrap"
              >
                Temp
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

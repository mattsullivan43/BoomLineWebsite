import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Activity,
  Bell,
  Briefcase,
  Calendar as CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  ClipboardList,
  Cpu,
  LayoutDashboard,
  Send,
  Sparkles,
  Truck,
  UserPlus,
  UserX,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/* Outer showcase: tabs + auto-cycle                                   */
/* ------------------------------------------------------------------ */

type PaneKey = 'dispatch' | 'calendar' | 'overview' | 'ai'

type PaneDef = {
  key: PaneKey
  label: string
  Icon: typeof Send
  durationMs: number
}

const PANES: PaneDef[] = [
  { key: 'dispatch', label: 'Daily Dispatch',   Icon: Send,            durationMs: 8200 },
  { key: 'calendar', label: 'Jobs Calendar',    Icon: CalendarIcon,    durationMs: 6800 },
  { key: 'overview', label: 'Command Center',   Icon: LayoutDashboard, durationMs: 7200 },
  { key: 'ai',       label: 'Boomline AI',      Icon: Sparkles,        durationMs: 9000 },
]

export default function LiveProductShowcase() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion() ?? false

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (paused || !visible || reduced) return
    const ms = PANES[activeIdx].durationMs
    const t = window.setTimeout(() => {
      setActiveIdx((i) => (i + 1) % PANES.length)
    }, ms)
    return () => window.clearTimeout(t)
  }, [activeIdx, paused, visible, reduced])

  const active = PANES[activeIdx]

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 blur-3xl opacity-70 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 25%, rgba(255,184,0,0.22) 0%, rgba(255,184,0,0.06) 40%, transparent 70%)',
        }}
      />

      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-sm shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* Top chrome — window-style header */}
        <div className="flex items-center justify-between gap-3 px-3 sm:px-4 py-2.5 border-b border-white/5 bg-white/[0.015]">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            </div>
            <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-white/40 truncate">
              boomline.app / {active.label.toLowerCase()}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50 animate-ping" />
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/45">
              Live demo
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-2 sm:px-3 pt-2 pb-0 border-b border-white/5 overflow-x-auto no-scrollbar">
          {PANES.map((p, i) => {
            const isActive = i === activeIdx
            const Icon = p.Icon
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => setActiveIdx(i)}
                className={[
                  'group relative inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 text-xs font-medium rounded-t-lg transition-colors whitespace-nowrap',
                  isActive
                    ? 'text-white bg-white/[0.04]'
                    : 'text-white/45 hover:text-white/75',
                ].join(' ')}
              >
                <Icon size={13} strokeWidth={2} className={isActive ? 'text-[var(--color-yellow)]' : ''} />
                <span>{p.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="tabUnderline"
                    className="absolute left-2 right-2 bottom-0 h-px bg-[var(--color-yellow)]"
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Pane body */}
        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
              className="p-4 sm:p-5"
            >
              {active.key === 'dispatch' && <DispatchPane reduced={reduced} active={!paused && visible} />}
              {active.key === 'calendar' && <CalendarPane reduced={reduced} active={!paused && visible} />}
              {active.key === 'overview' && <OverviewPane reduced={reduced} active={!paused && visible} />}
              {active.key === 'ai'       && <AiPane       reduced={reduced} active={!paused && visible} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress strip — shows cycle position */}
        <div className="grid grid-cols-4 gap-1 px-3 pb-3">
          {PANES.map((_, i) => (
            <ProgressBar
              key={i}
              active={i === activeIdx}
              durationMs={PANES[i].durationMs}
              paused={paused || !visible || reduced}
            />
          ))}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }
      `}</style>
    </div>
  )
}

function ProgressBar({
  active,
  durationMs,
  paused,
}: {
  active: boolean
  durationMs: number
  paused: boolean
}) {
  return (
    <div className="h-0.5 rounded-full bg-white/5 overflow-hidden">
      {active && !paused && (
        <motion.div
          key={`${durationMs}`}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: durationMs / 1000, ease: 'linear' }}
          className="h-full bg-[var(--color-yellow)]/70"
        />
      )}
      {active && paused && <div className="h-full w-full bg-[var(--color-yellow)]/30" />}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Animation tick hook                                                 */
/* ------------------------------------------------------------------ */

function useTick(durationMs: number, active: boolean) {
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = performance.now()
    let timer: number | undefined
    const loop = () => {
      const elapsed = Math.min(performance.now() - start, durationMs)
      setTick(elapsed)
      if (elapsed < durationMs) timer = window.setTimeout(loop, 80)
    }
    loop()
    return () => {
      if (timer) window.clearTimeout(timer)
    }
  }, [active, durationMs])
  return tick
}

/* ================================================================== */
/* PANE 1 — DISPATCH                                                   */
/* ================================================================== */

type Kind = 'employee' | 'trucking' | 'temp' | 'available' | 'off'

type RosterEntry = {
  id: string
  name: string
  role: string
  kind: Kind
  job?: { name: string }
  offReason?: string
}

const ROSTER: RosterEntry[] = [
  { id: 'a', name: 'Mike Carter',     role: 'Operator',         kind: 'employee', job: { name: 'Hudson Yards Tower B' } },
  { id: 'b', name: 'Tony Caruso',     role: 'Operator',         kind: 'employee', job: { name: 'Terminal 4 Rebuild'  } },
  { id: 'c', name: 'Derek Williams',  role: 'Oiler',            kind: 'employee', job: { name: 'Hudson Yards Tower B' } },
  { id: 'd', name: 'Carlos Vasquez',  role: 'Operator',         kind: 'employee', job: { name: 'River Span 4'         } },
  { id: 'e', name: 'Frank DiMarco',   role: 'Operator',         kind: 'employee', job: { name: 'Con Ed Substation'    } },
  { id: 'f', name: 'JBM Heavy Haul',  role: 'Outside trucking', kind: 'trucking', job: { name: 'Con Ed Substation'    } },
  { id: 'g', name: 'Jimmy Reyes',     role: 'Oiler',            kind: 'employee', job: { name: 'Terminal 4 Rebuild'   } },
  { id: 'h', name: 'Adam K.',         role: 'Day labor',        kind: 'temp',     job: { name: 'Hudson Yards Tower B' } },
  { id: 'i', name: 'Steve Petrowski', role: 'Operator',         kind: 'employee', job: { name: 'Platform 7 Pour'      } },
  { id: 'j', name: 'Rich Bauer',      role: 'Operator',         kind: 'available' },
  { id: 'k', name: 'Pete Hernandez',  role: 'Operator',         kind: 'off',      offReason: 'Vacation' },
  { id: 'l', name: 'Ryan Walsh',      role: 'Oiler',            kind: 'employee', job: { name: 'River Span 4'         } },
]

const DISPATCH_DURATION = 8200
const D_PRESS = 1100
const D_FIRST_NOTIFY = 1500
const D_NOTIFY_STAGGER = 80
const D_FIRST_ACCEPT = 3700
const D_ACCEPT_STAGGER = 130

function dispatchPhaseFor(tick: number, idx: number, kind: Kind):
  | 'idle' | 'sending' | 'notified' | 'accepted' {
  const assigned = kind === 'employee' || kind === 'trucking' || kind === 'temp'
  if (!assigned) return 'idle'
  const notifyAt = D_FIRST_NOTIFY + idx * D_NOTIFY_STAGGER
  const jitter = ((idx * 53) % 7) * 60
  const acceptAt = D_FIRST_ACCEPT + idx * D_ACCEPT_STAGGER + jitter
  if (tick < D_PRESS) return 'idle'
  if (tick < notifyAt) return 'sending'
  if (tick < acceptAt) return 'notified'
  return 'accepted'
}

function DispatchPane({ reduced, active }: { reduced: boolean; active: boolean }) {
  const tick = useTick(DISPATCH_DURATION, active && !reduced)
  const realTick = reduced ? DISPATCH_DURATION : tick

  const pressed = realTick >= D_PRESS
  const notifiedCount = ROSTER.reduce((sum, e, i) => {
    const p = dispatchPhaseFor(realTick, i, e.kind)
    return p === 'notified' || p === 'accepted' ? sum + 1 : sum
  }, 0)
  const acceptedCount = ROSTER.reduce((sum, e, i) => {
    return dispatchPhaseFor(realTick, i, e.kind) === 'accepted' ? sum + 1 : sum
  }, 0)
  const assignedTotal = ROSTER.filter(
    (r) => r.kind === 'employee' || r.kind === 'trucking' || r.kind === 'temp',
  ).length

  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <div className="text-base font-semibold text-white tracking-tight">
            Daily Dispatch
          </div>
          <div className="text-[11px] text-white/45">
            Employee status board · Tue · May 26
          </div>
        </div>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          className={[
            'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-default',
            pressed
              ? 'bg-emerald-400 text-black shadow-[0_0_0_3px_rgba(52,211,153,0.18)]'
              : 'bg-[var(--color-yellow)] text-black animate-[showcasePulse_2.2s_ease-in-out_infinite]',
          ].join(' ')}
        >
          {pressed ? <Check size={13} strokeWidth={2.5} /> : <Send size={13} strokeWidth={2.25} />}
          <span>{pressed ? `Sent · ${notifiedCount}/${assignedTotal}` : 'Send Notifications'}</span>
        </button>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        <Stat label="Available" value={ROSTER.filter((r) => r.kind === 'available').length} tone="emerald" />
        <Stat label="Assigned"  value={assignedTotal} tone="white" />
        <Stat label="Off"       value={ROSTER.filter((r) => r.kind === 'off').length} tone="white" />
        <Stat label="Notified"  value={notifiedCount} tone={notifiedCount === assignedTotal && pressed ? 'yellow' : 'white'} sub={acceptedCount > 0 ? `${acceptedCount} accepted` : undefined} />
      </div>

      {/* Roster grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {ROSTER.map((entry, i) => (
          <DispatchCard key={entry.id} entry={entry} index={i} tick={realTick} />
        ))}
      </div>

      <style>{`
        @keyframes showcasePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,184,0,0.4); }
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
  sub,
}: {
  label: string
  value: number | string
  tone: 'white' | 'yellow' | 'emerald' | 'amber'
  sub?: string
}) {
  const toneCls =
    tone === 'yellow' ? 'text-[var(--color-yellow)]'
    : tone === 'emerald' ? 'text-emerald-300'
    : tone === 'amber' ? 'text-amber-300'
    : 'text-white'
  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/5 px-3 py-2.5">
      <div className={['text-xl font-semibold tabular-nums leading-none', toneCls].join(' ')}>
        {value}
      </div>
      <div className="mt-1.5 font-mono text-[9px] uppercase tracking-widest text-white/40 leading-tight">
        {label}
      </div>
      {sub && (
        <div className="mt-0.5 font-mono text-[9px] text-emerald-300/80 leading-tight">{sub}</div>
      )}
    </div>
  )
}

function DispatchCard({
  entry,
  index,
  tick,
}: {
  entry: RosterEntry
  index: number
  tick: number
}) {
  const phase = dispatchPhaseFor(tick, index, entry.kind)
  const isOff = entry.kind === 'off'
  const isAvail = entry.kind === 'available'
  const isTrucking = entry.kind === 'trucking'
  const isTemp = entry.kind === 'temp'

  const border =
    phase === 'accepted'   ? 'border-emerald-400/40 bg-emerald-500/[0.06]'
    : phase === 'notified' ? 'border-[var(--color-yellow)]/45 bg-[var(--color-yellow)]/[0.06]'
    : isTrucking ? 'border-sky-400/30 bg-sky-500/[0.05]'
    : isTemp     ? 'border-amber-400/30 bg-amber-500/[0.05]'
    : isAvail    ? 'border-emerald-400/20 bg-emerald-500/[0.03]'
    : isOff      ? 'border-white/8 bg-white/[0.015]'
    : 'border-white/10 bg-white/[0.025]'

  return (
    <motion.div
      animate={phase === 'sending' ? { scale: [1, 1.02, 1] } : { scale: 1 }}
      transition={{ duration: 0.4 }}
      className={['relative rounded-lg border p-2.5 transition-colors duration-300 overflow-hidden', border].join(' ')}
    >
      <AnimatePresence>
        {phase === 'notified' && (
          <motion.span
            key="ping"
            initial={{ opacity: 0.65, scale: 0.85 }}
            animate={{ opacity: 0, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="pointer-events-none absolute inset-0 rounded-lg border border-[var(--color-yellow)]/60"
          />
        )}
      </AnimatePresence>

      <div className="relative flex items-start justify-between gap-1.5">
        <div className="min-w-0 flex-1">
          <div className={['text-[12px] font-semibold leading-tight truncate flex items-center gap-1',
            isOff ? 'text-white/40' : 'text-white/90'].join(' ')}>
            {isTrucking && <Truck size={11} className="shrink-0 text-sky-300/80" />}
            <span className="truncate">{entry.name}</span>
          </div>
          <div className="text-[10px] text-white/40 truncate mt-0.5">{entry.role}</div>

          {entry.job && (
            <div className="mt-1.5 flex items-center gap-1 rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5">
              <Briefcase size={9} className="shrink-0 text-[var(--color-yellow)]/80" />
              <span className="text-[10px] text-white/70 truncate">{entry.job.name}</span>
            </div>
          )}

          {isAvail && (
            <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-emerald-300/85">
              <UserPlus size={10} /><span>Available</span>
            </div>
          )}
          {isOff && (
            <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-white/35">
              <UserX size={10} /><span>{entry.offReason || 'Off'}</span>
            </div>
          )}
        </div>

        <div className="shrink-0">
          <AnimatePresence mode="wait" initial={false}>
            {phase === 'notified' && (
              <motion.span key="sent"
                initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-[8px] uppercase tracking-widest rounded-full px-1.5 py-0.5 border border-[var(--color-yellow)]/40 bg-[var(--color-yellow)]/10 text-[var(--color-yellow)] whitespace-nowrap">
                Sent
              </motion.span>
            )}
            {phase === 'accepted' && (
              <motion.span key="ack"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="inline-flex items-center gap-0.5 font-mono text-[8px] uppercase tracking-widest rounded-full px-1.5 py-0.5 border border-emerald-400/40 bg-emerald-500/10 text-emerald-300 whitespace-nowrap">
                <Check size={9} strokeWidth={3} />Ack
              </motion.span>
            )}
            {isTrucking && phase === 'idle' && (
              <motion.span key="ot" initial={false}
                className="font-mono text-[8px] uppercase tracking-widest rounded-full px-1.5 py-0.5 border border-sky-400/30 text-sky-300/80 whitespace-nowrap">
                3rd-party
              </motion.span>
            )}
            {isTemp && phase === 'idle' && (
              <motion.span key="tp" initial={false}
                className="font-mono text-[8px] uppercase tracking-widest rounded-full px-1.5 py-0.5 border border-amber-400/30 text-amber-300/80 whitespace-nowrap">
                Temp
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

/* ================================================================== */
/* PANE 2 — CALENDAR                                                   */
/* ================================================================== */

type ChipColor = 'green' | 'blue' | 'red' | 'orange' | 'black' | 'purple' | 'yellow'

type CalChip = { color: ChipColor; label: string; cancelled?: boolean }

const CHIP_TONES: Record<ChipColor, string> = {
  green:  'bg-emerald-500/85 text-white border-emerald-300/40',
  blue:   'bg-sky-500/85     text-white border-sky-300/40',
  red:    'bg-rose-500/85    text-white border-rose-300/40',
  orange: 'bg-orange-500/90  text-white border-orange-300/40',
  black:  'bg-zinc-700       text-white border-zinc-500/40',
  purple: 'bg-violet-500/85  text-white border-violet-300/40',
  yellow: 'bg-amber-400/90   text-black border-amber-200/40',
}

// 5 weeks × 7 days. days[i] is an array of chips for that cell. nulls = empty cells.
const CAL_DAYS: { day: number | null; chips: CalChip[] }[] = [
  // Week 1
  { day: null, chips: [] },
  { day: null, chips: [] },
  { day: null, chips: [] },
  { day: null, chips: [] },
  { day: 1, chips: [{ color: 'blue', label: 'Bayview HS' }, { color: 'orange', label: 'Ethanol Plant' }] },
  { day: 2, chips: [{ color: 'blue', label: 'Plaza Tower' }] },
  { day: 3, chips: [] },
  // Week 2
  { day: 4, chips: [{ color: 'orange', label: 'Bayview HS' }, { color: 'blue', label: 'Ethanol Plant' }, { color: 'blue', label: 'Plaza Inn' }] },
  { day: 5, chips: [{ color: 'blue', label: 'Bayview HS' }, { color: 'green', label: 'Holiday Inn' }, { color: 'red', label: 'Howard St', cancelled: true }] },
  { day: 6, chips: [{ color: 'green', label: 'BNSF' }, { color: 'orange', label: 'Lions Park' }, { color: 'blue', label: 'Holiday Inn' }] },
  { day: 7, chips: [{ color: 'green', label: 'ATMI Russel' }, { color: 'orange', label: 'Gompers Jr.' }, { color: 'blue', label: 'Lions Park' }] },
  { day: 8, chips: [{ color: 'orange', label: 'Nicks Fab.' }, { color: 'green', label: 'HELM Freeport' }, { color: 'green', label: 'HELM Freeport' }] },
  { day: 9, chips: [{ color: 'green', label: 'HELM Freeport' }, { color: 'blue', label: 'RFD-ADB7093' }] },
  { day: 10, chips: [] },
  // Week 3
  { day: 11, chips: [{ color: 'red', label: 'Glencoe GC' }, { color: 'green', label: 'HELM Freeport' }, { color: 'black', label: 'Howard St' }] },
  { day: 12, chips: [{ color: 'green', label: 'Cary Well' }, { color: 'black', label: 'Gable Hall' }, { color: 'orange', label: 'Rivian' }] },
  { day: 13, chips: [{ color: 'green', label: 'Cary Well' }, { color: 'orange', label: 'Eugene Sayer' }, { color: 'black', label: 'Howard St' }] },
  { day: 14, chips: [{ color: 'green', label: 'Gould Farms' }, { color: 'blue', label: 'NIU Music' }, { color: 'red', label: 'Ramos Constr.' }] },
  { day: 15, chips: [{ color: 'black', label: 'Downers Grove' }, { color: 'green', label: 'HELM Quarry' }, { color: 'yellow', label: 'Holiday Inn' }] },
  { day: 16, chips: [{ color: 'green', label: 'HELM Quarry' }, { color: 'red', label: 'HELM Quarry' }] },
  { day: 17, chips: [] },
  // Week 4
  { day: 18, chips: [{ color: 'green', label: 'BNSF' }, { color: 'blue', label: 'NIU Music' }, { color: 'orange', label: 'RFD-ADB7093' }] },
  { day: 19, chips: [{ color: 'black', label: 'Gable Hall' }, { color: 'blue', label: 'NIU Music' }, { color: 'purple', label: 'Planet Fitness' }] },
  { day: 20, chips: [{ color: 'blue', label: 'NIU Music' }, { color: 'blue', label: 'Sewage Plant' }] },
  { day: 21, chips: [{ color: 'blue', label: 'NIU Music' }, { color: 'blue', label: 'Sewage Plant' }] },
  { day: 22, chips: [{ color: 'black', label: 'CVS Wall St' }, { color: 'blue', label: 'NIU Music' }, { color: 'blue', label: 'Sewage Plant' }] },
  { day: 23, chips: [] },
  { day: 24, chips: [] },
  // Week 5
  { day: 25, chips: [{ color: 'blue', label: 'NIU Music' }] },
  { day: 26, chips: [{ color: 'blue', label: 'NIU Music' }] },
  { day: 27, chips: [{ color: 'blue', label: 'NIU Music' }] },
  { day: 28, chips: [{ color: 'blue', label: 'NIU Music' }] },
  { day: 29, chips: [{ color: 'blue', label: 'NIU Music' }] },
  { day: 30, chips: [] },
  { day: 31, chips: [] },
]

const CALENDAR_DURATION = 6800
// Highlight one cell mid-cycle to feel "alive"
const CAL_HIGHLIGHT_AT = 2400
const CAL_HIGHLIGHT_END = 4200
const CAL_HIGHLIGHT_DAY = 13

function CalendarPane({ reduced, active }: { reduced: boolean; active: boolean }) {
  const tick = useTick(CALENDAR_DURATION, active && !reduced)
  const realTick = reduced ? CALENDAR_DURATION : tick

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <div className="text-base font-semibold text-white tracking-tight">Jobs Calendar</div>
          <div className="text-[11px] text-white/45">12 active · 593 in pipeline</div>
        </div>
        <div className="flex items-center gap-1.5">
          <button tabIndex={-1} aria-hidden className="w-6 h-6 rounded-md border border-white/10 bg-white/[0.03] grid place-items-center text-white/50 cursor-default">
            <ChevronLeft size={12} />
          </button>
          <span className="text-xs text-white/75 font-medium px-1">May 2026</span>
          <button tabIndex={-1} aria-hidden className="w-6 h-6 rounded-md border border-white/10 bg-white/[0.03] grid place-items-center text-white/50 cursor-default">
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* Day-of-week header */}
      <div className="grid grid-cols-7 gap-1 mb-1 px-1">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
          <div key={d} className="font-mono text-[9px] uppercase tracking-widest text-white/35 text-center">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {CAL_DAYS.map((cell, i) => {
          const highlighted =
            cell.day === CAL_HIGHLIGHT_DAY &&
            realTick >= CAL_HIGHLIGHT_AT &&
            realTick < CAL_HIGHLIGHT_END
          return (
            <div
              key={i}
              className={[
                'min-h-[60px] sm:min-h-[72px] rounded-md border p-1 sm:p-1.5 overflow-hidden transition-colors',
                cell.day == null
                  ? 'border-white/5 bg-white/[0.01]'
                  : highlighted
                  ? 'border-[var(--color-yellow)]/50 bg-[var(--color-yellow)]/[0.06]'
                  : 'border-white/10 bg-white/[0.025]',
              ].join(' ')}
            >
              {cell.day != null && (
                <div className="text-[9px] text-white/45 font-medium leading-none mb-1">{cell.day}</div>
              )}
              <div className="space-y-[2px]">
                {cell.chips
                  .filter((c) => (c as CalChip).color)
                  .slice(0, 3)
                  .map((chip, idx) => {
                    const c = chip as CalChip
                    const delay = i * 0.012 + idx * 0.04
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: -2 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay }}
                        className={[
                          'truncate rounded px-1 py-[1px] text-[8px] sm:text-[9px] font-medium leading-tight border',
                          CHIP_TONES[c.color],
                          c.cancelled ? 'line-through opacity-85' : '',
                        ].join(' ')}
                      >
                        {c.label}
                      </motion.div>
                    )
                  })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-white/45">
        <Legend tone="green" label="Day billed" />
        <Legend tone="blue"  label="Active"     />
        <Legend tone="orange" label="In progress" />
        <Legend tone="black" label="Internal"   />
        <Legend tone="red"   label="Cancelled"  />
      </div>
    </div>
  )
}

function Legend({ tone, label }: { tone: ChipColor; label: string }) {
  return (
    <div className="inline-flex items-center gap-1">
      <span className={['w-2.5 h-2.5 rounded-sm border', CHIP_TONES[tone].split(' ').filter((c) => c.startsWith('bg-') || c.startsWith('border-')).join(' ')].join(' ')} />
      <span>{label}</span>
    </div>
  )
}

/* ================================================================== */
/* PANE 3 — OVERVIEW / COMMAND CENTER                                  */
/* ================================================================== */

const OVERVIEW_DURATION = 7200

const KPI_TILES = [
  { label: 'Active Jobs',       value: 12,  trend: 'running today',  Icon: Briefcase,     tone: 'emerald' as const },
  { label: 'Pipeline Jobs',     value: 593, trend: 'on calendar',    Icon: Activity,      tone: 'white'   as const },
  { label: 'Open Work Orders',  value: 3,   trend: 'need attention', Icon: ClipboardList, tone: 'emerald' as const },
  { label: 'Overdue PM Lines',  value: 7,   trend: 'fleet-wide',     Icon: Bell,          tone: 'amber'   as const },
]

const FLEET_BARS = [
  { label: 'All Terrain',   value: 9 },
  { label: 'Truck Crane',   value: 5 },
  { label: 'Rough Terrain', value: 2 },
  { label: 'Derrick',       value: 1 },
]

const IDLE_EQUIP = [
  { id: '730',  desc: 'Truck Crane · Grove TMS 500E' },
  { id: '6031', desc: 'All Terrain · Grove GMK 5135' },
  { id: '9406', desc: 'All Terrain · Grove GMK 3055' },
  { id: '269',  desc: 'Truck Crane · Grove TM 500E-2' },
]

const ENDING_THIS_WEEK = [
  { name: 'BNSF',           where: 'Wilmington, IL',   ends: 'Ends May 28' },
  { name: 'RFD-ADB7093',    where: 'Rockford, IL',     ends: 'Ends May 28' },
  { name: 'Sheppard HS',    where: 'Palos Heights, IL', ends: 'Ends May 29' },
]

function OverviewPane({ reduced, active }: { reduced: boolean; active: boolean }) {
  const tick = useTick(OVERVIEW_DURATION, active && !reduced)
  const realTick = reduced ? OVERVIEW_DURATION : tick

  // Count-up progress 0..1 over first 1.4s
  const progress = reduced ? 1 : Math.min(realTick / 1400, 1)

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <div className="text-base font-semibold text-white tracking-tight">Command Center</div>
          <div className="text-[11px] text-white/45">Owner-grade analytics · jobs, fleet, maintenance, cash</div>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-white/45 font-mono">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50 animate-ping" />
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </span>
          <span>Live data</span>
        </div>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        {KPI_TILES.map((k) => {
          const Icon = k.Icon
          const displayValue = Math.round(k.value * progress)
          return (
            <div key={k.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-emerald-400/50" />
              <div className="flex items-center gap-1.5 mb-1.5">
                <Icon size={11} className="text-emerald-300/70" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">{k.label}</span>
              </div>
              <div className={[
                'text-xl sm:text-2xl font-semibold tabular-nums leading-none',
                k.tone === 'amber' ? 'text-amber-300' : 'text-white',
              ].join(' ')}>
                {displayValue}
              </div>
              <div className="mt-1 inline-flex items-center gap-1 font-mono text-[9px] text-emerald-300/80 leading-none">
                <span>▲</span><span>{k.trend}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Sub-tab strip (visual only) */}
      <div className="rounded-lg border border-white/10 bg-white/[0.02] grid grid-cols-4 mb-3 overflow-hidden">
        {['Operations', 'Fleet', 'Maintenance', 'Cash'].map((t, i) => (
          <div
            key={t}
            className={[
              'py-1.5 text-center text-[10px] sm:text-[11px] font-medium',
              i === 1 ? 'text-white bg-white/[0.04]' : 'text-white/40',
            ].join(' ')}
          >
            {t}
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid sm:grid-cols-2 gap-2">
        {/* Fleet mix bars */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
          <div className="text-xs font-semibold text-white mb-0.5">Crane fleet mix</div>
          <div className="text-[10px] text-white/45 mb-3">Capacity profile by crane type</div>
          <div className="flex items-end gap-2 h-24">
            {FLEET_BARS.map((b, i) => {
              const max = Math.max(...FLEET_BARS.map((x) => x.value))
              const heightPct = (b.value / max) * 100
              const delay = 200 + i * 120
              const grown = reduced ? 1 : Math.min(Math.max((realTick - delay) / 600, 0), 1)
              return (
                <div key={b.label} className="flex-1 flex flex-col items-center justify-end gap-1.5">
                  <div className="w-full rounded-t-sm bg-gradient-to-t from-emerald-500/80 to-emerald-400 transition-all"
                    style={{ height: `${heightPct * grown}%`, minHeight: '2px' }} />
                  <div className="font-mono text-[8px] text-white/40 truncate w-full text-center">{b.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Idle equipment */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
          <div className="text-xs font-semibold text-white mb-0.5 flex items-center gap-1.5">
            <CircleDot size={11} className="text-amber-300" />
            Idle equipment
          </div>
          <div className="text-[10px] text-white/45 mb-2">Cranes not assigned — revenue sitting in the yard</div>
          <div className="space-y-1">
            {IDLE_EQUIP.map((eq, i) => {
              const delay = 400 + i * 110
              const visible = reduced || realTick >= delay
              return (
                <motion.div
                  key={eq.id}
                  initial={false}
                  animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -4 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between gap-2 rounded border border-white/8 bg-white/[0.02] px-2 py-1.5"
                >
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold text-white truncate">{eq.id}</div>
                    <div className="text-[9px] text-white/45 truncate">{eq.desc}</div>
                  </div>
                  <span className="shrink-0 font-mono text-[8px] uppercase tracking-widest rounded-full border border-amber-400/30 text-amber-300/85 px-1.5 py-0.5">
                    Idle
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Ending-this-week strip */}
      <div className="mt-2 rounded-xl border border-white/10 bg-white/[0.02] p-3">
        <div className="text-xs font-semibold text-white mb-0.5">Jobs ending this week</div>
        <div className="text-[10px] text-white/45 mb-2">Revenue about to drop off — line up follow-on work</div>
        <div className="grid sm:grid-cols-3 gap-1.5">
          {ENDING_THIS_WEEK.map((j, i) => {
            const delay = 700 + i * 120
            const visible = reduced || realTick >= delay
            return (
              <motion.div
                key={j.name}
                initial={false}
                animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 3 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between gap-2 rounded border border-white/8 bg-white/[0.02] px-2 py-1.5"
              >
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold text-white truncate">{j.name}</div>
                  <div className="text-[9px] text-white/45 truncate">{j.where}</div>
                </div>
                <span className="shrink-0 font-mono text-[8px] uppercase tracking-widest text-orange-300/85">
                  {j.ends}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ================================================================== */
/* PANE 4 — AI ASSISTANT                                               */
/* ================================================================== */

const AI_DURATION = 9000

const AI_PROMPT = "Who's our biggest concentration risk this quarter?"
const AI_RESPONSE =
  "Q1 2026: 41% of revenue came from your top 3 customers. Hudson Yards Group leads at 22% — losing them would cut roughly $580K from the next 90 days. Worth diversifying — BNSF has 3 unscheduled jobs you haven't quoted yet."

const AI_SUGGESTIONS = [
  'Which crane underperformed this quarter?',
  'Show me overdue PM by crane',
  'Draft an invoice from yesterday\'s dispatch',
]

const AI_PROMPT_TYPE_START = 600
const AI_PROMPT_TYPE_END = 1900
const AI_RESPONSE_TYPE_START = 2400
const AI_RESPONSE_TYPE_END = 7000
const AI_SUGGEST_AT = 7400

function AiPane({ reduced, active }: { reduced: boolean; active: boolean }) {
  const tick = useTick(AI_DURATION, active && !reduced)
  const realTick = reduced ? AI_DURATION : tick

  const promptText = useTyped(AI_PROMPT, AI_PROMPT_TYPE_START, AI_PROMPT_TYPE_END, realTick, reduced)
  const respText   = useTyped(AI_RESPONSE, AI_RESPONSE_TYPE_START, AI_RESPONSE_TYPE_END, realTick, reduced)
  const showSuggest = reduced || realTick >= AI_SUGGEST_AT

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--color-yellow)] to-amber-500 grid place-items-center text-black">
            <Sparkles size={14} strokeWidth={2.5} />
          </span>
          <div>
            <div className="text-base font-semibold text-white tracking-tight">Boomline AI</div>
            <div className="text-[11px] text-white/45">Reads your data. Answers in plain language.</div>
          </div>
        </div>
        <span className="hidden sm:inline-flex font-mono text-[9px] uppercase tracking-widest rounded-full border border-white/10 text-white/45 px-2 py-0.5">
          Optional
        </span>
      </div>

      <div className="space-y-2.5 min-h-[260px]">
        {/* User prompt bubble */}
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-white/[0.06] border border-white/10 px-3.5 py-2 text-sm text-white/85">
            {promptText}
            {!reduced && realTick >= AI_PROMPT_TYPE_START && realTick < AI_PROMPT_TYPE_END && (
              <span className="inline-block w-1 h-3 ml-0.5 align-middle bg-white/60 animate-pulse" />
            )}
          </div>
        </div>

        {/* AI response */}
        {realTick >= AI_RESPONSE_TYPE_START - 200 && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-start gap-2"
          >
            <span className="shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--color-yellow)] to-amber-500 grid place-items-center text-black">
              <Cpu size={13} strokeWidth={2.5} />
            </span>
            <div className="flex-1 rounded-2xl rounded-tl-md bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 px-3.5 py-2.5">
              <div className="text-sm text-white/85 leading-relaxed">
                {respText || (
                  <span className="inline-flex items-center gap-1 text-white/40 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse [animation-delay:120ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse [animation-delay:240ms]" />
                    Reading your data...
                  </span>
                )}
                {!reduced && realTick >= AI_RESPONSE_TYPE_START && realTick < AI_RESPONSE_TYPE_END && (
                  <span className="inline-block w-1 h-3 ml-0.5 align-middle bg-[var(--color-yellow)] animate-pulse" />
                )}
              </div>
              {respText && (
                <div className="mt-2 flex items-center gap-2 text-[10px] text-white/45 font-mono">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Q1 revenue · Top customers · Pipeline
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Suggested follow-ups */}
        <AnimatePresence>
          {showSuggest && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="pt-1"
            >
              <div className="font-mono text-[9px] uppercase tracking-widest text-white/40 mb-1.5">
                Try next
              </div>
              <div className="flex flex-wrap gap-1.5">
                {AI_SUGGESTIONS.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.07 }}
                    className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] hover:border-[var(--color-yellow)]/30 px-2.5 py-1 text-[11px] text-white/65 cursor-default"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function useTyped(
  text: string,
  startMs: number,
  endMs: number,
  tick: number,
  reduced: boolean,
) {
  return useMemo(() => {
    if (reduced) return text
    if (tick < startMs) return ''
    if (tick >= endMs) return text
    const progress = (tick - startMs) / (endMs - startMs)
    const charCount = Math.round(text.length * progress)
    return text.slice(0, charCount)
  }, [text, startMs, endMs, tick, reduced])
}

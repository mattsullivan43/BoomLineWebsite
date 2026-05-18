import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Activity,
  Bell,
  Briefcase,
  Calendar as CalendarIcon,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  ClipboardList,
  Clock,
  Construction,
  Cpu,
  LayoutDashboard,
  MapPin,
  Pause,
  Play,
  Send,
  Sparkles,
  Truck,
  UserPlus,
  UserX,
  X,
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
  { key: 'calendar', label: 'Jobs Calendar',    Icon: CalendarIcon,    durationMs: 13000 },
  { key: 'overview', label: 'Command Center',   Icon: LayoutDashboard, durationMs: 12000 },
  { key: 'ai',       label: 'Boomline AI',      Icon: Sparkles,        durationMs: 12000 },
]

export default function LiveProductShowcase() {
  const [activeIdx, setActiveIdx] = useState(0)
  // userPaused = explicit play/pause control. Tab click also sets it true.
  const [userPaused, setUserPaused] = useState(false)
  const [visible, setVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion() ?? false

  const paused = userPaused || !visible || reduced

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
    if (paused) return
    const ms = PANES[activeIdx].durationMs
    const t = window.setTimeout(() => {
      setActiveIdx((i) => (i + 1) % PANES.length)
    }, ms)
    return () => window.clearTimeout(t)
  }, [activeIdx, paused])

  const active = PANES[activeIdx]

  const handleTabClick = (idx: number) => {
    setActiveIdx(idx)
    setUserPaused(true) // exploring — let the user read
  }

  return (
    <div ref={containerRef} className="relative">
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

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="relative flex w-1.5 h-1.5">
                {!userPaused && (
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50 animate-ping" />
                )}
                <span className={[
                  'relative inline-flex w-1.5 h-1.5 rounded-full',
                  userPaused ? 'bg-white/30' : 'bg-emerald-400',
                ].join(' ')} />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/45">
                {userPaused ? 'Paused' : 'Live demo'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? 'Play demo' : 'Pause demo'}
              className="inline-flex items-center justify-center w-6 h-6 rounded-md border border-white/10 bg-white/[0.04] hover:border-[var(--color-yellow)]/40 hover:bg-[var(--color-yellow)]/10 text-white/70 hover:text-[var(--color-yellow)] transition-colors"
            >
              {userPaused ? <Play size={11} strokeWidth={2.5} /> : <Pause size={11} strokeWidth={2.5} />}
            </button>
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
                onClick={() => handleTabClick(i)}
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
          {PANES.map((p, i) => (
            <ProgressBar
              key={p.key}
              active={i === activeIdx}
              past={i < activeIdx}
              durationMs={p.durationMs}
              paused={paused}
              // cycleId resets the bar only on tab change, not on pause toggle
              cycleId={`${activeIdx}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }
        @keyframes showcaseProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  )
}

function ProgressBar({
  active,
  past,
  durationMs,
  paused,
  cycleId,
}: {
  active: boolean
  past: boolean
  durationMs: number
  paused: boolean
  cycleId: string
}) {
  return (
    <div className="h-0.5 rounded-full bg-white/5 overflow-hidden">
      {active ? (
        <div
          key={cycleId}
          className="h-full bg-[var(--color-yellow)]/70"
          style={{
            width: '0%',
            animation: `showcaseProgress ${durationMs}ms linear forwards`,
            animationPlayState: paused ? 'paused' : 'running',
          }}
        />
      ) : past ? (
        <div className="h-full w-full bg-white/15" />
      ) : null}
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
  { id: 'a', name: 'Mike Carter',     role: 'Operator',         kind: 'employee', job: { name: 'Westbrook Tower B'   } },
  { id: 'b', name: 'Tony Caruso',     role: 'Operator',         kind: 'employee', job: { name: 'North Bay Terminal'  } },
  { id: 'c', name: 'Derek Williams',  role: 'Oiler',            kind: 'employee', job: { name: 'Westbrook Tower B'   } },
  { id: 'd', name: 'Carlos Vasquez',  role: 'Operator',         kind: 'employee', job: { name: 'Crescent Bridge'     } },
  { id: 'e', name: 'Frank DiMarco',   role: 'Operator',         kind: 'employee', job: { name: 'Belmont Substation'  } },
  { id: 'f', name: 'JBM Heavy Haul',  role: 'Outside trucking', kind: 'trucking', job: { name: 'Belmont Substation'  } },
  { id: 'g', name: 'Jimmy Reyes',     role: 'Oiler',            kind: 'employee', job: { name: 'North Bay Terminal'  } },
  { id: 'h', name: 'Adam K.',         role: 'Day labor',        kind: 'temp',     job: { name: 'Westbrook Tower B'   } },
  { id: 'i', name: 'Steve Petrowski', role: 'Operator',         kind: 'employee', job: { name: 'Summit Plaza Pour'   } },
  { id: 'j', name: 'Rich Bauer',      role: 'Operator',         kind: 'available' },
  { id: 'k', name: 'Pete Hernandez',  role: 'Operator',         kind: 'off',      offReason: 'Vacation' },
  { id: 'l', name: 'Ryan Walsh',      role: 'Oiler',            kind: 'employee', job: { name: 'Crescent Bridge'     } },
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
  { day: 1, chips: [{ color: 'blue', label: 'Westbrook HS' }, { color: 'orange', label: 'Summit Energy' }] },
  { day: 2, chips: [{ color: 'blue', label: 'Belmont Plaza' }] },
  { day: 3, chips: [] },
  // Week 2
  { day: 4, chips: [{ color: 'orange', label: 'Westbrook HS' }, { color: 'blue', label: 'Summit Energy' }, { color: 'blue', label: 'Linden Inn' }] },
  { day: 5, chips: [{ color: 'blue', label: 'Westbrook HS' }, { color: 'green', label: 'Lakeside Resort' }, { color: 'red', label: 'Pier 17 Pour', cancelled: true }] },
  { day: 6, chips: [{ color: 'green', label: 'Atlas Logistics' }, { color: 'orange', label: 'Linden Park' }, { color: 'blue', label: 'Lakeside Resort' }] },
  { day: 7, chips: [{ color: 'green', label: 'Cypress Mfg' }, { color: 'orange', label: 'Forest Hills MS' }, { color: 'blue', label: 'Linden Park' }] },
  { day: 8, chips: [{ color: 'orange', label: 'Granite Works' }, { color: 'green', label: 'Highline Quarry' }, { color: 'green', label: 'Highline Quarry' }] },
  { day: 9, chips: [{ color: 'green', label: 'Highline Quarry' }, { color: 'blue', label: 'Crescent DC' }] },
  { day: 10, chips: [] },
  // Week 3
  { day: 11, chips: [{ color: 'red', label: 'Beachwood Club' }, { color: 'green', label: 'Highline Quarry' }, { color: 'black', label: 'Pier 17 Pour' }] },
  { day: 12, chips: [{ color: 'green', label: 'North Branch Well' }, { color: 'black', label: 'Hartford Hall' }, { color: 'orange', label: 'Olympic Dist.' }] },
  { day: 13, chips: [{ color: 'green', label: 'North Branch Well' }, { color: 'orange', label: 'Walden Sub.' }, { color: 'black', label: 'Pier 17 Pour' }] },
  { day: 14, chips: [{ color: 'green', label: 'Cascade Farms' }, { color: 'blue', label: 'Wesleyan Arts' }, { color: 'red', label: 'Maple Constr.' }] },
  { day: 15, chips: [{ color: 'black', label: 'Briar Estates' }, { color: 'green', label: 'Pine Valley Q.' }, { color: 'yellow', label: 'Lakeside Resort' }] },
  { day: 16, chips: [{ color: 'green', label: 'Pine Valley Q.' }, { color: 'red', label: 'Pine Valley Q.' }] },
  { day: 17, chips: [] },
  // Week 4
  { day: 18, chips: [{ color: 'green', label: 'Atlas Logistics' }, { color: 'blue', label: 'Wesleyan Arts' }, { color: 'orange', label: 'Crescent DC' }] },
  { day: 19, chips: [{ color: 'black', label: 'Hartford Hall' }, { color: 'blue', label: 'Wesleyan Arts' }, { color: 'purple', label: 'Echo Gym' }] },
  { day: 20, chips: [{ color: 'blue', label: 'Wesleyan Arts' }, { color: 'blue', label: 'Reservoir 4' }] },
  { day: 21, chips: [{ color: 'blue', label: 'Wesleyan Arts' }, { color: 'blue', label: 'Reservoir 4' }] },
  { day: 22, chips: [{ color: 'black', label: 'Eastlake Drug' }, { color: 'blue', label: 'Wesleyan Arts' }, { color: 'blue', label: 'Reservoir 4' }] },
  { day: 23, chips: [] },
  { day: 24, chips: [] },
  // Week 5
  { day: 25, chips: [{ color: 'blue', label: 'Wesleyan Arts' }] },
  { day: 26, chips: [{ color: 'blue', label: 'Wesleyan Arts' }] },
  { day: 27, chips: [{ color: 'blue', label: 'Wesleyan Arts' }] },
  { day: 28, chips: [{ color: 'blue', label: 'Wesleyan Arts' }] },
  { day: 29, chips: [{ color: 'blue', label: 'Wesleyan Arts' }] },
  { day: 30, chips: [] },
  { day: 31, chips: [] },
]

const CALENDAR_DURATION = 13000
// Story: chips fade in → day 13 highlights → job modal pops → modal closes →
// period dropdown opens → Week option highlights → view morphs to Week.
const CAL_HIGHLIGHT_AT = 1800
const CAL_HIGHLIGHT_DAY = 13
const CAL_MODAL_OPEN_AT = 2400
const CAL_MODAL_CLOSE_AT = 5400
const CAL_DROPDOWN_OPEN_AT = 5800
const CAL_DROPDOWN_HOVER_AT = 6300  // Week option highlights yellow
const CAL_WEEK_VIEW_AT = 6800       // view transitions to Week

type WeekCard = {
  color: ChipColor
  name: string
  addr: string
  time: string
  tag?: string
}

const WEEK_TONES: Record<ChipColor, string> = {
  green:  'border-l-emerald-400 bg-emerald-500/[0.07]',
  blue:   'border-l-sky-400 bg-sky-500/[0.07]',
  red:    'border-l-rose-400 bg-rose-500/[0.07]',
  orange: 'border-l-orange-400 bg-orange-500/[0.07]',
  black:  'border-l-zinc-400 bg-zinc-700/30',
  purple: 'border-l-violet-400 bg-violet-500/[0.07]',
  yellow: 'border-l-amber-400 bg-amber-500/[0.07]',
}

const WEEK_DATA: { day: string; date: number; cards: WeekCard[]; emptyLabel?: string }[] = [
  { day: 'MON', date: 11, cards: [
    { color: 'red',    name: 'Beachwood Club',    addr: '621 Westley Rd, Glen',    time: '7:00 AM' },
    { color: 'green',  name: 'Highline Quarry',   addr: '1708 S Hollywd',          time: '7:00 AM', tag: 'Day Billed' },
    { color: 'black',  name: 'Pier 17 Pour',      addr: '424 Howard Ave',          time: '7:00 AM' },
  ] },
  { day: 'TUE', date: 12, cards: [
    { color: 'green',  name: 'North Branch Well', addr: '8920 State Rt 31',        time: '7:00 AM' },
    { color: 'black',  name: 'Hartford Hall',     addr: '200 University Cir',      time: '7:00 AM' },
    { color: 'orange', name: 'Olympic Dist.',     addr: '100 Westbrook Rd',        time: '7:00 AM' },
  ] },
  { day: 'WED', date: 13, cards: [
    { color: 'green',  name: 'North Branch Well', addr: '8920 State Rt 31',        time: '7:00 AM' },
    { color: 'orange', name: 'Walden Sub.',       addr: '3300 E Cheltenham',       time: '7:00 AM' },
    { color: 'black',  name: 'Pier 17 Pour',      addr: '424 Howard Ave',          time: '7:00 AM' },
  ] },
  { day: 'THU', date: 14, cards: [
    { color: 'green',  name: 'Cascade Farms',     addr: '49W924 Perry Rd',         time: '7:00 AM' },
    { color: 'blue',   name: 'Wesleyan Arts',     addr: '552 Lucinda Dr',          time: '7:00 AM' },
    { color: 'red',    name: 'Maple Constr.',     addr: '635 Magnolia St',         time: '7:00 AM' },
  ] },
  { day: 'FRI', date: 15, cards: [
    { color: 'black',  name: 'Briar Estates',     addr: '2254-2280 Warren',        time: '7:00 AM' },
    { color: 'green',  name: 'Pine Valley Q.',    addr: '1708 S Hollywd',          time: '7:00 AM', tag: 'Day Billed' },
    { color: 'yellow', name: 'Lakeside Resort',   addr: '880 N Peace Rd',          time: '7:00 AM' },
  ] },
  { day: 'SAT', date: 16, cards: [
    { color: 'green',  name: 'Pine Valley Q.',    addr: '1708 S Hollywd',          time: '7:00 AM' },
    { color: 'red',    name: 'Pine Valley Q.',    addr: '1708 S Hollywd',          time: '7:00 AM' },
  ] },
  { day: 'SUN', date: 17, cards: [], emptyLabel: 'No jobs' },
]

function CalendarPane({ reduced, active }: { reduced: boolean; active: boolean }) {
  const tick = useTick(CALENDAR_DURATION, active && !reduced)
  const realTick = reduced ? CALENDAR_DURATION : tick

  const modalOpen     = realTick >= CAL_MODAL_OPEN_AT && realTick < CAL_MODAL_CLOSE_AT
  const dropdownOpen  = realTick >= CAL_DROPDOWN_OPEN_AT && realTick < CAL_WEEK_VIEW_AT
  const weekHover     = realTick >= CAL_DROPDOWN_HOVER_AT
  const view: 'month' | 'week' = realTick >= CAL_WEEK_VIEW_AT ? 'week' : 'month'

  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div>
          <div className="text-base font-semibold text-white tracking-tight">Jobs Calendar</div>
          <div className="text-[11px] text-white/45">
            {view === 'month' ? '12 active · 593 in pipeline' : 'May 11 – May 17, 2026'}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Period dropdown trigger */}
          <div className="relative">
            <button
              tabIndex={-1}
              aria-hidden
              className={[
                'inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-medium transition-colors cursor-default',
                dropdownOpen
                  ? 'border-[var(--color-yellow)]/40 text-white bg-white/[0.05]'
                  : 'border-white/10 text-white/75 bg-white/[0.03]',
              ].join(' ')}
            >
              {view === 'month' ? 'Month' : 'Week'}
              <ChevronDown size={11} className="text-white/45" />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  key="period-dropdown"
                  initial={{ opacity: 0, y: -4, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-full mt-1 w-28 rounded-md border border-white/15 bg-[#0c0c0d] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.8)] py-1 z-20"
                >
                  <div className="w-full flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] text-white/85">
                    <Check size={11} className="text-[var(--color-yellow)]" />
                    Month
                  </div>
                  <div
                    className={[
                      'w-full flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] transition-colors',
                      weekHover
                        ? 'bg-[var(--color-yellow)]/15 text-[var(--color-yellow)]'
                        : 'text-white/65',
                    ].join(' ')}
                  >
                    <span className="w-[11px]" />
                    Week
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button tabIndex={-1} aria-hidden className="w-6 h-6 rounded-md border border-white/10 bg-white/[0.03] grid place-items-center text-white/50 cursor-default">
            <ChevronLeft size={12} />
          </button>
          <button tabIndex={-1} aria-hidden className="w-6 h-6 rounded-md border border-white/10 bg-white/[0.03] grid place-items-center text-white/50 cursor-default">
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {view === 'month' ? (
          <motion.div
            key="month-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <div className="text-xs text-white/55 font-medium mb-2">May 2026</div>
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
                const highlighted = cell.day === CAL_HIGHLIGHT_DAY && realTick >= CAL_HIGHLIGHT_AT
                return (
                  <div
                    key={i}
                    className={[
                      'min-h-[60px] sm:min-h-[72px] rounded-md border p-1 sm:p-1.5 overflow-hidden transition-colors',
                      cell.day == null
                        ? 'border-white/5 bg-white/[0.01]'
                        : highlighted
                        ? 'border-[var(--color-yellow)]/60 bg-[var(--color-yellow)]/[0.08] shadow-[0_0_0_1px_rgba(255,184,0,0.35)]'
                        : 'border-white/10 bg-white/[0.025]',
                    ].join(' ')}
                  >
                    {cell.day != null && (
                      <div className="text-[9px] text-white/45 font-medium leading-none mb-1">{cell.day}</div>
                    )}
                    <div className="space-y-[2px]">
                      {cell.chips.slice(0, 3).map((chip, idx) => {
                        const delay = i * 0.012 + idx * 0.04
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: -2 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay }}
                            className={[
                              'truncate rounded px-1 py-[1px] text-[8px] sm:text-[9px] font-medium leading-tight border',
                              CHIP_TONES[chip.color],
                              chip.cancelled ? 'line-through opacity-85' : '',
                            ].join(' ')}
                          >
                            {chip.label}
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
          </motion.div>
        ) : (
          <motion.div
            key="week-view"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <WeekView />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Job detail modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="job-modal-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] rounded-md" />
            <motion.div
              key="job-modal"
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.3, delay: 0.04, ease: [0.19, 1, 0.22, 1] }}
              className="relative w-[94%] sm:w-[90%] max-w-md rounded-xl border border-white/15 bg-[#0c0c0d] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] p-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Construction size={16} className="text-[var(--color-yellow)] shrink-0" />
                  <span className="text-sm sm:text-base font-bold text-white truncate">
                    North Branch Well
                  </span>
                </div>
                <button tabIndex={-1} aria-hidden className="text-white/35 hover:text-white/70 cursor-default p-0.5">
                  <X size={13} />
                </button>
              </div>

              <div className="text-[10px] text-white/45 mb-3 leading-relaxed">
                No quote linked to this job.{' '}
                <span className="text-emerald-300/80 underline underline-offset-2">Edit job</span>{' '}
                and choose one under "Linked quote".
              </div>

              {/* Action button row */}
              <div className="flex flex-wrap gap-1 mb-3">
                <ModalAction tone="emerald" filled>Create Dispatch</ModalAction>
                <ModalAction>Edit</ModalAction>
                <ModalAction>Re-Rent</ModalAction>
                <ModalAction tone="rose">Cancel Day</ModalAction>
                <ModalAction tone="amber">Idle Day</ModalAction>
                <ModalAction>Delay Job</ModalAction>
              </div>

              {/* Job Information */}
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                <div className="text-[11px] font-semibold text-white mb-2 flex items-center gap-1.5">
                  <MapPin size={11} className="text-emerald-300/80" />
                  Job Information
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[10px]">
                  <ModalField label="Address"      value="1284 County Rd 17" />
                  <ModalField label="City & State" value="Greenfield, OH" />
                  <ModalField label="Start"        value="May 12 · 7:00 AM" />
                  <ModalField label="End"          value="May 13 · 3:00 PM" />
                  <ModalField label="Duration"     value="2 days (weekdays)" />
                  <ModalField label="Salesperson"  value="Not set" muted />
                  <ModalField label="Contact"      value="Mason · (555) 040-9009" />
                  <ModalField label="Equipment"    value="110 ton" />
                </div>
                <div className="mt-2 pt-2 border-t border-white/8">
                  <div className="font-mono text-[8px] uppercase tracking-widest text-white/40 mb-0.5">
                    Description
                  </div>
                  <div className="text-[10px] text-white/85">Set well pipe</div>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[9px] text-white/65">
                    PO · MC26-1256
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/[0.04] px-1.5 py-0.5 text-[9px] text-white/70">
                    $ Unpaid
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md border border-amber-400/30 bg-amber-500/[0.08] px-1.5 py-0.5 text-[9px] text-amber-300/85">
                    Grease Time
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ModalAction({
  children,
  tone,
  filled,
}: {
  children: React.ReactNode
  tone?: 'emerald' | 'rose' | 'amber'
  filled?: boolean
}) {
  const cls =
    filled && tone === 'emerald'
      ? 'bg-emerald-500/90 hover:bg-emerald-400 text-black border-emerald-400'
      : tone === 'rose'
      ? 'border-rose-400/40 text-rose-300/90 hover:bg-rose-500/10'
      : tone === 'amber'
      ? 'border-amber-400/40 text-amber-300/90 hover:bg-amber-500/10'
      : tone === 'emerald'
      ? 'border-emerald-400/40 text-emerald-300/90 hover:bg-emerald-500/10'
      : 'border-white/15 text-white/75 hover:bg-white/[0.04]'
  return (
    <button
      type="button"
      tabIndex={-1}
      className={[
        'inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-medium transition-colors cursor-default',
        cls,
      ].join(' ')}
    >
      {children}
    </button>
  )
}

function ModalField({
  label,
  value,
  muted,
}: {
  label: string
  value: string
  muted?: boolean
}) {
  return (
    <div className="min-w-0">
      <div className="font-mono text-[8px] uppercase tracking-widest text-white/40 leading-none mb-0.5">
        {label}
      </div>
      <div className={['text-[10px] truncate', muted ? 'text-white/45 italic' : 'text-white/85'].join(' ')}>
        {value}
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

function WeekView() {
  return (
    <div className="grid grid-cols-7 gap-1.5">
      {WEEK_DATA.map((col, colIdx) => (
        <div key={col.date} className="flex flex-col gap-1.5 min-w-0">
          {/* Column header */}
          <div className="text-center">
            <div className="font-mono text-[9px] uppercase tracking-widest text-white/40">{col.day}</div>
            <div className="text-lg font-bold text-white leading-none mt-0.5">{col.date}</div>
            <div className="font-mono text-[8px] text-white/35 mt-0.5">
              {col.cards.length > 0 ? `${col.cards.length} jobs` : ''}
            </div>
          </div>

          {/* Cards or empty state */}
          {col.cards.length === 0 ? (
            <div className="rounded-md border border-dashed border-white/8 bg-white/[0.01] py-2 px-1.5 text-center text-[9px] text-white/30">
              {col.emptyLabel ?? 'No jobs'}
            </div>
          ) : (
            <div className="space-y-1.5">
              {col.cards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: colIdx * 0.04 + i * 0.06 }}
                  className={[
                    'rounded-md border border-white/8 border-l-[3px] px-1.5 py-1.5 overflow-hidden',
                    WEEK_TONES[card.color],
                  ].join(' ')}
                >
                  <div className="text-[10px] font-bold text-white truncate leading-tight">
                    {card.name}
                  </div>
                  <div className="mt-0.5 flex items-center gap-0.5 text-[8px] text-white/55">
                    <MapPin size={8} className="shrink-0" />
                    <span className="truncate">{card.addr}</span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-0.5 text-[8px] text-white/55">
                    <Clock size={8} className="shrink-0" />
                    <span>{card.time}</span>
                  </div>
                  {card.tag && (
                    <div className="mt-1 inline-flex items-center font-mono text-[7px] uppercase tracking-widest text-white/45">
                      {card.tag}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ================================================================== */
/* PANE 3 — OVERVIEW / COMMAND CENTER                                  */
/* ================================================================== */

const OVERVIEW_DURATION = 12000
const SUB_TAB_DURATION = OVERVIEW_DURATION / 4

const KPI_TILES = [
  { label: 'Active Jobs',       value: 12,  trend: 'running today',  Icon: Briefcase,     tone: 'emerald' as const },
  { label: 'Pipeline Jobs',     value: 593, trend: 'on calendar',    Icon: Activity,      tone: 'white'   as const },
  { label: 'Open Work Orders',  value: 3,   trend: 'need attention', Icon: ClipboardList, tone: 'emerald' as const },
  { label: 'Overdue PM Lines',  value: 7,   trend: 'fleet-wide',     Icon: Bell,          tone: 'amber'   as const },
]

type SubTabKey = 'operations' | 'fleet' | 'maintenance' | 'cash'

type SubTabContent = {
  chartTitle: string
  chartSub: string
  chartTone: 'emerald' | 'sky' | 'amber' | 'yellow'
  bars: { label: string; value: number; suffix?: string }[]
  listTitle: string
  listSub: string
  listIcon: typeof CircleDot
  listIconTone: string
  items: { id: string; desc: string; badge: string; badgeTone: 'amber' | 'orange' | 'rose' | 'emerald' }[]
}

const SUB_TAB_CONTENT: Record<SubTabKey, SubTabContent> = {
  operations: {
    chartTitle: 'Crew utilization',
    chartSub: 'Last 4 weeks · % of weekly capacity',
    chartTone: 'emerald',
    bars: [
      { label: 'Wk 17', value: 78, suffix: '%' },
      { label: 'Wk 18', value: 86, suffix: '%' },
      { label: 'Wk 19', value: 92, suffix: '%' },
      { label: 'Wk 20', value: 88, suffix: '%' },
    ],
    listTitle: 'Jobs ending this week',
    listSub: 'Revenue about to drop off — line up follow-on work',
    listIcon: Activity,
    listIconTone: 'text-orange-300',
    items: [
      { id: 'Atlas Logistics', desc: 'Wilmington · 110-ton',  badge: 'Ends Fri', badgeTone: 'orange' },
      { id: 'Crescent DC',     desc: 'Rockford · 80-ton',     badge: 'Ends Fri', badgeTone: 'orange' },
      { id: 'Westbrook HS',    desc: 'Palos Heights · 60-ton', badge: 'Ends Sat', badgeTone: 'orange' },
    ],
  },
  fleet: {
    chartTitle: 'Crane fleet mix',
    chartSub: 'Capacity profile by crane type',
    chartTone: 'emerald',
    bars: [
      { label: 'All Terrain',   value: 9 },
      { label: 'Truck Crane',   value: 5 },
      { label: 'Rough Terrain', value: 2 },
      { label: 'Derrick',       value: 1 },
    ],
    listTitle: 'Idle equipment',
    listSub: 'Cranes not assigned — revenue sitting in the yard',
    listIcon: CircleDot,
    listIconTone: 'text-amber-300',
    items: [
      { id: '730',  desc: 'Truck Crane · Grove TMS 500E',   badge: 'Idle', badgeTone: 'amber' },
      { id: '6031', desc: 'All Terrain · Grove GMK 5135',   badge: 'Idle', badgeTone: 'amber' },
      { id: '9406', desc: 'All Terrain · Grove GMK 3055',   badge: 'Idle', badgeTone: 'amber' },
      { id: '269',  desc: 'Truck Crane · Grove TM 500E-2',  badge: 'Idle', badgeTone: 'amber' },
    ],
  },
  maintenance: {
    chartTitle: 'PM lines by due state',
    chartSub: 'Overdue = direct downtime risk',
    chartTone: 'amber',
    bars: [
      { label: 'Overdue',  value: 7,  suffix: '' },
      { label: 'Due soon', value: 12, suffix: '' },
      { label: 'On track', value: 38, suffix: '' },
      { label: 'N/A',      value: 6,  suffix: '' },
    ],
    listTitle: 'Certifications expiring',
    listSub: 'Annual · load test · safety lane',
    listIcon: Bell,
    listIconTone: 'text-rose-300',
    items: [
      { id: 'Crane 4218', desc: 'Annual inspection · 9 days',  badge: 'Soon',    badgeTone: 'rose' },
      { id: 'Crane 7102', desc: 'Load test · 14 days',          badge: 'Soon',    badgeTone: 'rose' },
      { id: 'Op. license', desc: 'D. Williams · 21 days',       badge: 'Renew',   badgeTone: 'amber' },
    ],
  },
  cash: {
    chartTitle: 'Weekly revenue',
    chartSub: 'Last 4 weeks · $ thousands',
    chartTone: 'yellow',
    bars: [
      { label: 'Wk 17', value: 82,  suffix: 'K' },
      { label: 'Wk 18', value: 95,  suffix: 'K' },
      { label: 'Wk 19', value: 110, suffix: 'K' },
      { label: 'Wk 20', value: 88,  suffix: 'K' },
    ],
    listTitle: 'Outstanding AR',
    listSub: 'Past-due tracking with aging buckets',
    listIcon: Activity,
    listIconTone: 'text-emerald-300',
    items: [
      { id: 'Continental Group', desc: '$84,200 · 30-60 day bucket', badge: '30+',  badgeTone: 'orange' },
      { id: 'Cypress Mfg',       desc: '$31,500 · 0-30 day bucket',   badge: 'Sent', badgeTone: 'emerald' },
      { id: 'Maple Constr.',     desc: '$12,800 · 60-90 day bucket',  badge: '60+',  badgeTone: 'rose' },
    ],
  },
}

const SUB_TAB_LABEL: Record<SubTabKey, string> = {
  operations: 'Operations',
  fleet: 'Fleet',
  maintenance: 'Maintenance',
  cash: 'Cash',
}

const SUB_TAB_ORDER: SubTabKey[] = ['operations', 'fleet', 'maintenance', 'cash']

function OverviewPane({ reduced, active }: { reduced: boolean; active: boolean }) {
  const tick = useTick(OVERVIEW_DURATION, active && !reduced)
  const realTick = reduced ? OVERVIEW_DURATION : tick
  // userSubTab overrides the auto-cycle when the visitor clicks a sub-tab.
  const [userSubTab, setUserSubTab] = useState<SubTabKey | null>(null)
  const autoSubTabIdx = Math.min(Math.floor(realTick / SUB_TAB_DURATION), 3)
  const subTab: SubTabKey = userSubTab ?? SUB_TAB_ORDER[autoSubTabIdx]

  // KPI count-up
  const progress = reduced ? 1 : Math.min(realTick / 1400, 1)

  const content = SUB_TAB_CONTENT[subTab]
  const max = Math.max(...content.bars.map((b) => b.value))
  const chartFill =
    content.chartTone === 'emerald' ? 'from-emerald-500/80 to-emerald-400'
    : content.chartTone === 'sky'   ? 'from-sky-500/80 to-sky-400'
    : content.chartTone === 'amber' ? 'from-amber-500/80 to-amber-400'
    : 'from-[var(--color-yellow)]/80 to-[var(--color-yellow)]'

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

      {/* Sub-tab strip — clickable */}
      <div className="rounded-lg border border-white/10 bg-white/[0.02] grid grid-cols-4 mb-3 overflow-hidden">
        {SUB_TAB_ORDER.map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setUserSubTab(key)}
            className={[
              'py-2 text-center text-[11px] font-medium transition-colors relative',
              subTab === key
                ? 'text-white bg-white/[0.06]'
                : 'text-white/45 hover:text-white/80 hover:bg-white/[0.02]',
            ].join(' ')}
          >
            {SUB_TAB_LABEL[key]}
            {subTab === key && (
              <motion.span
                layoutId="subTabUnderline"
                className="absolute left-3 right-3 bottom-0 h-px bg-[var(--color-yellow)]"
              />
            )}
          </button>
        ))}
      </div>

      {/* Sub-tab content — bar chart + list, swaps on tab change */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={subTab}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -2 }}
          transition={{ duration: 0.25 }}
          className="grid sm:grid-cols-2 gap-2"
        >
          {/* Bar chart */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <div className="text-xs font-semibold text-white mb-0.5">{content.chartTitle}</div>
            <div className="text-[10px] text-white/45 mb-3">{content.chartSub}</div>
            <div className="flex items-end gap-2 h-28">
              {content.bars.map((b, i) => {
                const heightPct = (b.value / max) * 100
                return (
                  <div key={b.label} className="flex-1 flex flex-col items-center justify-end gap-1.5 min-w-0">
                    <span className="font-mono text-[9px] text-white/55 tabular-nums">
                      {b.value}{b.suffix ?? ''}
                    </span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPct}%` }}
                      transition={{ duration: 0.55, delay: i * 0.08, ease: [0.19, 1, 0.22, 1] }}
                      className={['w-full rounded-t-sm bg-gradient-to-t', chartFill].join(' ')}
                      style={{ minHeight: '2px' }}
                    />
                    <div className="font-mono text-[8px] text-white/40 truncate w-full text-center">{b.label}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* List */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <div className="text-xs font-semibold text-white mb-0.5 flex items-center gap-1.5">
              <content.listIcon size={11} className={content.listIconTone} />
              {content.listTitle}
            </div>
            <div className="text-[10px] text-white/45 mb-2">{content.listSub}</div>
            <div className="space-y-1">
              {content.items.map((it, i) => {
                const badgeBorder =
                  it.badgeTone === 'amber'   ? 'border-amber-400/30 text-amber-300/85'
                  : it.badgeTone === 'orange' ? 'border-orange-400/30 text-orange-300/85'
                  : it.badgeTone === 'rose'   ? 'border-rose-400/30 text-rose-300/85'
                  : 'border-emerald-400/30 text-emerald-300/85'
                return (
                  <motion.div
                    key={it.id}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.07 }}
                    className="flex items-center justify-between gap-2 rounded border border-white/8 bg-white/[0.02] px-2 py-1.5"
                  >
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold text-white truncate">{it.id}</div>
                      <div className="text-[9px] text-white/45 truncate">{it.desc}</div>
                    </div>
                    <span className={['shrink-0 font-mono text-[8px] uppercase tracking-widest rounded-full border px-1.5 py-0.5', badgeBorder].join(' ')}>
                      {it.badge}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ================================================================== */
/* PANE 4 — AI ASSISTANT                                               */
/* ================================================================== */

const AI_DURATION = 12000

const AI_PROMPT = "Who's our biggest concentration risk this quarter?"
const AI_RESPONSE =
  "Q1 2026: 41% of revenue came from your top 3 customers. Continental Group leads at 22% — losing them would cut roughly $580K from the next 90 days. Worth diversifying — the regional rail pipeline has 3 unscheduled jobs you haven't quoted yet."

const AI_SUGGESTIONS = [
  'Which crane underperformed this quarter?',
  'Show me overdue PM by crane',
  'Draft an invoice from yesterday\'s dispatch',
]

// Follow-up Q&A — visitor "clicks" the first suggestion mid-cycle.
const AI_FOLLOWUP_PROMPT = AI_SUGGESTIONS[0]
const AI_FOLLOWUP_RESPONSE =
  "Crane 6031 had 31 billable hours last quarter against $4,200 in PM and repair costs — net negative. Compare to Crane 4218 at 178 hours / $1,100 spend, top of the fleet. Recommend sidelining 6031 for 60 days while you review repair root causes."

// Prompt is visible IMMEDIATELY (no typing void). AI thinks for 400ms, then streams response.
const AI_THINK_AT = 300
const AI_RESPONSE_TYPE_START = 900
const AI_RESPONSE_TYPE_END = 4400
const AI_SOURCES_AT = 4600
const AI_SUGGEST_AT = 5200
// Follow-up turn
const AI_CHIP_CLICK_AT = 6500       // first chip highlights as if clicked
const AI_PROMPT2_AT = 6900          // second user bubble appears
const AI_THINK2_AT = 7200           // AI thinking dots for follow-up
const AI_RESPONSE2_TYPE_START = 7700
const AI_RESPONSE2_TYPE_END = 11200
const AI_SOURCES2_AT = 11400

function AiPane({ reduced, active }: { reduced: boolean; active: boolean }) {
  const tick = useTick(AI_DURATION, active && !reduced)
  const realTick = reduced ? AI_DURATION : tick

  const respText = useTyped(AI_RESPONSE, AI_RESPONSE_TYPE_START, AI_RESPONSE_TYPE_END, realTick, reduced)
  const respText2 = useTyped(AI_FOLLOWUP_RESPONSE, AI_RESPONSE2_TYPE_START, AI_RESPONSE2_TYPE_END, realTick, reduced)

  const showAiBubble = reduced || realTick >= AI_THINK_AT
  const showSources  = reduced || realTick >= AI_SOURCES_AT
  const showSuggest  = realTick >= AI_SUGGEST_AT && realTick < AI_CHIP_CLICK_AT + 300
  const isStreaming  = !reduced && realTick >= AI_RESPONSE_TYPE_START && realTick < AI_RESPONSE_TYPE_END
  const chipClicked  = realTick >= AI_CHIP_CLICK_AT
  const showPrompt2  = reduced || realTick >= AI_PROMPT2_AT
  const showAiBubble2 = reduced || realTick >= AI_THINK2_AT
  const isStreaming2 = !reduced && realTick >= AI_RESPONSE2_TYPE_START && realTick < AI_RESPONSE2_TYPE_END
  const showSources2 = reduced || realTick >= AI_SOURCES2_AT

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-4">
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

      <div className="space-y-2.5">
        {/* User prompt bubble — visible immediately */}
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-white/[0.06] border border-white/10 px-3.5 py-2 text-sm text-white/85">
            {AI_PROMPT}
          </div>
        </div>

        {/* AI response bubble */}
        {showAiBubble && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-2"
          >
            <span className="shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--color-yellow)] to-amber-500 grid place-items-center text-black">
              <Cpu size={13} strokeWidth={2.5} />
            </span>
            <div className="flex-1 rounded-2xl rounded-tl-md bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 px-3.5 py-2.5">
              <div className="text-sm text-white/85 leading-relaxed min-h-[1.5em]">
                {respText ? (
                  <>
                    {respText}
                    {isStreaming && (
                      <span className="inline-block w-1 h-3 ml-0.5 align-middle bg-[var(--color-yellow)] animate-pulse" />
                    )}
                  </>
                ) : (
                  <span className="inline-flex items-center gap-1 text-white/40 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse [animation-delay:120ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse [animation-delay:240ms]" />
                    Reading your data
                  </span>
                )}
              </div>
              {showSources && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 flex items-center gap-2 text-[10px] text-white/45 font-mono"
                >
                  <span className="inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Q1 revenue · Top customers · Pipeline
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Suggested follow-ups (disappear once the visitor "clicks") */}
        <AnimatePresence>
          {showSuggest && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.3 }}
              className="pt-1"
            >
              <div className="font-mono text-[9px] uppercase tracking-widest text-white/40 mb-1.5">
                Try next
              </div>
              <div className="flex flex-wrap gap-1.5">
                {AI_SUGGESTIONS.map((s, i) => {
                  const isClicked = i === 0 && chipClicked
                  return (
                    <motion.button
                      key={s}
                      type="button"
                      tabIndex={-1}
                      initial={{ opacity: 0, y: 3 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: isClicked ? 0.96 : 1,
                      }}
                      transition={{ duration: 0.25, delay: i * 0.07 }}
                      className={[
                        'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] transition-colors',
                        isClicked
                          ? 'border-[var(--color-yellow)]/60 bg-[var(--color-yellow)]/[0.12] text-[var(--color-yellow)]'
                          : 'border-white/10 bg-white/[0.03] hover:border-[var(--color-yellow)]/30 hover:text-white text-white/65',
                      ].join(' ')}
                    >
                      {s}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Follow-up user prompt */}
        <AnimatePresence>
          {showPrompt2 && (
            <motion.div
              key="prompt2"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-end"
            >
              <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-white/[0.06] border border-white/10 px-3.5 py-2 text-sm text-white/85">
                {AI_FOLLOWUP_PROMPT}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Follow-up AI response */}
        <AnimatePresence>
          {showAiBubble2 && (
            <motion.div
              key="aibubble2"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-2"
            >
              <span className="shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--color-yellow)] to-amber-500 grid place-items-center text-black">
                <Cpu size={13} strokeWidth={2.5} />
              </span>
              <div className="flex-1 rounded-2xl rounded-tl-md bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 px-3.5 py-2.5">
                <div className="text-sm text-white/85 leading-relaxed min-h-[1.5em]">
                  {respText2 ? (
                    <>
                      {respText2}
                      {isStreaming2 && (
                        <span className="inline-block w-1 h-3 ml-0.5 align-middle bg-[var(--color-yellow)] animate-pulse" />
                      )}
                    </>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-white/40 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse [animation-delay:120ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse [animation-delay:240ms]" />
                      Reading your data
                    </span>
                  )}
                </div>
                {showSources2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 flex items-center gap-2 text-[10px] text-white/45 font-mono"
                  >
                    <span className="inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Billable hrs · PM cost · Fleet ROI
                    </span>
                  </motion.div>
                )}
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

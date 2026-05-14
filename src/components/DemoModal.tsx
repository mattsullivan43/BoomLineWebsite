import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react'

const WEB3FORMS_ACCESS_KEY = '97f818eb-e4a2-42b7-ac4b-9b24d2d4588f'
const ENDPOINT = 'https://api.web3forms.com/submit'

type FormState = {
  firstName: string
  lastName: string
  email: string
  company: string
  phone: string
}

const initial: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function DemoModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [form, setForm] = useState<FormState>(initial)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')

  useEffect(() => {
    if (!isOpen) {
      setForm(initial)
      setStatus('idle')
      setErrorMsg('')
    }
  }, [isOpen])

  // Lock body scroll + ESC to close while open
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onClose])

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((s) => ({ ...s, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: 'Demo Request — Boomline',
      from_name: `${form.firstName} ${form.lastName}`.trim(),
      'First Name': form.firstName,
      'Last Name': form.lastName,
      Email: form.email,
      Company: form.company,
      Phone: form.phone,
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || 'Failed to submit. Try again.')
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Failed to submit.')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[var(--color-bg-2)] p-5 sm:p-8 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 w-10 h-10 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors z-10"
            >
              <X size={20} />
            </button>

            {status === 'success' ? (
              <SuccessState onClose={onClose} />
            ) : (
              <>
                <div className="mb-6">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--color-yellow)] mb-2">
                    Book a demo
                  </p>
                  <h3
                    id="demo-modal-title"
                    className="text-2xl font-bold tracking-tight text-white"
                  >
                    Tell us about your operation.
                  </h3>
                  <p className="mt-2 text-sm text-white/55">
                    We&rsquo;ll respond within one business day to set up a
                    15-minute walkthrough.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-2.5">
                    <Field
                      label="First name"
                      value={form.firstName}
                      onChange={(v) => update('firstName', v)}
                      required
                      autoComplete="given-name"
                      disabled={status === 'submitting'}
                    />
                    <Field
                      label="Last name"
                      value={form.lastName}
                      onChange={(v) => update('lastName', v)}
                      required
                      autoComplete="family-name"
                      disabled={status === 'submitting'}
                    />
                  </div>
                  <Field
                    label="Work email"
                    type="email"
                    value={form.email}
                    onChange={(v) => update('email', v)}
                    required
                    autoComplete="email"
                    disabled={status === 'submitting'}
                  />
                  <Field
                    label="Company"
                    value={form.company}
                    onChange={(v) => update('company', v)}
                    required
                    autoComplete="organization"
                    disabled={status === 'submitting'}
                  />
                  <Field
                    label="Phone"
                    type="tel"
                    value={form.phone}
                    onChange={(v) => update('phone', v)}
                    required
                    autoComplete="tel"
                    disabled={status === 'submitting'}
                  />

                  {status === 'error' && (
                    <div className="text-sm text-rose-400 bg-rose-400/10 border border-rose-400/20 rounded-lg px-3 py-2">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="mt-3 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold bg-[var(--color-yellow)] text-black rounded-lg hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send request
                        <Send size={14} />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-white/35 text-center mt-1">
                    We respond within 1 business day.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required,
  autoComplete,
  disabled,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
  autoComplete?: string
  disabled?: boolean
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
        {label}
        {required && <span className="text-[var(--color-yellow)] ml-1">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        disabled={disabled}
        className="px-3 py-3 rounded-lg border border-white/10 bg-white/[0.03] text-base sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-yellow)]/40 focus:bg-white/[0.05] transition-colors disabled:opacity-50"
      />
    </label>
  )
}

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center py-6">
      <div className="w-14 h-14 rounded-full bg-emerald-400/15 border border-emerald-400/30 mx-auto flex items-center justify-center mb-4">
        <CheckCircle2 size={26} className="text-emerald-400" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">Request sent</h3>
      <p className="text-sm text-white/55 max-w-xs mx-auto">
        Thanks &mdash; we got it. Someone will reach out within one
        business day to set up your walkthrough.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-7 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/80 hover:text-white border border-white/15 hover:border-white/30 rounded-lg transition-colors"
      >
        Close
      </button>
    </div>
  )
}

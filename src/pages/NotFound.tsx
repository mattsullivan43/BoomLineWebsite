import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-6 pt-32 pb-24">
      <div className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">404</p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-white mb-6">
          Page not found
        </h1>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium bg-white text-black rounded-lg hover:bg-[var(--color-yellow)] transition-colors"
        >
          Back to home
        </Link>
      </div>
    </section>
  )
}

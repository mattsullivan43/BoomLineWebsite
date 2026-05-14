import { Link } from 'react-router-dom'
import logo from '../assets/boomline-logo.png'
import { useDemo } from '../contexts/DemoContext'

export default function Footer() {
  const { open: openDemo } = useDemo()
  return (
    <footer className="relative border-t border-white/5 bg-[var(--color-bg)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Boomline" className="h-12 w-12 object-contain" />
              <span className="font-semibold text-white text-lg tracking-tight">
                Boomline
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed max-w-sm">
              Purpose-built crane rental software. Built by people who run
              cranes.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-white/60">
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li>
                <button
                  type="button"
                  onClick={openDemo}
                  className="hover:text-white text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-mono text-[11px] uppercase tracking-widest text-white/40 mb-4">
              Get started
            </h4>
            <button
              type="button"
              onClick={openDemo}
              className="inline-flex items-center gap-2 text-sm font-medium bg-white text-black rounded-lg px-4 py-2 hover:bg-[var(--color-yellow)] transition-colors"
            >
              Book a demo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <p className="mt-4 text-xs text-white/40">
              No commitment. 15-minute call.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between pt-8 border-t border-white/5">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Boomline. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs">
            <a
              href="https://boomline.app/privacy"
              target="_blank"
              rel="noreferrer noopener"
              className="text-white/40 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="https://boomline.app"
              target="_blank"
              rel="noreferrer noopener"
              className="text-white/40 hover:text-white transition-colors font-mono uppercase tracking-widest"
            >
              boomline.app
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

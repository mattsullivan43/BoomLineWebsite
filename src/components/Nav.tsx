import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/boomline-logo.png'
import { useDemo } from '../contexts/DemoContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/about', label: 'About' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { open: openDemo } = useDemo()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-3 pointer-events-none">
      <div
        className={[
          'pointer-events-auto max-w-6xl mx-auto flex items-center justify-between',
          'rounded-2xl border px-4 sm:px-5 py-2.5',
          'transition-all duration-300',
          scrolled
            ? 'border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl shadow-black/50'
            : 'border-white/5 bg-black/30 backdrop-blur-md',
        ].join(' ')}
      >
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="Boomline" className="h-9 w-9 object-contain" />
          <span className="font-semibold tracking-tight text-white text-[15px]">
            Boomline
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to + link.label}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                [
                  'px-3 py-1.5 text-sm rounded-lg transition-colors',
                  isActive && !link.to.includes('#')
                    ? 'text-white'
                    : 'text-white/60 hover:text-white',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={openDemo}
            className="px-4 py-2 text-sm font-medium bg-white text-black rounded-lg hover:bg-[var(--color-yellow)] transition-colors"
          >
            Book a demo
          </button>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 -mr-1 text-white/80"
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <>
                <path d="M3 7h18" strokeLinecap="round" />
                <path d="M3 17h18" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="pointer-events-auto md:hidden mt-2 max-w-6xl mx-auto rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-4 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={'m-' + link.to + link.label}
              to={link.to}
              className="px-3 py-2.5 text-sm text-white/80 hover:text-white rounded-lg"
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-white/10 my-2" />
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              openDemo()
            }}
            className="px-3 py-2.5 text-sm font-medium bg-white text-black rounded-lg text-center"
          >
            Book a demo
          </button>
        </div>
      )}
    </header>
  )
}

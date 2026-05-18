import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import AvailabilityBand from './AvailabilityBand'
import { DemoProvider } from '../contexts/DemoContext'

export default function Layout() {
  const { pathname } = useLocation()

  // Reset scroll position on every route change.
  // Skip if the URL has a #hash (anchor links should still scroll to their target).
  useEffect(() => {
    if (window.location.hash) return
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <DemoProvider>
      <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
        <Nav />
        <main className="flex-1">
          <Outlet />
        </main>
        <AvailabilityBand />
        <Footer />
      </div>
    </DemoProvider>
  )
}

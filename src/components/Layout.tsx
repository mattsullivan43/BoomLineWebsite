import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import AvailabilityBand from './AvailabilityBand'
import { DemoProvider } from '../contexts/DemoContext'

export default function Layout() {
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

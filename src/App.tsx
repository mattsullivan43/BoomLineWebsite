import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import RouteMeta from './components/RouteMeta'

// Each page is its own chunk so visitors download only the page they open.
// scripts/prerender.mjs adds a <link rel="modulepreload"> for the page's chunk.
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Features = lazy(() => import('./pages/Features'))
const Terms = lazy(() => import('./pages/Terms'))
const NotFound = lazy(() => import('./pages/NotFound'))
const CraneDispatchSoftware = lazy(() => import('./pages/solutions/CraneDispatchSoftware'))
const CraneFieldTicketSoftware = lazy(() => import('./pages/solutions/CraneFieldTicketSoftware'))
const CraneCertificationTracking = lazy(() => import('./pages/solutions/CraneCertificationTracking'))
const CraneInspectionSoftware = lazy(() => import('./pages/solutions/CraneInspectionSoftware'))
const CraneMaintenanceSoftware = lazy(() => import('./pages/solutions/CraneMaintenanceSoftware'))

export default function App() {
  return (
    <>
      <RouteMeta />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/crane-dispatch-software" element={<CraneDispatchSoftware />} />
          <Route path="/crane-field-ticket-software" element={<CraneFieldTicketSoftware />} />
          <Route path="/crane-certification-tracking" element={<CraneCertificationTracking />} />
          <Route path="/crane-inspection-software" element={<CraneInspectionSoftware />} />
          <Route path="/crane-maintenance-software" element={<CraneMaintenanceSoftware />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route
          path="/terms"
          element={
            <Suspense fallback={null}>
              <Terms />
            </Suspense>
          }
        />
      </Routes>
    </>
  )
}

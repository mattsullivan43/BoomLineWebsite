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

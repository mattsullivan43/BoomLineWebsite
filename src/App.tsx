import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import RouteMeta from './components/RouteMeta'
import Home from './pages/Home'
import About from './pages/About'
import Features from './pages/Features'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <RouteMeta />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </>
  )
}

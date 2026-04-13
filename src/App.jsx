import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Portal from './pages/portal/Portal'
import Cours from './pages/cours/Cours'
import Quiz from './pages/quiz/Quiz'
import Ressources from './pages/ressources/Ressources'
import Crise from './pages/crise/Crise'
import Journal from './pages/journal/Journal'
import Profil from './pages/profil/Profil'
import Login from './pages/auth/Login'
import Onboarding from './pages/onboarding/Onboarding'
import './App.css'

function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  // First-launch redirect → /onboarding
  useEffect(() => {
    if (location.pathname === '/onboarding') return
    let done = false
    try {
      const raw = localStorage.getItem('cockpit_onboarding')
      if (raw) done = !!JSON.parse(raw)?.onboardingDone
    } catch {
      // ignore
    }
    if (!done) navigate('/onboarding', { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<Portal />} />
        <Route path="/cours" element={<Cours />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/ressources" element={<Ressources />} />
        <Route path="/crise" element={<Crise />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

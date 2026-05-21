import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from './lib/AppContext'
import { restore, save, migrateOldKeys } from './lib/sync'
import Portal from './pages/portal/Portal'
import Cours from './pages/cours/Cours'
import Lecon from './pages/cours/Lecon'
import Quiz from './pages/quiz/Quiz'
import QuizDetail from './pages/quiz/QuizDetail'
import Ressources from './pages/ressources/Ressources'
import Crise from './pages/crise/Crise'
import Journal from './pages/journal/Journal'
import Profil from './pages/profil/Profil'
import Login from './pages/auth/Login'
import Onboarding from './pages/onboarding/Onboarding'
import Access from './pages/access/Access'
import DesktopShell from './components/layout/DesktopShell'
import './App.css'

function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [hasAccess, setHasAccess] = useState(() => !!localStorage.getItem('cockpit_access'))
  const [appData, setAppData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!hasAccess) { setLoading(false); return }
    // Migrate old keys first (sync)
    migrateOldKeys()
    // Restore from local + Supabase
    restore().then((data) => {
      setAppData(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [hasAccess])

  // Onboarding redirect
  useEffect(() => {
    if (!hasAccess) return
    if (loading || !appData) return
    if (location.pathname === '/onboarding') return
    if (!appData.onboarding?.onboardingDone) {
      navigate('/onboarding', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, appData, hasAccess])

  const saveData = (updates) =>
    save(updates).then((newData) => { setAppData(newData); return newData })

  // Access gate — bloque tout tant qu'aucun code valide n'a été saisi
  if (!hasAccess) {
    return (
      <Access onSuccess={() => {
        setHasAccess(true)
        navigate('/', { replace: true })
      }} />
    )
  }

  if (loading) return <div style={{ background: '#1C1B2E', minHeight: '100vh' }} />

  return (
    <AppContext.Provider value={{ appData, saveData }}>
      <DesktopShell>
        <Routes>
          <Route path="/" element={<Portal />} />
          <Route path="/cours" element={<Cours />} />
          <Route path="/cours/:id" element={<Lecon />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/:id" element={<QuizDetail />} />
          <Route path="/ressources" element={<Ressources />} />
          <Route path="/crise" element={<Crise />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
        </Routes>
      </DesktopShell>
    </AppContext.Provider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

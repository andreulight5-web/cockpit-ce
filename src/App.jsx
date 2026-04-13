import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from './lib/AppContext'
import { restore, save, migrateOldKeys } from './lib/sync'
import Portal from './pages/portal/Portal'
import Cours from './pages/cours/Cours'
import Lecon from './pages/cours/Lecon'
import Annexes from './pages/annexes/Annexes'
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
  const [appData, setAppData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Migrate old keys first (sync)
    migrateOldKeys()
    // Restore from local + Supabase
    restore().then((data) => {
      setAppData(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  // Onboarding redirect
  useEffect(() => {
    if (loading || !appData) return
    if (location.pathname === '/onboarding') return
    if (!appData.onboarding?.onboardingDone) {
      navigate('/onboarding', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, appData])

  const saveData = (updates) =>
    save(updates).then((newData) => { setAppData(newData); return newData })

  if (loading) return <div style={{ background: '#1C1B2E', minHeight: '100vh' }} />

  return (
    <AppContext.Provider value={{ appData, saveData }}>
      <Routes>
        <Route path="/" element={<Portal />} />
        <Route path="/cours" element={<Cours />} />
        <Route path="/cours/:id" element={<Lecon />} />
        <Route path="/annexes" element={<Annexes />} />
        <Route path="/annexes/:id" element={<Lecon />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/ressources" element={<Ressources />} />
        <Route path="/crise" element={<Crise />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
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

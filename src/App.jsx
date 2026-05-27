import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from './lib/AppContext'
import { restore, save, migrateOldKeys } from './lib/sync'
import Accueil from './pages/accueil/Accueil'
import Formation from './pages/formation/Formation'
import Lecon from './pages/cours/Lecon'
import Quiz from './pages/quiz/Quiz'
import QuizDetail from './pages/quiz/QuizDetail'
import QuizOne from './pages/quiz/QuizOne'
import QuizTwo from './pages/quiz/QuizTwo'
import QuizThree from './pages/quiz/QuizThree'
import Outils from './pages/outils/Outils'
import Aide from './pages/aide/Aide'
import Crise from './pages/crise/Crise'
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
        navigate('/accueil', { replace: true })
      }} />
    )
  }

  if (loading) return <div style={{ background: '#1C1B2E', minHeight: '100vh' }} />

  return (
    <AppContext.Provider value={{ appData, saveData }}>
      <DesktopShell>
        <Routes>
          {/* 4 tabs principaux */}
          <Route path="/accueil"        element={<Accueil />} />
          <Route path="/formation"      element={<Formation />} />
          <Route path="/formation/:id"  element={<Lecon />} />
          <Route path="/outils"         element={<Outils />} />
          <Route path="/aide"           element={<Aide />} />

          {/* Quiz : accessible depuis Outils */}
          <Route path="/quiz"           element={<Quiz />} />
          <Route path="/quiz/1"         element={<QuizOne />} />
          <Route path="/quiz/2"         element={<QuizTwo />} />
          <Route path="/quiz/3"         element={<QuizThree />} />
          <Route path="/quiz/:id"       element={<QuizDetail />} />

          {/* Outils internes */}
          <Route path="/crise"          element={<Crise />} />
          <Route path="/login"          element={<Login />} />
          <Route path="/onboarding"     element={<Onboarding />} />

          {/* Alias d'anciennes routes (compat liens externes / emails) */}
          <Route path="/"               element={<Navigate to="/accueil" replace />} />
          <Route path="/cours"          element={<Navigate to="/formation" replace />} />
          <Route path="/cours/:id"      element={<RedirectLecon />} />
          <Route path="/ressources"     element={<Navigate to="/outils" replace />} />
          <Route path="/journal"        element={<Navigate to="/accueil" replace />} />
          <Route path="/profil"         element={<Navigate to="/accueil" replace />} />

          {/* Catch-all */}
          <Route path="*"               element={<Navigate to="/accueil" replace />} />
        </Routes>
      </DesktopShell>
    </AppContext.Provider>
  )
}

function RedirectLecon() {
  const { pathname } = useLocation()
  return <Navigate to={pathname.replace('/cours/', '/formation/')} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

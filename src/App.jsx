import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import BottomNav from './components/layout/BottomNav'
import Portal from './pages/portal/Portal'
import Cours from './pages/cours/Cours'
import Quiz from './pages/quiz/Quiz'
import Ressources from './pages/ressources/Ressources'
import Crise from './pages/crise/Crise'
import Journal from './pages/journal/Journal'
import Profil from './pages/profil/Profil'
import './App.css'

function AppLayout() {
  const location = useLocation()
  const hiddenNavRoutes = ['/crise']
  const showNav = !hiddenNavRoutes.includes(location.pathname)

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
      </Routes>
      {showNav && <BottomNav />}
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

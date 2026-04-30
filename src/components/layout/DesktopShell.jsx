import { useLocation } from 'react-router-dom'
import { useDesktop } from '../../hooks/useDesktop'
import Sidebar from './Sidebar'

// Routes qui restent en plein écran (pas de sidebar) — onboarding et auth.
const FULLSCREEN_ROUTES = new Set(['/onboarding', '/login'])

export default function DesktopShell({ children }) {
  const isDesktop = useDesktop(1024)
  const { pathname } = useLocation()
  const fullscreen = FULLSCREEN_ROUTES.has(pathname)

  if (!isDesktop || fullscreen) return children

  return (
    <div style={s.shell}>
      <Sidebar />
      <main style={s.main}>{children}</main>
    </div>
  )
}

const s = {
  shell: { display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '100vh', width: '100%' },
  main: { minWidth: 0, minHeight: '100vh', background: '#1C1B2E', overflowX: 'hidden' },
}

import { useLocation } from 'react-router-dom'
import { useDesktop } from '../../hooks/useDesktop'
import Sidebar from './Sidebar'
import BottomNav from './BottomNav'

// Routes plein écran : ni sidebar (desktop) ni bottom nav (mobile)
const FULLSCREEN_ROUTES = new Set(['/onboarding', '/login', '/access'])

export default function DesktopShell({ children }) {
  const isDesktop = useDesktop(1024)
  const { pathname } = useLocation()
  const fullscreen = FULLSCREEN_ROUTES.has(pathname)

  if (fullscreen) return children

  if (isDesktop) {
    return (
      <div style={s.shell}>
        <Sidebar />
        <main style={s.main}>{children}</main>
      </div>
    )
  }

  // Mobile : children + bottom nav fixe + padding-bottom pour ne pas masquer le contenu
  return (
    <div style={s.mobileWrap}>
      <div style={s.mobileContent}>{children}</div>
      <BottomNav />
    </div>
  )
}

const s = {
  shell: { display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '100vh', width: '100%' },
  main: { minWidth: 0, minHeight: '100vh', background: '#1C1B2E', overflowX: 'hidden' },
  mobileWrap: { minHeight: '100dvh' },
  mobileContent: { paddingBottom: 'calc(60px + env(safe-area-inset-bottom))' },
}

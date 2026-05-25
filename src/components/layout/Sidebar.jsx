import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../../lib/AppContext'
import logoCE from '../../assets/logo-ce.png'

const NAV_ITEMS = [
  { to: '/',           icon: '🏠', label: 'Accueil',  exact: true },
  { to: '/cours',      icon: '📚', label: 'Cours' },
  { to: '/quiz',       icon: '🎯', label: 'Quiz' },
  { to: '/ressources', icon: '🛠️', label: 'Outils' },
]

export default function Sidebar() {
  const { appData } = useContext(AppContext) || {}
  const prenomParent = appData?.onboarding?.prenomParent || 'Parent'
  const leconsDone = (appData?.lecons_done || []).filter((id) => Number(id) >= 1 && Number(id) <= 5).length
  const formationPct = Math.round((leconsDone / 5) * 100)

  let quizDone = 0
  try { quizDone = JSON.parse(localStorage.getItem('cockpit_quiz_done') || '[]').length } catch {}
  const quizPct = Math.round((quizDone / 5) * 100)

  return (
    <aside style={s.sidebar}>
      {/* Brand */}
      <div style={s.brand}>
        <div style={s.logoWrap}>
          <img src={logoCE} alt="" style={s.logoImg} draggable={false} />
        </div>
        <div>
          <div style={s.brandTitle}>Cockpit</div>
          <div style={s.brandTitle2}>Crises <span style={{ color: '#F5E06D' }}>⚡</span></div>
        </div>
      </div>

      {/* Hello */}
      <div style={s.hello}>
        <div style={s.helloLabel}>Bonjour</div>
        <div style={s.helloName}>{prenomParent}</div>
      </div>

      {/* Nav */}
      <nav style={s.nav}>
        <div style={s.navHead}>Navigation</div>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            style={({ isActive }) => ({ ...s.navLink, ...(isActive ? s.navLinkActive : null) })}
          >
            <span style={s.navIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Progression */}
      <div style={s.progressBlock}>
        <div style={s.navHead}>Progression</div>

        <div style={s.progRow}>
          <div style={s.progRowHead}>
            <span style={s.progLabel}>Formation</span>
            <span style={{ ...s.progPct, color: '#C0506A' }}>{formationPct}%</span>
          </div>
          <div style={s.progBar}>
            <div style={{ ...s.progFill, width: `${formationPct}%`, background: '#C0506A' }} />
          </div>
          <div style={s.progSub}>{leconsDone}/5 leçons</div>
        </div>

        <div style={s.progRow}>
          <div style={s.progRowHead}>
            <span style={s.progLabel}>Quiz</span>
            <span style={{ ...s.progPct, color: '#2A9490' }}>{quizPct}%</span>
          </div>
          <div style={s.progBar}>
            <div style={{ ...s.progFill, width: `${quizPct}%`, background: '#2A9490' }} />
          </div>
          <div style={s.progSub}>{quizDone}/5 quiz</div>
        </div>

        <div style={s.streak}>🔥 4 jours · Semaine 2/4</div>
      </div>
    </aside>
  )
}

const s = {
  sidebar: {
    width: 240,
    minHeight: '100vh',
    background: '#16152A',
    borderRight: '1px solid rgba(255,255,255,0.06)',
    padding: '20px 16px 24px',
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
    overflowY: 'auto',
  },

  brand: { display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.06)' },
  logoWrap: { width: 38, height: 38, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: 'rgba(245,224,109,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  brandTitle: { fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.85)', lineHeight: 1.1 },
  brandTitle2: { fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 800, color: '#fff', lineHeight: 1.1 },

  hello: { padding: '14px 4px 4px' },
  helloLabel: { fontFamily: "'Caveat', cursive", fontSize: 18, color: '#F5E06D' },
  helloName: { fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 18, color: '#fff', marginTop: 2 },

  nav: { display: 'flex', flexDirection: 'column', gap: 2, marginTop: 14 },
  navHead: { fontFamily: 'Poppins, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: 1.6, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', padding: '12px 8px 6px' },
  navLink: { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'background 0.15s, color 0.15s', border: '1px solid transparent' },
  navLinkActive: { background: 'linear-gradient(90deg, rgba(245,224,109,0.16), rgba(245,224,109,0.04))', color: '#F5E06D', fontWeight: 600, borderColor: 'rgba(245,224,109,0.25)' },
  navIcon: { fontSize: 16, width: 22, textAlign: 'center', flexShrink: 0 },

  progressBlock: { marginTop: 'auto', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' },
  progRow: { padding: '8px 4px' },
  progRowHead: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  progLabel: { fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 500 },
  progPct: { fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 700 },
  progBar: { height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden' },
  progFill: { height: '100%', borderRadius: 99, transition: 'width 0.4s' },
  progSub: { fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 4 },

  streak: { display: 'inline-block', marginTop: 12, padding: '6px 12px', borderRadius: 20, background: 'rgba(245,224,109,0.10)', border: '1px solid rgba(245,224,109,0.2)', fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#F5E06D' },
}

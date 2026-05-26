import { NavLink } from 'react-router-dom'

const NAV = [
  { to: '/accueil',   icon: '🏠', label: 'Accueil' },
  { to: '/formation', icon: '📚', label: 'Formation' },
  { to: '/outils',    icon: '🧰', label: 'Outils' },
  { to: '/aide',      icon: '💬', label: 'Aide' },
]

export default function BottomNav() {
  return (
    <nav style={s.bar}>
      {NAV.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          style={({ isActive }) => ({ ...s.tab, ...(isActive ? s.tabActive : null) })}
        >
          <span style={s.icon}>{item.icon}</span>
          <span style={s.label}>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

const s = {
  bar: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    height: 'calc(60px + env(safe-area-inset-bottom))',
    paddingBottom: 'env(safe-area-inset-bottom)',
    background: '#FFFFFF',
    borderTop: '1px solid #E5E5E5',
    display: 'flex',
    alignItems: 'stretch',
    zIndex: 100,
  },
  tab: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    textDecoration: 'none',
    color: '#999',
    transition: 'color 0.15s',
    paddingTop: 6,
  },
  tabActive: {
    color: '#2A9490',
  },
  icon: { fontSize: 22, lineHeight: 1 },
  label: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 10,
    fontWeight: 600,
    lineHeight: 1.2,
  },
}

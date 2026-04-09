import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', label: 'Accueil', icon: '🏠' },
  { to: '/crise', label: 'Crise', icon: '⚡' },
  { to: '/journal', label: 'Journal', icon: '📓' },
  { to: '/profil', label: 'Profil', icon: '👩' },
]

export default function BottomNav() {
  return (
    <nav style={styles.nav}>
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          style={({ isActive }) => ({
            ...styles.tab,
            color: isActive ? 'var(--teal)' : 'var(--gray-400)',
          })}
        >
          <span style={styles.icon}>{tab.icon}</span>
          <span style={styles.label}>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

const styles = {
  nav: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: 430,
    height: 72,
    background: 'var(--white)',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTop: '1px solid var(--gray-200)',
    zIndex: 100,
    paddingBottom: 'env(safe-area-inset-bottom)',
  },
  tab: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    textDecoration: 'none',
    fontSize: '0.6875rem',
    fontWeight: 600,
    transition: 'color 0.2s',
  },
  icon: {
    fontSize: '1.5rem',
  },
  label: {
    fontFamily: 'var(--font-body)',
  },
}

import { useContext } from 'react'
import { AppContext } from '../../lib/AppContext'

export default function Profil() {
  const { appData } = useContext(AppContext)
  const prenomParent = appData?.onboarding?.prenomParent || 'Maman'
  const leconsCount = (appData?.lecons_done || []).length
  const xp = appData?.xp_total || 0
  const badgesCount = (appData?.badges || []).length

  return (
    <div className="page">
      <div style={styles.header}>
        <span style={{ fontSize: '3.5rem' }}>👩</span>
        <h1 style={{ color: 'var(--white)', marginTop: 'var(--sp-sm)' }}>{prenomParent}</h1>
        <p style={{ color: 'var(--mint)', fontSize: '0.8125rem' }}>
          Cerveau Électrique — Membre
        </p>
      </div>

      <div className="page-content">
        <div className="card fade-up" style={{ marginBottom: 'var(--sp-md)' }}>
          <h3>Statistiques</h3>
          <div style={styles.stats}>
            <div style={styles.stat}>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--teal)' }}>{leconsCount}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>Leçons terminées</span>
            </div>
            <div style={styles.stat}>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--pink)' }}>{xp}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>XP gagnés</span>
            </div>
            <div style={styles.stat}>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--orange)' }}>{badgesCount}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>Badges</span>
            </div>
          </div>
        </div>

        <div className="card fade-up fade-up-d1" style={{ marginBottom: 'var(--sp-md)' }}>
          <h3 style={{ marginBottom: 'var(--sp-md)' }}>Paramètres</h3>
          {['Notifications', 'Mode duo', 'Thème sombre', 'Langue'].map((item) => (
            <div key={item} style={styles.settingRow}>
              <span>{item}</span>
              <span style={{ color: 'var(--gray-400)' }}>→</span>
            </div>
          ))}
        </div>

        <button className="btn btn-outline" style={{ width: '100%' }}>
          Se déconnecter
        </button>
      </div>
    </div>
  )
}

const styles = {
  header: {
    background: 'var(--navy)',
    padding: 'var(--sp-2xl) var(--sp-md) var(--sp-lg)',
    textAlign: 'center',
    borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 'var(--sp-md)',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  settingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 'var(--sp-sm) 0',
    borderBottom: '1px solid var(--gray-200)',
    fontSize: '0.9375rem',
  },
}

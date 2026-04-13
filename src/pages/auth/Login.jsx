import { useContext, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { AppContext } from '../../lib/AppContext'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn, signUp } = useAuth()
  const { appData } = useContext(AppContext)

  const initialMode =
    new URLSearchParams(location.search).get('mode') === 'signup'
      ? 'signup'
      : 'signin'

  const [mode, setMode] = useState(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [info, setInfo] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setInfo(null)
    setLoading(true)

    let result
    if (mode === 'signin') {
      result = await signIn(email, password)
    } else {
      // Pass onboarding metadata so it lands in user_metadata
      // (used by Supabase email templates via {{ .Data.prenomParent }})
      const metadata = appData?.onboarding || null
      result = await signUp(email, password, metadata)
    }
    const { data, error: err } = result
    setLoading(false)

    if (err) {
      setError(err.message)
      return
    }

    if (mode === 'signup' && !data.session) {
      setInfo('Vérifie ta boîte mail pour confirmer ton compte.')
      return
    }
    navigate('/')
  }

  return (
    <div style={styles.page}>
      <Link to="/" style={styles.back}>← Retour</Link>

      <div style={styles.brand} className="fade-up">
        <div style={styles.logo}>⚡ CE</div>
        <h1 style={{ color: 'var(--white)', fontFamily: 'var(--font-heading)', fontSize: '1.625rem', marginTop: 12 }}>
          Cockpit <span style={{ color: '#F5E06D' }}>Crises</span>
        </h1>
        <p style={{ color: 'var(--mint)', fontSize: '0.875rem', marginTop: 4 }}>
          {mode === 'signin' ? 'Heureux de te revoir !' : 'Crée ton compte parent'}
        </p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form} className="fade-up fade-up-d1">
        <label style={styles.label}>
          Email
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="marie@exemple.fr"
          />
        </label>

        <label style={styles.label}>
          Mot de passe
          <input
            type="password"
            required
            minLength={6}
            autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="••••••••"
          />
        </label>

        {error && <p style={styles.error}>⚠️ {error}</p>}
        {info && <p style={styles.info}>✉️ {info}</p>}

        <button
          type="submit"
          className="btn btn-teal"
          style={{ width: '100%', padding: '14px 24px', fontSize: '1rem' }}
          disabled={loading}
        >
          {loading
            ? '...'
            : mode === 'signin'
              ? 'Se connecter'
              : 'Créer mon compte'}
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === 'signin' ? 'signup' : 'signin')
            setError(null)
            setInfo(null)
          }}
          style={styles.toggle}
        >
          {mode === 'signin'
            ? 'Pas encore de compte ? S\'inscrire'
            : 'Déjà inscrit ? Se connecter'}
        </button>
      </form>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100dvh',
    background: 'var(--navy)',
    padding: '48px 20px 32px',
    display: 'flex',
    flexDirection: 'column',
  },
  back: {
    color: 'var(--mint)',
    fontSize: '0.875rem',
    textDecoration: 'none',
    marginBottom: 24,
  },
  brand: {
    textAlign: 'center',
    marginBottom: 32,
  },
  logo: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: '1.5rem',
    color: 'var(--orange)',
  },
  form: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    color: 'var(--mint)',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 10,
    padding: '12px 14px',
    color: 'var(--white)',
    fontSize: '1rem',
    fontFamily: 'var(--font-body)',
    textTransform: 'none',
    letterSpacing: 0,
    fontWeight: 400,
    outline: 'none',
  },
  error: {
    color: '#FF9A85',
    fontSize: '0.8125rem',
    background: 'rgba(255,107,74,0.1)',
    border: '1px solid rgba(255,107,74,0.3)',
    borderRadius: 8,
    padding: '8px 12px',
  },
  info: {
    color: 'var(--mint)',
    fontSize: '0.8125rem',
    background: 'rgba(13,147,115,0.15)',
    border: '1px solid rgba(13,147,115,0.4)',
    borderRadius: 8,
    padding: '8px 12px',
  },
  toggle: {
    color: 'var(--mint)',
    fontSize: '0.8125rem',
    fontWeight: 500,
    textAlign: 'center',
    padding: 8,
  },
}

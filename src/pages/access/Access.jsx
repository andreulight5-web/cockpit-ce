import { useState } from 'react'
import logoCE from '../../assets/logo-ce.png'
import { supabase } from '../../lib/supabase'

export default function Access({ onSuccess }) {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = code.trim().toUpperCase()
    if (!trimmed) return
    setError(null)
    setLoading(true)
    try {
      const { data, error: rpcErr } = await supabase.rpc('verify_access_code', {
        input_code: trimmed,
      })
      if (rpcErr) {
        setError('Erreur réseau. Réessaie dans un instant.')
        setLoading(false)
        return
      }
      // Le code est valide dans 2 cas : nouvellement activé OU déjà activé
      // (l'utilisateur se reconnecte depuis un autre appareil).
      if (data?.status === 'activated' || data?.status === 'already_used') {
        localStorage.setItem(
          'cockpit_access',
          JSON.stringify({
            code: data.code ?? trimmed,
            activatedAt: new Date().toISOString(),
          })
        )
        onSuccess?.()
        return
      }
      setError('Code invalide. Vérifie ta saisie.')
    } catch {
      setError('Erreur réseau. Réessaie dans un instant.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.page}>
      <div style={s.inner}>
        <img src={logoCE} alt="Cerveaux Électriques" style={s.logo} />

        <div style={s.brand}>
          Cerveaux <span style={{ color: '#F5E06D' }}>Électriques</span>
        </div>

        <h1 style={s.title}>Entre ton code d'accès</h1>
        <p style={s.sub}>Le code se trouve dans l'email reçu après ton achat.</p>

        <form onSubmit={handleSubmit} style={s.form}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="CE-CALME-7K2P"
            autoCapitalize="characters"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            style={s.input}
            disabled={loading}
          />

          {error && <div style={s.error}>{error}</div>}

          <button type="submit" disabled={loading || !code.trim()} style={{
            ...s.button,
            opacity: loading || !code.trim() ? 0.5 : 1,
          }}>
            {loading ? 'Vérification…' : 'Accéder à mon Cockpit'}
          </button>
        </form>

        <a
          href="https://cerveau-electrique.fr"
          target="_blank"
          rel="noopener noreferrer"
          style={s.buyLink}
        >
          Tu n'as pas de code ? <span style={s.buyLinkAccent}>Acheter le Cockpit →</span>
        </a>
      </div>
    </div>
  )
}

const s = {
  page: {
    position: 'fixed',
    inset: 0,
    background: '#1C1B2E',
    minHeight: '100dvh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 20px',
    overflowY: 'auto',
    zIndex: 9999,
  },
  inner: {
    width: '100%',
    maxWidth: 380,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: 96,
    height: 96,
    objectFit: 'contain',
    marginBottom: 14,
  },
  brand: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 13,
    fontWeight: 700,
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 0.5,
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: 26,
    color: '#FFFFFF',
    margin: 0,
    textAlign: 'center',
    lineHeight: 1.15,
  },
  sub: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    margin: '10px 0 24px',
    textAlign: 'center',
    lineHeight: 1.4,
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  input: {
    width: '100%',
    padding: '16px 18px',
    border: '2px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    background: 'rgba(255,255,255,0.06)',
    color: '#FFFFFF',
    fontFamily: 'Poppins, sans-serif',
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 1.2,
    textAlign: 'center',
    outline: 'none',
    boxSizing: 'border-box',
  },
  error: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 13,
    color: '#FFB1B1',
    background: 'rgba(192,80,106,0.18)',
    border: '1px solid rgba(192,80,106,0.4)',
    borderRadius: 8,
    padding: '10px 12px',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    padding: '16px 18px',
    border: 'none',
    borderRadius: 50,
    background: '#F5E06D',
    color: '#1C1B2E',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    minHeight: 52,
  },
  buyLink: {
    marginTop: 28,
    fontFamily: 'Inter, sans-serif',
    fontSize: 13,
    color: 'rgba(255,255,255,0.55)',
    textDecoration: 'none',
    textAlign: 'center',
  },
  buyLinkAccent: {
    color: '#F5E06D',
    fontWeight: 600,
  },
}

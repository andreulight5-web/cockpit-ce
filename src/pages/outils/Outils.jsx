import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const triggerDownload = async (url) => {
  const filename = url.split('/').pop()
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error('fetch failed')
    const blob = await res.blob()
    const blobUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = filename
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1500)
  } catch {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

const TOOLS = [
  { id: 'bienvenue',  emoji: '📘', label: 'Bienvenue digital',     hint: 'Guide de démarrage',           color: '#1C1B2E', accent: '#F5E06D', action: { type: 'pdf',  url: '/pdfs/bienvenue-digital.pdf' } },
  { id: 'phrasesStop',emoji: '✋', label: 'Phrases STOP',           hint: '10 contextes',                 color: '#7A2040', accent: '#fff',    action: { type: 'modal' } },
  { id: 'cards',      emoji: '🃏', label: 'Cards Émotions',         hint: '9 cartes à pointer',           color: '#C0506A', accent: '#fff',    action: { type: 'pdf',  url: '/pdfs/cards-emotions.pdf' } },
  { id: 'thermo',     emoji: '🌡️', label: 'Thermomètre',            hint: 'À afficher au mur',            color: '#FF6B4A', accent: '#fff',    action: { type: 'pdf',  url: '/pdfs/thermometre-emotions.pdf' } },
  { id: 'kit',        emoji: '🏠', label: 'Kit Anti-Crise',         hint: 'Coin calme + déclencheurs',    color: '#2A9490', accent: '#fff',    action: { type: 'pdf',  url: '/pdfs/kit-anti-crise.pdf' } },
  { id: 'journal',    emoji: '📓', label: 'Journal des crises',     hint: 'Planche 4 fiches',             color: '#5D4192', accent: '#fff',    action: { type: 'pdf',  url: '/pdfs/journal-simple-planche.pdf' } },
  { id: 'victoires',  emoji: '🏆', label: 'Système de Victoires',   hint: 'Cartes + tableau + contrat',   color: '#A88E1F', accent: '#fff',    action: { type: 'pdf',  url: '/pdfs/systeme-victoires.pdf' } },
  { id: 'quiz',       emoji: '🎯', label: 'Quiz Émotions',          hint: '5 quiz · 10 min',              color: '#3E8E5E', accent: '#fff',    action: { type: 'route', url: '/quiz' } },
]

const STOP_LIST = [
  { file: 'phrases-stop-deck.pdf',        emoji: '🃏', label: 'Deck à découper',     desc: '9 cartes A4 pour porte-clé' },
  { file: 'phrases-stop.pdf',             emoji: '🧊', label: 'Universel (frigo)',   desc: 'Les 3 phrases passe-partout' },
  { file: 'phrases-stop-devoirs.pdf',     emoji: '🍝', label: 'Devoirs',             desc: 'La guerre du soir' },
  { file: 'phrases-stop-transitions.pdf', emoji: '⏱️', label: 'Transitions',         desc: 'Écran, douche, départ' },
  { file: 'phrases-stop-public.pdf',      emoji: '🛒', label: 'En public',           desc: 'Supermarché, restau, famille' },
  { file: 'phrases-stop-estime.pdf',      emoji: '💔', label: '« Je suis nul »',      desc: 'Quand son estime s\'effondre' },
  { file: 'phrases-stop-fratrie.pdf',     emoji: '👫', label: 'Fratrie',             desc: '« Tu préfères ma sœur »' },
  { file: 'phrases-stop-apres.pdf',       emoji: '🌱', label: 'Après la crise',      desc: 'Réparation, retour au calme' },
  { file: 'phrases-stop-parent.pdf',      emoji: '🫂', label: 'Quand TU craques',    desc: 'Le mantra parent' },
  { file: 'phrases-stop-sensoriel.pdf',   emoji: '🔊', label: 'Surcharge sensorielle', desc: 'Bruit, lumière, étiquette' },
]

export default function Outils() {
  const navigate = useNavigate()
  const [stopOpen, setStopOpen] = useState(false)
  const [loadingKey, setLoadingKey] = useState(null)   // tool.id ou file.file
  const [slowLoad, setSlowLoad]     = useState(false)
  const slowTimerRef = useRef(null)

  const runDownload = async (key, url) => {
    if (loadingKey) return // évite les doubles clics
    setLoadingKey(key)
    setSlowLoad(false)
    slowTimerRef.current = setTimeout(() => setSlowLoad(true), 10000)
    try {
      await triggerDownload(url)
    } finally {
      if (slowTimerRef.current) clearTimeout(slowTimerRef.current)
      slowTimerRef.current = null
      setLoadingKey(null)
      setSlowLoad(false)
    }
  }

  const handle = (tool) => {
    if (tool.action.type === 'modal') return setStopOpen(true)
    if (tool.action.type === 'route') return navigate(tool.action.url)
    if (tool.action.type === 'pdf')   return runDownload(tool.id, tool.action.url)
  }

  return (
    <div style={s.page}>
      <header style={s.header}>
        <h1 style={s.title}>Mes Outils</h1>
        <p style={s.sub}>Tous tes PDFs et le quiz, en un coup d'œil.</p>
      </header>

      <div style={s.grid}>
        {TOOLS.map((t) => {
          const isLoading = loadingKey === t.id
          const isDisabled = !!loadingKey && !isLoading
          const ctaText = isLoading
            ? (slowLoad ? 'Encore un instant…' : 'Chargement…')
            : (t.id === 'quiz' ? '🎯 Jouer' : t.id === 'phrasesStop' ? '📂 Ouvrir' : '📥 Télécharger')

          return (
            <button
              key={t.id}
              onClick={() => handle(t)}
              disabled={isLoading || isDisabled}
              style={{
                ...s.card,
                background: t.color,
                color: t.accent,
                opacity: isDisabled ? 0.55 : 1,
                cursor: isLoading ? 'wait' : isDisabled ? 'not-allowed' : 'pointer',
              }}
            >
              <span style={s.cardEmoji}>{t.emoji}</span>
              <span style={s.cardLabel}>{t.label}</span>
              <span style={{ ...s.cardHint, color: t.accent === '#fff' ? 'rgba(255,255,255,0.7)' : 'rgba(28,27,46,0.7)' }}>{t.hint}</span>
              <span style={{ ...s.cardCta, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                {isLoading && <span className="spinner" />}
                <span>{ctaText}</span>
              </span>
            </button>
          )
        })}
      </div>

      {stopOpen && (
        <div style={s.overlay} onClick={() => setStopOpen(false)}>
          <div style={s.sheet} onClick={(e) => e.stopPropagation()} className="fade-up">
            <div style={s.sheetHead}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={s.sheetEyebrow}>BIBLIOTHÈQUE</div>
                <h3 style={s.sheetTitle}>Phrases <span style={{ color: '#C0506A' }}>STOP</span></h3>
                <p style={s.sheetSub}>Choisis le contexte. Imprime et place dans la pièce concernée.</p>
              </div>
              <button onClick={() => setStopOpen(false)} style={s.sheetClose} aria-label="Fermer">×</button>
            </div>

            <div style={s.sheetList}>
              {STOP_LIST.map((it) => {
                const isLoading = loadingKey === it.file
                const isDisabled = !!loadingKey && !isLoading
                return (
                  <button
                    key={it.file}
                    disabled={isLoading || isDisabled}
                    onClick={async () => {
                      await runDownload(it.file, `/pdfs/${it.file}`)
                      setStopOpen(false)
                    }}
                    style={{
                      ...s.sheetItem,
                      opacity: isDisabled ? 0.55 : 1,
                      cursor: isLoading ? 'wait' : isDisabled ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <span style={s.sheetItemEmoji}>{it.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                      <div style={s.sheetItemLabel}>
                        {isLoading ? (slowLoad ? 'Encore un instant…' : 'Chargement…') : it.label}
                      </div>
                      <div style={s.sheetItemDesc}>{it.desc}</div>
                    </div>
                    <span style={{ ...s.sheetItemDl, display: 'inline-flex', alignItems: 'center' }}>
                      {isLoading ? <span className="spinner" style={{ color: '#F5E06D' }} /> : '📥'}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const s = {
  page: { minHeight: '100dvh', background: '#1C1B2E', paddingBottom: 24 },
  header: { padding: '48px 20px 16px' },
  title: { fontFamily: 'Poppins, sans-serif', fontSize: 24, fontWeight: 700, color: '#fff', margin: 0 },
  sub: { fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#94A3B8', lineHeight: 1.55, margin: '8px 0 0' },

  grid: {
    padding: '12px 20px 32px',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 12,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    padding: 16,
    border: 'none',
    borderRadius: 16,
    cursor: 'pointer',
    minHeight: 150,
    textAlign: 'left',
  },
  cardEmoji: { fontSize: 32, lineHeight: 1, marginBottom: 8 },
  cardLabel: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.2,
  },
  cardHint: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 11,
    lineHeight: 1.35,
    marginTop: 2,
  },
  cardCta: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 11,
    fontWeight: 600,
    marginTop: 'auto',
    paddingTop: 12,
    opacity: 0.85,
  },

  /* Modal Phrases STOP */
  overlay: { position: 'fixed', inset: 0, background: 'rgba(10, 9, 20, 0.78)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200, padding: '20px 12px', paddingBottom: 'calc(80px + env(safe-area-inset-bottom))' },
  sheet: { width: '100%', maxWidth: 430, maxHeight: '78vh', overflow: 'hidden', background: '#16152A', borderRadius: 20, border: '1px solid rgba(245,224,109,0.18)', display: 'flex', flexDirection: 'column' },
  sheetHead: { display: 'flex', alignItems: 'flex-start', gap: 10, padding: '18px 18px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  sheetEyebrow: { fontFamily: 'Poppins, sans-serif', fontSize: 9, fontWeight: 700, color: '#F5E06D', letterSpacing: 1.8, textTransform: 'uppercase', marginBottom: 4 },
  sheetTitle: { fontFamily: 'Poppins, sans-serif', fontSize: 22, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.1 },
  sheetSub: { fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: '6px 0 0', lineHeight: 1.4 },
  sheetClose: { width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', fontSize: 22, lineHeight: 1, cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' },
  sheetList: { flex: 1, overflowY: 'auto', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 },
  sheetItem: { display: 'flex', alignItems: 'center', gap: 12, width: '100%', minHeight: 56, padding: '10px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, cursor: 'pointer', textAlign: 'left' },
  sheetItemEmoji: { fontSize: 24, width: 36, textAlign: 'center', flexShrink: 0 },
  sheetItemLabel: { fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.2 },
  sheetItemDesc: { fontFamily: 'Inter, sans-serif', fontSize: 11.5, color: '#94A3B8', marginTop: 2, lineHeight: 1.35 },
  sheetItemDl: { fontSize: 16, opacity: 0.6, flexShrink: 0, marginLeft: 4 },
}

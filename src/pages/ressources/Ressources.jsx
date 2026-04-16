import { useNavigate } from 'react-router-dom'

const SECTIONS = [
  {
    badge: '⚡ PENDANT LA CRISE', color: '#C0506A',
    items: [
      { vignetteBg: '#C0506A', icon: '🃏', tag: 'CARDS', titre: 'Cards Émotions de Lucas', desc: "L'enfant pointe ce qu'il ressent sans parler" },
      { vignetteBg: '#FF6B4A', icon: '🌡️', tag: 'AFFICHE', titre: 'Thermomètre des émotions', desc: 'À plastifier et coller dans la chambre' },
      { vignetteBg: '#7A2040', icon: '✋', tag: 'CARTE FRIGO', titre: 'Les phrases STOP', desc: '3 phrases à dire · 3 à ne jamais dire' },
    ],
  },
  {
    badge: '🛡️ AVANT LA CRISE', color: '#2A9490',
    items: [
      { vignetteBg: '#2A9490', icon: '🏠', tag: 'CHECKLIST', titre: 'Prépare le coin calme de Lucas', desc: 'À faire ensemble avant la prochaine crise' },
      { vignetteBg: '#1A5F5C', icon: '🔍', tag: 'FICHE', titre: 'Les déclencheurs de Lucas', desc: "Note les signaux avant l'explosion" },
    ],
  },
  {
    badge: '📊 APRÈS LA CRISE', color: '#F5E06D',
    items: [
      { vignetteBg: '#1C1B2E', vignetteBorder: '1px solid #F5E06D', icon: '📓', tag: 'JOURNAL', titre: 'Journal des crises', desc: 'À remplir après chaque crise pour voir les patterns' },
      { vignetteBg: '#2A2040', vignetteBorder: '1px solid #F5E06D', icon: '📅', tag: 'TRACKER', titre: 'Calendrier 30 jours', desc: 'Visualise les progrès sur un mois' },
    ],
  },
]

export default function Ressources() {
  const navigate = useNavigate()
  const handleDownload = () => alert('PDF disponible bientôt !')

  return (
    <div style={s.page}>
      <div style={s.header}>
        <button onClick={() => navigate('/')} style={s.back}>‹ Retour</button>
        <h1 style={s.title}>Mes Outils</h1>
        <p style={s.sub}>Prépare ta maison avant la prochaine crise</p>
        <p style={s.desc}>Tous ces outils s'utilisent sans téléphone. Imprime-les, plastifie-les, pose-les.</p>
      </div>

      <div style={s.body}>
        {SECTIONS.map((section) => (
          <div key={section.badge} style={{ marginBottom: 24 }}>
            <div style={{ ...s.sectionBadge, background: `${section.color}26`, color: section.color, border: `1px solid ${section.color}4d` }}>{section.badge}</div>
            {section.items.map((item) => (
              <div key={item.titre} style={s.card} className="fade-up">
                <div style={{ ...s.vignette, background: item.vignetteBg, border: item.vignetteBorder || 'none' }}>
                  <span style={{ fontSize: 32 }}>{item.icon}</span>
                  <span style={{ ...s.vignetteLabel, color: 'rgba(255,255,255,0.7)' }}>{item.tag}</span>
                </div>
                <div style={s.cardBody}>
                  <span style={{ ...s.cardTag, background: `${section.color}26`, color: section.color }}>{item.tag}</span>
                  <h3 style={s.cardTitle}>{item.titre}</h3>
                  <p style={s.cardDesc}>{item.desc}</p>
                  <button onClick={handleDownload} style={s.dlBtn}>📥 Télécharger</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

const s = {
  page: { minHeight: '100dvh', background: '#1C1B2E' },
  header: { padding: '48px 20px 20px' },
  back: { background: 'none', border: 'none', color: '#2A9490', fontSize: 14, cursor: 'pointer', padding: 0, marginBottom: 12, fontFamily: 'Inter, sans-serif' },
  title: { fontFamily: 'Poppins, sans-serif', fontSize: 24, fontWeight: 700, color: '#fff', margin: 0 },
  sub: { fontFamily: "'Caveat', cursive", fontSize: 18, color: '#F5E06D', marginTop: 4 },
  desc: { fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#94A3B8', lineHeight: 1.6, marginTop: 10 },
  body: { padding: '20px 20px 40px' },
  sectionBadge: { display: 'inline-block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, padding: '5px 12px', borderRadius: 99, marginBottom: 14, fontFamily: 'Inter, sans-serif' },
  card: { display: 'flex', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden', marginBottom: 10 },
  vignette: { width: 80, minHeight: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, flexShrink: 0, padding: 8 },
  vignetteLabel: { fontFamily: 'Inter, sans-serif', fontSize: 8, fontWeight: 700, letterSpacing: 1, textAlign: 'center' },
  cardBody: { flex: 1, padding: 14, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 },
  cardTag: { display: 'inline-block', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, padding: '3px 8px', borderRadius: 99, alignSelf: 'flex-start', fontFamily: 'Inter, sans-serif' },
  cardTitle: { fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 700, color: '#fff', margin: 0 },
  cardDesc: { fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#94A3B8', margin: 0, lineHeight: 1.4 },
  dlBtn: { alignSelf: 'flex-start', marginTop: 6, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 20, padding: '6px 14px', fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.7)', cursor: 'pointer' },
}

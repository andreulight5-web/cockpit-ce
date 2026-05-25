import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import monstreCalin from '../../assets/characters/monstre~/monstre-calin.webp'
import cortexBienveillant from '../../assets/characters/cortex/cortex-bienveillant.webp'

const RESOURCES = [
  // ⚡ PENDANT LA CRISE
  { id: 1,  badge: 'OUTIL ENFANT', badgeColor: '#C0506A', icon: '🃏', vignetteFond: '#C0506A', titre: 'Cards Émotions de Lucas', description: "L'enfant pointe ce qu'il ressent sans parler", objectif: "L'enfant met des mots sur ce qu'il ressent sans parler", section: 'pendant' },
  { id: 2,  badge: 'OUTIL ENFANT', badgeColor: '#FF6B4A', icon: '🌡️', vignetteFond: '#FF6B4A', titre: 'Thermomètre des émotions', description: 'À plastifier et coller dans la chambre', objectif: "Anticiper la montée avant l'explosion", section: 'pendant' },
  { id: 3,  badge: 'OUTIL PARENT', badgeColor: '#7A2040', icon: '✋', vignetteFond: '#7A2040', titre: 'Les phrases STOP', description: '3 phrases à dire · 3 à ne jamais dire', objectif: 'Remplacer les réactions automatiques par des réponses choisies', section: 'pendant' },

  // 🛡️ AVANT LA CRISE
  { id: 4,  badge: 'OUTIL ENFANT', badgeColor: '#2A9490', icon: '🏠', vignetteFond: '#2A9490', titre: 'Prépare le coin calme de Lucas', description: 'À faire ensemble avant la prochaine crise', objectif: "Créer un espace refuge que l'enfant utilise seul", section: 'avant' },
  { id: 5,  badge: 'OUTIL PARENT', badgeColor: '#1A5F5C', icon: '🔍', vignetteFond: '#1A5F5C', titre: 'Les déclencheurs de Lucas', description: "Note les signaux avant l'explosion", objectif: 'Identifier les patterns qui déclenchent les crises', section: 'avant' },

  // 📊 APRÈS LA CRISE
  { id: 10, badge: 'OUTIL ENFANT', badgeColor: '#F5A623', icon: '🏆', vignetteFond: '#7A4A00', titre: 'Les Chèques Bonheur de Lucas', description: "Après la crise, on célèbre ce qui s'est bien passé pour reconstruire la confiance", objectif: 'Reconstruire l\'estime de soi après chaque crise', section: 'apres' },
  { id: 6,  badge: 'OUTIL PARENT', badgeColor: '#F5E06D', icon: '📓', vignetteFond: '#1C1B2E', titre: 'Journal des crises', description: 'À remplir après chaque crise pour voir les patterns', objectif: 'Voir les progrès sur 30 jours', section: 'apres' },
  { id: 7,  badge: 'OUTIL PARENT', badgeColor: '#F5E06D', icon: '📅', vignetteFond: '#2A2040', titre: 'Calendrier 30 jours', description: 'Visualise les progrès sur un mois', objectif: 'Visualiser les cycles pour anticiper les pics', section: 'apres' },
]

const SECTION_META = {
  pendant: { label: '⚡ PENDANT LA CRISE', color: '#C0506A' },
  avant:   { label: '🛡️ AVANT LA CRISE', color: '#2A9490' },
  apres:   { label: '📊 APRÈS LA CRISE', color: '#F5E06D' },
}
const SECTION_ORDER = ['pendant', 'avant', 'apres']

// Outils dont l'id ouvre directement un PDF unique.
// L'outil 3 (Phrases STOP) ouvre un menu contextuel (voir STOP_LIST + handleDownload).
const PDF_MAP = {
  1:  '/pdfs/cards-emotions.pdf',
  2:  '/pdfs/thermometre-emotions.pdf',
  4:  '/pdfs/kit-anti-crise.pdf',        // recto = coin calme
  5:  '/pdfs/kit-anti-crise.pdf',        // verso = déclencheurs (même PDF)
  6:  '/pdfs/journal-simple.pdf',
  7:  '/pdfs/journal-simple-planche.pdf',
  10: '/pdfs/systeme-victoires.pdf',
}

// Bibliothèque Phrases STOP — deck + universel + 8 contextes
const STOP_LIST = [
  { file: 'phrases-stop-deck.pdf',        emoji: '🃏', label: 'Deck à découper',       desc: '9 cartes A4 pour porte-clé' },
  { file: 'phrases-stop.pdf',             emoji: '🧊', label: 'Universel (frigo)',     desc: 'Les 3 phrases passe-partout' },
  { file: 'phrases-stop-devoirs.pdf',     emoji: '🍝', label: 'Devoirs',               desc: 'La guerre du soir' },
  { file: 'phrases-stop-transitions.pdf', emoji: '⏱️', label: 'Transitions',           desc: 'Écran, douche, départ' },
  { file: 'phrases-stop-public.pdf',      emoji: '🛒', label: 'En public',             desc: 'Supermarché, restau, famille' },
  { file: 'phrases-stop-estime.pdf',      emoji: '💔', label: '« Je suis nul »',        desc: 'Quand son estime s\'effondre' },
  { file: 'phrases-stop-fratrie.pdf',     emoji: '👫', label: 'Fratrie',               desc: '« Tu préfères ma sœur »' },
  { file: 'phrases-stop-apres.pdf',       emoji: '🌱', label: 'Après la crise',        desc: 'Réparation, retour au calme' },
  { file: 'phrases-stop-parent.pdf',      emoji: '🫂', label: 'Quand TU craques',      desc: 'Le mantra parent' },
  { file: 'phrases-stop-sensoriel.pdf',   emoji: '🔊', label: 'Surcharge sensorielle', desc: 'Bruit, lumière, étiquette' },
]

const triggerDownload = (url) => {
  const a = document.createElement('a')
  a.href = url
  a.download = url.split('/').pop()
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export default function Ressources() {
  const navigate = useNavigate()
  const [stopMenuOpen, setStopMenuOpen] = useState(false)

  const handleDownload = (item) => {
    if (item.id === 3) return setStopMenuOpen(true)
    const url = PDF_MAP[item.id]
    if (!url) return
    triggerDownload(url)
  }

  return (
    <div style={s.page}>
      <div style={s.header}>
        <button onClick={() => navigate('/')} style={s.back}>‹ Retour</button>
        <h1 style={s.title}>Mes Outils</h1>
        <p style={s.sub}>Prépare ta maison avant la prochaine crise</p>
        <p style={s.desc}>Tous ces outils s'utilisent sans téléphone. Imprime-les, plastifie-les, pose-les.</p>
      </div>

      <div style={s.body}>
        {SECTION_ORDER.map((key) => {
          const items = RESOURCES.filter((r) => r.section === key)
          if (!items.length) return null
          const meta = SECTION_META[key]
          return (
            <div key={key} style={{ marginBottom: 24 }}>
              <div style={{ ...s.sectionBadge, background: `${meta.color}26`, color: meta.color, border: `1px solid ${meta.color}4d` }}>{meta.label}</div>
              {items.map((item) => {
                const isEnfant = item.badge.includes('ENFANT')
                const isParent = item.badge.includes('PARENT')
                const character = isEnfant ? monstreCalin : isParent ? cortexBienveillant : null
                const lightFond = item.vignetteFond === '#1C1B2E' || item.vignetteFond === '#2A2040'
                return (
                  <div key={item.id} style={s.card} className="fade-up">
                    <div style={{ ...s.vignette, background: item.vignetteFond, border: lightFond ? `1px solid ${item.badgeColor}` : 'none' }}>
                      <span style={{ fontSize: 32 }}>{item.icon}</span>
                      <span style={s.vignetteLabel}>{item.badge.split(' ')[1]}</span>
                      {character && <img src={character} alt="" style={s.charOverlay} draggable={false} />}
                    </div>
                    <div style={s.cardBody}>
                      <span style={{ ...s.cardTag, background: `${item.badgeColor}26`, color: item.badgeColor }}>{item.badge}</span>
                      <h3 style={s.cardTitle}>{item.titre}</h3>
                      <p style={s.cardDesc}>{item.description}</p>
                      <p style={s.objectif}>→ Objectif : {item.objectif}</p>
                      <button onClick={() => handleDownload(item)} style={s.dlBtn}>📥 Télécharger</button>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      {stopMenuOpen && (
        <div style={s.overlay} onClick={() => setStopMenuOpen(false)}>
          <div style={s.sheet} onClick={(e) => e.stopPropagation()} className="fade-up">
            <div style={s.sheetHead}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={s.sheetEyebrow}>BIBLIOTHÈQUE</div>
                <h3 style={s.sheetTitle}>Phrases <span style={{ color: '#C0506A' }}>STOP</span></h3>
                <p style={s.sheetSub}>Choisis le contexte. Imprime et place dans la pièce concernée.</p>
              </div>
              <button onClick={() => setStopMenuOpen(false)} style={s.sheetClose} aria-label="Fermer">×</button>
            </div>

            <div style={s.sheetList}>
              {STOP_LIST.map((it) => (
                <button
                  key={it.file}
                  onClick={() => { triggerDownload(`/pdfs/${it.file}`); setStopMenuOpen(false) }}
                  style={s.sheetItem}
                >
                  <span style={s.sheetItemEmoji}>{it.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                    <div style={s.sheetItemLabel}>{it.label}</div>
                    <div style={s.sheetItemDesc}>{it.desc}</div>
                  </div>
                  <span style={s.sheetItemDl}>📥</span>
                </button>
              ))}
            </div>

            <p style={s.sheetFooter}>9 cartes A5 — chacune avec ses 3 phrases à dire et 3 à éviter.</p>
          </div>
        </div>
      )}
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
  vignette: { position: 'relative', width: 80, minHeight: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, flexShrink: 0, padding: 8 },
  vignetteLabel: { fontFamily: 'Inter, sans-serif', fontSize: 8, fontWeight: 700, letterSpacing: 1, textAlign: 'center', color: 'rgba(255,255,255,0.7)' },
  charOverlay: { position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, objectFit: 'contain', zIndex: 2, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' },
  cardBody: { flex: 1, padding: 14, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 },
  cardTag: { display: 'inline-block', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, padding: '3px 8px', borderRadius: 99, alignSelf: 'flex-start', fontFamily: 'Inter, sans-serif' },
  cardTitle: { fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 700, color: '#fff', margin: 0 },
  cardDesc: { fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#94A3B8', margin: 0, lineHeight: 1.4 },
  objectif: { fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#F5E06D', fontStyle: 'italic', margin: '4px 0 0', lineHeight: 1.4 },
  dlBtn: { alignSelf: 'flex-start', marginTop: 8, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 20, padding: '6px 14px', fontFamily: 'Inter, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.7)', cursor: 'pointer' },

  /* ── Modal Phrases STOP ── */
  overlay: { position: 'fixed', inset: 0, background: 'rgba(10, 9, 20, 0.78)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 50, padding: '20px 12px', paddingBottom: 'calc(20px + env(safe-area-inset-bottom))' },
  sheet: { width: '100%', maxWidth: 430, maxHeight: '88vh', overflow: 'hidden', background: '#16152A', borderRadius: 20, border: '1px solid rgba(245,224,109,0.18)', display: 'flex', flexDirection: 'column' },
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
  sheetFooter: { fontFamily: 'Inter, sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '10px 16px 16px', margin: 0, borderTop: '1px solid rgba(255,255,255,0.06)' },
}

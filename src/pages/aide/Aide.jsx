import { useState } from 'react'

const FAQ = [
  {
    q: 'Comment télécharger les PDFs ?',
    a: 'Va dans l\'onglet Outils, choisis ta ressource, et clique sur Télécharger. Le PDF s\'ouvre dans un nouvel onglet ou se télécharge directement selon ton appareil. Tu peux ensuite l\'imprimer chez toi.',
  },
  {
    q: 'Mon code fonctionne-t-il sur plusieurs appareils ?',
    a: 'Oui. Ton code d\'accès s\'utilise sur ton téléphone, ta tablette et ton ordinateur. Ta progression est synchronisée automatiquement entre tous tes appareils — reprends une leçon là où tu en étais, peu importe l\'appareil.',
  },
  {
    q: 'Comment imprimer et plastifier les fiches ?',
    a: 'Imprime au format A4 sur papier 120-160g (papier épais pour résister à l\'usage quotidien). Pour plastifier : utilise des pochettes A4 chez Action, Lidl, Bureau Vallée — environ 6€ les 25. Une plastifieuse de base coûte 25€. Sinon, scotch large autour de la fiche fait l\'affaire pour un kit DIY.',
  },
  {
    q: 'Quel papier utiliser pour l\'impression ?',
    a: 'Standard 80g : très bien pour les fiches à remplir au stylo (Journal, Système de Victoires). Épais 120-160g : recommandé pour les Cards Émotions, Thermomètre et Phrases STOP — elles vont être manipulées plusieurs fois par jour. Plastifie après impression pour une durée de vie indéfinie.',
  },
  {
    q: 'Support prioritaire — qu\'est-ce qui est inclus ?',
    a: 'Pendant 30 jours après ton achat, tu as un accès direct à mon email. Écris-moi sur info@cerveau-electrique.fr avec ta question (utilisation d\'un outil, problème technique, conseil personnalisé sur une situation), je te réponds personnellement sous 24 à 48h ouvrées.',
  },
  {
    q: 'Remboursement — est-ce possible ?',
    a: 'Oui. Si tu n\'es pas convaincu(e) dans les 14 jours suivant ton achat, je te rembourse intégralement — sans question. Tu m\'écris à info@cerveau-electrique.fr en mentionnant ton email d\'achat, c\'est fait.',
  },
]

function getAccessCode() {
  try {
    const raw = localStorage.getItem('cockpit_access')
    return raw ? (JSON.parse(raw)?.code || '') : ''
  } catch { return '' }
}

export default function Aide() {
  const [openIdx, setOpenIdx]       = useState(null)
  const [formOpen, setFormOpen]     = useState(false)
  const [subject, setSubject]       = useState('')
  const [message, setMessage]       = useState('')
  const [submitted, setSubmitted]   = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    const code = getAccessCode()
    const subj = subject.trim() || 'Aide Cockpit CE'
    const footer = code ? `\n\n---\nCode d'accès : ${code}` : ''
    const url = `mailto:info@cerveau-electrique.fr?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(message + footer)}`
    window.location.href = url
    setSubmitted(true)
  }

  const closeForm = () => {
    setFormOpen(false)
    setSubmitted(false)
    setSubject('')
    setMessage('')
  }

  return (
    <div style={s.page}>
      <header style={s.header}>
        <h1 style={s.title}>Aide</h1>
        <p style={s.sub}>Une question, un blocage ? On est là.</p>
      </header>

      <div style={s.body}>
        {/* Bloc support prioritaire */}
        <section style={s.supportCard} className="fade-up">
          <div style={s.supportBadge}>📞 SUPPORT PRIORITAIRE</div>
          <h2 style={s.supportTitle}>30 jours inclus avec ton achat</h2>
          <p style={s.supportDesc}>
            Écris-nous, on te répond personnellement sous 24 à 48h. Aucune question est bête — surtout celles sur ton enfant.
          </p>

          {!formOpen && (
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              style={s.supportCta}
            >
              ✉️ Envoyer un message
            </button>
          )}

          {formOpen && !submitted && (
            <form onSubmit={handleSubmit} style={s.form} className="fade-up">
              <label style={s.formLabel}>
                Sujet
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="ex. Question sur les Phrases STOP"
                  style={s.formInput}
                  maxLength={120}
                />
              </label>
              <label style={s.formLabel}>
                Message <span style={{ color: '#FFB1B1' }}>*</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Raconte ta situation, on te lit attentivement…"
                  style={s.formTextarea}
                  rows={5}
                  required
                />
              </label>
              <p style={s.formHint}>
                Ton code d'accès sera ajouté automatiquement à la fin du message — ça nous aide à retrouver ton compte.
              </p>
              <div style={s.formActions}>
                <button type="button" onClick={closeForm} style={s.formCancel}>
                  Annuler
                </button>
                <button type="submit" disabled={!message.trim()} style={{ ...s.supportCta, opacity: message.trim() ? 1 : 0.5, cursor: message.trim() ? 'pointer' : 'not-allowed' }}>
                  ✉️ Envoyer
                </button>
              </div>
            </form>
          )}

          {submitted && (
            <div style={s.confirm} className="fade-up">
              <div style={s.confirmIcon}>✓</div>
              <div>
                <div style={s.confirmTitle}>Email préparé dans ton app mail</div>
                <div style={s.confirmDesc}>
                  Vérifie que le message s'est bien ouvert, puis envoie-le. On te répond sous 24 à 48h.
                </div>
                <button type="button" onClick={closeForm} style={s.confirmClose}>
                  Fermer
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Comment utiliser le kit */}
        <section style={{ marginTop: 28 }}>
          <h2 style={s.sectionTitle}>Comment utiliser le kit</h2>
          <div style={s.howList}>
            <HowItem n="1" title="Commence par le Bienvenue digital">
              Le PDF de bienvenue te montre comment démarrer en 5 min chrono. Tu le trouves en haut de l'onglet Outils.
            </HowItem>
            <HowItem n="2" title="Imprime tes 3 outils du quotidien">
              Thermomètre (au mur de la cuisine), Cards Émotions (sur la table), Phrases STOP (dans ton sac). 3 outils, 3 emplacements.
            </HowItem>
            <HowItem n="3" title="Fais la formation à ton rythme">
              5 leçons. Pas besoin de tout faire d'un coup. 10 min par soir = 5 jours pour boucler.
            </HowItem>
            <HowItem n="4" title="Utilise les quiz pour t'entraîner à froid">
              5 quiz, 3 situations chacun, 10 min total. Idéal pour fixer les bons réflexes avant la crise.
            </HowItem>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginTop: 32 }}>
          <h2 style={s.sectionTitle}>Questions fréquentes</h2>
          <div>
            {FAQ.map((item, i) => {
              const open = openIdx === i
              return (
                <div key={i} style={s.faqItem}>
                  <button
                    onClick={() => setOpenIdx(open ? null : i)}
                    style={s.faqQ}
                    aria-expanded={open}
                  >
                    <span style={{ flex: 1, textAlign: 'left' }}>{item.q}</span>
                    <span style={{ ...s.faqChevron, transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>▾</span>
                  </button>
                  {open && (
                    <div style={s.faqA} className="fade-up">
                      {item.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Footer */}
        <div style={s.footer}>
          <p style={s.footerText}>
            Cerveau Électrique · <a href="https://cerveau-electrique.fr" target="_blank" rel="noopener noreferrer" style={s.footerLink}>cerveau-electrique.fr</a>
          </p>
        </div>
      </div>
    </div>
  )
}

function HowItem({ n, title, children }) {
  return (
    <div style={s.howItem}>
      <div style={s.howNum}>{n}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={s.howTitle}>{title}</div>
        <div style={s.howDesc}>{children}</div>
      </div>
    </div>
  )
}

const s = {
  page: { minHeight: '100dvh', background: '#FAFAF5' },
  header: { padding: '40px 20px 12px' },
  title: { fontFamily: 'Poppins, sans-serif', fontSize: 24, fontWeight: 700, color: '#1C1B2E', margin: 0 },
  sub: { fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#64748B', lineHeight: 1.55, margin: '8px 0 0' },
  body: { padding: '12px 20px 32px' },

  supportCard: {
    background: 'linear-gradient(135deg, #2A9490, #1A6F6C)',
    borderRadius: 18,
    padding: 22,
    color: '#fff',
    boxShadow: '0 4px 16px rgba(42,148,144,0.18)',
  },
  supportBadge: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 9.5,
    fontWeight: 800,
    letterSpacing: 1.6,
    color: '#F5E06D',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  supportTitle: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 19,
    fontWeight: 700,
    color: '#fff',
    margin: '0 0 10px',
    lineHeight: 1.2,
  },
  supportDesc: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 1.55,
    margin: '0 0 16px',
  },
  supportCta: {
    display: 'inline-block',
    background: '#F5E06D',
    color: '#1C1B2E',
    fontFamily: 'Poppins, sans-serif',
    fontSize: 13,
    fontWeight: 700,
    padding: '12px 20px',
    borderRadius: 50,
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
  },

  /* Formulaire support */
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginTop: 4,
  },
  formLabel: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    fontFamily: 'Poppins, sans-serif',
    fontSize: 11.5,
    fontWeight: 700,
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  formInput: {
    width: '100%',
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: 10,
    padding: '11px 14px',
    color: '#fff',
    fontFamily: 'Inter, sans-serif',
    fontSize: 13.5,
    fontWeight: 500,
    outline: 'none',
    boxSizing: 'border-box',
    textTransform: 'none',
    letterSpacing: 0,
  },
  formTextarea: {
    width: '100%',
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: 10,
    padding: '11px 14px',
    color: '#fff',
    fontFamily: 'Inter, sans-serif',
    fontSize: 13.5,
    fontWeight: 500,
    outline: 'none',
    resize: 'vertical',
    minHeight: 110,
    boxSizing: 'border-box',
    textTransform: 'none',
    letterSpacing: 0,
    lineHeight: 1.5,
  },
  formHint: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    margin: '-2px 0 0',
    lineHeight: 1.5,
  },
  formActions: {
    display: 'flex',
    gap: 10,
    marginTop: 6,
  },
  formCancel: {
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: 50,
    padding: '11px 18px',
    color: '#fff',
    fontFamily: 'Poppins, sans-serif',
    fontSize: 12.5,
    fontWeight: 600,
    cursor: 'pointer',
  },

  /* Confirmation post-submit */
  confirm: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: 12,
    padding: 14,
    marginTop: 4,
  },
  confirmIcon: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    background: '#F5E06D',
    color: '#1C1B2E',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 800,
    fontSize: 14,
    flexShrink: 0,
  },
  confirmTitle: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 13,
    fontWeight: 700,
    color: '#fff',
    marginBottom: 4,
  },
  confirmDesc: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 1.5,
    marginBottom: 10,
  },
  confirmClose: {
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: 50,
    padding: '7px 14px',
    color: '#fff',
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    cursor: 'pointer',
  },

  sectionTitle: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 16,
    fontWeight: 700,
    color: '#1C1B2E',
    margin: '0 0 14px',
  },

  howList: { display: 'flex', flexDirection: 'column', gap: 12 },
  howItem: {
    display: 'flex',
    gap: 14,
    background: '#FFFFFF',
    border: '1px solid rgba(28,27,46,0.06)',
    boxShadow: '0 2px 8px rgba(28,27,46,0.04)',
    borderRadius: 12,
    padding: 14,
  },
  howNum: {
    width: 28,
    height: 28,
    borderRadius: '50%',
    background: '#F5E06D',
    color: '#1C1B2E',
    fontFamily: 'Poppins, sans-serif',
    fontSize: 13,
    fontWeight: 800,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  howTitle: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 13,
    fontWeight: 700,
    color: '#1C1B2E',
    marginBottom: 4,
  },
  howDesc: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 12.5,
    color: '#64748B',
    lineHeight: 1.55,
  },

  faqItem: {
    borderBottom: '1px solid #E5E5E5',
  },
  faqQ: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: 'transparent',
    border: 'none',
    padding: '16px 4px',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif',
    fontSize: 13.5,
    fontWeight: 600,
    color: '#1C1B2E',
    textAlign: 'left',
  },
  faqChevron: {
    color: '#2A9490',
    fontSize: 14,
    transition: 'transform 0.2s',
    flexShrink: 0,
  },
  faqA: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 13,
    color: '#64748B',
    lineHeight: 1.65,
    padding: '0 4px 16px',
  },

  footer: { marginTop: 32, paddingTop: 18, borderTop: '1px solid #E5E5E5', textAlign: 'center' },
  footerText: { fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#999', margin: 0 },
  footerLink: { color: '#2A9490', textDecoration: 'none' },
}

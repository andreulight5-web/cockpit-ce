import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Font, Svg, Path, Circle, Rect, renderToFile } from '@react-pdf/renderer'

/* ── Fonts ─────────────────────────────────────────── */
Font.register({
  family: 'Poppins',
  fonts: [
    { src: './fonts/Poppins-Regular.ttf', fontWeight: 'normal' },
    { src: './fonts/Poppins-SemiBold.ttf', fontWeight: 600 },
    { src: './fonts/Poppins-Bold.ttf', fontWeight: 700 },
    { src: './fonts/Poppins-ExtraBold.ttf', fontWeight: 800 },
  ],
})
Font.register({
  family: 'Inter',
  fonts: [
    { src: './fonts/Inter-Regular.ttf', fontWeight: 'normal' },
    { src: './fonts/Inter-Medium.ttf', fontWeight: 500 },
    { src: './fonts/Inter-SemiBold.ttf', fontWeight: 600 },
    { src: './fonts/Inter-Bold.ttf', fontWeight: 700 },
    { src: './fonts/Inter-Italic.ttf', fontWeight: 'normal', fontStyle: 'italic' },
    { src: './fonts/Inter-SemiBoldItalic.ttf', fontWeight: 600, fontStyle: 'italic' },
  ],
})
Font.register({
  family: 'Caveat',
  fonts: [{ src: './fonts/Caveat-Bold.ttf', fontWeight: 700 }],
})
Font.registerHyphenationCallback((word) => [word])

Font.registerEmojiSource({
  format: 'png',
  url: 'node_modules/twemoji-emojis/vendor/72x72/',
})

/* ── Design tokens CE ──────────────────────────────── */
const C = {
  dark: '#1C1B2E',
  dark2: '#16152A',
  cream: '#FAFAF5',
  text: '#2D2D3A',
  muted: '#64748B',
  yellow: '#F5E06D',
  teal: '#2A9490',
  rose: '#C0506A',
  orange: '#F5A623',
  violet: '#7C3AED',
  white: '#FFFFFF',
  hairline: '#E8E5DA',
}

/* ── Reusable atoms ───────────────────────────────── */
const s = StyleSheet.create({
  pageDark: { backgroundColor: C.dark, color: C.white, fontFamily: 'Inter', fontSize: 10, padding: 32 },
  pageCream: { backgroundColor: C.cream, color: C.text, fontFamily: 'Inter', fontSize: 10, padding: 32 },
  brandRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  brand: { fontFamily: 'Poppins', fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' },
  brandAccent: { color: C.yellow },
  hairline: { height: 1, backgroundColor: C.hairline, marginVertical: 14 },
  hairlineDark: { height: 1, backgroundColor: 'rgba(255,255,255,0.10)', marginVertical: 14 },
  h1: { fontFamily: 'Poppins', fontSize: 26, fontWeight: 800, lineHeight: 1.15 },
  h1Yellow: { color: C.yellow },
  sub: { fontFamily: 'Inter', fontSize: 11, marginTop: 4 },
  pill: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, fontFamily: 'Poppins', fontSize: 8, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' },
  footer: { position: 'absolute', bottom: 18, left: 32, right: 32, fontFamily: 'Inter', fontSize: 8, opacity: 0.5, textAlign: 'center' },
})

const Brand = ({ dark = false }: { dark?: boolean }) => (
  <View style={s.brandRow}>
    <Text style={[s.brand, { color: dark ? C.white : C.text }]}>
      Cerveaux <Text style={s.brandAccent}>Électriques</Text> · Kit Crise TDAH
    </Text>
    <Text style={[s.brand, { color: dark ? 'rgba(255,255,255,0.4)' : C.muted, fontSize: 8 }]}>cerveau-electrique.fr</Text>
  </View>
)

const Footer = ({ dark = false, text }: { dark?: boolean; text: string }) => (
  <Text fixed style={[s.footer, { color: dark ? 'rgba(255,255,255,0.5)' : C.muted }]}>{text}</Text>
)

/* ═══════════════════════════════════════════════════ */
/* 1. Signaux d'alerte — A4 portrait                  */
/* ═══════════════════════════════════════════════════ */
const phases = [
  {
    label: 'PHASE 1 · ESCALADE', duration: '2-5 min', color: C.yellow,
    title: 'Repère les signaux. Tu as encore une fenêtre.',
    signals: [
      'Voix qui monte, mots qui se précipitent',
      'Mâchoire serrée, poings fermés',
      'Refus du contact visuel, regard fuyant',
      'Mouvements brusques, agitation soudaine',
      'Repli soudain dans le silence',
    ],
    action: '→ Voix basse, descendre à sa hauteur, valider l\'émotion.',
  },
  {
    label: 'PHASE 2 · EXPLOSION', duration: '5-20 min', color: C.rose,
    title: 'Le cortex est hors-ligne. Pas de raisonnement.',
    signals: [
      'Cris, pleurs, mots blessants',
      'Objets jetés, parfois coups',
      'Respiration rapide, visage rouge',
      'Aucune réponse aux questions',
      'Saturation sensorielle visible',
    ],
    action: '→ Silence. Sécurité. Présence. Pas un mot.',
  },
  {
    label: 'PHASE 3 · RÉCUPÉRATION', duration: '20-45 min', color: C.teal,
    title: 'Il revient. Tu restes.',
    signals: [
      'Soupirs, larmes silencieuses',
      'Épaules qui s\'affaissent',
      'Demande implicite de proximité',
      'Confusion, parfois excuses spontanées',
      'Fatigue extrême',
    ],
    action: '→ Présence sans mots. Câlin si demandé. Pas de débrief.',
  },
]

const Pdf1 = () => (
  <Document title="Signaux d'alerte — Kit Crise TDAH" author="Cerveaux Électriques">
    <Page size="A4" style={s.pageCream}>
      <Brand />
      <View style={[s.pill, { backgroundColor: C.rose, color: C.white }]}>
        <Text>Pendant la crise</Text>
      </View>
      <Text style={[s.h1, { color: C.text, marginTop: 10 }]}>Signaux d'alerte</Text>
      <Text style={[s.sub, { color: C.muted }]}>Reconnaître la phase → adapter la réponse</Text>
      <View style={s.hairline} />

      {phases.map((p, i) => (
        <View key={i} wrap={false} style={{ marginBottom: 18, borderLeft: `4 solid ${p.color}`, paddingLeft: 14 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 10, fontWeight: 700, color: p.color, letterSpacing: 1 }}>{p.label}</Text>
            <Text style={{ fontFamily: 'Inter', fontSize: 9, color: C.muted }}>{p.duration}</Text>
          </View>
          <Text style={{ fontFamily: 'Poppins', fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 8 }}>{p.title}</Text>
          {p.signals.map((sig, j) => (
            <View key={j} style={{ flexDirection: 'row', marginBottom: 3, alignItems: 'flex-start' }}>
              <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: p.color, marginTop: 5, marginRight: 8 }} />
              <Text style={{ fontFamily: 'Inter', fontSize: 10.5, color: C.text, flex: 1, lineHeight: 1.5 }}>{sig}</Text>
            </View>
          ))}
          <Text style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 600, color: p.color, fontStyle: 'italic', marginTop: 8 }}>{p.action}</Text>
        </View>
      ))}

      <View style={[s.hairline, { marginTop: 0 }]} />
      <Text style={{ fontFamily: 'Poppins', fontSize: 9, fontWeight: 700, color: C.text, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>À retenir</Text>
      <Text style={{ fontFamily: 'Inter', fontSize: 11, color: C.text, lineHeight: 1.55, fontStyle: 'italic' }}>
        Toute parole en phase 2 rallonge la crise de 50%. La validation en phase 1 la raccourcit de 60%.
      </Text>

      <Footer text="Plastifie cette fiche · Pose-la près de la cuisine ou de l'entrée · Source : Barkley 2013, HAS 2024" />
    </Page>
  </Document>
)

/* ═══════════════════════════════════════════════════ */
/* 2. Thermomètre émotionnel — A4 portrait            */
/* ═══════════════════════════════════════════════════ */
const levels = [
  { n: 5, name: 'EXPLOSION', color: '#7A2040', emoji: '🌋', body: 'Tout déborde', need: 'Silence + sécurité. Aucun mot.' },
  { n: 4, name: 'TRÈS EN COLÈRE', color: C.rose, emoji: '😡', body: 'Je ne contrôle plus', need: 'Voix basse · à sa hauteur · validation.' },
  { n: 3, name: 'TENDU', color: C.orange, emoji: '😤', body: 'Ça bouillonne dedans', need: 'Coin calme proposé · respiration ensemble.' },
  { n: 2, name: 'UN PEU AGITÉ', color: C.yellow, emoji: '😬', body: 'Quelque chose me gêne', need: 'Nommer l\'émotion · activité physique courte.' },
  { n: 1, name: 'CALME', color: C.teal, emoji: '🙂', body: 'Tout va bien', need: 'On profite. On consolide les rituels.' },
]

const Pdf2 = () => (
  <Document title="Thermomètre émotionnel — Kit Crise TDAH" author="Cerveaux Électriques">
    <Page size="A4" style={s.pageCream}>
      <Brand />
      <View style={[s.pill, { backgroundColor: C.orange, color: C.white }]}>
        <Text>Anticiper</Text>
      </View>
      <Text style={[s.h1, { color: C.text, marginTop: 10 }]}>Thermomètre émotionnel</Text>
      <Text style={[s.sub, { color: C.muted }]}>L'enfant montre son niveau AVANT que ça déborde</Text>
      <View style={s.hairline} />

      <View style={{ flexDirection: 'row', gap: 16 }}>
        {/* Thermometer SVG */}
        <View style={{ width: 80, alignItems: 'center', paddingTop: 6 }}>
          <Svg width={70} height={420} viewBox="0 0 70 420">
            {/* Tube outline */}
            <Rect x={26} y={6} width={18} height={350} rx={9} ry={9} fill="#E8E5DA" stroke={C.text} strokeWidth={1.5} />
            {/* Levels colored */}
            {levels.map((l, i) => (
              <Rect key={i} x={28} y={8 + i * 70} width={14} height={68} fill={l.color} opacity={0.85} />
            ))}
            {/* Bulb */}
            <Circle cx={35} cy={385} r={28} fill={C.rose} stroke={C.text} strokeWidth={1.5} />
            <Circle cx={35} cy={385} r={20} fill="#7A2040" />
          </Svg>
        </View>

        {/* Levels rows */}
        <View style={{ flex: 1 }}>
          {levels.map((l, i) => (
            <View key={i} wrap={false} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, padding: 10, borderRadius: 10, backgroundColor: l.color + '22', borderLeft: `4 solid ${l.color}` }}>
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: l.color, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                <Text style={{ fontFamily: 'Poppins', fontSize: 16, fontWeight: 800, color: C.white }}>{l.n}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: 'Poppins', fontSize: 11, fontWeight: 700, color: l.color, letterSpacing: 1 }}>{l.name}</Text>
                <Text style={{ fontFamily: 'Inter', fontSize: 10, color: C.text, marginTop: 2 }}>{l.body}</Text>
                <Text style={{ fontFamily: 'Inter', fontSize: 9.5, color: C.muted, fontStyle: 'italic', marginTop: 3 }}>{l.need}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <Footer text="Plastifie · colle à hauteur d'enfant (chambre ou cuisine) · L'enfant montre, tu adaptes." />
    </Page>
  </Document>
)

/* ═══════════════════════════════════════════════════ */
/* 3. Checklist pré-crise — A4 portrait                */
/* ═══════════════════════════════════════════════════ */
const checklistSections = [
  {
    title: 'Le coin calme', emoji: '🏡', color: C.teal,
    items: [
      'Choisi par l\'enfant (chambre, salon, recoin)',
      'Coussin / fauteuil / matelas confortable',
      'Couverture lestée ou plaid doux',
      'Casque anti-bruit ou musique calme prête',
      'Lumière chaude (pas de néon)',
      '1 livre apprécié + feutres + papier',
      '1 jouet de manipulation (anti-stress, slime, pâte)',
      'Nom donné par l\'enfant lui-même',
    ],
  },
  {
    title: 'Les outils visibles', emoji: '📌', color: C.yellow,
    items: [
      'Thermomètre des émotions affiché à hauteur d\'enfant',
      'Cards émotions plastifiées posées dans le salon',
      'Phrases STOP collées sur le frigo',
      'Time Timer ou minuteur visuel à portée',
      'Carte TDAH dans le portefeuille',
    ],
  },
  {
    title: 'Toi, parent', emoji: '🧘', color: C.violet,
    items: [
      'Respiration 4-4-4 entraînée à froid (3 fois ce matin)',
      'Mon signal d\'arrêt perso choisi (geste ou mot)',
      'Moment pour moi prévu cette semaine (non négociable)',
      'Personne de confiance à appeler en cas de débordement',
      'Phrases d\'urgence mémorisées par cœur',
    ],
  },
  {
    title: 'L\'environnement', emoji: '🎯', color: C.rose,
    items: [
      'Heures critiques identifiées (retour école, devoirs, coucher)',
      'Routine du matin préparée la veille',
      'Buffer 15 min sur chaque transition à risque',
      'Sas du soir 1h identique 7j/7',
    ],
  },
]

const CheckItem = ({ text }: { text: string }) => (
  <View style={{ flexDirection: 'row', marginBottom: 6, alignItems: 'flex-start' }}>
    <View style={{ width: 14, height: 14, borderRadius: 3, borderWidth: 1.5, borderColor: C.muted, marginTop: 1, marginRight: 8 }} />
    <Text style={{ fontFamily: 'Inter', fontSize: 10.5, color: C.text, flex: 1, lineHeight: 1.45 }}>{text}</Text>
  </View>
)

const Pdf3 = () => (
  <Document title="Checklist pré-crise — Kit Crise TDAH" author="Cerveaux Électriques">
    <Page size="A4" style={s.pageCream}>
      <Brand />
      <View style={[s.pill, { backgroundColor: C.teal, color: C.white }]}>
        <Text>Avant la crise</Text>
      </View>
      <Text style={[s.h1, { color: C.text, marginTop: 10 }]}>Checklist pré-crise</Text>
      <Text style={[s.sub, { color: C.muted }]}>Tout ce qui doit être prêt AVANT la prochaine tempête</Text>
      <View style={s.hairline} />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14 }}>
        {checklistSections.map((sec, i) => (
          <View key={i} wrap={false} style={{ width: '47%', padding: 12, borderRadius: 10, backgroundColor: C.white, borderTop: `3 solid ${sec.color}` }}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 11, fontWeight: 700, color: sec.color, letterSpacing: 1, marginBottom: 8, textTransform: 'uppercase' }}>{sec.emoji}  {sec.title}</Text>
            {sec.items.map((it, j) => <CheckItem key={j} text={it} />)}
          </View>
        ))}
      </View>

      <View style={s.hairline} />
      <Text style={{ fontFamily: 'Inter', fontSize: 11, color: C.text, lineHeight: 1.55, fontStyle: 'italic' }}>
        Tu ne pourras pas lire un protocole pendant la tempête. Cette checklist te permet d'installer les outils à FROID, pour qu'ils soient déjà là quand ça arrive.
      </Text>

      <Footer text="Coche au stylo · Reprends-la chaque mois · Une case cochée = un déclencheur évité" />
    </Page>
  </Document>
)

/* ═══════════════════════════════════════════════════ */
/* 4. Carte triggers — A5 paysage (à plier)           */
/* ═══════════════════════════════════════════════════ */
const Pdf4 = () => (
  <Document title="Carte triggers — Kit Crise TDAH" author="Cerveaux Électriques">
    <Page size="A5" orientation="landscape" style={s.pageCream}>
      <Brand />
      <View style={[s.pill, { backgroundColor: C.violet, color: C.white }]}>
        <Text>Identifier</Text>
      </View>
      <Text style={[s.h1, { color: C.text, marginTop: 6, fontSize: 22 }]}>Carte triggers</Text>
      <Text style={[s.sub, { color: C.muted }]}>Les patterns invisibles qui déclenchent les crises</Text>
      <View style={s.hairline} />

      <View style={{ flexDirection: 'row', gap: 12 }}>
        {/* Col 1 */}
        <View style={{ flex: 1, gap: 8 }}>
          <View style={{ padding: 10, borderRadius: 8, backgroundColor: C.white, borderLeft: `3 solid ${C.rose}` }}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 9, fontWeight: 700, color: C.rose, letterSpacing: 1, marginBottom: 6 }}>HEURES CRITIQUES</Text>
            {[1, 2, 3].map(i => (
              <View key={i} style={{ borderBottom: `1 solid ${C.hairline}`, marginBottom: 4, paddingBottom: 4, height: 14 }} />
            ))}
          </View>
          <View style={{ padding: 10, borderRadius: 8, backgroundColor: C.white, borderLeft: `3 solid ${C.orange}` }}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 9, fontWeight: 700, color: C.orange, letterSpacing: 1, marginBottom: 6 }}>LIEUX DÉCLENCHEURS</Text>
            {[1, 2, 3].map(i => (
              <View key={i} style={{ borderBottom: `1 solid ${C.hairline}`, marginBottom: 4, paddingBottom: 4, height: 14 }} />
            ))}
          </View>
        </View>
        {/* Col 2 */}
        <View style={{ flex: 1, gap: 8 }}>
          <View style={{ padding: 10, borderRadius: 8, backgroundColor: C.white, borderLeft: `3 solid ${C.teal}` }}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 9, fontWeight: 700, color: C.teal, letterSpacing: 1, marginBottom: 6 }}>SIGNAUX D'ESCALADE</Text>
            {[1, 2, 3].map(i => (
              <View key={i} style={{ borderBottom: `1 solid ${C.hairline}`, marginBottom: 4, paddingBottom: 4, height: 14 }} />
            ))}
          </View>
          <View style={{ padding: 10, borderRadius: 8, backgroundColor: C.white, borderLeft: `3 solid ${C.yellow}` }}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 9, fontWeight: 700, color: '#A88E1F', letterSpacing: 1, marginBottom: 6 }}>CE QUI AIDE</Text>
            {[1, 2, 3].map(i => (
              <View key={i} style={{ borderBottom: `1 solid ${C.hairline}`, marginBottom: 4, paddingBottom: 4, height: 14 }} />
            ))}
          </View>
        </View>
      </View>

      <Text style={{ fontFamily: 'Inter', fontSize: 9, color: C.muted, fontStyle: 'italic', textAlign: 'center', marginTop: 10 }}>
        87% des crises ont 3 à 5 déclencheurs récurrents. Les nommer = les anticiper.
      </Text>

      <Footer text="À remplir au stylo · Mise à jour mensuelle conseillée" />
    </Page>
  </Document>
)

/* ═══════════════════════════════════════════════════ */
/* 5. Protocole STOP 30 secondes — A5 carte frigo     */
/* ═══════════════════════════════════════════════════ */
const Pdf5 = () => (
  <Document title="Protocole STOP — Kit Crise TDAH" author="Cerveaux Électriques">
    <Page size="A5" style={[s.pageDark, { padding: 26 }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <Text style={[s.brand, { color: C.white }]}>Cerveaux <Text style={s.brandAccent}>Électriques</Text></Text>
        <Text style={[s.brand, { color: 'rgba(255,255,255,0.4)', fontSize: 7 }]}>CARTE FRIGO · A5</Text>
      </View>

      <View style={[s.pill, { backgroundColor: C.yellow, color: C.dark }]}>
        <Text>30 secondes</Text>
      </View>
      <Text style={[s.h1, s.h1Yellow, { fontSize: 22, marginTop: 6 }]}>Protocole STOP</Text>
      <Text style={[s.sub, { color: 'rgba(255,255,255,0.6)' }]}>La fenêtre qui détermine 5 min vs 45 min</Text>

      <View style={s.hairlineDark} />

      {/* 3 phrases à dire */}
      <View style={{ padding: 12, borderRadius: 10, backgroundColor: 'rgba(42,148,144,0.15)', borderLeft: `3 solid ${C.teal}`, marginBottom: 10 }}>
        <Text style={{ fontFamily: 'Poppins', fontSize: 9, fontWeight: 700, color: C.teal, letterSpacing: 1.5, marginBottom: 8 }}>✅ 3 PHRASES À DIRE</Text>
        {['« Je vois que tu es en colère. »', '« C\'est normal de ressentir ça. »', '« Je suis là. Tu es en sécurité. »'].map((p, i) => (
          <Text key={i} style={{ fontFamily: 'Poppins', fontSize: 11, color: C.white, marginBottom: 4, lineHeight: 1.5 }}>{p}</Text>
        ))}
      </View>

      {/* 3 phrases à NE PAS dire */}
      <View style={{ padding: 12, borderRadius: 10, backgroundColor: 'rgba(192,80,106,0.15)', borderLeft: `3 solid ${C.rose}`, marginBottom: 10 }}>
        <Text style={{ fontFamily: 'Poppins', fontSize: 9, fontWeight: 700, color: C.rose, letterSpacing: 1.5, marginBottom: 8 }}>❌ 3 PHRASES À NE JAMAIS DIRE</Text>
        {['« Calme-toi tout de suite ! »', '« Arrête, ça suffit ! »', '« Tu exagères. »'].map((p, i) => (
          <Text key={i} style={{ fontFamily: 'Poppins', fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 4, textDecoration: 'line-through', lineHeight: 1.5 }}>{p}</Text>
        ))}
      </View>

      {/* Méthode 30s */}
      <View style={{ padding: 12, borderRadius: 10, backgroundColor: 'rgba(245,224,109,0.10)', borderLeft: `3 solid ${C.yellow}` }}>
        <Text style={{ fontFamily: 'Poppins', fontSize: 9, fontWeight: 700, color: C.yellow, letterSpacing: 1.5, marginBottom: 8 }}>⏱ MES 30 PREMIÈRES SECONDES</Text>
        {[
          '3 respirations 4-4-6 (inspire 4s · bloque 4s · expire 6s)',
          'Descendre à sa hauteur (à genoux, à 1m)',
          'Voix basse · première phrase de validation',
        ].map((step, i) => (
          <View key={i} style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'flex-start' }}>
            <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: C.yellow, alignItems: 'center', justifyContent: 'center', marginRight: 8, marginTop: 1 }}>
              <Text style={{ fontFamily: 'Poppins', fontSize: 9, fontWeight: 800, color: C.dark }}>{i + 1}</Text>
            </View>
            <Text style={{ fontFamily: 'Inter', fontSize: 10, color: C.white, flex: 1, lineHeight: 1.5 }}>{step}</Text>
          </View>
        ))}
      </View>

      <Text fixed style={[s.footer, { color: 'rgba(255,255,255,0.45)' }]}>Découpe · plastifie · aimante au frigo · Source : Siegel & Bryson 2012</Text>
    </Page>
  </Document>
)

/* ═══════════════════════════════════════════════════ */
/* 6. Guide réparation après-crise — A4 portrait      */
/* ═══════════════════════════════════════════════════ */
const reparSteps = [
  { n: 1, t: '0 → 15 min', titre: 'Présence physique sans mots', color: C.teal,
    body: 'Le cortex se reconnecte lentement. Reste proche, calme, disponible. Pas de questions, pas de débrief. Câlin proposé (pas imposé). Verre d\'eau. Couverture.' },
  { n: 2, t: '15 → 30 min', titre: 'Réparation par le corps', color: C.yellow,
    body: 'Si l\'enfant t\'accepte : main sur l\'épaule, bras autour, regard doux. Le corps répare avant les mots. Tu enseignes : "les conflits ne détruisent pas l\'amour".' },
  { n: 3, t: '30 → 45 min', titre: 'Débrief doux — 2 questions seulement', color: C.orange,
    body: '« Comment tu te sens maintenant ? » puis « Qu\'est-ce qu\'on pourrait faire autrement la prochaine fois ? ». Tu écoutes plus que tu parles. Pas de procès.' },
  { n: 4, t: 'Plus tard', titre: 'Réévaluer les sanctions de crise', color: C.rose,
    body: 'Les décisions prises pendant la crise sont toujours disproportionnées (ton cortex aussi était hors-ligne). Annoncer « j\'ai réfléchi, c\'était trop » n\'est pas une faiblesse — c\'est un modèle.' },
]

const Pdf6 = () => (
  <Document title="Guide réparation — Kit Crise TDAH" author="Cerveaux Électriques">
    <Page size="A4" style={s.pageCream}>
      <Brand />
      <View style={[s.pill, { backgroundColor: C.yellow, color: C.dark }]}>
        <Text>Après la crise</Text>
      </View>
      <Text style={[s.h1, { color: C.text, marginTop: 10 }]}>Guide de réparation</Text>
      <Text style={[s.sub, { color: C.muted }]}>Ce qui se passe APRÈS compte plus que la crise elle-même</Text>
      <View style={s.hairline} />

      {reparSteps.map((step) => (
        <View key={step.n} wrap={false} style={{ flexDirection: 'row', marginBottom: 14, padding: 12, borderRadius: 10, backgroundColor: C.white, borderLeft: `4 solid ${step.color}` }}>
          <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: step.color, alignItems: 'center', justifyContent: 'center', marginRight: 14 }}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: 800, color: C.white }}>{step.n}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: 700, color: C.text }}>{step.titre}</Text>
              <Text style={{ fontFamily: 'Inter', fontSize: 9, color: step.color, fontWeight: 600 }}>{step.t}</Text>
            </View>
            <Text style={{ fontFamily: 'Inter', fontSize: 10.5, color: C.text, lineHeight: 1.55 }}>{step.body}</Text>
          </View>
        </View>
      ))}

      <View style={{ padding: 14, borderRadius: 10, backgroundColor: C.dark, marginTop: 6 }}>
        <Text style={{ fontFamily: 'Poppins', fontSize: 10, fontWeight: 700, color: C.yellow, letterSpacing: 1.2, marginBottom: 6 }}>💡 LA RÈGLE D'OR</Text>
        <Text style={{ fontFamily: 'Inter', fontSize: 11, color: C.white, lineHeight: 1.5, fontStyle: 'italic' }}>
          Les ruptures relationnelles ne sont pas le problème. C'est l'absence de réparation qui crée des dégâts durables. — Tronick, 2007
        </Text>
      </View>

      <Footer text="Imprime · pose à portée · La réparation se construit en 4 temps · 78% baisse d'intensité sur 6 semaines (HAS 2024)" />
    </Page>
  </Document>
)

/* ═══════════════════════════════════════════════════ */
/* 7. Journal de crise vierge — A5 portrait           */
/* ═══════════════════════════════════════════════════ */
const Field = ({ label, lines = 1, half = false }: { label: string; lines?: number; half?: boolean }) => (
  <View style={{ marginBottom: 8, width: half ? '48%' : '100%' }}>
    <Text style={{ fontFamily: 'Poppins', fontSize: 7.5, fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 }}>{label}</Text>
    {Array.from({ length: lines }).map((_, i) => (
      <View key={i} style={{ height: 14, borderBottom: `0.8 solid ${C.hairline}`, marginBottom: 2 }} />
    ))}
  </View>
)

const IntensityScale = () => (
  <View style={{ marginBottom: 8 }}>
    <Text style={{ fontFamily: 'Poppins', fontSize: 7.5, fontWeight: 700, color: C.muted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Intensité (entoure)</Text>
    <View style={{ flexDirection: 'row', gap: 6 }}>
      {[
        { n: 1, c: C.teal },
        { n: 2, c: C.yellow },
        { n: 3, c: C.orange },
        { n: 4, c: C.rose },
        { n: 5, c: '#7A2040' },
      ].map(x => (
        <View key={x.n} style={{ width: 26, height: 26, borderRadius: 13, borderWidth: 1.5, borderColor: x.c, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 11, fontWeight: 700, color: x.c }}>{x.n}</Text>
        </View>
      ))}
    </View>
  </View>
)

const Pdf7 = () => (
  <Document title="Journal de crise — Kit Crise TDAH" author="Cerveaux Électriques">
    <Page size="A5" style={[s.pageCream, { padding: 22 }]}>
      <View style={[s.brandRow, { marginBottom: 10 }]}>
        <Text style={[s.brand, { color: C.text, fontSize: 7 }]}>CERVEAUX <Text style={s.brandAccent}>ÉLECTRIQUES</Text> · KIT CRISE</Text>
        <Text style={[s.brand, { color: C.muted, fontSize: 7 }]}>cerveau-electrique.fr</Text>
      </View>
      <View style={[s.pill, { backgroundColor: C.violet, color: C.white }]}>
        <Text>Journal · 1 fiche par crise</Text>
      </View>
      <Text style={[s.h1, { color: C.text, marginTop: 6, fontSize: 20 }]}>Journal de crise</Text>
      <Text style={[s.sub, { color: C.muted, fontSize: 9 }]}>Le pattern apparaît après 30 jours · Pas avant.</Text>
      <View style={[s.hairline, { marginVertical: 10 }]} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Field label="Date" half />
        <Field label="Heure de début" half />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Field label="Lieu" half />
        <Field label="Durée" half />
      </View>

      <Field label="Déclencheur identifié" lines={2} />
      <IntensityScale />
      <Field label="Phase la plus intense atteinte (1 / 2 / 3 / 4)" />
      <Field label="Ce qui a aidé (réflexe efficace)" lines={2} />
      <Field label="Ce que je referais différemment la prochaine fois" lines={2} />

      <View style={{ marginTop: 4, padding: 8, borderRadius: 6, backgroundColor: C.dark }}>
        <Text style={{ fontFamily: 'Poppins', fontSize: 7.5, fontWeight: 700, color: C.yellow, letterSpacing: 1, marginBottom: 4 }}>💡 RAPPEL</Text>
        <Text style={{ fontFamily: 'Inter', fontSize: 8.5, color: C.white, lineHeight: 1.45 }}>
          Remplir à FROID, 1h après la crise. Pas de jugement. Tu collectes des données, pas des fautes.
        </Text>
      </View>

      <Footer text="Imprime en lot (5 à 10 fiches) · Range dans un classeur · Relis tous les 30 jours" />
    </Page>
  </Document>
)

/* ═══════════════════════════════════════════════════ */
/* 8. Phrases STOP — template A5 + 9 contextes        */
/* ═══════════════════════════════════════════════════ */
const PhraseCard = ({ text, kind }: { text: string; kind: 'dire' | 'nepas' }) => {
  const accent = kind === 'dire' ? C.teal : C.rose
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: C.white,
      borderLeftWidth: 5, borderLeftColor: accent,
      borderRadius: 4,
      paddingVertical: 6, paddingHorizontal: 11,
      marginBottom: 4,
    }}>
      <Text style={{
        fontFamily: 'Poppins', fontSize: 13, fontWeight: 700,
        color: kind === 'dire' ? C.text : C.muted,
        textDecoration: kind === 'nepas' ? 'line-through' : 'none',
        flex: 1,
      }}>
        « {text} »
      </Text>
    </View>
  )
}

type StopConfig = {
  file: string
  contexte: string | null
  phrasesDire: string[]
  phrasesNePas: string[]
  mantra: string
  labelDire?: string
  labelNePas?: string
}

const PhrasesStopTemplate = ({ cfg }: { cfg: StopConfig }) => {
  const mantraFontSize = cfg.mantra.length > 40 ? 24 : 28
  return (
    <Document title={`Phrases STOP${cfg.contexte ? ' — ' + cfg.contexte : ''} · Cockpit Crises TDAH`} author="Cerveaux Électriques">
      <Page size="A5" style={[s.pageCream, { padding: 24, paddingBottom: 16 }]}>
        {/* Hero — STOP dominant + sous-titre contexte (optionnel) */}
        <View style={{ alignItems: 'flex-start', marginTop: 0, marginBottom: cfg.contexte ? 22 : 28 }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 84, fontWeight: 800, color: C.rose, lineHeight: 1.05, letterSpacing: -2 }}>
            STOP
          </Text>
          {cfg.contexte && (
            <Text style={{ fontFamily: 'Poppins', fontSize: 13, fontWeight: 700, color: C.teal, letterSpacing: 3.5, textTransform: 'uppercase', marginTop: 6 }}>
              · {cfg.contexte} ·
            </Text>
          )}
        </View>

        {/* À DIRE */}
        <View style={[s.pill, { backgroundColor: C.teal, color: C.white, marginBottom: 6 }]}>
          <Text>{cfg.labelDire || 'À DIRE'}</Text>
        </View>
        {cfg.phrasesDire.map((p, i) => <PhraseCard key={i} text={p} kind="dire" />)}

        <View style={{ height: 10 }} />

        {/* À NE JAMAIS DIRE */}
        <View style={[s.pill, { backgroundColor: C.rose, color: C.white, marginBottom: 6 }]}>
          <Text>{cfg.labelNePas || 'À NE JAMAIS DIRE'}</Text>
        </View>
        {cfg.phrasesNePas.map((p, i) => <PhraseCard key={i} text={p} kind="nepas" />)}

        {/* Mémo bas — Le Monstre + mantra Caveat */}
        <View style={{
          flexDirection: 'row', alignItems: 'center',
          backgroundColor: C.yellow,
          borderRadius: 12,
          padding: 14,
          marginTop: 14,
        }}>
          <Image src="./assets/monstre-calin.png" style={{ width: 80, height: 80, marginRight: 14 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: 'Caveat', fontSize: mantraFontSize, fontWeight: 700, color: C.text, lineHeight: 1.05 }}>
              {cfg.mantra}
            </Text>
          </View>
        </View>

        {/* Footer discret */}
        <Text fixed style={{ position: 'absolute', bottom: 12, left: 0, right: 0, paddingHorizontal: 24, fontFamily: 'Inter', fontSize: 7.5, color: C.muted, textAlign: 'center' }}>
          Cerveaux <Text style={{ color: C.rose, fontFamily: 'Poppins', fontWeight: 700 }}>Électriques</Text>   ·   cerveau-electrique.fr
        </Text>
      </Page>
    </Document>
  )
}

const STOPS: StopConfig[] = [
  {
    file: 'phrases-stop.pdf',
    contexte: null,
    phrasesDire: ['Je vois que c\'est dur.', 'Je suis là.', 'Prends le temps qu\'il faut.'],
    phrasesNePas: ['Calme-toi !', 'Arrête !', 'Tu exagères.'],
    mantra: '30 secondes de silence avant de parler.',
  },
  {
    file: 'phrases-stop-devoirs.pdf',
    contexte: 'DEVOIRS',
    phrasesDire: [
      'On s\'arrête 5 minutes.',
      'Tu peux faire un seul exercice.',
      'Je sais que c\'est dur pour ton cerveau.',
    ],
    phrasesNePas: [
      'Concentre-toi enfin !',
      'Tu ne fais aucun effort.',
      'Ton frère y arrive bien, lui.',
    ],
    mantra: '30 minutes max. Le reste attendra demain.',
  },
  {
    file: 'phrases-stop-transitions.pdf',
    contexte: 'TRANSITIONS',
    phrasesDire: [
      'Dans 5 minutes on s\'arrête.',
      'Tu finis ton niveau et après on y va.',
      'Je sais que c\'est dur de quitter.',
    ],
    phrasesNePas: [
      'On y va MAINTENANT !',
      'Éteins ça tout de suite.',
      'Je ne te le redirai pas.',
    ],
    mantra: 'Toujours prévenir. Jamais surprendre.',
  },
  {
    file: 'phrases-stop-public.pdf',
    contexte: 'EN PUBLIC',
    phrasesDire: [
      'Je suis là, on respire.',
      'On va sortir 2 minutes prendre l\'air.',
      'Ce que tu ressens est normal.',
    ],
    phrasesNePas: [
      'Tu me fais honte.',
      'Tout le monde te regarde.',
      'Arrête, sois sage.',
    ],
    mantra: 'Sors d\'abord. Gère ensuite.',
  },
  {
    file: 'phrases-stop-estime.pdf',
    contexte: 'JE SUIS NUL',
    phrasesDire: [
      'Tu te sens nul là. C\'est horrible.',
      'Ce n\'est pas vrai, mais je comprends.',
      'Ton cerveau te dit ça quand il fatigue.',
    ],
    phrasesNePas: [
      'Mais non, tu es intelligent !',
      'Arrête de dire des bêtises.',
      'Tu vas finir par y croire.',
    ],
    mantra: 'Valider d\'abord. Rassurer ensuite.',
  },
  {
    file: 'phrases-stop-fratrie.pdf',
    contexte: 'FRATRIE',
    phrasesDire: [
      'Tu te sens moins aimé là, c\'est ça ?',
      'Vous avez chacun votre place.',
      'On trouvera un moment juste toi et moi.',
    ],
    phrasesNePas: [
      'Mais non, je vous aime pareil.',
      'Sois gentil avec ta sœur.',
      'Tu es l\'aîné, tu dois comprendre.',
    ],
    mantra: 'Derrière la provocation, une émotion à nommer.',
  },
  {
    file: 'phrases-stop-apres.pdf',
    contexte: 'APRÈS LA CRISE',
    phrasesDire: [
      'C\'était dur pour toi aussi.',
      'On en reparlera quand tu seras prêt.',
      'Je t\'aime toujours. Même quand c\'est dur.',
    ],
    phrasesNePas: [
      'Tu vois ce que tu as fait ?',
      'Excuse-toi tout de suite.',
      'Maintenant tu vas être puni.',
    ],
    mantra: 'Le corps avant les mots. Le câlin avant la leçon.',
  },
  {
    file: 'phrases-stop-parent.pdf',
    contexte: 'QUAND TU CRAQUES',
    labelDire: 'À TE DIRE',
    labelNePas: 'À NE JAMAIS TE DIRE',
    phrasesDire: [
      'Je suis épuisée, c\'est légitime.',
      'J\'ai le droit de souffler 5 minutes.',
      'Je vais réparer, pas me punir.',
    ],
    phrasesNePas: [
      'Je suis une mauvaise mère.',
      'Les autres y arrivent, pas moi.',
      'Mon enfant me déteste.',
    ],
    mantra: 'Tu ne peux pas remplir leur verre si le tien est vide.',
  },
  {
    file: 'phrases-stop-sensoriel.pdf',
    contexte: 'SENSORIEL',
    phrasesDire: [
      'Trop de choses rentrent en même temps.',
      'On va dans un endroit calme 5 minutes.',
      'Dis-moi ce qui te gêne.',
    ],
    phrasesNePas: [
      'Ce n\'est rien, ça va passer.',
      'Tu fais un caprice pour une étiquette ?',
      'Arrête d\'être douillet.',
    ],
    mantra: 'Le déclencheur est réel, même s\'il est invisible.',
  },
]

/* ═══════════════════════════════════════════════════ */
/* 9. Cards Émotions — A4 portrait, 2 pages           */
/* Recto : 8 émotions à découper                      */
/* Verso : 5 réponses parent                          */
/* ═══════════════════════════════════════════════════ */
const EMOTIONS = [
  { label: 'Colère',       phrase: 'Je suis en colère',  img: './assets/monstre-colere.png',    color: '#C0506A' },
  { label: 'Peur',         phrase: 'J\'ai peur',         img: './assets/monstre-peur.png',      color: '#7C3AED' },
  { label: 'Tristesse',    phrase: 'Je suis triste',     img: './assets/monstre-triste.png',    color: '#5B7FBE' },
  { label: 'Trop plein',   phrase: 'C\'est trop',        img: './assets/monstre-surexcite.png', color: '#F5A623' },
  { label: 'Joie',         phrase: 'Je suis content',    img: './assets/monstre-rigole.png',    color: '#E8B84B' },
  { label: 'Honte',        phrase: 'J\'ai honte',        img: './assets/monstre-honte.png',     color: '#A0758E' },
  { label: 'Confusion',    phrase: 'Je comprends pas',   img: './assets/monstre-confus.png',    color: '#6B7280' },
  { label: 'Besoin câlin', phrase: 'Viens me voir',      img: './assets/monstre-calin.png',     color: '#2A9490' },
  { label: 'Surprise',     phrase: 'Ça me surprend !',   img: './assets/monstre-surpris.png',   color: '#10B981' },
]

const REPONSES = [
  { icon: '✋', label: 'STOP silence', desc: 'Pose ta main sur ta bouche. Compte 5 secondes avant de parler.' },
  { icon: '💛', label: 'Je suis là',   desc: 'Pose ta main sur son épaule. Reste à côté. Ne dis rien.' },
  { icon: '🏠', label: 'Coin calme',   desc: 'Propose : « On va dans ton coin ensemble si tu veux. »' },
  { icon: '🌬', label: 'On respire',   desc: 'Inspire 4 secondes. Expire 4 secondes. Fais-le avec lui.' },
  { icon: '💞', label: 'Je t\'aime',   desc: 'Avant tout, après tout. Quoi qu\'il arrive. Toujours.' },
]

// Card format jeu de cartes : 63×88mm = 178.6×249.4 pt
// Grille 3×3 sur A4 (595×842pt) → 9 cards par page
const EmotionCard = ({ emo }: { emo: typeof EMOTIONS[number] }) => (
  <View style={{
    width: 178,
    height: 249,
    marginBottom: 6,
    padding: 8,
    backgroundColor: C.white,
    borderWidth: 1.2,
    borderStyle: 'dashed',
    borderColor: emo.color,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  }}>
    {/* Bandeau couleur en haut */}
    <View style={{ alignSelf: 'stretch', height: 4, backgroundColor: emo.color, borderRadius: 2, marginBottom: 4 }} />
    <Image src={emo.img} style={{ width: 110, height: 110 }} />
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontFamily: 'Poppins', fontSize: 17, fontWeight: 800, color: emo.color, textAlign: 'center', marginBottom: 4 }}>
        {emo.label}
      </Text>
      <Text style={{ fontFamily: 'Caveat', fontSize: 18, fontWeight: 700, color: C.text, textAlign: 'center', lineHeight: 1.0 }}>
        « {emo.phrase} »
      </Text>
    </View>
  </View>
)

const ReponseRow = ({ r }: { r: typeof REPONSES[number] }) => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.white,
    borderRadius: 8,
    padding: 9,
    marginBottom: 5,
    borderLeftWidth: 4,
    borderLeftColor: C.rose,
  }}>
    <Text style={{ fontSize: 18, marginRight: 10, width: 22, textAlign: 'center' }}>{r.icon}</Text>
    <View style={{ flex: 1 }}>
      <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: 800, color: C.text, marginBottom: 1 }}>
        {r.label}
      </Text>
      <Text style={{ fontFamily: 'Inter', fontSize: 9.5, color: C.muted, lineHeight: 1.4 }}>
        {r.desc}
      </Text>
    </View>
  </View>
)

const PdfCardsEmotions = () => (
  <Document title="Cards Émotions · Cockpit Crises TDAH" author="Cerveaux Électriques">
    {/* ═══ Page 1 — RECTO : 9 cards format jeu de cartes ═══ */}
    <Page size="A4" style={[s.pageCream, { padding: 22 }]}>
      <View style={[s.brandRow, { marginBottom: 4 }]}>
        <Text style={[s.brand, { color: C.text, fontSize: 7 }]}>
          CERVEAUX <Text style={s.brandAccent}>ÉLECTRIQUES</Text> · MES ÉMOTIONS · OUTIL ENFANT
        </Text>
        <Text style={[s.brand, { color: C.muted, fontSize: 7 }]}>cerveau-electrique.fr</Text>
      </View>

      {/* Grille 3×3 — 9 cards format poker (178×249pt) */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 6 }}>
        {EMOTIONS.map((emo, i) => <EmotionCard key={i} emo={emo} />)}
      </View>

      <Footer text="Plastifie la feuille entière · Découpe sur les pointillés · 9 cartes prêtes" />
    </Page>

    {/* ═══ Page 2 — MÉMO PARENT A5 : 5 réponses ═══ */}
    <Page size="A5" style={[s.pageCream, { padding: 22, paddingBottom: 16 }]}>
      <View style={[s.brandRow, { marginBottom: 6 }]}>
        <Text style={[s.brand, { color: C.text, fontSize: 7 }]}>
          CERVEAUX <Text style={s.brandAccent}>ÉLECTRIQUES</Text> · MÉMO PARENT
        </Text>
        <Text style={[s.brand, { color: C.muted, fontSize: 7 }]}>cerveau-electrique.fr</Text>
      </View>

      <View style={{ alignItems: 'flex-start', marginBottom: 2 }}>
        <Text style={{ fontFamily: 'Caveat', fontSize: 18, fontWeight: 700, color: C.teal, marginBottom: -2 }}>
          Quand il pointe une carte
        </Text>
        <Text style={{ fontFamily: 'Poppins', fontSize: 22, fontWeight: 800, color: C.text, lineHeight: 1.1, letterSpacing: -0.3 }}>
          Mes 5 réponses
        </Text>
        <Text style={{ fontFamily: 'Inter', fontSize: 9.5, color: C.muted, marginTop: 10 }}>
          Choisis-en une. N'importe laquelle. Aucune n'est mauvaise.
        </Text>
      </View>

      <View style={[s.hairline, { marginVertical: 10 }]} />

      {REPONSES.map((r, i) => <ReponseRow key={i} r={r} />)}

      {/* Mémo bas — bandeau jaune compact */}
      <View style={{
        backgroundColor: C.yellow,
        borderRadius: 10,
        padding: 12,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Image src="./assets/monstre-calin.png" style={{ width: 56, height: 56, marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: 'Caveat', fontSize: 19, fontWeight: 700, color: C.text, lineHeight: 1.05 }}>
            La carte qu'il choisit{'\n'}n'est jamais la mauvaise.
          </Text>
        </View>
      </View>

      <Footer text="Plastifie · Garde-le visible · Ton mémo, pas ton jugement" />
    </Page>
  </Document>
)

/* ═══════════════════════════════════════════════════ */
/* Run all                                            */
/* ═══════════════════════════════════════════════════ */
const docs = [
  { name: '1-signaux-alerte.pdf', doc: <Pdf1 /> },
  { name: '2-thermometre-emotionnel.pdf', doc: <Pdf2 /> },
  { name: '3-checklist-pre-crise.pdf', doc: <Pdf3 /> },
  { name: '4-carte-triggers.pdf', doc: <Pdf4 /> },
  { name: '5-protocole-stop-30s.pdf', doc: <Pdf5 /> },
  { name: '6-guide-reparation.pdf', doc: <Pdf6 /> },
  { name: '7-journal-crise-vierge.pdf', doc: <Pdf7 /> },
  ...STOPS.map(cfg => ({ name: cfg.file, doc: <PhrasesStopTemplate cfg={cfg} /> })),
  { name: 'cards-emotions.pdf', doc: <PdfCardsEmotions /> },
]

;(async () => {
  for (const d of docs) {
    process.stdout.write(`▸ ${d.name} … `)
    await renderToFile(d.doc, `./out/${d.name}`)
    console.log('✓')
  }
  console.log(`\n✓ ${docs.length} PDFs générés dans pdfs/out/`)
})()

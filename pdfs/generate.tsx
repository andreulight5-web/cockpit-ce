import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Font, Svg, Path, Circle, Rect, Link, renderToFile } from '@react-pdf/renderer'
import QRCode from 'qrcode'

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
  img: string             // chemin PNG du Monstre pour ce thème
  accent?: string         // couleur du sous-titre (par défaut C.teal)
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
            <Text style={{ fontFamily: 'Poppins', fontSize: 13, fontWeight: 700, color: cfg.accent || C.teal, letterSpacing: 3.5, textTransform: 'uppercase', marginTop: 6 }}>
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
          <Image src={cfg.img} style={{ width: 80, height: 80, marginRight: 14 }} />
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
    img: './assets/monstre-decouvert.png',
    accent: '#2A9490', // teal
    phrasesDire: ['Je vois que c\'est dur.', 'Je suis là.', 'Prends le temps qu\'il faut.'],
    phrasesNePas: ['Calme-toi !', 'Arrête !', 'Tu exagères.'],
    mantra: '30 secondes de silence avant de parler.',
  },
  {
    file: 'phrases-stop-devoirs.pdf',
    contexte: 'DEVOIRS',
    img: './assets/monstre-confus.png',
    accent: '#F5A623', // orange — école/effort
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
    img: './assets/monstre-surexcite.png',
    accent: '#7C3AED', // violet — changement
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
    img: './assets/monstre-honte.png',
    accent: '#E0705A', // rouge muted — gêne/exposition
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
    img: './assets/monstre-calin.png',
    accent: '#C0506A', // rose CE — cœur/valeur
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
    img: './assets/monstre-colere.png',
    accent: '#A0758E', // rose-violet — relationnel
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
    img: './assets/monstre-rigole.png',
    accent: '#E8B84B', // jaune chaud — récolte/réparation
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
    img: './assets/monstre-triste.png',
    accent: '#10B981', // vert frais — auto-soin
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
    img: './assets/monstre-cache.png',
    accent: '#5B7FBE', // bleu doux — calme/silence
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
    <IntercalaireCardsEmotionsPage />
    {/* ═══ Page 2 — RECTO : 9 cards format jeu de cartes ═══ */}
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
  </Document>
)

/* ═══════════════════════════════════════════════════ */
/* 9b. Phrases STOP DECK — 2 pages A4 paysage         */
/*  Page 1 = 9 rectos (grille 3×3, 80×55mm)           */
/*  Page 2 = 9 versos (miroir horizontal pour R-V)    */
/* ═══════════════════════════════════════════════════ */
type DeckTheme = {
  contexte: string
  phrasesDire: string[]
  phrasesNePas: string[]
  reflexe: string
  img: string
  accent: string
  labelNePas?: string
}

const DECK_THEMES: DeckTheme[] = [
  {
    contexte: 'UNIVERSEL', accent: '#2A9490', img: './assets/monstre-decouvert.png',
    phrasesDire:  ['Je vois que c\'est dur.', 'Je suis là.', 'Prends le temps qu\'il faut.'],
    phrasesNePas: ['Calme-toi !', 'Arrête !', 'Tu exagères.'],
    reflexe: '30 secondes de silence avant de parler.',
  },
  {
    contexte: 'DEVOIRS', accent: '#F5A623', img: './assets/monstre-confus.png',
    phrasesDire:  ['On s\'arrête 5 minutes.', 'Tu peux faire un seul exercice.', 'Je sais que c\'est dur pour ton cerveau.'],
    phrasesNePas: ['Concentre-toi enfin !', 'Tu ne fais aucun effort.', 'Ton frère y arrive bien, lui.'],
    reflexe: '30 min max. Le reste attendra demain.',
  },
  {
    contexte: 'TRANSITIONS', accent: '#7C3AED', img: './assets/monstre-surexcite.png',
    phrasesDire:  ['Dans 5 minutes on s\'arrête.', 'Tu finis ton niveau et après on y va.', 'Je sais que c\'est dur de quitter.'],
    phrasesNePas: ['On y va MAINTENANT !', 'Éteins ça tout de suite.', 'Je ne te le redirai pas.'],
    reflexe: 'Toujours prévenir. Jamais surprendre.',
  },
  {
    contexte: 'EN PUBLIC', accent: '#E0705A', img: './assets/monstre-honte.png',
    phrasesDire:  ['Je suis là, on respire.', 'On va sortir 2 minutes prendre l\'air.', 'Ce que tu ressens est normal.'],
    phrasesNePas: ['Tu me fais honte.', 'Tout le monde te regarde.', 'Arrête, sois sage.'],
    reflexe: 'Sors d\'abord. Gère ensuite.',
  },
  {
    contexte: 'ESTIME', accent: '#C0506A', img: './assets/monstre-calin.png',
    phrasesDire:  ['Tu te sens nul là. C\'est horrible.', 'Ce n\'est pas vrai, mais je comprends.', 'Ton cerveau te dit ça quand il fatigue.'],
    phrasesNePas: ['Mais non, tu es intelligent !', 'Arrête de dire des bêtises.', 'Tu vas finir par y croire.'],
    reflexe: 'Valider d\'abord. Rassurer ensuite.',
  },
  {
    contexte: 'FRATRIE', accent: '#A0758E', img: './assets/monstre-colere.png',
    phrasesDire:  ['Tu te sens moins aimé là, c\'est ça ?', 'Vous avez chacun votre place.', 'On trouvera un moment juste toi et moi.'],
    phrasesNePas: ['Mais non, je vous aime pareil.', 'Sois gentil avec ta sœur.', 'Tu es l\'aîné, tu dois comprendre.'],
    reflexe: 'Derrière la provocation, une émotion à nommer.',
  },
  {
    contexte: 'APRÈS LA CRISE', accent: '#E8B84B', img: './assets/monstre-rigole.png',
    phrasesDire:  ['C\'était dur pour toi aussi.', 'On en reparlera quand tu seras prêt.', 'Je t\'aime toujours. Même quand c\'est dur.'],
    phrasesNePas: ['Tu vois ce que tu as fait ?', 'Excuse-toi tout de suite.', 'Maintenant tu vas être puni.'],
    reflexe: 'Le corps avant les mots. Le câlin avant la leçon.',
  },
  {
    contexte: 'PARENT', accent: '#10B981', img: './assets/monstre-triste.png',
    labelNePas: 'À NE JAMAIS TE DIRE',
    phrasesDire:  ['Je suis épuisée, c\'est légitime.', 'J\'ai le droit de souffler 5 minutes.', 'Je vais réparer, pas me punir.'],
    phrasesNePas: ['Je suis une mauvaise mère.', 'Les autres y arrivent, pas moi.', 'Mon enfant me déteste.'],
    reflexe: 'Tu ne peux pas remplir leur verre si le tien est vide.',
  },
  {
    contexte: 'SENSORIEL', accent: '#5B7FBE', img: './assets/monstre-peur.png',
    phrasesDire:  ['Trop de choses rentrent en même temps.', 'On va dans un endroit calme 5 minutes.', 'Dis-moi ce qui te gêne.'],
    phrasesNePas: ['Ce n\'est rien, ça va passer.', 'Tu fais un caprice pour une étiquette ?', 'Arrête d\'être douillet.'],
    reflexe: 'Le déclencheur est réel, même s\'il est invisible.',
  },
]

// Carte 105×82mm = 297×233 pt (74mm utile + 8mm perforation supplémentaire)
// Angles carrés. Zone perforation interne = 20mm = 57pt en haut.
const CARD_W = 297
const CARD_H = 233

const PhraseList = ({ phrases, color, strike }: { phrases: string[]; color: string; strike?: boolean }) => (
  <View>
    {phrases.map((p, i) => (
      <View key={i} style={{ flexDirection: 'row', marginBottom: 4, alignItems: 'flex-start' }}>
        <Text style={{ fontFamily: 'Poppins', fontSize: 8.5, fontWeight: 700, color, marginRight: 4, lineHeight: 1.3 }}>•</Text>
        <Text style={{ fontFamily: 'Poppins', fontSize: 8.5, fontWeight: 700, color, lineHeight: 1.3, flex: 1, ...(strike ? { textDecoration: 'line-through' } : {}) }}>
          {p}
        </Text>
      </View>
    ))}
  </View>
)

const DeckCardFull = ({ t }: { t: DeckTheme }) => (
  <View style={{
    width: CARD_W, height: CARD_H,
    backgroundColor: C.white,
    borderRadius: 0,
    borderWidth: 1, borderStyle: 'dashed', borderColor: '#94A3B8',
    overflow: 'hidden',
  }}>
    {/* Zone perforation anneau — 12mm vierges */}
    <View style={{ height: 34 }} />
    {/* Bandeau accent thème */}
    <View style={{ height: 22, backgroundColor: t.accent, paddingHorizontal: 12, justifyContent: 'center' }}>
      <Text style={{ fontFamily: 'Poppins', fontSize: 9, fontWeight: 800, color: C.white, letterSpacing: 2 }}>
        {t.contexte}
      </Text>
    </View>

    {/* Corps */}
    <View style={{ flex: 1, padding: 10 }}>
      {/* 2 colonnes : À DIRE | À NE JAMAIS DIRE */}
      <View style={{ flexDirection: 'row', flex: 1, gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 7, fontWeight: 700, color: C.teal, letterSpacing: 1.5, marginBottom: 4 }}>
            ✓ À DIRE
          </Text>
          <PhraseList phrases={t.phrasesDire} color={C.teal} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 7, fontWeight: 700, color: C.rose, letterSpacing: 1.5, marginBottom: 4 }}>
            ✗ {t.labelNePas || 'À NE JAMAIS DIRE'}
          </Text>
          <PhraseList phrases={t.phrasesNePas} color={C.rose} strike />
        </View>
      </View>

      {/* Bas : Réflexe à gauche + Monstre à droite */}
      <View style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 0.6, borderTopColor: '#E8E5DA', paddingTop: 6, marginTop: 4 }}>
        <View style={{ flex: 1, paddingRight: 8 }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 7, fontWeight: 700, color: t.accent, letterSpacing: 1.5, marginBottom: 2 }}>
            RÉFLEXE
          </Text>
          <Text style={{ fontFamily: 'Inter', fontSize: 8, fontStyle: 'italic', color: C.text, lineHeight: 1.3 }}>
            {t.reflexe}
          </Text>
        </View>
        {/* Wrapper carré strict pour éviter tout débordement de l'image */}
        <View style={{ width: 40, height: 40, overflow: 'hidden', flexShrink: 0 }}>
          <Image src={t.img} style={{ width: 40, height: 40, objectFit: 'contain' }} />
        </View>
      </View>
    </View>
  </View>
)

const DeckCardTitle = () => (
  <View style={{
    width: CARD_W, height: CARD_H,
    backgroundColor: C.white,  // zone perforation reste blanche
    borderRadius: 0,
    borderWidth: 1, borderStyle: 'dashed', borderColor: '#94A3B8',
    overflow: 'hidden',
  }}>
    {/* Zone perforation anneau — 12mm vierges */}
    <View style={{ height: 34 }} />
    {/* Bloc rose plein */}
    <View style={{ flex: 1, backgroundColor: '#C0506A', padding: 16, justifyContent: 'space-between' }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Image src="./assets/logo-ce.png" style={{ width: 36, height: 36, borderRadius: 18 }} />
      <Text style={{ fontFamily: 'Poppins', fontSize: 7, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: 1.5, marginTop: 4 }}>
        9 CARTES
      </Text>
    </View>
    <View>
      <Text style={{ fontFamily: 'Caveat', fontSize: 18, fontWeight: 700, color: '#F5E06D', marginBottom: -4 }}>
        Mes
      </Text>
      <Text style={{ fontFamily: 'Poppins', fontSize: 32, fontWeight: 800, color: C.white, lineHeight: 1, letterSpacing: -1 }}>
        Phrases STOP
      </Text>
      <Text style={{ fontFamily: 'Inter', fontSize: 9, color: 'rgba(255,255,255,0.85)', marginTop: 8, lineHeight: 1.4 }}>
        Pour ne plus dire ce qui blesse{'\n'}au moment où ça monte.
      </Text>
    </View>
    <Text style={{ fontFamily: 'Poppins', fontSize: 7, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: 1.5, alignSelf: 'flex-end' }}>
      CERVEAUX ÉLECTRIQUES · cerveau-electrique.fr
    </Text>
    </View>
  </View>
)

const DeckCardEmpty = () => (
  <View style={{
    width: CARD_W, height: CARD_H,
    backgroundColor: C.white,
    borderRadius: 0,
    borderWidth: 1, borderStyle: 'dashed', borderColor: '#94A3B8',
    overflow: 'hidden',
  }}>
    {/* Zone perforation anneau — 12mm vierges */}
    <View style={{ height: 34 }} />
    <View style={{ flex: 1, backgroundColor: C.cream, padding: 16, justifyContent: 'flex-end' }}>
    <Text style={{ fontFamily: 'Inter', fontSize: 8, color: 'rgba(45,45,58,0.25)', textAlign: 'right' }}>
      Carte vierge · pour tes notes
    </Text>
    </View>
  </View>
)

// 9 thèmes répartis sur 3 pages de 4 cartes :
//   page 1 : 0 1 2 3
//   page 2 : 4 5 6 7
//   page 3 : 8 + carte titre + 2 vierges
const PdfPhrasesStopDeck = () => {
  const pages: React.ReactNode[][] = [
    DECK_THEMES.slice(0, 4).map((t, i) => <DeckCardFull key={`p1-${i}`} t={t} />),
    DECK_THEMES.slice(4, 8).map((t, i) => <DeckCardFull key={`p2-${i}`} t={t} />),
    [
      <DeckCardFull key="p3-0" t={DECK_THEMES[8]} />,
      <DeckCardTitle key="p3-1" />,
      <DeckCardEmpty key="p3-2" />,
      <DeckCardEmpty key="p3-3" />,
    ],
  ]

  return (
    <Document title="Phrases STOP — Deck à découper · Cockpit Crises TDAH" author="Cerveaux Électriques">
      {pages.map((cards, pIdx) => (
        <Page key={pIdx} size="A4" orientation="landscape" style={[s.pageCream, { backgroundColor: C.white, padding: 22, paddingTop: 68 }]}>
          <View style={[s.brandRow, { marginBottom: 0 }]}>
            <Text style={[s.brand, { color: C.text, fontSize: 7 }]}>
              CERVEAUX <Text style={s.brandAccent}>ÉLECTRIQUES</Text> · DECK PHRASES STOP · 9 CARTES A7
            </Text>
            <Text style={[s.brand, { color: C.muted, fontSize: 7 }]}>cerveau-electrique.fr</Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignContent: 'space-between', flex: 1 }}>
            {cards}
          </View>
        </Page>
      ))}
    </Document>
  )
}

/* ═══════════════════════════════════════════════════ */
/* 10. Thermomètre des émotions — A4 portrait         */
/* ═══════════════════════════════════════════════════ */
// Thermomètre vertical — 5 zones empilées du BAS (calme) vers le HAUT (explosion)
// La zone et le Monstre grossissent en montant pour appuyer la métaphore "ça monte".
const NIVEAUX = [
  { n: 1, label: 'CALME',      action: 'Tout va bien',           parent: 'Profite, câlin, connexion.',                 color: '#10B981', img: './assets/monstre-calme.png',    height: 88,  imgSize: 48 },
  { n: 2, label: 'AGITÉ',      action: 'Je respire 3 fois',      parent: 'On respire ensemble, 3 fois.',               color: '#F5E06D', img: './assets/monstre-agite.png',    height: 102, imgSize: 60 },
  { n: 3, label: 'TENDU',      action: 'Coin calme',             parent: 'Je vois que c\'est dur. Tu as besoin de quoi ?', color: '#F5A623', img: './assets/monstre-tendu.png',    height: 120, imgSize: 75 },
  { n: 4, label: 'EN COLÈRE',  action: 'Aide-moi !',             parent: 'Propose le coin calme. Maintenant.',         color: '#C0506A', img: './assets/monstre-encolere.png', height: 140, imgSize: 92 },
  { n: 5, label: 'EXPLOSION',  action: 'Silence et présence',    parent: 'Ne dis rien. Reste à côté.',                 color: '#B91C1C', img: './assets/monstre-colere.png',   height: 162, imgSize: 110 },
]

const ThermZone = ({ niv }: { niv: typeof NIVEAUX[number] }) => (
  <View style={{
    flexDirection: 'row',
    height: niv.height,
    backgroundColor: niv.color,
  }}>
    {/* Corps : Monstre + label/action enfant + instruction parent à droite */}
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 }}>
      <View style={{ width: niv.imgSize, height: niv.imgSize, overflow: 'hidden', flexShrink: 0 }}>
        <Image src={niv.img} style={{ width: niv.imgSize, height: niv.imgSize, objectFit: 'contain' }} />
      </View>

      {/* Sous-bloc enfant — dominant */}
      <View style={{ flex: 1.1, marginLeft: 14 }}>
        <Text style={{ fontFamily: 'Poppins', fontSize: 22, fontWeight: 800, color: '#FFFFFF', letterSpacing: 0.5, lineHeight: 1.05, marginBottom: 4 }}>
          {niv.label}
        </Text>
        <Text style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.1 }}>
          {niv.action}
        </Text>
      </View>

      {/* Sous-bloc parent — discret, séparé par un fil */}
      <View style={{ flex: 1, marginLeft: 10, paddingLeft: 10, borderLeftWidth: 0.6, borderLeftColor: parentDividerColor(niv.color) }}>
        <Text style={{ fontFamily: 'Poppins', fontSize: 6.5, fontWeight: 700, color: parentTextColor(niv.color), letterSpacing: 1.2, marginBottom: 2 }}>
          POUR TOI
        </Text>
        <Text style={{ fontFamily: 'Inter', fontSize: 9, fontStyle: 'italic', color: parentTextColor(niv.color), lineHeight: 1.35 }}>
          {niv.parent}
        </Text>
      </View>
    </View>
  </View>
)

// Fond jaune (AGITÉ niveau 2) trop clair pour du blanc → utiliser un foncé translucide
const parentTextColor = (bg: string) => bg === '#F5E06D' ? 'rgba(45,45,58,0.65)' : 'rgba(255,255,255,0.85)'
const parentDividerColor = (bg: string) => bg === '#F5E06D' ? 'rgba(45,45,58,0.25)' : 'rgba(255,255,255,0.35)'

// Thermomètre dessiné à gauche : chiffre + segment de tube + bulbe en bas
const ThermometerVisual = ({ ordered }: { ordered: typeof NIVEAUX }) => (
  <View style={{ flexDirection: 'row', width: 72, marginRight: 6 }}>
    {/* Colonne chiffres */}
    <View style={{ flex: 1 }}>
      {ordered.map((niv) => (
        <View key={niv.n} style={{ height: niv.height, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 30, fontWeight: 800, color: niv.color, lineHeight: 1 }}>
            {niv.n}
          </Text>
        </View>
      ))}
    </View>

    {/* Colonne tube + bulbe */}
    <View style={{ width: 36, alignItems: 'center' }}>
      {/* Tube : 5 segments empilés, top arrondi via overflow */}
      <View style={{ width: 20, borderTopLeftRadius: 10, borderTopRightRadius: 10, overflow: 'hidden' }}>
        {ordered.map((niv) => (
          <View key={niv.n} style={{ width: 20, height: niv.height, backgroundColor: niv.color }} />
        ))}
      </View>
      {/* Bulbe en bas, plus large que le tube, légèrement chevauchant */}
      <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: ordered[ordered.length - 1].color, marginTop: -4 }} />
    </View>
  </View>
)

const PdfThermometre = () => {
  // Ordre d'affichage : niveau 5 EN HAUT, niveau 1 EN BAS (la chaleur monte)
  const ordered = [...NIVEAUX].reverse()
  return (
    <Document title="Thermomètre des émotions · Cockpit Crises TDAH" author="Cerveaux Électriques">
      <IntercalaireThermometrePage />
      <Page size="A4" style={[s.pageCream, { padding: 24, paddingBottom: 16 }]}>
        <View style={[s.brandRow, { marginBottom: 6 }]}>
          <Text style={[s.brand, { color: C.text, fontSize: 7 }]}>
            CERVEAUX <Text style={s.brandAccent}>ÉLECTRIQUES</Text> · THERMOMÈTRE · À AFFICHER AU MUR
          </Text>
          <Text style={[s.brand, { color: C.muted, fontSize: 7 }]}>cerveau-electrique.fr</Text>
        </View>

        {/* Layout principal : thermomètre dessiné + zones empilées sans gap */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <ThermometerVisual ordered={ordered} />
          <View style={{ flex: 1, borderRadius: 16, overflow: 'hidden' }}>
            {ordered.map((niv) => <ThermZone key={niv.n} niv={niv} />)}
          </View>
        </View>

        {/* Caveat invitation enfant */}
        <Text style={{ fontFamily: 'Caveat', fontSize: 24, fontWeight: 700, color: C.rose, textAlign: 'center', marginTop: 18 }}>
          Chaque soir, montre-moi où tu es
        </Text>

        {/* Tip parent — bandeau jaune compact */}
        <View style={{ backgroundColor: C.yellow, borderRadius: 10, padding: 10, marginTop: 8, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 8, fontWeight: 700, color: C.text, letterSpacing: 1.5, marginRight: 10, flexShrink: 0 }}>
            POUR LE PARENT
          </Text>
          <Text style={{ fontFamily: 'Inter', fontSize: 11, color: C.text, flex: 1 }}>
            S'il pointe 3, tu agis. À 4, c'est déjà tard.
          </Text>
        </View>

      </Page>
    </Document>
  )
}

/* ═══════════════════════════════════════════════════ */
/* 11. Mon Système de Victoires — 3 pages A4          */
/*  P1 : 10 cartes victoires à découper               */
/*  P2 : Tableau de suivi 20 cases + paliers          */
/*  P3 : Contrat parent-enfant A5 centré              */
/* ═══════════════════════════════════════════════════ */
// Chaque victoire = texte + couleur de fond saturée (palette CE étendue)
// fg = couleur du texte ET de l'étoile pour cohérence chromatique
const VICTOIRES: { text: string; bg: string; fg: string }[] = [
  { text: 'J\'ai utilisé mon coin calme',         bg: '#2A9490', fg: '#FFFFFF' }, // teal CE
  { text: 'J\'ai montré mon thermomètre',         bg: '#C0506A', fg: '#FFFFFF' }, // rose CE
  { text: 'J\'ai respiré au lieu de crier',       bg: '#5B7FBE', fg: '#FFFFFF' }, // bleu doux
  { text: 'J\'ai dit ce que je ressentais',       bg: '#7C3AED', fg: '#FFFFFF' }, // violet
  { text: 'J\'ai attendu mon tour',               bg: '#F5E06D', fg: '#2D2D3A' }, // jaune CE — texte dark
  { text: 'J\'ai fait mes devoirs sans crise',    bg: '#F5A623', fg: '#FFFFFF' }, // orange CE
  { text: 'J\'ai aidé quelqu\'un',                bg: '#10B981', fg: '#FFFFFF' }, // emerald
  { text: 'J\'ai géré ma colère',                 bg: '#1C1B2E', fg: '#F5E06D' }, // dark CE — étoile + texte jaune
  { text: 'J\'ai préparé mon sac tout seul',      bg: '#E0705A', fg: '#FFFFFF' }, // corail
  { text: 'J\'ai écouté jusqu\'au bout',          bg: '#0EA5E9', fg: '#FFFFFF' }, // sky
  { text: 'J\'ai dit pardon',                     bg: '#A0758E', fg: '#FFFFFF' }, // mauve
  { text: 'J\'ai fini ce que j\'avais commencé',  bg: '#16A34A', fg: '#FFFFFF' }, // vert profond
]

const VIERGE_COLOR = '#94A3B8'

// 45mm × 45mm = 127.56pt — taille unique partagée carte ↔ case
const VICT_SIZE = 128

type VictoireCardProps =
  | { vierge: true }
  | { vierge?: false; v: typeof VICTOIRES[number] }

const VictoireCard = (props: VictoireCardProps) => {
  const isVierge = 'vierge' in props && props.vierge === true

  if (isVierge) {
    return (
      <View style={{
        width: VICT_SIZE,
        height: VICT_SIZE,
        backgroundColor: C.white,
        borderWidth: 1.4,
        borderStyle: 'dashed',
        borderColor: VIERGE_COLOR,
        borderRadius: 0,
        padding: 14,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <View style={{ position: 'absolute', top: 8, right: 10 }}>
          <Text style={{ fontSize: 11, color: VIERGE_COLOR, lineHeight: 1 }}>⭐</Text>
        </View>
        <View style={{ width: 92 }}>
          <View style={{ height: 13, borderBottomWidth: 1, borderBottomColor: VIERGE_COLOR, borderBottomStyle: 'solid', marginBottom: 8 }} />
          <View style={{ height: 13, borderBottomWidth: 1, borderBottomColor: VIERGE_COLOR, borderBottomStyle: 'solid', marginBottom: 8 }} />
          <View style={{ height: 13, borderBottomWidth: 1, borderBottomColor: VIERGE_COLOR, borderBottomStyle: 'solid' }} />
        </View>
        <Text style={{ position: 'absolute', bottom: 8, left: 0, right: 0, fontFamily: 'Poppins', fontSize: 6.5, fontWeight: 700, color: VIERGE_COLOR, letterSpacing: 1.2, textAlign: 'center', textTransform: 'uppercase' }}>
          Carte à personnaliser
        </Text>
      </View>
    )
  }

  const { v } = props
  return (
    <View style={{
      width: VICT_SIZE,
      height: VICT_SIZE,
      backgroundColor: v.bg,
      borderRadius: 0,
      padding: 14,
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Étoile haut-gauche, discrète */}
      <View style={{ position: 'absolute', top: 8, left: 10 }}>
        <Text style={{ fontSize: 11, color: v.fg, lineHeight: 1, opacity: 0.9 }}>⭐</Text>
      </View>

      {/* Texte centré — proéminent */}
      <Text style={{
        fontFamily: 'Poppins',
        fontSize: 11.5,
        fontWeight: 700,
        color: v.fg,
        lineHeight: 1.25,
        textAlign: 'center',
        letterSpacing: 0.1,
      }}>
        {v.text}
      </Text>
    </View>
  )
}

const PALIERS = [
  { case: 5,  icon: '🎁', label: 'Récompense 1', color: C.yellow,  textOn: C.text },
  { case: 10, icon: '🎁', label: 'Récompense 2', color: C.teal,    textOn: C.white },
  { case: 15, icon: '🎁', label: 'Récompense 3', color: C.orange,  textOn: C.white },
  { case: 20, icon: '🏆', label: 'Super Récompense', color: C.rose, textOn: C.white },
]

const PalierBlock = ({ p }: { p: typeof PALIERS[number] }) => (
  <View style={{
    flex: 1,
    backgroundColor: p.color,
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 0,
  }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
      <View style={{
        width: 20, height: 20, borderRadius: 0,
        backgroundColor: C.white,
        borderWidth: 1.5, borderColor: p.color,
        alignItems: 'center', justifyContent: 'center',
        marginRight: 5,
      }}>
        <Text style={{ fontFamily: 'Poppins', fontSize: 10, fontWeight: 800, color: p.color }}>{p.case}</Text>
      </View>
      <Text style={{ fontSize: 11, marginRight: 3 }}>{p.icon}</Text>
      <Text style={{ fontFamily: 'Poppins', fontSize: 7.5, fontWeight: 800, color: p.textOn, letterSpacing: 0.3, flex: 1 }}>
        {p.label}
      </Text>
    </View>
    <View style={{ height: 9, borderBottomWidth: 1.2, borderBottomColor: p.textOn, borderBottomStyle: 'solid', opacity: 0.6 }} />
  </View>
)

const SignLine = ({ label }: { label: string }) => (
  <View style={{ flex: 1, marginHorizontal: 4 }}>
    <View style={{ height: 22, borderBottomWidth: 1, borderBottomColor: C.text, borderBottomStyle: 'solid' }} />
    <Text style={{ fontFamily: 'Poppins', fontSize: 7.5, fontWeight: 700, color: C.muted, letterSpacing: 1.2, textTransform: 'uppercase', marginTop: 4, textAlign: 'center' }}>
      {label}
    </Text>
  </View>
)

const ContratLine = ({ before, after }: { before: string; after: string }) => (
  <Text style={{ fontFamily: 'Inter', fontSize: 11, color: C.text, lineHeight: 1.6, marginBottom: 8 }}>
    {before}
    <Text style={{ color: C.muted }}>  ____________________  </Text>
    {after}
  </Text>
)

const ContratReward = ({ n, label }: { n: number; label: string }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 7 }}>
    <View style={{
      width: 26, height: 26, borderRadius: 0,
      backgroundColor: C.yellow,
      alignItems: 'center', justifyContent: 'center',
      marginRight: 10,
    }}>
      <Text style={{ fontFamily: 'Poppins', fontSize: 11, fontWeight: 800, color: C.text }}>{n}</Text>
    </View>
    <Text style={{ fontFamily: 'Poppins', fontSize: 10, fontWeight: 700, color: C.text, marginRight: 8 }}>
      {label}
    </Text>
    <Text style={{ fontFamily: 'Inter', fontSize: 11, color: C.muted, marginRight: 8 }}>→</Text>
    <View style={{ flex: 1, height: 14, borderBottomWidth: 1, borderBottomColor: C.hairline, borderBottomStyle: 'solid' }} />
  </View>
)

const PdfSystemeVictoires = () => (
  <Document title="Mon Système de Victoires · Cockpit Crises TDAH" author="Cerveaux Électriques">
    <IntercalaireVictoiresPage />
    {/* ═══ Page 2 — 10 cartes victoires à découper (4 cols × 3 rangées) ═══ */}
    <Page size="A4" style={[s.pageCream, { padding: 24, paddingBottom: 28 }]}>
      <View style={[s.brandRow, { marginBottom: 6 }]}>
        <Text style={[s.brand, { color: C.text, fontSize: 7 }]}>
          CERVEAUX <Text style={s.brandAccent}>ÉLECTRIQUES</Text> · MON SYSTÈME DE VICTOIRES
        </Text>
        <Text style={[s.brand, { color: C.muted, fontSize: 7 }]}>cerveau-electrique.fr</Text>
      </View>

      <View style={[s.pill, { backgroundColor: C.yellow, color: C.text, borderRadius: 0 }]}>
        <Text>16 cartes à découper · 45 × 45 mm</Text>
      </View>
      <Text style={[s.h1, { color: C.text, marginTop: 6, fontSize: 22 }]}>Mes cartes victoires</Text>

      {/* Bandeau instruction */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: C.teal,
        padding: 10,
        marginTop: 8,
        marginBottom: 10,
        borderRadius: 0,
      }}>
        <Text style={{ fontSize: 16, marginRight: 10 }}>✂️</Text>
        <Text style={{ fontFamily: 'Poppins', fontSize: 10.5, fontWeight: 700, color: C.white, flex: 1, lineHeight: 1.4 }}>
          Découpe les cartes. Quand tu gagnes une victoire, pose la carte sur ton tableau !
        </Text>
      </View>

      {/* Grille 4 cols × 4 rangées = 16 emplacements (12 victoires + 4 vierges) */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 8 }}>
        {VICTOIRES.map((v, i) => <VictoireCard key={i} v={v} />)}
        <VictoireCard vierge />
        <VictoireCard vierge />
        <VictoireCard vierge />
        <VictoireCard vierge />
      </View>

      <Footer text="Imprime sur papier épais · Plastifie pour les garder longtemps · Découpe sur les bords jaunes" />
    </Page>

    {/* ═══ Page 2 — Tableau de suivi A4 (cases identiques aux cartes : 128×128pt) ═══ */}
    <Page size="A4" style={[s.pageCream, { padding: 20, paddingBottom: 14 }]}>
      <View style={[s.brandRow, { marginBottom: 2 }]}>
        <Text style={[s.brand, { color: C.text, fontSize: 7 }]}>
          CERVEAUX <Text style={s.brandAccent}>ÉLECTRIQUES</Text> · MON SYSTÈME DE VICTOIRES
        </Text>
        <Text style={[s.brand, { color: C.muted, fontSize: 7 }]}>cerveau-electrique.fr</Text>
      </View>

      {/* Header compact : pill + titre + caveat + Monstre alignés sur 1 ligne */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={[s.pill, { backgroundColor: C.teal, color: C.white, borderRadius: 0, marginRight: 8 }]}>
              <Text>À afficher sur le frigo</Text>
            </View>
            <Text style={{ fontFamily: 'Caveat', fontSize: 14, fontWeight: 700, color: C.rose }}>
              Pose une carte = remplis une case
            </Text>
          </View>
          <Text style={[s.h1, { color: C.text, marginTop: 2, fontSize: 20 }]}>
            Mon Tableau de Victoires
          </Text>
        </View>
        <Image src="./assets/monstre-rigole.png" style={{ width: 44, height: 44, objectFit: 'contain' }} />
      </View>

      {/* Grille 4 × 5 = 20 cases — chaque case = 128×128pt (45×45mm) — identique aux cartes */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 2 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <View key={i} style={{
            width: VICT_SIZE,
            height: VICT_SIZE,
            backgroundColor: C.white,
            borderWidth: 1.4,
            borderStyle: 'dashed',
            borderColor: '#94A3B8',
            borderRadius: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 38, fontWeight: 800, color: C.yellow, lineHeight: 1 }}>
              {i + 1}
            </Text>
            <Text style={{ fontFamily: 'Inter', fontSize: 8, color: C.muted, fontStyle: 'italic', marginTop: 4 }}>
              pose ici
            </Text>
          </View>
        ))}
      </View>

      {/* Paliers de récompenses — stripe horizontale de 4 blocs */}
      <View wrap={false} style={{ flexDirection: 'row', gap: 6, marginTop: 5 }}>
        {PALIERS.map((p, i) => <PalierBlock key={i} p={p} />)}
      </View>

      <Text fixed style={{ position: 'absolute', bottom: 6, left: 20, right: 20, fontFamily: 'Inter', fontSize: 7, color: C.muted, textAlign: 'center' }}>
        Pose les cartes gagnées dans chaque case · Reste fier de chaque case remplie
      </Text>
    </Page>

    {/* ═══ Page 3 — Contrat parent-enfant, pleine page A4 ═══ */}
    <Page size="A4" style={[s.pageCream, { padding: 36, paddingBottom: 30 }]}>
      {/* Brand row discret en haut */}
      <View style={s.brandRow}>
        <Text style={[s.brand, { color: C.text, fontSize: 7 }]}>
          CERVEAUX <Text style={s.brandAccent}>ÉLECTRIQUES</Text> · MON SYSTÈME DE VICTOIRES
        </Text>
        <Text style={[s.brand, { color: C.muted, fontSize: 7 }]}>cerveau-electrique.fr</Text>
      </View>

      {/* Titre Caveat XXL */}
      <Text style={{ fontFamily: 'Caveat', fontSize: 62, fontWeight: 700, color: C.rose, textAlign: 'center', marginTop: 4, lineHeight: 1 }}>
        Notre contrat de victoires
      </Text>
      <View style={{ height: 3, width: 120, backgroundColor: C.yellow, alignSelf: 'center', marginTop: 4, marginBottom: 22 }} />

      {/* Engagements — bandes pleines pleine largeur */}
      <View style={{
        padding: 18,
        backgroundColor: 'rgba(42,148,144,0.10)',
        borderLeftWidth: 5,
        borderLeftColor: C.teal,
        borderRadius: 0,
        marginBottom: 12,
      }}>
        <Text style={{ fontFamily: 'Inter', fontSize: 14, color: C.text, lineHeight: 1.6 }}>
          Moi,<Text style={{ color: C.muted }}>  ______________________________  </Text>(prénom de l'enfant),
        </Text>
        <Text style={{ fontFamily: 'Inter', fontSize: 13.5, color: C.text, lineHeight: 1.5, fontStyle: 'italic', marginTop: 4 }}>
          je m'engage à essayer de gagner des cartes victoires.
        </Text>
      </View>

      <View style={{
        padding: 18,
        backgroundColor: 'rgba(192,80,106,0.08)',
        borderLeftWidth: 5,
        borderLeftColor: C.rose,
        borderRadius: 0,
        marginBottom: 22,
      }}>
        <Text style={{ fontFamily: 'Inter', fontSize: 14, color: C.text, lineHeight: 1.6 }}>
          Moi,<Text style={{ color: C.muted }}>  ______________________________  </Text>(prénom du parent),
        </Text>
        <Text style={{ fontFamily: 'Inter', fontSize: 13.5, color: C.text, lineHeight: 1.5, fontStyle: 'italic', marginTop: 4 }}>
          je m'engage à encourager chaque victoire, sans en oublier aucune.
        </Text>
      </View>

      {/* Récompenses */}
      <Text style={{ fontFamily: 'Poppins', fontSize: 11, fontWeight: 800, color: C.text, letterSpacing: 1.8, textTransform: 'uppercase', marginBottom: 10 }}>
        🎁 Nos récompenses
      </Text>
      <ContratReward n={5}  label="5 cartes" />
      <ContratReward n={10} label="10 cartes" />
      <ContratReward n={15} label="15 cartes" />
      <ContratReward n={20} label="20 cartes — 🏆 Super récompense" />

      {/* Signatures */}
      <View style={{ flexDirection: 'row', marginTop: 28, marginBottom: 20 }}>
        <SignLine label="Signature enfant" />
        <SignLine label="Signature parent" />
        <SignLine label="Date" />
      </View>

      {/* Personnages bas — flex-grow remplit jusqu'au footer */}
      <View style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingBottom: 4,
      }}>
        <Image src="./assets/monstre-calin.png" style={{ width: 110, height: 110, objectFit: 'contain' }} />
        <View style={{ flex: 1, alignItems: 'center', paddingBottom: 30 }}>
          <Text style={{ fontFamily: 'Caveat', fontSize: 32, fontWeight: 700, color: C.text, textAlign: 'center', lineHeight: 1.05 }}>
            On est une équipe.{'\n'}On y va ensemble.
          </Text>
        </View>
        <Image src="./assets/cortex-bienveillant.png" style={{ width: 110, height: 110, objectFit: 'contain' }} />
      </View>

      <Text fixed style={{ position: 'absolute', bottom: 14, left: 0, right: 0, fontFamily: 'Inter', fontSize: 8, color: C.muted, textAlign: 'center' }}>
        Cerveaux Électriques · cerveau-electrique.fr
      </Text>
    </Page>
  </Document>
)

/* ═══════════════════════════════════════════════════ */
/* 11b. Système de Victoires — version DIGITALE       */
/*   1 page A4 · pas de découpe                       */
/*   Tableau 20 cases avec victoire + ⭕ à colorier   */
/* ═══════════════════════════════════════════════════ */
const VICTOIRES_DIGITAL = [
  ...VICTOIRES.map(v => v.text),
  'J\'ai dit merci',
  'J\'ai fait un câlin',
  'Je suis allé au lit calmement',
  'J\'ai accepté un changement',
]

const DigitalCell = ({ n, text, vierge = false }: { n: number; text?: string; vierge?: boolean }) => (
  <View style={{
    width: '24%',
    height: 96,
    backgroundColor: C.white,
    borderWidth: 1.2,
    borderStyle: vierge ? 'dashed' : 'solid',
    borderColor: vierge ? VIERGE_COLOR : C.hairline,
    borderRadius: 0,
    padding: 8,
    position: 'relative',
  }}>
    {/* Numéro top-left */}
    <Text style={{
      fontFamily: 'Poppins',
      fontSize: 22,
      fontWeight: 800,
      color: vierge ? VIERGE_COLOR : C.yellow,
      lineHeight: 1,
    }}>
      {n}
    </Text>

    {/* Cercle vide top-right — à colorier/cocher */}
    <View style={{
      position: 'absolute',
      top: 8,
      right: 8,
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 1.8,
      borderColor: vierge ? VIERGE_COLOR : C.text,
      backgroundColor: C.white,
    }} />

    {/* Texte ou lignes vierges */}
    <View style={{ position: 'absolute', left: 8, right: 8, bottom: 8 }}>
      {vierge ? (
        <View>
          <View style={{ height: 9, borderBottomWidth: 0.8, borderBottomColor: VIERGE_COLOR, borderBottomStyle: 'solid', marginBottom: 4 }} />
          <View style={{ height: 9, borderBottomWidth: 0.8, borderBottomColor: VIERGE_COLOR, borderBottomStyle: 'solid', marginBottom: 4 }} />
          <View style={{ height: 9, borderBottomWidth: 0.8, borderBottomColor: VIERGE_COLOR, borderBottomStyle: 'solid' }} />
        </View>
      ) : (
        <Text style={{
          fontFamily: 'Poppins',
          fontSize: 8,
          fontWeight: 700,
          color: C.text,
          lineHeight: 1.3,
        }}>
          {text}
        </Text>
      )}
    </View>
  </View>
)

/* Path snake 5 rangées × 4 cercles — finit en haut à droite.
   Visuellement de haut en bas avec ligne de récompense après chaque palier. */
const VICTOIRE_PATH: { nums: number[]; palier?: { icon: string; label: string; color: string; super?: boolean } }[] = [
  { nums: [17, 18, 19, 20], palier: { icon: '🏆', label: 'SUPER RÉCOMPENSE', color: C.rose, super: true } },
  { nums: [16, 15, 14, 13], palier: { icon: '🌟🌟', label: 'Grande récompense', color: C.teal } },
  { nums: [9, 10, 11, 12], palier: { icon: '⭐', label: 'Récompense', color: C.orange } },
  { nums: [8, 7, 6, 5], palier: { icon: '🌟', label: 'Mini récompense', color: C.yellow } },
  { nums: [1, 2, 3, 4] },
]

const PALIER_NUMS = new Set([5, 10, 15, 20])
const CIRCLE_BORDERS = [C.teal, C.orange, C.yellow, C.rose, C.violet]

const VictoireCircle = ({ n }: { n: number }) => {
  const isPalier = PALIER_NUMS.has(n)
  const borderColor = isPalier ? C.orange : CIRCLE_BORDERS[(n - 1) % CIRCLE_BORDERS.length]
  const size = isPalier ? 70 : 52
  return (
    <View style={{ width: 130, height: 78, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{
        width: size, height: size, borderRadius: size / 2,
        borderWidth: isPalier ? 3 : 2.2,
        borderColor,
        backgroundColor: C.white,
        alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        {isPalier && (
          <Text style={{ position: 'absolute', top: 5, fontSize: 11, color: C.orange }}>★</Text>
        )}
        <Text style={{
          fontFamily: 'Poppins',
          fontSize: isPalier ? 22 : 18,
          fontWeight: 800,
          color: C.dark,
          marginTop: isPalier ? 8 : 0,
        }}>
          {n}
        </Text>
      </View>
    </View>
  )
}

const VictoireRow = ({ nums }: { nums: number[] }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    {nums.map((n) => <VictoireCircle key={n} n={n} />)}
  </View>
)

const VictoireBanner = ({ icon, label, color, isSuper = false }: { icon: string; label: string; color: string; isSuper?: boolean }) => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color,
    borderRadius: 6,
    paddingVertical: isSuper ? 10 : 7,
    paddingHorizontal: 14,
    marginVertical: 3,
  }}>
    {isSuper && <Text style={{ fontSize: 13, marginRight: 6 }}>✨</Text>}
    <Text style={{ fontSize: isSuper ? 15 : 12, marginRight: 8 }}>{icon}</Text>
    <Text style={{
      fontFamily: 'Poppins',
      fontSize: isSuper ? 11 : 9.5,
      fontWeight: 800,
      color: C.dark,
      letterSpacing: isSuper ? 1.2 : 0.4,
      marginRight: 10,
    }}>
      {label} :
    </Text>
    <View style={{
      flex: 1,
      height: 1,
      borderBottomWidth: 1.4,
      borderBottomColor: C.dark,
      borderBottomStyle: 'solid',
      marginBottom: 2,
    }} />
    {isSuper && <Text style={{ fontSize: 13, marginLeft: 8 }}>🎉</Text>}
  </View>
)

const PdfSystemeVictoiresDigital = () => (
  <Document title="Mon Tableau de Victoires · Cerveau Électrique" author="Cerveau Électrique">
    {/* Page 1 : Intercalaire digital (présentation) */}
    <IntercalaireVictoiresDigitalPage />

    {/* Page 2 : Tableau de victoires à colorier */}
    <Page size="A4" style={[s.pageCream, { padding: 30, paddingBottom: 28 }]}>
      {/* Header avec Le Monstre à droite */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 28, fontWeight: 800, color: C.dark, lineHeight: 1.05 }}>
            Mon Tableau de Victoires
          </Text>
          <Text style={{ fontFamily: 'Caveat', fontSize: 22, fontWeight: 700, color: C.teal, marginTop: 2 }}>
            Chaque bon réflexe mérite d'être célébré
          </Text>
        </View>
        <Image src="./assets/monstre-rigole.png" style={{ width: 90, height: 90, objectFit: 'contain', marginLeft: 10 }} />
      </View>

      {/* Parcours sinueux : 5 rangées + 4 bannières intercalées */}
      <View style={{ marginTop: 4 }}>
        {VICTOIRE_PATH.map((row, i) => (
          <React.Fragment key={i}>
            <VictoireRow nums={row.nums} />
            {row.palier && (
              <VictoireBanner
                icon={row.palier.icon}
                label={row.palier.label}
                color={row.palier.color}
                isSuper={row.palier.super}
              />
            )}
          </React.Fragment>
        ))}
      </View>

      {/* Encadré teal : Comment ça marche */}
      <View style={{
        backgroundColor: 'rgba(42,148,144,0.10)',
        borderLeftWidth: 4,
        borderLeftColor: C.teal,
        padding: 14,
        marginTop: 16,
        borderRadius: 4,
      }}>
        <Text style={{
          fontFamily: 'Poppins',
          fontSize: 10,
          fontWeight: 800,
          color: C.teal,
          textTransform: 'uppercase',
          letterSpacing: 1.2,
          marginBottom: 6,
        }}>
          Comment ça marche
        </Text>
        <Text style={{ fontFamily: 'Inter', fontSize: 10, color: C.dark, lineHeight: 1.55 }}>
          Chaque bon réflexe de ton enfant = un cercle à colorier. Définissez les récompenses ensemble. Quand le tableau est plein, recommencez !
        </Text>
      </View>

      <Text fixed style={{
        position: 'absolute', bottom: 14, left: 30, right: 30,
        fontFamily: 'Inter', fontSize: 8.5, color: C.muted, textAlign: 'center',
      }}>
        Cerveau Électrique · cerveau-electrique.fr
      </Text>
    </Page>
  </Document>
)

/* ═══════════════════════════════════════════════════ */
/* 12. Mon Kit Anti-Crise — recto-verso A4            */
/*   Recto : Plan du coin calme                       */
/*   Verso : Ce que je sais sur les crises            */
/* ═══════════════════════════════════════════════════ */
// Cercle ⌀ 8mm = ~22.7pt (feutre effaçable / surface plastifiée)
const KitCheck = ({ label, line = false, compact = false }: { label: string; line?: boolean; compact?: boolean }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: compact ? 4 : 7 }}>
    <View style={{
      width: 22, height: 22,
      borderWidth: 1.6,
      borderColor: C.text,
      borderRadius: 11,
      marginRight: 10,
      flexShrink: 0,
    }} />
    <Text style={{ fontFamily: 'Poppins', fontSize: 10, fontWeight: 600, color: C.text, marginRight: line ? 4 : 0 }}>
      {label}
    </Text>
    {line && (
      <View style={{ flex: 1, height: 16, borderBottomWidth: 1, borderBottomColor: C.muted, borderBottomStyle: 'solid' }} />
    )}
  </View>
)

type KitItem = string | { label: string; line: true }

// Bloc info "guide visuel" — titre + bullets courts + punchline italique
const KitInfoBlock = ({
  title, bullets, punchline, color,
}: { title: string; bullets: string[]; punchline: string; color: string }) => (
  <View style={{
    flex: 1,
    backgroundColor: C.white,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: color,
    borderRadius: 0,
  }}>
    <Text style={{
      fontFamily: 'Poppins', fontSize: 10.5, fontWeight: 800, color,
      letterSpacing: 1.6, textTransform: 'uppercase',
      marginBottom: 10, lineHeight: 1.25,
    }}>
      {title}
    </Text>

    {bullets.map((b, i) => (
      <View key={i} style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'flex-start' }}>
        <Text style={{ fontFamily: 'Inter', fontSize: 11, color, lineHeight: 1.45, marginRight: 7 }}>•</Text>
        <Text style={{ fontFamily: 'Inter', fontSize: 11, color: C.text, lineHeight: 1.45, flex: 1 }}>
          {b}
        </Text>
      </View>
    ))}

    {/* Punchline → Caveat color */}
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 10 }}>
      <Text style={{ fontFamily: 'Poppins', fontSize: 13, fontWeight: 800, color, marginRight: 6, lineHeight: 1 }}>→</Text>
      <Text style={{ fontFamily: 'Caveat', fontSize: 17, fontWeight: 700, color, lineHeight: 1.1, flex: 1 }}>
        {punchline}
      </Text>
    </View>
  </View>
)

// Section "question guide" : question + texte d'aide italic + lignes vides pour écrire
const KitQuestion = ({
  question, hint, color, lines = 3,
}: { question: string; hint: string; color: string; lines?: number }) => (
  <View style={{
    flex: 1,
    backgroundColor: C.white,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: color,
    borderRadius: 0,
  }}>
    <Text style={{
      fontFamily: 'Poppins', fontSize: 11, fontWeight: 700, color,
      lineHeight: 1.25, marginBottom: 4,
    }}>
      {question}
    </Text>
    <Text style={{
      fontFamily: 'Inter', fontSize: 8.5, fontStyle: 'italic', color: C.muted,
      lineHeight: 1.4, marginBottom: 10,
    }}>
      {hint}
    </Text>
    {Array.from({ length: lines }).map((_, i) => (
      <View key={i} style={{
        height: 22,
        borderBottomWidth: 0.8,
        borderBottomColor: C.muted,
        borderBottomStyle: 'solid',
        marginBottom: 4,
      }} />
    ))}
  </View>
)

const KitSection = ({ title, color, items, compact = false }: { title: string; color: string; items: KitItem[]; compact?: boolean }) => (
  <View style={{
    flex: 1,
    backgroundColor: C.white,
    padding: compact ? 11 : 14,
    borderLeftWidth: 4,
    borderLeftColor: color,
    borderRadius: 0,
  }}>
    <Text style={{ fontFamily: 'Poppins', fontSize: 9, fontWeight: 800, color, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: compact ? 7 : 10 }}>
      {title}
    </Text>
    {items.map((it, i) =>
      typeof it === 'string'
        ? <KitCheck key={i} label={it} compact={compact} />
        : <KitCheck key={i} label={it.label} line compact={compact} />
    )}
  </View>
)

const KitHeader = ({
  pillText, pillColor, title, monstre, baseline,
}: {
  pillText: string
  pillColor: string
  title: string
  monstre: string
  baseline?: string
}) => (
  <>
    <View style={[s.brandRow, { marginBottom: 6 }]}>
      <Text style={[s.brand, { color: C.text, fontSize: 7 }]}>
        CERVEAUX <Text style={s.brandAccent}>ÉLECTRIQUES</Text> · MON KIT ANTI-CRISE
      </Text>
      <Text style={[s.brand, { color: C.muted, fontSize: 7 }]}>cerveau-electrique.fr</Text>
    </View>

    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <View style={[s.pill, { backgroundColor: pillColor, color: C.white, borderRadius: 0 }]}>
          <Text>{pillText}</Text>
        </View>
        <Text style={[s.h1, { color: C.text, marginTop: 6, fontSize: 24, lineHeight: 1.05 }]}>
          {title}
        </Text>
        {baseline && (
          <Text style={{ fontFamily: 'Caveat', fontSize: 18, fontWeight: 700, color: C.rose, marginTop: 2 }}>
            {baseline}
          </Text>
        )}
      </View>
      <Image src={monstre} style={{ width: 78, height: 78, objectFit: 'contain', marginLeft: 8 }} />
    </View>

    <View style={[s.hairline, { marginVertical: 12 }]} />
  </>
)

const PdfKitAntiCrise = () => (
  <Document title="Mon Kit Anti-Crise · Cockpit Crises TDAH" author="Cerveaux Électriques">
    <IntercalaireKitAntiCrisePage />
    {/* ═══ RECTO — Mon coin calme ═══ */}
    <Page size="A4" style={[s.pageCream, { padding: 24, paddingBottom: 24 }]}>
      <KitHeader
        pillText="Avant la crise · à préparer"
        pillColor={C.teal}
        title="Mon coin calme"
        monstre="./assets/monstre-calme.png"
        baseline="À préparer ensemble, un jour calme ☀️"
      />

      {/* Grille 2×2 de sections */}
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
        <KitSection
          title="📍 Où ?"
          color={C.teal}
          items={['Sa chambre', 'Le salon', 'Un coin du couloir', 'Sous la table', { label: 'Autre :', line: true }]}
        />
        <KitSection
          title="🚪 Signal pour y aller"
          color={C.orange}
          items={['L\'enfant y va seul', 'Le parent propose', { label: 'Mot code :', line: true }]}
        />
      </View>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <KitSection
          title="🧸 Objets"
          color="#A88E1F"
          items={['Coussin lourd', 'Casque anti-bruit', 'Balle anti-stress', 'Doudou', 'Bouteille sensorielle', 'Élastique de chaise', { label: 'Autre :', line: true }]}
        />
        <KitSection
          title="🎨 Activités"
          color={C.violet}
          items={['Respirer', 'Dessiner', 'Écouter de la musique', 'Serrer un objet', 'Se balancer', 'Compter jusqu\'à 10', { label: 'Autre :', line: true }]}
        />
      </View>

      {/* Encadré final astuce parent */}
      <View style={{
        marginTop: 16,
        padding: 14,
        backgroundColor: C.dark,
        borderRadius: 0,
      }}>
        <Text style={{ fontFamily: 'Poppins', fontSize: 9, fontWeight: 800, color: C.yellow, letterSpacing: 1.5, marginBottom: 6 }}>
          💡 PRINCIPE
        </Text>
        <Text style={{ fontFamily: 'Inter', fontSize: 10.5, color: C.white, lineHeight: 1.5, fontStyle: 'italic' }}>
          Le coin calme n'est pas une punition. C'est le refuge que ton enfant choisit lui-même, à froid, pour avoir un endroit où aller quand ça monte.
        </Text>
      </View>

      <Footer text="Plastifie cette feuille · Remplis-la au feutre effaçable · Refais le point chaque mois" />
    </Page>

    {/* ═══ VERSO — Ce que je sais sur les crises ═══ */}
    <Page size="A4" style={[s.pageCream, { padding: 24, paddingBottom: 18 }]}>
      <KitHeader
        pillText="Identifier les patterns"
        pillColor={C.rose}
        title="Ce que je sais sur les crises de mon enfant"
        monstre="./assets/monstre-cache.png"
      />

      {/* Grille 2×2 de blocs informatifs — bullets scannables */}
      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
        <KitInfoBlock
          color={C.rose}
          title="⏰ Les moments à risque"
          bullets={[
            'Le matin au réveil',
            'La sortie d\'école',
            'Le moment des devoirs',
            'Le repas du soir',
            'Le coucher',
          ]}
          punchline="Observe. Note mentalement lequel revient le plus."
        />
        <KitInfoBlock
          color={C.orange}
          title="⚡ Les déclencheurs (87% des crises)"
          bullets={[
            'Fatigue cognitive',
            'Transitions (changer d\'activité)',
            'Surcharge sensorielle (bruit, lumière, foule)',
            'Frustration face à une tâche',
            'Faim',
          ]}
          punchline="Ton enfant a 2-3 déclencheurs principaux. Lesquels ?"
        />
      </View>

      <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
        <KitInfoBlock
          color={C.violet}
          title="🚨 Signaux avant l'explosion (2 à 5 min avant)"
          bullets={[
            'Il s\'agite, bouge ses jambes',
            'Il monte le ton',
            'Il serre les poings',
            'Il se replie, se cache',
            'Il dit « c\'est nul » ou « je suis nul »',
          ]}
          punchline="Le corps parle avant les mots. C'est là que tu peux agir."
        />
        <KitInfoBlock
          color={C.teal}
          title="💚 Ce qui aide (validé par la science)"
          bullets={[
            'Le silence — ne rien dire pendant 30 secondes',
            'La présence — rester à côté sans parler',
            'Le coin calme — préparé à l\'avance (voir recto)',
            'Le mouvement — sortir, courir, sauter',
            'Un objet sensoriel — balle, élastique',
          ]}
          punchline="Essaie-les un par un. Note ce qui marche pour TON enfant."
        />
      </View>

      {/* Règle d'or — bandeau jaune en bas */}
      <View style={{
        backgroundColor: C.yellow,
        padding: 16,
        borderRadius: 0,
      }}>
        <Text style={{ fontFamily: 'Poppins', fontSize: 9, fontWeight: 800, color: C.text, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>
          🌟 La règle d'or
        </Text>
        <Text style={{ fontFamily: 'Inter', fontSize: 13, color: C.text, lineHeight: 1.45 }}>
          S'il pointe <Text style={{ fontWeight: 700 }}>3 sur le thermomètre</Text>, tu agis. <Text style={{ fontWeight: 700 }}>À 4, c'est déjà tard.</Text>
        </Text>
      </View>

      <Footer text="Le pattern apparaît après 4 semaines d'observation · Reprends ce guide quand tu doutes" />
    </Page>
  </Document>
)

/* ═══════════════════════════════════════════════════ */
/* 13. Après la tempête — journal simple post-crise   */
/*   Format A6 (105×148mm)                            */
/*   2 versions : seul (A6) + planche (4 sur A4)      */
/* ═══════════════════════════════════════════════════ */

const FICHE_W = 297  // ~ A6 portrait
const FICHE_H = 420

const PillOption = ({ label }: { label: string }) => (
  <View style={{
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1.4,
    borderColor: C.text,
    borderRadius: 14,
    marginRight: 6,
  }}>
    <Text style={{ fontFamily: 'Poppins', fontSize: 9, fontWeight: 700, color: C.text }}>
      {label}
    </Text>
  </View>
)

// Une fiche journal — prend la taille de son parent (Page A6 ou cellule absolute dans la planche)
const FicheJournal = () => (
  <View style={{
    flex: 1,
    backgroundColor: C.cream,
    padding: 16,
  }}>
    {/* Brand row */}
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
      <Text style={{ fontFamily: 'Poppins', fontSize: 6.5, fontWeight: 700, color: C.text, letterSpacing: 1.4, textTransform: 'uppercase' }}>
        CERVEAUX <Text style={{ color: C.yellow }}>ÉLECTRIQUES</Text>
      </Text>
      <Text style={{ fontFamily: 'Poppins', fontSize: 6, fontWeight: 700, color: C.muted, letterSpacing: 1 }}>
        1 FICHE / CRISE
      </Text>
    </View>

    {/* Titre */}
    <Text style={{ fontFamily: 'Poppins', fontSize: 22, fontWeight: 800, color: C.dark, lineHeight: 1, marginTop: 4 }}>
      Après la tempête
    </Text>
    <Text style={{ fontFamily: 'Caveat', fontSize: 15, fontWeight: 700, color: C.teal, marginTop: 2, lineHeight: 1.1 }}>
      Remplis-le seulement quand tu en as l'énergie
    </Text>

    {/* Date */}
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 8 }}>
      <Text style={{ fontFamily: 'Poppins', fontSize: 7.5, fontWeight: 800, color: C.muted, letterSpacing: 1.4, textTransform: 'uppercase', marginRight: 8 }}>
        Date
      </Text>
      <Text style={{ fontFamily: 'Inter', fontSize: 12, color: C.text, letterSpacing: 4 }}>__ / __ / __</Text>
    </View>

    <View style={{ height: 1, backgroundColor: C.hairline, marginBottom: 10 }} />

    {/* Section 1 — Déclenché */}
    <Text style={{ fontFamily: 'Poppins', fontSize: 10.5, fontWeight: 700, color: C.rose, marginBottom: 6, lineHeight: 1.2 }}>
      ⚡ Qu'est-ce qui a déclenché ?
    </Text>
    <View style={{ height: 22, borderBottomWidth: 1, borderBottomColor: C.text, borderBottomStyle: 'solid', marginBottom: 14 }} />

    {/* Section 2 — Temps */}
    <Text style={{ fontFamily: 'Poppins', fontSize: 10.5, fontWeight: 700, color: C.orange, marginBottom: 8, lineHeight: 1.2 }}>
      🕐 Combien de temps ?
    </Text>
    <View style={{ flexDirection: 'row', marginBottom: 14 }}>
      <PillOption label="< 10 min" />
      <PillOption label="10-30 min" />
      <PillOption label="> 30 min" />
    </View>

    {/* Section 3 — Aidé */}
    <Text style={{ fontFamily: 'Poppins', fontSize: 10.5, fontWeight: 700, color: C.teal, marginBottom: 6, lineHeight: 1.2 }}>
      💚 Qu'est-ce qui a aidé ?
    </Text>
    <View style={{ height: 22, borderBottomWidth: 1, borderBottomColor: C.text, borderBottomStyle: 'solid', marginBottom: 14 }} />

    {/* Bandeau bas Monstre + caveat */}
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: C.yellow,
      padding: 8,
      borderRadius: 0,
      marginTop: 'auto',
    }}>
      <Image src="./assets/monstre-confus.png" style={{ width: 44, height: 44, objectFit: 'contain', marginRight: 8 }} />
      <Text style={{ fontFamily: 'Caveat', fontSize: 17, fontWeight: 700, color: C.text, lineHeight: 1.05, flex: 1 }}>
        Chaque crise comprise est une crise de moins.
      </Text>
    </View>

    <Text style={{ fontFamily: 'Inter', fontSize: 6.5, color: C.muted, textAlign: 'center', marginTop: 5 }}>
      Cerveaux Électriques · cerveau-electrique.fr
    </Text>
  </View>
)

const PdfJournalSimple = () => (
  <Document title="Après la tempête — journal simple · Cockpit Crises TDAH" author="Cerveaux Électriques">
    <IntercalaireJournalPage />
    <Page size="A6" style={{ backgroundColor: C.cream }}>
      <FicheJournal />
    </Page>
  </Document>
)

const PdfJournalPlanche = () => (
  <Document title="Après la tempête — planche 4 fiches · Cockpit Crises TDAH" author="Cerveaux Électriques">
    <IntercalaireJournalPage />
    <Page size="A4" style={{ backgroundColor: C.cream }}>
      {/* 4 fiches en grille 2×2 — collées (parfait alignement A4 = 4 × A6) */}
      <View style={{ position: 'absolute', top: 0, left: 0, width: FICHE_W, height: FICHE_H }}>
        <FicheJournal />
      </View>
      <View style={{ position: 'absolute', top: 0, left: FICHE_W, width: FICHE_W, height: FICHE_H }}>
        <FicheJournal />
      </View>
      <View style={{ position: 'absolute', top: FICHE_H, left: 0, width: FICHE_W, height: FICHE_H }}>
        <FicheJournal />
      </View>
      <View style={{ position: 'absolute', top: FICHE_H, left: FICHE_W, width: FICHE_W, height: FICHE_H }}>
        <FicheJournal />
      </View>

      {/* Traits de découpe — au-dessus des fiches */}
      {/* Ligne verticale au milieu */}
      <View style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: FICHE_W - 0.4,
        width: 0.8,
        borderLeftWidth: 0.8,
        borderLeftColor: C.muted,
        borderLeftStyle: 'dashed',
      }} />
      {/* Ligne horizontale au milieu */}
      <View style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: FICHE_H - 0.4,
        height: 0.8,
        borderTopWidth: 0.8,
        borderTopColor: C.muted,
        borderTopStyle: 'dashed',
      }} />

      {/* Petits ciseaux aux croisements */}
      <View style={{
        position: 'absolute',
        top: FICHE_H - 7,
        left: FICHE_W - 7,
        width: 14, height: 14,
        backgroundColor: C.cream,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Text style={{ fontSize: 8 }}>✂</Text>
      </View>
    </Page>
  </Document>
)

/* ═══════════════════════════════════════════════════ */
/* 14. Bienvenue dans ton Cockpit CE                  */
/*   Page d'accueil A4 du bundle — physique + digital */
/* ═══════════════════════════════════════════════════ */
const APP_URL = 'https://cockpit-ce.pages.dev'

const Qr = ({ value, size = 110, fg = C.dark }: { value: string; size?: number; fg?: string }) => {
  const qr = QRCode.create(value, { errorCorrectionLevel: 'M' })
  const n = qr.modules.size
  const cell = size / n
  const cells: React.ReactElement[] = []
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (qr.modules.get(row, col)) {
        cells.push(
          <Rect key={`${row}-${col}`} x={col * cell} y={row * cell} width={cell + 0.4} height={cell + 0.4} fill={fg} />
        )
      }
    }
  }
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {cells}
    </Svg>
  )
}

const RESSOURCES = [
  { title: 'Phrases STOP',        desc: '9 cartes sur anneau',          color: C.rose },
  { title: 'Cards Émotions',      desc: '9 cartes à pointer',           color: C.orange },
  { title: 'Thermomètre',         desc: 'à afficher au mur',            color: C.yellow },
  { title: 'Kit Anti-Crise',      desc: 'coin calme + patterns',        color: C.teal },
  { title: 'Journal simple',      desc: '10 fiches post-crise',         color: C.violet },
  { title: 'Système de Victoires', desc: 'cartes + tableau + contrat',  color: '#A88E1F' },
]

const OUTILS = [
  { title: 'Minuteur visuel',         desc: 'pour les devoirs et les pauses', color: C.teal },
  { title: 'Bande élastique de chaise',   desc: '1 bande à fixer sur les pieds de chaise', color: C.orange },
  { title: 'Anneaux sensoriels rotatifs', desc: '2 anneaux à tourner pour se concentrer',  color: C.rose },
  { title: 'Feutre effaçable',        desc: 'pour les fiches plastifiées',    color: C.violet },
  { title: 'Pastilles velcro',        desc: 'pour le tableau de victoires',   color: '#A88E1F' },
]

const RESSOURCES_USAGE = [
  {
    title: 'Phrases STOP',
    sub: '9 cartes sur anneau',
    color: C.rose,
    body: 'Accroche-les au frigo ou dans ton sac. En pleine crise, pioche la carte de la situation et lis la phrase à dire. Chaque carte te donne aussi la phrase à NE PAS dire.',
  },
  {
    title: 'Cards Émotions',
    sub: '9 cartes à pointer',
    color: C.orange,
    body: 'Quand ton enfant ne peut pas parler, il pointe la carte de ce qu\'il ressent. Pas besoin de mots — l\'image suffit.',
  },
  {
    title: 'Thermomètre',
    sub: 'à afficher au mur',
    color: '#A88E1F',
    body: 'Chaque soir, demande-lui « montre-moi où tu es ». S\'il pointe 3, tu agis. À 4, c\'est déjà tard. Plastifie-le et colle-le dans sa chambre ou la cuisine.',
  },
  {
    title: 'Kit Anti-Crise',
    sub: 'coin calme + patterns',
    color: C.teal,
    body: 'Recto : prépare son coin calme ensemble un dimanche calme. Verso : apprends à reconnaître SES déclencheurs et SES signaux. Remplis au feutre effaçable, mets à jour chaque mois.',
  },
  {
    title: 'Journal simple',
    sub: '10 fiches post-crise',
    color: C.violet,
    body: 'Après une crise, note 3 choses : ce qui a déclenché, combien de temps, ce qui a aidé. C\'est tout. Pas de pression — remplis seulement quand tu en as l\'énergie.',
  },
  {
    title: 'Système de Victoires',
    sub: 'cartes + tableau + contrat',
    color: '#A88E1F',
    body: 'Chaque bonne réaction = une carte victoire sur le tableau. À 5, 10, 15 et 20 cartes, une récompense définie ensemble. Le contrat vous engage tous les deux.',
  },
]

const OUTILS_USAGE = [
  {
    title: 'Minuteur visuel',
    color: C.teal,
    body: 'Pose-le sur la table pendant les devoirs : « Tu travailles jusqu\'à ce que le rouge disparaisse. » L\'enfant TDAH a besoin de VOIR le temps passer. 30 min max par session.',
  },
  {
    title: 'Bande élastique de chaise',
    color: C.orange,
    body: 'Fixe-la entre les pieds avant de sa chaise. Ton enfant peut pousser avec ses pieds pendant les devoirs ou les repas — ça canalise le besoin de bouger SANS déranger.',
  },
  {
    title: 'Anneaux sensoriels rotatifs',
    color: C.rose,
    body: 'L\'enfant les tourne entre ses doigts pour canaliser le besoin de bouger. Silencieux, discrets, utilisables en classe, à table ou pendant les devoirs. Les mains occupées = un cerveau plus concentré.',
  },
  {
    title: 'Feutre effaçable',
    color: C.violet,
    body: 'Pour remplir les fiches plastifiées (Kit Anti-Crise, Contrat de Victoires). Efface avec un chiffon, recommence. Tout est réutilisable.',
  },
  {
    title: 'Pastilles velcro',
    color: '#A88E1F',
    body: 'Déjà posées sur le tableau de victoires et les cartes. Ton enfant clipse ses cartes gagnées — le scratch est un feedback sensoriel satisfaisant à chaque victoire.',
  },
]

const BienvenueItem = ({
  title, desc, color, dense = false,
}: { title: string; desc: string; color: string; dense?: boolean }) => (
  <View style={{ flexDirection: 'row', marginBottom: dense ? 9 : 11, alignItems: 'flex-start' }}>
    <View style={{
      width: 10, height: 10, borderRadius: 5, backgroundColor: color,
      marginTop: 4, marginRight: 10, flexShrink: 0,
    }} />
    <View style={{ flex: 1 }}>
      <Text style={{ fontFamily: 'Poppins', fontSize: 11, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>
        {title}
      </Text>
      <Text style={{ fontFamily: 'Inter', fontSize: 9.5, color: C.muted, lineHeight: 1.35, marginTop: 1 }}>
        {desc}
      </Text>
    </View>
  </View>
)

const BienvenueColumn = ({
  icon, title, color, items, dense = false,
}: { icon: string; title: string; color: string; items: typeof RESSOURCES; dense?: boolean }) => (
  <View style={{
    flex: 1,
    backgroundColor: C.white,
    padding: 18,
    borderLeftWidth: 4,
    borderLeftColor: color,
  }}>
    <Text style={{
      fontFamily: 'Poppins', fontSize: 10, fontWeight: 800, color,
      letterSpacing: 1.6, textTransform: 'uppercase', marginBottom: 14,
    }}>
      {icon}  {title}
    </Text>
    {items.map((it, i) => (
      <BienvenueItem key={i} title={it.title} desc={it.desc} color={it.color} dense={dense} />
    ))}
  </View>
)

const BienvenueHero = ({ badge = 'Bienvenue · ouvre-moi en premier' }: { badge?: string } = {}) => (
  <>
    <View style={[s.brandRow, { marginBottom: 14 }]}>
      <Text style={[s.brand, { color: C.text }]}>
        Cerveau <Text style={s.brandAccent}>Électrique</Text> · Cockpit Crises
      </Text>
      <Text style={[s.brand, { color: C.muted, fontSize: 8 }]}>cerveau-electrique.fr</Text>
    </View>

    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
      <View style={{ flex: 1 }}>
        <View style={[s.pill, { backgroundColor: C.yellow, color: C.text, borderRadius: 0, marginBottom: 8, alignSelf: 'flex-start' }]}>
          <Text>{badge}</Text>
        </View>
        <Text style={{ fontFamily: 'Poppins', fontSize: 26, fontWeight: 800, color: C.text, lineHeight: 1.1, textAlign: 'left' }}>
          Bienvenue dans ton{'\n'}Cockpit Crises
        </Text>
        <Text style={{ fontFamily: 'Caveat', fontSize: 21, fontWeight: 700, color: C.teal, marginTop: 4, lineHeight: 1.1, textAlign: 'left' }}>
          Tout ce qu'il faut pour être prêt avant la tempête.
        </Text>
      </View>
      <Image src="./assets/logo-ce.png" style={{ width: 120, height: 120, marginLeft: 16 }} />
    </View>

    <View style={[s.hairline, { marginTop: 14, marginBottom: 16 }]} />
  </>
)

const BienvenueAppAccess = ({ standalone = false }: { standalone?: boolean }) => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.dark,
    padding: 18,
    marginTop: standalone ? 14 : 12,
  }}>
    <View style={{
      backgroundColor: C.white,
      padding: 6,
      marginRight: 16,
    }}>
      <Qr value={APP_URL} size={92} fg={C.dark} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{
        fontFamily: 'Poppins', fontSize: 8, fontWeight: 700, color: C.yellow,
        letterSpacing: 1.6, textTransform: 'uppercase', marginBottom: 4,
      }}>
        Accède à ton app
      </Text>
      <Text style={{ fontFamily: 'Poppins', fontSize: 14, fontWeight: 700, color: C.white, lineHeight: 1.25 }}>
        Scanne pour accéder à ton app Cockpit CE
      </Text>
      <Text style={{ fontFamily: 'Inter', fontSize: 9.5, color: 'rgba(255,255,255,0.7)', marginTop: 4, lineHeight: 1.4 }}>
        Formation · Quiz Émotions · Ressources digitales
      </Text>
      <Text style={{ fontFamily: 'Inter', fontSize: 8, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>
        cockpit-ce.pages.dev
      </Text>
    </View>
  </View>
)

const BienvenueFooter = () => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 16,
  }}>
    <Image src="./assets/monstre-calin.png" style={{ width: 78, height: 78, objectFit: 'contain' }} />
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 8 }}>
      <Image src="./assets/maman-main-tendue.png" style={{ width: 86, height: 86, objectFit: 'contain' }} />
      <Image src="./assets/papa-encourageant.png" style={{ width: 86, height: 86, objectFit: 'contain' }} />
    </View>
    <Image src="./assets/cortex-bienveillant.png" style={{ width: 78, height: 78, objectFit: 'contain' }} />
  </View>
)

const UsageItem = ({
  title, sub, body, color,
}: { title: string; sub?: string; body: string; color: string }) => (
  <View style={{ marginBottom: 11 }}>
    <View style={{ flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap', marginBottom: 2 }}>
      <Text style={{ fontFamily: 'Poppins', fontSize: 10.5, fontWeight: 700, color, lineHeight: 1.2 }}>
        {title}
      </Text>
      {sub && (
        <Text style={{ fontFamily: 'Inter', fontSize: 8.5, color: C.muted, marginLeft: 6, fontStyle: 'italic' }}>
          ({sub})
        </Text>
      )}
    </View>
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ fontFamily: 'Poppins', fontSize: 10, fontWeight: 700, color, marginRight: 5, lineHeight: 1.4 }}>→</Text>
      <Text style={{ fontFamily: 'Inter', fontSize: 9, color: C.text, lineHeight: 1.4, flex: 1 }}>
        {body}
      </Text>
    </View>
  </View>
)

const UsageSection = ({
  icon, title, color, children,
}: { icon: string; title: string; color: string; children: React.ReactNode }) => (
  <View style={{ flex: 1 }}>
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      paddingBottom: 6,
      borderBottomWidth: 1.5,
      borderBottomColor: color,
      borderBottomStyle: 'solid',
    }}>
      <Text style={{ fontFamily: 'Poppins', fontSize: 13, marginRight: 6 }}>{icon}</Text>
      <Text style={{
        fontFamily: 'Poppins', fontSize: 9.5, fontWeight: 800, color,
        letterSpacing: 1.4, textTransform: 'uppercase',
      }}>
        {title}
      </Text>
    </View>
    {children}
  </View>
)

const PdfBienvenue = () => (
  <Document title="Bienvenue dans ton Cockpit CE" author="Cerveaux Électriques">
    {/* ═══ PAGE 1 — Sommaire ═══ */}
    <Page size="A4" style={[s.pageCream, { padding: 28, paddingBottom: 20 }]}>
      <BienvenueHero />

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <BienvenueColumn icon="📄" title="Tes ressources" color={C.teal} items={RESSOURCES} dense />
        <BienvenueColumn icon="🧸" title="Tes outils physiques" color={C.orange} items={OUTILS} dense />
      </View>

      <BienvenueAppAccess />
      <BienvenueFooter />

      <Text fixed style={{
        position: 'absolute', bottom: 8, left: 0, right: 0,
        fontFamily: 'Inter', fontSize: 7.5, color: C.muted, textAlign: 'center',
      }}>
        Cerveaux Électriques · cerveau-electrique.fr · Cockpit Crises — version physique · p. 1
      </Text>
    </Page>

    {/* ═══ PAGE 2 — Par où commencer + Pourquoi ces outils fonctionnent ═══ */}
    <Page size="A4" style={[s.pageCream, { padding: 30, paddingBottom: 26 }]}>
      <View style={[s.brandRow, { marginBottom: 18 }]}>
        <Text style={[s.brand, { color: C.text }]}>
          Cerveaux <Text style={s.brandAccent}>Électriques</Text> · Cockpit Crises
        </Text>
        <Text style={[s.brand, { color: C.muted, fontSize: 8 }]}>cerveau-electrique.fr</Text>
      </View>

      {/* ─── Partie haute : Par où commencer ? ─── */}
      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontFamily: 'Poppins', fontSize: 22, fontWeight: 700, color: C.text, lineHeight: 1.05 }}>
          Par où commencer ?
        </Text>
        <Text style={{ fontFamily: 'Caveat', fontSize: 17, fontWeight: 700, color: C.teal, marginTop: 6, lineHeight: 1.2 }}>
          Chaque ressource a sa propre page de présentation qui t'explique comment la prendre en main.
        </Text>
        <Text style={{ fontFamily: 'Inter', fontSize: 10, color: C.text, fontStyle: 'italic', marginTop: 7 }}>
          Pas d'ordre. Pas de pression. Un geste à la fois.
        </Text>
      </View>

      {/* 3 catégories — Avant / Pendant / Après crise */}
      <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
        {[
          {
            label: 'AVANT LA CRISE',
            sub: 'Préparer',
            color: C.teal,
            items: [
              { c: C.teal,    t: 'Kit Anti-Crise' },
              { c: '#A88E1F', t: 'Thermomètre' },
              { c: C.orange,  t: 'Bandes élastiques' },
              { c: '#10B981', t: 'Minuteur visuel' },
            ],
          },
          {
            label: 'PENDANT LA CRISE',
            sub: 'Gérer',
            color: C.rose,
            items: [
              { c: C.rose,    t: 'Phrases STOP' },
              { c: C.orange,  t: 'Cards Émotions' },
              { c: C.rose,    t: 'Anneaux sensoriels' },
            ],
          },
          {
            label: 'APRÈS LA CRISE',
            sub: 'Réparer',
            color: '#7C3AED',
            items: [
              { c: '#5B7FBE', t: 'Journal simple' },
              { c: '#7C3AED', t: 'Système de Victoires' },
            ],
          },
        ].map((col, ci) => (
          <View key={ci} style={{
            flex: 1,
            backgroundColor: 'rgba(255,255,255,0.55)',
            borderTop: `3pt solid ${col.color}`,
            padding: 12,
          }}>
            <Text style={{
              fontFamily: 'Poppins', fontSize: 8.5, fontWeight: 800, color: col.color,
              letterSpacing: 1.3, textTransform: 'uppercase', marginBottom: 2,
            }}>
              {col.label}
            </Text>
            <Text style={{ fontFamily: 'Caveat', fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 9 }}>
              {col.sub}
            </Text>
            {col.items.map((it, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                <View style={{
                  width: 8, height: 8, borderRadius: 4, backgroundColor: it.c,
                  marginRight: 8, flexShrink: 0,
                }} />
                <Text style={{ fontFamily: 'Poppins', fontSize: 10, fontWeight: 700, color: C.text }}>
                  {it.t}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      <View style={[s.hairline, { marginVertical: 22 }]} />

      {/* ─── Partie basse : Pourquoi ces outils fonctionnent ─── */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
        <View style={{ flex: 1 }}>
          <View style={[s.pill, { backgroundColor: C.teal, color: C.white, borderRadius: 0, marginBottom: 6, alignSelf: 'flex-start' }]}>
            <Text>La science derrière le kit</Text>
          </View>
          <Text style={{ fontFamily: 'Poppins', fontSize: 18, fontWeight: 700, color: C.text, lineHeight: 1.05 }}>
            Pourquoi ces outils fonctionnent
          </Text>
          <Text style={{ fontFamily: 'Caveat', fontSize: 15, fontWeight: 700, color: C.teal, marginTop: 3, lineHeight: 1.1 }}>
            La science derrière le kit, par le Professeur Cortex
          </Text>
        </View>
        <Image src="./assets/cortex-passionne.png" style={{ width: 72, height: 72, objectFit: 'contain', marginLeft: 10 }} />
      </View>

      <View>
        {/* BLOC 1 — Minuteur visuel */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Image src="./assets/produits/minuteur-visuel.png" style={{ width: 82, height: 82, objectFit: 'contain', marginRight: 14 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 11.5, fontWeight: 700, color: '#10B981', marginBottom: 4 }}>
              Voir le temps passer
            </Text>
            <Text style={{ fontFamily: 'Inter', fontSize: 9.5, color: C.text, lineHeight: 1.45 }}>
              Le cerveau TDAH a un déficit de perception du temps. 5 min et 30 min, c'est pareil pour lui. Le minuteur rend le temps VISIBLE — son cerveau comprend enfin que « bientôt » a une fin.
            </Text>
            <Text style={{ fontFamily: 'Inter', fontSize: 7.5, color: C.muted, marginTop: 3, fontStyle: 'italic' }}>
              Barkley, 2013
            </Text>
          </View>
        </View>

        {/* BLOC 2 — Bandes élastiques */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Image src="./assets/produits/bandes-elastiques.png" style={{ width: 82, height: 82, objectFit: 'contain', marginRight: 14 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 11.5, fontWeight: 700, color: '#A88E1F', marginBottom: 4 }}>
              Bouger pour se concentrer
            </Text>
            <Text style={{ fontFamily: 'Inter', fontSize: 9.5, color: C.text, lineHeight: 1.45 }}>
              L'enfant TDAH a besoin de stimulation motrice constante. Quand il tape du pied, son cerveau cherche de la dopamine. Les bandes nourrissent ce besoin sans déranger.
            </Text>
            <Text style={{ fontFamily: 'Inter', fontSize: 7.5, color: C.muted, marginTop: 3, fontStyle: 'italic' }}>
              HAS 2024
            </Text>
          </View>
        </View>

        {/* BLOC 3 — Anneau sensoriel */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <Image src="./assets/produits/anneau-sensoriel.png" style={{ width: 82, height: 82, objectFit: 'contain', marginRight: 14 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 11.5, fontWeight: 700, color: C.rose, marginBottom: 4 }}>
              Les mains occupées, le cerveau concentré
            </Text>
            <Text style={{ fontFamily: 'Inter', fontSize: 9.5, color: C.text, lineHeight: 1.45 }}>
              La manipulation d'objets sensoriels active le système proprioceptif, qui régule l'attention et les émotions. Feedback tactile constant, sans bruit — utilisable partout.
            </Text>
            <Text style={{ fontFamily: 'Inter', fontSize: 7.5, color: C.muted, marginTop: 3, fontStyle: 'italic' }}>
              INSERM 2022
            </Text>
          </View>
        </View>
      </View>

      <View style={{
        backgroundColor: C.yellow,
        paddingVertical: 12,
        paddingHorizontal: 14,
        marginTop: 14,
      }}>
        <Text style={{ fontFamily: 'Poppins', fontSize: 11, fontWeight: 700, color: C.text }}>
          ⚡ 5 min chrono : Thermomètre au mur · Phrases STOP dans le sac · Anneau dans la poche.
        </Text>
        <Text style={{ fontFamily: 'Inter', fontSize: 9, color: C.text, fontStyle: 'italic', marginTop: 5 }}>
          Trois gestes, et tu es déjà prêt pour la prochaine crise — chez toi, dans ton sac, dans ses mains.
        </Text>
      </View>

      <Text fixed style={{
        position: 'absolute', bottom: 8, left: 0, right: 0,
        fontFamily: 'Inter', fontSize: 7.5, color: C.muted, textAlign: 'center',
      }}>
        Cerveaux Électriques · cerveau-electrique.fr · Cockpit Crises — version physique · p. 2
      </Text>
    </Page>
  </Document>
)

const RESSOURCES_DIGITAL = [
  { title: 'Phrases STOP',         desc: '9 fiches par situation',         color: C.rose },
  { title: 'Cards Émotions',       desc: '9 cartes à pointer',             color: C.orange },
  { title: 'Thermomètre',          desc: 'à afficher au mur',              color: '#A88E1F' },
  { title: 'Kit Anti-Crise',       desc: 'coin calme + patterns',          color: C.teal },
  { title: 'Journal simple',       desc: 'fiches post-crise à imprimer',   color: C.violet },
  { title: 'Système de Victoires', desc: 'tableau à colorier',             color: '#A88E1F' },
]

const PdfBienvenueDigital = () => (
  <Document title="Bienvenue dans ton Cockpit CE — Digital" author="Cerveau Électrique">
    {/* ═══ PAGE 1 — Bienvenue ═══ */}
    <Page size="A4" style={[s.pageCream, { padding: 26, paddingBottom: 20 }]}>
      <BienvenueHero badge="Bienvenue · ton cockpit est prêt" />

      {/* Encart teal — "Commence par la ressource qui te parle" + 3 badges */}
      <View style={{ backgroundColor: C.teal, padding: 14, marginBottom: 10 }}>
        <Text style={{ fontFamily: 'Poppins', fontSize: 13, fontWeight: 700, color: C.white, marginBottom: 4 }}>
          Commence par la ressource qui te parle
        </Text>
        <Text style={{ fontFamily: 'Inter', fontSize: 9.5, color: C.white, lineHeight: 1.45, marginBottom: 9 }}>
          Chaque ressource est accompagnée d'une page qui t'explique comment la prendre en main. Elles sont classées par moment d'utilisation :
        </Text>

        <View style={{ flexDirection: 'row', gap: 6, marginBottom: 9 }}>
          {[
            { label: '🛡️ AVANT LA CRISE',   bg: '#5DAEAB' },
            { label: '⚡ PENDANT LA CRISE', bg: '#F5A623' },
            { label: '🌟 APRÈS LA CRISE',   bg: '#4CAF50' },
          ].map((b, i) => (
            <View key={i} style={{
              flex: 1,
              backgroundColor: b.bg,
              paddingVertical: 5,
              paddingHorizontal: 4,
              alignItems: 'center',
            }}>
              <Text style={{
                fontFamily: 'Poppins', fontSize: 7.5, fontWeight: 800, color: C.white,
                letterSpacing: 0.7, textAlign: 'center',
              }}>
                {b.label}
              </Text>
            </View>
          ))}
        </View>

        <Text style={{ fontFamily: 'Inter', fontSize: 9.5, fontStyle: 'italic', color: C.white, lineHeight: 1.4 }}>
          Pas d'ordre. Pas de pression. Un geste à la fois.
        </Text>
      </View>

      {/* Tes 6 ressources — version compacte inline */}
      <View style={{
        backgroundColor: C.white,
        padding: 13,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: C.teal,
      }}>
        <Text style={{
          fontFamily: 'Poppins', fontSize: 9.5, fontWeight: 800, color: C.teal,
          letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 8,
        }}>
          📄  Tes 6 ressources
        </Text>
        {RESSOURCES_DIGITAL.map((it, i) => (
          <View key={i} style={{ flexDirection: 'row', marginBottom: 4, alignItems: 'center' }}>
            <View style={{ width: 9, height: 9, borderRadius: 4.5, backgroundColor: it.color, marginRight: 9, flexShrink: 0 }} />
            <Text style={{ fontFamily: 'Inter', fontSize: 10, color: C.text, lineHeight: 1.35, flex: 1 }}>
              <Text style={{ fontFamily: 'Poppins', fontWeight: 700 }}>{it.title}</Text>
              <Text style={{ color: C.muted }}> — {it.desc}</Text>
            </Text>
          </View>
        ))}
      </View>

      {/* Ton app Cockpit CE */}
      <View style={{
        backgroundColor: C.white,
        padding: 13,
        marginBottom: 10,
        borderLeftWidth: 4,
        borderLeftColor: C.rose,
      }}>
        <Text style={{
          fontFamily: 'Poppins', fontSize: 9.5, fontWeight: 800, color: C.rose,
          letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 8,
        }}>
          📱  Ton app Cockpit CE
        </Text>
        {[
          { emoji: '🧠', title: 'Formation',      desc: '5 modules pour comprendre le cerveau TDAH de ton enfant' },
          { emoji: '🎯', title: 'Quiz Émotions',  desc: 'ton enfant apprend à reconnaître ses émotions en jouant' },
          { emoji: '📥', title: 'Tes PDFs',       desc: 'toutes les ressources téléchargeables à tout moment' },
          { emoji: '📊', title: 'Progression',    desc: 'tout est sauvegardé, reprends où tu en étais' },
        ].map((it, i) => (
          <View key={i} style={{ flexDirection: 'row', marginBottom: 4, alignItems: 'flex-start' }}>
            <Text style={{ fontSize: 11, marginRight: 8, lineHeight: 1.25 }}>{it.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: 'Inter', fontSize: 10, color: C.text, lineHeight: 1.35 }}>
                <Text style={{ fontFamily: 'Poppins', fontWeight: 700 }}>{it.title}</Text>
                <Text style={{ color: C.muted }}> — {it.desc}</Text>
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Quick Win — encadré jaune (en bas) */}
      <View style={{ backgroundColor: C.yellow, padding: 12 }}>
        <Text style={{ fontFamily: 'Poppins', fontSize: 12.5, fontWeight: 700, color: C.text, marginBottom: 4 }}>
          ⚡ 5 minutes chrono
        </Text>
        <Text style={{ fontFamily: 'Inter', fontSize: 9.5, color: C.text, lineHeight: 1.5 }}>
          Imprime le Thermomètre et scotche-le au mur. Imprime les Cards Émotions et pose-les sur la table. Demande à ton enfant : « montre-moi comment tu te sens. » C'est parti.
        </Text>
      </View>

      <Text fixed style={{
        position: 'absolute', bottom: 8, left: 0, right: 0,
        fontFamily: 'Inter', fontSize: 7.5, color: C.muted, textAlign: 'center',
      }}>
        Cerveau Électrique · cerveau-electrique.fr · Cockpit Crises — version digitale · p. 1
      </Text>
    </Page>

    {/* ═══ PAGE 2 — Upsell Kit Physique ═══ */}
    <Page size="A4" style={[s.pageCream, { padding: 26, paddingBottom: 20 }]}>
      <View style={[s.brandRow, { marginBottom: 14 }]}>
        <Text style={[s.brand, { color: C.text }]}>
          Cerveau <Text style={s.brandAccent}>Électrique</Text> · Cockpit Crises
        </Text>
        <Text style={[s.brand, { color: C.muted, fontSize: 8 }]}>cerveau-electrique.fr</Text>
      </View>

      {/* Upsell — fond dark + visuels produits */}
      <View style={{ backgroundColor: C.dark, padding: 20 }}>
        <Text style={{ fontFamily: 'Poppins', fontSize: 17, fontWeight: 700, color: C.yellow, lineHeight: 1.15, marginBottom: 10 }}>
          Et si tout était déjà prêt quand la prochaine crise arrive ?
        </Text>

        <Text style={{ fontFamily: 'Inter', fontSize: 10, color: C.white, lineHeight: 1.5, marginBottom: 6 }}>
          Tu n'as pas le temps de plastifier. Tu n'as pas le temps de découper. Tu n'as pas le temps de chercher le bon feutre. Et quand la crise arrive, tu n'as pas le temps de chercher tes outils.
        </Text>
        <Text style={{ fontFamily: 'Inter', fontSize: 10, color: C.white, lineHeight: 1.5, marginBottom: 12 }}>
          Le <Text style={{ fontWeight: 700, color: C.yellow }}>Kit Physique</Text>, c'est le Cockpit Crises version <Text style={{ fontWeight: 700 }}>zéro effort</Text> :
        </Text>

        {/* 3 produits avec visuels agrandis */}
        {[
          { img: './assets/produits/minuteur-visuel.png',   emoji: '⏱️',  body: 'Un minuteur visuel que tu poses sur la table. Ton enfant VOIT le temps passer — les crises de devoirs divisées par deux.' },
          { img: './assets/produits/bandes-elastiques.png', emoji: '🪑',  body: 'Des bandes élastiques déjà prêtes. Il les pousse avec ses pieds pendant les repas et les devoirs. Moins de cris, plus de concentration.' },
          { img: './assets/produits/anneau-sensoriel.png',  emoji: '🔴',  body: 'Des anneaux sensoriels qu\'il tourne entre ses doigts. Silencieux, discrets — même en classe.' },
        ].map((p, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 9 }}>
            <View style={{
              width: 72, height: 72, marginRight: 12,
              backgroundColor: 'rgba(255,255,255,0.06)',
              alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Image src={p.img} style={{ width: 62, height: 62, objectFit: 'contain' }} />
            </View>
            <Text style={{ fontFamily: 'Inter', fontSize: 10, color: C.white, lineHeight: 1.5, flex: 1 }}>
              <Text style={{ fontWeight: 700 }}>{p.emoji}  </Text>
              {p.body}
            </Text>
          </View>
        ))}

        {/* Callout jaune */}
        <View style={{
          backgroundColor: C.yellow,
          padding: 11,
          marginTop: 6,
          marginBottom: 12,
        }}>
          <Text style={{ fontFamily: 'Inter', fontSize: 10, fontWeight: 700, color: C.text, lineHeight: 1.45 }}>
            Toutes tes ressources imprimées, plastifiées, prêtes à l'emploi. Tu ouvres le kit, tu utilises. Rien à préparer.
          </Text>
        </View>

        {/* Bloc promo TDAH40 */}
        <View style={{
          backgroundColor: C.white,
          borderWidth: 2,
          borderColor: C.teal,
          padding: 14,
          marginBottom: 12,
        }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 13, fontWeight: 700, color: C.teal, marginBottom: 6 }}>
            🎁 -40% parce que tu as déjà le digital
          </Text>
          <Text style={{ fontFamily: 'Inter', fontSize: 10, color: C.text, lineHeight: 1.5, marginBottom: 10 }}>
            Utilise le code ci-dessous au moment du paiement pour bénéficier de -40% sur le Kit Physique. Soit <Text style={{ fontWeight: 700 }}>54€ au lieu de 90€</Text>.
          </Text>
          <View style={{
            backgroundColor: C.yellow,
            paddingVertical: 9,
            paddingHorizontal: 16,
            alignSelf: 'flex-start',
          }}>
            <Text style={{
              fontFamily: 'Courier',
              fontSize: 19,
              fontWeight: 700,
              color: C.text,
              letterSpacing: 4,
            }}>
              TDAH40
            </Text>
          </View>
        </View>

        {/* CTA cliquable */}
        <Link
          src="https://cerveau-electrique.fr/cockpit-ce"
          style={{ textDecoration: 'none', alignSelf: 'flex-start' }}
        >
          <View style={{
            backgroundColor: C.yellow,
            paddingVertical: 12,
            paddingHorizontal: 18,
          }}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 12, fontWeight: 700, color: C.text }}>
              Découvrir le Kit Physique → cerveau-electrique.fr/cockpit-ce
            </Text>
          </View>
        </Link>
      </View>

      <Text fixed style={{
        position: 'absolute', bottom: 8, left: 0, right: 0,
        fontFamily: 'Inter', fontSize: 7.5, color: C.muted, textAlign: 'center',
      }}>
        Cerveau Électrique · cerveau-electrique.fr · Cockpit Crises — version digitale · p. 2
      </Text>
    </Page>
  </Document>
)

/* ═══════════════════════════════════════════════════ */
/* Intercalaires — composant factorisé                */
/* ═══════════════════════════════════════════════════ */
type IntercalaireConfig = {
  badge: string
  title: string
  subtitle: string
  image: string
  accent: string          // couleur des rectangles + titres
  textOnAccent?: string   // couleur du texte sur le rectangle (def. blanc)
  titleColor?: string     // couleur titre + sous-titre (def. accent)
  blocs: { label: string; body: string }[]
}

const IntercalairePage = ({
  badge, title, subtitle, image, accent,
  textOnAccent = '#FFFFFF',
  titleColor,
  blocs,
}: IntercalaireConfig) => {
  const tColor = titleColor ?? accent
  return (
    <Page size="A4" style={{ backgroundColor: C.cream, padding: 36, paddingBottom: 28 }}>
      {/* Rectangle couleur haut-gauche — badge */}
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 200,
        height: 64,
        backgroundColor: accent,
        justifyContent: 'center',
        paddingHorizontal: 18,
      }}>
        <Text style={{
          fontFamily: 'Poppins', fontSize: 10, fontWeight: 800, color: textOnAccent,
          letterSpacing: 1.5, textTransform: 'uppercase',
        }}>
          {badge}
        </Text>
      </View>

      {/* HAUT — Titre + sous-titre */}
      <View style={{ marginTop: 80 }}>
        <Text style={{ fontFamily: 'Poppins', fontSize: 42, fontWeight: 800, color: tColor, lineHeight: 1.0 }}>
          {title}
        </Text>
        <Text style={{ fontFamily: 'Caveat', fontSize: 26, fontWeight: 700, color: tColor, marginTop: 8, lineHeight: 1.1 }}>
          {subtitle}
        </Text>
      </View>

      {/* MILIEU — image */}
      <View style={{ marginTop: 18, marginBottom: 18, alignItems: 'center' }}>
        <Image src={image} style={{ width: '100%', height: 260, objectFit: 'cover' }} />
      </View>

      {/* BAS — 3 blocs */}
      <View style={{ gap: 10 }}>
        {blocs.map((b, i) => (
          <View key={i} style={{
            backgroundColor: 'rgba(28,27,46,0.04)',
            borderLeft: `3pt solid ${accent}`,
            paddingVertical: 10,
            paddingHorizontal: 12,
          }}>
            <Text style={{
              fontFamily: 'Poppins', fontSize: 9, fontWeight: 800, color: accent,
              letterSpacing: 1.3, textTransform: 'uppercase', marginBottom: 5,
            }}>
              {b.label}
            </Text>
            <Text style={{ fontFamily: 'Inter', fontSize: 10, color: '#1C1B2E', lineHeight: 1.5 }}>
              {b.body}
            </Text>
          </View>
        ))}
      </View>

      {/* Rectangle couleur bas-droite — footer */}
      <View fixed style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 230,
        height: 40,
        backgroundColor: accent,
        justifyContent: 'center',
        paddingHorizontal: 16,
      }}>
        <Text style={{
          fontFamily: 'Inter', fontSize: 8.5, fontWeight: 600, color: textOnAccent,
          textAlign: 'right',
        }}>
          Cerveaux Électriques · cerveau-electrique.fr
        </Text>
      </View>
    </Page>
  )
}

/* ─── Configs ─── */
const INTERCALAIRE_CARDS_EMOTIONS: IntercalaireConfig = {
  badge: '⚡ Pendant la crise',
  title: 'Cards Émotions',
  subtitle: 'Quand les mots ne viennent pas, il pointe.',
  image: './assets/scene-cards-emotions.jpg',
  accent: '#F5A623',
  blocs: [
    { label: '📋 Comment ça marche', body: 'Les 9 cartes représentent 9 émotions illustrées par Le Monstre. Fixe-les au mur de sa chambre ou pose-les sur la table. Quand ton enfant ne peut pas dire ce qu\'il ressent, il pointe la carte. Pas besoin de mots — l\'image suffit.' },
    { label: '🧠 Ce que ça active', body: 'Un enfant TDAH en crise perd l\'accès au langage — son cortex préfrontal est déconnecté. Pointer une image utilise le système visuo-moteur, qui reste actif même en pleine surcharge émotionnelle. C\'est plus facile de montrer que de parler.' },
    { label: '📊 Prouvé par', body: 'La communication par support visuel réduit la durée des crises de 35% chez les enfants avec difficultés de régulation émotionnelle. (HAS 2024, Niveau B)' },
  ],
}

const INTERCALAIRE_THERMOMETRE: IntercalaireConfig = {
  badge: '🛡️ Avant la crise',
  title: 'Thermomètre des Émotions',
  subtitle: 'Chaque soir, il te montre où il en est.',
  image: './assets/scene-thermometre.jpg',
  accent: '#F5E06D',
  textOnAccent: '#1C1B2E',
  titleColor: '#1C1B2E',
  blocs: [
    { label: '📋 Comment ça marche', body: 'Plastifie-le et colle-le dans sa chambre ou la cuisine. Chaque soir après l\'école, demande : « montre-moi où tu es. » L\'enfant pointe son niveau de 1 (calme) à 5 (explosion). S\'il pointe 3, tu agis. À 4, c\'est déjà tard.' },
    { label: '🧠 Ce que ça active', body: 'L\'enfant TDAH a du mal à identifier ce qu\'il ressent — c\'est l\'alexithymie partielle. Le thermomètre transforme une émotion floue en un chiffre concret. Il apprend à se scanner avant que la crise ne monte. C\'est de l\'intéroception assistée.' },
    { label: '📊 Prouvé par', body: 'Les outils de régulation émotionnelle visuelle réduisent la fréquence des crises de 40% après 4 semaines d\'utilisation quotidienne. (HAS 2024 — Psychoéducation, Niveau A)' },
  ],
}

const INTERCALAIRE_KIT_ANTI_CRISE: IntercalaireConfig = {
  badge: '🛡️ Avant la crise',
  title: 'Kit Anti-Crise',
  subtitle: 'Prépare le terrain un jour calme.',
  image: './assets/scene-coin-calme.jpg',
  accent: '#2A9490',
  blocs: [
    { label: '📋 Comment ça marche', body: 'Recto : construis le coin calme de ton enfant AVEC lui, un dimanche calme. Choisis l\'endroit, les objets, les activités, le mot code pour y aller. Verso : apprends à reconnaître ses déclencheurs, ses heures difficiles et ses signaux d\'alerte. Plastifie la fiche, remplis au feutre effaçable, mets à jour chaque mois.' },
    { label: '🧠 Ce que ça active', body: 'Le coin calme agit comme un ancrage spatial — le cerveau associe ce lieu à la sécurité. En le préparant à froid, l\'enfant se l\'approprie : c\'est SON refuge, pas une punition. Quand la crise monte, le trajet vers le coin calme active le système parasympathique et commence la régulation avant même d\'y arriver.' },
    { label: '📊 Prouvé par', body: 'Les espaces de retrait sensoriel réduisent l\'intensité des crises de 71% chez les enfants TDAH lorsqu\'ils sont co-construits avec l\'enfant. (HAS 2024, Niveau B)' },
  ],
}

const INTERCALAIRE_JOURNAL: IntercalaireConfig = {
  badge: '🌟 Après la crise',
  title: 'Journal Simple',
  subtitle: '3 cases. 2 minutes. Après la tempête.',
  image: './assets/scene-journal.jpg',
  accent: '#7C3AED',
  blocs: [
    { label: '📋 Comment ça marche', body: 'Après une crise, quand le calme est revenu, note 3 choses : ce qui a déclenché, combien de temps ça a duré, ce qui a aidé. C\'est tout. Pas de roman, pas de culpabilité. Tu en imprimes 10, tu les gardes dans un tiroir, tu remplis seulement quand tu en as l\'énergie.' },
    { label: '🧠 Ce que ça active', body: 'Écrire après une crise active le cortex préfrontal — la partie du cerveau qui analyse et régule. C\'est le passage de « je subis » à « je comprends ». Après 4 semaines, les patterns apparaissent : les mêmes heures, les mêmes déclencheurs. Tu passes de réactive à préventive.' },
    { label: '📊 Prouvé par', body: 'Le journaling post-crise réduit le stress parental de 28% et améliore la détection précoce des signaux d\'alerte de 60% après 30 jours. (Barkley, 2013 — Taking Charge of ADHD)' },
  ],
}

const INTERCALAIRE_VICTOIRES: IntercalaireConfig = {
  badge: '🌟 Après la crise',
  title: 'Système de Victoires',
  subtitle: 'Chaque bon réflexe mérite une étoile.',
  image: './assets/scene-victoires.jpg',
  accent: '#4CAF50',
  blocs: [
    { label: '📋 Comment ça marche', body: '16 cartes victoires à découper. Chaque bonne réaction de ton enfant = une carte posée sur le tableau (avec les pastilles velcro). À 5, 10, 15 et 20 cartes, une récompense définie ensemble dans le contrat parent-enfant. Quand le tableau est plein, on efface et on recommence.' },
    { label: '🧠 Ce que ça active', body: 'Le cerveau TDAH a un déficit de dopamine — il a besoin de récompenses fréquentes et immédiates pour rester motivé. Le système de victoires transforme chaque effort en feedback visible et tactile : poser la carte, sentir le scratch du velcro, voir le tableau se remplir. C\'est de la dopamine à chaque étape.' },
    { label: '📊 Prouvé par', body: 'L\'économie de jetons (token economy) est recommandée par la HAS comme stratégie de renforcement positif pour les enfants TDAH. Efficacité démontrée sur la réduction des comportements opposants de 45%. (HAS 2024, Niveau A)' },
  ],
}

const INTERCALAIRE_VICTOIRES_DIGITAL: IntercalaireConfig = {
  badge: '🌟 Après la crise',
  title: 'Système de Victoires',
  subtitle: 'Chaque bon réflexe mérite une étoile.',
  image: './assets/scene-victoires.jpg',
  accent: '#4CAF50',
  blocs: [
    { label: '📋 Comment ça marche', body: 'Imprime la page suivante et affiche-la sur le frigo. Chaque bonne réaction de ton enfant = un cercle à colorier au crayon (1 → 20). À 5, 10, 15 et 20 cercles, écris ensemble la récompense dans la bannière : Mini, Récompense, Grande, puis SUPER. Tableau plein ? On réimprime et on recommence.' },
    { label: '🧠 Ce que ça active', body: 'Le cerveau TDAH a un déficit de dopamine — il a besoin de récompenses fréquentes et immédiates pour rester motivé. Colorier un cercle après chaque effort transforme la réussite en feedback visuel concret. Voir le parcours se remplir, étape par étape, c\'est de la dopamine à chaque coup de crayon.' },
    { label: '📊 Prouvé par', body: 'L\'économie de jetons (token economy) est recommandée par la HAS comme stratégie de renforcement positif pour les enfants TDAH. Efficacité démontrée sur la réduction des comportements opposants de 45%. (HAS 2024, Niveau A)' },
  ],
}

/* ─── Pages réutilisables ─── */
const IntercalaireCardsEmotionsPage = () => <IntercalairePage {...INTERCALAIRE_CARDS_EMOTIONS} />
const IntercalaireThermometrePage   = () => <IntercalairePage {...INTERCALAIRE_THERMOMETRE} />
const IntercalaireKitAntiCrisePage  = () => <IntercalairePage {...INTERCALAIRE_KIT_ANTI_CRISE} />
const IntercalaireJournalPage       = () => <IntercalairePage {...INTERCALAIRE_JOURNAL} />
const IntercalaireVictoiresPage     = () => <IntercalairePage {...INTERCALAIRE_VICTOIRES} />
const IntercalaireVictoiresDigitalPage = () => <IntercalairePage {...INTERCALAIRE_VICTOIRES_DIGITAL} />

/* ─── PDFs standalone ─── */
const PdfIntercalaireCardsEmotions = () => (
  <Document title="Intercalaire — Cards Émotions" author="Cerveaux Électriques">
    <IntercalaireCardsEmotionsPage />
  </Document>
)
const PdfIntercalaireThermometre = () => (
  <Document title="Intercalaire — Thermomètre des Émotions" author="Cerveaux Électriques">
    <IntercalaireThermometrePage />
  </Document>
)
const PdfIntercalaireKitAntiCrise = () => (
  <Document title="Intercalaire — Kit Anti-Crise" author="Cerveaux Électriques">
    <IntercalaireKitAntiCrisePage />
  </Document>
)
const PdfIntercalaireJournal = () => (
  <Document title="Intercalaire — Journal Simple" author="Cerveaux Électriques">
    <IntercalaireJournalPage />
  </Document>
)
const PdfIntercalaireVictoires = () => (
  <Document title="Intercalaire — Système de Victoires" author="Cerveaux Électriques">
    <IntercalaireVictoiresPage />
  </Document>
)

/* ═══════════════════════════════════════════════════ */
/* Run all                                            */
/* ═══════════════════════════════════════════════════ */
const docs = [
  { name: 'bienvenue.pdf', doc: <PdfBienvenue /> },
  { name: 'bienvenue-digital.pdf', doc: <PdfBienvenueDigital /> },
  { name: 'intercalaire-cards-emotions.pdf', doc: <PdfIntercalaireCardsEmotions /> },
  { name: 'intercalaire-thermometre.pdf', doc: <PdfIntercalaireThermometre /> },
  { name: 'intercalaire-victoires.pdf', doc: <PdfIntercalaireVictoires /> },
  { name: 'intercalaire-kit-anti-crise.pdf', doc: <PdfIntercalaireKitAntiCrise /> },
  { name: 'intercalaire-journal.pdf', doc: <PdfIntercalaireJournal /> },
  { name: '1-signaux-alerte.pdf', doc: <Pdf1 /> },
  { name: '2-thermometre-emotionnel.pdf', doc: <Pdf2 /> },
  { name: '3-checklist-pre-crise.pdf', doc: <Pdf3 /> },
  { name: '4-carte-triggers.pdf', doc: <Pdf4 /> },
  { name: '5-protocole-stop-30s.pdf', doc: <Pdf5 /> },
  { name: '6-guide-reparation.pdf', doc: <Pdf6 /> },
  { name: '7-journal-crise-vierge.pdf', doc: <Pdf7 /> },
  ...STOPS.map(cfg => ({ name: cfg.file, doc: <PhrasesStopTemplate cfg={cfg} /> })),
  { name: 'phrases-stop-deck.pdf', doc: <PdfPhrasesStopDeck /> },
  { name: 'cards-emotions.pdf', doc: <PdfCardsEmotions /> },
  { name: 'thermometre-emotions.pdf', doc: <PdfThermometre /> },
  { name: 'systeme-victoires.pdf', doc: <PdfSystemeVictoires /> },
  { name: 'systeme-victoires-digital.pdf', doc: <PdfSystemeVictoiresDigital /> },
  { name: 'kit-anti-crise.pdf', doc: <PdfKitAntiCrise /> },
  { name: 'journal-simple.pdf', doc: <PdfJournalSimple /> },
  { name: 'journal-simple-planche.pdf', doc: <PdfJournalPlanche /> },
]

;(async () => {
  for (const d of docs) {
    process.stdout.write(`▸ ${d.name} … `)
    await renderToFile(d.doc, `./out/${d.name}`)
    console.log('✓')
  }
  console.log(`\n✓ ${docs.length} PDFs générés dans pdfs/out/`)
})()

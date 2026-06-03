import React from 'react'
import { Document, Page, Text, View, Image, Font, Svg, Rect, renderToFile } from '@react-pdf/renderer'
import QRCode from 'qrcode'

/* ── Fonts (mêmes familles que generate.tsx) ────────── */
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
    { src: './fonts/Inter-Italic.ttf', fontWeight: 'normal', fontStyle: 'italic' },
  ],
})
Font.register({
  family: 'Caveat',
  fonts: [{ src: './fonts/Caveat-Bold.ttf', fontWeight: 700 }],
})
Font.registerHyphenationCallback((word) => [word])

/* ── Design tokens CE ──────────────────────────────── */
const C = {
  dark: '#1C1B2E',
  cream: '#FAFAF5',
  text: '#2D2D3A',
  muted: '#64748B',
  yellow: '#F5E06D',
  teal: '#2A9490',
  rose: '#C0506A',
  white: '#FFFFFF',
}

const APP_URL = 'https://cockpit-ce.pages.dev'

/* ── Dimensions A4 + carte 12.5×8.5cm centrée ─────── */
// 1cm = 28.3465pt
const PAGE_W   = 595   // A4 portrait
const PAGE_H   = 842
const CARD_W   = 354.3 // 12.5 cm
const CARD_H   = 240.9 // 8.5  cm
const CARD_X   = (PAGE_W - CARD_W) / 2
const CARD_Y   = (PAGE_H - CARD_H) / 2
const CROP_LEN = 8     // longueur des repères de coupe (pt)
const CROP_GAP = 4     // espace entre coin carte et repère
const CROP_COL = '#999'

/* ── Messages par défaut (rotation aléatoire) ─────── */
// Pas de prénom en tête : le titre "Merci «Prénom»" est juste au-dessus.
export const DEFAULT_MESSAGES = [
  'Merci de nous faire confiance. Ce kit a été préparé avec soin pour toi et ton enfant.',
  'Bienvenue dans le Cockpit. On est avec toi pour les 30 prochains jours.',
  'Ce kit est entre de bonnes mains. Ton enfant a de la chance de t\'avoir.',
  'Chaque outil de ce kit répond à un vrai besoin de parent. Merci d\'être là.',
  'Tu viens de faire le premier pas. Le plus dur est derrière toi.',
]

export const pickRandomMessage = (): string =>
  DEFAULT_MESSAGES[Math.floor(Math.random() * DEFAULT_MESSAGES.length)]

/* ── QR code en SVG ────────────────────────────────── */
const Qr = ({ value, size = 90, fg = C.dark }: { value: string; size?: number; fg?: string }) => {
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

/* ── Repères de coupe aux 4 coins de la carte ─────── */
const CropMarks = () => {
  const marks = [
    // TL — horizontal
    { x: CARD_X - CROP_GAP - CROP_LEN, y: CARD_Y, w: CROP_LEN, h: 0.5 },
    // TL — vertical
    { x: CARD_X, y: CARD_Y - CROP_GAP - CROP_LEN, w: 0.5, h: CROP_LEN },
    // TR — horizontal
    { x: CARD_X + CARD_W + CROP_GAP, y: CARD_Y, w: CROP_LEN, h: 0.5 },
    // TR — vertical
    { x: CARD_X + CARD_W - 0.5, y: CARD_Y - CROP_GAP - CROP_LEN, w: 0.5, h: CROP_LEN },
    // BL — horizontal
    { x: CARD_X - CROP_GAP - CROP_LEN, y: CARD_Y + CARD_H - 0.5, w: CROP_LEN, h: 0.5 },
    // BL — vertical
    { x: CARD_X, y: CARD_Y + CARD_H + CROP_GAP, w: 0.5, h: CROP_LEN },
    // BR — horizontal
    { x: CARD_X + CARD_W + CROP_GAP, y: CARD_Y + CARD_H - 0.5, w: CROP_LEN, h: 0.5 },
    // BR — vertical
    { x: CARD_X + CARD_W - 0.5, y: CARD_Y + CARD_H + CROP_GAP, w: 0.5, h: CROP_LEN },
  ]
  return (
    <>
      {marks.map((m, i) => (
        <View key={i} style={{ position: 'absolute', left: m.x, top: m.y, width: m.w, height: m.h, backgroundColor: CROP_COL }} />
      ))}
    </>
  )
}

/* ── Indication d'impression hors carte ───────────── */
const PrintHint = ({ label }: { label: string }) => (
  <Text style={{
    position: 'absolute',
    top: CARD_Y - 22, left: 0, right: 0,
    fontFamily: 'Inter', fontSize: 7, color: CROP_COL, textAlign: 'center', letterSpacing: 1, textTransform: 'uppercase',
  }}>
    {label} · 12,5 × 8,5 cm · découpe sur les repères
  </Text>
)

/* ── Carte : RECTO — Merci + encadré + QR + code ──── */
const STEPS = [
  'Ouvre ta pochette kraft',
  'Commence par les 2 premières pages — elles t\'expliquent tout le kit',
  'Scanne le QR code ci-dessous pour accéder à ton app',
  'Entre ton code d\'accès personnel',
]

const CardRecto = ({ prenom, code }: { prenom: string; code?: string }) => (
  <View style={{
    position: 'absolute',
    left: CARD_X, top: CARD_Y,
    width: CARD_W, height: CARD_H,
    backgroundColor: C.cream,
    padding: 12,
    fontFamily: 'Caveat',
    overflow: 'hidden',
  }}>
    {/* Logo discret en haut */}
    <Image src="./assets/logo-ce.png" style={{ width: 18, height: 18 }} />

    {/* Titre + soulignement jaune */}
    <View style={{ alignItems: 'center', marginTop: 2 }}>
      <Text style={{ fontFamily: 'Caveat', fontSize: 30, fontWeight: 700, color: C.teal, lineHeight: 1 }}>
        Merci {prenom}
      </Text>
      <View style={{ height: 2, width: 40, backgroundColor: C.yellow, marginTop: 3 }} />
    </View>

    {/* Encadré PAR OÙ COMMENCER */}
    <View style={{
      backgroundColor: 'rgba(42,148,144,0.08)',
      borderLeftWidth: 3,
      borderLeftColor: C.teal,
      borderRadius: 4,
      paddingVertical: 8,
      paddingHorizontal: 10,
      marginTop: 8,
    }}>
      <Text style={{
        fontFamily: 'Poppins', fontSize: 7.5, fontWeight: 800, color: C.teal,
        letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4,
      }}>
        Par où commencer
      </Text>
      {STEPS.map((step, i) => (
        <View key={i} style={{ flexDirection: 'row', marginBottom: 1.5 }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 8, fontWeight: 700, color: C.teal, width: 11, lineHeight: 1.35 }}>
            {i + 1}.
          </Text>
          <Text style={{ fontFamily: 'Inter', fontSize: 8, color: C.dark, flex: 1, lineHeight: 1.35 }}>
            {step}
          </Text>
        </View>
      ))}
    </View>

    {/* QR + encadré code en bas */}
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8, gap: 14 }}>
      <View style={{ alignItems: 'center' }}>
        <View style={{ padding: 3, backgroundColor: C.white }}>
          <Qr value={APP_URL} size={66} fg={C.dark} />
        </View>
        <Text style={{ fontFamily: 'Inter', fontSize: 6, color: C.muted, marginTop: 2 }}>
          cockpit-ce.pages.dev
        </Text>
      </View>

      {code && (
        <View style={{
          backgroundColor: C.yellow,
          borderRadius: 6,
          paddingVertical: 8,
          paddingHorizontal: 12,
          alignItems: 'center',
        }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 6.5, fontWeight: 700, color: C.dark, letterSpacing: 0.8, textTransform: 'uppercase' }}>
            Ton code d'accès
          </Text>
          <Text style={{ fontFamily: 'Poppins', fontSize: 14, fontWeight: 700, color: C.dark, letterSpacing: 2, marginTop: 3 }}>
            {code}
          </Text>
        </View>
      )}
    </View>
  </View>
)

/* ── Carte : VERSO — tagline + message + 4 perso + signature ── */
const CardVerso = ({ finalMessage }: { finalMessage: string }) => (
  <View style={{
    position: 'absolute',
    left: CARD_X, top: CARD_Y,
    width: CARD_W, height: CARD_H,
    backgroundColor: C.cream,
    padding: 14,
    fontFamily: 'Caveat',
    overflow: 'hidden',
  }}>
    {/* Header brand */}
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image src="./assets/logo-ce.png" style={{ width: 16, height: 16, marginRight: 6 }} />
      <Text style={{ fontFamily: 'Poppins', fontSize: 7, fontWeight: 800, color: C.dark, letterSpacing: 1.4, textTransform: 'uppercase' }}>
        Cerveau <Text style={{ color: C.yellow }}>Électrique</Text>
      </Text>
    </View>

    {/* Tagline */}
    <View style={{ alignItems: 'center', marginTop: 4 }}>
      <Text style={{ fontFamily: 'Caveat', fontSize: 28, fontWeight: 700, color: C.teal, lineHeight: 1 }}>
        On est une équipe.
      </Text>
    </View>

    {/* Message manuscrit */}
    <View style={{ paddingHorizontal: 16, marginTop: 4 }}>
      <Text style={{ fontFamily: 'Caveat', fontSize: 14, fontWeight: 700, color: C.dark, lineHeight: 1.2, textAlign: 'center' }}>
        {finalMessage}
      </Text>
    </View>

    {/* 4 personnages */}
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', paddingBottom: 4 }}>
      <Image src="./assets/maman-main-tendue.png"   style={{ width: 52, height: 52, objectFit: 'contain' }} />
      <Image src="./assets/monstre-rigole.png"      style={{ width: 52, height: 52, objectFit: 'contain' }} />
      <Image src="./assets/cortex-bienveillant.png" style={{ width: 52, height: 52, objectFit: 'contain' }} />
      <Image src="./assets/papa-encourageant.png"   style={{ width: 52, height: 52, objectFit: 'contain' }} />
    </View>

    {/* Signature */}
    <Text style={{ fontFamily: 'Caveat', fontSize: 16, fontWeight: 700, color: C.dark, lineHeight: 1.1, textAlign: 'center' }}>
      André, Cerveau Électrique
    </Text>
  </View>
)

/* ── Composant principal ───────────────────────────── */
export type CarteMerciProps = {
  prenom: string
  code?: string
  message?: string
}

export const CarteMerci = ({ prenom, code, message }: CarteMerciProps) => {
  const finalMessage = message || pickRandomMessage()
  return (
    <Document title={`Carte merci · ${prenom}`} author="Cerveau Électrique">
      {/* ═══ Page 1 — A4, RECTO centré ═══ */}
      <Page size="A4" style={{ backgroundColor: C.white }}>
        <PrintHint label="Recto" />
        <CardRecto prenom={prenom} code={code} />
        <CropMarks />
      </Page>

      {/* ═══ Page 2 — A4, VERSO centré ═══ */}
      <Page size="A4" style={{ backgroundColor: C.white }}>
        <PrintHint label="Verso" />
        <CardVerso finalMessage={finalMessage} />
        <CropMarks />
      </Page>
    </Document>
  )
}

export default CarteMerci

/* Render dans le scope du template (où fonts + react-pdf sont importés une seule fois). */
export const renderCarteMerciToFile = async (
  outFile: string,
  props: CarteMerciProps
) => {
  await renderToFile(<CarteMerci {...props} />, outFile)
}

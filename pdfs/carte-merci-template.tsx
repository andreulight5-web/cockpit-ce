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

/* ── Dimensions A4 + carte 11×7cm centrée ─────────── */
// 1cm = 28.3465pt
const PAGE_W   = 595   // A4 portrait
const PAGE_H   = 842
const CARD_W   = 311.8 // 11 cm
const CARD_H   = 198.4 // 7  cm
const CARD_X   = (PAGE_W - CARD_W) / 2
const CARD_Y   = (PAGE_H - CARD_H) / 2
const CROP_LEN = 8     // longueur des repères de coupe (pt)
const CROP_GAP = 4     // espace entre coin carte et repère
const CROP_COL = '#999'

/* ── Messages par défaut (rotation aléatoire) ─────── */
export const DEFAULT_MESSAGES = [
  '{P}, merci de nous faire confiance. Ce kit a été préparé avec soin pour toi et ton enfant.',
  '{P}, bienvenue dans le Cockpit. On est avec toi pour les 30 prochains jours.',
  '{P}, ce kit est entre de bonnes mains. Ton enfant a de la chance de t\'avoir.',
  '{P}, chaque outil de ce kit répond à un vrai besoin de parent. Merci d\'être là.',
  '{P}, tu viens de faire le premier pas. Le plus dur est derrière toi.',
]

export const pickRandomMessage = (prenom: string): string => {
  const tpl = DEFAULT_MESSAGES[Math.floor(Math.random() * DEFAULT_MESSAGES.length)]
  return tpl.replace('{P}', prenom)
}

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
    {label} · 11 × 7 cm · découpe sur les repères
  </Text>
)

/* ── Carte : RECTO ─────────────────────────────────── */
const CardRecto = ({ prenom, finalMessage }: { prenom: string; finalMessage: string }) => (
  <View style={{
    position: 'absolute',
    left: CARD_X, top: CARD_Y,
    width: CARD_W, height: CARD_H,
    backgroundColor: C.cream,
    padding: 14,
    fontFamily: 'Inter',
    overflow: 'hidden',
  }}>
    {/* Header brand */}
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image src="./assets/logo-ce.png" style={{ width: 16, height: 16, marginRight: 6 }} />
      <Text style={{ fontFamily: 'Poppins', fontSize: 7, fontWeight: 800, color: C.dark, letterSpacing: 1.4, textTransform: 'uppercase' }}>
        Cerveau <Text style={{ color: C.yellow }}>Électrique</Text>
      </Text>
    </View>

    {/* Titre + soulignement jaune */}
    <View style={{ alignItems: 'center', marginTop: 6 }}>
      <Text style={{ fontFamily: 'Caveat', fontSize: 32, fontWeight: 700, color: C.rose, lineHeight: 1 }}>
        Merci {prenom}
      </Text>
      <View style={{ height: 2, width: 38, backgroundColor: C.yellow, marginTop: 3 }} />
    </View>

    {/* Message personnalisé */}
    <View style={{ paddingHorizontal: 8, marginTop: 8 }}>
      <Text style={{ fontFamily: 'Inter', fontSize: 8.5, color: C.dark, lineHeight: 1.4, textAlign: 'center', fontStyle: 'italic' }}>
        « {finalMessage} »
      </Text>
    </View>

    {/* 4 personnages en bas */}
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', paddingBottom: 2 }}>
      <Image src="./assets/maman-main-tendue.png"   style={{ width: 36, height: 36, objectFit: 'contain' }} />
      <Image src="./assets/monstre-rigole.png"      style={{ width: 36, height: 36, objectFit: 'contain' }} />
      <Image src="./assets/cortex-bienveillant.png" style={{ width: 36, height: 36, objectFit: 'contain' }} />
      <Image src="./assets/papa-encourageant.png"   style={{ width: 36, height: 36, objectFit: 'contain' }} />
    </View>
  </View>
)

/* ── Carte : VERSO ─────────────────────────────────── */
const CardVerso = () => (
  <View style={{
    position: 'absolute',
    left: CARD_X, top: CARD_Y,
    width: CARD_W, height: CARD_H,
    backgroundColor: C.cream,
    padding: 14,
    flexDirection: 'row',
    fontFamily: 'Inter',
    overflow: 'hidden',
  }}>
    {/* Colonne gauche : QR + URL */}
    <View style={{ width: 100, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ padding: 4, backgroundColor: C.white }}>
        <Qr value={APP_URL} size={88} fg={C.dark} />
      </View>
      <Text style={{ fontFamily: 'Inter', fontSize: 7, color: C.muted, marginTop: 5, textAlign: 'center' }}>
        cockpit-ce.pages.dev
      </Text>
    </View>

    {/* Colonne droite : tagline + signature */}
    <View style={{ flex: 1, paddingLeft: 14, justifyContent: 'space-between' }}>
      <View>
        {/* Header brand */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image src="./assets/logo-ce.png" style={{ width: 16, height: 16, marginRight: 6 }} />
          <Text style={{ fontFamily: 'Poppins', fontSize: 7, fontWeight: 800, color: C.dark, letterSpacing: 1.4, textTransform: 'uppercase' }}>
            Cerveau <Text style={{ color: C.yellow }}>Électrique</Text>
          </Text>
        </View>

        <Text style={{ fontFamily: 'Caveat', fontSize: 28, fontWeight: 700, color: C.teal, lineHeight: 1, marginTop: 8 }}>
          On est une équipe.
        </Text>
        <Text style={{ fontFamily: 'Inter', fontSize: 8, color: C.dark, lineHeight: 1.4, marginTop: 6 }}>
          Scan le QR code pour entrer dans ton Cockpit.
        </Text>
      </View>

      {/* Signature */}
      <Text style={{ fontFamily: 'Caveat', fontSize: 16, fontWeight: 700, color: C.rose, lineHeight: 1.1 }}>
        Avec affection,{'\n'}Rémi & l'équipe CE
      </Text>
    </View>
  </View>
)

/* ── Composant principal ───────────────────────────── */
export type CarteMerciProps = {
  prenom: string
  message?: string
}

export const CarteMerci = ({ prenom, message }: CarteMerciProps) => {
  const finalMessage = message || pickRandomMessage(prenom)
  return (
    <Document title={`Carte merci · ${prenom}`} author="Cerveau Électrique">
      {/* ═══ Page 1 — A4, RECTO centré ═══ */}
      <Page size="A4" style={{ backgroundColor: C.white }}>
        <PrintHint label="Recto" />
        <CardRecto prenom={prenom} finalMessage={finalMessage} />
        <CropMarks />
      </Page>

      {/* ═══ Page 2 — A4, VERSO centré ═══ */}
      <Page size="A4" style={{ backgroundColor: C.white }}>
        <PrintHint label="Verso" />
        <CardVerso />
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

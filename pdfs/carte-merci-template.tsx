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

/* ── Composant principal ───────────────────────────── */
export type CarteMerciProps = {
  prenom: string
  message?: string
}

export const CarteMerci = ({ prenom, message }: CarteMerciProps) => {
  const finalMessage = message || pickRandomMessage(prenom)
  return (
    <Document title={`Carte merci · ${prenom}`} author="Cerveau Électrique">
      {/* ═══ RECTO ═══ */}
      <Page size="A6" style={{ backgroundColor: C.cream, padding: 22, fontFamily: 'Inter' }}>
        {/* Header brand */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <Image src="./assets/logo-ce.png" style={{ width: 22, height: 22, marginRight: 8 }} />
          <Text style={{ fontFamily: 'Poppins', fontSize: 8, fontWeight: 800, color: C.dark, letterSpacing: 1.5, textTransform: 'uppercase' }}>
            Cerveau <Text style={{ color: C.yellow }}>Électrique</Text>
          </Text>
        </View>

        {/* Titre Caveat XXL */}
        <View style={{ alignItems: 'center', marginTop: 18 }}>
          <Text style={{ fontFamily: 'Caveat', fontSize: 50, fontWeight: 700, color: C.rose, lineHeight: 1 }}>
            Merci {prenom}
          </Text>
          <View style={{ height: 3, width: 60, backgroundColor: C.yellow, marginTop: 6 }} />
        </View>

        {/* Message personnalisé */}
        <View style={{ paddingHorizontal: 12, marginTop: 22 }}>
          <Text style={{ fontFamily: 'Inter', fontSize: 11, color: C.dark, lineHeight: 1.6, textAlign: 'center', fontStyle: 'italic' }}>
            « {finalMessage} »
          </Text>
        </View>

        {/* 4 personnages en bas */}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-around', paddingBottom: 18 }}>
          <Image src="./assets/maman-main-tendue.png"   style={{ width: 56, height: 56, objectFit: 'contain' }} />
          <Image src="./assets/monstre-rigole.png"      style={{ width: 56, height: 56, objectFit: 'contain' }} />
          <Image src="./assets/cortex-bienveillant.png" style={{ width: 56, height: 56, objectFit: 'contain' }} />
          <Image src="./assets/papa-encourageant.png"   style={{ width: 56, height: 56, objectFit: 'contain' }} />
        </View>

        <Text style={{ fontFamily: 'Inter', fontSize: 7.5, color: C.muted, textAlign: 'center' }}>
          cerveau-electrique.fr
        </Text>
      </Page>

      {/* ═══ VERSO ═══ */}
      <Page size="A6" style={{ backgroundColor: C.cream, padding: 22, fontFamily: 'Inter' }}>
        {/* Header brand */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <Image src="./assets/logo-ce.png" style={{ width: 22, height: 22, marginRight: 8 }} />
          <Text style={{ fontFamily: 'Poppins', fontSize: 8, fontWeight: 800, color: C.dark, letterSpacing: 1.5, textTransform: 'uppercase' }}>
            Cerveau <Text style={{ color: C.yellow }}>Électrique</Text>
          </Text>
        </View>

        {/* Tagline Caveat */}
        <View style={{ alignItems: 'center', marginTop: 14 }}>
          <Text style={{ fontFamily: 'Caveat', fontSize: 36, fontWeight: 700, color: C.teal, lineHeight: 1 }}>
            On est une équipe.
          </Text>
        </View>

        {/* QR code centré */}
        <View style={{ alignItems: 'center', marginTop: 16 }}>
          <View style={{ padding: 6, backgroundColor: C.white, borderRadius: 8 }}>
            <Qr value={APP_URL} size={120} fg={C.dark} />
          </View>
        </View>

        {/* Instructions */}
        <View style={{ alignItems: 'center', marginTop: 14 }}>
          <Text style={{ fontFamily: 'Poppins', fontSize: 10, fontWeight: 700, color: C.dark, textAlign: 'center' }}>
            Scan pour accéder à ton Cockpit
          </Text>
          <Text style={{ fontFamily: 'Inter', fontSize: 9, color: C.muted, marginTop: 4, textAlign: 'center' }}>
            cockpit-ce.pages.dev
          </Text>
        </View>

        {/* Signature */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 14 }}>
          <Text style={{ fontFamily: 'Caveat', fontSize: 18, fontWeight: 700, color: C.rose, textAlign: 'center', lineHeight: 1.1 }}>
            Avec affection,{'\n'}Rémi & l'équipe CE
          </Text>
        </View>

        <Text style={{ fontFamily: 'Inter', fontSize: 7.5, color: C.muted, textAlign: 'center' }}>
          cerveau-electrique.fr
        </Text>
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

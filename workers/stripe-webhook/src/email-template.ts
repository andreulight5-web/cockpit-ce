function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!)
  )
}

/* ────────────────────────────────────────────────
   Email client — livraison du code d'accès
   ──────────────────────────────────────────────── */
export function buildCustomerEmail({
  code,
  appUrl,
  isPhysical,
}: {
  code: string
  appUrl: string
  isPhysical: boolean
}): { subject: string; html: string } {
  const safeCode = escapeHtml(code)
  const safeUrl  = escapeHtml(appUrl)

  const physicalNote = isPhysical
    ? `<p style="font-family:Inter,sans-serif;font-size:14px;color:#4a4a4a;line-height:1.55;margin:0 0 18px;">
         <strong>Ton Kit Physique</strong> est en préparation — tu le recevras chez toi sous 5 à 7 jours ouvrés.
         En attendant, tu peux déjà utiliser <strong>toutes les ressources digitales</strong> et la <strong>formation</strong> dans l'app.
       </p>`
    : ''

  const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"></head>
<body style="margin:0;padding:24px 12px;background:#FAFAF5;">
  <div style="max-width:560px;margin:0 auto;background:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid rgba(28,27,46,0.08);">

    <div style="background:#1C1B2E;padding:28px 28px 22px;text-align:center;">
      <div style="font-family:Poppins,Arial,sans-serif;font-size:13px;font-weight:700;color:#F5E06D;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px;">
        Cerveau Électrique
      </div>
      <div style="font-family:Poppins,Arial,sans-serif;font-size:24px;font-weight:700;color:#FFFFFF;line-height:1.2;">
        🎉 Ton accès est prêt !
      </div>
    </div>

    <div style="padding:32px 28px;">
      <p style="font-family:Inter,sans-serif;font-size:15px;color:#1C1B2E;line-height:1.55;margin:0 0 18px;">
        Bienvenue dans le <strong>Cockpit Crises</strong>. Voici ton code d'accès personnel :
      </p>

      <div style="background:#F5E06D;padding:18px 16px;text-align:center;border-radius:10px;margin:0 0 22px;">
        <div style="font-family:Poppins,Courier,monospace;font-size:22px;font-weight:700;color:#1C1B2E;letter-spacing:2px;">
          ${safeCode}
        </div>
      </div>

      ${physicalNote}

      <p style="font-family:Inter,sans-serif;font-size:14px;color:#1C1B2E;line-height:1.6;margin:0 0 22px;">
        <strong>Comment l'utiliser :</strong><br>
        1. Clique sur le bouton ci-dessous<br>
        2. Entre ton code<br>
        3. Suis l'onboarding et c'est parti
      </p>

      <div style="text-align:center;margin:0 0 24px;">
        <a href="${safeUrl}" style="display:inline-block;background:#F5E06D;color:#1C1B2E;font-family:Poppins,Arial,sans-serif;font-weight:700;font-size:15px;text-decoration:none;padding:14px 26px;border-radius:50px;">
          Accéder à mon Cockpit →
        </a>
      </div>

      <p style="font-family:Inter,sans-serif;font-size:12.5px;color:#64748B;line-height:1.5;margin:0 0 8px;">
        ✅ Tu peux utiliser ce code sur <strong>tous tes appareils</strong> (téléphone, tablette, ordinateur).
      </p>
      <p style="font-family:Inter,sans-serif;font-size:12.5px;color:#64748B;line-height:1.5;margin:0 0 24px;">
        Un souci ? Réponds à cet email, je te réponds personnellement.
      </p>

      <!-- ── Astuce : épingler l'app ── -->
      <div style="background:#F8F7F2;border:1px solid rgba(28,27,46,0.06);border-radius:14px;padding:18px 18px 16px;margin:0;">
        <div style="font-family:Poppins,Arial,sans-serif;font-size:14px;font-weight:700;color:#1C1B2E;line-height:1.3;margin:0 0 6px;">
          📱 Astuce : épingle l'app sur ton écran d'accueil
        </div>
        <p style="font-family:Inter,sans-serif;font-size:13px;color:#64748B;line-height:1.55;margin:0 0 14px;">
          Pour accéder au Cockpit comme une vraie app, sans passer par le navigateur :
        </p>

        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="width:50%;vertical-align:top;padding-right:5px;">
              <div style="background:#FFFFFF;border:1px solid rgba(28,27,46,0.08);border-radius:10px;padding:12px 14px;">
                <div style="font-family:Poppins,Arial,sans-serif;font-size:13px;font-weight:700;color:#1C1B2E;margin:0 0 8px;">
                  🍎 Sur iPhone / iPad
                </div>
                <ol style="font-family:Inter,sans-serif;font-size:12.5px;color:#1C1B2E;line-height:1.55;margin:0;padding-left:18px;">
                  <li>Ouvre cockpit-ce.pages.dev dans Safari</li>
                  <li>Appuie sur le bouton Partager (carré avec flèche ↑)</li>
                  <li>Choisis « Sur l'écran d'accueil »</li>
                  <li>Appuie sur Ajouter</li>
                </ol>
              </div>
            </td>
            <td style="width:50%;vertical-align:top;padding-left:5px;">
              <div style="background:#FFFFFF;border:1px solid rgba(28,27,46,0.08);border-radius:10px;padding:12px 14px;">
                <div style="font-family:Poppins,Arial,sans-serif;font-size:13px;font-weight:700;color:#1C1B2E;margin:0 0 8px;">
                  🤖 Sur Android
                </div>
                <ol style="font-family:Inter,sans-serif;font-size:12.5px;color:#1C1B2E;line-height:1.55;margin:0;padding-left:18px;">
                  <li>Ouvre cockpit-ce.pages.dev dans Chrome</li>
                  <li>Appuie sur les 3 points ⋮ en haut à droite</li>
                  <li>Choisis « Ajouter à l'écran d'accueil »</li>
                  <li>Appuie sur Ajouter</li>
                </ol>
              </div>
            </td>
          </tr>
        </table>

        <p style="font-family:Inter,sans-serif;font-size:12px;color:#64748B;line-height:1.55;font-style:italic;margin:14px 0 0;">
          L'icône Cockpit Crises apparaît sur ton écran. Tu y accèdes en 1 clic, comme une app.
        </p>
      </div>
    </div>

    <div style="background:#FAFAF5;padding:18px 28px;border-top:1px solid rgba(28,27,46,0.06);font-family:Inter,sans-serif;font-size:11.5px;color:#64748B;text-align:center;">
      Cerveau Électrique · <a href="https://cerveau-electrique.fr/cerveau-electrique/" style="color:#2A9490;text-decoration:none;">cerveau-electrique.fr</a>
    </div>
  </div>
</body></html>`

  return {
    subject: '🎉 Ton accès au Cockpit Crises est prêt !',
    html,
  }
}

/* ────────────────────────────────────────────────
   Email admin — notif envoi Kit Physique
   ──────────────────────────────────────────────── */
export function buildShippingNotification({
  code,
  customerEmail,
  customerName,
  customerPhone,
  shippingAddress,
  shippingMethod,
  shippingAmount,
  currency,
  sessionId,
}: {
  code: string
  customerEmail: string
  customerName: string | null
  customerPhone?: string | null
  shippingAddress: ShippingAddress | null
  shippingMethod?: string | null
  shippingAmount?: number | null      // en centimes
  currency?: string
  sessionId: string
}): { subject: string; html: string } {
  const addr = shippingAddress

  const addrLines: string[] = []
  if (addr) {
    if (customerName)   addrLines.push(escapeHtml(customerName))
    if (addr.line1)     addrLines.push(escapeHtml(addr.line1))
    if (addr.line2)     addrLines.push(escapeHtml(addr.line2))
    const postalCity = [addr.postal_code, addr.city].filter(Boolean).join(' ')
    if (postalCity)     addrLines.push(escapeHtml(postalCity))
    if (addr.state)     addrLines.push(escapeHtml(addr.state))
    if (addr.country)   addrLines.push(escapeHtml(addr.country))
  }
  const addrBlock = addrLines.length
    ? addrLines.join('<br>')
    : '<em>(adresse non collectée par le checkout — à demander au client)</em>'

  const shippingAmountFmt =
    typeof shippingAmount === 'number'
      ? `${(shippingAmount / 100).toFixed(2)} ${(currency || 'eur').toUpperCase()}`
      : null

  const shippingRow = shippingMethod
    ? `<tr><td style="padding:6px 0;color:#64748B;">Mode de livraison</td><td><strong>${escapeHtml(shippingMethod)}</strong>${shippingAmountFmt ? ` <span style="color:#64748B;">(${shippingAmountFmt})</span>` : ''}</td></tr>`
    : ''

  const phoneRow = customerPhone
    ? `<tr><td style="padding:6px 0;color:#64748B;">Téléphone</td><td>${escapeHtml(customerPhone)}</td></tr>`
    : ''

  // Prénom = premier mot du nom complet du client (fallback "Client" si absent)
  const firstName = (customerName ?? '').trim().split(/\s+/)[0] || 'Client'
  const carteMerciCmd = `node pdfs/generate-carte-merci.js "${firstName}" "${code}"`

  const html = `<!doctype html>
<html lang="fr"><body style="font-family:Inter,Arial,sans-serif;background:#FAFAF5;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#FFFFFF;padding:24px;border-radius:12px;border:1px solid rgba(28,27,46,0.08);">
    <h2 style="font-family:Poppins,Arial,sans-serif;font-size:18px;color:#1C1B2E;margin:0 0 18px;">📦 Nouveau Kit Physique à envoyer</h2>

    <table style="width:100%;border-collapse:collapse;font-size:14px;color:#1C1B2E;">
      <tr><td style="padding:6px 0;color:#64748B;width:150px;">Code délivré</td><td style="font-family:monospace;font-weight:700;">${escapeHtml(code)}</td></tr>
      <tr><td style="padding:6px 0;color:#64748B;">Email client</td><td>${escapeHtml(customerEmail)}</td></tr>
      <tr><td style="padding:6px 0;color:#64748B;">Nom</td><td>${escapeHtml(customerName ?? '—')}</td></tr>
      ${phoneRow}
      ${shippingRow}
      <tr><td style="padding:8px 0 6px;color:#64748B;vertical-align:top;">Adresse de livraison</td>
          <td style="padding:8px 0 6px;line-height:1.55;">${addrBlock}</td></tr>
      <tr><td style="padding:6px 0;color:#64748B;">Stripe session</td><td style="font-family:monospace;font-size:11px;">${escapeHtml(sessionId)}</td></tr>
    </table>

    <h3 style="font-family:Poppins,Arial,sans-serif;font-size:14px;color:#1C1B2E;margin:24px 0 8px;">📋 Carte personnalisée</h3>
    <pre style="background:#F0F0F0;font-family:Menlo,Consolas,monospace;font-size:13px;color:#1C1B2E;padding:12px;border-radius:8px;margin:0;overflow-x:auto;white-space:pre;">${escapeHtml(carteMerciCmd)}</pre>
  </div>
</body></html>`

  return {
    subject: `📦 Kit Physique à envoyer — ${customerName ?? customerEmail}`,
    html,
  }
}

/* ────────────────────────────────────────────────
   Email admin — alerte stock faible
   ──────────────────────────────────────────────── */
export function buildLowStockAlert({ remaining }: { remaining: number }): {
  subject: string
  html: string
} {
  return {
    subject: `⚠️ Stock de codes faible : ${remaining} restants`,
    html: `<p style="font-family:Inter,Arial,sans-serif;font-size:15px;color:#1C1B2E;">
      Il reste <strong>${remaining}</strong> codes d'accès disponibles. Pense à en générer d'autres dans Supabase.
    </p>`,
  }
}

export type ShippingAddress = {
  line1: string | null
  line2: string | null
  postal_code: string | null
  city: string | null
  state: string | null
  country: string | null
}

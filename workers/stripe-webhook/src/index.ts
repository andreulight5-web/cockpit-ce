import { verifyStripeSignature, fetchSessionLineItems, fetchShippingRateName } from './stripe'
import { claimAccessCode, markEmailSent } from './supabase'
import { sendBrevoEmail } from './brevo'
import {
  buildCustomerEmail,
  buildShippingNotification,
  buildLowStockAlert,
  type ShippingAddress,
} from './email-template'

interface Env {
  SUPABASE_URL: string
  APP_URL: string
  ADMIN_EMAIL: string
  SUPPORT_EMAIL: string
  BREVO_FROM_EMAIL: string
  BREVO_FROM_NAME: string
  STRIPE_PRICE_DIGITAL: string
  STRIPE_PRICE_PHYSICAL: string
  LOW_STOCK_THRESHOLD: string

  STRIPE_WEBHOOK_SECRET: string
  STRIPE_SECRET_KEY: string
  SUPABASE_SERVICE_KEY: string
  BREVO_API_KEY: string
}

/* Stripe checkout.session.completed — sous-ensemble utile */
type StripeCheckoutSession = {
  id: string
  object: 'checkout.session'
  status?: string | null
  payment_status?: string | null
  customer_details?: {
    email?: string | null
    name?: string | null
    phone?: string | null
    address?: ShippingAddress | null
  } | null
  customer_email?: string | null
  shipping_details?: { name?: string | null; address?: ShippingAddress | null } | null
  shipping_cost?: {
    amount_total?: number | null
    shipping_rate?: string | null
  } | null
  currency?: string | null
}

type StripeEvent = {
  id: string
  type: string
  data: { object: StripeCheckoutSession }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    // ─── /support : formulaire d'aide depuis l'app ───
    if (url.pathname === '/support') {
      return handleSupportForm(request, env)
    }

    // ─── / : webhook Stripe (par défaut) ───
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 })

    const body = await request.text()
    const sig = request.headers.get('stripe-signature')

    // 1. Vérification signature (sinon 400 — Stripe ne retente pas)
    try {
      await verifyStripeSignature(body, sig, env.STRIPE_WEBHOOK_SECRET)
    } catch (e) {
      console.error('Stripe signature verification failed:', (e as Error).message)
      return new Response('Invalid signature', { status: 400 })
    }

    let event: StripeEvent
    try {
      event = JSON.parse(body) as StripeEvent
    } catch {
      return new Response('Invalid JSON', { status: 400 })
    }

    // 2. Filtre type d'event
    if (event.type !== 'checkout.session.completed') {
      return new Response('ignored', { status: 200 })
    }

    const session = event.data.object
    if (session.payment_status !== 'paid') {
      return new Response('not paid yet', { status: 200 })
    }

    const customerEmail = session.customer_details?.email ?? session.customer_email
    if (!customerEmail) {
      console.error('No customer email on session', session.id)
      return new Response('missing email', { status: 400 })
    }

    // 3. Récupère les line_items pour matcher le price_id
    let priceIds: string[] = []
    try {
      const items = await fetchSessionLineItems(session.id, env.STRIPE_SECRET_KEY)
      priceIds = items.map((i) => i.price_id).filter((p): p is string => !!p)
    } catch (e) {
      console.error('Could not fetch line_items:', (e as Error).message)
      return new Response('line_items fetch failed', { status: 500 })
    }

    const isDigital  = priceIds.includes(env.STRIPE_PRICE_DIGITAL)
    const isPhysical = priceIds.includes(env.STRIPE_PRICE_PHYSICAL)
    if (!isDigital && !isPhysical) {
      console.log('Session not for a Cockpit product — ignored', session.id, priceIds)
      return new Response('not a cockpit product', { status: 200 })
    }

    // 4. Claim atomique d'un code (idempotent par session_id)
    let claim
    try {
      claim = await claimAccessCode(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY, customerEmail, session.id)
    } catch (e) {
      console.error('claim_access_code failed:', (e as Error).message)
      return new Response('supabase error', { status: 500 })
    }

    if (claim.status === 'no_code_available') {
      console.error('🚨 NO CODE AVAILABLE for session', session.id)
      // Alerte admin immédiate
      try {
        await sendBrevoEmail(env.BREVO_API_KEY, {
          sender: { email: env.BREVO_FROM_EMAIL, name: env.BREVO_FROM_NAME },
          to: [{ email: env.ADMIN_EMAIL }],
          subject: '🚨 URGENT — Stock de codes épuisé',
          htmlContent: `<p style="font-family:Inter,Arial,sans-serif;font-size:15px;">
            Un paiement Stripe est arrivé mais il n'y a <strong>plus de codes disponibles</strong>.<br>
            Client : ${customerEmail}<br>
            Session : ${session.id}<br>
            <br>
            Génère vite des codes dans Supabase, le webhook va retenter dans ~1h.</p>`,
        })
      } catch (e) {
        console.error('Failed to send no-stock alert:', (e as Error).message)
      }
      // 500 → Stripe retentera (jusqu'à 3 jours)
      return new Response('no code available', { status: 500 })
    }

    const alreadySentEmail =
      claim.status === 'already_issued' && claim.email_sent_at != null

    // 5. Envoi de l'email client (sauf si déjà fait — idempotence)
    if (!alreadySentEmail) {
      const { subject, html } = buildCustomerEmail({
        code: claim.code,
        appUrl: env.APP_URL,
        isPhysical,
      })
      try {
        await sendBrevoEmail(env.BREVO_API_KEY, {
          sender: { email: env.BREVO_FROM_EMAIL, name: env.BREVO_FROM_NAME },
          to: [{ email: customerEmail, name: session.customer_details?.name ?? undefined }],
          replyTo: { email: env.ADMIN_EMAIL, name: env.BREVO_FROM_NAME },
          subject,
          htmlContent: html,
        })
        await markEmailSent(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY, session.id)
      } catch (e) {
        console.error('Customer email failed:', (e as Error).message)
        return new Response('email send failed', { status: 500 })
      }

      // 6. Notif admin si Kit Physique (uniquement à la 1re émission)
      if (isPhysical) {
        const shipping = session.shipping_details ?? null
        const name  = shipping?.name ?? session.customer_details?.name ?? null
        const addr  = shipping?.address ?? session.customer_details?.address ?? null
        const phone = session.customer_details?.phone ?? null

        // Récupère le nom du mode de livraison choisi (best-effort)
        const rateId = session.shipping_cost?.shipping_rate ?? null
        let shippingMethod: string | null = null
        if (rateId) {
          shippingMethod = await fetchShippingRateName(rateId, env.STRIPE_SECRET_KEY)
        }
        const shippingAmount = session.shipping_cost?.amount_total ?? null
        const currency = session.currency ?? 'eur'

        const adminMail = buildShippingNotification({
          code: claim.code,
          customerEmail,
          customerName: name,
          customerPhone: phone,
          shippingAddress: addr,
          shippingMethod,
          shippingAmount,
          currency,
          sessionId: session.id,
        })
        try {
          await sendBrevoEmail(env.BREVO_API_KEY, {
            sender: { email: env.BREVO_FROM_EMAIL, name: env.BREVO_FROM_NAME },
            to: [{ email: env.ADMIN_EMAIL }],
            subject: adminMail.subject,
            htmlContent: adminMail.html,
          })
        } catch (e) {
          // Non bloquant — l'utilisateur a déjà son code, on log juste
          console.error('Admin shipping notif failed:', (e as Error).message)
        }
      }
    }

    // 7. Alerte stock faible (best-effort, non bloquant)
    const threshold = Number(env.LOW_STOCK_THRESHOLD || '5')
    if (
      claim.status === 'issued' &&
      Number.isFinite(threshold) &&
      claim.remaining < threshold
    ) {
      const lowStock = buildLowStockAlert({ remaining: claim.remaining })
      try {
        await sendBrevoEmail(env.BREVO_API_KEY, {
          sender: { email: env.BREVO_FROM_EMAIL, name: env.BREVO_FROM_NAME },
          to: [{ email: env.ADMIN_EMAIL }],
          subject: lowStock.subject,
          htmlContent: lowStock.html,
        })
      } catch (e) {
        console.error('Low-stock alert failed:', (e as Error).message)
      }
    }

    return new Response('ok', { status: 200 })
  },
}

/* ═══════════════════════════════════════════════════ */
/* /support — formulaire d'aide depuis l'app          */
/* ═══════════════════════════════════════════════════ */
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', ...CORS_HEADERS },
  })
}

function isValidEmail(s: unknown): s is string {
  return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!)
  )
}

async function handleSupportForm(request: Request, env: Env): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS })
  }
  if (request.method !== 'POST') {
    return jsonResponse({ ok: false, error: 'method_not_allowed' }, 405)
  }

  let payload: { email?: string; subject?: string; message?: string; code?: string }
  try {
    payload = (await request.json()) as typeof payload
  } catch {
    return jsonResponse({ ok: false, error: 'invalid_json' }, 400)
  }

  const { email, subject, message, code } = payload

  if (!isValidEmail(email)) return jsonResponse({ ok: false, error: 'invalid_email' }, 400)
  if (!message || !message.trim()) return jsonResponse({ ok: false, error: 'empty_message' }, 400)
  if (message.length > 5000) return jsonResponse({ ok: false, error: 'message_too_long' }, 400)

  const subj = (subject?.trim() || 'Aide Cockpit CE').slice(0, 160)
  const html = `<!doctype html><html lang="fr"><body style="font-family:Inter,Arial,sans-serif;background:#FAFAF5;padding:24px;">
    <div style="max-width:540px;margin:0 auto;background:#FFFFFF;padding:20px;border-radius:12px;border:1px solid rgba(28,27,46,0.08);">
      <div style="font-size:11px;color:#64748B;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:6px;">📞 SUPPORT COCKPIT CE</div>
      <h2 style="font-family:Poppins,Arial,sans-serif;font-size:18px;color:#1C1B2E;margin:0 0 14px;">${escapeHtml(subj)}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:13px;color:#1C1B2E;margin-bottom:14px;">
        <tr><td style="padding:4px 0;color:#64748B;width:120px;">De</td><td><a href="mailto:${escapeHtml(email!)}" style="color:#2A9490;text-decoration:none;">${escapeHtml(email!)}</a></td></tr>
        <tr><td style="padding:4px 0;color:#64748B;">Code d'accès</td><td style="font-family:monospace;">${escapeHtml(code || 'non disponible')}</td></tr>
      </table>
      <div style="background:#FAFAF5;border-left:3px solid #2A9490;padding:12px 14px;font-size:13.5px;color:#1C1B2E;line-height:1.55;white-space:pre-wrap;">${escapeHtml(message)}</div>
    </div>
  </body></html>`

  try {
    await sendBrevoEmail(env.BREVO_API_KEY, {
      sender: { email: env.BREVO_FROM_EMAIL, name: env.BREVO_FROM_NAME },
      to: [{ email: env.SUPPORT_EMAIL || env.ADMIN_EMAIL }],
      replyTo: { email: email! },
      subject: `email prioritaire : ${subj}`,
      htmlContent: html,
    })
    return jsonResponse({ ok: true })
  } catch (e) {
    console.error('Support email failed:', (e as Error).message)
    return jsonResponse({ ok: false, error: 'send_failed' }, 500)
  }
}

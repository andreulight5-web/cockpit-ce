import { supabase } from './supabase'

const STORAGE_KEY = 'cockpit_data'

const DEFAULT_DATA = {
  onboarding: null,
  lecons_done: [],
  annexes_done: [],
  quiz_done: [],
  quiz_scores: {},
  badges: [],
  xp_total: 0,
  journal: [],
  updated_at: null,
}

// Access code (identifiant cross-device de la progression)
export function getAccessCode() {
  try {
    const raw = localStorage.getItem('cockpit_access')
    if (!raw) return null
    return JSON.parse(raw)?.code || null
  } catch {
    return null
  }
}

// Anonymous session init (legacy, conservée si d'autres flux en dépendent)
export async function initSession() {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) return session
    const { data } = await supabase.auth.signInAnonymously()
    return data?.session
  } catch {
    return null
  }
}

// Local read/write
export function readLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { ...DEFAULT_DATA }
  } catch {
    return { ...DEFAULT_DATA }
  }
}

export function writeLocal(data) {
  const payload = { ...data, updated_at: new Date().toISOString() }
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)) } catch { /* ignore */ }
  return payload
}

// Supabase read/write — keyé par code d'accès (sync multi-appareils)
export async function writeSupabase(data) {
  const code = getAccessCode()
  if (!code) return
  try {
    await supabase.rpc('upsert_app_data', { input_code: code, input_data: data })
  } catch { /* silent */ }
}

export async function readSupabase() {
  const code = getAccessCode()
  if (!code) return null
  try {
    const { data, error } = await supabase.rpc('read_app_data', { input_code: code })
    if (error) return null
    return data || null
  } catch {
    return null
  }
}

// Main save: local immediately + Supabase in background
export async function save(updates) {
  const current = readLocal()
  const newData = { ...current, ...updates, updated_at: new Date().toISOString() }
  writeLocal(newData)
  writeSupabase(newData) // fire and forget
  return newData
}

// Main restore: called at app startup (après que l'access gate a validé un code)
export async function restore() {
  const local = readLocal()

  const remote = await readSupabase()

  // Remote is newer → use it
  if (remote?.updated_at && local.updated_at) {
    if (new Date(remote.updated_at) > new Date(local.updated_at)) {
      writeLocal(remote)
      return remote
    }
  }

  // Local empty, remote has data → restore
  if (!local.onboarding && remote?.onboarding) {
    writeLocal(remote)
    return remote
  }

  // Local has data, push to Supabase if needed
  if (local.onboarding && remote === null) {
    writeSupabase(local)
  }

  return local
}

// Migrate old localStorage keys into the unified store
export function migrateOldKeys() {
  const data = readLocal()
  let changed = false

  // cockpit_onboarding → data.onboarding
  try {
    const old = localStorage.getItem('cockpit_onboarding')
    if (old && !data.onboarding) {
      data.onboarding = JSON.parse(old)
      changed = true
    }
  } catch { /* ignore */ }

  // cockpit_progress → data.lecons_done + xp_total
  try {
    const old = localStorage.getItem('cockpit_progress')
    if (old) {
      const parsed = JSON.parse(old)
      if (parsed.done?.length && !data.lecons_done.length) {
        data.lecons_done = parsed.done
        data.xp_total = parsed.xp || 0
        changed = true
      }
    }
  } catch { /* ignore */ }

  // cockpit_progress_annexes → data.annexes_done
  try {
    const old = localStorage.getItem('cockpit_progress_annexes')
    if (old) {
      const parsed = JSON.parse(old)
      if (parsed.done?.length && !data.annexes_done.length) {
        data.annexes_done = parsed.done
        changed = true
      }
    }
  } catch { /* ignore */ }

  if (changed) writeLocal(data)
  return data
}

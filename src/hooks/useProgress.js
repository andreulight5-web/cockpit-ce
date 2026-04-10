import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

const DEFAULT_PROGRESS = {
  xp: 0,
  level: 1,
  lessons_done: 0,
  badges: [],
}

function levelFromXP(xp) {
  // 100 XP per level, capped softly
  return Math.max(1, Math.floor(xp / 100) + 1)
}

export function useProgress() {
  const { user } = useAuth()
  const [progress, setProgress] = useState(DEFAULT_PROGRESS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch progress row for current user
  useEffect(() => {
    let cancelled = false

    if (!user) {
      // Reset asynchronously so we don't call setState from inside the effect body
      Promise.resolve().then(() => {
        if (cancelled) return
        setProgress(DEFAULT_PROGRESS)
        setLoading(false)
      })
      return () => {
        cancelled = true
      }
    }

    supabase
      .from('progress')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data, error: err }) => {
        if (cancelled) return
        if (err) {
          setError(err)
        } else if (data) {
          setProgress({
            xp: data.xp ?? 0,
            level: data.level ?? 1,
            lessons_done: data.lessons_done ?? 0,
            badges: data.badges ?? [],
          })
        }
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [user])

  // Realtime sync (optional but cheap)
  useEffect(() => {
    if (!user) return
    const channel = supabase
      .channel(`progress:${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'progress',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.new) {
            setProgress({
              xp: payload.new.xp ?? 0,
              level: payload.new.level ?? 1,
              lessons_done: payload.new.lessons_done ?? 0,
              badges: payload.new.badges ?? [],
            })
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user])

  const persist = useCallback(
    async (next) => {
      if (!user) return
      const row = {
        user_id: user.id,
        xp: next.xp,
        level: next.level,
        lessons_done: next.lessons_done,
        badges: next.badges,
        updated_at: new Date().toISOString(),
      }
      const { error: err } = await supabase
        .from('progress')
        .upsert(row, { onConflict: 'user_id' })
      if (err) setError(err)
    },
    [user]
  )

  const addXP = useCallback(
    async (amount) => {
      const xp = progress.xp + amount
      const next = { ...progress, xp, level: levelFromXP(xp) }
      setProgress(next)
      await persist(next)
    },
    [progress, persist]
  )

  const completeLesson = useCallback(async () => {
    const next = { ...progress, lessons_done: progress.lessons_done + 1 }
    setProgress(next)
    await persist(next)
  }, [progress, persist])

  const addBadge = useCallback(
    async (badge) => {
      if (progress.badges.includes(badge)) return
      const next = { ...progress, badges: [...progress.badges, badge] }
      setProgress(next)
      await persist(next)
    },
    [progress, persist]
  )

  return {
    progress,
    loading,
    error,
    addXP,
    completeLesson,
    addBadge,
  }
}

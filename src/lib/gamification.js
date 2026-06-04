export const XP_ANSWER = 10
export const XP_CORRECT_BONUS = 5
export const XP_COMPLETE_BONUS = 50
export const XP_DEFI_BONUS = 20

export const LEVELS = [
  { num: 1, name: 'Débutant',    min: 0,    max: 100 },
  { num: 2, name: 'Explorateur', min: 100,  max: 300 },
  { num: 3, name: 'Apprenti',    min: 300,  max: 600 },
  { num: 4, name: 'Expert',      min: 600,  max: 1000 },
  { num: 5, name: 'Champion',    min: 1000, max: Infinity },
]

export function getLevel(xp) {
  const safe = Number(xp) || 0
  const lvl = LEVELS.find((l) => safe >= l.min && safe < l.max) || LEVELS[LEVELS.length - 1]
  const span = lvl.max === Infinity ? 1 : (lvl.max - lvl.min)
  const into = safe - lvl.min
  const pct = lvl.max === Infinity ? 100 : Math.min(100, Math.round((into / span) * 100))
  return { ...lvl, pct, into, xp: safe }
}

export const BADGES = [
  {
    id: 'first_quiz',
    icon: '🌟',
    label: 'Premier Quiz',
    desc: 'Compléter ton premier quiz',
    check: (d) => (d.quiz_done?.length || 0) >= 1,
  },
  {
    id: 'on_fire',
    icon: '🔥',
    label: 'En feu',
    desc: 'Compléter 3 quiz',
    check: (d) => (d.quiz_done?.length || 0) >= 3,
  },
  {
    id: 'champion',
    icon: '🏆',
    label: 'Champion',
    desc: 'Compléter les 5 quiz',
    check: (d) => (d.quiz_done?.length || 0) >= 5,
  },
  {
    id: 'defi_accepted',
    icon: '🎯',
    label: 'Défi accepté',
    desc: 'Choisir un défi 3 fois',
    check: (d) => [1, 2, 3, 4, 5].filter((id) => d[`quiz_${id}_defi`]).length >= 3,
  },
  {
    id: 'brain_expert',
    icon: '🧠',
    label: 'Cerveau expert',
    desc: 'Plus de 80% de bonnes réponses sur un quiz',
    check: (d) => {
      const scores = d.quiz_scores || {}
      return Object.values(scores).some((s) => s && s.totalCount > 0 && (s.correctCount / s.totalCount) >= 0.8)
    },
  },
  {
    id: 'xp_500',
    icon: '⭐',
    label: '500 XP',
    desc: 'Atteindre 500 XP total',
    check: (d) => (d.xp_total || 0) >= 500,
  },
  {
    id: 'xp_1000',
    icon: '💎',
    label: '1000 XP',
    desc: 'Atteindre 1000 XP total',
    check: (d) => (d.xp_total || 0) >= 1000,
  },
]

export const BADGE_BY_ID = Object.fromEntries(BADGES.map((b) => [b.id, b]))

export function computeBadges(data) {
  return BADGES.filter((b) => b.check(data)).map((b) => b.id)
}

export function getNewBadges(prevBadges, data) {
  const earned = computeBadges(data)
  const prev = prevBadges || []
  return earned.filter((id) => !prev.includes(id))
}

export function getStars(score) {
  if (!score || !score.completedAt) return 0
  if (!score.totalCount) return 1
  const pct = score.correctCount / score.totalCount
  if (pct >= 0.9) return 3
  if (pct >= 0.7) return 2
  return 1
}

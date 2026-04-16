export const QUIZ = [
  {
    id: 1, titre: 'La colère', emoji: '😡', couleur: '#C0506A',
    video: { titre: 'Le Monstre et le Lego cassé', duree: '45s', thumbnail: 'monstre-surexcite.webp', disponible: false },
    questions: [
      { id: 1, texte: "Quand tu es en colère, qu'est-ce que tu sens dans ton corps ?", type: 'picto_choix', multiselect: true,
        choix: [
          { id: 'a', picto: '💓', texte: 'Mon cœur bat vite' },
          { id: 'b', picto: '🔥', texte: 'Mon ventre chauffe' },
          { id: 'c', picto: '🤯', texte: 'Ma tête tourne' },
          { id: 'd', picto: '💪', texte: 'Je suis tout tendu' },
        ] },
      { id: 2, texte: "Qu'est-ce qui t'aide à te calmer ?", type: 'picto_choix', multiselect: true,
        choix: [
          { id: 'a', picto: '💨', texte: 'Respirer' },
          { id: 'b', picto: '🏠', texte: 'Mon coin calme' },
          { id: 'c', picto: '🤗', texte: 'Un câlin' },
          { id: 'd', picto: '🏃', texte: 'Bouger / sauter' },
        ] },
      { id: 3, texte: "Ton Monstre aujourd'hui, il est comment ?", type: 'monstre_humeur', multiselect: false,
        choix: [
          { id: 'a', img: 'monstre-calin.webp', texte: 'Câlin' },
          { id: 'b', img: 'monstre-surexcite.webp', texte: 'Surexcité' },
          { id: 'c', img: 'monstre-triste.webp', texte: 'Triste' },
          { id: 'd', img: 'monstre-cache.webp', texte: 'Caché' },
        ] },
    ],
    xp: 30, badge: '🧠 Explorateur des émotions',
  },
  {
    id: 2, titre: 'La tristesse', emoji: '😢', couleur: '#2A9490',
    video: { titre: "Le Monstre et l'anniversaire", duree: '45s', thumbnail: 'monstre-triste.webp', disponible: false },
    questions: [
      { id: 1, texte: "Quand tu es triste, tu as plutôt envie de...", type: 'picto_choix', multiselect: true,
        choix: [{ id: 'a', picto: '🤫', texte: 'Rester seul' }, { id: 'b', picto: '🤗', texte: 'Un câlin' }, { id: 'c', picto: '😭', texte: 'Pleurer' }, { id: 'd', picto: '🎮', texte: 'Jouer' }] },
      { id: 2, texte: "La tristesse dans ton corps c'est...", type: 'picto_choix', multiselect: true,
        choix: [{ id: 'a', picto: '🫀', texte: 'Lourd dans la poitrine' }, { id: 'b', picto: '😪', texte: 'Fatigue' }, { id: 'c', picto: '🥺', texte: 'Envie de pleurer' }, { id: 'd', picto: '🤐', texte: 'Plus envie de parler' }] },
      { id: 3, texte: "Ton Monstre aujourd'hui ?", type: 'monstre_humeur', multiselect: false,
        choix: [{ id: 'a', img: 'monstre-calin.webp', texte: 'Câlin' }, { id: 'b', img: 'monstre-triste.webp', texte: 'Triste' }, { id: 'c', img: 'monstre-cache.webp', texte: 'Caché' }, { id: 'd', img: 'monstre-chuchote.webp', texte: 'Silencieux' }] },
    ],
    xp: 30, badge: '💙 Ami des émotions',
  },
  {
    id: 3, titre: 'Trop plein', emoji: '🤯', couleur: '#F5A623',
    video: { titre: "Le Monstre après l'école", duree: '45s', thumbnail: 'monstre-surexcite.webp', disponible: false },
    questions: [
      { id: 1, texte: "Quand tu rentres de l'école, tu te sens souvent...", type: 'picto_choix', multiselect: true,
        choix: [{ id: 'a', picto: '😤', texte: 'Irritable' }, { id: 'b', picto: '😴', texte: 'Épuisé' }, { id: 'c', picto: '🤯', texte: 'La tête qui déborde' }, { id: 'd', picto: '🙂', texte: 'Bien' }] },
      { id: 2, texte: "Pour te recharger après l'école tu as besoin de...", type: 'picto_choix', multiselect: true,
        choix: [{ id: 'a', picto: '🤫', texte: 'Silence' }, { id: 'b', picto: '🎮', texte: 'Jouer seul' }, { id: 'c', picto: '🍎', texte: 'Manger' }, { id: 'd', picto: '🏃', texte: 'Bouger' }] },
      { id: 3, texte: "Ton Monstre aujourd'hui ?", type: 'monstre_humeur', multiselect: false,
        choix: [{ id: 'a', img: 'monstre-surexcite.webp', texte: 'Surexcité' }, { id: 'b', img: 'monstre-triste.webp', texte: 'Fatigué' }, { id: 'c', img: 'monstre-calin.webp', texte: 'Câlin' }, { id: 'd', img: 'monstre-rigole.webp', texte: 'Rigolo' }] },
    ],
    xp: 30, badge: "⚡ Gestionnaire d'énergie",
  },
  {
    id: 4, titre: 'La peur', emoji: '😨', couleur: '#7C3AED',
    video: { titre: 'Le Monstre et la nuit', duree: '45s', thumbnail: 'monstre-cache.webp', disponible: false },
    questions: [
      { id: 1, texte: "Ce qui te fait peur le plus souvent c'est...", type: 'picto_choix', multiselect: true,
        choix: [{ id: 'a', picto: '🌙', texte: 'La nuit' }, { id: 'b', picto: '👥', texte: 'Les autres enfants' }, { id: 'c', picto: '📚', texte: "L'école" }, { id: 'd', picto: '🔊', texte: 'Les bruits forts' }] },
      { id: 2, texte: "Quand tu as peur tu...", type: 'picto_choix', multiselect: true,
        choix: [{ id: 'a', picto: '🏃', texte: 'Tu fuis' }, { id: 'b', picto: '🧊', texte: 'Tu te figes' }, { id: 'c', picto: '😭', texte: 'Tu pleures' }, { id: 'd', picto: '😤', texte: "Tu t'énerves" }] },
      { id: 3, texte: "Ton Monstre aujourd'hui ?", type: 'monstre_humeur', multiselect: false,
        choix: [{ id: 'a', img: 'monstre-cache.webp', texte: 'Caché' }, { id: 'b', img: 'monstre-triste.webp', texte: 'Inquiet' }, { id: 'c', img: 'monstre-calin.webp', texte: 'Rassuré' }, { id: 'd', img: 'monstre-rigole.webp', texte: 'Courageux' }] },
    ],
    xp: 30, badge: '🦁 Cœur courageux',
  },
  {
    id: 5, titre: 'La joie', emoji: '🌟', couleur: '#F5E06D',
    video: { titre: 'Le Monstre et la victoire', duree: '45s', thumbnail: 'monstre-rigole.webp', disponible: false },
    questions: [
      { id: 1, texte: "Ce qui te rend vraiment heureux c'est...", type: 'picto_choix', multiselect: true,
        choix: [{ id: 'a', picto: '🎮', texte: 'Jouer' }, { id: 'b', picto: '🤗', texte: 'Câlins' }, { id: 'c', picto: '🏆', texte: 'Réussir quelque chose' }, { id: 'd', picto: '🎨', texte: 'Créer' }] },
      { id: 2, texte: "Quand tu es heureux ton corps...", type: 'picto_choix', multiselect: true,
        choix: [{ id: 'a', picto: '⚡', texte: "Est plein d'énergie" }, { id: 'b', picto: '😊', texte: 'Sourit tout seul' }, { id: 'c', picto: '🗣️', texte: 'Parle beaucoup' }, { id: 'd', picto: '🕺', texte: 'Veut bouger' }] },
      { id: 3, texte: "Ton Monstre aujourd'hui ?", type: 'monstre_humeur', multiselect: false,
        choix: [{ id: 'a', img: 'monstre-rigole.webp', texte: 'Super heureux' }, { id: 'b', img: 'monstre-calin.webp', texte: 'Câlin' }, { id: 'c', img: 'monstre-surexcite.webp', texte: 'Surexcité' }, { id: 'd', img: 'monstre-triste.webp', texte: 'Pas top' }] },
    ],
    xp: 30, badge: '🌟 Collectionneur de joie',
  },
]

// Static monstre image map (matches files in src/assets/characters/monstre~/)
import monstreCalin from '../assets/characters/monstre~/monstre-calin.webp'
import monstreSurexcite from '../assets/characters/monstre~/monstre-surexcite.webp'
import monstreTriste from '../assets/characters/monstre~/monstre-triste.webp'
import monstreCache from '../assets/characters/monstre~/monstre-cache.webp'
import monstreChuchote from '../assets/characters/monstre~/monstre-chuchote.webp'
import monstreRigole from '../assets/characters/monstre~/monstre-rigole.webp'

export const MONSTRE_IMAGES = {
  'monstre-calin.webp': monstreCalin,
  'monstre-surexcite.webp': monstreSurexcite,
  'monstre-triste.webp': monstreTriste,
  'monstre-cache.webp': monstreCache,
  'monstre-chuchote.webp': monstreChuchote,
  'monstre-rigole.webp': monstreRigole,
}

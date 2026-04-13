export const LECONS = [
  // ═══════════════════════════════════════════════════════════
  // MODULE A — Comprendre le TDAH (#0D9373)
  // ═══════════════════════════════════════════════════════════
  {
    id: 1, module: 'A', moduleLabel: 'Comprendre le TDAH', moduleColor: '#0D9373',
    titre: 'Le cerveau TDAH', sousTitre: 'Comment il fonctionne vraiment',
    duree: '4 min', xp: 50, cortexImage: 'bienveillant',
    cartes: [
      { id: 1, type: 'intro', emoji: '🧠', titre: 'Son cerveau n\'est pas cassé', texte: 'Il est juste différent.', couleur: '#0D9373' },
      { id: 2, type: 'fact', label: 'Le savoir', titre: 'Le cortex préfrontal', texte: 'C\'est le chef d\'orchestre du cerveau — attention, contrôle des impulsions, planification.', detail: 'Chez ton enfant, il est en retard de 2 à 3 ans.', icone: '⏳' },
      { id: 3, type: 'cortex', citation: '"Les études IRM montrent que le cortex préfrontal des enfants TDAH atteint sa maturité à 21 ans, contre 18 ans pour les autres."', source: 'Shaw et al., 2007' },
      { id: 4, type: 'contraste', titre: 'Ce qu\'on croit vs la réalité', gauche: { label: '❌ Ce qu\'on croit', texte: 'Il pourrait faire des efforts s\'il voulait.' }, droite: { label: '✓ La réalité', texte: 'Son cerveau n\'est pas encore équipé pour ça.' } },
      { id: 5, type: 'verbatim', texte: '"Le jour où j\'ai compris que mon fils ne POUVAIT pas, pas qu\'il ne VOULAIT pas — ma colère s\'est transformée en empathie."', auteur: 'Sophie, maman de Théo, 9 ans' },
      { id: 6, type: 'action', numero: 1, titre: 'Cette semaine', texte: 'Quand tu t\'énerves, remplace "il pourrait faire des efforts" par "son cerveau n\'est pas encore équipé pour ça".', tag: 'À faire maintenant' },
      { id: 7, type: 'action', numero: 2, titre: 'Avec ton enfant', texte: 'Explique-lui que son cerveau est différent, pas cassé. Utilise cette phrase : "Ton cerveau est comme un super-héros qui apprend encore à contrôler ses pouvoirs."', tag: 'À dire ce soir' },
      { id: 8, type: 'memo', titre: 'À retenir', items: ['TDAH = différence neurologique, pas manque de volonté', 'Retard de maturation : 2-3 ans', 'Il ne PEUT pas, il ne refuse pas'] },
    ],
    scenario: {
      titre: 'Scénario du jour',
      situation: 'Ce matin, Lucas a refusé de mettre ses chaussures. Tu as répété 5 fois. Tu as fini par crier. Il a pleuré.',
      cerveau_enfant: 'Son cerveau était encore en train de "démarrer". La transition veille→action est neurologiquement difficile pour lui.',
      cerveau_parent: 'Ton stress du matin a activé ton propre système d\'alarme. Tu as réagi, pas agi.',
      demain: ['Annonce la transition 5 minutes avant : "Dans 5 minutes on part"', 'Prépare les chaussures la veille au soir ensemble', 'Un seul mot-signal au lieu de répéter : "chaussures !"'],
    },
    quiz: [
      { question: 'Le TDAH est principalement...', choix: ['Un manque d\'éducation', 'Une différence neurologique', 'Un excès de sucre'], correct: 1, explication: 'Le TDAH est une différence neurologique documentée par l\'IRM, pas un problème d\'éducation.' },
      { question: 'Le cortex préfrontal d\'un enfant TDAH est en retard de...', choix: ['6 mois', '1 an', '2 à 3 ans'], correct: 2, explication: 'Les études IRM montrent un retard moyen de 2 à 3 ans dans la maturation du cortex préfrontal.' },
      { question: 'Ton enfant refuse de faire ses devoirs. C\'est parce qu\'il...', choix: ['Ne veut pas', 'Ne peut pas encore', 'Veut te mettre en colère'], correct: 1, explication: 'Le TDAH affecte les fonctions exécutives — la capacité à démarrer une tâche, pas la motivation.' },
    ],
  },

  {
    id: 2, module: 'A', moduleLabel: 'Comprendre le TDAH', moduleColor: '#0D9373',
    titre: 'Les fonctions exécutives', sousTitre: 'Le chef d\'orchestre en grève',
    duree: '4 min', xp: 50, cortexImage: 'passionne',
    cartes: [
      { id: 1, type: 'intro', emoji: '🎼', titre: 'Le chef d\'orchestre est en grève', texte: 'Mais le musicien, lui, est là.', couleur: '#0D9373' },
      { id: 2, type: 'fact', label: 'Définition', titre: 'Les fonctions exécutives', texte: 'Démarrer une tâche · Maintenir l\'attention · Gérer le temps · Inhiber les distractions · Réguler les émotions.', detail: 'Chez l\'enfant TDAH : déficitaires, pas absentes.', icone: '⚙️' },
      { id: 3, type: 'cortex', citation: '"Le TDAH est un trouble des fonctions exécutives, pas de l\'attention. L\'enfant peut se concentrer sur ce qui l\'intéresse — c\'est la dysrégulation, pas l\'absence."', source: 'Barkley, 2015' },
      { id: 4, type: 'contraste', titre: 'Pourquoi les jeux vidéo mais pas les devoirs ?', gauche: { label: '🎮 Jeux vidéo', texte: 'Feedback immédiat constant. Nouveau niveau toutes les 2 minutes.' }, droite: { label: '📚 Devoirs', texte: 'Aucun feedback immédiat. Résultat dans 2 jours.' } },
      { id: 5, type: 'verbatim', texte: '"Quand j\'ai compris que mon fils avait un problème de chef d\'orchestre dans le cerveau, j\'ai arrêté de me battre et j\'ai commencé à être son chef d\'orchestre externe."', auteur: 'Marine, maman de Jules, 11 ans' },
      { id: 6, type: 'action', numero: 1, titre: 'Deviens son cerveau externe', texte: 'Ne dis pas "range ta chambre". Fais-le avec lui les 3 premières fois en guidant chaque étape.', tag: 'Cette semaine' },
      { id: 7, type: 'action', numero: 2, titre: 'Découpe les tâches', texte: 'Maximum 10 minutes par bloc. Timer visible. Pause obligatoire entre chaque bloc.', tag: 'Dès ce soir' },
      { id: 8, type: 'memo', titre: 'À retenir', items: ['Chef d\'orchestre = fonctions exécutives', 'Il SAIT quoi faire, il ne PEUT PAS le faire seul', 'Feedback immédiat = clé de l\'attention TDAH'] },
    ],
    scenario: {
      titre: 'Scénario du jour',
      situation: 'Devoirs. Tu demandes 3 exercices de maths. Il regarde par la fenêtre, grignote son crayon. 45 minutes plus tard : rien.',
      cerveau_enfant: 'Son chef d\'orchestre ne sait pas par où commencer. Sans premier coup de baguette extérieur, l\'orchestre ne démarre pas.',
      cerveau_parent: 'Tu interprètes ça comme du refus. C\'est de l\'incapacité à démarrer.',
      demain: ['Lance le premier exercice avec lui : "On commence par celui-là ensemble"', 'Timer 10 minutes visible sur la table', 'Après 10 min : pause 3 min, puis tu relances'],
    },
    quiz: [
      { question: 'Pourquoi les jeux vidéo mais pas les devoirs ?', choix: ['Il est paresseux', 'Les jeux offrent un feedback immédiat', 'Il te manipule'], correct: 1, explication: 'Le cerveau TDAH a besoin de feedback immédiat. Les jeux en donnent toutes les secondes.' },
      { question: '"Devenir le cerveau externe" signifie...', choix: ['Faire à sa place', 'Guider chaque étape jusqu\'à ce qu\'il intègre', 'Le surveiller constamment'], correct: 1, explication: 'Le cerveau externe structure et accompagne — il ne remplace pas l\'enfant.' },
      { question: 'Durée idéale d\'un bloc de travail TDAH ?', choix: ['1 heure', '30 minutes', '10 minutes'], correct: 2, explication: 'Des blocs courts avec feedback correspondent au besoin neurologique du cerveau TDAH.' },
    ],
  },

  {
    id: 3, module: 'A', moduleLabel: 'Comprendre le TDAH', moduleColor: '#0D9373',
    titre: 'L\'autorégulation émotionnelle', sousTitre: 'Le tsunami intérieur',
    duree: '4 min', xp: 50, cortexImage: 'bienveillant',
    cartes: [
      { id: 1, type: 'intro', emoji: '🌊', titre: 'Il ne fait pas de cinéma', texte: 'Il vit un tsunami.', couleur: '#0D9373' },
      { id: 2, type: 'fact', label: 'Intensité', titre: 'Émotions x3', texte: 'Les enfants TDAH ressentent les émotions avec une intensité 3 fois supérieure aux neurotypiques.', detail: 'L\'amygdale s\'emballe, le cortex préfrontal freine trop tard.', icone: '🔥' },
      { id: 3, type: 'cortex', citation: '"Le TDAH inclut une réactivité émotionnelle significativement plus élevée. Ce n\'est pas un trouble du comportement — c\'est un trouble de la régulation émotionnelle."', source: 'Barkley, 2015' },
      { id: 4, type: 'contraste', titre: 'Pendant la crise', gauche: { label: '❌ Ce qu\'on fait', texte: 'Hausser la voix, raisonner, menacer.' }, droite: { label: '✓ Ce qui marche', texte: 'Baisser la voix, ralentir, valider l\'émotion.' } },
      { id: 5, type: 'verbatim', texte: '"Quand je criais en réponse à sa crise, je rajoutais du bois sur le feu. Le jour où j\'ai baissé la voix, tout a changé."', auteur: 'Claire, maman d\'Emma, 8 ans' },
      { id: 6, type: 'action', numero: 1, titre: 'Pendant la crise', texte: 'Mets-toi à sa hauteur. Voix basse. "Je vois que tu es très en colère. Je suis là." Rien d\'autre.', tag: 'À pratiquer' },
      { id: 7, type: 'action', numero: 2, titre: 'Après la crise', texte: 'Crée un "coin calme" (pas une punition) avec ses objets apaisants : coussin, peluche, casque anti-bruit.', tag: 'Ce weekend' },
      { id: 8, type: 'memo', titre: 'À retenir', items: ['Émotions TDAH = intensité x3', 'Valider AVANT de corriger', 'Coin calme ≠ punition'] },
    ],
    scenario: {
      titre: 'Scénario du jour',
      situation: 'Au goûter, sa soeur a pris le dernier gâteau. Il a hurlé, jeté son verre, pleuré pendant 20 minutes.',
      cerveau_enfant: 'La frustration a déclenché un tsunami émotionnel. Son amygdale a pris le contrôle, son cortex préfrontal était hors-ligne.',
      cerveau_parent: 'Tu as eu envie de crier "c\'est qu\'un gâteau !". Mais pour lui, c\'était un tremblement de terre intérieur.',
      demain: ['Quand ça arrive : "Je vois que tu es très en colère. On va respirer ensemble."', 'Ne raisonne PAS pendant la crise — attends le retour au calme', 'Propose le coin calme comme choix : "Tu veux aller dans ton coin doux ?"'],
    },
    quiz: [
      { question: 'L\'intensité émotionnelle TDAH vs neurotypique ?', choix: ['Pareille', '2x plus forte', '3x plus forte'], correct: 2, explication: 'La réactivité émotionnelle est environ 3x supérieure chez les enfants TDAH.' },
      { question: 'Pendant une crise, tu devrais...', choix: ['Hausser la voix', 'Baisser la voix et ralentir', 'L\'ignorer'], correct: 1, explication: 'S\'énerver amplifie la crise. Baisser la voix active le système parasympathique.' },
      { question: 'Que faire en PREMIER pendant une crise ?', choix: ['Expliquer ce qui ne va pas', 'Valider l\'émotion', 'L\'isoler'], correct: 1, explication: 'Le cortex préfrontal est hors-ligne. La validation émotionnelle aide à le réactiver.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE B — Les 5 Piliers Barkley (#FF6B4A)
  // ═══════════════════════════════════════════════════════════
  {
    id: 4, module: 'B', moduleLabel: 'Les 5 Piliers Barkley', moduleColor: '#FF6B4A',
    titre: 'Tu es son cerveau externe', sousTitre: 'Pilier n°1 de Barkley',
    duree: '4 min', xp: 50, cortexImage: 'passionne',
    cartes: [
      { id: 1, type: 'intro', emoji: '🧩', titre: 'Il sait quoi faire', texte: 'Il ne peut juste pas le faire seul.', couleur: '#FF6B4A' },
      { id: 2, type: 'fact', label: 'Pilier n°1', titre: 'Le cerveau externe', texte: 'Le parent devient temporairement le cortex préfrontal de l\'enfant — son système d\'organisation externe.', detail: 'Ce n\'est pas de la surprotection, c\'est de l\'adaptation neurologique.', icone: '🎯' },
      { id: 3, type: 'cortex', citation: '"Le TDAH est un trouble de la performance, pas de la connaissance. L\'enfant sait quoi faire mais ne peut pas le faire seul au bon moment."', source: 'Barkley, 2013' },
      { id: 4, type: 'contraste', titre: 'Surprotection vs Cerveau externe', gauche: { label: '❌ Surprotection', texte: 'Faire à sa place pour éviter le conflit.' }, droite: { label: '✓ Cerveau externe', texte: 'Guider étape par étape et réduire l\'aide sur 4 semaines.' } },
      { id: 5, type: 'verbatim', texte: '"Je suis devenu son GPS humain. Et paradoxalement, il a commencé à gagner en autonomie."', auteur: 'Thomas, papa de Romain, 10 ans' },
      { id: 6, type: 'action', numero: 1, titre: 'Les 3 tâches', texte: 'Liste les 3 tâches où il échoue le plus souvent. Ce sont celles où il a le plus besoin de toi comme cerveau externe.', tag: 'Ce soir' },
      { id: 7, type: 'action', numero: 2, titre: 'Aides visuelles', texte: 'Checklist imagée, timer visible, pictogrammes pour la routine. Colle-les à hauteur d\'enfant.', tag: 'Ce weekend' },
      { id: 8, type: 'memo', titre: 'À retenir', items: ['Cerveau externe = compenser le déficit temporairement', 'Présence physique + guidage étape par étape', 'Réduire l\'aide progressivement sur 4 semaines'] },
    ],
    scenario: {
      titre: 'Scénario du jour',
      situation: 'Tu lui dis "range ta chambre". 30 minutes plus tard il joue avec un jouet trouvé sous le lit. La chambre est pire qu\'avant.',
      cerveau_enfant: '"Range ta chambre" = 20 sous-tâches invisibles pour toi, mais impossibles à séquencer pour lui.',
      cerveau_parent: 'Tu penses qu\'il te nargue. En réalité il a été aspiré par le premier stimulus croisé.',
      demain: ['"Range ta chambre" → "Étape 1 : mets les legos dans la boîte rouge. Je reviens dans 3 minutes."', 'Timer visible, une étape à la fois', 'Tu es PRÉSENT à chaque étape les 2 premières semaines'],
    },
    quiz: [
      { question: '"Cerveau externe" signifie...', choix: ['Faire à sa place', 'Guider ce que son cerveau ne peut pas encore organiser seul', 'Le surveiller'], correct: 1, explication: 'Le cerveau externe accompagne, il ne remplace pas.' },
      { question: 'Une routine s\'enseigne en...', choix: ['1 explication claire', '4 semaines d\'accompagnement', '1 punition'], correct: 1, explication: 'La répétition sur 4 semaines crée des circuits neuronaux. Une explication ne suffit pas.' },
      { question: 'Les aides visuelles compensent...', choix: ['Le manque de motivation', 'Le déficit de mémoire de travail', 'La paresse'], correct: 1, explication: 'La mémoire de travail est l\'une des fonctions exécutives les plus touchées par le TDAH.' },
    ],
  },

  {
    id: 5, module: 'B', moduleLabel: 'Les 5 Piliers Barkley', moduleColor: '#FF6B4A',
    titre: 'L\'immédiateté', sousTitre: 'Le futur n\'existe pas',
    duree: '4 min', xp: 50, cortexImage: 'passionne',
    cartes: [
      { id: 1, type: 'intro', emoji: '⏰', titre: 'Pour lui, demain n\'existe pas', texte: 'Seul le maintenant compte.', couleur: '#FF6B4A' },
      { id: 2, type: 'fact', label: 'Pilier n°2', titre: 'Le présent immédiat', texte: 'Le cerveau TDAH ne peut pas traiter les conséquences futures. Les récompenses dans 1 heure ou 1 semaine sont neurologiquement invisibles.', detail: 'Toute conséquence ou récompense doit être MAINTENANT.', icone: '⚡' },
      { id: 3, type: 'cortex', citation: '"Pour un enfant TDAH, le futur n\'existe pas neurologiquement. Les récompenses et conséquences doivent être immédiates — pas dans 2 heures, pas ce soir, maintenant."', source: 'Barkley, 2013' },
      { id: 4, type: 'contraste', titre: 'Récompenses', gauche: { label: '❌ Ce qui ne marche pas', texte: '"Si tu es sage cette semaine, tu auras ta tablette samedi."' }, droite: { label: '✓ Ce qui marche', texte: '"Tu as rangé tes chaussures ? Voilà un jeton. 5 jetons = 15 min de jeu."' } },
      { id: 5, type: 'verbatim', texte: '"Quand j\'ai compris que son cerveau ne peut pas attendre, j\'ai changé tout mon système. Les récompenses immédiates ont tout changé."', auteur: 'Amandine, maman de Noah, 7 ans' },
      { id: 6, type: 'action', numero: 1, titre: 'Système de jetons', texte: 'Chaque bonne action = 1 jeton immédiat. 5 jetons = récompense choisie par lui. Utilise de vrais jetons physiques.', tag: 'À installer' },
      { id: 7, type: 'action', numero: 2, titre: 'Conséquences immédiates', texte: 'Les conséquences négatives aussi : immédiates et brèves. Pas de punition de 3 jours. "Tu as tapé → pas de tablette pendant 20 minutes."', tag: 'Nouvelle règle' },
      { id: 8, type: 'memo', titre: 'À retenir', items: ['Le futur n\'existe pas pour son cerveau', 'Tout dans les 5 minutes qui suivent', 'Système de jetons = outil le plus puissant'] },
    ],
    scenario: {
      titre: 'Scénario du jour',
      situation: 'Tu promets : "Si tu es sage au restaurant, tu auras un dessert." Il fait une crise 10 minutes après.',
      cerveau_enfant: '"Le restaurant" et "le dessert" sont séparés par un gouffre temporel impossible à traiter.',
      cerveau_parent: 'Tu penses que la promesse devrait suffire. Pour toi, le lien est évident. Pour son cerveau, non.',
      demain: ['Au restaurant : un jeton toutes les 5 minutes de calme', '3 jetons = il choisit le dessert', 'Montre les jetons, qu\'il les voie s\'accumuler'],
    },
    quiz: [
      { question: 'Pourquoi les récompenses futures ne marchent pas ?', choix: ['Impatience', 'Le cerveau ne traite pas le futur', 'Mauvaise volonté'], correct: 1, explication: 'Le cortex préfrontal immature rend les conséquences futures neurologiquement invisibles.' },
      { question: 'Le système de jetons fonctionne parce que...', choix: ['C\'est amusant', 'Feedback visuel et immédiat', 'Ça le responsabilise'], correct: 1, explication: 'Les jetons matérialisent immédiatement la progression — ce que le cerveau TDAH peut traiter.' },
      { question: 'Une bonne conséquence négative est...', choix: ['Longue et marquante', 'Immédiate, brève, liée à l\'acte', 'Un discours explicatif'], correct: 1, explication: 'Les conséquences longues perdent tout impact. Immédiateté et brièveté sont les clés.' },
    ],
  },

  {
    id: 6, module: 'B', moduleLabel: 'Les 5 Piliers Barkley', moduleColor: '#FF6B4A',
    titre: 'Le renforcement positif', sousTitre: 'Le ratio qui change tout',
    duree: '4 min', xp: 50, cortexImage: 'bienveillant',
    cartes: [
      { id: 1, type: 'intro', emoji: '☀️', titre: '5 positifs pour 1 négatif', texte: 'C\'est le ratio qui reconstruit tout.', couleur: '#FF6B4A' },
      { id: 2, type: 'fact', label: 'Pilier n°3', titre: '20 000 messages négatifs', texte: 'Un enfant TDAH reçoit en moyenne 20 000 messages négatifs de plus qu\'un neurotypique avant 10 ans.', detail: 'Le renforcement positif active son circuit dopaminergique déficitaire.', icone: '💬' },
      { id: 3, type: 'cortex', citation: '"Le renforcement positif active le circuit dopaminergique déficitaire. C\'est littéralement le carburant qui manque à son cerveau pour fonctionner."', source: 'Pfiffner & Haack, 2014' },
      { id: 4, type: 'contraste', titre: 'Deux types de "bravo"', gauche: { label: '❌ Générique', texte: '"Bravo, t\'es un bon garçon."' }, droite: { label: '✓ Spécifique', texte: '"Bravo d\'avoir rangé ton sac EN PREMIER ce matin, sans que je te le demande."' } },
      { id: 5, type: 'verbatim', texte: '"Mon psy m\'a fait compter : 47 remarques négatives pour 3 positives en une semaine. J\'ai pleuré. Quand j\'ai inversé, mon fils est devenu un autre enfant en 3 semaines."', auteur: 'Nathalie, maman de Lucas, 8 ans' },
      { id: 6, type: 'action', numero: 1, titre: 'Compte tes retours', texte: 'Pendant 1 journée, note chaque commentaire positif ET négatif. Calcule le ratio. L\'objectif : 5 pour 1.', tag: 'Demain' },
      { id: 7, type: 'action', numero: 2, titre: 'Micro-victoires', texte: 'Il a attendu 30 secondes sans bouger ? C\'est ÉNORME pour un cerveau TDAH. Dis-le lui.', tag: 'Dès maintenant' },
      { id: 8, type: 'memo', titre: 'À retenir', items: ['Ratio Barkley : 5 positifs pour 1 correction', 'Spécifique > générique', 'Célébrer les micro-victoires'] },
    ],
    scenario: {
      titre: 'Scénario du jour',
      situation: 'Retour de l\'école. Il a eu une remarque de la maîtresse. Tu sens la colère monter.',
      cerveau_enfant: 'Il sait déjà que c\'est mal. Il a honte. Un autre reproche va écraser ce qu\'il lui reste d\'estime.',
      cerveau_parent: 'Tu veux "marquer le coup". Mais la honte ne corrige jamais un comportement — elle le renforce.',
      demain: ['D\'abord : "Comment tu te sens par rapport à cette remarque ?"', 'Ensuite : chercher 1 chose positive dans sa journée', 'Ce soir : "J\'ai vu que tu as [chose positive]. Je suis fier de toi pour ça."'],
    },
    quiz: [
      { question: 'Le ratio idéal positif/négatif de Barkley ?', choix: ['1 pour 1', '3 pour 1', '5 pour 1'], correct: 2, explication: 'Barkley recommande minimum 5 retours positifs pour chaque correction.' },
      { question: 'Un bon renforcement positif est...', choix: ['"Bravo, bon garçon"', '"Bravo d\'avoir rangé ton sac en premier"', '"Continue"'], correct: 1, explication: 'Le renforcement spécifique nomme l\'action exacte. L\'enfant sait précisément ce qu\'il a bien fait.' },
      { question: 'Le renforcement positif active...', choix: ['Son ego', 'Son circuit dopaminergique', 'Sa paresse'], correct: 1, explication: 'La dopamine est déficitaire dans le TDAH. Le renforcement positif en stimule la production.' },
    ],
  },

  {
    id: 7, module: 'B', moduleLabel: 'Les 5 Piliers Barkley', moduleColor: '#FF6B4A',
    titre: 'Les routines visuelles', sousTitre: 'Rendre l\'invisible visible',
    duree: '4 min', xp: 50, cortexImage: 'passionne',
    cartes: [
      { id: 1, type: 'intro', emoji: '📋', titre: 'Son cerveau ne voit pas le temps', texte: 'Rends-le visible.', couleur: '#FF6B4A' },
      { id: 2, type: 'fact', label: 'Pilier n°4', titre: 'Le pouvoir de la prévisibilité', texte: 'Le cerveau TDAH est allergique à l\'imprévu. Les routines visuelles réduisent de 40% les comportements oppositionnels.', detail: 'Le Time Timer rend le temps concret et visible.', icone: '⏱️' },
      { id: 3, type: 'cortex', citation: '"Les enfants TDAH avec des routines visuelles ont 40% moins de comportements oppositionnels que ceux sans."', source: 'Rapport et al., 2013' },
      { id: 4, type: 'contraste', titre: 'Transitions', gauche: { label: '❌ Sans préparation', texte: '"On y va !" (crise immédiate)' }, droite: { label: '✓ Avec préparation', texte: '"Dans 10 min... dans 5 min... c\'est l\'heure."' } },
      { id: 5, type: 'verbatim', texte: '"Depuis le planning visuel sur le frigo et le Time Timer, mon fils se prépare SEUL le matin. Un an qu\'on ne crie plus."', auteur: 'David, papa de Maxime, 9 ans' },
      { id: 6, type: 'action', numero: 1, titre: 'Planning visuel', texte: 'Crée une checklist imagée pour le matin et le soir. Colle-la à hauteur d\'enfant. Laisse-le cocher.', tag: 'Ce weekend' },
      { id: 7, type: 'action', numero: 2, titre: 'Time Timer', texte: 'Utilise-le pour CHAQUE transition. "Dans 5 minutes on arrête le jeu" + timer visible à côté de lui.', tag: 'À acheter/télécharger' },
      { id: 8, type: 'memo', titre: 'À retenir', items: ['Prévisibilité = moins de crises', 'Planning visuel > consignes orales', 'Time Timer = rend le temps concret'] },
    ],
    scenario: {
      titre: 'Scénario du jour',
      situation: 'Tu dis "on part dans 5 minutes". 5 minutes plus tard, tu coupes le jeu vidéo. Crise explosive.',
      cerveau_enfant: '"5 minutes" est un concept abstrait. Il n\'a aucune idée de quand ça arrive. Le jeu s\'arrête = choc.',
      cerveau_parent: 'Tu penses l\'avoir prévenu. Mais sans repère visuel, ton avertissement n\'a pas été traité.',
      demain: ['Time Timer posé à côté de l\'écran : il VOIT le temps passer', 'Rappels à 10 min, 5 min, 2 min, "c\'est l\'heure"', 'Il éteint LUI-MÊME quand le timer sonne'],
    },
    quiz: [
      { question: 'Les routines visuelles réduisent l\'opposition de...', choix: ['10%', '25%', '40%'], correct: 2, explication: 'Les études montrent environ 40% de réduction avec des routines visuelles structurées.' },
      { question: 'Le Time Timer est utile parce qu\'il...', choix: ['Fait peur', 'Rend le temps visible', 'Remplace le parent'], correct: 1, explication: 'Le cerveau TDAH ne "voit" pas le temps. Le Time Timer le matérialise.' },
      { question: 'Pour une transition, il faut...', choix: ['Annoncer 1 fois', 'Prévenir à 10, 5 et 2 minutes', 'Couper sans prévenir'], correct: 1, explication: 'Les annonces progressives laissent au cerveau le temps de se préparer au changement.' },
    ],
  },

  {
    id: 8, module: 'B', moduleLabel: 'Les 5 Piliers Barkley', moduleColor: '#FF6B4A',
    titre: 'Comportement ≠ Personne', sousTitre: 'Protéger l\'estime de soi',
    duree: '4 min', xp: 50, cortexImage: 'bienveillant',
    cartes: [
      { id: 1, type: 'intro', emoji: '💛', titre: 'Il n\'est pas son comportement', texte: 'Ne confonds jamais les deux.', couleur: '#FF6B4A' },
      { id: 2, type: 'fact', label: 'Pilier n°5', titre: 'Estime de soi -30%', texte: 'L\'estime de soi des enfants TDAH est en moyenne 30% inférieure. Chaque "tu es nul" ou "tu es pénible" se grave dans son cerveau.', detail: 'Séparer l\'acte de la personne est LA compétence protectrice.', icone: '🛡️' },
      { id: 3, type: 'cortex', citation: '"Séparer le comportement de la personne est la compétence parentale la plus protectrice pour l\'estime de soi de l\'enfant TDAH."', source: 'Barkley, 2020' },
      { id: 4, type: 'contraste', titre: 'Le langage qui change tout', gauche: { label: '❌ "Tu ES..."', texte: '"Tu es méchant" → attaque l\'identité → détruit.' }, droite: { label: '✓ "Ce que tu AS FAIT..."', texte: '"Ce que tu as fait a blessé ta soeur" → décrit l\'acte → enseigne.' } },
      { id: 5, type: 'verbatim', texte: '"Ma fille m\'a dit : \'Maman, je suis nulle en tout.\' Elle avait 7 ans. J\'ai réalisé que c\'est moi qui lui avais appris ça, crise après crise."', auteur: 'Émilie, maman de Léa, 7 ans' },
      { id: 6, type: 'action', numero: 1, titre: 'Bannis "tu es..."', texte: 'Remplace "tu es nul/méchant/pénible" par "ce que tu as fait...". La nuance est petite, l\'impact est immense.', tag: 'Dès maintenant' },
      { id: 7, type: 'action', numero: 2, titre: '1 qualité par soir', texte: 'Chaque soir, dis-lui UNE qualité spécifique observée dans la journée. "Aujourd\'hui j\'ai vu que tu étais patient avec ta soeur."', tag: 'Ce soir' },
      { id: 8, type: 'memo', titre: 'À retenir', items: ['"Tu ES" détruit l\'identité', '"Ce que tu AS FAIT" enseigne', '1 qualité spécifique chaque soir'] },
    ],
    scenario: {
      titre: 'Scénario du jour',
      situation: 'Il pousse sa soeur. Tu exploses : "Tu es MÉCHANT avec elle, tu fais toujours pareil !"',
      cerveau_enfant: 'Il entend : "Je SUIS méchant. Je suis toujours pareil. Je ne changerai jamais." L\'étiquette colle.',
      cerveau_parent: 'Ta fatigue et ta frustration ont parlé plus vite que ta réflexion. C\'est humain.',
      demain: ['"Ce que tu as fait a fait mal à ta soeur. Comment tu peux réparer ?"', 'Décris l\'acte, jamais la personne', 'Ce soir : "J\'ai vu que tu as partagé tes crayons. Tu sais être généreux."'],
    },
    quiz: [
      { question: 'L\'estime de soi TDAH est en moyenne...', choix: ['Normale', '15% plus basse', '30% plus basse'], correct: 2, explication: 'Les études montrent -30%, aggravé par les retours négatifs constants.' },
      { question: 'Au lieu de "tu es méchant"...', choix: ['"Tu n\'es pas gentil"', '"Ce que tu as fait a blessé ta soeur"', 'Ne rien dire'], correct: 1, explication: 'Décrire l\'acte (modifiable) plutôt qu\'étiqueter la personne (fixe).' },
      { question: '1 qualité par soir sert à...', choix: ['Le gâter', 'Reconstruire son estime', 'Éviter les conflits'], correct: 1, explication: 'Chaque retour positif spécifique contrebalance les milliers de messages négatifs.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MODULE C — Situations du quotidien (#D4537E)
  // ═══════════════════════════════════════════════════════════
  {
    id: 9, module: 'C', moduleLabel: 'Situations du quotidien', moduleColor: '#D4537E',
    titre: 'Le matin', sousTitre: 'Sortir de la maison sans crier',
    duree: '4 min', xp: 50, cortexImage: 'perplexe',
    cartes: [
      { id: 1, type: 'intro', emoji: '🌅', titre: 'Le matin est un champ de mines', texte: 'Son cerveau démarre au ralenti.', couleur: '#D4537E' },
      { id: 2, type: 'fact', label: 'Neurochimie', titre: 'Dopamine au plus bas', texte: 'Le matin, le cerveau TDAH a ses niveaux de dopamine au minimum. Le cortisol (stress) est au maximum.', detail: 'Demander de l\'autonomie à ce moment = mission impossible.', icone: '🧪' },
      { id: 3, type: 'cortex', citation: '"Le matin est neurochimiquement le pire moment pour exiger de l\'autonomie d\'un enfant TDAH. La routine visuelle compense ce déficit temporaire."', source: 'Recommandations HAS, 2024' },
      { id: 4, type: 'contraste', titre: 'Deux matins', gauche: { label: '❌ Avant', texte: '"Dépêche-toi !" x15. Cris. Retard. Pleurs dans la voiture.' }, droite: { label: '✓ Après', texte: 'Checklist. Timer. Buffer 15 min. Il coche ses étapes. Calme.' } },
      { id: 5, type: 'verbatim', texte: '"On hurlait tous les matins. Depuis la checklist et les 15 minutes de buffer, c\'est un autre monde. Mon fils est fier de cocher ses étapes."', auteur: 'Virginie, maman d\'Arthur, 8 ans' },
      { id: 6, type: 'action', numero: 1, titre: 'Prépare la veille', texte: 'Vêtements sortis, sac prêt, table du petit-déjeuner mise. Tout ce qui peut être fait la veille DOIT l\'être.', tag: 'Ce soir' },
      { id: 7, type: 'action', numero: 2, titre: 'Checklist + Timer', texte: '1.M\'habiller 2.Déjeuner 3.Dents 4.Sac 5.Chaussures. Timer visible pour chaque bloc. Récompense immédiate si à l\'heure.', tag: 'Demain matin' },
      { id: 8, type: 'memo', titre: 'À retenir', items: ['Matin = cerveau au ralenti, pas paresse', 'Préparer la veille + 15 min de buffer', 'Checklist visuelle + Timer = autonomie'] },
    ],
    scenario: {
      titre: 'Scénario du jour',
      situation: 'Il est 8h10. L\'école est à 8h30. Il n\'a qu\'une chaussette, il joue avec le chat.',
      cerveau_enfant: 'Son cerveau a vu le chat, s\'est verrouillé dessus. La chaussette et l\'école ont disparu.',
      cerveau_parent: 'Tu vis une montée de cortisol. Ton corps est en mode "on va être en retard = danger".',
      demain: ['Checklist collée dans l\'entrée, à sa hauteur', 'Timer 10 min pour "habillé + chaussures"', 'Récompense : s\'il est prêt à 8h15, 5 min de jeu libre avec le chat'],
    },
    quiz: [
      { question: 'Pourquoi le matin est si dur pour un enfant TDAH ?', choix: ['Caprice', 'Dopamine basse, cortisol élevé', 'Il déteste l\'école'], correct: 1, explication: 'Le matin est neurochimiquement le pire moment. C\'est physiologique.' },
      { question: 'La 1ère étape du protocole matin ?', choix: ['Crier plus fort', 'Préparer la veille au soir', 'Supprimer le petit-déj'], correct: 1, explication: 'Éliminer les décisions du matin en préparant la veille.' },
      { question: 'La récompense "5 min de jeu" marche parce que...', choix: ['Ça le motive', 'C\'est immédiat et concret', 'C\'est une bonne habitude'], correct: 1, explication: 'La récompense immédiate exploite le fonctionnement du cerveau TDAH.' },
    ],
  },

  {
    id: 10, module: 'C', moduleLabel: 'Situations du quotidien', moduleColor: '#D4537E',
    titre: 'Les devoirs', sousTitre: '45 minutes maximum',
    duree: '4 min', xp: 50, cortexImage: 'perplexe',
    cartes: [
      { id: 1, type: 'intro', emoji: '📚', titre: 'Les devoirs ne devraient pas durer 2 heures', texte: '45 minutes. Pas une de plus.', couleur: '#D4537E' },
      { id: 2, type: 'fact', label: 'Science', titre: 'Capacité en chute libre', texte: 'La capacité attentionnelle chute de 50% entre 16h et 18h. Après l\'école, le réservoir de fonctions exécutives est vide.', detail: 'Sessions de 10-15 min avec pauses obligatoires.', icone: '📉' },
      { id: 3, type: 'cortex', citation: '"Un enfant qui apprend dans le calme en 45 min retient plus qu\'un enfant qui souffre pendant 2h."', source: 'Barkley, 2015' },
      { id: 4, type: 'contraste', titre: 'Deux soirées devoirs', gauche: { label: '❌ 2h de bataille', texte: 'Tension. Larmes. Le contenu n\'est pas retenu.' }, droite: { label: '✓ 3 × 12 min', texte: 'Calme. Pauses jeu. Fini en 45 min. Il retient.' } },
      { id: 5, type: 'verbatim', texte: '"2h30 de devoirs. On finissait en larmes. Depuis les sessions de 12 min avec pause jeu, c\'est fait en 45 min et il retient mieux."', auteur: 'Sandrine, maman de Mathis, 10 ans' },
      { id: 6, type: 'action', numero: 1, titre: 'Fractionne', texte: 'Sessions de 10-15 min max. Pause active de 5 min entre chaque (bouger, pas écran). Difficile d\'abord, facile ensuite.', tag: 'Ce soir' },
      { id: 7, type: 'action', numero: 2, titre: 'L\'environnement', texte: 'Bureau rangé, pas de distraction visuelle, bruit blanc ou musique calme. Lance le premier exercice AVEC lui.', tag: 'À préparer' },
      { id: 8, type: 'memo', titre: 'À retenir', items: ['45 min max — au-delà, la qualité chute', 'Sessions 10-15 min + pauses actives', 'Difficile d\'abord, facile ensuite'] },
    ],
    scenario: {
      titre: 'Scénario du jour',
      situation: 'Il a 3 exercices de maths et 1 leçon à apprendre. Il est 17h. À 19h, rien n\'est fait, tu es épuisé.',
      cerveau_enfant: 'Son cerveau est vidé par la journée d\'école. Impossible de démarrer sans aide externe.',
      cerveau_parent: 'Tu vis le stress de "ça va encore durer 2 heures". Ton anxiété se transmet.',
      demain: ['17h00 : exercice 1 ensemble (10 min) + pause 5 min', '17h15 : exercice 2 seul (timer 10 min) + pause', '17h30 : exercice 3 + leçon lue ensemble = fini à 17h50'],
    },
    quiz: [
      { question: 'Durée max recommandée devoirs TDAH (primaire) ?', choix: ['2 heures', '1 heure', '45 minutes'], correct: 2, explication: 'Au-delà de 45 min, l\'apprentissage est contre-productif.' },
      { question: 'Pourquoi commencer par le plus difficile ?', choix: ['Pour le punir', 'L\'énergie cognitive est là en début de session', 'Par habitude'], correct: 1, explication: 'Les fonctions exécutives s\'épuisent vite. Le plus dur quand elles sont encore là.' },
      { question: 'Les pauses entre sessions doivent être...', choix: ['Sur un écran', 'Actives (bouger) 5 minutes', 'Les plus courtes possible'], correct: 1, explication: 'Le mouvement recharge les fonctions exécutives. Les écrans captent l\'attention et rendent le retour plus dur.' },
    ],
  },

  {
    id: 11, module: 'C', moduleLabel: 'Situations du quotidien', moduleColor: '#D4537E',
    titre: 'Les écrans', sousTitre: 'Transitions et limites',
    duree: '4 min', xp: 50, cortexImage: 'perplexe',
    cartes: [
      { id: 1, type: 'intro', emoji: '📱', titre: 'Le problème n\'est pas l\'écran', texte: 'C\'est la transition SORTIR de l\'écran.', couleur: '#D4537E' },
      { id: 2, type: 'fact', label: 'Hyperfocalisation', titre: 'Verrouillage attentionnel', texte: 'Le cerveau TDAH "verrouille" son attention sur la source de dopamine la plus intense. L\'arracher sans préparation = couper l\'oxygène.', detail: 'L\'hyperfocalisation est un symptôme TDAH, pas un choix.', icone: '🔒' },
      { id: 3, type: 'cortex', citation: '"L\'hyperfocalisation sur les écrans est un symptôme neurologique du TDAH. Le cerveau verrouille sa source de dopamine la plus intense."', source: 'Barkley, 2015' },
      { id: 4, type: 'contraste', titre: 'Éteindre l\'écran', gauche: { label: '❌ Sans prévenir', texte: 'Tu coupes. Crise immédiate. 30 min de pleurs.' }, droite: { label: '✓ Avec annonces', texte: '"10 min... 5 min... 2 min... C\'est l\'heure, tu éteins." Il éteint lui-même.' } },
      { id: 5, type: 'verbatim', texte: '"J\'arrachais la tablette, crise garantie. Maintenant j\'annonce 10 min, 5 min, 2 min. Il éteint lui-même. Ça a pris 2 semaines."', auteur: 'Laurent, papa d\'Ethan, 11 ans' },
      { id: 6, type: 'action', numero: 1, titre: 'Protocole transition', texte: 'Timer visible à côté de l\'écran. Annonces à 10, 5 et 2 minutes. C\'est lui qui éteint, pas toi.', tag: 'Dès maintenant' },
      { id: 7, type: 'action', numero: 2, titre: 'Écran = récompense gagnée', texte: 'Le temps d\'écran n\'est plus un droit, c\'est une récompense du système de jetons. Il le mérite, ça change tout.', tag: 'Nouvelle règle' },
      { id: 8, type: 'memo', titre: 'À retenir', items: ['Hyperfocalisation = symptôme, pas choix', 'Annonces : 10 min, 5 min, 2 min', 'Écran = récompense gagnée'] },
    ],
    scenario: {
      titre: 'Scénario du jour',
      situation: 'Tu coupes la tablette sans prévenir. Il hurle, tape, pleure pendant 25 minutes.',
      cerveau_enfant: 'Son cerveau était en pleine production de dopamine. Tu as coupé le flux d\'un coup. Réaction de sevrage.',
      cerveau_parent: 'Tu vois un enfant capricieux. C\'est un cerveau en état de choc dopaminergique.',
      demain: ['Time Timer à côté de la tablette dès le début', '"Dans 10 minutes la tablette s\'arrête" (il le voit sur le timer)', 'C\'est LUI qui éteint quand le timer sonne. Pas toi.'],
    },
    quiz: [
      { question: 'L\'hyperfocalisation écran est...', choix: ['Un caprice', 'Un symptôme neurologique', 'Une addiction'], correct: 1, explication: 'C\'est un mécanisme neurologique du TDAH — le cerveau verrouille sa source de dopamine.' },
      { question: 'Pour la transition écran...', choix: ['Couper sans prévenir', 'Annoncer à 10, 5 et 2 min', 'Négocier chaque fois'], correct: 1, explication: 'Les annonces progressives permettent au cerveau de se "déverrouiller" de l\'hyperfocalisation.' },
      { question: 'Le temps d\'écran devrait être...', choix: ['Illimité', 'Une récompense gagnée', 'Interdit'], correct: 1, explication: 'Transformer l\'écran en récompense en fait un levier de motivation positif.' },
    ],
  },

  {
    id: 12, module: 'C', moduleLabel: 'Situations du quotidien', moduleColor: '#D4537E',
    titre: 'Le coucher', sousTitre: 'Le sas de décompression',
    duree: '4 min', xp: 50, cortexImage: 'bienveillant',
    cartes: [
      { id: 1, type: 'intro', emoji: '🌙', titre: 'Épuisé mais surexcité', texte: 'Le paradoxe du coucher TDAH.', couleur: '#D4537E' },
      { id: 2, type: 'fact', label: 'Sommeil', titre: '70% touchés', texte: '70% des enfants TDAH ont des troubles du sommeil. Leur mélatonine naturelle est produite 1 à 2 heures plus tard que chez les neurotypiques.', detail: 'Un sas de décompression d\'1 heure compense ce décalage.', icone: '😴' },
      { id: 3, type: 'cortex', citation: '"Le système de régulation veille/sommeil est retardé de 1 à 2 heures chez les TDAH. Un rituel sensoriel abaissant aide à compenser."', source: 'Recommandations HAS, 2024' },
      { id: 4, type: 'contraste', titre: 'Deux soirées', gauche: { label: '❌ Sans sas', texte: 'Écran jusqu\'à 20h30. Coucher 20h45. Endormissement : 22h15.' }, droite: { label: '✓ Avec sas', texte: 'Écran coupé à 19h30. Bain, lecture, lumière orange. Endormissement : 20h30.' } },
      { id: 5, type: 'verbatim', texte: '"Lumière tamisée, bain tiède, lecture ensemble. En 2 semaines elle s\'endormait en 15 minutes au lieu de 90."', auteur: 'Céline, maman de Chloé, 9 ans' },
      { id: 6, type: 'action', numero: 1, titre: 'Sas d\'1 heure', texte: 'Lumière tamisée orange, pas de lumière bleue. Bain tiède. Lecture ou musique calme. Routine IDENTIQUE chaque soir.', tag: 'Ce soir' },
      { id: 7, type: 'action', numero: 2, titre: 'Mélatonine', texte: 'Parle à ton pédiatre de la mélatonine (0.5 à 3mg) — recommandée par la HAS pour les troubles du sommeil TDAH.', tag: 'Au prochain RDV' },
      { id: 8, type: 'memo', titre: 'À retenir', items: ['70% des enfants TDAH : troubles du sommeil', 'Sas de décompression 1h : lumière orange, calme, pas d\'écran', 'Mélatonine : en parler au pédiatre'] },
    ],
    scenario: {
      titre: 'Scénario du jour',
      situation: 'Il est 21h30. Tu as dit "au lit" 8 fois. Il saute sur le canapé.',
      cerveau_enfant: 'Son cerveau est épuisé mais ne sait pas descendre en régime. Il compense la fatigue par l\'agitation.',
      cerveau_parent: 'Tu es épuisé aussi. Tu interprètes l\'agitation comme de la provocation. C\'est de la surcompensation.',
      demain: ['Sas à 19h30 : écrans coupés, lumière orange, musique calme', 'Bain tiède à 20h → pyjama → 1 histoire', 'Routine identique 7j/7, même le weekend'],
    },
    quiz: [
      { question: 'Pourcentage d\'enfants TDAH avec troubles du sommeil ?', choix: ['30%', '50%', '70%'], correct: 2, explication: '70% des enfants TDAH ont des troubles du sommeil — c\'est neurobiologique.' },
      { question: 'La lumière bleue avant le coucher...', choix: ['Aucun effet', 'Retarde la mélatonine déjà décalée', 'Fatigue l\'enfant'], correct: 1, explication: 'La lumière bleue inhibe la mélatonine, déjà retardée chez les TDAH.' },
      { question: 'Le sas de décompression dure...', choix: ['15 min', '30 min', '1 heure'], correct: 2, explication: 'Le cerveau TDAH a besoin d\'un long signal descendant. 1 heure est optimal.' },
    ],
  },

  {
    id: 13, module: 'C', moduleLabel: 'Situations du quotidien', moduleColor: '#D4537E',
    titre: 'La crise en public', sousTitre: 'Survivre sans culpabiliser',
    duree: '4 min', xp: 50, cortexImage: 'perplexe',
    cartes: [
      { id: 1, type: 'intro', emoji: '🏪', titre: 'Les regards des autres', texte: 'C\'est ton pire ennemi, pas ton enfant.', couleur: '#D4537E' },
      { id: 2, type: 'fact', label: 'Le piège', titre: 'Le cercle vicieux du public', texte: 'Plus tu stresses pour les autres, plus ton enfant capte ton stress, plus il crise. Les regards amplifient la spirale.', detail: 'Ta seule priorité : ton enfant, pas le public.', icone: '🔄' },
      { id: 3, type: 'cortex', citation: '"Les crises en public activent le système de menace sociale chez le parent. Ce stress parental amplifie la réactivité de l\'enfant — cercle vicieux."', source: 'Barkley, 2020' },
      { id: 4, type: 'contraste', titre: 'Face au jugement', gauche: { label: '❌ Ce qu\'on fait', texte: 'S\'excuser, avoir honte, gronder pour "l\'image".' }, droite: { label: '✓ Ce qu\'il faut', texte: 'Ignorer les regards, se concentrer uniquement sur l\'enfant.' } },
      { id: 5, type: 'verbatim', texte: '"Une dame m\'a dit \'il est mal élevé\'. J\'ai répondu : \'Il a un TDAH, et je gère du mieux que je peux.\' Ce jour-là, j\'ai arrêté d\'avoir honte."', auteur: 'Karine, maman de Yanis, 7 ans' },
      { id: 6, type: 'action', numero: 1, titre: 'Pendant la crise', texte: 'Éloigne-toi des regards si possible. Mets-toi à sa hauteur. Voix basse. Valide l\'émotion. C\'est tout.', tag: 'En situation' },
      { id: 7, type: 'action', numero: 2, titre: 'Après la crise', texte: 'Reconnecte avec du positif. NE REFAIS PAS le procès. Prépare une carte "Mon enfant a un TDAH" pour couper court.', tag: 'À préparer' },
      { id: 8, type: 'memo', titre: 'À retenir', items: ['Ta priorité = ton enfant, pas les regards', 'Ne JAMAIS s\'excuser pour le TDAH', 'Après la crise : reconnecter, pas accuser'] },
    ],
    scenario: {
      titre: 'Scénario du jour',
      situation: 'Supermarché. Il veut un jouet. Tu dis non. Il se jette par terre. Tout le monde regarde.',
      cerveau_enfant: 'La frustration est maximale. Le bruit, les lumières du magasin saturent déjà ses capteurs. Le "non" fait déborder le vase.',
      cerveau_parent: 'La honte te submerge. Tu hésites entre céder (pour que ça s\'arrête) et punir (pour montrer aux gens que tu gères).',
      demain: ['Avant le magasin : "On va acheter X et Y. Pas de jouet aujourd\'hui."', 'Système de jetons : s\'il aide pendant les courses, 2 jetons', 'Si crise : sortir du rayon, voix basse, valider, attendre'],
    },
    quiz: [
      { question: 'Pendant une crise en public, ta priorité est...', choix: ['Calmer pour les gens', 'Ton enfant uniquement', 'Le sortir immédiatement'], correct: 1, explication: 'Réagir pour le public au lieu de pour ton enfant amplifie la crise.' },
      { question: 'Après la crise, il faut...', choix: ['Expliquer ce qui était mal', 'Reconnecter sans refaire le procès', 'Punir'], correct: 1, explication: 'Le cortex préfrontal post-crise est fragile. La reconnexion le restabilise.' },
      { question: 'Face au jugement des inconnus...', choix: ['S\'excuser', 'Aucune excuse n\'est due', 'Tout expliquer'], correct: 1, explication: 'Le TDAH est neurologique. Tu n\'as pas à t\'excuser pour ça.' },
    ],
  },
]

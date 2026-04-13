export const LECONS = [
  // ================================================================
  // MODULE A — Comprendre le TDAH (#0D9373)
  // ================================================================
  {
    id: 1,
    module: 'A',
    moduleLabel: 'Comprendre le TDAH',
    moduleColor: '#0D9373',
    titre: 'Le cerveau TDAH — comment il fonctionne vraiment',
    duree: '8 min',
    status: 'done',
    sections: [
      {
        type: 'text',
        titre: 'Ce qui se passe',
        contenu: 'Le cerveau TDAH n\'est pas défaillant, il est différent. Le cortex préfrontal — siège de l\'attention, du contrôle des impulsions et de la planification — présente un retard de maturation de 2 à 3 ans par rapport à un cerveau neurotypique. Ce n\'est pas un manque de volonté, c\'est une différence neurologique documentée par l\'IRM.',
      },
      {
        type: 'cortex',
        contenu: 'Les études d\'imagerie cérébrale (Shaw et al., 2007) montrent que le cortex préfrontal des enfants TDAH atteint sa maturité complète en moyenne à 21 ans, contre 18 ans pour les neurotypiques.',
      },
      {
        type: 'text',
        titre: 'Ce que ça change pour toi',
        contenu: 'Comprendre ça change tout. Ton enfant n\'est pas paresseux, il n\'est pas de mauvaise volonté. Son cerveau n\'a pas encore les outils pour faire ce qu\'on lui demande. Tu n\'es pas un mauvais parent non plus — tu gères une situation objectivement difficile.',
      },
      {
        type: 'verbatim',
        contenu: 'Le jour où j\'ai compris que mon fils ne POUVAIT pas, pas qu\'il ne VOULAIT pas — tout a changé pour moi. Ma colère s\'est transformée en empathie. — Sophie, maman de Théo, 9 ans',
      },
      {
        type: 'actions',
        titre: 'Ce que tu peux faire',
        items: [
          'Remplace "il pourrait faire des efforts" par "son cerveau n\'est pas encore équipé pour ça — je peux l\'aider"',
          'Explique à ton enfant (avec des mots simples) que son cerveau est différent, pas cassé',
          'Note 3 situations où tu t\'es énervé cette semaine — reformule-les avec "son cerveau ne peut pas encore..."',
        ],
      },
      {
        type: 'memo',
        items: [
          'Le TDAH = différence neurologique, pas manque de volonté',
          'Retard de maturation du cortex préfrontal : 2-3 ans',
          'Ton enfant ne PEUT pas, il ne refuse pas',
        ],
      },
    ],
    quiz: [
      {
        question: 'Le TDAH est principalement causé par...',
        choices: ['Un manque d\'éducation', 'Une différence neurologique du cortex préfrontal', 'Un excès de sucre'],
        correct: 1,
        explication: 'Le TDAH est une différence neurologique documentée, pas un problème d\'éducation.',
      },
      {
        question: 'Le cortex préfrontal d\'un enfant TDAH est en retard de...',
        choices: ['6 mois', '1 an', '2 à 3 ans'],
        correct: 2,
        explication: 'Les études IRM montrent un retard moyen de 2 à 3 ans dans la maturation du cortex préfrontal.',
      },
      {
        question: 'Ton enfant ne fait pas ses devoirs. C\'est parce qu\'il...',
        choices: ['Ne veut pas', 'Ne peut pas encore, son cerveau n\'est pas équipé', 'Veut te mettre en colère'],
        correct: 1,
        explication: 'Le TDAH affecte les fonctions exécutives — la capacité à démarrer une tâche, pas la motivation.',
      },
    ],
    xp: 50,
  },

  {
    id: 2,
    module: 'A',
    moduleLabel: 'Comprendre le TDAH',
    moduleColor: '#0D9373',
    titre: 'Les fonctions exécutives — le chef d\'orchestre en grève',
    duree: '10 min',
    status: 'done',
    sections: [
      {
        type: 'text',
        titre: 'Ce qui se passe',
        contenu: 'Les fonctions exécutives, c\'est le chef d\'orchestre du cerveau. Elles gèrent : démarrer une tâche, l\'organiser, maintenir l\'attention, inhiber les distractions, gérer le temps, réguler les émotions. Chez l\'enfant TDAH, ces fonctions sont déficitaires — pas absentes, juste moins efficaces.',
      },
      {
        type: 'cortex',
        contenu: 'Barkley (2015) décrit le TDAH comme un trouble des fonctions exécutives plutôt qu\'un trouble de l\'attention. L\'enfant peut se concentrer sur ce qui l\'intéresse (jeux vidéo) mais pas sur ce qu\'on lui demande — c\'est la dysrégulation de l\'attention, pas son absence.',
      },
      {
        type: 'text',
        titre: 'Ce que ça change pour toi',
        contenu: 'La phrase "il arrive à jouer des heures mais pas à faire 10 minutes de devoirs" a enfin une explication. Ce n\'est pas de la mauvaise foi. Les jeux vidéo offrent un feedback immédiat et constant — exactement ce dont le cerveau TDAH a besoin.',
      },
      {
        type: 'verbatim',
        contenu: 'Quand j\'ai compris que mon fils avait un problème de chef d\'orchestre dans son cerveau, j\'ai arrêté de me battre et j\'ai commencé à être son chef d\'orchestre externe. — Marine, maman de Jules, 11 ans',
      },
      {
        type: 'actions',
        titre: 'Ce que tu peux faire',
        items: [
          'Identifie 3 situations où ton enfant "sait mais ne fait pas" — c\'est son chef d\'orchestre qui est en grève',
          'Deviens son cerveau externe : annonce, répète, montre (ne dis pas juste "range ta chambre", fais-le avec lui les 3 premières fois)',
          'Découpe chaque tâche en étapes de 5 minutes maximum avec un timer visible',
        ],
      },
      {
        type: 'memo',
        items: [
          'Les fonctions exécutives = chef d\'orchestre du cerveau',
          'TDAH = le chef d\'orchestre est en grève, pas le musicien',
          'Feedback immédiat = clé pour maintenir l\'attention TDAH',
        ],
      },
    ],
    quiz: [
      {
        question: 'Pourquoi ton enfant peut jouer 3h mais pas faire 10 min de devoirs ?',
        choices: ['Il est paresseux', 'Le jeu offre un feedback immédiat constant', 'Il te manipule'],
        correct: 1,
        explication: 'Le cerveau TDAH a besoin de feedback immédiat. Les devoirs n\'en offrent pas — les jeux si.',
      },
      {
        question: 'Devenir le "cerveau externe" de ton enfant signifie...',
        choices: ['Faire ses devoirs à sa place', 'Structurer, annoncer, répéter et guider ses actions', 'Le punir plus fermement'],
        correct: 1,
        explication: 'Le cerveau externe compense le déficit de fonctions exécutives en apportant la structure de l\'extérieur.',
      },
      {
        question: 'La meilleure durée d\'une tâche pour un enfant TDAH est...',
        choices: ['1 heure avec pause toutes les 30 min', '5-10 minutes avec feedback immédiat', 'Aussi longtemps que nécessaire'],
        correct: 1,
        explication: 'Des tâches courtes avec feedback immédiat correspondent au besoin neurologique du cerveau TDAH.',
      },
    ],
    xp: 50,
  },

  {
    id: 3,
    module: 'A',
    moduleLabel: 'Comprendre le TDAH',
    moduleColor: '#0D9373',
    titre: 'L\'autorégulation émotionnelle — le tsunami intérieur',
    duree: '9 min',
    status: 'current',
    sections: [
      {
        type: 'text',
        titre: 'Ce qui se passe',
        contenu: 'Les enfants TDAH ressentent les émotions avec une intensité 3 fois supérieure aux neurotypiques. La frustration d\'un stylo qui tombe peut déclencher une tempête émotionnelle. Ce n\'est pas du théâtre — leur amygdale (centre des émotions) s\'emballe pendant que leur cortex préfrontal (le frein) est en retard. Résultat : l\'émotion prend tout.',
      },
      {
        type: 'cortex',
        contenu: 'Les recherches de Barkley montrent que les enfants TDAH ont une "réactivité émotionnelle" significativement plus élevée. Ce n\'est pas un trouble du comportement — c\'est un trouble de la régulation émotionnelle.',
      },
      {
        type: 'text',
        titre: 'Ce que ça change pour toi',
        contenu: 'Quand il explose pour "rien", ce n\'est pas du chantage. Son cerveau est en train de vivre un tsunami émotionnel. Ta réaction pendant la crise détermine si elle dure 5 ou 45 minutes.',
      },
      {
        type: 'verbatim',
        contenu: 'J\'ai réalisé que quand je criais en réponse à sa crise, je rajoutais du bois sur le feu. Le jour où j\'ai baissé la voix au lieu de la hausser, tout a changé. — Claire, maman d\'Emma, 8 ans',
      },
      {
        type: 'actions',
        titre: 'Ce que tu peux faire',
        items: [
          'Pendant une crise : baisse la voix, ralentis tes gestes, mets-toi physiquement à sa hauteur',
          'Valide l\'émotion avant de corriger le comportement : "Je vois que tu es très en colère" AVANT tout le reste',
          'Crée un "coin calme" (pas une punition) avec ses objets apaisants',
        ],
      },
      {
        type: 'memo',
        items: [
          'Émotions TDAH = intensité x3 des neurotypiques',
          'Amygdale emballe, cortex préfrontal freine trop tard',
          'Valider l\'émotion AVANT de corriger le comportement',
        ],
      },
    ],
    quiz: [
      {
        question: 'L\'intensité émotionnelle d\'un enfant TDAH comparé à un neurotypique est...',
        choices: ['Similaire', '2x plus forte', '3x plus forte'],
        correct: 2,
        explication: 'Les recherches montrent une réactivité émotionnelle environ 3x supérieure chez les enfants TDAH.',
      },
      {
        question: 'Pendant une crise de ton enfant, tu devrais...',
        choices: ['Hausser la voix pour qu\'il t\'entende', 'Baisser la voix et ralentir tes gestes', 'L\'ignorer complètement'],
        correct: 1,
        explication: 'S\'énerver amplifie la crise. Baisser la voix active le système parasympathique et aide à désamorcer.',
      },
      {
        question: 'Que faire en PREMIER pendant une crise ?',
        choices: ['Expliquer pourquoi son comportement est mauvais', 'Valider son émotion : "Je vois que tu es très en colère"', 'Le mettre dans sa chambre'],
        correct: 1,
        explication: 'Le cortex préfrontal est hors-ligne pendant la crise. La validation émotionnelle aide à le réactiver.',
      },
    ],
    xp: 50,
  },

  // ================================================================
  // MODULE B — Les 5 Piliers Barkley (#FF6B4A)
  // ================================================================
  {
    id: 4,
    module: 'B',
    moduleLabel: 'Les 5 Piliers Barkley',
    moduleColor: '#FF6B4A',
    titre: 'Tu es son cerveau externe',
    duree: '9 min',
    status: 'locked',
    sections: [
      {
        type: 'text',
        titre: 'Ce qui se passe',
        contenu: 'Barkley a identifié que la clé pour aider un enfant TDAH n\'est pas de le forcer à s\'organiser seul — c\'est de devenir temporairement son système d\'organisation. Le parent devient le cortex préfrontal externe de l\'enfant jusqu\'à ce que le sien soit mature.',
      },
      {
        type: 'cortex',
        contenu: 'Barkley (2013) : "Le TDAH est un trouble de la performance, pas de la connaissance. L\'enfant sait quoi faire mais ne peut pas le faire seul au bon moment. Le rôle du parent est de fournir les aides externes qui compensent ce déficit."',
      },
      {
        type: 'text',
        titre: 'Ce que ça change pour toi',
        contenu: 'Arrête d\'attendre qu\'il soit autonome pour des tâches que son cerveau ne peut pas encore gérer seul. Ce n\'est pas de la surprotection — c\'est de l\'adaptation neurologique.',
      },
      {
        type: 'verbatim',
        contenu: 'J\'ai arrêté de lui dire "tu devrais savoir le faire tout seul". Je suis devenu son GPS humain. Et paradoxalement, il a commencé à gagner en autonomie. — Thomas, papa de Romain, 10 ans',
      },
      {
        type: 'actions',
        titre: 'Ce que tu peux faire',
        items: [
          'Liste les 3 tâches où il échoue le plus souvent — ce sont celles où il a le plus besoin de toi comme cerveau externe',
          'Pour chaque tâche : sois présent physiquement, guide étape par étape, réduis progressivement ton aide sur 4 semaines',
          'Utilise des aides visuelles : checklist imagée, timer visible, pictogrammes pour la routine',
        ],
      },
      {
        type: 'memo',
        items: [
          'Cerveau externe = compenser le déficit de fonctions exécutives',
          'Présence physique + guidage étape par étape',
          'Réduire l\'aide progressivement sur 4 semaines',
        ],
      },
    ],
    quiz: [
      {
        question: 'Le rôle de "cerveau externe" du parent consiste à...',
        choices: ['Faire les choses à la place de l\'enfant', 'Fournir la structure et le guidage que son cerveau ne peut pas encore générer', 'Le surveiller en permanence'],
        correct: 1,
        explication: 'Le cerveau externe compense le déficit, il ne remplace pas l\'enfant — il l\'accompagne.',
      },
      {
        question: 'Pour enseigner une routine à un enfant TDAH, il faut...',
        choices: ['Le lui expliquer une fois clairement', 'Être présent et guider de manière répétitive pendant 4 semaines', 'Le punir quand il oublie'],
        correct: 1,
        explication: 'La répétition assistée sur 4 semaines crée de nouveaux circuits neuronaux. Une explication unique ne suffit pas.',
      },
      {
        question: 'Une aide visuelle (checklist, timer) est utile parce que...',
        choices: ['Elle remplace le parent', 'Elle externalise la mémoire de travail déficitaire', 'Elle montre qu\'on ne lui fait pas confiance'],
        correct: 1,
        explication: 'Les aides visuelles compensent le déficit de mémoire de travail — l\'une des fonctions exécutives les plus touchées.',
      },
    ],
    xp: 50,
  },

  {
    id: 5,
    module: 'B',
    moduleLabel: 'Les 5 Piliers Barkley',
    moduleColor: '#FF6B4A',
    titre: 'L\'immédiateté — le futur n\'existe pas',
    duree: '8 min',
    status: 'locked',
    sections: [
      {
        type: 'text',
        titre: 'Ce qui se passe',
        contenu: 'Le cerveau TDAH vit dans le présent immédiat. Les conséquences futures (dans 1 heure, demain, la semaine prochaine) n\'ont aucun impact sur son comportement maintenant. C\'est neurologique — le cortex préfrontal ne projette pas bien dans le futur.',
      },
      {
        type: 'cortex',
        contenu: 'Barkley : "Pour un enfant TDAH, le futur n\'existe pas neurologiquement. Seul le présent compte. Les récompenses et conséquences doivent être immédiates — pas dans 2 heures, pas ce soir, maintenant."',
      },
      {
        type: 'text',
        titre: 'Ce que ça change pour toi',
        contenu: '"Tu auras ta tablette ce weekend si tu te comportes bien cette semaine" ne fonctionne pas. Ton cerveau comprend ce contrat — le sien ne peut pas le traiter.',
      },
      {
        type: 'verbatim',
        contenu: 'J\'ai passé des années à promettre des récompenses futures. Quand j\'ai compris que son cerveau ne peut pas "attendre", j\'ai changé tout mon système. Les récompenses immédiates ont tout changé. — Amandine, maman de Noah, 7 ans',
      },
      {
        type: 'actions',
        titre: 'Ce que tu peux faire',
        items: [
          'Remplace toutes tes récompenses "futures" par des récompenses immédiates (dans les 5 minutes qui suivent)',
          'Crée un système de jetons : chaque bonne action = 1 jeton, 5 jetons = récompense choisie par lui',
          'Les conséquences négatives aussi doivent être immédiates et brèves (pas de punition qui dure 3 jours)',
        ],
      },
      {
        type: 'memo',
        items: [
          'Cerveau TDAH = vit dans le présent immédiat',
          'Récompenses et conséquences MAINTENANT, pas plus tard',
          'Système de jetons = outil puissant et immédiat',
        ],
      },
    ],
    quiz: [
      {
        question: 'Pourquoi les récompenses futures ne fonctionnent pas avec un enfant TDAH ?',
        choices: ['Il est trop impatient', 'Son cerveau ne peut pas traiter les conséquences futures', 'Il ne veut pas faire d\'efforts'],
        correct: 1,
        explication: 'Le cortex préfrontal immature ne projette pas efficacement dans le futur. La récompense future est invisible neurologiquement.',
      },
      {
        question: 'Le système de jetons est efficace parce que...',
        choices: ['Il est amusant', 'Il offre un feedback visuel et immédiat pour chaque bonne action', 'Ça le responsabilise'],
        correct: 1,
        explication: 'Les jetons sont une représentation visuelle et immédiate de la progression — exactement ce que le cerveau TDAH peut traiter.',
      },
      {
        question: 'Une bonne conséquence négative pour un enfant TDAH est...',
        choices: ['Une punition qui dure toute la semaine', 'Immédiate, brève et directement liée à l\'acte', 'Un long discours explicatif'],
        correct: 1,
        explication: 'Les conséquences longues perdent tout impact neurologique. L\'immédiateté et la brièveté sont clés.',
      },
    ],
    xp: 50,
  },

  {
    id: 6,
    module: 'B',
    moduleLabel: 'Les 5 Piliers Barkley',
    moduleColor: '#FF6B4A',
    titre: 'Le renforcement positif systématique',
    duree: '9 min',
    status: 'locked',
    sections: [
      {
        type: 'text',
        titre: 'Ce qui se passe',
        contenu: 'Un enfant TDAH reçoit en moyenne 20 000 messages négatifs de plus qu\'un enfant neurotypique avant l\'âge de 10 ans. Chaque critique érode son estime de soi. Le renforcement positif n\'est pas de la complaisance — c\'est la stratégie la plus efficace documentée par la science pour modifier un comportement.',
      },
      {
        type: 'cortex',
        contenu: 'Les études de Pfiffner & Haack (2014) montrent que le renforcement positif active le circuit dopaminergique déficitaire chez l\'enfant TDAH. C\'est littéralement le carburant qui manque à son cerveau pour fonctionner.',
      },
      {
        type: 'text',
        titre: 'Ce que ça change pour toi',
        contenu: 'Si tu passes 90% de ton temps à corriger et 10% à encourager, inverse le ratio. Le ratio magique de Barkley : 5 retours positifs pour 1 correction. Ça ne veut pas dire tout accepter — ça veut dire nourrir ce qui fonctionne.',
      },
      {
        type: 'verbatim',
        contenu: 'Mon psy m\'a dit : "Comptez vos remarques positives et négatives cette semaine." J\'avais 47 négatives pour 3 positives. J\'ai pleuré. Mais quand j\'ai inversé, mon fils est devenu un autre enfant en 3 semaines. — Nathalie, maman de Lucas, 8 ans',
      },
      {
        type: 'actions',
        titre: 'Ce que tu peux faire',
        items: [
          'Pendant 1 journée, note chaque commentaire positif ET négatif que tu fais à ton enfant — calcule le ratio',
          'Remplace "bravo" par du spécifique : "bravo d\'avoir rangé ton sac EN PREMIER ce matin, sans que je te le demande"',
          'Célèbre les micro-victoires : il a attendu 30 secondes sans bouger ? C\'est énorme pour un cerveau TDAH.',
        ],
      },
      {
        type: 'memo',
        items: [
          'Ratio Barkley : 5 positifs pour 1 correction',
          'Renforcement spécifique > "bravo" générique',
          'Célébrer les micro-victoires (30 sec d\'attente = victoire)',
        ],
      },
    ],
    quiz: [
      {
        question: 'Le ratio idéal de Barkley entre commentaires positifs et négatifs est...',
        choices: ['1 pour 1', '3 pour 1', '5 pour 1'],
        correct: 2,
        explication: 'Barkley recommande au minimum 5 retours positifs pour chaque correction.',
      },
      {
        question: 'Un bon renforcement positif est...',
        choices: ['"Bravo, t\'es un bon garçon"', '"Bravo d\'avoir rangé ton sac EN PREMIER ce matin"', '"Continue comme ça"'],
        correct: 1,
        explication: 'Le renforcement spécifique nomme l\'action exacte — l\'enfant comprend précisément ce qu\'il a bien fait.',
      },
      {
        question: 'Le renforcement positif active chez l\'enfant TDAH...',
        choices: ['Son ego', 'Son circuit dopaminergique déficitaire', 'Sa paresse'],
        correct: 1,
        explication: 'La dopamine est le neurotransmetteur déficitaire dans le TDAH. Le renforcement positif en stimule la production.',
      },
    ],
    xp: 50,
  },

  {
    id: 7,
    module: 'B',
    moduleLabel: 'Les 5 Piliers Barkley',
    moduleColor: '#FF6B4A',
    titre: 'La prévisibilité et les routines visuelles',
    duree: '8 min',
    status: 'locked',
    sections: [
      {
        type: 'text',
        titre: 'Ce qui se passe',
        contenu: 'Le cerveau TDAH est allergique à l\'imprévu. Chaque transition non préparée est une micro-crise potentielle. Les routines ne sont pas une prison — elles libèrent de l\'énergie mentale. Quand la séquence est automatique, le cortex préfrontal n\'a plus besoin de décider, et l\'enfant peut enfin fonctionner.',
      },
      {
        type: 'cortex',
        contenu: 'Les recherches de Rapport et al. (2013) montrent que les enfants TDAH avec des routines visuelles structurées ont 40% moins de comportements oppositionnels que ceux sans. La prévisibilité réduit l\'anxiété et le besoin de contrôle.',
      },
      {
        type: 'text',
        titre: 'Ce que ça change pour toi',
        contenu: 'Le chaos du matin, les crises aux transitions, les explosions quand on change de programme — tout ça se réduit drastiquement avec de la prévisibilité. Le Time Timer (timer visuel) est l\'outil le plus cité par les parents d\'enfants TDAH comme "changeur de vie".',
      },
      {
        type: 'verbatim',
        contenu: 'Depuis qu\'on utilise un planning visuel sur le frigo et le Time Timer, mon fils se prépare SEUL le matin. Ça fait un an qu\'on ne crie plus le matin. UN AN. — David, papa de Maxime, 9 ans',
      },
      {
        type: 'actions',
        titre: 'Ce que tu peux faire',
        items: [
          'Crée un planning visuel (avec images) pour la routine du matin et du soir — affiche-le à hauteur d\'enfant',
          'Utilise le Time Timer pour CHAQUE transition ("dans 5 minutes on arrête le jeu" + timer visible)',
          'Préviens toujours à l\'avance : "Dans 10 minutes...", "Dans 5 minutes...", "C\'est l\'heure"',
        ],
      },
      {
        type: 'memo',
        items: [
          'Prévisibilité = moins d\'anxiété = moins de crises',
          'Planning visuel > consignes orales',
          'Time Timer = rend le temps visible et concret',
        ],
      },
    ],
    quiz: [
      {
        question: 'Les routines visuelles réduisent les comportements oppositionnels de...',
        choices: ['10%', '25%', '40%'],
        correct: 2,
        explication: 'Les études montrent une réduction d\'environ 40% des comportements oppositionnels avec des routines visuelles.',
      },
      {
        question: 'Le Time Timer est efficace parce qu\'il...',
        choices: ['Fait peur à l\'enfant', 'Rend le temps visible et concret (le cerveau TDAH ne "voit" pas le temps)', 'Remplace le parent'],
        correct: 1,
        explication: 'Le temps est un concept abstrait que le cerveau TDAH gère mal. Le Time Timer le rend visuel et tangible.',
      },
      {
        question: 'Pour préparer une transition, il faut...',
        choices: ['Annoncer une seule fois clairement', 'Prévoir 3 étapes : dans 10 min, dans 5 min, c\'est l\'heure', 'Couper l\'activité sans prévenir'],
        correct: 1,
        explication: 'Les transitions graduelles (10min/5min/maintenant) laissent au cerveau TDAH le temps de se préparer au changement.',
      },
    ],
    xp: 50,
  },

  {
    id: 8,
    module: 'B',
    moduleLabel: 'Les 5 Piliers Barkley',
    moduleColor: '#FF6B4A',
    titre: 'Comportement ≠ Personne — protéger l\'estime de soi',
    duree: '7 min',
    status: 'locked',
    sections: [
      {
        type: 'text',
        titre: 'Ce qui se passe',
        contenu: 'L\'estime de soi des enfants TDAH est en moyenne 30% inférieure à celle des neurotypiques. Chaque "tu es insupportable", "tu es nul", "tu fais toujours n\'importe quoi" se grave dans son cerveau. Le TDAH est déjà un facteur de risque pour la dépression — l\'étiquetage parental l\'amplifie.',
      },
      {
        type: 'cortex',
        contenu: 'Barkley (2020) : "Séparer le comportement de la personne est la compétence parentale la plus protectrice pour l\'estime de soi de l\'enfant TDAH. Ne jamais dire \'tu es...\' — toujours dire \'ce que tu as fait...\'."',
      },
      {
        type: 'text',
        titre: 'Ce que ça change pour toi',
        contenu: 'C\'est un changement de langage subtil mais puissant. "Tu es méchant" détruit. "Ce que tu as fait a blessé ta soeur" enseigne. La nuance est que la première phrase attaque l\'identité, la seconde décrit un acte modifiable.',
      },
      {
        type: 'verbatim',
        contenu: 'Ma fille m\'a dit un jour : "Maman, je suis nulle en tout." Elle avait 7 ans. J\'ai réalisé que c\'est moi qui lui avais appris ça, mot par mot, crise après crise. Ça m\'a brisé le coeur — et ça m\'a changée. — Émilie, maman de Léa, 7 ans',
      },
      {
        type: 'actions',
        titre: 'Ce que tu peux faire',
        items: [
          'Bannis les phrases "tu es..." (nul, méchant, pénible) — remplace par "ce que tu as fait..."',
          'Après une crise, reconnecte avec du positif : "Tu as fait quelque chose de difficile, mais tu restes quelqu\'un de bien"',
          'Chaque soir, dis-lui une qualité spécifique que tu as observée dans la journée',
        ],
      },
      {
        type: 'memo',
        items: [
          '"Tu ES..." → attaque l\'identité → détruit l\'estime',
          '"Ce que tu AS FAIT..." → décrit l\'acte → enseigne',
          '1 qualité spécifique chaque soir = reconstruction',
        ],
      },
    ],
    quiz: [
      {
        question: 'L\'estime de soi des enfants TDAH est en moyenne...',
        choices: ['Normale', '15% inférieure', '30% inférieure'],
        correct: 2,
        explication: 'Les études montrent une estime de soi en moyenne 30% plus basse, aggravée par les retours négatifs constants.',
      },
      {
        question: 'Au lieu de "tu es méchant", il faut dire...',
        choices: ['"Tu n\'es pas gentil"', '"Ce que tu as fait a blessé ta soeur"', 'Rien, ignorer'],
        correct: 1,
        explication: 'Décrire l\'acte (modifiable) plutôt qu\'étiqueter la personne (fixe) protège l\'estime de soi et enseigne.',
      },
      {
        question: 'Dire une qualité spécifique chaque soir sert à...',
        choices: ['Le gâter', 'Reconstruire l\'estime de soi endommagée par 20 000 messages négatifs', 'Éviter les conflits'],
        correct: 1,
        explication: 'Chaque retour positif spécifique contrebalance les milliers de messages négatifs reçus quotidiennement.',
      },
    ],
    xp: 50,
  },

  // ================================================================
  // MODULE C — Situations du quotidien (#D4537E)
  // ================================================================
  {
    id: 9,
    module: 'C',
    moduleLabel: 'Situations du quotidien',
    moduleColor: '#D4537E',
    titre: 'Le matin — sortir de la maison sans crier',
    duree: '8 min',
    status: 'locked',
    sections: [
      {
        type: 'text',
        titre: 'Ce qui se passe',
        contenu: 'Le matin est le moment le plus critique de la journée TDAH. Le cerveau vient de se réveiller, la dopamine est au plus bas, les fonctions exécutives tournent au ralenti. Demander à un enfant TDAH de s\'habiller, déjeuner, se brosser les dents et préparer son sac en 30 minutes, c\'est comme demander à quelqu\'un de courir un marathon au réveil.',
      },
      {
        type: 'cortex',
        contenu: 'Les niveaux de cortisol (hormone du stress) sont plus élevés le matin chez les enfants TDAH. Le matin est neurochimiquement le pire moment pour exiger de l\'autonomie. La routine visuelle compense ce déficit temporaire.',
      },
      {
        type: 'text',
        titre: 'Ce que ça change pour toi',
        contenu: 'Ton enfant n\'est pas "lent" le matin par paresse. Son cerveau démarre littéralement plus lentement. Adapter la routine matinale, c\'est accepter cette réalité et travailler avec elle plutôt que contre elle.',
      },
      {
        type: 'verbatim',
        contenu: 'On hurlait tous les matins. Depuis qu\'on a mis la checklist visuelle et qu\'on se lève 15 minutes plus tôt, c\'est un autre monde. Mon fils est même fier de cocher ses étapes. — Virginie, maman d\'Arthur, 8 ans',
      },
      {
        type: 'actions',
        titre: 'Protocole matin en 5 étapes',
        items: [
          'Prépare le maximum la veille au soir : vêtements sortis, sac prêt, table du petit-déjeuner mise',
          'Réveille-le 15 min avant l\'heure "nécessaire" — son cerveau a besoin de ce buffer',
          'Checklist visuelle à hauteur d\'enfant : 1.M\'habiller 2.Déjeuner 3.Brosser les dents 4.Sac 5.Chaussures',
          'Time Timer visible pour chaque bloc (10 min habillage, 15 min déjeuner)',
          'Récompense immédiate si tout est fait à temps : 5 min de jeu libre avant de partir',
        ],
      },
      {
        type: 'memo',
        items: [
          'Le matin = cerveau au ralenti, dopamine au plus bas',
          'Préparer la veille + 15 min de buffer = sérénité',
          'Checklist visuelle + Time Timer = autonomie guidée',
        ],
      },
    ],
    quiz: [
      {
        question: 'Pourquoi le matin est-il si difficile pour un enfant TDAH ?',
        choices: ['Il est capricieux', 'Son cerveau démarre plus lentement (dopamine basse, cortisol élevé)', 'Il ne veut pas aller à l\'école'],
        correct: 1,
        explication: 'Le matin est neurochimiquement le pire moment pour un cerveau TDAH. C\'est physiologique, pas volontaire.',
      },
      {
        question: 'La première étape du protocole matin est...',
        choices: ['Crier plus fort', 'Préparer le maximum la veille au soir', 'Supprimer le petit-déjeuner pour gagner du temps'],
        correct: 1,
        explication: 'Éliminer les décisions du matin en préparant la veille réduit la charge cognitive au moment le plus vulnérable.',
      },
      {
        question: 'La récompense "5 min de jeu libre" fonctionne parce que...',
        choices: ['Ça le motive à se dépêcher', 'C\'est immédiat et concret — exactement ce que le cerveau TDAH peut traiter', 'C\'est une bonne habitude'],
        correct: 1,
        explication: 'La récompense immédiate exploite le fonctionnement neurologique du cerveau TDAH qui ne traite que le présent.',
      },
    ],
    xp: 50,
  },

  {
    id: 10,
    module: 'C',
    moduleLabel: 'Situations du quotidien',
    moduleColor: '#D4537E',
    titre: 'Les devoirs — 45 minutes maximum',
    duree: '9 min',
    status: 'locked',
    sections: [
      {
        type: 'text',
        titre: 'Ce qui se passe',
        contenu: 'Les devoirs sont le champ de bataille numéro un des familles TDAH. L\'enfant a déjà épuisé toute son énergie de fonctions exécutives à l\'école. Lui demander de se concentrer encore en rentrant, c\'est comme demander à un marathonien de refaire 10 km "parce que c\'est important".',
      },
      {
        type: 'cortex',
        contenu: 'Les études montrent que la capacité attentionnelle d\'un enfant TDAH chute de 50% entre 16h et 18h. Barkley recommande un maximum de 45 minutes de devoirs (primaire) et des sessions de 10-15 minutes avec pauses obligatoires.',
      },
      {
        type: 'text',
        titre: 'Ce que ça change pour toi',
        contenu: 'Si les devoirs durent 2 heures chaque soir avec des larmes et des cris, le problème n\'est pas ton enfant — c\'est le format. Découpe, raccourcis, aménage. Un enfant qui apprend dans le calme en 45 min retient plus qu\'un enfant qui souffre pendant 2h.',
      },
      {
        type: 'verbatim',
        contenu: 'On passait 2h30 sur les devoirs chaque soir. On finissait tous en larmes. Depuis qu\'on fait 3 sessions de 12 min avec pause jeu entre chaque, c\'est fait en 45 min et il retient mieux. — Sandrine, maman de Mathis, 10 ans',
      },
      {
        type: 'actions',
        titre: 'Ce que tu peux faire',
        items: [
          'Maximum 45 minutes de devoirs (primaire). Au-delà, contacte l\'enseignant pour adapter',
          'Fractionne en sessions de 10-15 minutes avec 5 minutes de pause active entre chaque',
          'Commence par la matière la plus difficile (quand l\'énergie est encore là), finis par la plus facile',
        ],
      },
      {
        type: 'memo',
        items: [
          '45 min maximum — au-delà, la qualité d\'apprentissage chute',
          'Sessions de 10-15 min + pauses de 5 min',
          'Difficile d\'abord, facile ensuite',
        ],
      },
    ],
    quiz: [
      {
        question: 'La durée max recommandée pour les devoirs d\'un enfant TDAH (primaire) est...',
        choices: ['2 heures', '1 heure', '45 minutes'],
        correct: 2,
        explication: 'Au-delà de 45 minutes, la capacité attentionnelle est épuisée et l\'apprentissage est contre-productif.',
      },
      {
        question: 'Pourquoi commencer par la matière la plus difficile ?',
        choices: ['Pour le punir', 'Parce que l\'énergie cognitive est encore disponible en début de session', 'Par habitude'],
        correct: 1,
        explication: 'Les fonctions exécutives sont au maximum en début de session et s\'épuisent rapidement.',
      },
      {
        question: 'Les pauses entre sessions de devoirs doivent être...',
        choices: ['Passées sur un écran', 'Actives (bouger, jouer) pendant 5 minutes', 'Le plus courtes possible'],
        correct: 1,
        explication: 'Le mouvement physique recharge les fonctions exécutives. Les écrans, non (ils captent l\'attention et rendent le retour aux devoirs plus difficile).',
      },
    ],
    xp: 50,
  },

  {
    id: 11,
    module: 'C',
    moduleLabel: 'Situations du quotidien',
    moduleColor: '#D4537E',
    titre: 'Les écrans — transitions et limites',
    duree: '8 min',
    status: 'locked',
    sections: [
      {
        type: 'text',
        titre: 'Ce qui se passe',
        contenu: 'Les écrans sont l\'activité où l\'enfant TDAH excelle — parce que les jeux vidéo et les vidéos offrent exactement ce que son cerveau cherche : stimulation intense, feedback immédiat, dopamine constante. Le problème n\'est pas les écrans en soi — c\'est la transition SORTIR des écrans qui déclenche les crises.',
      },
      {
        type: 'cortex',
        contenu: 'L\'hyperfocalisation sur les écrans est un symptôme TDAH, pas un choix. Le cerveau TDAH "verrouille" son attention sur la source de dopamine la plus intense. Arracher un enfant TDAH de son écran sans préparation, c\'est comme couper l\'oxygène de quelqu\'un.',
      },
      {
        type: 'text',
        titre: 'Ce que ça change pour toi',
        contenu: 'Arrêter de voir les écrans comme l\'ennemi. Ils sont un outil — et un levier de motivation. La clé est de préparer la transition à l\'avance et d\'utiliser le temps d\'écran comme récompense du système de jetons.',
      },
      {
        type: 'verbatim',
        contenu: 'J\'arrachais la tablette et ça finissait en crise. Maintenant j\'annonce 10 min avant, puis 5, puis 2. Il éteint lui-même. Ça a pris 2 semaines de pratique, mais maintenant c\'est automatique. — Laurent, papa d\'Ethan, 11 ans',
      },
      {
        type: 'actions',
        titre: 'Ce que tu peux faire',
        items: [
          'Annonce la fin à l\'avance : "Dans 10 minutes on éteint" → "Dans 5 minutes" → "C\'est l\'heure, tu éteins"',
          'Utilise le Time Timer posé à côté de l\'écran — visible en permanence',
          'Le temps d\'écran devient une récompense gagnée (système de jetons), pas un droit acquis',
        ],
      },
      {
        type: 'memo',
        items: [
          'Hyperfocalisation sur les écrans = symptôme TDAH, pas un choix',
          'Préparer les transitions : 10 min, 5 min, maintenant',
          'Écran = récompense gagnée via le système de jetons',
        ],
      },
    ],
    quiz: [
      {
        question: 'L\'hyperfocalisation sur les écrans chez l\'enfant TDAH est...',
        choices: ['Un caprice', 'Un symptôme neurologique (le cerveau verrouille la source de dopamine)', 'Un signe d\'addiction'],
        correct: 1,
        explication: 'L\'hyperfocalisation est un mécanisme neurologique du TDAH, pas un choix ou une addiction.',
      },
      {
        question: 'Pour préparer une transition écran, il faut...',
        choices: ['Couper l\'écran sans prévenir', 'Annoncer 10 min, 5 min, puis 2 min avant la fin', 'Négocier à chaque fois'],
        correct: 1,
        explication: 'Le cerveau TDAH a besoin de temps pour se "déverrouiller" de l\'hyperfocalisation. Les annonces progressives le permettent.',
      },
      {
        question: 'Le temps d\'écran devrait être...',
        choices: ['Illimité pour le récompenser', 'Une récompense gagnée via le système de jetons', 'Totalement interdit'],
        correct: 1,
        explication: 'Utiliser l\'écran comme récompense le transforme en levier de motivation positif.',
      },
    ],
    xp: 50,
  },

  {
    id: 12,
    module: 'C',
    moduleLabel: 'Situations du quotidien',
    moduleColor: '#D4537E',
    titre: 'Le coucher — créer un sas de décompression',
    duree: '8 min',
    status: 'locked',
    sections: [
      {
        type: 'text',
        titre: 'Ce qui se passe',
        contenu: 'Le coucher est souvent un enfer pour les familles TDAH. L\'enfant est épuisé mais surexcité (paradoxe typique du TDAH). Son cerveau ne sait pas "descendre en régime". Il a besoin d\'un sas de décompression — un rituel sensoriel qui signale au corps qu\'il est temps de dormir. Sans ce sas, il peut mettre 1h30 à s\'endormir.',
      },
      {
        type: 'cortex',
        contenu: 'L\'insomnie touche 70% des enfants TDAH. Le système de régulation veille/sommeil (noyau suprachiasmatique) est retardé de 1 à 2 heures chez les TDAH. La mélatonine naturelle est produite plus tard que chez les neurotypiques. Un rituel sensoriel abaissant aide à compenser.',
      },
      {
        type: 'text',
        titre: 'Ce que ça change pour toi',
        contenu: 'Si ton enfant ne dort pas avant 22h malgré un coucher à 20h30, ce n\'est pas de la rébellion. Son horloge biologique est décalée. Adapter le rituel et l\'environnement est plus efficace que répéter "dors !" (qui ne marche de toute façon pas).',
      },
      {
        type: 'verbatim',
        contenu: 'On a transformé la dernière heure avant le coucher : lumière tamisée orange, musique calme, bain tiède, lecture ensemble. En 2 semaines elle s\'endormait en 15 minutes au lieu de 90. — Céline, maman de Chloé, 9 ans',
      },
      {
        type: 'actions',
        titre: 'Ce que tu peux faire',
        items: [
          'Crée un sas d\'1 heure : lumière tamisée orange (pas de lumière bleue), bain tiède, lecture ou audio calme',
          'Écrans coupés au minimum 1h avant le coucher (la lumière bleue retarde encore plus la mélatonine)',
          'Discute avec ton pédiatre de la mélatonine (0.5 à 3mg) — recommandée par la HAS pour les enfants TDAH avec troubles du sommeil',
        ],
      },
      {
        type: 'memo',
        items: [
          '70% des enfants TDAH ont des troubles du sommeil',
          'Sas de décompression d\'1h : lumière orange, calme, pas d\'écran',
          'Mélatonine : en parler au pédiatre (recommandation HAS)',
        ],
      },
    ],
    quiz: [
      {
        question: 'Quel pourcentage d\'enfants TDAH a des troubles du sommeil ?',
        choices: ['30%', '50%', '70%'],
        correct: 2,
        explication: 'L\'insomnie touche 70% des enfants TDAH — c\'est neurobiologique, pas volontaire.',
      },
      {
        question: 'La lumière bleue des écrans avant le coucher...',
        choices: ['N\'a aucun effet', 'Retarde la production de mélatonine déjà décalée', 'Aide à fatiguer l\'enfant'],
        correct: 1,
        explication: 'La lumière bleue inhibe la mélatonine. Chez un enfant TDAH dont la mélatonine est déjà retardée, c\'est doublement problématique.',
      },
      {
        question: 'Le "sas de décompression" doit durer...',
        choices: ['15 minutes', '30 minutes', '1 heure'],
        correct: 2,
        explication: 'Le cerveau TDAH a besoin d\'un long signal descendant. 1 heure de transition progressive est optimale.',
      },
    ],
    xp: 50,
  },

  {
    id: 13,
    module: 'C',
    moduleLabel: 'Situations du quotidien',
    moduleColor: '#D4537E',
    titre: 'La crise en public — survivre et ne pas culpabiliser',
    duree: '7 min',
    status: 'locked',
    sections: [
      {
        type: 'text',
        titre: 'Ce qui se passe',
        contenu: 'La crise en public est le cauchemar de chaque parent TDAH. Ton enfant hurle au supermarché, se roule par terre au restaurant, court dans le magasin. Tu sens tous les regards. La honte te submerge. Mais la honte est ton pire ennemi — elle te pousse à réagir pour les autres, pas pour ton enfant.',
      },
      {
        type: 'cortex',
        contenu: 'Les crises en public activent le système de menace sociale chez le parent (peur du jugement). Ce stress parental amplifie la réactivité de l\'enfant (il capte ton stress). C\'est un cercle vicieux : plus tu stresses, plus il crise, plus les gens regardent, plus tu stresses.',
      },
      {
        type: 'text',
        titre: 'Ce que ça change pour toi',
        contenu: 'Tu n\'as PAS à t\'excuser auprès des inconnus. Tu n\'as PAS à rougir. Ton enfant a un trouble neurologique — pas un problème d\'éducation. Ta seule priorité pendant la crise : ton enfant, pas le regard des autres.',
      },
      {
        type: 'verbatim',
        contenu: 'Un jour au supermarché, une dame m\'a dit "il est mal élevé". J\'ai répondu : "Il a un TDAH, et je gère du mieux que je peux." Elle s\'est excusée. Ce jour-là, j\'ai arrêté d\'avoir honte. — Karine, maman de Yanis, 7 ans',
      },
      {
        type: 'actions',
        titre: 'Ce que tu peux faire',
        items: [
          'Pendant la crise : éloigne-toi des regards si possible, mets-toi à sa hauteur, voix basse, valide l\'émotion',
          'Après la crise (une fois le calme revenu) : reconnecte avec du positif, NE refais PAS le procès de ce qui s\'est passé',
          'Prépare une carte "Mon enfant a un TDAH" à montrer si quelqu\'un juge — ça coupe court sans t\'épuiser',
        ],
      },
      {
        type: 'memo',
        items: [
          'Ta priorité = ton enfant, pas le regard des autres',
          'Ne JAMAIS s\'excuser pour le TDAH de ton enfant',
          'Après la crise : reconnecter, pas faire le procès',
        ],
      },
    ],
    quiz: [
      {
        question: 'Pendant une crise en public, ta priorité est...',
        choices: ['Calmer la situation pour les gens autour', 'Ton enfant — pas le regard des autres', 'Le sortir immédiatement du lieu'],
        correct: 1,
        explication: 'Réagir pour les autres au lieu de pour ton enfant amplifie la crise. Focus sur lui, pas sur le public.',
      },
      {
        question: 'Après la crise, il faut...',
        choices: ['Expliquer longuement pourquoi c\'était mal', 'Reconnecter avec du positif sans refaire le procès', 'Le punir pour qu\'il retienne la leçon'],
        correct: 1,
        explication: 'Le cortex préfrontal post-crise est encore fragilisé. La reconnexion émotionnelle aide à le restabiliser.',
      },
      {
        question: 'Face aux regards et commentaires des inconnus...',
        choices: ['S\'excuser pour le comportement de l\'enfant', 'Aucune excuse n\'est due — le TDAH est un trouble neurologique', 'Expliquer le TDAH à chaque personne'],
        correct: 1,
        explication: 'Tu n\'as pas à t\'excuser pour une condition neurologique. Protéger ton énergie et celle de ton enfant est la priorité.',
      },
    ],
    xp: 50,
  },
]

// ═══ QUIZ — 5 quiz situationnels TDAH (15 questions au total) ═══
// Refonte v2 : on remplace les quiz "émotions" par des SITUATIONS du quotidien
// que les parents reconnaissent immédiatement.

export const QUIZ = [
  /* ═══════════════════════════════════════════════════════
   * QUIZ 1 — LES MATINS DE GUERRE
   * ═══════════════════════════════════════════════════════ */
  {
    id: 1,
    titre: 'Les matins de guerre',
    emoji: '🌅',
    sousTitre: "Lever, habillage, départ — chaque étape est un point de blocage",
    couleur: '#E85D5D',
    xp: 30,
    badge: '🌅 Maître des matins',
    video: { disponible: false, titre: 'Le matin chez Lucas' },
    questions: [
      {
        id: 'q1',
        type: 'situation',
        scenario: "Il est 7h45, vous devez partir dans 15 minutes. Votre enfant est encore en pyjama, il joue par terre et refuse de s'habiller. Vous sentez la tension monter.",
        question: 'Quelle est votre première réaction ?',
        options: [
          { id: 'a', text: "Je hausse le ton : « Habille-toi MAINTENANT, on va être en retard ! »", score: 1, feedback: "Réaction naturelle, mais le cerveau TDAH se braque face à la pression verbale. La voix qui monte = cortex qui se ferme." },
          { id: 'b', text: "Je m'approche, je me mets à son niveau et je lui donne UNE seule consigne : « Enfile ton pantalon. »", score: 3, feedback: "Parfait. Une consigne à la fois, contact visuel, voix calme. Le cerveau TDAH ne peut pas traiter 5 ordres en série, il a besoin de micro-objectifs." },
          { id: 'c', text: "Je prépare ses vêtements à côté de lui, sans rien dire, et j'attends 30 secondes.", score: 2, feedback: "Bonne approche. Réduire la charge cognitive en préparant l'environnement, le silence évite l'escalade. Manque juste l'amorce verbale finale." },
          { id: 'd', text: "Je le menace : « Si tu n'es pas habillé dans 2 minutes, pas d'écran ce soir. »", score: 0, feedback: "La menace à conséquence future ne fonctionne pas — le cerveau TDAH vit dans l'instant, pas dans 12h. Et tu installes une bataille quotidienne." }
        ]
      },
      {
        id: 'q2',
        type: 'situation',
        scenario: "8h05. Il a fini son bol de céréales il y a 10 minutes mais n'a pas pris une seule cuillère. Il fait des bruits de bouche, joue avec sa cuillère, fait tomber un grain par terre. L'horloge tourne. Vous lui avez déjà dit « mange » trois fois.",
        question: 'Quelle action concrète sera la plus efficace ?',
        options: [
          { id: 'a', text: "Je répète plus fort : « Hugo, MANGE. On n'a plus le temps. »", score: 1, feedback: "Hausser le ton ne déclenche pas l'action — ça déclenche la défense. La pression verbale isolée n'amorce rien sur un cerveau TDAH." },
          { id: 'b', text: "Je retire les distractions visuelles autour de son bol, je lui mets la cuillère dans la main et je dis : « Trois cuillères ensemble, on commence. »", score: 3, feedback: "Excellent. Tu as réduit le champ sensoriel, donné une consigne micro et physique. Le cerveau TDAH démarre quand l'objectif est minuscule et concret." },
          { id: 'c', text: "Je lui propose un défi avec un sablier visible : « On essaie de finir avant que le sable tombe ? »", score: 2, feedback: "Bonne idée — le timer externalise le temps que le cerveau TDAH ne perçoit pas, et le défi injecte de la dopamine dans une tâche ennuyeuse." },
          { id: 'd', text: "Je prends sa cuillère et je le fais manger moi-même comme un bébé, pour gagner du temps.", score: 0, feedback: "Compréhensible quand tu cours. Mais ça lui retire la capacité d'amorcer SEUL. À 8 ans, le message est aussi : « tu n'es pas capable »." }
        ]
      },
      {
        id: 'q3',
        type: 'situation',
        scenario: "8h25. Vous êtes dans la voiture, vous avez crié 3 fois pour qu'il monte. Il claque la portière, vous démarrez. À 200 mètres il dit : « J'ai oublié mon cartable. » Vous bouillonnez.",
        question: "Comment gérer ce moment où ta colère explose ?",
        options: [
          { id: 'a', text: "Je fais demi-tour en silence en serrant le volant. Je ne dis rien pour ne pas exploser.", score: 1, feedback: "Le silence tendu n'est pas neutre — il sent ta colère sans pouvoir réparer. Le malaise s'installe sans être nommé, et il l'encaisse seul." },
          { id: 'b', text: "Je m'arrête 30 secondes pour respirer 4-4-6 avant de redémarrer. Je dis : « On retourne le chercher. On respire toi et moi. »", score: 3, feedback: "Tu te régules d'abord pour ne pas amplifier sa honte. Tu acceptes l'erreur sans la dramatiser. Modèle parfait de réparation parentale par le calme." },
          { id: 'c', text: "Je lui dis : « Ce soir, on installe une checklist illustrée pour ton sac. On va trouver une solution ensemble. »", score: 2, feedback: "Tu transformes l'incident en système — l'oubli n'est pas un défaut moral mais un déficit de fonction exécutive à compenser, et tu lui montres la voie." },
          { id: 'd', text: "J'éclate : « C'est PAS VRAI ! Tu fais EXPRÈS pour me rendre folle ! »", score: 0, feedback: "Tu es à bout, c'est humain. Mais l'amygdale interprète « EXPRÈS » comme « je suis mauvais ». Et son cortex se ferme jusqu'au soir." }
        ]
      }
    ]
  },

  /* ═══════════════════════════════════════════════════════
   * QUIZ 2 — ÉCRANS & DEVOIRS
   * ═══════════════════════════════════════════════════════ */
  {
    id: 2,
    titre: "Et toi, c'est comment le soir ?",
    emoji: '🌙',
    sousTitre: 'Mini-coaching parent-enfant — 5 minutes',
    couleur: '#5D4192',
    xp: 30,
    badge: '🌙 Maître des soirs',
    video: { disponible: true, titre: 'Le soir chez Léo' },
    questions: [
      {
        id: 'q1',
        type: 'situation',
        scenario: "17h. Tu lui annonces qu'il est temps d'arrêter la tablette pour faire les devoirs. Il ne lève pas les yeux. Tu sais ce qui va arriver dans 30 secondes : crise.",
        question: 'Comment désamorces-tu la transition ?',
        options: [
          { id: 'a', text: "Je prends la tablette et je l'éteins : « C'est l'heure. On coupe. »", score: 1, feedback: "Couper net = sevrage dopaminergique brutal. La crise qui suit n'est pas un caprice, c'est un choc neurologique." },
          { id: 'b', text: "Je m'accroupis à côté de lui, je lui touche l'épaule pour capter son attention : « Dans 10 min on arrête. Je préviens à 5 puis à 1. » Et je pose un timer visible.", score: 3, feedback: "Le contact physique te rend visible AVANT l'arrêt. La triple annonce (10/5/1) laisse au cerveau le temps de désengager l'hyperfocus en douceur." },
          { id: 'c', text: "Je dis « 5 minutes » et je pars préparer ses cahiers, prête à proposer une activité physique courte juste après l'extinction.", score: 2, feedback: "Bien — préparer la suite anticipe le pic dopaminergique. Mais 5 minutes sans annonce intermédiaire reste un peu juste pour un cerveau TDAH." },
          { id: 'd', text: "Je lui arrache la tablette quand il tarde à répondre : « Tu m'écoutes pas, ça suffit ! »", score: 0, feedback: "L'arrachage active l'amygdale en mode survie. Ce n'est pas de la désobéissance — c'est un réflexe de sevrage que tu interprètes comme de l'insolence." }
        ]
      },
      {
        id: 'q2',
        type: 'situation',
        scenario: "Il fait ses devoirs depuis 25 minutes. Il s'agite sur sa chaise, dessine sur la table, te demande pour la 4e fois si c'est bientôt fini. Il reste un dernier exercice de math.",
        question: 'Quel levier active sa fin de session ?',
        options: [
          { id: 'a', text: "J'insiste : « Plus que 5 minutes, fais un effort, finis cet exercice. »", score: 1, feedback: "Le réservoir cognitif est vide. Forcer = larmes + zéro rétention. La fatigue cognitive après 25 min n'est pas négociable, elle est physiologique." },
          { id: 'b', text: "« On fait une pause de 3 minutes. Saute sur place 30 fois, puis on boucle l'exo. » Pause physique cadrée.", score: 3, feedback: "Pause active = redémarrage neurologique. 3 minutes de saut = ~15 minutes d'attention regagnée. C'est validé par les études sur le TDAH." },
          { id: 'c', text: "Je transforme le dernier exercice en jeu : tableau, voix rigolote, points à gagner. Je relance la dopamine.", score: 2, feedback: "La gamification réinjecte de la dopamine dans une tâche qui n'en produit plus. Le cerveau TDAH a besoin de jeu pour avancer en fin de session." },
          { id: 'd', text: "« Si tu ne finis pas, pas de tablette ce soir. À toi de choisir. »", score: 0, feedback: "Le chantage à conséquence future ne marche pas — il vit dans l'instant. Et il associera durablement « devoirs » à « punition »." }
        ]
      },
      {
        id: 'q3',
        type: 'situation',
        scenario: "Il a eu 2/20 à un contrôle. Il jette son cahier, déchire un coin de page et hurle : « Je suis nul, j'irai pas à l'école demain ! » Tu encaisses le choc.",
        question: 'Quelle est la première chose à faire ?',
        options: [
          { id: 'a', text: "« Mais non, tu n'es pas nul, tu es très intelligent. Allez, ça arrive, c'est rien. »", score: 1, feedback: "Minimiser l'émotion (« c'est rien ») l'efface au lieu de la valider. Il pense que tu n'as pas compris la douleur — donc qu'il est seul." },
          { id: 'b', text: "Je m'assois à côté en silence, je pose ma main sur son genou : « Je vois que tu es dévasté. C'est injuste quand tu as tant travaillé. »", score: 3, feedback: "Tu valides l'émotion AVANT toute solution. La connexion ouvre la fenêtre où il pourra t'entendre — plus tard. C'est l'ordre qui change tout." },
          { id: 'c', text: "« On range le cahier pour ce soir. On en reparle demain. Tu veux un goûter ? »", score: 2, feedback: "Bonne intuition — différer le débrief pour laisser le cortex se réguler. Mais nomme l'émotion d'abord, sinon il pense qu'il dérange." },
          { id: 'd', text: "« C'est parce que tu n'as pas assez révisé. Tu vois bien quand tu fais pas d'effort. »", score: 0, feedback: "Quand l'estime est déjà à terre, pointer le travail manquant l'écrase. Le cerveau TDAH fournit déjà 3x l'effort des neurotypiques pour le même résultat." }
        ]
      }
    ]
  },

  /* ═══════════════════════════════════════════════════════
   * QUIZ 3 — SORTIES & VIE SOCIALE
   * ═══════════════════════════════════════════════════════ */
  {
    id: 3,
    titre: "Et toi, quand tout change d'un coup ?",
    emoji: '🌪️',
    sousTitre: 'Mini-coaching parent-enfant — 5 minutes',
    couleur: '#C0506A',
    xp: 30,
    badge: "🌪️ Maître des imprévus",
    video: { disponible: true, titre: 'L\'imprévu chez Léo' },
    questions: [
      {
        id: 'q1',
        type: 'situation',
        scenario: "Supermarché. Caisse. Il veut des bonbons. Tu refuses. Il se jette par terre en hurlant. 4 personnes vous regardent, dont une dame qui chuchote à son mari.",
        question: 'Comment gères-tu ces 30 secondes-là ?',
        options: [
          { id: 'a', text: "Je lui chuchote : « Calme-toi, les gens nous regardent, tu me fais honte. »", score: 1, feedback: "La honte sociale ajoutée à la crise = double charge. Il n'a pas le cortex pour comprendre « les gens nous regardent » — c'est un concept abstrait inaccessible en crise." },
          { id: 'b', text: "Je l'éloigne physiquement de la caisse vers un coin du magasin, je m'accroupis, voix basse : « C'est dur d'entendre non. Je suis là. »", score: 3, feedback: "Bouger physiquement hors de la zone visible désamorce ta panique sociale ET son écran sensoriel. La validation peut alors être entendue." },
          { id: 'c', text: "Je termine mes courses très vite et je sors avec lui dans mes bras. On parlera dans la voiture.", score: 2, feedback: "Évacuer vite est valide quand la zone est insoutenable. Le calme reviendra dans la voiture, terrain neutre. Manque juste la validation sur le moment." },
          { id: 'd', text: "Je cède : « OK, juste cette fois. » Je prends les bonbons pour faire taire la crise.", score: 0, feedback: "Céder au pic de crise enseigne que la crise = jackpot. La règle « pas de bonbons » devient négociable. Tu paies cher demain ce que tu gagnes en silence aujourd'hui." }
        ]
      },
      {
        id: 'q2',
        type: 'situation',
        scenario: "Anniversaire chez ses cousins. Il s'isole dans un coin du salon, refuse de jouer avec les autres enfants. Il te tire la manche : « Maman, on rentre ? » Tu vois la mère de famille te jeter un regard.",
        question: 'Quelle approche choisis-tu ?',
        options: [
          { id: 'a', text: "« Allez, va jouer avec eux, tu vas t'amuser, c'est une fête. Lâche-toi un peu. »", score: 1, feedback: "Pousser dans le bain = saturation sensorielle garantie. La socialisation libre épuise le cerveau TDAH bien plus que le jeu structuré." },
          { id: 'b', text: "« Je vois que c'est trop pour toi. Tu veux qu'on s'asseye 10 minutes ensemble dans le canapé ? Après on décide. »", score: 3, feedback: "Tu valides la surcharge ET tu offres une porte de sortie graduée. Souvent 10 minutes de pause = retour serein dans le groupe avec les batteries refaites." },
          { id: 'c', text: "Je lui propose une mission claire : « Tu peux venir m'aider à servir les boissons aux autres ? »", score: 2, feedback: "Excellent — un rôle clair remplace le chaos des règles sociales invisibles. Il a une mission, donc une raison d'être là sans la pression de jouer." },
          { id: 'd', text: "« Tu es vraiment pénible, on est venus EXPRÈS pour ton cousin, fais un effort ! »", score: 0, feedback: "Il a 8 ans, il ne « fait pas exprès » d'être en surcharge sensorielle. Ce reproche encode qu'il est un fardeau pour les fêtes — il refusera la suivante." }
        ]
      },
      {
        id: 'q3',
        type: 'situation',
        scenario: "Sa petite sœur le tape pour la 3e fois en 10 minutes, juste pour le provoquer. Il finit par exploser et la pousse violemment contre le mur. Elle pleure, elle a un peu de sang sur la lèvre.",
        question: 'Que fais-tu en premier ?',
        options: [
          { id: 'a', text: "« Tu es plus grand, tu dois être plus patient ! Va dans ta chambre tout de suite. »", score: 1, feedback: "L'aînesse ne donne pas de cortex préfrontal en plus. La différence d'âge ne suffit pas à « gérer » seul, surtout avec un TDAH." },
          { id: 'b', text: "Je sépare les deux, je prends la petite avec moi pour la consoler. À l'aîné : « Je vais m'occuper d'elle. On parlera quand tout le monde sera calme. »", score: 3, feedback: "Sécurise d'abord, parle ensuite. La séparation désamorce immédiatement. Le débrief vient quand chacun est régulé — jamais à chaud." },
          { id: 'c', text: "Je valide : « Tu n'en peux plus qu'elle te tape, c'est ça ? » Puis : « Pousser n'est pas OK, on ne se fait pas mal. Va respirer 5 min dans ta chambre. »", score: 2, feedback: "Tu nommes le déclencheur (sœur qui tape) ET tu poses le cadre. C'est la justice qui restaure le lien — il sait que tu vois aussi ce que la petite fait." },
          { id: 'd', text: "« Encore toi ! Tu vas être puni, plus de tablette pendant une semaine. »", score: 0, feedback: "La punition disproportionnée masque le vrai problème : la sœur l'a harcelé. La règle « aîné toujours coupable » use sa loyauté familiale et nourrit la rancœur." }
        ]
      }
    ]
  },

  /* ═══════════════════════════════════════════════════════
   * QUIZ 4 — FINS DE JOURNÉE
   * ═══════════════════════════════════════════════════════ */
  {
    id: 4,
    titre: "Et toi, c'est comment les écrans et les devoirs ?",
    emoji: '📱',
    sousTitre: 'Mini-coaching parent-enfant — 5 minutes',
    couleur: '#F5A623',
    xp: 30,
    badge: '📱 Écrans & devoirs',
    video: { disponible: true, titre: "Les écrans chez Léo" },
    questions: [
      {
        id: 'q1',
        type: 'situation',
        scenario: "16h45. Tu le récupères à l'école. Dès qu'il monte en voiture il commence à râler, à crier sur son frère, à dire « je déteste l'école, j'irai plus jamais ».",
        question: 'Comment accueilles-tu cette décharge ?',
        options: [
          { id: 'a', text: "« Tu ne vas pas commencer dès la voiture, j'ai eu une journée moi aussi ! »", score: 1, feedback: "C'est l'écho de ta propre fatigue, c'est humain. Mais sa décharge n'est pas dirigée contre toi — c'est l'air qui sort de la cocotte minute après 6h d'inhibition." },
          { id: 'b', text: "« Je vois que c'était dur. On rentre, je te lâche 20 min seul avant le goûter. Je suis pas loin. »", score: 3, feedback: "Tu reconnais la surcharge et tu offres un sas avant tout dialogue. 20 min seul après l'école = retour à la base émotionnelle nécessaire pour le TDAH." },
          { id: 'c', text: "Je mets sa playlist préférée fort, je ne pose aucune question. Décompression sonore.", score: 2, feedback: "Le sensoriel choisi = canal de décompression sans mots. Très efficace, surtout quand le verbal est saturé après une journée de classe." },
          { id: 'd', text: "« Comment ça s'est passé ? T'as fait quoi en récré ? Et la maîtresse, elle t'a grondé ? »", score: 0, feedback: "L'interrogatoire post-école = pire moment. Le cortex est vide, les questions sont perçues comme des agressions. Attends 1h minimum." }
        ]
      },
      {
        id: 'q2',
        type: 'situation',
        scenario: "19h30. Tu lui demandes de mettre la table. Il fait semblant de ne pas entendre. Tu répètes 3 fois. Au 4e essai, il explose : « Pourquoi c'est TOUJOURS moi ?! »",
        question: 'Comment relances-tu la coopération ?',
        options: [
          { id: 'a', text: "« Parce que je te le demande. Maintenant. Sans discuter. »", score: 1, feedback: "L'autorité brute déclenche le mode défense. Et « sans discuter » ferme la fenêtre où il pourrait coopérer en se sentant entendu." },
          { id: 'b', text: "Je me rapproche, je lui touche l'épaule, j'attends qu'il me regarde : « Couteaux. Fourchettes. Verres. Trois choses, on chrono ensemble ? »", score: 3, feedback: "Trois actions micro + chrono externalisé = formule magique fin de journée. Le cerveau TDAH avance par micro-objectifs visibles, pas par grands ordres flous." },
          { id: 'c', text: "Je transforme en partage : « Si tu mets la table, je m'occupe du panier de linge. On a tous les deux fini. »", score: 2, feedback: "Le partage de charge le sort du sentiment d'injustice. Tu reconnais qu'il a fait sa journée aussi, ce qui désamorce le « toujours moi »." },
          { id: 'd', text: "« Tu sais quoi, t'as raison, je vais le faire moi-même. T'es jamais utile de toute façon. »", score: 0, feedback: "Phrase qui fait mal sur le moment ET dans 10 ans. La fatigue te fait dire des mots qui restent. Repose-toi avant de parler." }
        ]
      },
      {
        id: 'q3',
        type: 'situation',
        scenario: "21h15. Il devrait dormir depuis 30 minutes. Tu l'entends sauter sur le lit à l'étage. Il sort de sa chambre pour la 4e fois — « pour boire de l'eau », « pour te montrer un dessin ». Il est manifestement épuisé mais incapable de descendre.",
        question: 'Quelle réponse au 4e passage ?',
        options: [
          { id: 'a', text: "« RETOURNE AU LIT MAINTENANT, j'en peux PLUS de cette comédie ! »", score: 1, feedback: "Cri = pic de cortisol = adieu au sommeil pendant 1h supplémentaire. Et tu le sais — c'est l'épuisement qui parle, pas toi." },
          { id: 'b', text: "Je le ramène au lit en silence, lumière tamisée. Je pose une main sur son dos 2 minutes : « Je sais que c'est dur de descendre. Je suis là. »", score: 3, feedback: "Présence physique sans mots + pression douce = signal vagal qui active le système parasympathique. Il s'endort pour de vrai en 5-10 minutes." },
          { id: 'c', text: "« Une seule histoire courte, et après c'est fini. Tu choisis laquelle. » Cadre clair, fin négociée.", score: 2, feedback: "Une concession structurée vaut mieux qu'une bataille perdue. Le cadre est posé, l'enfant garde sa dignité. Et l'histoire active la voix, qui apaise." },
          { id: 'd', text: "« Si tu te lèves encore une fois, demain pas de dessin animé du matin. »", score: 0, feedback: "Le chantage du lendemain ne fonctionne pas — il vit dans l'instant. Et il intègre que tu deviens injuste à cause de la fatigue." }
        ]
      }
    ]
  },

  /* ═══════════════════════════════════════════════════════
   * QUIZ 5 — L'IMPRÉVU & LA FRUSTRATION
   * ═══════════════════════════════════════════════════════ */
  {
    id: 5,
    titre: "L'imprévu & la frustration",
    emoji: '🌪️',
    sousTitre: "Tout changement de programme = effondrement",
    couleur: '#7C5CBF',
    xp: 30,
    badge: '🌪️ Anti-crise frustration',
    video: { disponible: false, titre: 'Quand le programme change' },
    questions: [
      {
        id: 'q1',
        type: 'situation',
        scenario: "Tu lui annonces que sa séance ciné prévue samedi est annulée — ses cousins sont malades. Il fond en larmes, hurle « C'EST PAS JUSTE ! » et claque la porte de sa chambre.",
        question: 'Comment accompagnes-tu la déception ?',
        options: [
          { id: 'a', text: "« C'est juste une séance ciné, calme-toi. On ira la semaine prochaine ! »", score: 1, feedback: "Tu compares avec ton échelle d'adulte. Pour son cerveau TDAH, l'attente d'un événement plaisant a câblé toute la dopamine sur ce moment précis." },
          { id: 'b', text: "Je le rejoins, je m'assois par terre devant sa porte. Pas un mot. J'attends qu'il vienne.", score: 3, feedback: "Présence silencieuse = ancrage. Pas de solution, pas de relativisation. Juste être là quand il sortira. C'est ça la sécurité affective." },
          { id: 'c', text: "« Je vois que c'est une vraie déception. C'est dur quand un truc qu'on attendait s'annule. »", score: 2, feedback: "Validation pure, sans « mais ». La légitimité de la déception accélère la digestion émotionnelle. Tu peux ajouter la présence physique pour aller plus loin." },
          { id: 'd', text: "« Mais arrête, c'est ridicule, c'est PAS la fin du monde ! »", score: 0, feedback: "Pour lui, c'EST la fin du monde — l'intensité émotionnelle est x3 dans le TDAH. Lui dire « c'est rien » lui apprend qu'il dérange à ressentir trop." }
        ]
      },
      {
        id: 'q2',
        type: 'situation',
        scenario: "Tu lui dis « non » pour la 3e tablette de la journée. Il se met à pleurer, à supplier, à négocier pendant 10 minutes. « Allez 5 minutes, juste 5 minutes ! » Tu sens ta volonté flancher.",
        question: 'Comment tiens-tu la limite sans exploser ?',
        options: [
          { id: 'a', text: "Je cède : « Bon, juste 15 minutes, mais c'est la dernière fois. »", score: 1, feedback: "Céder sous la pression installe la négociation comme stratégie gagnante. Demain ce sera 15 min de plus à chaque fois — et tu seras toujours plus épuisée." },
          { id: 'b', text: "Je maintiens calmement et je valide : « Je sais que c'est dur d'entendre non. Le non reste. Je vais préparer le goûter, tu viens si tu veux. »", score: 3, feedback: "Le « non » calme et constant est plus rassurant qu'un « non » criant. Le cerveau TDAH a un besoin vital de cadres prévisibles, même quand il les conteste." },
          { id: 'c', text: "Je change de pièce, je lance une autre activité (musique, bricolage), je désamorce sans confrontation directe.", score: 2, feedback: "Sortir du conflit en redirigeant vers du nouveau marche très bien quand la confrontation directe est explosive. La dopamine se fixe sur la nouvelle source." },
          { id: 'd', text: "« Je T'AI DIT NON, tu vas arrêter tes caprices oui ?! »", score: 0, feedback: "Le « caprice » n'existe pas — c'est de la dysrégulation neurologique. Crier le « non » valide tes propres émotions, pas les siennes. Et il apprend que tu craques." }
        ]
      },
      {
        id: 'q3',
        type: 'situation',
        scenario: "Vous étiez au parc. Il faut rentrer dans 5 minutes pour le dîner. Tu le préviens. Il refuse, hurle « JE VEUX RESTER ! » et se jette dans le toboggan en boucle pour gagner du temps.",
        question: 'Comment fermes-tu la transition ?',
        options: [
          { id: 'a', text: "« Bon, encore 10 minutes alors. Mais après c'est fini, pour de vrai. »", score: 1, feedback: "Étirer la deadline déjà annoncée enseigne que tes annonces de transition ne sont pas fiables. Tu sapes ta crédibilité pour la prochaine fois." },
          { id: 'b', text: "« Trois descentes de toboggan, on compte ensemble, et on rentre. Tu choisis qui descend en premier ? »", score: 3, feedback: "Tu fermes la transition par un compte concret + un choix qui lui rend du contrôle. Trois descentes = un arrêt qui a du sens dans son cerveau, pas une coupure abstraite." },
          { id: 'c', text: "Je lui prends la main calmement et je décris ce qui vient : « On marche jusqu'à la voiture. À la maison, je te lance le ballon dans le jardin avant le dîner. »", score: 2, feedback: "Tu installes un pont vers la prochaine source de plaisir. Le cerveau TDAH se laisse partir plus facilement vers une autre dopamine déjà prévue." },
          { id: 'd', text: "« TANT PIS POUR TOI, je m'en vais sans toi, tu rentres tout seul ! »", score: 0, feedback: "Menace d'abandon = pic de cortisol pour un cerveau qui a déjà l'amygdale en alerte. Il te suivra en panique, pas en confiance — et la blessure restera." }
        ]
      }
    ]
  }
]

// Conservé pour compatibilité avec QuizDetail.jsx (anciens placeholders monstre).
// Les nouveaux quiz situationnels n'utilisent plus d'images de personnages.
export const MONSTRE_IMAGES = {}

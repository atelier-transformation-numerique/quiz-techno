# Auto-diagnostique compétances technos

Repo qui montre une poc pour une plateforme qui affiche un quiz et enregistre le résultat. Utilise le stack cloudflare.

## Stratégie dévelopement

Il est possible de diviser le développement de la platerforme et du contentu intéractif:

### Développement de la plateforme

- Landing page qui explique le fonctionnement de la plateforme
- Authentification via fournisseur d'idendité (Site atn, compte microsoft d'entreprise ou login social (google, facebook, etc))
- Servir les questions sous forme d'un quiz web. Enregistrer les résultats dans une bd. (D1 recommandé si utilise stack cloudflare)
- Page de résultats avec recommandations de formations/compétances à améliorer. /!\ Peu être compliqué selon méthodologie /!\
- Page admin pour éditer le quiz. Soit utiliser type question existant ou upload une page web embedded. Exposer api via postMessage pour poster résultat et unlock le bouton next.
- Page admin pour récupérer les réusltats à des fins de stat.

### Développement du contenu

- Une question peu être un type custom. Dans le paneau admin, on peu upload un zip qui contient un "mini" site web. Cette fonctionnalité est facile à intégrer dans la plateforme. (Même brio l'ont fait avec leur contenus custom)
- Important de définir l'api de la plateforme. (Communication via postMessage pour communiquer les réponses entrées et signaler la fin de la question)
- Permet de développer la plateforme et le contenu de manière indépendante.

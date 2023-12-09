---
runme:
  id: 01HH7AZ1KRA35421KVB85FFRAB
  version: v2.0
---

# My Secret Santa

1. [Aperçu du projet](#apercu)
2. [Lancer le projet en local](#projet)
3. [Stacks techniques](#tech)
4. [Palette](#color)
5. [Documentation](#doc)

   1. [User Flow](#flow)

6. [Auteurs](#autors)

## Description

![Texte alternatif](./public/assets/MOCKUP.png)

Secret Santa est un site web qui vous permet de créer et de répartir secrètement les participants de votre groupe et propose des idées cadeaux personnalisées pour rendre vos échanges de cadeaux encore plus spéciaux. Faites de la magie des fêtes une réalité en organisant des célébrations festives et pleines de surprises avec notre plateforme conviviale. Faites plaisir à vos proches en offrant des cadeaux qui montrent que vous les connaissez vraiment, le tout dans un esprit de mystère et de joie. Il utilise du JS, React, Node, ...

## Contributeurs

- Killian Barbarin [@kbarbarin](https://www.github.com/kbarbarin) - Lead Dev
- Hassan Iqbal [@Hassaniq94](https://www.github.com/Hassaniq94) - Dev Back
- Lucas Miranda [@mirandalucas52](https://www.github.com/mirandalucas52) - Designer
- Audrey Rasolonjatovo [@arasolonjatovo](https://www.github.com/arasolonjatovo) - CTO/Tech Lead
- Léo Sun [@Feydai](https://www.github.com/Feydai) - Dev Front

## Fonctionnalités

- **Fonctionnalité 1** : L'utilisateur est capable de se créer un compte et de pouvoir librement se connecter ou deconnecter de celui-ci.
- **Fonctionnalité 2** : L'utilisateur est capable de créer un événement auquel il peut inviter ses amis/famille/etc en ajoutant leur prénom ainsi que leur adresse mail. Il doit aussi préciser un nom pour cet evenement, une date et une description. Toutes les personnes invités excépté le créateur de l'évènement rçoit un email avec un lien qui redirige vers l'evenement et le profil de la personne concernée afin qu'elle puisse remplir son profil.
- **Fonctionnalité 3** : La personne invitée à un évènement peut renseigner son profil. Elle commence par remplir une question pour dire si elle ne souhaite pas tomber sur une personne lors du tirage aléatoire. Puis répond à un quiz sur les cadeaux qu'elle souhaiterait avoir et le prix maximum qu'elle souhaite mettre.
- **Fonctionnalité 4** : Si une personne ne souhaite pas tomber sur quelqu'un en particulier lors du tirage, elle peut le spécifier dans une question où elle selectionne le profil de la personne. Il faut savoir que cela n'exclue pas à 100% les chances de ne pas tomber sur cette personne pour éviter qu'une personne soit exclue par tout le monde et donc qu'elle ne soit associer à personne.
- **Fonctionnalité 5** : Afin de pouvoir éviter d'être decue lors de la distribution des cadeaux et aider les personnes à trouver un cadeau à des personnes qu'elles ne connaissent pas forcement, nous proposerons un quiz de 10 questions sur différentes catégories où tout le monde sera obligé de repondre afin de pouvoir déclencher le tirage au sort.
- **Fonctionnalité 6** : Tout le monde doit être associé à quelqu'un lors du tirage au sort. Pour cela il faut désigner un gifter et un gifted et ne pas oublier de prendre en compte si la personne a désigné quelqu'un sur qui elle ne souhaite pas tomber. Une fois le tirage au sort terminé, tous les participants et le créateur de l'évènement reçoivent un mail qui contient un lien qui redige vers une page de reveal.
- **Fonctionnalité 7** : L'envoi de mail doit être géré avec une API : EmailJS.
- **Fonctionnalité 8** : Pour aider les participants, après le reveal, apparait un bouton cliquable qui ramène vers une page qui contient des idées cadeaux qui peuvent plaire à la personne qui leur est assignée.

## Stacks techniques

- **Backend** : [Firebase](https://firebase.google.com/docs?gad_source=1&gclid=CjwKCAiAvdCrBhBREiwAX6-6UkbYsEHST7-r_Yl9NCtNi1q3dQLnCyY2lWpUArllexdYP_0f-9ECkhoCvKcQAvD_BwE&gclsrc=aw.ds&hl=fr)
- **Frontend** : [React](https://reactjs.org/)
- **BDD** : [Firestore](https://firebase.google.com/docs/firestore?hl=fr)
-  **Mailer** : [EmailJS](https://www.emailjs.com/docs/)

## Tools

- **CI/CD** : [GitHub Actions](https://github.com/features/actions)
- **Code Quality** : [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- **Prettier** : [Prettier](https://prettier.io/)
- **Hosting** : [Firebase Hosting](https://firebase.google.com/docs/hosting?hl=fr)
- __Git__ : [git flow](https://danielkummer.github.io/git-flow-cheatsheet/index.fr_FR.html)
- **Diagram** : [Mermaid](https://mermaid-js.github.io/mermaid/#/)

## Bonnes pratiques

- KISS
- DRY
- YAGNI

## Prérequis

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

## Installation

Cloner le projet

```bash {"id":"01HH7AZ1KRA35421KVB09G5ZW7"}
  git clone https://github.com/kbarbarin/secretSanta.git
```

Se rendre dans le dossier du projet

```bash {"id":"01HH7AZ1KRA35421KVB1XD752V"}
  cd secretSanta
```

Installer les dépendances

```bash {"id":"01HH7AZ1KRA35421KVB3H2956D"}
  npm install
```

Démarrer le serveur

```bash {"id":"01HH7AZ1KRA35421KVB5P8MV59"}
  npm run start
```

## Palette

| Couleur             | Hex                                                                | Aperçu
| ----------------- | ------------------------------------------------------------------ | -------------------- |
| Noir | #000000 | ![#000000](https://via.placeholder.com/10/000000?text=+)|
| Blanc | #FFFFFF | ![#FFFFFF](https://via.placeholder.com/10/FFFFFF?text=+)|
| Rouge | #ED1C24 | ![#ED1C24](https://via.placeholder.com/10/ED1C24?text=+)|
| Rouge Foncé | #D61920 | ![#D61920](https://via.placeholder.com/10/D61920?text=+)|
| Jaune | #FFDD64 | ![#FFDD64](https://via.placeholder.com/10/FFDD64?text=+)|
| Bleu clair | #F0FBFF | ![#F0FBFF](https://via.placeholder.com/10/F0FBFF?text=+)|
| Bleu | #A8D6ED | ![#A8D6ED](https://via.placeholder.com/10/A8D6ED?text=+)|

## Contribuer

Afin de contribuer au projet, vous devez quivre les étapes suivantes. Des règles de gestion étant appliquées à la branche principale, personne ne peut directemeng envoyer du code sur celle-ciet doit d'abord passer par un stade de vérification 

- Forker le projet
- Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
- Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
- Push sur la branche (`git push origin feature/AmazingFeature`)
- Ouvrir une Pull Request (merci e bien assigner **@arasolonjatovo** en Reviewer)

## Documentation

[Cahier des charges techniques](./docs/cdct.md)

## Licence

Ce projet est sous license [MIT](https://choosealicense.com/licenses/mit/)

## Remerciements

- Merci a toute l'équipe technique sans qui ce projet n'aurai pas pu voir le jour.
- Merci au designer qui a su capter toute l'essence du projet et faire en sorte de pouvoir créer un projet qui correspondait aux attentes du client.
- Merci aux utilisateurs du produit qui nous permmettent de pouvoir sans cesse améliorer le projet et continue de le faire vivre.


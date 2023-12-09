---
runme:
  id: 01HH7JA0382B74DEKY74C8QATE
  version: v2.0
---

# Cahier des Charges Techniques Ho-Ho!

- [Cahier des Charges Techniques](#cahier-des-charges-techniques)
   - [1. Introduction](#1-introduction)
      - [1.1 Objectif du Document](#11-objectif-du-document)
      - [1.2 Portée du Projet](#12-portée-du-projet)

   - [2. Spécifications Techniques](#2-spécifications-techniques)
      - [2.1 Architecture Système](#21-architecture-système)
         - [Exemple de diagramme d'architecture (mermaid)](#exemple-de-diagramme-darchitecture-mermaid)
         - [Exemple de diagramme de base de données (mermaid)](#exemple-de-diagramme-de-base-de-données-mermaid)

      - [2.2 Choix Technologiques](#22-choix-technologiques)
      - [2.3 Interfaces Système](#23-interfaces-système)
      - [2.4 Sécurité](#24-sécurité)

   - [3. Développement](#3-développement)
      - [3.1 Gestion de Version](#31-gestion-de-version)
      - [3.2 Normes de Codage](#32-normes-de-codage)
      - [3.3 Tests](#33-tests)

   - [4. Déploiement et Maintenance](#4-déploiement-et-maintenance)
      - [4.1 Environnements](#41-environnements)
      - [4.2 CI/CD](#42-cicd)
      - [4.3 Plan de Maintenance](#43-plan-de-maintenance)

   - [5. Documentation](#5-documentation)
      - [5.1 Documentation Technique](#51-documentation-technique)
      - [5.2 Documentation Utilisateur](#52-documentation-utilisateur)
      - [6. Features](#6-features)
         - [Exemple de plannification de taches](#exemple-de-plannification-de-taches)
            - [Liste des Fonctionnalités du Projet](#liste-des-fonctionnalités-du-projet)
            - [Temps Estimé par Tâches](#temps-estimé-par-tâches)
            - [Scope Défini](#scope-défini)
            - [Priorité Définie](#priorité-définie)
            - [Date de Fin](#date-de-fin)
               - [Exemple de diagramme de Gantt (mermaid)](#exemple-de-diagramme-de-gantt-mermaid)

   - [6. Glossaire](#6-glossaire)
   - [7. Annexes](#7-annexes)
   - [8. Conclusion](#8-conclusion)

## 1. Introduction

### 1.1 Objectif du Document

Ce document vise à définir de manière exhaustive les spécifications techniques du projet Ho-Ho!. Il sert de référence pour toutes les parties prenantes impliquées dans le développement, la mise en œuvre et la maintenance du projet.

### 1.2 Portée du Projet

Ho-ho! est un site web qui permet de répartir des paires lors de création d'un Secret Santa. Ce qui permet de maintenir l'effet de surprise et ne pas désigner une main innocente. Il permet asusi de pouvoir avoir de suggestions d'idées de cadeaux lorsque l'on ne sait pas quoi offrirà la personne qui nous est attribuée. Les publics cibles sont dans un premier temps les groupes d'amis, de familles et les entreprises qui souhaiteraient organiser des évènements lors des fêtes de fin d'année. 

## 2. Spécifications Techniques

### 2.1 Architecture Système

[![](https://mermaid.ink/img/pako:eNptkV1vgjAUhv9Kc67xAxAKXCxBcFOTJWZuWTLYRYVOG-UjbUnmxP--8qHZjHenT9--5z09J0iKlIIHW07KHXoN4xwhUW264yPjdEMEnRdCsnzb3P25faEkkX5ZdhghP2oJUuizYzRPu2IaXaxQ79UrguiJyXm1QX4iWZGLHvtoMHioV5XY1SjolS0KFqMgrNG0Ya373bw3QRssZMHpJWkYXdFt0q6zGiQdvXMmaY3C-71mGWGH5bp7NYvaI1qukb9a_BviTVCOggNL9jWaXa1Ag4xy9SZVf39qcAxyRzMag6fKlPB9DHF-VjpSyWJ9zBPwJK-oBlWZEklDRlSODLwvchCKliT_KIrsIqIpU9M9d7ttV9xKwDvBN3g6NocTjF2Mse2Ytu3YGhzBM3RzaFqObVl47LiGM8FnDX5a1_EQ6wa2xi7WTR0brm6efwHEk7DZ?type=png)](https://mermaid.live/edit#pako:eNptkV1vgjAUhv9Kc67xAxAKXCxBcFOTJWZuWTLYRYVOG-UjbUnmxP--8qHZjHenT9--5z09J0iKlIIHW07KHXoN4xwhUW264yPjdEMEnRdCsnzb3P25faEkkX5ZdhghP2oJUuizYzRPu2IaXaxQ79UrguiJyXm1QX4iWZGLHvtoMHioV5XY1SjolS0KFqMgrNG0Ya373bw3QRssZMHpJWkYXdFt0q6zGiQdvXMmaY3C-71mGWGH5bp7NYvaI1qukb9a_BviTVCOggNL9jWaXa1Ag4xy9SZVf39qcAxyRzMag6fKlPB9DHF-VjpSyWJ9zBPwJK-oBlWZEklDRlSODLwvchCKliT_KIrsIqIpU9M9d7ttV9xKwDvBN3g6NocTjF2Mse2Ytu3YGhzBM3RzaFqObVl47LiGM8FnDX5a1_EQ6wa2xi7WTR0brm6efwHEk7DZ)

[![](https://mermaid.ink/img/pako:eNqFkl9LwzAUxb9KuK-W0Tatq3kT9iIoiGUvUpAsvdZgm5T8kdXR727WbW7FgU_JPTnJ-V1udiB0jcBAtNzaleSN4V2lCJlqsrZoyG5fE3KDHZctI9YZqZqDpniHc8WiMOhKrhwv0Vqp1cOKEW4MHw4GL-vLG2OlznHPRtdeuN9EwR022gzzCNnxBtcvj_-h9EaKICnfbdAcJPeBc9csvjyznxC4C9aNd6GP-30Ps1bwC5V7qwPkPPiooxXX9L-guBWtt1cjem6cFLIPTPbiIGBDBB2aMJI6TG-irWBqrwIWtjU3nxVUagw-7p0uByWAOeMxAt_vmY_DBvbOWxvUkPGqdXcyYS2dNk_H37FfJguwHWyB0bhYLONbmiVJXmR5nNAIBmAJzRdFGhd5WsRpdpcsl2ME39Or8SLPaUopTfOsSLIkK8Yf8PvQxg?type=png)](https://mermaid.live/edit#pako:eNqFkl9LwzAUxb9KuK-W0Tatq3kT9iIoiGUvUpAsvdZgm5T8kdXR727WbW7FgU_JPTnJ-V1udiB0jcBAtNzaleSN4V2lCJlqsrZoyG5fE3KDHZctI9YZqZqDpniHc8WiMOhKrhwv0Vqp1cOKEW4MHw4GL-vLG2OlznHPRtdeuN9EwR022gzzCNnxBtcvj_-h9EaKICnfbdAcJPeBc9csvjyznxC4C9aNd6GP-30Ps1bwC5V7qwPkPPiooxXX9L-guBWtt1cjem6cFLIPTPbiIGBDBB2aMJI6TG-irWBqrwIWtjU3nxVUagw-7p0uByWAOeMxAt_vmY_DBvbOWxvUkPGqdXcyYS2dNk_H37FfJguwHWyB0bhYLONbmiVJXmR5nNAIBmAJzRdFGhd5WsRpdpcsl2ME39Or8SLPaUopTfOsSLIkK8Yf8PvQxg)

### 2.2 Choix Technologiques

- Langages de Programmation : JS
- Frameworks et Bibliothèques : React, Sass
- Base de Données : NoSQL, Firestore
- Outils de Développement : VSCode, Git



Le choix de JavaScript, Firestore, Firebase, React, et Sass repose sur des raisons pragmatiques et des avantages spécifiques.

JavaScript est largement utilisé pour le développement web côté client, offrant une syntaxe flexible et une grande communauté de développeurs. Firestore et Firebase fournissent une infrastructure de backend scalable, avec Firestore offrant une base de données NoSQL, une synchronisation en temps réel et une intégration harmonieuse avec Firebase.

React a été choisi pour son approche déclarative, sa gestion efficace de l'état, et sa popularité dans le développement d'interfaces utilisateur interactives. Sass, en tant que préprocesseur CSS, offre des fonctionnalités avancées telles que les variables et les mixins, facilitant la maintenance et l'organisation du code CSS.

L'ensemble de ces technologies a été sélectionné pour maximiser la productivité, la performance, et la facilité de maintenance tout en permettant un développement rapide et une expérience utilisateur optimale.

| Technologie           | Avantages                                      | Inconvénients                                 |
| --------------- | ---------------------------------------------- | --------------------------------------------- |
| JavaScript      | - Large adoption et communauté active           | - Gestion asynchrone peut être complexe       |
| Firestore       | - Modélisation flexible des données             | - Coûts associés et limites de calls                 |
| Firebase        | - Intégration facile avec d'autres services et rapidité    | - Dépendance à Google      |
| React           | - Développement via les composants et aisance chez tous les developpeurs      | - Courbe d'apprentissage pour les débutants   |
| Sass            | - Préprocesseur CSS offrant des fonctionnalités avancées | - Nécessite une étape de compilation         |

| Technologie | Documentation | Popularité | Performance | Connaissance | Total (sur 5) |
|-------------|---------------|------------|-------------|--------------|--------------|
| JavaScript  | 4             | 5          | 4           | 5            | 4.5        |
| Firestore   | 4             | 4          | 4           | 2            | 3.5     |
| Firebase    | 4             | 5          | 4           | 2            | 3.75       |
| React       | 5             | 5          | 4           | 4            | 4.5      |
| Sass        | 4             | 3          | 4           | 3            | 3.5       |

### 2.3 Interfaces Système

- **Email.js API**

L'API Email.js est un service permettant d'intégrer facilement la fonctionnalité d'envoi d'e-mails dans les applications web. Elle offre une interface simple et des fonctionnalités puissantes pour faciliter la gestion et l'envoi d'e-mails à partir d'applications côté client. Avec Email.js, les développeurs peuvent incorporer des fonctionnalités d'e-mailing sans avoir à mettre en place un serveur d'e-mails dédié.

## 3. Développement

### 3.1 Gestion de Version

Github sera utilisé comme outil de gestion de version. Pour pouvoir contribuer, chaque personne de la partie prenante se doit de suivre et de respecter les normes et stratégies de branching : Git flow.

| Branche                 | Description                                                   |
|-------------------------|---------------------------------------------------------------|
| prod                    | Dernier changement de code qui a été déployé en production   |
| main                    | Dernier changement de code qui a été fusionné. Ceci est la prochaine sortie |
| hotfix/nom-de-branche   | Branche utilisée pour les changements urgents qui ne peuvent pas attendre la prochaine sortie |
| features/nom-de-branche | Stade de développement d'une nouvelle fonctionnalité          |
| bugfix/nom-de-branche   | Utile pour fixer un bug. Contrairement à hotfix, les changements peuvent attendre la prochaine sortie |
| maintain/nom-de-branche | Utile pour la maintenance, le refactoring ou la mise à jour de version |

La branche main doit être considérée comme origin/master et sera la branche principale où le code source de HEAD reflète toujours un état avec les derniers changements de développement livrés pour la prochaine version. En tant que développeur, vous ferez des branchements et des fusions à partir de main.
Vous n’êtes pas autorisé à faire des fusions ou de travailler directement sur la branche main afin d’éviter tout problème de conflits. Pour pouvoir fusionner sur la branche principale, vous devez demander une revue de code à Audrey Rasolonjatovo (@arasolonjatovo). Pour cela, une fois avoir pousser votre branche, rendez vous sur https://github.com/kbarbarin/secretSanta/pulls. Un encadré vous proposera de comparer et fusionner votre branche “Compare & pull request”. Complétez les différents champs et en
 
haut à droite de votre page se trouvent les boutons d’assignement. Veuillez vous assigner sur ‘Assignees’ et assigner arasolonjatovo et appuyer sur ‘Create pull request’.

### 3.2 Normes de Codage

- **Variables**

Utilisez des noms de variables qui sont explicites et prononçables
Faciliter la lecture et la compréhension rapide de votre code, limitez les noms de variables trop floues ou incompréhensibles.

Bad practice

const yyyymmdstr = moment().format("YYYY/MM/DD");

Good practice

const currentDate = moment().format("YYYY/MM/DD");

- **Fonctions**
  
Arguments de fonctions
Limiter le nombre de paramètres de fonction est extrêmement important car cela facilite le test de votre fonction. En avoir plus de trois conduit à une explosion combinatoire où vous devez tester des tonnes de cas différents avec chaque argument séparé. Au maximum 2 ou moins.
Les fonctions doivent faire une seule chose
C'est de loin la règle la plus importante en ingénierie logicielle. Lorsque les fonctions font plus d'une chose, elles sont plus difficiles à composer, à tester et à raisonner. Alors on se cantonne à une seule chose par fonction.
Les noms de fonction doivent dire ce qu’elles font
Pour bien nommer vos fonctions, une seule règle pour le faire verbe + nom et être le plus explicite possible sur ce qu’elles font.
Bad practice
function addToDate(date, mois) { // ...
}
const date = new Date() ;
// Il est difficile de dire, à partir du nom de la fonction, ce qui est ajouté
addToDate(date, 1) ;
Good practice
function addMonthToDate(month, date) { // ...
}
const date = new Date() ; addMonthToDate(1, date) ;
Quelques conseils en plus
- Ne pas dupliquer son code. Il faut trouver un moyen de soit créer un composant s’il est trop répété à un endroit ou bien de créer une fonction et appeler setter fonction. DRY (Don’t Repeat Yourself) est votre ami...pas votre ennemi
- Faire attention à la dette de développement. Ne prenez pas de raccourcis et documentez votre code afin de ne pas rallonger le temps de compréhension des personnes qui repasseront sur votre code
  󰗨
󰗭

- Garder les choses simples. Pas besoin de rajouter du code pour rajouter du code et de compliquer les choses. Les choses simples sont les meilleures alors KISS (Keep It Simple & Stupid).
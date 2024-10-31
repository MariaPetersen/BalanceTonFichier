# BalanceTonFichier

**BalanceTonFichier** est une application web de stockage et de téléchargement de fichiers. Le projet permet aux utilisateurs de téléverser des fichiers, de les stocker et de les télécharger à volonté, tout en offrant une interface utilisateur moderne et réactive.

## Table des matières

- [Aperçu](#aperçu)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Installation](#installation)
- [Lancement du projet](#lancement-du-projet)
- [Développeurs](#développeurs)
- [Contributions](#contributions)
- [Licence](#licence)

---

## Aperçu

L'objectif de **BalanceTonFichier** est de fournir une solution simple et rapide pour gérer des fichiers en ligne. Ce projet est structuré en deux parties principales : un serveur backend qui gère le stockage des fichiers et un client frontend qui offre une interface utilisateur pour téléverser et télécharger les fichiers.

## Technologies

Le projet utilise les technologies suivantes :

- **React** : pour le frontend, permettant une interface utilisateur dynamique et réactive.
- **ExpressJs** : pour le backend, gérant les requêtes et les téléchargements.
- **TypeScript** : pour une meilleure gestion des types et la fiabilité du code.
- **Docker** : pour une conteneurisation de l'application et une portabilité optimale entre les environnements.

## Architecture

L'architecture du projet est la suivante :

```
BalanceTonFichier/
├── frontend/               # Application frontend en React
├── app/               # Serveur backend en ExpressJs
├── init/            # Fichier initialisation de la base de données
├── docker-compose.yml    # Configuration Docker pour orchestrer les conteneurs
├── Makefile              # Fichier de commandes make pour simplifier les opérations
├── .env.dist              # Fichiers de variables d'environnement exemple
└── README.md             # Documentation du projet
```
## Frontend

- Le frontend est construit avec React.
- Il permet aux utilisateurs de téléverser des fichiers via une interface utilisateur intuitive et créer un lien de téléchargement pour partager les fichiers.

## Backend

- Le backend est une API construite avec ExpressJs en TypeScript.
- Il gère le stockage des fichiers, les requêtes de téléchargement et les requêtes d'upload.

## Installation

```bash
git clone https://github.com/votre-utilisateur/balancetonfichier.git
```

## Lancement du projet

```
make start
````
### Accès à l'application 
Une fois le projet lancé, l'application sera accessible à l'adresse suivante :

Frontend : http://localhost:3001
Backend : http://localhost:8090

## Développeurs

Le projet est maintenu par l'équipe suivante :

- Audrey RASOLONJATOVO
- Lucas MIRANDA
- Maria PETERSEN

## Licence
Ce projet est sous licence MIT. Veuillez consulter le fichier LICENSE pour plus de détails.
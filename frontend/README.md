# Balance Ton Fichier - Frontend

## Description

Ce projet est la partie frontend de l'application **Balance Ton Fichier**, qui permet aux utilisateurs de gérer et partager des fichiers. L'application est construite avec React et utilise `react-router` pour la navigation.

## Technologies utilisées

- **React** : Bibliothèque JavaScript pour construire des interfaces utilisateur.
- **react-router-dom** : Pour la gestion de la navigation dans l'application.
- **Axios** : Pour effectuer des requêtes HTTP.

## Installation

1. Clone le dépôt :

   ```bash
   git clone https://github.com/MariaPetersen/BalanceTonFichier.git
   cd BalanceTonFichier/frontend
   ```

2. Installe les dépendances :

   ```bash
   npm install 
   ```

3. Démarre l'application :

   ```bash
   npm start
   ```

L'application sera accessible à l'adresse http://localhost:3001.

## Structure du projet

```
frontend/
├── public/             # Fichiers statiques
├── src/                # Code source de l'application
│   ├── components/     # Composants réutilisables
│   ├── pages/          # Pages de l'application
│   ├── hooks/          # Custom hooks
│   ├── context/        # State global avec Context API
│   ├── services/       # Appels API
│   ├── styles/         # Fichiers de styles
│   ├── assets/         # Images et autres assets
│   ├── App.js          # Composant principal
│   └── index.js        # Point d'entrée
├── .env                # Variables d'environnement
├── .env.dist           # Modèle du fichier de variables d'environnement
├── package.json        # Dépendances et scripts
└── README.md           # Documentation
````

## Auteurs

- Maria Petersen [@MariaPetersen](https://www.github.com/MariaPetersen)
- Lucas Miranda [@mirandalucas52](https://www.github.com/mirandalucas52)
- Audrey Rasolonjatovo [@arasolonjatovo](https://www.github.com/arasolonjatovo)
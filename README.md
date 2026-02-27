# DoIt - Application de gestion de tâches avec validation par photo

Application mobile **fullstack** de gestion de tâches avec système de rappels automatiques et validation par photo.

> **Projet fullstack** développé en suivant les documentations officielles de NestJS, Expo et Firebase, avec l'aide de l'IA pour l'architecture et les bonnes pratiques.

---

# 🚀 Stack technique

- **Frontend** : React Native + Expo
- **Backend** : NestJS + TypeScript
- **Base de données** : Firebase Firestore
- **Authentification** : Firebase Auth
- **Notifications** : Expo Push Notifications

---

# 📱 Fonctionnalités principales

- ✅ Authentification (inscription / connexion)
- ✅ Création et gestion de tâches
- ✅ Validation de tâches par photo
- ✅ Rappels automatiques progressifs (cron job)
- ✅ Notifications push (avec limitations iOS)
- ✅ Interface moderne et responsive

---

# 📂 Structure du projet

```
doit/
├── frontend/          # Application mobile React Native
│   └── README.md      # Documentation détaillée du frontend
├── backend/           # API REST NestJS
│   └── README.md      # Documentation détaillée du backend
└── README.md          # Ce fichier
```

---

# 📖 Documentation

- **[Frontend Documentation](./frontend/README.md)**  
  Architecture, composants et guide de développement mobile

- **[Backend Documentation](./backend/README.md)**  
  API endpoints, services et système de notifications

---

# 🏃 Démarrage rapide

## Backend

```bash
cd backend
npm install
npm run start:dev
```

Le serveur démarre sur :

```
http://localhost:3000
```

---

## Frontend

```bash
cd frontend
npm install
npx expo start
```

- Appuyez sur `i` pour iOS
- Appuyez sur `a` pour Android

---

# ⚙️ Configuration requise

## 🔐 Variables d'environnement

### Backend (`.env`)

```
PORT=3000
FIREBASE_API_KEY=your_api_key
FIREBASE_STORAGE_BUCKET=your_bucket
```

### Frontend (`.env`)

```
EXPO_PUBLIC_API_URL=http://localhost:3000
```

---

## 🔥 Firebase

- Projet Firebase configuré
- Fichier `firebase-service-account.json` dans `/backend`
- Firebase Auth activé
- Firestore activé

---

# ⚠️ Limitations actuelles

- ❌ Pas de licence Apple Developer :
  - Notifications push limitées sur iOS
  - Build sur iPhone physique impossible
  - Caméra non accessible sur simulateur

- 📸 Stockage des photos :
  - Actuellement en base64
  - À migrer vers Firebase Storage

- 🧪 Tests :
  - Non encore implémentés

---

# 🎯 Objectifs futurs

- Refactoring et décomposition du code frontend
- Migration du stockage des photos vers Firebase Storage
- Ajout de tests unitaires et e2e
- Optimisation des performances
- Obtention d'une licence Apple Developer pour déploiement iOS

---

# 🛠️ Développement

Ce projet est un exercice d'apprentissage du développement fullstack moderne, combinant :

- Architecture modulaire backend (NestJS)
- Développement mobile cross-platform (React Native / Expo)
- Services cloud (Firebase)
- Notifications push en temps réel

---

**Statut : 🚧 En développement actif**

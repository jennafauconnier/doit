# Backend - DoIt API

API REST développée avec **NestJS** pour l'application mobile DoIt.

> **Note** : Ceci est un premier projet de test pour me familiariser avec Nest.  
> J'ai suivi les guidelines de la documentation officielle de NestJS et Firebase, avec l'aide de l'IA pour structurer l'architecture et implémenter les fonctionnalités.

---

# 🎯 Ce qui a été implémenté

## 🏗️ Architecture NestJS

- **Structure modulaire** : séparation en modules (Auth, Tasks, Firebase)
- **Validation automatique** avec `class-validator` et `class-transformer`
- **Guards personnalisés** pour l'authentification Firebase
- **CORS activé** pour permettre les requêtes depuis l'app mobile
- **Configuration centralisée** avec `@nestjs/config`

---

## 🔐 Module d'authentification (`auth`)

- **Inscription**
  - Création d'utilisateur dans Firebase Auth
  - Stockage des données dans Firestore

- **Connexion**
  - Authentification via Firebase REST API

- **Vérification de token**
  - Validation des tokens JWT Firebase

- **Récupération du profil**
  - Endpoint `/auth/me` protégé

- **Enregistrement du push token**
  - Stockage du token Expo pour les notifications

---

## ✅ Module de tâches (`tasks`)

### CRUD complet

- Création de tâches
- Liste des tâches (filtrées par utilisateur)
- Détail d'une tâche
- Mise à jour (titre, description, statut)
- Suppression

### Validation par photo

- Upload de photo via `multipart/form-data`
- Stockage en base64 dans Firestore
- Marquage automatique comme complétée
- Envoi de notification push de confirmation

---

## 🔔 Système de rappels automatiques

### Service de rappels (`TasksReminderService`)

- Cron job exécuté toutes les 30 minutes
- Analyse des tâches non complétées
- Système de phases progressives :
  - **Early** (2h après création) → messages encourageants
  - **Medium** (6h après création) → messages motivants
  - **Urgent** (12h après création) → messages pressants
  - **Critical** (24h après création) → messages très insistants

- Tracking des rappels envoyés (compteur + timestamp)
- Messages motivationnels variés pour chaque phase

---

## 🔥 Service Firebase

- **Firebase Admin SDK** intégré

### Firestore

- Base de données NoSQL
- Collection `users` → profils utilisateurs + push tokens
- Collection `tasks` → tâches avec métadonnées

### Firebase Auth

- Gestion de l'authentification

### Firebase Storage

- Préparé pour le stockage de fichiers

### Notifications push

- Envoi via API Expo

---

## 🔒 Sécurité

- **FirebaseAuthGuard** : protection des routes avec vérification du token JWT
- **Validation des DTOs** : validation automatique des données entrantes
- **Isolation des données** : chaque utilisateur accède uniquement à ses propres tâches

---

# 🏗️ Structure du projet

```
backend/
├── src/
│   ├── auth/                         # Module d'authentification
│   │   ├── dto/                      # Data Transfer Objects
│   │   │   ├── login.dto.ts
│   │   │   ├── signup.dto.ts
│   │   │   └── push-token.dto.ts
│   │   ├── guards/
│   │   │   └── firebase-auth.guard.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── tasks/                        # Module de gestion des tâches
│   │   ├── dto/
│   │   │   ├── create-task.dto.ts
│   │   │   └── update-task.dto.ts
│   │   ├── tasks.controller.ts
│   │   ├── tasks.service.ts
│   │   ├── tasks-reminder.service.ts
│   │   ├── tasks-reminder-messages.ts
│   │   └── tasks.module.ts
│   ├── firebase/                     # Module Firebase
│   │   ├── firebase.service.ts
│   │   └── firebase.module.ts
│   ├── users/                        # Module utilisateurs (vide pour l'instant)
│   ├── app.module.ts                 # Module racine
│   └── main.ts                       # Point d'entrée
├── test-notifications.ts             # Script de test des notifications
├── test-notifications.sh             # Wrapper bash
└── firebase-service-account.json     # Clés Firebase Admin (à ne pas commit)
```

---

# 🔧 Technologies utilisées

- **NestJS v11**
- **Firebase Admin SDK**
- **Firestore**
- **TypeScript**
- **class-validator**
- **@nestjs/schedule** (cron jobs)
- **Multer** (upload de fichiers)

---

# 🚀 Démarrage

## ✅ Prérequis

- Node.js 18+
- Compte Firebase configuré
- Fichier `firebase-service-account.json`

---

## 📦 Installation

```bash
npm install
```

---

## ⚙️ Configuration

Créer un fichier `.env` à la racine :

```
PORT=3000
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
```

---

## ▶️ Lancement

```bash
# Mode développement (hot-reload)
npm run start:dev

# Mode production
npm run build
npm run start:prod
```

Le serveur démarre sur :

```
http://localhost:3000
```

---

# 📡 API Endpoints

## 🔐 Authentification (`/auth`)

- `POST /auth/signup` → Inscription
- `POST /auth/login` → Connexion
- `GET /auth/me` → Profil utilisateur (protégé)
- `POST /auth/push-token` → Enregistrer le token (protégé)

---

## ✅ Tâches (`/tasks`) — Toutes protégées

- `POST /tasks` → Créer une tâche
- `GET /tasks` → Liste des tâches
- `GET /tasks/:id` → Détail
- `PATCH /tasks/:id` → Mise à jour
- `DELETE /tasks/:id` → Suppression
- `POST /tasks/:id/validate` → Validation avec photo

---

# 🔔 Système de notifications

## Rappels automatiques

- Cron job → toutes les 30 minutes
- Logique progressive selon l'ancienneté
- Tracking des rappels
- Rotation aléatoire des messages

---

## 🧪 Script de test

```bash
npm run test:notifications
# ou
./test-notifications.sh
```

Le script :

- Demande l'email utilisateur
- Récupère le push token depuis Firestore
- Crée une tâche de test
- Envoie 10 notifications (1/minute)
- Permet de valider le système end-to-end

---

# ⚠️ Limitations connues

## 🔔 Notifications push

- Pas de licence Apple Developer
- Fonctionnent :
  - Simulateur iOS (locales uniquement)
  - Android (émulateur + physique)
  - Expo Go (limité)

Pour des push iOS complets → licence Apple Developer requise.

---

## 📸 Stockage des photos

- Actuellement en base64 dans Firestore
- Non optimal pour la production
- À migrer vers Firebase Storage
- Limite Firestore : 1MB par document

---

# 📚 Apprentissages et ressources

Projet construit avec :

- Documentation officielle NestJS
- Firebase Admin SDK Documentation
- Expo Push Notifications
- Aide de l'IA pour la structure

---

# 🔮 Améliorations futures

## 🏗️ Architecture

- Tests unitaires + e2e
- Logs structurés
- Documentation Swagger/OpenAPI
- Migration vers Firebase Storage

## 🚀 Fonctionnalités

- Partage de tâches
- Catégories / tags
- Statistiques avancées
- Rappels personnalisables

## ⚡ Performance

- Cache Redis
- Optimisation Firestore
- Pagination

## 🚢 Déploiement

- Docker
- CI/CD GitHub Actions
- Déploiement cloud (Railway, Render, AWS)

---

# 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests e2e
npm run test:e2e

# Coverage
npm run test:cov
```

---

# 📝 Notes de développement

- Le module `users` est préparé pour extension future
- `app.controller.ts` et `app.service.ts` sont les fichiers par défaut NestJS
- Les DTOs utilisent les décorateurs de validation
- Le guard Firebase vérifie automatiquement les tokens sur les routes protégées

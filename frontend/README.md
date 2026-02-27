# Frontend - DoIt App

Application mobile de gestion de tâches développée avec **React Native** et **Expo**.

---

## 🎯 Fonctionnalités implémentées

### 🔐 Authentification

- Inscription et connexion utilisateur
- Gestion sécurisée des tokens (Secure Storage)
- Protection des routes avec `AuthGate`
- Redirection automatique selon l'état d'authentification

### ✅ Gestion des tâches

- Liste des tâches avec filtres (toutes, en attente, complétées)
- Création de nouvelles tâches via modal
- Marquage des tâches comme complétées
- Statistiques en temps réel (tâches en attente / complétées)
- Détail de tâche avec possibilité d'ajout de photo de validation

### 📸 Validation par photo

- Écran dédié pour valider une tâche avec photo
- Sélection depuis la galerie ou prise de photo
- Prévisualisation avant envoi
- Upload de la photo au backend

### 👤 Profil utilisateur

- Affichage des informations utilisateur
- Menu de paramètres
- Déconnexion
- Bouton de test de notifications locales (fonctionnel)

### 🔔 Notifications

- Service de notifications configuré
- Notifications locales de test fonctionnelles
- Listeners pour gérer les notifications reçues et tapées

---

# 🏗️ Architecture

## 📂 Structure des dossiers

```
frontend/
├── app/                         # Routes Expo Router
│   ├── (auth)/                  # Groupe d'authentification
│   ├── (tabs)/                  # Navigation par onglets
│   ├── tasks/                   # Détails des tâches
│   └── validate/                # Validation par photo
├── components/                  # Composants réutilisables
│   ├── ui/                      # Composants UI de base
│   ├── tasks/                   # Composants liés aux tâches
│   └── profile/                 # Composants du profil
├── services/                    # Services API et utilitaires
│   ├── api/                     # Clients API (auth, tasks)
│   ├── storage/                 # Stockage sécurisé
│   └── notifications/           # Service de notifications
├── stores/                      # État global (Zustand)
│   ├── auth.store.ts            # État d'authentification
│   └── tasks.store.ts           # État des tâches
└── styles/                      # Design tokens et styles communs
```

---

## 🛠️ Technologies utilisées

- **React Native** avec **Expo**
- **Expo Router** pour la navigation
- **Zustand** pour la gestion d'état
- **React Native Paper** pour les composants UI
- **Axios** pour les appels API
- **Expo Secure Store** pour le stockage sécurisé
- **Expo Notifications** pour les notifications
- **Expo Image Picker** pour la sélection / prise de photos

---

# 🚧 Améliorations souhaitées

## 1. Refactoring et organisation du code

- Décomposer davantage les composants pour une meilleure maintenabilité
- Extraire la logique métier des composants vers des hooks personnalisés
- Séparer les styles inline en fichiers `.styles.ts` dédiés
- Créer des composants plus atomiques et réutilisables
- Améliorer la séparation des responsabilités

---

## 2. Notifications (limitation actuelle)

⚠️ **Pas de licence Apple Developer** : impossible de tester les notifications push réelles sur iOS

✅ **Bouton de test fonctionnel** : notifications locales testables via le bouton dans l'écran de profil

Les notifications push nécessitent un compte Apple Developer payant pour générer les certificats.

---

## 3. Build et déploiement

### 📱 Build sur téléphone physique

Nécessite une licence Apple Developer pour :

- Signer l'application iOS
- Accéder à la caméra native (limitation du simulateur)
- Tester les notifications push réelles
- Déployer sur TestFlight

---

# 🚀 Démarrage

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npx expo start
```

### Options de lancement

- Appuyer sur `i` pour iOS Simulator
- Appuyer sur `a` pour Android Emulator
- Scanner le QR code avec Expo Go sur un appareil physique

---

# 📝 Variables d'environnement

Créer un fichier `.env` à la racine du dossier `frontend` :

```
EXPO_PUBLIC_API_URL=http://localhost:3000
```

---

# 🔧 Configuration

## iOS (nécessite macOS)

- Xcode installé
- Simulateur iOS configuré
- ⚠️ Licence Apple Developer requise pour build sur appareil physique

## Android

- Android Studio installé
- Émulateur Android configuré
- Build sur appareil physique possible sans licence payante

---

# 📱 Fonctionnalités limitées en développement

## Simulateur iOS

- ❌ Caméra native non disponible (sélection galerie uniquement)
- ❌ Notifications push non testables sans certificats
- ✅ Notifications locales fonctionnelles

## Appareil physique (avec Expo Go)

- ✅ Caméra accessible
- ❌ Notifications push limitées
- ✅ Notifications locales fonctionnelles

## Build standalone (nécessite licence Apple)

- ✅ Toutes les fonctionnalités natives
- ✅ Notifications push complètes
- ✅ Caméra native
- ✅ Distribution TestFlight / App Store

---

# 📚 Prochaines étapes

- Refactoring du code pour améliorer la structure
- Obtenir une licence Apple Developer (99$/an) pour :
  - Tester sur appareil iOS physique
  - Configurer les notifications push
  - Distribuer l'application
- Optimiser les performances et l'expérience utilisateur
- Ajouter des tests unitaires et d'intégration

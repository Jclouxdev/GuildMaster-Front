# 🛡️ GuildMaster - Démo Front-End

## 🚀 Démarrage Rapide pour Démo

```bash
# Installer les dépendances (si ce n'est pas fait)
npm install

# Lancer l'application
npm run dev

# Ouvrir dans le navigateur
http://localhost:3000
```

## 🎯 Parcours de Démo Préparé

### 📋 Fonctionnalités Démontrables

✅ **Système d'authentification** avec 3 rôles :
- Guild Master (Thorgar) - `guildmaster@demo.com`
- Officier (Jaina) - `officer@demo.com`  
- Membre (Lyralei) - `member@demo.com`

✅ **Gestion des raids** complète :
- Visualisation des raids planifiés
- Création de nouveaux raids
- Inscription/désinscription
- Filtres et vues (liste/calendrier)

✅ **Système de notifications** temps réel :
- Rappels J-1 automatiques  
- Notifications d'inscriptions
- Mises à jour de roster
- Toasts interactifs

✅ **Interface utilisateur** moderne :
- Design responsive
- Navigation intuitive
- Feedback utilisateur
- États de chargement

### 🎪 Données de Démo Réalistes

**Raids Planifiés :**
- **Demain (18/09)** : Heroïque Nerub-ar Palace - 20h00
- **Jeudi (19/09)** : Initiation Ara-Kara - 21h00  
- **Vendredi (20/09)** : Mythique Nerub-ar Palace - 19h30
- **Samedi (21/09)** : Farm Héroïque - 14h00

**Personnages Disponibles :**
- Thorgar (Warrior Tank, 480 iLevel)
- Healbot (Priest Healer, 470 iLevel)
- Lyralei (Hunter DPS, 475 iLevel)
- Jaina (Mage DPS, 465 iLevel)

## 🎬 Workflow de Présentation

### 1. **Accueil & Introduction** (1-2 min)
- Présenter la plateforme
- Expliquer l'objectif : simplifier la gestion de guilde

### 2. **Connexion Démo** (1 min)
- Utiliser un compte prédéfini
- Redirection automatique

### 3. **Dashboard Raids** (2-3 min)
- Vue d'ensemble des événements
- **Notifications automatiques** apparaissent

### 4. **Création de Raid** (2-3 min)
- Formulaire guidé
- Feedback temps réel
- Confirmation par notification

### 5. **Inscription Raid** (2-3 min)
- Modal interactif
- Sélection de personnage
- Notifications de confirmation

### 6. **Système Notifications** (1-2 min)
- Rappels J-1
- Inscriptions temps réel
- Simulation WebSocket

## 🔥 Points Forts à Mettre en Avant

- **UX Pensée pour WoW** : Interface familière aux joueurs
- **Automatisation** : Rappels et notifications intelligents
- **Temps Réel** : Prêt pour intégration WebSocket
- **Multi-Rôles** : Gestion des permissions par rôle guilde
- **Responsive** : Fonctionne sur tous devices

## 🛠️ Architecture Technique

- **Frontend** : Next.js 15 + TypeScript + Tailwind CSS
- **State Management** : React Context + Custom Hooks
- **Notifications** : Toast System + Auto-dismiss
- **Routing** : App Router Next.js
- **UI Components** : Composants modulaires réutilisables

## 📱 Responsive & Accessible

- Design mobile-first
- Navigation clavier
- Contrastes WCAG conformes
- Animations fluides

## 🔮 Prochaines Étapes (Backend)

- API REST complète
- Base de données relationnelle
- Authentification JWT
- WebSocket temps réel
- Intégration Battle.net API
- Push notifications

---

**Durée totale démo : 10-12 minutes**
**URL de démo : http://localhost:3000**

*Ready pour impressionner ! 🚀*

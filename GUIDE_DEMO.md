# 🎯 Guide Parcours Démo GuildMaster - Session Présentation

## 🚀 Préparation (5 min avant)

### 1. Configuration Environnement
```bash
cd /home/jdev/DEV/guild_master_front
npm run dev
```
- Ouvrir l'application sur `http://localhost:3000`
- Préparer 2 onglets : un pour la démo, un de secours
- Vérifier que les données mock sont bien chargées

---

## 📋 PARCOURS DÉMO COMPLET (10-12 minutes)

### 🎪 **ÉTAPE 1 : INTRODUCTION** (1-2 min)
**PAGE :** Page d'accueil (`/`)

**CE QUE VOUS DITES :**
> "GuildMaster est une plateforme complète de gestion de guilde WoW. Elle permet d'organiser raids, gérer le roster, et maintenir la communication. Voyons le workflow principal."

**ACTIONS :**
1. Montrer brièvement la page d'accueil
2. Highlight les 4 features principales
3. Cliquer sur "Voir les raids" ou naviguer vers `/login`

---

### 🔐 **ÉTAPE 2 : CONNEXION** (1 min)
**PAGE :** Login (`/login`)

**CE QUE VOUS DITES :**
> "Pour la démo, j'ai préparé 3 comptes types : Guild Master, Officier, et Membre. Connectons-nous comme Guild Master."

**ACTIONS :**
1. Montrer les 3 comptes de démo disponibles
2. **CLIQUER** sur le compte "**Thorgar - Guild Master**"
3. Attendre la redirection automatique (1-2 sec)

**RÉSULTAT ATTENDU :**
- Redirection vers `/raids`
- **NOTIFICATION POPUP** automatique après 3 sec : *"Rappel Raid J-1 !"*

---

### ⚔️ **ÉTAPE 3 : VUE RAIDS** (2-3 min)
**PAGE :** Liste des raids (`/raids`)

**CE QUE VOUS DITES :**
> "Voici le dashboard des raids. On voit les événements à venir avec leurs statuts en temps réel."

**ACTIONS :**
1. **POINTER** le raid de demain soir : "Raid Heroïque - Nerub-ar Palace"
2. Expliquer les infos visibles : date, difficulté, participants
3. Mentionner les autres raids (mythique vendredi, initiation jeudi)
4. **ATTENDRE** la 2ème notification (après 8 sec) : *"Nouvelle inscription - Lyralei s'est inscrit(e)..."*

**RÉSULTAT ATTENDU :**
- Notifications automatiques pendant la navigation
- Vue d'ensemble des raids actifs

---

### 🛠️ **ÉTAPE 4 : CRÉATION DE RAID** (2-3 min)
**PAGE :** Créer un raid (`/raids/create`)

**CE QUE VOUS DITES :**
> "Créons un nouveau raid rapidement. Le système guide le Guild Master avec des champs intelligents."

**ACTIONS :**
1. Cliquer sur "**Créer un raid**"
2. **REMPLIR RAPIDEMENT** le formulaire :
   - Nom : "**Farm Mythique - Donjons Clés Hautes**"
   - Instance : Sélectionner une dans la liste
   - Difficulté : "**Mythic**"
   - Date : Demain ou après-demain (changer la date par défaut)
   - Participants : "**15**"
   - Description : "**Session push clés +20 et plus pour améliorer le score guilde**"

3. **CLIQUER** "Créer le raid"
4. **ATTENDRE** le loading (2 sec) et la notification de succès

**RÉSULTAT ATTENDU :**
- Création confirmée par notification
- Retour automatique à la liste des raids
- Nouveau raid visible dans la liste

---

### 📝 **ÉTAPE 5 : INSCRIPTION À UN RAID** (2-3 min)
**PAGE :** Retour sur `/raids`

**CE QUE VOUS DITES :**
> "Maintenant, inscrivons-nous au raid de demain. Le système permet de choisir son personnage et d'ajouter des notes."

**ACTIONS :**
1. Sur le raid "Héroïque - Nerub-ar Palace", **CLIQUER** "S'inscrire"
2. **MODAL D'INSCRIPTION** s'ouvre
3. Personnage "Thorgar" est auto-sélectionné 
4. **AJOUTER** dans les notes : "**Main tank, je lead les pulls difficiles**"
5. **CLIQUER** "S'inscrire au raid"
6. **ATTENDRE** les notifications séquentielles :
   - "Inscription confirmée !"
   - (2 sec plus tard) "Mise à jour du roster"

**RÉSULTAT ATTENDU :**
- Modal se ferme
- Notifications de confirmation
- Compteur de participants mis à jour

---

### 🔔 **ÉTAPE 6 : NOTIFICATIONS & TEMPS RÉEL** (1-2 min)
**CE QUE VOUS DITES :**
> "Voici les notifications automatiques : rappels J-1, nouvelles inscriptions, mises à jour de roster. En production, ça serait via WebSocket pour le temps réel."

**ACTIONS :**
1. **POINTER** les notifications qui sont apparues
2. Expliquer le système :
   - Rappels automatiques avant raids
   - Notifications d'activité de guilde  
   - Mise à jour temps réel du roster
3. Mentionner : "En prod, WebSocket pour live updates"

---

### 🎯 **ÉTAPE 7 : RÉCAPITULATIF & VISION** (1 min)

**CE QUE VOUS DITES :**
> "On a vu le workflow complet : connexion → création raid → inscription → notifications automatiques. L'app centralise la gestion de guilde avec une UX moderne."

**FONCTIONNALITÉS MONTRÉES :**
✅ **Connexion** multi-rôles (GM, Officier, Membre)  
✅ **Création** de raid guidée et intuitive  
✅ **Inscription** avec sélection personnage  
✅ **Notifications** temps réel (J-1, inscriptions)  
✅ **Interface** moderne et responsive  

**PROCHAINES ÉTAPES :**
- Integration API backend
- WebSocket pour live updates
- Calendrier avancé
- Système de loot council
- Analytics de guilde

---

## 🔥 POINTS CLÉS POUR LA PRÉSENTATION

### 💪 **Forces à Mettre en Avant :**
- **UX Intuitive** : workflow naturel pour les Guild Masters
- **Notifications Smart** : rappels automatiques J-1
- **Temps Réel** : simulations d'updates live (prêt pour WebSocket)
- **Multi-Rôles** : différents niveaux d'accès selon le rôle guilde
- **Responsive** : fonctionne sur tous devices

### 🚨 **Phrases d'Impact :**
- *"Fini les spreadsheets Discord pour gérer sa guilde"*
- *"Les rappels J-1 automatiques évitent les absences de dernière minute"* 
- *"Interface pensée par et pour les Guild Masters WoW"*
- *"Prêt pour l'intégration WebSocket temps réel"*

### 🛡️ **Si Questions Techniques :**
- **"Et l'API ?"** → "Backend en cours, architecture prête pour l'intégration"
- **"Données persistantes ?"** → "Stack complète : Next.js + API + Database"
- **"Sécurité ?"** → "Auth multi-niveaux selon rôles guilde"
- **"Mobile ?"** → "Responsive design, PWA possible"

---

## ⚡ **BACKUP PLAN**

### Si problème technique :
1. **Refresh** l'application
2. Utiliser le **2ème onglet** de secours
3. **Skip** l'étape problématique et continuer
4. **Retour manuel** aux pages importantes via URL directe

### URLs de secours :
- `/` - Accueil
- `/login` - Connexion  
- `/raids` - Liste raids
- `/raids/create` - Création

---

## 🎬 **TIMING OPTIMAL :**
- **Introduction :** 1-2 min
- **Connexion :** 1 min  
- **Navigation raids :** 2-3 min
- **Création raid :** 2-3 min
- **Inscription :** 2-3 min
- **Notifications :** 1-2 min
- **Récapitulatif :** 1 min

**TOTAL : 10-12 minutes** ⏱️

---

*Bonne chance pour votre présentation ! 🚀*

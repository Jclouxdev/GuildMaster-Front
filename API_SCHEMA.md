# API Schema pour GuildMaster - Planning et Raids MVP

## Base URL
```
https://api.guildmaster.com/v1
```

## Authentication
Toutes les routes nécessitent un token JWT dans le header:
```
Authorization: Bearer <token>
```

## Models

### User
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  guildRole: 'Guild Master' | 'Officer' | 'Member';
  createdAt: Date;
  updatedAt: Date;
}
```

### Character
```typescript
interface Character {
  id: string;
  userId: string;
  name: string;
  level: number;
  class: 'Warrior' | 'Paladin' | 'Hunter' | 'Rogue' | 'Priest' | 'Shaman' | 'Mage' | 'Warlock' | 'Monk' | 'Druid' | 'Demon Hunter' | 'Death Knight' | 'Evoker';
  spec?: string; // Spécialisation
  itemLevel?: number;
  role: 'Tank' | 'Healer' | 'DPS';
  isMain: boolean; // Personnage principal
  createdAt: Date;
  updatedAt: Date;
}
```

### Raid
```typescript
interface Raid {
  id: string;
  name: string;
  description?: string;
  objective?: string;
  date: Date;
  duration: number; // minutes
  maxPlayers: number;
  difficulty: 'Normal' | 'Heroic' | 'Mythic';
  instance: string; // ex: "Aberrus, the Shadowed Crucible"
  createdBy: string; // userId
  createdAt: Date;
  updatedAt: Date;
  status: 'Draft' | 'Open' | 'Full' | 'InProgress' | 'Completed' | 'Cancelled';
}
```

### RaidRegistration
```typescript
interface RaidRegistration {
  id: string;
  raidId: string;
  userId: string;
  characterIds: string[]; // Personnages proposés
  selectedCharacterId?: string; // Personnage sélectionné par le raid leader
  status: 'Pending' | 'Accepted' | 'Declined' | 'Standby';
  notes?: string;
  registeredAt: Date;
  updatedAt: Date;
}
```

## Endpoints

### Auth & Users
```
POST   /auth/login              - Connexion
POST   /auth/register           - Inscription
GET    /auth/me                 - Profil utilisateur actuel
PUT    /auth/me                 - Mettre à jour profil
```

### Characters
```
GET    /characters              - Liste des personnages de l'utilisateur
POST   /characters              - Créer un personnage
PUT    /characters/:id          - Mettre à jour un personnage
DELETE /characters/:id          - Supprimer un personnage
GET    /characters/guild        - Tous les personnages de la guilde (pour raid leaders)
```

### Raids
```
GET    /raids                   - Liste des raids (avec filtres)
  Query params: 
  - startDate?: string
  - endDate?: string
  - difficulty?: string
  - status?: string
  - page?: number
  - limit?: number

POST   /raids                   - Créer un raid (Guild Master/Officer seulement)
GET    /raids/:id               - Détails d'un raid
PUT    /raids/:id               - Modifier un raid (Creator/Guild Master/Officer seulement)
DELETE /raids/:id               - Supprimer un raid (Creator/Guild Master/Officer seulement)
```

### Raid Registrations
```
GET    /raids/:id/registrations - Liste des inscriptions d'un raid
POST   /raids/:id/register      - S'inscrire à un raid
PUT    /raids/:id/registrations/:regId/select - Sélectionner un personnage (Raid leaders)
DELETE /raids/:id/unregister    - Se désinscrire d'un raid
```

### Calendar
```
GET    /calendar/raids          - Raids pour une période donnée
  Query params:
  - startDate: string (required)
  - endDate: string (required)
  - view: 'week' | 'month' (default: week)
```

## Réponses API

### Success Response
```typescript
interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}
```

### Error Response
```typescript
interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}
```

## Codes d'erreur
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden (pas les permissions)
- `404` - Not Found
- `409` - Conflict (ex: personnage déjà inscrit)
- `422` - Validation Error
- `500` - Internal Server Error

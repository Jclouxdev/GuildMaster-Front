import { Raid, RaidRegistration, RaidParticipant, Character, User, WowClass, WowSpec, MasteryLevel } from '@/types/raid';

// Référentiel des classes et spécialisations WoW
export const WOW_CLASSES_DATA: Record<WowClass, { name: string; specs: { name: WowSpec; role: 'Tank' | 'Healer' | 'DPS' }[] }> = {
  'Warrior': {
    name: 'Guerrier',
    specs: [
      { name: 'Arms', role: 'DPS' },
      { name: 'Fury', role: 'DPS' },
      { name: 'Protection (Warrior)', role: 'Tank' }
    ]
  },
  'Paladin': {
    name: 'Paladin',
    specs: [
      { name: 'Holy', role: 'Healer' },
      { name: 'Protection (Paladin)', role: 'Tank' },
      { name: 'Retribution', role: 'DPS' }
    ]
  },
  'Hunter': {
    name: 'Chasseur',
    specs: [
      { name: 'Beast Mastery', role: 'DPS' },
      { name: 'Marksmanship', role: 'DPS' },
      { name: 'Survival', role: 'DPS' }
    ]
  },
  'Rogue': {
    name: 'Voleur',
    specs: [
      { name: 'Assassination', role: 'DPS' },
      { name: 'Outlaw', role: 'DPS' },
      { name: 'Subtlety', role: 'DPS' }
    ]
  },
  'Priest': {
    name: 'Prêtre',
    specs: [
      { name: 'Discipline', role: 'Healer' },
      { name: 'Holy (Priest)', role: 'Healer' },
      { name: 'Shadow', role: 'DPS' }
    ]
  },
  'Shaman': {
    name: 'Chaman',
    specs: [
      { name: 'Elemental', role: 'DPS' },
      { name: 'Enhancement', role: 'DPS' },
      { name: 'Restoration (Shaman)', role: 'Healer' }
    ]
  },
  'Mage': {
    name: 'Mage',
    specs: [
      { name: 'Arcane', role: 'DPS' },
      { name: 'Fire', role: 'DPS' },
      { name: 'Frost (Mage)', role: 'DPS' }
    ]
  },
  'Warlock': {
    name: 'Démoniste',
    specs: [
      { name: 'Affliction', role: 'DPS' },
      { name: 'Demonology', role: 'DPS' },
      { name: 'Destruction', role: 'DPS' }
    ]
  },
  'Monk': {
    name: 'Moine',
    specs: [
      { name: 'Brewmaster', role: 'Tank' },
      { name: 'Mistweaver', role: 'Healer' },
      { name: 'Windwalker', role: 'DPS' }
    ]
  },
  'Druid': {
    name: 'Druide',
    specs: [
      { name: 'Balance', role: 'DPS' },
      { name: 'Feral', role: 'DPS' },
      { name: 'Guardian', role: 'Tank' },
      { name: 'Restoration (Druid)', role: 'Healer' }
    ]
  },
  'Demon Hunter': {
    name: 'Chasseur de démons',
    specs: [
      { name: 'Havoc', role: 'DPS' },
      { name: 'Vengeance', role: 'Tank' }
    ]
  },
  'Death Knight': {
    name: 'Chevalier de la mort',
    specs: [
      { name: 'Blood', role: 'Tank' },
      { name: 'Frost (DK)', role: 'DPS' },
      { name: 'Unholy', role: 'DPS' }
    ]
  },
  'Evoker': {
    name: 'Évocateur',
    specs: [
      { name: 'Devastation', role: 'DPS' },
      { name: 'Preservation', role: 'Healer' },
      { name: 'Augmentation', role: 'DPS' }
    ]
  }
};

export const MASTERY_LEVELS: { value: MasteryLevel; label: string; description: string; color: string }[] = [
  { 
    value: 'Débutant', 
    label: 'Débutant', 
    description: 'Découverte de la spécialisation',
    color: 'bg-gray-100 text-gray-800'
  },
  { 
    value: 'Intermédiaire', 
    label: 'Intermédiaire', 
    description: 'Bases maîtrisées, en apprentissage',
    color: 'bg-blue-100 text-blue-800'
  },
  { 
    value: 'Avancé', 
    label: 'Avancé', 
    description: 'Bonne maîtrise, capable de raids difficiles',
    color: 'bg-purple-100 text-purple-800'
  },
  { 
    value: 'Expert', 
    label: 'Expert', 
    description: 'Maîtrise parfaite, peut guider les autres',
    color: 'bg-orange-100 text-orange-800'
  }
];

// Mock users data
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'guildmaster@guild.com',
    firstName: 'John',
    lastName: 'Doe',
    guildRole: 'Guild Master',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    id: '2',
    email: 'officer@guild.com',
    firstName: 'Jane',
    lastName: 'Smith',
    guildRole: 'Officer',
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15')
  },
  {
    id: '3',
    email: 'member@guild.com',
    firstName: 'Bob',
    lastName: 'Wilson',
    guildRole: 'Member',
    createdAt: new Date('2025-02-01'),
    updatedAt: new Date('2025-02-01')
  }
];

// Mock characters data
export const mockCharacters: Character[] = [
  {
    id: '1',
    userId: '1',
    name: 'Thorgar',
    level: 80,
    class: 'Warrior',
    itemLevel: 480,
    specializations: [
      { spec: 'Protection (Warrior)', masteryLevel: 'Expert', isPreferred: true },
      { spec: 'Arms', masteryLevel: 'Avancé', isPreferred: false }
    ],
    primaryRole: 'Tank',
    isMain: true,
    server: 'Hyjal',
    notes: 'Disponible tous les soirs sauf mercredi',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-08-15')
  },
  {
    id: '2',
    userId: '1',
    name: 'Healbot',
    level: 78,
    class: 'Priest',
    itemLevel: 470,
    specializations: [
      { spec: 'Holy (Priest)', masteryLevel: 'Avancé', isPreferred: true },
      { spec: 'Discipline', masteryLevel: 'Intermédiaire', isPreferred: false }
    ],
    primaryRole: 'Healer',
    isMain: false,
    server: 'Hyjal',
    createdAt: new Date('2025-02-01'),
    updatedAt: new Date('2025-08-10')
  },
  {
    id: '3',
    userId: '2',
    name: 'Frostmage',
    level: 80,
    class: 'Mage',
    itemLevel: 485,
    specializations: [
      { spec: 'Frost (Mage)', masteryLevel: 'Expert', isPreferred: true },
      { spec: 'Fire', masteryLevel: 'Avancé', isPreferred: false },
      { spec: 'Arcane', masteryLevel: 'Intermédiaire', isPreferred: false }
    ],
    primaryRole: 'DPS',
    isMain: true,
    server: 'Hyjal',
    notes: 'Préfère les combats longue portée',
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-08-12')
  },
  {
    id: '4',
    userId: '3',
    name: 'Shadowhunt',
    level: 79,
    class: 'Hunter',
    itemLevel: 475,
    specializations: [
      { spec: 'Marksmanship', masteryLevel: 'Avancé', isPreferred: true },
      { spec: 'Beast Mastery', masteryLevel: 'Intermédiaire', isPreferred: false }
    ],
    primaryRole: 'DPS',
    isMain: true,
    server: 'Hyjal',
    createdAt: new Date('2025-02-01'),
    updatedAt: new Date('2025-08-14')
  },
  {
    id: '5',
    userId: '2',
    name: 'Bearform',
    level: 80,
    class: 'Druid',
    itemLevel: 478,
    specializations: [
      { spec: 'Guardian', masteryLevel: 'Avancé', isPreferred: true },
      { spec: 'Balance', masteryLevel: 'Intermédiaire', isPreferred: false }
    ],
    primaryRole: 'Tank',
    isMain: false,
    server: 'Hyjal',
    notes: 'Peut aussi jouer DPS si besoin',
    createdAt: new Date('2025-03-01'),
    updatedAt: new Date('2025-08-16')
  }
];

// Mock raids data - Données réalistes pour la démo
export const mockRaids: Raid[] = [
  {
    id: '1',
    name: 'Raid Heroïque - Nerub-ar Palace',
    description: 'Premier run héroïque de Nerub-ar, prévoir stuff 470+ iLevel. Points à réviser: Queen Ansurek.',
    objective: 'Clear complet héroïque pour progression mythique',
    instance: 'Nerub-ar Palace',
    difficulty: 'Heroic',
    date: new Date('2025-09-18T20:00:00'), // Demain soir pour la démo
    duration: 180, // 3 heures
    maxPlayers: 20,
    status: 'Open',
    createdBy: '1',
    createdAt: new Date('2025-09-10T10:00:00'),
    updatedAt: new Date('2025-09-15T15:30:00')
  },
  {
    id: '2', 
    name: 'Raid Mythique - Nerub-ar Palace',
    description: 'Progression mythique - Focus sur les 3 premiers boss. iLevel 480+ requis.',
    objective: 'Progression mythique - viser 3/8 boss',
    instance: 'Nerub-ar Palace',
    difficulty: 'Mythic',
    date: new Date('2025-09-20T19:30:00'), // Vendredi
    duration: 240, // 4 heures
    maxPlayers: 20,
    status: 'Open',
    createdBy: '2',
    createdAt: new Date('2025-09-12T14:00:00'),
    updatedAt: new Date('2025-09-16T09:15:00')
  },
  {
    id: '3',
    name: 'Initiation Donjon - Ara-Kara',
    description: 'Session d\'initiation pour les nouveaux membres. Pas d\'iLevel requis.',
    objective: 'Apprendre les mécaniques de base',
    instance: 'Ara-Kara, City of Echoes',
    difficulty: 'Normal',
    date: new Date('2025-09-19T21:00:00'), // Jeudi  
    duration: 90,
    maxPlayers: 5,
    status: 'Open',
    createdBy: '2',
    createdAt: new Date('2025-09-14T16:30:00'),
    updatedAt: new Date('2025-09-14T16:30:00')
  },
  {
    id: '4',
    name: 'Farm Héroïque - Contenu Antérieur',
    description: 'Farm rapide des anciens raids pour transmog et achievements',
    objective: 'Collecte de transmog et mounts',
    instance: 'Vault of the Incarnates', 
    difficulty: 'Heroic',
    date: new Date('2025-09-21T14:00:00'), // Samedi après-midi
    duration: 120,
    maxPlayers: 30,
    status: 'Open',
    createdBy: '1', 
    createdAt: new Date('2025-09-13T11:00:00'),
    updatedAt: new Date('2025-09-13T11:00:00')
  }
];

// Mock raid registrations - Inscriptions réalistes pour démo
export const mockRaidRegistrations: RaidRegistration[] = [
  // Inscriptions pour le raid de demain (Heroïque Nerub-ar Palace)
  {
    id: '1',
    raidId: '1',
    userId: '1',
    userName: 'Thorgar',
    characterIds: ['1'],
    selectedCharacterId: '1',
    status: 'Accepted',
    registeredAt: new Date('2025-09-15T12:00:00'),
    updatedAt: new Date('2025-09-16T10:00:00'),
    notes: 'Main tank, je lead le raid'
  },
  {
    id: '2',
    raidId: '1',
    userId: '2',
    userName: 'Lyralei',
    characterIds: ['3'],
    selectedCharacterId: '3',
    status: 'Accepted',
    registeredAt: new Date('2025-09-15T13:30:00'),
    updatedAt: new Date('2025-09-16T10:00:00'),
    notes: 'DPS Hunter, stuff 475 iLevel'
  },
  {
    id: '3',
    raidId: '1',
    userId: '3',
    userName: 'Jaina',
    characterIds: ['4'],
    selectedCharacterId: '4',
    status: 'Accepted',
    registeredAt: new Date('2025-09-16T09:15:00'),
    updatedAt: new Date('2025-09-16T09:15:00'),
    notes: 'Heal principal'
  },
  // Inscriptions pour le mythique
  {
    id: '4',
    raidId: '2',
    userId: '1',
    userName: 'Thorgar',
    characterIds: ['1'],
    selectedCharacterId: '1',
    status: 'Accepted',
    registeredAt: new Date('2025-09-12T14:30:00'),
    updatedAt: new Date('2025-09-16T10:00:00')
  },
  {
    id: '5',
    raidId: '2',
    userId: '2',
    userName: 'Lyralei',
    characterIds: ['3'],
    selectedCharacterId: '3',
    status: 'Pending',
    registeredAt: new Date('2025-09-16T20:00:00'),
    updatedAt: new Date('2025-09-16T20:00:00'),
    notes: 'En attente de validation iLevel'
  },
  // Inscription pour l'initiation
  {
    id: '6',
    raidId: '3',
    userId: '3',
    userName: 'Jaina',
    characterIds: ['4'],
    selectedCharacterId: '4',
    status: 'Accepted',
    registeredAt: new Date('2025-09-14T17:00:00'),
    updatedAt: new Date('2025-09-14T17:00:00'),
    notes: 'J\'aide pour l\'encadrement'
  }
];

// Mock raid participants (derived from registrations)
export const mockRaidParticipants: RaidParticipant[] = [
  {
    id: '1',
    raidId: '1',
    playerId: '1',
    playerName: 'John Doe',
    characterId: '1',
    characterName: 'Thorgar',
    characterClass: 'Warrior',
    characterLevel: 80,
    role: 'Tank',
    status: 'Confirmed',
    joinedAt: new Date('2025-08-15T12:00:00')
  },
  {
    id: '2',
    raidId: '1',
    playerId: '2',
    playerName: 'Jane Smith',
    characterId: '3',
    characterName: 'Frostmage',
    characterClass: 'Mage',
    characterLevel: 80,
    role: 'DPS',
    status: 'Confirmed',
    joinedAt: new Date('2025-08-15T13:30:00')
  },
  {
    id: '3',
    raidId: '1',
    playerId: '3',
    playerName: 'Bob Wilson',
    characterId: '4',
    characterName: 'Shadowhunt',
    characterClass: 'Hunter',
    characterLevel: 79,
    role: 'DPS',
    status: 'Tentative',
    joinedAt: new Date('2025-08-16T09:15:00')
  },
  // Plus de participants pour le raid 1 - composition complète
  {
    id: '5',
    raidId: '1',
    playerId: '4',
    playerName: 'Alice Cooper',
    characterId: '6',
    characterName: 'Holylight',
    characterClass: 'Paladin',
    characterLevel: 80,
    role: 'Healer',
    status: 'Confirmed',
    joinedAt: new Date('2025-08-16T10:00:00')
  },
  {
    id: '6',
    raidId: '1',
    playerId: '5',
    playerName: 'Charlie Brown',
    characterId: '7',
    characterName: 'Brewmaster',
    characterClass: 'Monk',
    characterLevel: 80,
    role: 'Tank',
    status: 'Confirmed',
    joinedAt: new Date('2025-08-16T11:30:00')
  },
  {
    id: '7',
    raidId: '1',
    playerId: '6',
    playerName: 'Diana Prince',
    characterId: '8',
    characterName: 'Restoration',
    characterClass: 'Shaman',
    characterLevel: 80,
    role: 'Healer',
    status: 'Confirmed',
    joinedAt: new Date('2025-08-16T12:15:00')
  },
  {
    id: '8',
    raidId: '1',
    playerId: '7',
    playerName: 'Eve Adams',
    characterId: '9',
    characterName: 'Shadowpain',
    characterClass: 'Priest',
    characterLevel: 79,
    role: 'DPS',
    status: 'Confirmed',
    joinedAt: new Date('2025-08-16T13:00:00')
  },
  {
    id: '9',
    raidId: '1',
    playerId: '8',
    playerName: 'Frank Castle',
    characterId: '10',
    characterName: 'Destruction',
    characterClass: 'Warlock',
    characterLevel: 80,
    role: 'DPS',
    status: 'Confirmed',
    joinedAt: new Date('2025-08-16T14:00:00')
  },
  {
    id: '10',
    raidId: '1',
    playerId: '9',
    playerName: 'Grace Hopper',
    characterId: '11',
    characterName: 'Moonbeam',
    characterClass: 'Druid',
    characterLevel: 80,
    role: 'Healer',
    status: 'Confirmed',
    joinedAt: new Date('2025-08-16T14:30:00')
  },
  {
    id: '11',
    raidId: '1',
    playerId: '10',
    playerName: 'Henry Ford',
    characterId: '12',
    characterName: 'Stealthkill',
    characterClass: 'Rogue',
    characterLevel: 80,
    role: 'DPS',
    status: 'Confirmed',
    joinedAt: new Date('2025-08-16T15:00:00')
  },
  {
    id: '12',
    raidId: '1',
    playerId: '11',
    playerName: 'Iris West',
    characterId: '13',
    characterName: 'Frostbolt',
    characterClass: 'Mage',
    characterLevel: 79,
    role: 'DPS',
    status: 'Confirmed',
    joinedAt: new Date('2025-08-16T15:30:00')
  },
  {
    id: '13',
    raidId: '1',
    playerId: '12',
    playerName: 'Jack Sparrow',
    characterId: '14',
    characterName: 'Vengeance',
    characterClass: 'Demon Hunter',
    characterLevel: 80,
    role: 'DPS',
    status: 'Confirmed',
    joinedAt: new Date('2025-08-16T16:00:00')
  },
  {
    id: '14',
    raidId: '1',
    playerId: '13',
    playerName: 'Kate Bishop',
    characterId: '15',
    characterName: 'Marksman',
    characterClass: 'Hunter',
    characterLevel: 80,
    role: 'DPS',
    status: 'Tentative',
    joinedAt: new Date('2025-08-16T16:30:00')
  },
  {
    id: '15',
    raidId: '1',
    playerId: '14',
    playerName: 'Luke Cage',
    characterId: '16',
    characterName: 'Deathgrip',
    characterClass: 'Death Knight',
    characterLevel: 80,
    role: 'DPS',
    status: 'Confirmed',
    joinedAt: new Date('2025-08-16T17:00:00')
  },
  {
    id: '16',
    raidId: '1',
    playerId: '15',
    playerName: 'Mia Wallace',
    characterId: '17',
    characterName: 'Windwalker',
    characterClass: 'Monk',
    characterLevel: 79,
    role: 'DPS',
    status: 'Confirmed',
    joinedAt: new Date('2025-08-16T17:30:00')
  },
  {
    id: '17',
    raidId: '1',
    playerId: '16',
    playerName: 'Neo Anderson',
    characterId: '18',
    characterName: 'Devastator',
    characterClass: 'Evoker',
    characterLevel: 80,
    role: 'DPS',
    status: 'Confirmed',
    joinedAt: new Date('2025-08-16T18:00:00')
  },
  {
    id: '18',
    raidId: '1',
    playerId: '17',
    playerName: 'Olivia Pope',
    characterId: '19',
    characterName: 'Discipline',
    characterClass: 'Priest',
    characterLevel: 80,
    role: 'Healer',
    status: 'Confirmed',
    joinedAt: new Date('2025-08-16T18:30:00')
  },
  {
    id: '19',
    raidId: '1',
    playerId: '18',
    playerName: 'Peter Parker',
    characterId: '20',
    characterName: 'Enhancement',
    characterClass: 'Shaman',
    characterLevel: 80,
    role: 'DPS',
    status: 'Confirmed',
    joinedAt: new Date('2025-08-16T19:00:00')
  },
  {
    id: '20',
    raidId: '1',
    playerId: '19',
    playerName: 'Quinn Fabray',
    characterId: '21',
    characterName: 'Feral',
    characterClass: 'Druid',
    characterLevel: 80,
    role: 'DPS',
    status: 'Confirmed',
    joinedAt: new Date('2025-08-16T19:30:00')
  },
  // Participants pour raid 2
  {
    id: '21',
    raidId: '2',
    playerId: '2',
    playerName: 'Jane Smith',
    characterId: '5',
    characterName: 'Bearform',
    characterClass: 'Druid',
    characterLevel: 80,
    role: 'Tank',
    status: 'Confirmed',
    joinedAt: new Date('2025-08-16T15:00:00')
  },
  {
    id: '22',
    raidId: '2',
    playerId: '20',
    playerName: 'Rachel Green',
    characterId: '22',
    characterName: 'Preservation',
    characterClass: 'Evoker',
    characterLevel: 80,
    role: 'Healer',
    status: 'Confirmed',
    joinedAt: new Date('2025-08-17T09:00:00')
  },
  {
    id: '23',
    raidId: '2',
    playerId: '21',
    playerName: 'Steve Rogers',
    characterId: '23',
    characterName: 'Retribution',
    characterClass: 'Paladin',
    characterLevel: 80,
    role: 'DPS',
    status: 'Tentative',
    joinedAt: new Date('2025-08-17T10:00:00')
  }
];

// Helper functions for mock data
export const getRaidById = (id: string): Raid | undefined => {
  return mockRaids.find(raid => raid.id === id);
};

export const getRegistrationsByRaidId = (raidId: string): RaidRegistration[] => {
  return mockRaidRegistrations.filter(registration => registration.raidId === raidId);
};

export const getCharacterById = (id: string): Character | undefined => {
  return mockCharacters.find(character => character.id === id);
};

export const getCharactersByUserId = (userId: string): Character[] => {
  return mockCharacters.filter(character => character.userId === userId);
};

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getRaidsByDateRange = (startDate: Date, endDate: Date): Raid[] => {
  return mockRaids.filter(raid => 
    raid.date >= startDate && raid.date <= endDate
  );
};

export const getUpcomingRaids = (): Raid[] => {
  const now = new Date();
  return mockRaids
    .filter(raid => raid.date > now)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
};

// Additional helper functions for raid participants
export const getParticipantsByRaidId = (raidId: string): RaidParticipant[] => {
  return mockRaidParticipants.filter(participant => participant.raidId === raidId);
};

export const getPlayerById = (playerId: string): User | undefined => {
  return mockUsers.find(user => user.id === playerId);
};

export const getParticipantById = (participantId: string): RaidParticipant | undefined => {
  return mockRaidParticipants.find(participant => participant.id === participantId);
};

// WoW specific data
export const wowClasses = [
  'Warrior', 'Paladin', 'Hunter', 'Rogue', 'Priest', 'Shaman', 
  'Mage', 'Warlock', 'Monk', 'Druid', 'Demon Hunter', 'Death Knight', 'Evoker'
] as const;

export const wowInstances = [
  'Aberrus, the Shadowed Crucible',
  'Vault of the Incarnates',
  'Amirdrassil, the Dream\'s Hope',
  'Dragonflight Dungeons',
  'Legacy Content'
] as const;

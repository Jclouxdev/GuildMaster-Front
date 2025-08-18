import { Raid, RaidRegistration, Character, User } from '@/types/raid';

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
    spec: 'Protection',
    itemLevel: 480,
    role: 'Tank',
    isMain: true,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-08-15')
  },
  {
    id: '2',
    userId: '1',
    name: 'Healbot',
    level: 78,
    class: 'Priest',
    spec: 'Holy',
    itemLevel: 470,
    role: 'Healer',
    isMain: false,
    createdAt: new Date('2025-02-01'),
    updatedAt: new Date('2025-08-10')
  },
  {
    id: '3',
    userId: '2',
    name: 'Frostmage',
    level: 80,
    class: 'Mage',
    spec: 'Frost',
    itemLevel: 485,
    role: 'DPS',
    isMain: true,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-08-12')
  },
  {
    id: '4',
    userId: '3',
    name: 'Shadowhunt',
    level: 79,
    class: 'Hunter',
    spec: 'Marksmanship',
    itemLevel: 475,
    role: 'DPS',
    isMain: true,
    createdAt: new Date('2025-02-01'),
    updatedAt: new Date('2025-08-14')
  },
  {
    id: '5',
    userId: '2',
    name: 'Bearform',
    level: 80,
    class: 'Druid',
    spec: 'Guardian',
    itemLevel: 478,
    role: 'Tank',
    isMain: false,
    createdAt: new Date('2025-03-01'),
    updatedAt: new Date('2025-08-16')
  }
];

// Mock raids data
export const mockRaids: Raid[] = [
  {
    id: '1',
    name: 'Aberrus Heroic Clear',
    description: 'Weekly heroic clear of Aberrus. All roles needed, good teamwork required.',
    objective: 'Clear all bosses in Aberrus on Heroic difficulty',
    date: new Date('2025-08-20T19:00:00'),
    duration: 180, // 3 hours
    maxPlayers: 20,
    difficulty: 'Heroic',
    instance: 'Aberrus, the Shadowed Crucible',
    createdBy: '1',
    createdAt: new Date('2025-08-15T10:00:00'),
    updatedAt: new Date('2025-08-15T10:00:00'),
    status: 'Open'
  },
  {
    id: '2',
    name: 'Vault Normal Farm',
    description: 'Easy normal run for alts and new members. Relaxed atmosphere.',
    date: new Date('2025-08-22T20:00:00'),
    duration: 120, // 2 hours
    maxPlayers: 15,
    difficulty: 'Normal',
    instance: 'Vault of the Incarnates',
    createdBy: '2',
    createdAt: new Date('2025-08-16T14:30:00'),
    updatedAt: new Date('2025-08-16T14:30:00'),
    status: 'Open'
  },
  {
    id: '3',
    name: 'Mythic Progression',
    description: 'Mythic raid progression. Experienced raiders only.',
    objective: 'Progress on Mythic bosses, aiming for 3/9',
    date: new Date('2025-08-25T18:30:00'),
    duration: 240, // 4 hours
    maxPlayers: 20,
    difficulty: 'Mythic',
    instance: 'Aberrus, the Shadowed Crucible',
    createdBy: '1',
    createdAt: new Date('2025-08-17T09:15:00'),
    updatedAt: new Date('2025-08-17T09:15:00'),
    status: 'Open'
  },
  {
    id: '4',
    name: 'Learning Raid',
    description: 'Teaching raid for new members to learn mechanics.',
    objective: 'Learn raid mechanics and teamwork',
    date: new Date('2025-08-24T16:00:00'),
    duration: 150, // 2.5 hours
    maxPlayers: 12,
    difficulty: 'Normal',
    instance: 'Amirdrassil, the Dream\'s Hope',
    createdBy: '2',
    createdAt: new Date('2025-08-18T11:00:00'),
    updatedAt: new Date('2025-08-18T11:00:00'),
    status: 'Open'
  }
];

// Mock raid registrations
export const mockRaidRegistrations: RaidRegistration[] = [
  {
    id: '1',
    raidId: '1',
    userId: '1',
    userName: 'John Doe',
    characterIds: ['1', '2'],
    selectedCharacterId: '1',
    status: 'Accepted',
    registeredAt: new Date('2025-08-15T12:00:00'),
    updatedAt: new Date('2025-08-16T10:00:00'),
    notes: 'Leading the raid'
  },
  {
    id: '2',
    raidId: '1',
    userId: '2',
    userName: 'Jane Smith',
    characterIds: ['3', '5'],
    selectedCharacterId: '3',
    status: 'Accepted',
    registeredAt: new Date('2025-08-15T13:30:00'),
    updatedAt: new Date('2025-08-16T10:00:00')
  },
  {
    id: '3',
    raidId: '1',
    userId: '3',
    userName: 'Bob Wilson',
    characterIds: ['4'],
    status: 'Pending',
    registeredAt: new Date('2025-08-16T09:15:00'),
    updatedAt: new Date('2025-08-16T09:15:00')
  },
  {
    id: '4',
    raidId: '2',
    userId: '2',
    userName: 'Jane Smith',
    characterIds: ['5'],
    selectedCharacterId: '5',
    status: 'Accepted',
    registeredAt: new Date('2025-08-16T15:00:00'),
    updatedAt: new Date('2025-08-17T10:00:00')
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

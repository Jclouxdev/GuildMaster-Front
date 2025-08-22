export interface Raid {
  id: string;
  name: string;
  description?: string;
  objective?: string;
  date: Date;
  duration: number; // in minutes
  maxPlayers: number;
  difficulty: 'Normal' | 'Heroic' | 'Mythic';
  instance: string; // ex: "Aberrus, the Shadowed Crucible"
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'Draft' | 'Open' | 'Full' | 'InProgress' | 'Completed' | 'Cancelled';
}

export type WowClass = 'Warrior' | 'Paladin' | 'Hunter' | 'Rogue' | 'Priest' | 'Shaman' | 'Mage' | 'Warlock' | 'Monk' | 'Druid' | 'Demon Hunter' | 'Death Knight' | 'Evoker';

export type WowSpec = 
  // Warrior
  'Arms' | 'Fury' | 'Protection (Warrior)' |
  // Paladin
  'Holy' | 'Protection (Paladin)' | 'Retribution' |
  // Hunter
  'Beast Mastery' | 'Marksmanship' | 'Survival' |
  // Rogue
  'Assassination' | 'Outlaw' | 'Subtlety' |
  // Priest
  'Discipline' | 'Holy (Priest)' | 'Shadow' |
  // Shaman
  'Elemental' | 'Enhancement' | 'Restoration (Shaman)' |
  // Mage
  'Arcane' | 'Fire' | 'Frost (Mage)' |
  // Warlock
  'Affliction' | 'Demonology' | 'Destruction' |
  // Monk
  'Brewmaster' | 'Mistweaver' | 'Windwalker' |
  // Druid
  'Balance' | 'Feral' | 'Guardian' | 'Restoration (Druid)' |
  // Demon Hunter
  'Havoc' | 'Vengeance' |
  // Death Knight
  'Blood' | 'Frost (DK)' | 'Unholy' |
  // Evoker
  'Devastation' | 'Preservation' | 'Augmentation';

export type MasteryLevel = 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';

export interface CharacterSpecialization {
  spec: WowSpec;
  masteryLevel: MasteryLevel;
  isPreferred: boolean; // Si c'est une spé que le joueur préfère jouer
}

export interface Character {
  id: string;
  userId: string;
  name: string;
  level: number;
  class: WowClass;
  itemLevel?: number;
  specializations: CharacterSpecialization[];
  primaryRole: 'Tank' | 'Healer' | 'DPS';
  isMain: boolean;
  server?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RaidRegistration {
  id: string;
  raidId: string;
  userId: string;
  userName: string;
  characterIds: string[];
  selectedCharacterId?: string;
  status: 'Pending' | 'Accepted' | 'Declined' | 'Standby';
  notes?: string;
  registeredAt: Date;
  updatedAt: Date;
}

export interface RaidParticipant {
  id: string;
  raidId: string;
  playerId: string;
  playerName: string;
  characterId: string;
  characterName: string;
  characterClass: WowClass;
  characterLevel: number;
  role: 'Tank' | 'Healer' | 'DPS';
  status: 'Confirmed' | 'Tentative' | 'Declined';
  joinedAt: Date;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  guildRole: 'Guild Master' | 'Officer' | 'Member';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRaidData {
  name: string;
  description?: string;
  objective?: string;
  date: Date;
  duration: number;
  maxPlayers: number;
  difficulty: Raid['difficulty'];
  instance: string;
}

export interface RaidFilters {
  difficulty?: Raid['difficulty'];
  status?: Raid['status'];
  startDate?: Date;
  endDate?: Date;
  instance?: string;
}

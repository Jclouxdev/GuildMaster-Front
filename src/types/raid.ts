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

export interface Character {
  id: string;
  userId: string;
  name: string;
  level: number;
  class: 'Warrior' | 'Paladin' | 'Hunter' | 'Rogue' | 'Priest' | 'Shaman' | 'Mage' | 'Warlock' | 'Monk' | 'Druid' | 'Demon Hunter' | 'Death Knight' | 'Evoker';
  spec?: string;
  itemLevel?: number;
  role: 'Tank' | 'Healer' | 'DPS';
  isMain: boolean;
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

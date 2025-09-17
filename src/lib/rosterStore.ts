import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RaidParticipant, WowClass } from '@/types/raid';

export interface RosterSlot {
  id: string;
  raidId: string;
  role: 'Tank' | 'Healer' | 'DPS';
  position: number; // Position dans la liste (pour l'ordre)
  assignedParticipant?: RaidParticipant;
  isRequired: boolean; // Si ce slot est obligatoire (ex: au moins 2 tanks)
  preferredClasses?: WowClass[]; // Classes préférées pour ce slot
  notes?: string;
}

export interface RosterComposition {
  raidId: string;
  totalSlots: number;
  tanks: number;
  healers: number;
  dps: number;
  slots: RosterSlot[];
  createdAt: Date;
  updatedAt: Date;
}

interface RosterStore {
  rosters: RosterComposition[];
  isLoaded: boolean;
  
  // Actions pour gérer les compositions
  createRosterComposition: (raidId: string, tanks: number, healers: number, dps: number) => void;
  updateRosterComposition: (raidId: string, tanks: number, healers: number, dps: number) => void;
  getRosterByRaidId: (raidId: string) => RosterComposition | undefined;
  
  // Actions pour gérer les slots
  assignParticipantToSlot: (raidId: string, slotId: string, participant: RaidParticipant) => void;
  removeParticipantFromSlot: (raidId: string, slotId: string) => void;
  updateSlotNotes: (raidId: string, slotId: string, notes: string) => void;
  updateSlotPreferredClasses: (raidId: string, slotId: string, classes: WowClass[]) => void;
  
  // Actions pour réorganiser
  swapSlots: (raidId: string, slotId1: string, slotId2: string) => void;
  
  // Actions utilitaires
  getUnassignedParticipants: (raidId: string, participants: RaidParticipant[]) => RaidParticipant[];
  loadInitialData: () => void;
}

const generateDefaultSlots = (raidId: string, tanks: number, healers: number, dps: number): RosterSlot[] => {
  const slots: RosterSlot[] = [];
  let position = 0;

  // Générer les slots de tanks
  for (let i = 0; i < tanks; i++) {
    slots.push({
      id: `${raidId}_tank_${i}`,
      raidId,
      role: 'Tank',
      position: position++,
      isRequired: i < 2, // Les 2 premiers tanks sont requis
      preferredClasses: ['Warrior', 'Paladin', 'Death Knight', 'Demon Hunter', 'Druid', 'Monk']
    });
  }

  // Générer les slots de healers
  for (let i = 0; i < healers; i++) {
    slots.push({
      id: `${raidId}_healer_${i}`,
      raidId,
      role: 'Healer',
      position: position++,
      isRequired: i < Math.ceil(healers * 0.7), // 70% des healers sont requis minimum
      preferredClasses: ['Priest', 'Paladin', 'Shaman', 'Druid', 'Monk', 'Evoker']
    });
  }

  // Générer les slots de DPS
  for (let i = 0; i < dps; i++) {
    slots.push({
      id: `${raidId}_dps_${i}`,
      raidId,
      role: 'DPS',
      position: position++,
      isRequired: i < Math.ceil(dps * 0.8), // 80% des DPS sont requis minimum
    });
  }

  return slots;
};

export const useRosterStore = create<RosterStore>()(
  persist(
    (set, get) => ({
      rosters: [],
      isLoaded: false,
      
      createRosterComposition: (raidId, tanks, healers, dps) => {
        const { rosters } = get();
        
        // Vérifier si une composition existe déjà
        const existingRoster = rosters.find(r => r.raidId === raidId);
        if (existingRoster) {
          // Mettre à jour la composition existante
          get().updateRosterComposition(raidId, tanks, healers, dps);
          return;
        }

        const totalSlots = tanks + healers + dps;
        const slots = generateDefaultSlots(raidId, tanks, healers, dps);

        const newRoster: RosterComposition = {
          raidId,
          totalSlots,
          tanks,
          healers,
          dps,
          slots,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        set(state => ({
          rosters: [...state.rosters, newRoster]
        }));
      },

      updateRosterComposition: (raidId, tanks, healers, dps) => {
        set(state => ({
          rosters: state.rosters.map(roster => {
            if (roster.raidId !== raidId) return roster;

            const totalSlots = tanks + healers + dps;
            const newSlots = generateDefaultSlots(raidId, tanks, healers, dps);
            
            // Préserver les assignations existantes si possible
            const preservedSlots = newSlots.map(newSlot => {
              const existingSlot = roster.slots.find(s => 
                s.role === newSlot.role && 
                s.position === newSlot.position
              );
              return existingSlot ? { ...newSlot, assignedParticipant: existingSlot.assignedParticipant } : newSlot;
            });

            return {
              ...roster,
              totalSlots,
              tanks,
              healers,
              dps,
              slots: preservedSlots,
              updatedAt: new Date()
            };
          })
        }));
      },

      getRosterByRaidId: (raidId) => {
        const { rosters } = get();
        return rosters.find(r => r.raidId === raidId);
      },

      assignParticipantToSlot: (raidId, slotId, participant) => {
        set(state => ({
          rosters: state.rosters.map(roster => {
            if (roster.raidId !== raidId) return roster;

            return {
              ...roster,
              slots: roster.slots.map(slot => {
                if (slot.id === slotId) {
                  return { ...slot, assignedParticipant: participant };
                }
                // Retirer le participant d'autres slots s'il était assigné ailleurs
                if (slot.assignedParticipant?.id === participant.id) {
                  return { ...slot, assignedParticipant: undefined };
                }
                return slot;
              }),
              updatedAt: new Date()
            };
          })
        }));
      },

      removeParticipantFromSlot: (raidId, slotId) => {
        set(state => ({
          rosters: state.rosters.map(roster => {
            if (roster.raidId !== raidId) return roster;

            return {
              ...roster,
              slots: roster.slots.map(slot => 
                slot.id === slotId 
                  ? { ...slot, assignedParticipant: undefined }
                  : slot
              ),
              updatedAt: new Date()
            };
          })
        }));
      },

      updateSlotNotes: (raidId, slotId, notes) => {
        set(state => ({
          rosters: state.rosters.map(roster => {
            if (roster.raidId !== raidId) return roster;

            return {
              ...roster,
              slots: roster.slots.map(slot => 
                slot.id === slotId 
                  ? { ...slot, notes }
                  : slot
              ),
              updatedAt: new Date()
            };
          })
        }));
      },

      updateSlotPreferredClasses: (raidId, slotId, classes) => {
        set(state => ({
          rosters: state.rosters.map(roster => {
            if (roster.raidId !== raidId) return roster;

            return {
              ...roster,
              slots: roster.slots.map(slot => 
                slot.id === slotId 
                  ? { ...slot, preferredClasses: classes }
                  : slot
              ),
              updatedAt: new Date()
            };
          })
        }));
      },

      swapSlots: (raidId, slotId1, slotId2) => {
        set(state => ({
          rosters: state.rosters.map(roster => {
            if (roster.raidId !== raidId) return roster;

            const slot1Index = roster.slots.findIndex(s => s.id === slotId1);
            const slot2Index = roster.slots.findIndex(s => s.id === slotId2);

            if (slot1Index === -1 || slot2Index === -1) return roster;

            const newSlots = [...roster.slots];
            const temp = newSlots[slot1Index].assignedParticipant;
            newSlots[slot1Index] = { ...newSlots[slot1Index], assignedParticipant: newSlots[slot2Index].assignedParticipant };
            newSlots[slot2Index] = { ...newSlots[slot2Index], assignedParticipant: temp };

            return {
              ...roster,
              slots: newSlots,
              updatedAt: new Date()
            };
          })
        }));
      },

      getUnassignedParticipants: (raidId, participants) => {
        const { rosters } = get();
        const roster = rosters.find(r => r.raidId === raidId);
        
        if (!roster) return participants;

        const assignedIds = roster.slots
          .filter(slot => slot.assignedParticipant)
          .map(slot => slot.assignedParticipant!.id);

        return participants.filter(p => !assignedIds.includes(p.id));
      },

      loadInitialData: () => {
        set({ isLoaded: true });
      }
    }),
    {
      name: 'roster-store',
      // Convertir les dates lors de la réhydratation
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.rosters = state.rosters.map(roster => ({
            ...roster,
            createdAt: new Date(roster.createdAt),
            updatedAt: new Date(roster.updatedAt)
          }));
        }
      }
    }
  )
);

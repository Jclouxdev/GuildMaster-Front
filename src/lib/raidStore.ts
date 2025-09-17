import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Raid, RaidParticipant } from '@/types/raid';
import { mockRaids, mockRaidParticipants } from './mockData';

interface RaidStore {
  raids: Raid[];
  participants: RaidParticipant[];
  isLoaded: boolean;
  addRaid: (raid: Omit<Raid, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => void;
  updateRaid: (id: string, updates: Partial<Raid>) => void;
  deleteRaid: (id: string) => void;
  getRaidById: (id: string) => Raid | undefined;
  getParticipantsByRaidId: (raidId: string) => RaidParticipant[];
  addParticipant: (raidId: string, participant: Omit<RaidParticipant, 'id' | 'raidId' | 'joinedAt'>) => void;
  removeParticipant: (participantId: string) => void;
  loadInitialData: () => void;
}

export const useRaidStore = create<RaidStore>()(
  persist(
    (set, get) => ({
      raids: [],
      participants: [],
      isLoaded: false,
      
      addRaid: (raidData) => {
        const newRaid: Raid = {
          ...raidData,
          id: Date.now().toString(),
          createdBy: '1', // ID du user connecté (pour la démo)
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'Open'
        };
        
        set((state) => ({
          raids: [...state.raids, newRaid]
        }));
      },
      
      updateRaid: (id, updates) => {
        set((state) => ({
          raids: state.raids.map(raid => 
            raid.id === id 
              ? { ...raid, ...updates, updatedAt: new Date() }
              : raid
          )
        }));
      },
      
      deleteRaid: (id) => {
        set((state) => ({
          raids: state.raids.filter(raid => raid.id !== id),
          participants: state.participants.filter(participant => participant.raidId !== id)
        }));
      },

      getRaidById: (id) => {
        const { raids } = get();
        return raids.find(raid => raid.id === id);
      },

      getParticipantsByRaidId: (raidId) => {
        const { participants } = get();
        // Combine les participants des mocks et du store pour la compatibilité
        const mockParticipants = mockRaidParticipants.filter(p => p.raidId === raidId);
        const storeParticipants = participants.filter(p => p.raidId === raidId);
        return [...mockParticipants, ...storeParticipants];
      },

      addParticipant: (raidId, participantData) => {
        const newParticipant: RaidParticipant = {
          ...participantData,
          id: Date.now().toString(),
          raidId,
          joinedAt: new Date(),
          status: 'Confirmed'
        };
        
        set((state) => ({
          participants: [...state.participants, newParticipant]
        }));
      },

      removeParticipant: (participantId) => {
        set((state) => ({
          participants: state.participants.filter(p => p.id !== participantId)
        }));
      },
      
      loadInitialData: () => {
        const { isLoaded, raids } = get();
        if (!isLoaded) {
          // Conserver les raids persistés et ajouter les mocks s'ils ne sont pas déjà présents
          const persistedRaids = raids.filter(raid => 
            !mockRaids.some(mockRaid => mockRaid.id === raid.id)
          );
          set({
            raids: [...mockRaids, ...persistedRaids],
            isLoaded: true
          });
        }
      }
    }),
    {
      name: 'raid-store',
      // On ne persiste que les raids ajoutés, pas les données mock
      partialize: (state) => ({
        raids: state.raids.filter(raid => 
          !mockRaids.some(mockRaid => mockRaid.id === raid.id)
        ),
        participants: state.participants,
        isLoaded: state.isLoaded
      }),
      // Merge les données persistées avec les mock data et convertit les dates
      onRehydrateStorage: () => (state) => {
        if (state) {
          const persistedRaids = (state.raids || []).map(raid => ({
            ...raid,
            date: new Date(raid.date),
            createdAt: new Date(raid.createdAt),
            updatedAt: new Date(raid.updatedAt)
          }));
          const persistedParticipants = (state.participants || []).map(participant => ({
            ...participant,
            joinedAt: new Date(participant.joinedAt)
          }));
          state.raids = [...mockRaids, ...persistedRaids];
          state.participants = persistedParticipants;
        }
      }
    }
  )
);

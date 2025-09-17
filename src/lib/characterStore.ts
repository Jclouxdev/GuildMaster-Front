import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Character } from '@/types/raid';
import { mockCharacters } from './mockData';

interface CharacterStore {
  characters: Character[];
  isLoaded: boolean;
  addCharacter: (character: Omit<Character, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCharacter: (id: string, updates: Partial<Character>) => void;
  deleteCharacter: (id: string) => void;
  setMainCharacter: (id: string) => void;
  getCharacterById: (id: string) => Character | undefined;
  getUserCharacters: (userId: string) => Character[];
  getMainCharacter: (userId: string) => Character | undefined;
  loadInitialData: () => void;
  ensureMainCharacter: (userId: string) => void;
}

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set, get) => ({
      characters: [],
      isLoaded: false,
      
      addCharacter: (characterData) => {
        const { characters } = get();
        
        // Si c'est le premier personnage de l'utilisateur, le marquer comme principal
        const userCharacters = characters.filter(c => c.userId === characterData.userId);
        const isFirstCharacter = userCharacters.length === 0;
        
        const newCharacter: Character = {
          ...characterData,
          id: `char_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          isMain: isFirstCharacter || characterData.isMain || false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        // Si on marque ce personnage comme principal, dé-marquer les autres
        let updatedCharacters = characters;
        if (newCharacter.isMain) {
          updatedCharacters = characters.map(c => 
            c.userId === newCharacter.userId && c.isMain
              ? { ...c, isMain: false }
              : c
          );
        }
        
        set(() => ({
          characters: [...updatedCharacters, newCharacter]
        }));
      },
      
      updateCharacter: (id, updates) => {
        set((state) => {
          let updatedCharacters = state.characters.map(character => 
            character.id === id 
              ? { ...character, ...updates, updatedAt: new Date() }
              : character
          );
          
          // Si on marque ce personnage comme principal, dé-marquer les autres du même utilisateur
          if (updates.isMain === true) {
            const updatedCharacter = updatedCharacters.find(c => c.id === id);
            if (updatedCharacter) {
              updatedCharacters = updatedCharacters.map(c => 
                c.userId === updatedCharacter.userId && c.id !== id && c.isMain
                  ? { ...c, isMain: false }
                  : c
              );
            }
          }
          
          return { characters: updatedCharacters };
        });
      },
      
      deleteCharacter: (id) => {
        set((state) => {
          const characterToDelete = state.characters.find(c => c.id === id);
          const remainingCharacters = state.characters.filter(c => c.id !== id);
          
          // Si on supprime le personnage principal, promouvoir le premier restant
          if (characterToDelete?.isMain && characterToDelete.userId) {
            const userCharacters = remainingCharacters.filter(c => c.userId === characterToDelete.userId);
            if (userCharacters.length > 0) {
              const newMainIndex = remainingCharacters.findIndex(c => c.id === userCharacters[0].id);
              if (newMainIndex !== -1) {
                remainingCharacters[newMainIndex] = { ...remainingCharacters[newMainIndex], isMain: true };
              }
            }
          }
          
          return { characters: remainingCharacters };
        });
      },

      setMainCharacter: (id) => {
        set((state) => {
          const character = state.characters.find(c => c.id === id);
          if (!character) return state;
          
          return {
            characters: state.characters.map(c => ({
              ...c,
              isMain: c.userId === character.userId ? c.id === id : c.isMain
            }))
          };
        });
      },

      getCharacterById: (id) => {
        const { characters } = get();
        return characters.find(c => c.id === id);
      },

      getUserCharacters: (userId) => {
        const { characters } = get();
        return characters.filter(c => c.userId === userId).sort((a, b) => {
          if (a.isMain && !b.isMain) return -1;
          if (!a.isMain && b.isMain) return 1;
          return a.name.localeCompare(b.name);
        });
      },

      getMainCharacter: (userId) => {
        const { characters } = get();
        return characters.find(c => c.userId === userId && c.isMain);
      },

      ensureMainCharacter: (userId) => {
        const { characters } = get();
        const userCharacters = characters.filter(c => c.userId === userId);
        const hasMainCharacter = userCharacters.some(c => c.isMain);
        
        if (!hasMainCharacter && userCharacters.length > 0) {
          // Promouvoir le premier personnage comme principal
          get().setMainCharacter(userCharacters[0].id);
        }
      },
      
      loadInitialData: () => {
        const { isLoaded, characters } = get();
        if (!isLoaded) {
          // Conserver les personnages persistés et ajouter les mocks s'ils ne sont pas déjà présents
          const persistedCharacters = characters.filter(character => 
            !mockCharacters.some(mockChar => mockChar.id === character.id)
          );
          
          set({
            characters: [...mockCharacters, ...persistedCharacters],
            isLoaded: true
          });
        }
      }
    }),
    {
      name: 'character-store',
      // On ne persiste que les personnages ajoutés, pas les données mock
      partialize: (state) => ({
        characters: state.characters.filter(character => 
          !mockCharacters.some(mockChar => mockChar.id === character.id)
        ),
        isLoaded: state.isLoaded
      }),
      // Merge les données persistées avec les mock data et convertit les dates
      onRehydrateStorage: () => (state) => {
        if (state) {
          const persistedCharacters = (state.characters || []).map(character => ({
            ...character,
            createdAt: new Date(character.createdAt),
            updatedAt: new Date(character.updatedAt)
          }));
          state.characters = [...mockCharacters, ...persistedCharacters];
        }
      }
    }
  )
);

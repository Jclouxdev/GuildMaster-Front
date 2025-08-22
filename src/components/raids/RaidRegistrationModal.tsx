'use client';

import { useState } from 'react';
import { Character } from '@/types/raid';

interface RaidRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  raidId: string;
  raidName: string;
  userCharacters: Character[];
  onRegister: (characterIds: string[], notes?: string) => void;
}

export default function RaidRegistrationModal({
  isOpen,
  onClose,
  raidName,
  userCharacters,
  onRegister
}: RaidRegistrationModalProps) {
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleCharacterToggle = (characterId: string) => {
    setSelectedCharacters(prev => 
      prev.includes(characterId)
        ? prev.filter(id => id !== characterId)
        : [...prev, characterId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCharacters.length === 0) return;

    setIsLoading(true);
    try {
      await onRegister(selectedCharacters, notes);
      onClose();
      setSelectedCharacters([]);
      setNotes('');
    } catch (error) {
      console.error('Error registering for raid:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getClassColor = (className: string) => {
    const colors: Record<string, string> = {
      'Warrior': 'bg-yellow-100 text-yellow-800',
      'Paladin': 'bg-pink-100 text-pink-800',
      'Hunter': 'bg-green-100 text-green-800',
      'Rogue': 'bg-purple-100 text-purple-800',
      'Priest': 'bg-gray-100 text-gray-800',
      'Shaman': 'bg-blue-100 text-blue-800',
      'Mage': 'bg-cyan-100 text-cyan-800',
      'Warlock': 'bg-purple-100 text-purple-800',
      'Monk': 'bg-green-100 text-green-800',
      'Druid': 'bg-orange-100 text-orange-800',
      'Demon Hunter': 'bg-purple-100 text-purple-800',
      'Death Knight': 'bg-gray-100 text-gray-800',
      'Evoker': 'bg-emerald-100 text-emerald-800'
    };
    return colors[className] || 'bg-gray-100 text-gray-800';
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Tank': return 'bg-blue-100 text-blue-800';
      case 'Healer': return 'bg-green-100 text-green-800';
      case 'DPS': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              S&apos;inscrire au raid
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Raid Info */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900">{raidName}</h3>
            <p className="text-blue-700 text-sm">
              Sélectionnez les personnages que vous souhaitez proposer pour ce raid
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Character Selection */}
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">
                Vos personnages ({userCharacters.length})
              </h4>
              
              {userCharacters.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Vous n&apos;avez pas encore de personnages.</p>
                  <p className="text-sm">Créez un personnage pour pouvoir vous inscrire aux raids.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {userCharacters.map((character) => (
                    <label
                      key={character.id}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedCharacters.includes(character.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCharacters.includes(character.id)}
                        onChange={() => handleCharacterToggle(character.id)}
                        className="mr-4 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900">
                                  {character.name}
                                </span>
                                {character.isMain && (
                                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                                    Main
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-600">
                                Niveau {character.level} {character.specializations[0]?.spec && `${character.specializations[0].spec} `}{character.class}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getClassColor(character.class)}`}>
                              {character.class}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(character.primaryRole)}`}>
                              {character.primaryRole}
                            </span>
                            {character.itemLevel && (
                              <span className="text-sm text-gray-600">
                                iLvl {character.itemLevel}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Notes (optionnel)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Commentaires, disponibilités, préférences..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={selectedCharacters.length === 0 || isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Inscription...' : `S'inscrire (${selectedCharacters.length} personnage${selectedCharacters.length > 1 ? 's' : ''})`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Character, WowClass } from '@/types/raid';
import { WOW_CLASSES_DATA, MASTERY_LEVELS, mockCharacters } from '@/lib/mockData';
import CharacterForm from '@/components/characters/CharacterForm';

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>(mockCharacters);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);

  const handleSaveCharacter = (characterData: Partial<Character>) => {
    if (editingCharacter) {
      // Update existing character
      setCharacters(characters.map(c => 
        c.id === editingCharacter.id 
          ? { ...editingCharacter, ...characterData } as Character
          : c
      ));
      setEditingCharacter(null);
    } else {
      // Add new character
      const newCharacter = {
        ...characterData,
        id: crypto.randomUUID(),
        userId: '1', // Mock user ID
        createdAt: new Date(),
        updatedAt: new Date()
      } as Character;
      setCharacters([...characters, newCharacter]);
      setShowAddForm(false);
    }
  };

  const handleDeleteCharacter = (characterId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce personnage ?')) {
      setCharacters(characters.filter(c => c.id !== characterId));
    }
  };

  const getRoleColor = (role: 'Tank' | 'Healer' | 'DPS') => {
    switch (role) {
      case 'Tank': return 'bg-blue-100 text-blue-800';
      case 'Healer': return 'bg-green-100 text-green-800';
      case 'DPS': return 'bg-red-100 text-red-800';
    }
  };

  const getClassColor = (wowClass: WowClass) => {
    const classColors: Record<WowClass, string> = {
      'Warrior': 'text-amber-600',
      'Paladin': 'text-pink-400',
      'Hunter': 'text-green-600',
      'Rogue': 'text-yellow-500',
      'Priest': 'text-gray-100',
      'Shaman': 'text-blue-500',
      'Mage': 'text-cyan-400',
      'Warlock': 'text-purple-500',
      'Monk': 'text-green-400',
      'Druid': 'text-orange-500',
      'Demon Hunter': 'text-purple-700',
      'Death Knight': 'text-red-600',
      'Evoker': 'text-emerald-500'
    };
    return classColors[wowClass] || 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mes Personnages</h1>
              <p className="text-gray-600 mt-2">
                Gérez vos personnages, leurs spécialisations et niveaux de maîtrise
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Ajouter un personnage
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{characters.length}</div>
              <div className="text-sm text-gray-600">Personnages total</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {characters.filter(c => c.isMain).length}
              </div>
              <div className="text-sm text-gray-600">Personnages principaux</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {characters.reduce((acc, c) => acc + c.specializations.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Spécialisations total</div>
            </div>
          </div>
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {characters.map((character) => (
            <div key={character.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {/* Character Header */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold flex items-center">
                      {character.name}
                      {character.isMain && (
                        <span className="ml-2 bg-yellow-500 text-yellow-900 text-xs px-2 py-1 rounded-full font-semibold">
                          MAIN
                        </span>
                      )}
                    </h3>
                    <p className={`text-lg font-semibold ${getClassColor(character.class)}`}>
                      {WOW_CLASSES_DATA[character.class].name} - Niveau {character.level}
                    </p>
                    <div className="flex items-center mt-2 space-x-4">
                      {character.itemLevel && (
                        <span className="text-sm">
                          <span className="text-gray-300">ilvl:</span> 
                          <span className="text-yellow-400 font-semibold ml-1">{character.itemLevel}</span>
                        </span>
                      )}
                      {character.server && (
                        <span className="text-sm text-gray-300">{character.server}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setEditingCharacter(character)}
                      className="text-gray-300 hover:text-white"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => handleDeleteCharacter(character.id)}
                      className="text-gray-300 hover:text-red-400"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Character Content */}
              <div className="p-4">
                {/* Primary Role */}
                <div className="mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(character.primaryRole)}`}>
                    Rôle principal: {character.primaryRole}
                  </span>
                </div>

                {/* Specializations */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Spécialisations</h4>
                  <div className="space-y-2">
                    {character.specializations.map((spec, index) => {
                      const masteryConfig = MASTERY_LEVELS.find(m => m.value === spec.masteryLevel);
                      return (
                        <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{spec.spec}</span>
                            {spec.isPreferred && (
                              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            )}
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${masteryConfig?.color}`}>
                            {masteryConfig?.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Notes */}
                {character.notes && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Notes</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
                      {character.notes}
                    </p>
                  </div>
                )}

                {/* Last Updated */}
                <div className="text-xs text-gray-500">
                  Mis à jour le {character.updatedAt.toLocaleDateString('fr-FR')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {characters.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun personnage</h3>
            <p className="mt-1 text-sm text-gray-500">
              Commencez par ajouter votre premier personnage pour participer aux raids.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Ajouter un personnage
              </button>
            </div>
          </div>
        )}

        {/* Character Forms */}
        {showAddForm && (
          <CharacterForm
            onSave={handleSaveCharacter}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {editingCharacter && (
          <CharacterForm
            character={editingCharacter}
            onSave={handleSaveCharacter}
            onCancel={() => setEditingCharacter(null)}
          />
        )}
      </div>
    </div>
  );
}

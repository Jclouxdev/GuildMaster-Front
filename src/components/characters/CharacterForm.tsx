'use client';

import { useState } from 'react';
import { Character, WowClass, WowSpec, MasteryLevel, CharacterSpecialization } from '@/types/raid';
import { WOW_CLASSES_DATA, MASTERY_LEVELS } from '@/lib/mockData';

interface CharacterFormProps {
  character?: Character;
  onSave: (character: Partial<Character>) => void;
  onCancel: () => void;
}

export default function CharacterForm({ character, onSave, onCancel }: CharacterFormProps) {
  const [formData, setFormData] = useState({
    name: character?.name || '',
    level: character?.level || 80,
    class: character?.class || 'Warrior' as WowClass,
    itemLevel: character?.itemLevel || '',
    server: character?.server || '',
    isMain: character?.isMain || false,
    notes: character?.notes || ''
  });

  const [selectedSpecs, setSelectedSpecs] = useState<CharacterSpecialization[]>(
    character?.specializations || []
  );

  const availableSpecs = WOW_CLASSES_DATA[formData.class].specs;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSpecs.length === 0) {
      alert('Veuillez sélectionner au moins une spécialisation');
      return;
    }

    // Déterminer le rôle principal basé sur la spécialisation préférée
    const preferredSpec = selectedSpecs.find(s => s.isPreferred);
    const specToCheck = preferredSpec || selectedSpecs[0];
    const specData = availableSpecs.find(s => s.name === specToCheck.spec);
    const primaryRole = specData?.role || 'DPS';

    const characterData: Partial<Character> = {
      ...formData,
      itemLevel: formData.itemLevel ? parseInt(formData.itemLevel.toString()) : undefined,
      specializations: selectedSpecs,
      primaryRole: primaryRole as 'Tank' | 'Healer' | 'DPS',
      createdAt: character?.createdAt || new Date(),
      updatedAt: new Date(),
      id: character?.id || crypto.randomUUID(),
      userId: character?.userId || '1' // Mock user ID
    };

    onSave(characterData);
  };

  const addSpecialization = () => {
    if (selectedSpecs.length >= availableSpecs.length) return;
    
    const usedSpecs = selectedSpecs.map(s => s.spec);
    const availableSpecsToAdd = availableSpecs.filter(s => !usedSpecs.includes(s.name));
    
    if (availableSpecsToAdd.length > 0) {
      const newSpec: CharacterSpecialization = {
        spec: availableSpecsToAdd[0].name,
        masteryLevel: 'Débutant',
        isPreferred: selectedSpecs.length === 0 // Premier spec = préféré par défaut
      };
      setSelectedSpecs([...selectedSpecs, newSpec]);
    }
  };

  const updateSpecialization = (index: number, updates: Partial<CharacterSpecialization>) => {
    const newSpecs = [...selectedSpecs];
    newSpecs[index] = { ...newSpecs[index], ...updates };
    
    // Si on marque une spec comme préférée, démarquer les autres
    if (updates.isPreferred) {
      newSpecs.forEach((spec, i) => {
        if (i !== index) spec.isPreferred = false;
      });
    }
    
    setSelectedSpecs(newSpecs);
  };

  const removeSpecialization = (index: number) => {
    const newSpecs = selectedSpecs.filter((_, i) => i !== index);
    
    // Si on supprime la spec préférée et qu'il reste des specs, marquer la première comme préférée
    if (selectedSpecs[index].isPreferred && newSpecs.length > 0) {
      newSpecs[0].isPreferred = true;
    }
    
    setSelectedSpecs(newSpecs);
  };

  const handleClassChange = (newClass: WowClass) => {
    setFormData({ ...formData, class: newClass });
    // Reset specializations when class changes
    setSelectedSpecs([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {character ? 'Modifier le personnage' : 'Ajouter un personnage'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du personnage *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Serveur
                </label>
                <input
                  type="text"
                  value={formData.server}
                  onChange={(e) => setFormData({ ...formData, server: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ex: Hyjal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niveau *
                </label>
                <input
                  type="number"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                  min="1"
                  max="80"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Item Level
                </label>
                <input
                  type="number"
                  value={formData.itemLevel}
                  onChange={(e) => setFormData({ ...formData, itemLevel: e.target.value })}
                  min="1"
                  max="600"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="ex: 480"
                />
              </div>
            </div>

            {/* Class Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Classe *
              </label>
              <select
                value={formData.class}
                onChange={(e) => handleClassChange(e.target.value as WowClass)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {Object.entries(WOW_CLASSES_DATA).map(([key, classData]) => (
                  <option key={key} value={key}>
                    {classData.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Specializations */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Spécialisations *
                </label>
                <button
                  type="button"
                  onClick={addSpecialization}
                  disabled={selectedSpecs.length >= availableSpecs.length}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  + Ajouter une spécialisation
                </button>
              </div>

              <div className="space-y-3">
                {selectedSpecs.map((spec, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Spécialisation
                        </label>
                        <select
                          value={spec.spec}
                          onChange={(e) => updateSpecialization(index, { spec: e.target.value as WowSpec })}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        >
                          {availableSpecs.map((availableSpec) => (
                            <option 
                              key={availableSpec.name} 
                              value={availableSpec.name}
                              disabled={selectedSpecs.some((s, i) => i !== index && s.spec === availableSpec.name)}
                            >
                              {availableSpec.name} ({availableSpec.role})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Niveau de maîtrise
                        </label>
                        <select
                          value={spec.masteryLevel}
                          onChange={(e) => updateSpecialization(index, { masteryLevel: e.target.value as MasteryLevel })}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        >
                          {MASTERY_LEVELS.map((level) => (
                            <option key={level.value} value={level.value}>
                              {level.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={spec.isPreferred}
                            onChange={(e) => updateSpecialization(index, { isPreferred: e.target.checked })}
                            className="mr-2"
                          />
                          <span className="text-xs text-gray-600">Préférée</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => removeSpecialization(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedSpecs.length === 0 && (
                <p className="text-gray-500 text-sm">
                  Aucune spécialisation sélectionnée. Cliquez sur &quot;Ajouter une spécialisation&quot; pour commencer.
                </p>
              )}
            </div>

            {/* Main Character */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isMain}
                  onChange={(e) => setFormData({ ...formData, isMain: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">
                  Personnage principal
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Marquez ce personnage comme votre main pour le prioriser dans les raids
              </p>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Disponibilités, préférences, commentaires..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {character ? 'Mettre à jour' : 'Ajouter le personnage'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

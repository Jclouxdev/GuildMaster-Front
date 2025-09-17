'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRosterStore, RosterSlot } from '@/lib/rosterStore';
import { useRaidStore } from '@/lib/raidStore';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/components/providers/NotificationProvider';
import { Raid, RaidParticipant, WowClass } from '@/types/raid';

interface RosterManagerProps {
  raidId: string;
}

const roleIcons = {
  Tank: '🛡️',
  Healer: '💚',
  DPS: '⚔️'
};

const roleColors = {
  Tank: 'bg-blue-100 border-blue-300 text-blue-800',
  Healer: 'bg-green-100 border-green-300 text-green-800',
  DPS: 'bg-red-100 border-red-300 text-red-800'
};

const classColors: Record<WowClass, string> = {
  'Warrior': 'bg-amber-100 text-amber-800',
  'Paladin': 'bg-pink-100 text-pink-800',
  'Hunter': 'bg-green-100 text-green-800',
  'Rogue': 'bg-yellow-100 text-yellow-800',
  'Priest': 'bg-gray-100 text-gray-800',
  'Shaman': 'bg-blue-100 text-blue-800',
  'Mage': 'bg-cyan-100 text-cyan-800',
  'Warlock': 'bg-purple-100 text-purple-800',
  'Monk': 'bg-emerald-100 text-emerald-800',
  'Druid': 'bg-orange-100 text-orange-800',
  'Demon Hunter': 'bg-violet-100 text-violet-800',
  'Death Knight': 'bg-slate-100 text-slate-800',
  'Evoker': 'bg-teal-100 text-teal-800'
};

export default function RosterManager({ raidId }: RosterManagerProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const { getRaidById, getParticipantsByRaidId } = useRaidStore();
  const {
    getRosterByRaidId,
    createRosterComposition,
    updateRosterComposition,
    assignParticipantToSlot,
    removeParticipantFromSlot,
    getUnassignedParticipants,
    loadInitialData
  } = useRosterStore();

  const [raid, setRaid] = useState<Raid | null>(null);
  const [participants, setParticipants] = useState<RaidParticipant[]>([]);
  const [roster, setRoster] = useState(getRosterByRaidId(raidId));
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ tanks: 2, healers: 4, dps: 14 });
  const [draggedParticipant, setDraggedParticipant] = useState<RaidParticipant | null>(null);
  const [shakeSlotId, setShakeSlotId] = useState<string | null>(null);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Fonction pour forcer la mise à jour
  const triggerUpdate = () => {
    setForceUpdate(prev => prev + 1);
  };

  // Fonction pour déclencher l'effet de shake
  const triggerShake = (slotId: string) => {
    setShakeSlotId(slotId);
    setTimeout(() => setShakeSlotId(null), 600);
  };

  useEffect(() => {
    loadInitialData();
    
    const foundRaid = getRaidById(raidId);
    const raidParticipants = getParticipantsByRaidId(raidId);
    
    if (foundRaid) {
      setRaid(foundRaid);
      setParticipants(raidParticipants);
    } else {
      router.push('/raids');
      return;
    }

    const currentRoster = getRosterByRaidId(raidId);
    setRoster(currentRoster);

    if (!currentRoster && foundRaid) {
      const defaultComposition = getDefaultComposition(foundRaid.maxPlayers);
      setEditForm(defaultComposition);
      createRosterComposition(raidId, defaultComposition.tanks, defaultComposition.healers, defaultComposition.dps);
    } else if (currentRoster) {
      setEditForm({
        tanks: currentRoster.tanks,
        healers: currentRoster.healers,
        dps: currentRoster.dps
      });
    }
  }, [raidId, forceUpdate, loadInitialData, getRaidById, getParticipantsByRaidId, getRosterByRaidId, router, createRosterComposition]);

  // Effect séparé pour surveiller les changements du roster store
  useEffect(() => {
    const currentRoster = getRosterByRaidId(raidId);
    setRoster(currentRoster);
  }, [raidId, forceUpdate, getRosterByRaidId]);

  // Recharger le roster après les modifications
  useEffect(() => {
    setRoster(getRosterByRaidId(raidId));
  }, [raidId, getRosterByRaidId]);

  const getDefaultComposition = (maxPlayers: number) => {
    // Composition standard basée sur la taille du raid
    if (maxPlayers <= 10) {
      return { tanks: 2, healers: 2, dps: 6 };
    } else if (maxPlayers <= 20) {
      return { tanks: 2, healers: 4, dps: 14 };
    } else {
      return { tanks: 3, healers: 6, dps: 21 };
    }
  };

  const handleSaveComposition = () => {
    if (editForm.tanks + editForm.healers + editForm.dps !== raid?.maxPlayers) {
      addNotification({
        type: 'info',
        title: 'Erreur de composition',
        message: 'Le total des rôles doit correspondre au nombre maximum de joueurs du raid'
      });
      return;
    }

    updateRosterComposition(raidId, editForm.tanks, editForm.healers, editForm.dps);
    setIsEditing(false);
    addNotification({
      type: 'update',
      title: 'Composition mise à jour',
      message: 'La composition du roster a été mise à jour avec succès'
    });
  };

  const handleDragStart = (participant: RaidParticipant) => {
    setDraggedParticipant(participant);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, slot: RosterSlot) => {
    e.preventDefault();
    
    if (!draggedParticipant) return;

    // Vérifier si le participant peut être assigné à ce slot (rôle compatible)
    if (draggedParticipant.role !== slot.role) {
      // Déclencher l'effet de shake
      triggerShake(slot.id);
      
      addNotification({
        type: 'info',
        title: 'Assignation impossible',
        message: `Ce joueur est ${draggedParticipant.role}, il ne peut pas être assigné à un slot ${slot.role}`
      });
      setDraggedParticipant(null);
      return;
    }

    assignParticipantToSlot(raidId, slot.id, draggedParticipant);
    addNotification({
      type: 'update',
      title: 'Joueur assigné',
      message: `${draggedParticipant.playerName} assigné au slot ${slot.role}`
    });
    setDraggedParticipant(null);
    
    // Forcer la mise à jour du composant
    triggerUpdate();
  };

  const handleRemoveFromSlot = (slotId: string) => {
    removeParticipantFromSlot(raidId, slotId);
    addNotification({
      type: 'update',
      title: 'Joueur retiré',
      message: 'Le joueur a été retiré du slot'
    });
    
    // Forcer la mise à jour du composant
    triggerUpdate();
  };

  const unassignedParticipants = roster ? getUnassignedParticipants(raidId, participants) : participants;
  const assignedCount = roster ? roster.slots.filter(slot => slot.assignedParticipant).length : 0;
  const totalSlots = roster ? roster.totalSlots : 0;

  // Vérifier les permissions
  const canManageRoster = user && (user.role === 'Guild Master' || user.role === 'Officer');

  if (!canManageRoster) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-700">Vous n&apos;avez pas les permissions nécessaires pour gérer le roster de ce raid.</p>
        </div>
      </div>
    );
  }

  if (!raid || !roster) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion du Roster</h1>
            <p className="text-gray-600 mt-1">
              {raid.name} - {raid.instance}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm font-medium">
                {assignedCount}/{totalSlots} slots assignés
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${totalSlots > 0 ? (assignedCount / totalSlots) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500">
                {totalSlots > 0 ? Math.round((assignedCount / totalSlots) * 100) : 0}%
              </span>
            </div>
          </div>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Retour
          </button>
        </div>

        {/* Configuration de la composition */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Composition du Raid</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {isEditing ? 'Annuler' : 'Modifier'}
            </button>
          </div>

          {isEditing ? (
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanks</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={editForm.tanks}
                  onChange={(e) => setEditForm({ ...editForm, tanks: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Healers</label>
                <input
                  type="number"
                  min="1"
                  max="8"
                  value={editForm.healers}
                  onChange={(e) => setEditForm({ ...editForm, healers: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">DPS</label>
                <input
                  type="number"
                  min="1"
                  max="25"
                  value={editForm.dps}
                  onChange={(e) => setEditForm({ ...editForm, dps: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleSaveComposition}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">🛡️</div>
                <div className="text-2xl font-bold text-blue-600">{roster.tanks}</div>
                <div className="text-sm text-gray-600">Tanks</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">💚</div>
                <div className="text-2xl font-bold text-green-600">{roster.healers}</div>
                <div className="text-sm text-gray-600">Healers</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">⚔️</div>
                <div className="text-2xl font-bold text-red-600">{roster.dps}</div>
                <div className="text-sm text-gray-600">DPS</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-2xl mb-2">👥</div>
                <div className="text-2xl font-bold text-gray-600">{roster.totalSlots}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Liste des joueurs non assignés */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-4 sticky top-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <span className="mr-2">👥</span>
              Joueurs Disponibles ({unassignedParticipants.length})
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {unassignedParticipants.map((participant) => (
                <div
                  key={participant.id}
                  draggable
                  onDragStart={() => handleDragStart(participant)}
                  className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-move"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{participant.playerName}</div>
                      <div className="text-xs text-gray-500">{participant.characterName}</div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[participant.role]}`}>
                        {roleIcons[participant.role]}
                      </span>
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${classColors[participant.characterClass]}`}>
                        {participant.characterClass}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {unassignedParticipants.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-4">
                  Tous les joueurs sont assignés
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Roster slots */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {['Tank', 'Healer', 'DPS'].map((role) => {
              const roleSlots = roster.slots.filter(slot => slot.role === role);
              if (roleSlots.length === 0) return null;

              return (
                <div key={role} className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <span className="mr-2">{roleIcons[role as keyof typeof roleIcons]}</span>
                    {role}s ({roleSlots.filter(s => s.assignedParticipant).length}/{roleSlots.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {roleSlots.map((slot, index) => (
                      <div
                        key={slot.id}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, slot)}
                        className={`
                          p-4 border-2 border-dashed rounded-lg min-h-[100px] transition-colors
                          ${slot.assignedParticipant 
                            ? 'border-green-300 bg-green-50' 
                            : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                          }
                          ${shakeSlotId === slot.id ? 'shake' : ''}
                        `}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-medium text-gray-600">
                            {role} #{index + 1}
                          </span>
                          {slot.isRequired && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                              Requis
                            </span>
                          )}
                        </div>

                        {slot.assignedParticipant ? (
                          <div className="space-y-2">
                            <div className="font-medium text-sm">{slot.assignedParticipant.playerName}</div>
                            <div className="text-xs text-gray-500">{slot.assignedParticipant.characterName}</div>
                            <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${classColors[slot.assignedParticipant.characterClass]}`}>
                              {slot.assignedParticipant.characterClass}
                            </div>
                            <button
                              onClick={() => handleRemoveFromSlot(slot.id)}
                              className="block w-full text-xs text-red-600 hover:text-red-800 mt-2"
                            >
                              Retirer
                            </button>
                          </div>
                        ) : (
                          <div className="text-center text-gray-400 py-4">
                            <div className="text-sm">Glissez un joueur ici</div>
                            {slot.preferredClasses && slot.preferredClasses.length > 0 && (
                              <div className="text-xs mt-2">
                                Classes préférées: {slot.preferredClasses.slice(0, 3).join(', ')}
                                {slot.preferredClasses.length > 3 && '...'}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

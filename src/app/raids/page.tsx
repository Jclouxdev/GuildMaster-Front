'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getRegistrationsByRaidId } from '@/lib/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/components/providers/NotificationProvider';
import { Raid } from '@/types/raid';
import RaidCard from '@/components/raids/RaidCard';
import RaidFilters from '@/components/raids/RaidFilters';
import CalendarView from '@/components/raids/CalendarView';
import { useRaidStore } from '@/lib/raidStore';

export default function RaidsPage() {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const { raids, addParticipant, loadInitialData } = useRaidStore();
  const [filteredRaids, setFilteredRaids] = useState<Raid[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  useEffect(() => {
    setFilteredRaids(raids);
  }, [raids]);

  const handleFilterChange = (filters: {
    difficulty?: string;
    status?: string;
    instance?: string;
    startDate?: Date;
    endDate?: Date;
  }) => {
    let filtered = raids;

    if (filters.difficulty) {
      filtered = filtered.filter(raid => raid.difficulty === filters.difficulty);
    }

    if (filters.status) {
      filtered = filtered.filter(raid => raid.status === filters.status);
    }

    if (filters.instance) {
      filtered = filtered.filter(raid => raid.instance === filters.instance);
    }

    if (filters.startDate) {
      filtered = filtered.filter(raid => raid.date >= filters.startDate!);
    }

    if (filters.endDate) {
      filtered = filtered.filter(raid => raid.date <= filters.endDate!);
    }

    setFilteredRaids(filtered);
  };

  const getRaidParticipantCount = (raidId: string) => {
    return getRegistrationsByRaidId(raidId).length;
  };

  const handleJoinRaid = (raidId: string) => {
    // Trouver le raid pour obtenir son nom pour la notification
    const raid = raids.find(r => r.id === raidId);
    
    // Utiliser les données de l'utilisateur connecté ou des valeurs par défaut pour la démo
    const currentUser = user || { name: 'Joueur Demo', email: 'demo@example.com' };
    
    const newParticipant = {
      playerId: '1', // ID du joueur connecté (pour la démo)
      playerName: currentUser.name,
      characterId: '1',
      characterName: 'MonPersonnage',
      characterClass: 'Paladin' as const,
      characterLevel: 80,
      role: 'Tank' as const,
      status: 'Confirmed' as const
    };
    
    addParticipant(raidId, newParticipant);
    
    // Afficher la notification de confirmation
    addNotification({
      type: 'registration',
      title: 'Inscription réussie !',
      message: `Vous vous êtes inscrit(e) au raid ${raid ? `"${raid.name}"` : ''}`
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Planning et Raids</h1>
            <div className="flex gap-4">
              <Link
                href="/raids/create"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Créer un raid
              </Link>
              <Link
                href="/raids/calendar"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Vue calendrier
              </Link>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Vue liste
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-md transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Vue calendrier
            </button>
          </div>

          {/* Filters */}
          <RaidFilters onFilterChange={handleFilterChange} />
        </div>

        {/* Content */}
        {viewMode === 'list' ? (
          <div className="space-y-4">
            {filteredRaids.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Aucun raid trouvé avec ces filtres</p>
              </div>
            ) : (
              filteredRaids.map((raid) => (
                <RaidCard
                  key={raid.id}
                  raid={raid}
                  participantCount={getRaidParticipantCount(raid.id)}
                  onJoinRaid={handleJoinRaid}
                />
              ))
            )}
          </div>
        ) : (
          <CalendarView raids={filteredRaids} />
        )}
      </div>
    </div>
  );
}

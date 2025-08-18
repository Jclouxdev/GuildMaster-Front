'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockRaids, getRegistrationsByRaidId } from '@/lib/mockData';
import { Raid } from '@/types/raid';
import RaidCard from '@/components/raids/RaidCard';
import RaidFilters from '@/components/raids/RaidFilters';
import CalendarView from '@/components/raids/CalendarView';

export default function RaidsPage() {
  const [raids] = useState<Raid[]>(mockRaids);
  const [filteredRaids, setFilteredRaids] = useState<Raid[]>(mockRaids);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

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

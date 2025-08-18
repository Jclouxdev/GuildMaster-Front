'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockRaids } from '@/lib/mockData';
import { Raid } from '@/types/raid';
import CalendarView from '@/components/raids/CalendarView';
import RaidFilters from '@/components/raids/RaidFilters';

export default function RaidCalendarPage() {
  const [raids] = useState<Raid[]>(mockRaids);
  const [filteredRaids, setFilteredRaids] = useState<Raid[]>(mockRaids);

  const handleFilterChange = (filters: {
    difficulty?: string;
    status?: string;
    minLevel?: number;
    maxLevel?: number;
    dateFrom?: Date;
    dateTo?: Date;
  }) => {
    let filtered = raids;

    if (filters.difficulty) {
      filtered = filtered.filter(raid => raid.difficulty === filters.difficulty);
    }

    if (filters.status) {
      filtered = filtered.filter(raid => raid.status === filters.status);
    }

    if (filters.minLevel !== undefined) {
      filtered = filtered.filter(raid => raid.requiredLevel >= filters.minLevel!);
    }

    if (filters.maxLevel !== undefined) {
      filtered = filtered.filter(raid => raid.requiredLevel <= filters.maxLevel!);
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(raid => raid.date >= filters.dateFrom!);
    }

    if (filters.dateTo) {
      filtered = filtered.filter(raid => raid.date <= filters.dateTo!);
    }

    setFilteredRaids(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Calendrier des Raids</h1>
            <div className="flex gap-4">
              <Link
                href="/raids"
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                Vue liste
              </Link>
              <Link
                href="/raids/create"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Créer un raid
              </Link>
            </div>
          </div>

          {/* Filters */}
          <RaidFilters onFilterChange={handleFilterChange} />
        </div>

        {/* Calendar */}
        <CalendarView raids={filteredRaids} />

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Total des raids</h3>
            <p className="text-2xl font-bold text-gray-900">{filteredRaids.length}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Raids ouverts</h3>
            <p className="text-2xl font-bold text-green-600">
              {filteredRaids.filter(raid => raid.status === 'Open').length}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Cette semaine</h3>
            <p className="text-2xl font-bold text-blue-600">
              {filteredRaids.filter(raid => {
                const now = new Date();
                const weekEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                return raid.date >= now && raid.date <= weekEnd;
              }).length}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-500">Raids mythiques</h3>
            <p className="text-2xl font-bold text-red-600">
              {filteredRaids.filter(raid => raid.difficulty === 'Mythic').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

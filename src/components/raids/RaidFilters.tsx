'use client';

import { useState } from 'react';

interface FilterState {
  difficulty?: string;
  status?: string;
  instance?: string;
  startDate?: Date;
  endDate?: Date;
}

interface RaidFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export default function RaidFilters({ onFilterChange }: RaidFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({});
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: string | number | Date | undefined) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Filtres</h3>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-gray-600 hover:text-gray-800 underline"
            >
              Effacer les filtres
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            {isExpanded ? 'Masquer' : 'Afficher'} les filtres
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Difficulty Filter */}
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
              Difficulté
            </label>
            <select
              id="difficulty"
              value={filters.difficulty || ''}
              onChange={(e) => handleFilterChange('difficulty', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Toutes</option>
              <option value="Normal">Normal</option>
              <option value="Heroic">Héroïque</option>
              <option value="Mythic">Mythique</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Statut
            </label>
            <select
              id="status"
              value={filters.status || ''}
              onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tous</option>
              <option value="Open">Ouvert</option>
              <option value="Full">Complet</option>
              <option value="InProgress">En cours</option>
              <option value="Completed">Terminé</option>
              <option value="Cancelled">Annulé</option>
            </select>
          </div>

          {/* Instance Filter */}
          <div>
            <label htmlFor="instance" className="block text-sm font-medium text-gray-700 mb-1">
              Instance
            </label>
            <select
              id="instance"
              value={filters.instance || ''}
              onChange={(e) => handleFilterChange('instance', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Toutes</option>
              <option value="Aberrus, the Shadowed Crucible">Aberrus</option>
              <option value="Vault of the Incarnates">Vault of the Incarnates</option>
              <option value="Amirdrassil, the Dream's Hope">Amirdrassil</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Date de début
            </label>
            <input
              type="date"
              id="startDate"
              value={filters.startDate ? filters.startDate.toISOString().split('T')[0] : ''}
              onChange={(e) => handleFilterChange('startDate', e.target.value ? new Date(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.difficulty && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              Difficulté: {filters.difficulty}
              <button
                onClick={() => handleFilterChange('difficulty', undefined)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          )}
          {filters.status && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
              Statut: {filters.status}
              <button
                onClick={() => handleFilterChange('status', undefined)}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          )}
          {filters.instance && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
              Instance: {filters.instance}
              <button
                onClick={() => handleFilterChange('instance', undefined)}
                className="ml-2 text-purple-600 hover:text-purple-800"
              >
                ×
              </button>
            </span>
          )}
          {filters.startDate && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
              À partir du: {filters.startDate.toLocaleDateString('fr-FR')}
              <button
                onClick={() => handleFilterChange('startDate', undefined)}
                className="ml-2 text-orange-600 hover:text-orange-800"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

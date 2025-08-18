'use client';

import Link from 'next/link';
import { Raid } from '@/types/raid';

interface RaidCardProps {
  raid: Raid;
  participantCount: number;
}

export default function RaidCard({ raid, participantCount }: RaidCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Normal': return 'bg-green-100 text-green-800';
      case 'Heroic': return 'bg-orange-100 text-orange-800';
      case 'Mythic': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-green-100 text-green-800';
      case 'Full': return 'bg-red-100 text-red-800';
      case 'InProgress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours === 0) return `${remainingMinutes}min`;
    if (remainingMinutes === 0) return `${hours}h`;
    return `${hours}h ${remainingMinutes}min`;
  };

  const isRaidFull = participantCount >= raid.maxPlayers;
  const canJoin = raid.status === 'Open' && !isRaidFull;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{raid.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(raid.difficulty)}`}>
              {raid.difficulty}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(raid.status)}`}>
              {raid.status}
            </span>
          </div>
          <p className="text-gray-600 mb-3">{raid.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
            <div>
              <span className="font-medium">Date:</span>
              <p>{formatDate(raid.date)}</p>
            </div>
            <div>
              <span className="font-medium">Durée:</span>
              <p>{formatDuration(raid.duration)}</p>
            </div>
            <div>
              <span className="font-medium">Participants:</span>
              <p>{participantCount}/{raid.maxPlayers}</p>
            </div>
            <div>
              <span className="font-medium">Instance:</span>
              <p>{raid.instance}</p>
            </div>
            {raid.objective && (
              <div className="col-span-2 md:col-span-4">
                <span className="font-medium">Objectif:</span>
                <p>{raid.objective}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="flex gap-2">
          <Link
            href={`/raids/${raid.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Voir détails
          </Link>
          <Link
            href={`/raids/${raid.id}/edit`}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Éditer
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          {canJoin ? (
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
              S&apos;inscrire
            </button>
          ) : isRaidFull ? (
            <span className="text-red-600 font-medium">Complet</span>
          ) : (
            <span className="text-gray-500 font-medium">Fermé</span>
          )}
          
          <div className="w-full bg-gray-200 rounded-full h-2 ml-4" style={{ width: '100px' }}>
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${Math.min((participantCount / raid.maxPlayers) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

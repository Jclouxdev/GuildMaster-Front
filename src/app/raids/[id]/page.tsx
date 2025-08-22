'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getRaidById, getParticipantsByRaidId } from '@/lib/mockData';
import { Raid, RaidParticipant } from '@/types/raid';

export default function RaidDetailPage() {
  const params = useParams();
  const [raid, setRaid] = useState<Raid | null>(null);
  const [participants, setParticipants] = useState<RaidParticipant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const raidId = params.id as string;
    const foundRaid = getRaidById(raidId);
    const raidParticipants = getParticipantsByRaidId(raidId);

    if (foundRaid) {
      setRaid(foundRaid);
      setParticipants(raidParticipants);
    }
    setIsLoading(false);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!raid) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Raid introuvable</h1>
          <Link
            href="/raids"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Retour aux raids
          </Link>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Normal': return 'bg-blue-100 text-blue-800';
      case 'Hard': return 'bg-orange-100 text-orange-800';
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Tank': return 'bg-blue-100 text-blue-800';
      case 'Healer': return 'bg-green-100 text-green-800';
      case 'DPS': return 'bg-red-100 text-red-800';
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

  const isRaidFull = participants.length >= raid.maxPlayers;
  const canJoin = raid.status === 'Open' && !isRaidFull;

  const roleStats = {
    Tank: participants.filter(p => p.role === 'Tank').length,
    Healer: participants.filter(p => p.role === 'Healer').length,
    DPS: participants.filter(p => p.role === 'DPS').length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            href="/raids"
            className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            ← Retour aux raids
          </Link>
        </div>

        {/* Raid Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{raid.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(raid.difficulty)}`}>
                  {raid.difficulty}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(raid.status)}`}>
                  {raid.status}
                </span>
              </div>
              <p className="text-gray-600 text-lg">{raid.description}</p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/raids/${raid.id}/edit`}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Éditer
              </Link>
              {canJoin && (
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                  S&apos;inscrire
                </button>
              )}
            </div>
          </div>

          {/* Raid Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <span className="font-medium text-gray-700">Date:</span>
              <p className="text-gray-900">{formatDate(raid.date)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Durée:</span>
              <p className="text-gray-900">{formatDuration(raid.duration)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Lieu:</span>
              <p className="text-gray-900">{raid.instance}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Joueurs max:</span>
              <p className="text-gray-900">{raid.maxPlayers}</p>
            </div>
          </div>

          {/* Objective */}
          {raid.objective && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-700 mb-2">Objectif:</h3>
              <p className="text-gray-900">{raid.objective}</p>
            </div>
          )}
        </div>

        {/* Participants Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Participants ({participants.length}/{raid.maxPlayers})
            </h2>
            
            {/* Progress Bar */}
            <div className="flex items-center gap-4">
              <div className="w-48 bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min((participants.length / raid.maxPlayers) * 100, 100)}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">
                {Math.round((participants.length / raid.maxPlayers) * 100)}%
              </span>
            </div>
          </div>

          {/* Role Statistics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{roleStats.Tank}</div>
              <div className="text-sm text-gray-600">Tanks</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{roleStats.Healer}</div>
              <div className="text-sm text-gray-600">Healers</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{roleStats.DPS}</div>
              <div className="text-sm text-gray-600">DPS</div>
            </div>
          </div>

          {/* Participants List */}
          {participants.length > 0 ? (
            <div className="space-y-2">
              {participants.map((participant) => {
                return (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
                        {participant.playerName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{participant.playerName}</div>
                        <div className="text-sm text-gray-600">
                          {participant.characterName} - Niveau {participant.characterLevel} {participant.characterClass}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(participant.role)}`}>
                        {participant.role}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        participant.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {participant.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Aucun participant inscrit pour le moment
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

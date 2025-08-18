'use client';

import { useState } from 'react';
import { Raid } from '@/types/raid';

interface CalendarViewProps {
  raids: Raid[];
}

export default function CalendarView({ raids }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getWeekDates = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Start from Monday
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const getRaidsForDate = (date: Date) => {
    return raids.filter(raid => {
      const raidDate = new Date(raid.date);
      return (
        raidDate.getDate() === date.getDate() &&
        raidDate.getMonth() === date.getMonth() &&
        raidDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Normal': return 'bg-green-500';
      case 'Heroic': return 'bg-orange-500';
      case 'Mythic': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const weekDates = getWeekDates(currentDate);
  const weekStart = weekDates[0];
  const weekEnd = weekDates[6];

  const formatWeekRange = () => {
    const startMonth = weekStart.toLocaleDateString('fr-FR', { month: 'long' });
    const endMonth = weekEnd.toLocaleDateString('fr-FR', { month: 'long' });
    const year = weekStart.getFullYear();
    
    if (startMonth === endMonth) {
      return `${startMonth} ${year}`;
    } else {
      return `${startMonth} - ${endMonth} ${year}`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Semaine du {weekStart.getDate()}-{weekEnd.getDate()} {formatWeekRange()}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigateWeek('prev')}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"
          >
            ← Semaine précédente
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Cette semaine
          </button>
          <button
            onClick={() => navigateWeek('next')}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md"
          >
            Semaine suivante →
          </button>
        </div>
      </div>

      {/* Week View */}
      <div className="grid grid-cols-7 gap-1">
        {/* Days Headers */}
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, index) => (
          <div key={day} className="p-4 text-center border-b border-gray-200">
            <div className="font-medium text-gray-700">{day}</div>
            <div className="text-lg font-semibold text-gray-900 mt-1">
              {weekDates[index].getDate()}
            </div>
          </div>
        ))}

        {/* Calendar Days */}
        {weekDates.map((date, index) => {
          const dayRaids = getRaidsForDate(date);
          const isToday = date.toDateString() === new Date().toDateString();

          return (
            <div
              key={index}
              className={`min-h-32 p-2 border-r border-gray-200 ${
                isToday ? 'bg-blue-50' : 'bg-white'
              }`}
            >
              {/* Raids for this day */}
              <div className="space-y-1">
                {dayRaids.map((raid) => (
                  <div
                    key={raid.id}
                    className={`text-xs p-2 rounded ${getDifficultyColor(raid.difficulty)} text-white`}
                    title={`${raid.name} - ${new Date(raid.date).toLocaleTimeString('fr-FR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}`}
                  >
                    <div className="font-medium truncate">{raid.name}</div>
                    <div className="text-xs opacity-90">
                      {new Date(raid.date).toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                    <div className="text-xs opacity-90">{raid.instance}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Time slots for more detailed view */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Détails des raids cette semaine</h3>
        <div className="space-y-2">
          {raids
            .filter(raid => {
              const raidDate = new Date(raid.date);
              return raidDate >= weekStart && raidDate <= weekEnd;
            })
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .map((raid) => (
              <div
                key={raid.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${getDifficultyColor(raid.difficulty)}`}></div>
                  <div>
                    <div className="font-medium text-gray-900">{raid.name}</div>
                    <div className="text-sm text-gray-600">{raid.instance}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {new Date(raid.date).toLocaleDateString('fr-FR', { 
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short'
                    })}
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(raid.date).toLocaleTimeString('fr-FR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm border-t border-gray-200 pt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Normal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span>Héroïque</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>Mythique</span>
        </div>
      </div>
    </div>
  );
}

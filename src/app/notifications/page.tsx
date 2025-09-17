'use client';

import { useState, useEffect } from 'react';

interface NotificationSettings {
  inscriptionRaid: {
    email: boolean;
    push: boolean;
  };
  rappelRaid: {
    email: boolean;
    push: boolean;
  };
  nouveauRaid: {
    email: boolean;
    push: boolean;
  };
  annulationRaid: {
    email: boolean;
    push: boolean;
  };
  messageGuilde: {
    email: boolean;
    push: boolean;
  };
}

const defaultSettings: NotificationSettings = {
  inscriptionRaid: { email: true, push: true },
  rappelRaid: { email: true, push: false },
  nouveauRaid: { email: true, push: true },
  annulationRaid: { email: true, push: true },
  messageGuilde: { email: false, push: true },
};

export default function NotificationsPage() {
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  // Charger les paramètres depuis le localStorage
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('notificationSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des paramètres:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sauvegarder les paramètres dans le localStorage
  const saveSettings = () => {
    try {
      localStorage.setItem('notificationSettings', JSON.stringify(settings));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  const updateSetting = (category: keyof NotificationSettings, type: 'email' | 'push', value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: value
      }
    }));
  };

  const notificationCategories = [
    {
      key: 'inscriptionRaid' as keyof NotificationSettings,
      title: 'Inscription aux raids',
      description: 'Notifications lors de l\'inscription ou désinscription à un raid'
    },
    {
      key: 'rappelRaid' as keyof NotificationSettings,
      title: 'Rappel de raid',
      description: 'Rappels avant le début d\'un raid auquel vous êtes inscrit'
    },
    {
      key: 'nouveauRaid' as keyof NotificationSettings,
      title: 'Nouveau raid',
      description: 'Notifications lors de la création de nouveaux raids'
    },
    {
      key: 'annulationRaid' as keyof NotificationSettings,
      title: 'Annulation de raid',
      description: 'Notifications lors de l\'annulation d\'un raid'
    },
    {
      key: 'messageGuilde' as keyof NotificationSettings,
      title: 'Messages de guilde',
      description: 'Messages importants de la guilde et annonces'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des paramètres...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Paramètres de notifications</h1>
            <p className="mt-2 text-gray-600">
              Configurez vos préférences de notification pour rester informé des événements importants.
            </p>
          </div>

          <div className="p-6">
            <div className="space-y-8">
              {notificationCategories.map((category) => (
                <div key={category.key} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900">{category.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">Email</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={settings[category.key].email}
                          onChange={(e) => updateSetting(category.key, 'email', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 11-15 0v5h5l-5-5-5 5h5z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">Push</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={settings[category.key].push}
                          onChange={(e) => updateSetting(category.key, 'push', e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={saveSettings}
                className={`px-6 py-2 rounded-md font-medium transition-all ${
                  isSaved
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isSaved ? (
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Sauvegardé !
                  </span>
                ) : (
                  'Sauvegarder'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Section d'informations supplémentaires */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-blue-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-blue-800 mb-2">À propos des notifications</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p>• <strong>Email</strong> : Notifications envoyées à votre adresse email</p>
                <p>• <strong>Push</strong> : Notifications push dans votre navigateur (nécessite l&apos;autorisation)</p>
                <p>• Les paramètres sont sauvegardés localement dans votre navigateur</p>
                <p>• Vous pouvez modifier ces paramètres à tout moment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

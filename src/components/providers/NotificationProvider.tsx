'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import NotificationToast, { Notification } from '../notifications/NotificationToast';

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Simulation de notifications pour la démo
  useEffect(() => {
    const demoNotifications = setTimeout(() => {
      // Notification de rappel J-1
      addNotification({
        type: 'raid-reminder',
        title: 'Rappel Raid J-1 !',
        message: 'Raid Héroïque Nerub-ar Palace demain à 20h00. N\'oubliez pas vos flasques !'
      });
    }, 3000); // 3 secondes après connexion

    const registrationDemo = setTimeout(() => {
      // Nouvelle inscription
      addNotification({
        type: 'registration',
        title: 'Nouvelle inscription',
        message: 'Lyralei s\'est inscrit(e) au raid de demain soir'
      });
    }, 8000); // 8 secondes après connexion

    return () => {
      clearTimeout(demoNotifications);
      clearTimeout(registrationDemo);
    };
  }, []);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearAllNotifications
    }}>
      {children}
      
      {/* Affichage des toasts */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.slice(0, 3).map((notification) => (
          <NotificationToast
            key={notification.id}
            notification={notification}
            onDismiss={removeNotification}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

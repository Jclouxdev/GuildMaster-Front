'use client';

import { useEffect, useState } from 'react';

export interface Notification {
  id: string;
  type: 'raid-reminder' | 'registration' | 'update' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  isRead?: boolean;
}

interface NotificationToastProps {
  notification: Notification;
  onDismiss: (id: string) => void;
  autoHide?: boolean;
  duration?: number;
}

export default function NotificationToast({ 
  notification, 
  onDismiss, 
  autoHide = true, 
  duration = 5000 
}: NotificationToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoHide) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onDismiss(notification.id);
        }, 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoHide, duration, notification.id, onDismiss]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDismiss(notification.id);
    }, 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'raid-reminder':
        return '⚔️';
      case 'registration':
        return '✅';
      case 'update':
        return '📝';
      default:
        return 'ℹ️';
    }
  };

  const getBgColor = () => {
    switch (notification.type) {
      case 'raid-reminder':
        return 'bg-orange-100 border-orange-500';
      case 'registration':
        return 'bg-green-100 border-green-500';
      case 'update':
        return 'bg-blue-100 border-blue-500';
      default:
        return 'bg-gray-100 border-gray-500';
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 ${getBgColor()} z-50 transform transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-2xl">{getIcon()}</span>
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {notification.title}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {notification.message}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              {notification.timestamp.toLocaleTimeString()}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleDismiss}
            >
              <span className="sr-only">Fermer</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

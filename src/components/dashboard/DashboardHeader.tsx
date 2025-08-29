'use client';

import { useState } from 'react';

interface DashboardHeaderProps {
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

export default function DashboardHeader({ onToggleSidebar, sidebarOpen }: DashboardHeaderProps) {
  const [notificationCount, setNotificationCount] = useState(3);

  // Fonction pour formater la date
  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  return (
    <>
      {/* Top line with icons */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        {/* Left side - Sidebar toggle */}
        <button 
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          aria-label="Toggle sidebar"
        >
          <svg 
            className="w-5 h-5 text-gray-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4 6h16M4 12h16M4 18h7" 
            />
          </svg>
        </button>

        {/* Right side - Notification + User Menu */}
        <div className="flex items-center space-x-4">
          {/* Notification */}
          <div className="relative">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative">
              <svg 
                className="w-5 h-5 text-gray-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                />
              </svg>
              
              {/* Notification Badge */}
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
          </div>

          {/* User Menu - Optional */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">AU</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

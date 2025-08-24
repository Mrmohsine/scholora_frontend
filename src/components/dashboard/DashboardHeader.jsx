// components/dashboard/DashboardHeader.tsx
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
    <div className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Menu toggle + Title + Status */}
        <div className="flex items-center space-x-4">
          {/* Hamburger Menu Button */}
          <button 
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 lg:hidden"
            aria-label="Toggle sidebar"
          >
            <svg 
              className="w-6 h-6 text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {sidebarOpen ? (
                // X icon when sidebar is open
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                // Hamburger icon when sidebar is closed
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>

          {/* Title and Status */}
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Platform Overview
            </h1>
            
            {/* Status Indicator */}
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              All Systems Operational
            </span>
          </div>
        </div>

        {/* Right side - Date + Notifications */}
        <div className="flex items-center space-x-4">
          {/* Date */}
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">
              {getCurrentDate()}
            </p>
            <p className="text-xs text-gray-400">
              Last updated: just now
            </p>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative">
              <svg 
                className="w-6 h-6 text-gray-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                />
              </svg>
              
              {/* Notification Badge */}
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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

      {/* Mobile date - shown on small screens */}
      <div className="mt-2 sm:hidden">
        <p className="text-xs text-gray-500">
          {getCurrentDate()} • Last updated: just now
        </p>
      </div>
    </div>
  );
}
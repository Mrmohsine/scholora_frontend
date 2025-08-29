'use client';

import { useState } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import DashboardHeader from '../../components/dashboard/DashboardHeader';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // ouvert par défaut

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg h-auto transition-all duration-300
          ${sidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0`}
      >
        {/* Passer isCollapsed pour afficher seulement icônes */}
        <Sidebar isCollapsed={!sidebarOpen} />
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader
          onToggleSidebar={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />

        {/* Zone de contenu */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

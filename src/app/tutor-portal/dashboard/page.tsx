// app/tutor-portal/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import TutorSidebar from '@/components/tutor/Sidebar';
import TutorDashboardHeader from '@/components/tutor/Dashboard/DashboardHeader';
import TutorDashboardStats from '@/components/tutor/Dashboard/DashboardStats';
import TodayClasses from '@/components/tutor/Dashboard/TodayClasses';
import AttendanceOverview from '@/components/tutor/Dashboard/AttendanceOverview';
import Messages from '@/components/tutor/Dashboard/Messages';
import LiveActivities from '@/components/tutor/Dashboard/LiveActivities';
import { authService } from '@/lib/auth/authService';

function TutorDashboardContent() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = authService.getUser();
    if (userData) {
      setUser(userData);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <TutorSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <TutorDashboardHeader user={user} />
        
        {/* Dashboard Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Stats Cards - Top Row */}
          <TutorDashboardStats />
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Today's Classes (spans 2 columns) */}
            <div className="lg:col-span-2">
              <TodayClasses />
            </div>
            
            {/* Right Column - Attendance Overview */}
            <div className="lg:col-span-1">
              <AttendanceOverview />
            </div>
          </div>
          
          {/* Bottom Row - Messages and Live Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Messages />
            <LiveActivities />
          </div>
        </main>
      </div>
    </div>
  );
}

export default function TutorDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['tutor']}>
      <TutorDashboardContent />
    </ProtectedRoute>
  );
}
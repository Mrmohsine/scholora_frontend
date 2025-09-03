// app/student-portal/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import StudentSidebar from '@/components/student/Sidebar';
import StudentDashboardHeader from '@/components/student/Dashboard/DashboardHeader';
import StudentDashboardStats from '@/components/student/Dashboard/DashboardStats';
import TodaySchedule from '@/components/student/Dashboard/TodaySchedule';
import RecentAssignments from '@/components/student/Dashboard/RecentAssignments';
import { authService } from '@/lib/auth/authService';

function StudentDashboardContent() {
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
      <StudentSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <StudentDashboardHeader user={user} />
        
        {/* Dashboard Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Stats Cards */}
          <StudentDashboardStats />
          
          {/* Schedule and Assignments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TodaySchedule />
            <RecentAssignments />
          </div>
        </main>
      </div>
    </div>
  );
}

export default function StudentDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['student']}>
      <StudentDashboardContent />
    </ProtectedRoute>
  );
}
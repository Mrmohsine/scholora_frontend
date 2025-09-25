'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import TutorSidebar from '@/components/tutor/Sidebar';
import TutorDashboardHeader from '@/components/tutor/Dashboard/DashboardHeader';
import { authService } from '@/lib/auth/authService';

function TutorClassesContent() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const classes = [
    {
      id: 1,
      subject: 'Advanced Mathematics',
      grade: '11-12',
      time: 'Mon, Wed, Fri - 9:00 AM',
      students: 24,
      status: 'Active',
      iconColor: 'bg-blue-500',
      iconBg: 'bg-blue-100'
    },
    {
      id: 2,
      subject: 'Physics Fundamentals',
      grade: '10-11',
      time: 'Tue, Thu - 2:00 PM',
      students: 18,
      status: 'Active',
      iconColor: 'bg-green-500',
      iconBg: 'bg-green-100'
    },
    {
      id: 3,
      subject: 'Organic Chemistry',
      grade: '12',
      time: 'Mon, Wed - 11:00 AM',
      students: 15,
      status: 'Active',
      iconColor: 'bg-purple-500',
      iconBg: 'bg-purple-100'
    },
    {
      id: 4,
      subject: 'Calculus Prep',
      grade: '11',
      time: 'Thu - 3:00 PM',
      students: 12,
      status: 'Active',
      iconColor: 'bg-orange-500',
      iconBg: 'bg-orange-100'
    },
    {
      id: 5,
      subject: 'AP Physics',
      grade: '12',
      time: 'Sat - 10:00 AM',
      students: 8,
      status: 'Starting Soon',
      iconColor: 'bg-teal-500',
      iconBg: 'bg-teal-100'
    }
  ];

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
        
        {/* Classes Content */}
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
              <p className="text-gray-500 mt-1">Manage all your classes and schedules</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <span>+</span>
              <span>Add Class</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
              <input 
                type="text" 
                placeholder="Search classes..."
                className="bg-white border border-gray-200 pl-10 pr-4 py-2 rounded-lg w-64"
              />
            </div>
            <select className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-gray-600">
              <option>All Subjects</option>
            </select>
            <select className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-gray-600">
              <option>All Status</option>
            </select>
          </div>

          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((cls) => (
              <div key={cls.id} className="bg-white rounded-lg border border-gray-200 p-6">
                {/* Status Bar */}
                <div className={`h-1 ${cls.iconColor} rounded-t-lg mb-4 -mt-6 -mx-6`}></div>
                
                {/* Icon */}
                <div className={`${cls.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <div className={`${cls.iconColor} w-6 h-6 rounded flex items-center justify-center text-white text-sm font-bold`}>
                    📚
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{cls.subject}</h3>
                <p className="text-sm text-gray-500 mb-4">Grade {cls.grade}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📅</span>
                    <span>{cls.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">👥</span>
                    <span>{cls.students} students</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    cls.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {cls.status}
                  </span>
                  <button className="bg-gray-800 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-900">
                    Enter Class
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function TutorClassesPage() {
  return (
    <ProtectedRoute allowedRoles={['tutor']}>
      <TutorClassesContent />
    </ProtectedRoute>
  );
}
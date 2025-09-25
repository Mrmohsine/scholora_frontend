'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import StudentSidebar from '@/components/student/Sidebar';
import StudentDashboardHeader from '@/components/student/Dashboard/DashboardHeader';
import { authService } from '@/lib/auth/authService';

function StudentTutorsContent() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const tutors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      subject: 'Advanced Mathematics',
      rating: 4.9,
      students: 45,
      experience: '8 years',
      rate: '$50/hour',
      status: 'Available',
      image: '/api/placeholder/80/80'
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      subject: 'Physics Fundamentals',
      rating: 4.8,
      students: 38,
      experience: '6 years',
      rate: '$45/hour',
      status: 'Busy',
      image: '/api/placeholder/80/80'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      subject: 'Organic Chemistry',
      rating: 4.9,
      students: 52,
      experience: '10 years',
      rate: '$55/hour',
      status: 'Available',
      image: '/api/placeholder/80/80'
    },
    {
      id: 4,
      name: 'James Wilson',
      subject: 'Calculus Prep',
      rating: 4.7,
      students: 29,
      experience: '4 years',
      rate: '$40/hour',
      status: 'Available',
      image: '/api/placeholder/80/80'
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

  const getStatusColor = (status) => {
    if (status === 'Available') return 'bg-green-100 text-green-700';
    if (status === 'Busy') return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <StudentSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <StudentDashboardHeader user={user} />
        
        {/* Tutors Content */}
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tutors</h1>
              <p className="text-gray-500 mt-1">Connect with your tutors and find new ones</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Find Tutors
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <input 
                type="text" 
                placeholder="Search tutors..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-900"
              />
            </div>
          </div>

          {/* Tutors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map((tutor) => (
              <div key={tutor.id} className="bg-white rounded-lg border border-gray-200 p-6">
                {/* Tutor Info */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600">👨‍🏫</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{tutor.name}</h3>
                    <p className="text-sm text-gray-600">{tutor.subject}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm text-gray-600 ml-1">
                        {tutor.rating} ({tutor.students} students)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Experience:</span>
                    <span className="text-gray-900">{tutor.experience}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Rate:</span>
                    <span className="text-gray-900">{tutor.rate}</span>
                  </div>
                </div>

                {/* Status */}
                <div className="mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(tutor.status)}`}>
                    {tutor.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-900">
                    Book Session
                  </button>
                  <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    💬
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

export default function StudentTutorsPage() {
  return (
    <ProtectedRoute allowedRoles={['student']}>
      <StudentTutorsContent />
    </ProtectedRoute>
  );
}
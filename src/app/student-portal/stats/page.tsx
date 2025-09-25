'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import StudentSidebar from '@/components/student/Sidebar';
import StudentDashboardHeader from '@/components/student/Dashboard/DashboardHeader';
import { authService } from '@/lib/auth/authService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

function StudentStatsContent() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const attendanceData = [
    { name: '09/24', value: 30 },
    { name: '10/24', value: 45 },
    { name: '11/24', value: 65 },
    { name: '12/24', value: 85 },
    { name: '01/25', value: 94 }
  ];

  const homeworkPerformanceData = [
    { subject: 'Timeliness', A: 90, fullMark: 100 },
    { subject: 'Participation', A: 85, fullMark: 100 },
    { subject: 'Quality', A: 88, fullMark: 100 },
    { subject: 'Understanding', A: 92, fullMark: 100 },
    { subject: 'Completion', A: 95, fullMark: 100 },
    { subject: 'Effort', A: 87, fullMark: 100 }
  ];

  const tutorPerformance = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      subject: 'Advanced Mathematics',
      sessions: 18,
      homework: '85%',
      progress: '+5%',
      performance: 92,
      avatar: '👩‍🏫'
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      subject: 'Physics Fundamentals',
      sessions: 15,
      homework: '88%',
      progress: '+7%',
      performance: 88,
      avatar: '👨‍🏫'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      subject: 'Organic Chemistry',
      sessions: 12,
      homework: '91%',
      progress: '+3%',
      performance: 85,
      avatar: '👩‍🏫'
    },
    {
      id: 4,
      name: 'Mr. David Kim',
      subject: 'Calculus Prep',
      sessions: 8,
      homework: '83%',
      progress: '+2%',
      performance: 79,
      avatar: '👨‍🏫'
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
      <StudentSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <StudentDashboardHeader user={user} />
        
        {/* Stats Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Performance Stats</h1>
            <p className="text-gray-500 mt-1">Track your learning progress and performance with your tutors</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Live Lesson Attendance</h3>
                <span className="text-blue-500">📊</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">94%</p>
              <p className="text-sm text-gray-600">Out of 20 sessions attended</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Homework Completion</h3>
                <span className="text-green-500">🟢</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">87%</p>
              <p className="text-sm text-gray-600">On time submissions</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Active Tutors</h3>
                <span className="text-purple-500">🔮</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">4</p>
              <p className="text-sm text-gray-600">Across 4 subjects</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Overall Performance</h3>
                <span className="text-orange-500">📈</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">88%</p>
              <p className="text-sm text-gray-600">+5% this month</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Homework Performance Radar */}
            <div className="bg-gray-800 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Homework Performance</h3>
                <button className="text-teal-400 text-sm hover:text-teal-300">See details</button>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={homeworkPerformanceData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <PolarRadiusAxis tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                  <Radar
                    name="Performance"
                    dataKey="A"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Attendance Performance */}
            <div className="bg-gray-800 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Attendance Performance</h3>
                <div className="flex items-center space-x-2">
                  <span>⋯</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="bg-yellow-500 text-black px-3 py-1 rounded text-sm inline-block">
                  Average attendance - 94%
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance by Tutor */}
          <div className="bg-gray-800 rounded-lg p-6 text-white">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-white">📈</span>
              <h3 className="text-lg font-semibold">Performance by Tutor</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6">Track your progress with each of your tutors</p>

            <div className="space-y-4">
              {tutorPerformance.map((tutor) => (
                <div key={tutor.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                      <span>{tutor.avatar}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{tutor.name}</h4>
                      <p className="text-sm text-gray-400">{tutor.subject}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-400">{tutor.sessions} sessions</span>
                        <span className="text-xs text-gray-400">{tutor.homework} homework</span>
                        <span className="text-xs text-green-400">{tutor.progress}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold text-white">{tutor.performance}%</span>
                    <div className="w-24 bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${tutor.performance}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function StudentStatsPage() {
  return (
    <ProtectedRoute allowedRoles={['student']}>
      <StudentStatsContent />
    </ProtectedRoute>
  );
}
'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import TutorSidebar from '@/components/tutor/Sidebar';
import TutorDashboardHeader from '@/components/tutor/Dashboard/DashboardHeader';
import { authService } from '@/lib/auth/authService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';

function TutorStatsContent() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const businessGrowthData = [
    { name: 'Jan', Students: 4500, Revenue: 4500 },
    { name: 'Feb', Students: 4800, Revenue: 4800 },
    { name: 'Mar', Students: 5200, Revenue: 5200 },
    { name: 'Apr', Students: 5800, Revenue: 5800 },
    { name: 'May', Students: 6200, Revenue: 6200 },
    { name: 'Jun', Students: 6500, Revenue: 6500 }
  ];

  const revenueGrowthData = [
    { name: 'Jan', GrowthRate: 15 },
    { name: 'Feb', GrowthRate: 8 },
    { name: 'Mar', GrowthRate: 25 },
    { name: 'Apr', GrowthRate: 12 },
    { name: 'May', GrowthRate: 18 },
    { name: 'Jun', GrowthRate: 10 }
  ];

  const studentAcquisitionData = [
    { name: 'Jan', NewStudents: 8, LostStudents: 3, NetGrowth: 5 },
    { name: 'Feb', NewStudents: 12, LostStudents: 4, NetGrowth: 8 },
    { name: 'Mar', NewStudents: 10, LostStudents: 6, NetGrowth: 4 },
    { name: 'Apr', NewStudents: 18, LostStudents: 2, NetGrowth: 16 },
    { name: 'May', NewStudents: 15, LostStudents: 8, NetGrowth: 7 },
    { name: 'Jun', NewStudents: 16, LostStudents: 5, NetGrowth: 11 }
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
        
        {/* Stats Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Growth Statistics</h1>
            <p className="text-gray-500 mt-1">Track your tutoring business performance</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Student Growth</p>
                  <p className="text-2xl font-bold text-gray-900">15.5%</p>
                  <p className="text-sm text-green-600">↗ 9 this month</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600">👥</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Revenue Growth</p>
                  <p className="text-2xl font-bold text-gray-900">15.5%</p>
                  <p className="text-sm text-green-600">↗ $500</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600">💰</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">New Students</p>
                  <p className="text-2xl font-bold text-gray-900">15</p>
                  <p className="text-sm text-blue-600">This month</p>
                </div>
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600">👤</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Retention Rate</p>
                  <p className="text-2xl font-bold text-gray-900">91.2%</p>
                  <p className="text-sm text-teal-600">Average</p>
                </div>
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <span className="text-teal-600">🔄</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Business Growth */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Growth</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={businessGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="Students"
                    stackId="1"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.1}
                  />
                  <Area
                    type="monotone"
                    dataKey="Revenue"
                    stackId="2"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center space-x-4 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Students</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Revenue ($)</span>
                </div>
              </div>
            </div>

            {/* Revenue Growth Rate */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Growth Rate</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="GrowthRate" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-600">Growth Rate (%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Student Acquisition */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Acquisition</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={studentAcquisitionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="NewStudents"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="LostStudents"
                  stroke="#EF4444"
                  strokeWidth={2}
                  dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="NetGrowth"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                <span className="text-sm text-gray-600">New Students</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                <span className="text-sm text-gray-600">Lost Students</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                <span className="text-sm text-gray-600">Net Growth</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function TutorStatsPage() {
  return (
    <ProtectedRoute allowedRoles={['tutor']}>
      <TutorStatsContent />
    </ProtectedRoute>
  );
}
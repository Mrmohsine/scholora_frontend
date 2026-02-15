// app/dashboard/tutors/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

// Types
interface Tutor {
  id: number;
  name: string;
  email: string;
  subjects: string[];
  students: number;
  rating: number;
  earnings: string;
  status: 'verified' | 'pending' | 'rejected';
  hasRatings: boolean;
}

interface TutorStats {
  totalTutors: number;
  verified: number;
  pending: number;
  rejected: number;
}

interface SessionData {
  time: string;
  Mon: number;
  Tue: number;
  Wed: number;
  Thu: number;
  Fri: number;
  Sat: number;
  Sun: number;
}

interface MonthlyRegistration {
  month: string;
  count: number;
  growth: string;
}

interface RatingDistribution {
  rating: number;
  count: number;
  percentage: number;
}

// Hooks
function useTutorData() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [stats, setStats] = useState<TutorStats | null>(null);
  const [sessionData, setSessionData] = useState<SessionData[]>([]);
  const [registrations, setRegistrations] = useState<MonthlyRegistration[]>([]);
  const [ratingDistribution, setRatingDistribution] = useState<RatingDistribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalTutors: 342,
        verified: 298,
        pending: 23,
        rejected: 21
      });

      setTutors([
        {
          id: 1,
          name: 'Dr. Emily Chen',
          email: 'emily@example.com',
          subjects: ['Math', 'Physics'],
          students: 24,
          rating: 4.9,
          earnings: '$2,340',
          status: 'verified',
          hasRatings: true
        },
        {
          id: 2,
          name: 'Prof. Michael Brown',
          email: 'michael@example.com',
          subjects: ['Chemistry'],
          students: 18,
          rating: 4.8,
          earnings: '$1,890',
          status: 'pending',
          hasRatings: true
        },
        {
          id: 3,
          name: 'Sarah Wilson',
          email: 'sarah@example.com',
          subjects: ['Biology'],
          students: 31,
          rating: 4.7,
          earnings: '$3,120',
          status: 'verified',
          hasRatings: true
        },
        {
          id: 4,
          name: 'Dr. James Taylor',
          email: 'james@example.com',
          subjects: ['Mathematics'],
          students: 0,
          rating: 0,
          earnings: '$0',
          status: 'rejected',
          hasRatings: false
        },
        {
          id: 5,
          name: 'Lisa Anderson',
          email: 'lisa@example.com',
          subjects: ['English', 'Literature'],
          students: 19,
          rating: 4.6,
          earnings: '$1,560',
          status: 'verified',
          hasRatings: true
        }
      ]);

      setSessionData([
        { time: '6 AM', Mon: 23, Tue: 28, Wed: 31, Thu: 26, Fri: 34, Sat: 45, Sun: 30 },
        { time: '9 AM', Mon: 156, Tue: 167, Wed: 145, Thu: 178, Fri: 134, Sat: 89, Sun: 67 },
        { time: '12 PM', Mon: 234, Tue: 245, Wed: 267, Thu: 256, Fri: 289, Sat: 178, Sun: 123 },
        { time: '3 PM', Mon: 345, Tue: 367, Wed: 389, Thu: 378, Fri: 356, Sat: 234, Sun: 189 },
        { time: '6 PM', Mon: 456, Tue: 478, Wed: 445, Thu: 467, Fri: 423, Sat: 345, Sun: 267 },
        { time: '9 PM', Mon: 234, Tue: 256, Wed: 223, Thu: 245, Fri: 198, Sat: 167, Sun: 145 }
      ]);

      setRegistrations([
        { month: 'August', count: 47, growth: '+12%' },
        { month: 'July', count: 42, growth: '+8%' },
        { month: 'June', count: 39, growth: '+15%' },
        { month: 'May', count: 34, growth: '+5%' }
      ]);

      setRatingDistribution([
        { rating: 5, count: 156, percentage: 85 },
        { rating: 4, count: 89, percentage: 50 },
        { rating: 3, count: 34, percentage: 20 },
        { rating: 2, count: 15, percentage: 8 },
        { rating: 1, count: 6, percentage: 3 }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  return { tutors, stats, sessionData, registrations, ratingDistribution, loading };
}

// Components
function StatsCard({ title, value, icon, iconColor, borderColor }: {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconColor: string;
  borderColor: string;
}) {
  return (
    <div className={`bg-white rounded-xl p-6 border ${borderColor} shadow-sm`}>
      <div className="flex items-center space-x-3">
        <div className={`${iconColor}`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{value.toLocaleString()}</p>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        </div>
      </div>
    </div>
  );
}

function TutorsTable({ tutors, loading }: { tutors: Tutor[]; loading: boolean }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTutors = tutors.filter(tutor =>
    tutor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-12 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-blue-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">All Tutors</h2>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tutors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-4 px-6 font-medium text-black text-xs" style={{ fontFamily: 'system-ui' }}>Tutor</th>
              <th className="text-left py-4 px-6 font-medium text-black text-xs" style={{ fontFamily: 'system-ui' }}>Subjects</th>
              <th className="text-left py-4 px-6 font-medium text-black text-xs" style={{ fontFamily: 'system-ui' }}>Students</th>
              <th className="text-left py-4 px-6 font-medium text-black text-xs" style={{ fontFamily: 'system-ui' }}>Rating</th>
              <th className="text-left py-4 px-6 font-medium text-black text-xs" style={{ fontFamily: 'system-ui' }}>Earnings</th>
              <th className="text-left py-4 px-6 font-medium text-black text-xs" style={{ fontFamily: 'system-ui' }}>Status</th>
              <th className="text-left py-4 px-6 font-medium text-black text-xs" style={{ fontFamily: 'system-ui' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTutors.map((tutor) => (
              <tr key={tutor.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-xs">
                        {tutor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{tutor.name}</p>
                      <p className="text-xs text-gray-500">{tutor.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600 text-sm">
                  {tutor.subjects.join(', ')}
                </td>
                <td className="py-4 px-6 text-center text-gray-600 text-sm">{tutor.students}</td>
                <td className="py-4 px-6 text-sm">
                  {tutor.hasRatings ? (
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-gray-900">{tutor.rating}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">No ratings</span>
                  )}
                </td>
                <td className="py-4 px-6 text-center text-gray-600 text-sm">
                  {tutor.earnings}
                </td>
                <td className="py-4 px-6 text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(tutor.status)}`}>
                    {tutor.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SessionHeatmap({ data }: { data: SessionData[] }) {
  const maxValue = Math.max(...data.flatMap(d => [d.Mon, d.Tue, d.Wed, d.Thu, d.Fri, d.Sat, d.Sun]));
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getIntensity = (value: number) => {
    const intensity = value / maxValue;
    if (intensity > 0.8) return 'bg-blue-600';
    if (intensity > 0.6) return 'bg-blue-500';
    if (intensity > 0.4) return 'bg-blue-400';
    if (intensity > 0.2) return 'bg-blue-300';
    return 'bg-blue-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Peak Session Times</h3>
        <p className="text-sm text-gray-500">Session activity heatmap by day and time</p>
      </div>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-8 gap-2 min-w-full">
          <div></div>
          {days.map(day => (
            <div key={day} className="text-center text-xs font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}
          
          {data.map((timeSlot, timeIndex) => (
            <React.Fragment key={timeIndex}>
              <div className="text-xs font-medium text-gray-600 py-2 pr-2 text-right">
                {timeSlot.time}
              </div>
              {days.map(day => {
                const value = timeSlot[day as keyof Omit<SessionData, 'time'>] as number;
                return (
                  <div
                    key={`${timeIndex}-${day}`}
                    className={`${getIntensity(value)} rounded text-white text-xs font-medium flex items-center justify-center h-12 cursor-pointer hover:opacity-80 transition-opacity`}
                    title={`${day} ${timeSlot.time}: ${value} sessions`}
                  >
                    {value}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 text-xs text-gray-500">
        <div className="flex items-center space-x-2">
          <span>Lower activity</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-blue-200 rounded"></div>
            <div className="w-3 h-3 bg-blue-300 rounded"></div>
            <div className="w-3 h-3 bg-blue-400 rounded"></div>
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
          </div>
          <span>Higher activity</span>
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function TutorManagementPage() {
  const { tutors, stats, sessionData, registrations, ratingDistribution, loading } = useTutorData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tutor Management</h1>
            <p className="text-gray-600 mt-1">Manage and verify tutors</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              Export
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Invite Tutor
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Tutors"
            value={stats?.totalTutors || 0}
            iconColor="text-blue-600"
            borderColor="border-blue-300"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          <StatsCard
            title="Verified"
            value={stats?.verified || 0}
            iconColor="text-green-600"
            borderColor="border-green-300"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatsCard
            title="Pending"
            value={stats?.pending || 0}
            iconColor="text-orange-600"
            borderColor="border-orange-300"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatsCard
            title="Rejected"
            value={stats?.rejected || 0}
            iconColor="text-red-600"
            borderColor="border-red-300"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                <line x1="15" y1="9" x2="9" y2="15" strokeWidth="2"/>
                <line x1="9" y1="9" x2="15" y2="15" strokeWidth="2"/>
              </svg>
            }
          />
        </div>

        {/* Tutors Table */}
        <TutorsTable tutors={tutors} loading={loading} />

        {/* Session Heatmap */}
        <SessionHeatmap data={sessionData} />

        {/* Bottom Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* New Tutor Registrations */}
          <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">New Tutor Registrations</h3>
              <p className="text-sm text-gray-500">Monthly new tutor sign-ups</p>
            </div>

            <div className="mb-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">47</div>
              <p className="text-sm text-gray-600">New tutors this month</p>
            </div>

            <div className="space-y-3">
              {registrations.map((reg, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{reg.month}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{reg.count}</span>
                    <span className="text-xs text-green-600 font-medium">{reg.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-blue-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Rating Distribution</h3>
              <p className="text-sm text-gray-500">Tutor rating breakdown</p>
            </div>

            <div className="mb-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">4.7</div>
              <p className="text-sm text-gray-600">Average tutor rating</p>
            </div>

            <div className="space-y-3">
              {ratingDistribution.map((rating, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-8">
                    <span className="text-sm text-gray-600">{rating.rating}</span>
                    <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${rating.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-900 w-8 text-right">{rating.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
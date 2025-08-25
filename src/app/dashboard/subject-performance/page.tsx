// app/dashboard/subject-performance/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

// Types
interface SubjectStats {
  totalSessions: number;
  averageDuration: number;
  completionRate: number;
  cancellationRate: number;
}

interface PopularSubject {
  id: number;
  name: string;
  students: number;
  percentage: number;
  growth: string;
  rank: number;
}

interface WeeklyPerformance {
  week: number;
  sessions: number;
  completionRate: number;
  status: string;
}

interface SessionDuration {
  duration: string;
  count: number;
  percentage: number;
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

// Hooks
function useSubjectPerformanceData() {
  const [stats, setStats] = useState<SubjectStats | null>(null);
  const [popularSubjects, setPopularSubjects] = useState<PopularSubject[]>([]);
  const [weeklyPerformance, setWeeklyPerformance] = useState<WeeklyPerformance[]>([]);
  const [sessionDurations, setSessionDurations] = useState<SessionDuration[]>([]);
  const [sessionData, setSessionData] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalSessions: 3256,
        averageDuration: 52,
        completionRate: 94.2,
        cancellationRate: 5.8
      });

      setPopularSubjects([
        { id: 1, name: 'Mathematics', students: 1247, percentage: 28, growth: '+12%', rank: 1 },
        { id: 2, name: 'Science', students: 986, percentage: 22, growth: '+8%', rank: 2 },
        { id: 3, name: 'English', students: 743, percentage: 17, growth: '+16%', rank: 3 },
        { id: 4, name: 'Physics', students: 654, percentage: 15, growth: '+3%', rank: 4 },
        { id: 5, name: 'Chemistry', students: 432, percentage: 10, growth: '+18%', rank: 5 },
        { id: 6, name: 'Biology', students: 356, percentage: 8, growth: '+22%', rank: 6 }
      ]);

      setWeeklyPerformance([
        { week: 1, sessions: 1847, completionRate: 93.2, status: 'COMPLETED' },
        { week: 2, sessions: 2134, completionRate: 94.1, status: 'COMPLETED' },
        { week: 3, sessions: 1923, completionRate: 92.8, status: 'COMPLETED' },
        { week: 4, sessions: 2267, completionRate: 95.3, status: 'COMPLETED' },
        { week: 5, sessions: 2089, completionRate: 94.7, status: 'COMPLETED' },
        { week: 6, sessions: 2345, completionRate: 93.9, status: 'COMPLETED' }
      ]);

      setSessionDurations([
        { duration: '15-30 min', count: 4567, percentage: 20 },
        { duration: '30-45 min', count: 8234, percentage: 35 },
        { duration: '45-60 min', count: 9876, percentage: 42 },
        { duration: '60-75 min', count: 4321, percentage: 18 },
        { duration: '75-90 min', count: 1431, percentage: 6 }
      ]);

      setSessionData([
        { time: '6 AM', Mon: 23, Tue: 28, Wed: 31, Thu: 26, Fri: 34, Sat: 45, Sun: 30 },
        { time: '9 AM', Mon: 156, Tue: 167, Wed: 145, Thu: 178, Fri: 134, Sat: 89, Sun: 67 },
        { time: '12 PM', Mon: 234, Tue: 245, Wed: 267, Thu: 256, Fri: 289, Sat: 178, Sun: 123 },
        { time: '3 PM', Mon: 345, Tue: 367, Wed: 389, Thu: 378, Fri: 356, Sat: 234, Sun: 189 },
        { time: '6 PM', Mon: 456, Tue: 478, Wed: 445, Thu: 467, Fri: 423, Sat: 345, Sun: 267 },
        { time: '9 PM', Mon: 234, Tue: 256, Wed: 223, Thu: 245, Fri: 198, Sat: 167, Sun: 145 }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  return { stats, popularSubjects, weeklyPerformance, sessionDurations, sessionData, loading };
}

// Components
function StatsCard({ title, value, unit, subtitle, icon, iconColor, trendColor, trend }: {
  title: string;
  value: string | number;
  unit?: string;
  subtitle: string;
  icon: React.ReactNode;
  iconColor: string;
  trendColor?: string;
  trend?: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`${iconColor} p-2`}>
          {icon}
        </div>
        {trend && (
          <div className={`${trendColor} p-1 rounded`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {trend.startsWith('+') ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              )}
            </svg>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-xs font-medium text-gray-500 mb-1">{title}</h3>
        <div className="flex items-baseline space-x-1">
          <p className="text-2xl font-bold text-gray-900">{value}{unit}</p>
        </div>
        <p className={`text-xs mt-1 ${trendColor || 'text-gray-500'}`}>{subtitle}</p>
      </div>
    </div>
  );
}

function PopularSubjectsSection({ subjects }: { subjects: PopularSubject[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h2 className="text-lg font-semibold text-gray-900">Popular Session Categories</h2>
        </div>
        <p className="text-sm text-gray-500">Most frequently booked subjects by student enrollment</p>
      </div>

      <div className="space-y-4">
        {subjects.map((subject) => (
          <div key={subject.id} className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 text-sm font-medium">{subject.rank}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900">{subject.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{subject.percentage}%</span>
                  <span className="text-xs text-green-600 font-medium">{subject.growth}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${subject.percentage * 3}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{subject.students} students</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeeklyTrendsSection({ performance }: { performance: WeeklyPerformance[] }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h2 className="text-lg font-semibold text-gray-900">Weekly Session Trends</h2>
        </div>
        <p className="text-sm text-gray-500">Sessions completed and completion rates</p>
        <div className="mt-4">
          <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5">
            <option>Last 6 weeks</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Weekly Performance</h3>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">Summary Statistics</h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            {performance.map((week) => (
              <div key={week.week} className="flex items-center space-x-4">
                <div className="text-sm font-medium text-gray-900 w-12">Week {week.week}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg font-bold text-gray-900">{week.sessions.toLocaleString()}</span>
                    <span className="text-sm font-medium text-green-600">{week.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${week.completionRate}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-green-600 mt-1">{week.status}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-600 mb-1">Average Completion Rate</div>
              <div className="text-2xl font-bold text-green-600">94.0%</div>
              <div className="text-xs text-gray-500">+3.2% from last period</div>
            </div>
            
            <div>
              <div className="text-sm font-medium text-gray-600 mb-1">Total Sessions</div>
              <div className="text-2xl font-bold text-blue-600">12,599</div>
              <div className="text-xs text-gray-500">+ 8.1% from last period</div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-600 mb-1">Best Performing Week</div>
              <div className="text-2xl font-bold text-purple-600">Week 4</div>
              <div className="text-xs text-gray-500">95.3% completion rate</div>
            </div>

            <div>
              <div className="text-sm font-medium text-gray-600 mb-1">Growth Trend</div>
              <div className="text-2xl font-bold text-orange-600">+15.2%</div>
              <div className="text-xs text-gray-500">Sessions vs previous 6 weeks</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SessionDurationSection({ durations }: { durations: SessionDuration[] }) {
  const maxCount = Math.max(...durations.map(d => d.count));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-lg font-semibold text-gray-900">Session Duration Distribution</h2>
        </div>
        <p className="text-sm text-gray-500">Breakdown of session lengths</p>
      </div>

      <div className="space-y-4">
        {durations.map((duration, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 w-16">
              <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
              <span className="text-sm text-gray-600">{duration.duration}</span>
            </div>
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-6 relative overflow-hidden">
                <div 
                  className="bg-gray-800 h-6 rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                  style={{ width: `${(duration.count / maxCount) * 100}%` }}
                >
                  <span className="text-white text-xs font-medium">{duration.count.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="text-sm font-medium text-gray-600 mb-1">Most Common Duration</div>
          <div className="text-lg font-bold text-blue-600">45-60 minutes</div>
        </div>
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-lg font-semibold text-gray-900">Peak Session Times</h2>
        </div>
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
export default function SubjectPerformancePage() {
  const { stats, popularSubjects, weeklyPerformance, sessionDurations, sessionData, loading } = useSubjectPerformanceData();

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
            <h1 className="text-3xl font-bold text-gray-900">Subject Performance</h1>
            <p className="text-gray-600 mt-1">Monitor subject popularity and session analytics</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Sessions"
            value={stats?.totalSessions.toLocaleString() || '3,256'}
            subtitle="+22% from last month"
            iconColor="text-blue-600"
            trendColor="text-green-600"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
          <StatsCard
            title="Average Duration"
            value={stats?.averageDuration || '52'}
            unit=" min"
            subtitle="+6% from last month"
            iconColor="text-green-600"
            trendColor="text-green-600"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatsCard
            title="Completion Rate"
            value={stats?.completionRate || '94.2'}
            unit="%"
            subtitle="+1.8% from last month"
            iconColor="text-green-600"
            trendColor="text-green-600"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatsCard
            title="Cancellation Rate"
            value={stats?.cancellationRate || '5.8'}
            unit="%"
            subtitle="-2.1% from last month"
            iconColor="text-red-600"
            trendColor="text-red-600"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            }
          />
        </div>

        {/* Popular Subjects */}
        <PopularSubjectsSection subjects={popularSubjects} />

        {/* Weekly Trends and Session Duration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <WeeklyTrendsSection performance={weeklyPerformance} />
          <SessionDurationSection durations={sessionDurations} />
        </div>

        {/* Session Heatmap */}
        <SessionHeatmap data={sessionData} />
      </div>
    </div>
  );
}
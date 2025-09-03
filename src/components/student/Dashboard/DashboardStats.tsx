// components/student/DashboardStats.tsx
'use client';

import { BookOpen, Calendar, Clock, TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

const StatCard = ({ title, value, subtitle, icon: Icon }: StatCardProps) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <Icon className="w-5 h-5 text-gray-400" />
    </div>
    <div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <p className="text-gray-500 text-sm">{subtitle}</p>
    </div>
  </div>
);

interface DashboardStatsProps {
  stats?: {
    activeClasses: number;
    upcomingClasses: number;
    studyHours: number;
    averageGrade: string;
  };
}

export default function StudentDashboardStats({ stats }: DashboardStatsProps) {
  const defaultStats = {
    activeClasses: 5,
    upcomingClasses: 3,
    studyHours: 24.5,
    averageGrade: '92%'
  };

  const currentStats = stats || defaultStats;

  const statsData = [
    {
      title: 'Active Classes',
      value: currentStats.activeClasses,
      subtitle: '+2 from last semester',
      icon: BookOpen,
    },
    {
      title: 'Upcoming Classes', 
      value: currentStats.upcomingClasses,
      subtitle: 'Today',
      icon: Calendar,
    },
    {
      title: 'Study Hours',
      value: currentStats.studyHours,
      subtitle: 'This week',
      icon: Clock,
    },
    {
      title: 'Average Grade',
      value: currentStats.averageGrade,
      subtitle: '+5% from last month',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
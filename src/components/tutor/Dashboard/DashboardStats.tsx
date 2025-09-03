// components/tutor/DashboardStats.tsx
'use client';

import { Users, BookOpen } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

const StatCard = ({ title, value, icon: Icon, iconColor }: StatCardProps) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <Icon className={`w-5 h-5 ${iconColor}`} />
    </div>
    <div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
    </div>
  </div>
);

interface DashboardStatsProps {
  stats?: {
    totalStudents: number;
    activeClasses: number;
  };
}

export default function TutorDashboardStats({ stats }: DashboardStatsProps) {
  const defaultStats = {
    totalStudents: 127,
    activeClasses: 8
  };

  const currentStats = stats || defaultStats;

  const statsData = [
    {
      title: 'Total Students',
      value: currentStats.totalStudents,
      icon: Users,
      iconColor: 'text-blue-500'
    },
    {
      title: 'Active Classes', 
      value: currentStats.activeClasses,
      icon: BookOpen,
      iconColor: 'text-green-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {statsData.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
// components/dashboard/StatsCards.tsx
'use client';

import { 
  CurrencyDollarIcon, 
  UsersIcon, 
  CalendarDaysIcon,
  AcademicCapIcon 
} from '@heroicons/react/24/outline';

interface StatsData {
  monthlyRevenue: {
    amount: string;
    change: string;
    trend: 'up' | 'down';
  };
  totalUsers: {
    count: string;
    online: string;
  };
  sessionsThisMonth: {
    count: string;
    live: string;
  };
  totalTutors: {
    count: string;
    verified: string;
  };
}

interface StatsCardsProps {
  data?: StatsData;
}

const defaultData: StatsData = {
  monthlyRevenue: {
    amount: '$189K',
    change: '+12.4%',
    trend: 'up'
  },
  totalUsers: {
    count: '1,520',
    online: '647 online'
  },
  sessionsThisMonth: {
    count: '3,040',
    live: '47 live'
  },
  totalTutors: {
    count: '275',
    verified: '251 verified'
  }
};

export default function StatsCards({ data = defaultData }: StatsCardsProps) {
  const stats = [
    {
      id: 'revenue',
      title: 'Monthly Revenue',
      value: data.monthlyRevenue.amount,
      subtitle: data.monthlyRevenue.change,
      subtitleColor: data.monthlyRevenue.trend === 'up' ? 'text-green-600' : 'text-red-600',
      icon: CurrencyDollarIcon,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-100'
    },
    {
      id: 'users',
      title: 'Total Users',
      value: data.totalUsers.count,
      subtitle: data.totalUsers.online,
      subtitleColor: 'text-green-600',
      icon: UsersIcon,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      borderColor: 'border-green-100'
    },
    {
      id: 'sessions',
      title: 'Sessions This Month',
      value: data.sessionsThisMonth.count,
      subtitle: data.sessionsThisMonth.live,
      subtitleColor: 'text-purple-600',
      icon: CalendarDaysIcon,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      borderColor: 'border-purple-100'
    },
    {
      id: 'tutors',
      title: 'Total Tutors',
      value: data.totalTutors.count,
      subtitle: data.totalTutors.verified,
      subtitleColor: 'text-orange-600',
      icon: AcademicCapIcon,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      borderColor: 'border-orange-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-6 transition-all duration-200 hover:shadow-md hover:scale-105`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className={`text-sm font-medium ${stat.subtitleColor}`}>
                  {stat.subtitle}
                </p>
              </div>
            </div>
          </div>
          
          {/* Indicator line at bottom */}
          <div className={`mt-4 h-1 w-full ${stat.bgColor} rounded-full`}>
            <div className={`h-1 w-3/4 bg-gradient-to-r ${stat.iconColor === 'text-blue-600' ? 'from-blue-400 to-blue-600' :
              stat.iconColor === 'text-green-600' ? 'from-green-400 to-green-600' :
              stat.iconColor === 'text-purple-600' ? 'from-purple-400 to-purple-600' :
              'from-orange-400 to-orange-600'} rounded-full`}>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
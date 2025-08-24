// components/dashboard/StatsCards.tsx
'use client';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  bgColor: string;
  iconBgColor: string;
  textColor: string;
  trend?: string;
  trendColor?: string;
}

function StatCard({ title, value, subtitle, icon, bgColor, iconBgColor, textColor, trend, trendColor }: StatCardProps) {
  return (
    <div className={`${bgColor} rounded-xl p-6 border border-gray-100 shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`${iconBgColor} p-3 rounded-lg`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-sm font-semibold ${trendColor}`}>
            {trend}
          </span>
        )}
      </div>
      
      <div>
        <h3 className={`text-2xl font-bold ${textColor} mb-1`}>{value}</h3>
        <p className="text-gray-600 text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

interface StatsCardsProps {
  data?: {
    monthlyRevenue?: number;
    totalUsers?: number;
    sessionsThisMonth?: number;
    totalTutors?: number;
  };
}

export default function StatsCards({ data }: StatsCardsProps) {
  const stats = [
    {
      title: "Monthly Revenue",
      value: data?.monthlyRevenue ? `$${(data.monthlyRevenue / 1000).toFixed(0)}K` : "$189K",
      subtitle: "Monthly Revenue",
      bgColor: "bg-blue-50",
      iconBgColor: "bg-white",
      textColor: "text-gray-900",
      trend: "+12.4%",
      trendColor: "text-green-600",
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
    {
      title: "Total Users",
      value: data?.totalUsers ? data.totalUsers.toLocaleString() : "1,520",
      subtitle: "Total Users",
      bgColor: "bg-green-50",
      iconBgColor: "bg-white",
      textColor: "text-gray-900",
      trend: "847 online",
      trendColor: "text-green-600",
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      )
    },
    {
      title: "Sessions This Month",
      value: data?.sessionsThisMonth ? data.sessionsThisMonth.toLocaleString() : "3,040",
      subtitle: "Sessions This Month",
      bgColor: "bg-purple-50",
      iconBgColor: "bg-white", 
      textColor: "text-gray-900",
      trend: "47 live",
      trendColor: "text-purple-600",
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Total Tutors",
      value: data?.totalTutors ? data.totalTutors.toString() : "275",
      subtitle: "Total Tutors",
      bgColor: "bg-orange-50",
      iconBgColor: "bg-white",
      textColor: "text-gray-900", 
      trend: "251 verified",
      trendColor: "text-orange-600",
      icon: (
        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          icon={stat.icon}
          bgColor={stat.bgColor}
          iconBgColor={stat.iconBgColor}
          textColor={stat.textColor}
          trend={stat.trend}
          trendColor={stat.trendColor}
        />
      ))}
    </div>
  );
}
// app/admin/dashboard/page.tsx
'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useState, useEffect } from 'react';

// Hook pour gérer la sidebar
function useDashboardLayout() {
 const [sidebarOpen, setSidebarOpen] = useState(false);

 const toggleSidebar = () => {
   setSidebarOpen(!sidebarOpen);
 };

 return {
   sidebarOpen,
   setSidebarOpen,
   toggleSidebar
 };
}

// Hook pour les données du dashboard
function useDashboardData() {
 const [data, setData] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
   // Simulation du chargement des données
   setTimeout(() => {
     setData({
       stats: {
         monthlyRevenue: 189000,
         totalUsers: 1520,
         sessionsThisMonth: 3040,
         totalTutors: 275
       }
     });
     setLoading(false);
   }, 1000);
 }, []);

 return { data, loading, error };
}

// Composant Header du Dashboard
function DashboardHeader({ onToggleSidebar, sidebarOpen }) {
 const [notificationCount, setNotificationCount] = useState(3);

 const getCurrentDate = () => {
   const options = { 
     weekday: 'long', 
     year: 'numeric', 
     month: 'long', 
     day: 'numeric' 
   };
   return new Date().toLocaleDateString('en-US', options);
 };

 return (
   <div className="bg-white">
    

     {/* Main header content */}
     <div className="px-4 py-6">
       <div className="flex items-center justify-between">
         {/* Left side - Title + Status */}
         <div>
           <div className="flex items-center space-x-3 mb-2">
             <h1 className="text-3xl font-bold text-gray-900">
               Platform Overview
             </h1>
             
             {/* Status Indicator */}
             <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
               <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse"></div>
               All Systems Operational
             </span>
           </div>
           
           {/* Subtitle */}
           <div>
             <p className="text-gray-500">Complete real-time insights and performance metrics for Scholora</p>
           </div>
         </div>

         {/* Right side - Date */}
         <div className="text-right hidden sm:block">
           <p className="text-sm font-medium text-gray-900">
             {getCurrentDate()}
           </p>
           <p className="text-xs text-gray-400">
             Last updated: just now
           </p>
         </div>
       </div>

       {/* Mobile date */}
       <div className="mt-2 sm:hidden">
         <p className="text-xs text-gray-500">
           {getCurrentDate()} • Last updated: just now
         </p>
       </div>
     </div>
   </div>
 );
}

// Composant StatsCards
function StatsCards({ data }) {
 const stats = [
   {
     title: "Monthly Revenue",
     value: data?.monthlyRevenue ? `${(data.monthlyRevenue / 1000).toFixed(0)}K` : "$189K",
     subtitle: "Monthly Revenue",
     bgColor: "bg-blue-50",
     borderColor: "border-blue-200",
     iconBgColor: "",
     textColor: "text-gray-900",
     trend: "+12.4%",
     trendColor: "text-green-600",
     icon: (
       <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
       </svg>
     )
   },
   {
     title: "Total Users",
     value: data?.totalUsers ? data.totalUsers.toLocaleString() : "1,520",
     subtitle: "Total Users",
     bgColor: "bg-green-50",
     borderColor: "border-green-200",
     iconBgColor: "",
     textColor: "text-gray-900",
     trend: "847 online",
     trendColor: "text-green-600",
     icon: (
       <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
       </svg>
     )
   },
   {
     title: "Sessions This Month",
     value: data?.sessionsThisMonth ? data.sessionsThisMonth.toLocaleString() : "3,040",
     subtitle: "Sessions This Month",
     bgColor: "bg-purple-50",
     borderColor: "border-purple-200",
     iconBgColor: "", 
     textColor: "text-gray-900",
     trend: "47 live",
     trendColor: "text-purple-600",
     icon: (
       <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
       </svg>
     )
   },
   {
     title: "Total Tutors",
     value: data?.totalTutors ? data.totalTutors.toString() : "275",
     subtitle: "Total Tutors",
     bgColor: "bg-orange-50",
     borderColor: "border-orange-200",
     iconBgColor: "",
     textColor: "text-gray-900", 
     trend: "251 verified",
     trendColor: "text-orange-600",
     icon: (
       <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
       </svg>
     )
   }
 ];

 return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
     {stats.map((stat, index) => (
       <div key={index} className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-6 shadow-sm`}>
         <div className="flex items-center justify-between mb-4">
           <div className={`${stat.iconBgColor} p-3 rounded-lg`}>
             {stat.icon}
           </div>
           <span className={`text-sm font-semibold ${stat.trendColor}`}>
             {stat.trend}
           </span>
         </div>
         
         <div>
           <h3 className={`text-2xl font-bold ${stat.textColor} mb-1`}>{stat.value}</h3>
           <p className="text-gray-600 text-sm">{stat.subtitle}</p>
         </div>
       </div>
     ))}
   </div>
 );
}

// Composant Revenue Chart
function RevenueChart({ data }) {
 const defaultData = [
   { month: 'Jan', value: 140 },
   { month: 'Feb', value: 155 },
   { month: 'Mar', value: 170 },
   { month: 'Apr', value: 180 },
   { month: 'May', value: 195 },
   { month: 'Jun', value: 215 }
 ];

 const chartData = data?.revenue || defaultData;
 
 return (
   <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
     <div className="mb-6">
       <h3 className="text-lg font-semibold text-gray-900 mb-1">Revenue Trends</h3>
       <p className="text-sm text-gray-500">6-month growth trajectory</p>
     </div>

     <div className="relative h-64">
       {/* Y-axis labels */}
       <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 py-4">
         <span>$240K</span>
         <span>$180K</span>
         <span>$120K</span>
         <span>$60K</span>
         <span>$0K</span>
       </div>

       {/* Chart area */}
       <div className="ml-12 h-full relative">
         <svg width="100%" height="200" className="absolute top-4" style={{ minWidth: '400px' }}>
           <defs>
             <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1"/>
               <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
             </linearGradient>
           </defs>
           
           {/* Grid lines */}
           {[0, 1, 2, 3, 4].map((i) => (
             <line 
               key={i}
               x1="40" 
               y1={20 + (i * 35)} 
               x2="95%" 
               y2={20 + (i * 35)}
               stroke="#F1F5F9" 
               strokeWidth="1"
             />
           ))}

           {/* Chart line */}
           <path
             d="M40,160 L120,135 L200,115 L280,100 L360,80 L440,55"
             fill="none"
             stroke="#3B82F6"
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
           />

           {/* Data points */}
           {[
             {x: 40, y: 160},
             {x: 120, y: 135},
             {x: 200, y: 115},
             {x: 280, y: 100},
             {x: 360, y: 80},
             {x: 440, y: 55}
           ].map((point, index) => (
             <circle
               key={index}
               cx={point.x}
               cy={point.y}
               r="3"
               fill="#3B82F6"
               stroke="#ffffff"
               strokeWidth="2"
             />
           ))}
         </svg>

         {/* X-axis labels */}
         <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-8">
           <span>Jan</span>
           <span>Feb</span>
           <span>Mar</span>
           <span>Apr</span>
           <span>May</span>
           <span>Jun</span>
         </div>
       </div>
     </div>
   </div>
 );
}

// Composant principal du Dashboard
function DashboardContent() {
 const { sidebarOpen, toggleSidebar } = useDashboardLayout();
 const { data, loading, error } = useDashboardData();

 if (loading) {
   return (
     <div className="min-h-screen bg-gray-50">
       <DashboardHeader onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
       
       <div className="p-6 space-y-6">
         <div className="animate-pulse">
           <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
           <div className="h-4 bg-gray-200 rounded w-1/2"></div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[1, 2, 3, 4].map((i) => (
             <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
           ))}
         </div>
       </div>
     </div>
   );
 }

 if (error) {
   return (
     <div className="min-h-screen bg-gray-50">
       <DashboardHeader onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
       
       <div className="p-6">
         <div className="bg-red-50 border border-red-200 rounded-md p-4">
           <div className="text-red-700">
             <h3 className="text-lg font-medium">Erreur de chargement</h3>
             <p className="mt-1">{error}</p>
           </div>
         </div>
       </div>
     </div>
   );
 }

 return (
   <div className="min-h-screen bg-gray-50">
     {/* Header */}
     <DashboardHeader onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

     {/* Main Content */}
     <div className="p-6 space-y-8">
       {/* Executive Summary */}
       <div>
         <div className="flex items-center space-x-2 mb-6">
           <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
           <h2 className="text-xl font-semibold text-gray-900">Executive Summary</h2>
         </div>
         
         <StatsCards data={data?.stats} />
       </div>

       {/* Financial Performance */}
       <div>
         <div className="flex items-center space-x-2 mb-6">
           <div className="w-1 h-6 bg-green-600 rounded-full"></div>
           <h2 className="text-xl font-semibold text-gray-900">Financial Performance</h2>
         </div>
         
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2">
             <RevenueChart data={data?.financial} />
           </div>
           
           <div className="space-y-6">
             {/* Platform Fees */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <div className="flex items-center space-x-4">
                 <div className="bg-green-50 p-3 rounded-xl flex-shrink-0">
                   <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                   </svg>
                 </div>
                 <div>
                   <h3 className="text-sm font-medium text-gray-500 mb-1">Platform Fees</h3>
                   <div className="text-2xl font-bold text-gray-900">$28.4K</div>
                 </div>
               </div>
             </div>
             
             {/* Tutor Earnings */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <div className="flex items-center space-x-4">
                 <div className="bg-blue-50 p-3 rounded-xl flex-shrink-0">
                   <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                   </svg>
                 </div>
                 <div>
                   <h3 className="text-sm font-medium text-gray-500 mb-1">Tutor Earnings</h3>
                   <div className="text-2xl font-bold text-gray-900">$160.6K</div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* Learning Analytics et Live Activities */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div>
           <div className="flex items-center space-x-2 mb-6">
             <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
             <h2 className="text-xl font-semibold text-gray-900">Learning Analytics</h2>
           </div>
           
           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
             <div className="mb-6">
               <h3 className="text-lg font-semibold text-gray-900 mb-1">Subject Distribution</h3>
             </div>

             <div className="space-y-4">
               {[
                 { name: 'Math', value: 1200, color: '#8B5CF6', percentage: 100 },
                 { name: 'Science', value: 800, color: '#10B981', percentage: 67 },
                 { name: 'English', value: 600, color: '#F59E0B', percentage: 50 },
                 { name: 'History', value: 400, color: '#EF4444', percentage: 33 }
               ].map((subject, index) => (
                 <div key={index} className="flex items-center space-x-4">
                   <div 
                     className="w-3 h-3 rounded-full flex-shrink-0"
                     style={{ backgroundColor: subject.color }}
                   ></div>
                   
                   <div className="w-16 text-sm font-medium text-gray-700">
                     {subject.name}
                   </div>
                   
                   <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                     <div 
                       className="h-full rounded-full transition-all duration-500 ease-out"
                       style={{ 
                         backgroundColor: subject.color,
                         width: `${subject.percentage}%`
                       }}
                     ></div>
                   </div>
                   
                   <div className="w-12 text-right text-sm font-semibold text-gray-900">
                     {subject.value}
                   </div>
                 </div>
               ))}
             </div>

             <div className="mt-6 pt-4 border-t border-gray-200">
               <div className="flex justify-between items-center">
                 <span className="text-sm font-medium text-gray-500">Total Sessions</span>
                 <span className="text-lg font-bold text-gray-900">3,000</span>
               </div>
             </div>
           </div>
         </div>
         
         <div>
           <div className="flex items-center space-x-2 mb-6">
             <div className="w-1 h-6 bg-green-600 rounded-full"></div>
             <h2 className="text-xl font-semibold text-gray-900">Live Activities</h2>
           </div>
           
           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
             <div className="mb-6">
               <h3 className="text-lg font-semibold text-gray-900 mb-1">Real-time Events</h3>
             </div>

             <div className="space-y-4">
               {[
                 { 
                   title: 'New student signup', 
                   subtitle: 'Sarah Johnson joined Mathematics', 
                   time: '2m ago',
                   icon: '👤',
                   color: 'bg-blue-50 text-blue-600'
                 },
                 { 
                   title: 'Live session started', 
                   subtitle: 'Physics tutoring with Dr. Smith', 
                   time: '5m ago',
                   icon: '▶️',
                   color: 'bg-green-50 text-green-600'
                 },
                 { 
                   title: 'Payment received', 
                   subtitle: '$45.00 for Chemistry session', 
                   time: '8m ago',
                   icon: '💳',
                   color: 'bg-emerald-50 text-emerald-600'
                 },
                 { 
                   title: 'New tutor application', 
                   subtitle: 'Michael Chen - English Literature', 
                   time: '12m ago',
                   icon: '📋',
                   color: 'bg-purple-50 text-purple-600'
                 }
               ].map((activity, index) => (
                 <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                   <div className={`p-2 rounded-lg ${activity.color} flex-shrink-0`}>
                     <span className="text-sm">{activity.icon}</span>
                   </div>
                   
                   <div className="flex-1 min-w-0">
                     <div className="flex items-center justify-between">
                       <p className="text-sm font-medium text-gray-900 truncate">
                         {activity.title}
                       </p>
                       <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                         {activity.time}
                       </span>
                     </div>
                     <p className="text-sm text-gray-500 truncate">
                       {activity.subtitle}
                     </p>
                   </div>
                   
                   <div className="flex-shrink-0">
                     <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                   </div>
                 </div>
               ))}
             </div>

             <div className="mt-6 pt-4 border-t border-gray-200">
               <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                 View all activities
               </button>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
}

export default function DashboardPage() {
 return (
   <ProtectedRoute allowedRoles={['tutor']}>
     <DashboardContent />
   </ProtectedRoute>
 );
}
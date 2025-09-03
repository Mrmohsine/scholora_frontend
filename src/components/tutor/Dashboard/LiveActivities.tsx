// components/tutor/LiveActivities.tsx
'use client';

import { Activity, Clock } from 'lucide-react';

interface ActivityItem {
 id: string;
 student: string;
 action: string;
 timeAgo: string;
 type: 'joined' | 'completed' | 'submitted' | 'enrolled' | 'payment';
}

interface LiveActivitiesProps {
 activities?: ActivityItem[];
}

export default function LiveActivities({ activities }: LiveActivitiesProps) {
 const defaultActivities: ActivityItem[] = [
   {
     id: '1',
     student: 'David Kim',
     action: 'joined Mathematics class',
     timeAgo: '2 min ago',
     type: 'joined'
   },
   {
     id: '2',
     student: 'Lisa Wang',
     action: 'completed payment for Physics',
     timeAgo: '8 min ago', 
     type: 'payment'
   },
   {
     id: '3',
     student: 'Tom Brown',
     action: 'submitted Chemistry assignment',
     timeAgo: '15 min ago',
     type: 'submitted'
   },
   {
     id: '4',
     student: 'Anna Lee',
     action: 'completed Math homework',
     timeAgo: '32 min ago',
     type: 'completed'
   },
   {
     id: '5',
     student: 'James Wilson',
     action: 'enrolled in Biology class',
     timeAgo: '1 hour ago',
     type: 'enrolled'
   }
 ];

 const currentActivities = activities || defaultActivities;

 const getActivityIcon = (type: string) => {
   switch (type) {
     case 'joined':
       return '👥';
     case 'completed':
       return '✅';
     case 'submitted':
       return '📄';
     case 'enrolled':
       return '📚';
     case 'payment':
       return '💳';
     default:
       return '📝';
   }
 };

 return (
   <div className="bg-white rounded-xl p-6 border border-gray-200">
     {/* Header */}
     <div className="flex items-center justify-between mb-4">
       <div className="flex items-center space-x-3">
         <Activity className="w-5 h-5 text-gray-400" />
         <h3 className="text-lg font-semibold text-gray-900">Live Activities</h3>
         <div className="flex items-center space-x-1">
           <Clock className="w-4 h-4 text-gray-400" />
           <span className="text-sm text-gray-500">Live</span>
         </div>
       </div>
       <button className="px-3 py-1 border border-gray-800 text-gray-900 text-sm rounded hover:bg-gray-200">
         View All
       </button>
     </div>
     
     {/* Subtitle */}
     <p className="text-sm text-gray-500 mb-6">Recent student activities and updates</p>
     
     {/* Activities List */}
     <div className="space-y-4">
       {currentActivities.map((activity) => (
         <div key={activity.id} className="flex items-start space-x-3">
           <div className="relative">
             <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
               <span className="text-gray-600 font-medium text-xs">
                 {activity.student.split(' ').map(n => n[0]).join('')}
               </span>
             </div>
             <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center border border-gray-200">
               <span className="text-xs">{getActivityIcon(activity.type)}</span>
             </div>
           </div>
           
           <div className="flex-1 min-w-0">
             <div className="flex items-center justify-between mb-1">
               <h4 className="text-sm font-medium text-gray-900">{activity.student}</h4>
               <span className="text-xs text-gray-500">{activity.timeAgo}</span>
             </div>
             <p className="text-sm text-gray-600">{activity.action}</p>
           </div>
         </div>
       ))}
     </div>

     {/* Divider */}
     <div className="border-t border-gray-200 my-6"></div>

     {/* Footer */}
     <div className="text-center">
       <button className="flex items-center justify-center space-x-2 text-sm text-gray-900 hover:text-gray-800 font-medium mx-auto">
         <Activity className="w-4 h-4" />
         <span>View Activity Log</span>
       </button>
     </div>
   </div>
 );
}
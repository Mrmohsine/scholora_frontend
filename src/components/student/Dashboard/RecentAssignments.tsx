// components/student/RecentAssignments.tsx
'use client';

interface Assignment {
 id: string;
 title: string;
 dueDate: string;
 status: 'pending' | 'submitted';
 grade?: string;
}

interface RecentAssignmentsProps {
 assignments?: Assignment[];
}

export default function RecentAssignments({ assignments }: RecentAssignmentsProps) {
 const defaultAssignments: Assignment[] = [
   {
     id: '1',
     title: 'Calculus Problem Set',
     dueDate: 'Due tomorrow',
     status: 'pending'
   },
   {
     id: '2',
     title: 'Chemistry Lab Report', 
     dueDate: 'Submitted',
     status: 'submitted',
     grade: '95%'
   }
 ];

 const currentAssignments = assignments || defaultAssignments;

 const getStatusBadge = (assignment: Assignment) => {
   if (assignment.status === 'submitted' && assignment.grade) {
     return (
       <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md font-medium">
         {assignment.grade}
       </span>
     );
   } else if (assignment.status === 'submitted') {
     return (
       <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-medium">
         Submitted
       </span>
     );
   } else {
     return (
       <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-md font-medium">
         Pending
       </span>
     );
   }
 };

 return (
   <div className="bg-white rounded-xl p-6 border border-gray-200">
     <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Assignments</h3>
     
     <div className="space-y-4">
       {currentAssignments.map((assignment) => (
         <div key={assignment.id} className="flex items-center justify-between">
           <div>
             <h4 className="font-medium text-gray-900">{assignment.title}</h4>
             <p className="text-sm text-gray-500">{assignment.dueDate}</p>
           </div>
           {getStatusBadge(assignment)}
         </div>
       ))}
     </div>

     {currentAssignments.length === 0 && (
       <div className="text-center py-8">
         <p className="text-gray-500">No recent assignments</p>
       </div>
     )}
   </div>
 );
}
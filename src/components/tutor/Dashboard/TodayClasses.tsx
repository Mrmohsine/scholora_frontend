// components/tutor/TodayClasses.tsx
'use client';

import { Clock, Users } from 'lucide-react';

interface ClassItem {
  id: string;
  title: string;
  time: string;
  students: number;
  status: 'starting-soon' | 'scheduled';
}

interface TodayClassesProps {
  classes?: ClassItem[];
}

export default function TodayClasses({ classes }: TodayClassesProps) {
  const defaultClasses: ClassItem[] = [
    {
      id: '1',
      title: 'Advanced Mathematics',
      time: '09:00 AM',
      students: 24,
      status: 'starting-soon'
    },
    {
      id: '2', 
      title: 'Physics Fundamentals',
      time: '11:30 AM',
      students: 16,
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'Chemistry Lab',
      time: '02:00 PM',
      students: 18,
      status: 'scheduled'
    },
    {
      id: '4',
      title: 'Biology Review',
      time: '04:30 PM',
      students: 22,
      status: 'scheduled'
    }
  ];

  const currentClasses = classes || defaultClasses;

  const getStatusBadge = (status: string) => {
    if (status === 'starting-soon') {
      return (
        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md font-medium">
          Starting Soon
        </span>
      );
    }
    return (
      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-medium">
        Scheduled
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Today's Classes</h3>
        <span className="text-blue-600 text-sm font-medium">4 Classes</span>
      </div>
      
      <div className="space-y-3">
        {currentClasses.map((classItem) => (
          <div key={classItem.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-medium text-sm">📚</span>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 text-sm">{classItem.title}</h4>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{classItem.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{classItem.students} students</span>
                  </div>
                </div>
              </div>
            </div>
            
            {getStatusBadge(classItem.status)}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">You scheduled <span className="font-medium">4</span> classes for today</p>
      </div>
    </div>
  );
}
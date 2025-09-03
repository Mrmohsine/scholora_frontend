// components/student/TodaySchedule.tsx
'use client';

interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  color: string;
}

interface TodayScheduleProps {
  schedule?: ScheduleItem[];
}

export default function TodaySchedule({ schedule }: TodayScheduleProps) {
  const defaultSchedule: ScheduleItem[] = [
    {
      id: '1',
      title: 'Advanced Mathematics',
      time: '9:00 AM - 10:30 AM',
      color: 'bg-blue-500'
    },
    {
      id: '2', 
      title: 'Physics Fundamentals',
      time: '2:00 PM - 3:30 PM',
      color: 'bg-green-500'
    }
  ];

  const currentSchedule = schedule || defaultSchedule;

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Today's Schedule</h3>
      
      <div className="space-y-3">
        {currentSchedule.map((item) => (
          <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className={`w-1 h-12 ${item.color} rounded-full`}></div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
              <p className="text-xs text-gray-500">{item.time}</p>
            </div>
          </div>
        ))}
      </div>

      {currentSchedule.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No classes scheduled for today</p>
        </div>
      )}
    </div>
  );
}
// components/tutor/AttendanceOverview.tsx
'use client';

interface AttendanceOverviewProps {
  totalStudents?: number;
  presentPercentage?: number;
  absentPercentage?: number;
}

export default function AttendanceOverview({ 
  totalStudents = 55,
  presentPercentage = 75,
  absentPercentage = 25 
}: AttendanceOverviewProps) {
  const presentCount = Math.round((totalStudents * presentPercentage) / 100);
  const absentCount = totalStudents - presentCount;
  
  // Calculate angles for pie chart
  const presentAngle = (presentPercentage / 100) * 360;
  const absentAngle = (absentPercentage / 100) * 360;

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Attendance Overview</h3>
        <span className="text-sm text-gray-500">Class 6A</span>
      </div>
      
      {/* Pie Chart */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0">
            <div 
              className="w-32 h-32 rounded-full"
              style={{
                background: `conic-gradient(
                  #3b82f6 0deg ${presentAngle}deg,
                  #93c5fd ${presentAngle}deg 360deg
                )`
              }}
            ></div>
          </div>
          
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
              <div className="text-center">
                <div className="text-xs font-bold text-gray-900">Total: {totalStudents}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Present</span>
          </div>
          <span className="text-sm font-medium text-gray-900">{presentCount}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
            <span className="text-sm text-gray-600">Absent</span>
          </div>
          <span className="text-sm font-medium text-gray-900">{absentCount}</span>
        </div>
      </div>
    </div>
  );
}
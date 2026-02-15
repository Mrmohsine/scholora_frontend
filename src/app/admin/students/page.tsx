// app/dashboard/students/page.tsx
'use client';

import { useState, useEffect } from 'react';

// Types
interface Student {
  id: number;
  name: string;
  email: string;
  grade: string;
  subjects: string[];
  tutors: number;
  sessions: number;
  status: 'active' | 'frozen';
  avatar?: string;
}

interface StudentsStats {
  totalStudents: number;
  activeStudents: number;
  newThisMonth: number;
  frozen: number;
}

// Hooks
function useStudentsData() {
  const [students, setStudents] = useState<Student[]>([]);
  const [stats, setStats] = useState<StudentsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulation API call
    setTimeout(() => {
      setStats({
        totalStudents: 2847,
        activeStudents: 2634,
        newThisMonth: 156,
        frozen: 57
      });

      setStudents([
        {
          id: 1,
          name: 'Alice Johnson',
          email: 'alice@example.com',
          grade: 'Grade 12',
          subjects: ['Math', 'Physics'],
          tutors: 2,
          sessions: 24,
          status: 'active'
        },
        {
          id: 2,
          name: 'Bob Smith',
          email: 'bob@example.com',
          grade: 'Grade 11',
          subjects: ['Chemistry', 'Biology'],
          tutors: 1,
          sessions: 18,
          status: 'active'
        },
        {
          id: 3,
          name: 'Carol Davis',
          email: 'carol@example.com',
          grade: 'Grade 10',
          subjects: ['Math', 'English'],
          tutors: 3,
          sessions: 31,
          status: 'active'
        },
        {
          id: 4,
          name: 'David Wilson',
          email: 'david@example.com',
          grade: 'Grade 12',
          subjects: ['Physics'],
          tutors: 1,
          sessions: 6,
          status: 'frozen'
        },
        {
          id: 5,
          name: 'Emma Brown',
          email: 'emma@example.com',
          grade: 'Grade 9',
          subjects: ['Math', 'Science'],
          tutors: 2,
          sessions: 12,
          status: 'active'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  return { students, stats, loading, error };
}

// Components
function StatsCard({ title, value, icon, iconColor, borderColor }: {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconColor: string;
  borderColor: string;
}) {
  return (
    <div className={`bg-white rounded-xl p-6 border ${borderColor} shadow-sm`}>
      <div className="flex items-center space-x-3">
        <div className={`${iconColor}`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 mb-1">{value.toLocaleString()}</p>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        </div>
      </div>
    </div>
  );
}

function StudentsTable({ students, loading }: { students: Student[]; loading: boolean }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-12 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">All Students</h2>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-4 px-6 font-medium text-black text-xs" style={{ fontFamily: 'system-ui' }}>Student</th>
              <th className="text-left py-4 px-6 font-medium text-black text-xs" style={{ fontFamily: 'system-ui' }}>Grade/Level</th>
              <th className="text-left py-4 px-6 font-medium text-black text-xs" style={{ fontFamily: 'system-ui' }}>Subjects</th>
              <th className="text-left py-4 px-6 font-medium text-black text-xs" style={{ fontFamily: 'system-ui' }}>Tutors</th>
              <th className="text-left py-4 px-6 font-medium text-black text-xs" style={{ fontFamily: 'system-ui' }}>Sessions</th>
              <th className="text-left py-4 px-6 font-medium text-black text-xs" style={{ fontFamily: 'system-ui' }}>Status</th>
              <th className="text-left py-4 px-6 font-medium text-black text-xs" style={{ fontFamily: 'system-ui' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-xs">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{student.name}</p>
                      <p className="text-xs text-gray-500">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600 text-sm">{student.grade}</td>
                <td className="py-4 px-6 text-sm">
                  <div className="text-gray-600">
                    {student.subjects.join(', ')}
                  </div>
                </td>
                <td className="py-4 px-6 text-center text-gray-600 text-sm">{student.tutors}</td>
                <td className="py-4 px-6 text-center text-gray-600 text-sm">{student.sessions}</td>
                <td className="py-4 px-6 text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    student.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Main Component
export default function StudentsPage() {
  const { students, stats, loading, error } = useStudentsData();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-red-700">
            <h3 className="text-lg font-medium">Error Loading Students</h3>
            <p className="mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
            <p className="text-gray-600 mt-1">Manage all registered students</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              Export
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Student
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Students"
            value={stats?.totalStudents || 0}
            iconColor="text-blue-600"
            borderColor="border-blue-300"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          <StatsCard
            title="Active Students"
            value={stats?.activeStudents || 0}
            iconColor="text-green-600"
            borderColor="border-green-300"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatsCard
            title="New This Month"
            value={stats?.newThisMonth || 0}
            iconColor="text-orange-600"
            borderColor="border-orange-300"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatsCard
            title="Frozen"
            value={stats?.frozen || 0}
            iconColor="text-red-600"
            borderColor="border-red-300"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                <line x1="15" y1="9" x2="9" y2="15" strokeWidth="2"/>
                <line x1="9" y1="9" x2="15" y2="15" strokeWidth="2"/>
              </svg>
            }
          />
        </div>

        {/* Students Table */}
        <StudentsTable students={students} loading={loading} />
      </div>
    </div>
  );
}
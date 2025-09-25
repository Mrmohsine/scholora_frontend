'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import TutorSidebar from '@/components/tutor/Sidebar';
import TutorDashboardHeader from '@/components/tutor/Dashboard/DashboardHeader';
import { authService } from '@/lib/auth/authService';

function TutorFinanceContent() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const students = [
    { id: 1, name: 'Sarah Johnson', grade: '12', class: 'Mathematics A', fee: 150, status: 'Pending', nextDue: '2024-02-01', statusColor: 'bg-yellow-100 text-yellow-700' },
    { id: 2, name: 'Mike Chen', grade: '11', class: 'Mathematics B', fee: 200, status: 'Overdue (5d)', nextDue: '2024-02-07', statusColor: 'bg-red-100 text-red-700' },
    { id: 3, name: 'Emma Wilson', grade: '10', class: 'Physics A', fee: 175, status: 'Paid', nextDue: '2024-02-17', statusColor: 'bg-green-100 text-green-700' },
    { id: 4, name: 'Carlos Rodriguez', grade: '12', class: 'Physics B', fee: 150, status: 'Pending', nextDue: '2024-02-15', statusColor: 'bg-yellow-100 text-yellow-700' },
    { id: 5, name: 'Lisa Park', grade: '11', class: 'Chemistry A', fee: 225, status: 'Pending', nextDue: '2024-02-05', statusColor: 'bg-yellow-100 text-yellow-700' },
    { id: 6, name: 'James Smith', grade: '10', class: 'Chemistry B', fee: 150, status: 'Overdue (10d)', nextDue: '2024-02-22', statusColor: 'bg-red-100 text-red-700' },
    { id: 7, name: 'Maria Garcia', grade: '12', class: 'Biology', fee: 225, status: 'Paid', nextDue: '2024-02-11', statusColor: 'bg-green-100 text-green-700' },
    { id: 8, name: 'Robert Brown', grade: '11', class: 'English', fee: 200, status: 'Paid', nextDue: '2024-02-06', statusColor: 'bg-green-100 text-green-700' },
    { id: 9, name: 'Jennifer Davis', grade: '10', class: 'Mathematics A', fee: 175, status: 'Paid', nextDue: '2024-02-03', statusColor: 'bg-green-100 text-green-700' },
    { id: 10, name: 'Michael Miller', grade: '12', class: 'Mathematics B', fee: 175, status: 'Pending', nextDue: '2024-02-09', statusColor: 'bg-yellow-100 text-yellow-700' },
    { id: 11, name: 'Ashley Wilson', grade: '11', class: 'Physics A', fee: 175, status: 'Pending', nextDue: '2024-02-16', statusColor: 'bg-yellow-100 text-yellow-700' },
    { id: 12, name: 'Christopher Moore', grade: '10', class: 'Physics B', fee: 200, status: 'Paid', nextDue: '2024-02-15', statusColor: 'bg-green-100 text-green-700' }
  ];

  useEffect(() => {
    const userData = authService.getUser();
    if (userData) {
      setUser(userData);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getActionButton = (status: string) => {
    if (status === 'Paid') {
      return (
        <button className="text-gray-500 text-sm hover:text-gray-700">
          Up to Date
        </button>
      );
    } else if (status.includes('Overdue')) {
      return (
        <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
          Freeze
        </button>
      );
    } else {
      return (
        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
          Mark Paid
        </button>
      );
    }
  };

  const getContactAction = (status: string) => {
    if (status === 'Paid') {
      return <span className="text-gray-400">—</span>;
    } else if (status.includes('Overdue')) {
      return <span className="text-sm text-gray-600">Final Notice</span>;
    } else {
      return <span className="text-sm text-gray-600">Remind</span>;
    }
  };

  const itemsPerPage = 20;
  const totalPages = Math.ceil(students.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStudents = students.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <TutorSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <TutorDashboardHeader user={user} />
        
        {/* Finance Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Finance Management</h1>
            <p className="text-gray-500 mt-1">Automated payment tracking and student account management</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">$45,230</p>
                  <p className="text-sm text-green-600">+12.5%</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600">💰</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">247</p>
                  <p className="text-sm text-blue-600">+2.1%</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600">👥</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Paid Students</p>
                  <p className="text-2xl font-bold text-gray-900">216</p>
                  <p className="text-sm text-green-600">87.4%</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600">✅</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Payments</p>
                  <p className="text-2xl font-bold text-gray-900">23</p>
                  <p className="text-sm text-yellow-600">9.3%</p>
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600">⏳</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overdue Accounts</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                  <p className="text-sm text-red-600">3.2%</p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600">⚠️</span>
                </div>
              </div>
            </div>
          </div>

          {/* Student Payment Management */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Student Payment Management</h2>
                <div className="flex space-x-4">
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                    <span>📊</span>
                    <span>Export</span>
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                    <span>⚙️</span>
                    <span>Automation Settings</span>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center space-x-4 mt-4">
                <div className="relative flex-1 max-w-md">
                  <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                  <input 
                    type="text" 
                    placeholder="Search students by name or class..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
                  />
                </div>
                <select className="border border-gray-200 px-4 py-2 rounded-lg text-gray-600">
                  <option>All Classes</option>
                </select>
                <select className="border border-gray-200 px-4 py-2 rounded-lg text-gray-600">
                  <option>All Status</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Fee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Due</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">ID: {student.id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.class}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${student.fee}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${student.statusColor}`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        📅 {student.nextDue}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <button className="text-gray-400 hover:text-gray-600">📧</button>
                          <button className="text-gray-400 hover:text-gray-600">📞</button>
                          {getContactAction(student.status)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {getActionButton(student.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing 1 to 20 of 247 students
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1 text-sm bg-blue-600 text-white rounded">
                  Page 1 of 13
                </span>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function TutorFinancePage() {
  return (
    <ProtectedRoute allowedRoles={['tutor']}>
      <TutorFinanceContent />
    </ProtectedRoute>
  );
}
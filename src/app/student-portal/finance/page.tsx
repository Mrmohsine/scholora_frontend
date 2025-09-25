'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import StudentSidebar from '@/components/student/Sidebar';
import StudentDashboardHeader from '@/components/student/Dashboard/DashboardHeader';
import { authService } from '@/lib/auth/authService';

function StudentFinanceContent() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const paymentAlerts = [
    {
      type: 'overdue',
      title: 'Dr. Sarah Johnson',
      message: 'Payment due 3 days overdue',
      action: 'Pay Now'
    },
    {
      type: 'due',
      title: 'Just Michael Chen',
      message: 'Payment due in 2 days',
      action: 'Pay Now'
    }
  ];

  const tutorPayments = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      subject: 'Advanced Mathematics',
      amount: 350,
      status: 'Overdue',
      avatar: '👩‍🏫'
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      subject: 'Physics Fundamentals',
      amount: 300,
      status: 'Overdue',
      avatar: '👨‍🏫'
    },
    {
      id: 3,
      name: 'Ms. Emily Rodriguez',
      subject: 'Organic Chemistry',
      amount: 260,
      status: 'Paid',
      avatar: '👩‍🏫'
    }
  ];

  const paymentMethods = [
    {
      type: 'Visa',
      number: '•••• •••• •••• 4532',
      status: 'ACTIVE',
      isDefault: true
    },
    {
      type: 'Mastercard',
      number: '•••• •••• •••• 7890',
      status: 'DECLINED',
      isDefault: false
    }
  ];

  const recentPayments = [
    {
      id: 1,
      amount: 320,
      description: 'Dr. Sarah Johnson - Advanced Mathematics',
      date: 'Dec 15, 2024',
      status: 'Completed'
    },
    {
      id: 2,
      amount: 280,
      description: 'Prof. Michael Chen - Physics Fundamentals',
      date: 'Dec 10, 2024',
      status: 'Completed'
    },
    {
      id: 3,
      amount: 250,
      description: 'Ms. Emily Rodriguez - Organic Chemistry',
      date: 'Dec 5, 2024',
      status: 'Completed'
    }
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <StudentSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <StudentDashboardHeader user={user} />
        
        {/* Finance Content */}
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Financial Dashboard</h1>
              <p className="text-gray-500 mt-1">Manage your payments and financial information</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Add Payment Method
            </button>
          </div>

          {/* Payment Alerts */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-red-500">🚨</span>
              <h2 className="text-lg font-semibold text-gray-900">Payment Alerts</h2>
            </div>
            
            <div className="space-y-4">
              {paymentAlerts.map((alert, index) => (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'overdue' ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{alert.title}</h3>
                      <p className="text-sm text-gray-600">{alert.message}</p>
                    </div>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm">
                      {alert.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Balance Cards */}
            <div className="bg-blue-600 text-white rounded-lg p-6">
              <h3 className="text-sm opacity-90 mb-2">Current Balance</h3>
              <p className="text-3xl font-bold">$320</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm text-gray-600 mb-2">This Month</h3>
              <p className="text-3xl font-bold text-gray-900">$1,240</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm text-gray-600 mb-2">Pending</h3>
                  <p className="text-3xl font-bold text-gray-900">3</p>
                </div>
                <span className="text-orange-500">⏳</span>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm text-gray-600 mb-2">Completed</h3>
                  <p className="text-3xl font-bold text-gray-900">$59</p>
                </div>
                <span className="text-green-500">✅</span>
              </div>
            </div>
          </div>

          {/* Tutor Payments */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Tutor Payments</h2>
            
            <div className="space-y-4">
              {tutorPayments.map((tutor) => (
                <div key={tutor.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span>{tutor.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{tutor.name}</h3>
                      <p className="text-sm text-gray-600">{tutor.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-semibold text-gray-900">${tutor.amount}</span>
                    <span className={`px-3 py-1 rounded text-sm font-medium ${
                      tutor.status === 'Paid' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {tutor.status}
                    </span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                      Pay Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Methods */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm">Edit Card</button>
              </div>
              
              <div className="space-y-4">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs">💳</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{method.type}</p>
                        <p className="text-sm text-gray-600">{method.number}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        method.status === 'ACTIVE' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {method.status}
                      </span>
                      {method.isDefault && (
                        <span className="text-xs text-gray-500">Default</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Payments */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Payments</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm">All Activity</button>
              </div>
              
              <div className="space-y-4">
                {recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">${payment.amount} to Tutor Payment Refund</p>
                        <p className="text-xs text-gray-600">{payment.description}</p>
                        <p className="text-xs text-gray-500">{payment.date}</p>
                      </div>
                    </div>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                      {payment.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function StudentFinancePage() {
  return (
    <ProtectedRoute allowedRoles={['student']}>
      <StudentFinanceContent />
    </ProtectedRoute>
  );
}
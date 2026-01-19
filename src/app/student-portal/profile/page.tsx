'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import StudentSidebar from '@/components/student/Sidebar';
import StudentDashboardHeader from '@/components/student/Dashboard/DashboardHeader';
import { authService } from '@/lib/auth/authService';

function StudentSettingsContent() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567'
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notifications, setNotifications] = useState({
    classReminders: true,
    assignmentDueDates: true,
    gradeUpdates: false,
    messages: true
  });
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');

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

  const handleProfileSubmit = () => {
    // Handle profile update
  };

  const handlePasswordSubmit = () => {
    // Handle password update
  };

  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <StudentSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <StudentDashboardHeader user={user} />
        
        {/* Settings Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-500 mt-1">Manage your profile information</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <span className="text-gray-600">👤</span>
                <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
              </div>

              {/* Profile Photo */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600">👤</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm">
                  Change Photo
                </button>
              </div>

              {/* Profile Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-900"
                  />
                </div>
              </div>

              <button
                onClick={handleProfileSubmit}
                className="w-full mt-6 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900"
              >
                Save Changes
              </button>
            </div>

           

            
          </div>
        </main>
      </div>
    </div>
  );
}

export default function StudentSettingsPage() {
  return (
    <ProtectedRoute allowedRoles={['student']}>
      <StudentSettingsContent />
    </ProtectedRoute>
  );
}
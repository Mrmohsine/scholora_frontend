'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import TutorSidebar from '@/components/tutor/Sidebar';
import TutorDashboardHeader from '@/components/tutor/Dashboard/DashboardHeader';
import { authService } from '@/lib/auth/authService';
import { Eye, EyeOff } from "lucide-react";

function TutorSettingsContent() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
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
      <TutorSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <TutorDashboardHeader user={user} />
        
        {/* Settings Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-500 mt-1">Manage your account and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Notifications */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Class Reminders</p>
                    <p className="text-sm text-gray-600">Get notified before classes start</p>
                  </div>
                  <button
                    onClick={() => toggleNotification('classReminders')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications.classReminders ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute w-5 h-5 bg-white rounded-full transition-transform top-0.5 ${
                      notifications.classReminders ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Assignment Due Dates</p>
                    <p className="text-sm text-gray-600">Reminders for upcoming assignments</p>
                  </div>
                  <button
                    onClick={() => toggleNotification('assignmentDueDates')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications.assignmentDueDates ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute w-5 h-5 bg-white rounded-full transition-transform top-0.5 ${
                      notifications.assignmentDueDates ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Grade Updates</p>
                    <p className="text-sm text-gray-600">When new grades are posted</p>
                  </div>
                  <button
                    onClick={() => toggleNotification('gradeUpdates')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications.gradeUpdates ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute w-5 h-5 bg-white rounded-full transition-transform top-0.5 ${
                      notifications.gradeUpdates ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Messages</p>
                    <p className="text-sm text-gray-600">New messages from tutors</p>
                  </div>
                  <button
                    onClick={() => toggleNotification('messages')}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications.messages ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`absolute w-5 h-5 bg-white rounded-full transition-transform top-0.5 ${
                      notifications.messages ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>
              </div>

              {/* Appearance */}
              <div className="mt-8">
                <div className="flex items-center space-x-2 mb-4">
                  <h3 className="font-semibold text-gray-900">Appearance</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Dark Mode</p>
                      <p className="text-sm text-gray-600">Switch to dark theme</p>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        darkMode ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute w-5 h-5 bg-white rounded-full transition-transform top-0.5 ${
                        darkMode ? 'translate-x-6' : 'translate-x-0.5'
                      }`}></div>
                    </button>
                  </div>

                  <div>
                    <label className="block font-medium text-gray-900 mb-2">Language</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Security</h2>
              </div>

              <div className="space-y-4">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      autoComplete="current-password"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, currentPassword: e.target.value })
                      }
                      className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords({ ...showPasswords, current: !showPasswords.current })
                      }
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      autoComplete="new-password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, newPassword: e.target.value })
                      }
                      className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords({ ...showPasswords, new: !showPasswords.new })
                      }
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      autoComplete="new-password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          confirm: !showPasswords.confirm,
                        })
                      }
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>


              <button
                onClick={handlePasswordSubmit}
                className="w-full mt-6 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900"
              >
                Update Password
              </button>

              {/* Two-Factor Authentication */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600 mb-4">Add extra security to your account</p>
                <button className="text-blue-600 hover:text-blue-700 text-sm">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function TutorSettingsPage() {
  return (
    <ProtectedRoute allowedRoles={['tutor']}>
      <TutorSettingsContent />
    </ProtectedRoute>
  );
}
'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import StudentSidebar from '@/components/student/Sidebar';
import StudentDashboardHeader from '@/components/student/Dashboard/DashboardHeader';
import { authService } from '@/lib/auth/authService';

function StudentMessagesContent() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const conversations = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      initials: 'DSJ',
      subject: 'Advanced Mathematics',
      lastMessage: 'Great work on the calc...',
      time: '2m ago',
      hasUnread: true
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      initials: 'PMC',
      subject: 'Physics Fundamentals',
      lastMessage: 'Lab report feedback is rea...',
      time: '1h ago',
      hasUnread: false
    },
    {
      id: 3,
      name: 'Study Group - Chemistry',
      initials: 'SG-C',
      subject: 'Group Chat',
      lastMessage: 'Meeting tomorrow at 3...',
      time: '3h ago',
      hasUnread: true
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
        
        {/* Messages Content */}
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
              <p className="text-gray-500 mt-1">Communicate with your tutors and classmates</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <span>+</span>
              <span>New Message</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                  <input 
                    type="text" 
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
                  />
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedConversation === conversation.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-gray-700">{conversation.initials}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {conversation.name}
                          </p>
                          <div className="flex items-center space-x-2">
                            <p className="text-xs text-gray-500">{conversation.time}</p>
                            {conversation.hasUnread && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{conversation.subject}</p>
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {conversations.find(c => c.id === selectedConversation)?.initials}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {conversations.find(c => c.id === selectedConversation)?.name} - {conversations.find(c => c.id === selectedConversation)?.subject}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 p-6 h-96 overflow-y-auto">
                    <div className="text-center text-gray-500 text-sm">
                      Start your conversation with {conversations.find(c => c.id === selectedConversation)?.name}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Send
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Dr. Sarah Johnson - Advanced Mathematics
                    </h3>
                    <p className="text-gray-500">Select a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function StudentMessagesPage() {
  return (
    <ProtectedRoute allowedRoles={['student']}>
      <StudentMessagesContent />
    </ProtectedRoute>
  );
}
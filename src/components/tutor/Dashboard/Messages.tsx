// components/tutor/Messages.tsx
'use client';

import { MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timeAgo: string;
  isNew?: boolean;
  hasNotification?: boolean;
}

interface MessagesProps {
  messages?: Message[];
}

export default function Messages({ messages }: MessagesProps) {
  const defaultMessages: Message[] = [
    {
      id: '1',
      sender: 'Sarah Chen',
      content: 'Could you explain the quadratic formula again?',
      timeAgo: '5 min ago',
      isNew: true,
      hasNotification: true
    },
    {
      id: '2',
      sender: 'Mike Johnson', 
      content: 'When is the next assignment due?',
      timeAgo: '12 min ago',
      hasNotification: true
    },
    {
      id: '3',
      sender: 'Emma Davis',
      content: 'Thank you for the extra help session!',
      timeAgo: '1 hour ago'
    },
    {
      id: '4',
      sender: 'Alex Rodriguez',
      content: 'I have a question about chapter 5...',
      timeAgo: '2 hours ago'
    }
  ];

  const currentMessages = messages || defaultMessages;

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <MessageSquare className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
          <span className="px-2 py-1 bg-red-500 text-white text-xs rounded font-medium">
            2 new
          </span>
        </div>
        <button className="px-3 py-1 border border-gray-800 text-gray-900 text-sm rounded hover:bg-gray-200">
            View All
        </button>
      </div>
      
      {/* Subtitle */}
      <p className="text-sm text-gray-500 mb-6">Recent student communications</p>
      
      {/* Messages List */}
      <div className="space-y-4">
        {currentMessages.map((message, index) => (
          <div key={message.id} className={`flex items-start space-x-3 p-3 rounded-lg ${
            index < 2 ? 'bg-blue-50 border border-blue-100' : ''
          }`}>
            <div className="relative">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-gray-600 font-medium text-xs">
                  {message.sender.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              {message.hasNotification && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-gray-900">{message.sender}</h4>
                <div className="flex items-center space-x-2">
                  {message.isNew && (
                    <div className="w-4 h-4 text-red-500">🔔</div>
                  )}
                  <span className="text-xs text-gray-500">{message.timeAgo}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Footer */}
      <div className="text-center">
        <button className="flex items-center justify-center space-x-2 text-sm text-gray-900 hover:text-gray-800 font-medium mx-auto">
            <MessageSquare className="w-4 h-4" />
            <span>Open All Messages</span>
        </button>
      </div>
    </div>
  );
}
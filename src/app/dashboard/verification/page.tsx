// app/dashboard/verification/page.tsx
'use client';

import { useState, useEffect } from 'react';

// Types
interface TutorApplication {
  id: number;
  name: string;
  email: string;
  subjects: string[];
  education: string;
  experience: string;
  appliedDate: string;
  priority: 'high' | 'medium' | 'low';
  documents: string[];
  status: 'pending' | 'approved' | 'rejected';
}

interface VerificationStats {
  pendingReview: number;
  approvedThisMonth: number;
  rejectedThisMonth: number;
}

// Hook for data
function useVerificationData() {
  const [applications, setApplications] = useState<TutorApplication[]>([]);
  const [stats, setStats] = useState<VerificationStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        pendingReview: 23,
        approvedThisMonth: 156,
        rejectedThisMonth: 34
      });

      setApplications([
        {
          id: 1,
          name: 'Dr. Sarah Johnson',
          email: 'sarah.j@example.com',
          subjects: ['Mathematics', 'Statistics'],
          education: 'PhD in Mathematics, MIT',
          experience: '8 years',
          appliedDate: '2024-03-15',
          priority: 'high',
          documents: ['CV', 'Degree Certificate', 'ID'],
          status: 'pending'
        },
        {
          id: 2,
          name: 'Prof. Robert Kim',
          email: 'robert.kim@example.com',
          subjects: ['Physics', 'Engineering'],
          education: 'PhD in Physics, Stanford',
          experience: '12 years',
          appliedDate: '2024-03-14',
          priority: 'medium',
          documents: ['CV', 'Degree Certificate', 'References'],
          status: 'pending'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  return { applications, stats, loading };
}

// Stats Card Component
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
          <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        </div>
      </div>
    </div>
  );
}

// Application Card Component
function ApplicationCard({ application, onApprove, onReject }: {
  application: TutorApplication;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{application.name}</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(application.priority)}`}>
                {application.priority} priority
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-3">{application.email}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Subjects:</span> {application.subjects.join(', ')}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Experience:</span> {application.experience}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Education:</span> {application.education}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Applied:</span> {application.appliedDate}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <span className="text-sm text-gray-600 font-medium">Documents: </span>
              <div className="inline-flex space-x-2">
                {application.documents.map((doc, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {doc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <button className="flex items-center px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Review
          </button>
          <button 
            onClick={() => onApprove(application.id)}
            className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Approve
          </button>
          <button 
            onClick={() => onReject(application.id)}
            className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function VerificationPage() {
  const { applications, stats, loading } = useVerificationData();

  const handleApprove = (id: number) => {
    console.log('Approve application', id);
    // Implementation for approval
  };

  const handleReject = (id: number) => {
    console.log('Reject application', id);
    // Implementation for rejection
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Verification Center</h1>
          <p className="text-gray-600 mt-1">Review and approve tutor applications</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Pending Review"
            value={stats?.pendingReview || 0}
            iconColor="text-orange-600"
            borderColor="border-orange-300"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatsCard
            title="Approved This Month"
            value={stats?.approvedThisMonth || 0}
            iconColor="text-green-600"
            borderColor="border-green-300"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatsCard
            title="Rejected This Month"
            value={stats?.rejectedThisMonth || 0}
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

        {/* Pending Applications Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Pending Applications</h2>
            <p className="text-sm text-gray-600 mt-1">Tutor applications requiring review</p>
          </div>
          
          <div className="p-6">
            {applications.length > 0 ? (
              applications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-600">No pending applications</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
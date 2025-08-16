'use client';

import React from 'react';
import { Shield, Lock, Users, CreditCard, Eye, Mail, FileText, AlertCircle } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  const sections = [
    {
      id: 'information-collect',
      title: '1. Information We Collect',
      icon: <Users className="w-6 h-6 text-blue-600" />,
      content: [
        'Personal details (name, email, phone, age)',
        'Account information (username, password)',
        'Payment details (processed by third-party providers)',
        'Usage data (logins, activity, preferences)'
      ]
    },
    {
      id: 'how-we-use',
      title: '2. How We Use Your Information',
      icon: <Eye className="w-6 h-6 text-green-600" />,
      content: [
        'To create and manage accounts',
        'To connect students with tutors',
        'To process payments securely',
        'To improve our services',
        'To communicate updates, offers, or support'
      ]
    },
    {
      id: 'sharing-data',
      title: '3. Sharing Data',
      icon: <Shield className="w-6 h-6 text-purple-600" />,
      content: [
        'With tutors or students for lesson purposes',
        'With payment processors and service providers',
        'When required by law or legal requests'
      ]
    },
    {
      id: 'cookies-tracking',
      title: '4. Cookies & Tracking',
      icon: <FileText className="w-6 h-6 text-orange-600" />,
      content: [
        'See our Cookie Policy for details on how we use cookies and tracking technologies'
      ]
    },
    {
      id: 'children-privacy',
      title: '5. Children\'s Privacy',
      icon: <AlertCircle className="w-6 h-6 text-red-600" />,
      content: [
        'If you are under 16, parental consent is required',
        'Scholora does not knowingly collect data from children without such consent'
      ]
    },
    {
      id: 'data-security',
      title: '6. Data Security',
      icon: <Lock className="w-6 h-6 text-indigo-600" />,
      content: [
        'We use industry-standard methods (encryption, secure storage) to protect your data'
      ]
    },
    {
      id: 'user-rights',
      title: '7. User Rights',
      icon: <Users className="w-6 h-6 text-teal-600" />,
      content: [
        'Access, update, or delete your personal data',
        'Opt out of marketing communications'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-gray-600">Scholora Educational Platform</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-semibold text-blue-900 mb-2">
                Your Privacy Matters
              </h2>
              <p className="text-blue-800">
                At Scholora, we are committed to protecting your privacy and ensuring the security 
                of your personal information. This policy explains how we collect, use, and protect 
                your data when you use our educational platform.
              </p>
            </div>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  {section.icon}
                  <h3 className="text-xl font-semibold text-gray-900">
                    {section.title}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Last Updated */}
        <div className="mt-12 bg-gray-100 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Policy Updates
              </h3>
              <p className="text-gray-600">
                This privacy policy was last updated on {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <div className="text-center">
            <Mail className="w-8 h-8 mx-auto mb-3 opacity-90" />
            <h3 className="text-xl font-semibold mb-2">
              Questions About Your Privacy?
            </h3>
            <p className="opacity-90 mb-4">
              We're here to help. Contact our privacy team for any concerns or questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:support@scholora.com"
                className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-lg transition-colors"
              >
                support@scholora.com
              </a>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
       
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
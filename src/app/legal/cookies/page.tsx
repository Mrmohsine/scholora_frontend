'use client';

import React from 'react';
import { 
  Cookie, 
  Shield, 
  Settings, 
  BarChart3, 
  Target, 
  Sliders,
  CheckCircle,
  Info
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const CookiePolicyPage: React.FC = () => {
  const cookieTypes = [
    {
      id: 'essential',
      title: 'Essential Cookies',
      icon: <Shield className="w-6 h-6 text-red-600" />,
      description: 'Required for login, security, and core functions',
      details: [
        'Authentication and session management',
        'Security features and fraud prevention',
        'Basic platform functionality',
        'Form submissions and data processing'
      ],
      required: true
    },
    {
      id: 'functional',
      title: 'Functional Cookies',
      icon: <Settings className="w-6 h-6 text-blue-600" />,
      description: 'Save preferences like language or settings',
      details: [
        'Language and region preferences',
        'User interface customizations',
        'Accessibility settings',
        'Remember user choices and preferences'
      ],
      required: false
    },
    {
      id: 'analytics',
      title: 'Analytics Cookies',
      icon: <BarChart3 className="w-6 h-6 text-green-600" />,
      description: 'Help us understand usage and improve the platform',
      details: [
        'Website traffic and user behavior analysis',
        'Performance monitoring and optimization',
        'Feature usage statistics',
        'Error tracking and debugging'
      ],
      required: false
    },
    {
      id: 'advertising',
      title: 'Advertising Cookies',
      icon: <Target className="w-6 h-6 text-purple-600" />,
      description: 'Used for marketing and personalized ads (if applicable)',
      details: [
        'Personalized advertising content',
        'Marketing campaign effectiveness',
        'Social media integration',
        'Third-party advertising services'
      ],
      required: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header></Header>
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
              <Cookie className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
              <p className="text-gray-600">Scholora Educational Platform</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <Cookie className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-semibold text-orange-900 mb-2">
                What Are Cookies?
              </h2>
              <p className="text-orange-800">
                Cookies are small files stored on your device when using our platform. 
                They help us provide you with a better experience by remembering your 
                preferences and improving our services.
              </p>
            </div>
          </div>
        </div>

        {/* Cookie Types */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>
          <div className="grid gap-6">
            {cookieTypes.map((type) => (
              <div
                key={type.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {type.icon}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {type.title}
                        </h3>
                        <p className="text-gray-600 mt-1">{type.description}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      type.required 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {type.required ? 'Required' : 'Optional'}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {type.details.map((detail, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 text-sm">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cookie Control */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <Sliders className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Cookie Control
              </h3>
              <div className="space-y-3 text-blue-800">
                <p>
                  You have control over the cookies we use. Here's how you can manage them:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white/50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Browser Settings</h4>
                    <p className="text-sm">
                      You can manage or disable cookies through your browser settings. 
                      Each browser has different options for cookie management.
                    </p>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Platform Settings</h4>
                    <p className="text-sm">
                      Logged-in users can adjust cookie preferences in their account settings 
                      to control non-essential cookies.
                    </p>
                  </div>
                </div>

                <div className="bg-amber-100 border border-amber-300 rounded-lg p-4 mt-4">
                  <div className="flex items-start space-x-2">
                    <Info className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-amber-800 text-sm">
                      <strong>Important:</strong> Some features may not work properly without essential cookies. 
                      Disabling cookies may affect your user experience on Scholora.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Consent */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-3">
                Your Consent
              </h3>
              <div className="space-y-3 text-green-800">
                <p>
                  By using Scholora, you agree to our use of cookies as outlined in this policy.
                </p>
                
                <div className="bg-white/50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Cookie Banner</h4>
                  <p className="text-sm">
                    A banner will notify users upon their first visit to inform them about our 
                    cookie usage and provide options to manage their preferences.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-900">What This Means:</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Essential cookies are automatically accepted</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>You can opt-out of non-essential cookies</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Your preferences are remembered</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-900">Your Rights:</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Change preferences anytime</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Clear cookies from your browser</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Contact us with questions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Browser Instructions */}
        <div className="bg-gray-100 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            How to Manage Cookies in Popular Browsers
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Chrome', shortcut: 'Ctrl+Shift+Delete' },
              { name: 'Firefox', shortcut: 'Ctrl+Shift+Delete' },
              { name: 'Safari', shortcut: 'Cmd+Option+E' },
              { name: 'Edge', shortcut: 'Ctrl+Shift+Delete' }
            ].map((browser) => (
              <div key={browser.name} className="bg-white rounded-lg p-4 text-center">
                <h4 className="font-semibold text-gray-900 mb-2">{browser.name}</h4>
                <p className="text-sm text-gray-600">
                  Quick clear: <br />
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {browser.shortcut}
                  </code>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Last Updated */}
        <div className="bg-gray-100 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Policy Last Updated
              </h3>
              <p className="text-gray-600">
                This cookie policy was last updated on {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <Cookie className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 text-white">
          <div className="text-center">
            <Cookie className="w-8 h-8 mx-auto mb-3 opacity-90" />
            <h3 className="text-xl font-semibold mb-2">
              Questions About Cookies?
            </h3>
            <p className="opacity-90 mb-4">
              Contact our team if you have questions about our cookie usage or need help managing your preferences.
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
      <Footer/>
    </div>
  );
};

export default CookiePolicyPage;
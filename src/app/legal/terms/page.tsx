'use client';

import React from 'react';
import { 
  Shield, 
  User, 
  Lock, 
  AlertTriangle, 
  CreditCard, 
  Copyright, 
  XCircle, 
  Scale,
  BookOpen,
  Flag
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const TermsOfServicePage: React.FC = () => {
  const sections = [
    {
      id: 'eligibility',
      title: '1. Eligibility',
      icon: <User className="w-6 h-6 text-blue-600" />,
      content: [
        'You must be at least 16 years old, or have parental consent if younger',
        'Tutors must provide accurate identity and qualification information'
      ]
    },
    {
      id: 'accounts',
      title: '2. Accounts',
      icon: <Lock className="w-6 h-6 text-green-600" />,
      content: [
        'You are responsible for keeping your account login secure',
        'Any activity from your account is your responsibility'
      ]
    },
    {
      id: 'use-of-services',
      title: '3. Use of Services',
      icon: <AlertTriangle className="w-6 h-6 text-orange-600" />,
      content: [
        'Users must not post harmful, illegal, or offensive content',
        'Tutors are responsible for the quality and legality of lessons provided'
      ]
    },
    {
      id: 'payments',
      title: '4. Payments',
      icon: <CreditCard className="w-6 h-6 text-purple-600" />,
      content: [
        'Payments are processed through trusted third-party providers',
        'Scholora may charge service fees or commissions',
        'Refunds are subject to Scholora\'s refund policy'
      ]
    },
    {
      id: 'intellectual-property',
      title: '5. Intellectual Property',
      icon: <Copyright className="w-6 h-6 text-indigo-600" />,
      content: [
        'Lesson materials belong to tutors unless otherwise agreed',
        'Scholora owns all rights to its platform design, code, and brand'
      ]
    },
    {
      id: 'termination',
      title: '6. Termination',
      icon: <XCircle className="w-6 h-6 text-red-600" />,
      content: [
        'Scholora may suspend or close accounts that violate these Terms',
        'Users may delete their account at any time'
      ]
    },
    {
      id: 'disclaimer-liability',
      title: '7. Disclaimer & Limitation of Liability',
      icon: <Shield className="w-6 h-6 text-yellow-600" />,
      content: [
        'Scholora provides a platform but does not guarantee specific results',
        'We are not liable for tutor/student conduct, technical issues, or third-party services'
      ]
    },
    {
      id: 'governing-law',
      title: '8. Governing Law',
      icon: <Scale className="w-6 h-6 text-teal-600" />,
      content: [
        'These Terms are governed by the laws of Morocco'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header></Header>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
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
            <BookOpen className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-lg font-semibold text-blue-900 mb-2">
                Welcome to Scholora
              </h2>
              <p className="text-blue-800">
                These Terms of Service govern your use of the Scholora educational platform. 
                By using our services, you agree to be bound by these terms. Please read them 
                carefully before using our platform to connect students with qualified tutors.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
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
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                Important Notice
              </h3>
              <p className="text-amber-800 mb-3">
                By using Scholora, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
              <ul className="space-y-2 text-amber-800">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>These terms may be updated from time to time</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Continued use of the platform constitutes acceptance of new terms</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Users will be notified of significant changes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Jurisdiction */}
        <div className="mt-8 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Flag className="w-6 h-6" />
            <h3 className="text-xl font-semibold">Jurisdiction</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="mb-3 opacity-90">
                These Terms of Service are governed by and construed in accordance with the laws of Morocco.
              </p>
              <p className="opacity-90">
                Any disputes arising from these terms will be subject to the exclusive jurisdiction of Moroccan courts.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <Flag className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">Morocco</p>
                <p className="text-sm opacity-90">Governing Law</p>
              </div>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-8 bg-gray-100 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Terms Last Updated
              </h3>
              <p className="text-gray-600">
                These terms were last updated on {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-6 text-white">
          <div className="text-center">
            <Scale className="w-8 h-8 mx-auto mb-3 opacity-90" />
            <h3 className="text-xl font-semibold mb-2">
              Questions About These Terms?
            </h3>
            <p className="opacity-90 mb-4">
              Our legal team is available to clarify any questions about our Terms of Service.
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

export default TermsOfServicePage;
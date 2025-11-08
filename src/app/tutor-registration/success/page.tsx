// src/app/tutor-registration/success/page.tsx
'use client';

import { useEffect } from 'react';
import { CheckCircle, Home, User } from 'lucide-react';
import Link from 'next/link';

export default function RegistrationSuccessPage() {
  useEffect(() => {
    // Clear registration data from localStorage
    localStorage.removeItem('tutor_draft_email');
    localStorage.removeItem('tutor_id');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Application Submitted Successfully! 🎉
          </h1>
          <p className="text-xl text-gray-600">
            Thank you for applying to become a tutor on Scholora
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-3 text-lg">What happens next?</h3>
          <ul className="space-y-3 text-blue-800">
            <li className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold">1.</span>
              <span>Our team will review your profile within 24-48 hours</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold">2.</span>
              <span>We'll verify your certificates and credentials</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold">3.</span>
              <span>You'll receive an email notification about your application status</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold">4.</span>
              <span>Once approved, you can start accepting students!</span>
            </li>
          </ul>
        </div>

        {/* Tips */}
        <div className="bg-green-50 rounded-xl p-6 mb-8">
          <h3 className="font-semibold text-green-900 mb-3 text-lg">Pro Tips While You Wait:</h3>
          <ul className="space-y-2 text-green-800 text-sm">
            <li>• Check your email regularly for updates</li>
            <li>• Prepare your teaching materials and lesson plans</li>
            <li>• Think about your teaching methodology</li>
            <li>• Join our tutor community on social media</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Go to Homepage</span>
          </Link>
          <Link
            href="/tutor-portal/dashboard"
            className="flex items-center justify-center space-x-2 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            <User className="w-5 h-5" />
            <span>View My Profile</span>
          </Link>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-8 text-gray-600">
        <p>Have questions?{' '}
          <Link href="/contact" className="text-blue-600 hover:underline font-medium">
            Contact Support
          </Link>
        </p>
      </div>
      </div>
    </div>
  );
}